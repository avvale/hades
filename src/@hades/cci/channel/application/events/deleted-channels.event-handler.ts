import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedChannelsEvent } from './deleted-channels.event';

@EventsHandler(DeletedChannelsEvent)
export class DeletedChannelsEventHandler implements IEventHandler<DeletedChannelsEvent>
{
    handle(event: DeletedChannelsEvent)
    {
        // console.log('DeletedChannelsEvent: ', event);
    }
}