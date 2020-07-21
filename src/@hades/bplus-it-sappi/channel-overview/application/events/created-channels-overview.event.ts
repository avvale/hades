import { CreatedChannelOverviewEvent } from './created-channel-overview.event';

export class CreatedChannelsOverviewEvent
{
    constructor(
        public readonly channelsOverview: CreatedChannelOverviewEvent[],
    ) {}
}