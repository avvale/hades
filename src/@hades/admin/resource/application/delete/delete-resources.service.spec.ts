import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { DeleteResourcesService } from './delete-resources.service';
import { IResourceRepository } from './../../domain/resource.repository';
import { MockResourceRepository } from './../../infrastructure/mock/mock-resource.repository';

describe('DeleteResourcesService', () => 
{
    let service: DeleteResourcesService;
    let repository: IResourceRepository;
    let mockRepository: MockResourceRepository;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                DeleteResourcesService,
                MockResourceRepository,
                { 
                    provide: IResourceRepository,
                    useValue: {
                        get: (queryStatements) => {},
                        delete: (queryStatements) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(DeleteResourcesService);
        repository      = module.get(IResourceRepository);
        mockRepository  = module.get(MockResourceRepository);
    });

    describe('main', () => 
    {
        it('DeleteResourcesService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        it('should delete resource and emit event', async () => 
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve([])));
            expect(await service.main([])).toBe(undefined);
        });
    });
});