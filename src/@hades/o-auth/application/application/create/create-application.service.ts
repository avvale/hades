import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import {
    ApplicationId,
    ApplicationName,
    ApplicationCode,
    ApplicationSecret,
    ApplicationIsMaster,
    ApplicationClientIds,
    ApplicationCreatedAt,
    ApplicationUpdatedAt,
    ApplicationDeletedAt,
} from './../../domain/value-objects';
import { IApplicationRepository } from './../../domain/application.repository';
import { OAuthApplication } from './../../domain/application.aggregate';

@Injectable()
export class CreateApplicationService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IApplicationRepository,
    ) {}

    public async main(
        payload: {
            id: ApplicationId,
            name: ApplicationName,
            code: ApplicationCode,
            secret: ApplicationSecret,
            isMaster: ApplicationIsMaster,
            clientIds: ApplicationClientIds,
        }
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const application = OAuthApplication.register(
            payload.id,
            payload.name,
            payload.code,
            payload.secret,
            payload.isMaster,
            payload.clientIds,
            new ApplicationCreatedAt({currentTimestamp: true}),
            new ApplicationUpdatedAt({currentTimestamp: true}),
            null
        );

        // create
        await this.repository.create(application);

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const applicationRegister = this.publisher.mergeObjectContext(
            application
        );

        applicationRegister.created(application); // apply event to model events
        applicationRegister.commit(); // commit all events of model
    }
}