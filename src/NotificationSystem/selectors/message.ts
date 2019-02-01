import { List } from 'immutable';
import { createSelector } from 'reselect';
import { MessagesState } from '../reducers/applyNotify';
import { NotificationModel } from '../model';
import { ApplicationState } from '../../reducer';


// export const getSelectedEventId = (state: ApplicationState, props: { selectedEventId: string | null }): string | null => {
//     return props.selectedEventId;
// };
// export const eventStreamSelector = (state: MessagesState, props: any): any => state.getIn(['sapImportStream', 'stream']);
//
// // noinspection TypeScriptValidateTypes
// export const selectedEventSelector = createSelector<ApplicationState>(
//     getSelectedEventId,
//     eventStreamSelector,
//     (selectedEventId: string | null, eventStream: List<NotificationModel.Message>): NotificationModel.Message | null => {
//         if (!selectedEventId) {
//             return null;
//         }
//
//         if (!eventStream) {
//             return null;
//         }
//
//         const message = eventStream.find((event: NotificationModel.Message) => event.uid.toString() === selectedEventId);
//
//         return message || null;
//     }
// );
