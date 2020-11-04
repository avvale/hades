import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { JobOverviewId } from './../../domain/value-objects';
import { IJobOverviewRepository } from './../../domain/job-overview.repository';

@Injectable()
export class DeleteJobOverviewByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IJobOverviewRepository,
    ) {}

    public async main(id: JobOverviewId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>
    {
        // get object to delete
        const jobOverview = await this.repository.findById(id, constraint, cQMetadata);

        await this.repository.deleteById(id, constraint, cQMetadata);

        // insert EventBus in object, to be able to apply and commit events
        const jobOverviewRegister = this.publisher.mergeObjectContext(jobOverview);

        jobOverviewRegister.deleted(jobOverview); // apply event to model events
        jobOverviewRegister.commit(); // commit all events of model
    }
}