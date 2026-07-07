const cities = [
  { name: "New York", country: "United States", timeZone: "America/New_York" },
  { name: "Los Angeles", country: "United States", timeZone: "America/Los_Angeles" },
  { name: "Chicago", country: "United States", timeZone: "America/Chicago" },
  { name: "Toronto", country: "Canada", timeZone: "America/Toronto" },
  { name: "Vancouver", country: "Canada", timeZone: "America/Vancouver" },
  { name: "Mexico City", country: "Mexico", timeZone: "America/Mexico_City" },
  { name: "London", country: "United Kingdom", timeZone: "Europe/London" },
  { name: "Paris", country: "France", timeZone: "Europe/Paris" },
  { name: "Berlin", country: "Germany", timeZone: "Europe/Berlin" },
  { name: "Madrid", country: "Spain", timeZone: "Europe/Madrid" },
  { name: "Rome", country: "Italy", timeZone: "Europe/Rome" },
  { name: "Amsterdam", country: "Netherlands", timeZone: "Europe/Amsterdam" },
  { name: "Brussels", country: "Belgium", timeZone: "Europe/Brussels" },
  { name: "Lisbon", country: "Portugal", timeZone: "Europe/Lisbon" },
  { name: "Dublin", country: "Ireland", timeZone: "Europe/Dublin" },
  { name: "Moscow", country: "Russia", timeZone: "Europe/Moscow" },
  { name: "Istanbul", country: "Turkey", timeZone: "Europe/Istanbul" },
  { name: "Cairo", country: "Egypt", timeZone: "Africa/Cairo" },
  { name: "Nairobi", country: "Kenya", timeZone: "Africa/Nairobi" },
  { name: "Cape Town", country: "South Africa", timeZone: "Africa/Johannesburg" },
  { name: "Lagos", country: "Nigeria", timeZone: "Africa/Lagos" },
  { name: "Dubai", country: "United Arab Emirates", timeZone: "Asia/Dubai" },
  { name: "Abu Dhabi", country: "United Arab Emirates", timeZone: "Asia/Dubai" },
  { name: "Doha", country: "Qatar", timeZone: "Asia/Qatar" },
  { name: "Riyadh", country: "Saudi Arabia", timeZone: "Asia/Riyadh" },
  { name: "Kuwait City", country: "Kuwait", timeZone: "Asia/Kuwait" },
  { name: "Karachi", country: "Pakistan", timeZone: "Asia/Karachi" },
  { name: "Lahore", country: "Pakistan", timeZone: "Asia/Karachi" },
  { name: "Delhi", country: "India", timeZone: "Asia/Kolkata" },
  { name: "Mumbai", country: "India", timeZone: "Asia/Kolkata" },
  { name: "Dhaka", country: "Bangladesh", timeZone: "Asia/Dhaka" },
  { name: "Bangkok", country: "Thailand", timeZone: "Asia/Bangkok" },
  { name: "Singapore", country: "Singapore", timeZone: "Asia/Singapore" },
  { name: "Kuala Lumpur", country: "Malaysia", timeZone: "Asia/Kuala_Lumpur" },
  { name: "Jakarta", country: "Indonesia", timeZone: "Asia/Jakarta" },
  { name: "Manila", country: "Philippines", timeZone: "Asia/Manila" },
  { name: "Hong Kong", country: "China", timeZone: "Asia/Hong_Kong" },
  { name: "Beijing", country: "China", timeZone: "Asia/Shanghai" },
  { name: "Shanghai", country: "China", timeZone: "Asia/Shanghai" },
  { name: "Seoul", country: "South Korea", timeZone: "Asia/Seoul" },
  { name: "Tokyo", country: "Japan", timeZone: "Asia/Tokyo" },
  { name: "Sydney", country: "Australia", timeZone: "Australia/Sydney" },
  { name: "Melbourne", country: "Australia", timeZone: "Australia/Melbourne" },
  { name: "Auckland", country: "New Zealand", timeZone: "Pacific/Auckland" },
  { name: "Wellington", country: "New Zealand", timeZone: "Pacific/Auckland" },
  { name: "Rio de Janeiro", country: "Brazil", timeZone: "America/Sao_Paulo" },
  { name: "São Paulo", country: "Brazil", timeZone: "America/Sao_Paulo" },
  { name: "Buenos Aires", country: "Argentina", timeZone: "America/Buenos_Aires" },
  { name: "Santiago", country: "Chile", timeZone: "America/Santiago" },
  { name: "Honolulu", country: "United States", timeZone: "Pacific/Honolulu" }
];

