import { IMapper } from '@hades/shared/domain/lib/mapper';
import { MapperOptions, ObjectLiteral } from '@hades/shared/domain/lib/hades.types';
import { OAuthApplication } from './application.aggregate';
import { ApplicationResponse } from './application.response';
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



export class ApplicationMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true }
    ) {}
    
    /**
     * Map object to aggregate
     * @param application
     */
    mapModelToAggregate(application: ObjectLiteral): OAuthApplication
    {
        if (!application) return;

        return this.makeAggregate(application);
    }

    /**
     * Map array of objects to array aggregates
     * @param applications 
     */
    mapModelsToAggregates(applications: ObjectLiteral[]): OAuthApplication[]
    {
        if (!Array.isArray(applications)) return;
        
        return applications.map(application  => this.makeAggregate(application));
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
        if (!Array.isArray(applications)) return;

        return applications.map(application => this.makeResponse(application));
    }

    private makeAggregate(application: ObjectLiteral): OAuthApplication
    {
        return OAuthApplication.register(
            new ApplicationId(application.id),
            new ApplicationName(application.name),
            new ApplicationCode(application.code),
            new ApplicationSecret(application.secret),
            new ApplicationIsMaster(application.isMaster),
            new ApplicationCreatedAt(application.createdAt),
            new ApplicationUpdatedAt(application.updatedAt),
            new ApplicationDeletedAt(application.deletedAt),
            
            
            
            
        );
    }

    private makeResponse(application: OAuthApplication): ApplicationResponse
    {
        if (!application) return;
        
        return new ApplicationResponse(
            application.id.value,
            application.name.value,
            application.code.value,
            application.secret.value,
            application.isMaster.value,
            application.createdAt.value,
            application.updatedAt.value,
            application.deletedAt.value,
            
            
            
            
        );
    }
}