import { useState } from 'react'

function EmailSequencesPage({ onBack }) {
    const [showResults, setShowResults] = useState(true)

    // Static email sequence data
    const emailSequence = {
        name: 'New Lead Nurture Sequence',
        description: 'Automated 5-email sequence to convert new leads into paying customers',
        totalEmails: 5,
        duration: '14 days',
        openRate: '45%',
        clickRate: '12%',
        emails: [
            {
                day: 0,
                subject: 'Welcome to Kayanova! Here\'s what happens next',
                preview: 'Your marketing is about to change forever...',
                purpose: 'Welcome & Set Expectations',
                body: `Hi {{first_name}},

Welcome to Kayanova! 🎉

You just took the first step toward fully automated marketing. Here's what to expect:

**Next 24 hours:**
We're analyzing your industry and competitors to create your personalized marketing strategy.

**Next 48 hours:**
Your first AI-generated marketing plan will be ready.

**Next 7 days:**
You'll see how our system can save you 20+ hours per week.

📅 Quick Win: Log in to your dashboard and try our AI Command Center. Just type "analyze my competitors" and watch the magic happen.

Talk soon,
The Kayanova Team

P.S. Reply to this email if you have any questions. We read and respond to every message.`
            },
            {
                day: 1,
                subject: 'Your competitor analysis is ready 🔍',
                preview: 'See what your competitors are doing (and how to beat them)',
                purpose: 'Deliver Value',
                body: `Hi {{first_name}},

Your AI-powered competitor analysis just finished running.

Here's what we found:
• Analyzed {{competitor_count}} competitors in your space
• Identified {{opportunity_count}} content gaps you can exploit  
• Found {{keyword_count}} keywords they're ranking for (that you should too)

**🎯 Top Opportunity:**
{{top_opportunity}}

→ See the full report in your dashboard

This took our AI 3 minutes. A human analyst would need 3+ days.

That's the Kayanova difference.

Best,
The Kayanova Team`
            },
            {
                day: 3,
                subject: 'The #1 mistake companies make with marketing automation',
                preview: 'It\'s not what you think...',
                purpose: 'Education & Trust Building',
                body: `Hi {{first_name}},

Quick question: Have you ever bought a marketing tool and... just never used it?

You're not alone. We found that 73% of marketing software goes unused within 90 days.

**Why?**

Most tools add more work to your plate. They require:
• Hours of setup
• Constant maintenance  
• Manual input for everything

Kayanova is different.

We built the opposite of that. A system that:
✅ Sets itself up (AI learns your brand automatically)
✅ Runs on autopilot (campaigns execute without you)
✅ Gets smarter over time (learns what works for YOUR audience)

Ready to see it in action?

→ Watch our 2-minute demo

Best,
The Kayanova Team`
            },
            {
                day: 7,
                subject: 'How [Similar Company] saved 25 hours/week',
                preview: 'Real results from a team like yours',
                purpose: 'Social Proof',
                body: `Hi {{first_name}},

Meet Sarah, Marketing Director at a B2B SaaS company with 4 people on her team.

**Before Kayanova:**
• 15+ hours/week creating content
• 3 different tools for social, email, and ads
• Always behind on their content calendar

**After 30 days with Kayanova:**
• Content creation: 15 hrs → 2 hrs/week
• Tools needed: 3 → 1
• Content calendar: Automated

**Sarah's words:**
"I finally have time to think strategically instead of just executing. The AI handles the heavy lifting."

Your results could be similar.

→ Start your free trial (no credit card required)

Best,
The Kayanova Team`
            },
            {
                day: 14,
                subject: 'Last chance: Your exclusive offer expires tonight',
                preview: 'Get 50% off your first 3 months',
                purpose: 'Conversion',
                body: `Hi {{first_name}},

I wanted to reach out one more time.

You signed up for Kayanova 2 weeks ago, which tells me you're serious about improving your marketing.

But you haven't upgraded yet — so I wanted to make it easier.

**For the next 24 hours only:**

🎁 Get 50% off your first 3 months
🎁 Priority onboarding with our team
🎁 Extended 60-day money-back guarantee

→ Claim your exclusive offer

This offer expires at midnight tonight.

Whether you upgrade or not, I hope you've found value in our free tools.

But imagine what you could do with the full platform...

Best,
The Kayanova Team

P.S. Just reply "INTERESTED" and I'll personally extend this offer if you need more time.`
            }
        ]
    }

    return (
        <div className="generator-page">
            <div className="generator-header-section">
                <div className="generator-title-row">
                    <h1>📧 Email Sequences</h1>
                    <span className="generator-badge active">Active</span>
                </div>
                <p className="generator-description">
                    Build automated email sequences that convert leads into customers.
                </p>
            </div>

            {showResults && (
                <div className="generator-results">
                    <div className="results-header">
                        <h2>{emailSequence.name}</h2>
                        <div className="results-actions">
                            <button className="btn btn-secondary">Edit Sequence</button>
                            <button className="btn btn-primary">Export to ESP</button>
                        </div>
                    </div>

                    <div className="sequence-overview">
                        <div className="sequence-stats">
                            <div className="stat">
                                <span className="stat-value">{emailSequence.totalEmails}</span>
                                <span className="stat-label">Emails</span>
                            </div>
                            <div className="stat">
                                <span className="stat-value">{emailSequence.duration}</span>
                                <span className="stat-label">Duration</span>
                            </div>
                            <div className="stat">
                                <span className="stat-value">{emailSequence.openRate}</span>
                                <span className="stat-label">Avg Open Rate</span>
                            </div>
                            <div className="stat">
                                <span className="stat-value">{emailSequence.clickRate}</span>
                                <span className="stat-label">Avg Click Rate</span>
                            </div>
                        </div>
                    </div>

                    <div className="email-timeline">
                        {emailSequence.emails.map((email, i) => (
                            <div key={i} className="email-card">
                                <div className="email-day">
                                    <span className="day-label">Day {email.day}</span>
                                    <span className="email-number">Email {i + 1}</span>
                                </div>
                                <div className="email-content">
                                    <div className="email-header">
                                        <span className="email-purpose">{email.purpose}</span>
                                    </div>
                                    <div className="email-subject">
                                        <strong>Subject:</strong> {email.subject}
                                    </div>
                                    <div className="email-preview">
                                        <strong>Preview:</strong> {email.preview}
                                    </div>
                                    <div className="email-body">
                                        <pre>{email.body}</pre>
                                    </div>
                                    <div className="email-actions">
                                        <button className="btn btn-sm">Edit</button>
                                        <button className="btn btn-sm">Copy</button>
                                        <button className="btn btn-sm btn-primary">Preview</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default EmailSequencesPage
