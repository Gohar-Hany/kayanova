import { useState } from 'react'
import { ShareIcon } from '../Icons'

function SocialScriptsPage({ onBack }) {
    const [showResults, setShowResults] = useState(true)
    const [selectedPlatform, setSelectedPlatform] = useState('linkedin')

    // Static social content data
    const socialContent = {
        linkedin: {
            platform: 'LinkedIn',
            icon: 'in',
            posts: [
                {
                    type: 'Thought Leadership',
                    content: `Hot take: The best marketing team isn't a team at all.

It's a system.

Here's why I believe this 👇

After helping 100+ companies scale their marketing, I noticed something:

The best performers weren't the ones with the biggest teams.

They were the ones with the best systems.

• Systems that run 24/7
• Systems that don't forget follow-ups
• Systems that never have an "off" day

The future of marketing isn't hiring more people.

It's building intelligent automation that:
→ Researches your competitors
→ Creates your content
→ Optimizes your campaigns
→ Reports your results

All while you sleep.

What's one marketing task you wish ran on autopilot?

#marketing #automation #futureofwork`,
                    engagement: '2.4K likes • 186 comments'
                },
                {
                    type: 'Product Launch',
                    content: `🚀 Big announcement:

After 18 months of development, we're launching Kayanova — the world's first fully automated marketing operating system.

What does that mean?

Instead of managing 10 different tools, hiring agencies, and spending hours on strategy...

You get ONE system that handles everything:

✅ Competitor analysis
✅ Marketing strategy
✅ Content creation
✅ Campaign execution
✅ Performance tracking

All powered by AI. All automated.

We've been testing it with 50 beta users.

The results?

→ 20+ hours saved per week
→ 3x faster campaign launches
→ 40% lower marketing costs

Link in comments to try it free.

#productlaunch #marketingtech #startup`,
                    engagement: '892 likes • 67 comments'
                }
            ]
        },
        twitter: {
            platform: 'Twitter/X',
            icon: 'X',
            posts: [
                {
                    type: 'Thread Starter',
                    content: `🧵 I just launched a marketing campaign in 3 hours that would've taken 3 weeks.

Here's exactly how (and you can do it too):

1/`,
                    engagement: '1.2K likes • 342 retweets'
                },
                {
                    type: 'Engagement Post',
                    content: `Marketing hot take:

"Personalization at scale" isn't possible...

...unless you're using AI.

Humans can't write 500 unique emails.
AI can. In minutes.

The game has changed. Have you?`,
                    engagement: '856 likes • 128 retweets'
                },
                {
                    type: 'Value Post',
                    content: `Stop paying agencies $10k/month.

Here's what you can automate for $100:

• Competitor research
• Content calendars  
• Email sequences
• Ad copy variations
• Social posts
• SEO strategies

The tools exist. Most people just don't know about them.

(Thread below 👇)`,
                    engagement: '2.1K likes • 567 retweets'
                }
            ]
        },
        instagram: {
            platform: 'Instagram',
            icon: 'ig',
            posts: [
                {
                    type: 'Carousel Post',
                    content: `Slide 1: "Your marketing problems are NOT what you think they are 👇"

Slide 2: "Problem: Too many tools" 
Solution: One unified platform

Slide 3: "Problem: Not enough time"
Solution: AI automation

Slide 4: "Problem: Inconsistent results"
Solution: Data-driven systems

Slide 5: "Problem: High costs"
Solution: Scale without hiring

Slide 6: "The solution exists. Link in bio 🚀"

Caption: Most marketing teams are working way too hard on the wrong things.

Drop a 🔥 if you're ready for a better way.`,
                    engagement: '1.8K likes • 94 comments'
                }
            ]
        }
    }

    const currentContent = socialContent[selectedPlatform]

    return (
        <div className="generator-page">
            <div className="generator-header-section">
                <div className="generator-title-row">
                    <h1><ShareIcon size={22} /> Social Scripts</h1>
                    <span className="generator-badge active">Active</span>
                </div>
                <p className="generator-description">
                    Create engaging social media content for all platforms.
                </p>
            </div>

            {showResults && (
                <div className="generator-results">
                    <div className="results-header">
                        <h2>Generated Social Content</h2>
                        <div className="results-actions">
                            <button className="btn btn-secondary">Regenerate</button>
                            <button className="btn btn-primary">Schedule All</button>
                        </div>
                    </div>

                    <div className="platform-tabs">
                        {Object.entries(socialContent).map(([key, value]) => (
                            <button
                                key={key}
                                className={`platform-tab ${selectedPlatform === key ? 'active' : ''}`}
                                onClick={() => setSelectedPlatform(key)}
                            >
                                <span>{value.icon}</span>
                                <span>{value.platform}</span>
                            </button>
                        ))}
                    </div>

                    <div className="social-posts-grid">
                        {currentContent.posts.map((post, i) => (
                            <div key={i} className="social-post-card">
                                <div className="post-header">
                                    <span className="post-type">{post.type}</span>
                                    <span className="post-platform">{currentContent.icon} {currentContent.platform}</span>
                                </div>
                                <div className="post-content">
                                    <pre>{post.content}</pre>
                                </div>
                                <div className="post-footer">
                                    <span className="post-engagement">{post.engagement}</span>
                                    <div className="post-actions">
                                        <button className="btn btn-sm">Copy</button>
                                        <button className="btn btn-sm btn-primary">Schedule</button>
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

export default SocialScriptsPage
