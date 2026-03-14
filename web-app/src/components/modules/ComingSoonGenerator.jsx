import { ConstructionIcon, CheckIcon, BellIcon } from '../Icons'

function ComingSoonGenerator({ title, icon, description }) {
    return (
        <div className="generator-coming-soon">
            <div className="generator-header">
                <div className="generator-icon-large">{icon}</div>
                <h2 className="generator-title">{title}</h2>
                <span className="generator-status-badge">Coming Soon</span>
            </div>

            <p className="generator-description">{description}</p>

            <div className="generator-placeholder">
                <div className="placeholder-card">
                    <div className="placeholder-icon"><ConstructionIcon size={36} /></div>
                    <h3>Under Active Development</h3>
                    <p>This generator is being built and will be available soon. All existing generators continue to work normally.</p>
                </div>

                <div className="placeholder-features">
                    <div className="placeholder-feature">
                        <span className="feature-check"><CheckIcon size={14} /></span>
                        <span>AI-powered generation</span>
                    </div>
                    <div className="placeholder-feature">
                        <span className="feature-check"><CheckIcon size={14} /></span>
                        <span>Credit-based usage</span>
                    </div>
                    <div className="placeholder-feature">
                        <span className="feature-check"><CheckIcon size={14} /></span>
                        <span>Export &amp; download</span>
                    </div>
                    <div className="placeholder-feature">
                        <span className="feature-check"><CheckIcon size={14} /></span>
                        <span>Customizable output</span>
                    </div>
                </div>
            </div>

            <button className="notify-btn">
                <span><BellIcon size={16} /></span>
                Notify Me When Ready
            </button>
        </div>
    )
}

export default ComingSoonGenerator
