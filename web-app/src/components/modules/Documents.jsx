function Documents() {
    const placeholderDocs = [
        { id: 1, type: 'competitor', title: 'Competitor Analysis - Q4 2024', date: 'Dec 15, 2024', icon: '🔍' },
        { id: 2, type: 'marketing', title: 'Marketing Strategy 2025', date: 'Dec 10, 2024', icon: '🎯' },
        { id: 3, type: 'report', title: 'Market Research Report', date: 'Dec 5, 2024', icon: '📊' },
    ]

    return (
        <div className="coming-soon-module">
            <div className="coming-soon-header">
                <div className="coming-soon-icon">📁</div>
                <h2 className="coming-soon-title">Documents & Assets</h2>
                <span className="coming-soon-badge">Coming Soon</span>
            </div>
            <p className="coming-soon-description">
                Your centralized library for all generated documents, reports, and marketing assets.
                Access, search, and organize everything created by your AI Marketing OS.
            </p>

            {/* Preview Grid */}
            <div className="coming-soon-preview">
                <h4 className="preview-title">What to expect:</h4>
                <div className="preview-features">
                    <div className="preview-feature">
                        <span className="preview-feature-icon">📄</span>
                        <span>All Generated Reports</span>
                    </div>
                    <div className="preview-feature">
                        <span className="preview-feature-icon">🔍</span>
                        <span>Smart Search & Filters</span>
                    </div>
                    <div className="preview-feature">
                        <span className="preview-feature-icon">📤</span>
                        <span>Export & Share</span>
                    </div>
                    <div className="preview-feature">
                        <span className="preview-feature-icon">📂</span>
                        <span>Organized Collections</span>
                    </div>
                </div>
            </div>

            {/* Placeholder Documents */}
            <div className="placeholder-documents">
                {placeholderDocs.map((doc) => (
                    <div key={doc.id} className="placeholder-doc-card">
                        <span className="doc-icon">{doc.icon}</span>
                        <div className="doc-info">
                            <span className="doc-title">{doc.title}</span>
                            <span className="doc-date">{doc.date}</span>
                        </div>
                        <span className="doc-lock">🔒</span>
                    </div>
                ))}
            </div>

            <button className="coming-soon-notify-btn">
                <span>🔔</span> Notify Me When Ready
            </button>
        </div>
    )
}

export default Documents
