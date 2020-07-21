import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { PaginateSessionsQueryHandler } from './paginate-sessions.query-handler';
import { MockSessionRepository } from '@hades/nfc/session/infrastructure/mock/mock-session.repository';
import { ISessionRepository } from '@hades/nfc/session/domain/session.repository';
import { SessionMapper } from '@hades/nfc/session/domain/session.mapper';
import { Command } from '@hades/shared/domain/persistence/sql-statement-input';
import { PaginationResponse } from '@hades/shared/domain/lib/pagination.response';
import { PaginateSessionsQuery } from './paginate-sessions.query';
import { PaginateSessionsService } from './paginate-sessions.service';

describe('PaginateSessionsQueryHandler', () => 
{
    let queryHandler: PaginateSessionsQueryHandler;
    let service: PaginateSessionsService;
    let repository: MockSessionRepository;
    let mapper: SessionMapper;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PaginateSessionsQueryHandler,
                {
                    provide: ISessionRepository,
                    useClass: MockSessionRepository
                },
                {
                    provide: PaginateSessionsService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<PaginateSessionsQueryHandler>(PaginateSessionsQueryHandler);
        service         = module.get<PaginateSessionsService>(PaginateSessionsService);
        repository      = <MockSessionRepository>module.get<ISessionRepository>(ISessionRepository);
        mapper          = new SessionMapper();
    });

    describe('main', () => 
    {
        test('PaginateSessionsQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an sessions paginated', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows: repository.collectionSource.slice(0,10)
                }
            )));
            expect(await queryHandler.execute(
                new PaginateSessionsQuery(
                    [
                        {
                            'command': Command.OFFSET,
                            'value': 0
                        },
                        {
                            'command': Command.LIMIT,
                            'value': 10
                        }
                    ]
                )
            )).toStrictEqual(
                new PaginationResponse(
                    100, 
                    10, 
                    repository.collectionSource.slice(0,10).map(item => item.toDTO())
                )
            );
        });
    });
});