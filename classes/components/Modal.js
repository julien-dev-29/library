import { Library } from "../models/Library.js";

export class Modal {
    #form
    constructor(library, screenController) {
        /**
         * @type {Library}
         */
        this.library = library
        this.screenController = screenController
        this.dialogElem = document.getElementById("dialog");
        this.showBtn = document.querySelector(".show");
        this.closeBtn = document.querySelector(".close");
        this.showBtn.addEventListener("click", () => {
            this.dialogElem.showModal();
        });
        this.closeBtn.addEventListener("click", () => {
            this.dialogElem.close();
        });
        this.#form = document.getElementById('add-form')
        this.#form.addEventListener('submit', (e) => {
            e.preventDefault()
            this.library.addBookToLibrary(e.target)
            this.screenController.displayLibrary()
            e.target.reset()
        })
    }
    handleSubmit() {

    }
    get form() {
        return this.#form
    }

}