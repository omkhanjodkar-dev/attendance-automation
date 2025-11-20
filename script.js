    const apiKey = window.GEMINI_API_KEY;

document.addEventListener('DOMContentLoaded', () => {

    // --- Existing Chart and Tab Logic ---
    const adoptionChartCtx = document.getElementById('adoptionChart')?.getContext('2d');
    let effectivenessChart; 
    
    const adoptionData = {
        labels: ['Biometric (Fingerprint)', 'App-based (QR/GPS)', 'Manual (Sheet/Call)', 'Facial Recognition'],
        datasets: [{
            label: 'Adoption Rate',
            data: [45, 30, 15, 10],
            backgroundColor: ['#3B82F6', '#10B981', '#EF4444', '#6366F1'],
            hoverOffset: 4
        }]
    };

    if (adoptionChartCtx) {
        new Chart(adoptionChartCtx, {
            type: 'doughnut',
            data: adoptionData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom' },
                    tooltip: { callbacks: { label: function(context) { return `${context.label}: ${context.raw}%`; } } }
                }
            }
        });
    }

    const effectivenessChartCtx = document.getElementById('effectivenessChart')?.getContext('2d');
    const effectivenessData = {
        labels: ['Manual', 'Biometric', 'QR Code (Dynamic)', 'Facial Rec.'],
        datasets: [{
            label: '% Proxy Reduction',
            data: [0, 60, 85, 98],
            backgroundColor: ['#F87171', '#FBBF24', '#34D399', '#4ADE80'],
            borderColor: ['#DC2626', '#D97706', '#059669', '#16A34A'],
            borderWidth: 1
        }]
    };
    
    const effectivenessColors = {
        base: ['#F87171', '#FBBF24', '#34D399', '#4ADE80'],
        highlight: '#2563EB'
    };

    if (effectivenessChartCtx) {
        effectivenessChart = new Chart(effectivenessChartCtx, {
            type: 'bar',
            data: effectivenessData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: { callbacks: { label: function(context) { return `Est. ${context.raw}% proxy reduction`; } } }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: { callback: function(value) { return value + '%' } }
                    }
                }
            }
        });
    }

    const tabs = document.querySelectorAll('button[role="tab"]');
    const tabContents = document.querySelectorAll('section[role="tabpanel"]');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.dataset.target;
            
            // Reset all tabs
            tabs.forEach(t => {
                t.setAttribute('aria-selected', 'false');
                // Check if it's the AI tab to handle its specific styling
                if (t.textContent.includes('AI Tools')) {
                    t.classList.remove('border-purple-500', 'bg-purple-100');
                    t.classList.add('border-purple-200', 'bg-purple-50'); 
                } else {
                    t.classList.remove('border-blue-500', 'text-blue-600', 'bg-blue-50');
                    t.classList.add('border-transparent', 'text-gray-600', 'hover:bg-gray-100');
                }
            });

            // Activate clicked tab
            tab.setAttribute('aria-selected', 'true');
             if (tab.textContent.includes('AI Tools')) {
                tab.classList.remove('border-purple-200', 'bg-purple-50');
                tab.classList.add('border-purple-500', 'bg-purple-100');
            } else {
                tab.classList.add('border-blue-500', 'text-blue-600', 'bg-blue-50');
                tab.classList.remove('border-transparent', 'text-gray-600', 'hover:bg-gray-100');
            }

            tabContents.forEach(content => {
                if (content.id === targetId) {
                    content.classList.remove('hidden');
                } else {
                    content.classList.add('hidden');
                }
            });
        });
    });
    
    if (tabs.length > 0) {
        tabs[0].click();
    }

    const methodButtons = document.querySelectorAll('.method-btn');
    const methodDetails = document.querySelectorAll('#method-details-container > div');
    const methodMap = { 'manual': 0, 'biometric': 1, 'qr_code': 2, 'facial_rec': 3 };

    methodButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetMethod = button.dataset.method;
            methodButtons.forEach(btn => btn.setAttribute('aria-selected', 'false'));
            button.setAttribute('aria-selected', 'true');
            methodDetails.forEach(detail => {
                if (detail.id === `method-detail-${targetMethod}`) detail.classList.remove('hidden');
                else detail.classList.add('hidden');
            });
            if (effectivenessChart) {
                const highlightIndex = methodMap[targetMethod];
                const newColors = [...effectivenessColors.base];
                newColors[highlightIndex] = effectivenessColors.highlight;
                effectivenessChart.data.datasets[0].backgroundColor = newColors;
                effectivenessChart.update();
            }
        });
    });

    if (methodButtons.length > 0) methodButtons[0].click();

    const filterButtons = document.querySelectorAll('.filter-btn');
    const caseStudyCards = document.querySelectorAll('.case-study-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            filterButtons.forEach(btn => btn.setAttribute('aria-selected', 'false'));
            button.setAttribute('aria-selected', 'true');
            caseStudyCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) card.classList.remove('hidden');
                else card.classList.add('hidden');
            });
        });
    });

    // --- GEMINI API INTEGRATION ---

    async function callGemini(prompt, systemInstruction) {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
        const payload = {
            contents: [{ parts: [{ text: prompt }] }],
            systemInstruction: { parts: [{ text: systemInstruction }] }
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await response.json();
            return data.candidates[0].content.parts[0].text;
        } catch (error) {
            console.error('Gemini API Error:', error);
            return "Sorry, the AI service is currently unavailable. Please try again later.";
        }
    }

    // Helper for loading state
    function setLoading(elementId, color = 'blue') {
        const el = document.getElementById(elementId);
        el.classList.remove('hidden');
        el.innerHTML = `<div class="flex items-center justify-center h-full"><span class="sparkle-loader text-${color}-600 text-sm">✨ AI is thinking...</span></div>`;
    }

    // Tool 1: Policy Generator
    const btnGeneratePolicy = document.getElementById('btn-generate-policy');
    if (btnGeneratePolicy) {
        btnGeneratePolicy.addEventListener('click', async () => {
            const institute = document.getElementById('policy-institute').value;
            const method = document.getElementById('policy-method').value;
            const strictness = document.getElementById('policy-strictness').value;
            
            setLoading('policy-output', 'blue');
            btnGeneratePolicy.disabled = true;
            btnGeneratePolicy.classList.add('opacity-50');

            const systemPrompt = "You are an experienced Academic Dean. Draft professional, short, formatting notices.";
            const userPrompt = `Draft a short attendance policy notice. Context: ${institute}. Method: ${method}. Strictness: ${strictness}. Include subject and bullet points.`;

            const response = await callGemini(userPrompt, systemPrompt);
            document.getElementById('policy-output').innerHTML = marked.parse(response);
            btnGeneratePolicy.disabled = false;
            btnGeneratePolicy.classList.remove('opacity-50');
        });
    }

    // Tool 2: Vulnerability Auditor
    const btnAudit = document.getElementById('btn-audit-system');
    if (btnAudit) {
        btnAudit.addEventListener('click', async () => {
            const scenario = document.getElementById('audit-input').value;
            if (!scenario.trim()) return alert("Please describe a scenario.");

            setLoading('audit-output', 'red');
            btnAudit.disabled = true;
            btnAudit.classList.add('opacity-50');

            const systemPrompt = "You are a Security Consultant. Identify loopholes in attendance processes concisely.";
            const userPrompt = `Analyze this scenario for proxy vulnerabilities: "${scenario}". Give a Vulnerability Score (Low/High) and 2 specific fix recommendations.`;

            const response = await callGemini(userPrompt, systemPrompt);
            document.getElementById('audit-output').innerHTML = marked.parse(response);
            btnAudit.disabled = false;
            btnAudit.classList.remove('opacity-50');
        });
    }

    // Tool 3: Excuse Validator
    const btnExcuse = document.getElementById('btn-analyze-excuse');
    if (btnExcuse) {
        btnExcuse.addEventListener('click', async () => {
            const excuse = document.getElementById('excuse-input').value;
            if (!excuse.trim()) return alert("Please paste the email/excuse.");

            setLoading('excuse-output', 'orange');
            btnExcuse.disabled = true;
            btnExcuse.classList.add('opacity-50');

            const systemPrompt = "You are a cynical but fair senior professor. Analyze student excuses.";
            const userPrompt = `Analyze this excuse text: "${excuse}". 
            1. Give a "Genuineness Rating" (1-10). 
            2. List 1 potential red flag or green flag.
            3. Draft a polite but firm response email accepting or rejecting it based on the rating.`;

            const response = await callGemini(userPrompt, systemPrompt);
            document.getElementById('excuse-output').innerHTML = marked.parse(response);
            btnExcuse.disabled = false;
            btnExcuse.classList.remove('opacity-50');
        });
    }

    // Tool 4: Recovery Planner
    const btnRecovery = document.getElementById('btn-plan-recovery');
    if (btnRecovery) {
        btnRecovery.addEventListener('click', async () => {
            const total = document.getElementById('total-classes').value;
            const attended = document.getElementById('attended-classes').value;
            const reason = document.getElementById('absence-reason').value;

            if (!total || !attended) return alert("Please fill in class numbers.");

            setLoading('recovery-output', 'green');
            btnRecovery.disabled = true;
            btnRecovery.classList.add('opacity-50');

            const systemPrompt = "You are a helpful Academic Advisor. Help students get back on track.";
            const userPrompt = `Student Stats: Attended ${attended}/${total}. Reason: ${reason}. Target: 75%.
            1. Calculate current %.
            2. Estimate how many CONSECUTIVE classes they need to attend to hit 75% (assuming total keeps increasing).
            3. Draft a short, professional email to the HOD asking for condonation/extra work.`;

            const response = await callGemini(userPrompt, systemPrompt);
            document.getElementById('recovery-output').innerHTML = marked.parse(response);
            btnRecovery.disabled = false;
            btnRecovery.classList.remove('opacity-50');
        });
    }

});