import { useState, useCallback } from 'react'

function StartPage({ onContinue, onSkip, userData, setUserData }) {
    const [isDragOver, setIsDragOver] = useState(false)

    const handleDragOver = useCallback((e) => {
        e.preventDefault()
        setIsDragOver(true)
    }, [])

    const handleDragLeave = useCallback((e) => {
        e.preventDefault()
        setIsDragOver(false)
    }, [])

    const handleDrop = useCallback((e) => {
        e.preventDefault()
        setIsDragOver(false)
        const droppedFile = e.dataTransfer.files[0]
        if (droppedFile) {
            setUserData(prev => ({ ...prev, file: droppedFile }))
        }
    }, [setUserData])

    const handleFileSelect = (e) => {
        const selectedFile = e.target.files[0]
        if (selectedFile) {
            setUserData(prev => ({ ...prev, file: selectedFile }))
        }
    }

    const handleUrlChange = (e) => {
        setUserData(prev => ({ ...prev, url: e.target.value }))
    }

    const removeFile = () => {
        setUserData(prev => ({ ...prev, file: null }))
    }

    const hasInput = userData.url?.trim() || userData.file

    return (
        <div className="start-page">
            {/* Progress Indicator */}
            <div className="progress-steps">
                <div className="step active">
                    <div className="step-number">1</div>
                    <span className="step-label">Your Business</span>
                </div>
                <div className="step-line"></div>
                <div className="step">
                    <div className="step-number">2</div>
                    <span className="step-label">Choose Services</span>
                </div>
                <div className="step-line"></div>
                <div className="step">
                    <div className="step-number">3</div>
                    <span className="step-label">Get Results</span>
                </div>
            </div>

            <div className="start-content">
                <h1 className="start-title">Tell Us About Your Business</h1>
                <p className="start-subtitle">
                    Share your website or documents for personalized automation.
                    Skip this step for a general analysis.
                </p>

                <div className="input-cards">
                    {/* URL Input Card */}
                    <div className="input-card">
                        <div className="input-card-header">
                            <div className="input-card-icon">🌐</div>
                            <div>
                                <h2 className="input-card-title">Website URL</h2>
                                <p className="input-card-description">Enter your website for targeted analysis</p>
                            </div>
                        </div>
                        <div className="url-input-wrapper">
                            <span className="url-icon">🔗</span>
                            <input
                                type="url"
                                className="url-input"
                                placeholder="https://yourwebsite.com"
                                value={userData.url || ''}
                                onChange={handleUrlChange}
                            />
                            {userData.url && (
                                <span className="url-check">✓</span>
                            )}
                        </div>
                    </div>

                    <div className="or-divider">
                        <span>OR</span>
                    </div>

                    {/* File Upload Card */}
                    <div className="input-card">
                        <div className="input-card-header">
                            <div className="input-card-icon">📄</div>
                            <div>
                                <h2 className="input-card-title">Upload Documents</h2>
                                <p className="input-card-description">Upload business docs, marketing materials, etc.</p>
                            </div>
                        </div>
                        <div
                            className={`upload-zone ${isDragOver ? 'drag-over' : ''} ${userData.file ? 'has-file' : ''}`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={() => document.getElementById('file-input').click()}
                        >
                            <input
                                type="file"
                                id="file-input"
                                style={{ display: 'none' }}
                                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                                onChange={handleFileSelect}
                            />
                            {!userData.file ? (
                                <>
                                    <div className="upload-icon">📁</div>
                                    <p className="upload-text">
                                        Drag & drop your file here, or click to browse
                                    </p>
                                    <p className="upload-hint">
                                        Supports PDF, Word, and image files
                                    </p>
                                </>
                            ) : (
                                <div className="file-info">
                                    <span>📎</span>
                                    <span className="file-name">{userData.file.name}</span>
                                    <button
                                        className="file-remove"
                                        onClick={(e) => { e.stopPropagation(); removeFile(); }}
                                    >
                                        ✕
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="start-actions">
                    <button
                        className="btn btn-secondary"
                        onClick={onSkip}
                    >
                        Skip for Now
                    </button>
                    <button
                        className={`btn btn-primary ${hasInput ? 'ready' : ''}`}
                        onClick={onContinue}
                    >
                        {hasInput ? 'Continue with Data' : 'Continue'}
                        <span className="btn-arrow">→</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default StartPage
