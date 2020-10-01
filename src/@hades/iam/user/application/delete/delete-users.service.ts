import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { IUserRepository } from './../../domain/user.repository';
import { AddUsersContextEvent } from './../events/add-users-context.event';

@Injectable()
export class DeleteUsersService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IUserRepository
    ) {}

    public async main(queryStatement?: QueryStatement): Promise<void>
    {   
        // get object to delete
        const users = await this.repository.get(queryStatement);

        await this.repository.delete(queryStatement);

        // create AddUsersContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const usersRegistered = this.publisher.mergeObjectContext(new AddUsersContextEvent(users));

        usersRegistered.deleted(); // apply event to model events
        usersRegistered.commit(); // commit all events of model
    }
}