import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateActionsCommand } from './create-actions.command';
import { CreateActionsService } from './create-actions.service';
import { 
    ActionId, 
    ActionTagId, 
    ActionType, 
    ActionSectionId, 
    ActionData
    
} from './../../domain/value-objects';

@CommandHandler(CreateActionsCommand)
export class CreateActionsCommandHandler implements ICommandHandler<CreateActionsCommand>
{
    constructor(
        private readonly createActionsService: CreateActionsService
    ) { }

    async execute(command: CreateActionsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createActionsService.main(
            command.actions
                .map(action => { 
                    return {
                        id: new ActionId(action.id),
                        tagId: new ActionTagId(action.tagId),
                        type: new ActionType(action.type),
                        sectionId: new ActionSectionId(action.sectionId),
                        data: new ActionData(action.data),
                        
                    }
                })
        );
    }
}