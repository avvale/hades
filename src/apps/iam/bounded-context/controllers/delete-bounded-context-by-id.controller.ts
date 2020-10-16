import { Controller, Param, Delete, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { BoundedContextDto } from './../dto/bounded-context.dto';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { FindBoundedContextByIdQuery } from '@hades/iam/bounded-context/application/find/find-bounded-context-by-id.query';
import { DeleteBoundedContextByIdCommand } from '@hades/iam/bounded-context/application/delete/delete-bounded-context-by-id.command';

@ApiTags('[iam] bounded-context')
@Controller('iam/bounded-context')
@Permissions('iam.boundedContext.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class DeleteBoundedContextByIdController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete bounded-context by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: BoundedContextDto })
    async main(@Param('id') id: string, @Body('constraint') constraint?: QueryStatement, )
    {
        const boundedContext = await this.queryBus.ask(new FindBoundedContextByIdQuery(id, constraint));

        await this.commandBus.dispatch(new DeleteBoundedContextByIdCommand(id, constraint));

        return boundedContext;
    }
}