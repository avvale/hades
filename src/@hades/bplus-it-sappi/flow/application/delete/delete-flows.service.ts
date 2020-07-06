import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { IFlowRepository } from './../../domain/flow.repository';

@Injectable()
export class DeleteFlowsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IFlowRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[]): Promise<void>
    {   
        // get object to delete
        const flows = await this.repository.get(queryStatements);

        await this.repository.delete(queryStatements);        

        // TODO a falta de definir eventos
        // insert EventBus in object, to be able to apply and commit events
        // const flowsRegistered = this.publisher.mergeObjectContext(flows);
        
        // flowsRegistered.deleted(flows); // apply event to model events
        // flowsRegistered.commit(); // commit all events of model
    }
}