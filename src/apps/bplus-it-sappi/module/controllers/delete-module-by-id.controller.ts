import { Controller, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ModuleDto } from './../dto/module.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindModuleByIdQuery } from '@hades/bplus-it-sappi/module/application/find/find-module-by-id.query';
import { DeleteModuleByIdCommand } from '@hades/bplus-it-sappi/module/application/delete/delete-module-by-id.command';

@ApiTags('[bplus-it-sappi] module')
@Controller('bplus-it-sappi/module')
export class DeleteModuleByIdController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete module by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: ModuleDto })
    async main(@Param('id') id: string)
    {
        const module = await this.queryBus.ask(new FindModuleByIdQuery(id));

        await this.commandBus.dispatch(new DeleteModuleByIdCommand(id));

        return module;
    }
}