import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { IActionRepository } from './../../domain/action.repository';

@Injectable()
export class DeleteActionsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IActionRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[]): Promise<void>
    {   
        // get object to delete
        const actions = await this.repository.get(queryStatements);

        await this.repository.delete(queryStatements);        

        // TODO a falta de definir eventos
        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        // const actionsRegistered = this.publisher.mergeObjectContext(actions);
        
        // actionsRegistered.deleted(actions); // apply event to model events
        // actionsRegistered.commit(); // commit all events of model
    }
}