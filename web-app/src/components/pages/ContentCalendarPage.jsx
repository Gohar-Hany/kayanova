import { useState, useEffect } from 'react'
import { getContentCalendar } from '../../services/api'
import {
    WarningIcon, CalendarIcon, BarChartIcon, FileIcon, PaletteIcon,
    LinkIcon, MicIcon, CloseIcon
} from '../Icons'

function ContentCalendarPage({ onBack, userData }) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)
    const [viewMode, setViewMode] = useState('table')
    const [filterPlatform, setFilterPlatform] = useState('all')
    const [filterFormat, setFilterFormat] = useState('all')

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setLoading(true)
        setError(null)
        try {
            const result = await getContentCalendar()
            setData(Array.isArray(result) ? result : [result])
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    // Get unique platforms and formats for filters
    const platforms = data ? [...new Set(data.map(item => item.Platform_Target).filter(Boolean))] : []
    const formats = data ? [...new Set(data.map(item => item.Content_Format).filter(Boolean))] : []

    // Filter data
    const filteredData = data?.filter(item => {
        const platformMatch = filterPlatform === 'all' || item.Platform_Target === filterPlatform
        const formatMatch = filterFormat === 'all' || item.Content_Format === filterFormat
        return platformMatch && formatMatch
    }) || []

    // Platform icon mapping
    // Platform text labels (these are platform brand identifiers, not UI icons)
    const platformLabels = {
        'LinkedIn': 'in',
        'X': 'X',
        'Twitter': 'tw',
        'Instagram': 'ig',
        'TikTok': 'tt',
        'Facebook': 'fb',
        'YouTube': 'yt'
    }

    // Format color mapping
    const formatColors = {
        'Carousel': '#7c3aed',
        'Thread': '#3b82f6',
        'Reel': '#ec4899',
        'Post': '#10b981',
        'Video': '#ef4444'
    }

    const getPlatformIcon = (platform) => platformLabels[platform] || platform?.charAt(0) || '?'
    const getFormatColor = (format) => formatColors[format] || '#6b7280'

    if (loading) {
        return (
            <div className="service-page">
                <div className="page-loading">
                    <div className="loading-spinner large"></div>
                    <h2>Creating Content Calendar...</h2>
                    <p>Our AI is generating your 30-day content plan. This may take a minute.</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="service-page">
                <div className="page-error">
                    <div className="error-icon"><WarningIcon size={36} /></div>
                    <h2>Calendar Generation Failed</h2>
                    <p>{error}</p>
                    <div className="error-actions">
                        <button className="btn btn-primary" onClick={fetchData}>Try Again</button>
                        <button className="btn btn-secondary" onClick={onBack}>Go Back</button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="service-page calendar-page">
            <div className="page-header">
                <button className="back-btn" onClick={onBack}>← Back to Services</button>
                <div className="page-title-section">
                    <h1 className="page-title">
                        <span className="page-icon"><CalendarIcon size={24} /></span>
                        Content Calendar
                    </h1>
                    <p className="page-subtitle">
                        30-day content plan with {data?.length || 0} scheduled posts
                    </p>
                </div>
            </div>

            {/* Controls */}
            <div className="calendar-controls">
                <div className="filter-group">
                    <label>Platform:</label>
                    <select
                        value={filterPlatform}
                        onChange={(e) => setFilterPlatform(e.target.value)}
                        className="filter-select"
                    >
                        <option value="all">All Platforms</option>
                        {platforms.map(platform => (
                            <option key={platform} value={platform}>
                                {platform}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="filter-group">
                    <label>Format:</label>
                    <select
                        value={filterFormat}
                        onChange={(e) => setFilterFormat(e.target.value)}
                        className="filter-select"
                    >
                        <option value="all">All Formats</option>
                        {formats.map(format => (
                            <option key={format} value={format}>
                                {format}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="view-toggle">
                    <button
                        className={`view-btn ${viewMode === 'table' ? 'active' : ''}`}
                        onClick={() => setViewMode('table')}
                    >
                        <BarChartIcon size={14} /> Table
                    </button>
                    <button
                        className={`view-btn ${viewMode === 'cards' ? 'active' : ''}`}
                        onClick={() => setViewMode('cards')}
                    >
                        <FileIcon size={14} /> Cards
                    </button>
                </div>
            </div>

            {/* Stats Summary */}
            <div className="calendar-stats">
                {platforms.map(platform => (
                    <div key={platform} className="stat-item">
                        <span className="stat-icon">{getPlatformIcon(platform)}</span>
                        <span className="stat-value">
                            {data?.filter(item => item.Platform_Target === platform).length || 0}
                        </span>
                        <span className="stat-label">{platform}</span>
                    </div>
                ))}
            </div>

            {/* Table View */}
            {viewMode === 'table' && (
                <div className="calendar-table-container">
                    <table className="calendar-table">
                        <thead>
                            <tr>
                                <th>Day</th>
                                <th>Platform</th>
                                <th>Format</th>
                                <th>Hook</th>
                                <th>Strategic Goal</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((item, idx) => (
                                <tr key={idx}>
                                    <td className="day-cell">
                                        <span className="day-number">{item.Day_Number}</span>
                                    </td>
                                    <td className="platform-cell">
                                        <span className="platform-badge">
                                            <span className="platform-icon">{getPlatformIcon(item.Platform_Target)}</span>
                                            {item.Platform_Target}
                                        </span>
                                    </td>
                                    <td className="format-cell">
                                        <span
                                            className="format-badge"
                                            style={{ backgroundColor: getFormatColor(item.Content_Format) }}
                                        >
                                            {item.Content_Format}
                                        </span>
                                    </td>
                                    <td className="hook-cell">
                                        <p className="hook-text">{item.The_Hook}</p>
                                    </td>
                                    <td className="goal-cell">
                                        <span className="goal-text">{item.Strategic_Goal}</span>
                                    </td>
                                    <td className="actions-cell">
                                        <button
                                            className="view-details-btn"
                                            onClick={() => {
                                                document.getElementById(`modal-${idx}`)?.showModal()
                                            }}
                                        >
                                            View Details →
                                        </button>

                                        {/* Detail Modal */}
                                        <dialog id={`modal-${idx}`} className="content-modal">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h3>{item.Day_Number} - {item.Platform_Target} {item.Content_Format}</h3>
                                                    <button
                                                        className="modal-close"
                                                        onClick={() => document.getElementById(`modal-${idx}`)?.close()}
                                                        aria-label="Close"
                                                    >
                                                        <CloseIcon size={16} />
                                                    </button>
                                                </div>

                                                <div className="modal-section">
                                                    <h4>The Hook</h4>
                                                    <p className="modal-hook">{item.The_Hook}</p>
                                                </div>

                                                <div className="modal-section">
                                                    <h4>Full Caption</h4>
                                                    <p className="modal-caption">{item.Full_Caption}</p>
                                                </div>

                                                <div className="modal-section">
                                                    <h4>Authority Pillar</h4>
                                                    <p>{item.Authority_Pillar}</p>
                                                </div>

                                                <div className="modal-section">
                                                    <h4>Visual Text Overlay</h4>
                                                    <p className="visual-overlay">{item.Visual_Text_Overlay}</p>
                                                </div>

                                                <div className="modal-section">
                                                    <h4><PaletteIcon size={14} /> Art Direction</h4>
                                                    <p className="art-direction">{item.Art_Direction_Prompt}</p>
                                                </div>

                                                {item['Design URL'] && (
                                                    <div className="modal-section">
                                                        <h4><LinkIcon size={14} /> Design Reference</h4>
                                                        <a
                                                            href={item['Design URL']}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="design-link"
                                                        >
                                                            View Design →
                                                        </a>
                                                    </div>
                                                )}
                                            </div>
                                        </dialog>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Cards View */}
            {viewMode === 'cards' && (
                <div className="calendar-cards-grid">
                    {filteredData.map((item, idx) => (
                        <div key={idx} className="content-card">
                            <div className="card-header">
                                <span className="card-day">{item.Day_Number}</span>
                                <div className="card-meta">
                                    <span className="card-platform">
                                        {getPlatformIcon(item.Platform_Target)} {item.Platform_Target}
                                    </span>
                                    <span
                                        className="card-format"
                                        style={{ backgroundColor: getFormatColor(item.Content_Format) }}
                                    >
                                        {item.Content_Format}
                                    </span>
                                </div>
                            </div>

                            <div className="card-pillar">
                                {item.Authority_Pillar}
                            </div>

                            <div className="card-hook">
                                <span className="hook-label">Hook:</span>
                                <p>{item.The_Hook}</p>
                            </div>

                            <div className="card-overlay">
                                <span className="overlay-label">Visual:</span>
                                <p>{item.Visual_Text_Overlay}</p>
                            </div>

                            <div className="card-goal">
                                <span className="goal-badge">{item.Strategic_Goal}</span>
                            </div>

                            <button
                                className="card-expand-btn"
                                onClick={() => document.getElementById(`modal-card-${idx}`)?.showModal()}
                            >
                                View Full Details →
                            </button>

                            {/* Detail Modal */}
                            <dialog id={`modal-card-${idx}`} className="content-modal">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h3>{item.Day_Number} - {item.Platform_Target} {item.Content_Format}</h3>
                                        <button
                                            className="modal-close"
                                            onClick={() => document.getElementById(`modal-card-${idx}`)?.close()}
                                            aria-label="Close"
                                        >
                                            <CloseIcon size={16} />
                                        </button>
                                    </div>

                                    <div className="modal-section">
                                        <h4>The Hook</h4>
                                        <p className="modal-hook">{item.The_Hook}</p>
                                    </div>

                                    <div className="modal-section">
                                        <h4>Full Caption</h4>
                                        <p className="modal-caption">{item.Full_Caption}</p>
                                    </div>

                                    <div className="modal-section">
                                        <h4><PaletteIcon size={14} /> Art Direction</h4>
                                        <p className="art-direction">{item.Art_Direction_Prompt}</p>
                                    </div>

                                    {item['Design URL'] && (
                                        <div className="modal-section">
                                            <h4><LinkIcon size={14} /> Design Reference</h4>
                                            <a
                                                href={item['Design URL']}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="design-link"
                                            >
                                                View Design →
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </dialog>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ContentCalendarPage