const searchInput = document.getElementById("searchInput");
const citiesGrid = document.getElementById("citiesGrid");
const digitalClock = document.getElementById("digitalClock");
const digitalDate = document.getElementById("digitalDate");
const clockBadge = document.getElementById("clockBadge");
const themeToggle = document.getElementById("themeToggle");
const fromCity = document.getElementById("fromCity");
const toCity = document.getElementById("toCity");
const converterResult = document.getElementById("converterResult");

function getTimeDetails(date, timeZone) {
  const time = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  }).format(date);

  const dateText = new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(date);

  const day = new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "long"
  }).format(date);

  const tzName = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "short"
  }).format(date);

  const offset = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "shortOffset"
  }).format(date);

  const hour = Number(
    new Intl.DateTimeFormat("en-GB", {
      timeZone,
      hour: "2-digit",
      hour12: false
    }).format(date)
  );

  const icon = hour >= 6 && hour < 18 ? "☀️" : "🌙";

  return {
    time,
    dateText,
    day,
    tzName,
    offset: offset.split(" ").pop() || "UTC",
    icon
  };
}

function renderCityCards(filterText = "") {
  const query = filterText.trim().toLowerCase();

  const filtered = cities.filter((city) => {
    const haystack = `${city.name} ${city.country} ${city.timeZone}`.toLowerCase();
    return haystack.includes(query);
  });

  if (!filtered.length) {
    citiesGrid.innerHTML = "<p class='empty-state'>No cities match your search.</p>";
    return;
  }

  citiesGrid.innerHTML = filtered
    .map((city) => {
      const details = getTimeDetails(new Date(), city.timeZone);
      return `
        <article class="city-card">
          <div class="card-top">
            <div>
              <h3 class="city-name">${city.name}</h3>
              <p class="city-country">${city.country}</p>
            </div>
            <span class="city-icon">${details.icon}</span>
          </div>
          <div class="city-time">${details.time}</div>
          <div class="city-date">${details.dateText}</div>
          <div class="city-day">${details.day}</div>
          <div class="city-zone">${details.tzName}</div>
          <div class="city-offset">UTC offset: ${details.offset}</div>
        </article>
      `;
    })
    .join("");
}

function updateHeroClock() {
  const now = new Date();
  digitalClock.textContent = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  }).format(now);

  digitalDate.textContent = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  }).format(now);

  const hour = now.getHours();
  clockBadge.textContent = hour >= 6 && hour < 18 ? "☀️" : "🌙";
}

function populateSelects() {
  const options = cities
    .map((city) => `<option value="${city.timeZone}">${city.name}</option>`)
    .join("");

  fromCity.innerHTML = options;
  toCity.innerHTML = options;

  fromCity.value = "America/New_York";
  toCity.value = "Europe/London";
}

function updateConverter() {
  const fromValue = fromCity.value;
  const toValue = toCity.value;
  const now = new Date();

  const fromInfo = getTimeDetails(now, fromValue);
  const toInfo = getTimeDetails(now, toValue);

  const fromCityName = cities.find((city) => city.timeZone === fromValue)?.name || "Selected city";
  const toCityName = cities.find((city) => city.timeZone === toValue)?.name || "Selected city";

  converterResult.innerHTML = `
    <strong>${fromCityName}</strong>: ${fromInfo.time} • ${fromInfo.dateText}<br />
    <strong>${toCityName}</strong>: ${toInfo.time} • ${toInfo.dateText}
  `;
}

function toggleTheme() {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  themeToggle.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
}

searchInput.addEventListener("input", (event) => {
  renderCityCards(event.target.value);
});

fromCity.addEventListener("change", updateConverter);
toCity.addEventListener("change", updateConverter);
themeToggle.addEventListener("click", toggleTheme);

function init() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  }
  themeToggle.textContent = document.body.classList.contains("dark") ? "☀️ Light Mode" : "🌙 Dark Mode";

  populateSelects();
  updateHeroClock();
  renderCityCards();
  updateConverter();

  setInterval(() => {
    updateHeroClock();
    renderCityCards(searchInput.value);
    updateConverter();
  }, 1000);
}

init();
