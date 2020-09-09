import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { IApplicationRepository } from './../../domain/application.repository';
import { AddApplicationsContextEvent } from './../events/add-applications-context.event';

@Injectable()
export class DeleteApplicationsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IApplicationRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[]): Promise<void>
    {   
        // get object to delete
        const applications = await this.repository.get(queryStatements);

        await this.repository.delete(queryStatements);

        // create AddApplicationsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const applicationsRegistered = this.publisher.mergeObjectContext(new AddApplicationsContextEvent(applications));

        applicationsRegistered.deleted(); // apply event to model events
        applicationsRegistered.commit(); // commit all events of modelx
    }
}