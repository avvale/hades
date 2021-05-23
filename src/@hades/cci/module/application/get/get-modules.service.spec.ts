import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { GetModulesService } from './get-modules.service';
import { IModuleRepository } from './../../domain/module.repository';
import { MockModuleRepository } from './../../infrastructure/mock/mock-module.repository';

describe('GetModulesService', () =>
{
    let service: GetModulesService;
    let repository: IModuleRepository;
    let mockRepository: MockModuleRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                GetModulesService,
                MockModuleRepository,
                {
                    provide: IModuleRepository,
                    useValue: {
                        get: (queryStatement) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(GetModulesService);
        repository      = module.get(IModuleRepository);
        mockRepository  = module.get(MockModuleRepository);
    });

    describe('main', () =>
    {
        test('GetModulesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get modules', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});