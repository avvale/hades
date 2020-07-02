import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateBoundedContextCommand } from './create-bounded-context.command';
import { CreateBoundedContextService } from './create-bounded-context.service';
import { 
    BoundedContextId, 
    BoundedContextName, 
    BoundedContextRoot, 
    BoundedContextSort, 
    BoundedContextIsActive
    
} from './../../domain/value-objects';

@CommandHandler(CreateBoundedContextCommand)
export class CreateBoundedContextCommandHandler implements ICommandHandler<CreateBoundedContextCommand>
{
    constructor(
        private readonly createBoundedContextService: CreateBoundedContextService
    ) { }

    async execute(command: CreateBoundedContextCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createBoundedContextService.main(
            new BoundedContextId(command.id),
            new BoundedContextName(command.name),
            new BoundedContextRoot(command.root),
            new BoundedContextSort(command.sort),
            new BoundedContextIsActive(command.isActive),
            
        );
    }
}