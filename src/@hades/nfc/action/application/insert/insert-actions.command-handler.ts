import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InsertActionsCommand } from './insert-actions.command';
import { InsertActionsService } from './insert-actions.service';
import { 
    ActionId, 
    ActionTagId, 
    ActionType, 
    ActionSectionId, 
    ActionData
    
} from './../../domain/value-objects';

@CommandHandler(InsertActionsCommand)
export class InsertActionsCommandHandler implements ICommandHandler<InsertActionsCommand>
{
    constructor(
        private readonly insertActionsService: InsertActionsService
    ) { }

    async execute(command: InsertActionsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.insertActionsService.main(
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