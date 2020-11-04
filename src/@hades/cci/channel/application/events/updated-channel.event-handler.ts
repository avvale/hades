import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdatedChannelEvent } from './updated-channel.event';

@EventsHandler(UpdatedChannelEvent)
export class UpdatedChannelEventHandler implements IEventHandler<UpdatedChannelEvent>
{
    handle(event: UpdatedChannelEvent)
    {
        // console.log('UpdatedChannelEvent: ', event);
    }
}