import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { ModuleId } from './../../domain/value-objects';
import { IModuleRepository } from './../../domain/module.repository';

@Injectable()
export class DeleteModuleByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IModuleRepository
    ) {}

    public async main(id: ModuleId): Promise<void>
    {
        // get object to delete
        const module = await this.repository.findById(id);

        await this.repository.deleteById(id);

        // insert EventBus in object, to be able to apply and commit events
        const moduleRegister = this.publisher.mergeObjectContext(module);
        
        moduleRegister.deleted(module); // apply event to model events
        moduleRegister.commit(); // commit all events of model
    }
}