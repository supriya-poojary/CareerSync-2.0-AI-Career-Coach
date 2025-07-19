// CareerSync 2.0 - AI Career Coach Application
// FIXED VERSION - All buttons and interactions working

console.log('🚀 CareerSync 2.0 - Fixed Version Loading...');

// Application State
let appState = {
    currentSection: 'landing',
    resumeData: null,
    analysisResults: null,
    jobRecommendations: [],
    skillsGap: [],
    careerPlan: null,
    interviewSession: {
        active: false,
        currentQuestion: 0,
        questionType: 'technical',
        answers: [],
        totalQuestions: 5
    },
    speechRecognition: null,
    theme: localStorage.getItem('careersync_theme') || 'light',
    skillsChart: null
};

// Sample Data
const sampleData = {
    sampleResume: {
        text: "John Smith\nSoftware Developer\nemail: john.smith@email.com\nphone: (555) 123-4567\n\nEXPERIENCE:\nSoftware Developer at TechCorp (2021-2024)\n- Developed web applications using React and Node.js\n- Collaborated with cross-functional teams using Agile methodologies\n- Implemented responsive designs with modern CSS\n- Built REST APIs and integrated with databases\n\nJunior Developer at StartupInc (2019-2021)\n- Built REST APIs using Python and Flask\n- Worked with SQL databases and data optimization\n- Participated in agile development processes\n- Contributed to code reviews and testing\n\nEDUCATION:\nBachelor of Science in Computer Science\nUniversity of Technology (2015-2019)\nRelevant coursework: Data Structures, Algorithms, Web Development\n\nSKILLS:\nJavaScript, React, Node.js, Python, SQL, Git, HTML, CSS, Agile, REST APIs"
    },
    jobRecommendations: [
        {
            id: 1,
            title: "Full Stack Developer",
            match: 92,
            description: "Build scalable web applications using modern frameworks like React and Node.js. Work with cross-functional teams to deliver high-quality software solutions.",
            requiredSkills: ["React", "Node.js", "JavaScript", "SQL", "Git"],
            salaryRange: "$75,000 - $95,000",
            growthPotential: "High",
            company: "TechFlow Solutions",
            location: "Remote"
        },
        {
            id: 2, 
            title: "Frontend Developer",
            match: 88,
            description: "Create responsive user interfaces and enhance user experience. Collaborate with designers to implement modern UI/UX principles.",
            requiredSkills: ["React", "JavaScript", "HTML", "CSS", "Git"],
            salaryRange: "$70,000 - $85,000", 
            growthPotential: "High",
            company: "Digital Innovations",
            location: "New York, NY"
        },
        {
            id: 3,
            title: "Software Engineer",
            match: 85,
            description: "Design and implement scalable software solutions. Work with cloud technologies and modern development practices.",
            requiredSkills: ["JavaScript", "Python", "SQL", "Git", "AWS"],
            salaryRange: "$80,000 - $100,000",
            growthPotential: "Very High", 
            company: "CloudTech Systems",
            location: "San Francisco, CA"
        }
    ],
    interviewQuestions: {
        technical: [
            "Explain the difference between var, let, and const in JavaScript.",
            "How would you optimize the performance of a slow-loading web application?",
            "Describe your experience with version control systems like Git.",
            "What is the difference between SQL and NoSQL databases?",
            "How do you handle asynchronous operations in JavaScript?"
        ],
        behavioral: [
            "Tell me about a challenging project you worked on and how you overcame obstacles.",
            "How do you handle working under tight deadlines and pressure?", 
            "Describe a time you had to learn a new technology quickly for a project.",
            "How do you stay updated with the latest technologies and industry trends?",
            "Tell me about a time you had to work with a difficult team member."
        ]
    },
    skillGaps: [
        { skill: "TypeScript", importance: "High", currentLevel: 0, targetLevel: 80, recommendation: "Complete TypeScript fundamentals course and practice with real projects" },
        { skill: "Docker", importance: "Medium", currentLevel: 0, targetLevel: 70, recommendation: "Learn containerization basics and Docker deployment" },
        { skill: "AWS", importance: "High", currentLevel: 0, targetLevel: 75, recommendation: "Get AWS Cloud Practitioner certification and hands-on experience" }
    ],
    careerPlan: {
        day1: { title: "TypeScript Fundamentals", tasks: ["Watch TypeScript crash course (2 hours)", "Complete basic exercises on TypeScript playground", "Set up TypeScript in a sample project"], resources: ["TypeScript Documentation", "Online Course"] },
        day2: { title: "Advanced JavaScript Concepts", tasks: ["Study ES6+ features in depth", "Practice async/await patterns", "Build a small project using modern JavaScript"], resources: ["MDN JavaScript Guide", "Practice Platform"] },
        day3: { title: "Docker & Containerization", tasks: ["Install Docker and learn basic commands", "Create your first Dockerfile", "Containerize a Node.js application"], resources: ["Docker Tutorial", "Sample Projects"] },
        day4: { title: "AWS Cloud Basics", tasks: ["Create AWS free tier account", "Learn about EC2 and S3 services", "Deploy a simple application to AWS"], resources: ["AWS Free Tier", "Cloud Practitioner Prep"] },
        day5: { title: "System Design Fundamentals", tasks: ["Study system design principles", "Practice designing a simple web application", "Review scalability concepts"], resources: ["System Design Primer", "Interview Prep"] },
        day6: { title: "Mock Interviews & Practice", tasks: ["Complete 3 technical coding challenges", "Practice behavioral interview questions", "Record yourself answering common questions"], resources: ["Coding Platform", "Interview Questions"] },
        day7: { title: "Portfolio & Networking", tasks: ["Update LinkedIn profile with new skills", "Create/update GitHub portfolio", "Connect with 5 professionals in your field"], resources: ["LinkedIn Learning", "GitHub Examples"] }
    }
};

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM loaded, initializing CareerSync 2.0...');
    
    // Small delay to ensure all elements are rendered
    setTimeout(() => {
        try {
            initializeApp();
            setupEventListeners();
            loadSavedData();
            setupSpeechRecognition();
            console.log('✅ CareerSync 2.0 initialized successfully');
        } catch (error) {
            console.error('❌ Error initializing app:', error);
            showToast('Application initialized with some errors. Functionality may be limited.', 'warning');
        }
    }, 100);
});

