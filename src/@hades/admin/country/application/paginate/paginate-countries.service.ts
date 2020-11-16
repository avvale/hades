import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { ICountryRepository } from './../../domain/country.repository';
import { AdminCountry } from './../../domain/country.aggregate';

@Injectable()
export class PaginateCountriesService
{
    constructor(
        private readonly repository: ICountryRepository,
    ) {}

    public async main(queryStatement?: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<Pagination<AdminCountry>>
    {
        return await this.repository.paginate(queryStatement, constraint, cQMetadata);
    }
}