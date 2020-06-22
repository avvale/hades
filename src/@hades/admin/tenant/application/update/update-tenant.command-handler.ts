import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTenantCommand } from './update-tenant.command';
import { UpdateTenantService } from './update-tenant.service';
import { 
    TenantId, 
    TenantName, 
    TenantCode, 
    TenantLogo, 
    TenantIsActive, 
    TenantData
    
} from './../../domain/value-objects';

@CommandHandler(UpdateTenantCommand)
export class UpdateTenantCommandHandler implements ICommandHandler<UpdateTenantCommand>
{
    constructor(
        private readonly updateTenantService: UpdateTenantService
    ) { }

    async execute(command: UpdateTenantCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateTenantService.main(
            new TenantId(command.id),
            new TenantName(command.name),
            new TenantCode(command.code),
            new TenantLogo(command.logo),
            new TenantIsActive(command.isActive),
            new TenantData(command.data),
            
        )
    }
}