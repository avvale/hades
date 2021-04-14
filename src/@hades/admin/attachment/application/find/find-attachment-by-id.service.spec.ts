import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { attachments } from '@hades/admin/attachment/infrastructure/seeds/attachment.seed';
import { FindAttachmentByIdService } from './find-attachment-by-id.service';
import { AttachmentId } from './../../domain/value-objects';
import { IAttachmentRepository } from './../../domain/attachment.repository';
import { MockAttachmentRepository } from './../../infrastructure/mock/mock-attachment.repository';

describe('FindAttachmentByIdService', () =>
{
    let service: FindAttachmentByIdService;
    let repository: IAttachmentRepository;
    let mockRepository: MockAttachmentRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                FindAttachmentByIdService,
                MockAttachmentRepository,
                {
                    provide: IAttachmentRepository,
                    useValue: {
                        findById: (id) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(FindAttachmentByIdService);
        repository      = module.get(IAttachmentRepository);
        mockRepository  = module.get(MockAttachmentRepository);
    });

    describe('main', () =>
    {
        test('FindAttachmentByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find attachment by id', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new AttachmentId(attachments[0].id)
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});