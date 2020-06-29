import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InsertDataLakesCommand } from './insert-data-lakes.command';
import { InsertDataLakesService } from './insert-data-lakes.service';
import { 
    DataLakeId, 
    DataLakeData
    
} from './../../domain/value-objects';

@CommandHandler(InsertDataLakesCommand)
export class InsertDataLakesCommandHandler implements ICommandHandler<InsertDataLakesCommand>
{
    constructor(
        private readonly insertDataLakesService: InsertDataLakesService
    ) { }

    async execute(command: InsertDataLakesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.insertDataLakesService.main(
            command.dataLakes
                .map(dataLake => { 
                    return {
                        id: new DataLakeId(dataLake.id),
                        data: new DataLakeData(dataLake.data),
                        
                    }
                })
        );
    }
}