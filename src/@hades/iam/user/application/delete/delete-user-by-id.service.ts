import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { UserId } from './../../domain/value-objects';
import { IUserRepository } from './../../domain/user.repository';

@Injectable()
export class DeleteUserByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IUserRepository,
    ) {}

    public async main(id: UserId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>
    {
        // get object to delete
        const user = await this.repository.findById(id, constraint, cQMetadata);

        await this.repository.deleteById(id, constraint, cQMetadata);

        // insert EventBus in object, to be able to apply and commit events
        const userRegister = this.publisher.mergeObjectContext(user);

        userRegister.deleted(user); // apply event to model events
        userRegister.commit(); // commit all events of model
    }
}