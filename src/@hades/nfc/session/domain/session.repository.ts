
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { NfcSession } from './session.aggregate';
import { SessionId } from './value-objects';

export abstract class ISessionRepository implements IRepository<NfcSession>
{
    abstract readonly repository: any;

    // paginate records
    abstract async paginate(queryStatements: QueryStatementInput[], constraints: QueryStatementInput[]): Promise<Pagination<NfcSession>>;

    // create a single record
    abstract async create(session: NfcSession): Promise<void>;

    // create a single or multiple records
    abstract async insert(sessions: NfcSession[], options?: object): Promise<void>;

    // find a single record
    abstract async find(query: QueryStatementInput[]): Promise<NfcSession | null>;

    // find a single record by id
    abstract async findById(id: SessionId): Promise<NfcSession | null>;

    // get multiple records
    abstract async get(query: QueryStatementInput[]): Promise<NfcSession[]>;

    // update record
    abstract async update(session: NfcSession): Promise<void>;
  
    // delete record
    abstract async deleteById(id: SessionId): Promise<void>;

    // delete records
    abstract async delete(query: QueryStatementInput[]): Promise<void>;
}