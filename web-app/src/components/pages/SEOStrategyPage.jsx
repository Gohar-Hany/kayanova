import { useState } from 'react'

function SEOStrategyPage({ onBack }) {
    const [showResults, setShowResults] = useState(true)

    // Static SEO strategy data
    const seoStrategy = {
        overview: {
            domain: 'kayanova.ai',
            currentDA: 25,
            targetDA: 45,
            timeline: '6 months',
            primaryGoal: 'Rank top 3 for "marketing automation" related keywords'
        },
        keywordStrategy: {
            primary: [
                { keyword: 'marketing automation software', volume: '12,100', difficulty: 67, currentRank: 24 },
                { keyword: 'AI marketing tools', volume: '8,100', difficulty: 54, currentRank: 18 },
                { keyword: 'automated marketing platform', volume: '5,400', difficulty: 48, currentRank: 31 }
            ],
            secondary: [
                { keyword: 'marketing automation for small business', volume: '3,600', difficulty: 42, currentRank: '-' },
                { keyword: 'AI content generation', volume: '6,600', difficulty: 51, currentRank: 45 },
                { keyword: 'marketing campaign automation', volume: '2,900', difficulty: 39, currentRank: '-' }
            ],
            longTail: [
                { keyword: 'how to automate marketing campaigns', volume: '1,300', difficulty: 28, currentRank: 12 },
                { keyword: 'best AI tools for marketing 2024', volume: '2,400', difficulty: 35, currentRank: 8 },
                { keyword: 'marketing automation vs traditional marketing', volume: '880', difficulty: 22, currentRank: 5 }
            ]
        },
        contentPlan: [
            { type: 'Pillar Page', title: 'The Complete Guide to Marketing Automation', targetKeyword: 'marketing automation', wordCount: '5,000+', priority: 'High' },
            { type: 'Blog Post', title: '15 AI Marketing Tools That Actually Work', targetKeyword: 'AI marketing tools', wordCount: '3,000', priority: 'High' },
            { type: 'Comparison', title: 'Marketing Automation vs Hiring an Agency', targetKeyword: 'marketing automation vs agency', wordCount: '2,500', priority: 'Medium' },
            { type: 'Tutorial', title: 'How to Set Up Automated Email Sequences', targetKeyword: 'automated email sequences', wordCount: '2,000', priority: 'Medium' },
            { type: 'Case Study', title: 'How [Company] Saved 20 Hours/Week with Automation', targetKeyword: 'marketing automation case study', wordCount: '1,500', priority: 'High' }
        ],
        technicalSEO: [
            { task: 'Improve Core Web Vitals', status: 'In Progress', impact: 'High', details: 'LCP: 2.8s → Target 2.0s' },
            { task: 'Add Schema Markup', status: 'Pending', impact: 'Medium', details: 'Organization, Product, FAQ schemas' },
            { task: 'Fix Broken Links', status: 'Completed', impact: 'Low', details: '12 broken links fixed' },
            { task: 'Optimize Images', status: 'Pending', impact: 'Medium', details: 'Convert to WebP, add lazy loading' },
            { task: 'Create XML Sitemap', status: 'Completed', impact: 'High', details: 'Auto-updating sitemap implemented' }
        ],
        linkBuilding: {
            currentBacklinks: 145,
            targetBacklinks: 500,
            monthlyTarget: 60,
            strategies: [
                { strategy: 'Guest Posting', description: 'Publish on marketing industry blogs', target: '10/month' },
                { strategy: 'Digital PR', description: 'News coverage and press releases', target: '2/month' },
                { strategy: 'Resource Link Building', description: 'Get listed on "best tools" pages', target: '15/month' },
                { strategy: 'Broken Link Building', description: 'Find and replace broken links', target: '20/month' }
            ]
        },
        monthlyTargets: [
            { month: 'Month 1-2', focus: 'Technical SEO fixes & content foundation', keyMetric: 'Fix 100% of technical issues' },
            { month: 'Month 3-4', focus: 'Content publishing & link building', keyMetric: '20 new backlinks, 5 pieces published' },
            { month: 'Month 5-6', focus: 'Scale content & authority building', keyMetric: 'Page 1 rankings for 3+ keywords' }
        ]
    }

    return (
        <div className="generator-page">
            <div className="generator-header-section">
                <div className="generator-title-row">
                    <h1>🔎 SEO Strategy</h1>
                    <span className="generator-badge active">Active</span>
                </div>
                <p className="generator-description">
                    Comprehensive SEO strategy with keyword research, content plans, and technical audits.
                </p>
            </div>

            {showResults && (
                <div className="generator-results">
                    <div className="results-header">
                        <h2>SEO Growth Strategy</h2>
                        <div className="results-actions">
                            <button className="btn btn-secondary">Edit Strategy</button>
                            <button className="btn btn-primary">Export PDF</button>
                        </div>
                    </div>

                    {/* Overview */}
                    <div className="seo-overview">
                        <div className="overview-grid">
                            <div className="overview-item">
                                <span className="overview-label">Domain</span>
                                <span className="overview-value">{seoStrategy.overview.domain}</span>
                            </div>
                            <div className="overview-item">
                                <span className="overview-label">Current DA</span>
                                <span className="overview-value">{seoStrategy.overview.currentDA}</span>
                            </div>
                            <div className="overview-item">
                                <span className="overview-label">Target DA</span>
                                <span className="overview-value">{seoStrategy.overview.targetDA}</span>
                            </div>
                            <div className="overview-item">
                                <span className="overview-label">Timeline</span>
                                <span className="overview-value">{seoStrategy.overview.timeline}</span>
                            </div>
                        </div>
                        <div className="primary-goal">
                            <strong>Primary Goal:</strong> {seoStrategy.overview.primaryGoal}
                        </div>
                    </div>

                    {/* Keyword Strategy */}
                    <div className="seo-section">
                        <h3>Keyword Strategy</h3>

                        <div className="keyword-category">
                            <h4>Primary Keywords (High Priority)</h4>
                            <div className="keyword-table">
                                <div className="table-header">
                                    <span>Keyword</span>
                                    <span>Volume</span>
                                    <span>Difficulty</span>
                                    <span>Current Rank</span>
                                </div>
                                {seoStrategy.keywordStrategy.primary.map((kw, i) => (
                                    <div key={i} className="table-row">
                                        <span className="keyword-name">{kw.keyword}</span>
                                        <span>{kw.volume}</span>
                                        <span className="difficulty">{kw.difficulty}/100</span>
                                        <span className="rank">{kw.currentRank}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="keyword-category">
                            <h4>Long-Tail Keywords (Quick Wins)</h4>
                            <div className="keyword-table">
                                <div className="table-header">
                                    <span>Keyword</span>
                                    <span>Volume</span>
                                    <span>Difficulty</span>
                                    <span>Current Rank</span>
                                </div>
                                {seoStrategy.keywordStrategy.longTail.map((kw, i) => (
                                    <div key={i} className="table-row">
                                        <span className="keyword-name">{kw.keyword}</span>
                                        <span>{kw.volume}</span>
                                        <span className="difficulty low">{kw.difficulty}/100</span>
                                        <span className="rank good">{kw.currentRank}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Content Plan */}
                    <div className="seo-section">
                        <h3>Content Plan</h3>
                        <div className="content-plan-grid">
                            {seoStrategy.contentPlan.map((content, i) => (
                                <div key={i} className="content-plan-card">
                                    <span className={`content-type ${content.priority.toLowerCase()}`}>{content.type}</span>
                                    <h4>{content.title}</h4>
                                    <div className="content-meta">
                                        <span>🎯 {content.targetKeyword}</span>
                                        <span>📝 {content.wordCount} words</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Technical SEO */}
                    <div className="seo-section">
                        <h3>Technical SEO Tasks</h3>
                        <div className="technical-tasks">
                            {seoStrategy.technicalSEO.map((task, i) => (
                                <div key={i} className="tech-task-card">
                                    <div className="task-header">
                                        <span className={`task-status ${task.status.toLowerCase().replace(' ', '-')}`}>
                                            {task.status}
                                        </span>
                                        <span className={`task-impact ${task.impact.toLowerCase()}`}>
                                            {task.impact} Impact
                                        </span>
                                    </div>
                                    <h4>{task.task}</h4>
                                    <p>{task.details}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Link Building */}
                    <div className="seo-section">
                        <h3>Link Building Strategy</h3>
                        <div className="link-stats">
                            <div className="link-stat">
                                <span className="stat-value">{seoStrategy.linkBuilding.currentBacklinks}</span>
                                <span className="stat-label">Current Backlinks</span>
                            </div>
                            <div className="link-stat">
                                <span className="stat-value">{seoStrategy.linkBuilding.targetBacklinks}</span>
                                <span className="stat-label">Target Backlinks</span>
                            </div>
                            <div className="link-stat">
                                <span className="stat-value">{seoStrategy.linkBuilding.monthlyTarget}</span>
                                <span className="stat-label">Monthly Target</span>
                            </div>
                        </div>
                        <div className="link-strategies">
                            {seoStrategy.linkBuilding.strategies.map((s, i) => (
                                <div key={i} className="strategy-card">
                                    <h4>{s.strategy}</h4>
                                    <p>{s.description}</p>
                                    <span className="strategy-target">Target: {s.target}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default SEOStrategyPage
