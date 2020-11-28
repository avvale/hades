import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { administrativeAreasLevel2 } from '@hades/admin/administrative-area-level-2/infrastructure/seeds/administrative-area-level-2.seed';
import { UpdateAdministrativeAreaLevel2Service } from './update-administrative-area-level-2.service';
import {
    AdministrativeAreaLevel2Id,
    AdministrativeAreaLevel2CountryCommonId,
    AdministrativeAreaLevel2AdministrativeAreaLevel1Id,
    AdministrativeAreaLevel2Code,
    AdministrativeAreaLevel2CustomCode,
    AdministrativeAreaLevel2Name,
    AdministrativeAreaLevel2Slug,
    AdministrativeAreaLevel2Latitude,
    AdministrativeAreaLevel2Longitude,
    AdministrativeAreaLevel2Zoom,
    AdministrativeAreaLevel2CreatedAt,
    AdministrativeAreaLevel2UpdatedAt,
    AdministrativeAreaLevel2DeletedAt,
} from './../../domain/value-objects';
import { IAdministrativeAreaLevel2Repository } from './../../domain/administrative-area-level-2.repository';
import { MockAdministrativeAreaLevel2Repository } from './../../infrastructure/mock/mock-administrative-area-level-2.repository';

describe('UpdateAdministrativeAreaLevel2Service', () =>
{
    let service: UpdateAdministrativeAreaLevel2Service;
    let repository: IAdministrativeAreaLevel2Repository;
    let mockRepository: MockAdministrativeAreaLevel2Repository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UpdateAdministrativeAreaLevel2Service,
                MockAdministrativeAreaLevel2Repository,
                {
                    provide: IAdministrativeAreaLevel2Repository,
                    useValue: {
                        update: (item) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(UpdateAdministrativeAreaLevel2Service);
        repository      = module.get(IAdministrativeAreaLevel2Repository);
        mockRepository  = module.get(MockAdministrativeAreaLevel2Repository);
    });

    describe('main', () =>
    {
        test('UpdateAdministrativeAreaLevel2Service should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a administrativeAreaLevel2 and emit event', async () =>
        {
            expect(await service.main(
                new AdministrativeAreaLevel2Id(administrativeAreasLevel2[0].id),
                new AdministrativeAreaLevel2CountryCommonId(administrativeAreasLevel2[0].countryCommonId),
                new AdministrativeAreaLevel2AdministrativeAreaLevel1Id(administrativeAreasLevel2[0].administrativeAreaLevel1Id),
                new AdministrativeAreaLevel2Code(administrativeAreasLevel2[0].code),
                new AdministrativeAreaLevel2CustomCode(administrativeAreasLevel2[0].customCode),
                new AdministrativeAreaLevel2Name(administrativeAreasLevel2[0].name),
                new AdministrativeAreaLevel2Slug(administrativeAreasLevel2[0].slug),
                new AdministrativeAreaLevel2Latitude(administrativeAreasLevel2[0].latitude),
                new AdministrativeAreaLevel2Longitude(administrativeAreasLevel2[0].longitude),
                new AdministrativeAreaLevel2Zoom(administrativeAreasLevel2[0].zoom),
            )).toBe(undefined);
        });
    });
});