// Function to show the selected section and hide others
function showSection(sectionId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
}

// Functions to show each specific section
function showDashboard() {
    showSection('dashboard');
}

function showNewSession() {
    showSection('newSession');
}

function showStudyPlan() {
    showSection('studyPlan');
}

function showUpcomingSessions() {
    showSection('upcomingSessions');
}

// Dummy function for saving a session
function saveSession() {
    alert("Session saved!");
    showDashboard();
}

// Dummy function for saving a study plan
function saveStudyPlan() {
    alert("Study plan saved!");
    showDashboard();
}

// Initialize with the dashboard
document.addEventListener("DOMContentLoaded", showDashboard);
