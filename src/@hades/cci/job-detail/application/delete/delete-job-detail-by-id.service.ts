import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { JobDetailId } from './../../domain/value-objects';
import { IJobDetailRepository } from './../../domain/job-detail.repository';

@Injectable()
export class DeleteJobDetailByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IJobDetailRepository,
    ) {}

    public async main(id: JobDetailId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>
    {
        // get object to delete
        const jobDetail = await this.repository.findById(id, constraint, cQMetadata);

        await this.repository.deleteById(id, constraint, cQMetadata);

        // insert EventBus in object, to be able to apply and commit events
        const jobDetailRegister = this.publisher.mergeObjectContext(jobDetail);

        jobDetailRegister.deleted(jobDetail); // apply event to model events
        jobDetailRegister.commit(); // commit all events of model
    }
}