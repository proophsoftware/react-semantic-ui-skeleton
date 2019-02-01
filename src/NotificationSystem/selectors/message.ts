import {fromJS, List} from 'immutable';
import { createSelector } from 'reselect';
import { ApplicationState } from '../../reducer';
import { NotificationModel } from '../model';

export const notificationsSelector = (state: any, props: any) => state.getIn(['notificationSystem', 'messages'], fromJS([]));

export const makeGetNotifications = (): (state: ApplicationState, props: any) => List<NotificationModel.Message> => {
    return createSelector(
        [notificationsSelector] as any,
        (messages: List<NotificationModel.Message>): List<NotificationModel.Message> => messages
    )
}

export const makeMapStateTopPropsNotifications = () => {
    const getNotifications = makeGetNotifications();

    return (state: ApplicationState, props: any) => {
        const messages = getNotifications(state, props);

        return {
            messages,
        }
    }
}
