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
  'Manufacturing',
  'Logistics',
  'Government',
  'Education',
  'Other',
]

const companySizes = ['1–10', '11–50', '51–200', '201–1000', '1000+']
const estimatedUsers = ['1–10', '11–50', '51–200', '201–1000', '1000+']
const deployment = ['Private Cloud / On-Premises', 'Hybrid', 'Public Cloud', 'Not Sure Yet']
const timelines = ['Immediately', '3–6 months', '6–12 months', 'Just exploring']

const expectedUseCases = [
  'File Collaboration',
  'Secure Communication',
  'AI Data Analysis',
  'Workflow Automation',
  'Private Cloud Hosting',
  'Other',
]


export default function RequestPricingPage() {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [integrationMode, setIntegrationMode] = useState(false)

  function computeProgress(form: HTMLFormElement) {
    const formData = new FormData(form)
    const checks: Array<boolean> = []
    const getStr = (k: string) => sanitizeFormData(formData.get(k))
    const selectedUseCases = form.querySelectorAll('input[name="expectedUseCases"]:checked').length
    
    checks.push(isRequired(getStr('fullName')))
    checks.push(isRequired(getStr('workEmail')) && validateEmail(getStr('workEmail')).isValid)
    checks.push(isRequired(getStr('companyName')))
    checks.push(isRequired(getStr('companyProfile')))
    checks.push(isRequired(getStr('industry')))
    checks.push(isRequired(getStr('companySize')))
    checks.push(isRequired(getStr('location')))
    checks.push(isRequired(getStr('estimatedUsers')))
    checks.push(selectedUseCases > 0)
    checks.push(isRequired(getStr('preferredDeployment')))
    checks.push(isRequired(getStr('implementationTimeline')))
    checks.push(isRequired(getStr('budgetRange')))

    const pct = Math.round((checks.filter(Boolean).length / checks.length) * 100)
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--demo-progress', `${pct}%`)
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    const form = e.currentTarget
    const formData = new FormData(form)
    const expected = Array.from(
      form.querySelectorAll('input[name="expectedUseCases"]:checked')
    ).map((i) => (i as HTMLInputElement).value)

    const payload = {
      fullName: sanitizeFormData(formData.get('fullName')),
      workEmail: sanitizeFormData(formData.get('workEmail')),
      phone: sanitizeFormData(formData.get('phone')),
      companyName: sanitizeFormData(formData.get('companyName')),
      companyProfile: sanitizeFormData(formData.get('companyProfile')),
      industry: sanitizeFormData(formData.get('industry')),
      companySize: sanitizeFormData(formData.get('companySize')),
      location: sanitizeFormData(formData.get('location')),
      estimatedUsers: sanitizeFormData(formData.get('estimatedUsers')),
      expectedUseCases: expected,
      preferredDeployment: sanitizeFormData(formData.get('preferredDeployment')),
      implementationTimeline: sanitizeFormData(formData.get('implementationTimeline')),
      budgetRange: sanitizeFormData(formData.get('budgetRange')),
      wantsProposal: formData.get('wantsProposal') === 'on',
      wantsCall: formData.get('wantsCall') === 'on',
      integrationTest: formData.get('integrationTest') === 'true',
    }

    // Validation
    if (!isRequired(payload.fullName)) return setError('Full name is required.')
    
    const emailValidation = validateEmail(payload.workEmail)
    if (!emailValidation.isValid) return setError(emailValidation.error!)
    
    const phoneValidation = validatePhone(payload.phone)
    if (!phoneValidation.isValid) return setError(phoneValidation.error!)
    
    if (!isRequired(payload.companyName)) return setError('Company name is required.')
    if (!isRequired(payload.companyProfile)) return setError('Company profile is required.')
    if (!isRequired(payload.industry)) return setError('Industry is required.')
    if (!isRequired(payload.companySize)) return setError('Company size is required.')
    if (!isRequired(payload.location)) return setError('Location is required.')
    if (!isRequired(payload.estimatedUsers)) return setError('Estimated users is required.')
    if (!hasMinimumSelections(payload.expectedUseCases)) return setError('Select at least one expected use case.')
    if (!isRequired(payload.preferredDeployment)) return setError('Preferred deployment is required.')
    if (!isRequired(payload.implementationTimeline)) return setError('Implementation timeline is required.')
    if (!isRequired(payload.budgetRange)) return setError('Budget range is required.')

    setSubmitting(true)
    try {
      const res = await fetch('/api/pricing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      if (!res.ok || !json.ok) throw new Error(json.error || 'Something went wrong')
      setSuccess(true)
      form.reset()
      document.documentElement.style.setProperty('--demo-progress', '0%')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to submit'
      setError(message)
    } finally {
      setSubmitting(false)
    }
  }

  React.useEffect(() => {
    document.documentElement.style.setProperty('--demo-progress', '0%')
    return () => {
      document.documentElement.style.setProperty('--demo-progress', '0%')
    }
  }, [])

  return (
    <div className="mx-auto max-w-3xl h-flex px-6 py-10">
      <h1 className="heading-1 gradient-text h-flex pb-2">Request Pricing</h1>
      <p className="mt-2 text-muted-foreground normal-text">Share your requirements and we'll send an indicative proposal.</p>

      <form onSubmit={onSubmit} onChange={(e) => {
        const form = e.currentTarget as HTMLFormElement;
        computeProgress(form);
      }} className="mt-8 space-y-6">
        {process.env.NODE_ENV !== 'production' && (
          <div className="flex items-center gap-3 p-3 rounded form-dev-helper">
            <button
              type="button"
              className="text-sm underline"
              onClick={() => {
                const form = document.querySelector('form') as HTMLFormElement
                if (!form) return
                const set = (name: string, value: string) => {
                  const el = form.querySelector(`[name="${name}"]`) as HTMLInputElement | HTMLSelectElement
                  if (el) el.value = value
                }
                set('fullName', 'Pricing Tester')
                set('workEmail', 'pricing.tester@neo14.test')
                set('phone', '+1 555-0123')
                set('companyName', 'Neo14 Test LLC')
                set('companyProfile', 'Early-stage SaaS evaluating secure collaboration tooling')
                set('industry', 'Finance')
                set('companySize', '51–200')
                set('location', 'United States')
                set('estimatedUsers', '11–50')
                set('preferredDeployment', 'Hybrid')
                set('implementationTimeline', '3–6 months')
                set('budgetRange', '$1,000 – $2,500 / month')
                const firstUse = form.querySelector('input[name="expectedUseCases"]') as HTMLInputElement
                if (firstUse) firstUse.checked = true
                computeProgress(form)
              }}
            >
              Prefill dummy data
            </button>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" onChange={(e) => {
                const checkbox = e.currentTarget;
                setIntegrationMode(checkbox.checked);
              }} />
              Mark as integration test
            </label>
          </div>
        )}

        <section className="space-y-4">
          <h2 className="text-xl font-medium normal-text">Contact Info</h2>
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
            <label className="flex flex-col gap-1 sm:col-span-2">
              <span className="normal-text">Company Name</span>
              <input name="companyName" className="form-input" required />
            </label>
            <label className="flex flex-col gap-1 sm:col-span-2">
              <span className="normal-text">Company Profile</span>
              <input name="companyProfile" className="form-input" placeholder="Briefly describe your company" required />
            </label>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-medium normal-text">Company</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
              <span className="normal-text">Company Size (Employees)</span>
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
            <label className="flex flex-col gap-1 sm:col-span-2">
              <span className="normal-text">Location (Country/Region)</span>
              <input name="location" className="form-input" required />
            </label>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-medium normal-text">Usage Needs</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1">
              <span className="normal-text">Estimated Number of Users</span>
              <div className="relative">
                <select name="estimatedUsers" className="form-select" required>
                  <option value="">Select…</option>
                  {estimatedUsers.map((v) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/60" aria-hidden="true" />
              </div>
            </label>
            <div className="flex flex-col gap-1 sm:col-span-2">
              <span className="normal-text">Expected Use Cases</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {expectedUseCases.map((v) => (
                  <label key={v} className="form-checkbox">
                    <input type="checkbox" name="expectedUseCases" value={v} className="themed-checkbox shrink-0" />
                    <span className="normal-text">{v}</span>
                  </label>
                ))}
              </div>
            </div>
            <label className="flex flex-col gap-1">
              <span className="normal-text">Preferred Deployment</span>
              <div className="relative">
                <select name="preferredDeployment" className="form-select" required>
                  <option value="">Select…</option>
                  {deployment.map((v) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/60" aria-hidden="true" />
              </div>
            </label>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-medium normal-text">Timeline & Budget</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1">
              <span className="normal-text">When are you planning to implement?</span>
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
              <span className="normal-text">What is your budget range (per month/year)?</span>
              <input name="budgetRange" className="form-input" placeholder="$X – $Y / month or year" required />
            </label>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-medium normal-text">Follow-Up Options</h2>
          <label className="flex items-start gap-3 py-2 min-h-[44px]">
            <input type="checkbox" name="wantsProposal" className="mt-0.5 themed-checkbox shrink-0" />
            <span className="normal-text">Please send me an indicative pricing proposal</span>
          </label>
          <label className="flex items-start gap-3 py-2 min-h-[44px]">
            <input type="checkbox" name="wantsCall" className="mt-0.5 themed-checkbox shrink-0" />
            <span className="normal-text">I would like to schedule a call to discuss pricing in detail</span>
          </label>
        </section>

        {error && <div className="text-red-600 normal-text">{error}</div>}
        {success && <div className="text-green-700 normal-text">Thanks! We'll send pricing details soon.</div>}

        <button type="submit" disabled={submitting} className="themed-submit-btn">
          {submitting ? 'Submitting…' : 'Request Pricing'}
        </button>

        {integrationMode && <input type="hidden" name="integrationTest" value="true" />}
      </form>
    </div>
  )
}


