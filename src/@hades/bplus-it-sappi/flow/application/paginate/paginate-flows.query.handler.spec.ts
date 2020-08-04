import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { PaginateFlowsQueryHandler } from './paginate-flows.query-handler';
import { MockFlowRepository } from '@hades/bplus-it-sappi/flow/infrastructure/mock/mock-flow.repository';
import { IFlowRepository } from '@hades/bplus-it-sappi/flow/domain/flow.repository';
import { FlowMapper } from '@hades/bplus-it-sappi/flow/domain/flow.mapper';
import { Command } from '@hades/shared/domain/persistence/sql-statement-input';
import { PaginationResponse } from '@hades/shared/domain/lib/pagination.response';
import { PaginateFlowsQuery } from './paginate-flows.query';
import { PaginateFlowsService } from './paginate-flows.service';

describe('PaginateFlowsQueryHandler', () => 
{
    let queryHandler: PaginateFlowsQueryHandler;
    let service: PaginateFlowsService;
    let repository: MockFlowRepository;
    let mapper: FlowMapper;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PaginateFlowsQueryHandler,
                {
                    provide: IFlowRepository,
                    useClass: MockFlowRepository
                },
                {
                    provide: PaginateFlowsService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<PaginateFlowsQueryHandler>(PaginateFlowsQueryHandler);
        service         = module.get<PaginateFlowsService>(PaginateFlowsService);
        repository      = <MockFlowRepository>module.get<IFlowRepository>(IFlowRepository);
        mapper          = new FlowMapper();
    });

    describe('main', () => 
    {
        test('PaginateFlowsQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an flows paginated', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows: repository.collectionSource.slice(0,10)
                }
            )));
            expect(await queryHandler.execute(
                new PaginateFlowsQuery(
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