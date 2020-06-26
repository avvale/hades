import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { ISystemRepository } from './../../domain/system.repository';

@Injectable()
export class DeleteSystemsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ISystemRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[]): Promise<void>
    {   
        // get object to delete
        const systems = await this.repository.get(queryStatements);

        await this.repository.delete(queryStatements);        

        // TODO a falta de definir eventos
        // insert EventBus in object, to be able to apply and commit events
        // const systemsRegistered = this.publisher.mergeObjectContext(systems);
        
        // systemsRegistered.deleted(systems); // apply event to model events
        // systemsRegistered.commit(); // commit all events of model
    }
}