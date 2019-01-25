import { List } from 'immutable';
import * as React from 'react';
import { withNamespaces, WithNamespaces } from 'react-i18next';
import { notify } from '../actions/commands';
import { NotificationModel } from '../model';
import { toast, ToastContainer } from 'react-toastify';

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

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState &
    PropsFromDispatch &
    // ConnectedReduxProps &
    OwnProps &
    WithNamespaces

class Notifications extends React.Component<AllProps> {

    public prepareMsg = (msg: NotificationModel.Message, count: number) => {
        if (this.props.maxMessages && count >= this.props.maxMessages) {
            return;
        }

        const notification = msg.toJS();
        // notification.onRemove = () => {
        //     this.props.onMessageShown(msg.markAsHandled());
        // };
        toast(notification.message, {type: notification.level, onClose: () => this.props.onMessageShown(msg.markAsHandled()) });
    };

    public componentDidMount() {
        let count = 0;
        this.props.messages.filter(msg => !msg.handled)
            .forEach((msg) => {
                this.prepareMsg(msg, count);
                count++;
            });
    }

    public componentWillReceiveProps(nextProps: PropsFromState) {
        let count = 0;
        nextProps.messages.filter(msg => !msg.handled)
            .forEach((msg) => {
                this.prepareMsg(msg, count);
                count++;
            });
    }

    public render() {
        return <ToastContainer/>;
    }
}

export default withNamespaces()(Notifications);