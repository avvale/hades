import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreatePartnersCommandHandler } from './create-partners.command-handler';
import { partners } from '@hades/origen/partner/infrastructure/seeds/partner.seed';
import { CreatePartnersCommand } from './create-partners.command';
import { CreatePartnersService } from './create-partners.service';

describe('CreatePartnersCommandHandler', () => 
{
    let commandHandler: CreatePartnersCommandHandler;
    let service: CreatePartnersService;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreatePartnersCommandHandler,
                {
                    provide: CreatePartnersService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<CreatePartnersCommandHandler>(CreatePartnersCommandHandler);
        service         = module.get<CreatePartnersService>(CreatePartnersService);
    });

    describe('main', () => 
    {
        test('CreatePartnersCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an partner created', async () => 
        {
            expect(await commandHandler.execute(
                new CreatePartnersCommand(
                    partners
                
                )
            )).toBe(undefined);
        });
    });
});