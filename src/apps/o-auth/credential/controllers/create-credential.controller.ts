import { Controller, Post, Body, Headers } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { CredentialDto } from '../dto/credential.dto';
import { CreateCredentialDto } from '../dto/create-credential.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateCredentialCommand } from '@hades/o-auth/credential/application/create/create-credential.command';

@ApiTags('[o-auth] credential')
@Controller('o-auth/credential')
export class CreateCredentialController 
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create credential' })
    @ApiCreatedResponse({ description: 'The credential obtained after login.' , type: CredentialDto })
    @ApiBody({ type: CreateCredentialDto })
    async main(@Body() payload: CreateCredentialDto, @Headers('Authorization') authorization: string)
    {
        await this.commandBus.dispatch(new CreateCredentialCommand(
            payload.grantType,
            payload.username,
            payload.password,
            payload.accessTokenId,
            payload.refreshToken,
            payload.clientSecret,
            payload.redirect
        ));
    }
}