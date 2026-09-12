import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '@/components/shared/PageHero';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import { brand } from '@/data/navigation';

export default function Contact() {
  const [name, setName] = useState('');
  const [business, setBusiness] = useState('');
  const [email, setEmail] = useState('');
  const [goal, setGoal] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    document.title = 'Contact — Sprynt40';
  }, []);

  function onSubmit(e) {
    e.preventDefault();
    const subject = `Sprynt40 — ${business || 'New enquiry'}`;
    const body = `Name: ${name}\nBusiness: ${business}\nEmail: ${email}\nGoal: ${goal}\n\nMessage:\n${message}`;
    window.location.href = `mailto:${brand.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={<>Bring one<br /><span className="muted">business goal.</span></>}
        lead="Share the product, current channels and target number. We'll map the fastest honest path before recommending a single service."
      />

      <section id="contactForm" className="no-pt">
        <Reveal>
          <form className="contact-form" onSubmit={onSubmit}>
            <div className="field">
              <label htmlFor="name">Name</label>
              <input id="name" value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div className="field">
              <label htmlFor="biz">Business name</label>
              <input id="biz" value={business} onChange={e => setBusiness(e.target.value)} required />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="field">
              <label htmlFor="goal">Goal</label>
              <select id="goal" value={goal} onChange={e => setGoal(e.target.value)} required>
                <option value="">Pick the closest match…</option>
                <option>More qualified leads</option>
                <option>A website that actually converts</option>
                <option>Better visibility / SEO</option>
                <option>Paid ads that pay for themselves</option>
                <option>A connected system across everything</option>
                <option>Not sure yet — need the audit</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="msg">Message</label>
              <textarea id="msg" value={message} onChange={e => setMessage(e.target.value)} required />
            </div>
            <div>
              <button type="submit" className="btn primary">Send it over ↗</button>
            </div>
          </form>
          <div className="contact-alt">
            <div className="col">
              <h4>Email us directly</h4>
              <a href={`mailto:${brand.email}`}>{brand.email}</a>
            </div>
            <div className="col">
              <h4>Prefer an audit first?</h4>
              <Link to="/growth-audit" style={{ color: 'var(--o)' }}>Request a free growth audit →</Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
