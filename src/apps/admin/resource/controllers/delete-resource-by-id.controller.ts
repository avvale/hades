import { Controller, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ResourceDto } from './../dto/resource.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { FindResourceByIdQuery } from '@hades/admin/resource/application/find/find-resource-by-id.query';
import { DeleteResourceByIdCommand } from '@hades/admin/resource/application/delete/delete-resource-by-id.command';

@ApiTags('[admin] resource')
@ApiOkResponse({ description: 'The record has been deleted successfully.', type: ResourceDto})
@Controller('admin/resource')
export class DeleteResourceByIdController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete resource by id' })
    async main(@Param('id') id: string)
    {
        const resource = await this.queryBus.ask(new FindResourceByIdQuery(id));

        await this.commandBus.dispatch(new DeleteResourceByIdCommand(id));

        return resource;
    }
}