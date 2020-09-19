import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { IApplicationRepository } from './../../domain/application.repository';
import { OAuthApplication } from './../../domain/application.aggregate';

@Injectable()
export class GetApplicationsService
{
    constructor(
        private readonly repository: IApplicationRepository
    ) {}

    public async main(queryStatement: QueryStatement): Promise<OAuthApplication[]>
    {        
        return await this.repository.get(queryStatement);
    }
}