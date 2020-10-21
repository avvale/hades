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
    SystemCancelledAt
    
} from './../../domain/value-objects';

@CommandHandler(CreateSystemCommand)
export class CreateSystemCommandHandler implements ICommandHandler<CreateSystemCommand>
{
    constructor(
        private readonly createSystemService: CreateSystemService
    ) { }

    async execute(command: CreateSystemCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createSystemService.main(
            new SystemId(command.id),
            new SystemTenantId(command.tenantId),
            new SystemTenantCode(command.tenantCode),
            new SystemVersion(command.version),
            new SystemName(command.name),
            new SystemEnvironment(command.environment),
            new SystemTechnology(command.technology),
            new SystemIsActive(command.isActive),
            new SystemCancelledAt(command.cancelledAt),
        );
    }
}