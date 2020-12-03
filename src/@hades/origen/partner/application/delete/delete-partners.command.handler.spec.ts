import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeletePartnersCommandHandler } from './delete-partners.command-handler';
import { DeletePartnersCommand } from './delete-partners.command';
import { DeletePartnersService } from './delete-partners.service';

describe('DeletePartnersCommandHandler', () => 
{
    let commandHandler: DeletePartnersCommandHandler;
    let service: DeletePartnersService;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeletePartnersCommandHandler,
                {
                    provide: DeletePartnersService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<DeletePartnersCommandHandler>(DeletePartnersCommandHandler);
        service         = module.get<DeletePartnersService>(DeletePartnersService);
    });

    describe('main', () => 
    {
        test('DeletePartnersCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () => 
        {
            expect(await commandHandler.execute(
                new DeletePartnersCommand()
            )).toBe(undefined);
        });
    });
});