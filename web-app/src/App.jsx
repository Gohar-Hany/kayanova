import { useState } from 'react'
import LoadingScreen from './components/LoadingScreen'
import AppLayout from './components/layout/AppLayout'
import Dashboard from './components/modules/Dashboard'
import AIChat from './components/modules/AIChat'
import Documents from './components/modules/Documents'
import Automations from './components/modules/Automations'
import Analytics from './components/modules/Analytics'
import ComingSoonGenerator from './components/modules/ComingSoonGenerator'
import LandingPage from './components/LandingPage'
import StartPage from './components/StartPage'
import CompetitorAnalysisPage from './components/pages/CompetitorAnalysisPage'
import ReportPage from './components/pages/ReportPage'
import MarketingPlanPage from './components/pages/MarketingPlanPage'
import ContentCalendarPage from './components/pages/ContentCalendarPage'
import BuyerPersonasPage from './components/pages/BuyerPersonasPage'
import CampaignStrategyPage from './components/pages/CampaignStrategyPage'
import BrandVoicePage from './components/pages/BrandVoicePage'
import AdCopyPage from './components/pages/AdCopyPage'
import SocialScriptsPage from './components/pages/SocialScriptsPage'
import EmailSequencesPage from './components/pages/EmailSequencesPage'
import WebsiteCopyPage from './components/pages/WebsiteCopyPage'
import SEOStrategyPage from './components/pages/SEOStrategyPage'
import { generateMarketingPlan } from './services/api'
import { PaletteIcon } from './components/Icons'

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [currentModule, setCurrentModule] = useState('dashboard')
    const [credits, setCredits] = useState(2500)
    const [userData, setUserData] = useState({
        url: '',
        file: null
    })
    const [appReady, setAppReady] = useState(false)

    // LINKED generation state - Marketing Plan and Content Calendar generate together
    const [linkedGenerationState, setLinkedGenerationState] = useState({
        loading: false,
        generated: false
    })

    // Handle linked generation (Marketing Plan + Content Calendar)
    const handleLinkedGeneration = async () => {
        if (linkedGenerationState.loading) return

        setLinkedGenerationState({ loading: true, generated: false })

        try {
            // Single POST call generates BOTH (they share the same endpoint)
            await generateMarketingPlan()
            setLinkedGenerationState({ loading: false, generated: true })
        } catch (error) {
            console.error('Failed to generate:', error)
            setLinkedGenerationState({ loading: false, generated: false })
        }
    }

    // Handle successful transformation (from modal)
    const handleTransformSuccess = (data) => {
        setUserData({
            url: data.url || '',
            file: data.file || null
        })
        setIsLoggedIn(true)
        setCurrentModule('dashboard')
    }

    // Landing page flow handlers (direct entry without modal)
    const handleStart = () => {
        setIsLoggedIn(true)
        setCurrentModule('dashboard')
    }

    // Return to home/landing page
    const handleReturnHome = () => {
        setIsLoggedIn(false)
        setCurrentModule('dashboard')
        setUserData({ url: '', file: null })
        // Reset generation states when returning home
        setLinkedGenerationState({ loading: false, generated: false })
    }

    const handleModuleChange = (moduleId) => {
        setCurrentModule(moduleId)
    }

    const handleNavigateFromDashboard = (moduleId) => {
        setCurrentModule(moduleId)
    }

    const handleBackToServices = () => {
        setCurrentModule('dashboard')
    }

    // Coming Soon generators metadata (Design Assets only now)
    const generatorMeta = {
        design: { title: 'Design Assets', icon: <PaletteIcon size={32} />, description: 'Generate design briefs and visual assets' },
    }

    // Render the appropriate module content
    const renderModule = () => {
        switch (currentModule) {
            case 'dashboard':
                return (
                    <Dashboard
                        userData={userData}
                        onNavigate={handleNavigateFromDashboard}
                        linkedGenerationState={linkedGenerationState}
                        onLinkedGeneration={handleLinkedGeneration}
                    />
                )
            case 'chat':
                return <AIChat userData={userData} onNavigate={handleModuleChange} />
            case 'competitor':
                return <CompetitorAnalysisPage onBack={handleBackToServices} userData={userData} embedded={true} />
            case 'report':
                return <ReportPage onBack={handleBackToServices} userData={userData} embedded={true} />
            case 'marketing':
                return <MarketingPlanPage onBack={handleBackToServices} userData={userData} embedded={true} />
            case 'calendar':
                return <ContentCalendarPage onBack={handleBackToServices} userData={userData} embedded={true} />
            case 'personas':
                return <BuyerPersonasPage onBack={handleBackToServices} />
            case 'campaign':
                return <CampaignStrategyPage onBack={handleBackToServices} />
            case 'brandvoice':
                return <BrandVoicePage onBack={handleBackToServices} />
            case 'adcopy':
                return <AdCopyPage onBack={handleBackToServices} />
            case 'social':
                return <SocialScriptsPage onBack={handleBackToServices} />
            case 'email':
                return <EmailSequencesPage onBack={handleBackToServices} />
            case 'websitecopy':
                return <WebsiteCopyPage onBack={handleBackToServices} />
            case 'seo':
                return <SEOStrategyPage onBack={handleBackToServices} />
            case 'documents':
                return <Documents />
            case 'automations':
                return <Automations />
            case 'analytics':
                return <Analytics />
            // Coming Soon - Design Assets only
            case 'design':
                const meta = generatorMeta[currentModule]
                return <ComingSoonGenerator title={meta.title} icon={meta.icon} description={meta.description} />
            default:
                return (
                    <Dashboard
                        userData={userData}
                        onNavigate={handleNavigateFromDashboard}
                        linkedGenerationState={linkedGenerationState}
                        onLinkedGeneration={handleLinkedGeneration}
                    />
                )
        }
    }

    // If not logged in, show landing page flow
    if (!isLoggedIn) {
        return (
            <>
                {!appReady && <LoadingScreen onComplete={() => setAppReady(true)} />}
                <div className={`app ${appReady ? 'app--ready' : 'app--hidden'}`}>
                    {/* Header */}
                    <header className="header">
                        <div className="header-content">
                            <div className="logo" onClick={handleReturnHome} style={{ cursor: 'pointer' }}>
                                <img src="/kayanova-logo.png" alt="Kayanova" className="logo-image" />
                            </div>
                            <div className="header-right">
                                <button className="btn btn-primary" onClick={handleStart}>
                                    Enter Dashboard
                                </button>
                                <span className="header-badge">Fully Automated</span>
                            </div>
                        </div>
                    </header>

                    {/* Main Content */}
                    <main className="main">
                        <LandingPage onStart={handleStart} onTransformSuccess={handleTransformSuccess} />
                    </main>

                    {/* Footer */}
                    <footer className="footer">
                        <p>© 2024 Kayanova — A Fully Automated Marketing Agency</p>
                    </footer>
                </div>
            </>
        )
    }

    // Logged in - show the Marketing OS dashboard
    return (
        <AppLayout
            currentModule={currentModule}
            onModuleChange={handleModuleChange}
            onReturnHome={handleReturnHome}
            credits={credits}
        >
            {renderModule()}
        </AppLayout>
    )
}

export default App
