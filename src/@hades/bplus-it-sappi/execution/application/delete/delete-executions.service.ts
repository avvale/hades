import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { IExecutionRepository } from './../../domain/execution.repository';
import { AddExecutionsContextEvent } from './../events/add-executions-context.event';

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

        // create AddExecutionsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const executionsRegistered = this.publisher.mergeObjectContext(new AddExecutionsContextEvent(executions));

        executionsRegistered.deleted(); // apply event to model events
        executionsRegistered.commit(); // commit all events of modelx
    }
}