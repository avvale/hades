import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindFlowQueryHandler } from './find-flow.query-handler';
import { MockFlowRepository } from '@hades/cci/flow/infrastructure/mock/mock-flow.repository';
import { IFlowRepository } from '@hades/cci/flow/domain/flow.repository';
import { FlowMapper } from '@hades/cci/flow/domain/flow.mapper';
import { FindFlowQuery } from './find-flow.query';
import { FindFlowService } from './find-flow.service';

describe('FindFlowQueryHandler', () =>
{
    let queryHandler: FindFlowQueryHandler;
    let service: FindFlowService;
    let repository: MockFlowRepository;
    let mapper: FlowMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindFlowQueryHandler,
                {
                    provide: IFlowRepository,
                    useClass: MockFlowRepository
                },
                {
                    provide: FindFlowService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<FindFlowQueryHandler>(FindFlowQueryHandler);
        service         = module.get<FindFlowService>(FindFlowService);
        repository      = <MockFlowRepository>module.get<IFlowRepository>(IFlowRepository);
        mapper          = new FlowMapper();
    });

    describe('main', () =>
    {
        test('FindFlowQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an flow founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindFlowQuery()
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});