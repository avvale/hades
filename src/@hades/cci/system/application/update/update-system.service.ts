import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import {
    SystemId,
    SystemTenantId,
    SystemTenantCode,
    SystemVersion,
    SystemName,
    SystemEnvironment,
    SystemTechnology,
    SystemIsActive,
    SystemCancelledAt,
    SystemCreatedAt,
    SystemUpdatedAt,
    SystemDeletedAt,
} from './../../domain/value-objects';
import { ISystemRepository } from './../../domain/system.repository';
import { CciSystem } from './../../domain/system.aggregate';

@Injectable()
export class UpdateSystemService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ISystemRepository,
    ) {}

    public async main(
        payload: {
            id: SystemId,
            tenantId?: SystemTenantId,
            tenantCode?: SystemTenantCode,
            version?: SystemVersion,
            name?: SystemName,
            environment?: SystemEnvironment,
            technology?: SystemTechnology,
            isActive?: SystemIsActive,
            cancelledAt?: SystemCancelledAt,
        },
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const system = CciSystem.register(
            payload.id,
            payload.tenantId,
            payload.tenantCode,
            payload.version,
            payload.name,
            payload.environment,
            payload.technology,
            payload.isActive,
            payload.cancelledAt,
            null,
            new SystemUpdatedAt({currentTimestamp: true}),
            null
        );

        // update
        await this.repository.update(system, constraint, cQMetadata);

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const systemRegister = this.publisher.mergeObjectContext(
            system
        );

        systemRegister.updated(system); // apply event to model events
        systemRegister.commit(); // commit all events of model
    }
}