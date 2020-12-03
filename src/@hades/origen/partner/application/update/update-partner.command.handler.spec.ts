import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { UpdatePartnerCommandHandler } from './update-partner.command-handler';
import { partners } from '@hades/origen/partner/infrastructure/seeds/partner.seed';
import { UpdatePartnerCommand } from './update-partner.command';
import { UpdatePartnerService } from './update-partner.service';

describe('UpdatePartnerCommandHandler', () =>
{
    let commandHandler: UpdatePartnerCommandHandler;
    let service: UpdatePartnerService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdatePartnerCommandHandler,
                {
                    provide: UpdatePartnerService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<UpdatePartnerCommandHandler>(UpdatePartnerCommandHandler);
        service         = module.get<UpdatePartnerService>(UpdatePartnerService);
    });

    describe('main', () =>
    {
        test('UpdatePartnerCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an partner created', async () =>
        {
            expect(await commandHandler.execute(
                new UpdatePartnerCommand(
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