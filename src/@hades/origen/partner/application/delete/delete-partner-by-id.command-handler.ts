import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeletePartnerByIdCommand } from './delete-partner-by-id.command';
import { DeletePartnerByIdService } from './delete-partner-by-id.service';
import {
    PartnerId
} from './../../domain/value-objects';

@CommandHandler(DeletePartnerByIdCommand)
export class DeletePartnerByIdCommandHandler implements ICommandHandler<DeletePartnerByIdCommand>
{
    constructor(
        private readonly deletePartnerByIdService: DeletePartnerByIdService,
    ) {}

    async execute(command: DeletePartnerByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deletePartnerByIdService.main(
            new PartnerId(command.id),
            command.constraint,
            command.cQMetadata
        );
    }
}