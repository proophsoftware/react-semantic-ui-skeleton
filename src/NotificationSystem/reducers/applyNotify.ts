import { List } from 'immutable';
import { Reducer } from 'redux';
import {MESSAGE_HANDLED, NOTIFY} from "../actions/constants";
import { NotificationModel } from '../model';
import {NotificationsAction} from "./index";

export interface MessagesState extends List<NotificationModel.Message> {
}

// Type-safe initialState!
export const initialState: MessagesState = List<NotificationModel.Message>();


// Thanks to Redux 4's much simpler typings, we can take away a lot of typings on the reducer side,
// everything will remain type-safe.
const reducer: Reducer<MessagesState, NotificationsAction> = (state: MessagesState = initialState, action: NotificationsAction): MessagesState => {
    switch (action.type) {
        case NOTIFY:
        case MESSAGE_HANDLED:
            const idx = state.findIndex(lMsg => lMsg.uid === action.payload.uid);

            if (idx > -1) {
                if (action.payload.handled) {
                    state = state.remove(idx);
                } else {
                    state = state.set(idx, action.payload);
                }
            } else {
                state = state.push(action.payload);
            }
            return state;
        default:
            return state;
    }
};

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
export { reducer as applyReducer };
