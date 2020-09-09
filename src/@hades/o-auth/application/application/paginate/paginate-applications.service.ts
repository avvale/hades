import { Injectable } from '@nestjs/common';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { IApplicationRepository } from './../../domain/application.repository';
import { OAuthApplication } from './../../domain/application.aggregate';

@Injectable()
export class PaginateApplicationsService
{
    constructor(
        private readonly repository: IApplicationRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[], constraints: QueryStatementInput[]): Promise<Pagination<OAuthApplication>>
    {        
        return await this.repository.paginate(queryStatements, constraints);
    }
}