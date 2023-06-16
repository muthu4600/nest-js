import { BOOKS } from 'src/mocks/books.mock';
import { Books } from './books';
export class BooksService {
    Books: Books[] = [...BOOKS];

    getAllBooks() {
        return this.Books;
    }

    getBookById(id: number) {
        return this.Books.filter(book => book.id == id)[0];
    }

    addUpdateBook(bookdetails: any) {
        const index = this.Books.filter((book) => book.id).indexOf(bookdetails.id);
        if (index === -1) this.Books.push(bookdetails);
        else this.Books.splice(index, 1, bookdetails);
        return this.Books;
    }
}