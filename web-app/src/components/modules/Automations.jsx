import {
    BoltIcon, CalendarIcon, EyeIcon, TrendingUpIcon,
    ClockIcon, RefreshIcon, TargetIcon, BarChartIcon, BellIcon
} from '../Icons'

function Automations() {
    const automationPreviews = [
        {
            id: 1,
            title: 'Weekly Content Generator',
            description: 'Auto-generate content calendars every Monday',
            status: 'preview',
            icon: <CalendarIcon size={22} />
        },
        {
            id: 2,
            title: 'Competitor Watch',
            description: 'Monitor competitors and alert on changes',
            status: 'preview',
            icon: <EyeIcon size={22} />
        },
        {
            id: 3,
            title: 'Performance Reporter',
            description: 'Weekly marketing performance summaries',
            status: 'preview',
            icon: <TrendingUpIcon size={22} />
        },
    ]

    return (
        <div className="coming-soon-module">
            <div className="coming-soon-header">
                <div className="coming-soon-icon"><BoltIcon size={36} /></div>
                <h2 className="coming-soon-title">Automation Hub</h2>
                <span className="coming-soon-badge">Coming Soon</span>
            </div>
            <p className="coming-soon-description">
                Set up automated workflows that run your marketing on autopilot.
                Schedule recurring generations, trigger actions based on events, and scale without lifting a finger.
            </p>

            {/* Preview Features */}
            <div className="coming-soon-preview">
                <h4 className="preview-title">Automation capabilities:</h4>
                <div className="preview-features">
                    <div className="preview-feature">
                        <span className="preview-feature-icon"><ClockIcon size={18} /></span>
                        <span>Scheduled Generations</span>
                    </div>
                    <div className="preview-feature">
                        <span className="preview-feature-icon"><RefreshIcon size={18} /></span>
                        <span>Recurring Workflows</span>
                    </div>
                    <div className="preview-feature">
                        <span className="preview-feature-icon"><TargetIcon size={18} /></span>
                        <span>Trigger-based Actions</span>
                    </div>
                    <div className="preview-feature">
                        <span className="preview-feature-icon"><BarChartIcon size={18} /></span>
                        <span>Automation Analytics</span>
                    </div>
                </div>
            </div>

            {/* Automation Previews */}
            <div className="automation-previews">
                {automationPreviews.map((automation) => (
                    <div key={automation.id} className="automation-preview-card">
                        <div className="automation-icon">{automation.icon}</div>
                        <div className="automation-content">
                            <h5 className="automation-title">{automation.title}</h5>
                            <p className="automation-description">{automation.description}</p>
                        </div>
                        <span className="automation-status">Preview</span>
                    </div>
                ))}
            </div>

            <button className="coming-soon-notify-btn">
                <span><BellIcon size={16} /></span> Get Early Access
            </button>
        </div>
    )
}

export default Automations
