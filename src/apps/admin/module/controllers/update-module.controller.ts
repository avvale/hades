import { Controller, Body, Put } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { UpdateModuleDto } from './../dto/update-module.dto';
import { ModuleDto } from './../dto/module.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { UpdateModuleCommand } from '@hades/admin/module/application/update/update-module.command';
import { FindModuleByIdQuery } from '@hades/admin/module/application/find/find-module-by-id.query';

@ApiTags('module')
@ApiCreatedResponse({ description: 'The record has been successfully updated.', type: ModuleDto})
@Controller('admin/module')
export class UpdateModuleController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Put()
    async main(@Body() payload: UpdateModuleDto)
    {
        await this.commandBus.dispatch(new UpdateModuleCommand(
            payload.id,
            payload.name,
            payload.root,
            payload.sort,
            payload.isActive,
            
        ));

        return await this.queryBus.ask(new FindModuleByIdQuery(payload.id));
    }
}