function initializeApp() {
    console.log('🔧 Setting up initial app state...');
    
    // Set initial theme
    document.documentElement.setAttribute('data-color-scheme', appState.theme);
    updateThemeToggle();
    
    // Show landing section by default
    showSection('landing');
    
    // Initialize dashboard
    setTimeout(() => updateDashboard(), 200);
    
    console.log('✅ App initialization complete');
}

function setupEventListeners() {
    console.log('🔗 Setting up all event listeners...');
    
    // Navigation buttons
    const navButtons = document.querySelectorAll('.nav__item[data-section]');
    console.log(`Found ${navButtons.length} navigation buttons`);
    
    navButtons.forEach(button => {
        const section = button.getAttribute('data-section');
        if (section) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                console.log(`🖱️ Navigation: ${section}`);
                showSection(section);
                showToast(`Navigated to ${section.charAt(0).toUpperCase() + section.slice(1)}`, 'info');
            });
            console.log(`✅ Nav listener set for: ${section}`);
        }
    });

    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('🖱️ Theme toggle clicked');
            toggleTheme();
        });
        console.log('✅ Theme toggle listener set');
    }

    // Landing page buttons
    const getStartedBtn = document.getElementById('getStartedBtn');
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('🖱️ Get Started clicked');
            showSection('resume');
            showToast('Welcome! Upload your resume to begin analysis.', 'success');
        });
        console.log('✅ Get Started button listener set');
    }

    const tryDemoBtn = document.getElementById('tryDemoBtn');
    if (tryDemoBtn) {
        tryDemoBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('🖱️ Try Demo clicked');
            loadDemoData();
        });
        console.log('✅ Try Demo button listener set');
    }

    // Resume section buttons
    const uploadBtn = document.getElementById('uploadBtn');
    const resumeFile = document.getElementById('resumeFile');
    if (uploadBtn && resumeFile) {
        uploadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('🖱️ Upload button clicked');
            resumeFile.click();
        });
        
        resumeFile.addEventListener('change', function(e) {
            console.log('📁 File selected');
            handleFileUpload(e);
        });
        console.log('✅ Upload listeners set');
    }

    const analyzeBtn = document.getElementById('analyzeResumeBtn');
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('🖱️ Analyze Resume clicked');
            analyzeResume();
        });
        console.log('✅ Analyze button listener set');
    }

    const clearBtn = document.getElementById('clearResumeBtn');
    if (clearBtn) {
        clearBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('🖱️ Clear button clicked');
            clearResume();
        });
        console.log('✅ Clear button listener set');
    }

    // Interview buttons
    const startInterviewBtn = document.getElementById('startInterviewBtn');
    if (startInterviewBtn) {
        startInterviewBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('🖱️ Start Interview clicked');
            startInterview();
        });
        console.log('✅ Start Interview listener set');
    }

    const startRecordingBtn = document.getElementById('startRecordingBtn');
    if (startRecordingBtn) {
        startRecordingBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('🖱️ Start Recording clicked');
            startRecording();
        });
        console.log('✅ Start Recording listener set');
    }

    const stopRecordingBtn = document.getElementById('stopRecordingBtn');
    if (stopRecordingBtn) {
        stopRecordingBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('🖱️ Stop Recording clicked');
            stopRecording();
        });
        console.log('✅ Stop Recording listener set');
    }

    const nextQuestionBtn = document.getElementById('nextQuestionBtn');
    if (nextQuestionBtn) {
        nextQuestionBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('🖱️ Next Question clicked');
            nextQuestion();
        });
        console.log('✅ Next Question listener set');
    }

    const endInterviewBtn = document.getElementById('endInterviewBtn');
    if (endInterviewBtn) {
        endInterviewBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('🖱️ End Interview clicked');
            endInterview();
        });
        console.log('✅ End Interview listener set');
    }

    // Career plan buttons
    const generatePlanBtn = document.getElementById('generatePlanBtn');
    if (generatePlanBtn) {
        generatePlanBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('🖱️ Generate Plan clicked');
            generateCareerPlan();
        });
        console.log('✅ Generate Plan listener set');
    }

    const resetPlanBtn = document.getElementById('resetPlanBtn');
    if (resetPlanBtn) {
        resetPlanBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('🖱️ Reset Plan clicked');
            resetPlan();
        });
        console.log('✅ Reset Plan listener set');
    }

    const exportPlanBtn = document.getElementById('exportPlanBtn');
    if (exportPlanBtn) {
        exportPlanBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('🖱️ Export Plan clicked');
            exportPlan();
        });
        console.log('✅ Export Plan listener set');
    }

    // Setup drag and drop
    setupDragAndDrop();

    console.log('✅ All event listeners setup complete');
}

