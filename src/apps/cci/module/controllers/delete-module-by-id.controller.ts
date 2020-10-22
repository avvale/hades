import { Controller, Param, Delete, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
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
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { FindModuleByIdQuery } from '@hades/cci/module/application/find/find-module-by-id.query';
import { DeleteModuleByIdCommand } from '@hades/cci/module/application/delete/delete-module-by-id.command';

@ApiTags('[cci] module')
@Controller('cci/module')
@Permissions('cci.module.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class DeleteModuleByIdController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete module by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: ModuleDto })
    @TenantConstraint()
    async main(@CurrentAccount() account: AccountResponse, @Param('id') id: string, @Body('constraint') constraint?: QueryStatement, )
    {
        const module = await this.queryBus.ask(new FindModuleByIdQuery(id, constraint));

        await this.commandBus.dispatch(new DeleteModuleByIdCommand(id, constraint));

        return module;
    }
}