import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { systems } from '@hades/cci/system/infrastructure/seeds/system.seed';
import { DeleteSystemByIdService } from './delete-system-by-id.service';
import { SystemId } from './../../domain/value-objects';
import { ISystemRepository } from './../../domain/system.repository';
import { MockSystemRepository } from './../../infrastructure/mock/mock-system.repository';

describe('DeleteSystemByIdService', () => 
{
    let service: DeleteSystemByIdService;
    let repository: ISystemRepository;
    let mockRepository: MockSystemRepository;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                DeleteSystemByIdService,
                MockSystemRepository,
                { 
                    provide: ISystemRepository,
                    useValue: {
                        deleteById: (id) => {},
                        findById: (id) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(DeleteSystemByIdService);
        repository      = module.get(ISystemRepository);
        mockRepository  = module.get(MockSystemRepository);
    });

    describe('main', () => 
    {
        test('DeleteSystemByIdService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should delete system and emit event', async () => 
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new SystemId(systems[0].id)
            )).toBe(undefined);
        });
    });
});