function showSection(sectionId) {
    console.log(`🔄 Switching to section: ${sectionId}`);
    
    try {
        // Hide all sections
        const allSections = document.querySelectorAll('.section, .landing');
        allSections.forEach(section => {
            section.classList.remove('active');
        });

        // Show target section
        if (sectionId === 'landing') {
            const landing = document.querySelector('.landing');
            if (landing) {
                landing.classList.add('active');
                landing.style.display = 'block';
            }
        } else {
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.classList.add('active');
                targetSection.style.display = 'block';
            }
        }

        // Update navigation
        const navItems = document.querySelectorAll('.nav__item');
        navItems.forEach(item => {
            item.classList.remove('active');
        });
        
        const activeNavItem = document.querySelector(`[data-section="${sectionId}"]`);
        if (activeNavItem) {
            activeNavItem.classList.add('active');
        }

        appState.currentSection = sectionId;

        // Load section-specific data
        if (sectionId === 'dashboard') {
            setTimeout(() => updateDashboard(), 100);
        } else if (sectionId === 'jobs' && appState.analysisResults) {
            setTimeout(() => loadJobRecommendations(), 100);
        }
        
        console.log(`✅ Successfully switched to ${sectionId}`);
    } catch (error) {
        console.error(`❌ Error switching to section ${sectionId}:`, error);
    }
}

function toggleTheme() {
    console.log('🎨 Toggling theme...');
    
    try {
        appState.theme = appState.theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-color-scheme', appState.theme);
        localStorage.setItem('careersync_theme', appState.theme);
        updateThemeToggle();
        showToast(`Switched to ${appState.theme} theme`, 'success');
        console.log(`✅ Theme switched to ${appState.theme}`);
    } catch (error) {
        console.error('❌ Error toggling theme:', error);
    }
}

function updateThemeToggle() {
    const toggle = document.getElementById('themeToggle');
    if (toggle) {
        toggle.textContent = appState.theme === 'light' ? '🌙' : '☀️';
    }
}

function loadDemoData() {
    console.log('🎯 Loading demo data...');
    
    try {
        showSection('resume');
        
        setTimeout(() => {
            const resumeText = document.getElementById('resumeText');
            if (resumeText) {
                resumeText.value = sampleData.sampleResume.text;
                showToast('Demo data loaded! Click "Analyze Resume" to continue.', 'success');
                
                // Auto-analyze after delay
                setTimeout(() => {
                    analyzeResume();
                }, 1500);
            }
        }, 300);
        
        console.log('✅ Demo data loaded successfully');
    } catch (error) {
        console.error('❌ Error loading demo data:', error);
    }
}

function setupDragAndDrop() {
    const uploadArea = document.getElementById('uploadArea');
    if (!uploadArea) return;
    
    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        e.currentTarget.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', function(e) {
        e.currentTarget.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        e.currentTarget.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0 && files[0].type === 'application/pdf') {
            console.log('📁 PDF file dropped');
            showToast('PDF detected - Loading sample data for demo', 'info');
            document.getElementById('resumeText').value = sampleData.sampleResume.text;
        }
    });
    
    console.log('✅ Drag and drop setup complete');
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
        console.log('📁 PDF file selected:', file.name);
        showToast(`PDF "${file.name}" loaded - Using sample data for demo`, 'info');
        document.getElementById('resumeText').value = sampleData.sampleResume.text;
    }
}

