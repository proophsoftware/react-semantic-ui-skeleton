import { fromJS, List } from 'immutable';
import * as React from 'react';
import { withNamespaces, WithNamespaces } from 'react-i18next';
import { toast, ToastContainer } from 'react-toastify';
import { notify } from '../actions/commands';
import { NotificationModel } from '../model';

import 'react-toastify/dist/ReactToastify.css';
import { compose, mapProps, withState } from 'recompose';
import { createSelector } from 'reselect';
import { Icon, Message as UiMessage } from 'semantic-ui-react';
import { ApplicationState } from '../../reducer';
import { Message     } from '../model/NotificationMessage';
import { NotificationSystemState } from '../reducers';
import { initialState, MessagesState } from '../reducers/applyNotify';


// Separate state props + dispatch props to their own interfaces.
interface PropsFromState {
    messages: List<NotificationModel.Message>
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface PropsFromDispatch {
    onMessageShown: typeof notify
}

interface OwnProps {
    maxMessages?: number
}

export interface TodosListProps extends PropsFromState, OwnProps {
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState &
    PropsFromDispatch &
    // ConnectedReduxProps &
    OwnProps &
    WithNamespaces


const options = {
    // onOpen: (props:any) => console.log({props}),
    // onClose: (props:any) => console.log({props}),
    autoClose: 6000,
    type: toast.TYPE.INFO,
    hideProgressBar: false,
    position: toast.POSITION.BOTTOM_LEFT,
    pauseOnHover: true,
    // progress: 0.2
};

// const sendNotify = () =>  toast(() => <div>Functional swag 😎</div>);;
const sendNotify = () =>  toast(<div><h2>title</h2>test</div>, options);


export const Notifications = ({messages, maxMessages}: TodosListProps) =>
    <div>
        <button onClick={sendNotify}>Notify !</button>
        <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
    </div>
;


export const getMessageMap = (state: ApplicationState): NotificationSystemState => state.notificationSystem;

// Only recalculates when the posts.data object changes
export const getMessages =
    createSelector<ApplicationState, NotificationSystemState, MessagesState>(
        getMessageMap,
        (state: NotificationSystemState) => {
            if (!state) {
                const tmp = new Message(
                    {
                        message: 'test',
                        title: 'titel'
                    }
                );

                // console.log('erstellt');
                // return fromJS([tmp]);
                return List<NotificationModel.Message>([tmp]);
                // return initialState;
            }
            return state.messages;
        },
    )
;
