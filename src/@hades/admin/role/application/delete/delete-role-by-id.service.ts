import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { RoleId } from './../../domain/value-objects';
import { IRoleRepository } from './../../domain/role.repository';

@Injectable()
export class DeleteRoleByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IRoleRepository
    ) {}

    public async main(id: RoleId): Promise<void>
    {
        // get object to delete
        const role = await this.repository.findById(id);

        await this.repository.deleteById(id);

        // insert EventBus in object, to be able to apply and commit events
        const roleRegister = this.publisher.mergeObjectContext(role);
        
        roleRegister.deleted(role); // apply event to model events
        roleRegister.commit(); // commit all events of model
    }
}