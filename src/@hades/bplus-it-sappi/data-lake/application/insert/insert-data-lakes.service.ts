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
import { BplusItSappiDataLake } from './../../domain/data-lake.aggregate';

@Injectable()
export class InsertDataLakesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IDataLakeRepository
    ) {}

    public async main(
        dataLakes: {
            id: DataLakeId,
            data: DataLakeData,
            
        } []
    ): Promise<void>
    {
        // create object with factory pattern
        const aggregateDataLakes = dataLakes.map(dataLake => BplusItSappiDataLake.register(
            dataLake.id,
            dataLake.data,
            new DataLakeCreatedAt(Utils.nowTimestamp()),
            new DataLakeUpdatedAt(Utils.nowTimestamp()),
            null
        ));
        
        // insert
        await this.repository.insert(aggregateDataLakes);

        // TODO a falta de definir eventos
        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        // const dataLakesRegistered = this.publisher.mergeObjectContext(
        //     await this.repository.findById(id) // there may be cases where the database object is direct to the command, for example in the update, only one field can be updated
        // );
        // 
        // dataLakesRegistered.created(dataLakes); // apply event to model events
        // dataLakesRegistered.commit(); // commit all events of model
    }
}