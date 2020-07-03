import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePermissionCommand } from './create-permission.command';
import { CreatePermissionService } from './create-permission.service';
import { 
    PermissionId, 
    PermissionBoundedContextId, 
    PermissionName
    
} from './../../domain/value-objects';

@CommandHandler(CreatePermissionCommand)
export class CreatePermissionCommandHandler implements ICommandHandler<CreatePermissionCommand>
{
    constructor(
        private readonly createPermissionService: CreatePermissionService
    ) { }

    async execute(command: CreatePermissionCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createPermissionService.main(
            new PermissionId(command.id),
            new PermissionBoundedContextId(command.boundedContextId),
            new PermissionName(command.name),
            
        );
    }
}