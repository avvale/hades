import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { JobOverviewId } from './../../domain/value-objects';
import { IJobOverviewRepository } from './../../domain/job-overview.repository';

@Injectable()
export class DeleteJobOverviewByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IJobOverviewRepository
    ) {}

    public async main(id: JobOverviewId): Promise<void>
    {
        // get object to delete
        const jobOverview = await this.repository.findById(id);

        await this.repository.deleteById(id);

        // insert EventBus in object, to be able to apply and commit events
        const jobOverviewRegister = this.publisher.mergeObjectContext(jobOverview);
        
        jobOverviewRegister.deleted(jobOverview); // apply event to model events
        jobOverviewRegister.commit(); // commit all events of model
    }
}