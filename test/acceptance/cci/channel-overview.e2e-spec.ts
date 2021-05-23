import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IChannelOverviewRepository } from '@hades/cci/channel-overview/domain/channel-overview.repository';
import { MockChannelOverviewSeeder } from '@hades/cci/channel-overview/infrastructure/mock/mock-channel-overview.seeder';
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

describe('channel-overview', () =>
{
    let app: INestApplication;
    let repository: IChannelOverviewRepository;
    let seeder: MockChannelOverviewSeeder;
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
                    MockChannelOverviewSeeder,
                    TestingJwtService,
                ]
            })
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        app         = module.createNestApplication();
        repository  = module.get<IChannelOverviewRepository>(IChannelOverviewRepository);
        seeder      = module.get<MockChannelOverviewSeeder>(MockChannelOverviewSeeder);
        testJwt     = module.get(TestingJwtService).getJwt();

        // seed mock data in memory database
        repository.insert(seeder.collectionSource);

        await app.init();
    });

    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: null,
                tenantId: 'dafc9a4d-1b43-432f-811a-01fbd9bb7671',
                tenantCode: '4imdag57m0fvb1fvopw0corzezybbyn0y0low08jdy8y33ls1e',
                systemId: 'f575a1ee-6d40-4ded-a02e-224002e73107',
                systemName: 'h5oieoxzfvqlx9s00eg2',
                executionId: 'd0dfadca-9e30-434a-9443-49bd5a9c4547',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 22:33:04',
                executionMonitoringStartAt: '2021-05-23 13:26:52',
                executionMonitoringEndAt: '2021-05-23 02:04:10',
                error: 6112735871,
                inactive: 8491252361,
                successful: 1067299061,
                stopped: 2127485824,
                unknown: 4285529539,
                unregistered: 6673664776,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewTenantId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '932ce01b-a720-41c4-84c5-2272047b88bb',
                tenantId: null,
                tenantCode: 'e0ty8wq0srvxvid7jvk82li7jh1c8e2dlzvfen8ryd74230hna',
                systemId: '80852a77-5b19-419c-ab13-e35d25741673',
                systemName: 'b636bhaoverzbgb1enkp',
                executionId: '2273d224-f2d0-41c1-a0b5-b76bde0d4501',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 00:40:10',
                executionMonitoringStartAt: '2021-05-23 22:39:03',
                executionMonitoringEndAt: '2021-05-23 05:09:15',
                error: 2579540866,
                inactive: 1662342223,
                successful: 2978230026,
                stopped: 7665167726,
                unknown: 8476735218,
                unregistered: 9469097067,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewTenantCode property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '6c25f6c3-3eb4-4a25-898a-cba693af9989',
                tenantId: '00a398f7-c1f8-4b77-a8f5-76ab28c11142',
                tenantCode: null,
                systemId: '72821477-4074-4b24-8ca1-a9f0f8eff669',
                systemName: 'iz4ypyj25io1qyzrfffh',
                executionId: '286de6fd-d97d-42dd-aef7-132626ca6755',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 11:01:37',
                executionMonitoringStartAt: '2021-05-23 02:48:26',
                executionMonitoringEndAt: '2021-05-23 21:23:17',
                error: 4389012714,
                inactive: 7627112669,
                successful: 4811446261,
                stopped: 6670310496,
                unknown: 5345499089,
                unregistered: 7392306435,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewSystemId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '0bf708eb-f16e-4650-8fa4-e71af2bfe791',
                tenantId: 'e9a0f0c9-94f3-4591-aaba-ba18097a6681',
                tenantCode: 'xt5c7gguybmkb0tbbrzw92xz9w0ch3dfky8kln21z8gzbllly5',
                systemId: null,
                systemName: '4466w7ysxbb6j2szs8t9',
                executionId: '7b89c385-0e89-4bdf-918f-e945f8cf0669',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 19:37:34',
                executionMonitoringStartAt: '2021-05-23 10:56:58',
                executionMonitoringEndAt: '2021-05-23 08:46:17',
                error: 9870253680,
                inactive: 8850964162,
                successful: 3701950541,
                stopped: 3959473016,
                unknown: 7161602432,
                unregistered: 8227464548,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewSystemName property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '0fe8dc6a-1b7f-469c-ab47-7a57c83a8fee',
                tenantId: '16da7117-a5f9-4172-8bd8-bfc48a4d48d7',
                tenantCode: 'xavaq0pfotvdzclmeglwnear6su25gpbsr64u4vs7gtkbcqg4j',
                systemId: 'ead8393d-a222-418f-a5f7-8ad88a4d71ee',
                systemName: null,
                executionId: '5427d09a-d543-403f-87be-ab2908b8a109',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 02:49:02',
                executionMonitoringStartAt: '2021-05-23 08:17:13',
                executionMonitoringEndAt: '2021-05-23 02:27:36',
                error: 5627557712,
                inactive: 9411368342,
                successful: 4708756947,
                stopped: 1892472458,
                unknown: 6196891428,
                unregistered: 7099808022,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewExecutionId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'df0c28de-2a11-46fd-b454-d6d1fbdfc952',
                tenantId: '23621a9d-c801-44d8-8ba1-8fea4ecc6b8b',
                tenantCode: '3m38o14xrkp5xzk747kcz0jtpef7egxahp1hr1nkq2k0k8i97i',
                systemId: 'b5353032-c9eb-4dea-bdba-bc538a8c28b8',
                systemName: '3sio8gl1kbt429l46lqv',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 11:50:29',
                executionMonitoringStartAt: '2021-05-23 16:39:03',
                executionMonitoringEndAt: '2021-05-23 10:02:45',
                error: 5278550934,
                inactive: 4987871183,
                successful: 9422032133,
                stopped: 2729434392,
                unknown: 5088780523,
                unregistered: 7698130352,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewExecutionType property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '4164fb62-92c0-43f4-a1e2-14c57ad51da8',
                tenantId: '8dcee83a-2706-43aa-a8e0-e5fbef7d9407',
                tenantCode: 'fni19ymi4i18xm6obum3h5no6wwtgiqga4dv473r2rzzakvdd1',
                systemId: 'f23f2f8d-23d3-4ab3-b7e1-96a58824dd8b',
                systemName: 'lkupybnqq6u08jc1h1x0',
                executionId: '791d8fa2-9ef2-451c-81c1-bd4b01617964',
                executionType: null,
                executionExecutedAt: '2021-05-23 09:14:13',
                executionMonitoringStartAt: '2021-05-23 08:23:04',
                executionMonitoringEndAt: '2021-05-23 11:36:28',
                error: 4686883651,
                inactive: 4077441640,
                successful: 1312122459,
                stopped: 2112262997,
                unknown: 3519936781,
                unregistered: 7022813386,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionType must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewExecutionExecutedAt property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'bc971c66-709d-4cbe-a8e7-5f9fbcba8109',
                tenantId: '36d1832a-39b4-4a37-8072-c12325cdf502',
                tenantCode: 'd1dglpomtih78til8ffgeaglk294s21feyood8dwuy8jefamlp',
                systemId: '9f6746ac-c623-4d41-ac70-f38696e256d0',
                systemName: 'vpnn23jxu8qzp3wrhojz',
                executionId: '41da614d-eca6-4a9a-9670-9022ecb15b02',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2021-05-23 05:56:26',
                executionMonitoringEndAt: '2021-05-23 05:31:12',
                error: 5791086959,
                inactive: 2271907885,
                successful: 9590318691,
                stopped: 1020559471,
                unknown: 5991057188,
                unregistered: 3381823929,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionExecutedAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewExecutionMonitoringStartAt property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '687cdc0a-51d6-4b5e-91c7-e556f3cb3149',
                tenantId: '0aaa023d-b116-4497-ac33-b73af77616a1',
                tenantCode: 'qy7vecv23qhjljznhexvwrlwrc02c75n3h06msoluci3sq11n0',
                systemId: '463cdbe3-f363-44b0-9116-9cf47bfdebc1',
                systemName: '5kzo1fjfltk8tlh3conf',
                executionId: 'a868401f-dfbe-46bc-aa1a-184509e96ae4',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 02:19:03',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2021-05-23 17:03:54',
                error: 4921241181,
                inactive: 6323672926,
                successful: 4080811758,
                stopped: 5176128315,
                unknown: 2726473638,
                unregistered: 3898698778,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewExecutionMonitoringEndAt property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ccbe37ec-a712-4a32-921f-6cd3686549c2',
                tenantId: '2e910b95-326e-41c9-8dfd-6767ba2de401',
                tenantCode: 'q6rrt159swwr6z0epj5lg56v7jhiaknqgdpowrg4w01voem4jo',
                systemId: 'd0f91531-45cf-4bbf-8f63-645003490d39',
                systemName: '5yfxkrcisz0oxr7lbggw',
                executionId: '1ca50909-f49c-4439-961b-895b4ba7a3e1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 00:30:22',
                executionMonitoringStartAt: '2021-05-23 01:58:43',
                executionMonitoringEndAt: null,
                error: 1394179909,
                inactive: 9687462098,
                successful: 3275957063,
                stopped: 1062943627,
                unknown: 6945416590,
                unregistered: 6248689552,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                tenantId: '83a372ce-a5fb-4de7-a214-635030e0b10f',
                tenantCode: 'av41pxv10e0iw0vsrdu9dmigownp93vthlwftsvaj50onvok4z',
                systemId: 'f9fb0cad-0544-45e8-a16d-ab86014140d7',
                systemName: '71qiywp4m3dvr0tnzk4n',
                executionId: '03dc1584-a512-4f31-875b-313d02587a48',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 12:07:35',
                executionMonitoringStartAt: '2021-05-23 11:56:07',
                executionMonitoringEndAt: '2021-05-23 08:20:18',
                error: 1077921256,
                inactive: 2567861408,
                successful: 4399771064,
                stopped: 3953968907,
                unknown: 9529585393,
                unregistered: 2576523645,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewTenantId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'c0dd56b4-aa58-49a4-8cb1-30dc48fe6357',
                tenantCode: 'j6uy5b21nzud6d5vluxpefh7nvhyzsq5hrkuee05ku1wih1r70',
                systemId: 'ffae1454-9f85-4ef0-ac49-df914edf9003',
                systemName: 'ux9572pbwwhbxdencvou',
                executionId: 'bb366bb3-894c-4105-b760-99837e7bebf4',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 17:42:38',
                executionMonitoringStartAt: '2021-05-23 05:05:32',
                executionMonitoringEndAt: '2021-05-23 02:38:55',
                error: 2443594929,
                inactive: 8782009651,
                successful: 3236053367,
                stopped: 4364764411,
                unknown: 3041045566,
                unregistered: 1474103413,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewTenantId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewTenantCode property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '33213fb8-30ef-468e-9e8f-6ac812f5f0bf',
                tenantId: 'fa08a190-9549-41bb-8bd8-3975be6eb65a',
                systemId: '186984f7-6b34-4ec8-bcb7-2efcdd7e4740',
                systemName: '28ttmj8fw80gevo03sm6',
                executionId: '32760d8f-037f-4309-8a50-a45fd6368df3',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 11:07:06',
                executionMonitoringStartAt: '2021-05-23 01:20:40',
                executionMonitoringEndAt: '2021-05-23 14:07:21',
                error: 4842887893,
                inactive: 6381645758,
                successful: 1667809856,
                stopped: 7675459492,
                unknown: 2203461642,
                unregistered: 1662831301,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewTenantCode must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewSystemId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '0a27f0b9-cdee-4a1f-ae1a-b8d6deec8214',
                tenantId: '4e6c6548-7f26-4681-981b-a161c9844990',
                tenantCode: 'ruen7lh153gkj8i7fydum7jkd7fevihvpl7tjtr1mjqvnp9jrq',
                systemName: 'zts4p70f2b3orqgf9tlu',
                executionId: 'd7b0756a-5b49-4371-9faf-528e51cca954',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 06:53:54',
                executionMonitoringStartAt: '2021-05-23 15:40:51',
                executionMonitoringEndAt: '2021-05-23 22:39:08',
                error: 9095702528,
                inactive: 2146531944,
                successful: 9554927335,
                stopped: 8528754735,
                unknown: 6085534500,
                unregistered: 3757858075,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewSystemId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewSystemName property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7e63273b-d9a2-4739-92b0-70488f4b674c',
                tenantId: '5cb9e635-0d50-4c93-883b-13f59dce7456',
                tenantCode: 'avoutqv6pwpws95a3cjwmnjjh6h6kszqup5tdudj1b88y711hw',
                systemId: '2e3bea36-716d-4f25-a929-32fd0db1b56b',
                executionId: '4f8c16de-bc8f-4f40-a644-0e2ab33937d6',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 17:46:49',
                executionMonitoringStartAt: '2021-05-23 01:22:05',
                executionMonitoringEndAt: '2021-05-23 02:44:52',
                error: 3966099222,
                inactive: 2990067472,
                successful: 9227793662,
                stopped: 3660978363,
                unknown: 3283530702,
                unregistered: 1508008263,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewSystemName must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewExecutionId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'dc792841-d2a2-440e-92e7-9b1840641a56',
                tenantId: '70e7ef13-b5ef-4d69-944d-fc1644c0f4e5',
                tenantCode: 'dwhsmg8qehb7u2n5nrtt6997535cbid3uuq5p3emiblq5oo25d',
                systemId: '2dce04d3-ed1a-4dc6-8e96-537d510e706c',
                systemName: 'fblb38rm5ooc1p36mulp',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 13:17:18',
                executionMonitoringStartAt: '2021-05-23 16:12:21',
                executionMonitoringEndAt: '2021-05-23 09:25:13',
                error: 1727379251,
                inactive: 5573133592,
                successful: 8794624166,
                stopped: 8951400835,
                unknown: 1671755142,
                unregistered: 9911702803,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewExecutionType property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '9062a752-ae04-4804-aaca-f52a8e47212c',
                tenantId: '265a30f3-9100-44be-989f-af14e456bdd1',
                tenantCode: 'ohgjj6s21n17n1qjyezpv4xvyomk5ymogt2fdoqysxmxmeighw',
                systemId: 'f67059cf-3118-48da-94d9-821d604461c6',
                systemName: '1yay10dzl1vd8zhs4hj7',
                executionId: '617d5296-3c81-4892-99e7-a4918f2decf0',
                executionExecutedAt: '2021-05-23 10:36:09',
                executionMonitoringStartAt: '2021-05-23 02:21:21',
                executionMonitoringEndAt: '2021-05-23 20:34:41',
                error: 7080387871,
                inactive: 6247159113,
                successful: 9674007329,
                stopped: 7362333722,
                unknown: 8612989597,
                unregistered: 4681962748,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionType must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewExecutionExecutedAt property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '4bf6d913-1547-4a4d-a424-f9d0abbd6988',
                tenantId: '0f2037d0-e324-4174-89e1-cf97dc17fa6f',
                tenantCode: 'lpt6x6lsry89aveod4w4tqpgkrtp9fy761ocizhnunpu1d18vl',
                systemId: 'e4b37668-20f2-4822-8ee9-ef01bf7d287d',
                systemName: 'vo2my0c4n1zwrwh2eneu',
                executionId: '648b27cd-b5e3-4922-a1ac-f805a8241610',
                executionType: 'SUMMARY',
                executionMonitoringStartAt: '2021-05-23 17:59:45',
                executionMonitoringEndAt: '2021-05-23 04:49:54',
                error: 7889070639,
                inactive: 7511895569,
                successful: 1148482258,
                stopped: 8210256807,
                unknown: 7979287093,
                unregistered: 1707363022,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionExecutedAt must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewExecutionMonitoringStartAt property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'f11dda75-0a02-425e-bc99-73927ae93a7b',
                tenantId: '290c4b64-8f8d-48d7-b208-06b4db3a7817',
                tenantCode: 'r9sj3cu2f32hyo9kicvjrr7bcy23datctgmgc1ifq3ntgo4fpo',
                systemId: '61e4c55e-2b61-40b5-b954-4fae09ecb526',
                systemName: 'kuv53o8815gwd34nl5mt',
                executionId: 'd3948e4c-396d-4e95-aee4-bf4512c73e7f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 05:09:22',
                executionMonitoringEndAt: '2021-05-23 23:24:03',
                error: 1017235656,
                inactive: 9137582215,
                successful: 9229040916,
                stopped: 7710312642,
                unknown: 7424804563,
                unregistered: 9561691819,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewExecutionMonitoringEndAt property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'c9c25ded-05bf-40e8-8d5a-8e1e59feaaa2',
                tenantId: '59cbfb39-47d6-4aec-b24e-fcb114dc281b',
                tenantCode: 'c46nrd3gl4yox5o9e19o1otzmimb3btlya6gc09vcid2j160jv',
                systemId: '22869792-357f-4eca-88c1-99a797d2b53c',
                systemName: 'iekjbq44p0p1liskwuk7',
                executionId: 'c002b876-1777-4675-ac7e-17afcf8fabe5',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 06:28:31',
                executionMonitoringStartAt: '2021-05-23 10:07:28',
                error: 1627890679,
                inactive: 3661834848,
                successful: 2852133380,
                stopped: 9769570913,
                unknown: 2303397915,
                unregistered: 3385456516,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'bempb0j8pgi43b5bgrki7k56cf6cd0qzoichw',
                tenantId: '20c1d92c-e8ad-4625-bea3-0be9ae314975',
                tenantCode: 'gb8ajykare84m0fl0webvgvimto4pka2zoxe4wxfopsaj3omkf',
                systemId: '720ffd35-9fba-410c-92a8-72ee001284a4',
                systemName: 'j4kfm6qtmy23k5uk4ne6',
                executionId: '678b6583-753c-4c5b-8b7e-892ba0bae28b',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 01:15:38',
                executionMonitoringStartAt: '2021-05-23 11:14:34',
                executionMonitoringEndAt: '2021-05-23 10:50:37',
                error: 8506365477,
                inactive: 2922249238,
                successful: 5911908349,
                stopped: 5957607590,
                unknown: 7029242886,
                unregistered: 4941877727,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewTenantId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1355d0be-88e6-4876-ba2c-231fa57dd040',
                tenantId: 'dabufaxcgviirusekkzaaxp9p4q9b8f5eh6zj',
                tenantCode: '51gudwwwre0k0skd4mk1k20xgd3slwuqd976ht90eddgpwcnc9',
                systemId: '6795720f-51a5-4ebd-9afc-cdb76cb9004f',
                systemName: 'x6ri5z01ydjbv44tbt6n',
                executionId: 'dc875ae8-9e6a-4bc5-aac2-f4f69279a586',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 23:45:47',
                executionMonitoringStartAt: '2021-05-23 18:24:31',
                executionMonitoringEndAt: '2021-05-23 16:02:40',
                error: 7145373168,
                inactive: 2087889438,
                successful: 5326263444,
                stopped: 2803141122,
                unknown: 5713319093,
                unregistered: 4995160809,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewTenantId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewSystemId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '24944a96-2a4c-4aab-9fcf-6da17e6f0f12',
                tenantId: 'ab96cab0-28e7-406b-b68f-f5ac5ab905a6',
                tenantCode: '9wfrh2fqya36o4w7mh90r255eoisxldpgja1mjmdp1km59wpnp',
                systemId: 'j1n9u44builgrhyfk4vncrr4o1p5763tagbok',
                systemName: 'lky9utzinbfarswvkaps',
                executionId: 'c6395014-ff1f-4cb6-ab33-96aa16f89c14',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 21:42:27',
                executionMonitoringStartAt: '2021-05-23 11:27:36',
                executionMonitoringEndAt: '2021-05-23 17:39:06',
                error: 6734155847,
                inactive: 9018996852,
                successful: 4104817998,
                stopped: 9865345867,
                unknown: 8834410108,
                unregistered: 6036360991,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewSystemId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewExecutionId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'a006693f-46f0-4e95-8f6c-d97db38eb53a',
                tenantId: '41126c55-b34e-481f-85f1-5caa7ca819b5',
                tenantCode: 'gz6hhgfrwilyiuh7zmqz12utto8ljtnjz4ca4f9503deisad4n',
                systemId: 'a48ded54-9248-457f-9520-c228ea585987',
                systemName: 'c7y7703xjbbdqoyf5u78',
                executionId: 'wbvtv7yzrmr5gw9xrz2otu5y8zmmcyxol9oic',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 18:21:33',
                executionMonitoringStartAt: '2021-05-23 15:59:41',
                executionMonitoringEndAt: '2021-05-23 18:53:54',
                error: 3921961564,
                inactive: 2794936356,
                successful: 5386102797,
                stopped: 8711768892,
                unknown: 3607073826,
                unregistered: 6243618864,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewTenantCode is too large, has a maximum length of 50`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'a283b482-f4e1-4e9a-b11d-5cfd43554b70',
                tenantId: '20eaa5ad-1f3f-4ac2-9b4b-e9f98c1bdd89',
                tenantCode: 'iibkwjspmu5bxd1tkbdcmpu4k06lrys7o1iumiq0zee5fj68gax',
                systemId: '6f36ac81-d929-481a-90cd-c293f5666058',
                systemName: '1bjtzke6dpj3zwp7nay0',
                executionId: 'df686ae2-23ce-4cc3-a9e0-3fa4a03dae23',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 16:31:22',
                executionMonitoringStartAt: '2021-05-23 15:04:49',
                executionMonitoringEndAt: '2021-05-23 23:02:00',
                error: 3580382959,
                inactive: 3984880100,
                successful: 4109529192,
                stopped: 9589450329,
                unknown: 1969769532,
                unregistered: 1841931429,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewTenantCode is too large, has a maximum length of 50');
            });
    });

    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewSystemName is too large, has a maximum length of 20`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '3069ced9-87ec-4bd8-bf26-3ccdf8cb8122',
                tenantId: '44dab989-f33b-4e37-8a5e-880b7a591855',
                tenantCode: '1j36bpneph6u372xaphci0t7zbxr37h87lrshqtpalgvpmik27',
                systemId: '06c5f320-d735-423f-9231-20e20e711ded',
                systemName: '5rz3p9f5lxdy4anzcis6f',
                executionId: '8efe9bb2-3cdc-420d-bee6-2e1c82583698',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 16:42:09',
                executionMonitoringStartAt: '2021-05-23 02:54:15',
                executionMonitoringEndAt: '2021-05-23 14:21:27',
                error: 3792936340,
                inactive: 8412717779,
                successful: 8032570005,
                stopped: 2211103438,
                unknown: 5709841480,
                unregistered: 9155189188,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewSystemName is too large, has a maximum length of 20');
            });
    });

    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewError is too large, has a maximum length of 10`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '484267f1-31e6-473a-b302-4be306b85c04',
                tenantId: 'ce5f2df1-4221-46c1-b059-94c9bc70e7a8',
                tenantCode: 'asoyr7abs5suoglt7nh1ulab1sj3kw0haeo3fm928bdgu2lbve',
                systemId: '9584f565-c4ab-4750-907d-575ba13e5c19',
                systemName: 'bcdhm1u0z5hbp1stra3u',
                executionId: '0b49132c-2ae0-43d9-a9fa-60f075997cf7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 00:50:51',
                executionMonitoringStartAt: '2021-05-23 23:33:19',
                executionMonitoringEndAt: '2021-05-23 23:13:00',
                error: 39931628808,
                inactive: 9997478712,
                successful: 9533416165,
                stopped: 6913501240,
                unknown: 4660986993,
                unregistered: 4799398288,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewError is too large, has a maximum length of 10');
            });
    });

    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewInactive is too large, has a maximum length of 10`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5c31a82a-8809-47ef-b822-4d705978510e',
                tenantId: '7575c008-6468-46ea-bafd-047bfa1a4d61',
                tenantCode: 'l4qk8p4abk7nip0tso51olxt86z6an1ae18704qm95rv83e48o',
                systemId: 'd67bd11c-026d-452b-a3c3-5751780a7140',
                systemName: '0xxcltesdysivfdqlfj5',
                executionId: '3f114dc3-fb4f-4359-89ed-ce00c7b7618d',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 21:56:04',
                executionMonitoringStartAt: '2021-05-23 11:22:14',
                executionMonitoringEndAt: '2021-05-23 07:07:47',
                error: 6438961495,
                inactive: 54867235146,
                successful: 4956229956,
                stopped: 8258050894,
                unknown: 3565419155,
                unregistered: 3108532507,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewInactive is too large, has a maximum length of 10');
            });
    });

    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewSuccessful is too large, has a maximum length of 10`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '57261ac5-fb48-4b57-ab60-aa62f4477132',
                tenantId: '7ca3bbe0-6a4b-45aa-bd21-830f08b85267',
                tenantCode: '4qhn6bctaoozh2xrl82c2oetzb7lq6lfs004zlw0insdn6xahf',
                systemId: '2d34ca46-1d1a-45b6-af22-23ed82189f6f',
                systemName: 'v6sgpvaj9n32e1h68cry',
                executionId: '9ed6cd95-9b3e-4172-9f5b-0d27706b3426',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 14:57:05',
                executionMonitoringStartAt: '2021-05-23 02:54:20',
                executionMonitoringEndAt: '2021-05-23 04:08:46',
                error: 9782777124,
                inactive: 5667674550,
                successful: 32916077514,
                stopped: 6122192378,
                unknown: 6404354282,
                unregistered: 8227589600,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewSuccessful is too large, has a maximum length of 10');
            });
    });

    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewStopped is too large, has a maximum length of 10`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7acfc0f0-6b7b-4d65-89c7-a5c363afaee2',
                tenantId: '953df485-3d2f-44ff-94ca-ae022f034c50',
                tenantCode: 'ujnas0b64w365d5ocyvm0cxh2ocpeejeda4ccbh9gxtwbh5ma4',
                systemId: '32dbf1bd-326b-40a0-90e6-ca28a2e52f05',
                systemName: 'ldw741q2nabtx0qgvncp',
                executionId: 'c91f72a3-f37d-4364-adf3-c7333cdf6ec6',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 20:24:38',
                executionMonitoringStartAt: '2021-05-23 22:14:56',
                executionMonitoringEndAt: '2021-05-23 14:37:21',
                error: 1416571720,
                inactive: 5510248037,
                successful: 4195890469,
                stopped: 18611755191,
                unknown: 1994012038,
                unregistered: 7359676029,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewStopped is too large, has a maximum length of 10');
            });
    });

    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewUnknown is too large, has a maximum length of 10`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '77dba9aa-70ff-4c21-833f-440f79ede649',
                tenantId: '869bce10-c452-4c83-a5ed-4773828e0335',
                tenantCode: 'hzppc948a7y5mp0mm8clngsuyk34449oeynhstly3fhzr9slsm',
                systemId: '8bf8b036-0415-462c-8cb0-452e8b1b2a0c',
                systemName: 'c879doeswyg7hkafwvgb',
                executionId: 'aaa77c14-2ee0-43f9-aa1a-ceef56215605',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 18:37:54',
                executionMonitoringStartAt: '2021-05-23 13:09:43',
                executionMonitoringEndAt: '2021-05-23 20:03:46',
                error: 8822673735,
                inactive: 9608233108,
                successful: 3514030678,
                stopped: 1637484511,
                unknown: 55263423314,
                unregistered: 2324072175,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewUnknown is too large, has a maximum length of 10');
            });
    });

    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewUnregistered is too large, has a maximum length of 10`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1451b4cd-3b48-4223-9e79-94549f1e8778',
                tenantId: '39b8cf32-a0cd-4a3b-8e39-112ec6f5440d',
                tenantCode: 'hj51ba60i7yc1ihx0gx3xnunntt2xqdddaqzj4s8fyxwgo9zwr',
                systemId: '81de3424-e6fb-49a4-87e3-ccce6bf81e0e',
                systemName: 'fhr9zjnhte0ohi6q60ts',
                executionId: '6f4e5124-d505-4645-8934-2bffdf45cd02',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-24 00:09:33',
                executionMonitoringStartAt: '2021-05-23 04:14:09',
                executionMonitoringEndAt: '2021-05-23 18:38:07',
                error: 5055226805,
                inactive: 5992470779,
                successful: 2041674364,
                stopped: 5540134507,
                unknown: 4954108158,
                unregistered: 34021785693,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewUnregistered is too large, has a maximum length of 10');
            });
    });

    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewError must have a positive sign`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'b2de0dd7-44ea-42e8-a177-8619507f747f',
                tenantId: '27ce6e19-0942-48ea-b2c6-8a7958a22d24',
                tenantCode: 'tg34tslhlcq5g06gwghudcveqz56cfspj33qadk7r4oec96w7z',
                systemId: 'd3615ce0-7b40-4b7d-b77e-d15f144cb43c',
                systemName: '63ql4oklyxsh9lg1qa53',
                executionId: 'dc701627-e668-46bd-9157-67ceaa610f4e',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 12:38:48',
                executionMonitoringStartAt: '2021-05-23 03:26:47',
                executionMonitoringEndAt: '2021-05-23 03:20:53',
                error: -9,
                inactive: 8883515369,
                successful: 5378560629,
                stopped: 4466968647,
                unknown: 4567416827,
                unregistered: 4277143739,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelOverviewError must have a positive sign, this field does not accept negative values');
            });
    });
    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewInactive must have a positive sign`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'eb9bce1e-4416-4553-9197-687932aec9d6',
                tenantId: '643155bc-6959-47c7-9769-08119f6f2530',
                tenantCode: 'r651ydx2kfnjnecfk2nitfuq1khiqexh85ba1fq0zqsaujw8ez',
                systemId: '8daf507a-0664-4dfe-82c0-f489bb06f717',
                systemName: '8j2oqs4pu3a7xual9sqg',
                executionId: '9e87c935-d690-432c-9179-ee57808bcbcb',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 14:21:03',
                executionMonitoringStartAt: '2021-05-23 09:06:21',
                executionMonitoringEndAt: '2021-05-23 02:51:49',
                error: 6766273000,
                inactive: -9,
                successful: 6073640321,
                stopped: 2606493104,
                unknown: 4865098394,
                unregistered: 4386329785,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelOverviewInactive must have a positive sign, this field does not accept negative values');
            });
    });
    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewSuccessful must have a positive sign`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5bb98be6-73f3-4e4b-b13d-6101088f9e7e',
                tenantId: '45fdde81-add0-4e5d-bcbe-5e501475cb96',
                tenantCode: 'zpe14ny1juonexlvkuqxgmu44tuxj7m4swgzbb93gt8olrxbaf',
                systemId: 'f17253d1-e97d-498b-8ebd-5a950cad7712',
                systemName: '2u5dreb1s1vykzuxbel1',
                executionId: 'a9b66b86-873a-41d3-a370-f093a51eb981',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 07:04:35',
                executionMonitoringStartAt: '2021-05-23 02:06:45',
                executionMonitoringEndAt: '2021-05-23 03:56:20',
                error: 1179685771,
                inactive: 6110512236,
                successful: -9,
                stopped: 9862589796,
                unknown: 2347140865,
                unregistered: 9386069399,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelOverviewSuccessful must have a positive sign, this field does not accept negative values');
            });
    });
    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewStopped must have a positive sign`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '94e25e8c-84dc-4d8d-bdac-41d812a249f4',
                tenantId: '3136dc9f-4f9e-4195-941a-b8a7f3acd163',
                tenantCode: 'u3lpn6r8xhckkmutskswedssmuk55x2gsgfn97iamcmm353vsh',
                systemId: 'af961e40-d11b-45d3-95b6-fbffca3b939d',
                systemName: 'tzyq4qrrnh2tmzfdc4js',
                executionId: '8d1c2b73-8da4-45b4-99ad-b281c2c9e7b8',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 06:23:41',
                executionMonitoringStartAt: '2021-05-23 14:04:42',
                executionMonitoringEndAt: '2021-05-23 17:59:49',
                error: 4805261443,
                inactive: 3413705008,
                successful: 8531212681,
                stopped: -9,
                unknown: 7145679250,
                unregistered: 7425452500,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelOverviewStopped must have a positive sign, this field does not accept negative values');
            });
    });
    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewUnknown must have a positive sign`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '3d1cb71c-ea70-47ff-8915-2aaf0424f31c',
                tenantId: '6305ac28-980d-4a47-a549-b426e46b7832',
                tenantCode: '13fqkvuhkn6453f2i84wntbj44cf39n51f18f2anr2ya1wedik',
                systemId: 'a58098c2-1ad9-44cc-9d60-17caa292151d',
                systemName: '61ot1iwes00le5i9pid3',
                executionId: '1975c7a9-01a1-4745-8438-7a69cf9fd16d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 12:53:03',
                executionMonitoringStartAt: '2021-05-23 23:01:16',
                executionMonitoringEndAt: '2021-05-23 19:00:35',
                error: 8541271708,
                inactive: 2717410859,
                successful: 9980340586,
                stopped: 2043886588,
                unknown: -9,
                unregistered: 2353648412,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelOverviewUnknown must have a positive sign, this field does not accept negative values');
            });
    });
    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewUnregistered must have a positive sign`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'a080d095-cc2c-46b4-9919-b2db1c3d0504',
                tenantId: '77e78503-5293-43c0-a6fc-46108b43b7a5',
                tenantCode: 'iz6uf19trvsuuomzl0iawbx2lmz145qz4mjbfwtejbeu117lia',
                systemId: '0d96fad1-f376-4918-a819-efada279a35b',
                systemName: 'wyopapjuoc3c4ndw0agt',
                executionId: '2a39bfdc-e5fa-4b2f-8fd7-149151f934ab',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 16:05:21',
                executionMonitoringStartAt: '2021-05-23 04:56:14',
                executionMonitoringEndAt: '2021-05-23 01:37:58',
                error: 9613577805,
                inactive: 1995497734,
                successful: 7934219665,
                stopped: 6283024046,
                unknown: 8189799263,
                unregistered: -9,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelOverviewUnregistered must have a positive sign, this field does not accept negative values');
            });
    });
    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewExecutionType has to be a enum option of SUMMARY, DETAIL`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '76cb09ee-5bee-4589-bcf2-4d99de9a6440',
                tenantId: 'c058fe2b-bb08-45b3-8496-e370da8edf9d',
                tenantCode: '2s108lc1im18vz0avclmuj7scc6ax8c9kkkehdks6wysxhxruf',
                systemId: '67ed941c-4784-4294-a8cf-abcfd916d921',
                systemName: 'k9xkybcmvw4pd4uqiue3',
                executionId: '0af9a235-b567-4203-9db8-12ba29f377bc',
                executionType: 'XXXX',
                executionExecutedAt: '2021-05-23 08:03:50',
                executionMonitoringStartAt: '2021-05-23 08:13:26',
                executionMonitoringEndAt: '2021-05-23 11:52:49',
                error: 4521214987,
                inactive: 8743157040,
                successful: 5274065471,
                stopped: 9612472636,
                unknown: 6514225914,
                unregistered: 5369953717,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewExecutionExecutedAt has to be a timestamp value`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'd98c81a9-91a6-4ccb-bac1-da430551d23d',
                tenantId: '0661a0a6-5742-498a-9792-c760f82c9dfd',
                tenantCode: 'ie6bnqb4o53kyg6hapy2tdk1ezqh8sdezgmufv73pp2o1ugzud',
                systemId: 'fbd89466-d5e6-4918-8f6b-085afa3e5e8e',
                systemName: 'zngrbipivbxycqo5wxfp',
                executionId: 'fd2a822d-19f7-4cb5-8063-4f4f580d8d4e',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2021-05-23 15:21:26',
                executionMonitoringEndAt: '2021-05-23 04:50:19',
                error: 6737386528,
                inactive: 8946397338,
                successful: 3761779493,
                stopped: 7908285100,
                unknown: 1593628221,
                unregistered: 6429841726,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionExecutedAt has to be a timestamp value');
            });
    });
    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewExecutionMonitoringStartAt has to be a timestamp value`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '68f2ca5c-6ca8-476e-acdc-14166cb0ea35',
                tenantId: '2b7bbdba-365c-4119-875e-a572713b805d',
                tenantCode: 'saze7rzvjcyyaczhi12wfgbzdleep731q0pkysc8kx285cjwx5',
                systemId: 'e8e379b1-80c5-4bf5-a906-0fd7a019c088',
                systemName: 'phzzkyuhfunrij7bdwru',
                executionId: '3ab39654-df04-4181-80dd-da9766121cf0',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 09:57:18',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2021-05-23 17:49:30',
                error: 9198722916,
                inactive: 6822558280,
                successful: 5276125891,
                stopped: 4100024776,
                unknown: 7318345205,
                unregistered: 5899800825,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewExecutionMonitoringEndAt has to be a timestamp value`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'f20d3bda-d11f-4daf-bad8-52bb317dea64',
                tenantId: '4eec604d-ff7c-4891-84b3-da58b7adba61',
                tenantCode: 'ok11vbir48td6uctcdpa7co64klptmib8oeal8ejhvp7iq7ait',
                systemId: 'c615d3e1-9c4c-43b8-a406-1f024b782ef7',
                systemName: 'ovih3hikmkq0hw2038je',
                executionId: 'f69111ed-a761-4daf-9a50-a0b7a7a2b5e5',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 11:54:59',
                executionMonitoringStartAt: '2021-05-23 22:25:18',
                executionMonitoringEndAt: 'XXXXXXXX',
                error: 2594914583,
                inactive: 8725740854,
                successful: 4644896281,
                stopped: 5581567309,
                unknown: 8036680056,
                unregistered: 6219042158,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionMonitoringEndAt has to be a timestamp value');
            });
    });

    test(`/REST:POST cci/channel-overview - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send(seeder.collectionResponse[0])
            .expect(409);
    });

    test(`/REST:GET cci/channels-overview/paginate`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/channels-overview/paginate')
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

    test(`/REST:GET cci/channels-overview`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/channels-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(seeder.collectionResponse);
    });

    test(`/REST:GET cci/channel-overview - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/channel-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: '820e0a39-046f-4125-90d2-de7b7dd5d7b3'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:POST cci/channel-overview`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                tenantId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                tenantCode: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                systemId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                systemName: '4iyw9pwsdxcmgcu744j2',
                executionId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 21:25:17',
                executionMonitoringStartAt: '2021-05-23 21:25:17',
                executionMonitoringEndAt: '2021-05-23 21:25:17',
                error: 6766010162,
                inactive: 3500847560,
                successful: 8734697129,
                stopped: 9011244922,
                unknown: 4564671180,
                unregistered: 2052175457,
            })
            .expect(201);
    });

    test(`/REST:GET cci/channel-overview`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/channel-overview')
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

    test(`/REST:GET cci/channel-overview/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/channel-overview/62f32e95-f5d6-4957-acd0-b1fcd2db684f')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET cci/channel-overview/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/channel-overview/28fe4bec-6e5a-475d-b118-1567f2fd5d25')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:PUT cci/channel-overview - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .put('/cci/channel-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '23fc2902-ddc3-4a2e-9894-029b3450f1ef',
                tenantId: '01d3c56e-5728-46aa-8427-4d9639511b96',
                tenantCode: 'scnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvto',
                systemId: '9189c277-fd22-4a5a-a692-63a1c56085f6',
                systemName: 'zwdlk281zptz1leq1e77',
                executionId: 'afa030f9-065c-4353-b1eb-3e148b092012',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-24 00:03:13',
                executionMonitoringStartAt: '2021-05-23 02:32:57',
                executionMonitoringEndAt: '2021-05-23 17:45:58',
                error: 7587509407,
                inactive: 1968904996,
                successful: 5853885473,
                stopped: 1955449566,
                unknown: 6310602214,
                unregistered: 9683598749,
            })
            .expect(404);
    });

    test(`/REST:PUT cci/channel-overview`, () =>
    {
        return request(app.getHttpServer())
            .put('/cci/channel-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                tenantId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                tenantCode: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                systemId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                systemName: '4iyw9pwsdxcmgcu744j2',
                executionId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 21:25:17',
                executionMonitoringStartAt: '2021-05-23 21:25:17',
                executionMonitoringEndAt: '2021-05-23 21:25:17',
                error: 9901640076,
                inactive: 7293964130,
                successful: 4364246561,
                stopped: 4950560869,
                unknown: 1582091120,
                unregistered: 2245906755,
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:DELETE cci/channel-overview/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/channel-overview/1cc50223-0956-414c-91c3-09a5706bd192')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE cci/channel-overview/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/channel-overview/28fe4bec-6e5a-475d-b118-1567f2fd5d25')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200);
    });

    test(`/GraphQL cciCreateChannelOverview - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:CciCreateChannelOverviewInput!)
                    {
                        cciCreateChannelOverview (payload:$payload)
                        {
                            id
                            tenantCode
                            systemName
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            error
                            inactive
                            successful
                            stopped
                            unknown
                            unregistered
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

    test(`/GraphQL cciPaginateChannelsOverview`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        cciPaginateChannelsOverview (query:$query constraint:$constraint)
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
                expect(res.body.data.cciPaginateChannelsOverview.total).toBe(seeder.collectionResponse.length);
                expect(res.body.data.cciPaginateChannelsOverview.count).toBe(seeder.collectionResponse.length);
                expect(res.body.data.cciPaginateChannelsOverview.rows).toStrictEqual(seeder.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL cciGetChannelsOverview`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        cciGetChannelsOverview (query:$query)
                        {
                            id
                            tenantCode
                            systemName
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            error
                            inactive
                            successful
                            stopped
                            unknown
                            unregistered
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.cciGetChannelsOverview.entries())
                {
                    expect(seeder.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL cciCreateChannelOverview`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:CciCreateChannelOverviewInput!)
                    {
                        cciCreateChannelOverview (payload:$payload)
                        {
                            id
                            tenantCode
                            systemName
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            error
                            inactive
                            successful
                            stopped
                            unknown
                            unregistered
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        tenantId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        tenantCode: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                        systemId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        systemName: '4iyw9pwsdxcmgcu744j2',
                        executionId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2021-05-23 21:25:17',
                        executionMonitoringStartAt: '2021-05-23 21:25:17',
                        executionMonitoringEndAt: '2021-05-23 21:25:17',
                        error: 7975780980,
                        inactive: 7327541186,
                        successful: 2539726771,
                        stopped: 9846873104,
                        unknown: 9073779808,
                        unregistered: 2689341261,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateChannelOverview).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL cciFindChannelOverview - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindChannelOverview (query:$query)
                        {
                            id
                            tenantCode
                            systemName
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            error
                            inactive
                            successful
                            stopped
                            unknown
                            unregistered
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
                            id: '295ccb92-618e-457b-a861-01eceb5988cb'
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

    test(`/GraphQL cciFindChannelOverview`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindChannelOverview (query:$query)
                        {
                            id
                            tenantCode
                            systemName
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            error
                            inactive
                            successful
                            stopped
                            unknown
                            unregistered
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
                expect(res.body.data.cciFindChannelOverview.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL cciFindChannelOverviewById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        cciFindChannelOverviewById (id:$id)
                        {
                            id
                            tenantCode
                            systemName
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            error
                            inactive
                            successful
                            stopped
                            unknown
                            unregistered
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'd2aeec02-8bb8-402d-b6de-f27448bee2e9'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciFindChannelOverviewById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        cciFindChannelOverviewById (id:$id)
                        {
                            id
                            tenantCode
                            systemName
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            error
                            inactive
                            successful
                            stopped
                            unknown
                            unregistered
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
                expect(res.body.data.cciFindChannelOverviewById.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL cciUpdateChannelOverview - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:CciUpdateChannelOverviewInput!)
                    {
                        cciUpdateChannelOverview (payload:$payload)
                        {
                            id
                            tenantCode
                            systemName
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            error
                            inactive
                            successful
                            stopped
                            unknown
                            unregistered
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
                        systemId: '9189c277-fd22-4a5a-a692-63a1c56085f6',
                        systemName: 'zwdlk281zptz1leq1e77',
                        executionId: 'afa030f9-065c-4353-b1eb-3e148b092012',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2021-05-24 00:03:13',
                        executionMonitoringStartAt: '2021-05-23 02:32:57',
                        executionMonitoringEndAt: '2021-05-23 17:45:58',
                        error: 5296026648,
                        inactive: 4922536995,
                        successful: 1576981807,
                        stopped: 2296916032,
                        unknown: 1683097648,
                        unregistered: 9484933017,
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

    test(`/GraphQL cciUpdateChannelOverview`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:CciUpdateChannelOverviewInput!)
                    {
                        cciUpdateChannelOverview (payload:$payload)
                        {
                            id
                            tenantCode
                            systemName
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            error
                            inactive
                            successful
                            stopped
                            unknown
                            unregistered
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
                        systemId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        systemName: '4iyw9pwsdxcmgcu744j2',
                        executionId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2021-05-23 21:25:17',
                        executionMonitoringStartAt: '2021-05-23 21:25:17',
                        executionMonitoringEndAt: '2021-05-23 21:25:17',
                        error: 2882059419,
                        inactive: 3557837884,
                        successful: 1717111551,
                        stopped: 8186953912,
                        unknown: 1579263573,
                        unregistered: 1014638275,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateChannelOverview.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL cciDeleteChannelOverviewById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteChannelOverviewById (id:$id)
                        {
                            id
                            tenantCode
                            systemName
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            error
                            inactive
                            successful
                            stopped
                            unknown
                            unregistered
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '96e44f88-9b75-4978-ace5-16f979805965'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciDeleteChannelOverviewById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteChannelOverviewById (id:$id)
                        {
                            id
                            tenantCode
                            systemName
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            error
                            inactive
                            successful
                            stopped
                            unknown
                            unregistered
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
                expect(res.body.data.cciDeleteChannelOverviewById.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});