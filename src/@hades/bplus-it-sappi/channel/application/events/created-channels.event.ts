import { CreatedChannelEvent } from './created-channel.event';

export class CreatedChannelsEvent
{
    constructor(
        public readonly channels: CreatedChannelEvent[],
    ) {}
}