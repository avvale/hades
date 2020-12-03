import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindPartnerQueryHandler } from './find-partner.query-handler';
import { MockPartnerRepository } from '@hades/origen/partner/infrastructure/mock/mock-partner.repository';
import { IPartnerRepository } from '@hades/origen/partner/domain/partner.repository';
import { PartnerMapper } from '@hades/origen/partner/domain/partner.mapper';
import { FindPartnerQuery } from './find-partner.query';
import { FindPartnerService } from './find-partner.service';

describe('FindPartnerQueryHandler', () => 
{
    let queryHandler: FindPartnerQueryHandler;
    let service: FindPartnerService;
    let repository: MockPartnerRepository;
    let mapper: PartnerMapper;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindPartnerQueryHandler,
                {
                    provide: IPartnerRepository,
                    useClass: MockPartnerRepository
                },
                {
                    provide: FindPartnerService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<FindPartnerQueryHandler>(FindPartnerQueryHandler);
        service         = module.get<FindPartnerService>(FindPartnerService);
        repository      = <MockPartnerRepository>module.get<IPartnerRepository>(IPartnerRepository);
        mapper          = new PartnerMapper();
    });

    describe('main', () => 
    {
        test('FindPartnerQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an partner founded', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindPartnerQuery()
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});