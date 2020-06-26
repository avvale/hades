import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateSystemCommand } from './update-system.command';
import { UpdateSystemService } from './update-system.service';
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

@CommandHandler(UpdateSystemCommand)
export class UpdateSystemCommandHandler implements ICommandHandler<UpdateSystemCommand>
{
    constructor(
        private readonly updateSystemService: UpdateSystemService
    ) { }

    async execute(command: UpdateSystemCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateSystemService.main(
            new SystemId(command.id),
            new SystemTenantId(command.tenantId, { undefinable: true }),
            new SystemName(command.name, { undefinable: true }),
            new SystemTenantCode(command.tenantCode, { undefinable: true }),
            new SystemEnvironment(command.environment, { undefinable: true }),
            new SystemVersion(command.version, { undefinable: true }),
            new SystemIsActive(command.isActive, { undefinable: true }),
            new SystemCancelledAt(command.cancelledAt),
            
        )
    }
}