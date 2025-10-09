'use client'

import * as React from 'react'
import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

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

export default function RequestPricingPage() {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [integrationMode, setIntegrationMode] = useState(false)

  function computeProgress(form: HTMLFormElement) {
    const formData = new FormData(form)
    const checks: Array<boolean> = []
    const getStr = (k: string) => String(formData.get(k) || '').trim()
    const selectedUseCases = form.querySelectorAll('input[name="expectedUseCases"]:checked').length
    
    checks.push(getStr('fullName').length > 0)
    checks.push(getStr('workEmail').length > 0 && isBusinessEmail(getStr('workEmail')))
    checks.push(getStr('companyName').length > 0)
    checks.push(getStr('companyProfile').length > 0)
    checks.push(getStr('industry').length > 0)
    checks.push(getStr('companySize').length > 0)
    checks.push(getStr('location').length > 0)
    checks.push(getStr('estimatedUsers').length > 0)
    checks.push(selectedUseCases > 0)
    checks.push(getStr('preferredDeployment').length > 0)
    checks.push(getStr('implementationTimeline').length > 0)
    checks.push(getStr('budgetRange').length > 0)

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
      fullName: String(formData.get('fullName') || ''),
      workEmail: String(formData.get('workEmail') || ''),
      phone: String(formData.get('phone') || ''),
      companyName: String(formData.get('companyName') || ''),
      companyProfile: String(formData.get('companyProfile') || ''),
      industry: String(formData.get('industry') || ''),
      companySize: String(formData.get('companySize') || ''),
      location: String(formData.get('location') || ''),
      estimatedUsers: String(formData.get('estimatedUsers') || ''),
      expectedUseCases: expected,
      preferredDeployment: String(formData.get('preferredDeployment') || ''),
      implementationTimeline: String(formData.get('implementationTimeline') || ''),
      budgetRange: String(formData.get('budgetRange') || ''),
      wantsProposal: formData.get('wantsProposal') === 'on',
      wantsCall: formData.get('wantsCall') === 'on',
      integrationTest: formData.get('integrationTest') === 'true',
    }

    // Validation
    if (!payload.fullName.trim()) return setError('Full name is required.')
    if (!payload.workEmail.trim()) return setError('Work email is required.')
    if (!isBusinessEmail(payload.workEmail)) return setError('Please use a business email address.')
    if (!payload.companyName.trim()) return setError('Company name is required.')
    if (!payload.companyProfile.trim()) return setError('Company profile is required.')
    if (!payload.industry) return setError('Industry is required.')
    if (!payload.companySize) return setError('Company size is required.')
    if (!payload.location.trim()) return setError('Location is required.')
    if (!payload.estimatedUsers) return setError('Estimated users is required.')
    if (!payload.expectedUseCases.length) return setError('Select at least one expected use case.')
    if (!payload.preferredDeployment) return setError('Preferred deployment is required.')
    if (!payload.implementationTimeline) return setError('Implementation timeline is required.')
    if (!payload.budgetRange.trim()) return setError('Budget range is required.')

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

      <form onSubmit={onSubmit} onChange={(e) => computeProgress(e.currentTarget as HTMLFormElement)} className="mt-8 space-y-6">
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
              <input type="checkbox" onChange={(e) => setIntegrationMode(e.currentTarget.checked)} />
              Mark as integration test
            </label>
          </div>
        )}

        <section className="space-y-4">
          <h2 className="text-xl font-medium normal-text">Contact Info</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1">
              <span className="normal-text">Full Name</span>
              <input name="fullName" className="rounded px-3 py-2" required />
            </label>
            <label className="flex flex-col gap-1">
              <span className="normal-text">Work Email</span>
              <input type="email" name="workEmail" className="rounded px-3 py-2" required />
            </label>
            <label className="flex flex-col gap-1 sm:col-span-2">
              <span className="normal-text">Phone (optional)</span>
              <input name="phone" className="rounded px-3 py-2" />
            </label>
            <label className="flex flex-col gap-1 sm:col-span-2">
              <span className="normal-text">Company Name</span>
              <input name="companyName" className="rounded px-3 py-2" required />
            </label>
            <label className="flex flex-col gap-1 sm:col-span-2">
              <span className="normal-text">Company Profile</span>
              <input name="companyProfile" className="rounded px-3 py-2 normal-text" placeholder="Briefly describe your company" required />
            </label>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-medium normal-text">Company</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1">
              <span className="normal-text">Industry / Sector</span>
              <div className="relative">
                <select name="industry" className="rounded px-3 py-2 pr-10 appearance-none w-full bg-transparent" required>
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
                <select name="companySize" className="rounded px-3 py-2 pr-10 appearance-none w-full bg-transparent" required>
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
              <input name="location" className="rounded px-3 py-2" required />
            </label>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-medium normal-text">Usage Needs</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1">
              <span className="normal-text">Estimated Number of Users</span>
              <div className="relative">
                <select name="estimatedUsers" className="rounded px-3 py-2 pr-10 appearance-none w-full bg-transparent" required>
                  <option value="">Select…</option>
                  {estimatedUsers.map((v) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/60" aria-hidden="true" />
              </div>
            </label>
            <label className="flex flex-col gap-1 sm:col-span-2">
              <span className="normal-text">Expected Use Cases</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {expectedUseCases.map((v) => (
                  <label key={v} className="flex items-center gap-2 border rounded px-3 py-2 min-h-[44px]">
                    <input type="checkbox" name="expectedUseCases" value={v} className="h-5 w-5 shrink-0" />
                    <span className="normal-text">{v}</span>
                  </label>
                ))}
              </div>
            </label>
            <label className="flex flex-col gap-1">
              <span className="normal-text">Preferred Deployment</span>
              <div className="relative">
                <select name="preferredDeployment" className="rounded px-3 py-2 pr-10 appearance-none w-full bg-transparent" required>
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
                <select name="implementationTimeline" className="rounded px-3 py-2 pr-10 appearance-none w-full bg-transparent" required>
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
              <input name="budgetRange" className="rounded px-3 py-2 normal-text" placeholder="$X – $Y / month or year" required />
            </label>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-medium normal-text">Follow-Up Options</h2>
          <label className="flex items-start gap-3 py-2 min-h-[44px]">
            <input type="checkbox" name="wantsProposal" className="mt-0.5 h-5 w-5 shrink-0" />
            <span className="normal-text">Please send me an indicative pricing proposal</span>
          </label>
          <label className="flex items-start gap-3 py-2 min-h-[44px]">
            <input type="checkbox" name="wantsCall" className="mt-0.5 h-5 w-5 shrink-0" />
            <span className="normal-text">I would like to schedule a call to discuss pricing in detail</span>
          </label>
        </section>

        {error && <div className="text-red-600 normal-text">{error}</div>}
        {success && <div className="text-green-700 normal-text">Thanks! We'll send pricing details soon.</div>}

        <button type="submit" disabled={submitting} className="inline-flex items-center justify-center rounded bg-black px-4 py-2 text-white disabled:opacity-60">
          {submitting ? 'Submitting…' : 'Request Pricing'}
        </button>

        {integrationMode && <input type="hidden" name="integrationTest" value="true" />}
      </form>
    </div>
  )
}


