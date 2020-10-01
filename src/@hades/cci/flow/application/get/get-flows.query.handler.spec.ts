import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { GetFlowsQueryHandler } from './get-flows.query-handler';
import { MockFlowRepository } from '@hades/cci/flow/infrastructure/mock/mock-flow.repository';
import { IFlowRepository } from '@hades/cci/flow/domain/flow.repository';
import { FlowMapper } from '@hades/cci/flow/domain/flow.mapper';
import { GetFlowsQuery } from './get-flows.query';
import { GetFlowsService } from './get-flows.service';

describe('GetFlowsQueryHandler', () => 
{
    let queryHandler: GetFlowsQueryHandler;
    let service: GetFlowsService;
    let repository: MockFlowRepository;
    let mapper: FlowMapper;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetFlowsQueryHandler,
                {
                    provide: IFlowRepository,
                    useClass: MockFlowRepository
                },
                {
                    provide: GetFlowsService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<GetFlowsQueryHandler>(GetFlowsQueryHandler);
        service         = module.get<GetFlowsService>(GetFlowsService);
        repository      = <MockFlowRepository>module.get<IFlowRepository>(IFlowRepository);
        mapper          = new FlowMapper();
    });

    describe('main', () => 
    {
        test('GetFlowsQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an flows founded', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new GetFlowsQuery()
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});