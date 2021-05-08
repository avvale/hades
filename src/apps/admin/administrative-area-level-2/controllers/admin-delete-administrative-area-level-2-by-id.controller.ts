import { Controller, Param, Delete, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AdministrativeAreaLevel2Dto } from './../dto/administrative-area-level-2.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from '@hades/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@hades/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@hades/iam/shared/domain/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { FindAdministrativeAreaLevel2ByIdQuery } from '@hades/admin/administrative-area-level-2/application/find/find-administrative-area-level-2-by-id.query';
import { DeleteAdministrativeAreaLevel2ByIdCommand } from '@hades/admin/administrative-area-level-2/application/delete/delete-administrative-area-level-2-by-id.command';

@ApiTags('[admin] administrative-area-level-2')
@Controller('admin/administrative-area-level-2')
@Permissions('admin.administrativeAreaLevel2.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class AdminDeleteAdministrativeAreaLevel2ByIdController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete administrative-area-level-2 by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: AdministrativeAreaLevel2Dto })
    async main(
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const administrativeAreaLevel2 = await this.queryBus.ask(new FindAdministrativeAreaLevel2ByIdQuery(id, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteAdministrativeAreaLevel2ByIdCommand(id, constraint, { timezone }));

        return administrativeAreaLevel2;
    }
}