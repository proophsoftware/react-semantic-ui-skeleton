import { action } from 'typesafe-actions';
import {NotificationModel} from "../model";
import {MESSAGE_HANDLED} from "./constants";

export const publishMessageHandled = (message: NotificationModel.Message) => action(MESSAGE_HANDLED, message);