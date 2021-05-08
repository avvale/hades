import { Injectable} from '@nestjs/common';
import { MockSeeder } from '@hades/shared/infrastructure/persistence/mock/mock.seeder';
import {
    BoundedContextId,
    BoundedContextName,
    BoundedContextRoot,
    BoundedContextSort,
    BoundedContextIsActive,
    BoundedContextCreatedAt,
    BoundedContextUpdatedAt,
    BoundedContextDeletedAt,
} from './../../domain/value-objects';
import { IamBoundedContext } from './../../domain/bounded-context.aggregate';
import { boundedContexts } from './../seeds/bounded-context.seed';

@Injectable()
export class MockBoundedContextSeeder extends MockSeeder<IamBoundedContext>
{
    public collectionSource: IamBoundedContext[];

    constructor()
    {
        super();
        this._createMockDataLang();
    }

    private _createMockDataLang(): void
    {
        this.collectionSource = [];

        for (let boundedContext of boundedContexts)
        {
            this.collectionSource.push(
                IamBoundedContext.register(
                    new BoundedContextId(boundedContext.id),
                    new BoundedContextName(boundedContext.name),
                    new BoundedContextRoot(boundedContext.root),
                    new BoundedContextSort(boundedContext.sort),
                    new BoundedContextIsActive(boundedContext.isActive),
                    new BoundedContextCreatedAt({currentTimestamp: true}),
                    new BoundedContextUpdatedAt({currentTimestamp: true}),
                    new BoundedContextDeletedAt(null),
                )
            );
        }
    }
}