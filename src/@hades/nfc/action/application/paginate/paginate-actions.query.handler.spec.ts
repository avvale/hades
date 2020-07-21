import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { PaginateActionsQueryHandler } from './paginate-actions.query-handler';
import { MockActionRepository } from '@hades/nfc/action/infrastructure/mock/mock-action.repository';
import { IActionRepository } from '@hades/nfc/action/domain/action.repository';
import { ActionMapper } from '@hades/nfc/action/domain/action.mapper';
import { Command } from '@hades/shared/domain/persistence/sql-statement-input';
import { PaginationResponse } from '@hades/shared/domain/lib/pagination.response';
import { PaginateActionsQuery } from './paginate-actions.query';
import { PaginateActionsService } from './paginate-actions.service';

describe('PaginateActionsQueryHandler', () => 
{
    let queryHandler: PaginateActionsQueryHandler;
    let service: PaginateActionsService;
    let repository: MockActionRepository;
    let mapper: ActionMapper;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PaginateActionsQueryHandler,
                {
                    provide: IActionRepository,
                    useClass: MockActionRepository
                },
                {
                    provide: PaginateActionsService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<PaginateActionsQueryHandler>(PaginateActionsQueryHandler);
        service         = module.get<PaginateActionsService>(PaginateActionsService);
        repository      = <MockActionRepository>module.get<IActionRepository>(IActionRepository);
        mapper          = new ActionMapper();
    });

    describe('main', () => 
    {
        test('PaginateActionsQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an actions paginated', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows: repository.collectionSource.slice(0,10)
                }
            )));
            expect(await queryHandler.execute(
                new PaginateActionsQuery(
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