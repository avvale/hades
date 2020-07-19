import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindBoundedContextQueryHandler } from './find-bounded-context.query-handler';
import { MockBoundedContextRepository } from '@hades/admin/bounded-context/infrastructure/mock/mock-bounded-context.repository';
import { IBoundedContextRepository } from '@hades/admin/bounded-context/domain/bounded-context.repository';
import { BoundedContextMapper } from '@hades/admin/bounded-context/domain/bounded-context.mapper';
import { FindBoundedContextQuery } from './find-bounded-context.query';
import { FindBoundedContextService } from './find-bounded-context.service';

describe('FindBoundedContextQueryHandler', () => 
{
    let queryHandler: FindBoundedContextQueryHandler;
    let service: FindBoundedContextService;
    let repository: MockBoundedContextRepository;
    let mapper: BoundedContextMapper;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindBoundedContextQueryHandler,
                {
                    provide: IBoundedContextRepository,
                    useClass: MockBoundedContextRepository
                },
                {
                    provide: FindBoundedContextService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<FindBoundedContextQueryHandler>(FindBoundedContextQueryHandler);
        service         = module.get<FindBoundedContextService>(FindBoundedContextService);
        repository      = <MockBoundedContextRepository>module.get<IBoundedContextRepository>(IBoundedContextRepository);
        mapper          = new BoundedContextMapper();
    });

    it('FindBoundedContextQueryHandler should be defined', () => 
    {
        expect(queryHandler).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('FindBoundedContextQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        it('should return an boundedContext founded', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindBoundedContextQuery()
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});