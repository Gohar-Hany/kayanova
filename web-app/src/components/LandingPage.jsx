import React, { useState, useEffect } from 'react'
import TransformModal from './TransformModal'

const LandingPage = ({ onStart, onTransformSuccess, onReturnHome }) => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 60)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('visible')
                    e.target.querySelectorAll('[data-target]').forEach(n => {
                        if (n._done) return
                        n._done = true
                        const max = +n.getAttribute('data-target')
                        let v = 0, step = Math.max(1, Math.ceil(max / 50))
                        const t = setInterval(() => {
                            v = Math.min(v + step, max)
                            n.textContent = v
                            if (v >= max) clearInterval(t)
                        }, 28)
                    })
                }
            })
        }, { threshold: 0.12 })

        document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
        
        return () => obs.disconnect()
    }, [])

    const handleStartClick = () => {
        setIsModalOpen(true)
    }

    const handleModalClose = () => {
        setIsModalOpen(false)
    }

    const handleSuccess = (data) => {
        setIsModalOpen(false)
        if (onTransformSuccess) {
            onTransformSuccess(data)
        }
    }

    const handleNavClick = (e) => {
        e.preventDefault()
        const targetId = e.currentTarget.getAttribute('href')
        const el = document.querySelector(targetId)
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }

    return (
        <div className="landing-page">
            {/* NAV */}
<nav className={`nav ${isScrolled ? "scrolled" : ""}`} id="navbar">
  <button className="nav-logo" onClick={onReturnHome} type="button" aria-label="Return to home">
    Kayanova
  </button>
  <div className="nav-links">
    <a className="nav-link" onClick={handleNavClick} href="#features">Features</a>
    <a className="nav-link" onClick={handleNavClick} href="#how-it-works">How It Works</a>
    <a className="nav-link" onClick={handleNavClick} href="#testimonials">Testimonials</a>
    <a className="nav-link" onClick={handleNavClick} href="#pricing">Pricing</a>
  </div>
  <div className="nav-right">
    <span className="badge-pill">Fully Automated</span>
    <button className="btn-nav" onClick={onStart} type="button">Enter Dashboard →</button>
  </div>
</nav>

{/* HERO */}
<section className="hero" id="home">
  <div className="orb orb1"></div><div className="orb orb2"></div><div className="orb orb3"></div>
  <div className="hero-inner">
    <div className="hero-badge">
      <span className="badge-dot"></span>
      A Fully Automated Marketing Agency
    </div>
    <h1 className="hero-title">
      Transform Your Business
      <span className="grad">in Minutes, Not Months</span>
    </h1>
    <p className="hero-sub">Kayanova delivers end-to-end marketing execution powered by AI — competitor analysis, strategy, and content creation, all on autopilot.</p>
    <button className="btn-hero" onClick={handleStartClick} type="button">
      <span>Start Transforming</span>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
    </button>
    <p className="hero-note">No credit card required • Fully automated in minutes</p>
  </div>
</section>

{/* STATS BAR */}
<div className="stats-bar" id="stats">
  <div className="stats-inner">
    <div className="stat-item reveal">
      <span className="stat-num-wrap"><span className="stat-num" data-target="500">0</span>+</span>
      <div className="stat-label">Businesses Transformed</div>
    </div>
    <div className="stat-item reveal reveal-d1">
      <span className="stat-num-wrap"><span className="stat-num" data-target="10">0</span>x</span>
      <div className="stat-label">Faster Execution</div>
    </div>
    <div className="stat-item reveal reveal-d2">
      <span className="stat-num-wrap"><span className="stat-num" data-target="98">0</span>%</span>
      <div className="stat-label">Automation Rate</div>
    </div>
    <div className="stat-item reveal reveal-d3">
      <span className="stat-num-wrap"><span className="stat-num" data-target="30">0</span></span>
      <div className="stat-label">Days to Results</div>
    </div>
  </div>
</div>

{/* HOW IT WORKS */}
<section className="section" id="how-it-works">
  <div className="container">
    <div className="section-head reveal">
      <div className="eyebrow">How It Works</div>
      <h2 className="section-title">From Zero to Fully Automated in 3 Steps</h2>
      <p className="section-sub">No technical skills needed. No agency fees. Just results.</p>
    </div>
    <div className="steps">
      <div className="step reveal">
        <div className="step-num">1</div>
        <h3 className="step-title">Connect Your Business</h3>
        <p className="step-desc">Enter your website URL and let our AI analyze your entire competitive landscape in seconds. We map your market instantly.</p>
      </div>
      <div className="step reveal reveal-d1">
        <div className="step-num">2</div>
        <h3 className="step-title">Get Your Strategy</h3>
        <p className="step-desc">Receive a complete marketing strategy, competitor analysis, and 30-day content plan tailored specifically to your business.</p>
      </div>
      <div className="step reveal reveal-d2">
        <div className="step-num">3</div>
        <h3 className="step-title">Watch It Execute</h3>
        <p className="step-desc">Sit back as Kayanova automatically executes campaigns, creates content, and continuously optimizes your performance.</p>
      </div>
    </div>
  </div>
</section>

{/* BENEFITS */}
<section className="section section-alt" id="benefits">
  <div className="container">
    <div className="section-head reveal">
      <div className="eyebrow">Why Kayanova</div>
      <h2 className="section-title">Why Choose Kayanova?</h2>
      <p className="section-sub">Built for founders and marketers who want results without the agency price tag.</p>
    </div>
    <div className="cards-grid">
      <div className="card card-center reveal">
        <div className="card-icon">
          <svg viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
        </div>
        <h3 className="card-title">Instant Execution</h3>
        <p className="card-desc">What takes marketing teams weeks, our AI delivers in minutes. Launch campaigns before your coffee gets cold.</p>
      </div>
      <div className="card card-center reveal reveal-d1">
        <div className="card-icon">
          <svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><circle cx="12" cy="10" r="3"/><path d="M12 7v1M12 12v1M9 10H8M15 10h1"/></svg>
        </div>
        <h3 className="card-title">Fully Automated</h3>
        <p className="card-desc">End-to-end marketing execution without the agency overhead. Everything runs on autopilot, 24/7.</p>
      </div>
      <div className="card card-center reveal reveal-d2">
        <div className="card-icon">
          <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/><path d="M16.24 7.76A6 6 0 0 1 8 16.9"/></svg>
        </div>
        <h3 className="card-title">Smart Growth</h3>
        <p className="card-desc">AI-driven strategies that scale with your business. Every decision backed by real competitive intelligence.</p>
      </div>
      <div className="card card-center reveal reveal-d3">
        <div className="card-icon">
          <svg viewBox="0 0 24 24"><path d="M5 3l14 9-14 9V3z"/><path d="M19 3v18"/></svg>
        </div>
        <h3 className="card-title">Always Evolving</h3>
        <p className="card-desc">Real-time optimization that keeps you ahead of competitors. Your strategy improves every single day.</p>
      </div>
    </div>
  </div>
</section>

{/* FEATURES */}
<section className="section" id="features">
  <div className="container">
    <div className="section-head reveal">
      <div className="eyebrow">The Suite</div>
      <h2 className="section-title">Your Automated Marketing Suite</h2>
      <p className="section-sub">Everything you need to transform and grow your business, fully automated and ready to deploy.</p>
    </div>
    <div className="features-grid">
      <div className="card reveal">
        <div className="card-icon">
          <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        </div>
        <h3 className="card-title">Competitor Analysis</h3>
        <p className="card-desc">AI-powered competitive intelligence delivered instantly. Know exactly what your rivals are doing and how to beat them.</p>
      </div>
      <div className="card reveal reveal-d1">
        <div className="card-icon">
          <svg viewBox="0 0 24 24"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>
        </div>
        <h3 className="card-title">Market Reports</h3>
        <p className="card-desc">Strategic insights that transform how you compete. Deep market analysis delivered in seconds, not weeks.</p>
      </div>
      <div className="card reveal reveal-d2">
        <div className="card-icon">
          <svg viewBox="0 0 24 24"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
        </div>
        <h3 className="card-title">Marketing Plans</h3>
        <p className="card-desc">End-to-end strategies automated for your growth. Full campaigns planned and ready to launch immediately.</p>
      </div>
      <div className="card reveal reveal-d3">
        <div className="card-icon">
          <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/></svg>
        </div>
        <h3 className="card-title">Content Calendar</h3>
        <p className="card-desc">30-day content plans executed on autopilot. Never run out of ideas or miss a posting schedule again.</p>
      </div>
      <div className="card reveal">
        <div className="card-icon">
          <svg viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
        </div>
        <h3 className="card-title">AI Copywriting</h3>
        <p className="card-desc">Generate high-converting ad copy, email sequences, and landing page content personalized to your brand voice.</p>
      </div>
      <div className="card reveal reveal-d1">
        <div className="card-icon">
          <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M11 8v3l2 2"/></svg>
        </div>
        <h3 className="card-title">SEO Strategy</h3>
        <p className="card-desc">Data-driven keyword research and content strategy that ranks your business above competitors on every search.</p>
      </div>
      <div className="card reveal reveal-d2">
        <div className="card-icon">
          <svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
        </div>
        <h3 className="card-title">Brand Voice Engine</h3>
        <p className="card-desc">Define your brand personality once and let AI maintain consistent tone across all content and channels.</p>
      </div>
      <div className="card reveal reveal-d3">
        <div className="card-icon">
          <svg viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
        </div>
        <h3 className="card-title">Performance Tracking</h3>
        <p className="card-desc">Real-time dashboards showing what's working and automated optimization suggestions to maximize your ROI.</p>
      </div>
    </div>
  </div>
</section>

{/* TESTIMONIALS */}
<section className="section section-alt" id="testimonials">
  <div className="container">
    <div className="section-head reveal">
      <div className="eyebrow">Social Proof</div>
      <h2 className="section-title">Trusted by Growing Businesses</h2>
      <p className="section-sub">Real results from real founders who automated their marketing with Kayanova.</p>
    </div>
    <div className="testimonials-grid">
      <div className="testi-card reveal">
        <div className="stars">
          <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        </div>
        <p className="testi-quote">"Kayanova replaced our entire content team. We went from 2 posts a week to a full 30-day calendar in minutes. ROI was visible in week one."</p>
        <div className="testi-author">
          <div className="avatar">SM</div>
          <div><div className="author-name">Sarah Mitchell</div><div className="author-role">CMO at TechVault</div></div>
        </div>
      </div>
      <div className="testi-card reveal reveal-d1">
        <div className="stars">
          <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        </div>
        <p className="testi-quote">"The competitor analysis alone is worth it. We spotted a gap our rivals missed and launched a campaign around it. 340% increase in qualified leads."</p>
        <div className="testi-author">
          <div className="avatar">JO</div>
          <div><div className="author-name">James Okafor</div><div className="author-role">Founder at Growlio</div></div>
        </div>
      </div>
      <div className="testi-card reveal reveal-d2">
        <div className="stars">
          <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        </div>
        <p className="testi-quote">"I was skeptical about full automation. Now I can't imagine doing marketing any other way. It's like having a senior strategist on call 24/7."</p>
        <div className="testi-author">
          <div className="avatar">PS</div>
          <div><div className="author-name">Priya Sharma</div><div className="author-role">Head of Growth at Stackify</div></div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* CTA */}
