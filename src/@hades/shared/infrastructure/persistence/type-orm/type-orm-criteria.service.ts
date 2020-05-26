import { ICriteria } from './../../../domain/persistence/criteria';
import { QueryStatementInput, Command, Operator } from './../../../domain/persistence/sql-statement-input';
import { SelectQueryBuilder } from 'typeorm';

import { BadRequestException } from '@nestjs/common';

export class TypeOrmCriteriaService implements ICriteria
{
    implements<Entity>(builder: SelectQueryBuilder<Entity>, queryStatements: QueryStatementInput[])
    {
        // add where, contains, in, etc.
        builder = this.implementCriteriaFilterStatement(builder, queryStatements);
        
        // add limit, offset, order by, etc.
        builder = this.implementCriteriaSliceStatement(builder, queryStatements);
       
        return builder;
    }

    /**
     * Add to query builder statement to filter the results
     * 
     * @param queryBuilder 
     * @param query 
     */
    implementCriteriaFilterStatement<Entity>(queryBuilder: SelectQueryBuilder<Entity>, queryStatements: QueryStatementInput[] = []):  SelectQueryBuilder<Entity>
    {
        for (const queryStatement of queryStatements)
        {
            switch(queryStatement.command)
            {
                // avoid execute this commands
                case Command.OFFSET:
                case Command.LIMIT:
                case Command.ORDER_BY:
                    break;

                case Command.WHERE:
                    if (Operator.CONTAINS === queryStatement.operator)
                    {
                        queryBuilder.where(`${queryStatement.column} LIKE :value`, {
                            value: `%${queryStatement.value}%`
                        });
                    }
                    else
                    {
                        queryBuilder.where(`${queryStatement.column} ${this._operatorMapping(queryStatement.operator)} :value`, {
                            value: queryStatement.value
                        });
                    }
                    break;

                default:
                    throw new BadRequestException(`Command ${queryStatement.command} not allowed, use any of the following commands: WHERE`);
            }
        }

        return queryBuilder;
    }

    /**
     * Add to query builder statement to edit the result view
     * 
     * @param queryBuilder 
     * @param query 
     */
    implementCriteriaSliceStatement<Entity>(queryBuilder: SelectQueryBuilder<Entity>, queryStatements: QueryStatementInput[] = []):  SelectQueryBuilder<Entity>
    {
        for (const queryStatement of queryStatements)
        {
            switch(queryStatement.command)
            {
                case Command.WHERE:
                    // avoid execute this commands
                    break;
                case Command.LIMIT:
                    queryBuilder.limit(<number><unknown>queryStatement.value);
                    break;
                case Command.OFFSET:
                    queryBuilder.offset(<number><unknown>queryStatement.value);
                    break;
                case Command.ORDER_BY:
                    queryBuilder.orderBy(queryStatement.column, <'ASC' | 'DESC'>this._operatorMapping(queryStatement.operator, true));
                    break;
            }
        }

        return queryBuilder;
    }

    /**
     * Function for map operator type to string value allowed for TypeORM
     * 
     * @param operator 
     * @param isOrderByOperator 
     */
    private _operatorMapping(operator: Operator, isOrderByOperator: boolean = false): string
    {
        // check if is order by operator the operator type
        if (isOrderByOperator && (operator && operator !== Operator.ASC && operator !== Operator.DESC))
        {
            throw new BadRequestException(`For orderBy operation you must define ASC or DESC operator`);
        }
        
        switch(operator)
        {
            case Operator.ASC:
                return 'ASC';
            case Operator.CONTAINS:
                return 'CONTAINS';
            case Operator.DESC:
                return 'DESC';
            case Operator.EQUALS:
                return '=';
            case Operator.GREATER:
                return '>';
            case Operator.GREATER_OR_EQ:
                return '>=';
            case Operator.IN:
                return 'IN';
            case Operator.IS_NOT_NULL:
                return 'IS NOT NULL';
            case Operator.IS_NULL:
                return 'IS NULL';
            case Operator.LOWER:
                return '<';
            case Operator.LOWER_OR_EQ:
                return '<=';
            case Operator.NOT_CONTAINS:
                return 'NOT CONTAINS';
            default:
                throw new BadRequestException(`Operator ${operator} not allowed, use any of the following operators: ASC, CONTAINS, DESC, EQUALS, GREATER, GREATER_OR_EQ, IN, IS_NOT_NULL, IS_NULL, LIKE, LOWER, LOWER_OR_EQ, NOT_CONTAINS, NOT_EQUALS`);
        }
    }

}