import { AggregateRoot } from '@nestjs/cqrs';
import { 
    ApplicationId, 
    ApplicationName, 
    ApplicationCode, 
    ApplicationSecret, 
    ApplicationIsMaster, 
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
    name: ApplicationName;
    code: ApplicationCode;
    secret: ApplicationSecret;
    isMaster: ApplicationIsMaster;
    createdAt: ApplicationCreatedAt;
    updatedAt: ApplicationUpdatedAt;
    deletedAt: ApplicationDeletedAt;
    
    constructor(id?: ApplicationId, name?: ApplicationName, code?: ApplicationCode, secret?: ApplicationSecret, isMaster?: ApplicationIsMaster, createdAt?: ApplicationCreatedAt, updatedAt?: ApplicationUpdatedAt, deletedAt?: ApplicationDeletedAt, )
    {
        super();
        
        this.id = id;
        this.name = name;
        this.code = code;
        this.secret = secret;
        this.isMaster = isMaster;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        
    }

    static register (id: ApplicationId, name: ApplicationName, code: ApplicationCode, secret: ApplicationSecret, isMaster: ApplicationIsMaster, createdAt: ApplicationCreatedAt, updatedAt: ApplicationUpdatedAt, deletedAt: ApplicationDeletedAt, ): OAuthApplication
    {
        return new OAuthApplication(id, name, code, secret, isMaster, createdAt, updatedAt, deletedAt, );
    }

    created(application: OAuthApplication): void
    {
        this.apply(
            new CreatedApplicationEvent(
                application.id.value,
                application.name.value,
                application.code.value,
                application.secret.value,
                application.isMaster.value,
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
                application.name?.value,
                application.code?.value,
                application.secret?.value,
                application.isMaster?.value,
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
                application.name.value,
                application.code.value,
                application.secret.value,
                application.isMaster.value,
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
            name: this.name.value,
            code: this.code.value,
            secret: this.secret.value,
            isMaster: this.isMaster.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
            
        }
    }
}
