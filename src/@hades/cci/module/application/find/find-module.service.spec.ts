import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { FindModuleService } from './find-module.service';
import { IModuleRepository } from './../../domain/module.repository';
import { MockModuleRepository } from './../../infrastructure/mock/mock-module.repository';

describe('FindModuleService', () =>
{
    let service: FindModuleService;
    let repository: IModuleRepository;
    let mockRepository: MockModuleRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                FindModuleService,
                MockModuleRepository,
                {
                    provide: IModuleRepository,
                    useValue: {
                        find: (queryStatement) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(FindModuleService);
        repository      = module.get(IModuleRepository);
        mockRepository  = module.get(MockModuleRepository);
    });

    describe('main', () =>
    {
        test('FindModuleService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find module', async () =>
        {
            jest.spyOn(repository, 'find').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main()).toBe(mockRepository.collectionSource[0]);
        });
    });
});