import { useState } from 'react'

function BuyerPersonasPage({ onBack }) {
    const [isGenerating, setIsGenerating] = useState(false)
    const [showResults, setShowResults] = useState(true)

    // Static demo data for buyer personas
    const personas = [
        {
            id: 1,
            name: 'Tech-Savvy Sarah',
            role: 'Marketing Director',
            age: '32-40',
            income: '$85,000 - $120,000',
            avatar: '👩‍💼',
            traits: ['Data-driven', 'Early adopter', 'ROI-focused', 'Time-conscious'],
            goals: ['Increase marketing efficiency', 'Prove marketing ROI', 'Automate repetitive tasks'],
            painPoints: ['Limited budget', 'Small team', 'Too many tools', 'Reporting complexity'],
            channels: ['LinkedIn', 'Email', 'Webinars', 'Industry blogs'],
            buyingBehavior: 'Research-heavy, needs social proof, 3-6 month decision cycle',
            quote: '"I need tools that work seamlessly together and save my team hours every week."'
        },
        {
            id: 2,
            name: 'Startup Steve',
            role: 'Founder / CEO',
            age: '28-38',
            income: '$100,000 - $200,000',
            avatar: '👨‍💻',
            traits: ['Visionary', 'Growth-obsessed', 'Budget-conscious', 'Hands-on'],
            goals: ['Scale quickly', 'Build brand awareness', 'Generate leads', 'Outpace competitors'],
            painPoints: ['Limited resources', 'Wearing many hats', 'Lack of marketing expertise', 'Need fast results'],
            channels: ['Twitter/X', 'Product Hunt', 'Tech podcasts', 'VC networks'],
            buyingBehavior: 'Fast decision maker, values free trials, influenced by peer recommendations',
            quote: '"I don\'t have time to become a marketing expert - I need something that just works."'
        },
        {
            id: 3,
            name: 'Enterprise Emma',
            role: 'VP of Marketing',
            age: '40-50',
            income: '$150,000 - $250,000',
            avatar: '👩‍💼',
            traits: ['Strategic thinker', 'Risk-averse', 'Team-oriented', 'Process-driven'],
            goals: ['Drive brand consistency', 'Manage large campaigns', 'Demonstrate leadership value', 'Integrate with existing stack'],
            painPoints: ['Complex approval processes', 'Multiple stakeholders', 'Legacy systems', 'Security concerns'],
            channels: ['Industry conferences', 'Executive networks', 'Analyst reports', 'LinkedIn'],
            buyingBehavior: 'Long sales cycle (6-12 months), needs demos, requires security audits',
            quote: '"Any solution needs to integrate with our existing tech stack and meet compliance requirements."'
        }
    ]

    const handleGenerate = () => {
        setIsGenerating(true)
        setShowResults(false)
        setTimeout(() => {
            setIsGenerating(false)
            setShowResults(true)
        }, 2000)
    }

    return (
        <div className="generator-page">
            <div className="generator-header-section">
                <div className="generator-title-row">
                    <h1>👥 Buyer Personas</h1>
                    <span className="generator-badge active">Active</span>
                </div>
                <p className="generator-description">
                    AI-generated buyer personas based on your target market. Understand your ideal customers.
                </p>
            </div>

            {!showResults && !isGenerating && (
                <div className="generator-input-section">
                    <div className="input-group">
                        <label>Industry / Niche</label>
                        <input type="text" placeholder="e.g., SaaS, E-commerce, Healthcare" defaultValue="Marketing Technology" />
                    </div>
                    <div className="input-group">
                        <label>Target Market</label>
                        <input type="text" placeholder="e.g., Small businesses, Enterprise" defaultValue="B2B SaaS Companies" />
                    </div>
                    <button className="btn btn-primary btn-generate" onClick={handleGenerate}>
                        Generate Personas (150 credits)
                    </button>
                </div>
            )}

            {isGenerating && (
                <div className="generating-state">
                    <div className="generating-spinner"></div>
                    <h3>Generating Buyer Personas...</h3>
                    <p>Analyzing market data and creating detailed personas</p>
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ width: '60%' }}></div>
                    </div>
                </div>
            )}

            {showResults && (
                <div className="generator-results">
                    <div className="results-header">
                        <h2>Generated Personas</h2>
                        <div className="results-actions">
                            <button className="btn btn-secondary" onClick={() => setShowResults(false)}>
                                Regenerate
                            </button>
                            <button className="btn btn-primary">Export PDF</button>
                        </div>
                    </div>

                    <div className="personas-grid">
                        {personas.map(persona => (
                            <div key={persona.id} className="persona-card">
                                <div className="persona-header">
                                    <span className="persona-avatar">{persona.avatar}</span>
                                    <div className="persona-info">
                                        <h3>{persona.name}</h3>
                                        <span className="persona-role">{persona.role}</span>
                                    </div>
                                </div>

                                <div className="persona-details">
                                    <div className="detail-row">
                                        <span className="detail-label">Age Range:</span>
                                        <span>{persona.age}</span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="detail-label">Income:</span>
                                        <span>{persona.income}</span>
                                    </div>
                                </div>

                                <div className="persona-section">
                                    <h4>Traits</h4>
                                    <div className="trait-tags">
                                        {persona.traits.map((trait, i) => (
                                            <span key={i} className="trait-tag">{trait}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="persona-section">
                                    <h4>Goals</h4>
                                    <ul>
                                        {persona.goals.map((goal, i) => (
                                            <li key={i}>{goal}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="persona-section">
                                    <h4>Pain Points</h4>
                                    <ul className="pain-points">
                                        {persona.painPoints.map((pain, i) => (
                                            <li key={i}>{pain}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="persona-quote">
                                    <p>{persona.quote}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default BuyerPersonasPage
