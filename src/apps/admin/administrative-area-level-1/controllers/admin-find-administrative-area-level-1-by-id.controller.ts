import { Controller, Get, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AdministrativeAreaLevel1Dto } from './../dto/administrative-area-level-1.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from '@hades/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@hades/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@hades/iam/shared/domain/modules/auth/guards/authorization.guard';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { FindAdministrativeAreaLevel1ByIdQuery } from '@hades/admin/administrative-area-level-1/application/find/find-administrative-area-level-1-by-id.query';

@ApiTags('[admin] administrative-area-level-1')
@Controller('admin/administrative-area-level-1')
@Permissions('admin.administrativeAreaLevel1.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class AdminFindAdministrativeAreaLevel1ByIdController
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Get(':id')
    @ApiOperation({ summary: 'Find administrative-area-level-1 by id' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: AdministrativeAreaLevel1Dto })
    async main(
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.queryBus.ask(new FindAdministrativeAreaLevel1ByIdQuery(id, constraint, { timezone }));
    }
}