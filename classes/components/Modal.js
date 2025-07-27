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
        this.closeBtn = document.querySelector("#close-dialog");
        this.showBtn.addEventListener("click", () => {
            this.dialogElem.showModal();
        });
        this.closeBtn.addEventListener("click", () => {
            this.dialogElem.close();
        });
        this.#form = document.getElementById('add-form')
        const titleInput = document.querySelector("#title")
        const authorInput = document.querySelector("#author")
        const pageInput = document.querySelector("#pages")

        titleInput.addEventListener('input', (e) => {
            titleInput.setCustomValidity("")
            if (!titleInput.validity.valid) return
            if (titleInput.value.length < 4) {
                titleInput.setCustomValidity("Le titre doit contenir 4 lettres")
            }
        })

        authorInput.addEventListener('input', (e) => {
            authorInput.setCustomValidity("")
            if (!authorInput.validity.valid) return
            if (authorInput.value.length < 4) {
                authorInput.setCustomValidity("Le nom de l'auteur doit contenir 4 lettres")
            }
        })



        this.#form.addEventListener('submit', (e) => {
            e.preventDefault()
            this.library.addBookToLibrary(e.target)
            this.screenController.displayLibrary()
            e.target.reset()
            e.target.parentElement.close()
        })
    }
    get form() {
        return this.#form
    }

}