import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InsertTenantsCommand } from './insert-tenants.command';
import { InsertTenantsService } from './insert-tenants.service';
import { 
    TenantId, 
    TenantName, 
    TenantCode, 
    TenantLogo, 
    TenantIsActive, 
    TenantData
    
} from './../../domain/value-objects';

@CommandHandler(InsertTenantsCommand)
export class InsertTenantsCommandHandler implements ICommandHandler<InsertTenantsCommand>
{
    constructor(
        private readonly insertTenantsService: InsertTenantsService
    ) { }

    async execute(command: InsertTenantsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.insertTenantsService.main(
            command.tenants
                .map(tenant => { 
                    return {
                        id: new TenantId(tenant.id),
                        name: new TenantName(tenant.name),
                        code: new TenantCode(tenant.code),
                        logo: new TenantLogo(tenant.logo),
                        isActive: new TenantIsActive(tenant.isActive),
                        data: new TenantData(tenant.data),
                        
                    }
                })
        );
    }
}