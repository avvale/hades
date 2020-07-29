import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { sessions } from '@hades/nfc/session/infrastructure/seeds/session.seed';
import { UpdateSessionService } from './update-session.service';
import { 
    SessionId, 
    SessionIp, 
    SessionTagId, 
    SessionUid, 
    SessionCounter, 
    SessionExpiredAt, 
    SessionCreatedAt, 
    SessionUpdatedAt, 
    SessionDeletedAt
    
} from './../../domain/value-objects';
import { ISessionRepository } from './../../domain/session.repository';
import { MockSessionRepository } from './../../infrastructure/mock/mock-session.repository';

describe('UpdateSessionService', () => 
{
    let service: UpdateSessionService;
    let repository: ISessionRepository;
    let mockRepository: MockSessionRepository;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UpdateSessionService,
                MockSessionRepository,
                { 
                    provide: ISessionRepository,
                    useValue: {
                        update: (item) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(UpdateSessionService);
        repository      = module.get(ISessionRepository);
        mockRepository  = module.get(MockSessionRepository);
    });

    describe('main', () => 
    {
        test('UpdateSessionService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should update a session and emit event', async () => 
        {
            expect(await service.main(
                new SessionId(sessions[0].id),
                new SessionIp(sessions[0].ip),
                new SessionTagId(sessions[0].tagId),
                new SessionUid(sessions[0].uid),
                new SessionCounter(sessions[0].counter),
                new SessionExpiredAt(sessions[0].expiredAt),
                
            )).toBe(undefined);
        });
    });
});