import { Controller, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AccessTokenDto } from './../dto/access-token.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindAccessTokenByIdQuery } from '@hades/o-auth/access-token/application/find/find-access-token-by-id.query';
import { DeleteAccessTokenByIdCommand } from '@hades/o-auth/access-token/application/delete/delete-access-token-by-id.command';

@ApiTags('[o-auth] access-token')
@Controller('o-auth/access-token')
export class DeleteAccessTokenByIdController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete access-token by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: AccessTokenDto })
    async main(@Param('id') id: string)
    {
        const accessToken = await this.queryBus.ask(new FindAccessTokenByIdQuery(id));

        await this.commandBus.dispatch(new DeleteAccessTokenByIdCommand(id));

        return accessToken;
    }
}