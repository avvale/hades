import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { FlowId } from './../../domain/value-objects';
import { IFlowRepository } from './../../domain/flow.repository';

@Injectable()
export class DeleteFlowByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IFlowRepository,
    ) {}

    public async main(id: FlowId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>
    {
        // get object to delete
        const flow = await this.repository.findById(id, constraint, cQMetadata);

        await this.repository.deleteById(id, constraint, cQMetadata);

        // insert EventBus in object, to be able to apply and commit events
        const flowRegister = this.publisher.mergeObjectContext(flow);

        flowRegister.deleted(flow); // apply event to model events
        flowRegister.commit(); // commit all events of model
    }
}