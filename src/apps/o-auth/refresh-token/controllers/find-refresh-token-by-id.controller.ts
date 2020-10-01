import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { RefreshTokenDto } from './../dto/refresh-token.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindRefreshTokenByIdQuery } from '@hades/o-auth/refresh-token/application/find/find-refresh-token-by-id.query';

@ApiTags('[o-auth] refresh-token')
@Controller('o-auth/refresh-token')
export class FindRefreshTokenByIdController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get(':id')
    @ApiOperation({ summary: 'Find refresh-token by id' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: RefreshTokenDto })
    async main(@Param('id') id: string)
    {
        return await this.queryBus.ask(new FindRefreshTokenByIdQuery(id));
    }
}