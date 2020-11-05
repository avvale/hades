import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { ApplicationId } from './../../domain/value-objects';
import { IApplicationRepository } from './../../domain/application.repository';

@Injectable()
export class DeleteApplicationByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IApplicationRepository,
    ) {}

    public async main(id: ApplicationId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>
    {
        // get object to delete
        const application = await this.repository.findById(id, constraint, cQMetadata);

        await this.repository.deleteById(id, constraint, cQMetadata);

        // insert EventBus in object, to be able to apply and commit events
        const applicationRegister = this.publisher.mergeObjectContext(application);

        applicationRegister.deleted(application); // apply event to model events
        applicationRegister.commit(); // commit all events of model
    }
}