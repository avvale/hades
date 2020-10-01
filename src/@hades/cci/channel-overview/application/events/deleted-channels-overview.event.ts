import { DeletedChannelOverviewEvent } from './deleted-channel-overview.event';

export class DeletedChannelsOverviewEvent
{
    constructor(
        public readonly channelsOverview: DeletedChannelOverviewEvent[],
    ) {}
}