const QUOTE_KEY = 'daily-quote';

// 1. Цитата дня (API + LocalStorage)
async function getDailyQuote() {
  const savedData = JSON.parse(localStorage.getItem(QUOTE_KEY));
  const today = new Date().toLocaleDateString();

  if (savedData && savedData.date === today) {
    updateQuoteUI(savedData.quote, savedData.author);
    return;
  }

  try {
    const response = await fetch('https://your-energy.b.goit.study/api/quote');
    const data = await response.json();
    const quoteData = { quote: data.quote, author: data.author, date: today };
    localStorage.setItem(QUOTE_KEY, JSON.stringify(quoteData));
    updateQuoteUI(data.quote, data.author);
  } catch (err) {
    console.log("Помилка отримання цитати:", err);
  }
}

function updateQuoteUI(quote, author) {
  const qText = document.querySelector('.quote-text');
  const qAuthor = document.querySelector('.quote-author');
  if (qText && qAuthor) {
    qText.textContent = quote;
    qAuthor.textContent = author;
  }
}

async function getMusclesFilters() {
  try {
    const resp = await fetch('https://your-energy.b.goit.study/api/filters?filter=Muscles&page=1&limit=12');
    const data = await resp.json();
    renderFilters(data.results);
  } catch (err) {
    console.log("Помилка отримання фільтрів:", err);
  }
}

function renderFilters(filters) {
  const container = document.querySelector('.exercises-container'); 
  if (!container) return;

  const markup = filters.map(item => `
    <li class="filter-card" data-filter="${item.filter}" data-name="${item.name}" 
        style="background: linear-gradient(0deg, rgba(16, 16, 16, 0.7), rgba(16, 16, 16, 0.7)), url('${item.imgUrl}'); background-size: cover;">
      <div class="filter-card-content">
        <p class="filter-card-name">${item.name.toUpperCase()}</p>
        <p class="filter-card-type">${item.filter}</p>
      </div>
    </li>
  `).join('');

  container.innerHTML = markup;
}

getDailyQuote();
getMusclesFilters();
