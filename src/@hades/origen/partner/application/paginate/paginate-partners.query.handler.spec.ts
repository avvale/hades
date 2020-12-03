import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { PaginatePartnersQueryHandler } from './paginate-partners.query-handler';
import { MockPartnerRepository } from '@hades/origen/partner/infrastructure/mock/mock-partner.repository';
import { IPartnerRepository } from '@hades/origen/partner/domain/partner.repository';
import { PartnerMapper } from '@hades/origen/partner/domain/partner.mapper';
import { PaginationResponse } from '@hades/shared/domain/lib/pagination.response';
import { PaginatePartnersQuery } from './paginate-partners.query';
import { PaginatePartnersService } from './paginate-partners.service';

describe('PaginatePartnersQueryHandler', () =>
{
    let queryHandler: PaginatePartnersQueryHandler;
    let service: PaginatePartnersService;
    let repository: MockPartnerRepository;
    let mapper: PartnerMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PaginatePartnersQueryHandler,
                {
                    provide: IPartnerRepository,
                    useClass: MockPartnerRepository
                },
                {
                    provide: PaginatePartnersService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<PaginatePartnersQueryHandler>(PaginatePartnersQueryHandler);
        service         = module.get<PaginatePartnersService>(PaginatePartnersService);
        repository      = <MockPartnerRepository>module.get<IPartnerRepository>(IPartnerRepository);
        mapper          = new PartnerMapper();
    });

    describe('main', () => 
    {
        test('PaginatePartnersQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an partners paginated', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows: repository.collectionSource.slice(0,10)
                }
            )));
            expect(await queryHandler.execute(
                new PaginatePartnersQuery(
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