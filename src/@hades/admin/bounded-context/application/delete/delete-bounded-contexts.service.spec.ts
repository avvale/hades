import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { DeleteBoundedContextsService } from './delete-bounded-contexts.service';
import { IBoundedContextRepository } from './../../domain/bounded-context.repository';
import { MockBoundedContextRepository } from './../../infrastructure/mock/mock-bounded-context.repository';

describe('DeleteBoundedContextsService', () => 
{
    let service: DeleteBoundedContextsService;
    let repository: IBoundedContextRepository;
    let mockRepository: MockBoundedContextRepository;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                DeleteBoundedContextsService,
                MockBoundedContextRepository,
                { 
                    provide: IBoundedContextRepository,
                    useValue: {
                        get: (queryStatements) => {},
                        delete: (queryStatements) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(DeleteBoundedContextsService);
        repository      = module.get(IBoundedContextRepository);
        mockRepository  = module.get(MockBoundedContextRepository);
    });

    describe('main', () => 
    {
        it('DeleteBoundedContextsService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        it('should delete boundedContext and emit event', async () => 
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve([])));
            expect(await service.main([])).toBe(undefined);
        });
    });
});