import { Injectable} from '@nestjs/common';
import { MockSeeder } from '@hades/shared/infrastructure/persistence/mock/mock.seeder';
import {
    ResourceId,
    ResourceBoundedContextId,
    ResourceAttachmentFamilyIds,
    ResourceName,
    ResourceHasCustomFields,
    ResourceHasAttachments,
    ResourceCreatedAt,
    ResourceUpdatedAt,
    ResourceDeletedAt,
} from './../../domain/value-objects';
import { AdminResource } from './../../domain/resource.aggregate';
import { resources } from './../seeds/resource.seed';

@Injectable()
export class MockResourceSeeder extends MockSeeder<AdminResource>
{
    public collectionSource: AdminResource[];

    constructor()
    {
        super();
        this._createMockDataLang();
    }

    private _createMockDataLang(): void
    {
        this.collectionSource = [];

        for (let resource of resources)
        {
            this.collectionSource.push(
                AdminResource.register(
                    new ResourceId(resource.id),
                    new ResourceBoundedContextId(resource.boundedContextId),
                    new ResourceAttachmentFamilyIds(resource.attachmentFamilyIds),
                    new ResourceName(resource.name),
                    new ResourceHasCustomFields(resource.hasCustomFields),
                    new ResourceHasAttachments(resource.hasAttachments),
                    new ResourceCreatedAt({currentTimestamp: true}),
                    new ResourceUpdatedAt({currentTimestamp: true}),
                    new ResourceDeletedAt(null),
                )
            );
        }
    }
}