import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TenantResponse } from './../../domain/tenant.response';
import { GetTenantsQuery } from './get-tenants.query';
import { GetTenantsService } from './get-tenants.service';

@QueryHandler(GetTenantsQuery)
export class GetTenantsQueryHandler implements IQueryHandler<GetTenantsQuery>
{
    constructor(
        private readonly getTenantsService: GetTenantsService
    ) { }

    async execute(query: GetTenantsQuery): Promise<TenantResponse[]>
    {
        return (await this.getTenantsService.main(query.queryStatements)).map(tenant => new TenantResponse(
                tenant.id.value,
                tenant.name.value,
                tenant.code.value,
                tenant.logo.value,
                tenant.isActive.value,
                tenant.data.value,
                tenant.createdAt.value,
                tenant.updatedAt.value,
                tenant.deletedAt.value,
                
            ));
    }
}