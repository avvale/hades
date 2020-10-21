import { Controller, Param, Delete, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { SystemDto } from './../dto/system.dto';

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
import { FindSystemByIdQuery } from '@hades/cci/system/application/find/find-system-by-id.query';
import { DeleteSystemByIdCommand } from '@hades/cci/system/application/delete/delete-system-by-id.command';

@ApiTags('[cci] system')
@Controller('cci/system')
@Permissions('cci.system.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class DeleteSystemByIdController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete system by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: SystemDto })
    @TenantConstraint()
    async main(@CurrentAccount() account: AccountResponse, @Param('id') id: string, @Body('constraint') constraint?: QueryStatement, )
    {
        const system = await this.queryBus.ask(new FindSystemByIdQuery(id, constraint));

        await this.commandBus.dispatch(new DeleteSystemByIdCommand(id, constraint));

        return system;
    }
}