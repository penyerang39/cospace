import { NextRequest } from 'next/server'
import { Resend } from 'resend'

type PricingRequestPayload = {
  fullName: string
  workEmail: string
  phone?: string
  companyName: string
  companyProfile: string
  industry: string
  companySize: string
  location: string
  estimatedUsers: string
  expectedUseCases: string[]
  preferredDeployment: string
  implementationTimeline: string
  budgetRange: string
  wantsProposal: boolean
  wantsCall: boolean
  integrationTest?: boolean
}

function isBusinessEmail(email: string): boolean {
  const lower = email.toLowerCase().trim()
  const atIndex = lower.lastIndexOf('@')
  if (atIndex <= 0) return false
  const domain = lower.slice(atIndex + 1)
  const freeDomains = new Set([
    'gmail.com','yahoo.com','hotmail.com','outlook.com','live.com','msn.com','icloud.com','me.com','proton.me','protonmail.com','aol.com','yandex.com','yandex.ru','mail.ru','gmx.com','gmx.net','zoho.com','pm.me'
  ])
  if (freeDomains.has(domain)) return false
  if (domain.endsWith('.edu')) return false
  return /.+@.+\..+/.test(lower)
}

function validate(body: PricingRequestPayload): string | null {
  if (!body.fullName?.trim()) return 'Full name is required.'
  if (!body.workEmail?.trim()) return 'Work email is required.'
  if (!isBusinessEmail(body.workEmail)) return 'Please use a business email address.'
  if (!body.companyName?.trim()) return 'Company name is required.'
  if (!body.companyProfile?.trim()) return 'Company profile is required.'
  if (!body.industry?.trim()) return 'Industry is required.'
  if (!body.companySize?.trim()) return 'Company size is required.'
  if (!body.location?.trim()) return 'Location is required.'
  if (!body.estimatedUsers?.trim()) return 'Estimated users is required.'
  if (!body.expectedUseCases?.length) return 'Select at least one expected use case.'
  if (!body.preferredDeployment?.trim()) return 'Preferred deployment is required.'
  if (!body.implementationTimeline?.trim()) return 'Implementation timeline is required.'
  if (!body.budgetRange?.trim()) return 'Budget range is required.'
  return null
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as PricingRequestPayload
    const error = validate(body)
    if (error) return new Response(JSON.stringify({ ok: false, error }), { status: 400 })

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Email service not configured.' }),
        { status: 500 }
      )
    }

    const resend = new Resend(apiKey)
    const toAddress = (body.integrationTest && process.env.DEMO_REQUEST_TO_DEV)
      ? String(process.env.DEMO_REQUEST_TO_DEV)
      : (process.env.DEMO_REQUEST_TO || 'hello@neo14.tech')
    const fromAddress = process.env.DEMO_REQUEST_FROM || 'Cospace Pricing <no-reply@cospace.demo>'

    const subjectPrefix = body.integrationTest ? '[INTEGRATION TEST] ' : ''
    const subject = `${subjectPrefix}Pricing Request — ${body.companyName} (${body.fullName})`

    const text = `
New Cospace Pricing Request

Contact Info:
- Full Name: ${body.fullName}
- Work Email: ${body.workEmail}
- Phone: ${body.phone || 'Not provided'}
- Company Name: ${body.companyName}
- Company Profile: ${body.companyProfile}

Company:
- Industry: ${body.industry}
- Company Size: ${body.companySize}
- Location: ${body.location}

Usage Needs:
- Estimated Users: ${body.estimatedUsers}
- Expected Use Cases: ${body.expectedUseCases.join(', ')}
- Preferred Deployment: ${body.preferredDeployment}

Timeline & Budget:
- Implementation: ${body.implementationTimeline}
- Budget Range: ${body.budgetRange}

Follow-Up:
- Send Proposal: ${body.wantsProposal ? 'Yes' : 'No'}
- Schedule Call: ${body.wantsCall ? 'Yes' : 'No'}

Reply to ${body.workEmail} to continue the conversation.
    `.trim()

    const { error: sendError } = await resend.emails.send({
      from: fromAddress,
      to: [toAddress],
      subject,
      text,
    })

    if (sendError) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Failed to send email.' }),
        { status: 502 }
      )
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 })
  } catch (e) {
    return new Response(
      JSON.stringify({ ok: false, error: 'Invalid request.' }),
      { status: 400 }
    )
  }
}


