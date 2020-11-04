import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
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
export class CreateSystemService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ISystemRepository,
    ) {}

    public async main(
        payload: {
            id: SystemId,
            tenantId: SystemTenantId,
            tenantCode: SystemTenantCode,
            version: SystemVersion,
            name: SystemName,
            environment: SystemEnvironment,
            technology: SystemTechnology,
            isActive: SystemIsActive,
            cancelledAt: SystemCancelledAt,
        },
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
            new SystemCreatedAt({currentTimestamp: true}),
            new SystemUpdatedAt({currentTimestamp: true}),
            null
        );

        // create
        await this.repository.create(system);

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const systemRegister = this.publisher.mergeObjectContext(
            system
        );

        systemRegister.created(system); // apply event to model events
        systemRegister.commit(); // commit all events of model
    }
}