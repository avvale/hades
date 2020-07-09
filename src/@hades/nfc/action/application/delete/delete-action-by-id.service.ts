import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { ActionId } from './../../domain/value-objects';
import { IActionRepository } from './../../domain/action.repository';

@Injectable()
export class DeleteActionByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IActionRepository
    ) {}

    public async main(id: ActionId): Promise<void>
    {
        // get object to delete
        const action = await this.repository.findById(id);

        await this.repository.deleteById(id);

        // insert EventBus in object, to be able to apply and commit events
        const actionRegister = this.publisher.mergeObjectContext(action);
        
        actionRegister.deleted(action); // apply event to model events
        actionRegister.commit(); // commit all events of model
    }
}