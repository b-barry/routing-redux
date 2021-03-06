
// Entry point of our application

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent, BookstoreComponent } from './app.component';
import { mockBooks } from './mocks/books';
import mockCategories from './mocks/categories';
import { createStore, combineReducers } from 'redux';
import { RouterModule } from '@angular/router';

export const getBooksReducer = (state = mockBooks, action: any) => {
    switch (action.type) {
        case 'CHANGE_CATEGORY':
            if (action.payload === 'All') {
                return mockBooks;
            }
            return mockBooks.filter((book) => {
                return book.category === action.payload
            })
        case 'SEARCH':
            if (action.payload === '') {
                return mockBooks;
            }
            const st = mockBooks.filter((book) => {
                console.log(action.payload);
                return book.title.toLowerCase().includes(action.payload.toLowerCase())
            });
            console.log(st);
            return st;
        default:
            return state;
    }
}

export const getCategoriesReducer = (state = mockCategories, action) => {
    switch (action.type) {
        case 'CHANGE_CATEGORY':
            return state.map((category) => {
                category.selected = category.name === action.payload;
                return category;
            })
        default:
            return state;
    }
}


export const getFilterReducer = (state = (el) => { el }, action) => {
    switch (action.type) {
        case 'CHANGE_CATEGORY':
            return (category) => {
                category.selected = category.name === action.payload;
                return category;
            };
        default:
            return state;
    }
}

export const store = createStore(combineReducers({
    books: getBooksReducer,
    categories: getCategoriesReducer
}))

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot([
            {
                path: '',
                component: BookstoreComponent
            },
            {
                path: ':category',
                component: BookstoreComponent
            },

            {
                path: '**',
                component: BookstoreComponent
            }
        ])
    ], // Inject built-in modules
    declarations: [AppComponent, BookstoreComponent], // Inject your own modules
    bootstrap: [AppComponent] // Module you need to bootstrap
})
export class AppModule { }
