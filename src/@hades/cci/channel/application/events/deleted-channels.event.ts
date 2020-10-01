import { DeletedChannelEvent } from './deleted-channel.event';

export class DeletedChannelsEvent
{
    constructor(
        public readonly channels: DeletedChannelEvent[],
    ) {}
}