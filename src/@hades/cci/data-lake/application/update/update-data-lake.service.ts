import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
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
export class UpdateDataLakeService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IDataLakeRepository,
    ) {}

    public async main(
        payload: {
            id: DataLakeId,
            tenantId?: DataLakeTenantId,
            executionId?: DataLakeExecutionId,
            tenantCode?: DataLakeTenantCode,
            payload?: DataLakePayload,
        },
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const dataLake = CciDataLake.register(
            payload.id,
            payload.tenantId,
            payload.executionId,
            payload.tenantCode,
            payload.payload,
            null,
            new DataLakeUpdatedAt({currentTimestamp: true}),
            null
        );

        // update
        await this.repository.update(dataLake, constraint, cQMetadata);

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const dataLakeRegister = this.publisher.mergeObjectContext(
            dataLake
        );

        dataLakeRegister.updated(dataLake); // apply event to model events
        dataLakeRegister.commit(); // commit all events of model
    }
}