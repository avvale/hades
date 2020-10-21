import { Controller, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UpdateSystemDto } from './../dto/update-system.dto';
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
import { UpdateSystemCommand } from '@hades/cci/system/application/update/update-system.command';
import { FindSystemByIdQuery } from '@hades/cci/system/application/find/find-system-by-id.query';

@ApiTags('[cci] system')
@Controller('cci/system')
@Permissions('cci.system.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class UpdateSystemController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update system' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: SystemDto})
    @TenantConstraint()
    async main(@CurrentAccount() account: AccountResponse, @Body() payload: UpdateSystemDto, @Body('constraint') constraint?: QueryStatement, )
    {
        await this.commandBus.dispatch(new UpdateSystemCommand(
            payload.id,
            payload.tenantId,
            payload.tenantCode,
            payload.version,
            payload.name,
            payload.environment,
            payload.technology,
            payload.isActive,
            payload.cancelledAt,
            constraint,
        ));

        return await this.queryBus.ask(new FindSystemByIdQuery(payload.id, constraint));
    }
}