import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateSystemsCommand } from './create-systems.command';
import { CreateSystemsService } from './create-systems.service';
import { 
    SystemId, 
    SystemTenantId, 
    SystemTenantCode, 
    SystemName, 
    SystemTenantCode, 
    SystemEnvironment, 
    SystemVersion, 
    SystemIsActive, 
    SystemCancelledAt
    
} from './../../domain/value-objects';

@CommandHandler(CreateSystemsCommand)
export class CreateSystemsCommandHandler implements ICommandHandler<CreateSystemsCommand>
{
    constructor(
        private readonly createSystemsService: CreateSystemsService
    ) { }

    async execute(command: CreateSystemsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createSystemsService.main(
            command.systems
                .map(system => { 
                    return {
                        id: new SystemId(system.id),
                        tenantId: new SystemTenantId(system.tenantId),
                        tenantCode: new SystemTenantCode(system.tenantCode),
                        name: new SystemName(system.name),
                        tenantCode: new SystemTenantCode(system.tenantCode),
                        environment: new SystemEnvironment(system.environment),
                        version: new SystemVersion(system.version),
                        isActive: new SystemIsActive(system.isActive),
                        cancelledAt: new SystemCancelledAt(system.cancelledAt),
                        
                    }
                })
        );
    }
}