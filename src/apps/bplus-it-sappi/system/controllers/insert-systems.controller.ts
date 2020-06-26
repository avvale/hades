import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody } from '@nestjs/swagger';
import { CreateSystemDto } from './../dto/create-system.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { InsertSystemsCommand } from '@hades/bplus-it-sappi/system/application/insert/insert-systems.command';

@ApiTags('system')
@ApiCreatedResponse({ description: 'The records has been created successfully.'})
@Controller('bplus-it-sappi/systems')
export class InsertSystemsController 
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiBody({ 
        type: [CreateSystemDto]
    })
    async main(@Body() payload: CreateSystemDto[])
    {
        await this.commandBus.dispatch(new InsertSystemsCommand(payload));
    }
}