import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InsertSystemsCommand } from './insert-systems.command';
import { InsertSystemsService } from './insert-systems.service';
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

@CommandHandler(InsertSystemsCommand)
export class InsertSystemsCommandHandler implements ICommandHandler<InsertSystemsCommand>
{
    constructor(
        private readonly insertSystemsService: InsertSystemsService
    ) { }

    async execute(command: InsertSystemsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.insertSystemsService.main(
            command.systems
                .map(system => { 
                    return {
                        id: new SystemId(system.id),
                        tenantId: new SystemTenantId(system.tenantId),
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