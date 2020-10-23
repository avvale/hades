import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateRoleCommand } from './create-role.command';
import { CreateRoleService } from './create-role.service';
import {
    RoleId,
    RoleName,
    RoleIsMaster,
    RolePermissionIds,
    RoleAccountIds
    
} from './../../domain/value-objects';

@CommandHandler(CreateRoleCommand)
export class CreateRoleCommandHandler implements ICommandHandler<CreateRoleCommand>
{
    constructor(
        private readonly createRoleService: CreateRoleService
    ) {}

    async execute(command: CreateRoleCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createRoleService.main(
            new RoleId(command.id),
            new RoleName(command.name),
            new RoleIsMaster(command.isMaster),
            new RolePermissionIds(command.permissionIds),
            new RoleAccountIds(command.accountIds),
        );
    }
}