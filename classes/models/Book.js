export class Book {
    constructor(title, author, pages, read) {
        this.id = crypto.randomUUID()
        this.author = author
        this.title = title
        this.pages = pages
        this.read = read
    }
    toggleRead() {
        this.read = !this.read
    }
}