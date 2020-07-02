import { ICriteria } from './../../../domain/persistence/criteria';
import { QueryStatementInput, Command, Operator } from './../../../domain/persistence/sql-statement-input';
import { BadRequestException } from '@nestjs/common';
import { Op } from 'sequelize';
import * as _ from 'lodash';

export class SequelizeCriteria implements ICriteria
{
    implements(queryStatements: QueryStatementInput[], queryBuilder: Object = {})
    {
        // add where, contains, in, etc.
        queryBuilder = this.implementCriteriaFilterStatement(queryStatements, queryBuilder);
        
        // add limit, offset, order by, etc.
        queryBuilder = this.implementCriteriaSliceStatement(queryStatements, queryBuilder);
        
        return queryBuilder;
    }

    /**
     * Add to query builder statement to filter the results
     * 
     * @param queryBuilder 
     * @param query 
     */
    implementCriteriaFilterStatement(queryStatements: QueryStatementInput[] = [], queryBuilder: Object = {}):  Object
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
                    _.set(queryBuilder, ['where', queryStatement.column, this._operatorMapping(queryStatement.operator)], queryStatement.value);
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
    implementCriteriaSliceStatement<Aggregate>(queryStatements: QueryStatementInput[] = [], queryBuilder: Object = {}):  Object
    {
        for (const queryStatement of queryStatements)
        {
            switch(queryStatement.command)
            {
                case Command.WHERE:
                    // avoid execute this commands
                    break;
                case Command.LIMIT:
                    _.set(queryBuilder, ['limit'], queryStatement.value);
                    break;
                case Command.OFFSET:
                    _.set(queryBuilder, ['offset'], queryStatement.value);
                    break;
                case Command.ORDER_BY:
                    _.set(queryBuilder, ['order'], [queryStatement.column, <'ASC' | 'DESC'>this._operatorMapping(queryStatement.operator, true)]);
                    break;
            }
        }

        return queryBuilder;
    }

    /**
     * Function for map operator type to string value
     * 
     * @param operator 
     * @param isOrderByOperator 
     */
    private _operatorMapping(operator: Operator, isOrderByOperator: boolean = false): symbol | string
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
            case Operator.DESC:
                return 'DESC';
            case Operator.CONTAINS:         // LIKE
                return Op.like;
            case Operator.NOT_CONTAINS:     // NOT LIKE
                return Op.notLike;
            case Operator.EQUALS:           // =
                return Op.eq;
            case Operator.GREATER:          // >
                return Op.gt;
            case Operator.GREATER_OR_EQ:    // >=
                return Op.gte;
            case Operator.IN:               // IN
                return Op.in;
            case Operator.IS_NOT:           // IS NOT 
                return Op.not;              
            case Operator.IS:               // IS
                return Op.is;               
            case Operator.LOWER:            // <
                return Op.lt;               
            case Operator.LOWER_OR_EQ:      // =< 
                return Op.lte;              
            
            default:
                throw new BadRequestException(`Operator ${operator} not allowed, use any of the following operators: ASC, CONTAINS, DESC, EQUALS, GREATER, GREATER_OR_EQ, IN, IS_NOT_NULL, IS_NULL, LIKE, LOWER, LOWER_OR_EQ, NOT_CONTAINS, NOT_EQUALS`);
        }
    }

}