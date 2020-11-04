import { AggregateRoot } from '@nestjs/cqrs';
import { CciDataLake } from './../../domain/data-lake.aggregate';
import { CreatedDataLakeEvent } from './created-data-lake.event';
import { DeletedDataLakeEvent } from './deleted-data-lake.event';
import { CreatedDataLakesEvent } from './created-data-lakes.event';
import { DeletedDataLakesEvent } from './deleted-data-lakes.event';

export class AddDataLakesContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: CciDataLake[] = [],
    ) {
        super();
    }

    *[Symbol.iterator]()
    {
        for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot;
    }

    created()
    {
        this.apply(
            new CreatedDataLakesEvent(
                this.aggregateRoots.map(dataLake =>
                    new CreatedDataLakeEvent(
                        dataLake.id.value,
                        dataLake.tenantId.value,
                        dataLake.executionId.value,
                        dataLake.tenantCode.value,
                        dataLake.payload.value,
                        dataLake.createdAt?.value,
                        dataLake.updatedAt?.value,
                        dataLake.deletedAt?.value,
                        
                    )
                )
            )
        );
    }

    deleted()
    {
        this.apply(
            new DeletedDataLakesEvent(
                this.aggregateRoots.map(dataLake =>
                    new DeletedDataLakeEvent(
                        dataLake.id.value,
                        dataLake.tenantId.value,
                        dataLake.executionId.value,
                        dataLake.tenantCode.value,
                        dataLake.payload.value,
                        dataLake.createdAt?.value,
                        dataLake.updatedAt?.value,
                        dataLake.deletedAt?.value,
                        
                    )
                )
            )
        );
    }
}