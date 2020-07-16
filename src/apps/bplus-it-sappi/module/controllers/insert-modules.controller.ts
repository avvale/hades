import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { ModuleDto } from './../dto/module.dto';
import { CreateModuleDto } from './../dto/create-module.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { InsertModulesCommand } from '@hades/bplus-it-sappi/module/application/insert/insert-modules.command';

@ApiTags('[bplus-it-sappi] module')
@Controller('bplus-it-sappi/modules')
export class InsertModulesController 
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Insert modules in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [ModuleDto] })
    @ApiBody({ type: [CreateModuleDto] })
    async main(@Body() payload: CreateModuleDto[])
    {
        await this.commandBus.dispatch(new InsertModulesCommand(payload));
    }
}