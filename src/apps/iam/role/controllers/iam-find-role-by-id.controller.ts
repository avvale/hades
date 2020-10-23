import { Controller, Get, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { RoleDto } from './../dto/role.dto';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { FindRoleByIdQuery } from '@hades/iam/role/application/find/find-role-by-id.query';

@ApiTags('[iam] role')
@Controller('iam/role')
@Permissions('iam.role.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamFindRoleByIdController
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get(':id')
    @ApiOperation({ summary: 'Find role by id' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: RoleDto })
    async main(@Param('id') id: string, @Body('constraint') constraint?: QueryStatement)
    {
        return await this.queryBus.ask(new FindRoleByIdQuery(id, constraint));
    }
}