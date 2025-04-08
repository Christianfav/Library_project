
// Bookshelves 
const bookTemplate = document.querySelector("[data-book-template]")
const bookContainer = document.querySelector("[data-book-container]")
const searchInput = document.querySelector("[data-search]")

let displayedBooks = []

searchInput.addEventListener("input", e => {
    const value = e.target.value.toLowerCase()
    displayedBooks.forEach(book => {
        let isVisible =  book.title.toLowerCase().includes(value) || book.author.toLowerCase().includes(value) || book.genre.toLowerCase().includes(value)
    book.element.classList.toggle("hide", !isVisible)
    })
})

fetch("books.json")
    .then(response => response.json())
    .then(books => {
        displayedBooks = books.map(book => {
            const block = bookTemplate.content.cloneNode(true).children[0]
            const header = block.querySelector("[data-header]")
            const body = block.querySelector("[data-body]")

            header.innerHTML = `<strong>${book.title}</strong><br /><em>${book.author}</em>`
            body.innerHTML = `<p>Genre: ${book.genre}</p> <img src="${book.image}" alt="${book.title}" />`

            bookContainer.append(block)
            return {
                title: book.title,
                author: book.author,
                genre: book.genre,
                element: block
            }
        })
    })

    const genreSelect = document.querySelector("[data-genre]")

    genreSelect.addEventListener("change", e => {
        const selectedGenre = e.target.value.toLowerCase()
        displayedBooks.forEach(book => {
            let isVisible = selectedGenre === "" || book.genre.toLowerCase() === selectedGenre
            book.element.classList.toggle("hide", !isVisible)
        })
    })