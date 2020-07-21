import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { GetSessionsQueryHandler } from './get-sessions.query-handler';
import { MockSessionRepository } from '@hades/nfc/session/infrastructure/mock/mock-session.repository';
import { ISessionRepository } from '@hades/nfc/session/domain/session.repository';
import { SessionMapper } from '@hades/nfc/session/domain/session.mapper';
import { GetSessionsQuery } from './get-sessions.query';
import { GetSessionsService } from './get-sessions.service';

describe('GetSessionsQueryHandler', () => 
{
    let queryHandler: GetSessionsQueryHandler;
    let service: GetSessionsService;
    let repository: MockSessionRepository;
    let mapper: SessionMapper;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetSessionsQueryHandler,
                {
                    provide: ISessionRepository,
                    useClass: MockSessionRepository
                },
                {
                    provide: GetSessionsService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<GetSessionsQueryHandler>(GetSessionsQueryHandler);
        service         = module.get<GetSessionsService>(GetSessionsService);
        repository      = <MockSessionRepository>module.get<ISessionRepository>(ISessionRepository);
        mapper          = new SessionMapper();
    });

    describe('main', () => 
    {
        test('GetSessionsQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an sessions founded', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new GetSessionsQuery()
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});