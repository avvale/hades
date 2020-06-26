import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTenantCommand } from './create-tenant.command';
import { CreateTenantService } from './create-tenant.service';
import { 
    TenantId, 
    TenantName, 
    TenantCode, 
    TenantLogo, 
    TenantIsActive, 
    TenantData
    
} from './../../domain/value-objects';

@CommandHandler(CreateTenantCommand)
export class CreateTenantCommandHandler implements ICommandHandler<CreateTenantCommand>
{
    constructor(
        private readonly createTenantService: CreateTenantService
    ) { }

    async execute(command: CreateTenantCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createTenantService.main(
            new TenantId(command.id),
            new TenantName(command.name),
            new TenantCode(command.code),
            new TenantLogo(command.logo),
            new TenantIsActive(command.isActive),
            new TenantData(command.data),
            
        );
    }
}