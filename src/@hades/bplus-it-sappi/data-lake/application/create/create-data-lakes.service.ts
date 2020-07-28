import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Utils } from '@hades/shared/domain/lib/utils';
import { 
    DataLakeId, 
    DataLakeExecutionId, 
    DataLakeTenantId, 
    DataLakeTenantCode, 
    DataLakePayload, 
    DataLakeCreatedAt, 
    DataLakeUpdatedAt, 
    DataLakeDeletedAt
    
} from './../../domain/value-objects';
import { IDataLakeRepository } from './../../domain/data-lake.repository';
import { BplusItSappiDataLake } from './../../domain/data-lake.aggregate';
import { AddDataLakesContextEvent } from './../events/add-data-lakes-context.event';

@Injectable()
export class CreateDataLakesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IDataLakeRepository
    ) {}

    public async main(
        dataLakes: {
            id: DataLakeId,
            executionId: DataLakeExecutionId,
            tenantId: DataLakeTenantId,
            tenantCode: DataLakeTenantCode,
            payload: DataLakePayload,
            
        } []
    ): Promise<void>
    {
        // create object with factory pattern
        const aggregateDataLakes = dataLakes.map(dataLake => BplusItSappiDataLake.register(
            dataLake.id,
            dataLake.executionId,
            dataLake.tenantId,
            dataLake.tenantCode,
            dataLake.payload,
            new DataLakeCreatedAt(Utils.nowTimestamp()),
            new DataLakeUpdatedAt(Utils.nowTimestamp()),
            null
        ));
        
        // insert
        await this.repository.insert(aggregateDataLakes);

        // create AddDataLakesContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const dataLakesRegistered = this.publisher.mergeObjectContext(new AddDataLakesContextEvent(aggregateDataLakes));
 
        dataLakesRegistered.created(); // apply event to model events
        dataLakesRegistered.commit(); // commit all events of model
    }
}