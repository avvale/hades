import { CreatedChannelDetailEvent } from './created-channel-detail.event';

export class CreatedChannelsDetailEvent
{
    constructor(
        public readonly channelsDetail: CreatedChannelDetailEvent[],
    ) {}
}