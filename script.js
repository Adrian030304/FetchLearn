// Accesarea elementelor din DOM
const authorContainer = document.getElementById('author-container');
const loadMoreBtn = document.getElementById('load-more-btn');

// Inițializarea indicilor pentru gestionarea afișării autorilor
let startingIndex = 0;
let endingIndex = 8;
let authorDataArr = [];

// Folosim fetch API pentru a face o cerere GET și a prelua datele
fetch('https://cdn.freecodecamp.org/curriculum/news-author-page/authors.json')
  .then((res) => res.json()) // Parsează răspunsul în format JSON
  .then((data) => {
    authorDataArr = data; // Stochează datele preluate în authorDataArr
    displayAuthors(authorDataArr.slice(startingIndex, endingIndex));  // Afișează primii 8 autori
  })
  .catch((err) => {
    // Afișează un mesaj de eroare dacă cererea eșuează
    authorContainer.innerHTML = '<p class="error-msg">There was an error loading the authors</p>';
  });

// Funcție pentru a încărca și afișa mai mulți autori
const fetchMoreAuthors = () => {
  startingIndex += 8; // Crește startingIndex cu 8
  endingIndex += 8; // Crește endingIndex cu 8
  
  // Afișează următorii autori
  displayAuthors(authorDataArr.slice(startingIndex, endingIndex));

  // Dacă nu mai sunt autori de încărcat, dezactivează butonul
  if (authorDataArr.length <= endingIndex) {
    loadMoreBtn.disabled = true;
    loadMoreBtn.style.cursor = "not-allowed"
    loadMoreBtn.textContent = 'No more data to load';
  }
};

// Funcție pentru a afișa autorii
const displayAuthors = (authors) => {
  // Iterează prin fiecare autor și adaugă un card în authorContainer
  authors.forEach(({ author, image, url, bio }, index) => {
    authorContainer.innerHTML += `
      <div id="${index}" class="user-card">
        <h2 class="author-name">${author}</h2>
        <img class="user-img" src="${image}" alt="${author} avatar">
        <div class="purple-divider"></div>
        <p class="bio">${bio.length > 50 ? bio.slice(0, 50) + '...' : bio}</p>
        <a class="author-link" href="${url}" target="_blank">${author} author page</a>
      </div>
    `;
  });
};

// Adaugă un event listener pentru butonul loadMoreBtn pentru a încărca mai mulți autori când este apăsat
loadMoreBtn.addEventListener('click', fetchMoreAuthors);