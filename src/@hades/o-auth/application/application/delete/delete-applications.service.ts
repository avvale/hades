import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { IApplicationRepository } from './../../domain/application.repository';
import { AddApplicationsContextEvent } from './../events/add-applications-context.event';

@Injectable()
export class DeleteApplicationsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IApplicationRepository,
    ) {}

    public async main(queryStatement?: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>
    {
        // get object to delete
        const applications = await this.repository.get(queryStatement, constraint, cQMetadata);

        await this.repository.delete(queryStatement, constraint, cQMetadata);

        // create AddApplicationsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const applicationsRegistered = this.publisher.mergeObjectContext(new AddApplicationsContextEvent(applications));

        applicationsRegistered.deleted(); // apply event to model events
        applicationsRegistered.commit(); // commit all events of model
    }
}