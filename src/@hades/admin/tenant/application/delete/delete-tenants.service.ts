import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { ITenantRepository } from './../../domain/tenant.repository';
import { AddTenantsContextEvent } from './../events/add-tenants-context.event';

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

        // create AddTenantsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const tenantsRegistered = this.publisher.mergeObjectContext(new AddTenantsContextEvent(tenants));

        tenantsRegistered.deleted(); // apply event to model events
        tenantsRegistered.commit(); // commit all events of modelx
    }
}