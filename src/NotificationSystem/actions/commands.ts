import { action } from 'typesafe-actions';
import {NotificationModel} from "../model";

export interface Notify {
    message: NotificationModel.Message
}

export enum NotificationSystemActions {
    NOTIFY = '@@NotificationSystem/Notify',
}

export interface NotifyAction extends Notify{
    type: NotificationSystemActions.NOTIFY,
}

export type NotificationSystemActionTypes = NotifyAction;


export const notify = (message: NotificationModel.Message  ) => action<string, NotificationModel.Message>(NotificationSystemActions.NOTIFY, message);

export const info =  (title: string, message: string, autoDismiss = 5 ) => {
    const msg = new NotificationModel.Message({
            title,
            message,
            level: "info",
            autoDismiss,
        });

    return action<string, NotificationModel.Message>(NotificationSystemActions.NOTIFY, msg);
};

export const error =  (title: string, message: string ) => {
    const msg = new NotificationModel.Message({
            title,
            message,
            level: "error",
            autoDismiss: 0,
        });

    return action<string, NotificationModel.Message>(NotificationSystemActions.NOTIFY, msg);
};
