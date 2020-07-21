import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedResourcesEvent } from './deleted-resources.event';

@EventsHandler(DeletedResourcesEvent)
export class DeletedResourcesEventHandler implements IEventHandler<DeletedResourcesEvent>
{
    handle(event: DeletedResourcesEvent) 
    {
        // console.log('DeletedResourcesEvent: ', event);
    }
}