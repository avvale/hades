import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedChannelEvent } from './deleted-channel.event';

@EventsHandler(DeletedChannelEvent)
export class DeletedChannelEventHandler implements IEventHandler<DeletedChannelEvent>
{
    handle(event: DeletedChannelEvent)
    {
        // console.log('DeletedChannelEvent: ', event);
    }
}