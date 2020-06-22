import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { ITenantRepository } from './../../domain/tenant.repository';

@Injectable()
export class DeleteTenantsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ITenantRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[]): Promise<void>
    {   
        // get object to delete
        const tenants = await this.repository.get(queryStatements);

        await this.repository.delete(queryStatements);        

        // TODO a falta de definir eventos
        // insert EventBus in object, to be able to apply and commit events
        // const tenantsRegistered = this.publisher.mergeObjectContext(tenants);
        
        // tenantsRegistered.deleted(tenants); // apply event to model events
        // tenantsRegistered.commit(); // commit all events of model
    }
}