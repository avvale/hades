import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateSessionsCommand } from './create-sessions.command';
import { CreateSessionsService } from './create-sessions.service';
import { 
    SessionId, 
    SessionIp, 
    SessionTagId, 
    SessionUid, 
    SessionCounter, 
    SessionExpiredAt
    
} from './../../domain/value-objects';

@CommandHandler(CreateSessionsCommand)
export class CreateSessionsCommandHandler implements ICommandHandler<CreateSessionsCommand>
{
    constructor(
        private readonly createSessionsService: CreateSessionsService
    ) { }

    async execute(command: CreateSessionsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createSessionsService.main(
            command.sessions
                .map(session => { 
                    return {
                        id: new SessionId(session.id),
                        ip: new SessionIp(session.ip),
                        tagId: new SessionTagId(session.tagId),
                        uid: new SessionUid(session.uid),
                        counter: new SessionCounter(session.counter),
                        expiredAt: new SessionExpiredAt(session.expiredAt),
                        
                    }
                })
        );
    }
}