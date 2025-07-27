import { Book } from "./Book.js";
/**
 * 
 */
export class Library {
    #myLibrary = []
    constructor(screenController) {
        this.#myLibrary.push(new Book("titre", "auteur", 254, false))
        this.#myLibrary.push(new Book("titre2", "auteur2", 784, false))
        this.#myLibrary.push(new Book("titre3", "auteur3", 584, false))
        this.screenController = screenController
    }
    /**
     * 
     * @param {String} title 
     * @param {String} author 
     * @param {Number} pages 
     * @param {Boolean} read 
     */
    addBookToLibrary(form) {
        const data = new FormData(form)
        this.#myLibrary.push(new Book(
            data.get('title'),
            data.get('author'),
            data.get('pages'), false
        ))
    }
    /**
     * 
     * @param {String} id 
     */
    deleteBook(id) {
        this.#myLibrary = this.#myLibrary
            .filter(book => book.id !== id)
        this.screenController.displayLibrary()
    }
    /**
     * 
     * @param {String} id 
     */
    updateBook(id) {
        this.#myLibrary.map(function (book) {
            if (book.id === id) {
                book.toggleRead()
            }
        })
        this.screenController.displayLibrary()
    }
    get library() { return this.#myLibrary }
}