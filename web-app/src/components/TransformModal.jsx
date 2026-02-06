import { useState, useCallback } from 'react'
import { submitWebsiteData } from '../services/api'

function TransformModal({ isOpen, onClose, onSuccess }) {
    const [url, setUrl] = useState('')
    const [file, setFile] = useState(null)
    const [isDragOver, setIsDragOver] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

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
            setFile(droppedFile)
        }
    }, [])

    const handleFileSelect = (e) => {
        const selectedFile = e.target.files[0]
        if (selectedFile) {
            setFile(selectedFile)
        }
    }

    const handleUrlChange = (e) => {
        setUrl(e.target.value)
    }

    const removeFile = () => {
        setFile(null)
    }

    const handleSubmit = async () => {
        if (!url.trim() && !file) {
            setError('Please provide a website URL or upload a file')
            return
        }

        setIsLoading(true)
        setError(null)

        try {
            await submitWebsiteData(url, file)
            onSuccess({ url, file })
        } catch (err) {
            setError(err.message)
            setIsLoading(false)
        }
    }

    const handleClose = () => {
        if (!isLoading) {
            setUrl('')
            setFile(null)
            setError(null)
            onClose()
        }
    }

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget && !isLoading) {
            handleClose()
        }
    }

    if (!isOpen) return null

    return (
        <div className="transform-modal-overlay" onClick={handleBackdropClick}>
            <div className="transform-modal">
                {/* Close Button */}
                {!isLoading && (
                    <button className="modal-close-btn" onClick={handleClose}>
                        ✕
                    </button>
                )}

                {isLoading ? (
                    /* Loading State */
                    <div className="transform-loading">
                        <div className="loading-animation">
                            <div className="loading-spinner-ring"></div>
                            <div className="loading-icon">🔍</div>
                        </div>
                        <h2 className="loading-title">Analyzing your website...</h2>
                        <p className="loading-subtitle">Performing market research...</p>
                        <div className="loading-steps">
                            <div className="loading-step active">
                                <span className="step-dot"></span>
                                <span>Scanning website content</span>
                            </div>
                            <div className="loading-step">
                                <span className="step-dot"></span>
                                <span>Identifying competitors</span>
                            </div>
                            <div className="loading-step">
                                <span className="step-dot"></span>
                                <span>Generating insights</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Input Form */
                    <>
                        <div className="transform-modal-header">
                            <div className="modal-header-icon">🚀</div>
                            <h2 className="modal-title">Start Your Transformation</h2>
                            <p className="modal-subtitle">
                                Provide your website URL or upload documents for AI-powered analysis
                            </p>
                        </div>

                        <div className="transform-modal-content">
                            {/* URL Input */}
                            <div className="transform-input-section">
                                <label className="input-label">
                                    <span className="label-icon">🌐</span>
                                    Website URL
                                </label>
                                <div className="url-input-wrapper">
                                    <span className="url-prefix">https://</span>
                                    <input
                                        type="text"
                                        className="transform-url-input"
                                        placeholder="yourwebsite.com"
                                        value={url}
                                        onChange={handleUrlChange}
                                    />
                                    {url && <span className="input-check">✓</span>}
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="transform-divider">
                                <span className="divider-text">OR</span>
                            </div>

                            {/* File Upload */}
                            <div className="transform-input-section">
                                <label className="input-label">
                                    <span className="label-icon">📄</span>
                                    Upload Documents
                                </label>
                                <div
                                    className={`transform-upload-zone ${isDragOver ? 'drag-over' : ''} ${file ? 'has-file' : ''}`}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    onClick={() => document.getElementById('transform-file-input').click()}
                                >
                                    <input
                                        type="file"
                                        id="transform-file-input"
                                        style={{ display: 'none' }}
                                        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.txt"
                                        onChange={handleFileSelect}
                                    />
                                    {!file ? (
                                        <>
                                            <div className="upload-icon-large">📁</div>
                                            <p className="upload-text">
                                                Drag & drop your file here, or <span className="upload-link">browse</span>
                                            </p>
                                            <p className="upload-hint">
                                                Supports PDF, Word, images, and text files
                                            </p>
                                        </>
                                    ) : (
                                        <div className="file-info">
                                            <span className="file-icon">📎</span>
                                            <span className="file-name">{file.name}</span>
                                            <button
                                                className="file-remove-btn"
                                                onClick={(e) => { e.stopPropagation(); removeFile(); }}
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="transform-error">
                                    <span className="error-icon">⚠️</span>
                                    <span className="error-text">{error}</span>
                                </div>
                            )}
                        </div>

                        <div className="transform-modal-footer">
                            <button className="btn btn-secondary" onClick={handleClose}>
                                Cancel
                            </button>
                            <button
                                className={`btn btn-primary transform-submit-btn ${(url || file) ? 'ready' : ''}`}
                                onClick={handleSubmit}
                                disabled={!url && !file}
                            >
                                <span>Start Analysis</span>
                                <span className="btn-arrow">→</span>
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default TransformModal
