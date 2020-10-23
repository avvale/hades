import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateRoleCommand } from './update-role.command';
import { UpdateRoleService } from './update-role.service';
import {
    RoleId,
    RoleName,
    RoleIsMaster,
    RolePermissionIds,
    RoleAccountIds
    
} from './../../domain/value-objects';

@CommandHandler(UpdateRoleCommand)
export class UpdateRoleCommandHandler implements ICommandHandler<UpdateRoleCommand>
{
    constructor(
        private readonly updateRoleService: UpdateRoleService
    ) {}

    async execute(command: UpdateRoleCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateRoleService.main(
            new RoleId(command.id),
            new RoleName(command.name, { undefinable: true }),
            new RoleIsMaster(command.isMaster, { undefinable: true }),
            new RolePermissionIds(command.permissionIds),
            new RoleAccountIds(command.accountIds),
            
        )
    }
}