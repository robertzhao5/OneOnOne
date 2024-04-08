const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const loadCalendar = (monthToLoad, yearToLoad) => {
  const scheduleModal = new bootstrap.Modal("#schedule-modal", {
    keyboard: false,
  });

  document.getElementById(
    "calendar"
  ).innerHTML = `<th class="calendar-head">SUN</th>
    <th class="calendar-head">MON</th>
    <th class="calendar-head">TUE</th>
    <th class="calendar-head">WED</th>
    <th class="calendar-head">THU</th>
    <th class="calendar-head">FRI</th>
    <th class="calendar-head">SAT</th>`;

  const date = new Date();
  const currentD = date.getDate();
  let m = monthToLoad;
  if (m === undefined) {
    m = date.getMonth();
  }
  let y = yearToLoad;
  if (y === undefined) {
    y = date.getFullYear();
  }
  currentM = date.getMonth();
  currentY = date.getFullYear();
  const selectedMonth = monthNames[m];
  document.getElementById("month-name").innerHTML = selectedMonth;
  document.getElementById("year").innerHTML = y;

  const numDays = new Date(y, m + 1, 0).getDate();
  const startDay = new Date(y, m, 1).getDay();

  const scheduledEvents = {
    7: [{ type: "free" }],
    15: [{ type: "busy" }],
    17: [{ type: "free" }, { type: "busy" }, { type: "busy" }],
  };

  let daysToLoad = [];
  for (let i = 0; i < startDay; i++) {
    daysToLoad.push("");
  }
  for (let i = 0; i < numDays; i++) {
    daysToLoad.push(i + 1);
  }
  for (
    let i = numDays + startDay;
    i < Math.ceil((numDays + startDay) / 7.0) * 7.0;
    i++
  ) {
    daysToLoad.push("");
  }

  const calendar = document.getElementById("calendar");

  for (let i = 0; i < Math.ceil(daysToLoad.length / 7); i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < 7; j++) {
      const day = document.createElement("td");
      day.innerHTML = daysToLoad[i * 7 + j];
      if (daysToLoad[i * 7 + j] == currentD && m == currentM && y == currentY) {
        day.classList.add("today");
      }
      if (daysToLoad[i * 7 + j] == "") {
        day.classList.add("disabled");
      } else {
        day.onclick = () => {
          document.getElementById("schedule-modal-title").innerHTML =
            "New Event - " + selectedMonth + " " + daysToLoad[i * 7 + j];
          scheduleModal.show();
        };

        if (scheduledEvents[daysToLoad[i * 7 + j]]) {
          for (let event of scheduledEvents[daysToLoad[i * 7 + j]]) {
            const eventElement = document.createElement("div");
            eventElement.style.width = "100%";
            eventElement.style.height = "12px";
            eventElement.style.marginBottom = "8px";
            eventElement.style.borderRadius = "5px";
            eventElement.style.backgroundColor =
              event.type === "busy" ? "red" : "green";
            day.appendChild(eventElement);
            eventElement.onclick = () =>
              window.open("../dashboard-overview/user-overview.html", "_self");
          }
        }

        day.setAttribute(
          "data-bs-date",
          selectedMonth + " " + daysToLoad[i * 7 + j]
        );
      }
      row.appendChild(day);
    }
    calendar.appendChild(row);
  }
};

loadCalendar();

const handleScrollCalendar = (direction) => {
  const currentSelectedMonth = document.getElementById("month-name").innerHTML;
  const currentSelectedYear = document.getElementById("year").innerHTML;

  const currentSelectedMonthIndex = monthNames.indexOf(currentSelectedMonth);
  let yearToSelect = currentSelectedYear;
  if (currentSelectedMonthIndex + direction < 0) {
    yearToSelect -= 1;
  } else if (currentSelectedMonthIndex + direction > 11) {
    yearToSelect++;
  }
  const monthToSelect = (currentSelectedMonthIndex + direction + 12) % 12;
  loadCalendar(monthToSelect, yearToSelect);
};

const loadWeeklyCalendar = (start) => {
  const scheduleModal = new bootstrap.Modal("#schedule-modal", {
    keyboard: false,
  });

  document.getElementById(
    "calendar"
  ).innerHTML = `<th class="calendar-head">SUN</th>
    <th class="calendar-head">MON</th>
    <th class="calendar-head">TUE</th>
    <th class="calendar-head">WED</th>
    <th class="calendar-head">THU</th>
    <th class="calendar-head">FRI</th>
    <th class="calendar-head">SAT</th>`;

  const date = new Date();
  const currentD = date.getDate();
  let d = start;
  if (d === undefined) {
    d = date.getDay();
  }
  currentM = date.getMonth();
  currentY = date.getFullYear();
  const selectedMonth = monthNames[m];
  document.getElementById("month-name").innerHTML = selectedMonth;
  document.getElementById("year").innerHTML = y;

  const numDays = new Date(date.getFullYear, date.getMonth, 0).getDate();
  const startDay = new Date(date.getFullYear, date.getMonth, 1).getDay();

  const scheduledEvents = {
    7: [{ type: "free" }],
    15: [{ type: "busy" }],
    17: [{ type: "free" }, { type: "busy" }, { type: "busy" }],
  };

  let hourToLoad = [];
  for (let i = 0; i < startDay; i++) {
    hourToLoad.push("");
  }
  for (let i = 0; i < numDays; i++) {
    hourToLoad.push(i + 1);
  }
  for (
    let i = numDays + startDay;
    i < Math.ceil((numDays + startDay) / 7.0) * 7.0;
    i++
  ) {
    hourToLoad.push("");
  }

  const calendar = document.getElementById("calendar");

  for (let i = 0; i < Math.ceil(hourToLoad.length / 7); i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < 7; j++) {
      const day = document.createElement("td");
      day.innerHTML = hourToLoad[i * 7 + j];
      if (hourToLoad[i * 7 + j] == "") {
        day.classList.add("disabled");
      } else {
        day.onclick = () => {
          document.getElementById("schedule-modal-title").innerHTML =
            "New Event - " + selectedMonth + " " + hourToLoad[i * 7 + j];
          scheduleModal.show();
        };

        if (scheduledEvents[hourToLoad[i * 7 + j]]) {
          for (let event of scheduledEvents[hourToLoad[i * 7 + j]]) {
            const eventElement = document.createElement("div");
            eventElement.style.width = "100%";
            eventElement.style.height = "12px";
            eventElement.style.marginBottom = "8px";
            eventElement.style.borderRadius = "5px";
            eventElement.style.backgroundColor =
              event.type === "busy" ? "red" : "green";
            day.appendChild(eventElement);
            eventElement.onclick = () =>
              window.open("../dashboard-overview/user-overview.html", "_self");
          }
        }

        day.setAttribute(
          "data-bs-date",
          selectedMonth + " " + daysToLoad[i * 7 + j]
        );
      }
      row.appendChild(day);
    }
    calendar.appendChild(row);
  }
};