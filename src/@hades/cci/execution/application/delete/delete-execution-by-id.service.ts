import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { ExecutionId } from './../../domain/value-objects';
import { IExecutionRepository } from './../../domain/execution.repository';

@Injectable()
export class DeleteExecutionByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IExecutionRepository,
    ) {}

    public async main(id: ExecutionId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>
    {
        // get object to delete
        const execution = await this.repository.findById(id, constraint, cQMetadata);

        await this.repository.deleteById(id, constraint, cQMetadata);

        // insert EventBus in object, to be able to apply and commit events
        const executionRegister = this.publisher.mergeObjectContext(execution);

        executionRegister.deleted(execution); // apply event to model events
        executionRegister.commit(); // commit all events of model
    }
}