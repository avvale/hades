import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { sessions } from '@hades/nfc/session/infrastructure/seeds/session.seed';
import { DeleteSessionByIdService } from './delete-session-by-id.service';
import { SessionId } from './../../domain/value-objects';
import { ISessionRepository } from '../../domain/session.repository';
import { MockSessionRepository } from '../../infrastructure/mock/mock-session.repository';

describe('DeleteSessionByIdService', () => 
{
    let service: DeleteSessionByIdService;
    let repository: ISessionRepository;
    let mockRepository: MockSessionRepository;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                DeleteSessionByIdService,
                MockSessionRepository,
                { 
                    provide: ISessionRepository,
                    useValue: {
                        deleteById: (id) => {},
                        findById: (id) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(DeleteSessionByIdService);
        repository      = module.get(ISessionRepository);
        mockRepository  = module.get(MockSessionRepository);
    });

    describe('main', () => 
    {
        it('DeleteSessionByIdService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        it('should delete session and emit event', async () => 
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new SessionId(sessions[0].id)
            )).toBe(undefined);
        });
    });
});