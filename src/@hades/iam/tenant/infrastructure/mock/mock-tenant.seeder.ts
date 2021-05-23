import { Injectable} from '@nestjs/common';
import { MockSeeder } from '@hades/shared/infrastructure/persistence/mock/mock.seeder';
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
import { IamTenant } from './../../domain/tenant.aggregate';
import { tenants } from './../seeds/tenant.seed';

@Injectable()
export class MockTenantSeeder extends MockSeeder<IamTenant>
{
    public collectionSource: IamTenant[];

    constructor()
    {
        super();
        this._createMockDataLang();
    }

    private _createMockDataLang(): void
    {
        this.collectionSource = [];

        for (let tenant of tenants)
        {
            this.collectionSource.push(
                IamTenant.register(
                    new TenantId(tenant.id),
                    new TenantName(tenant.name),
                    new TenantCode(tenant.code),
                    new TenantLogo(tenant.logo),
                    new TenantIsActive(tenant.isActive),
                    new TenantData(tenant.data),
                    new TenantAccountIds(tenant.accountIds),
                    new TenantCreatedAt({currentTimestamp: true}),
                    new TenantUpdatedAt({currentTimestamp: true}),
                    new TenantDeletedAt(null),
                )
            );
        }
    }
}