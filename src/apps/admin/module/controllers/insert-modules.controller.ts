import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody } from '@nestjs/swagger';
import { CreateModuleDto } from './../dto/create-module.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { InsertModulesCommand } from '@hades/admin/module/application/insert/insert-modules.command';

@ApiTags('module')
@ApiCreatedResponse({ description: 'The records has been created successfully.'})
@Controller('admin/modules')
export class InsertModulesController 
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiBody({ 
        type: [CreateModuleDto]
    })
    async main(@Body() payload: CreateModuleDto[])
    {
        await this.commandBus.dispatch(new InsertModulesCommand(payload));
    }
}