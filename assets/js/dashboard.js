// Mock Dashboard Data - Based on Login Email
function loadDashboardData(userEmail) {
    // Mock users mapped to email addresses
    const mockUsers = {
        "sarah@gmail.com": {
            userName: "Sarah Johnson",
            referralCode: "SARAH2025",
            amountRaised: 25750
        },
        "michael@gmail.com": {
            userName: "Michael Chen",
            referralCode: "MICHAEL2025", 
            amountRaised: 42300
        },
        "emily@gmail.com": {
            userName: "Emily Rodriguez",
            referralCode: "EMILY2025",
            amountRaised: 8900
        },
        "james@gmail.com": {
            userName: "James Thompson", 
            referralCode: "JAMES2025",
            amountRaised: 51200
        },
        "aisha@gmail.com": {
            userName: "Aisha Patel",
            referralCode: "AISHA2025", 
            amountRaised: 18450
        },
        "david@gmail.com": {
            userName: "David Kim",
            referralCode: "DAVID2025",
            amountRaised: 33680
        },
        "lisa@gmail.com": {
            userName: "Lisa Martinez",
            referralCode: "LISA2025",
            amountRaised: 12150
        },
        "ryan@gmail.com": {
            userName: "Ryan O'Connor",
            referralCode: "RYAN2025",
            amountRaised: 39740
        },
        "maya@gmail.com": {
            userName: "Maya Gupta",
            referralCode: "MAYA2025",
            amountRaised: 6800
        },
        "alex@gmail.com": {
            userName: "Alex Turner",
            referralCode: "ALEX2025",
            amountRaised: 47920
        }
    };
    
    // Get user data based on email, or create default for unknown emails
    let userData = mockUsers[userEmail.toLowerCase()];
    
    if (!userData) {
        // Create default user for unknown emails
        const emailName = userEmail.split('@')[0];
        const cleanName = emailName.charAt(0).toUpperCase() + emailName.slice(1);
        userData = {
            userName: cleanName,
            referralCode: emailName.toUpperCase().substring(0, 8) + "2025",
            amountRaised: Math.floor(Math.random() * 30000) + 5000 // Random amount between $5K-$35K
        };
    }
    
    // Update dashboard elements
    document.getElementById('dashboardUserName').textContent = userData.userName;
    document.getElementById('internName').textContent = userData.userName;
    document.getElementById('referralCode').textContent = userData.referralCode;
    document.getElementById('amountRaised').textContent = userData.amountRaised.toLocaleString();

    // Update progress bar based on amountRaised
    const totalDonations = userData.amountRaised;
    const progressPercentage = Math.min((totalDonations / 50000) * 100, 100);
    document.getElementById('donationProgress').style.width = progressPercentage + '%';

    // Update rewards based on donation amount
    updateRewards(totalDonations);
    
    console.log('Dashboard loaded for:', userEmail, 'Data:', userData);
}

function updateRewards(totalDonations) {
    const rewards = [
        { id: 'reward1000', threshold: 1000 },
        { id: 'reward5000', threshold: 5000 },
        { id: 'reward10000', threshold: 10000 },
        { id: 'reward25000', threshold: 25000 },
        { id: 'reward50000', threshold: 50000 }
    ];

    rewards.forEach(reward => {
        const element = document.getElementById(reward.id);
        if (element) {
            if (totalDonations >= reward.threshold) {
                element.classList.remove('locked');
                element.classList.add('unlocked');
            } else {
                element.classList.remove('unlocked');
                element.classList.add('locked');
            }
        }
    });
}

// Updated showDashboard function
function showDashboard(userEmail) {
    document.getElementById('authPage').style.display = 'none';
    document.getElementById('dashboardPage').style.display = 'block';
    
    // Load data based on user email
    loadDashboardData(userEmail);
}

// Auth form submission
document.getElementById('authForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (email && password) {
        showDashboard(email); // Pass email to get specific user data
    } else {
        alert('Please fill in all fields');
    }
});

// Login/Signup toggle
let isLoginMode = true;
document.getElementById('authSwitch').addEventListener('click', function() {
    isLoginMode = !isLoginMode;
    
    if (isLoginMode) {
        document.getElementById('authTitle').textContent = 'Login';
        document.getElementById('authBtn').textContent = 'Login';
        document.getElementById('authSwitchText').textContent = "Don't have an account?";
        document.getElementById('authSwitch').textContent = 'Sign up';
        document.getElementById('nameGroup').style.display = 'none';
    } else {
        document.getElementById('authTitle').textContent = 'Sign Up';
        document.getElementById('authBtn').textContent = 'Sign Up';
        document.getElementById('authSwitchText').textContent = 'Already have an account?';
        document.getElementById('authSwitch').textContent = 'Login';
        document.getElementById('nameGroup').style.display = 'block';
    }
});

// Logout function
function logout() {
    console.log('User logged out');
    document.getElementById('dashboardPage').style.display = 'none';
    document.getElementById('authPage').style.display = 'flex';
    
    // Reset form
    document.getElementById('authForm').reset();
    
    // Reset to login mode
    isLoginMode = true;
    document.getElementById('authTitle').textContent = 'Login';
    document.getElementById('authBtn').textContent = 'Login';
    document.getElementById('authSwitchText').textContent = "Don't have an account?";
    document.getElementById('authSwitch').textContent = 'Sign up';
    document.getElementById('nameGroup').style.display = 'none';
}