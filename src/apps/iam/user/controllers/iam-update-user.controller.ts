import { Controller, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UpdateUserDto } from './../dto/update-user.dto';
import { UserDto } from './../dto/user.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { UpdateUserCommand } from '@hades/iam/user/application/update/update-user.command';
import { FindUserByIdQuery } from '@hades/iam/user/application/find/find-user-by-id.query';

@ApiTags('[iam] user')
@Controller('iam/user')
@Permissions('iam.user.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamUpdateUserController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update user' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: UserDto})
    async main(
        @Body() payload: UpdateUserDto,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new UpdateUserCommand(payload, constraint, { timezone }));

        return await this.queryBus.ask(new FindUserByIdQuery(payload.id, constraint, { timezone }));
    }
}