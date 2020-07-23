import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateDataLakeCommand } from './update-data-lake.command';
import { UpdateDataLakeService } from './update-data-lake.service';
import { 
    DataLakeId, 
    DataLakeTenantId, 
    DataLakeTenantCode, 
    DataLakeData
    
} from './../../domain/value-objects';

@CommandHandler(UpdateDataLakeCommand)
export class UpdateDataLakeCommandHandler implements ICommandHandler<UpdateDataLakeCommand>
{
    constructor(
        private readonly updateDataLakeService: UpdateDataLakeService
    ) { }

    async execute(command: UpdateDataLakeCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateDataLakeService.main(
            new DataLakeId(command.id),
            new DataLakeTenantId(command.tenantId, { undefinable: true }),
            new DataLakeTenantCode(command.tenantCode, { undefinable: true }),
            new DataLakeData(command.data, { undefinable: true }),
            
        )
    }
}