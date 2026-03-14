import { useState } from 'react'
import { MicIcon, CheckIcon, CloseIcon } from '../Icons'

function BrandVoicePage({ onBack }) {
    const [showResults, setShowResults] = useState(true)

    // Static brand voice guide data
    const brandVoice = {
        brandName: 'Kayanova',
        tagline: 'A Fully Automated Marketing Agency',
        personality: {
            traits: [
                { trait: 'Confident', description: 'We speak with authority and expertise, never arrogant' },
                { trait: 'Innovative', description: 'We embrace cutting-edge solutions and forward-thinking' },
                { trait: 'Professional', description: 'We maintain a polished, enterprise-grade tone' },
                { trait: 'Approachable', description: 'We\'re experts who explain complex things simply' }
            ],
            tone: 'Professional yet approachable. We\'re the trusted expert friend who happens to know everything about marketing automation.'
        },
        voiceAttributes: [
            { attribute: 'Clarity', doThis: 'Use simple, direct language', dontDoThis: 'Use jargon or buzzwords' },
            { attribute: 'Confidence', doThis: 'Make bold, backed-up claims', dontDoThis: 'Hedge with "maybe" or "possibly"' },
            { attribute: 'Helpfulness', doThis: 'Focus on user benefits', dontDoThis: 'Talk about features without context' },
            { attribute: 'Innovation', doThis: 'Emphasize AI and automation', dontDoThis: 'Sound like traditional marketing tools' }
        ],
        writingGuidelines: {
            headlines: [
                'Lead with the benefit, not the feature',
                'Use active voice and action verbs',
                'Keep headlines under 10 words',
                'Create urgency without being pushy'
            ],
            bodyCopy: [
                'Start with the problem, then present the solution',
                'Use "you" more than "we"',
                'Break up text with short paragraphs',
                'Include specific numbers when possible'
            ],
            ctas: [
                'Use action-oriented verbs: "Start", "Get", "Launch"',
                'Create clear value propositions',
                'Avoid generic CTAs like "Click Here" or "Submit"'
            ]
        },
        sampleCopy: {
            taglines: [
                'Marketing that runs itself',
                'Your AI marketing team, always on',
                'From strategy to execution, automated'
            ],
            headlines: [
                'Stop doing marketing. Start commanding it.',
                'What if your marketing ran 24/7 without you?',
                'The marketing team that never sleeps'
            ],
            socialPosts: [
                '🚀 Just launched a campaign that would\'ve taken 3 weeks... in 3 hours. This is what AI-powered marketing looks like.',
                'Your competitors are still writing emails manually. Meanwhile, our AI just generated and sent 500 personalized sequences. The future is automated. 🤖',
                'Hot take: The best marketing team isn\'t a team at all. It\'s a system. Here\'s why 👇'
            ]
        },
        wordsToUse: ['Automate', 'Transform', 'Intelligent', 'Seamless', 'Powerful', 'Scale', 'Accelerate'],
        wordsToAvoid: ['Simple', 'Easy', 'Just', 'Basically', 'Synergy', 'Leverage', 'Revolutionary']
    }

    return (
        <div className="generator-page">
            <div className="generator-header-section">
                <div className="generator-title-row">
                    <h1><MicIcon size={22} /> Brand Voice Guide</h1>
                    <span className="generator-badge active">Active</span>
                </div>
                <p className="generator-description">
                    Define your brand's unique voice, tone, and messaging guidelines.
                </p>
            </div>

            {showResults && (
                <div className="generator-results">
                    <div className="results-header">
                        <h2>{brandVoice.brandName} Brand Voice Guide</h2>
                        <div className="results-actions">
                            <button className="btn btn-secondary">Edit Guide</button>
                            <button className="btn btn-primary">Export PDF</button>
                        </div>
                    </div>

                    <div className="brand-overview">
                        <div className="brand-tagline">
                            <span className="tagline-label">Tagline</span>
                            <h3>"{brandVoice.tagline}"</h3>
                        </div>
                        <div className="brand-tone">
                            <span className="tone-label">Overall Tone</span>
                            <p>{brandVoice.personality.tone}</p>
                        </div>
                    </div>

                    <div className="voice-section">
                        <h3>Brand Personality Traits</h3>
                        <div className="traits-grid">
                            {brandVoice.personality.traits.map((item, i) => (
                                <div key={i} className="trait-card">
                                    <h4>{item.trait}</h4>
                                    <p>{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="voice-section">
                        <h3>Voice Attributes</h3>
                        <div className="attributes-table">
                            <div className="table-header">
                                <span>Attribute</span>
                                <span>Do This <CheckIcon size={14} /></span>
                                <span>Don't Do This <CloseIcon size={14} /></span>
                            </div>
                            {brandVoice.voiceAttributes.map((attr, i) => (
                                <div key={i} className="table-row">
                                    <span className="attr-name">{attr.attribute}</span>
                                    <span className="do-this">{attr.doThis}</span>
                                    <span className="dont-this">{attr.dontDoThis}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="voice-section">
                        <h3>Sample Copy</h3>
                        <div className="samples-grid">
                            <div className="sample-category">
                                <h4>Taglines</h4>
                                {brandVoice.sampleCopy.taglines.map((item, i) => (
                                    <div key={i} className="sample-item">"{item}"</div>
                                ))}
                            </div>
                            <div className="sample-category">
                                <h4>Headlines</h4>
                                {brandVoice.sampleCopy.headlines.map((item, i) => (
                                    <div key={i} className="sample-item">"{item}"</div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="voice-section words-section">
                        <div className="words-column">
                            <h4>Words to Use <CheckIcon size={14} /></h4>
                            <div className="words-tags">
                                {brandVoice.wordsToUse.map((word, i) => (
                                    <span key={i} className="word-tag use">{word}</span>
                                ))}
                            </div>
                        </div>
                        <div className="words-column">
                            <h4>Words to Avoid <CloseIcon size={14} /></h4>
                            <div className="words-tags">
                                {brandVoice.wordsToAvoid.map((word, i) => (
                                    <span key={i} className="word-tag avoid">{word}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default BrandVoicePage
