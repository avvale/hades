import { AggregateRoot } from '@nestjs/cqrs';
import { 
    ApplicationId, 
    ApplicationCode, 
    ApplicationSecret, 
    ApplicationName, 
    ApplicationCreatedAt, 
    ApplicationUpdatedAt, 
    ApplicationDeletedAt
    
} from './value-objects';
import { CreatedApplicationEvent } from './../application/events/created-application.event';
import { UpdatedApplicationEvent } from './../application/events/updated-application.event';
import { DeletedApplicationEvent } from './../application/events/deleted-application.event';

export class OAuthApplication extends AggregateRoot
{
    id: ApplicationId;
    code: ApplicationCode;
    secret: ApplicationSecret;
    name: ApplicationName;
    createdAt: ApplicationCreatedAt;
    updatedAt: ApplicationUpdatedAt;
    deletedAt: ApplicationDeletedAt;
    
    constructor(id?: ApplicationId, code?: ApplicationCode, secret?: ApplicationSecret, name?: ApplicationName, createdAt?: ApplicationCreatedAt, updatedAt?: ApplicationUpdatedAt, deletedAt?: ApplicationDeletedAt, )
    {
        super();
        
        this.id = id;
        this.code = code;
        this.secret = secret;
        this.name = name;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        
    }

    static register (id: ApplicationId, code: ApplicationCode, secret: ApplicationSecret, name: ApplicationName, createdAt: ApplicationCreatedAt, updatedAt: ApplicationUpdatedAt, deletedAt: ApplicationDeletedAt, ): OAuthApplication
    {
        return new OAuthApplication(id, code, secret, name, createdAt, updatedAt, deletedAt, );
    }

    created(application: OAuthApplication): void
    {
        this.apply(
            new CreatedApplicationEvent(
                application.id.value,
                application.code.value,
                application.secret.value,
                application.name.value,
                application.createdAt?.value,
                application.updatedAt?.value,
                application.deletedAt?.value,
                
            )
        );
    }

    updated(application: OAuthApplication): void
    {
        this.apply(
            new UpdatedApplicationEvent(
                application.id.value,
                application.code?.value,
                application.secret?.value,
                application.name?.value,
                application.createdAt?.value,
                application.updatedAt?.value,
                application.deletedAt?.value,
                
            )
        );
    }

    deleted(application: OAuthApplication): void
    {
        this.apply(
            new DeletedApplicationEvent(
                application.id.value,
                application.code.value,
                application.secret.value,
                application.name.value,
                application.createdAt?.value,
                application.updatedAt?.value,
                application.deletedAt?.value,
                
            )
        );
    }

    toDTO(): Object
    {
        return {
            id: this.id.value,
            code: this.code.value,
            secret: this.secret.value,
            name: this.name.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
            
        }
    }
}
