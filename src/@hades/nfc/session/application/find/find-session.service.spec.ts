import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { FindSessionService } from './find-session.service';
import { ISessionRepository } from './../../domain/session.repository';
import { MockSessionRepository } from './../../infrastructure/mock/mock-session.repository';

describe('FindSessionService', () => 
{
    let service: FindSessionService;
    let repository: ISessionRepository;
    let mockRepository: MockSessionRepository;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                FindSessionService,
                MockSessionRepository,
                { 
                    provide: ISessionRepository,
                    useValue: {
                        find: (queryStatements) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(FindSessionService);
        repository      = module.get(ISessionRepository);
        mockRepository  = module.get(MockSessionRepository);
    });

    describe('main', () => 
    {
        test('FindSessionService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should find session', async () => 
        {
            jest.spyOn(repository, 'find').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main([])).toBe(mockRepository.collectionSource[0]);
        });
    });
});