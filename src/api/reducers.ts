import { Reducer } from 'redux';
import { ApiActionTypes, ApiActions } from './actions';

export interface HeroesState {
    readonly loading: boolean
    readonly data: any,
    readonly errors?: string
}

// Type-safe initialState!
const initialState: HeroesState = {
    data: [],
    errors: undefined,
    loading: false,
};

// Thanks to Redux 4's much simpler typings, we can take away a lot of typings on the reducer side,
// everything will remain type-safe.
const reducer: Reducer<HeroesState, ApiActionTypes> = (state = initialState, action: ApiActionTypes) => {
    switch (action.type) {
        case ApiActions.SEND_HTTP_REQUEST: {
            return {
                ...state,
                loading: true,
            };
        }
        case ApiActions.SEND_GRAPHQL_QUERY: {
            return {
                ...state,
                loading: true,
            };
        }
        default: {
            return state;
        }
    }
};

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
export { reducer as heroesReducer };