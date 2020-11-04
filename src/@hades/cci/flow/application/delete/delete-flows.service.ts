import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { IFlowRepository } from './../../domain/flow.repository';
import { AddFlowsContextEvent } from './../events/add-flows-context.event';

@Injectable()
export class DeleteFlowsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IFlowRepository,
    ) {}

    public async main(queryStatement?: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>
    {
        // get object to delete
        const flows = await this.repository.get(queryStatement, constraint, cQMetadata);

        await this.repository.delete(queryStatement, constraint, cQMetadata);

        // create AddFlowsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const flowsRegistered = this.publisher.mergeObjectContext(new AddFlowsContextEvent(flows));

        flowsRegistered.deleted(); // apply event to model events
        flowsRegistered.commit(); // commit all events of model
    }
}