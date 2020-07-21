import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindSessionQueryHandler } from './find-session.query-handler';
import { MockSessionRepository } from '@hades/nfc/session/infrastructure/mock/mock-session.repository';
import { ISessionRepository } from '@hades/nfc/session/domain/session.repository';
import { SessionMapper } from '@hades/nfc/session/domain/session.mapper';
import { FindSessionQuery } from './find-session.query';
import { FindSessionService } from './find-session.service';

describe('FindSessionQueryHandler', () => 
{
    let queryHandler: FindSessionQueryHandler;
    let service: FindSessionService;
    let repository: MockSessionRepository;
    let mapper: SessionMapper;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindSessionQueryHandler,
                {
                    provide: ISessionRepository,
                    useClass: MockSessionRepository
                },
                {
                    provide: FindSessionService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<FindSessionQueryHandler>(FindSessionQueryHandler);
        service         = module.get<FindSessionService>(FindSessionService);
        repository      = <MockSessionRepository>module.get<ISessionRepository>(ISessionRepository);
        mapper          = new SessionMapper();
    });

    describe('main', () => 
    {
        test('FindSessionQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an session founded', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindSessionQuery()
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});