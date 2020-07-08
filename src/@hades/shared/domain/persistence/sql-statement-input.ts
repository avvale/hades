import { ApiProperty } from '@nestjs/swagger';

export type Any = any;

export enum Command
{
    COUNT = "COUNT",
    LIMIT = "LIMIT",
    OFFSET = "OFFSET",
    ORDER_BY = "ORDER_BY",
    WHERE = "WHERE"
}

export enum Operator
{
    ASC = "ASC",
    CONTAINS = "CONTAINS",
    DESC = "DESC",
    EQUALS = "EQUALS",
    GREATER = "GREATER",
    GREATER_OR_EQ = "GREATER_OR_EQ",
    IN = "IN",
    IS_NOT = "IS_NOT",
    IS = "IS",
    LOWER = "LOWER",
    LOWER_OR_EQ = "LOWER_OR_EQ",
    NOT_CONTAINS = "NOT_CONTAINS",
    NOT_EQUALS = "NOT_EQUALS"
}

export class QueryStatementInput 
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
}