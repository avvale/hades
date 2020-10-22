import { Controller, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UpdateModuleDto } from './../dto/update-module.dto';
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
import { UpdateModuleCommand } from '@hades/cci/module/application/update/update-module.command';
import { FindModuleByIdQuery } from '@hades/cci/module/application/find/find-module-by-id.query';

@ApiTags('[cci] module')
@Controller('cci/module')
@Permissions('cci.module.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class UpdateModuleController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update module' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: ModuleDto})
    @TenantConstraint()
    async main(@CurrentAccount() account: AccountResponse, @Body() payload: UpdateModuleDto, @Body('constraint') constraint?: QueryStatement, )
    {
        await this.commandBus.dispatch(new UpdateModuleCommand(
            payload.id,
            payload.tenantId,
            payload.tenantCode,
            payload.systemId,
            payload.systemName,
            payload.channelHash,
            payload.channelParty,
            payload.channelComponent,
            payload.channelName,
            payload.flowHash,
            payload.flowParty,
            payload.flowReceiverParty,
            payload.flowComponent,
            payload.flowReceiverComponent,
            payload.flowInterfaceName,
            payload.flowInterfaceNamespace,
            payload.version,
            payload.parameterGroup,
            payload.name,
            payload.parameterName,
            payload.parameterValue,
            constraint,
        ));

        return await this.queryBus.ask(new FindModuleByIdQuery(payload.id, constraint));
    }
}