import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindExecutionByIdQueryHandler } from './find-execution-by-id.query-handler';
import { MockExecutionRepository } from '@hades/bplus-it-sappi/execution/infrastructure/mock/mock-execution.repository';
import { executions } from '@hades/bplus-it-sappi/execution/infrastructure/seeds/execution.seed';
import { IExecutionRepository } from '@hades/bplus-it-sappi/execution/domain/execution.repository';
import { ExecutionMapper } from '@hades/bplus-it-sappi/execution/domain/execution.mapper';
import { FindExecutionByIdQuery } from './find-execution-by-id.query';
import { FindExecutionByIdService } from './find-execution-by-id.service';

describe('FindExecutionByIdQueryHandler', () => 
{
    let queryHandler: FindExecutionByIdQueryHandler;
    let service: FindExecutionByIdService;
    let repository: MockExecutionRepository;
    let mapper: ExecutionMapper;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindExecutionByIdQueryHandler,
                {
                    provide: IExecutionRepository,
                    useClass: MockExecutionRepository
                },
                {
                    provide: FindExecutionByIdService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<FindExecutionByIdQueryHandler>(FindExecutionByIdQueryHandler);
        service         = module.get<FindExecutionByIdService>(FindExecutionByIdService);
        repository      = <MockExecutionRepository>module.get<IExecutionRepository>(IExecutionRepository);
        mapper          = new ExecutionMapper();
    });

    describe('main', () => 
    {
        test('FindExecutionByIdQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an execution founded', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindExecutionByIdQuery(
                    executions[0].id,
                
                )
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});