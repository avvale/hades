import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedChannelsDetailEvent } from './deleted-channels-detail.event';

@EventsHandler(DeletedChannelsDetailEvent)
export class DeletedChannelsDetailEventHandler implements IEventHandler<DeletedChannelsDetailEvent>
{
    handle(event: DeletedChannelsDetailEvent)
    {
        // console.log('DeletedChannelsDetailEvent: ', event);
    }
}