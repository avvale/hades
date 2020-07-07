import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { FlowId } from './../../domain/value-objects';
import { IFlowRepository } from './../../domain/flow.repository';

@Injectable()
export class DeleteFlowByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IFlowRepository
    ) {}

    public async main(id: FlowId): Promise<void>
    {
        // get object to delete
        const flow = await this.repository.findById(id);

        await this.repository.deleteById(id);

        // insert EventBus in object, to be able to apply and commit events
        const flowRegister = this.publisher.mergeObjectContext(flow);
        
        flowRegister.deleted(flow); // apply event to model events
        flowRegister.commit(); // commit all events of model
    }
}