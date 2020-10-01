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
            tenantId: DataLakeTenantId,
            executionId: DataLakeExecutionId,
            tenantCode: DataLakeTenantCode,
            payload: DataLakePayload,
            
        } []
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateDataLakes = dataLakes.map(dataLake => CciDataLake.register(
            dataLake.id,
            dataLake.tenantId,
            dataLake.executionId,
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