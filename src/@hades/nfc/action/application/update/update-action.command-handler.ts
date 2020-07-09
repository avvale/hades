import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateActionCommand } from './update-action.command';
import { UpdateActionService } from './update-action.service';
import { 
    ActionId, 
    ActionTagId, 
    ActionType, 
    ActionSectionId, 
    ActionData
    
} from './../../domain/value-objects';

@CommandHandler(UpdateActionCommand)
export class UpdateActionCommandHandler implements ICommandHandler<UpdateActionCommand>
{
    constructor(
        private readonly updateActionService: UpdateActionService
    ) { }

    async execute(command: UpdateActionCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateActionService.main(
            new ActionId(command.id),
            new ActionTagId(command.tagId, { undefinable: true }),
            new ActionType(command.type, { undefinable: true }),
            new ActionSectionId(command.sectionId),
            new ActionData(command.data),
            
        )
    }
}