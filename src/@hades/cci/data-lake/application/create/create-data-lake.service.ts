import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
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
import { IDataLakeRepository } from './../../domain/data-lake.repository';
import { CciDataLake } from './../../domain/data-lake.aggregate';

@Injectable()
export class CreateDataLakeService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IDataLakeRepository,
    ) {}

    public async main(
        payload: {
            id: DataLakeId,
            tenantId: DataLakeTenantId,
            executionId: DataLakeExecutionId,
            tenantCode: DataLakeTenantCode,
            payload: DataLakePayload,
        },
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const dataLake = CciDataLake.register(
            payload.id,
            payload.tenantId,
            payload.executionId,
            payload.tenantCode,
            payload.payload,
            new DataLakeCreatedAt({currentTimestamp: true}),
            new DataLakeUpdatedAt({currentTimestamp: true}),
            null
        );

        // create
        await this.repository.create(dataLake);

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const dataLakeRegister = this.publisher.mergeObjectContext(
            dataLake
        );

        dataLakeRegister.created(dataLake); // apply event to model events
        dataLakeRegister.commit(); // commit all events of model
    }
}