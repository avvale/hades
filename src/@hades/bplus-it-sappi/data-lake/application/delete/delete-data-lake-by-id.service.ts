import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { DataLakeId } from './../../domain/value-objects';
import { IDataLakeRepository } from './../../domain/data-lake.repository';

@Injectable()
export class DeleteDataLakeByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IDataLakeRepository
    ) {}

    public async main(id: DataLakeId): Promise<void>
    {
        // get object to delete
        const dataLake = await this.repository.findById(id);

        await this.repository.deleteById(id);

        // insert EventBus in object, to be able to apply and commit events
        const dataLakeRegister = this.publisher.mergeObjectContext(dataLake);
        
        dataLakeRegister.deleted(dataLake); // apply event to model events
        dataLakeRegister.commit(); // commit all events of model
    }
}