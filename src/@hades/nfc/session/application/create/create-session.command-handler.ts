import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateSessionCommand } from './create-session.command';
import { CreateSessionService } from './create-session.service';
import { 
    SessionId, 
    SessionIp, 
    SessionTagId, 
    SessionUid, 
    SessionCounter, 
    SessionExpiredAt
    
} from './../../domain/value-objects';

@CommandHandler(CreateSessionCommand)
export class CreateSessionCommandHandler implements ICommandHandler<CreateSessionCommand>
{
    constructor(
        private readonly createSessionService: CreateSessionService
    ) { }

    async execute(command: CreateSessionCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createSessionService.main(
            new SessionId(command.id),
            new SessionIp(command.ip),
            new SessionTagId(command.tagId),
            new SessionUid(command.uid),
            new SessionCounter(command.counter),
            new SessionExpiredAt(command.expiredAt),
            
        );
    }
}