import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Utils } from '@hades/shared/domain/lib/utils';
import { 
    ApplicationId,
    ApplicationName,
    ApplicationCode,
    ApplicationSecret,
    ApplicationIsMaster,
    ApplicationClientIds,
    ApplicationCreatedAt,
    ApplicationUpdatedAt,
    ApplicationDeletedAt
    
} from './../../domain/value-objects';
import { IApplicationRepository } from './../../domain/application.repository';
import { OAuthApplication } from './../../domain/application.aggregate';

@Injectable()
export class UpdateApplicationService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IApplicationRepository
    ) {}

    public async main(
        id: ApplicationId,
        name?: ApplicationName,
        code?: ApplicationCode,
        secret?: ApplicationSecret,
        isMaster?: ApplicationIsMaster,
        clientIds?: ApplicationClientIds,
        
    ): Promise<void>
    {        
        // create aggregate with factory pattern
        const application = OAuthApplication.register(
            id,
            name,
            code,
            secret,
            isMaster,
            clientIds,
            null,
            new ApplicationUpdatedAt(Utils.nowTimestamp()),
            null
        );
        
        // update
        await this.repository.update(application);        
            
        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const applicationRegister = this.publisher.mergeObjectContext(
            application
        );
        
        applicationRegister.updated(application); // apply event to model events
        applicationRegister.commit(); // commit all events of model
    }
}