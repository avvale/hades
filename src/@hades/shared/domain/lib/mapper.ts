import { AggregateBase } from "@hades/shared/domain/lib/aggregate-base";
import { ObjectLiteral } from '@hades/shared/domain/lib/hades.types';

export interface IMapper
{
    mapModelToAggregate(object: ObjectLiteral): AggregateBase;

    mapModelsToAggregates(objects: ObjectLiteral[]): AggregateBase[];

    mapAggregateToResponse(aggregate: AggregateBase): ObjectLiteral;

    mapAggregatesToResponses(aggregates: AggregateBase[]): ObjectLiteral[];
}