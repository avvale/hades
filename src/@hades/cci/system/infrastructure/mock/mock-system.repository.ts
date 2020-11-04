import { Injectable} from '@nestjs/common';
import { MockRepository } from '@hades/shared/infrastructure/persistence/mock/mock.repository';
import { Utils } from '@hades/shared/domain/lib/utils';
import { ISystemRepository } from '@hades/cci/system/domain/system.repository';
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
} from '@hades/cci/system/domain/value-objects';
import { CciSystem } from './../../domain/system.aggregate';
import { systems } from './../seeds/system.seed';

@Injectable()
export class MockSystemRepository extends MockRepository<CciSystem> implements ISystemRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'CciSystem';
    public collectionSource: CciSystem[];
    public deletedAtInstance: SystemDeletedAt = new SystemDeletedAt(null);

    constructor()
    {
        super();
        this.createSourceMockData();
    }

    public reset()
    {
        this.createSourceMockData();
    }

    private createSourceMockData(): void
    {
        this.collectionSource = [];
        const now = Utils.nowTimestamp();

        for (const itemCollection of <any[]>systems)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(CciSystem.register(
                    new SystemId(itemCollection.id),
                    new SystemTenantId(itemCollection.tenantId),
                    new SystemTenantCode(itemCollection.tenantCode),
                    new SystemVersion(itemCollection.version),
                    new SystemName(itemCollection.name),
                    new SystemEnvironment(itemCollection.environment),
                    new SystemTechnology(itemCollection.technology),
                    new SystemIsActive(itemCollection.isActive),
                    new SystemCancelledAt(itemCollection.cancelledAt),
                    new SystemCreatedAt(itemCollection.createdAt),
                    new SystemUpdatedAt(itemCollection.updatedAt),
                    new SystemDeletedAt(itemCollection.deletedAt),
                ));
        }
    }
}