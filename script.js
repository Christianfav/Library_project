
// all-books 
const bookTemplate = document.querySelector("[data-book-template]");
const bookContainer = document.querySelector("[data-book-container]");
const searchInput = document.querySelector("[data-search]");
const seeAllButton = document.getElementById("see-all");
const genreSelect = document.querySelector("[data-genre]");
const refreshButton = document.getElementById("refresh-books");

let displayedBooks = [];

function fetchBooks() {
    fetch("books.json")
        .then(response => response.json())
        .then(books => {
            displayedBooks = books;
            const booksToRender = getBooksToDisplay(books);
            renderBooks(booksToRender);
        });
}

searchInput.addEventListener("input", e => {
    const value = e.target.value.toLowerCase();
    const filteredBooks = displayedBooks.filter(book =>
        book.title.toLowerCase().includes(value) ||
        book.author.toLowerCase().includes(value) ||
        book.genre.toLowerCase().includes(value)
    );
    renderBooks(filteredBooks); // Re-render with filtered books
});

function renderBooks(books) {
    bookContainer.innerHTML = "";
    books.forEach(book => {
        const block = bookTemplate.content.cloneNode(true).children[0];
        const header = block.querySelector("[data-header]");
        const body = block.querySelector("[data-body]");

        header.innerHTML = `<strong>${book.title}</strong><br /><em>${book.author}</em>`;
        body.innerHTML = `<p>Genre: ${book.genre}</p> <img src="${book.image}" alt="${book.title}" />`;

        bookContainer.append(block);
    });
}
function getBooksToDisplay(books) { // shows only 8 books at bookshelves.html
    const path = window.location.pathname;
    const isAllBooksPage = path.includes("all-books.html");
    return isAllBooksPage ? books : books.slice(0,8);
}

searchInput.addEventListener("input", e => { // when user types in search
    const value = e.target.value.toLowerCase()
    displayedBooks.forEach(book => {
        let isVisible =  book.title.toLowerCase().includes(value) || book.author.toLowerCase().includes(value) || book.genre.toLowerCase().includes(value)
    book.element.classList.toggle("hide", !isVisible);
    });
});


if (genreSelect) {
    genreSelect.addEventListener("change", e => { // filters by genre
        const selectedGenre = e.target.value.toLowerCase();
        const filteredBooks = displayedBooks.filter(book =>
            selectedGenre === "" || book.genre.toLowerCase() === selectedGenre
        );
        renderBooks(filteredBooks)
    });
}

if (refreshButton) {
    refreshButton.addEventListener("click", () => {
        const randomBooks = displayedBooks.sort(() => Math.random() - 0.5).slice(0, 8); // Randomize 8 books
        renderBooks(randomBooks); // Re-render with random books
    });
}

fetchBooks();
// bookshelves

let startDate = new Date();

function formatDate(date) {
    return date.toLocaleDateString('en-us', {weekday: 'short', month: 'short', day: 'numeric' });
}

function renderTable() {

    const dateRow = document.getElementById("dateRow");
    const ths = dateRow.querySelectorAll("th");

    for (let i = 1; i < 8; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + (i));
        ths[i].textContent = formatDate(currentDate);
    }
}

renderTable()

function loadSelection() {
    const selected = JSON.parse(localStorage.getItem("selectedCell"));
    if (selected) {
        const table = document.getElementById("bookshelf-table");
        const cell = table.rows[selected.row].cells[selected.col];
        cell.classList.add("selected");
    }
}

function removeReservation() {
    document.querySelectorAll(".availability.selected").forEach(cell => {
        cell.classList.remove("selected")
    });
    localStorage.removeItem("selectedCell");
}

function saveSelection(cell) {
    const row = cell.parentElement.rowIndex;
    const col = cell.cellIndex;
    localStorage.setItem("selectedCell", JSON.stringify({row, col}));
}

document.querySelectorAll(".availability").forEach(cell => {
    cell.addEventListener("click", () => {

      document.querySelectorAll(".availability.selected").forEach(c => {
        c.classList.remove("selected");
      });

      cell.classList.add("selected");
    });
});

function confirmReservation() {
    const selectedCell = document.querySelector(".availability.selected");

    if (selectedCell) {
        saveSelection(selectedCell);
    
        const reservationResponses = ["101", "115", "132", "146", "198", "201", "218", "234", "256", "299", "301", "324", "345", "367", "389"];
        let randomRoomNum = Math.floor(Math.random() * reservationResponses.length);

        window.alert("Your Selected Room Number is " + reservationResponses[randomRoomNum]);
    } else {
        window.alert("Please select a time slot");
    }
}


window.onload = loadSelection;
