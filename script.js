/**
 * @type {HTMLDivElement}
 */
const display = document.getElementById('display')
const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const closeButton = document.querySelector("dialog button");

// "Show the dialog" button opens the dialog modally
showButton.addEventListener("click", () => {
    dialog.showModal();
});

// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
    dialog.close();
});

const bookForm = document.querySelector('.form')
bookForm.addEventListener('submit', function (e) {
    e.preventDefault()
    const data = new FormData(e.target)
    addBookToLibrary(data.get('author'), data.get('title'), data.get('pages'), false)
    e.target.reset()
    displayBooks()
    dialog.close();
})

/**
 * @type {Array}
 */
var myLibrary = [];

function Book(author, title, pages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.id = crypto.randomUUID()
    this.author = author
    this.title = title
    this.pages = pages
    this.read = read
}

/**
 * 
 */
Book.prototype.toggleRead = function () {
    this.read = !this.read
}

/**
 * 
 * @param {String} author 
 * @param {String} title 
 * @param {Number} pages 
 * @param {Boolean} read 
 */
function addBookToLibrary(author, title, pages, read) {
    myLibrary.push(new Book(author, title, pages, read))
}


/**
 * 
 */
function displayBooks() {
    display.replaceChildren()
    myLibrary.forEach(function (/** @type {Book}*/ book) {
        const bookDiv = document.createElement('div')
        bookDiv.classList.add('card')
        const bookTitle = document.createElement('h2')
        bookTitle.textContent = book.title
        const bookAuthor = document.createElement('h3')
        bookAuthor.textContent = book.author
        const deleteBtn = document.createElement('button')
        const readBtn = document.createElement('button')
        const readStatus = document.createElement('p')
        book.read ? readStatus.textContent = "Lu" : readStatus.textContent = "Pas encore lu"
        book.read ? readBtn.textContent = "Pas encore lu" : readBtn.textContent = "Lu"
        readBtn.dataset['id'] = book.id
        readBtn.classList.add('btn')
        readBtn.addEventListener('click', function (e) {
            myLibrary.map(function (/** @type {Book} */ book) {
                if (book.id === e.target.dataset['id']) {
                    book.toggleRead()
                }
            })
            displayBooks()
        })
        deleteBtn.dataset['id'] = book.id
        deleteBtn.classList.add('btn-error')
        deleteBtn.textContent = "Supprimer"
        deleteBtn.addEventListener('click', function (e) {
            myLibrary = myLibrary.filter(book => book.id !== e.target.dataset['id'])
            displayBooks()
        })
        bookDiv.append(bookTitle)
        bookDiv.append(bookAuthor)
        bookDiv.append(readStatus)
        bookDiv.append(readBtn)
        bookDiv.append(deleteBtn)
        display.append(bookDiv)
    })
}

displayBooks()