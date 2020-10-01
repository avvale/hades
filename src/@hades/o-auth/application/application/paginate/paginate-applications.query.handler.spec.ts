import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { PaginateApplicationsQueryHandler } from './paginate-applications.query-handler';
import { MockApplicationRepository } from '@hades/o-auth/application/infrastructure/mock/mock-application.repository';
import { IApplicationRepository } from '@hades/o-auth/application/domain/application.repository';
import { ApplicationMapper } from '@hades/o-auth/application/domain/application.mapper';
import { PaginationResponse } from '@hades/shared/domain/lib/pagination.response';
import { PaginateApplicationsQuery } from './paginate-applications.query';
import { PaginateApplicationsService } from './paginate-applications.service';

describe('PaginateApplicationsQueryHandler', () => 
{
    let queryHandler: PaginateApplicationsQueryHandler;
    let service: PaginateApplicationsService;
    let repository: MockApplicationRepository;
    let mapper: ApplicationMapper;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PaginateApplicationsQueryHandler,
                {
                    provide: IApplicationRepository,
                    useClass: MockApplicationRepository
                },
                {
                    provide: PaginateApplicationsService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<PaginateApplicationsQueryHandler>(PaginateApplicationsQueryHandler);
        service         = module.get<PaginateApplicationsService>(PaginateApplicationsService);
        repository      = <MockApplicationRepository>module.get<IApplicationRepository>(IApplicationRepository);
        mapper          = new ApplicationMapper();
    });

    describe('main', () => 
    {
        test('PaginateApplicationsQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an applications paginated', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows: repository.collectionSource.slice(0,10)
                }
            )));
            expect(await queryHandler.execute(
                new PaginateApplicationsQuery(
                    {
                        offset: 0,
                        limit: 10
                    }
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