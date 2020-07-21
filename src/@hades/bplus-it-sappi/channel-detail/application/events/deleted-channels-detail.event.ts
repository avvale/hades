import { DeletedChannelDetailEvent } from './deleted-channel-detail.event';

export class DeletedChannelsDetailEvent
{
    constructor(
        public readonly channelsDetail: DeletedChannelDetailEvent[],
    ) {}
}