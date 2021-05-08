import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateUserDto } from './../dto/create-user.dto';
import { UserDto } from './../dto/user.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from '@hades/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@hades/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@hades/iam/shared/domain/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindUserByIdQuery } from '@hades/iam/user/application/find/find-user-by-id.query';
import { CreateUserCommand } from '@hades/iam/user/application/create/create-user.command';

@ApiTags('[iam] user')
@Controller('iam/user')
@Permissions('iam.user.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamCreateUserController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create user' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: UserDto })
    async main(
        @Body() payload: CreateUserDto,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateUserCommand(payload, { timezone }));

        return await this.queryBus.ask(new FindUserByIdQuery(payload.id, {}, { timezone }));
    }
}