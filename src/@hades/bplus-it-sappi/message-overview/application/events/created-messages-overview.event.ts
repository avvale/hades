import { CreatedMessageOverviewEvent } from './created-message-overview.event';

export class CreatedMessagesOverviewEvent
{
    constructor(
        public readonly messagesOverview: CreatedMessageOverviewEvent[],
    ) {}
}