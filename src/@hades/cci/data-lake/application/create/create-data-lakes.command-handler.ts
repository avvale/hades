import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateDataLakesCommand } from './create-data-lakes.command';
import { CreateDataLakesService } from './create-data-lakes.service';
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

@CommandHandler(CreateDataLakesCommand)
export class CreateDataLakesCommandHandler implements ICommandHandler<CreateDataLakesCommand>
{
    constructor(
        private readonly createDataLakesService: CreateDataLakesService,
    ) {}

    async execute(command: CreateDataLakesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createDataLakesService.main(
            command.payload
                .map(dataLake => {
                    return {
                        id: new DataLakeId(dataLake.id),
                        tenantId: new DataLakeTenantId(dataLake.tenantId),
                        executionId: new DataLakeExecutionId(dataLake.executionId),
                        tenantCode: new DataLakeTenantCode(dataLake.tenantCode),
                        payload: new DataLakePayload(dataLake.payload),
                    }
                })
        );
    }
}