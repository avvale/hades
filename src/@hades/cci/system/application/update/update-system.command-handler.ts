import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateSystemCommand } from './update-system.command';
import { UpdateSystemService } from './update-system.service';
import {
    SystemId,
    SystemTenantId,
    SystemTenantCode,
    SystemVersion,
    SystemName,
    SystemEnvironment,
    SystemTechnology,
    SystemIsActive,
    SystemCancelledAt,
    SystemCreatedAt,
    SystemUpdatedAt,
    SystemDeletedAt,
} from './../../domain/value-objects';

@CommandHandler(UpdateSystemCommand)
export class UpdateSystemCommandHandler implements ICommandHandler<UpdateSystemCommand>
{
    constructor(
        private readonly updateSystemService: UpdateSystemService,
    ) {}

    async execute(command: UpdateSystemCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateSystemService.main(
            {
                id: new SystemId(command.payload.id),
                tenantId: new SystemTenantId(command.payload.tenantId, { undefinable: true }),
                tenantCode: new SystemTenantCode(command.payload.tenantCode, { undefinable: true }),
                version: new SystemVersion(command.payload.version, { undefinable: true }),
                name: new SystemName(command.payload.name, { undefinable: true }),
                environment: new SystemEnvironment(command.payload.environment, { undefinable: true }),
                technology: new SystemTechnology(command.payload.technology, { undefinable: true }),
                isActive: new SystemIsActive(command.payload.isActive, { undefinable: true }),
                cancelledAt: new SystemCancelledAt(command.payload.cancelledAt, {}, {removeTimezone: command.cQMetadata.timezone}),
            },
            command.constraint,
            command.cQMetadata,
        )
    }
}