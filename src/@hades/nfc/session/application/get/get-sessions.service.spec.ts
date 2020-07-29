import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { GetSessionsService } from './get-sessions.service';
import { ISessionRepository } from './../../domain/session.repository';
import { MockSessionRepository } from './../../infrastructure/mock/mock-session.repository';

describe('GetSessionsService', () => 
{
    let service: GetSessionsService;
    let repository: ISessionRepository;
    let mockRepository: MockSessionRepository;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                GetSessionsService,
                MockSessionRepository,
                { 
                    provide: ISessionRepository,
                    useValue: {
                        get: (queryStatements) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(GetSessionsService);
        repository      = module.get(ISessionRepository);
        mockRepository  = module.get(MockSessionRepository);
    });

    describe('main', () => 
    {
        test('GetSessionsService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should get sessions', async () => 
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main([])).toBe(mockRepository.collectionSource);
        });
    });
});