import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InsertRolesCommand } from './insert-roles.command';
import { InsertRolesService } from './insert-roles.service';
import { 
    RoleId, 
    RoleTenantId, 
    RoleName
    
} from './../../domain/value-objects';

@CommandHandler(InsertRolesCommand)
export class InsertRolesCommandHandler implements ICommandHandler<InsertRolesCommand>
{
    constructor(
        private readonly insertRolesService: InsertRolesService
    ) { }

    async execute(command: InsertRolesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.insertRolesService.main(
            command.roles
                .map(role => { 
                    return {
                        id: new RoleId(role.id),
                        tenantId: new RoleTenantId(role.tenantId),
                        name: new RoleName(role.name),
                        
                    }
                })
        );
    }
}