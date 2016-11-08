import { Component } from '@angular/core';
import { Book, mockBooks } from './mocks/books';
import mockCategories, { Category } from './mocks/categories';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';




@Component({
  selector: 'bookstore',
  templateUrl: '../app/app.template.html'
})

export class AppComponent {
  books: Observable<Object>; // use mocks data instead
  categories: Observable<Object>; // use mocks data instead
  navClosed: Boolean = true;

  constructor(private store: Store<any>) {
    this.books = this.store.select('books');
    this.categories = this.store.select('categories');
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

  toggleSideBar(){
    this.navClosed = !this.navClosed;
  }
}
