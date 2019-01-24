import { fromJS, Map } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { Action, AnyAction, Dispatch } from 'redux';
// import notificationsReducer, {PATH_NOTIFICATIONS, iNITIAL_STATE as INITIAL_NOTIFICATIONS_STATE} from "./NotificationSystem/reducers";
// import { Command as NotificationsCommand } from "./NotificationSystem/actions";


// The top-level state object
export interface ApplicationState {
}

// Additional props for connected React components. This prop is passed by default with `connect()`
export interface ConnectedReduxProps<A extends Action = AnyAction> {
    dispatch: Dispatch<A>
}

// Whenever an action is dispatched, Redux will update each top-level application state property
// using the reducer with the matching name. It's important that the names match exactly, and that
// the reducer acts on the corresponding ApplicationState property type.
export const rootReducer = combineReducers<ApplicationState>({});