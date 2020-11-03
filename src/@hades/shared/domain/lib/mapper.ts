import { AggregateBase } from "@hades/shared/domain/lib/aggregate-base";
import { ObjectLiteral, QueryMetadata } from '@hades/shared/domain/lib/hades.types';

export interface IMapper
{
    mapModelToAggregate(object: ObjectLiteral, queryMetadata?: QueryMetadata): AggregateBase;

    mapModelsToAggregates(objects: ObjectLiteral[], queryMetadata?: QueryMetadata): AggregateBase[];

    mapAggregateToResponse(aggregate: AggregateBase): ObjectLiteral;

    mapAggregatesToResponses(aggregates: AggregateBase[]): ObjectLiteral[];
}