function clearResume() {
    console.log('🧹 Clearing resume...');
    
    try {
        const resumeText = document.getElementById('resumeText');
        const resumeFile = document.getElementById('resumeFile');
        
        if (resumeText) resumeText.value = '';
        if (resumeFile) resumeFile.value = '';
        
        const analysisResults = document.getElementById('analysisResults');
        if (analysisResults) {
            analysisResults.style.display = 'none';
        }
        
        appState.resumeData = null;
        appState.analysisResults = null;
        
        showToast('Resume cleared successfully', 'success');
        console.log('✅ Resume cleared');
    } catch (error) {
        console.error('❌ Error clearing resume:', error);
    }
}

function analyzeResume() {
    console.log('🔍 Starting resume analysis...');
    
    try {
        const resumeText = document.getElementById('resumeText');
        if (!resumeText || !resumeText.value.trim()) {
            showToast('Please enter or upload your resume first', 'error');
            return;
        }

        showLoading('Analyzing your resume with AI...');
        
        setTimeout(() => {
            const analysis = performResumeAnalysis(resumeText.value);
            displayAnalysisResults(analysis);
            appState.analysisResults = analysis;
            localStorage.setItem('careersync_analysis', JSON.stringify(analysis));
            hideLoading();
            showToast('Resume analysis completed successfully!', 'success');
            
            // Add Find Jobs button listener
            setTimeout(() => {
                const findJobsBtn = document.getElementById('findJobsBtn');
                if (findJobsBtn) {
                    findJobsBtn.addEventListener('click', function(e) {
                        e.preventDefault();
                        console.log('🖱️ Find Jobs clicked from results');
                        showSection('jobs');
                        setTimeout(() => loadJobRecommendations(), 200);
                    });
                }
            }, 100);
            
        }, 2500);
        
    } catch (error) {
        console.error('❌ Error analyzing resume:', error);
        hideLoading();
        showToast('Error analyzing resume. Please try again.', 'error');
    }
}

function performResumeAnalysis(resumeText) {
    const words = resumeText.toLowerCase().split(/\s+/);
    const keywordScore = Math.min(100, Math.max(65, Math.floor(words.length / 8)));
    const formatScore = resumeText.includes('@') ? 88 : 72;
    const structureScore = (resumeText.includes('EXPERIENCE') && resumeText.includes('SKILLS')) ? 92 : 78;
    
    const atsScore = Math.floor((keywordScore + formatScore + structureScore) / 3);
    
    const allSkills = ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'Git', 'HTML', 'CSS', 'TypeScript', 'Docker', 'AWS', 'Agile'];
    const extractedSkills = allSkills.filter(skill => 
        resumeText.toLowerCase().includes(skill.toLowerCase())
    );

    const tips = [];
    if (keywordScore < 80) tips.push('Add more industry-specific keywords for your target role');
    if (formatScore < 85) tips.push('Include complete contact information');
    if (structureScore < 85) tips.push('Use clear section headers like EXPERIENCE, EDUCATION, SKILLS');
    if (extractedSkills.length < 6) tips.push('Add more technical skills relevant to your field');
    if (tips.length === 0) tips.push('Great job! Your resume is well-optimized for ATS systems');

    return {
        atsScore,
        keywordScore,
        formatScore,
        structureScore,
        extractedSkills,
        improvementTips: tips
    };
}

function displayAnalysisResults(analysis) {
    console.log('📊 Displaying analysis results...');
    
    try {
        // Update all score elements
        const scoreElements = {
            'detailedAtsScore': analysis.atsScore,
            'keywordScore': `${analysis.keywordScore}/100`,
            'formatScore': `${analysis.formatScore}/100`,
            'structureScore': `${analysis.structureScore}/100`,
            'atsScore': analysis.atsScore
        };

        Object.keys(scoreElements).forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = scoreElements[id];
            }
        });

        // Update improvement tips
        const tipsContainer = document.getElementById('improvementTips');
        if (tipsContainer) {
            tipsContainer.innerHTML = '';
            analysis.improvementTips.forEach(tip => {
                const li = document.createElement('li');
                li.textContent = tip;
                tipsContainer.appendChild(li);
            });
        }

        // Update extracted skills
        const skillsContainer = document.getElementById('extractedSkills');
        if (skillsContainer) {
            skillsContainer.innerHTML = '';
            analysis.extractedSkills.forEach(skill => {
                const span = document.createElement('span');
                span.className = 'skill-tag';
                span.textContent = skill;
                skillsContainer.appendChild(span);
            });
        }

        // Show results
        const analysisResults = document.getElementById('analysisResults');
        if (analysisResults) {
            analysisResults.style.display = 'block';
        }
        
        console.log('✅ Analysis results displayed');
        
    } catch (error) {
        console.error('❌ Error displaying results:', error);
    }
}

