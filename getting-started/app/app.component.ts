import { Component } from '@angular/core';
import { Book, mockBooks } from './mocks/books';
import mockCategories, { Category } from './mocks/categories';
import { store } from './app.module';



@Component({
  selector: 'bookstore',
  templateUrl: '../app/app.template.html'
})

export class AppComponent {
  books: Book[]; // use mocks data instead
  categories: Category[]; // use mocks data instead
  navClosed: Boolean = true;
  store = store
  constructor() {
    this.books = this.store.getState().books;
    this.categories = this.store.getState().categories;

    this.store.subscribe(() => {
      this.books = this.store.getState().books;
      this.categories = this.store.getState().categories;
    });
  }
  clicked() {
    this.store.dispatch({ type: 'ALL_BOOKS' });
  }
  changeSelectedCategory({name}) {
    this.store.dispatch({ type: 'CHANGE_CATEGORY', payload: name });
  }
  search(searchTerm) {
    this.store.dispatch({ type: 'SEARCH', payload: searchTerm });
  }

  toggleSideBar() {
    this.navClosed = !this.navClosed;
  }
}
