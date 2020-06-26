import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SystemResponse } from './../../domain/system.response';
import { GetSystemsQuery } from './get-systems.query';
import { GetSystemsService } from './get-systems.service';

@QueryHandler(GetSystemsQuery)
export class GetSystemsQueryHandler implements IQueryHandler<GetSystemsQuery>
{
    constructor(
        private readonly getSystemsService: GetSystemsService
    ) { }

    async execute(query: GetSystemsQuery): Promise<SystemResponse[]>
    {
        return (await this.getSystemsService.main(query.queryStatements)).map(system => new SystemResponse(
                system.id.value,
                system.tenantId.value,
                system.name.value,
                system.tenantCode.value,
                system.environment.value,
                system.version.value,
                system.isActive.value,
                system.cancelledAt.value,
                system.createdAt.value,
                system.updatedAt.value,
                system.deletedAt.value,
                
            ));
    }
}