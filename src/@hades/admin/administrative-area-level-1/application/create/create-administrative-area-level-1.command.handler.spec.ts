import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateAdministrativeAreaLevel1CommandHandler } from './create-administrative-area-level-1.command-handler';
import { administrativeAreasLevel1 } from '@hades/admin/administrative-area-level-1/infrastructure/seeds/administrative-area-level-1.seed';
import { CreateAdministrativeAreaLevel1Command } from './create-administrative-area-level-1.command';
import { CreateAdministrativeAreaLevel1Service } from './create-administrative-area-level-1.service';

describe('CreateAdministrativeAreaLevel1CommandHandler', () =>
{
    let commandHandler: CreateAdministrativeAreaLevel1CommandHandler;
    let service: CreateAdministrativeAreaLevel1Service;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateAdministrativeAreaLevel1CommandHandler,
                {
                    provide: CreateAdministrativeAreaLevel1Service,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<CreateAdministrativeAreaLevel1CommandHandler>(CreateAdministrativeAreaLevel1CommandHandler);
        service         = module.get<CreateAdministrativeAreaLevel1Service>(CreateAdministrativeAreaLevel1Service);
    });

    describe('main', () =>
    {
        test('CreateAdministrativeAreaLevel1CommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the CreateAdministrativeAreaLevel1Service', async () =>
        {
            expect(await commandHandler.execute(
                new CreateAdministrativeAreaLevel1Command(
                    administrativeAreasLevel1[0].id,
                    administrativeAreasLevel1[0].countryCommonId,
                    administrativeAreasLevel1[0].code,
                    administrativeAreasLevel1[0].customCode,
                    administrativeAreasLevel1[0].name,
                    administrativeAreasLevel1[0].slug,
                )
            )).toBe(undefined);
        });
    });
});