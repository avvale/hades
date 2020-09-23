import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateBoundedContextCommand } from './update-bounded-context.command';
import { UpdateBoundedContextService } from './update-bounded-context.service';
import { 
    BoundedContextId,
    BoundedContextName,
    BoundedContextRoot,
    BoundedContextSort,
    BoundedContextIsActive
    
} from './../../domain/value-objects';

@CommandHandler(UpdateBoundedContextCommand)
export class UpdateBoundedContextCommandHandler implements ICommandHandler<UpdateBoundedContextCommand>
{
    constructor(
        private readonly updateBoundedContextService: UpdateBoundedContextService
    ) { }

    async execute(command: UpdateBoundedContextCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateBoundedContextService.main(
            new BoundedContextId(command.id),
            new BoundedContextName(command.name, { undefinable: true }),
            new BoundedContextRoot(command.root, { undefinable: true }),
            new BoundedContextSort(command.sort, { undefinable: true }),
            new BoundedContextIsActive(command.isActive, { undefinable: true }),
            
        )
    }
}