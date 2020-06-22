import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { TenantId } from './../../domain/value-objects';
import { ITenantRepository } from './../../domain/tenant.repository';

@Injectable()
export class DeleteTenantByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ITenantRepository
    ) {}

    public async main(id: TenantId): Promise<void>
    {
        // get object to delete
        const tenant = await this.repository.findById(id);

        await this.repository.deleteById(id);

        // insert EventBus in object, to be able to apply and commit events
        const tenantRegister = this.publisher.mergeObjectContext(tenant);
        
        tenantRegister.deleted(tenant); // apply event to model events
        tenantRegister.commit(); // commit all events of model
    }
}