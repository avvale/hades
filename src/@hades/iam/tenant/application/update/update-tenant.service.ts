import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import {
    TenantId,
    TenantName,
    TenantCode,
    TenantLogo,
    TenantIsActive,
    TenantData,
    TenantAccountIds,
    TenantCreatedAt,
    TenantUpdatedAt,
    TenantDeletedAt,
} from './../../domain/value-objects';
import { ITenantRepository } from './../../domain/tenant.repository';
import { IamTenant } from './../../domain/tenant.aggregate';

@Injectable()
export class UpdateTenantService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ITenantRepository,
    ) {}

    public async main(
        payload: {
            id: TenantId,
            name?: TenantName,
            code?: TenantCode,
            logo?: TenantLogo,
            isActive?: TenantIsActive,
            data?: TenantData,
            accountIds?: TenantAccountIds,
        },
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const tenant = IamTenant.register(
            payload.id,
            payload.name,
            payload.code,
            payload.logo,
            payload.isActive,
            payload.data,
            payload.accountIds,
            null,
            new TenantUpdatedAt({currentTimestamp: true}),
            null
        );

        // update
        await this.repository.update(tenant, constraint, cQMetadata);

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const tenantRegister = this.publisher.mergeObjectContext(
            tenant
        );

        tenantRegister.updated(tenant); // apply event to model events
        tenantRegister.commit(); // commit all events of model
    }
}