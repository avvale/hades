import { Controller, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { ModuleDto } from './../dto/module.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { FindModuleByIdQuery } from '@hades/admin/module/application/find/find-module-by-id.query';
import { DeleteModuleByIdCommand } from '@hades/admin/module/application/delete/delete-module-by-id.command';

@ApiTags('module')
@ApiOkResponse({ description: 'The record has been deleted successfully.', type: ModuleDto})
@Controller('admin/module')
export class DeleteModuleByIdController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete(':id')
    async main(@Param('id') id: string)
    {
        const module = await this.queryBus.ask(new FindModuleByIdQuery(id));

        await this.commandBus.dispatch(new DeleteModuleByIdCommand(id));

        return module;
    }
}