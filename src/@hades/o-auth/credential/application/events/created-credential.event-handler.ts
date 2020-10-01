import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedCredentialEvent } from './created-credential.event';

@EventsHandler(CreatedCredentialEvent)
export class CreatedCredentialEventHandler implements IEventHandler<CreatedCredentialEvent>
{
    handle(event: CreatedCredentialEvent) 
    {
        // console.log('CreatedCredentialEvent: ', event);
    }
}