// State Management
const appState = {
    currentScreen: 'screen-splash',
    currentRole: 'Client',
    currentTab: 'home',
    yieldAmount: 0.47,
    rebateAmount: 0.24,
    escrowStatus: 'Funded',
    scoreValue: 847,
    demoPlaying: false,
    demoStep: 0
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    console.log('Conpay initialized');
    startYieldTicker();
});

// Navigation
function navigateTo(screenId) {
    const currentScreen = document.querySelector('.screen.active');
    const nextScreen = document.getElementById(screenId);
    
    if (currentScreen) {
        currentScreen.classList.remove('active');
    }
    
    if (nextScreen) {
        nextScreen.classList.add('active');
        appState.currentScreen = screenId;
        
        // Scroll to top
        const screenContent = nextScreen.querySelector('.screen-content');
        if (screenContent) {
            screenContent.scrollTop = 0;
        }
    }
}

// Tab Navigation
function switchTab(tabName) {
    // Update tab bar
    document.querySelectorAll('.tab-item').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`.tab-item[data-tab="${tabName}"]`)?.classList.add('active');
    
    appState.currentTab = tabName;
    
    // Navigate to appropriate screen
    const screenMap = {
        'home': 'screen-home',
        'escrows': 'screen-escrow-detail',
        'score': 'screen-score',
        'agents': 'screen-agents'
    };
    
    navigateTo(screenMap[tabName]);
}

// Role Switcher
function toggleRoleSwitch() {
    const modal = document.getElementById('role-switcher');
    modal.classList.toggle('active');
}

function switchRole(role) {
    appState.currentRole = role;
    document.getElementById('current-role').textContent = role;
    toggleRoleSwitch();
    
    // Update UI based on role
    updateUIForRole(role);
}

function updateUIForRole(role) {
    const btnCreatePledge = document.getElementById('btn-create-pledge');
    const btnRequestRelease = document.getElementById('btn-request-release');
    const btnDispute = document.getElementById('btn-dispute');
    const btnAcceptPledge = document.getElementById('btn-accept-pledge');
    
    // Show/hide buttons based on role
    if (role === 'Agency') {
        if (btnCreatePledge) btnCreatePledge.style.display = 'flex';
        if (btnRequestRelease) btnRequestRelease.style.display = 'block';
    } else if (role === 'Client') {
        if (btnDispute) btnDispute.style.display = 'block';
    } else if (role === 'Designer') {
        if (btnAcceptPledge) btnAcceptPledge.style.display = 'block';
    }
}

// Yield Ticker (Live Counting)
function startYieldTicker() {
    setInterval(() => {
        if (!appState.demoPlaying || appState.demoStep < 5) {
            appState.yieldAmount += 0.000023; // ~4.2% APY simulation
            appState.rebateAmount = appState.yieldAmount * 0.5;
            
            updateYieldDisplay();
        }
    }, 1000);
}

function updateYieldDisplay() {
    const yieldEl = document.getElementById('yield-amount');
    const rebateEl = document.getElementById('rebate-amount');
    const escrowYieldEl = document.getElementById('escrow-yield');
    const splitPayerEl = document.getElementById('split-payer');
    const splitInsuranceEl = document.getElementById('split-insurance');
    const splitProtocolEl = document.getElementById('split-protocol');
    
    if (yieldEl) yieldEl.textContent = appState.yieldAmount.toFixed(2);
    if (rebateEl) rebateEl.textContent = appState.rebateAmount.toFixed(2);
    if (escrowYieldEl) escrowYieldEl.textContent = appState.yieldAmount.toFixed(2) + ' USDC';
    
    if (splitPayerEl) splitPayerEl.textContent = appState.rebateAmount.toFixed(2) + ' USDC';
    if (splitInsuranceEl) splitInsuranceEl.textContent = (appState.yieldAmount * 0.3).toFixed(2) + ' USDC';
    if (splitProtocolEl) splitProtocolEl.textContent = (appState.yieldAmount * 0.2).toFixed(2) + ' USDC';
}

// Escrow Actions
function createEscrow() {
    navigateTo('screen-home');
    setTimeout(() => {
        showToast('Escrow funded: 10,000 USDC');
    }, 300);
}

