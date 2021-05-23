import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ISystemRepository } from '@hades/cci/system/domain/system.repository';
import { MockSystemSeeder } from '@hades/cci/system/infrastructure/mock/mock-system.seeder';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { CciModule } from './../../../src/apps/cci/cci.module';
import * as request from 'supertest';
import * as _ from 'lodash';

// has OAuth
import { JwtModule } from '@nestjs/jwt';
import { IAccountRepository } from '@hades/iam/account/domain/account.repository';
import { MockAccountRepository } from '@hades/iam/account/infrastructure/mock/mock-account.repository';
import { IamModule } from './../../../src/apps/iam/iam.module';
import { AuthorizationGuard } from '../../../src/apps/shared/modules/auth/guards/authorization.guard';
import { TestingJwtService } from './../../../src/apps/o-auth/credential/services/testing-jwt.service';
import * as fs from 'fs';

const importForeignModules = [
    IamModule
];

describe('system', () =>
{
    let app: INestApplication;
    let repository: ISystemRepository;
    let seeder: MockSystemSeeder;
    let testJwt: string;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    CciModule,
                    IamModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRoot({
                        dialect: 'sqlite',
                        storage: ':memory:',
                        logging: false,
                        autoLoadModels: true,
                        models: [],
                    }),
                    JwtModule.register({
                        privateKey: fs.readFileSync('src/oauth-private.key', 'utf8'),
                        publicKey: fs.readFileSync('src/oauth-public.key', 'utf8'),
                        signOptions: {
                            algorithm: 'RS256',
                        }
                    }),
                ],
                providers: [
                    MockSystemSeeder,
                    TestingJwtService,
                ]
            })
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        app         = module.createNestApplication();
        repository  = module.get<ISystemRepository>(ISystemRepository);
        seeder      = module.get<MockSystemSeeder>(MockSystemSeeder);
        testJwt     = module.get(TestingJwtService).getJwt();

        // seed mock data in memory database
        repository.insert(seeder.collectionSource);

        await app.init();
    });

    test(`/REST:POST cci/system - Got 400 Conflict, SystemId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: null,
                tenantId: '6375f1bd-689e-4d3e-b28d-b42ceff5bf90',
                tenantCode: 'iuabvt9l5yl2i8bxji6zumw7kdneijhpoxvx81ugx5kno9efz6',
                version: 'm',
                name: '8',
                environment: 'l',
                technology: 'B2B',
                isActive: false,
                cancelledAt: '2021-05-23 09:12:30',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/system - Got 400 Conflict, SystemTenantId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '70d869c7-b40e-4f41-a5ff-43bfdffe6c25',
                tenantId: null,
                tenantCode: '1upqmz86crwbv200xxqc9pgu7krjjqxxq79tya1zfsgx3j6ztp',
                version: 'j',
                name: '4',
                environment: 'a',
                technology: 'B2B',
                isActive: false,
                cancelledAt: '2021-05-22 16:02:57',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/system - Got 400 Conflict, SystemTenantCode property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '2ced38dc-60ea-4b26-b416-cc90530e006b',
                tenantId: '0c14fa21-5695-46de-9516-b302f264f845',
                tenantCode: null,
                version: 'p',
                name: 'r',
                environment: 'n',
                technology: 'SAPSCI',
                isActive: false,
                cancelledAt: '2021-05-23 14:01:55',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/system - Got 400 Conflict, SystemVersion property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '51124f41-65b6-4b79-bad0-32561c365975',
                tenantId: '95cdc320-cc0d-4e35-bb24-b047781c9622',
                tenantCode: '1j82axb9y09maijsnxmzno9o4k096ygbl3f0rwxr3872nmo03c',
                version: null,
                name: '8',
                environment: '3',
                technology: 'SAPSCI',
                isActive: true,
                cancelledAt: '2021-05-22 15:54:08',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemVersion must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/system - Got 400 Conflict, SystemName property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '14dcc50c-0ff5-4733-9c0c-818d5807ae12',
                tenantId: '57baebc2-161a-4010-a473-996e2d861025',
                tenantCode: 'sw2ml4kez0kro9qzxy5183252rv9xo0gryt1rb20cohtqbydue',
                version: '8',
                name: null,
                environment: '7',
                technology: 'SAPPI',
                isActive: true,
                cancelledAt: '2021-05-23 02:34:14',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/system - Got 400 Conflict, SystemEnvironment property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '8bc39c8e-5142-4e22-bce6-b81c40e73102',
                tenantId: 'b7e13f0c-2ade-4d0f-a1bf-7acf38d1c1ed',
                tenantCode: 'nchaqox0ipb8fkfhu5isqcbp6wewsnytz6rrdp8w4kdu3k7h3k',
                version: 'a',
                name: 't',
                environment: null,
                technology: 'SAPPI',
                isActive: false,
                cancelledAt: '2021-05-23 01:01:13',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemEnvironment must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/system - Got 400 Conflict, SystemTechnology property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '4ea27281-6d7d-40af-b984-fdf259db3f02',
                tenantId: '69c19e01-2702-4b69-93a1-c3d045dce936',
                tenantCode: 'h8s6fz55v38h4ymqlrf1lmoqc30oc3gysohi1hvu8yy4zh3ktb',
                version: '9',
                name: '4',
                environment: '5',
                technology: null,
                isActive: true,
                cancelledAt: '2021-05-22 22:58:13',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTechnology must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/system - Got 400 Conflict, SystemIsActive property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7897ca93-1e82-489f-af2e-408f3ddc3071',
                tenantId: 'e54b5f1a-fe85-4d0d-9715-fcb827a6a24d',
                tenantCode: 'bjq4cno3p3kfuo2v67aqstvb31dkzrqd5fdsb7u1o2zknrd06p',
                version: 'j',
                name: 'j',
                environment: 'v',
                technology: 'SAPPI',
                isActive: null,
                cancelledAt: '2021-05-22 17:28:43',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemIsActive must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/system - Got 400 Conflict, SystemId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                tenantId: 'ff6d700d-1ba2-4131-ba30-b4332c57bec2',
                tenantCode: 'l9mrjgxnhkmyfpj4onnc0tfjwzakicyq6b4fqnkpgdb6y354ol',
                version: 'i',
                name: '9',
                environment: 'z',
                technology: 'MULESOFT',
                isActive: true,
                cancelledAt: '2021-05-23 11:28:51',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/system - Got 400 Conflict, SystemTenantId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'd89ca6c6-fcf9-4460-84bb-de78d4925971',
                tenantCode: '5mwl6cw0hscj7dlo3emlj2z90x4h9hhdcbisawvwbp0gccq0m5',
                version: 'i',
                name: '5',
                environment: 'e',
                technology: 'WSO2',
                isActive: true,
                cancelledAt: '2021-05-22 14:49:43',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/system - Got 400 Conflict, SystemTenantCode property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '4b7b83c7-f581-488c-bc99-1cc9d76c4b93',
                tenantId: '1831707c-c4dd-425e-b417-139f60af83d5',
                version: 'v',
                name: 'q',
                environment: 'p',
                technology: 'SAPSCI',
                isActive: true,
                cancelledAt: '2021-05-23 13:30:22',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantCode must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/system - Got 400 Conflict, SystemVersion property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'b1d6f28b-c7c2-4856-8ba1-427728aa2c7e',
                tenantId: 'af662fbb-1733-44da-8ba6-a045da22aa3a',
                tenantCode: 'u35gsdzqh97iygf816sysdcs16cy749w2rjnu2q5f7ady5r4n5',
                name: '6',
                environment: 'c',
                technology: 'B2B',
                isActive: true,
                cancelledAt: '2021-05-23 06:44:00',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemVersion must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/system - Got 400 Conflict, SystemName property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'bc654089-dfd6-48e3-982d-b62679aebdce',
                tenantId: '70ebea6c-082f-4dd1-b233-d003153cd30d',
                tenantCode: 'emmcwgy92y254wg7w0agtsdpp7qol41sex6ai75imrmfej3bt3',
                version: 'y',
                environment: 'v',
                technology: 'B2B',
                isActive: true,
                cancelledAt: '2021-05-23 10:28:12',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemName must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/system - Got 400 Conflict, SystemEnvironment property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '358ae139-fad7-4687-a9f9-e54b3ef05f28',
                tenantId: 'bd6a984b-47e3-4b65-ae35-b0c782cac232',
                tenantCode: 'gp94e0t3pxurd1t2hplx4s5o0gg766xb0qrcuw7fh9257s7e8y',
                version: 'h',
                name: '6',
                technology: 'SAPPI',
                isActive: false,
                cancelledAt: '2021-05-22 14:23:31',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemEnvironment must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/system - Got 400 Conflict, SystemTechnology property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5a6c17f6-b38d-46b7-8552-b3b1091bd42e',
                tenantId: '8e5a8c63-81b6-458d-b993-54df3018a1ac',
                tenantCode: 'oqbdznzprvitopit706qeiyqfy393axlvj7zzl3cxcc0npfjab',
                version: '2',
                name: 'd',
                environment: '8',
                isActive: true,
                cancelledAt: '2021-05-23 11:26:47',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTechnology must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/system - Got 400 Conflict, SystemIsActive property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '38d0d91c-67b2-4e1e-adfb-bee8aff5cfc4',
                tenantId: '9c565113-6126-4bf6-ac59-14248b3fb02b',
                tenantCode: 'v8aps4p0cv2gfxdi6awobytccsnqdikwvqjlawwan84mphmkw9',
                version: 'b',
                name: '3',
                environment: 'g',
                technology: 'SAPPI',
                cancelledAt: '2021-05-22 14:29:37',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemIsActive must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/system - Got 400 Conflict, SystemId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'foerh8puytyiqwjiec4rfnkiztmjmpj04cqkr',
                tenantId: '6a00dc11-410f-4aa3-a4b8-4f37479b0f38',
                tenantCode: 'tj9n59i0w4pl0d2cblq78m9iaatzk7xds4jna4zvv0j8hogn12',
                version: 'l',
                name: 'a',
                environment: '2',
                technology: 'SAPSCI',
                isActive: true,
                cancelledAt: '2021-05-23 09:02:33',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST cci/system - Got 400 Conflict, SystemTenantId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '0f3d5518-b5d2-41d4-a604-a2857e213c57',
                tenantId: 'zg3f3fcmeyme3qerh4ve33pp8ey1vasqgqztk',
                tenantCode: 'bf5i0w8fy5bl7dzza661uip28ftevsko48pda6841ou9ccsvw7',
                version: '4',
                name: 'u',
                environment: 'k',
                technology: 'SAPPI',
                isActive: false,
                cancelledAt: '2021-05-22 14:32:52',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST cci/system - Got 400 Conflict, SystemTenantCode is too large, has a maximum length of 50`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '58838100-6a28-4e28-8b03-d868108f71e3',
                tenantId: '2d903593-0a80-47b7-a473-1bd9ff7a5887',
                tenantCode: '5l8y9islc41obl4chl284j58qh2vzvyzacxvd3h5eubwa3767ub',
                version: 'z',
                name: '7',
                environment: 'p',
                technology: 'SAPSCI',
                isActive: false,
                cancelledAt: '2021-05-22 16:50:13',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantCode is too large, has a maximum length of 50');
            });
    });

    test(`/REST:POST cci/system - Got 400 Conflict, SystemIsActive has to be a boolean value`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '43c4ec04-7317-42a4-9463-0afaab012fba',
                tenantId: '5c448e43-ca48-47cc-8c32-688908ba02fb',
                tenantCode: 'wiiar1fq1yrl0qz8rl2ihpimlqgdrrrryrs9ahzp4mnl59oz3u',
                version: 't',
                name: 'n',
                environment: 'z',
                technology: 'B2B',
                isActive: 'true',
                cancelledAt: '2021-05-23 02:29:19',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemIsActive has to be a boolean value');
            });
    });
    test(`/REST:POST cci/system - Got 400 Conflict, SystemTechnology has to be a enum option of WSO2, SAPPI, B2B, MULESOFT, SAPSCI`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'dd018ecc-a0c3-4803-9acd-417942abfbd5',
                tenantId: '167c9c9c-6028-4c49-bae5-7bc159ea5c68',
                tenantCode: 'wf07w68ny51xecn3ute8f2bitcl4aew4hngnunlkx3bgn0v70x',
                version: 'b',
                name: '8',
                environment: 'f',
                technology: 'XXXX',
                isActive: true,
                cancelledAt: '2021-05-23 09:20:19',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTechnology has to be any of this options: WSO2, SAPPI, B2B, MULESOFT, SAPSCI');
            });
    });
    test(`/REST:POST cci/system - Got 400 Conflict, SystemCancelledAt has to be a timestamp value`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1789accd-ba38-411e-b94f-588997adf5e4',
                tenantId: '6a60bf40-496b-4032-88ac-ded37009bb28',
                tenantCode: 'qfhkjly1uwe4hjdajfk1uq8extb8xrqfmlfaksrwx73ucr1few',
                version: 'm',
                name: '6',
                environment: 'a',
                technology: 'MULESOFT',
                isActive: false,
                cancelledAt: 'XXXXXXXX',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemCancelledAt has to be a timestamp value');
            });
    });

    test(`/REST:POST cci/system - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send(seeder.collectionResponse[0])
            .expect(409);
    });

    test(`/REST:GET cci/systems/paginate`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/systems/paginate')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    offset: 0,
                    limit: 5
                }
            })
            .expect(200)
            .expect({
                total   : seeder.collectionResponse.length,
                count   : seeder.collectionResponse.length,
                rows    : seeder.collectionResponse.slice(0, 5)
            });
    });

    test(`/REST:GET cci/systems`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/systems')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(seeder.collectionResponse);
    });

    test(`/REST:GET cci/system - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/system')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: 'ceacb830-233f-414b-a424-546a01c9afd3'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:POST cci/system`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                tenantId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                tenantCode: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                version: '4',
                name: '4',
                environment: '4',
                technology: 'MULESOFT',
                isActive: false,
                cancelledAt: '2021-05-23 11:14:02',
            })
            .expect(201);
    });

    test(`/REST:GET cci/system`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/system')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:GET cci/system/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/system/ae52cbbb-2f91-415e-9654-8f3430670001')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET cci/system/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/system/28fe4bec-6e5a-475d-b118-1567f2fd5d25')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:PUT cci/system - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .put('/cci/system')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '23fc2902-ddc3-4a2e-9894-029b3450f1ef',
                tenantId: '01d3c56e-5728-46aa-8427-4d9639511b96',
                tenantCode: 'scnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvto',
                version: 'l',
                name: '3',
                environment: 'i',
                technology: 'SAPSCI',
                isActive: true,
                cancelledAt: '2021-05-22 18:52:05',
            })
            .expect(404);
    });

    test(`/REST:PUT cci/system`, () =>
    {
        return request(app.getHttpServer())
            .put('/cci/system')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                tenantId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                tenantCode: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                version: '4',
                name: '4',
                environment: '4',
                technology: 'WSO2',
                isActive: false,
                cancelledAt: '2021-05-23 11:14:02',
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:DELETE cci/system/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/system/c22100d5-3ba7-4b1a-84fc-f45bdee95091')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE cci/system/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/system/28fe4bec-6e5a-475d-b118-1567f2fd5d25')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200);
    });

    test(`/GraphQL cciCreateSystem - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:CciCreateSystemInput!)
                    {
                        cciCreateSystem (payload:$payload)
                        {
                            id
                            tenantCode
                            version
                            name
                            environment
                            technology
                            isActive
                            cancelledAt
                        }
                    }
                `,
                variables:
                {
                    payload: _.omit(seeder.collectionResponse[0], ['createdAt','updatedAt','deletedAt'])
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(409);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('already exist in database');
            });
    });

    test(`/GraphQL cciPaginateSystems`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        cciPaginateSystems (query:$query constraint:$constraint)
                        {
                            total
                            count
                            rows
                        }
                    }
                `,
                variables:
                {
                    query:
                    {
                        offset: 0,
                        limit: 5
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciPaginateSystems.total).toBe(seeder.collectionResponse.length);
                expect(res.body.data.cciPaginateSystems.count).toBe(seeder.collectionResponse.length);
                expect(res.body.data.cciPaginateSystems.rows).toStrictEqual(seeder.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL cciGetSystems`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        cciGetSystems (query:$query)
                        {
                            id
                            tenantCode
                            version
                            name
                            environment
                            technology
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.cciGetSystems.entries())
                {
                    expect(seeder.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL cciCreateSystem`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:CciCreateSystemInput!)
                    {
                        cciCreateSystem (payload:$payload)
                        {
                            id
                            tenantCode
                            version
                            name
                            environment
                            technology
                            isActive
                            cancelledAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        tenantId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        tenantCode: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                        version: '4',
                        name: '4',
                        environment: '4',
                        technology: 'MULESOFT',
                        isActive: false,
                        cancelledAt: '2021-05-23 11:14:02',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateSystem).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL cciFindSystem - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindSystem (query:$query)
                        {
                            id
                            tenantCode
                            version
                            name
                            environment
                            technology
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables:
                {
                    query:
                    {
                        where:
                        {
                            id: '25de8241-efa6-4afe-9967-c7c117864485'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciFindSystem`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindSystem (query:$query)
                        {
                            id
                            tenantCode
                            version
                            name
                            environment
                            technology
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables:
                {
                    query:
                    {
                        where:
                        {
                            id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindSystem.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL cciFindSystemById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        cciFindSystemById (id:$id)
                        {
                            id
                            tenantCode
                            version
                            name
                            environment
                            technology
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'd62c5133-608c-4b48-b204-6d2d8e6c6edf'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciFindSystemById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        cciFindSystemById (id:$id)
                        {
                            id
                            tenantCode
                            version
                            name
                            environment
                            technology
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindSystemById.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL cciUpdateSystem - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:CciUpdateSystemInput!)
                    {
                        cciUpdateSystem (payload:$payload)
                        {
                            id
                            tenantCode
                            version
                            name
                            environment
                            technology
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '23fc2902-ddc3-4a2e-9894-029b3450f1ef',
                        tenantId: '01d3c56e-5728-46aa-8427-4d9639511b96',
                        tenantCode: 'scnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvto',
                        version: 'l',
                        name: '3',
                        environment: 'i',
                        technology: 'SAPSCI',
                        isActive: true,
                        cancelledAt: '2021-05-22 18:52:05',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciUpdateSystem`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:CciUpdateSystemInput!)
                    {
                        cciUpdateSystem (payload:$payload)
                        {
                            id
                            tenantCode
                            version
                            name
                            environment
                            technology
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        tenantId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        tenantCode: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                        version: '4',
                        name: '4',
                        environment: '4',
                        technology: 'WSO2',
                        isActive: false,
                        cancelledAt: '2021-05-23 11:14:02',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateSystem.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL cciDeleteSystemById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteSystemById (id:$id)
                        {
                            id
                            tenantCode
                            version
                            name
                            environment
                            technology
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '048ee8c8-4d54-4161-b172-cdece22f5b79'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciDeleteSystemById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteSystemById (id:$id)
                        {
                            id
                            tenantCode
                            version
                            name
                            environment
                            technology
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteSystemById.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});