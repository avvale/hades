import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { ICountryRepository } from './../../domain/country.repository';
import { AdminCountry } from './../../domain/country.aggregate';
import { CountryId } from './../../domain/value-objects';

@Injectable()
export class FindCountryByIdService
{
    constructor(
        private readonly repository: ICountryRepository,
    ) {}

    public async main(id: CountryId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<AdminCountry>
    {
        return await this.repository.findById(id, constraint, cQMetadata);
    }
}