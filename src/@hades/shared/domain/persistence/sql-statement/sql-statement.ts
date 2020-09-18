import { ApiProperty } from '@nestjs/swagger';
import { IndexHints } from './index-hints';

export type Any = any;

export enum Operator
{
    eq = 'eq',
    ne = 'ne',
    gte = 'gte',
    gt = 'gt',
    lte = 'lte',
    lt = 'lt',
    not = 'not',
    is = 'is',
    in = 'in',
    notIn = 'notIn',
    like = 'like',
    notLike = 'notLike',
    iLike = 'iLike',
    notILike = 'notILike',
    startsWith = 'startsWith',
    endsWith = 'endsWith',
    substring = 'substring',
    regexp = 'regexp',
    notRegexp = 'notRegexp',
    iRegexp = 'iRegexp',
    notIRegexp = 'notIRegexp',
    between = 'between',
    notBetween = 'notBetween',
    overlap = 'overlap',
    contains = 'contains',
    contained = 'contained',
    adjacent = 'adjacent',
    strictLeft = 'strictLeft',
    strictRight = 'strictRight',
    noExtendRight = 'noExtendRight',
    noExtendLeft = 'noExtendLeft',
    and = 'and',
    or = 'or',
    any = 'any',
    all = 'all',
    values = 'values',
    col = 'col',
    placeholder = 'placeholder',
    join = 'join'
}

export interface IndexHint 
{
    type: IndexHints;
    values: string[];
}

export interface Filterable 
{
    /**
     * Attribute has to be matched for rows to be selected for the given action.
     */
    where?: any;
}

export interface Projectable 
{
    /**
     * A list of the attributes that you want to select. To rename an attribute, you can pass an array, with
     * two elements - the first is the name of the attribute in the DB (or some kind of expression such as
     * `Sequelize.literal`, `Sequelize.fn` and so on), and the second is the name you want the attribute to
     * have in the returned instance
     */
    attributes?: any;
}

// MySQL only.
export interface IndexHintable 
{    
    indexHints?: IndexHint[];
}

export interface QueryStatement extends Filterable, Projectable, IndexHintable
{
    /**
     * A list of associations to eagerly load using a left join (a single association is also supported). Supported is either
     * `{ include: Model1 }`, `{ include: [ Model1, Model2, ...]}`, `{ include: [{ model: Model1, as: 'Alias' }]}` or
     * `{ include: [{ all: true }]}`.
     * If your association are set up with an `as` (eg. `X.hasMany(Y, { as: 'Z }`, you need to specify Z in
     * the as attribute when eager loading Y).
     */
    include?: any;

    /**
     * Specifies an ordering. If a string is provided, it will be escaped. Using an array, you can provide
     * several columns / functions to order by. Each element can be further wrapped in a two-element array. The
     * first element is the column / function to order by, the second is the direction. For example:
     * `order: [['name', 'DESC']]`. In this way the column will be escaped, but the direction will not.
     */
    order?: any;

    /**
     * GROUP BY in sql
     */
    group?: any;

    /**
     * Limit the results
     */
    limit?: number;

    /**
     * Skip the results;
     */
    offset?: number;

    /**
     * Lock the selected rows. Possible options are transaction.LOCK.UPDATE and transaction.LOCK.SHARE.
     * Postgres also supports transaction.LOCK.KEY_SHARE, transaction.LOCK.NO_KEY_UPDATE and specific model
     * locks with joins. See [transaction.LOCK for an example](transaction#lock)
     */
    lock?: any;

    /**
     * Skip locked rows. Only supported in Postgres.
     */
    skipLocked?: boolean;

    /**
     * Return raw result. See sequelize.query for more information.
     */
    raw?: boolean;

    /**
     * Select group rows after groups and aggregates are computed.
     */
    having?: any;

    /**
     * Use sub queries (internal)
     */
    subQuery?: boolean;
}



/* export class QueryStatementInput 
{
    @ApiProperty({
        enum        : Command,
        description : 'Query command',
        example     : 'WHERE'
    })
    command: Command;

    @ApiProperty({
        type        : String,
        description : 'Column name on which the query will be made',
        example     : 'admin_user.name'
    })
    column?: string;

    @ApiProperty({
        enum        : Operator,
        description : 'Operator to be used in the query',
        example     : 'LIKE'
    })
    operator?: Operator;

    @ApiProperty({
        type        : String,
        description : 'Value to be used to operate with the operator',
        example     : '%John Doe%'
    })
    value?: Any;
} */