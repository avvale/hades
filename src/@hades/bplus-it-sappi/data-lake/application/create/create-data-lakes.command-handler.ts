import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateDataLakesCommand } from './create-data-lakes.command';
import { CreateDataLakesService } from './create-data-lakes.service';
import { 
    DataLakeId, 
    DataLakeTenantId, 
    DataLakeTenantCode, 
    DataLakeData
    
} from './../../domain/value-objects';

@CommandHandler(CreateDataLakesCommand)
export class CreateDataLakesCommandHandler implements ICommandHandler<CreateDataLakesCommand>
{
    constructor(
        private readonly createDataLakesService: CreateDataLakesService
    ) { }

    async execute(command: CreateDataLakesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createDataLakesService.main(
            command.dataLakes
                .map(dataLake => { 
                    return {
                        id: new DataLakeId(dataLake.id),
                        tenantId: new DataLakeTenantId(dataLake.tenantId),
                        tenantCode: new DataLakeTenantCode(dataLake.tenantCode),
                        data: new DataLakeData(dataLake.data),
                        
                    }
                })
        );
    }
}