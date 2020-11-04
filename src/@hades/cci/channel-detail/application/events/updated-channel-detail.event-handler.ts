import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdatedChannelDetailEvent } from './updated-channel-detail.event';

@EventsHandler(UpdatedChannelDetailEvent)
export class UpdatedChannelDetailEventHandler implements IEventHandler<UpdatedChannelDetailEvent>
{
    handle(event: UpdatedChannelDetailEvent)
    {
        // console.log('UpdatedChannelDetailEvent: ', event);
    }
}