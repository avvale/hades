import { CreatedMessageDetailEvent } from './created-message-detail.event';

export class CreatedMessagesDetailEvent
{
    constructor(
        public readonly messagesDetail: CreatedMessageDetailEvent[],
    ) {}
}