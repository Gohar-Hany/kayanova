function ReportDisplay({ data }) {
    // Handle the response structure
    const report = data?.analysis_report || data

    const renderSection = (content, title, icon) => {
        if (!content) return null

        return (
            <div className="report-section">
                <h3 className="report-section-title">
                    <span className="section-icon">{icon}</span>
                    {title}
                </h3>
                <div className="report-section-content">
                    {Array.isArray(content) ? (
                        <ul className="report-list">
                            {content.map((item, index) => (
                                <li key={index}>
                                    {typeof item === 'object' ? (
                                        <div className="list-item-complex">
                                            {item.tier && <strong className="tier-name">{item.tier}</strong>}
                                            {item.competitor_names && (
                                                <p>Competitors: {item.competitor_names.join(', ')}</p>
                                            )}
                                            {item.primary_weakness && (
                                                <p className="weakness">Weakness: {item.primary_weakness}</p>
                                            )}
                                        </div>
                                    ) : (
                                        item
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : typeof content === 'object' ? (
                        <div className="roadmap-phases">
                            {Object.entries(content).map(([phase, description]) => (
                                <div key={phase} className="roadmap-phase">
                                    <div className="phase-title">
                                        {phase.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                    </div>
                                    <p>{description}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="report-text">{content}</p>
                    )}
                </div>
            </div>
        )
    }

    return (
        <div className="report-display">
            <div className="report-header">
                <h2 className="report-title">📊 Strategic Market Report</h2>
            </div>

            <div className="report-grid">
                {renderSection(report.executive_strategic_vision, 'Executive Strategic Vision', '🎯')}
                {renderSection(report.the_killer_hook, 'The Killer Hook', '💎')}
                {renderSection(report.competitive_landscape_matrix, 'Competitive Landscape', '🏆')}
                {renderSection(report.the_winning_gap_analysis, 'Winning Gap Analysis', '🔮')}
                {renderSection(report.technical_competitive_moat, 'Technical Moat', '⚙️')}
                {renderSection(report.strategic_marketing_moat, 'Marketing Moat', '📈')}
                {renderSection(report.execution_roadmap_90d, '90-Day Roadmap', '🗓️')}
                {renderSection(report.brand_authority_pillars, 'Brand Authority Pillars', '🏛️')}
                {renderSection(report.roi_and_value_engineering, 'ROI & Value Engineering', '💰')}
            </div>
        </div>
    )
}

export default ReportDisplay
