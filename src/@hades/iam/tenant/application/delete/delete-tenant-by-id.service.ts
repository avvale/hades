import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { TenantId } from './../../domain/value-objects';
import { ITenantRepository } from './../../domain/tenant.repository';

@Injectable()
export class DeleteTenantByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ITenantRepository,
    ) {}

    public async main(id: TenantId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>
    {
        // get object to delete
        const tenant = await this.repository.findById(id, constraint, cQMetadata);

        await this.repository.deleteById(id, constraint, cQMetadata);

        // insert EventBus in object, to be able to apply and commit events
        const tenantRegister = this.publisher.mergeObjectContext(tenant);

        tenantRegister.deleted(tenant); // apply event to model events
        tenantRegister.commit(); // commit all events of model
    }
}