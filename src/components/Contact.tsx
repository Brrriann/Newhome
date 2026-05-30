'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CONTACT_EMAIL, WEB3FORMS_KEY } from '@/lib/constants'

type FormState = 'idle' | 'submitting' | 'success' | 'error'
type FormData = { name: string; email: string; message: string }
type FormErrors = Partial<FormData>

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {}
  if (!data.name || data.name.trim().length < 2) errors.name = 'Name must be at least 2 characters'
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Enter a valid email address'
  if (!data.message || data.message.trim().length < 5) errors.message = 'Message must be at least 5 characters'
  return errors
}

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [form, setForm] = useState<FormData>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [state, setState] = useState<FormState>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setState('submitting')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New inquiry from ${form.name} — Magnate Korea`,
          from_name: form.name,
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setState('success')
        setForm({ name: '', email: '', message: '' })
      } else {
        setState('error')
      }
    } catch {
      setState('error')
    }
  }

  const fieldClass = (field: keyof FormErrors) =>
    `w-full bg-black border rounded-lg px-4 py-3 text-white placeholder-[#555555] focus:outline-none transition-colors duration-200 ${
      errors[field] ? 'border-red-500/60 focus:border-red-500' : 'border-white/10 focus:border-accent'
    }`

  return (
    <section id="contact" className="bg-[#0A0A0A] section-padding scroll-mt-20">
      <div className="container-app">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-syne font-semibold text-white text-3xl sm:text-4xl md:text-5xl mb-4 break-words">
            Let&apos;s Work Together
          </h2>
          <p className="font-inter text-[#888888] text-lg">Tell us about your project</p>
        </motion.div>

        <form onSubmit={handleSubmit} className="max-w-xl mx-auto flex flex-col gap-6" noValidate>
          <div>
            <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} className={fieldClass('name')} />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
          </div>
          <div>
            <input type="email" name="email" placeholder="your@email.com" value={form.email} onChange={handleChange} className={fieldClass('email')} />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <textarea name="message" placeholder="Tell us about your project..." rows={6} value={form.message} onChange={handleChange} className={fieldClass('message')} />
            {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
          </div>

          <button type="submit" data-cursor disabled={state === 'submitting' || state === 'success'}
            className="w-full bg-accent text-black font-semibold py-4 rounded-lg hover:bg-[#00ccb4] disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2">
            {state === 'submitting' ? (
              <span className="animate-spin rounded-full h-5 w-5 border-2 border-black border-t-transparent" />
            ) : 'Send Message'}
          </button>

          {state === 'success' && (
            <p className="text-green-400 text-center text-sm">Thank you! We&apos;ll be in touch.</p>
          )}
          {state === 'error' && (
            <p className="text-red-400 text-center text-sm">
              Something went wrong. Please email us directly at{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="underline hover:text-white">{CONTACT_EMAIL}</a>
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
