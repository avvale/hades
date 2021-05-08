import { Controller, Delete, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
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
import { GetAdministrativeAreasLevel2Query } from '@hades/admin/administrative-area-level-2/application/get/get-administrative-areas-level-2.query';
import { DeleteAdministrativeAreasLevel2Command } from '@hades/admin/administrative-area-level-2/application/delete/delete-administrative-areas-level-2.command';

@ApiTags('[admin] administrative-area-level-2')
@Controller('admin/administrative-areas-level-2')
@Permissions('admin.administrativeAreaLevel2.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class AdminDeleteAdministrativeAreasLevel2Controller
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete administrative-areas-level-2 in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [AdministrativeAreaLevel2Dto] })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const administrativeAreasLevel2 = await this.queryBus.ask(new GetAdministrativeAreasLevel2Query(queryStatement, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteAdministrativeAreasLevel2Command(queryStatement, constraint, { timezone }));

        return administrativeAreasLevel2;
    }
}