import { Book } from "../models/Book.js"

export default class BookElement {
    #element
    constructor(/** @type {Book}*/book, library) {
        this.#element = document.createElement('div')
        this.#element.classList.add('card')
        const title = document.createElement('h2')
        const author = document.createElement('h3')
        const pages = document.createElement('h4')
        const readElement = document.createElement('p')
        const btnElement = document.createElement('div')
        if (book.read === true) {
            readElement.textContent = "Lu"
        } else {
            readElement.textContent = "Pas lu"
        }
        const deleteBtn = document.createElement('button')
        deleteBtn.classList.add('btn-delete')
        deleteBtn.textContent = "Supprimer"
        deleteBtn.dataset['id'] = book.id
        deleteBtn.addEventListener('click', function (e) {
            library.deleteBook(e.target.dataset['id'])
        })
        const readBtn = document.createElement('button')
        readBtn.classList.add('btn')
        readBtn.textContent = "Lu"
        readBtn.addEventListener('click', function (/** @type {PointerEvent}*/e) {
            library.updateBook(e.target.previousElementSibling.dataset['id'])
        })
        author.textContent = book.author
        title.textContent = book.title
        pages.textContent = book.pages + " pages"
        this.#element.append(title)
        this.#element.append(author)
        this.#element.append(pages)
        this.#element.append(readElement)
        btnElement.append(deleteBtn)
        btnElement.append(readBtn)
        this.#element.append(btnElement)
    }
    get element() { return this.#element }
}