import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Utils } from '@hades/shared/domain/lib/utils';
import { 
    DataLakeId, 
    DataLakeData, 
    DataLakeCreatedAt, 
    DataLakeUpdatedAt, 
    DataLakeDeletedAt
    
} from './../../domain/value-objects';
import { IDataLakeRepository } from './../../domain/data-lake.repository';
import { BplusItSappiDataLake } from './../../domain/data-lake.entity';

@Injectable()
export class CreateDataLakeService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IDataLakeRepository
    ) {}

    public async main(
        id: DataLakeId,
        data: DataLakeData,
        
    ): Promise<void>
    {
        // create object with factory pattern
        const dataLake = BplusItSappiDataLake.register(
            id,
            data,
            new DataLakeCreatedAt(Utils.nowTimestamp()),
            new DataLakeUpdatedAt(Utils.nowTimestamp()),
            null
        );
        
        // create
        await this.repository.create(dataLake);

        // insert EventBus in object returned by the repository, to be able to apply and commit events
        const dataLakeRegister = this.publisher.mergeObjectContext(
            await this.repository.findById(id)
        );
        
        dataLakeRegister.created(dataLake); // apply event to model events
        dataLakeRegister.commit(); // commit all events of model
    }
}