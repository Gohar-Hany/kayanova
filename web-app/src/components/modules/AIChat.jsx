import { useState, useRef, useEffect } from 'react'
import {
    ChatBotIcon, UserIcon, TrashIcon, SettingsIcon,
    SearchIcon, TargetIcon, CalendarIcon, BarChartIcon,
    SpinnerIcon, ArrowRightIcon
} from '../Icons'

function AIChat({ userData, onNavigate }) {
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'ai',
            content: 'Welcome to your AI Command Center. I can help you generate competitor analysis, marketing plans, content calendars, and market reports. What would you like me to create?',
            timestamp: new Date(),
            suggestions: [
                'Analyze my top 3 competitors',
                'Create a 90-day marketing plan',
                'Generate a content calendar for next month',
                'Build a market research report'
            ]
        }
    ])
    const [inputValue, setInputValue] = useState('')
    const [isGenerating, setIsGenerating] = useState(false)
    const [generationProgress, setGenerationProgress] = useState(null)
    const messagesEndRef = useRef(null)
    const inputRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleSend = async () => {
        if (!inputValue.trim() || isGenerating) return

        const userMessage = {
            id: Date.now(),
            type: 'user',
            content: inputValue,
            timestamp: new Date()
        }

        setMessages(prev => [...prev, userMessage])
        setInputValue('')
        setIsGenerating(true)

        // Simulate AI processing with progress
        simulateGeneration(inputValue)
    }

    const simulateGeneration = async (query) => {
        const steps = [
            { label: 'Understanding request...', progress: 10 },
            { label: 'Analyzing requirements...', progress: 25 },
            { label: 'Gathering market data...', progress: 40 },
            { label: 'Processing insights...', progress: 60 },
            { label: 'Generating content...', progress: 80 },
            { label: 'Finalizing output...', progress: 95 },
        ]

        for (const step of steps) {
            setGenerationProgress({ ...step, credits: Math.floor(Math.random() * 50) + 100 })
            await new Promise(resolve => setTimeout(resolve, 800))
        }

        // Determine output type based on query
        const outputType = detectOutputType(query)

        const aiResponse = {
            id: Date.now(),
            type: 'ai',
            outputType,
            content: getAIResponse(outputType),
            timestamp: new Date(),
            credits: 175,
            actions: ['View Full Report', 'Regenerate', 'Export PDF', 'Edit']
        }

        setMessages(prev => [...prev, aiResponse])
        setIsGenerating(false)
        setGenerationProgress(null)
    }

    const detectOutputType = (query) => {
        const lowerQuery = query.toLowerCase()
        if (lowerQuery.includes('competitor') || lowerQuery.includes('competition')) return 'competitor'
        if (lowerQuery.includes('marketing') || lowerQuery.includes('plan') || lowerQuery.includes('strategy')) return 'marketing'
        if (lowerQuery.includes('calendar') || lowerQuery.includes('content') || lowerQuery.includes('schedule')) return 'calendar'
        if (lowerQuery.includes('report') || lowerQuery.includes('market') || lowerQuery.includes('research')) return 'report'
        return 'general'
    }

    const getAIResponse = (type) => {
        const responses = {
            competitor: {
                title: 'Competitor Analysis Complete',
                summary: "I've analyzed your top competitors and identified key insights about their positioning, strengths, and vulnerabilities.",
                highlights: [
                    { label: 'Competitors Analyzed', value: '5' },
                    { label: 'Market Gaps Found', value: '3' },
                    { label: 'Opportunity Score', value: '87%' }
                ]
            },
            marketing: {
                title: 'Marketing Plan Generated',
                summary: 'Your comprehensive 90-day marketing strategy is ready, including channel tactics, budget allocation, and KPIs.',
                highlights: [
                    { label: 'Channels Optimized', value: '7' },
                    { label: 'Campaigns Planned', value: '12' },
                    { label: 'Projected ROI', value: '340%' }
                ]
            },
            calendar: {
                title: 'Content Calendar Created',
                summary: 'Your 30-day content calendar is ready with platform-specific posts, hooks, and optimal posting times.',
                highlights: [
                    { label: 'Posts Scheduled', value: '45' },
                    { label: 'Platforms', value: '4' },
                    { label: 'Content Types', value: '8' }
                ]
            },
            report: {
                title: 'Market Report Generated',
                summary: 'Complete market analysis with competitive landscape, trend forecasts, and strategic recommendations.',
                highlights: [
                    { label: 'Market Size', value: '$2.4B' },
                    { label: 'Growth Rate', value: '23%' },
                    { label: 'Key Trends', value: '5' }
                ]
            },
            general: {
                title: 'Analysis Complete',
                summary: "I've processed your request and prepared a detailed response.",
                highlights: [
                    { label: 'Insights', value: '12' },
                    { label: 'Recommendations', value: '5' },
                    { label: 'Action Items', value: '8' }
                ]
            }
        }
        return responses[type]
    }

    const getOutputIcon = (outputType) => {
        const icons = {
            competitor: <SearchIcon size={18} />,
            marketing: <TargetIcon size={18} />,
            calendar: <CalendarIcon size={18} />,
            report: <BarChartIcon size={18} />,
            general: <BarChartIcon size={18} />,
        }
        return icons[outputType] || <BarChartIcon size={18} />
    }

    const handleSuggestionClick = (suggestion) => {
        setInputValue(suggestion)
        inputRef.current?.focus()
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    const handleActionClick = (action, outputType) => {
        if (action === 'View Full Report') {
            onNavigate(outputType === 'general' ? 'report' : outputType)
        }
    }

    return (
        <div className="ai-chat">
            {/* Chat Header */}
            <div className="chat-header">
                <div className="chat-header-info">
                    <div className="chat-avatar"><ChatBotIcon size={22} /></div>
                    <div className="chat-header-text">
                        <h3>AI Command Center</h3>
                        <span className="chat-status">
                            <span className="status-dot active"></span>
                            {isGenerating ? 'Generating...' : 'Ready to execute'}
                        </span>
                    </div>
                </div>
                <div className="chat-header-actions">
                    <button className="chat-action-btn" title="Clear chat" aria-label="Clear chat"><TrashIcon size={16} /></button>
                    <button className="chat-action-btn" title="Settings" aria-label="Settings"><SettingsIcon size={16} /></button>
                </div>
            </div>

            {/* Messages Area */}
            <div className="chat-messages">
                {messages.map((message) => (
                    <div key={message.id} className={`chat-message ${message.type}`}>
                        {message.type === 'ai' && (
                            <div className="message-avatar"><ChatBotIcon size={18} /></div>
                        )}
                        <div className="message-content">
                            {message.outputType ? (
                                // Structured output card
                                <div className="output-card">
                                    <div className="output-card-header">
                                        <span className="output-icon">{getOutputIcon(message.outputType)}</span>
                                        <h4>{message.content.title}</h4>
                                        <span className="output-credits">-{message.credits} credits</span>
                                    </div>
                                    <p className="output-summary">{message.content.summary}</p>
                                    <div className="output-highlights">
                                        {message.content.highlights.map((h, i) => (
                                            <div key={i} className="highlight-item">
                                                <span className="highlight-value">{h.value}</span>
                                                <span className="highlight-label">{h.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="output-actions">
                                        {message.actions.map((action, i) => (
                                            <button
                                                key={i}
                                                className={`output-action-btn ${i === 0 ? 'primary' : ''}`}
                                                onClick={() => handleActionClick(action, message.outputType)}
                                            >
                                                {action}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                // Regular text message
                                <>
                                    <p>{message.content}</p>
                                    {message.suggestions && (
                                        <div className="message-suggestions">
                                            {message.suggestions.map((s, i) => (
                                                <button
                                                    key={i}
                                                    className="suggestion-chip"
                                                    onClick={() => handleSuggestionClick(s)}
                                                >
                                                    {s}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </>
                            )}
                            <span className="message-time">
                                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                        {message.type === 'user' && (
                            <div className="message-avatar user"><UserIcon size={18} /></div>
                        )}
                    </div>
                ))}

                {/* Generation Progress */}
                {isGenerating && generationProgress && (
                    <div className="chat-message ai">
                        <div className="message-avatar"><ChatBotIcon size={18} /></div>
                        <div className="message-content">
                            <div className="generation-progress">
                                <div className="progress-header">
                                    <span className="progress-label">{generationProgress.label}</span>
                                    <span className="progress-percent">{generationProgress.progress}%</span>
                                </div>
                                <div className="progress-bar">
                                    <div
                                        className="progress-fill"
                                        style={{ width: `${generationProgress.progress}%` }}
                                    ></div>
                                </div>
                                <div className="progress-meta">
                                    <span className="progress-credits">
                                        Estimated: ~{generationProgress.credits} credits
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="chat-input-area">
                <div className="chat-input-wrapper">
                    <textarea
                        ref={inputRef}
                        className="chat-input"
                        placeholder="Command your marketing... (e.g., 'Analyze competitors in the AI automation space')"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        rows={1}
                        disabled={isGenerating}
                    />
                    <button
                        className={`chat-send-btn ${inputValue.trim() ? 'active' : ''}`}
                        onClick={handleSend}
                        disabled={!inputValue.trim() || isGenerating}
                        aria-label="Send message"
                    >
                        {isGenerating ? <SpinnerIcon size={18} /> : <ArrowRightIcon size={18} />}
                    </button>
                </div>
                <div className="chat-input-hints">
                    <span>Press Enter to send • Shift+Enter for new line</span>
                    <span className="hint-credits">~150-250 credits per generation</span>
                </div>
            </div>
        </div>
    )
}

export default AIChat
