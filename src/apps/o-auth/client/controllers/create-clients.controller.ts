import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { ClientDto } from './../dto/client.dto';
import { CreateClientDto } from './../dto/create-client.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateClientsCommand } from '@hades/o-auth/client/application/create/create-clients.command';

@ApiTags('[o-auth] client')
@Controller('o-auth/clients')
export class CreateClientsController 
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create clients in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [ClientDto] })
    @ApiBody({ type: [CreateClientDto] })
    async main(@Body() payload: CreateClientDto[])
    {
        await this.commandBus.dispatch(new CreateClientsCommand(payload));
    }
}