import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateSessionCommand } from './update-session.command';
import { UpdateSessionService } from './update-session.service';
import { 
    SessionId, 
    SessionIp, 
    SessionTagId, 
    SessionUid, 
    SessionCounter, 
    SessionExpiredAt
    
} from './../../domain/value-objects';

@CommandHandler(UpdateSessionCommand)
export class UpdateSessionCommandHandler implements ICommandHandler<UpdateSessionCommand>
{
    constructor(
        private readonly updateSessionService: UpdateSessionService
    ) { }

    async execute(command: UpdateSessionCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateSessionService.main(
            new SessionId(command.id),
            new SessionIp(command.ip, { undefinable: true }),
            new SessionTagId(command.tagId, { undefinable: true }),
            new SessionUid(command.uid, { undefinable: true }),
            new SessionCounter(command.counter, { undefinable: true }),
            new SessionExpiredAt(command.expiredAt),
            
        )
    }
}