import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  books: Observable<any[]>;
  favoriteBooks: Observable<any[]>;
  unreadBooks: Observable<any[]>;
  bookDetails: Observable<any[]>;

  constructor(private db: AngularFireDatabase) { }

  getBooks() {
    this.books = this.db.list('/books').snapshotChanges().pipe(map(oneBook => {
      const book = oneBook;
      return book.map(temp => {
        const data = temp.payload.val();
        const key = temp.payload.key;
        return { key, data };
      });
    }));
    return this.books;
  }

  getFavoriteBooks() {
    this.favoriteBooks = this.db.list('/books').snapshotChanges().pipe(map(books => {
      const favoriteBook = books.filter((item: any) => item.payload.val().rate > 4);
      return favoriteBook.map(a => {
        const data = a.payload.val();
        const key = a.payload.key;
        return { key, data };
      });
    }));
    return this.favoriteBooks;
  }

  getunreadBooks() {
    this.unreadBooks = this.db.list('/books').snapshotChanges().pipe(map(books => {
      const unreadBook = books.filter((item: any) => item.payload.val().dateread == null);
      return unreadBook.map(a => {
        const data = a.payload.val();
        const key = a.payload.key;
        return { key, data };
      });
    }));
    return this.unreadBooks;
  }

  getBookDetails(id) {
    this.bookDetails = this.db.object('/books/' + id) as unknown as Observable<any>;
    return this.bookDetails;
  }

  addBook(bookDetails) {
    // tslint:disable-next-line: prefer-const
    let filteredBook = JSON.parse(JSON.stringify(bookDetails));
    return this.books.push(filteredBook);
  }
}
