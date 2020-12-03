import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreatePartnerCommandHandler } from './create-partner.command-handler';
import { partners } from '@hades/origen/partner/infrastructure/seeds/partner.seed';
import { CreatePartnerCommand } from './create-partner.command';
import { CreatePartnerService } from './create-partner.service';

describe('CreatePartnerCommandHandler', () =>
{
    let commandHandler: CreatePartnerCommandHandler;
    let service: CreatePartnerService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreatePartnerCommandHandler,
                {
                    provide: CreatePartnerService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<CreatePartnerCommandHandler>(CreatePartnerCommandHandler);
        service         = module.get<CreatePartnerService>(CreatePartnerService);
    });

    describe('main', () =>
    {
        test('CreatePartnerCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the CreatePartnerService', async () =>
        {
            expect(await commandHandler.execute(
                new CreatePartnerCommand(
                    partners[0].id,
                    partners[0].name,
                    partners[0].socialNetworks,
                    partners[0].description,
                    partners[0].excerpt,
                    partners[0].email,
                    partners[0].phone,
                    partners[0].fax,
                    partners[0].countryCommonId,
                    partners[0].administrativeAreaLevel1Id,
                    partners[0].administrativeAreaLevel2Id,
                    partners[0].administrativeAreaLevel3Id,
                    partners[0].zip,
                    partners[0].locality,
                    partners[0].address,
                    partners[0].latitude,
                    partners[0].longitude,
                )
            )).toBe(undefined);
        });
    });
});