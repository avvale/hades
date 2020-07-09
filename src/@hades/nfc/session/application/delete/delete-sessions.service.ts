import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { ISessionRepository } from './../../domain/session.repository';

@Injectable()
export class DeleteSessionsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ISessionRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[]): Promise<void>
    {   
        // get object to delete
        const sessions = await this.repository.get(queryStatements);

        await this.repository.delete(queryStatements);        

        // TODO a falta de definir eventos
        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        // const sessionsRegistered = this.publisher.mergeObjectContext(sessions);
        
        // sessionsRegistered.deleted(sessions); // apply event to model events
        // sessionsRegistered.commit(); // commit all events of model
    }
}