function createPledge() {
    navigateTo('screen-escrow-detail');
    setTimeout(() => {
        showToast('Pledge created: 2,000 USDC to mayachen.eth');
    }, 300);
}

function acceptPledge() {
    // Show CYT badge animation
    const preview = document.getElementById('cyt-preview');
    if (preview) {
        preview.innerHTML = '<div class="cyt-badge animate-in">CYT Claim Badge Minted</div>';
    }
    
    setTimeout(() => {
        navigateTo('screen-escrow-detail');
        showToast('Pledge accepted · CYT badge minted');
    }, 1500);
}

function requestRelease() {
    appState.escrowStatus = 'ReleaseRequested';
    updateEscrowStatus();
    
    setTimeout(() => {
        navigateTo('screen-escrow-detail');
        showToast('Release requested · 7 day review period started');
    }, 300);
}

function fileDispute() {
    appState.escrowStatus = 'Disputed';
    updateEscrowStatus();
    
    setTimeout(() => {
        navigateTo('screen-arbiter');
    }, 300);
}

function issueRuling() {
    appState.escrowStatus = 'Settled';
    updateEscrowStatus();
    
    setTimeout(() => {
        navigateTo('screen-waterfall');
        animateWaterfall();
    }, 300);
}

function updateEscrowStatus() {
    const statusEl = document.getElementById('escrow-status');
    if (statusEl) {
        statusEl.textContent = appState.escrowStatus;
        statusEl.className = 'status-pill';
        
        if (appState.escrowStatus === 'Funded') {
            statusEl.classList.add('status-funded');
        } else if (appState.escrowStatus === 'Disputed') {
            statusEl.classList.add('status-disputed');
        } else if (appState.escrowStatus === 'Settled') {
            statusEl.classList.add('status-accepted');
        }
    }
    
    // Update state timeline
    const stateNodeRelease = document.getElementById('state-node-release');
    if (stateNodeRelease && appState.escrowStatus === 'Disputed') {
        stateNodeRelease.textContent = 'Disputed';
        stateNodeRelease.classList.add('active');
    }
}

// Waterfall Animation
function animateWaterfall() {
    setTimeout(() => {
        const pledgee = document.getElementById('waterfall-pledgee');
        const insurance = document.getElementById('waterfall-insurance');
        const residual = document.getElementById('waterfall-residual');
        
        if (pledgee) {
            pledgee.style.width = '40%';
            pledgee.querySelector('.waterfall-amount').textContent = '2,000';
        }
        
        setTimeout(() => {
            if (insurance) {
                insurance.style.width = '0%';
                insurance.querySelector('.waterfall-amount').textContent = '0';
            }
        }, 600);
        
        setTimeout(() => {
            if (residual) {
                residual.style.width = '60%';
                residual.querySelector('.waterfall-amount').textContent = '3,000';
            }
        }, 1200);
    }, 500);
}

// Agent Tree Settlement Animation
function animateTreeSettle() {
    const specialist = document.getElementById('tree-specialist');
    const specialistStatus = document.getElementById('tree-specialist-status');
    const orchestrator = document.getElementById('tree-orchestrator');
    const orchestratorStatus = document.getElementById('tree-orchestrator-status');
    const human = document.getElementById('tree-human');
    const humanStatus = document.getElementById('tree-human-status');
    
    // Specialist settles first
    setTimeout(() => {
        if (specialist) specialist.classList.add('active');
        if (specialistStatus) specialistStatus.textContent = '✓';
    }, 800);
    
    // Then orchestrator
    setTimeout(() => {
        if (orchestrator) orchestrator.classList.add('active');
        if (orchestratorStatus) orchestratorStatus.textContent = '✓';
    }, 1600);
    
    // Finally human scores update
    setTimeout(() => {
        if (human) human.classList.add('active');
        if (humanStatus) humanStatus.textContent = '✓';
    }, 2400);
    
    // Navigate to MCP trust screen
    setTimeout(() => {
        navigateTo('screen-mcp-trust');
    }, 3600);
}

