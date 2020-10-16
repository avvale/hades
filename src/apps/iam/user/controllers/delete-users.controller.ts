import { Controller, Delete, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { UserDto } from './../dto/user.dto';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetUsersQuery } from '@hades/iam/user/application/get/get-users.query';
import { DeleteUsersCommand } from '@hades/iam/user/application/delete/delete-users.command';

@ApiTags('[iam] user')
@Controller('iam/users')
@Permissions('iam.user.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class DeleteUsersController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete users in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [UserDto] })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(@Body('query') queryStatement?: QueryStatement, @Body('constraint') constraint?: QueryStatement, )
    {
        const users = await this.queryBus.ask(new GetUsersQuery(queryStatement, constraint));

        await this.commandBus.dispatch(new DeleteUsersCommand(queryStatement, constraint));

        return users;
    }
}