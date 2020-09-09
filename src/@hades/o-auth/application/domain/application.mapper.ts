import { IMapper } from '@hades/shared/domain/lib/mapper';
import { ObjectLiteral } from '@hades/shared/domain/lib/object-literal';
import { OAuthApplication } from './application.aggregate';
import { ApplicationResponse } from './application.response';
import { 
    ApplicationId, 
    ApplicationCode, 
    ApplicationSecret, 
    ApplicationName, 
    ApplicationCreatedAt, 
    ApplicationUpdatedAt, 
    ApplicationDeletedAt
    
} from './value-objects';

export class ApplicationMapper implements IMapper
{
    /**
     * Map object to aggregate
     * @param application
     */
    mapObjectToAggregate(application: ObjectLiteral): OAuthApplication
    {
        return this.makeAggregate(application);
    }

    /**
     * Map array of objects to array aggregates
     * @param applications 
     */
    mapObjectsToAggregates(applications: ObjectLiteral[]): OAuthApplication[]
    {
        return applications.map(application  => this.makeAggregate(application ));
    }

    /**
     * Map aggregate to response
     * @param application 
     */
    mapAggregateToResponse(application: OAuthApplication): ApplicationResponse
    {
        return this.makeResponse(application);
    }

    /**
     * Map array of aggregates to array responses
     * @param applications
     */
    mapAggregatesToResponses(applications: OAuthApplication[]): ApplicationResponse[]
    {
        return applications.map(application => this.makeResponse(application));
    }

    private makeAggregate(application: ObjectLiteral): OAuthApplication
    {
        return OAuthApplication.register(
            new ApplicationId(application.id),
            new ApplicationCode(application.code),
            new ApplicationSecret(application.secret),
            new ApplicationName(application.name),
            new ApplicationCreatedAt(application.createdAt),
            new ApplicationUpdatedAt(application.updatedAt),
            new ApplicationDeletedAt(application.deletedAt),
              
        );
    }

    private makeResponse(application: OAuthApplication): ApplicationResponse
    {
        return new ApplicationResponse(
            application.id.value,
            application.code.value,
            application.secret.value,
            application.name.value,
            application.createdAt.value,
            application.updatedAt.value,
            application.deletedAt.value,
            
        );
    }
}