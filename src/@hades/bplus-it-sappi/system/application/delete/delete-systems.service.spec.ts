import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { DeleteSystemsService } from './delete-systems.service';
import { ISystemRepository } from './../../domain/system.repository';
import { MockSystemRepository } from './../../infrastructure/mock/mock-system.repository';

describe('DeleteSystemsService', () => 
{
    let service: DeleteSystemsService;
    let repository: ISystemRepository;
    let mockRepository: MockSystemRepository;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                DeleteSystemsService,
                MockSystemRepository,
                { 
                    provide: ISystemRepository,
                    useValue: {
                        get: (queryStatements) => {},
                        delete: (queryStatements) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(DeleteSystemsService);
        repository      = module.get(ISystemRepository);
        mockRepository  = module.get(MockSystemRepository);
    });

    describe('main', () => 
    {
        it('DeleteSystemsService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        it('should delete system and emit event', async () => 
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve([])));
            expect(await service.main([])).toBe(undefined);
        });
    });
});