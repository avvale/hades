import { Controller, Body, Put } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UpdateClientDto } from './../dto/update-client.dto';
import { ClientDto } from './../dto/client.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { UpdateClientCommand } from '@hades/o-auth/client/application/update/update-client.command';
import { FindClientByIdQuery } from '@hades/o-auth/client/application/find/find-client-by-id.query';

@ApiTags('[o-auth] client')
@Controller('o-auth/client')
export class UpdateClientController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update client' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: ClientDto})
    async main(@Body() payload: UpdateClientDto)
    {
        await this.commandBus.dispatch(new UpdateClientCommand(
            payload.id,
            payload.grantType,
            payload.name,
            payload.secret,
            payload.authUrl,
            payload.redirect,
            payload.expiredAccessToken,
            payload.expiredRefreshToken,
            payload.isRevoked,
            payload.isMaster,
            payload.applicationIds,
            
        ));

        return await this.queryBus.ask(new FindClientByIdQuery(payload.id));
    }
}