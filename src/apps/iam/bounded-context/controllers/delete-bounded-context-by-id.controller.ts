import { Controller, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { BoundedContextDto } from './../dto/bounded-context.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindBoundedContextByIdQuery } from '@hades/iam/bounded-context/application/find/find-bounded-context-by-id.query';
import { DeleteBoundedContextByIdCommand } from '@hades/iam/bounded-context/application/delete/delete-bounded-context-by-id.command';

@ApiTags('[iam] bounded-context')
@Controller('iam/bounded-context')
export class DeleteBoundedContextByIdController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete bounded-context by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: BoundedContextDto })
    async main(@Param('id') id: string)
    {
        const boundedContext = await this.queryBus.ask(new FindBoundedContextByIdQuery(id));

        await this.commandBus.dispatch(new DeleteBoundedContextByIdCommand(id));

        return boundedContext;
    }
}