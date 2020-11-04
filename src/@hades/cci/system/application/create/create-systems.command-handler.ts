import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateSystemsCommand } from './create-systems.command';
import { CreateSystemsService } from './create-systems.service';
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

@CommandHandler(CreateSystemsCommand)
export class CreateSystemsCommandHandler implements ICommandHandler<CreateSystemsCommand>
{
    constructor(
        private readonly createSystemsService: CreateSystemsService,
    ) {}

    async execute(command: CreateSystemsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createSystemsService.main(
            command.payload
                .map(system => {
                    return {
                        id: new SystemId(system.id),
                        tenantId: new SystemTenantId(system.tenantId),
                        tenantCode: new SystemTenantCode(system.tenantCode),
                        version: new SystemVersion(system.version),
                        name: new SystemName(system.name),
                        environment: new SystemEnvironment(system.environment),
                        technology: new SystemTechnology(system.technology),
                        isActive: new SystemIsActive(system.isActive),
                        cancelledAt: new SystemCancelledAt(system.cancelledAt, {}, {removeTimezone: command.cQMetadata.timezone}),
                    }
                })
        );
    }
}