import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateActionCommand } from './create-action.command';
import { CreateActionService } from './create-action.service';
import { 
    ActionId, 
    ActionTagId, 
    ActionType, 
    ActionSectionId, 
    ActionData
    
} from './../../domain/value-objects';

@CommandHandler(CreateActionCommand)
export class CreateActionCommandHandler implements ICommandHandler<CreateActionCommand>
{
    constructor(
        private readonly createActionService: CreateActionService
    ) { }

    async execute(command: CreateActionCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createActionService.main(
            new ActionId(command.id),
            new ActionTagId(command.tagId),
            new ActionType(command.type),
            new ActionSectionId(command.sectionId),
            new ActionData(command.data),
            
        );
    }
}