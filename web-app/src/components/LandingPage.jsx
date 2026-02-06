import { useState } from 'react'
import TransformModal from './TransformModal'

function LandingPage({ onStart, onTransformSuccess }) {
    const [isHovered, setIsHovered] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

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
            icon: '⚡',
            title: 'Instant Execution',
            description: 'What takes marketing teams weeks, our AI delivers in minutes'
        },
        {
            icon: '🤖',
            title: 'Fully Automated',
            description: 'End-to-end marketing execution without the agency overhead'
        },
        {
            icon: '🎯',
            title: 'Smart Growth',
            description: 'AI-driven strategies that scale with your business'
        },
        {
            icon: '🚀',
            title: 'Always Evolving',
            description: 'Real-time optimization that keeps you ahead of competitors'
        }
    ]

    const features = [
        {
            icon: '🔍',
            title: 'Competitor Analysis',
            description: 'AI-powered competitive intelligence delivered instantly'
        },
        {
            icon: '📊',
            title: 'Market Reports',
            description: 'Strategic insights that transform how you compete'
        },
        {
            icon: '📈',
            title: 'Marketing Plans',
            description: 'End-to-end strategies automated for your growth'
        },
        {
            icon: '📅',
            title: 'Content Calendar',
            description: '30-day content plans executed on autopilot'
        }
    ]

    return (
        <div className="landing-page">
            {/* Hero Section */}
            <section className="landing-hero">
                <div className="hero-badge">
                    <span className="badge-icon">🤖</span>
                    A Fully Automated Marketing Agency
                </div>
                <h1 className="landing-title">
                    Transform Your Business
                    <span className="title-gradient"> in Minutes, Not Months</span>
                </h1>
                <p className="landing-subtitle">
                    Kayanova delivers end-to-end marketing execution powered by AI —
                    competitor analysis, strategy, and content creation, all on autopilot.
                </p>
                <button
                    className="btn btn-primary btn-hero"
                    onClick={handleStartClick}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <span className="btn-text">Start Transforming</span>
                    <span className={`btn-arrow ${isHovered ? 'animate' : ''}`}>→</span>
                </button>
                <p className="hero-note">No credit card required • Fully automated in minutes</p>
            </section>

            {/* Benefits Section */}
            <section className="landing-benefits">
                <h2 className="section-title">Why Choose Kayanova?</h2>
                <div className="benefits-grid">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="benefit-card">
                            <div className="benefit-icon">{benefit.icon}</div>
                            <h3 className="benefit-title">{benefit.title}</h3>
                            <p className="benefit-description">{benefit.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features Section */}
            <section className="landing-features">
                <h2 className="section-title">Your Automated Marketing Suite</h2>
                <p className="section-subtitle">
                    Everything you need to transform and grow your business, fully automated
                </p>
                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div key={index} className="feature-card">
                            <div className="feature-icon">{feature.icon}</div>
                            <h3 className="feature-title">{feature.title}</h3>
                            <p className="feature-description">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="landing-cta">
                <div className="cta-content">
                    <h2 className="cta-title">Ready to Automate Your Growth?</h2>
                    <p className="cta-subtitle">
                        Join businesses using Kayanova to execute marketing on autopilot
                    </p>
                    <button className="btn btn-primary btn-cta" onClick={handleStartClick}>
                        Start Your Transformation
                    </button>
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
