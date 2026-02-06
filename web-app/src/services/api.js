// n8n webhook URLs
const WEBHOOK_BASE = import.meta.env.VITE_WEBHOOK_URL || 'https://n8n-n8n.vwe4kq.easypanel.host';

/**
 * Submit website URL and/or file for initial analysis
 * POST /webhook-test/url
 */
export async function submitWebsiteData(url, file) {
    try {
        const payload = {};

        // Add URL if provided
        if (url && url.trim()) {
            payload.url = url.trim();
        }

        // Add file data if provided
        if (file) {
            payload.fileData = await fileToBase64(file);
            payload.fileName = file.name;
            payload.fileType = file.type;
        }

        const response = await fetch(`${WEBHOOK_BASE}/webhook/url`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error?.message || `Request failed with status ${response.status}`);
        }

        return response.json();
    } catch (error) {
        if (error.message === 'Failed to fetch') {
            throw new Error('Cannot connect to webhook. Please check your connection.');
        }
        throw error;
    }
}

/**
 * Get Market Research Report
 * GET /webhook/Get-Report-n
 */
export async function getReport() {
    try {
        const response = await fetch(`${WEBHOOK_BASE}/webhook/Get-Report-n`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        return response.json();
    } catch (error) {
        if (error.message === 'Failed to fetch') {
            throw new Error('Cannot connect to webhook. Please check your connection.');
        }
        throw error;
    }
}

/**
 * Get Competitor Analysis
 * GET /webhook/Get-Competitor-Analysis-N
 */
export async function getCompetitorAnalysis() {
    try {
        const response = await fetch(`${WEBHOOK_BASE}/webhook/Get-Competitor-Analysis-N`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        return response.json();
    } catch (error) {
        if (error.message === 'Failed to fetch') {
            throw new Error('Cannot connect to webhook. Please check your connection.');
        }
        throw error;
    }
}

/**
 * Generate Marketing Plan (POST)
 * POST /webhook-test/Content-Calender-n
 * Note: Same endpoint as Content Calendar generation
 */
export async function generateMarketingPlan() {
    try {
        const response = await fetch(`${WEBHOOK_BASE}/webhook/Content-Calender-n`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ type: 'marketing_plan' })
        });

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        return response.json();
    } catch (error) {
        if (error.message === 'Failed to fetch') {
            throw new Error('Cannot connect to webhook. Please check your connection.');
        }
        throw error;
    }
}

/**
 * Get Marketing Plan
 * GET /webhook/Get-Marketing-Plan-m
 */
export async function getMarketingPlan() {
    try {
        const response = await fetch(`${WEBHOOK_BASE}/webhook/Get-Marketing-Plan-m`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        return response.json();
    } catch (error) {
        if (error.message === 'Failed to fetch') {
            throw new Error('Cannot connect to webhook. Please check your connection.');
        }
        throw error;
    }
}

/**
 * Generate Content Calendar (POST)
 * POST /webhook-test/Content-Calender-n
 * Note: Same endpoint as Marketing Plan generation
 */
export async function generateContentCalendar() {
    try {
        const response = await fetch(`${WEBHOOK_BASE}/webhook/Content-Calender-n`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ type: 'content_calendar' })
        });

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        return response.json();
    } catch (error) {
        if (error.message === 'Failed to fetch') {
            throw new Error('Cannot connect to webhook. Please check your connection.');
        }
        throw error;
    }
}

/**
 * Get Content Calendar
 * GET /webhook/Get-Content-Calendar-n
 */
export async function getContentCalendar() {
    try {
        const response = await fetch(`${WEBHOOK_BASE}/webhook/Get-Content-Calendar-n`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        return response.json();
    } catch (error) {
        if (error.message === 'Failed to fetch') {
            throw new Error('Cannot connect to webhook. Please check your connection.');
        }
        throw error;
    }
}

/**
 * Analyze Facebook Competitor Page
 * POST /webhook-test/Facebook
 * @param {string} facebookUrl - The Facebook page URL to analyze
 * @param {string} userId - Optional user ID for tracking
 * @returns {Promise<Object>} Analysis results
 */
export async function analyzeFacebookCompetitor(facebookUrl, userId = null) {
    try {
        const payload = {
            facebook_url: facebookUrl,
            timestamp: new Date().toISOString(),
        };

        if (userId) {
            payload.user_id = userId;
        }

        const response = await fetch(`${WEBHOOK_BASE}/webhook/Facebook`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error?.message || `Request failed with status ${response.status}`);
        }

        return response.json();
    } catch (error) {
        if (error.message === 'Failed to fetch') {
            throw new Error('Cannot connect to analysis service. Please check your connection.');
        }
        throw error;
    }
}

/**
 * Convert file to base64 string
 */
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const base64 = reader.result.split(',')[1];
            resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

export default {
    submitWebsiteData,
    getReport,
    getCompetitorAnalysis,
    generateMarketingPlan,
    getMarketingPlan,
    generateContentCalendar,
    getContentCalendar,
    analyzeFacebookCompetitor
};
