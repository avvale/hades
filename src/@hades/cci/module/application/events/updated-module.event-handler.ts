import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdatedModuleEvent } from './updated-module.event';

@EventsHandler(UpdatedModuleEvent)
export class UpdatedModuleEventHandler implements IEventHandler<UpdatedModuleEvent>
{
    handle(event: UpdatedModuleEvent)
    {
        // console.log('UpdatedModuleEvent: ', event);
    }
}