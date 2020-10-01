import { Injectable} from '@nestjs/common';
import { MockRepository } from '@hades/shared/infrastructure/persistence/mock/mock.repository';
import { Utils } from '@hades/shared/domain/lib/utils';
import { IDataLakeRepository } from '@hades/cci/data-lake/domain/data-lake.repository';
import { 
    DataLakeId,
    DataLakeTenantId,
    DataLakeExecutionId,
    DataLakeTenantCode,
    DataLakePayload,
    DataLakeCreatedAt,
    DataLakeUpdatedAt,
    DataLakeDeletedAt
    
} from '@hades/cci/data-lake/domain/value-objects';
import { CciDataLake } from './../../domain/data-lake.aggregate';
import { dataLakes } from './../seeds/data-lake.seed';

@Injectable()
export class MockDataLakeRepository extends MockRepository<CciDataLake> implements IDataLakeRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'CciDataLake';
    public collectionSource: CciDataLake[];
    public deletedAtInstance: DataLakeDeletedAt = new DataLakeDeletedAt(null);
    
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

        for (const itemCollection of <any[]>dataLakes)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;
            
            this.collectionSource.push(CciDataLake.register(
                    new DataLakeId(itemCollection.id),
                    new DataLakeTenantId(itemCollection.tenantId),
                    new DataLakeExecutionId(itemCollection.executionId),
                    new DataLakeTenantCode(itemCollection.tenantCode),
                    new DataLakePayload(itemCollection.payload),
                    new DataLakeCreatedAt(itemCollection.createdAt),
                    new DataLakeUpdatedAt(itemCollection.updatedAt),
                    new DataLakeDeletedAt(itemCollection.deletedAt),
                     
                ));
        }
    }
}