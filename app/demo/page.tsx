'use client'

import * as React from 'react'
import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { sanitizeFormData, validateEmail, validatePhone, isRequired, hasMinimumSelections } from '@/lib/validation'


const industries = [
  'Telecom',
  'Legal',
  'Finance',
  'Family Office',
  'Manufacturing',
  'Logistics',
  'Government',
  'Education',
  'Other',
]

const companySizes = ['1–10', '11–50', '51–200', '201–1000', '1000+']
const projectedUsers = ['1–10', '11–50', '51–200', '201–1000', '1000+']
const deployment = ['Private Cloud / On-Premises', 'Hybrid', 'Public Cloud', 'Not Sure Yet']
const evaluatingFor = ['Internal Use', 'Client Offering / White-Label', 'Both']
const timelines = ['Immediately', '3–6 months', '6–12 months', 'Just exploring']

const interests = [
  'Secure Collaboration',
  'AI Data Analysis',
  'Private Cloud Hosting',
  'Workflow Automation',
  'Secure Communication',
  'Legal/Compliance',
  'Other',
]


export default function DemoPage() {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [progress, setProgress] = useState(0)
  const [integrationMode, setIntegrationMode] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    const form = e.currentTarget
    const formData = new FormData(form)
    const primaryInterest = Array.from(
      form.querySelectorAll('input[name="primaryInterest"]:checked')
    ).map((i) => (i as HTMLInputElement).value)

    const payload = {
      fullName: sanitizeFormData(formData.get('fullName')),
      workEmail: sanitizeFormData(formData.get('workEmail')),
      phone: sanitizeFormData(formData.get('phone')),
      companyName: sanitizeFormData(formData.get('companyName')),
      industry: sanitizeFormData(formData.get('industry')),
      companySize: sanitizeFormData(formData.get('companySize')),
      location: sanitizeFormData(formData.get('location')),
      projectedUsers: sanitizeFormData(formData.get('projectedUsers')),
      primaryInterest,
      deploymentPreference: sanitizeFormData(formData.get('deploymentPreference')),
      biggestChallenge: sanitizeFormData(formData.get('biggestChallenge')),
      evaluatingFor: sanitizeFormData(formData.get('evaluatingFor')),
      implementationTimeline: sanitizeFormData(formData.get('implementationTimeline')),
      wantsLiveDemo: String(formData.get('wantsLiveDemo') || 'No') === 'Yes',
      consent: formData.get('consent') === 'on',
    }

    // Validate required fields
    if (!isRequired(payload.fullName)) return setError('Full name is required.')
    
    const emailValidation = validateEmail(payload.workEmail)
    if (!emailValidation.isValid) return setError(emailValidation.error!)
    
    const phoneValidation = validatePhone(payload.phone)
    if (!phoneValidation.isValid) return setError(phoneValidation.error!)
    
    if (!isRequired(payload.companyName)) return setError('Company name is required.')
    if (!isRequired(payload.industry)) return setError('Industry is required.')
    if (!isRequired(payload.companySize)) return setError('Company size is required.')
    if (!isRequired(payload.location)) return setError('Location is required.')
    if (!isRequired(payload.projectedUsers)) return setError('Projected users is required.')
    if (!hasMinimumSelections(payload.primaryInterest)) return setError('Select at least one primary interest.')
    if (!isRequired(payload.deploymentPreference)) return setError('Deployment preference is required.')
    if (!isRequired(payload.biggestChallenge)) return setError('Describe your current challenge.')
    if (!isRequired(payload.evaluatingFor)) return setError('Evaluation context is required.')
    if (!isRequired(payload.implementationTimeline)) return setError('Implementation timeline is required.')
    if (!payload.consent) return setError('Consent is required to proceed.')

    setSubmitting(true)
    try {
      const res = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      if (!res.ok || !json.ok) {
        throw new Error(json.error || 'Something went wrong')
      }
      setSuccess(true)
      form.reset()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to submit'
      setError(message)
    } finally {
      setSubmitting(false)
    }
  }

  function computeProgress(form: HTMLFormElement) {
    const formData = new FormData(form)
    const checks: Array<boolean> = []
    const getStr = (k: string) => sanitizeFormData(formData.get(k))
    const checkedInterests = form.querySelectorAll('input[name="primaryInterest"]:checked').length

    // Required fields contributing to progress
    checks.push(isRequired(getStr('fullName')))
    checks.push(isRequired(getStr('workEmail')) && validateEmail(getStr('workEmail')).isValid)
    checks.push(isRequired(getStr('companyName')))
    checks.push(isRequired(getStr('industry')))
    checks.push(isRequired(getStr('companySize')))
    checks.push(isRequired(getStr('location')))
    checks.push(isRequired(getStr('projectedUsers')))
    checks.push(checkedInterests > 0)
    checks.push(isRequired(getStr('deploymentPreference')))
    checks.push(isRequired(getStr('biggestChallenge')))
    checks.push(isRequired(getStr('evaluatingFor')))
    checks.push(isRequired(getStr('implementationTimeline')))
    checks.push(formData.get('consent') === 'on')

    const completed = checks.filter(Boolean).length
    const total = checks.length
    const pct = Math.round((completed / total) * 100)
    setProgress(pct)
    // update global bar below Navbar
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--demo-progress', `${pct}%`)
    }
  }

  React.useEffect(() => {
    // initialize on mount and cleanup on unmount
    document.documentElement.style.setProperty('--demo-progress', '0%')
    return () => {
      document.documentElement.style.setProperty('--demo-progress', '0%')
    }
  }, [])

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      {/* uses global progress bar under Navbar */}
      <h1 className="heading-1 gradient-text h-flex pb-2">Book a Demo</h1>
      <p className="mt-2 text-muted-foreground normal-text">Tell us about your needs. We'll reach out shortly.</p>

      <form
        onSubmit={onSubmit}
        onChange={(e) => computeProgress(e.currentTarget as HTMLFormElement)}
        className="mt-8 space-y-6"
      >
        {/* Dev/test helpers (non-production only) */}
        {process.env.NODE_ENV !== 'production' && (
          <div className="flex items-center gap-3 p-3 rounded border border-dashed border-black/10 dark:border-white/10">
            <button
              type="button"
              className="text-sm underline"
              onClick={() => {
                const form = document.querySelector('form') as HTMLFormElement
                if (!form) return
                const set = (name: string, value: string) => {
                  const el = form.querySelector(`[name="${name}"]`) as HTMLInputElement | HTMLSelectElement
                  if (el) {
                    el.value = value
                  }
                }
                set('fullName', 'Integration Tester')
                set('workEmail', 'tester@neo14.test')
                set('phone', '+1 555-0100')
                set('companyName', 'Neo14 Test LLC')
                set('industry', 'Finance')
                set('companySize', '51–200')
                set('location', 'United States')
                set('projectedUsers', '11–50')
                set('deploymentPreference', 'Hybrid')
                set('biggestChallenge', 'Validating integration flow without spamming real inboxes')
                set('evaluatingFor', 'Internal Use')
                set('implementationTimeline', '3–6 months')
                const firstInterest = form.querySelector('input[name="primaryInterest"]') as HTMLInputElement
                if (firstInterest) firstInterest.checked = true
                const consent = form.querySelector('input[name="consent"]') as HTMLInputElement
                if (consent) consent.checked = true
                computeProgress(form)
              }}
            >
              Prefill dummy data
            </button>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                onChange={(e) => setIntegrationMode(e.currentTarget.checked)}
              />
              Mark as integration test
            </label>
          </div>
        )}
        <section className="space-y-4">
          <h2 className="text-xl font-medium normal-text">Basic Contact Info</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1">
              <span className="normal-text">Full Name</span>
              <input name="fullName" className="form-input" required />
            </label>
            <label className="flex flex-col gap-1">
              <span className="normal-text">Work Email</span>
              <input type="email" name="workEmail" className="form-input" required />
            </label>
            <label className="flex flex-col gap-1 sm:col-span-2">
              <span className="normal-text">Phone (optional)</span>
              <input name="phone" className="form-input" />
            </label>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-medium normal-text">Company Information</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1">
              <span className="normal-text">Company Name</span>
              <input name="companyName" className="form-input" required />
            </label>
            <label className="flex flex-col gap-1">
              <span className="normal-text">Industry / Sector</span>
              <div className="relative">
                <select name="industry" className="form-select" required>
                  <option value="">Select…</option>
                  {industries.map((v) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/60" aria-hidden="true" />
              </div>
            </label>
            <label className="flex flex-col gap-1">
              <span className="normal-text">Company Size</span>
              <div className="relative">
                <select name="companySize" className="form-select" required>
                  <option value="">Select…</option>
                  {companySizes.map((v) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/60" aria-hidden="true" />
              </div>
            </label>
            <label className="flex flex-col gap-1">
              <span className="normal-text">Location (Country/Region)</span>
              <input name="location" className="form-input" required />
            </label>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-medium normal-text">Use Case / Intent</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1">
              <span className="normal-text">Projected Number of Users</span>
              <div className="relative">
                <select name="projectedUsers" className="form-select" required>
                  <option value="">Select…</option>
                  {projectedUsers.map((v) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/60" aria-hidden="true" />
              </div>
            </label>
            <label className="flex flex-col gap-1">
              <span className="normal-text">Deployment Preference</span>
              <div className="relative">
                <select name="deploymentPreference" className="form-select" required>
                  <option value="">Select…</option>
                  {deployment.map((v) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/60" aria-hidden="true" />
              </div>
            </label>
            <div className="sm:col-span-2">
              <span className="block mb-2 normal-text">Primary Interest in Cospace</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {interests.map((v) => (
                  <label key={v} className="form-checkbox">
                    <input type="checkbox" name="primaryInterest" value={v} className="h-5 w-5 shrink-0" />
                    <span className="normal-text">{v}</span>
                  </label>
                ))}
              </div>
            </div>
            <label className="flex flex-col gap-1 sm:col-span-2">
              <span className="normal-text">Your Biggest Current Challenge</span>
              <input name="biggestChallenge" className="form-input" placeholder="e.g., data silos, security, cost of multiple tools" required />
            </label>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-medium normal-text">Qualification & Follow-Up</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1">
              <span className="normal-text">Are you evaluating for</span>
              <div className="relative">
                <select name="evaluatingFor" className="form-select" required>
                  <option value="">Select…</option>
                  {evaluatingFor.map((v) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/60" aria-hidden="true" />
              </div>
            </label>
            <label className="flex flex-col gap-1">
              <span className="normal-text">When do you plan to implement?</span>
              <div className="relative">
                <select name="implementationTimeline" className="form-select" required>
                  <option value="">Select…</option>
                  {timelines.map((v) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/60" aria-hidden="true" />
              </div>
            </label>
            <label className="flex flex-col gap-1">
              <span className="normal-text">Would you like a live demo?</span>
              <div className="relative">
                <select name="wantsLiveDemo" className="form-select">
                  <option>No</option>
                  <option>Yes</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/60" aria-hidden="true" />
              </div>
            </label>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-medium normal-text">Consent / Marketing</h2>
          <label className="flex items-start gap-3 py-2 min-h-[44px]">
            <input type="checkbox" name="consent" required className="mt-0.5 h-5 w-5 shrink-0" />
            <span className="normal-text">
              I agree to receive demo access and related communication from Neo14 Technologies. Read our
              {' '}<Link href="/legal/privacy" className="underline">Privacy Policy</Link>.
            </span>
          </label>
        </section>

        {error && (
          <div className="text-red-600 normal-text">{error}</div>
        )}
        {success && (
          <div className="text-green-700 normal-text">Thanks! We'll reach out shortly.</div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center rounded bg-black px-4 py-2 text-white disabled:opacity-60"
        >
          {submitting ? 'Submitting…' : 'Request Demo'}
        </button>
        {/* hidden flag posted with the form when enabled */}
        {integrationMode && (
          <input type="hidden" name="integrationTest" value="true" />
        )}
      </form>
    </div>
  )
}


