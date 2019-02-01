import { List } from 'immutable';
import * as React from 'react';
import { WithNamespaces } from 'react-i18next';
import { toast, ToastContainer } from 'react-toastify';
import { Command, Event } from '../actions';
import { NotificationModel } from '../model';

import 'react-toastify/dist/ReactToastify.css';


// Separate state props + dispatch props to their own interfaces.
interface PropsFromState {
    messages: List<NotificationModel.Message>
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface PropsFromDispatch {
    sendNotify: typeof Command.info,
    onHandled: typeof Event.publishMessageHandled,
}

interface OwnProps {
    maxMessages?: number
}

export interface NotificiationsProps extends PropsFromState, PropsFromDispatch, OwnProps {
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

export const Notifications = (props: NotificiationsProps) =>
    <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
;