import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { IDataLakeRepository } from './../../domain/data-lake.repository';

@Injectable()
export class DeleteDataLakesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IDataLakeRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[]): Promise<void>
    {   
        // get object to delete
        const dataLakes = await this.repository.get(queryStatements);

        await this.repository.delete(queryStatements);        

        // TODO a falta de definir eventos
        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        // const dataLakesRegistered = this.publisher.mergeObjectContext(dataLakes);
        
        // dataLakesRegistered.deleted(dataLakes); // apply event to model events
        // dataLakesRegistered.commit(); // commit all events of model
    }
}