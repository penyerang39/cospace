import { NextRequest } from 'next/server'
import { Resend } from 'resend'
import { sanitizeInput, sanitizeEmailHeader, sanitizeEmailContent, sanitizeEmailForCC, validateEmail, validatePhone, isRequired, hasMinimumSelections } from '@/lib/validation'

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


function validate(body: PricingRequestPayload): string | null {
  // Sanitize all inputs
  const sanitizedPayload = {
    ...body,
    fullName: sanitizeInput(body.fullName),
    workEmail: sanitizeInput(body.workEmail),
    phone: sanitizeInput(body.phone),
    companyName: sanitizeInput(body.companyName),
    companyProfile: sanitizeInput(body.companyProfile),
    industry: sanitizeInput(body.industry),
    companySize: sanitizeInput(body.companySize),
    location: sanitizeInput(body.location),
    estimatedUsers: sanitizeInput(body.estimatedUsers),
    preferredDeployment: sanitizeInput(body.preferredDeployment),
    implementationTimeline: sanitizeInput(body.implementationTimeline),
    budgetRange: sanitizeInput(body.budgetRange),
  }

  // Validate required fields
  if (!isRequired(sanitizedPayload.fullName)) return 'Full name is required.'
  
  const emailValidation = validateEmail(sanitizedPayload.workEmail)
  if (!emailValidation.isValid) return emailValidation.error!
  
  const phoneValidation = validatePhone(sanitizedPayload.phone)
  if (!phoneValidation.isValid) return phoneValidation.error!
  
  if (!isRequired(sanitizedPayload.companyName)) return 'Company name is required.'
  if (!isRequired(sanitizedPayload.companyProfile)) return 'Company profile is required.'
  if (!isRequired(sanitizedPayload.industry)) return 'Industry is required.'
  if (!isRequired(sanitizedPayload.companySize)) return 'Company size is required.'
  if (!isRequired(sanitizedPayload.location)) return 'Location is required.'
  if (!isRequired(sanitizedPayload.estimatedUsers)) return 'Estimated users is required.'
  if (!hasMinimumSelections(body.expectedUseCases)) return 'Select at least one expected use case.'
  if (!isRequired(sanitizedPayload.preferredDeployment)) return 'Preferred deployment is required.'
  if (!isRequired(sanitizedPayload.implementationTimeline)) return 'Implementation timeline is required.'
  if (!isRequired(sanitizedPayload.budgetRange)) return 'Budget range is required.'
  
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
    const toAddress = (body.integrationTest && process.env.PRICING_REQUEST_TO_DEV)
      ? String(process.env.PRICING_REQUEST_TO_DEV)
      : (process.env.PRICING_REQUEST_TO || 'info@neo14.com')
    const fromAddress = process.env.PRICING_REQUEST_FROM || 'Cospace Pricing <no-reply@neo14.com>'

    const subjectPrefix = body.integrationTest ? '[INTEGRATION TEST] ' : ''
    const subject = `${subjectPrefix}Pricing Request — ${sanitizeEmailHeader(body.companyName)} (${sanitizeEmailHeader(body.fullName)})`

    const text = `
New Cospace Pricing Request

Contact Info:
- Full Name: ${sanitizeEmailContent(body.fullName)}
- Work Email: ${sanitizeEmailContent(body.workEmail)}
- Phone: ${body.phone ? sanitizeEmailContent(body.phone) : 'Not provided'}
- Company Name: ${sanitizeEmailContent(body.companyName)}
- Company Profile: ${sanitizeEmailContent(body.companyProfile)}

Company:
- Industry: ${sanitizeEmailContent(body.industry)}
- Company Size: ${sanitizeEmailContent(body.companySize)}
- Location: ${sanitizeEmailContent(body.location)}

Usage Needs:
- Estimated Users: ${sanitizeEmailContent(body.estimatedUsers)}
- Expected Use Cases: ${body.expectedUseCases.map(useCase => sanitizeEmailContent(useCase)).join(', ')}
- Preferred Deployment: ${sanitizeEmailContent(body.preferredDeployment)}

Timeline & Budget:
- Implementation: ${sanitizeEmailContent(body.implementationTimeline)}
- Budget Range: ${sanitizeEmailContent(body.budgetRange)}

Follow-Up:
- Send Proposal: ${body.wantsProposal ? 'Yes' : 'No'}
- Schedule Call: ${body.wantsCall ? 'Yes' : 'No'}

Reply to ${sanitizeEmailContent(body.workEmail)} to continue the conversation.
    `.trim()

    // Safely prepare CC list with sender's email and info@neo14.com
    const ccList = []
    const senderEmail = sanitizeEmailForCC(body.workEmail)
    if (senderEmail) {
      ccList.push(senderEmail)
    }
    ccList.push('info@neo14.com')

    const { error: sendError } = await resend.emails.send({
      from: fromAddress,
      to: [toAddress],
      cc: ccList,
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
  } catch {
    return new Response(
      JSON.stringify({ ok: false, error: 'Invalid request.' }),
      { status: 400 }
    )
  }
}


