import { fromJS, List } from 'immutable';
import { NotificationModel } from '../model';
import { Reducer } from 'redux';
import { NotificationSystemActions, NotificationSystemActionTypes } from '../actions/commands';

export interface MessagesState extends List<NotificationModel.Message> {
}

// Type-safe initialState!
export const initialState: MessagesState = List<NotificationModel.Message>();

// Thanks to Redux 4's much simpler typings, we can take away a lot of typings on the reducer side,
// everything will remain type-safe.
const reducer: Reducer<MessagesState, NotificationSystemActionTypes> = (state = initialState, action: NotificationSystemActionTypes) => {
    switch (action.type) {
        case NotificationSystemActions.NOTIFY: {
            const idx = state.findIndex(lMsg => lMsg.uid === action.message.uid);

            if (idx > -1) {
                if (action.message.handled) {
                    state = state.remove(idx);
                } else {
                    state = state.set(idx, action.message);
                }
            } else {
                state = state.push(action.message);
            }
            return state;
        }
        default:
            return state;
    }
};

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
export { reducer as applyReducer };