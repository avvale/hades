import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTenantCommand } from './update-tenant.command';
import { UpdateTenantService } from './update-tenant.service';
import {
    TenantId,
    TenantName,
    TenantCode,
    TenantLogo,
    TenantIsActive,
    TenantData,
    TenantAccountIds
    
} from './../../domain/value-objects';

@CommandHandler(UpdateTenantCommand)
export class UpdateTenantCommandHandler implements ICommandHandler<UpdateTenantCommand>
{
    constructor(
        private readonly updateTenantService: UpdateTenantService
    ) {}

    async execute(command: UpdateTenantCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateTenantService.main(
            new TenantId(command.id),
            new TenantName(command.name, { undefinable: true }),
            new TenantCode(command.code, { undefinable: true }),
            new TenantLogo(command.logo),
            new TenantIsActive(command.isActive, { undefinable: true }),
            new TenantData(command.data),
            new TenantAccountIds(command.accountIds),
            
        )
    }
}