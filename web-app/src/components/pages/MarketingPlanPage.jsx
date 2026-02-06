import { useState, useEffect } from 'react'
import { getMarketingPlan } from '../../services/api'

function MarketingPlanPage({ onBack, userData }) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)
    const [activeTab, setActiveTab] = useState('strategy')

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setLoading(true)
        setError(null)
        try {
            const result = await getMarketingPlan()
            setData(Array.isArray(result) ? result[0] : result)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const formatMarkdownList = (text) => {
        if (!text) return null

        const items = text.split('\n').filter(line => line.trim())

        return (
            <ul className="markdown-list">
                {items.map((item, idx) => {
                    // Remove markdown bullet points and bold markers
                    let cleanItem = item.replace(/^\*\s*/, '').replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')

                    // Check if it's a section header (starts with **)
                    if (item.trim().startsWith('**') && item.includes(':')) {
                        const parts = item.split(':')
                        const title = parts[0].replace(/\*\*/g, '').replace('*', '').trim()
                        const content = parts.slice(1).join(':').trim()

                        return (
                            <li key={idx} className="list-item-detailed">
                                <strong className="item-title">{title}</strong>
                                <span className="item-content">{content}</span>
                            </li>
                        )
                    }

                    return <li key={idx} dangerouslySetInnerHTML={{ __html: cleanItem }} />
                })}
            </ul>
        )
    }

    const renderSection = (content, title, icon) => {
        if (!content) return null

        return (
            <div className="plan-section">
                <h3 className="plan-section-title">
                    <span className="section-icon">{icon}</span>
                    {title}
                </h3>
                <div className="plan-section-content">
                    {typeof content === 'string' && content.includes('\n')
                        ? formatMarkdownList(content)
                        : <p className="plan-text">{content}</p>
                    }
                </div>
            </div>
        )
    }

    const tabs = [
        { id: 'strategy', label: 'Strategy & Vision', icon: '🎯' },
        { id: 'targeting', label: 'ICP & Pain Points', icon: '👥' },
        { id: 'tactics', label: 'Funnel Tactics', icon: '📊' },
        { id: 'competition', label: 'Competitor Attack', icon: '⚔️' },
        { id: 'metrics', label: 'Metrics & Budget', icon: '📈' }
    ]

    if (loading) {
        return (
            <div className="service-page">
                <div className="page-loading">
                    <div className="loading-spinner large"></div>
                    <h2>Creating Marketing Plan...</h2>
                    <p>Our AI is developing your comprehensive marketing strategy. This may take a minute.</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="service-page">
                <div className="page-error">
                    <div className="error-icon">⚠️</div>
                    <h2>Plan Generation Failed</h2>
                    <p>{error}</p>
                    <div className="error-actions">
                        <button className="btn btn-primary" onClick={fetchData}>Try Again</button>
                        <button className="btn btn-secondary" onClick={onBack}>Go Back</button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="service-page marketing-plan-page">
            <div className="page-header">
                <button className="back-btn" onClick={onBack}>← Back to Services</button>
                <div className="page-title-section">
                    <h1 className="page-title">
                        <span className="page-icon">📈</span>
                        Marketing Plan
                    </h1>
                    <p className="page-subtitle">
                        Comprehensive marketing strategy with actionable tactics
                    </p>
                </div>
            </div>

            {/* UVP Highlight */}
            {data?.Unique_Value_Proposition && (
                <div className="uvp-banner">
                    <div className="uvp-icon">💎</div>
                    <div className="uvp-content">
                        <span className="uvp-label">Unique Value Proposition</span>
                        <p className="uvp-text">{data.Unique_Value_Proposition}</p>
                    </div>
                </div>
            )}

            {/* Navigation Tabs */}
            <div className="plan-tabs">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        className={`plan-tab ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        <span className="tab-icon">{tab.icon}</span>
                        <span className="tab-label">{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="plan-content">
                {activeTab === 'strategy' && (
                    <div className="tab-content">
                        {renderSection(data?.Strategy_Core_Vision, 'Strategy Core Vision', '🎯')}
                        {renderSection(data?.Brand_Identity_Voice, 'Brand Identity & Voice', '🎭')}
                        {renderSection(data?.['SWOT_Analysis_Matrix'], 'SWOT Analysis', '📊')}
                    </div>
                )}

                {activeTab === 'targeting' && (
                    <div className="tab-content">
                        {renderSection(data?.ICP_Deep_Dive, 'Ideal Customer Profile (ICP)', '👥')}
                        {renderSection(data?.Psychological_Pain_Points, 'Psychological Pain Points', '🧠')}
                    </div>
                )}

                {activeTab === 'tactics' && (
                    <div className="tab-content">
                        <div className="funnel-visual">
                            <div className="funnel-stage tofu">
                                <div className="stage-header">
                                    <span className="stage-label">TOFU</span>
                                    <span className="stage-name">Top of Funnel - Awareness</span>
                                </div>
                                <div className="stage-content">
                                    {formatMarkdownList(data?.['TOFU_Tactics (Awareness)'])}
                                </div>
                            </div>
                            <div className="funnel-stage mofu">
                                <div className="stage-header">
                                    <span className="stage-label">MOFU</span>
                                    <span className="stage-name">Middle of Funnel - Consideration</span>
                                </div>
                                <div className="stage-content">
                                    {formatMarkdownList(data?.['MOFU_Tactics (Consideration)'])}
                                </div>
                            </div>
                            <div className="funnel-stage bofu">
                                <div className="stage-header">
                                    <span className="stage-label">BOFU</span>
                                    <span className="stage-name">Bottom of Funnel - Conversion</span>
                                </div>
                                <div className="stage-content">
                                    {formatMarkdownList(data?.['BOFU_Tactics (Conversion)'])}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'competition' && (
                    <div className="tab-content">
                        {renderSection(data?.Competitor_Attack_Plan, 'Competitor Attack Plan', '⚔️')}
                        {renderSection(data?.Risk_Mitigation_Plan, 'Risk Mitigation Plan', '🛡️')}
                    </div>
                )}

                {activeTab === 'metrics' && (
                    <div className="tab-content">
                        {renderSection(data?.North_Star_Metrics, 'North Star Metrics', '⭐')}
                        {renderSection(data?.Budget_Allocation_Ratio, 'Budget Allocation', '💰')}
                    </div>
                )}
            </div>
        </div>
    )
}

export default MarketingPlanPage
