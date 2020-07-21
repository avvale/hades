import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindExecutionQueryHandler } from './find-execution.query-handler';
import { MockExecutionRepository } from '@hades/bplus-it-sappi/execution/infrastructure/mock/mock-execution.repository';
import { IExecutionRepository } from '@hades/bplus-it-sappi/execution/domain/execution.repository';
import { ExecutionMapper } from '@hades/bplus-it-sappi/execution/domain/execution.mapper';
import { FindExecutionQuery } from './find-execution.query';
import { FindExecutionService } from './find-execution.service';

describe('FindExecutionQueryHandler', () => 
{
    let queryHandler: FindExecutionQueryHandler;
    let service: FindExecutionService;
    let repository: MockExecutionRepository;
    let mapper: ExecutionMapper;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindExecutionQueryHandler,
                {
                    provide: IExecutionRepository,
                    useClass: MockExecutionRepository
                },
                {
                    provide: FindExecutionService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<FindExecutionQueryHandler>(FindExecutionQueryHandler);
        service         = module.get<FindExecutionService>(FindExecutionService);
        repository      = <MockExecutionRepository>module.get<IExecutionRepository>(IExecutionRepository);
        mapper          = new ExecutionMapper();
    });

    describe('main', () => 
    {
        test('FindExecutionQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an execution founded', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindExecutionQuery()
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});