import { useEffect, useState } from 'react'

function LoadingScreen({ onComplete }) {
    const [phase, setPhase] = useState('enter') // enter → hold → exit

    useEffect(() => {
        // Hold for 1.6s then begin exit
        const holdTimer = setTimeout(() => setPhase('exit'), 1600)
        return () => clearTimeout(holdTimer)
    }, [])

    useEffect(() => {
        if (phase === 'exit') {
            // After exit animation (600ms), notify parent
            const doneTimer = setTimeout(() => onComplete(), 600)
            return () => clearTimeout(doneTimer)
        }
    }, [phase, onComplete])

    return (
        <div className={`loading-screen loading-screen--${phase}`} aria-hidden="true">
            {/* Ambient background orbs */}
            <div className="ls-orb ls-orb--1" />
            <div className="ls-orb ls-orb--2" />
            <div className="ls-orb ls-orb--3" />

            {/* Center content */}
            <div className="ls-content">
                {/* Logo */}
                <div className="ls-logo-wrap">
                    <img
                        src="/kayanova-logo.png"
                        alt="Kayanova"
                        className="ls-logo"
                        onError={(e) => { e.target.style.display = 'none' }}
                    />
                    <div className="ls-logo-fallback">
                        <span className="ls-logo-text">Kayanova</span>
                    </div>
                </div>

                {/* Subtitle */}
                <p className="ls-subtitle">A Fully Automated Marketing Agency</p>

                {/* Progress bar */}
                <div className="ls-progress-track">
                    <div className="ls-progress-bar" />
                </div>

                {/* Loading dots */}
                <div className="ls-dots">
                    <span className="ls-dot" style={{ '--i': 0 }} />
                    <span className="ls-dot" style={{ '--i': 1 }} />
                    <span className="ls-dot" style={{ '--i': 2 }} />
                </div>
            </div>
        </div>
    )
}

export default LoadingScreen
