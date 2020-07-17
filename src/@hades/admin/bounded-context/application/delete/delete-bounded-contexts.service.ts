import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { IBoundedContextRepository } from './../../domain/bounded-context.repository';

@Injectable()
export class DeleteBoundedContextsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IBoundedContextRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[]): Promise<void>
    {   
        // get object to delete
        const boundedContexts = await this.repository.get(queryStatements);

        await this.repository.delete(queryStatements);        

        // TODO a falta de definir eventos
        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        // const boundedContextsRegistered = this.publisher.mergeObjectContext(boundedContexts);
        
        // boundedContextsRegistered.deleted(boundedContexts); // apply event to model events
        // boundedContextsRegistered.commit(); // commit all events of model
    }
}