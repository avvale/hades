import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedApplicationsEvent } from './deleted-applications.event';

@EventsHandler(DeletedApplicationsEvent)
export class DeletedApplicationsEventHandler implements IEventHandler<DeletedApplicationsEvent>
{
    handle(event: DeletedApplicationsEvent) 
    {
        // console.log('DeletedApplicationsEvent: ', event);
    }
}