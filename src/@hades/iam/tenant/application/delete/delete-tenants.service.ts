import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { ITenantRepository } from './../../domain/tenant.repository';
import { AddTenantsContextEvent } from './../events/add-tenants-context.event';

@Injectable()
export class DeleteTenantsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ITenantRepository
    ) {}

    public async main(queryStatement?: QueryStatement): Promise<void>
    {   
        // get object to delete
        const tenants = await this.repository.get(queryStatement);

        await this.repository.delete(queryStatement);

        // create AddTenantsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const tenantsRegistered = this.publisher.mergeObjectContext(new AddTenantsContextEvent(tenants));

        tenantsRegistered.deleted(); // apply event to model events
        tenantsRegistered.commit(); // commit all events of model
    }
}