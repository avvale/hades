import { Injectable } from '@nestjs/common';
import { AggregateBase } from '@hades/shared/domain/lib/aggregate-base';
import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';

@Injectable()
export abstract class MockSeeder<Aggregate extends AggregateBase>
{
    public readonly aggregateName: string;
    public collectionSource: Aggregate[];
    public deletedAtInstance: TimestampValueObject;

    get collectionResponse(): any[]
    {
        // to match objects, the http output excludes undefined values
        return this.collectionSource.map(item => item.toDTO());
    }
}