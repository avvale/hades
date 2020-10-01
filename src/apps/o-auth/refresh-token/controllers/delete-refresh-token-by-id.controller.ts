import { Controller, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { RefreshTokenDto } from './../dto/refresh-token.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindRefreshTokenByIdQuery } from '@hades/o-auth/refresh-token/application/find/find-refresh-token-by-id.query';
import { DeleteRefreshTokenByIdCommand } from '@hades/o-auth/refresh-token/application/delete/delete-refresh-token-by-id.command';

@ApiTags('[o-auth] refresh-token')
@Controller('o-auth/refresh-token')
export class DeleteRefreshTokenByIdController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete refresh-token by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: RefreshTokenDto })
    async main(@Param('id') id: string)
    {
        const refreshToken = await this.queryBus.ask(new FindRefreshTokenByIdQuery(id));

        await this.commandBus.dispatch(new DeleteRefreshTokenByIdCommand(id));

        return refreshToken;
    }
}