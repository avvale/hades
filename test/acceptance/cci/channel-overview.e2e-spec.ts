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
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 12:19:33',
                executionMonitoringStartAt: '2021-05-23 03:13:20',
                executionMonitoringEndAt: '2021-05-22 15:50:38',
                error: 1422038601,
                inactive: 3163869044,
                successful: 2469322783,
                stopped: 8725909745,
                unknown: 5435214510,
                unregistered: 9762312682,
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
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-22 14:26:38',
                executionMonitoringStartAt: '2021-05-23 12:25:31',
                executionMonitoringEndAt: '2021-05-22 18:55:44',
                error: 2052366579,
                inactive: 2938897448,
                successful: 3148983817,
                stopped: 4995181959,
                unknown: 3681540611,
                unregistered: 3393258367,
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
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 00:48:05',
                executionMonitoringStartAt: '2021-05-22 16:34:55',
                executionMonitoringEndAt: '2021-05-23 11:09:45',
                error: 9904464218,
                inactive: 9014481475,
                successful: 6819207755,
                stopped: 8574721944,
                unknown: 3068946902,
                unregistered: 5908498715,
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
                executionExecutedAt: '2021-05-23 09:24:03',
                executionMonitoringStartAt: '2021-05-23 00:43:26',
                executionMonitoringEndAt: '2021-05-22 22:32:45',
                error: 1592612884,
                inactive: 8917042218,
                successful: 3588028846,
                stopped: 6661999504,
                unknown: 6631214446,
                unregistered: 3075393801,
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
                executionExecutedAt: '2021-05-22 16:35:31',
                executionMonitoringStartAt: '2021-05-22 22:03:41',
                executionMonitoringEndAt: '2021-05-22 16:14:04',
                error: 7825061736,
                inactive: 1139511965,
                successful: 7895271683,
                stopped: 1654589712,
                unknown: 1518490146,
                unregistered: 4330026071,
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
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 01:36:57',
                executionMonitoringStartAt: '2021-05-23 06:25:31',
                executionMonitoringEndAt: '2021-05-22 23:49:13',
                error: 8620266825,
                inactive: 2437236467,
                successful: 6344213922,
                stopped: 8778308971,
                unknown: 8575606005,
                unregistered: 9147213025,
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
                executionExecutedAt: '2021-05-22 23:00:41',
                executionMonitoringStartAt: '2021-05-22 22:09:33',
                executionMonitoringEndAt: '2021-05-23 01:22:57',
                error: 7042043382,
                inactive: 7706848565,
                successful: 1972959580,
                stopped: 9440147162,
                unknown: 4502596471,
                unregistered: 1407020491,
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
                executionMonitoringStartAt: '2021-05-22 19:42:54',
                executionMonitoringEndAt: '2021-05-22 19:17:40',
                error: 4270363873,
                inactive: 5155196295,
                successful: 2691470856,
                stopped: 3514975435,
                unknown: 9075622336,
                unregistered: 8501995348,
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
                executionExecutedAt: '2021-05-22 16:05:31',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2021-05-23 06:50:22',
                error: 8036579894,
                inactive: 6679007700,
                successful: 6486159162,
                stopped: 4234265995,
                unknown: 3443041275,
                unregistered: 3567891487,
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
                executionExecutedAt: '2021-05-22 14:16:50',
                executionMonitoringStartAt: '2021-05-22 15:45:11',
                executionMonitoringEndAt: null,
                error: 7475043774,
                inactive: 1801267478,
                successful: 5330072226,
                stopped: 9691420011,
                unknown: 3089784913,
                unregistered: 9799050199,
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
                executionExecutedAt: '2021-05-23 01:54:03',
                executionMonitoringStartAt: '2021-05-23 01:42:35',
                executionMonitoringEndAt: '2021-05-22 22:06:46',
                error: 2846095968,
                inactive: 4861553838,
                successful: 5206299382,
                stopped: 1304746008,
                unknown: 4671371656,
                unregistered: 2552347028,
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
                executionExecutedAt: '2021-05-23 07:29:06',
                executionMonitoringStartAt: '2021-05-22 18:52:00',
                executionMonitoringEndAt: '2021-05-22 16:25:23',
                error: 5519092304,
                inactive: 8874220419,
                successful: 4808451628,
                stopped: 4671379652,
                unknown: 2245410964,
                unregistered: 2383660889,
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
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 00:53:35',
                executionMonitoringStartAt: '2021-05-22 15:07:09',
                executionMonitoringEndAt: '2021-05-23 03:53:50',
                error: 2133671694,
                inactive: 5677459648,
                successful: 8630105181,
                stopped: 5590491154,
                unknown: 9377380656,
                unregistered: 7173735721,
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
                executionExecutedAt: '2021-05-22 20:40:22',
                executionMonitoringStartAt: '2021-05-23 05:27:19',
                executionMonitoringEndAt: '2021-05-23 12:25:36',
                error: 5579836008,
                inactive: 9415365119,
                successful: 8077584239,
                stopped: 7655530031,
                unknown: 7888113077,
                unregistered: 6925808492,
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
                executionExecutedAt: '2021-05-23 07:33:18',
                executionMonitoringStartAt: '2021-05-22 15:08:33',
                executionMonitoringEndAt: '2021-05-22 16:31:20',
                error: 3375267841,
                inactive: 9938875989,
                successful: 2979323827,
                stopped: 7342766049,
                unknown: 2123600506,
                unregistered: 5402427500,
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
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 03:03:46',
                executionMonitoringStartAt: '2021-05-23 05:58:49',
                executionMonitoringEndAt: '2021-05-22 23:11:41',
                error: 9683186642,
                inactive: 4508947753,
                successful: 9527315812,
                stopped: 1377871332,
                unknown: 5241027894,
                unregistered: 2658172044,
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
                executionExecutedAt: '2021-05-23 00:22:38',
                executionMonitoringStartAt: '2021-05-22 16:07:49',
                executionMonitoringEndAt: '2021-05-23 10:21:09',
                error: 3807212931,
                inactive: 9049206810,
                successful: 3305895000,
                stopped: 4848537330,
                unknown: 3513963076,
                unregistered: 1890115954,
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
                executionMonitoringStartAt: '2021-05-23 07:46:13',
                executionMonitoringEndAt: '2021-05-22 18:36:23',
                error: 5914426812,
                inactive: 5135389694,
                successful: 7625221767,
                stopped: 6559213291,
                unknown: 2127194056,
                unregistered: 2574298520,
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
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-22 18:55:51',
                executionMonitoringEndAt: '2021-05-23 13:10:32',
                error: 8223957496,
                inactive: 8202693603,
                successful: 7227600838,
                stopped: 2777019594,
                unknown: 9760093010,
                unregistered: 8848236229,
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
                executionExecutedAt: '2021-05-22 20:15:00',
                executionMonitoringStartAt: '2021-05-22 23:53:56',
                error: 1551143639,
                inactive: 5703348599,
                successful: 9264424970,
                stopped: 7123105261,
                unknown: 6901678320,
                unregistered: 3684239202,
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
                executionExecutedAt: '2021-05-22 15:02:06',
                executionMonitoringStartAt: '2021-05-23 01:01:02',
                executionMonitoringEndAt: '2021-05-23 00:37:05',
                error: 9685263069,
                inactive: 6293692183,
                successful: 2318294217,
                stopped: 8653611986,
                unknown: 3225251540,
                unregistered: 8062525823,
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
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 13:32:15',
                executionMonitoringStartAt: '2021-05-23 08:10:59',
                executionMonitoringEndAt: '2021-05-23 05:49:08',
                error: 3267634683,
                inactive: 8786409038,
                successful: 7108539187,
                stopped: 7791440873,
                unknown: 1484157373,
                unregistered: 8181560996,
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
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 11:28:56',
                executionMonitoringStartAt: '2021-05-23 01:14:04',
                executionMonitoringEndAt: '2021-05-23 07:25:34',
                error: 2277317544,
                inactive: 7831886482,
                successful: 3170837131,
                stopped: 1255235760,
                unknown: 2920086197,
                unregistered: 5099150590,
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
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 08:08:02',
                executionMonitoringStartAt: '2021-05-23 05:46:09',
                executionMonitoringEndAt: '2021-05-23 08:40:22',
                error: 5320465855,
                inactive: 1334785676,
                successful: 9900671959,
                stopped: 2802346590,
                unknown: 8841781450,
                unregistered: 4800837697,
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
                executionExecutedAt: '2021-05-23 06:17:50',
                executionMonitoringStartAt: '2021-05-23 04:51:17',
                executionMonitoringEndAt: '2021-05-23 12:48:28',
                error: 9681320686,
                inactive: 8456602520,
                successful: 9398687145,
                stopped: 9125194168,
                unknown: 5955095252,
                unregistered: 3033741341,
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
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 06:28:37',
                executionMonitoringStartAt: '2021-05-22 16:40:44',
                executionMonitoringEndAt: '2021-05-23 04:07:55',
                error: 9991098833,
                inactive: 7371250139,
                successful: 4115071491,
                stopped: 8460946562,
                unknown: 7870529151,
                unregistered: 3670553595,
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
                executionExecutedAt: '2021-05-22 14:37:19',
                executionMonitoringStartAt: '2021-05-23 13:19:47',
                executionMonitoringEndAt: '2021-05-23 12:59:28',
                error: 33370573725,
                inactive: 9705764485,
                successful: 4524109170,
                stopped: 8372488418,
                unknown: 1249535236,
                unregistered: 9458163236,
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
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 11:42:33',
                executionMonitoringStartAt: '2021-05-23 01:08:42',
                executionMonitoringEndAt: '2021-05-22 20:54:16',
                error: 6484051306,
                inactive: 21179686557,
                successful: 8463549474,
                stopped: 9527149320,
                unknown: 3050873995,
                unregistered: 9088389235,
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
                executionExecutedAt: '2021-05-23 04:43:34',
                executionMonitoringStartAt: '2021-05-22 16:40:49',
                executionMonitoringEndAt: '2021-05-22 17:55:14',
                error: 8192301042,
                inactive: 6139984303,
                successful: 61025580519,
                stopped: 2738829108,
                unknown: 7386487814,
                unregistered: 6298732953,
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
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 10:11:06',
                executionMonitoringStartAt: '2021-05-23 12:01:24',
                executionMonitoringEndAt: '2021-05-23 04:23:49',
                error: 8636097585,
                inactive: 5383612322,
                successful: 3633597662,
                stopped: 89210458471,
                unknown: 3409823108,
                unregistered: 4718419095,
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
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 08:24:22',
                executionMonitoringStartAt: '2021-05-23 02:56:11',
                executionMonitoringEndAt: '2021-05-23 09:50:14',
                error: 5073135578,
                inactive: 8097916814,
                successful: 2139484575,
                stopped: 8136762883,
                unknown: 18953138008,
                unregistered: 2931260113,
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
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 13:56:01',
                executionMonitoringStartAt: '2021-05-22 18:00:37',
                executionMonitoringEndAt: '2021-05-23 08:24:35',
                error: 1398195998,
                inactive: 5744195158,
                successful: 7130024703,
                stopped: 7871131693,
                unknown: 9559826560,
                unregistered: 71808691760,
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
                executionExecutedAt: '2021-05-23 02:25:16',
                executionMonitoringStartAt: '2021-05-22 17:13:15',
                executionMonitoringEndAt: '2021-05-22 17:07:21',
                error: -9,
                inactive: 9918117922,
                successful: 5158707694,
                stopped: 1155140643,
                unknown: 8156977716,
                unregistered: 6862296545,
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
                executionExecutedAt: '2021-05-23 04:07:31',
                executionMonitoringStartAt: '2021-05-22 22:52:50',
                executionMonitoringEndAt: '2021-05-22 16:38:17',
                error: 7242660560,
                inactive: -9,
                successful: 2589425387,
                stopped: 3383498770,
                unknown: 8438130099,
                unregistered: 5644048656,
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
                executionExecutedAt: '2021-05-22 20:51:04',
                executionMonitoringStartAt: '2021-05-22 15:53:13',
                executionMonitoringEndAt: '2021-05-22 17:42:48',
                error: 3577370376,
                inactive: 2802079821,
                successful: -9,
                stopped: 9920745583,
                unknown: 4927646239,
                unregistered: 7164079207,
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
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-22 20:10:10',
                executionMonitoringStartAt: '2021-05-23 03:51:11',
                executionMonitoringEndAt: '2021-05-23 07:46:18',
                error: 1690736100,
                inactive: 2815334373,
                successful: 6562017165,
                stopped: -9,
                unknown: 3010491159,
                unregistered: 9253929941,
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
                executionExecutedAt: '2021-05-23 02:39:32',
                executionMonitoringStartAt: '2021-05-23 12:47:45',
                executionMonitoringEndAt: '2021-05-23 08:47:03',
                error: 1412424653,
                inactive: 2234256940,
                successful: 3950618187,
                stopped: 9620466912,
                unknown: -9,
                unregistered: 4820263638,
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
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 05:51:50',
                executionMonitoringStartAt: '2021-05-22 18:42:42',
                executionMonitoringEndAt: '2021-05-22 15:24:26',
                error: 1800701261,
                inactive: 2108820986,
                successful: 6935168109,
                stopped: 6559974844,
                unknown: 5927000947,
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
                executionExecutedAt: '2021-05-22 21:50:18',
                executionMonitoringStartAt: '2021-05-22 21:59:54',
                executionMonitoringEndAt: '2021-05-23 01:39:17',
                error: 4061178616,
                inactive: 2342869388,
                successful: 6833291587,
                stopped: 6740157025,
                unknown: 9368685147,
                unregistered: 3403747477,
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
                executionMonitoringStartAt: '2021-05-23 05:07:55',
                executionMonitoringEndAt: '2021-05-22 18:36:47',
                error: 2763120372,
                inactive: 5961634733,
                successful: 1257439193,
                stopped: 7518960094,
                unknown: 6171919296,
                unregistered: 1722765471,
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
                executionExecutedAt: '2021-05-22 23:43:46',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2021-05-23 07:35:58',
                error: 3648042271,
                inactive: 8888256982,
                successful: 1073989981,
                stopped: 3261569583,
                unknown: 7112206032,
                unregistered: 3010942039,
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
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 01:41:27',
                executionMonitoringStartAt: '2021-05-23 12:11:46',
                executionMonitoringEndAt: 'XXXXXXXX',
                error: 5113455291,
                inactive: 3380600256,
                successful: 8687435186,
                stopped: 6742919808,
                unknown: 1656890603,
                unregistered: 3521980244,
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
                        id: '15837154-a3cd-421f-a40b-209e64248b92'
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
                executionExecutedAt: '2021-05-23 11:11:45',
                executionMonitoringStartAt: '2021-05-23 11:11:45',
                executionMonitoringEndAt: '2021-05-23 11:11:45',
                error: 1292541320,
                inactive: 3886984054,
                successful: 2172372618,
                stopped: 4974334249,
                unknown: 2525627056,
                unregistered: 8787314865,
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
            .get('/cci/channel-overview/ae6d627f-491a-4445-8fce-e04bb1c5d308')
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
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 13:49:41',
                executionMonitoringStartAt: '2021-05-22 16:19:25',
                executionMonitoringEndAt: '2021-05-23 07:32:26',
                error: 3718072088,
                inactive: 3802946239,
                successful: 7509638381,
                stopped: 6794542776,
                unknown: 8738357283,
                unregistered: 9427686979,
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
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 11:11:45',
                executionMonitoringStartAt: '2021-05-23 11:11:45',
                executionMonitoringEndAt: '2021-05-23 11:11:45',
                error: 4223860761,
                inactive: 3248058451,
                successful: 5888690640,
                stopped: 4156619827,
                unknown: 3561161567,
                unregistered: 1077735861,
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:DELETE cci/channel-overview/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/channel-overview/d25bfb5d-e708-4bdf-bfe2-223b2cb0ab0d')
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
                        executionExecutedAt: '2021-05-23 11:11:45',
                        executionMonitoringStartAt: '2021-05-23 11:11:45',
                        executionMonitoringEndAt: '2021-05-23 11:11:45',
                        error: 6844309336,
                        inactive: 9752693712,
                        successful: 8911330788,
                        stopped: 3518931545,
                        unknown: 1582809377,
                        unregistered: 2159158970,
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
                            id: '664e1e44-89b0-4d0e-ad3b-f82ebc9e2f34'
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
                    id: 'bfe9e134-7d02-4492-9a34-6004bcfc8ce2'
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
                        executionExecutedAt: '2021-05-23 13:49:41',
                        executionMonitoringStartAt: '2021-05-22 16:19:25',
                        executionMonitoringEndAt: '2021-05-23 07:32:26',
                        error: 1469914883,
                        inactive: 7563004543,
                        successful: 2677007836,
                        stopped: 4866847366,
                        unknown: 5379797602,
                        unregistered: 4541811364,
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
                        executionType: 'DETAIL',
                        executionExecutedAt: '2021-05-23 11:11:45',
                        executionMonitoringStartAt: '2021-05-23 11:11:45',
                        executionMonitoringEndAt: '2021-05-23 11:11:45',
                        error: 7223230328,
                        inactive: 8442375904,
                        successful: 8423184781,
                        stopped: 6684024294,
                        unknown: 6446982761,
                        unregistered: 1797315790,
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
                    id: '1e2d3c71-1aee-45f9-982d-b7275e25ee22'
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