import { AggregateBase } from "@hades/shared/domain/lib/aggregate-base";
import { ObjectLiteral } from "@hades/shared/domain/lib/object-literal";

export interface IMapper
{
    mapObjectToAggregate(object: ObjectLiteral): AggregateBase;

    mapObjectsToAggregates(objects: ObjectLiteral[]): AggregateBase[];

    mapAggregateToResponse(aggregate: AggregateBase): ObjectLiteral;

    mapAggregatesToResponses(aggregates: AggregateBase[]): ObjectLiteral[];
}