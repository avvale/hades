import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TenantResponse } from './../../domain/tenant.response';
import { FindTenantQuery } from './find-tenant.query';
import { FindTenantService } from './find-tenant.service';

@QueryHandler(FindTenantQuery)
export class FindTenantQueryHandler implements IQueryHandler<FindTenantQuery>
{
    constructor(
        private readonly findTenantService: FindTenantService
    ) { }

    async execute(query: FindTenantQuery): Promise<TenantResponse>
    {
        const tenant = await this.findTenantService.main(query.queryStatements);

        return new TenantResponse(
                tenant.id.value,
                tenant.name.value,
                tenant.code.value,
                tenant.logo.value,
                tenant.isActive.value,
                tenant.data.value,
                tenant.createdAt.value,
                tenant.updatedAt.value,
                tenant.deletedAt.value,
                
            );
    }
}