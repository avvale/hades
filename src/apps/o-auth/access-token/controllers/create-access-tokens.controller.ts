import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { AccessTokenDto } from './../dto/access-token.dto';
import { CreateAccessTokenDto } from './../dto/create-access-token.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateAccessTokensCommand } from '@hades/o-auth/access-token/application/create/create-access-tokens.command';

@ApiTags('[o-auth] access-token')
@Controller('o-auth/access-tokens')
export class CreateAccessTokensController 
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create access-tokens in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [AccessTokenDto] })
    @ApiBody({ type: [CreateAccessTokenDto] })
    async main(@Body() payload: CreateAccessTokenDto[])
    {
        await this.commandBus.dispatch(new CreateAccessTokensCommand(payload));
    }
}