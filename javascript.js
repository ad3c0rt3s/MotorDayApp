// Generate schedule with half-hour increments
const scheduleList = document.getElementById('schedule-list');

function generateSchedule() {
    const startHour = 7;
    const endHour = 21;

    for (let hour = startHour; hour <= endHour; hour++) {
        let hourStr = hour < 10 ? '0' + hour : hour;

        // First half of the hour
        const timeSlot1 = document.createElement('div');
        timeSlot1.classList.add('time-slot');
        timeSlot1.innerHTML = `<span>${hourStr}:00</span><input type="text" placeholder="Task">`;
        scheduleList.appendChild(timeSlot1);

        // Second half of the hour
        if (hour !== endHour) {
            const timeSlot2 = document.createElement('div');
            timeSlot2.classList.add('time-slot');
            timeSlot2.innerHTML = `<span>${hourStr}:30</span><input type="text" placeholder="Task">`;
            scheduleList.appendChild(timeSlot2);
        }
    }
}

// Run the schedule generation function
generateSchedule();

// Save the schedule to localStorage
function saveSchedule() {
    const tasks = {};

    // Save each input field's value in the schedule, priorities, and to-do lists
    document.querySelectorAll('.time-slot input').forEach((input, index) => {
        tasks[`task${index}`] = input.value;
    });
    document.querySelectorAll('.priorities input').forEach((input, index) => {
        tasks[`priority${index}`] = input.value;
    });
    document.querySelectorAll('.todo input').forEach((input, index) => {
        tasks[`todo${index}`] = input.value;
    });

    // Save the date fields (Day, Month, Year)
    tasks['day'] = document.getElementById('day').value;
    tasks['month'] = document.getElementById('month').value;
    tasks['year'] = document.getElementById('year').value;

    // Save to localStorage
    localStorage.setItem('MotorDayTasks', JSON.stringify(tasks));
}

// Load the schedule from localStorage
function loadSchedule() {
    const tasks = JSON.parse(localStorage.getItem('MotorDayTasks'));

    if (tasks) {
        // Load each input field's value for the schedule, priorities, and to-do lists
        document.querySelectorAll('.time-slot input').forEach((input, index) => {
            input.value = tasks[`task${index}`] || '';
        });
        document.querySelectorAll('.priorities input').forEach((input, index) => {
            input.value = tasks[`priority${index}`] || '';
        });
        document.querySelectorAll('.todo input').forEach((input, index) => {
            input.value = tasks[`todo${index}`] || '';
        });

        // Load the date fields (Day, Month, Year)
        document.getElementById('day').value = tasks['day'] || '';
        document.getElementById('month').value = tasks['month'] || '';
        document.getElementById('year').value = tasks['year'] || '';
    }
}

// Reset function to clear inputs and remove data from localStorage
function resetSchedule() {
    document.querySelectorAll('input[type="text"]').forEach(input => input.value = '');
    localStorage.removeItem('MotorDayTasks');
}

// Load the schedule on page load
window.onload = function() {
    loadSchedule();

    // Add event listeners to save on any input change
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', saveSchedule);
    });
};
