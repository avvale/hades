import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateDataLakeCommand } from './create-data-lake.command';
import { CreateDataLakeService } from './create-data-lake.service';
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

@CommandHandler(CreateDataLakeCommand)
export class CreateDataLakeCommandHandler implements ICommandHandler<CreateDataLakeCommand>
{
    constructor(
        private readonly createDataLakeService: CreateDataLakeService,
    ) {}

    async execute(command: CreateDataLakeCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createDataLakeService.main(
            {
                id: new DataLakeId(command.payload.id),
                tenantId: new DataLakeTenantId(command.payload.tenantId),
                executionId: new DataLakeExecutionId(command.payload.executionId),
                tenantCode: new DataLakeTenantCode(command.payload.tenantCode),
                payload: new DataLakePayload(command.payload.payload),
            }
        );
    }
}