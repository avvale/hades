import { Injectable} from '@nestjs/common';
import { MockSeeder } from '@hades/shared/infrastructure/persistence/mock/mock.seeder';
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
import { CciSystem } from './../../domain/system.aggregate';
import { systems } from './../seeds/system.seed';

@Injectable()
export class MockSystemSeeder extends MockSeeder<CciSystem>
{
    public collectionSource: CciSystem[];

    constructor()
    {
        super();
        this._createMockDataLang();
    }

    private _createMockDataLang(): void
    {
        this.collectionSource = [];

        for (let system of systems)
        {
            this.collectionSource.push(
                CciSystem.register(
                    new SystemId(system.id),
                    new SystemTenantId(system.tenantId),
                    new SystemTenantCode(system.tenantCode),
                    new SystemVersion(system.version),
                    new SystemName(system.name),
                    new SystemEnvironment(system.environment),
                    new SystemTechnology(system.technology),
                    new SystemIsActive(system.isActive),
                    new SystemCancelledAt(system.cancelledAt),
                    new SystemCreatedAt({currentTimestamp: true}),
                    new SystemUpdatedAt({currentTimestamp: true}),
                    new SystemDeletedAt(null),
                )
            );
        }
    }
}