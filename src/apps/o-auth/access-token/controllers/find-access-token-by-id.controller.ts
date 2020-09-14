import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AccessTokenDto } from './../dto/access-token.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindAccessTokenByIdQuery } from '@hades/o-auth/access-token/application/find/find-access-token-by-id.query';

@ApiTags('[o-auth] access-token')
@Controller('o-auth/access-token')
export class FindAccessTokenByIdController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get(':id')
    @ApiOperation({ summary: 'Find access-token by id' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: AccessTokenDto })
    async main(@Param('id') id: string)
    {
        return await this.queryBus.ask(new FindAccessTokenByIdQuery(id));
    }
}