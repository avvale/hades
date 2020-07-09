import { AggregateRoot } from '@nestjs/cqrs';
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
import { CreatedSessionEvent } from './../application/events/created-session.event';
import { UpdatedSessionEvent } from './../application/events/updated-session.event';
import { DeletedSessionEvent } from './../application/events/deleted-session.event';
import { NfcTag } from '@hades/nfc/tag/domain/tag.aggregate';

export class NfcSession extends AggregateRoot
{
    id: SessionId;
    ip: SessionIp;
    tagId: SessionTagId;
    tag: NfcTag;
    uid: SessionUid;
    counter: SessionCounter;
    expiredAt: SessionExpiredAt;
    createdAt: SessionCreatedAt;
    updatedAt: SessionUpdatedAt;
    deletedAt: SessionDeletedAt;
    
    constructor(id?: SessionId, ip?: SessionIp, tagId?: SessionTagId, uid?: SessionUid, counter?: SessionCounter, expiredAt?: SessionExpiredAt, createdAt?: SessionCreatedAt, updatedAt?: SessionUpdatedAt, deletedAt?: SessionDeletedAt, )
    {
        super();
        
        this.id = id;
        this.ip = ip;
        this.tagId = tagId;
        this.uid = uid;
        this.counter = counter;
        this.expiredAt = expiredAt;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        
    }

    static register (id: SessionId, ip: SessionIp, tagId: SessionTagId, uid: SessionUid, counter: SessionCounter, expiredAt: SessionExpiredAt, createdAt: SessionCreatedAt, updatedAt: SessionUpdatedAt, deletedAt: SessionDeletedAt, ): NfcSession
    {
        return new NfcSession(id, ip, tagId, uid, counter, expiredAt, createdAt, updatedAt, deletedAt, );
    }

    created(session: NfcSession): void
    {
        this.apply(
            new CreatedSessionEvent(
                session.id.value,
                session.ip.value,
                session.tagId.value,
                session.uid.value,
                session.counter.value,
                session.expiredAt?.value,
                session.createdAt?.value,
                session.updatedAt?.value,
                session.deletedAt?.value,
                
            )
        );
    }

    updated(session: NfcSession): void
    {
        this.apply(
            new UpdatedSessionEvent(
                session.id.value,
                session.ip?.value,
                session.tagId?.value,
                session.uid?.value,
                session.counter?.value,
                session.expiredAt?.value,
                session.createdAt?.value,
                session.updatedAt?.value,
                session.deletedAt?.value,
                
            )
        );
    }

    deleted(session: NfcSession): void
    {
        this.apply(
            new DeletedSessionEvent(
                session.id.value,
                session.ip.value,
                session.tagId.value,
                session.uid.value,
                session.counter.value,
                session.expiredAt?.value,
                session.createdAt?.value,
                session.updatedAt?.value,
                session.deletedAt?.value,
                
            )
        );
    }

    toDTO(): Object
    {
        return {
            id: this.id.value,
            ip: this.ip.value,
            tagId: this.tagId.value,
            uid: this.uid.value,
            counter: this.counter.value,
            expiredAt: this.expiredAt?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
            
        }
    }
}
