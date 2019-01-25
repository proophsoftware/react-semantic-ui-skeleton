import {Record} from 'immutable';
import * as uuid from 'uuid';

export interface NotificationActionType {
    label: string,
    callback: () => void
}

export interface MessageProps {
    title?: string | null,
    message?: string | null,
    level?: "success" | "error" | "warning" | "info",
    position?: "tr" | "tl" | "tc" | "br" | "bl" | "bc",
    autoDismiss?: number,
    dismissible?: boolean,
    handled?: boolean,
    uid?: string,
    action?: NotificationActionType | null,
}

const defaultMessageProps: MessageProps = {
    title: null,
    message: null,
    level: "info",
    position: "bl",
    autoDismiss: 5,
    dismissible: true,
    handled: false,
    uid: uuid.v4(),
    action: null,
};

export class Message extends Record(defaultMessageProps) implements MessageProps{
    public readonly title?: string | null;
    public readonly message?: string | null;
    public readonly level?: "success" | "error" | "warning" | "info";
    public readonly position?: "tr" | "tl" | "tc" | "br" | "bl" | "bc";
    public readonly autoDismiss!: number;
    public readonly dismissible!: boolean;
    public readonly handled!: boolean;
    public readonly uid?: string;
    public readonly action?: NotificationActionType | null;

    public constructor(data?: Partial<MessageProps>) {
        data ? super(data) : super()
    }

    public markAsHandled(): Message {
        return this.set("handled", true) as Message;
    }

    public hasAction(): boolean {
        return null !== this.action;
    }

}