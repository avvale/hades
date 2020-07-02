import { SequelizeMapper } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.mapper';
import { ObjectLiteral } from '@hades/shared/domain/lib/object-literal';
import { BplusItSappiDataLake } from './../../domain/data-lake.entity';
import { 
    DataLakeId, 
    DataLakeData, 
    DataLakeCreatedAt, 
    DataLakeUpdatedAt, 
    DataLakeDeletedAt
    
} from './../../domain/value-objects';

export class SequelizeDataLakeMapper implements SequelizeMapper
{
    mapToAggregate(dataLake: ObjectLiteral | ObjectLiteral[]): BplusItSappiDataLake | BplusItSappiDataLake[]
    {
        if (Array.isArray(dataLake))
        {
            return dataLake.map(item => BplusItSappiDataLake.register(
                    new DataLakeId(item.id),
                    new DataLakeData(item.data),
                    new DataLakeCreatedAt(item.createdAt),
                    new DataLakeUpdatedAt(item.updatedAt),
                    new DataLakeDeletedAt(item.deletedAt),
                    
                )
            );
        }
        
        return BplusItSappiDataLake.register(
            new DataLakeId(dataLake.id),
            new DataLakeData(dataLake.data),
            new DataLakeCreatedAt(dataLake.createdAt),
            new DataLakeUpdatedAt(dataLake.updatedAt),
            new DataLakeDeletedAt(dataLake.deletedAt),
            
        );
    }
}