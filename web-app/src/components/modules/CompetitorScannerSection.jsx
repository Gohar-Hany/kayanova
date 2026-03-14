import { useState } from 'react'
import { analyzeFacebookCompetitor } from '../../services/api'
import {
    SearchIcon, BoltIcon, ClockIcon, BarChartIcon, SuccessIcon, ErrorIcon,
    RocketIcon, StarIcon, LightbulbIcon, TrendingUpIcon, PaletteIcon,
    TargetIcon, ChevronDownIcon, ChevronUpIcon, ShieldIcon, WarningIcon, CheckIcon
} from '../Icons'

function CompetitorScannerSection() {
    const [url, setUrl] = useState('')
    const [status, setStatus] = useState('idle') // idle, processing, success, error
    const [error, setError] = useState('')
    const [results, setResults] = useState(null)
    const [expandedSections, setExpandedSections] = useState({
        overview: true,
        visual: false,
        swot: false,
        recommendations: false
    })

    // Validate Facebook URL
    const validateUrl = (inputUrl) => {
        const facebookRegex = /^(https?:\/\/)?(www\.)?facebook\.com\/[\w.-]+\/?$/i
        return facebookRegex.test(inputUrl)
    }

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!url.trim()) {
            setError('Please enter a Facebook page URL')
            return
        }

        if (!validateUrl(url)) {
            setError('Please enter a valid Facebook page URL (e.g., facebook.com/pagename)')
            return
        }

        setError('')
        setStatus('processing')
        setResults(null)

        try {
            const response = await analyzeFacebookCompetitor(url)

            // Handle array response (webhook returns array)
            const data = Array.isArray(response) ? response[0] : response
            const analysisData = data?.output || data

            setResults(analysisData)
            setStatus('success')
        } catch (err) {
            setError(err.message || 'Analysis failed. Please check the URL and try again.')
            setStatus('error')
        }
    }

    // Toggle section expansion
    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }))
    }

    // Reset form
    const handleReset = () => {
        setUrl('')
        setStatus('idle')
        setError('')
        setResults(null)
        setExpandedSections({
            overview: true,
            visual: false,
            swot: false,
            recommendations: false
        })
    }

    // Render status message
    const renderStatusMessage = () => {
        switch (status) {
            case 'idle':
                return (
                    <div className="competitor-status competitor-status-idle">
                        <span><BoltIcon size={14} /></span> Free analysis
                        <span className="status-divider">•</span>
                        <span><ClockIcon size={14} /></span> Takes ~2-3 minutes
                        <span className="status-divider">•</span>
                        <span><BarChartIcon size={14} /></span> Detailed insights
                    </div>
                )
            case 'processing':
                return (
                    <div className="competitor-status competitor-status-processing">
                        <span className="status-spinner"></span>
                        Analyzing competitor page... This may take 2-3 minutes
                    </div>
                )
            case 'success':
                return (
                    <div className="competitor-status competitor-status-success">
                        <span><SuccessIcon size={16} /></span> Analysis complete! View results below
                    </div>
                )
            case 'error':
                return (
                    <div className="competitor-status competitor-status-error">
                        <span><ErrorIcon size={16} /></span> {error}
                    </div>
                )
            default:
                return null
        }
    }

    // Render priority badge
    const renderPriorityBadge = (priority) => {
        const colors = {
            high: 'priority-high',
            medium: 'priority-medium',
            low: 'priority-low'
        }
        return (
            <span className={`priority-badge ${colors[priority] || ''}`}>
                {priority.toUpperCase()}
            </span>
        )
    }

    // Render results
    const renderResults = () => {
        if (!results) return null

        const {
            executive_summary,
            brand_identity_assessment,
            content_strategy_breakdown,
            visual_design_audit,
            engagement_analysis,
            swot_analysis,
            strategic_recommendations,
            key_metrics
        } = results

        return (
            <div className="competitor-results">
                {/* Overview Cards */}
                <div className="competitor-results-header">
                    <h3><CheckIcon size={16} /> Analysis Complete</h3>
                    <button className="btn-new-analysis" onClick={handleReset}>
                        New Analysis
                    </button>
                </div>

                {/* Metric Cards */}
                <div className="competitor-metrics-grid">
                    <div className="competitor-metric-card">
                        <span className="metric-icon"><BarChartIcon size={22} /></span>
                        <div className="metric-content">
                            <span className="metric-value">{engagement_analysis?.avg_engagement_rate || 'N/A'}</span>
                            <span className="metric-label">Engagement Rate</span>
                        </div>
                    </div>
                    <div className="competitor-metric-card">
                        <span className="metric-icon"><StarIcon size={22} /></span>
                        <div className="metric-content">
                            <span className="metric-value">{brand_identity_assessment?.consistency_score || key_metrics?.brand_consistency_score || 'N/A'}/10</span>
                            <span className="metric-label">Brand Consistency</span>
                        </div>
                    </div>
                    <div className="competitor-metric-card">
                        <span className="metric-icon"><LightbulbIcon size={22} /></span>
                        <div className="metric-content">
                            <span className="metric-value">{visual_design_audit?.effectiveness_score || key_metrics?.visual_quality_score || 'N/A'}/10</span>
                            <span className="metric-label">Visual Quality</span>
                        </div>
                    </div>
                </div>

                {/* Executive Summary */}
                {executive_summary && (
                    <div className="competitor-section">
                        <button
                            className="competitor-section-header"
                            onClick={() => toggleSection('overview')}
                        >
                            <div className="section-title-left">
                                <span className="section-icon"><TrendingUpIcon size={18} /></span>
                                <span>Executive Summary</span>
                            </div>
                            <span className={`section-toggle ${expandedSections.overview ? 'expanded' : ''}`}>
                                {expandedSections.overview ? <ChevronUpIcon /> : <ChevronDownIcon />}
                            </span>
                        </button>
                        {expandedSections.overview && (
                            <div className="competitor-section-content">
                                <p className="executive-summary-text">{executive_summary}</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Visual Identity */}
                {(visual_design_audit || brand_identity_assessment) && (
                    <div className="competitor-section">
                        <button
                            className="competitor-section-header"
                            onClick={() => toggleSection('visual')}
                        >
                            <div className="section-title-left">
                                <span className="section-icon"><PaletteIcon size={18} /></span>
                                <span>Visual Identity &amp; Brand</span>
                            </div>
                            <span className={`section-toggle ${expandedSections.visual ? 'expanded' : ''}`}>
                                {expandedSections.visual ? <ChevronUpIcon /> : <ChevronDownIcon />}
                            </span>
                        </button>
                        {expandedSections.visual && (
                            <div className="competitor-section-content">
                                {brand_identity_assessment?.personality_traits && (
                                    <div className="insight-group">
                                        <h4>Brand Personality</h4>
                                        <div className="tags-list">
                                            {brand_identity_assessment.personality_traits.map((trait, i) => (
                                                <span key={i} className="insight-tag">{trait}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {brand_identity_assessment?.positioning_statement && (
                                    <div className="insight-group">
                                        <h4>Positioning Statement</h4>
                                        <p>{brand_identity_assessment.positioning_statement}</p>
                                    </div>
                                )}
                                {visual_design_audit?.design_trends && (
                                    <div className="insight-group">
                                        <h4>Design Trends</h4>
                                        <ul className="insight-list">
                                            {visual_design_audit.design_trends.map((trend, i) => (
                                                <li key={i}>{trend}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* SWOT Analysis */}
                {swot_analysis && (
                    <div className="competitor-section">
                        <button
                            className="competitor-section-header"
                            onClick={() => toggleSection('swot')}
                        >
                            <div className="section-title-left">
                                <span className="section-icon"><BarChartIcon size={18} /></span>
                                <span>SWOT Analysis</span>
                            </div>
                            <span className={`section-toggle ${expandedSections.swot ? 'expanded' : ''}`}>
                                {expandedSections.swot ? <ChevronUpIcon /> : <ChevronDownIcon />}
                            </span>
                        </button>
                        {expandedSections.swot && (
                            <div className="competitor-section-content">
                                <div className="swot-grid">
                                    <div className="swot-card swot-strengths">
                                        <h4><RocketIcon size={16} /> Strengths</h4>
                                        <ul>
                                            {swot_analysis.strengths?.map((item, i) => (
                                                <li key={i}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="swot-card swot-weaknesses">
                                        <h4><WarningIcon size={16} /> Weaknesses</h4>
                                        <ul>
                                            {swot_analysis.weaknesses?.map((item, i) => (
                                                <li key={i}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="swot-card swot-opportunities">
                                        <h4><LightbulbIcon size={16} /> Opportunities</h4>
                                        <ul>
                                            {swot_analysis.opportunities?.map((item, i) => (
                                                <li key={i}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="swot-card swot-threats">
                                        <h4><ShieldIcon size={16} /> Threats</h4>
                                        <ul>
                                            {swot_analysis.threats?.map((item, i) => (
                                                <li key={i}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Strategic Recommendations */}
                {strategic_recommendations && strategic_recommendations.length > 0 && (
                    <div className="competitor-section">
                        <button
                            className="competitor-section-header"
                            onClick={() => toggleSection('recommendations')}
                        >
                            <div className="section-title-left">
                                <span className="section-icon"><TargetIcon size={18} /></span>
                                <span>Strategic Recommendations</span>
                                <span className="section-count">{strategic_recommendations.length}</span>
                            </div>
                            <span className={`section-toggle ${expandedSections.recommendations ? 'expanded' : ''}`}>
                                {expandedSections.recommendations ? <ChevronUpIcon /> : <ChevronDownIcon />}
                            </span>
                        </button>
                        {expandedSections.recommendations && (
                            <div className="competitor-section-content">
                                <div className="recommendations-list">
                                    {strategic_recommendations.map((rec, i) => (
                                        <div key={i} className="recommendation-card">
                                            <div className="recommendation-header">
                                                {renderPriorityBadge(rec.priority)}
                                            </div>
                                            <p className="recommendation-action">{rec.action}</p>
                                            <p className="recommendation-impact">
                                                <span className="impact-label">Expected Impact:</span> {rec.expected_impact}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Content Strategy Insights */}
                {content_strategy_breakdown && (
                    <div className="competitor-insights-banner">
                        <div className="insights-section">
                            <h4><SuccessIcon size={16} /> What's Working</h4>
                            <ul>
                                {content_strategy_breakdown.whats_working?.slice(0, 3).map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="insights-section">
                            <h4><WarningIcon size={16} /> Areas to Improve</h4>
                            <ul>
                                {content_strategy_breakdown.whats_not_working?.slice(0, 3).map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        )
    }

    return (
        <section className="dashboard-section competitor-scanner-section">
            <div className="competitor-scanner-card">
                {/* Background glow effect */}
                <div className="competitor-scanner-glow"></div>

                {/* Header */}
                <div className="competitor-scanner-header">
                    <div className="scanner-title-wrap">
                        <span className="scanner-icon"><SearchIcon size={22} /></span>
                        <div>
                            <h2 className="scanner-title">Competitor Intelligence Scanner</h2>
                            <p className="scanner-subtitle">
                                Analyze any Facebook competitor page in seconds
                            </p>
                        </div>
                    </div>
                    <span className="free-badge">FREE</span>
                </div>

                {/* Input Form */}
                {status !== 'success' && (
                    <form className="competitor-form" onSubmit={handleSubmit}>
                        <div className="competitor-input-group">
                            <input
                                type="text"
                                className={`competitor-input ${error ? 'input-error' : ''}`}
                                placeholder="Paste Facebook page URL (e.g., facebook.com/kayanovagency)"
                                value={url}
                                onChange={(e) => {
                                    setUrl(e.target.value)
                                    if (error) setError('')
                                }}
                                disabled={status === 'processing'}
                            />
                        </div>

                        <button
                            type="submit"
                            className={`competitor-submit-btn ${status === 'processing' ? 'btn-loading' : ''}`}
                            disabled={status === 'processing'}
                        >
                            {status === 'processing' ? (
                                <>
                                    <span className="btn-spinner"></span>
                                    <span>Analyzing...</span>
                                </>
                            ) : (
                                <>
                                    <span><RocketIcon size={16} /></span>
                                    <span>Analyze Competitor</span>
                                </>
                            )}
                        </button>
                    </form>
                )}

                {/* Status Message */}
                {renderStatusMessage()}

                {/* Results */}
                {renderResults()}
            </div>
        </section>
    )
}

export default CompetitorScannerSection