// Score Impact
function updateScoreAfterDispute() {
    appState.scoreValue = 821; // Client's score drops after PayerFault
    
    const scoreEl = document.getElementById('score-main');
    const changeEl = document.getElementById('score-change');
    const tierFillEl = document.getElementById('tier-fill');
    
    if (scoreEl) {
        animateNumber(scoreEl, 847, 821, 1000);
    }
    
    if (changeEl) {
        changeEl.textContent = '-26';
        changeEl.classList.add('negative');
    }
    
    if (tierFillEl) {
        tierFillEl.style.width = '71%';
    }
    
    // Add activity item
    const activityList = document.getElementById('activity-list');
    if (activityList) {
        const newItem = document.createElement('div');
        newItem.className = 'activity-item animate-in';
        newItem.innerHTML = `
            <div class="activity-icon disputed">!</div>
            <div class="activity-content">
                <div class="activity-title">Dispute settled (PayerFault)</div>
                <div class="activity-desc">northline.eth · 10,000 USDC</div>
            </div>
            <div class="activity-score negative">-26</div>
        `;
        activityList.insertBefore(newItem, activityList.firstChild);
    }
}

// Number Animation Helper
function animateNumber(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            element.textContent = Math.round(end);
            clearInterval(timer);
        } else {
            element.textContent = Math.round(current);
        }
    }, 16);
}

// Toast Notification
function showToast(message) {
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--bg-elevated);
        border: 1px solid var(--border);
        color: var(--text-primary);
        padding: 12px 20px;
        border-radius: 12px;
        font-size: 14px;
        font-weight: 600;
        z-index: 2000;
        animation: slideInUp 0.3s ease;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

// Demo Autoplay
function startDemo() {
    appState.demoPlaying = true;
    appState.demoStep = 0;
    runDemoStep();
}

function runDemoStep() {
    if (!appState.demoPlaying) return;
    
    const steps = [
        // Act 1: Human Escrow Flow
        { delay: 1000, action: () => navigateTo('screen-world-id') },
        { delay: 2000, action: () => navigateTo('screen-home') },
        { delay: 3000, action: () => showToast('Escrow funded: 10,000 USDC') },
        { delay: 2000, action: () => navigateTo('screen-escrow-detail') },
        { delay: 3000, action: () => navigateTo('screen-create-pledge') },
        { delay: 2500, action: () => {
            navigateTo('screen-pledge-detail');
            switchRole('Designer');
        }},
        { delay: 3000, action: () => {
            const preview = document.getElementById('cyt-preview');
            if (preview) {
                preview.innerHTML = '<div class="cyt-badge animate-in">CYT Claim Badge Minted</div>';
            }
        }},
        { delay: 2000, action: () => {
            navigateTo('screen-escrow-detail');
            switchRole('Client');
        }},
        { delay: 2500, action: () => navigateTo('screen-dispute') },
        { delay: 3000, action: () => {
            fileDispute();
            switchRole('Arbiter');
        }},
        { delay: 3500, action: () => issueRuling() },
        { delay: 2000, action: () => animateWaterfall() },
        { delay: 4000, action: () => {
            navigateTo('screen-score');
            switchRole('Client');
            updateScoreAfterDispute();
        }},
        { delay: 4000, action: () => switchTab('agents') },
        
        // Act 2: Agent Economy
        { delay: 2500, action: () => navigateTo('screen-agent-job') },
        { delay: 3500, action: () => navigateTo('screen-agent-settle') },
        { delay: 2500, action: () => animateTreeSettle() },
        { delay: 5000, action: () => {
            appState.demoPlaying = false;
            showToast('Demo complete! Tap to explore.');
        }}
    ];
    
    if (appState.demoStep < steps.length) {
        const step = steps[appState.demoStep];
        setTimeout(() => {
            step.action();
            appState.demoStep++;
            runDemoStep();
        }, step.delay);
    }
}

// Close modal on background click
document.getElementById('role-switcher')?.addEventListener('click', (e) => {
    if (e.target.id === 'role-switcher') {
        toggleRoleSwitch();
    }
});

// Keyboard shortcuts for demo
document.addEventListener('keydown', (e) => {
    if (e.key === 'p' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (!appState.demoPlaying) {
            startDemo();
        }
    }
    
    // Escape to stop demo
    if (e.key === 'Escape' && appState.demoPlaying) {
        appState.demoPlaying = false;
        showToast('Demo stopped');
    }
});
