import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Utils } from '@hades/shared/domain/lib/utils';
import { 
    ApplicationId, 
    ApplicationName, 
    ApplicationCode, 
    ApplicationSecret, 
    ApplicationIsMaster, 
    ApplicationCreatedAt, 
    ApplicationUpdatedAt, 
    ApplicationDeletedAt
    
} from './../../domain/value-objects';
import { IApplicationRepository } from './../../domain/application.repository';
import { OAuthApplication } from './../../domain/application.aggregate';
import { AddApplicationsContextEvent } from './../events/add-applications-context.event';

@Injectable()
export class CreateApplicationsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IApplicationRepository
    ) {}

    public async main(
        applications: {
            id: ApplicationId,
            name: ApplicationName,
            code: ApplicationCode,
            secret: ApplicationSecret,
            isMaster: ApplicationIsMaster,
            
        } []
    ): Promise<void>
    {
        // create object with factory pattern
        const aggregateApplications = applications.map(application => OAuthApplication.register(
            application.id,
            application.name,
            application.code,
            application.secret,
            application.isMaster,
            new ApplicationCreatedAt(Utils.nowTimestamp()),
            new ApplicationUpdatedAt(Utils.nowTimestamp()),
            null
        ));
        
        // insert
        await this.repository.insert(aggregateApplications);

        // create AddApplicationsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const applicationsRegistered = this.publisher.mergeObjectContext(new AddApplicationsContextEvent(aggregateApplications));
 
        applicationsRegistered.created(); // apply event to model events
        applicationsRegistered.commit(); // commit all events of model
    }
}