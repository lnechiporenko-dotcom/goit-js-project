const BASE_URL = 'https://your-energy.b.goit.study/api';
let currentFilter = 'Muscles';

async function fetchQuote() {
  const textElement = document.getElementById('quote-text');
  const authorElement = document.getElementById('quote-author');
  if (!textElement || !authorElement) return;
  try {
    const response = await fetch(`${BASE_URL}/quote`);
    const data = await response.json();
    textElement.textContent = data.quote;
    authorElement.textContent = data.author || 'Anonymous';
  } catch (err) { console.error(err); }
}

async function renderCategories(filter = 'Muscles', page = 1) {
  const container = document.getElementById('exercises-container');
  if (!container) return;

  try {
    const response = await fetch(`${BASE_URL}/filters?filter=${filter}&page=${page}&limit=12`);
    const data = await response.json();
    if (!data.results) return;

    const markup = data.results.map(item => {
      let img = "https://cdn.pixabay.com/photo/2017/08/07/14/02/man-2604149_1280.jpg";
      if (item.imgUrl) {
        img = item.imgUrl.replace('http://', 'https://');
      }

      return `
        <li class="exercise-category-card" 
            style="background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${img}'); 
                   background-size: cover; background-position: center;">
          <div class="category-card-content">
            <p class="category-name">${item.name}</p>
            <p class="category-filter">${item.filter}</p>
          </div>
        </li>`;
    }).join('');

    container.innerHTML = markup;
    
    renderPagination(data.totalPages, page);

  } catch (err) { console.error(err); }
}

function renderPagination(totalPages, currentPage) {
  const paginationContainer = document.getElementById('pagination');
  if (!paginationContainer) return;
  
  let paginationMarkup = '';
  for (let i = 1; i <= totalPages; i++) {
    if (i > 5) break; 
    paginationMarkup += `
      <button class="pg-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>
    `;
  }
  paginationContainer.innerHTML = paginationMarkup;
}

const filterList = document.querySelector('.exercises-filter-list');

if (filterList) {
  filterList.addEventListener('click', (event) => {
    if (event.target.tagName !== 'BUTTON') return;

    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    const currentFilter = event.target.dataset.filter;

    renderCategories(currentFilter);
  });
}