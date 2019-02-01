import {List} from "immutable";
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { compose, lifecycle } from 'recompose';
import { bindActionCreators, Dispatch } from 'redux';
import { Command, Event } from '../actions';
import { Notifications, NotificiationsProps } from '../components/Notifications';
import { NotificationModel } from '../model';
import { makeMapStateTopPropsNotifications } from "../selectors/message";

// It's usually good practice to only include one context at a time in a connected component.
// Although if necessary, you can always include multiple contexts. Just make sure to
// separate them from each other to prevent prop conflicts.
const mapStateToProps = makeMapStateTopPropsNotifications();

// mapDispatchToProps is especially useful for constraining our actions to the connected component.
// You can access these via `this.props`.
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(
    {
        sendNotify: Command.info,
        onHandled: Event.publishMessageHandled
    },
    dispatch,
);

// Now let's connect our component!
// With redux v4's improved typings, we can finally omit generics here.
// export default connect(
//     mapStateToProps,
//     mapDispatchToProps,
// )(Notifications);

const showUnhandledMessages = (messages: List<NotificationModel.Message>, onHandled: (msg: NotificationModel.Message) => void) => {
    messages.filter((value?: NotificationModel.Message) => {
        if (!value) {
            return false;
        }
        return !value.handled;
    })
        .forEach((msg?: NotificationModel.Message) => {
            if (!msg) {
                return;
            }
            toast(msg.message, {type: msg.level, onClose: () => onHandled(msg.markAsHandled())} );
        });
};

export default compose<NotificiationsProps, any>(
    connect(mapStateToProps, mapDispatchToProps),
    lifecycle({
        componentDidMount() {
            const { messages, onHandled } =
                this.props as NotificiationsProps;

            if (!messages) {
                return;
            }

            showUnhandledMessages(messages, onHandled);
        },
        componentDidUpdate() {
            const { messages, onHandled } =
                this.props as NotificiationsProps;

            if (!messages) {
                return;
            }

            showUnhandledMessages(messages, onHandled);
        }
    }),
)(Notifications);