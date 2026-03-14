import { useState, useEffect } from 'react'
import { getReport } from '../../services/api'
import {
    WarningIcon, ArrowLeftIcon, BarChartIcon, TargetIcon, SparklesIcon,
    SettingsIcon, ShieldIcon, RocketIcon, LightbulbIcon, CalendarIcon
} from '../Icons'

function ReportPage({ onBack, userData }) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setLoading(true)
        setError(null)
        try {
            const result = await getReport()
            // Handle array or single object
            setData(Array.isArray(result) ? result[0] : result)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const renderTextSection = (content, title, icon) => {
        if (!content) return null

        // Handle markdown-like formatting
        const formatContent = (text) => {
            if (!text) return null

            // Split by double newlines for paragraphs
            const paragraphs = text.split('\n\n')

            return paragraphs.map((para, idx) => {
                // Check for bullet points
                if (para.includes('\n•') || para.startsWith('•')) {
                    const items = para.split('\n').filter(line => line.trim().startsWith('•'))
                    return (
                        <ul key={idx} className="report-bullets">
                            {items.map((item, i) => (
                                <li key={i}>{item.replace('•', '').trim()}</li>
                            ))}
                        </ul>
                    )
                }

                // Check for numbered items or phases
                if (para.includes('📅') || para.includes('🚀') || para.includes('💡')) {
                    const lines = para.split('\n')
                    return (
                        <div key={idx} className="report-formatted">
                            {lines.map((line, i) => {
                                if (line.includes('📅') || line.includes('🚀') || line.includes('💡')) {
                                    return <h5 key={i} className="formatted-heading">{line}</h5>
                                }
                                if (line.startsWith('**') && line.endsWith('**')) {
                                    return <strong key={i} className="formatted-bold">{line.replace(/\*\*/g, '')}</strong>
                                }
                                return <p key={i}>{line}</p>
                            })}
                        </div>
                    )
                }

                return <p key={idx}>{para}</p>
            })
        }

        return (
            <div className="report-section">
                <h3 className="report-section-title">
                    {icon && <span className="section-icon">{icon}</span>}
                    {title}
                </h3>
                <div className="report-section-content">
                    {formatContent(content)}
                </div>
            </div>
        )
    }

    const renderCompetitiveMatrix = (matrix) => {
        if (!matrix) return null

        // Parse the matrix text into groups
        const groups = matrix.split('\n\n').filter(g => g.trim())

        return (
            <div className="report-section competitive-matrix">
                <h3 className="report-section-title">
                    <span className="section-icon"><BarChartIcon size={18} /></span>
                    Competitive Landscape Matrix
                </h3>
                <div className="matrix-grid">
                    {groups.map((group, idx) => {
                        const lines = group.split('\n')
                        const titleLine = lines[0]
                        const weaknessLine = lines.find(l => l.includes('⚠️'))

                        // Extract title and competitors
                        const titleMatch = titleLine.match(/\[(.*?)\]:\s*(.*)/)

                        return (
                            <div key={idx} className="matrix-card">
                                <div className="matrix-card-header">
                                    <span className="matrix-category">
                                        {titleMatch ? titleMatch[1] : 'Competitor Group'}
                                    </span>
                                </div>
                                <div className="matrix-competitors">
                                    {titleMatch && titleMatch[2]}
                                </div>
                                {weaknessLine && (
                                    <div className="matrix-weakness">
                                        <span className="weakness-icon"><WarningIcon size={14} /></span>
                                        <span className="weakness-text">
                                            {weaknessLine.replace('⚠️ Weakness:', '').trim()}
                                        </span>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }

    const renderServiceMap = (serviceMap) => {
        if (!serviceMap) return null

        // Parse services
        const services = serviceMap.split('🚀').filter(s => s.trim()).map(s => '🚀' + s)
        // Note: API data uses emoji as delimiters — preserved for parsing only

        return (
            <div className="report-section service-map">
                <h3 className="report-section-title">
                    <span className="section-icon"><TargetIcon size={18} /></span>
                    Service Map
                </h3>
                <div className="services-cards">
                    {services.map((service, idx) => {
                        const parts = service.split('💡')
                        const mainService = parts[0]
                        const importance = parts[1]

                        const titleMatch = mainService.match(/🚀\s*(.*?):\n(.*)/)

                        return (
                            <div key={idx} className="service-map-card">
                                <div className="service-map-header">
                                    <span className="service-emoji"><RocketIcon size={16} /></span>
                                    <h4>{titleMatch ? titleMatch[1].trim() : 'Service'}</h4>
                                </div>
                                <p className="service-map-desc">
                                    {titleMatch ? titleMatch[2].trim() : mainService}
                                </p>
                                {importance && (
                                    <div className="service-importance">
                                        <span className="importance-label"><LightbulbIcon size={14} /> Importance:</span>
                                        <p>{importance.replace('Importance:', '').trim()}</p>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }

    const renderRoadmap = (roadmap) => {
        if (!roadmap) return null

        // Parse phases
        const phases = roadmap.split('📅').filter(p => p.trim()).map(p => '📅' + p)
        // Note: API data uses emoji as delimiters — preserved for parsing only

        return (
            <div className="report-section roadmap">
                <h3 className="report-section-title">
                    <span className="section-icon"><CalendarIcon size={18} /></span>
                    90-Day Execution Roadmap
                </h3>
                <div className="roadmap-timeline">
                    {phases.map((phase, idx) => {
                        const lines = phase.split('\n')
                        const phaseTitle = lines[0].replace('📅', '').trim()
                        const content = lines.slice(1).join('\n').trim()

                        return (
                            <div key={idx} className="roadmap-phase">
                                <div className="phase-marker">
                                    <span className="phase-number">{idx + 1}</span>
                                </div>
                                <div className="phase-content">
                                    <h4 className="phase-title">{phaseTitle}</h4>
                                    <div className="phase-details">
                                        {content.split('\n').map((line, i) => {
                                            if (line.startsWith('**') && line.endsWith('**')) {
                                                return <strong key={i}>{line.replace(/\*\*/g, '')}</strong>
                                            }
                                            return <p key={i}>{line}</p>
                                        })}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }

    if (loading) {
        return (
            <div className="service-page">
                <div className="page-loading">
                    <div className="loading-spinner large"></div>
                    <h2>Generating Market Report...</h2>
                    <p>Our AI is compiling comprehensive market intelligence. This may take a minute.</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="service-page">
                <div className="page-error">
                    <div className="error-icon"><WarningIcon size={36} /></div>
                    <h2>Report Generation Failed</h2>
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
        <div className="service-page report-page">
            <div className="page-header">
                <button className="back-btn" onClick={onBack}>← Back to Services</button>
                <div className="page-title-section">
                    <h1 className="page-title">
                        <span className="page-icon"><BarChartIcon size={24} /></span>
                        Market & Competitive Report
                    </h1>
                    {data?.Brand_Name && (
                        <p className="page-subtitle">
                            Strategic analysis for {data.Brand_Name}
                            {data.Analysis_Date && ` • Generated ${data.Analysis_Date}`}
                        </p>
                    )}
                </div>
            </div>

            {/* Killer Hook Highlight */}
            {data?.Killer_Hook && (
                <div className="killer-hook">
                    <div className="hook-icon"><SparklesIcon size={24} /></div>
                    <div className="hook-content">
                        <span className="hook-label">The Killer Hook</span>
                        <p className="hook-text">{data.Killer_Hook}</p>
                    </div>
                </div>
            )}

            <div className="report-content">
                {renderTextSection(data?.Strategic_Vision, 'Strategic Vision', <TargetIcon size={18} />)}
                {renderTextSection(data?.Market_Gap, 'Market Gap Analysis', <LightbulbIcon size={18} />)}
                {renderTextSection(data?.Technical_Moat, 'Technical Moat', <SettingsIcon size={18} />)}
                {renderTextSection(data?.Strategic_Moat, 'Strategic Marketing Moat', <ShieldIcon size={18} />)}
                {renderCompetitiveMatrix(data?.Competitive_Matrix)}
                {renderServiceMap(data?.Service_Map)}
                {renderRoadmap(data?.Roadmap_90D)}
                {renderTextSection(data?.ROI_Engineering, 'ROI Engineering', <SparklesIcon size={18} />)}

                {data?.Authority_Pillars && (
                    <div className="report-section authority-pillars">
                        <h3 className="report-section-title">
                            <span className="section-icon"><BarChartIcon size={18} /></span>
                            Authority Pillars
                        </h3>
                        <div className="pillars-list">
                            {data.Authority_Pillars.split('\n').filter(p => p.trim()).map((pillar, idx) => (
                                <div key={idx} className="pillar-item">
                                    {pillar.replace(/^•\s*/, '')}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ReportPage
