import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InsertSessionsCommand } from './insert-sessions.command';
import { InsertSessionsService } from './insert-sessions.service';
import { 
    SessionId, 
    SessionIp, 
    SessionTagId, 
    SessionUid, 
    SessionCounter, 
    SessionExpiredAt
    
} from './../../domain/value-objects';

@CommandHandler(InsertSessionsCommand)
export class InsertSessionsCommandHandler implements ICommandHandler<InsertSessionsCommand>
{
    constructor(
        private readonly insertSessionsService: InsertSessionsService
    ) { }

    async execute(command: InsertSessionsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.insertSessionsService.main(
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