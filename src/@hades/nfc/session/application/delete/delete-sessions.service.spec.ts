import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { DeleteSessionsService } from './delete-sessions.service';
import { ISessionRepository } from './../../domain/session.repository';
import { MockSessionRepository } from './../../infrastructure/mock/mock-session.repository';

describe('DeleteSessionsService', () => 
{
    let service: DeleteSessionsService;
    let repository: ISessionRepository;
    let mockRepository: MockSessionRepository;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                DeleteSessionsService,
                MockSessionRepository,
                { 
                    provide: ISessionRepository,
                    useValue: {
                        get: (queryStatements) => {},
                        delete: (queryStatements) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(DeleteSessionsService);
        repository      = module.get(ISessionRepository);
        mockRepository  = module.get(MockSessionRepository);
    });

    describe('main', () => 
    {
        test('DeleteSessionsService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should delete session and emit event', async () => 
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve([])));
            expect(await service.main([])).toBe(undefined);
        });
    });
});