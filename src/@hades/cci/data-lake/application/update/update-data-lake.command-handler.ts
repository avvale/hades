import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateDataLakeCommand } from './update-data-lake.command';
import { UpdateDataLakeService } from './update-data-lake.service';
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

@CommandHandler(UpdateDataLakeCommand)
export class UpdateDataLakeCommandHandler implements ICommandHandler<UpdateDataLakeCommand>
{
    constructor(
        private readonly updateDataLakeService: UpdateDataLakeService,
    ) {}

    async execute(command: UpdateDataLakeCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateDataLakeService.main(
            {
                id: new DataLakeId(command.payload.id),
                tenantId: new DataLakeTenantId(command.payload.tenantId, { undefinable: true }),
                executionId: new DataLakeExecutionId(command.payload.executionId, { undefinable: true }),
                tenantCode: new DataLakeTenantCode(command.payload.tenantCode, { undefinable: true }),
                payload: new DataLakePayload(command.payload.payload, { undefinable: true }),
            },
            command.constraint,
            command.cQMetadata,
        )
    }
}