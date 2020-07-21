import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { TagDto } from './../dto/tag.dto';
import { CreateTagDto } from './../dto/create-tag.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateTagsCommand } from '@hades/nfc/tag/application/create/create-tags.command';

@ApiTags('[nfc] tag')
@Controller('nfc/tags')
export class CreateTagsController 
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create tags in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [TagDto] })
    @ApiBody({ type: [CreateTagDto] })
    async main(@Body() payload: CreateTagDto[])
    {
        await this.commandBus.dispatch(new CreateTagsCommand(payload));
    }
}