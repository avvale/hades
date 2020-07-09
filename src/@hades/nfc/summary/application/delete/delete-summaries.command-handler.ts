import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteSummariesCommand } from './delete-summaries.command';
import { DeleteSummariesService } from './delete-summaries.service';

@CommandHandler(DeleteSummariesCommand)
export class DeleteSummariesCommandHandler implements ICommandHandler<DeleteSummariesCommand>
{
    constructor(
        private readonly deleteSummariesService: DeleteSummariesService
    ) { }

    async execute(command: DeleteSummariesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteSummariesService.main(command.queryStatements);
    }
}