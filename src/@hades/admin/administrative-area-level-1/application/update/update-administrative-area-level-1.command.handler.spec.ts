import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { UpdateAdministrativeAreaLevel1CommandHandler } from './update-administrative-area-level-1.command-handler';
import { administrativeAreasLevel1 } from '@hades/admin/administrative-area-level-1/infrastructure/seeds/administrative-area-level-1.seed';
import { UpdateAdministrativeAreaLevel1Command } from './update-administrative-area-level-1.command';
import { UpdateAdministrativeAreaLevel1Service } from './update-administrative-area-level-1.service';

describe('UpdateAdministrativeAreaLevel1CommandHandler', () =>
{
    let commandHandler: UpdateAdministrativeAreaLevel1CommandHandler;
    let service: UpdateAdministrativeAreaLevel1Service;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateAdministrativeAreaLevel1CommandHandler,
                {
                    provide: UpdateAdministrativeAreaLevel1Service,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<UpdateAdministrativeAreaLevel1CommandHandler>(UpdateAdministrativeAreaLevel1CommandHandler);
        service         = module.get<UpdateAdministrativeAreaLevel1Service>(UpdateAdministrativeAreaLevel1Service);
    });

    describe('main', () =>
    {
        test('UpdateAdministrativeAreaLevel1CommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an administrativeAreaLevel1 created', async () =>
        {
            expect(await commandHandler.execute(
                new UpdateAdministrativeAreaLevel1Command(
                    administrativeAreasLevel1[0].id,
                    administrativeAreasLevel1[0].countryCommonId,
                    administrativeAreasLevel1[0].code,
                    administrativeAreasLevel1[0].customCode,
                    administrativeAreasLevel1[0].name,
                    administrativeAreasLevel1[0].slug,
                    administrativeAreasLevel1[0].latitude,
                    administrativeAreasLevel1[0].longitude,
                    administrativeAreasLevel1[0].zoom,
                )
            )).toBe(undefined);
        });
    });
});