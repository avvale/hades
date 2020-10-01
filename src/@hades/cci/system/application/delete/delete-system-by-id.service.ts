import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { SystemId } from './../../domain/value-objects';
import { ISystemRepository } from './../../domain/system.repository';

@Injectable()
export class DeleteSystemByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ISystemRepository
    ) {}

    public async main(id: SystemId): Promise<void>
    {
        // get object to delete
        const system = await this.repository.findById(id);

        await this.repository.deleteById(id);

        // insert EventBus in object, to be able to apply and commit events
        const systemRegister = this.publisher.mergeObjectContext(system);
        
        systemRegister.deleted(system); // apply event to model events
        systemRegister.commit(); // commit all events of model
    }
}