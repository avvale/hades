import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateRoleCommand } from './update-role.command';
import { UpdateRoleService } from './update-role.service';
import {
    RoleId,
    RoleTenantId,
    RoleTenantCode,
    RoleName,
    RoleCreatedAt,
    RoleUpdatedAt,
    RoleDeletedAt,
} from './../../domain/value-objects';

@CommandHandler(UpdateRoleCommand)
export class UpdateRoleCommandHandler implements ICommandHandler<UpdateRoleCommand>
{
    constructor(
        private readonly updateRoleService: UpdateRoleService,
    ) {}

    async execute(command: UpdateRoleCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateRoleService.main(
            {
                id: new RoleId(command.payload.id),
                tenantId: new RoleTenantId(command.payload.tenantId, { undefinable: true }),
                tenantCode: new RoleTenantCode(command.payload.tenantCode, { undefinable: true }),
                name: new RoleName(command.payload.name, { undefinable: true }),
            },
            command.constraint,
            command.cQMetadata,
        )
    }
}