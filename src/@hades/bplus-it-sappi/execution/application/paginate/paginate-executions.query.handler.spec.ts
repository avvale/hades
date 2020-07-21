import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { PaginateExecutionsQueryHandler } from './paginate-executions.query-handler';
import { MockExecutionRepository } from '@hades/bplus-it-sappi/execution/infrastructure/mock/mock-execution.repository';
import { IExecutionRepository } from '@hades/bplus-it-sappi/execution/domain/execution.repository';
import { ExecutionMapper } from '@hades/bplus-it-sappi/execution/domain/execution.mapper';
import { Command } from '@hades/shared/domain/persistence/sql-statement-input';
import { PaginationResponse } from '@hades/shared/domain/lib/pagination.response';
import { PaginateExecutionsQuery } from './paginate-executions.query';
import { PaginateExecutionsService } from './paginate-executions.service';

describe('PaginateExecutionsQueryHandler', () => 
{
    let queryHandler: PaginateExecutionsQueryHandler;
    let service: PaginateExecutionsService;
    let repository: MockExecutionRepository;
    let mapper: ExecutionMapper;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PaginateExecutionsQueryHandler,
                {
                    provide: IExecutionRepository,
                    useClass: MockExecutionRepository
                },
                {
                    provide: PaginateExecutionsService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<PaginateExecutionsQueryHandler>(PaginateExecutionsQueryHandler);
        service         = module.get<PaginateExecutionsService>(PaginateExecutionsService);
        repository      = <MockExecutionRepository>module.get<IExecutionRepository>(IExecutionRepository);
        mapper          = new ExecutionMapper();
    });

    describe('main', () => 
    {
        test('PaginateExecutionsQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an executions paginated', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows: repository.collectionSource.slice(0,10)
                }
            )));
            expect(await queryHandler.execute(
                new PaginateExecutionsQuery(
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