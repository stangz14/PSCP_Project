// Calendar initialization
let calendar = document.querySelector('.calendar');
let monthList = document.querySelector('.month-list');
let monthPicker = document.querySelector('#month-picker');
let currDate = new Date();
let currMonth = currDate.getMonth();
let currYear = currDate.getFullYear();
let selectedDate = null;

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

// Initialize events as an empty array to avoid errors if fetch fails
let events = [];

const loadingIndicator = document.getElementById('loading');

loadingIndicator.style.display = 'block'; // Show loading indicator

// Fetching calendar events
fetch('/getcalendar')
    .then(response => response.json())
    .then(data => {
        loadingIndicator.style.display = 'none';
        events = data;
        updateTodoList(currDate); // Populate events for today
        generateCalendar(currMonth, currYear);  
    })
    .catch(error => {
        console.error('Error fetching calendar events:', error);
        events = []; // Ensure events is an empty array on error
        updateTodoList(currDate); // Populate todo list without events
    });

// Format date from ISO string
function formatDate(isoString) {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Format time from ISO string
function formatTime(isoString) {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
}

// Extract date components from ISO string
function getDateComponents(isoString) {
    const date = new Date(isoString);
    return {
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate()
    };
}

// Get events for a specific date
function getEventsForDate(date) {
    return events.filter(event => {
        const eventDate = getDateComponents(event.start.dateTime);
        return eventDate.day === date.getDate() &&
               eventDate.month === date.getMonth() &&
               eventDate.year === date.getFullYear();
    });
}

// Update todo list
function updateTodoList(date) {
    const todoList = document.getElementById('todo-list');
    const dateEvents = getEventsForDate(date);

    if (dateEvents.length === 0) {
        todoList.innerHTML = '<div class="text-gray-500 text-center mt-4">No events for this date</div>';
        return;
    }

    todoList.innerHTML = dateEvents.map(event => `
        <div class="todo-item">
            <div class="todo-date">${formatDate(event.start.dateTime)}</div>
            <div class="todo-time">
                ${formatTime(event.start.dateTime)} - ${formatTime(event.end.dateTime)}
            </div>
            <div class="todo-summary text-black">${event.summary}</div>
            ${event.location ? `<div class="todo-location max-w-72 ">📍 ${event.location}</div>` : ''}
        </div>
    `).join('');
}

// Previous month navigation
document.querySelector('#prev-month').onclick = () => {
    currMonth--;
    if (currMonth < 0) {
        currMonth = 11;
        currYear--;
    }
    generateCalendar(currMonth, currYear);
}

// Next month navigation
document.querySelector('#next-month').onclick = () => {
    currMonth++;
    if (currMonth > 11) {
        currMonth = 0;
        currYear++;
    }
    generateCalendar(currMonth, currYear);
}

// Month picker dropdown
monthPicker.onclick = () => {
    monthList.classList.add('show');
}

// Generate month selection list
const generateMonthList = () => {
    monthList.innerHTML = months
        .map((month, idx) => `<div data-month="${idx}">${month}</div>`)
        .join('');

    document.querySelectorAll('.month-list > div').forEach(month => {
        month.onclick = () => {
            monthList.classList.remove('show');
            currMonth = parseInt(month.dataset.month);
            generateCalendar(currMonth, currYear);
        }
    });
}

// Year navigation
document.querySelector('#prev-year').onclick = () => {
    --currYear;
    generateCalendar(currMonth, currYear);
}

document.querySelector('#next-year').onclick = () => {
    ++currYear;
    generateCalendar(currMonth, currYear);
}

// Generate calendar grid
const generateCalendar = (month, year) => {
    let calendarDays = document.querySelector('.calendar-days');
    calendarDays.innerHTML = '';
    let firstDay = new Date(year, month, 1).getDay();
    let lastDate = new Date(year, month + 1, 0).getDate();

    monthPicker.innerHTML = months[month];
    document.querySelector('#year').innerHTML = year;

    let days = "";

    // Add empty cells for days before the first of the month
    for (let i = 0; i < firstDay; i++) {
        days += '<div class="p-2 text-center text-black"></div>';
    }

    // Generate calendar days
    for (let i = 1; i <= lastDate; i++) {
        const currentDate = new Date(year, month, i);
        let isToday = i === currDate.getDate() &&
            month === currDate.getMonth() &&
            year === currDate.getFullYear()
            ? 'curr-date'
            : '';
        let hasEvents = getEventsForDate(currentDate).length > 0;
        let eventIndicator = hasEvents ? '<div class="w-1 h-1 bg-purple-500 rounded-full mx-auto mt-1"></div>' : '';

        days += `
            <div class="text-black p-2 flex justify-center items-center flex-col text-center rounded-full hover:bg-gray-100 ${isToday}" data-date="${year}-${month + 1}-${i}">
                ${i}
                ${eventIndicator}
            </div>
        `;
    }

    calendarDays.innerHTML = days;

    // Add click event listeners to calendar days
    document.querySelectorAll('.calendar-days div[data-date]').forEach(day => {
        day.addEventListener('click', () => {
            // Remove previous selection
            document.querySelectorAll('.calendar-days div').forEach(d => 
                d.classList.remove('selected-date'));

            // Add selection to clicked date
            day.classList.add('selected-date');

            // Update todo list
            const [y, m, d] = day.dataset.date.split('-').map(Number);
            const selectedDate = new Date(y, m - 1, d);
            updateTodoList(selectedDate);
        });
    });
}

// Initialize calendar
generateMonthList();

// Close month picker when clicking outside
document.addEventListener('click', (e) => {
    if (!monthPicker.contains(e.target) && !monthList.contains(e.target)) {
        monthList.classList.remove('show');
    }
});
