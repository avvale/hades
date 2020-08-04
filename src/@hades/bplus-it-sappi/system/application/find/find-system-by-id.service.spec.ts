import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { systems } from '@hades/bplus-it-sappi/system/infrastructure/seeds/system.seed';
import { FindSystemByIdService } from './find-system-by-id.service';
import { SystemId } from './../../domain/value-objects';
import { ISystemRepository } from './../../domain/system.repository';
import { MockSystemRepository } from './../../infrastructure/mock/mock-system.repository';

describe('FindSystemByIdService', () => 
{
    let service: FindSystemByIdService;
    let repository: ISystemRepository;
    let mockRepository: MockSystemRepository;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                FindSystemByIdService,
                MockSystemRepository,
                { 
                    provide: ISystemRepository,
                    useValue: {
                        findById: (id) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(FindSystemByIdService);
        repository      = module.get(ISystemRepository);
        mockRepository  = module.get(MockSystemRepository);
    });

    describe('main', () => 
    {
        test('FindSystemByIdService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should find system by id', async () => 
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new SystemId(systems[0].id)
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});