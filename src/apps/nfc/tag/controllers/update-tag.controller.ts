import { Controller, Body, Put } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UpdateTagDto } from './../dto/update-tag.dto';
import { TagDto } from './../dto/tag.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { UpdateTagCommand } from '@hades/nfc/tag/application/update/update-tag.command';
import { FindTagByIdQuery } from '@hades/nfc/tag/application/find/find-tag-by-id.query';

@ApiTags('[nfc] tag')
@Controller('nfc/tag')
export class UpdateTagController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update tag' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: TagDto})
    async main(@Body() payload: UpdateTagDto)
    {
        await this.commandBus.dispatch(new UpdateTagCommand(
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