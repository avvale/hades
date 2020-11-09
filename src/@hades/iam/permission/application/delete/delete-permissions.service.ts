import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { IPermissionRepository } from './../../domain/permission.repository';
import { AddPermissionsContextEvent } from './../events/add-permissions-context.event';

@Injectable()
export class DeletePermissionsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IPermissionRepository,
    ) {}

    public async main(queryStatement?: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>
    {
        // get object to delete
        const permissions = await this.repository.get(queryStatement, constraint, cQMetadata);

        await this.repository.delete(queryStatement, constraint, cQMetadata);

        // create AddPermissionsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const permissionsRegistered = this.publisher.mergeObjectContext(new AddPermissionsContextEvent(permissions));

        permissionsRegistered.deleted(); // apply event to model events
        permissionsRegistered.commit(); // commit all events of model
    }
}