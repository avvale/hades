import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { JobId } from './../../domain/value-objects';
import { IJobRepository } from './../../domain/job.repository';

@Injectable()
export class DeleteJobByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IJobRepository
    ) {}

    public async main(id: JobId): Promise<void>
    {
        // get object to delete
        const job = await this.repository.findById(id);

        await this.repository.deleteById(id);

        // insert EventBus in object, to be able to apply and commit events
        const jobRegister = this.publisher.mergeObjectContext(job);
        
        jobRegister.deleted(job); // apply event to model events
        jobRegister.commit(); // commit all events of model
    }
}