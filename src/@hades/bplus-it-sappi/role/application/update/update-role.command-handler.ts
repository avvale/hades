import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateRoleCommand } from './update-role.command';
import { UpdateRoleService } from './update-role.service';
import { 
    RoleId, 
    RoleTenantId, 
    RoleTenantCode, 
    RoleName
    
} from './../../domain/value-objects';

@CommandHandler(UpdateRoleCommand)
export class UpdateRoleCommandHandler implements ICommandHandler<UpdateRoleCommand>
{
    constructor(
        private readonly updateRoleService: UpdateRoleService
    ) { }

    async execute(command: UpdateRoleCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateRoleService.main(
            new RoleId(command.id),
            new RoleTenantId(command.tenantId, { undefinable: true }),
            new RoleTenantCode(command.tenantCode, { undefinable: true }),
            new RoleName(command.name, { undefinable: true }),
            
        )
    }
}