import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { RoleId } from './../../domain/value-objects';
import { IRoleRepository } from './../../domain/role.repository';

@Injectable()
export class DeleteRoleByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IRoleRepository,
    ) {}

    public async main(id: RoleId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>
    {
        // get object to delete
        const role = await this.repository.findById(id, constraint, cQMetadata);

        await this.repository.deleteById(id, constraint, cQMetadata);

        // insert EventBus in object, to be able to apply and commit events
        const roleRegister = this.publisher.mergeObjectContext(role);

        roleRegister.deleted(role); // apply event to model events
        roleRegister.commit(); // commit all events of model
    }
}