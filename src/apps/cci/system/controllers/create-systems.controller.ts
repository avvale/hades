import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { SystemDto } from './../dto/system.dto';
import { CreateSystemDto } from './../dto/create-system.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateSystemsCommand } from '@hades/cci/system/application/create/create-systems.command';

@ApiTags('[cci] system')
@Controller('cci/systems')
export class CreateSystemsController 
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create systems in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [SystemDto] })
    @ApiBody({ type: [CreateSystemDto] })
    async main(@Body() payload: CreateSystemDto[])
    {
        await this.commandBus.dispatch(new CreateSystemsCommand(payload));
    }
}