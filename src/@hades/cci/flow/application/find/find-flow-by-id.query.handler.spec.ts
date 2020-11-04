import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindFlowByIdQueryHandler } from './find-flow-by-id.query-handler';
import { MockFlowRepository } from '@hades/cci/flow/infrastructure/mock/mock-flow.repository';
import { flows } from '@hades/cci/flow/infrastructure/seeds/flow.seed';
import { IFlowRepository } from '@hades/cci/flow/domain/flow.repository';
import { FlowMapper } from '@hades/cci/flow/domain/flow.mapper';
import { FindFlowByIdQuery } from './find-flow-by-id.query';
import { FindFlowByIdService } from './find-flow-by-id.service';

describe('FindFlowByIdQueryHandler', () => 
{
    let queryHandler: FindFlowByIdQueryHandler;
    let service: FindFlowByIdService;
    let repository: MockFlowRepository;
    let mapper: FlowMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindFlowByIdQueryHandler,
                {
                    provide: IFlowRepository,
                    useClass: MockFlowRepository
                },
                {
                    provide: FindFlowByIdService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<FindFlowByIdQueryHandler>(FindFlowByIdQueryHandler);
        service         = module.get<FindFlowByIdService>(FindFlowByIdService);
        repository      = <MockFlowRepository>module.get<IFlowRepository>(IFlowRepository);
        mapper          = new FlowMapper();
    });

    describe('main', () =>
    {
        test('FindFlowByIdQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an flow founded', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindFlowByIdQuery(
                    flows[0].id,
                
                )
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});