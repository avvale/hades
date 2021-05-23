import { Injectable} from '@nestjs/common';
import { MockSeeder } from '@hades/shared/infrastructure/persistence/mock/mock.seeder';
import {
    DataLakeId,
    DataLakeTenantId,
    DataLakeExecutionId,
    DataLakeTenantCode,
    DataLakePayload,
    DataLakeCreatedAt,
    DataLakeUpdatedAt,
    DataLakeDeletedAt,
} from './../../domain/value-objects';
import { CciDataLake } from './../../domain/data-lake.aggregate';
import { dataLakes } from './../seeds/data-lake.seed';

@Injectable()
export class MockDataLakeSeeder extends MockSeeder<CciDataLake>
{
    public collectionSource: CciDataLake[];

    constructor()
    {
        super();
        this._createMockDataLang();
    }

    private _createMockDataLang(): void
    {
        this.collectionSource = [];

        for (let dataLake of dataLakes)
        {
            this.collectionSource.push(
                CciDataLake.register(
                    new DataLakeId(dataLake.id),
                    new DataLakeTenantId(dataLake.tenantId),
                    new DataLakeExecutionId(dataLake.executionId),
                    new DataLakeTenantCode(dataLake.tenantCode),
                    new DataLakePayload(dataLake.payload),
                    new DataLakeCreatedAt({currentTimestamp: true}),
                    new DataLakeUpdatedAt({currentTimestamp: true}),
                    new DataLakeDeletedAt(null),
                )
            );
        }
    }
}