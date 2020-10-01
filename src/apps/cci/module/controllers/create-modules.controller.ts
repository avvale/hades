import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { ModuleDto } from './../dto/module.dto';
import { CreateModuleDto } from './../dto/create-module.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateModulesCommand } from '@hades/cci/module/application/create/create-modules.command';

@ApiTags('[cci] module')
@Controller('cci/modules')
export class CreateModulesController 
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create modules in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [ModuleDto] })
    @ApiBody({ type: [CreateModuleDto] })
    async main(@Body() payload: CreateModuleDto[])
    {
        await this.commandBus.dispatch(new CreateModulesCommand(payload));
    }
}