import { AggregateBase } from "@hades/shared/domain/lib/aggregate-base";
import { ObjectLiteral } from "@hades/shared/domain/lib/object-literal";

export interface SequelizeMapper
{
    mapToAggregate(object: ObjectLiteral | ObjectLiteral[]): AggregateBase | AggregateBase[];
}