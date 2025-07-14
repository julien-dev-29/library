import BookElement from "../components/BookElement.js"
import { Modal } from "../components/Modal.js"
import { Library } from "../models/Library.js"

export default class ScreenController {
    root = document.querySelector('#library')
    constructor() {
        this.library = new Library(this)
        this.modal = new Modal(this.library, this)
    }
    /**
     * Affiche la librairie
     */
    displayLibrary() {
        this.root.replaceChildren()
        this.library.library.map((book) => this.root.append(new BookElement(book, this.library).element))
    }
}

