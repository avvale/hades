import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindSessionByIdQueryHandler } from './find-session-by-id.query-handler';
import { MockSessionRepository } from '@hades/nfc/session/infrastructure/mock/mock-session.repository';
import { sessions } from '@hades/nfc/session/infrastructure/seeds/session.seed';
import { ISessionRepository } from '@hades/nfc/session/domain/session.repository';
import { SessionMapper } from '@hades/nfc/session/domain/session.mapper';
import { FindSessionByIdQuery } from './find-session-by-id.query';
import { FindSessionByIdService } from './find-session-by-id.service';

describe('FindSessionByIdQueryHandler', () => 
{
    let queryHandler: FindSessionByIdQueryHandler;
    let service: FindSessionByIdService;
    let repository: MockSessionRepository;
    let mapper: SessionMapper;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindSessionByIdQueryHandler,
                {
                    provide: ISessionRepository,
                    useClass: MockSessionRepository
                },
                {
                    provide: FindSessionByIdService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<FindSessionByIdQueryHandler>(FindSessionByIdQueryHandler);
        service         = module.get<FindSessionByIdService>(FindSessionByIdService);
        repository      = <MockSessionRepository>module.get<ISessionRepository>(ISessionRepository);
        mapper          = new SessionMapper();
    });

    describe('main', () => 
    {
        test('FindSessionByIdQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an session founded', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindSessionByIdQuery(
                    sessions[0].id,
                
                )
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});