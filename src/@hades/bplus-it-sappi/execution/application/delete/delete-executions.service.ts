import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { IExecutionRepository } from './../../domain/execution.repository';

@Injectable()
export class DeleteExecutionsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IExecutionRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[]): Promise<void>
    {   
        // get object to delete
        const executions = await this.repository.get(queryStatements);

        await this.repository.delete(queryStatements);        

        // TODO a falta de definir eventos
        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        // const executionsRegistered = this.publisher.mergeObjectContext(executions);
        
        // executionsRegistered.deleted(executions); // apply event to model events
        // executionsRegistered.commit(); // commit all events of model
    }
}