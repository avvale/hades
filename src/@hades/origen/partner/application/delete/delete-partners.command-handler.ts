import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeletePartnersCommand } from './delete-partners.command';
import { DeletePartnersService } from './delete-partners.service';

@CommandHandler(DeletePartnersCommand)
export class DeletePartnersCommandHandler implements ICommandHandler<DeletePartnersCommand>
{
    constructor(
        private readonly deletePartnersService: DeletePartnersService,
    ) {}

    async execute(command: DeletePartnersCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deletePartnersService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}