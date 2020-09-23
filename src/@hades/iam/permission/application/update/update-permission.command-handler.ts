import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdatePermissionCommand } from './update-permission.command';
import { UpdatePermissionService } from './update-permission.service';
import { 
    PermissionId,
    PermissionName,
    PermissionBoundedContextId,
    PermissionRoleIds
    
} from './../../domain/value-objects';

@CommandHandler(UpdatePermissionCommand)
export class UpdatePermissionCommandHandler implements ICommandHandler<UpdatePermissionCommand>
{
    constructor(
        private readonly updatePermissionService: UpdatePermissionService
    ) { }

    async execute(command: UpdatePermissionCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updatePermissionService.main(
            new PermissionId(command.id),
            new PermissionName(command.name, { undefinable: true }),
            new PermissionBoundedContextId(command.boundedContextId, { undefinable: true }),
            new PermissionRoleIds(command.roleIds),
            
        )
    }
}