import { SequelizeMapper } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.mapper';
import { ObjectLiteral } from '@hades/shared/domain/lib/object-literal';
import { NfcSession } from './../../domain/session.aggregate';
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

export class SequelizeSessionMapper implements SequelizeMapper
{
    mapToAggregate(session: ObjectLiteral | ObjectLiteral[]): NfcSession | NfcSession[]
    {
        if (Array.isArray(session))
        {
            return session.map(item => NfcSession.register(
                    new SessionId(item.id),
                    new SessionIp(item.ip),
                    new SessionTagId(item.tagId),
                    new SessionUid(item.uid),
                    new SessionCounter(item.counter),
                    new SessionExpiredAt(item.expiredAt),
                    new SessionCreatedAt(item.createdAt),
                    new SessionUpdatedAt(item.updatedAt),
                    new SessionDeletedAt(item.deletedAt),
                    
                )
            );
        }
        
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
}