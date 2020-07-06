import { Injectable } from '@nestjs/common';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { IResourceRepository } from './../../domain/resource.repository';
import { AdminResource } from './../../domain/resource.aggregate';

@Injectable()
export class GetResourcesService
{
    constructor(
        private readonly repository: IResourceRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[]): Promise<AdminResource[]>
    {        
        return await this.repository.get(queryStatements);
    }
}