import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { administrativeAreasLevel1 } from '@hades/admin/administrative-area-level-1/infrastructure/seeds/administrative-area-level-1.seed';
import { UpdateAdministrativeAreaLevel1Service } from './update-administrative-area-level-1.service';
import {
    AdministrativeAreaLevel1Id,
    AdministrativeAreaLevel1CountryCommonId,
    AdministrativeAreaLevel1Code,
    AdministrativeAreaLevel1CustomCode,
    AdministrativeAreaLevel1Name,
    AdministrativeAreaLevel1Slug,
    AdministrativeAreaLevel1Latitude,
    AdministrativeAreaLevel1Longitude,
    AdministrativeAreaLevel1Zoom,
    AdministrativeAreaLevel1CreatedAt,
    AdministrativeAreaLevel1UpdatedAt,
    AdministrativeAreaLevel1DeletedAt,
} from './../../domain/value-objects';
import { IAdministrativeAreaLevel1Repository } from './../../domain/administrative-area-level-1.repository';
import { MockAdministrativeAreaLevel1Repository } from './../../infrastructure/mock/mock-administrative-area-level-1.repository';

describe('UpdateAdministrativeAreaLevel1Service', () =>
{
    let service: UpdateAdministrativeAreaLevel1Service;
    let repository: IAdministrativeAreaLevel1Repository;
    let mockRepository: MockAdministrativeAreaLevel1Repository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UpdateAdministrativeAreaLevel1Service,
                MockAdministrativeAreaLevel1Repository,
                {
                    provide: IAdministrativeAreaLevel1Repository,
                    useValue: {
                        update: (item) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(UpdateAdministrativeAreaLevel1Service);
        repository      = module.get(IAdministrativeAreaLevel1Repository);
        mockRepository  = module.get(MockAdministrativeAreaLevel1Repository);
    });

    describe('main', () =>
    {
        test('UpdateAdministrativeAreaLevel1Service should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a administrativeAreaLevel1 and emit event', async () =>
        {
            expect(await service.main(
                new AdministrativeAreaLevel1Id(administrativeAreasLevel1[0].id),
                new AdministrativeAreaLevel1CountryCommonId(administrativeAreasLevel1[0].countryCommonId),
                new AdministrativeAreaLevel1Code(administrativeAreasLevel1[0].code),
                new AdministrativeAreaLevel1CustomCode(administrativeAreasLevel1[0].customCode),
                new AdministrativeAreaLevel1Name(administrativeAreasLevel1[0].name),
                new AdministrativeAreaLevel1Slug(administrativeAreasLevel1[0].slug),
                new AdministrativeAreaLevel1Latitude(administrativeAreasLevel1[0].latitude),
                new AdministrativeAreaLevel1Longitude(administrativeAreasLevel1[0].longitude),
                new AdministrativeAreaLevel1Zoom(administrativeAreasLevel1[0].zoom),
            )).toBe(undefined);
        });
    });
});