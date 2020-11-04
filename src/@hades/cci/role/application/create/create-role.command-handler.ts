import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateRoleCommand } from './create-role.command';
import { CreateRoleService } from './create-role.service';
import {
    RoleId,
    RoleTenantId,
    RoleTenantCode,
    RoleName,
    RoleCreatedAt,
    RoleUpdatedAt,
    RoleDeletedAt,
} from './../../domain/value-objects';

@CommandHandler(CreateRoleCommand)
export class CreateRoleCommandHandler implements ICommandHandler<CreateRoleCommand>
{
    constructor(
        private readonly createRoleService: CreateRoleService,
    ) {}

    async execute(command: CreateRoleCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createRoleService.main(
            {
                id: new RoleId(command.payload.id),
                tenantId: new RoleTenantId(command.payload.tenantId),
                tenantCode: new RoleTenantCode(command.payload.tenantCode),
                name: new RoleName(command.payload.name),
            }
        );
    }
}