document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const cursorGlow = document.getElementById('cursor-glow');
    const toggleModeButton = document.getElementById('toggle-mode');
    const heroTerminalBtn = document.getElementById('hero-terminal-btn');
    const termCloseBtn = document.getElementById('term-close-btn');
    const guiMode = document.getElementById('gui-mode');
    const terminal = document.getElementById('terminal');
    const input = document.getElementById('input');
    const output = document.getElementById('output');
    const termBody = document.getElementById('term-body');
    const timeElement = document.getElementById('time');
    const loadAvgElement = document.getElementById('load-avg');
    const uptimeElement = document.getElementById('diag-uptime');
    const themeBtn = document.getElementById('theme-btn');
    const guiBackBtn = document.getElementById('gui-back-btn');
    
    // Mini diagnostic console
    const miniInput = document.getElementById('mini-input');

    // Dynamic Time
    const startTime = Date.now();
    function updateStatusBar() {
        const now = new Date();
        timeElement.innerHTML = `<i class="fa-regular fa-clock"></i> ${now.toLocaleString()}`;
        
        // Calculate Uptime
        const diffMs = Date.now() - startTime;
        const diffSecs = Math.floor(diffMs / 1000);
        const mins = Math.floor(diffSecs / 60);
        const secs = diffSecs % 60;
        
        const uptimeStr = `${mins}m ${secs}s`;
        if (uptimeElement) {
            uptimeElement.textContent = uptimeStr;
        }
        if (loadAvgElement) {
            loadAvgElement.innerHTML = `<i class="fa-solid fa-microchip"></i> Uptime: ${uptimeStr} | CPU Load: 0.02`;
        }
    }
    updateStatusBar();
    setInterval(updateStatusBar, 1000);

    // Mouse Glow Effect in GUI Mode
    document.addEventListener('mousemove', (e) => {
        if (!guiMode.classList.contains('hidden') && cursorGlow) {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        }
    });

    // Scroll Reveal Intersection Observer
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    reveals.forEach(r => revealObserver.observe(r));

    // Skills Tab Switcher
    const skillsTabList = document.getElementById('skills-tab-list');
    if (skillsTabList) {
        skillsTabList.addEventListener('click', (e) => {
            const btn = e.target.closest('.skills-tab-btn');
            if (!btn) return;
            
            // Deactivate other tabs
            document.querySelectorAll('.skills-tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.skills-pane').forEach(p => p.classList.remove('active'));
            
            // Activate current tab
            btn.classList.add('active');
            const tabName = btn.getAttribute('data-tab');
            const pane = document.getElementById(`pane-${tabName}`);
            if (pane) {
                pane.classList.add('active');
            }
        });
    }

    // Mode toggling (GUI vs Fullscreen Terminal)
    function showTerminal() {
        guiMode.classList.add('hidden');
        document.getElementById('global-nav').classList.add('hidden');
        terminal.classList.remove('hidden');
        input.focus();
        // Print welcome text on first open
        if (output.innerHTML === '') {
            printWelcome();
        }
    }

    function showGui() {
        terminal.classList.add('hidden');
        guiMode.classList.remove('hidden');
        document.getElementById('global-nav').classList.remove('hidden');
        stopMatrix();
    }

    toggleModeButton.addEventListener('click', () => {
        if (terminal.classList.contains('hidden')) {
            showTerminal();
            toggleModeButton.innerHTML = '<i class="fa-solid fa-desktop"></i> GUI Mode';
        } else {
            showGui();
            toggleModeButton.innerHTML = '<i class="fa-solid fa-terminal"></i> Terminal Mode';
        }
    });

    if (heroTerminalBtn) {
        heroTerminalBtn.addEventListener('click', () => {
            showTerminal();
            toggleModeButton.innerHTML = '<i class="fa-solid fa-desktop"></i> GUI Mode';
        });
    }

    if (termCloseBtn) {
        termCloseBtn.addEventListener('click', () => {
            showGui();
            toggleModeButton.innerHTML = '<i class="fa-solid fa-terminal"></i> Terminal Mode';
        });
    }

    if (guiBackBtn) {
        guiBackBtn.addEventListener('click', () => {
            showGui();
            toggleModeButton.innerHTML = '<i class="fa-solid fa-terminal"></i> Terminal Mode';
        });
    }

    // Resume Data
    const resume = {
        name: "Shafian Khan",
        location: "Hyderabad, India",
        email: "mshafianak@gmail.com",
        linkedin: "linkedin.com/in/shafian",
        github: "github.com/shafiankhan",
        summary: "Creator of FluxGit, 4-time national hackathon victor, and Google Student Ambassador. Experienced in Rust system design, cloud-native container orchestration, and multi-provider LLM runtime orchestration.",
        skills: {
            languages: "Rust, Go, Java, Python, C, JavaScript, TypeScript, SQL",
            devops: "Docker, Kubernetes, Jenkins, GitHub Actions, GitLab CI/CD, Ansible, Terraform, AWS, Azure, GCP",
            frameworks: "SvelteKit 5, React.js, Next.js, Node.js, Tauri, HTML5, Tailwind CSS, RESTful APIs",
            tools: "libgit2, PostgreSQL, MySQL, MongoDB, Firestore, IPFS"
        },
        projects: [
            {
                name: "FluxGit",
                tech: "Tauri, Rust, SvelteKit 5, Multi-Provider LLMs, GitHub Actions",
                details: [
                    "Core Architecture: Architected & published an open-source, cross-platform desktop Git client featuring an abstract multi-provider AI engine published at the Conference on Software Engineering and AI Tools, 2026.",
                    "Systems Engineering: Programmed a native desktop shell using Rust and libgit2 bindings, dropping tree parsing latencies under 50ms while maintaining an idle memory footprint of 142MB.",
                    "AI Abstraction: Designed a decoupled runtime orchestrating remote cloud models (Gemini) and local privacy-preserving model environments via local inference engines (Ollama/LMStudio).",
                    "DevOps Pipeline: Engineered automated GitHub Actions release chains to cross-compile and cryptographically sign platform-specific installers (MSI, NSIS, DMG, AppImage)."
                ]
            },
            {
                name: "RepoSage",
                tech: "Next.js 14, DevOps, Gemini AI, Docker, Kubernetes, AWS",
                details: [
                    "Architecture & Deployment: Engineered an enterprise repository analyzer; containerized microservices via Docker and orchestrated zero-downtime blue-green deployments on Kubernetes clusters.",
                    "CI/CD Automation: Configured automated code-evaluation loops that optimized evaluation cycles by 35% using a secure GitHub Actions pipeline targeting production AWS EC2 clusters."
                ]
            },
            {
                name: "Loan Repayment ML Platform",
                tech: "Python, Streamlit, Gemini AI, Terraform, IaC",
                details: [
                    "Fintech Analytics: Developed an algorithmic optimization toolkit visualizing repayment strategies via KNN models, abstracting underlying cloud configurations with Terraform IaC layers."
                ]
            },
            {
                name: "HelpChain & D-Host",
                tech: "Web3, IPFS, Blockchain, Smart Contracts",
                details: [
                    "Decentralized Systems: Constructed a Web3 crowdfunding app and automated web hosting layer using IPFS architectures, cutting centralized storage dependencies."
                ]
            }
        ],
        leadership: [
            {
                role: "Google Student Ambassador",
                org: "Google Student Developer Club Campus Lead",
                date: "2024 - 2026",
                desc: [
                    "Selected to attend Google I/O 2026 in Mountain View, CA, as a top-performing ambassador.",
                    "Spearheaded technology initiatives, training programs, and developer tracks for AI frameworks."
                ]
            },
            {
                role: "Campus Coding Club Head",
                org: "National Hackathon Lead",
                date: "2024 - 2026",
                desc: [
                    "Won 4 major national hackathons as Competitive Team Leader.",
                    "Directed 10+ campus-wide hackathons and workshops, managing evaluation for 500+ student developers."
                ]
            }
        ],
        internships: [
            { title: "AWS Generative AI Virtual Internship", org: "AWS Generative AI Infrastructure", date: "Oct – Dec 2025" },
            { title: "AWS Cloud Virtual Internship", org: "AWS Cloud Infrastructure", date: "Oct – Dec 2024" },
            { title: "Google AI-ML Virtual Internship", org: "Google Core ML Pipelines", date: "Apr – Jun 2024" }
        ],
        certifications: [
            "AWS Certified Solutions Architect",
            "Certified Kubernetes Administrator (CKA)",
            "Docker Certified Associate",
            "Microsoft Certified: Azure Fundamentals",
            "Google Cloud Facilitator (2024-25)"
        ]
    };

    // Virtual Filesystem
    const filesystem = {
        'resume.txt': `
SHAFIAN KHAN
================================================================================
Contact: ${resume.email} | ${resume.linkedin} | ${resume.github}
Location: ${resume.location}
College:  ISL Engineering College

Summary:
--------
${resume.summary}

Education:
----------
Bachelor of Engineering in Artificial Intelligence and Data Science (Graduation: 2026)

Technical Skills:
-----------------
Languages:      ${resume.skills.languages}
DevOps/Cloud:   ${resume.skills.devops}
Frameworks:     ${resume.skills.frameworks}
Databases/Tools: ${resume.skills.tools}

Certifications:
---------------
${resume.certifications.map(c => `- ${c}`).join('\n')}
`,
        'skills.txt': `
TECHNICAL STACK
================================================================================
Languages:
  - Rust, Go, Java, Python, C, JavaScript, TypeScript, SQL
DevOps & Cloud:
  - Docker, Kubernetes, Jenkins, GitHub Actions, GitLab CI/CD, Ansible, Terraform, AWS, Azure, GCP
Web Frameworks:
  - SvelteKit 5, React.js, Next.js, Node.js, Tauri, HTML5, Tailwind CSS, RESTful APIs
Databases & Tools:
  - libgit2, PostgreSQL, MySQL, MongoDB, Firestore, IPFS
`,
        'projects': {
            type: 'directory',
            content: {
                'fluxgit.txt': `
FluxGit | Tauri, Rust, SvelteKit 5, Multi-Provider LLMs
--------------------------------------------------------------------------------
${resume.projects[0].details.join('\n')}`,
                'reposage.txt': `
RepoSage | Next.js 14, Kubernetes, AWS, Gemini AI
--------------------------------------------------------------------------------
${resume.projects[1].details.join('\n')}`,
                'loan_repayment.txt': `
Loan Repayment ML Platform | Python, Streamlit, Terraform IaC
--------------------------------------------------------------------------------
${resume.projects[2].details.join('\n')}`,
                'helpchain_dhost.txt': `
HelpChain & D-Host | Web3, IPFS, Blockchain Smart Contracts
--------------------------------------------------------------------------------
${resume.projects[3].details.join('\n')}`
            }
        },
        'honors.txt': `
HONORS & LEADERSHIP
================================================================================
${resume.leadership.map(l => `
* ${l.role} (${l.date})
  Organization: ${l.org}
  ${l.desc.map(d => `  ◦ ${d}`).join('\n')}`).join('\n')}

VIRTUAL INTERNSHIPS:
--------------------
${resume.internships.map(i => `* ${i.title} (${i.date}) - ${i.org}`).join('\n')}
`,
        'certifications.txt': `
VERIFIED CERTIFICATIONS
================================================================================
${resume.certifications.map(c => `[✓] ${c}`).join('\n')}
`,
        'contact.sh': 'This is an executable network shell script. Run it with: ./contact.sh'
    };

    // Terminal History and Completion state
    let commandHistory = [];
    let historyIndex = -1;
    let currentDir = filesystem;
    let currentPath = '~';

    const commandsList = ['help', 'ls', 'cat', 'cd', 'clear', 'theme', 'matrix', './contact.sh', 'sudo hire me'];

    function print(message, className = '') {
        const div = document.createElement('div');
        div.className = className;
        div.innerHTML = message;
        output.appendChild(div);
        termBody.scrollTop = termBody.scrollHeight;
    }

    function printWelcome() {
        print(`
<span style="color: var(--primary); font-weight: 700; font-size: 1.15rem;">SHAF.IO Terminal Interface v2.4.0</span>
================================================================================
Welcome to Shafian Khan's system console.
Type <span class="executable" data-cmd="help">'help'</span> or <span class="executable" data-cmd="ls">'ls'</span> to list files.
Type <span class="executable" data-cmd="matrix">'matrix'</span> for a screensaver overlay.
Clickable listings are active elements.
        `, 'welcome-message');
    }

    // Help command clickable builder
    function buildHelp() {
        return `
Available commands:
  <span class="executable" data-cmd="ls">ls</span>              → Lists files and sub-folders
  <span class="executable" data-cmd="cat resume.txt">cat &lt;file&gt;</span>      → Prints the contents of a file (e.g. cat resume.txt)
  <span class="executable" data-cmd="cd projects">cd &lt;dir&gt;</span>       → Navigates to a folder directory (e.g. cd projects)
  <span class="executable" data-cmd="./contact.sh">./contact.sh</span>   → Executes secure communication script
  <span class="executable" data-cmd="theme dracula">theme &lt;name&gt;</span>   → Changes terminal skins (default, dracula, monokai, nord)
  <span class="executable" data-cmd="matrix">matrix</span>         → Initiates Matrix digital rain easter egg (ESC to exit)
  <span class="executable" data-cmd="clear">clear</span>          → Resets the console screen
  <span class="executable" data-cmd="sudo hire me">sudo hire me</span>   → Requests cryptographic clearance access keys
        `;
    }

    function executeCommand(command) {
        command = command.trim();
        if (!command) return;

        // Push to history
        commandHistory.push(command);
        historyIndex = commandHistory.length;

        // Echo prompt
        print(`<span style="color: var(--primary);">visitor@shafian-khan:${currentPath}$</span> <span style="color: var(--text);">${command}</span>`);

        const parts = command.split(' ');
        const cmd = parts[0].toLowerCase();
        const args = parts.slice(1);

        switch (cmd) {
            case 'help':
            case '?':
                print(buildHelp());
                break;
            case 'ls':
            case 'dir':
                listDirectory();
                break;
            case 'cd':
                changeDirectory(args[0]);
                break;
            case 'cat':
            case 'type':
                catFile(args[0]);
                break;
            case 'clear':
            case 'cls':
                output.innerHTML = '';
                break;
            case './contact.sh':
                print('Connecting to secure SMTP protocol...');
                setTimeout(() => {
                    window.open(`mailto:${resume.email}`);
                    window.open(`https://${resume.linkedin}`, '_blank');
                    print('Connection completed. Opened mail and LinkedIn profiles in background.', 'success-text');
                }, 1000);
                break;
            case 'sudo':
                if (args[0] === 'hire' && args[1] === 'me') {
                    print('Access granted. Generating hiring cryptographic credentials...', 'success-text');
                    print('Connecting you directly...', 'success-text');
                    setTimeout(() => {
                        window.open(`mailto:${resume.email}?subject=Hiring%20Shafian%20Khan`);
                    }, 1000);
                } else {
                    print(`sudo: ${args.join(' ')}: permission denied. Nice try!`, 'error-text');
                }
                break;
            case 'theme':
                const themeName = args[0] ? args[0].toLowerCase() : '';
                const validThemes = ['default', 'dracula', 'monokai', 'nord'];
                if (validThemes.includes(themeName)) {
                    // Reset themes classes
                    document.body.className = 'scanlines';
                    validThemes.forEach(t => terminal.classList.remove(`theme-${t}`));
                    
                    terminal.classList.add(`theme-${themeName}`);
                    themeBtn.textContent = `theme: ${themeName}`;
                    print(`Theme switched to '${themeName}' successfully.`, 'success-text');
                } else {
                    print(`Unknown theme. Valid options: ${validThemes.join(', ')}`);
                }
                break;
            case 'matrix':
                startMatrix();
                break;
            default:
                print(`bash: command not found: ${cmd}. Try typing <span class="executable" data-cmd="help">'help'</span> for reference.`, 'error-text');
        }
        termBody.scrollTop = termBody.scrollHeight;
    }

    // Directory list logic
    function listDirectory() {
        const items = Object.keys(currentDir);
        if (items.length === 0) {
            print('(empty)');
            return;
        }

        let outputStr = '';
        items.forEach(item => {
            const val = currentDir[item];
            if (val && val.type === 'directory') {
                outputStr += `<span class="directory" data-cmd="cd ${item}">${item}/</span>   `;
            } else if (item.endsWith('.sh')) {
                outputStr += `<span class="executable" data-cmd="./${item}">${item}*</span>   `;
            } else {
                outputStr += `<span class="file" data-cmd="cat ${item}">${item}</span>   `;
            }
        });
        print(outputStr);
    }

    // Change directories virtual shell logic
    function changeDirectory(dest) {
        if (!dest || dest === '~') {
            currentDir = filesystem;
            currentPath = '~';
            return;
        }

        if (dest === '..') {
            if (currentPath === '~') {
                print('Already in root directory.');
            } else {
                currentDir = filesystem;
                currentPath = '~';
            }
            return;
        }

        const cleanDest = dest.replace('/', '');
        const target = currentDir[cleanDest];
        if (target && target.type === 'directory') {
            currentDir = target.content;
            currentPath = `~/` + cleanDest;
        } else {
            print(`cd: no such file or directory: ${dest}`, 'error-text');
        }
    }

    // Cat file virtual command logic
    function catFile(filename) {
        if (!filename) {
            print('cat: missing operand.');
            return;
        }

        const target = currentDir[filename];
        if (target) {
            if (target.type === 'directory') {
                print(`cat: ${filename}: Is a directory`, 'error-text');
            } else {
                // Print character-by-character style or pre-wrapped
                print(`<pre style="font-family: inherit; font-size: inherit; color: inherit; white-space: pre-wrap;">${target}</pre>`);
            }
        } else {
            print(`cat: ${filename}: No such file or directory`, 'error-text');
        }
    }

    // Theme select pill button cycling click listener
    if (themeBtn) {
        const themeCycle = ['default', 'dracula', 'monokai', 'nord'];
        let currentCycleIdx = 0;
        themeBtn.addEventListener('click', () => {
            currentCycleIdx = (currentCycleIdx + 1) % themeCycle.length;
            const nextTheme = themeCycle[currentCycleIdx];
            executeCommand(`theme ${nextTheme}`);
        });
    }

    // Inline mini diagnostic prompt execute trigger
    if (miniInput) {
        miniInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const cmd = miniInput.value.trim();
                miniInput.value = '';
                if (!cmd) return;

                if (cmd.toLowerCase() === 'matrix') {
                    showTerminal();
                    executeCommand('matrix');
                } else if (cmd.toLowerCase() === 'help' || cmd.toLowerCase() === 'ls') {
                    showTerminal();
                    executeCommand(cmd);
                } else {
                    // Open terminal and run it
                    showTerminal();
                    executeCommand(cmd);
                }
            }
        });
    }

    // Main Terminal Keyboard Handler (Commands history, tabs completion)
    if (input) {
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const cmd = input.value;
                input.value = '';
                executeCommand(cmd);
            } 
            else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (commandHistory.length > 0 && historyIndex > 0) {
                    historyIndex--;
                    input.value = commandHistory[historyIndex];
                }
            } 
            else if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (historyIndex < commandHistory.length - 1) {
                    historyIndex++;
                    input.value = commandHistory[historyIndex];
                } else {
                    historyIndex = commandHistory.length;
                    input.value = '';
                }
            }
            else if (e.key === 'Tab') {
                // Autocomplete suggestion
                e.preventDefault();
                const text = input.value.trim();
                if (!text) return;
                
                const splitText = text.split(' ');
                const baseCmd = splitText[0];
                const arg = splitText[1] || '';

                if (splitText.length === 1) {
                    // Match commands
                    const matches = commandsList.filter(c => c.startsWith(baseCmd));
                    if (matches.length === 1) {
                        input.value = matches[0];
                    } else if (matches.length > 1) {
                        print(matches.join('   '), 'sys-completion');
                    }
                } else if (splitText.length === 2 && (baseCmd === 'cat' || baseCmd === 'cd')) {
                    // Match files or dirs in current directory
                    const items = Object.keys(currentDir);
                    const matches = items.filter(i => i.startsWith(arg));
                    if (matches.length === 1) {
                        input.value = `${baseCmd} ${matches[0]}`;
                    } else if (matches.length > 1) {
                        print(matches.join('   '), 'sys-completion');
                    }
                }
            }
        });
    }

    // Capture clickable command links inside outputs
    document.addEventListener('click', (e) => {
        const item = e.target.closest('[data-cmd]');
        if (item) {
            const cmd = item.getAttribute('data-cmd');
            if (cmd) {
                // Focus terminal and run command
                if (terminal.classList.contains('hidden')) {
                    showTerminal();
                }
                executeCommand(cmd);
            }
        }
    });

    // Make clicking the body of the terminal focus input
    if (termBody) {
        termBody.addEventListener('click', (e) => {
            if (e.target === termBody || e.target === output) {
                input.focus();
            }
        });
    }


    /* MATRIX DIGITAL RAIN EASTER EGG */
    const canvas = document.getElementById('matrix-canvas');
    let ctx = null;
    let matrixInterval = null;
    let drops = [];
    const fontSize = 14;

    function startMatrix() {
        canvas.classList.remove('hidden');
        input.setAttribute('disabled', 'true');
        ctx = canvas.getContext('2d');
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const cols = Math.floor(canvas.width / fontSize);
        drops = [];
        for (let i = 0; i < cols; i++) {
            drops[i] = Math.random() * -100; // staggered drop heights
        }

        // Cycle rendering loop
        matrixInterval = setInterval(drawMatrix, 33);
        print('Screen saver matrix initialized. Press [ESC] or type exit key to abort.', 'success-text');
    }

    function drawMatrix() {
        // Theme dependent colors
        let rainColor = '#00f5d4'; // Cyan default
        let bgColor = 'rgba(0, 0, 0, 0.08)';

        if (terminal.classList.contains('theme-dracula')) {
            rainColor = '#ff79c6'; // Pink
        } else if (terminal.classList.contains('theme-monokai')) {
            rainColor = '#a6e22e'; // Monokai green
        } else if (terminal.classList.contains('theme-nord')) {
            rainColor = '#88c0d0'; // Frost blue
        } else {
            rainColor = '#10b981'; // Default green
        }

        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = rainColor;
        ctx.font = fontSize + 'px monospace';

        // Katakana character map and latin alphabets
        const chars = "ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        for (let i = 0; i < drops.length; i++) {
            const char = chars.charAt(Math.floor(Math.random() * chars.length));
            const x = i * fontSize;
            const y = drops[i] * fontSize;

            ctx.fillText(char, x, y);

            if (y > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    function resizeCanvas() {
        if (canvas) {
            canvas.width = termBody.clientWidth;
            canvas.height = termBody.clientHeight;
        }
    }

    function stopMatrix() {
        if (matrixInterval) {
            clearInterval(matrixInterval);
            matrixInterval = null;
            window.removeEventListener('resize', resizeCanvas);
            canvas.classList.add('hidden');
            input.removeAttribute('disabled');
            input.focus();
            print('Console active.', 'success-text');
        }
    }

    // Capture ESC key to escape the matrix screensaver
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && matrixInterval) {
            stopMatrix();
        }
    });

    // Special command processor exit logic inside matrix
    input.addEventListener('keydown', (e) => {
        if (matrixInterval && e.key === 'Enter') {
            const val = input.value.trim().toLowerCase();
            if (val === 'exit' || val === 'quit') {
                input.value = '';
                stopMatrix();
            }
        }
    });
});
