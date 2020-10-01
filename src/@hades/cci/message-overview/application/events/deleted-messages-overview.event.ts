import { DeletedMessageOverviewEvent } from './deleted-message-overview.event';

export class DeletedMessagesOverviewEvent
{
    constructor(
        public readonly messagesOverview: DeletedMessageOverviewEvent[],
    ) {}
}