function loadJobRecommendations() {
    console.log('💼 Loading job recommendations...');
    
    try {
        if (!appState.analysisResults) {
            showToast('Please analyze your resume first', 'error');
            return;
        }

        const container = document.getElementById('jobRecommendations');
        if (!container) return;

        container.innerHTML = '<div class="loading" style="text-align: center; padding: 2rem;">Loading personalized job recommendations...</div>';

        setTimeout(() => {
            container.innerHTML = '';

            sampleData.jobRecommendations.forEach(job => {
                const jobCard = createJobCard(job);
                container.appendChild(jobCard);
            });

            // Load skills gap
            loadSkillsGap();
            const skillsGap = document.getElementById('skillsGap');
            if (skillsGap) {
                skillsGap.style.display = 'block';
                
                // Add Start Skills button listener
                const startSkillsBtn = document.getElementById('startSkillsBtn');
                if (startSkillsBtn) {
                    startSkillsBtn.addEventListener('click', function(e) {
                        e.preventDefault();
                        showSection('plan');
                        setTimeout(() => generateCareerPlan(), 300);
                    });
                }
            }
            
            showToast('Job recommendations loaded successfully!', 'success');
        }, 1000);
        
    } catch (error) {
        console.error('❌ Error loading job recommendations:', error);
    }
}

function createJobCard(job) {
    const card = document.createElement('div');
    card.className = 'job-card';
    card.innerHTML = `
        <div class="job-header">
            <h3 class="job-title">${job.title}</h3>
            <div class="match-score">${job.match}% Match</div>
        </div>
        <p>${job.description}</p>
        <div class="job-details">
            <div class="job-detail">
                <span class="job-detail-label">Company</span>
                <span>${job.company}</span>
            </div>
            <div class="job-detail">
                <span class="job-detail-label">Location</span>
                <span>${job.location}</span>
            </div>
            <div class="job-detail">
                <span class="job-detail-label">Salary Range</span>
                <span>${job.salaryRange}</span>
            </div>
            <div class="job-detail">
                <span class="job-detail-label">Growth Potential</span>
                <span>${job.growthPotential}</span>
            </div>
        </div>
        <div class="job-skills">
            ${job.requiredSkills.map(skill => `<span class="job-skill">${skill}</span>`).join('')}
        </div>
        <div class="job-actions">
            <button class="btn btn--primary btn--sm" onclick="viewJobDetails(${job.id})">View Details</button>
            <button class="btn btn--outline btn--sm" onclick="saveJob(${job.id}, this)">Save Job</button>
        </div>
    `;
    
    return card;
}

function viewJobDetails(jobId) {
    const job = sampleData.jobRecommendations.find(j => j.id === jobId);
    if (job) {
        showToast(`Viewing details for ${job.title} at ${job.company}`, 'info');
    }
}

function saveJob(jobId, button) {
    const job = sampleData.jobRecommendations.find(j => j.id === jobId);
    if (job) {
        button.textContent = 'Saved ✓';
        button.disabled = true;
        button.style.opacity = '0.7';
        showToast(`${job.title} saved to your list!`, 'success');
    }
}

function loadSkillsGap() {
    const container = document.getElementById('gapCards');
    if (!container) return;

    container.innerHTML = '';
    sampleData.skillGaps.forEach(gap => {
        const card = document.createElement('div');
        card.className = 'gap-card';
        card.innerHTML = `
            <div class="gap-skill">${gap.skill}</div>
            <div class="gap-importance ${gap.importance.toLowerCase()}">${gap.importance} Priority</div>
            <div class="gap-level">
                <div>Current: ${gap.currentLevel}% → Target: ${gap.targetLevel}%</div>
                <div class="gap-level-bar">
                    <div class="gap-level-fill" style="width: ${gap.targetLevel}%"></div>
                </div>
            </div>
            <div class="gap-recommendation">${gap.recommendation}</div>
        `;
        container.appendChild(card);
    });
}

function setupSpeechRecognition() {
    try {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            appState.speechRecognition = new SpeechRecognition();
            appState.speechRecognition.continuous = true;
            appState.speechRecognition.interimResults = true;
            appState.speechRecognition.lang = 'en-US';

            appState.speechRecognition.onresult = function(event) {
                let transcript = '';
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    transcript += event.results[i][0].transcript;
                }
                const answerText = document.getElementById('answerText');
                if (answerText) answerText.textContent = transcript;
            };

            appState.speechRecognition.onend = function() {
                const answer = document.getElementById('answerText');
                if (answer && answer.textContent && answer.textContent !== 'Your answer will appear here...') {
                    analyzeAnswer(answer.textContent);
                }
                const status = document.getElementById('recordingStatus');
                if (status) {
                    status.textContent = '';
                    status.classList.remove('active');
                }
            };

            appState.speechRecognition.onerror = function(event) {
                console.error('Speech recognition error:', event.error);
                showToast('Speech recognition error: ' + event.error, 'error');
            };
            
            console.log('✅ Speech recognition setup complete');
        }
    } catch (error) {
        console.error('❌ Speech recognition setup error:', error);
    }
}

