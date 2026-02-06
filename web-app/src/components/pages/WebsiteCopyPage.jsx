import { useState } from 'react'

function WebsiteCopyPage({ onBack }) {
    const [showResults, setShowResults] = useState(true)

    // Static website copy data
    const websiteCopy = {
        hero: {
            headline: 'A Fully Automated Marketing Agency',
            subheadline: 'Stop managing marketing. Start commanding it. Kayanova\'s AI handles everything from strategy to execution.',
            cta: 'Try Free — No Credit Card Required',
            supportText: 'Trusted by 1,000+ growing businesses'
        },
        features: [
            {
                title: 'AI-Powered Strategy',
                description: 'Get data-driven marketing strategies in minutes, not weeks. Our AI analyzes your market, competitors, and audience to create winning plans.',
                icon: '🎯'
            },
            {
                title: 'Automated Execution',
                description: 'Campaigns that run themselves. From content creation to publishing, our system handles the heavy lifting 24/7.',
                icon: '⚡'
            },
            {
                title: 'Intelligent Optimization',
                description: 'Continuous A/B testing and optimization powered by machine learning. Your marketing gets smarter every day.',
                icon: '📈'
            }
        ],
        benefits: [
            { metric: '20+ Hours', label: 'Saved per week on average' },
            { metric: '3x Faster', label: 'Time to market' },
            { metric: '40%', label: 'Lower marketing costs' }
        ],
        sections: [
            {
                type: 'Problem-Solution',
                headline: 'Marketing Shouldn\'t Be This Hard',
                body: `Your to-do list is endless:

• Managing multiple tools that don't talk to each other
• Creating content that takes forever to produce
• Juggling agencies, freelancers, and in-house teams
• Trying to prove ROI with fragmented data

**There's a better way.**

Kayanova unifies everything into one intelligent system. Your entire marketing operation — from strategy to execution — runs on autopilot while you focus on growth.`
            },
            {
                type: 'How It Works',
                headline: 'Three Steps to Automated Marketing',
                steps: [
                    { number: '1', title: 'Connect', description: 'Link your brand assets, data sources, and marketing channels in minutes.' },
                    { number: '2', title: 'Command', description: 'Tell our AI what you need — a campaign, content calendar, or competitor analysis.' },
                    { number: '3', title: 'Scale', description: 'Watch your marketing run 24/7 while you focus on what matters most.' }
                ]
            },
            {
                type: 'Social Proof',
                headline: 'Trusted by Marketing Leaders',
                testimonial: {
                    quote: 'Kayanova replaced our entire marketing stack. What used to take my team a week now takes minutes. It\'s like having a 10-person marketing team working around the clock.',
                    author: 'Sarah Chen',
                    role: 'VP Marketing, TechScale Inc.',
                    result: 'Reduced marketing spend by 35% while increasing output 4x'
                }
            }
        ],
        cta: {
            headline: 'Ready to Transform Your Marketing?',
            subheadline: 'Join 1,000+ businesses running their marketing on autopilot.',
            buttonText: 'Start Free Trial',
            features: ['No credit card required', '14-day free trial', 'Cancel anytime']
        }
    }

    return (
        <div className="generator-page">
            <div className="generator-header-section">
                <div className="generator-title-row">
                    <h1>🌐 Website Copy</h1>
                    <span className="generator-badge active">Active</span>
                </div>
                <p className="generator-description">
                    Generate compelling website copy that converts visitors into customers.
                </p>
            </div>

            {showResults && (
                <div className="generator-results">
                    <div className="results-header">
                        <h2>Generated Website Copy</h2>
                        <div className="results-actions">
                            <button className="btn btn-secondary">Regenerate</button>
                            <button className="btn btn-primary">Export All</button>
                        </div>
                    </div>

                    {/* Hero Section */}
                    <div className="copy-section">
                        <div className="section-label">Hero Section</div>
                        <div className="copy-card hero-copy">
                            <h3>{websiteCopy.hero.headline}</h3>
                            <p className="subheadline">{websiteCopy.hero.subheadline}</p>
                            <button className="preview-cta">{websiteCopy.hero.cta}</button>
                            <span className="support-text">{websiteCopy.hero.supportText}</span>
                            <button className="copy-btn">Copy Section</button>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="copy-section">
                        <div className="section-label">Features Section</div>
                        <div className="features-copy-grid">
                            {websiteCopy.features.map((feature, i) => (
                                <div key={i} className="feature-copy-card">
                                    <span className="feature-icon">{feature.icon}</span>
                                    <h4>{feature.title}</h4>
                                    <p>{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Benefits */}
                    <div className="copy-section">
                        <div className="section-label">Benefits/Stats Section</div>
                        <div className="benefits-copy-grid">
                            {websiteCopy.benefits.map((benefit, i) => (
                                <div key={i} className="benefit-copy-card">
                                    <span className="benefit-metric">{benefit.metric}</span>
                                    <span className="benefit-label">{benefit.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Content Sections */}
                    {websiteCopy.sections.map((section, i) => (
                        <div key={i} className="copy-section">
                            <div className="section-label">{section.type}</div>
                            <div className="copy-card">
                                <h3>{section.headline}</h3>
                                {section.body && <pre className="section-body">{section.body}</pre>}
                                {section.steps && (
                                    <div className="steps-grid">
                                        {section.steps.map((step, j) => (
                                            <div key={j} className="step-item">
                                                <span className="step-number">{step.number}</span>
                                                <h4>{step.title}</h4>
                                                <p>{step.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {section.testimonial && (
                                    <div className="testimonial-copy">
                                        <blockquote>"{section.testimonial.quote}"</blockquote>
                                        <div className="testimonial-author">
                                            <strong>{section.testimonial.author}</strong>
                                            <span>{section.testimonial.role}</span>
                                        </div>
                                        <div className="testimonial-result">📈 {section.testimonial.result}</div>
                                    </div>
                                )}
                                <button className="copy-btn">Copy Section</button>
                            </div>
                        </div>
                    ))}

                    {/* Final CTA */}
                    <div className="copy-section">
                        <div className="section-label">Final CTA Section</div>
                        <div className="copy-card cta-copy">
                            <h3>{websiteCopy.cta.headline}</h3>
                            <p>{websiteCopy.cta.subheadline}</p>
                            <button className="preview-cta">{websiteCopy.cta.buttonText}</button>
                            <div className="cta-features">
                                {websiteCopy.cta.features.map((f, i) => (
                                    <span key={i}>✓ {f}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default WebsiteCopyPage
