import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindPartnerByIdQueryHandler } from './find-partner-by-id.query-handler';
import { MockPartnerRepository } from '@hades/origen/partner/infrastructure/mock/mock-partner.repository';
import { partners } from '@hades/origen/partner/infrastructure/seeds/partner.seed';
import { IPartnerRepository } from '@hades/origen/partner/domain/partner.repository';
import { PartnerMapper } from '@hades/origen/partner/domain/partner.mapper';
import { FindPartnerByIdQuery } from './find-partner-by-id.query';
import { FindPartnerByIdService } from './find-partner-by-id.service';

describe('FindPartnerByIdQueryHandler', () => 
{
    let queryHandler: FindPartnerByIdQueryHandler;
    let service: FindPartnerByIdService;
    let repository: MockPartnerRepository;
    let mapper: PartnerMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindPartnerByIdQueryHandler,
                {
                    provide: IPartnerRepository,
                    useClass: MockPartnerRepository
                },
                {
                    provide: FindPartnerByIdService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<FindPartnerByIdQueryHandler>(FindPartnerByIdQueryHandler);
        service         = module.get<FindPartnerByIdService>(FindPartnerByIdService);
        repository      = <MockPartnerRepository>module.get<IPartnerRepository>(IPartnerRepository);
        mapper          = new PartnerMapper();
    });

    describe('main', () =>
    {
        test('FindPartnerByIdQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an partner founded', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindPartnerByIdQuery(
                    partners[0].id,
                
                )
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});