function startInterview() {
    console.log('🎯 Starting interview...');
    
    try {
        const questionType = document.getElementById('questionType').value;
        appState.interviewSession = {
            active: true,
            currentQuestion: 0,
            questionType: questionType,
            answers: [],
            startTime: Date.now(),
            totalQuestions: sampleData.interviewQuestions[questionType].length
        };

        const sessionElement = document.getElementById('interviewSession');
        if (sessionElement) {
            sessionElement.style.display = 'block';
        }
        
        loadCurrentQuestion();
        showToast(`${questionType.charAt(0).toUpperCase() + questionType.slice(1)} interview started!`, 'success');
        
    } catch (error) {
        console.error('❌ Error starting interview:', error);
    }
}

function loadCurrentQuestion() {
    try {
        const questions = sampleData.interviewQuestions[appState.interviewSession.questionType];
        const currentQ = questions[appState.interviewSession.currentQuestion];
        
        const questionElement = document.getElementById('currentQuestion');
        const questionNumber = document.getElementById('questionNumber');
        const answerText = document.getElementById('answerText');
        const feedback = document.getElementById('analysisFeedback');
        
        if (questionElement) questionElement.textContent = currentQ;
        if (questionNumber) questionNumber.textContent = appState.interviewSession.currentQuestion + 1;
        if (answerText) answerText.textContent = 'Your answer will appear here...';
        if (feedback) feedback.style.display = 'none';
        
    } catch (error) {
        console.error('❌ Error loading question:', error);
    }
}

function startRecording() {
    try {
        if (!appState.speechRecognition) {
            showToast('Speech recognition not available. Please use text input.', 'error');
            return;
        }

        const startBtn = document.getElementById('startRecordingBtn');
        const stopBtn = document.getElementById('stopRecordingBtn');
        const status = document.getElementById('recordingStatus');
        const answerText = document.getElementById('answerText');

        if (startBtn) startBtn.style.display = 'none';
        if (stopBtn) stopBtn.style.display = 'inline-block';
        if (status) {
            status.textContent = 'Recording... Speak now!';
            status.classList.add('active');
        }
        if (answerText) answerText.textContent = '';

        appState.speechRecognition.start();
        appState.interviewSession.recordingStart = Date.now();
        
    } catch (error) {
        console.error('❌ Error starting recording:', error);
        showToast('Error starting recording', 'error');
    }
}

function stopRecording() {
    try {
        if (appState.speechRecognition) {
            appState.speechRecognition.stop();
        }
        
        const startBtn = document.getElementById('startRecordingBtn');
        const stopBtn = document.getElementById('stopRecordingBtn');
        const status = document.getElementById('recordingStatus');

        if (startBtn) startBtn.style.display = 'inline-block';
        if (stopBtn) stopBtn.style.display = 'none';
        if (status) {
            status.textContent = 'Processing...';
            status.classList.remove('active');
        }
        
    } catch (error) {
        console.error('❌ Error stopping recording:', error);
    }
}

function analyzeAnswer(answer) {
    try {
        const words = answer.split(' ');
        const duration = (Date.now() - appState.interviewSession.recordingStart) / 1000;
        const wpm = Math.round((words.length / duration) * 60);
        
        const fillerWords = ['um', 'uh', 'like', 'you know', 'so'];
        const fillerCount = fillerWords.reduce((count, filler) => 
            count + (answer.toLowerCase().match(new RegExp(filler, 'g')) || []).length, 0);
        
        const confidenceLevel = fillerCount < 2 ? 'Confident' : 'Needs Improvement';
        const pace = wpm > 150 ? 'Fast' : wpm > 100 ? 'Good' : 'Slow';

        // Update analysis display
        const elements = {
            'confidenceLevel': confidenceLevel,
            'speakingPace': `${wpm} WPM (${pace})`,
            'answerLength': `${words.length} words`
        };

        Object.keys(elements).forEach(id => {
            const element = document.getElementById(id);
            if (element) element.textContent = elements[id];
        });
        
        // Generate feedback
        const tips = [];
        if (confidenceLevel === 'Needs Improvement') tips.push('Try to reduce filler words');
        if (wpm < 100) tips.push('Consider speaking faster to maintain engagement');
        if (words.length < 30) tips.push('Provide more detailed answers with examples');
        if (tips.length === 0) tips.push('Excellent! Your answer was clear and well-paced.');

        const feedbackTips = document.getElementById('feedbackTips');
        const analysisFeedback = document.getElementById('analysisFeedback');
        
        if (feedbackTips) feedbackTips.innerHTML = tips.map(tip => `<p>• ${tip}</p>`).join('');
        if (analysisFeedback) analysisFeedback.style.display = 'block';

        appState.interviewSession.answers.push({
            question: document.getElementById('currentQuestion').textContent,
            answer: answer,
            analysis: { confidenceLevel, wpm, wordCount: words.length }
        });
        
    } catch (error) {
        console.error('❌ Error analyzing answer:', error);
    }
}

