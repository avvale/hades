import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedModuleEvent } from './created-module.event';

@EventsHandler(CreatedModuleEvent)
export class CreatedModuleEventHandler implements IEventHandler<CreatedModuleEvent>
{
    handle(event: CreatedModuleEvent) 
    {
        // console.log('CreatedModuleEvent: ', event);
    }
}