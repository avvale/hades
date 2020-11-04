import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { DataLakeId } from './../../domain/value-objects';
import { IDataLakeRepository } from './../../domain/data-lake.repository';

@Injectable()
export class DeleteDataLakeByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IDataLakeRepository,
    ) {}

    public async main(id: DataLakeId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>
    {
        // get object to delete
        const dataLake = await this.repository.findById(id, constraint, cQMetadata);

        await this.repository.deleteById(id, constraint, cQMetadata);

        // insert EventBus in object, to be able to apply and commit events
        const dataLakeRegister = this.publisher.mergeObjectContext(dataLake);

        dataLakeRegister.deleted(dataLake); // apply event to model events
        dataLakeRegister.commit(); // commit all events of model
    }
}