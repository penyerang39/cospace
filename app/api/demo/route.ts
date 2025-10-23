import { NextRequest } from 'next/server'
import { Resend } from 'resend'
import { sanitizeInput, sanitizeEmailHeader, sanitizeEmailContent, sanitizeEmailForCC, validateEmail, validatePhone, isRequired, hasMinimumSelections } from '@/lib/validation'

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


function validate(payload: DemoRequestPayload): string | null {
  // Sanitize all inputs
  const sanitizedPayload = {
    ...payload,
    fullName: sanitizeInput(payload.fullName),
    workEmail: sanitizeInput(payload.workEmail),
    phone: sanitizeInput(payload.phone),
    companyName: sanitizeInput(payload.companyName),
    industry: sanitizeInput(payload.industry),
    companySize: sanitizeInput(payload.companySize),
    location: sanitizeInput(payload.location),
    projectedUsers: sanitizeInput(payload.projectedUsers),
    deploymentPreference: sanitizeInput(payload.deploymentPreference),
    biggestChallenge: sanitizeInput(payload.biggestChallenge),
    evaluatingFor: sanitizeInput(payload.evaluatingFor),
    implementationTimeline: sanitizeInput(payload.implementationTimeline),
  }

  // Validate required fields
  if (!isRequired(sanitizedPayload.fullName)) return 'Full name is required.'
  
  const emailValidation = validateEmail(sanitizedPayload.workEmail)
  if (!emailValidation.isValid) return emailValidation.error!
  
  const phoneValidation = validatePhone(sanitizedPayload.phone)
  if (!phoneValidation.isValid) return phoneValidation.error!
  
  if (!isRequired(sanitizedPayload.companyName)) return 'Company name is required.'
  if (!isRequired(sanitizedPayload.industry)) return 'Industry is required.'
  if (!isRequired(sanitizedPayload.companySize)) return 'Company size is required.'
  if (!isRequired(sanitizedPayload.location)) return 'Location is required.'
  if (!isRequired(sanitizedPayload.projectedUsers)) return 'Projected number of users is required.'
  if (!hasMinimumSelections(payload.primaryInterest)) return 'Select at least one primary interest.'
  if (!isRequired(sanitizedPayload.deploymentPreference)) return 'Deployment preference is required.'
  if (!isRequired(sanitizedPayload.biggestChallenge)) return 'Please describe your current challenge.'
  if (!isRequired(sanitizedPayload.evaluatingFor)) return 'Evaluation context is required.'
  if (!isRequired(sanitizedPayload.implementationTimeline)) return 'Implementation timeline is required.'
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
      : (process.env.DEMO_REQUEST_TO || 'info@neo14.com')
    const fromAddress = process.env.DEMO_REQUEST_FROM || 'Cospace Demo <no-reply@neo14.com>'

    const subjectPrefix = body.integrationTest ? '[INTEGRATION TEST] ' : ''
    const subject = `${subjectPrefix}New Demo Request — ${sanitizeEmailHeader(body.companyName)} (${sanitizeEmailHeader(body.fullName)})`
    
    const emailText = `
New Cospace Demo Request

Contact Information:
- Full Name: ${sanitizeEmailContent(body.fullName)}
- Work Email: ${sanitizeEmailContent(body.workEmail)}
- Phone: ${body.phone ? sanitizeEmailContent(body.phone) : 'Not provided'}

Company Information:
- Company Name: ${sanitizeEmailContent(body.companyName)}
- Industry: ${sanitizeEmailContent(body.industry)}
- Company Size: ${sanitizeEmailContent(body.companySize)}
- Location: ${sanitizeEmailContent(body.location)}

Use Case & Intent:
- Projected Users: ${sanitizeEmailContent(body.projectedUsers)}
- Primary Interest: ${body.primaryInterest.map(interest => sanitizeEmailContent(interest)).join(', ')}
- Deployment Preference: ${sanitizeEmailContent(body.deploymentPreference)}
- Biggest Challenge: ${sanitizeEmailContent(body.biggestChallenge)}

Qualification & Follow-Up:
- Evaluating For: ${sanitizeEmailContent(body.evaluatingFor)}
- Implementation Timeline: ${sanitizeEmailContent(body.implementationTimeline)}
- Wants Live Demo: ${body.wantsLiveDemo ? 'Yes' : 'No'}
- Consent Given: ${body.consent ? 'Yes' : 'No'}

You can reply directly to ${sanitizeEmailContent(body.workEmail)} to continue the conversation.
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


