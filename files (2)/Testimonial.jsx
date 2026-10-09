import React, { useState } from 'react'
import './Testimonial.css'

const testimonials = [
  {
    id: 1,
    quote: "Anita transformed our home into a masterpiece. Every detail was thoughtfully considered — we absolutely love the results!",
    author: "Sarah M.",
    location: "Mumbai",
    rating: 5,
  },
  {
    id: 2,
    quote: "The modular kitchen she designed is both stunning and incredibly functional. Best investment we've made in our home.",
    author: "Rohan & Priya K.",
    location: "Pune",
    rating: 5,
  },
  {
    id: 3,
    quote: "Professional, creative, and delivered on time. Our office now feels like a space that truly represents our brand.",
    author: "Deepak S.",
    location: "Bangalore",
    rating: 5,
  },
]

const Testimonial = () => {
  const [active, setActive] = useState(0)
  const t = testimonials[active]

  return (
    <section className="testimonial">
      <div className="section-header">
        <span className="overline">Client Stories</span>
        <h2>What They Say</h2>
      </div>

      <div className="testimonial-body">
        <div className="stars">
          {'★'.repeat(t.rating)}
        </div>
        <blockquote className="testimonial-quote">
          {t.quote}
        </blockquote>
        <div className="testimonial-author">
          <span className="author-name">— {t.author}</span>
          <span className="author-location">{t.location}</span>
        </div>
      </div>

      <div className="testimonial-dots">
        {testimonials.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === active ? 'active' : ''}`}
            onClick={() => setActive(i)}
            aria-label={`Testimonial ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

export default Testimonial
