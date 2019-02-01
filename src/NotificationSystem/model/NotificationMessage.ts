import { Record } from 'immutable';
import * as uuid from 'uuid';

export interface NotificationActionType {
    label: string,
    callback: () => void
}

export interface MessageProps {
    title?: string,
    message: string,
    level?: 'success' | 'error' | 'warning' | 'info',
    position?: 'tr' | 'tl' | 'tc' | 'br' | 'bl' | 'bc',
    autoDismiss?: number,
    dismissible?: boolean,
    handled?: boolean,
    uid?: string,
    action?: NotificationActionType | null,
}

const defaultMessageProps: MessageProps = {
    title: '',
    message: '',
    level: 'info',
    position: 'bl',
    autoDismiss: 5,
    dismissible: true,
    handled: false,
    uid: undefined,
    action: null,
};

// export class Message implements MessageProps {
//     public readonly title!: string;
//     public readonly message!: string;
//     public readonly level!: 'success' | 'error' | 'warning' | 'info';
//     public readonly position!: 'tr' | 'tl' | 'tc' | 'br' | 'bl' | 'bc';
//     public readonly autoDismiss!: number;
//     public readonly dismissible!: boolean;
//     public readonly handled!: boolean;
//     public readonly uid!: string;
//     public readonly action!: NotificationActionType | null;
//
//
//     public constructor(data: Partial<MessageProps>) {
//         Object.assign(this, data);
//     }
//
//     public markAsHandled(): Message {
//         // return this.set('handled', true) as Message;
//         return this;
//     }
//
//     public hasAction(): boolean {
//         return null !== this.action;
//     }
//
// }
//
export class Message extends Record(defaultMessageProps) implements MessageProps {

    public constructor(data: Partial<MessageProps>) {
        if (data.uid === undefined) {
            data.uid = uuid.v4();
        }
        super(data);
    }

    public markAsHandled(): Message {
        return this.set('handled', true) as Message;
    }

    public hasAction(): boolean {
        return null !== this.action;
    }

}
