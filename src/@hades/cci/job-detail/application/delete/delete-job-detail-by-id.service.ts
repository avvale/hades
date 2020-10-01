import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { JobDetailId } from './../../domain/value-objects';
import { IJobDetailRepository } from './../../domain/job-detail.repository';

@Injectable()
export class DeleteJobDetailByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IJobDetailRepository
    ) {}

    public async main(id: JobDetailId): Promise<void>
    {
        // get object to delete
        const jobDetail = await this.repository.findById(id);

        await this.repository.deleteById(id);

        // insert EventBus in object, to be able to apply and commit events
        const jobDetailRegister = this.publisher.mergeObjectContext(jobDetail);
        
        jobDetailRegister.deleted(jobDetail); // apply event to model events
        jobDetailRegister.commit(); // commit all events of model
    }
}