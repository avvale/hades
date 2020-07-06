import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedResourceEvent } from './deleted-resource.event';

@EventsHandler(DeletedResourceEvent)
export class DeletedResourceEventHandler implements IEventHandler<DeletedResourceEvent>
{
    handle(event: DeletedResourceEvent) 
    {
        // console.log('DeletedResourceEvent: ', event);
    }
}