import { Controller, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { TagDto } from './../dto/tag.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindTagByIdQuery } from '@hades/nfc/tag/application/find/find-tag-by-id.query';
import { DeleteTagByIdCommand } from '@hades/nfc/tag/application/delete/delete-tag-by-id.command';

@ApiTags('[nfc] tag')
@Controller('nfc/tag')
export class DeleteTagByIdController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete tag by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: TagDto })
    async main(@Param('id') id: string)
    {
        const tag = await this.queryBus.ask(new FindTagByIdQuery(id));

        await this.commandBus.dispatch(new DeleteTagByIdCommand(id));

        return tag;
    }
}