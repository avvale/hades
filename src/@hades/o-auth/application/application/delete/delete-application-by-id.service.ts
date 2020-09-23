import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { ApplicationId } from './../../domain/value-objects';
import { IApplicationRepository } from './../../domain/application.repository';

@Injectable()
export class DeleteApplicationByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IApplicationRepository
    ) {}

    public async main(id: ApplicationId): Promise<void>
    {
        // get object to delete
        const application = await this.repository.findById(id);

        await this.repository.deleteById(id);

        // insert EventBus in object, to be able to apply and commit events
        const applicationRegister = this.publisher.mergeObjectContext(application);
        
        applicationRegister.deleted(application); // apply event to model events
        applicationRegister.commit(); // commit all events of model
    }
}