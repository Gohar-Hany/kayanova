import { useState, useEffect } from 'react'
import { getCompetitorAnalysis } from '../../services/api'
import {
    WarningIcon, SearchIcon, UsersIcon, StarIcon, BarChartIcon,
    PencilIcon, TrendingUpIcon, FileIcon, TargetIcon, CalendarIcon
} from '../Icons'

function CompetitorAnalysisPage({ onBack, userData }) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)
    const [activeCompetitor, setActiveCompetitor] = useState(0)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setLoading(true)
        setError(null)
        try {
            const result = await getCompetitorAnalysis()
            setData(Array.isArray(result) ? result : [result])
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const renderServices = (services) => {
        if (!services?.data) return null
        const items = Array.isArray(services.data) ? services.data : []

        return (
            <div className="analysis-section">
                <h4 className="section-header">
                    <span className="section-icon">{services.icon || <FileIcon size={18} />}</span>
                    {services.title}
                    {services.count && <span className="section-count">{services.count} services</span>}
                </h4>
                <div className="services-list">
                    {items.map((service, idx) => (
                        <div key={idx} className="service-item">
                            <span className="service-name">{service.name}</span>
                            {service.description && (
                                <p className="service-desc">{service.description}</p>
                            )}
                            {service.sub_services && (
                                <div className="sub-services">
                                    {service.sub_services.map((sub, i) => (
                                        <span key={i} className="sub-service-tag">{sub}</span>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    const renderTargetAudience = (audience) => {
        if (!audience?.data) return null
        const { type, data: audienceData } = audience.data

        return (
            <div className="analysis-section">
                <h4 className="section-header">
                    <span className="section-icon">{audience.icon || <UsersIcon size={18} />}</span>
                    {audience.title}
                </h4>
                <div className="audience-content">
                    {type === 'list' && audienceData?.segments && (
                        <ul className="audience-list">
                            {audienceData.segments.map((segment, idx) => (
                                <li key={idx}>
                                    {typeof segment === 'object' ? (
                                        <>
                                            <strong>{segment.segment}</strong>
                                            {segment.pain_point && <p className="pain-point">{segment.pain_point}</p>}
                                            {segment.description && <p className="segment-desc">{segment.description}</p>}
                                        </>
                                    ) : segment}
                                </li>
                            ))}
                        </ul>
                    )}
                    {type === 'structured' && audienceData && (
                        <div className="structured-audience">
                            {audienceData.primary && (
                                <div className="audience-field">
                                    <span className="field-label">Primary:</span>
                                    <span className="field-value">{audienceData.primary}</span>
                                </div>
                            )}
                            {audienceData.business_sizes && (
                                <div className="audience-field">
                                    <span className="field-label">Business Sizes:</span>
                                    <span className="field-value">{audienceData.business_sizes}</span>
                                </div>
                            )}
                            {audienceData.industries && (
                                <div className="audience-field">
                                    <span className="field-label">Industries:</span>
                                    <div className="industry-tags">
                                        {audienceData.industries.map((ind, i) => (
                                            <span key={i} className="industry-tag">{ind}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {audienceData.geographic_focus && (
                                <div className="audience-field">
                                    <span className="field-label">Geographic Focus:</span>
                                    <span className="field-value">{audienceData.geographic_focus}</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        )
    }

    const renderUSP = (usp) => {
        if (!usp?.data) return null
        const { type, data: uspData, points } = usp.data

        return (
            <div className="analysis-section highlight">
                <h4 className="section-header">
                    <span className="section-icon">{usp.icon || <StarIcon size={18} />}</span>
                    {usp.title}
                </h4>
                <div className="usp-content">
                    {points && (
                        <ul className="usp-list">
                            {points.map((point, idx) => (
                                <li key={idx} className="usp-item">{point}</li>
                            ))}
                        </ul>
                    )}
                    {type === 'structured' && uspData && (
                        <>
                            {uspData.positioning && (
                                <div className="usp-positioning">{uspData.positioning}</div>
                            )}
                            {uspData.primary_usp && (
                                <div className="usp-primary">{uspData.primary_usp}</div>
                            )}
                            {uspData.key_differentiators && (
                                <div className="differentiators">
                                    <h5>Key Differentiators</h5>
                                    <ul>
                                        {uspData.key_differentiators.map((diff, i) => (
                                            <li key={i}>
                                                {typeof diff === 'object' ? (
                                                    <>
                                                        <strong>{diff.feature}:</strong> {diff.benefit}
                                                    </>
                                                ) : diff}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        )
    }

    const renderPricing = (pricing) => {
        if (!pricing?.data) return null
        const { type, data: pricingData, content, available } = pricing.data

        return (
            <div className="analysis-section">
                <h4 className="section-header">
                    <span className="section-icon">{pricing.icon || <BoltIcon size={18} />}</span>
                    {pricing.title}
                </h4>
                <div className="pricing-content">
                    {type === 'text' && (
                        <p className={`pricing-text ${!available ? 'not-available' : ''}`}>
                            {content}
                        </p>
                    )}
                    {type === 'structured' && pricingData && (
                        <div className="pricing-details">
                            {Object.entries(pricingData).map(([key, value]) => {
                                if (value === null || key === 'available') return null
                                return (
                                    <div key={key} className="pricing-row">
                                        <span className="pricing-label">
                                            {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:
                                        </span>
                                        <span className="pricing-value">{value}</span>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            </div>
        )
    }

    const renderContentStyle = (style) => {
        if (!style?.data) return null
        const styleData = style.data

        return (
            <div className="analysis-section">
                <h4 className="section-header">
                    <span className="section-icon">{style.icon || <PencilIcon size={18} />}</span>
                    {style.title}
                </h4>
                <div className="style-content">
                    {styleData.tone && (
                        <div className="style-field">
                            <span className="field-label">Tone:</span>
                            <span className="field-value">
                                {Array.isArray(styleData.tone) ? styleData.tone.join(', ') : styleData.tone}
                            </span>
                        </div>
                    )}
                    {styleData.approach && (
                        <div className="style-field">
                            <span className="field-label">Approach:</span>
                            <span className="field-value">{styleData.approach}</span>
                        </div>
                    )}
                    {styleData.key_characteristics && (
                        <div className="style-field">
                            <span className="field-label">Key Characteristics:</span>
                            <ul className="characteristics-list">
                                {styleData.key_characteristics.map((char, i) => (
                                    <li key={i}>{char}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {styleData.persuasion_tactics && (
                        <div className="style-field">
                            <span className="field-label">Persuasion Tactics:</span>
                            <div className="tactics-tags">
                                {styleData.persuasion_tactics.map((tactic, i) => (
                                    <span key={i} className="tactic-tag">{tactic}</span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }

    if (loading) {
        return (
            <div className="service-page">
                <div className="page-loading">
                    <div className="loading-spinner large"></div>
                    <h2>Analyzing Competitors...</h2>
                    <p>Our AI is gathering competitive intelligence. This may take a minute.</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="service-page">
                <div className="page-error">
                    <div className="error-icon"><WarningIcon size={36} /></div>
                    <h2>Analysis Failed</h2>
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
        <div className="service-page competitor-page">
            <div className="page-header">
                <button className="back-btn" onClick={onBack}>← Back to Services</button>
                <div className="page-title-section">
                    <h1 className="page-title">
                        <span className="page-icon"><SearchIcon size={24} /></span>
                        Competitor Analysis
                    </h1>
                    <p className="page-subtitle">
                        Deep competitive intelligence for {data?.length || 0} competitors
                    </p>
                </div>
            </div>

            {/* Competitor Tabs */}
            {data && data.length > 1 && (
                <div className="competitor-tabs">
                    {data.map((comp, idx) => (
                        <button
                            key={comp.id || idx}
                            className={`competitor-tab ${activeCompetitor === idx ? 'active' : ''}`}
                            onClick={() => setActiveCompetitor(idx)}
                        >
                            Competitor {comp.competitor_number || idx + 1}
                            {comp.source?.domain && (
                                <span className="tab-domain">{comp.source.domain}</span>
                            )}
                        </button>
                    ))}
                </div>
            )}

            {/* Active Competitor Content */}
            {data && data[activeCompetitor] && (
                <div className="competitor-content">
                    {data[activeCompetitor].source?.domain && (
                        <div className="competitor-source">
                            <span className="source-label">Source:</span>
                            <a
                                href={data[activeCompetitor].source.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="source-link"
                            >
                                {data[activeCompetitor].source.domain}
                            </a>
                        </div>
                    )}

                    <div className="competitor-grid">
                        {renderServices(data[activeCompetitor].services)}
                        {renderTargetAudience(data[activeCompetitor].target_audience)}
                        {renderUSP(data[activeCompetitor].unique_selling_proposition)}
                        {renderPricing(data[activeCompetitor].pricing)}
                        {renderContentStyle(data[activeCompetitor].content_style)}
                    </div>

                    {data[activeCompetitor].extras?.success_metrics && (
                        <div className="analysis-section success-metrics">
                            <h4 className="section-header">
                                <span className="section-icon"><TrendingUpIcon size={18} /></span>
                                Success Metrics
                            </h4>
                            <ul>
                                {data[activeCompetitor].extras.success_metrics.map((metric, i) => (
                                    <li key={i}>{metric}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default CompetitorAnalysisPage
