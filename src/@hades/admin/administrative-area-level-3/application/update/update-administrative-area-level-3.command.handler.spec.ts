import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { UpdateAdministrativeAreaLevel3CommandHandler } from './update-administrative-area-level-3.command-handler';
import { administrativeAreasLevel3 } from '@hades/admin/administrative-area-level-3/infrastructure/seeds/administrative-area-level-3.seed';
import { UpdateAdministrativeAreaLevel3Command } from './update-administrative-area-level-3.command';
import { UpdateAdministrativeAreaLevel3Service } from './update-administrative-area-level-3.service';

describe('UpdateAdministrativeAreaLevel3CommandHandler', () =>
{
    let commandHandler: UpdateAdministrativeAreaLevel3CommandHandler;
    let service: UpdateAdministrativeAreaLevel3Service;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateAdministrativeAreaLevel3CommandHandler,
                {
                    provide: UpdateAdministrativeAreaLevel3Service,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<UpdateAdministrativeAreaLevel3CommandHandler>(UpdateAdministrativeAreaLevel3CommandHandler);
        service         = module.get<UpdateAdministrativeAreaLevel3Service>(UpdateAdministrativeAreaLevel3Service);
    });

    describe('main', () =>
    {
        test('UpdateAdministrativeAreaLevel3CommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an administrativeAreaLevel3 created', async () =>
        {
            expect(await commandHandler.execute(
                new UpdateAdministrativeAreaLevel3Command(
                    administrativeAreasLevel3[0].id,
                    administrativeAreasLevel3[0].countryCommonId,
                    administrativeAreasLevel3[0].administrativeAreaLevel1Id,
                    administrativeAreasLevel3[0].administrativeAreaLevel2Id,
                    administrativeAreasLevel3[0].code,
                    administrativeAreasLevel3[0].customCode,
                    administrativeAreasLevel3[0].name,
                    administrativeAreasLevel3[0].slug,
                    administrativeAreasLevel3[0].latitude,
                    administrativeAreasLevel3[0].longitude,
                    administrativeAreasLevel3[0].zoom,
                )
            )).toBe(undefined);
        });
    });
});