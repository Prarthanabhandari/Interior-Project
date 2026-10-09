import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './GetQuote.css'
import api from '../../services/api'

const STEPS = ['Your Details', 'Project Info', 'Budget & Timeline']

const GetQuote = () => {
  const navigate = useNavigate()
  const [step, setStep]   = useState(0)
  const [submitted, setSub] = useState(false)
  const [loading, setLoad]  = useState(false)
  const [form, setForm] = useState({
    client_name:'', email:'', phone:'', city:'',
    project_type:'', rooms:'', area:'',
    style:'', budget:'', timeline:'', message:''
  })

  const u = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const next = () => setStep(s => Math.min(s + 1, STEPS.length - 1))
  const prev = () => setStep(s => Math.max(s - 1, 0))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoad(true)
    try {
      await api.post('/inquiries', {
        client_name:  form.client_name,
        email:        form.email,
        phone:        form.phone,
        project_type: form.project_type,
        budget:       form.budget,
        message:      `Style: ${form.style} | Area: ${form.area} | Timeline: ${form.timeline} | Rooms: ${form.rooms} | City: ${form.city} | Note: ${form.message}`,
      })
    } catch {}
    setSub(true)
    setLoad(false)
  }

  const Field = ({ label, children }) => (
    <div className="q-field">
      <label>{label}</label>
      {children}
    </div>
  )

  return (
    <div className="quote-page">
      <nav className="quote-nav">
        <div className="nav-logo" onClick={() => navigate('/')}>Anita Interior</div>
        <button className="quote-nav-back" onClick={() => navigate(-1)}>← Back</button>
      </nav>

      <div className="quote-layout">
        {/* LEFT — info panel */}
        <div className="quote-left">
          <span className="quote-overline">Free Consultation</span>
          <h1 className="quote-left-title">Get Your<br /><em>Dream Space</em><br />Quoted Today</h1>
          <div className="quote-left-rule" />
          <p className="quote-left-desc">
            Fill in the details and our team will prepare a tailored proposal with estimated costs, timelines, and design concepts — within 48 hours.
          </p>
          <div className="quote-promises">
            {[
              { icon:'⚡', text:'Response within 48 hours' },
              { icon:'🎯', text:'100% personalised proposal' },
              { icon:'🔒', text:'Your details are private & secure' },
              { icon:'💰', text:'No hidden charges, ever' },
            ].map(p => (
              <div key={p.text} className="quote-promise-item">
                <span>{p.icon}</span><span>{p.text}</span>
              </div>
            ))}
          </div>
          <div className="quote-contact-hint">
            <p>Prefer to call?</p>
            <a href="tel:+919876543210" className="quote-phone">+91 98765 43210</a>
          </div>
        </div>

        {/* RIGHT — multi-step form */}
        <div className="quote-right">
          {submitted ? (
            <div className="quote-success">
              <div className="qs-icon">✓</div>
              <h2>Quote Request Submitted!</h2>
              <p>Thank you, {form.client_name}. Anita will personally review your requirements and send you a detailed proposal within 48 hours.</p>
              <p className="qs-check">Check your email: <strong>{form.email}</strong></p>
              <button className="btn-gold-quote" onClick={() => navigate('/')}>← Back to Website</button>
            </div>
          ) : (
            <>
              {/* Step indicators */}
              <div className="quote-steps">
                {STEPS.map((s, i) => (
                  <div key={s} className={`q-step ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`}>
                    <div className="q-step-num">{i < step ? '✓' : i + 1}</div>
                    <span>{s}</span>
                  </div>
                ))}
              </div>

              <form onSubmit={step === STEPS.length - 1 ? handleSubmit : (e) => { e.preventDefault(); next() }}>

                {/* STEP 0 — Your Details */}
                {step === 0 && (
                  <div className="q-step-content">
                    <h2 className="q-step-title">Tell Us About Yourself</h2>
                    <div className="q-grid-2">
                      <Field label="Full Name *">
                        <input type="text" value={form.client_name} onChange={e=>u('client_name',e.target.value)} placeholder="Your full name" required />
                      </Field>
                      <Field label="Email Address *">
                        <input type="email" value={form.email} onChange={e=>u('email',e.target.value)} placeholder="your@email.com" required />
                      </Field>
                      <Field label="Phone Number *">
                        <input type="tel" value={form.phone} onChange={e=>u('phone',e.target.value)} placeholder="+91 98765 43210" required />
                      </Field>
                      <Field label="City">
                        <input type="text" value={form.city} onChange={e=>u('city',e.target.value)} placeholder="Mumbai, Pune..." />
                      </Field>
                    </div>
                  </div>
                )}

                {/* STEP 1 — Project Info */}
                {step === 1 && (
                  <div className="q-step-content">
                    <h2 className="q-step-title">Tell Us About Your Project</h2>
                    <div className="q-grid-2">
                      <Field label="Project Type *">
                        <select value={form.project_type} onChange={e=>u('project_type',e.target.value)} required>
                          <option value="">Select type</option>
                          <option>Full Home Design</option>
                          <option>Living Room</option>
                          <option>Bedroom Design</option>
                          <option>Modular Kitchen</option>
                          <option>Office Interiors</option>
                          <option>Bathroom Design</option>
                          <option>3D Visualization Only</option>
                        </select>
                      </Field>
                      <Field label="Number of Rooms">
                        <select value={form.rooms} onChange={e=>u('rooms',e.target.value)}>
                          <option value="">Select</option>
                          <option>1 Room</option><option>2 Rooms</option>
                          <option>3 Rooms</option><option>4+ Rooms</option>
                          <option>Full Home</option>
                        </select>
                      </Field>
                      <Field label="Approximate Area">
                        <select value={form.area} onChange={e=>u('area',e.target.value)}>
                          <option value="">Select area</option>
                          <option>Under 500 sq. ft.</option>
                          <option>500 – 1000 sq. ft.</option>
                          <option>1000 – 2000 sq. ft.</option>
                          <option>2000 – 4000 sq. ft.</option>
                          <option>Above 4000 sq. ft.</option>
                        </select>
                      </Field>
                      <Field label="Preferred Style">
                        <select value={form.style} onChange={e=>u('style',e.target.value)}>
                          <option value="">Select style</option>
                          <option>Modern Luxury</option>
                          <option>Minimalist</option>
                          <option>Classic / Traditional</option>
                          <option>Japandi / Wabi-Sabi</option>
                          <option>Industrial Chic</option>
                          <option>Eclectic / Bohemian</option>
                          <option>Not Sure — Need Guidance</option>
                        </select>
                      </Field>
                    </div>
                  </div>
                )}

                {/* STEP 2 — Budget & Timeline */}
                {step === 2 && (
                  <div className="q-step-content">
                    <h2 className="q-step-title">Budget & Timeline</h2>
                    <div className="q-grid-2">
                      <Field label="Budget Range *">
                        <select value={form.budget} onChange={e=>u('budget',e.target.value)} required>
                          <option value="">Select budget</option>
                          <option>Under ₹2 Lakhs</option>
                          <option>₹2 – 5 Lakhs</option>
                          <option>₹5 – 10 Lakhs</option>
                          <option>₹10 – 20 Lakhs</option>
                          <option>₹20 – 50 Lakhs</option>
                          <option>Above ₹50 Lakhs</option>
                        </select>
                      </Field>
                      <Field label="Desired Timeline">
                        <select value={form.timeline} onChange={e=>u('timeline',e.target.value)}>
                          <option value="">Select timeline</option>
                          <option>ASAP — Within 1 Month</option>
                          <option>1 – 3 Months</option>
                          <option>3 – 6 Months</option>
                          <option>6+ Months</option>
                          <option>Flexible</option>
                        </select>
                      </Field>
                    </div>
                    <Field label="Additional Notes or Specific Requirements">
                      <textarea
                        rows={4}
                        value={form.message}
                        onChange={e=>u('message',e.target.value)}
                        placeholder="Any specific ideas, inspirations, or requirements you want us to know about..."
                      />
                    </Field>
                  </div>
                )}

                {/* Navigation buttons */}
                <div className="q-nav-btns">
                  {step > 0 && (
                    <button type="button" className="q-btn-prev" onClick={prev}>← Previous</button>
                  )}
                  <button type="submit" className="btn-gold-quote" disabled={loading}>
                    {loading ? 'Submitting…' : step === STEPS.length - 1 ? 'Submit Quote Request →' : 'Next Step →'}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default GetQuote