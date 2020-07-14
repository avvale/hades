import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { TagDto } from './../dto/tag.dto';
import { CreateTagDto } from './../dto/create-tag.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { InsertTagsCommand } from '@hades/nfc/tag/application/insert/insert-tags.command';

@ApiTags('[nfc] tag')
@Controller('nfc/tags')
export class InsertTagsController 
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Insert tags in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [TagDto] })
    @ApiBody({ type: [CreateTagDto] })
    async main(@Body() payload: CreateTagDto[])
    {
        await this.commandBus.dispatch(new InsertTagsCommand(payload));
    }
}