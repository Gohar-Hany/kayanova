function MarketingPlanDisplay({ data }) {
    const plan = data?.marketing_plan || data

    const renderStrategySection = (strategies, title, icon) => {
        if (!strategies || strategies.length === 0) return null

        return (
            <div className="strategy-section">
                <h3 className="strategy-title">
                    <span className="section-icon">{icon}</span>
                    {title}
                </h3>
                <div className="strategies-grid">
                    {strategies.map((strategy, index) => (
                        <div key={index} className="strategy-card">
                            {strategy.name && <h4 className="strategy-name">{strategy.name}</h4>}
                            {strategy.description && <p className="strategy-desc">{strategy.description}</p>}
                            {strategy.tactics && (
                                <ul className="tactics-list">
                                    {strategy.tactics.map((tactic, i) => (
                                        <li key={i}>{tactic}</li>
                                    ))}
                                </ul>
                            )}
                            {strategy.budget && (
                                <div className="strategy-budget">Budget: {strategy.budget}</div>
                            )}
                            {strategy.timeline && (
                                <div className="strategy-timeline">Timeline: {strategy.timeline}</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    const renderObjectives = (objectives) => {
        if (!objectives) return null

        return (
            <div className="objectives-section">
                <h3 className="objectives-title">
                    <span className="section-icon">🎯</span>
                    Strategic Objectives
                </h3>
                <div className="objectives-grid">
                    {Array.isArray(objectives) ? (
                        objectives.map((obj, index) => (
                            <div key={index} className="objective-card">
                                <div className="objective-number">{index + 1}</div>
                                <p>{typeof obj === 'object' ? obj.objective || obj.name : obj}</p>
                            </div>
                        ))
                    ) : typeof objectives === 'object' ? (
                        Object.entries(objectives).map(([key, value]) => (
                            <div key={key} className="objective-card">
                                <h4>{key.replace(/_/g, ' ')}</h4>
                                <p>{value}</p>
                            </div>
                        ))
                    ) : (
                        <p>{objectives}</p>
                    )}
                </div>
            </div>
        )
    }

    const renderKPIs = (kpis) => {
        if (!kpis) return null

        return (
            <div className="kpis-section">
                <h3 className="kpis-title">
                    <span className="section-icon">📊</span>
                    Key Performance Indicators
                </h3>
                <div className="kpis-grid">
                    {Array.isArray(kpis) ? (
                        kpis.map((kpi, index) => (
                            <div key={index} className="kpi-card">
                                {typeof kpi === 'object' ? (
                                    <>
                                        <div className="kpi-name">{kpi.name || kpi.metric}</div>
                                        <div className="kpi-target">{kpi.target || kpi.value}</div>
                                    </>
                                ) : (
                                    <div className="kpi-name">{kpi}</div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>{JSON.stringify(kpis)}</p>
                    )}
                </div>
            </div>
        )
    }

    // Render generic content if structure is unknown
    const renderGenericContent = (content) => {
        if (!content) return null

        if (typeof content === 'string') {
            return <p className="plan-text">{content}</p>
        }

        if (Array.isArray(content)) {
            return (
                <ul className="plan-list">
                    {content.map((item, index) => (
                        <li key={index}>
                            {typeof item === 'object' ? JSON.stringify(item) : item}
                        </li>
                    ))}
                </ul>
            )
        }

        return (
            <div className="plan-sections">
                {Object.entries(content).map(([key, value]) => (
                    <div key={key} className="plan-section">
                        <h4 className="plan-section-title">
                            {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </h4>
                        <div className="plan-section-content">
                            {renderGenericContent(value)}
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className="marketing-plan-display">
            <div className="plan-header">
                <h2 className="plan-title">📈 Marketing Plan</h2>
                <p className="plan-subtitle">AI-generated actionable marketing strategy</p>
            </div>

            <div className="plan-content">
                {plan.objectives && renderObjectives(plan.objectives)}
                {plan.strategies && renderStrategySection(plan.strategies, 'Marketing Strategies', '🚀')}
                {plan.tactics && renderStrategySection(plan.tactics, 'Tactics', '⚡')}
                {plan.channels && renderStrategySection(plan.channels, 'Marketing Channels', '📢')}
                {plan.kpis && renderKPIs(plan.kpis)}
                {plan.budget && (
                    <div className="budget-section">
                        <h3><span className="section-icon">💰</span> Budget Allocation</h3>
                        {renderGenericContent(plan.budget)}
                    </div>
                )}
                {plan.timeline && (
                    <div className="timeline-section">
                        <h3><span className="section-icon">📅</span> Timeline</h3>
                        {renderGenericContent(plan.timeline)}
                    </div>
                )}

                {/* Fallback for unknown structure */}
                {!plan.objectives && !plan.strategies && !plan.kpis && (
                    renderGenericContent(plan)
                )}
            </div>
        </div>
    )
}

export default MarketingPlanDisplay
