import { Action, ActionReducer } from '@ngrx/store';
import { mockBooks } from '../mocks/books';

export const ALL_BOOKS = 'ALL_BOOKS';


export const books = (state = mockBooks, Action: Action) => {
    switch (action.type) {
        case ALL_BOOKS:
            return state;
        default:
            return state;
    }
}