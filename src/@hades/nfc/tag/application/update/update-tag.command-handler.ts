import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTagCommand } from './update-tag.command';
import { UpdateTagService } from './update-tag.service';
import { 
    TagId, 
    TagCode, 
    TagTenantId, 
    TagTenantCode, 
    TagUrlBase, 
    TagParams, 
    TagOffset, 
    TagIsSessionRequired
    
} from './../../domain/value-objects';

@CommandHandler(UpdateTagCommand)
export class UpdateTagCommandHandler implements ICommandHandler<UpdateTagCommand>
{
    constructor(
        private readonly updateTagService: UpdateTagService
    ) { }

    async execute(command: UpdateTagCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateTagService.main(
            new TagId(command.id),
            new TagCode(command.code, { undefinable: true }),
            new TagTenantId(command.tenantId, { undefinable: true }),
            new TagTenantCode(command.tenantCode, { undefinable: true }),
            new TagUrlBase(command.urlBase, { undefinable: true }),
            new TagParams(command.params),
            new TagOffset(command.offset),
            new TagIsSessionRequired(command.isSessionRequired),
            
        )
    }
}