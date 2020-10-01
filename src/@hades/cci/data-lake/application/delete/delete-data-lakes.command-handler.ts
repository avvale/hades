import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteDataLakesCommand } from './delete-data-lakes.command';
import { DeleteDataLakesService } from './delete-data-lakes.service';

@CommandHandler(DeleteDataLakesCommand)
export class DeleteDataLakesCommandHandler implements ICommandHandler<DeleteDataLakesCommand>
{
    constructor(
        private readonly deleteDataLakesService: DeleteDataLakesService
    ) { }

    async execute(command: DeleteDataLakesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteDataLakesService.main(command.queryStatement);
    }
}