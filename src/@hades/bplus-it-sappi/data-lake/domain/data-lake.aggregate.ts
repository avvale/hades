import { AggregateRoot } from '@nestjs/cqrs';
import { 
    DataLakeId, 
    DataLakeData, 
    DataLakeCreatedAt, 
    DataLakeUpdatedAt, 
    DataLakeDeletedAt
    
} from './value-objects';
import { CreatedDataLakeEvent } from './../application/events/created-data-lake.event';
import { UpdatedDataLakeEvent } from './../application/events/updated-data-lake.event';
import { DeletedDataLakeEvent } from './../application/events/deleted-data-lake.event';

export class BplusItSappiDataLake extends AggregateRoot
{
    id: DataLakeId;
    data: DataLakeData;
    createdAt: DataLakeCreatedAt;
    updatedAt: DataLakeUpdatedAt;
    deletedAt: DataLakeDeletedAt;
    
    constructor(id?: DataLakeId, data?: DataLakeData, createdAt?: DataLakeCreatedAt, updatedAt?: DataLakeUpdatedAt, deletedAt?: DataLakeDeletedAt, )
    {
        super();
        
        this.id = id;
        this.data = data;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        
    }

    static register (id: DataLakeId,data: DataLakeData,createdAt: DataLakeCreatedAt,updatedAt: DataLakeUpdatedAt,deletedAt: DataLakeDeletedAt,): BplusItSappiDataLake
    {
        return new BplusItSappiDataLake(id, data, createdAt, updatedAt, deletedAt, );
    }

    created(dataLake: BplusItSappiDataLake): void
    {
        this.apply(
            new CreatedDataLakeEvent(
                dataLake.id.value,
                dataLake.data.value,
                dataLake.createdAt?.value,
                dataLake.updatedAt?.value,
                dataLake.deletedAt?.value,
                
            )
        );
    }

    updated(dataLake: BplusItSappiDataLake): void
    {
        this.apply(
            new UpdatedDataLakeEvent(
                dataLake.id.value,
                dataLake.data?.value,
                dataLake.createdAt?.value,
                dataLake.updatedAt?.value,
                dataLake.deletedAt?.value,
                
            )
        );
    }

    deleted(dataLake: BplusItSappiDataLake): void
    {
        this.apply(
            new DeletedDataLakeEvent(
                dataLake.id.value,
                dataLake.data.value,
                dataLake.createdAt?.value,
                dataLake.updatedAt?.value,
                dataLake.deletedAt?.value,
                
            )
        );
    }

    toDTO(): Object
    {
        return {
            id: this.id.value,
            data: this.data.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
            
        }
    }
}
