import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { ExecutionId } from './../../domain/value-objects';
import { IExecutionRepository } from './../../domain/execution.repository';

@Injectable()
export class DeleteExecutionByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IExecutionRepository
    ) {}

    public async main(id: ExecutionId): Promise<void>
    {
        // get object to delete
        const execution = await this.repository.findById(id);

        await this.repository.deleteById(id);

        // insert EventBus in object, to be able to apply and commit events
        const executionRegister = this.publisher.mergeObjectContext(execution);
        
        executionRegister.deleted(execution); // apply event to model events
        executionRegister.commit(); // commit all events of model
    }
}