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
import { AddSessionsContextEvent } from './../events/add-sessions-context.event';

@Injectable()
export class CreateSessionsService
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

        // create AddSessionsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const sessionsRegistered = this.publisher.mergeObjectContext(new AddSessionsContextEvent(aggregateSessions));
 
        sessionsRegistered.created(); // apply event to model events
        sessionsRegistered.commit(); // commit all events of model
    }
}