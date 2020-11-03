import { AggregateBase } from "@hades/shared/domain/lib/aggregate-base";
import { ObjectLiteral, CQMetadata } from '@hades/shared/domain/lib/hades.types';

export interface IMapper
{
    mapModelToAggregate(object: ObjectLiteral, cQMetadata?: CQMetadata): AggregateBase;

    mapModelsToAggregates(objects: ObjectLiteral[], cQMetadata?: CQMetadata): AggregateBase[];

    mapAggregateToResponse(aggregate: AggregateBase): ObjectLiteral;

    mapAggregatesToResponses(aggregates: AggregateBase[]): ObjectLiteral[];
}