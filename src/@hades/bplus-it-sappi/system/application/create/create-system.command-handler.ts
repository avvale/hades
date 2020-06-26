import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateSystemCommand } from './create-system.command';
import { CreateSystemService } from './create-system.service';
import { 
    SystemId, 
    SystemTenantId, 
    SystemName, 
    SystemTenantCode, 
    SystemEnvironment, 
    SystemVersion, 
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
            new SystemName(command.name),
            new SystemTenantCode(command.tenantCode),
            new SystemEnvironment(command.environment),
            new SystemVersion(command.version),
            new SystemIsActive(command.isActive),
            new SystemCancelledAt(command.cancelledAt),
            
        );
    }
}