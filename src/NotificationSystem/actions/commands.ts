import { action } from 'typesafe-actions';
import {NotificationModel} from "../model";
import { NOTIFY } from "./constants";

export const notify = (message: NotificationModel.Message  ) => action(NOTIFY, message);

export const info =  (title: string, message: string, autoDismiss = 5 ) => {
    const msg = new NotificationModel.Message({
            title,
            message,
            level: "info",
            autoDismiss,
        });

    return action(NOTIFY, msg);
};

export const error =  (title: string, message: string ) => {
    const msg = new NotificationModel.Message({
            title,
            message,
            level: "error",
            autoDismiss: 0,
        });

    return action(NOTIFY, msg);
};
