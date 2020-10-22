import { Controller, Get, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { ModuleDto } from './../dto/module.dto';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// tenant
import { AccountResponse } from '@hades/iam/account/domain/account.response';
import { CurrentAccount } from './../../../shared/decorators/current-account.decorator';
import { TenantConstraint } from './../../../shared/decorators/tenant-constraint.decorator';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { FindModuleQuery } from '@hades/cci/module/application/find/find-module.query';

@ApiTags('[cci] module')
@Controller('cci/module')
@Permissions('cci.module.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class FindModuleController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find module according to query' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: ModuleDto })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    @TenantConstraint()
    async main(@CurrentAccount() account: AccountResponse, @Body('query') queryStatement?: QueryStatement, @Body('constraint') constraint?: QueryStatement, )
    {
        return await this.queryBus.ask(new FindModuleQuery(queryStatement, constraint));   
    }
}