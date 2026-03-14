import { CalendarIcon, ShareIcon, FileIcon } from '../Icons'

function ContentCalendarDisplay({ data }) {
    const calendar = data?.content_calendar || data?.calendar || data

    // Platform abbreviation map
    const platformIcons = {
        'facebook': 'fb',
        'instagram': 'ig',
        'twitter': 'tw',
        'x': 'X',
        'linkedin': 'in',
        'tiktok': 'tt',
        'youtube': 'yt',
        'blog': 'bl',
        'email': 'em',
        'newsletter': 'nl',
        'website': 'web',
        'pinterest': 'pin'
    }

    // Content type colors
    const contentTypeColors = {
        'post': '#7c3aed',
        'story': '#ec4899',
        'reel': '#f59e0b',
        'video': '#ef4444',
        'carousel': '#10b981',
        'article': '#3b82f6',
        'infographic': '#8b5cf6',
        'quiz': '#06b6d4',
        'poll': '#14b8a6',
        'live': '#f43f5e'
    }

    const getPlatformIcon = (platform) => {
        if (!platform) return <ShareIcon size={14} />
        const key = platform.toLowerCase()
        return platformIcons[key] || platform.charAt(0).toUpperCase()
    }

    const getContentTypeColor = (type) => {
        if (!type) return '#6b7280'
        const key = type.toLowerCase()
        return contentTypeColors[key] || '#6b7280'
    }

    const formatDate = (dateStr) => {
        if (!dateStr) return 'TBD'
        try {
            const date = new Date(dateStr)
            return date.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
            })
        } catch {
            return dateStr
        }
    }

    // Render as table if it's an array of items
    const renderCalendarTable = (items) => {
        if (!items || items.length === 0) {
            return <p className="no-data">No calendar entries available</p>
        }

        return (
            <div className="calendar-table-wrapper">
                <table className="calendar-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Platform</th>
                            <th>Type</th>
                            <th>Content</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index}>
                                <td className="date-cell">
                                    <span className="date-value">
                                        {formatDate(item.date || item.publish_date)}
                                    </span>
                                    {item.time && (
                                        <span className="time-value">{item.time}</span>
                                    )}
                                </td>
                                <td className="platform-cell">
                                    <span className="platform-badge">
                                        <span className="platform-icon">
                                            {getPlatformIcon(item.platform)}
                                        </span>
                                        {item.platform}
                                    </span>
                                </td>
                                <td className="type-cell">
                                    <span
                                        className="type-badge"
                                        style={{ backgroundColor: getContentTypeColor(item.content_type || item.type) }}
                                    >
                                        {item.content_type || item.type || 'Post'}
                                    </span>
                                </td>
                                <td className="content-cell">
                                    <div className="content-title">{item.title || item.topic}</div>
                                    {item.description && (
                                        <div className="content-desc">{item.description}</div>
                                    )}
                                    {item.hashtags && (
                                        <div className="content-hashtags">
                                            {Array.isArray(item.hashtags)
                                                ? item.hashtags.join(' ')
                                                : item.hashtags
                                            }
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }

    // Render as cards for weekly/monthly view
    const renderCalendarCards = (items) => {
        return (
            <div className="calendar-cards">
                {items.map((item, index) => (
                    <div key={index} className="calendar-card">
                        <div className="card-header">
                            <span className="card-date">
                                {formatDate(item.date || item.publish_date)}
                            </span>
                            <span className="card-platform">
                                {getPlatformIcon(item.platform)} {item.platform}
                            </span>
                        </div>
                        <div className="card-body">
                            <span
                                className="card-type"
                                style={{ backgroundColor: getContentTypeColor(item.content_type || item.type) }}
                            >
                                {item.content_type || item.type || 'Post'}
                            </span>
                            <h4 className="card-title">{item.title || item.topic}</h4>
                            {item.description && (
                                <p className="card-desc">{item.description}</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    // Handle different response structures
    const getCalendarItems = () => {
        if (Array.isArray(calendar)) return calendar
        if (calendar?.items) return calendar.items
        if (calendar?.entries) return calendar.entries
        if (calendar?.posts) return calendar.posts
        if (calendar?.schedule) return calendar.schedule

        // Try to extract from nested structure
        if (typeof calendar === 'object') {
            const keys = Object.keys(calendar)
            for (const key of keys) {
                if (Array.isArray(calendar[key])) {
                    return calendar[key]
                }
            }
        }

        return []
    }

    const items = getCalendarItems()

    return (
        <div className="content-calendar-display">
            <div className="calendar-header">
                <h2 className="calendar-title"><CalendarIcon size={20} /> Content Calendar</h2>
                <p className="calendar-subtitle">
                    {items.length} scheduled content pieces
                </p>
            </div>

            {items.length > 0 ? (
                <>
                    <div className="calendar-view-table">
                        {renderCalendarTable(items)}
                    </div>
                    <div className="calendar-view-cards">
                        {renderCalendarCards(items)}
                    </div>
                </>
            ) : (
                <div className="calendar-empty">
                    <div className="empty-icon"><FileIcon size={36} /></div>
                    <p>No calendar data available</p>
                    <p className="empty-hint">The AI is still processing or the format is unrecognized</p>
                    <pre className="debug-data">{JSON.stringify(calendar, null, 2)}</pre>
                </div>
            )}
        </div>
    )
}

export default ContentCalendarDisplay
