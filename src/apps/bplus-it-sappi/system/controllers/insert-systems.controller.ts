import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { SystemDto } from './../dto/system.dto';
import { CreateSystemDto } from './../dto/create-system.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { InsertSystemsCommand } from '@hades/bplus-it-sappi/system/application/insert/insert-systems.command';

@ApiTags('[bplus-it-sappi] system')
@Controller('bplus-it-sappi/systems')
export class InsertSystemsController 
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Insert systems in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [SystemDto] })
    @ApiBody({ type: [CreateSystemDto] })
    async main(@Body() payload: CreateSystemDto[])
    {
        await this.commandBus.dispatch(new InsertSystemsCommand(payload));
    }
}