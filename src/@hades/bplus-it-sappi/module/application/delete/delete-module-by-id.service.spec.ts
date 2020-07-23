import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { modules } from '@hades/bplus-it-sappi/module/infrastructure/seeds/module.seed';
import { DeleteModuleByIdService } from './delete-module-by-id.service';
import { ModuleId } from './../../domain/value-objects';
import { IModuleRepository } from './../../domain/module.repository';
import { MockModuleRepository } from './../../infrastructure/mock/mock-module.repository';

describe('DeleteModuleByIdService', () => 
{
    let service: DeleteModuleByIdService;
    let repository: IModuleRepository;
    let mockRepository: MockModuleRepository;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                DeleteModuleByIdService,
                MockModuleRepository,
                { 
                    provide: IModuleRepository,
                    useValue: {
                        deleteById: (id) => {},
                        findById: (id) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(DeleteModuleByIdService);
        repository      = module.get(IModuleRepository);
        mockRepository  = module.get(MockModuleRepository);
    });

    describe('main', () => 
    {
        it('DeleteModuleByIdService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        it('should delete module and emit event', async () => 
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new ModuleId(modules[0].id)
            )).toBe(undefined);
        });
    });
});