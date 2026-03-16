import { useState, useEffect, useRef } from 'react'
import TransformModal from './TransformModal'
import {
    BoltIcon,
    ChatBotIcon,
    TargetIcon,
    RocketIcon,
    SearchIcon,
    BarChartIcon,
    TrendingUpIcon,
    CalendarIcon,
    ArrowRightIcon,
} from './Icons'

/* ── Scroll-reveal hook (Intersection Observer) ── */
function useScrollReveal(threshold = 0.12) {
    const ref = useRef(null)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add('landing-revealed')
                    observer.unobserve(el)
                }
            },
            { threshold }
        )

        observer.observe(el)
        return () => observer.disconnect()
    }, [threshold])

    return ref
}

function LandingPage({ onStart, onTransformSuccess }) {
    const [isHovered, setIsHovered] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    /* scroll-reveal refs */
    const benefitsRef = useScrollReveal()
    const featuresRef = useScrollReveal()
    const ctaRef = useScrollReveal()

    const handleStartClick = () => {
        setIsModalOpen(true)
    }

    const handleModalClose = () => {
        setIsModalOpen(false)
    }

    const handleTransformSuccess = (data) => {
        setIsModalOpen(false)
        onTransformSuccess(data)
    }

    const benefits = [
        {
            icon: <BoltIcon size={28} />,
            title: 'Instant Execution',
            description: 'What takes marketing teams weeks, our AI delivers in minutes'
        },
        {
            icon: <ChatBotIcon size={28} />,
            title: 'Fully Automated',
            description: 'End-to-end marketing execution without the agency overhead'
        },
        {
            icon: <TargetIcon size={28} />,
            title: 'Smart Growth',
            description: 'AI-driven strategies that scale with your business'
        },
        {
            icon: <RocketIcon size={28} />,
            title: 'Always Evolving',
            description: 'Real-time optimization that keeps you ahead of competitors'
        }
    ]

    const features = [
        {
            icon: <SearchIcon size={28} />,
            title: 'Competitor Analysis',
            description: 'AI-powered competitive intelligence delivered instantly'
        },
        {
            icon: <BarChartIcon size={28} />,
            title: 'Market Reports',
            description: 'Strategic insights that transform how you compete'
        },
        {
            icon: <TrendingUpIcon size={28} />,
            title: 'Marketing Plans',
            description: 'End-to-end strategies automated for your growth'
        },
        {
            icon: <CalendarIcon size={28} />,
            title: 'Content Calendar',
            description: '30-day content plans executed on autopilot'
        }
    ]

    return (
        <div className="landing-page">
            {/* Hero Section — full-width background */}
            <section className="landing-hero">
                {/* Floating ambient orbs */}
                <div className="hero-orb hero-orb--1" aria-hidden="true" />
                <div className="hero-orb hero-orb--2" aria-hidden="true" />
                <div className="hero-orb hero-orb--3" aria-hidden="true" />

                <div className="landing-container">
                    <div className="hero-badge hero-stagger" style={{ '--stagger': 0 }}>
                        <span className="badge-icon"><ChatBotIcon size={16} /></span>
                        A Fully Automated Marketing Agency
                    </div>
                    <h1 className="landing-title hero-stagger" style={{ '--stagger': 1 }}>
                        Transform Your Business
                        <span className="title-gradient"> in Minutes, Not Months</span>
                    </h1>
                    <p className="landing-subtitle hero-stagger" style={{ '--stagger': 2 }}>
                        Kayanova delivers end-to-end marketing execution powered by AI —
                        competitor analysis, strategy, and content creation, all on autopilot.
                    </p>
                    <button
                        className="btn btn-primary btn-hero hero-stagger"
                        onClick={handleStartClick}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        style={{ '--stagger': 3 }}
                    >
                        <span className="btn-text">Start Transforming</span>
                        <span className={`btn-arrow ${isHovered ? 'animate' : ''}`}>
                            <ArrowRightIcon size={18} />
                        </span>
                    </button>
                    <p className="hero-note hero-stagger" style={{ '--stagger': 4 }}>No credit card required • Fully automated in minutes</p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="landing-benefits landing-reveal" ref={benefitsRef}>
                <div className="landing-container">
                    <h2 className="section-title">Why Choose Kayanova?</h2>
                    <div className="benefits-grid">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="benefit-card" style={{ '--stagger-index': index }}>
                                <div className="benefit-icon">{benefit.icon}</div>
                                <h3 className="benefit-title">{benefit.title}</h3>
                                <p className="benefit-description">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="landing-features landing-reveal" ref={featuresRef}>
                <div className="landing-container">
                    <h2 className="section-title">Your Automated Marketing Suite</h2>
                    <p className="section-subtitle">
                        Everything you need to transform and grow your business, fully automated
                    </p>
                    <div className="features-grid">
                        {features.map((feature, index) => (
                            <div key={index} className="feature-card" style={{ '--stagger-index': index }}>
                                <div className="feature-icon">{feature.icon}</div>
                                <h3 className="feature-title">{feature.title}</h3>
                                <p className="feature-description">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="landing-cta landing-reveal" ref={ctaRef}>
                <div className="landing-container">
                    <div className="cta-content">
                        <h2 className="cta-title">Ready to Automate Your Growth?</h2>
                        <p className="cta-subtitle">
                            Join businesses using Kayanova to execute marketing on autopilot
                        </p>
                        <button className="btn btn-primary btn-cta" onClick={handleStartClick}>
                            Start Your Transformation
                        </button>
                    </div>
                </div>
            </section>

            {/* Transform Modal */}
            <TransformModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onSuccess={handleTransformSuccess}
            />
        </div>
    )
}

export default LandingPage
