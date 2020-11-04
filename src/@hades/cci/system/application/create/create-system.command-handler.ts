import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateSystemCommand } from './create-system.command';
import { CreateSystemService } from './create-system.service';
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

@CommandHandler(CreateSystemCommand)
export class CreateSystemCommandHandler implements ICommandHandler<CreateSystemCommand>
{
    constructor(
        private readonly createSystemService: CreateSystemService,
    ) {}

    async execute(command: CreateSystemCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createSystemService.main(
            {
                id: new SystemId(command.payload.id),
                tenantId: new SystemTenantId(command.payload.tenantId),
                tenantCode: new SystemTenantCode(command.payload.tenantCode),
                version: new SystemVersion(command.payload.version),
                name: new SystemName(command.payload.name),
                environment: new SystemEnvironment(command.payload.environment),
                technology: new SystemTechnology(command.payload.technology),
                isActive: new SystemIsActive(command.payload.isActive),
                cancelledAt: new SystemCancelledAt(command.payload.cancelledAt, {}, {removeTimezone: command.cQMetadata.timezone}),
            }
        );
    }
}