function nextQuestion() {
    try {
        const questions = sampleData.interviewQuestions[appState.interviewSession.questionType];
        appState.interviewSession.currentQuestion++;
        
        if (appState.interviewSession.currentQuestion >= questions.length) {
            appState.interviewSession.currentQuestion = 0;
        }
        
        loadCurrentQuestion();
        showToast(`Question ${appState.interviewSession.currentQuestion + 1} of ${questions.length}`, 'info');
        
    } catch (error) {
        console.error('❌ Error next question:', error);
    }
}

function endInterview() {
    try {
        appState.interviewSession.active = false;
        const sessionElement = document.getElementById('interviewSession');
        if (sessionElement) {
            sessionElement.style.display = 'none';
        }
        
        const answersCount = appState.interviewSession.answers.length;
        showToast(`Interview completed! You answered ${answersCount} questions.`, 'success');
        
        setTimeout(() => updateDashboard(), 200);
        
    } catch (error) {
        console.error('❌ Error ending interview:', error);
    }
}

function generateCareerPlan() {
    console.log('📋 Generating career plan...');
    
    try {
        if (!appState.analysisResults) {
            showToast('Please analyze your resume first', 'error');
            return;
        }

        showLoading('Generating your personalized 7-day career plan...');
        
        setTimeout(() => {
            appState.careerPlan = { ...sampleData.careerPlan };
            displayCareerPlan();
            
            const planContainer = document.getElementById('planContainer');
            const planContent = document.getElementById('planContent');
            
            if (planContainer) planContainer.style.display = 'none';
            if (planContent) planContent.style.display = 'block';
            
            hideLoading();
            showToast('Your personalized career plan is ready!', 'success');
            
        }, 2000);
        
    } catch (error) {
        console.error('❌ Error generating plan:', error);
        hideLoading();
    }
}

function displayCareerPlan() {
    try {
        const container = document.getElementById('planDays');
        if (!container) return;

        container.innerHTML = '';

        Object.keys(appState.careerPlan).forEach((dayKey, index) => {
            const dayData = appState.careerPlan[dayKey];
            const dayCard = createDayCard(dayKey, dayData, index + 1);
            container.appendChild(dayCard);
        });

        updatePlanProgress();
        
    } catch (error) {
        console.error('❌ Error displaying plan:', error);
    }
}

function createDayCard(dayKey, dayData, dayNumber) {
    const savedProgress = JSON.parse(localStorage.getItem('careersync_plan_progress') || '{}');
    const dayProgress = savedProgress[dayKey] || {};

    const card = document.createElement('div');
    card.className = 'day-card';
    card.innerHTML = `
        <div class="day-header">
            <div class="day-number">Day ${dayNumber}</div>
            <h3 class="day-title">${dayData.title}</h3>
        </div>
        <div class="day-body">
            <div class="task-list">
                ${dayData.tasks.map((task, index) => `
                    <div class="task-item ${dayProgress[index] ? 'completed' : ''}">
                        <input type="checkbox" class="task-checkbox" 
                               data-day="${dayKey}" data-task="${index}"
                               ${dayProgress[index] ? 'checked' : ''}
                               onchange="handleTaskCompletion(event)">
                        <span class="task-text">${task}</span>
                    </div>
                `).join('')}
            </div>
            <div class="resources-list">
                <h5>Resources:</h5>
                <div class="resource-links">
                    ${dayData.resources.map(resource => `
                        <a href="#" class="resource-link" onclick="showToast('Resource: ${resource}', 'info')">${resource}</a>
                    `).join('')}
                </div>
            </div>
        </div>
    `;

    return card;
}

function handleTaskCompletion(event) {
    try {
        const day = event.target.getAttribute('data-day');
        const taskIndex = event.target.getAttribute('data-task');
        const isCompleted = event.target.checked;

        const savedProgress = JSON.parse(localStorage.getItem('careersync_plan_progress') || '{}');
        if (!savedProgress[day]) savedProgress[day] = {};
        savedProgress[day][taskIndex] = isCompleted;

        localStorage.setItem('careersync_plan_progress', JSON.stringify(savedProgress));

        const taskItem = event.target.closest('.task-item');
        if (isCompleted) {
            taskItem.classList.add('completed');
        } else {
            taskItem.classList.remove('completed');
        }

        updatePlanProgress();
        showToast(isCompleted ? 'Task completed! 🎉' : 'Task unchecked', 'success');
        
    } catch (error) {
        console.error('❌ Error handling task:', error);
    }
}

