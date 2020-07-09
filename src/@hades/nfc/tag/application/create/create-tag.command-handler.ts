import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTagCommand } from './create-tag.command';
import { CreateTagService } from './create-tag.service';
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

@CommandHandler(CreateTagCommand)
export class CreateTagCommandHandler implements ICommandHandler<CreateTagCommand>
{
    constructor(
        private readonly createTagService: CreateTagService
    ) { }

    async execute(command: CreateTagCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createTagService.main(
            new TagId(command.id),
            new TagCode(command.code),
            new TagTenantId(command.tenantId),
            new TagTenantCode(command.tenantCode),
            new TagUrlBase(command.urlBase),
            new TagParams(command.params),
            new TagOffset(command.offset),
            new TagIsSessionRequired(command.isSessionRequired),
            
        );
    }
}