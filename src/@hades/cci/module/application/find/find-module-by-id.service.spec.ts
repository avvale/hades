import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { modules } from '@hades/cci/module/infrastructure/seeds/module.seed';
import { FindModuleByIdService } from './find-module-by-id.service';
import { ModuleId } from './../../domain/value-objects';
import { IModuleRepository } from './../../domain/module.repository';
import { MockModuleRepository } from './../../infrastructure/mock/mock-module.repository';

describe('FindModuleByIdService', () => 
{
    let service: FindModuleByIdService;
    let repository: IModuleRepository;
    let mockRepository: MockModuleRepository;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                FindModuleByIdService,
                MockModuleRepository,
                { 
                    provide: IModuleRepository,
                    useValue: {
                        findById: (id) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(FindModuleByIdService);
        repository      = module.get(IModuleRepository);
        mockRepository  = module.get(MockModuleRepository);
    });

    describe('main', () => 
    {
        test('FindModuleByIdService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should find module by id', async () => 
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new ModuleId(modules[0].id)
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});