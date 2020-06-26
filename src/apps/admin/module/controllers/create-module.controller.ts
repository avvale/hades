import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { CreateModuleDto } from './../dto/create-module.dto';
import { ModuleDto } from './../dto/module.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { FindModuleByIdQuery } from '@hades/admin/module/application/find/find-module-by-id.query';
import { CreateModuleCommand } from '@hades/admin/module/application/create/create-module.command';

@ApiTags('module')
@ApiCreatedResponse({ description: 'The record has been successfully created.', type: ModuleDto})
@Controller('admin/module')
export class CreateModuleController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Post()
    async main(@Body() payload: CreateModuleDto)
    {
        await this.commandBus.dispatch(new CreateModuleCommand(
            payload.id,
            payload.name,
            payload.root,
            payload.sort,
            payload.isActive,
            
        ));

        return await this.queryBus.ask(new FindModuleByIdQuery(payload.id));
    }
}