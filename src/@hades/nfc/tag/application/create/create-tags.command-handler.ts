import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTagsCommand } from './create-tags.command';
import { CreateTagsService } from './create-tags.service';
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

@CommandHandler(CreateTagsCommand)
export class CreateTagsCommandHandler implements ICommandHandler<CreateTagsCommand>
{
    constructor(
        private readonly createTagsService: CreateTagsService
    ) { }

    async execute(command: CreateTagsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createTagsService.main(
            command.tags
                .map(tag => { 
                    return {
                        id: new TagId(tag.id),
                        code: new TagCode(tag.code),
                        tenantId: new TagTenantId(tag.tenantId),
                        tenantCode: new TagTenantCode(tag.tenantCode),
                        urlBase: new TagUrlBase(tag.urlBase),
                        params: new TagParams(tag.params),
                        offset: new TagOffset(tag.offset),
                        isSessionRequired: new TagIsSessionRequired(tag.isSessionRequired),
                        
                    }
                })
        );
    }
}