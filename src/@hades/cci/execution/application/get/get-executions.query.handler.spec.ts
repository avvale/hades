import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { GetExecutionsQueryHandler } from './get-executions.query-handler';
import { MockExecutionRepository } from '@hades/cci/execution/infrastructure/mock/mock-execution.repository';
import { IExecutionRepository } from '@hades/cci/execution/domain/execution.repository';
import { ExecutionMapper } from '@hades/cci/execution/domain/execution.mapper';
import { GetExecutionsQuery } from './get-executions.query';
import { GetExecutionsService } from './get-executions.service';

describe('GetExecutionsQueryHandler', () => 
{
    let queryHandler: GetExecutionsQueryHandler;
    let service: GetExecutionsService;
    let repository: MockExecutionRepository;
    let mapper: ExecutionMapper;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetExecutionsQueryHandler,
                {
                    provide: IExecutionRepository,
                    useClass: MockExecutionRepository
                },
                {
                    provide: GetExecutionsService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<GetExecutionsQueryHandler>(GetExecutionsQueryHandler);
        service         = module.get<GetExecutionsService>(GetExecutionsService);
        repository      = <MockExecutionRepository>module.get<IExecutionRepository>(IExecutionRepository);
        mapper          = new ExecutionMapper();
    });

    describe('main', () => 
    {
        test('GetExecutionsQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an executions founded', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new GetExecutionsQuery()
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});