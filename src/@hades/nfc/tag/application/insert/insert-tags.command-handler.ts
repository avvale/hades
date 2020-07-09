import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InsertTagsCommand } from './insert-tags.command';
import { InsertTagsService } from './insert-tags.service';
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

@CommandHandler(InsertTagsCommand)
export class InsertTagsCommandHandler implements ICommandHandler<InsertTagsCommand>
{
    constructor(
        private readonly insertTagsService: InsertTagsService
    ) { }

    async execute(command: InsertTagsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.insertTagsService.main(
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