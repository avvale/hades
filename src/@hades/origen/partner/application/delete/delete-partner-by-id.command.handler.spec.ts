import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeletePartnerByIdCommandHandler } from './delete-partner-by-id.command-handler';
import { partners } from '@hades/origen/partner/infrastructure/seeds/partner.seed';
import { DeletePartnerByIdCommand } from './delete-partner-by-id.command';
import { DeletePartnerByIdService } from './delete-partner-by-id.service';

describe('DeletePartnerByIdCommandHandler', () => 
{
    let commandHandler: DeletePartnerByIdCommandHandler;
    let service: DeletePartnerByIdService;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeletePartnerByIdCommandHandler,
                {
                    provide: DeletePartnerByIdService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<DeletePartnerByIdCommandHandler>(DeletePartnerByIdCommandHandler);
        service         = module.get<DeletePartnerByIdService>(DeletePartnerByIdService);
    });

    describe('main', () => 
    {
        test('DeletePartnerByIdCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the DeletePartnerByIdService', async () => 
        {
            expect(await commandHandler.execute(
                new DeletePartnerByIdCommand(
                    partners[0].id,
                )
            )).toBe(undefined);
        });
    });
});