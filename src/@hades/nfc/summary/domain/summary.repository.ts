
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { NfcSummary } from './summary.aggregate';
import { SummaryId } from './value-objects';

export abstract class ISummaryRepository implements IRepository<NfcSummary>
{
    abstract readonly repository: any;

    // paginate records
    abstract async paginate(queryStatements: QueryStatementInput[], constraint: QueryStatementInput[]): Promise<Pagination<NfcSummary>>;

    // create a single record
    abstract async create(summary: NfcSummary): Promise<void>;

    // create a single or multiple records
    abstract async insert(summaries: NfcSummary[]): Promise<void>;

    // find a single record
    abstract async find(query: QueryStatementInput[]): Promise<NfcSummary | null>;

    // find a single record by id
    abstract async findById(id: SummaryId): Promise<NfcSummary | null>;

    // get multiple records
    abstract async get(query: QueryStatementInput[]): Promise<NfcSummary[]>;

    // update record
    abstract async update(summary: NfcSummary): Promise<void>;
  
    // delete record
    abstract async deleteById(id: SummaryId): Promise<void>;

    // delete records
    abstract async delete(query: QueryStatementInput[]): Promise<void>;
}