function updatePlanProgress() {
    try {
        const savedProgress = JSON.parse(localStorage.getItem('careersync_plan_progress') || '{}');
        let totalTasks = 0;
        let completedTasks = 0;

        Object.keys(appState.careerPlan).forEach(dayKey => {
            const dayTasks = appState.careerPlan[dayKey].tasks.length;
            totalTasks += dayTasks;
            
            const dayProgress = savedProgress[dayKey] || {};
            completedTasks += Object.values(dayProgress).filter(Boolean).length;
        });

        const progressPercent = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
        const progressElement = document.getElementById('planProgress');
        if (progressElement) {
            progressElement.style.width = progressPercent + '%';
        }
        
    } catch (error) {
        console.error('❌ Error updating progress:', error);
    }
}

function resetPlan() {
    if (confirm('Reset all career plan progress? This cannot be undone.')) {
        localStorage.removeItem('careersync_plan_progress');
        if (appState.careerPlan) {
            displayCareerPlan();
        }
        showToast('Career plan progress reset', 'success');
    }
}

function exportPlan() {
    try {
        let planText = 'CareerSync 2.0 - 7-Day Career Improvement Plan\n\n';
        
        Object.keys(appState.careerPlan).forEach((dayKey, index) => {
            const dayData = appState.careerPlan[dayKey];
            planText += `Day ${index + 1}: ${dayData.title}\n`;
            planText += '----------------------------\n';
            dayData.tasks.forEach((task, i) => {
                planText += `${i + 1}. ${task}\n`;
            });
            planText += `\nResources: ${dayData.resources.join(', ')}\n\n`;
        });

        const blob = new Blob([planText], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'careersync-plan.txt';
        a.click();
        window.URL.revokeObjectURL(url);
        
        showToast('Career plan exported!', 'success');
        
    } catch (error) {
        console.error('❌ Error exporting:', error);
        showToast('Export failed', 'error');
    }
}

function updateDashboard() {
    try {
        const atsScore = appState.analysisResults?.atsScore || 0;
        const atsElement = document.getElementById('atsScore');
        if (atsElement) atsElement.textContent = atsScore || '--';

        // Update progress bars
        const resumeProgress = atsScore > 0 ? 85 : 0;
        const interviewProgress = appState.interviewSession.answers.length > 0 ? 70 : 0;
        const skillProgress = appState.careerPlan ? 60 : 0;

        const progressElements = {
            'resumeProgress': resumeProgress,
            'interviewProgress': interviewProgress,
            'skillProgress': skillProgress
        };

        Object.keys(progressElements).forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.style.width = progressElements[id] + '%';
            }
        });

        updateSkillsChart();
        
    } catch (error) {
        console.error('❌ Error updating dashboard:', error);
    }
}

function updateSkillsChart() {
    const ctx = document.getElementById('skillsChart');
    if (!ctx) return;

    try {
        if (appState.skillsChart) {
            appState.skillsChart.destroy();
        }

        const skills = appState.analysisResults?.extractedSkills || [];
        const allSkills = ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'Git'];
        const skillLevels = allSkills.map(skill => {
            return skills.includes(skill) 
                ? Math.floor(Math.random() * 30) + 70 
                : Math.floor(Math.random() * 40) + 10;
        });

        appState.skillsChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: allSkills,
                datasets: [{
                    label: 'Current Skill Level',
                    data: skillLevels,
                    backgroundColor: 'rgba(79, 70, 229, 0.2)',
                    borderColor: '#4f46e5',
                    borderWidth: 2,
                    pointBackgroundColor: '#4f46e5',
                    pointBorderColor: '#4f46e5',
                    pointRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: { stepSize: 20 }
                    }
                },
                plugins: { legend: { display: false } }
            }
        });
        
    } catch (error) {
        console.error('❌ Chart error:', error);
    }
}

// Utility Functions
function showLoading(message = 'Processing...') {
    const overlay = document.getElementById('loadingOverlay');
    const text = document.getElementById('loadingText');
    if (overlay) overlay.style.display = 'flex';
    if (text) text.textContent = message;
}

function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) overlay.style.display = 'none';
}

function showToast(message, type = 'info') {
    try {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `<p>${message}</p>`;
        
        const container = document.getElementById('toastContainer');
        if (container) {
            container.appendChild(toast);
            setTimeout(() => toast.remove(), 4000);
        }
    } catch (error) {
        console.error('Toast error:', error);
    }
}

function loadSavedData() {
    try {
        const savedAnalysis = localStorage.getItem('careersync_analysis');
        if (savedAnalysis) {
            appState.analysisResults = JSON.parse(savedAnalysis);
        }
    } catch (error) {
        console.error('Error loading saved data:', error);
    }
}

console.log('✅ CareerSync 2.0 - Fixed Version Loaded Successfully');