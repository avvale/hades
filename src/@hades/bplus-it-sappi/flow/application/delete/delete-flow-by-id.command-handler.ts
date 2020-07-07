import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteFlowByIdCommand } from './delete-flow-by-id.command';
import { DeleteFlowByIdService } from './delete-flow-by-id.service';
import { 
    FlowId
} from './../../domain/value-objects';

@CommandHandler(DeleteFlowByIdCommand)
export class DeleteFlowByIdCommandHandler implements ICommandHandler<DeleteFlowByIdCommand>
{
    constructor(
        private readonly deleteFlowByIdService: DeleteFlowByIdService
    ) { }

    async execute(command: DeleteFlowByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteFlowByIdService.main(
            new FlowId(command.id)
        );
    }
}