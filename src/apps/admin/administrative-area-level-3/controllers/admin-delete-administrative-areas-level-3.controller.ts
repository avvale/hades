import { Controller, Delete, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { AdministrativeAreaLevel3Dto } from './../dto/administrative-area-level-3.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetAdministrativeAreasLevel3Query } from '@hades/admin/administrative-area-level-3/application/get/get-administrative-areas-level-3.query';
import { DeleteAdministrativeAreasLevel3Command } from '@hades/admin/administrative-area-level-3/application/delete/delete-administrative-areas-level-3.command';

@ApiTags('[admin] administrative-area-level-3')
@Controller('admin/administrative-areas-level-3')
@Permissions('admin.administrativeAreaLevel3.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class AdminDeleteAdministrativeAreasLevel3Controller
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete administrative-areas-level-3 in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [AdministrativeAreaLevel3Dto] })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const administrativeAreasLevel3 = await this.queryBus.ask(new GetAdministrativeAreasLevel3Query(queryStatement, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteAdministrativeAreasLevel3Command(queryStatement, constraint, { timezone }));

        return administrativeAreasLevel3;
    }
}