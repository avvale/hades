import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteSummaryByIdCommand } from './delete-summary-by-id.command';
import { DeleteSummaryByIdService } from './delete-summary-by-id.service';
import { 
    SummaryId
} from './../../domain/value-objects';

@CommandHandler(DeleteSummaryByIdCommand)
export class DeleteSummaryByIdCommandHandler implements ICommandHandler<DeleteSummaryByIdCommand>
{
    constructor(
        private readonly deleteSummaryByIdService: DeleteSummaryByIdService
    ) { }

    async execute(command: DeleteSummaryByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteSummaryByIdService.main(
            new SummaryId(command.id)
        );
    }
}