import { SearchIcon, BarChartIcon, TrendingUpIcon, CalendarIcon } from './Icons'

function ServicesPage({ userData, onBack, onServiceSelect }) {
    const services = [
        {
            id: 'competitor',
            icon: <SearchIcon size={28} />,
            title: 'Competitor Analysis',
            description: 'AI-powered competitive intelligence — understand rivals\' strategies, audiences, and positioning automatically',
            color: '#7c3aed',
            features: ['Services breakdown', 'Target audience insights', 'USP evaluation', 'Content style analysis']
        },
        {
            id: 'report',
            icon: <BarChartIcon size={28} />,
            title: 'Market & Competitive Report',
            description: 'Strategic market analysis with vision, competitive matrix, and 90-day roadmap — generated instantly',
            color: '#ec4899',
            features: ['Strategic vision', 'Market gap analysis', 'Technical & marketing moat', 'ROI engineering']
        },
        {
            id: 'marketing',
            icon: <TrendingUpIcon size={28} />,
            title: 'Marketing Plan',
            description: 'Complete marketing strategy with funnel tactics and budget allocation — ready for execution',
            color: '#10b981',
            features: ['Strategy core vision', 'ICP deep dive', 'Funnel tactics', 'Competitor attack plan']
        },
        {
            id: 'calendar',
            icon: <CalendarIcon size={28} />,
            title: 'Content Calendar',
            description: '30-day content schedule with platform-specific posts, hooks, and captions — fully automated',
            color: '#f59e0b',
            features: ['30-day content plan', 'Platform targeting', 'Hooks & captions', 'Visual direction']
        }
    ]

    return (
        <div className="services-page">
            {/* Progress Indicator */}
            <div className="progress-steps">
                <div className="step completed">
                    <div className="step-number">✓</div>
                    <span className="step-label">Your Business</span>
                </div>
                <div className="step-line completed"></div>
                <div className="step active">
                    <div className="step-number">2</div>
                    <span className="step-label">Choose Services</span>
                </div>
                <div className="step-line"></div>
                <div className="step">
                    <div className="step-number">3</div>
                    <span className="step-label">Get Results</span>
                </div>
            </div>

            <div className="services-header">
                <button className="back-btn" onClick={onBack}>
                    ← Back
                </button>
                <div className="services-header-content">
                    <h1 className="services-title">Choose Your Service</h1>
                    <p className="services-subtitle">
                        Select a service to automate — each opens in a dedicated page for execution.
                    </p>
                </div>
            </div>

            {userData?.url && (
                <div className="user-context">
                    <span className="context-label">Analyzing:</span>
                    <span className="context-value">{userData.url}</span>
                </div>
            )}

            <div className="services-grid-cards">
                {services.map((service) => (
                    <div
                        key={service.id}
                        className="service-card-full"
                        onClick={() => onServiceSelect(service.id)}
                        style={{ '--service-color': service.color }}
                    >
                        <div className="service-card-header">
                            <div className="service-icon-large">{service.icon}</div>
                            <div className="service-badge">Click to open</div>
                        </div>
                        <h3 className="service-title-large">{service.title}</h3>
                        <p className="service-description-full">{service.description}</p>
                        <div className="service-features">
                            {service.features.map((feature, idx) => (
                                <span key={idx} className="feature-tag">
                                    {feature}
                                </span>
                            ))}
                        </div>
                        <div className="service-cta">
                            Execute Automation →
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ServicesPage
