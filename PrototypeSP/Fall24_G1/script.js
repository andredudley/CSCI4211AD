let studyBlocks = [];

// Function to show a specific page and hide others
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.add('hidden'); // Hide all pages
    });
    document.getElementById(pageId).classList.remove('hidden'); // Show the selected page
}

// Redirect to the Main Menu from Landing Page
document.getElementById('start-planning').addEventListener('click', () => {
    showPage('main-menu');
});

// Navigate to Study Plan Creator
document.getElementById('create-plan')?.addEventListener('click', () => {
    showPage('plan-creator');
});

// Handle Plan Title Creation
document.getElementById('plan-title-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const planTitle = document.getElementById("plan-title").value;
    studyBlocks.push({ title: planTitle, classes: [] });
    showPage('class-number-selection'); // Move to the next step
});

// Select Number of Classes and Create Inputs
document.getElementById('num-classes')?.addEventListener('change', function(event) {
    const numberOfClasses = parseInt(event.target.value);
    const classInputsDiv = document.getElementById('class-inputs');
    classInputsDiv.innerHTML = ''; // Clear existing inputs

    for (let i = 0; i < numberOfClasses; i++) {
        const classInput = document.createElement('input');
        classInput.type = 'text';
        classInput.placeholder = `Class ${i + 1} (e.g., Math 101)`;      
        classInput.required = true; // Make this input required
        classInput.className = 'class-name'; // Add a class for easy access later
        classInputsDiv.appendChild(classInput);
    }

    showPage('class-names-input'); // Move to the class input page
});

// Handle Class Names Submission
document.getElementById('class-names-form')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const classNames = Array.from(document.getElementsByClassName("class-name")).map(input => input.value);
    const latestPlan = studyBlocks[studyBlocks.length - 1]; // Get the latest study plan
    latestPlan.classes = classNames; // Assign classes to the last plan

    showPage('available-days-selection'); // Move to the next step
});

// Handle Days and Times Input
document.getElementById('days-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const availableDays = Array.from(document.querySelectorAll('input[name="day"]:checked')).map(input => input.value);

    availableDays.forEach(day => {
        const startTime = prompt(`Enter start time for ${day} (HH:MM):`);
        const endTime = prompt(`Enter end time for ${day} (HH:MM):`);

        studyBlocks[studyBlocks.length - 1].days = studyBlocks[studyBlocks.length - 1].days || [];
        studyBlocks[studyBlocks.length - 1].days.push({ day, startTime, endTime });
    });

    showPage('plan-preview'); // Navigate to the preview page
});

// Redirect to Plan Preview Page
document.getElementById('preview-plan')?.addEventListener('click', () => {
    localStorage.setItem('studyBlocks', JSON.stringify(studyBlocks));
    showPage('plan-preview');
});

// Load Study Blocks for Preview
if (document.getElementById('weekly-calendar')) {
    const loadedBlocks = JSON.parse(localStorage.getItem('studyBlocks')) || [];
    const calendarDiv = document.getElementById('weekly-calendar');
    
    loadedBlocks.forEach(block => {
        const blockDiv = document.createElement("div");
        blockDiv.innerText = `Plan: ${block.title} - Classes: ${block.classes.join(', ')}`;
        block.days.forEach(day => {
            const timeDiv = document.createElement("div");
            timeDiv.innerText = `Day: ${day.day} | Time: ${day.startTime} to ${day.endTime}`;
            blockDiv.appendChild(timeDiv);
        });
        calendarDiv.appendChild(blockDiv);
    });
}

// Save Plan Button Functionality
document.getElementById('save-plan')?.addEventListener('click', () => {
    alert("Your study plan has been saved!");
});

// Redirect Back to the Study Plan Creator for Editing
document.getElementById('edit-plan')?.addEventListener('click', () => {
    showPage('plan-creator');
});

// Handle Back to Main Menu Button
document.getElementById('back-to-main-menu')?.addEventListener('click', () => {
    showPage('main-menu'); // Show the main menu when the button is clicked
});