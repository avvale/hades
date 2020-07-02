import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InsertBoundedContextsCommand } from './insert-bounded-contexts.command';
import { InsertBoundedContextsService } from './insert-bounded-contexts.service';
import { 
    BoundedContextId, 
    BoundedContextName, 
    BoundedContextRoot, 
    BoundedContextSort, 
    BoundedContextIsActive
    
} from './../../domain/value-objects';

@CommandHandler(InsertBoundedContextsCommand)
export class InsertBoundedContextsCommandHandler implements ICommandHandler<InsertBoundedContextsCommand>
{
    constructor(
        private readonly insertBoundedContextsService: InsertBoundedContextsService
    ) { }

    async execute(command: InsertBoundedContextsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.insertBoundedContextsService.main(
            command.boundedContexts
                .map(boundedContext => { 
                    return {
                        id: new BoundedContextId(boundedContext.id),
                        name: new BoundedContextName(boundedContext.name),
                        root: new BoundedContextRoot(boundedContext.root),
                        sort: new BoundedContextSort(boundedContext.sort),
                        isActive: new BoundedContextIsActive(boundedContext.isActive),
                        
                    }
                })
        );
    }
}