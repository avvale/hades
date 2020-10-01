import { DeletedMessageDetailEvent } from './deleted-message-detail.event';

export class DeletedMessagesDetailEvent
{
    constructor(
        public readonly messagesDetail: DeletedMessageDetailEvent[],
    ) {}
}