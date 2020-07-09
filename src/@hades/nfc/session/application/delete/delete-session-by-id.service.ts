import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { SessionId } from './../../domain/value-objects';
import { ISessionRepository } from './../../domain/session.repository';

@Injectable()
export class DeleteSessionByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ISessionRepository
    ) {}

    public async main(id: SessionId): Promise<void>
    {
        // get object to delete
        const session = await this.repository.findById(id);

        await this.repository.deleteById(id);

        // insert EventBus in object, to be able to apply and commit events
        const sessionRegister = this.publisher.mergeObjectContext(session);
        
        sessionRegister.deleted(session); // apply event to model events
        sessionRegister.commit(); // commit all events of model
    }
}