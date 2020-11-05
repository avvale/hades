import { Controller, Post, Body, Headers } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { CredentialDto } from './../dto/credential.dto';
import { CreateCredentialDto } from './../dto/create-credential.dto';
import { OAuthClientGrantType } from './../../../../graphql';

// custom
import { ClientCredentialsGrantService } from './../lib/client-credentials-grant.service';
import { PasswordGrantService } from './../lib/password-grant.service';

@ApiTags('[o-auth] credential')
@Controller('o-auth/credential')
export class OAuthCreateCredentialController
{
    constructor(
        private readonly clientClientGrantService: ClientCredentialsGrantService,
        private readonly passwordGrantService: PasswordGrantService,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create credential' })
    @ApiCreatedResponse({ description: 'The credential obtained after login.' , type: CredentialDto })
    @ApiBody({ type: CreateCredentialDto })
    async main(
        @Body() payload: CreateCredentialDto,
        @Headers('Authorization') authorization: string
    )
    {
        if (payload.grantType === OAuthClientGrantType.AUTHORIZATION_CODE)
        {

        }

        if (payload.grantType === OAuthClientGrantType.CLIENT_CREDENTIALS)
        {
            return this.clientClientGrantService.getCredential(payload);
        }

        if (payload.grantType === OAuthClientGrantType.PASSWORD)
        {
            return this.passwordGrantService.getCredential(payload, authorization);
        }
    }
}