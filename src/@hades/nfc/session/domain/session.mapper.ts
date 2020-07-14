import { IMapper } from '@hades/shared/domain/lib/mapper';
import { ObjectLiteral } from '@hades/shared/domain/lib/object-literal';
import { NfcSession } from './session.aggregate';
import { SessionResponse } from './session.response';
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
    
} from './value-objects';

export class SessionMapper implements IMapper
{
    /**
     * Map object to aggregate
     * @param session
     */
    mapObjectToAggregate(session: ObjectLiteral): NfcSession
    {
        return this.makeAggregate(session);
    }

    /**
     * Map array of objects to array aggregates
     * @param sessions 
     */
    mapObjectsToAggregates(sessions: ObjectLiteral[]): NfcSession[]
    {
        return sessions.map(session  => this.makeAggregate(session ));
    }

    /**
     * Map aggregate to response
     * @param session 
     */
    mapAggregateToResponse(session: NfcSession): SessionResponse
    {
        return this.makeResponse(session);
    }

    /**
     * Map array of aggregates to array responses
     * @param sessions
     */
    mapAggregatesToResponses(sessions: NfcSession[]): SessionResponse[]
    {
        return sessions.map(session => this.makeResponse(session));
    }

    private makeAggregate(session: ObjectLiteral): NfcSession
    {
        return NfcSession.register(
            new SessionId(session.id),
            new SessionIp(session.ip),
            new SessionTagId(session.tagId),
            new SessionUid(session.uid),
            new SessionCounter(session.counter),
            new SessionExpiredAt(session.expiredAt),
            new SessionCreatedAt(session.createdAt),
            new SessionUpdatedAt(session.updatedAt),
            new SessionDeletedAt(session.deletedAt),
              
        );
    }

    private makeResponse(session: NfcSession): SessionResponse
    {
        return new SessionResponse(
            session.id.value,
            session.ip.value,
            session.tagId.value,
            session.uid.value,
            session.counter.value,
            session.expiredAt.value,
            session.createdAt.value,
            session.updatedAt.value,
            session.deletedAt.value,
            
        );
    }
}