import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { PermissionId } from './../../domain/value-objects';
import { IPermissionRepository } from './../../domain/permission.repository';

@Injectable()
export class DeletePermissionByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IPermissionRepository,
    ) {}

    public async main(id: PermissionId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>
    {
        // get object to delete
        const permission = await this.repository.findById(id, constraint, cQMetadata);

        await this.repository.deleteById(id, constraint, cQMetadata);

        // insert EventBus in object, to be able to apply and commit events
        const permissionRegister = this.publisher.mergeObjectContext(permission);

        permissionRegister.deleted(permission); // apply event to model events
        permissionRegister.commit(); // commit all events of model
    }
}