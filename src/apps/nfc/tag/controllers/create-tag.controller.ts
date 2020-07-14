import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateTagDto } from './../dto/create-tag.dto';
import { TagDto } from './../dto/tag.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindTagByIdQuery } from '@hades/nfc/tag/application/find/find-tag-by-id.query';
import { CreateTagCommand } from '@hades/nfc/tag/application/create/create-tag.command';

@ApiTags('[nfc] tag')
@Controller('nfc/tag')
export class CreateTagController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create tag' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: TagDto })
    async main(@Body() payload: CreateTagDto)
    {
        await this.commandBus.dispatch(new CreateTagCommand(
            payload.id,
            payload.code,
            payload.tenantId,
            payload.tenantCode,
            payload.urlBase,
            payload.params,
            payload.offset,
            payload.isSessionRequired,
            
        ));

        return await this.queryBus.ask(new FindTagByIdQuery(payload.id));
    }
}