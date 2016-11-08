import { Component } from '@angular/core';
import { Book, mockBooks } from './mocks/books';
import mockCategories, { Category } from './mocks/categories';
import { store } from './app.module';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';

//TODO: play ActivatedRoute and params

@Component({
  selector: 'bookstore',
  templateUrl: '../app/app.template.html'
})

export class BookstoreComponent {
  books: Book[]; // use mocks data instead
  categories: Category[]; // use mocks data instead
  navClosed: Boolean = true;
  store = store
  constructor(private router: Router, private route: ActivatedRoute) {
    console.log("router", route.params.value);
    const params$ = route.params
      .map((p) => {
        return p.category;
      })
      .subscribe((category) => {
        console.log(" Sub ", category);
        if (!category) {
          category = 'All'
        }
         this.store.dispatch({ type: 'CHANGE_CATEGORY', payload: category });
      });


    this.books = this.store.getState().books;
    this.categories = this.store.getState().categories;

    this.store.subscribe(() => {
      this.books = this.store.getState().books;
      this.categories = this.store.getState().categories;
    });

    //this.store.dispatch({ type: 'CHANGE_CATEGORY', payload: param.category });

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


@Component({
  selector: 'bookstore',
  template: `
    <router-outlet></router-outlet>
  `

})
export class AppComponent {

}
