import {
    TrendingDownIcon, BarChartIcon, BoltIcon, TrendingUpIcon, TargetIcon, BellIcon
} from '../Icons'

function Analytics() {
    return (
        <div className="coming-soon-module">
            <div className="coming-soon-header">
                <div className="coming-soon-icon"><TrendingDownIcon size={36} /></div>
                <h2 className="coming-soon-title">Analytics &amp; Insights</h2>
                <span className="coming-soon-badge">Coming Soon</span>
            </div>
            <p className="coming-soon-description">
                Track your marketing performance with AI-powered analytics.
                Get real-time insights, predictive forecasts, and actionable recommendations.
            </p>

            {/* Preview Metrics */}
            <div className="coming-soon-preview">
                <h4 className="preview-title">Analytics features:</h4>
                <div className="preview-features">
                    <div className="preview-feature">
                        <span className="preview-feature-icon"><BarChartIcon size={18} /></span>
                        <span>Performance Dashboards</span>
                    </div>
                    <div className="preview-feature">
                        <span className="preview-feature-icon"><BoltIcon size={18} /></span>
                        <span>Predictive Insights</span>
                    </div>
                    <div className="preview-feature">
                        <span className="preview-feature-icon"><TrendingUpIcon size={18} /></span>
                        <span>ROI Tracking</span>
                    </div>
                    <div className="preview-feature">
                        <span className="preview-feature-icon"><TargetIcon size={18} /></span>
                        <span>Goal Achievement</span>
                    </div>
                </div>
            </div>

            {/* Placeholder Charts */}
            <div className="analytics-preview-charts">
                <div className="preview-chart">
                    <div className="chart-placeholder">
                        <div className="chart-bars">
                            <div className="chart-bar" style={{ height: '60%' }}></div>
                            <div className="chart-bar" style={{ height: '80%' }}></div>
                            <div className="chart-bar" style={{ height: '45%' }}></div>
                            <div className="chart-bar" style={{ height: '90%' }}></div>
                            <div className="chart-bar" style={{ height: '70%' }}></div>
                        </div>
                    </div>
                    <span className="chart-label">Content Performance</span>
                </div>
                <div className="preview-chart">
                    <div className="chart-placeholder donut">
                        <div className="chart-donut"></div>
                    </div>
                    <span className="chart-label">Channel Distribution</span>
                </div>
            </div>

            <button className="coming-soon-notify-btn">
                <span><BellIcon size={16} /></span> Notify Me When Ready
            </button>
        </div>
    )
}

export default Analytics
