import { BarChartIcon, TargetIcon, StarIcon, BarChartIcon as TrophyIcon, SearchIcon, SettingsIcon, TrendingUpIcon, CalendarIcon, ShieldIcon, BoltIcon } from '../Icons'

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
                <h2 className="report-title"><BarChartIcon size={20} /> Strategic Market Report</h2>
            </div>

            <div className="report-grid">
                {renderSection(report.executive_strategic_vision, 'Executive Strategic Vision', <TargetIcon size={18} />)}
                {renderSection(report.the_killer_hook, 'The Killer Hook', <StarIcon size={18} />)}
                {renderSection(report.competitive_landscape_matrix, 'Competitive Landscape', <TrophyIcon size={18} />)}
                {renderSection(report.the_winning_gap_analysis, 'Winning Gap Analysis', <SearchIcon size={18} />)}
                {renderSection(report.technical_competitive_moat, 'Technical Moat', <SettingsIcon size={18} />)}
                {renderSection(report.strategic_marketing_moat, 'Marketing Moat', <TrendingUpIcon size={18} />)}
                {renderSection(report.execution_roadmap_90d, '90-Day Roadmap', <CalendarIcon size={18} />)}
                {renderSection(report.brand_authority_pillars, 'Brand Authority Pillars', <ShieldIcon size={18} />)}
                {renderSection(report.roi_and_value_engineering, 'ROI & Value Engineering', <BoltIcon size={18} />)}
            </div>
        </div>
    )
}

export default ReportDisplay
