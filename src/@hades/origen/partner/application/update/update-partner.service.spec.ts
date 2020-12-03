import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { partners } from '@hades/origen/partner/infrastructure/seeds/partner.seed';
import { UpdatePartnerService } from './update-partner.service';
import {
    PartnerId,
    PartnerName,
    PartnerSocialNetworks,
    PartnerDescription,
    PartnerExcerpt,
    PartnerEmail,
    PartnerPhone,
    PartnerFax,
    PartnerCountryCommonId,
    PartnerAdministrativeAreaLevel1Id,
    PartnerAdministrativeAreaLevel2Id,
    PartnerAdministrativeAreaLevel3Id,
    PartnerZip,
    PartnerLocality,
    PartnerAddress,
    PartnerLatitude,
    PartnerLongitude,
    PartnerCreatedAt,
    PartnerUpdatedAt,
    PartnerDeletedAt,
} from './../../domain/value-objects';
import { IPartnerRepository } from './../../domain/partner.repository';
import { MockPartnerRepository } from './../../infrastructure/mock/mock-partner.repository';

describe('UpdatePartnerService', () =>
{
    let service: UpdatePartnerService;
    let repository: IPartnerRepository;
    let mockRepository: MockPartnerRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UpdatePartnerService,
                MockPartnerRepository,
                {
                    provide: IPartnerRepository,
                    useValue: {
                        update: (item) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(UpdatePartnerService);
        repository      = module.get(IPartnerRepository);
        mockRepository  = module.get(MockPartnerRepository);
    });

    describe('main', () =>
    {
        test('UpdatePartnerService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a partner and emit event', async () =>
        {
            expect(await service.main(
                new PartnerId(partners[0].id),
                new PartnerName(partners[0].name),
                new PartnerSocialNetworks(partners[0].socialNetworks),
                new PartnerDescription(partners[0].description),
                new PartnerExcerpt(partners[0].excerpt),
                new PartnerEmail(partners[0].email),
                new PartnerPhone(partners[0].phone),
                new PartnerFax(partners[0].fax),
                new PartnerCountryCommonId(partners[0].countryCommonId),
                new PartnerAdministrativeAreaLevel1Id(partners[0].administrativeAreaLevel1Id),
                new PartnerAdministrativeAreaLevel2Id(partners[0].administrativeAreaLevel2Id),
                new PartnerAdministrativeAreaLevel3Id(partners[0].administrativeAreaLevel3Id),
                new PartnerZip(partners[0].zip),
                new PartnerLocality(partners[0].locality),
                new PartnerAddress(partners[0].address),
                new PartnerLatitude(partners[0].latitude),
                new PartnerLongitude(partners[0].longitude),
            )).toBe(undefined);
        });
    });
});