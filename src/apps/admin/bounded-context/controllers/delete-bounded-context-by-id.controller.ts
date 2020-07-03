import { Controller, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { BoundedContextDto } from './../dto/bounded-context.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { FindBoundedContextByIdQuery } from '@hades/admin/bounded-context/application/find/find-bounded-context-by-id.query';
import { DeleteBoundedContextByIdCommand } from '@hades/admin/bounded-context/application/delete/delete-bounded-context-by-id.command';

@ApiTags('[admin] bounded-context')
@ApiOkResponse({ description: 'The record has been deleted successfully.', type: BoundedContextDto})
@Controller('admin/bounded-context')
export class DeleteBoundedContextByIdController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete bounded-context by id' })
    async main(@Param('id') id: string)
    {
        const boundedContext = await this.queryBus.ask(new FindBoundedContextByIdQuery(id));

        await this.commandBus.dispatch(new DeleteBoundedContextByIdCommand(id));

        return boundedContext;
    }
}