import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { UserId } from './../../domain/value-objects';
import { IUserRepository } from './../../domain/user.repository';

@Injectable()
export class DeleteUserByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IUserRepository
    ) {}

    public async main(id: UserId): Promise<void>
    {
        // get object to delete
        const user = await this.repository.findById(id);

        await this.repository.deleteById(id);

        // insert EventBus in object, to be able to apply and commit events
        const userRegister = this.publisher.mergeObjectContext(user);
        
        userRegister.deleted(user); // apply event to model events
        userRegister.commit(); // commit all events of model
    }
}