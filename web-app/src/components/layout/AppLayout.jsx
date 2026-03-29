import { useState } from 'react'
import {
    DashboardIcon, ChatBotIcon, SettingsIcon, ExitIcon,
    BellIcon, UserIcon, ArrowLeftIcon, BoltIcon
} from '../Icons'

function AppLayout({ children, currentModule, onModuleChange, onReturnHome, credits = 2500 }) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

    // Check if we're on the dashboard
    const isOnDashboard = currentModule === 'dashboard'

    // Get current page title for header
    const getPageTitle = () => {
        const titles = {
            dashboard: 'Dashboard',
            chat: 'AI Command Center',
            marketing: 'Marketing Plan',
            report: 'Market Research',
            competitor: 'Competitor Analysis',
            calendar: 'Content Calendar',
            personas: 'Buyer Personas',
            campaign: 'Campaign Strategy',
            brandvoice: 'Brand Voice Guide',
            adcopy: 'Ad Copy Machine',
            social: 'Social Scripts',
            email: 'Email Sequences',
            websitecopy: 'Website Copy',
            seo: 'SEO Strategy',
        }
        return titles[currentModule] || 'Dashboard'
    }

    return (
        <div className={`app-layout-new ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
            {/* Accessibility Skip Link */}
            <a href="#main-content" className="skip-link">
                Skip to Content
            </a>

            {/* Minimal Sidebar */}
            <aside className="sidebar-minimal">
                {/* Logo */}
                <div className="sidebar-logo-section">
                    <div className="sidebar-logo" onClick={onReturnHome} title="Return to Home">
                        <img src="/kayanova-logo.png" alt="Kayanova" className="sidebar-logo-img" />
                    </div>
                </div>

                {/* Main Nav */}
                <nav className="sidebar-main-nav">
                    <button
                        className={`sidebar-nav-item ${isOnDashboard ? 'active' : ''}`}
                        onClick={() => onModuleChange('dashboard')}
                        title="Dashboard"
                    >
                        <span className="nav-item-icon"><DashboardIcon /></span>
                        <span className="nav-item-label">Dashboard</span>
                    </button>
                    <button
                        className={`sidebar-nav-item ${currentModule === 'chat' ? 'active' : ''}`}
                        onClick={() => onModuleChange('chat')}
                        title="AI Command Center"
                    >
                        <span className="nav-item-icon"><ChatBotIcon /></span>
                        <span className="nav-item-label">AI Agent</span>
                        <span className="nav-live-badge">Live</span>
                    </button>
                </nav>

                {/* Spacer */}
                <div className="sidebar-spacer"></div>

                {/* Credits Widget */}
                <div className="sidebar-credits">
                    <div className="credits-info">
                        <span className="credits-icon"><BoltIcon size={14} /></span>
                        <span className="credits-value">{credits.toLocaleString()}</span>
                    </div>
                    <div className="credits-bar-mini">
                        <div
                            className="credits-bar-fill"
                            style={{ width: `${Math.min((credits / 5000) * 100, 100)}%` }}
                        ></div>
                    </div>
                    <button className="upgrade-btn-small">Upgrade</button>
                </div>

                {/* Bottom Actions */}
                <div className="sidebar-bottom">
                    <button className="sidebar-nav-item" title="Settings" aria-label="Settings">
                        <span className="nav-item-icon"><SettingsIcon /></span>
                        <span className="nav-item-label">Settings</span>
                    </button>
                    <button className="sidebar-nav-item" onClick={onReturnHome} title="Exit" aria-label="Exit to home">
                        <span className="nav-item-icon"><ExitIcon /></span>
                        <span className="nav-item-label">Exit</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="main-content-new">
                {/* Top Header */}
                <header className="top-header-new">
                    <div className="header-left">
                        {/* Back to Dashboard button - always visible when not on dashboard */}
                        {!isOnDashboard && (
                            <button
                                className="back-to-dashboard-btn"
                                onClick={() => onModuleChange('dashboard')}
                            >
                                <span className="back-arrow"><ArrowLeftIcon /></span>
                                <span>Dashboard</span>
                            </button>
                        )}
                        <h1 className="page-title">{getPageTitle()}</h1>
                    </div>
                    <div className="header-right">
                        <div className="header-credits-display">
                            <span className="credits-icon-sm"><BoltIcon size={14} /></span>
                            <span>{credits.toLocaleString()} credits</span>
                        </div>
                        <button className="header-icon-btn" title="Notifications" aria-label="Notifications">
                            <BellIcon size={18} />
                        </button>
                        <div className="header-avatar" aria-label="User profile">
                            <UserIcon size={18} />
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main id="main-content" className="content-area-new">
                    {children}
                </main>
            </div>

            {/* ElevenLabs Voice AI Assistant - Floating Widget */}
            <div className="elevenlabs-widget-container">
                <elevenlabs-convai agent-id="agent_2701kcqc3zzwf1xr3aqjsje04hym"></elevenlabs-convai>
            </div>
        </div>
    )
}

export default AppLayout
