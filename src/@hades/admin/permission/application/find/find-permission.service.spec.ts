import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { FindPermissionService } from './find-permission.service';
import { IPermissionRepository } from './../../domain/permission.repository';
import { MockPermissionRepository } from './../../infrastructure/mock/mock-permission.repository';

describe('FindPermissionService', () => 
{
    let service: FindPermissionService;
    let repository: IPermissionRepository;
    let mockRepository: MockPermissionRepository;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                FindPermissionService,
                MockPermissionRepository,
                { 
                    provide: IPermissionRepository,
                    useValue: {
                        find: (queryStatements) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(FindPermissionService);
        repository      = module.get(IPermissionRepository);
        mockRepository  = module.get(MockPermissionRepository);
    });

    describe('main', () => 
    {
        it('FindPermissionService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        it('should find permission', async () => 
        {
            jest.spyOn(repository, 'find').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main([])).toBe(mockRepository.collectionSource[0]);
        });
    });
});