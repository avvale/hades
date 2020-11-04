import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { IExecutionRepository } from './../../domain/execution.repository';
import { AddExecutionsContextEvent } from './../events/add-executions-context.event';

@Injectable()
export class DeleteExecutionsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IExecutionRepository,
    ) {}

    public async main(queryStatement?: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>
    {
        // get object to delete
        const executions = await this.repository.get(queryStatement, constraint, cQMetadata);

        await this.repository.delete(queryStatement, constraint, cQMetadata);

        // create AddExecutionsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const executionsRegistered = this.publisher.mergeObjectContext(new AddExecutionsContextEvent(executions));

        executionsRegistered.deleted(); // apply event to model events
        executionsRegistered.commit(); // commit all events of model
    }
}