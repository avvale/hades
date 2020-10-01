import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Utils } from '@hades/shared/domain/lib/utils';
import { 
    DataLakeId,
    DataLakeTenantId,
    DataLakeExecutionId,
    DataLakeTenantCode,
    DataLakePayload,
    DataLakeCreatedAt,
    DataLakeUpdatedAt,
    DataLakeDeletedAt
    
} from './../../domain/value-objects';
import { IDataLakeRepository } from './../../domain/data-lake.repository';
import { CciDataLake } from './../../domain/data-lake.aggregate';

@Injectable()
export class UpdateDataLakeService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IDataLakeRepository
    ) {}

    public async main(
        id: DataLakeId,
        tenantId?: DataLakeTenantId,
        executionId?: DataLakeExecutionId,
        tenantCode?: DataLakeTenantCode,
        payload?: DataLakePayload,
        
    ): Promise<void>
    {        
        // create aggregate with factory pattern
        const dataLake = CciDataLake.register(
            id,
            tenantId,
            executionId,
            tenantCode,
            payload,
            null,
            new DataLakeUpdatedAt(Utils.nowTimestamp()),
            null
        );
        
        // update
        await this.repository.update(dataLake);        
            
        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const dataLakeRegister = this.publisher.mergeObjectContext(
            dataLake
        );
        
        dataLakeRegister.updated(dataLake); // apply event to model events
        dataLakeRegister.commit(); // commit all events of model
    }
}