<section className="cta-section" id="pricing">
  <div className="cta-card reveal">
    <h2 className="cta-title">Ready to Automate Your Growth?</h2>
    <p className="cta-sub">Join businesses using Kayanova to execute marketing on autopilot. Start transforming today.</p>
    <button className="btn-hero" style={{opacity:1, animation:"none"}} onClick={handleStartClick} type="button">
      <span>Start Your Transformation</span>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
    </button>
  </div>
</section>

{/* FOOTER */}
<footer>
  <div className="footer-grid">
    <div>
      <div className="footer-logo">Kayanova</div>
      <p className="footer-tagline">The world's first fully automated marketing agency, powered by AI. Execute like an agency, move like a startup.</p>
    </div>
    <div>
      <div className="footer-col-title">Product</div>
      <div className="footer-links">
        <a className="footer-link" href="#features">Features</a>
        <a className="footer-link" href="#how-it-works">How It Works</a>
        <a className="footer-link" href="#pricing">Pricing</a>
        <a className="footer-link" href="#">FAQ</a>
      </div>
    </div>
    <div>
      <div className="footer-col-title">Company</div>
      <div className="footer-links">
        <a className="footer-link" href="#">About</a>
        <a className="footer-link" href="#">Blog</a>
        <a className="footer-link" href="#">Careers</a>
        <a className="footer-link" href="#">Contact</a>
      </div>
    </div>
    <div>
      <div className="footer-col-title">Legal</div>
      <div className="footer-links">
        <a className="footer-link" href="#">Privacy Policy</a>
        <a className="footer-link" href="#">Terms of Service</a>
        <a className="footer-link" href="#">Cookie Policy</a>
      </div>
    </div>
  </div>
  <div className="footer-bottom">
    <span className="footer-copy">© 2025 Kayanova. All rights reserved.</span>
    <span className="footer-copy">Built by Gohar</span>
  </div>
</footer>

            <TransformModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onSuccess={handleSuccess}
            />
        </div>
    )
}

export default LandingPage
