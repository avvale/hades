import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePermissionsCommand } from './create-permissions.command';
import { CreatePermissionsService } from './create-permissions.service';
import { 
    PermissionId, 
    PermissionBoundedContextId, 
    PermissionName
    
} from './../../domain/value-objects';

@CommandHandler(CreatePermissionsCommand)
export class CreatePermissionsCommandHandler implements ICommandHandler<CreatePermissionsCommand>
{
    constructor(
        private readonly createPermissionsService: CreatePermissionsService
    ) { }

    async execute(command: CreatePermissionsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createPermissionsService.main(
            command.permissions
                .map(permission => { 
                    return {
                        id: new PermissionId(permission.id),
                        boundedContextId: new PermissionBoundedContextId(permission.boundedContextId),
                        name: new PermissionName(permission.name),
                        
                    }
                })
        );
    }
}