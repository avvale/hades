import { Injectable} from '@nestjs/common';
import { MockRepository } from '@hades/shared/infrastructure/persistence/mock/mock.repository';
import { Utils } from '@hades/shared/domain/lib/utils';
import { IResourceRepository } from '@hades/admin/resource/domain/resource.repository';
import {
    ResourceId,
    ResourceBoundedContextId,
    ResourceName,
    ResourceHasCustomFields,
    ResourceHasAttachments,
    ResourceCreatedAt,
    ResourceUpdatedAt,
    ResourceDeletedAt,
} from '@hades/admin/resource/domain/value-objects';
import { AdminResource } from './../../domain/resource.aggregate';
import { resources } from './../seeds/resource.seed';

@Injectable()
export class MockResourceRepository extends MockRepository<AdminResource> implements IResourceRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'AdminResource';
    public collectionSource: AdminResource[];
    public deletedAtInstance: ResourceDeletedAt = new ResourceDeletedAt(null);

    constructor()
    {
        super();
        this.createSourceMockData();
    }

    public reset()
    {
        this.createSourceMockData();
    }

    private createSourceMockData(): void
    {
        this.collectionSource = [];
        const now = Utils.nowTimestamp();

        for (const itemCollection of <any[]>resources)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(AdminResource.register(
                    new ResourceId(itemCollection.id),
                    new ResourceBoundedContextId(itemCollection.boundedContextId),
                    new ResourceName(itemCollection.name),
                    new ResourceHasCustomFields(itemCollection.hasCustomFields),
                    new ResourceHasAttachments(itemCollection.hasAttachments),
                    new ResourceCreatedAt(itemCollection.createdAt),
                    new ResourceUpdatedAt(itemCollection.updatedAt),
                    new ResourceDeletedAt(itemCollection.deletedAt),
                ));
        }
    }
}