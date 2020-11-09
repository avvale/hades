import { IMapper } from '@hades/shared/domain/lib/mapper';
import { MapperOptions, ObjectLiteral, CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { OAuthApplication } from './application.aggregate';
import { ApplicationResponse } from './application.response';
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
} from './value-objects';
import { ClientMapper } from '@hades/o-auth/client/domain/client.mapper';

export class ApplicationMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param application
     */
    mapModelToAggregate(application: ObjectLiteral, cQMetadata?: CQMetadata): OAuthApplication
    {
        if (!application) return;

        return this.makeAggregate(application, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param applications
     */
    mapModelsToAggregates(applications: ObjectLiteral[], cQMetadata?: CQMetadata): OAuthApplication[]
    {
        if (!Array.isArray(applications)) return;

        return applications.map(application  => this.makeAggregate(application, cQMetadata));
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

    private makeAggregate(application: ObjectLiteral, cQMetadata?: CQMetadata): OAuthApplication
    {
        return OAuthApplication.register(
            new ApplicationId(application.id),
            new ApplicationName(application.name),
            new ApplicationCode(application.code),
            new ApplicationSecret(application.secret),
            new ApplicationIsMaster(application.isMaster),
            new ApplicationClientIds(application.clientIds),
            new ApplicationCreatedAt(application.createdAt, {}, {addTimezone: cQMetadata?.timezone}),
            new ApplicationUpdatedAt(application.updatedAt, {}, {addTimezone: cQMetadata?.timezone}),
            new ApplicationDeletedAt(application.deletedAt, {}, {addTimezone: cQMetadata?.timezone}),
            this.options.eagerLoading ? new ClientMapper({ eagerLoading: false }).mapModelsToAggregates(application.clients) : undefined,
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
            application.clientIds.value,
            application.createdAt.value,
            application.updatedAt.value,
            application.deletedAt.value,
            this.options.eagerLoading ? new ClientMapper({ eagerLoading: false }).mapAggregatesToResponses(application.clients) : undefined,
        );
    }
}