import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { GetBoundedContextsQueryHandler } from './get-bounded-contexts.query-handler';
import { MockBoundedContextRepository } from '@hades/admin/bounded-context/infrastructure/mock/mock-bounded-context.repository';
import { IBoundedContextRepository } from '@hades/admin/bounded-context/domain/bounded-context.repository';
import { BoundedContextMapper } from '@hades/admin/bounded-context/domain/bounded-context.mapper';
import { GetBoundedContextsQuery } from './get-bounded-contexts.query';
import { GetBoundedContextsService } from './get-bounded-contexts.service';

describe('GetBoundedContextsQueryHandler', () => 
{
    let queryHandler: GetBoundedContextsQueryHandler;
    let service: GetBoundedContextsService;
    let repository: MockBoundedContextRepository;
    let mapper: BoundedContextMapper;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetBoundedContextsQueryHandler,
                {
                    provide: IBoundedContextRepository,
                    useClass: MockBoundedContextRepository
                },
                {
                    provide: GetBoundedContextsService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<GetBoundedContextsQueryHandler>(GetBoundedContextsQueryHandler);
        service         = module.get<GetBoundedContextsService>(GetBoundedContextsService);
        repository      = <MockBoundedContextRepository>module.get<IBoundedContextRepository>(IBoundedContextRepository);
        mapper          = new BoundedContextMapper();
    });

    it('GetBoundedContextsQueryHandler should be defined', () => 
    {
        expect(queryHandler).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('GetBoundedContextsQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        it('should return an boundedContexts founded', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new GetBoundedContextsQuery()
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});