import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { bindActionCreators, Dispatch } from 'redux';
import { ApplicationState, ConnectedReduxProps } from '../../reducer';
import { Command } from '../actions';
import { getMessages, Notifications, TodosListProps } from '../components/Notifications';
import { toast } from 'react-toastify';
import { Message } from '../model/NotificationMessage';

// It's usually good practice to only include one context at a time in a connected component.
// Although if necessary, you can always include multiple contexts. Just make sure to
// separate them from each other to prevent prop conflicts.
const mapStateToProps = (state: ApplicationState) => ({
    messages: getMessages(state)
});

// mapDispatchToProps is especially useful for constraining our actions to the connected component.
// You can access these via `this.props`.
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(
    {
        onMessageShown: Command.notify,
    },
    dispatch,
);

// Now let's connect our component!
// With redux v4's improved typings, we can finally omit generics here.
// export default connect(
//     mapStateToProps,
//     mapDispatchToProps,
// )(Notifications);

export default compose<TodosListProps, any>(
    connect(mapStateToProps, mapDispatchToProps),
    lifecycle({
        componentDidMount() {
            const { messages } =
                this.props as TodosListProps;

            if (!messages) {
                return;
            }

            messages.filter((value?: Message) => {
                if (!value) {
                    return false;
                }
                return !value.handled;
            })
                .forEach((msg?: Message) => {
                    if (!msg) {
                        return;
                    }
                    toast(msg.message, {type: msg.level, onClose: () => console.log(msg.markAsHandled())} );
                });
        },
    }),
)(Notifications);