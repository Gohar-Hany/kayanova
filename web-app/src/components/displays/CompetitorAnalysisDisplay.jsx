import { FileIcon, TrendingUpIcon } from '../Icons'

function CompetitorAnalysisDisplay({ data }) {
    // Handle array or object response
    const competitors = Array.isArray(data) ? data : [data]

    const renderSection = (section, title) => {
        if (!section) return null

        return (
            <div className="analysis-section">
                <h4 className="section-header">
                    <span className="section-icon">{section.icon || <FileIcon size={18} />}</span>
                    {section.title || title}
                </h4>
                <div className="section-content">
                    {renderSectionData(section.data)}
                </div>
            </div>
        )
    }

    const renderSectionData = (data) => {
        if (!data) return <p className="no-data">No data available</p>

        // Handle array of items (like services)
        if (Array.isArray(data)) {
            return (
                <ul className="data-list">
                    {data.map((item, index) => (
                        <li key={index} className="data-item">
                            {typeof item === 'object' ? (
                                <>
                                    <strong>{item.name}</strong>
                                    {item.description && <p className="item-description">{item.description}</p>}
                                </>
                            ) : (
                                item
                            )}
                        </li>
                    ))}
                </ul>
            )
        }

        // Handle object with type
        if (data.type === 'list') {
            const items = data.points || data.segments || []
            return (
                <ul className="data-list">
                    {items.map((item, index) => (
                        <li key={index} className="data-item">
                            {typeof item === 'object' ? item.segment || item.name || JSON.stringify(item) : item}
                        </li>
                    ))}
                </ul>
            )
        }

        if (data.type === 'structured' && data.data) {
            return renderStructuredData(data.data)
        }

        if (data.type === 'text') {
            return <p className="text-content">{data.content}</p>
        }

        // Handle plain object
        if (typeof data === 'object') {
            return renderStructuredData(data)
        }

        return <p className="text-content">{String(data)}</p>
    }

    const renderStructuredData = (data) => {
        if (!data) return null

        return (
            <div className="structured-data">
                {Object.entries(data).map(([key, value]) => {
                    if (value === null || value === undefined) return null

                    const formattedKey = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())

                    return (
                        <div key={key} className="data-field">
                            <span className="field-label">{formattedKey}:</span>
                            <span className="field-value">
                                {Array.isArray(value) ? (
                                    <ul className="inline-list">
                                        {value.map((item, i) => (
                                            <li key={i}>
                                                {typeof item === 'object'
                                                    ? (item.feature || item.segment || item.name || JSON.stringify(item))
                                                    : item
                                                }
                                            </li>
                                        ))}
                                    </ul>
                                ) : typeof value === 'object' ? (
                                    JSON.stringify(value)
                                ) : (
                                    String(value)
                                )}
                            </span>
                        </div>
                    )
                })}
            </div>
        )
    }

    return (
        <div className="competitor-analysis-display">
            {competitors.map((competitor, index) => (
                <div key={competitor.id || index} className="competitor-card">
                    <div className="competitor-header">
                        <h3 className="competitor-title">
                            Competitor {competitor.competitor_number || index + 1}
                        </h3>
                        {competitor.source?.domain && (
                            <span className="competitor-source">{competitor.source.domain}</span>
                        )}
                    </div>

                    <div className="competitor-sections">
                        {renderSection(competitor.services, 'Services')}
                        {renderSection(competitor.target_audience, 'Target Audience')}
                        {renderSection(competitor.unique_selling_proposition, 'USP')}
                        {renderSection(competitor.pricing, 'Pricing')}
                        {renderSection(competitor.content_style, 'Content Style')}
                    </div>

                    {competitor.extras?.success_metrics && (
                        <div className="success-metrics">
                            <h4 className="section-header">
                                <span className="section-icon"><TrendingUpIcon size={18} /></span>
                                Success Metrics
                            </h4>
                            <ul className="metrics-list">
                                {competitor.extras.success_metrics.map((metric, i) => (
                                    <li key={i}>{metric}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

export default CompetitorAnalysisDisplay
