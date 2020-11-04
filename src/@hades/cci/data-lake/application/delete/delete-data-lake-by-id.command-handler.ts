import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteDataLakeByIdCommand } from './delete-data-lake-by-id.command';
import { DeleteDataLakeByIdService } from './delete-data-lake-by-id.service';
import {
    DataLakeId
} from './../../domain/value-objects';

@CommandHandler(DeleteDataLakeByIdCommand)
export class DeleteDataLakeByIdCommandHandler implements ICommandHandler<DeleteDataLakeByIdCommand>
{
    constructor(
        private readonly deleteDataLakeByIdService: DeleteDataLakeByIdService,
    ) {}

    async execute(command: DeleteDataLakeByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteDataLakeByIdService.main(
            new DataLakeId(command.id),
            command.constraint,
            command.cQMetadata
        );
    }
}