'use client'

import * as React from 'react'
import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'


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

function isBusinessEmail(email: string) {
  const lower = email.toLowerCase().trim()
  const at = lower.lastIndexOf('@')
  if (at <= 0) return false
  const domain = lower.slice(at + 1)
  const free = new Set([
    'gmail.com','yahoo.com','hotmail.com','outlook.com','live.com','msn.com','icloud.com','me.com','proton.me','protonmail.com','aol.com','yandex.com','yandex.ru','mail.ru','gmx.com','gmx.net','zoho.com','pm.me'
  ])
  if (free.has(domain)) return false
  if (domain.endsWith('.edu')) return false
  return /.+@.+\..+/.test(lower)
}

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

    const formData = new FormData(e.currentTarget)
    const primaryInterest = Array.from(
      e.currentTarget.querySelectorAll('input[name="primaryInterest"]:checked')
    ).map((i) => (i as HTMLInputElement).value)

    const payload = {
      fullName: String(formData.get('fullName') || ''),
      workEmail: String(formData.get('workEmail') || ''),
      phone: String(formData.get('phone') || ''),
      companyName: String(formData.get('companyName') || ''),
      industry: String(formData.get('industry') || ''),
      companySize: String(formData.get('companySize') || ''),
      location: String(formData.get('location') || ''),
      projectedUsers: String(formData.get('projectedUsers') || ''),
      primaryInterest,
      deploymentPreference: String(formData.get('deploymentPreference') || ''),
      biggestChallenge: String(formData.get('biggestChallenge') || ''),
      evaluatingFor: String(formData.get('evaluatingFor') || ''),
      implementationTimeline: String(formData.get('implementationTimeline') || ''),
      wantsLiveDemo: String(formData.get('wantsLiveDemo') || 'No') === 'Yes',
      consent: formData.get('consent') === 'on',
    }

    if (!payload.fullName.trim()) return setError('Full name is required.')
    if (!payload.workEmail.trim()) return setError('Work email is required.')
    if (!isBusinessEmail(payload.workEmail)) return setError('Please use a business email address.')
    if (!payload.companyName.trim()) return setError('Company name is required.')
    if (!payload.industry) return setError('Industry is required.')
    if (!payload.companySize) return setError('Company size is required.')
    if (!payload.location.trim()) return setError('Location is required.')
    if (!payload.projectedUsers) return setError('Projected users is required.')
    if (!payload.primaryInterest.length) return setError('Select at least one primary interest.')
    if (!payload.deploymentPreference) return setError('Deployment preference is required.')
    if (!payload.biggestChallenge.trim()) return setError('Describe your current challenge.')
    if (!payload.evaluatingFor) return setError('Evaluation context is required.')
    if (!payload.implementationTimeline) return setError('Implementation timeline is required.')
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
      e.currentTarget.reset()
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
    const getStr = (k: string) => String(formData.get(k) || '').trim()
    const checkedInterests = form.querySelectorAll('input[name="primaryInterest"]:checked').length

    // Required fields contributing to progress
    checks.push(getStr('fullName').length > 0)
    checks.push(getStr('workEmail').length > 0 && isBusinessEmail(getStr('workEmail')))
    checks.push(getStr('companyName').length > 0)
    checks.push(getStr('industry').length > 0)
    checks.push(getStr('companySize').length > 0)
    checks.push(getStr('location').length > 0)
    checks.push(getStr('projectedUsers').length > 0)
    checks.push(checkedInterests > 0)
    checks.push(getStr('deploymentPreference').length > 0)
    checks.push(getStr('biggestChallenge').length > 0)
    checks.push(getStr('evaluatingFor').length > 0)
    checks.push(getStr('implementationTimeline').length > 0)
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


