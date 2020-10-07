import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { IRoleRepository } from './../../domain/role.repository';
import { AddRolesContextEvent } from './../events/add-roles-context.event';

@Injectable()
export class DeleteRolesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IRoleRepository
    ) {}

    public async main(queryStatement?: QueryStatement): Promise<void>
    {   
        // get object to delete
        const roles = await this.repository.get(queryStatement);

        await this.repository.delete(queryStatement);

        // create AddRolesContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const rolesRegistered = this.publisher.mergeObjectContext(new AddRolesContextEvent(roles));

        rolesRegistered.deleted(); // apply event to model events
        rolesRegistered.commit(); // commit all events of model
    }
}