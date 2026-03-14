import { useState } from 'react'
import { RocketIcon, CalendarIcon, BoltIcon, MegaphoneIcon } from '../Icons'

function CampaignStrategyPage({ onBack }) {
    const [showResults, setShowResults] = useState(true)

    // Static demo campaign strategy
    const campaign = {
        name: 'Q1 2025 Product Launch Campaign',
        objective: 'Generate 500 qualified leads for the new Marketing OS platform',
        duration: 'January 15 - March 31, 2025',
        budget: '$25,000',
        channels: [
            { name: 'LinkedIn Ads', budget: '$8,000', role: 'Primary lead generation' },
            { name: 'Content Marketing', budget: '$5,000', role: 'Thought leadership & SEO' },
            { name: 'Email Nurture', budget: '$3,000', role: 'Lead qualification' },
            { name: 'Webinars', budget: '$4,000', role: 'Education & conversion' },
            { name: 'Retargeting', budget: '$5,000', role: 'Re-engagement' }
        ],
        phases: [
            {
                name: 'Phase 1: Awareness',
                duration: 'Week 1-3',
                activities: ['Launch teaser campaign', 'Publish thought leadership content', 'Influencer outreach'],
                kpis: ['Reach: 100,000+', 'Engagement: 5%+', 'Website visits: 10,000+']
            },
            {
                name: 'Phase 2: Consideration',
                duration: 'Week 4-8',
                activities: ['Product demo videos', 'Case study releases', 'Comparison guides', 'Webinar series'],
                kpis: ['Demo requests: 200+', 'Content downloads: 500+', 'Email signups: 1,000+']
            },
            {
                name: 'Phase 3: Conversion',
                duration: 'Week 9-11',
                activities: ['Free trial push', 'Limited-time offer', 'Sales outreach', 'Customer testimonials'],
                kpis: ['Trial signups: 300+', 'Qualified leads: 500+', 'Conversion rate: 15%+']
            }
        ],
        targetAudience: [
            'Marketing Directors at B2B SaaS companies (50-500 employees)',
            'Startup founders looking for marketing automation',
            'Digital marketing agencies seeking white-label solutions'
        ],
        keyMessages: [
            'The only fully automated marketing operating system',
            'Save 20+ hours per week on marketing tasks',
            'AI-powered campaigns that run themselves',
            'From strategy to execution in one platform'
        ],
        successMetrics: [
            { metric: 'Total Leads', target: '500', current: '0' },
            { metric: 'Cost per Lead', target: '$50', current: '-' },
            { metric: 'Conversion Rate', target: '15%', current: '-' },
            { metric: 'ROI', target: '300%', current: '-' }
        ]
    }

    return (
        <div className="generator-page">
            <div className="generator-header-section">
                <div className="generator-title-row">
                    <h1><RocketIcon size={22} /> Campaign Strategy</h1>
                    <span className="generator-badge active">Active</span>
                </div>
                <p className="generator-description">
                    Complete campaign strategies with timelines, budgets, and KPIs.
                </p>
            </div>

            {showResults && (
                <div className="generator-results">
                    <div className="results-header">
                        <h2>{campaign.name}</h2>
                        <div className="results-actions">
                            <button className="btn btn-secondary">Edit Strategy</button>
                            <button className="btn btn-primary">Export PDF</button>
                        </div>
                    </div>

                    <div className="strategy-overview">
                        <div className="overview-card">
                            <span className="overview-label">Objective</span>
                            <p>{campaign.objective}</p>
                        </div>
                        <div className="overview-row">
                            <div className="overview-item">
                                <span className="overview-icon"><CalendarIcon size={18} /></span>
                                <div>
                                    <span className="overview-label">Duration</span>
                                    <span>{campaign.duration}</span>
                                </div>
                            </div>
                            <div className="overview-item">
                                <span className="overview-icon"><BoltIcon size={18} /></span>
                                <div>
                                    <span className="overview-label">Budget</span>
                                    <span>{campaign.budget}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="strategy-section">
                        <h3>Channel Mix & Budget Allocation</h3>
                        <div className="channels-grid">
                            {campaign.channels.map((channel, i) => (
                                <div key={i} className="channel-card">
                                    <div className="channel-name">{channel.name}</div>
                                    <div className="channel-budget">{channel.budget}</div>
                                    <div className="channel-role">{channel.role}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="strategy-section">
                        <h3>Campaign Phases</h3>
                        <div className="phases-timeline">
                            {campaign.phases.map((phase, i) => (
                                <div key={i} className="phase-card">
                                    <div className="phase-header">
                                        <span className="phase-number">{i + 1}</span>
                                        <div>
                                            <h4>{phase.name}</h4>
                                            <span className="phase-duration">{phase.duration}</span>
                                        </div>
                                    </div>
                                    <div className="phase-content">
                                        <div className="phase-activities">
                                            <h5>Activities</h5>
                                            <ul>
                                                {phase.activities.map((act, j) => (
                                                    <li key={j}>{act}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="phase-kpis">
                                            <h5>Target KPIs</h5>
                                            <ul>
                                                {phase.kpis.map((kpi, j) => (
                                                    <li key={j}>{kpi}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="strategy-section">
                        <h3>Key Messages</h3>
                        <div className="messages-list">
                            {campaign.keyMessages.map((msg, i) => (
                                <div key={i} className="message-item">
                                    <span className="message-icon"><MegaphoneIcon size={16} /></span>
                                    <span>{msg}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="strategy-section">
                        <h3>Success Metrics</h3>
                        <div className="metrics-grid">
                            {campaign.successMetrics.map((metric, i) => (
                                <div key={i} className="metric-card">
                                    <span className="metric-label">{metric.metric}</span>
                                    <span className="metric-target">Target: {metric.target}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CampaignStrategyPage
