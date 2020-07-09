import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Utils } from '@hades/shared/domain/lib/utils';
import { 
    SessionId, 
    SessionIp, 
    SessionTagId, 
    SessionUid, 
    SessionCounter, 
    SessionExpiredAt, 
    SessionCreatedAt, 
    SessionUpdatedAt, 
    SessionDeletedAt
    
} from './../../domain/value-objects';
import { ISessionRepository } from './../../domain/session.repository';
import { NfcSession } from './../../domain/session.aggregate';

@Injectable()
export class InsertSessionsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ISessionRepository
    ) {}

    public async main(
        sessions: {
            id: SessionId,
            ip: SessionIp,
            tagId: SessionTagId,
            uid: SessionUid,
            counter: SessionCounter,
            expiredAt: SessionExpiredAt,
            
        } []
    ): Promise<void>
    {
        // create object with factory pattern
        const aggregateSessions = sessions.map(session => NfcSession.register(
            session.id,
            session.ip,
            session.tagId,
            session.uid,
            session.counter,
            session.expiredAt,
            new SessionCreatedAt(Utils.nowTimestamp()),
            new SessionUpdatedAt(Utils.nowTimestamp()),
            null
        ));
        
        // insert
        await this.repository.insert(aggregateSessions);

        // TODO a falta de definir eventos
        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        // const sessionsRegistered = this.publisher.mergeObjectContext(
        //     await this.repository.findById(id) // there may be cases where the database object is direct to the command, for example in the update, only one field can be updated
        // );
        // 
        // sessionsRegistered.created(sessions); // apply event to model events
        // sessionsRegistered.commit(); // commit all events of model
    }
}