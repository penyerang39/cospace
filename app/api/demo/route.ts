import { NextRequest } from 'next/server'
import { Resend } from 'resend'

type DemoRequestPayload = {
  fullName: string
  workEmail: string
  phone?: string
  companyName: string
  industry: string
  companySize: string
  location: string
  projectedUsers: string
  primaryInterest: string[]
  deploymentPreference: string
  biggestChallenge: string
  evaluatingFor: string
  implementationTimeline: string
  wantsLiveDemo: boolean
  consent: boolean
  integrationTest?: boolean
}

function isBusinessEmail(email: string): boolean {
  const lower = email.toLowerCase().trim()
  const atIndex = lower.lastIndexOf('@')
  if (atIndex <= 0) return false
  const domain = lower.slice(atIndex + 1)
  const freeDomains = new Set([
    'gmail.com',
    'yahoo.com',
    'hotmail.com',
    'outlook.com',
    'live.com',
    'msn.com',
    'icloud.com',
    'me.com',
    'proton.me',
    'protonmail.com',
    'aol.com',
    'yandex.com',
    'yandex.ru',
    'mail.ru',
    'gmx.com',
    'gmx.net',
    'zoho.com',
    'pm.me'
  ])
  if (freeDomains.has(domain)) return false
  if (domain.endsWith('.edu')) return false
  return /.+@.+\..+/.test(lower)
}

function validate(payload: DemoRequestPayload): string | null {
  if (!payload.fullName?.trim()) return 'Full name is required.'
  if (!payload.workEmail?.trim()) return 'Work email is required.'
  if (!isBusinessEmail(payload.workEmail)) return 'Please use a business email address.'
  if (!payload.companyName?.trim()) return 'Company name is required.'
  if (!payload.industry?.trim()) return 'Industry is required.'
  if (!payload.companySize?.trim()) return 'Company size is required.'
  if (!payload.location?.trim()) return 'Location is required.'
  if (!payload.projectedUsers?.trim()) return 'Projected number of users is required.'
  if (!payload.primaryInterest?.length) return 'Select at least one primary interest.'
  if (!payload.deploymentPreference?.trim()) return 'Deployment preference is required.'
  if (!payload.biggestChallenge?.trim()) return 'Please describe your current challenge.'
  if (!payload.evaluatingFor?.trim()) return 'Evaluation context is required.'
  if (!payload.implementationTimeline?.trim()) return 'Implementation timeline is required.'
  if (typeof payload.wantsLiveDemo !== 'boolean') return 'Please indicate demo preference.'
  if (!payload.consent) return 'Consent is required to proceed.'
  return null
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as DemoRequestPayload
    const error = validate(body)
    if (error) {
      return new Response(JSON.stringify({ ok: false, error }), { status: 400 })
    }

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
    const fromAddress = process.env.DEMO_REQUEST_FROM || 'Cospace Demo <no-reply@cospace.demo>'

    const subjectPrefix = body.integrationTest ? '[INTEGRATION TEST] ' : ''
    const subject = `${subjectPrefix}New Demo Request — ${body.companyName} (${body.fullName})`
    
    const emailText = `
New Cospace Demo Request

Contact Information:
- Full Name: ${body.fullName}
- Work Email: ${body.workEmail}
- Phone: ${body.phone || 'Not provided'}

Company Information:
- Company Name: ${body.companyName}
- Industry: ${body.industry}
- Company Size: ${body.companySize}
- Location: ${body.location}

Use Case & Intent:
- Projected Users: ${body.projectedUsers}
- Primary Interest: ${body.primaryInterest.join(', ')}
- Deployment Preference: ${body.deploymentPreference}
- Biggest Challenge: ${body.biggestChallenge}

Qualification & Follow-Up:
- Evaluating For: ${body.evaluatingFor}
- Implementation Timeline: ${body.implementationTimeline}
- Wants Live Demo: ${body.wantsLiveDemo ? 'Yes' : 'No'}
- Consent Given: ${body.consent ? 'Yes' : 'No'}

You can reply directly to ${body.workEmail} to continue the conversation.
    `.trim()

    const { error: sendError } = await resend.emails.send({
      from: fromAddress,
      to: [toAddress],
      subject,
      text: emailText,
    })

    if (sendError) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Failed to send email.' }),
        { status: 502 }
      )
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 })
  } catch {
    return new Response(
      JSON.stringify({ ok: false, error: 'Invalid request.' }),
      { status: 400 }
    )
  }
}


