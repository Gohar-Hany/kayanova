import { useState } from 'react'

function AdCopyPage({ onBack }) {
    const [showResults, setShowResults] = useState(true)
    const [selectedType, setSelectedType] = useState('facebook')

    // Static ad copy data
    const adCopySets = {
        facebook: {
            platform: 'Facebook / Instagram',
            icon: '📘',
            ads: [
                {
                    headline: 'Stop Managing Marketing. Start Commanding It.',
                    primaryText: '🚀 What if your entire marketing ran on autopilot?\n\nKayanova\'s AI-powered platform handles everything — from strategy to execution — while you focus on growing your business.\n\n✅ AI-generated campaigns\n✅ Automated content creation\n✅ Real-time optimization\n\nJoin 1,000+ businesses already saving 20+ hours per week.',
                    cta: 'Get Started Free',
                    description: 'The fully automated marketing agency. Try free today.'
                },
                {
                    headline: 'Your Marketing Team Just Got a Major Upgrade',
                    primaryText: 'Imagine having a marketing team that:\n\n• Never sleeps\n• Never takes breaks\n• Delivers perfect work every time\n\nThat\'s Kayanova. Our AI handles your marketing strategy, content, and campaigns — automatically.\n\n🎯 150 credits free. No credit card required.',
                    cta: 'Try It Free',
                    description: 'AI-powered marketing that runs 24/7'
                }
            ]
        },
        google: {
            platform: 'Google Ads',
            icon: '🔍',
            ads: [
                {
                    headlines: ['AI Marketing Automation', 'Save 20+ Hours Weekly', 'Try Free Today'],
                    descriptions: [
                        'Fully automated marketing platform. Strategy to execution, powered by AI. Start free.',
                        'Let AI handle your marketing. Campaigns, content, analytics — all automated. 1000+ businesses trust us.'
                    ]
                },
                {
                    headlines: ['Marketing On Autopilot', 'AI-Powered Campaigns', 'No Marketing Team Needed'],
                    descriptions: [
                        'The marketing agency that runs itself. AI-generated strategies, automated execution.',
                        'From competitor analysis to content calendar — all automated. Start your free trial now.'
                    ]
                }
            ]
        },
        linkedin: {
            platform: 'LinkedIn',
            icon: '💼',
            ads: [
                {
                    headline: 'What If Marketing Just... Happened?',
                    primaryText: 'For Marketing Directors tired of:\n\n❌ Managing multiple tools\n❌ Waiting days for deliverables\n❌ Juggling agencies and freelancers\n\nThere\'s Kayanova — the first fully automated marketing operating system.\n\nOur AI handles everything from strategy development to campaign execution. Just tell it what you need.\n\n→ Used by 1,000+ B2B companies\n→ Average 20+ hours saved per week\n→ 3x faster time-to-launch',
                    cta: 'Request Demo',
                    description: 'AI-powered marketing automation for B2B teams'
                }
            ]
        }
    }

    const currentAds = adCopySets[selectedType]

    return (
        <div className="generator-page">
            <div className="generator-header-section">
                <div className="generator-title-row">
                    <h1>✍️ Ad Copy Machine</h1>
                    <span className="generator-badge active">Active</span>
                </div>
                <p className="generator-description">
                    Generate high-converting ad copy for any platform.
                </p>
            </div>

            {showResults && (
                <div className="generator-results">
                    <div className="results-header">
                        <h2>Generated Ad Copy</h2>
                        <div className="results-actions">
                            <button className="btn btn-secondary">Regenerate</button>
                            <button className="btn btn-primary">Copy All</button>
                        </div>
                    </div>

                    <div className="platform-tabs">
                        {Object.entries(adCopySets).map(([key, value]) => (
                            <button
                                key={key}
                                className={`platform-tab ${selectedType === key ? 'active' : ''}`}
                                onClick={() => setSelectedType(key)}
                            >
                                <span>{value.icon}</span>
                                <span>{value.platform}</span>
                            </button>
                        ))}
                    </div>

                    <div className="ad-copies-grid">
                        {selectedType === 'google' ? (
                            currentAds.ads.map((ad, i) => (
                                <div key={i} className="ad-copy-card google-ad">
                                    <div className="ad-label">Google Search Ad #{i + 1}</div>
                                    <div className="google-headlines">
                                        {ad.headlines.map((h, j) => (
                                            <span key={j} className="google-headline">{h}</span>
                                        ))}
                                    </div>
                                    <div className="google-descriptions">
                                        {ad.descriptions.map((d, j) => (
                                            <p key={j}>{d}</p>
                                        ))}
                                    </div>
                                    <button className="copy-btn">Copy</button>
                                </div>
                            ))
                        ) : (
                            currentAds.ads.map((ad, i) => (
                                <div key={i} className="ad-copy-card">
                                    <div className="ad-label">{currentAds.platform} Ad #{i + 1}</div>
                                    <div className="ad-headline">{ad.headline}</div>
                                    <div className="ad-primary-text">{ad.primaryText}</div>
                                    <div className="ad-footer">
                                        <span className="ad-description">{ad.description}</span>
                                        <span className="ad-cta">{ad.cta}</span>
                                    </div>
                                    <button className="copy-btn">Copy</button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdCopyPage
