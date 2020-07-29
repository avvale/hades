import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { sessions } from '@hades/nfc/session/infrastructure/seeds/session.seed';
import { FindSessionByIdService } from './find-session-by-id.service';
import { SessionId } from './../../domain/value-objects';
import { ISessionRepository } from './../../domain/session.repository';
import { MockSessionRepository } from './../../infrastructure/mock/mock-session.repository';

describe('FindSessionByIdService', () => 
{
    let service: FindSessionByIdService;
    let repository: ISessionRepository;
    let mockRepository: MockSessionRepository;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                FindSessionByIdService,
                MockSessionRepository,
                { 
                    provide: ISessionRepository,
                    useValue: {
                        findById: (id) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(FindSessionByIdService);
        repository      = module.get(ISessionRepository);
        mockRepository  = module.get(MockSessionRepository);
    });

    describe('main', () => 
    {
        test('FindSessionByIdService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should find session by id', async () => 
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new SessionId(sessions[0].id)
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});