import { AggregateRoot } from '@nestjs/cqrs';
import { NfcSession } from './../../domain/session.aggregate';
import { CreatedSessionEvent } from './created-session.event';
import { DeletedSessionEvent } from './deleted-session.event';
import { CreatedSessionsEvent } from './created-sessions.event';
import { DeletedSessionsEvent } from './deleted-sessions.event';

export class AddSessionsContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: NfcSession[] = []
    ) {
        super();
    }

    *[Symbol.iterator]()
    { 
        for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot; 
    }

    created()
    {
        this.apply(
            new CreatedSessionsEvent(
                this.aggregateRoots.map(session => 
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
                )
            )
        );
    }

    deleted()
    {
        this.apply(
            new DeletedSessionsEvent(
                this.aggregateRoots.map(session => 
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
                )
            )
        );
    }   
}