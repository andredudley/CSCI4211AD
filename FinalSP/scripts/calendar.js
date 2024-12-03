document.addEventListener("DOMContentLoaded", () => {
  const calendar = document.getElementById("calendar");

  // Function to render the calendar
  function renderCalendar(year, month) {
      const currentDate = new Date();
      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const today = currentDate.getDate();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();

      // List of month names
      const monthNames = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
      ];

      // Set the calendar title to the current month and year
      const calendarTitle = document.querySelector(".calendar-title");
      calendarTitle.textContent = `${monthNames[month]} ${year}`;

      // Create calendar table
      let calendarHTML = `
      <table>
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>
      `;

      // Fill the first week of the month
      let dayCount = 1;
      for (let row = 0; row < 6; row++) { // Up to 6 rows for a month
          calendarHTML += "<tr>";
          for (let col = 0; col < 7; col++) {
              if (row === 0 && col < firstDay) {
                  calendarHTML += `<td></td>`; // Empty cell
              } else if (dayCount > daysInMonth) {
                  calendarHTML += `<td></td>`; // Empty cell for overflow days
              } else {
                  const isToday =
                      dayCount === today &&
                      month === currentMonth &&
                      year === currentYear;
                  calendarHTML += `<td class="${isToday ? "today" : ""}">${dayCount}</td>`;
                  dayCount++;
              }
          }
          calendarHTML += "</tr>";
      }

      calendarHTML += "</tbody></table>";
      calendar.innerHTML = calendarHTML;
  }

  // Get the current date
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  // Render the calendar for the current month and year
  renderCalendar(currentYear, currentMonth);
});


  