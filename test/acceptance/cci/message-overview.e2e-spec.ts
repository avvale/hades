import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IMessageOverviewRepository } from '@hades/cci/message-overview/domain/message-overview.repository';
import { MockMessageOverviewSeeder } from '@hades/cci/message-overview/infrastructure/mock/mock-message-overview.seeder';
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

describe('message-overview', () =>
{
    let app: INestApplication;
    let repository: IMessageOverviewRepository;
    let seeder: MockMessageOverviewSeeder;
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
                    MockMessageOverviewSeeder,
                    TestingJwtService,
                ]
            })
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        app         = module.createNestApplication();
        repository  = module.get<IMessageOverviewRepository>(IMessageOverviewRepository);
        seeder      = module.get<MockMessageOverviewSeeder>(MockMessageOverviewSeeder);
        testJwt     = module.get(TestingJwtService).getJwt();

        // seed mock data in memory database
        repository.insert(seeder.collectionSource);

        await app.init();
    });

    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: null,
                tenantId: '116e7c9c-cf82-4587-bcf1-0b618f9e40a5',
                tenantCode: '9l90m49xvdfxudobfxg16lu3t1ru6wjiplg02oexwl7ugz2xit',
                systemId: '0b4f443c-f44e-4ad3-b681-58ddba63437c',
                systemName: '7n2omp4ix5ik2y7pemeh',
                executionId: '609f29fe-75b4-4130-b18c-fb17a32c0abd',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-22 15:48:46',
                executionMonitoringStartAt: '2021-05-22 16:55:18',
                executionMonitoringEndAt: '2021-05-23 04:08:13',
                numberMax: 6131630636,
                numberDays: 3987269897,
                success: 9458936438,
                cancelled: 6912407330,
                delivering: 2620446344,
                error: 7255721683,
                holding: 3265903217,
                toBeDelivered: 3203976307,
                waiting: 8331927433,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewTenantId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'aeb977e2-dbc6-4a39-81a5-2d648bf56a5b',
                tenantId: null,
                tenantCode: 'b1j8qi1t9fwr66f35yudcwzusnhm8shc1zvoxll56mchc84xji',
                systemId: '9f07fa8d-c49c-4fc0-a9b9-0d7cd9fc6123',
                systemName: 'c7sgsfw3ylzkrte9itwz',
                executionId: '46ea27d0-105b-43e7-a556-1ddf1613959d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-22 18:10:51',
                executionMonitoringStartAt: '2021-05-22 22:36:17',
                executionMonitoringEndAt: '2021-05-23 11:10:50',
                numberMax: 2072177795,
                numberDays: 3362300132,
                success: 6992008768,
                cancelled: 5616245237,
                delivering: 5711009044,
                error: 7742201990,
                holding: 5678996400,
                toBeDelivered: 3491450829,
                waiting: 5123421837,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewTenantCode property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'e7184f42-483f-48fc-a6c7-ac6000d781d9',
                tenantId: '36bad680-76c0-452f-9293-a397347f38f6',
                tenantCode: null,
                systemId: 'fbe57746-8237-4fd8-883c-0eacce5312fb',
                systemName: 'a2edi2ib9n2b0qy8h4vg',
                executionId: 'a164dd16-d744-46a9-8879-7afd9ac5b365',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 12:45:40',
                executionMonitoringStartAt: '2021-05-23 09:37:21',
                executionMonitoringEndAt: '2021-05-22 21:47:17',
                numberMax: 3450338395,
                numberDays: 8677096367,
                success: 6144273100,
                cancelled: 9263312665,
                delivering: 9247326635,
                error: 4844069460,
                holding: 9951358111,
                toBeDelivered: 8106538911,
                waiting: 8371639377,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewSystemId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '6cdff9ec-e47c-4584-b4c4-82eebb2aa32c',
                tenantId: '58eb1ad5-3614-40c7-a999-f1dd27ed2a4a',
                tenantCode: 'c8uvcj30pdqcyx3q4wat6nt1zgg1daiyv44na9zoj93r1sacek',
                systemId: null,
                systemName: 'bnqj8jwcqq5aa5k1me5q',
                executionId: '22219a17-a419-4405-9231-6732dc21fcc6',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-22 21:31:46',
                executionMonitoringStartAt: '2021-05-23 09:29:45',
                executionMonitoringEndAt: '2021-05-22 23:41:33',
                numberMax: 6118392616,
                numberDays: 6160446804,
                success: 3597720817,
                cancelled: 8629757055,
                delivering: 6781202417,
                error: 7856705510,
                holding: 5671101212,
                toBeDelivered: 2755819577,
                waiting: 8922797318,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewSystemName property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'b4969f72-df9f-44a7-a0e5-4e288ee723fd',
                tenantId: '1ce4781f-35a9-4e7e-a40b-553b843e762f',
                tenantCode: 'chaolxzp4lpfphy158zvha2k1kd2bdft73v3rur9gc5oazg63z',
                systemId: 'a9ec05c7-5c7b-47f4-a4f6-99d4fe4a3304',
                systemName: null,
                executionId: 'ffd5c3d2-70f3-4115-a6f8-39aa7fa21978',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 08:07:04',
                executionMonitoringStartAt: '2021-05-23 08:12:47',
                executionMonitoringEndAt: '2021-05-23 07:42:56',
                numberMax: 4857465443,
                numberDays: 6801568496,
                success: 3246117198,
                cancelled: 1231444381,
                delivering: 1470947781,
                error: 3340027044,
                holding: 9592759918,
                toBeDelivered: 7923462153,
                waiting: 1582854882,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewExecutionId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '66d2a9c9-8c4b-46d8-ba02-38d8871df431',
                tenantId: 'b307a7c3-c3c4-4ab7-94a7-08933fcf22a5',
                tenantCode: '6pfnrerc385cdc44euqj2pmwni7zbk8cbc5gbibdamfpj54du4',
                systemId: 'a951da2c-cd6c-445b-b587-aec9d3a517b9',
                systemName: 'fitdycv9it57ga2kp5x7',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 04:26:18',
                executionMonitoringStartAt: '2021-05-23 08:35:51',
                executionMonitoringEndAt: '2021-05-23 08:53:11',
                numberMax: 8488470633,
                numberDays: 7026679510,
                success: 9452075719,
                cancelled: 6839961874,
                delivering: 8608160495,
                error: 5831703387,
                holding: 3255978179,
                toBeDelivered: 1385544762,
                waiting: 4926660813,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewExecutionType property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '9bdb017a-9609-40e3-9461-aecb073b1de7',
                tenantId: '4b5b0bee-1b3f-4317-9a35-578e7e553183',
                tenantCode: '3dm03mfwm6zee72behgq4fotjrvdr9yoclxrf4ucf6oddlp154',
                systemId: '36a30e13-1d8a-4edc-87bf-c4d9dba001dc',
                systemName: 'o6m2euu6yn91nr1qp7cl',
                executionId: 'ae51b326-cb0a-4d94-b6ac-22a9bf73fb23',
                executionType: null,
                executionExecutedAt: '2021-05-22 20:49:01',
                executionMonitoringStartAt: '2021-05-22 15:17:28',
                executionMonitoringEndAt: '2021-05-22 16:42:06',
                numberMax: 4704055598,
                numberDays: 4678086862,
                success: 6464797668,
                cancelled: 5632871740,
                delivering: 4352376404,
                error: 8396814766,
                holding: 3688993667,
                toBeDelivered: 5037363925,
                waiting: 5211584517,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionType must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewExecutionExecutedAt property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'b2422ad1-a477-4a15-a39b-657d66d65811',
                tenantId: '5e846606-c129-466e-8b53-5a2cde17a854',
                tenantCode: 'h3uivmsjtjc07f6pfyrih6gmjh590v8l8r7a4jppaff47pj7ey',
                systemId: '19ece3aa-107d-455c-9713-b707eb2d8019',
                systemName: 'q7yxn91j2bwbzqat28y9',
                executionId: 'c4742da1-cfba-4c01-9313-36caa2455c2d',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2021-05-23 07:49:31',
                executionMonitoringEndAt: '2021-05-23 07:05:11',
                numberMax: 5405721885,
                numberDays: 2673636150,
                success: 9643769010,
                cancelled: 7235304923,
                delivering: 5757924185,
                error: 4982524932,
                holding: 7778578630,
                toBeDelivered: 3345098203,
                waiting: 5527564536,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionExecutedAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewExecutionMonitoringStartAt property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '75024847-e4f5-40a7-846f-9fed8ae2d4ae',
                tenantId: '99f40bc4-04b8-4c89-ae97-3679054abc2a',
                tenantCode: 't91ysaj92r4yqq0xacov2gso29fmqi7553d9o29l5nmivnj2um',
                systemId: '1ece7f9d-4a7f-4612-9b17-605f0ccee081',
                systemName: 'o967sz5wmyabuzakm6v3',
                executionId: 'addd6fa8-bcd9-44c9-a8cc-e4965290d9d0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 04:27:55',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2021-05-22 16:49:05',
                numberMax: 2815002247,
                numberDays: 9137944896,
                success: 3558821616,
                cancelled: 9083940101,
                delivering: 5147744252,
                error: 5547700477,
                holding: 2394543578,
                toBeDelivered: 8736525574,
                waiting: 7794562467,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewExecutionMonitoringEndAt property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7b2efbde-9f00-4062-8672-2e0ac52eba39',
                tenantId: 'c1c8f59f-da09-4e7f-b5cf-82587ead4648',
                tenantCode: 'jnm4j2ucpxvn35v2k6dthfs6i4fj5kmfc90f65rn5t1k1cflra',
                systemId: 'bfeb8be0-561e-44bc-aec4-1c6475ae77e5',
                systemName: '23z448njp6lc4prwlicj',
                executionId: 'b9969499-35c1-4e98-8f00-6ab913cd7700',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 10:10:04',
                executionMonitoringStartAt: '2021-05-22 16:11:46',
                executionMonitoringEndAt: null,
                numberMax: 1978794496,
                numberDays: 7764627130,
                success: 5776055484,
                cancelled: 5853695181,
                delivering: 6733345883,
                error: 1673969631,
                holding: 1360548681,
                toBeDelivered: 9506468078,
                waiting: 3911773557,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                tenantId: '8a2c3b27-37ac-499e-8088-5af9d267aa78',
                tenantCode: 'x2iseshr5xhy25xyzb4nwyixuv4xoryf45kc6ux4jpdpy1up3u',
                systemId: 'b798c3eb-a6e9-4f81-838e-d689084fc703',
                systemName: '1hfywvvs5f4c5hlbpzlh',
                executionId: '4077cc73-b92a-4de2-acfd-bb687572d213',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-22 14:56:25',
                executionMonitoringStartAt: '2021-05-23 11:56:42',
                executionMonitoringEndAt: '2021-05-23 11:43:57',
                numberMax: 6288411330,
                numberDays: 7247135840,
                success: 9321154135,
                cancelled: 8936993509,
                delivering: 6239677542,
                error: 3979654327,
                holding: 5115493221,
                toBeDelivered: 2985021460,
                waiting: 9377118794,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewTenantId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '9aea538a-f900-4af1-8cab-7808d7da9e65',
                tenantCode: 'zvv0l38sc5e24vdh1e4pj8hjkmyqj95u2zosavxje58z4vuj9n',
                systemId: 'c15b37b9-e827-407b-b1b9-11179aa18584',
                systemName: '6qhhuk63o7gvgh1yvl5h',
                executionId: '01c9bed8-330c-4086-a3a8-8f58b1bd22d8',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-22 17:17:13',
                executionMonitoringStartAt: '2021-05-22 16:08:12',
                executionMonitoringEndAt: '2021-05-22 17:52:53',
                numberMax: 5822645057,
                numberDays: 2171911456,
                success: 9789922225,
                cancelled: 2670166445,
                delivering: 1853760866,
                error: 5197804364,
                holding: 1602245501,
                toBeDelivered: 6380018827,
                waiting: 8902740918,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewTenantId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewTenantCode property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '3dd06e19-2a69-41f2-a8da-356bf784a96e',
                tenantId: '8d2ea590-4fe6-4a8f-a82e-3e60da516005',
                systemId: '859f11f8-24c0-4acb-b5e4-c6d6da1a2b0a',
                systemName: 'ypvaglxevxkwzj3jqknl',
                executionId: '47fbac78-6456-4dcf-a4f5-f7a2c040aec7',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 06:05:45',
                executionMonitoringStartAt: '2021-05-22 22:08:50',
                executionMonitoringEndAt: '2021-05-23 08:44:23',
                numberMax: 1982448358,
                numberDays: 8195624431,
                success: 7835738509,
                cancelled: 3351017674,
                delivering: 2364098173,
                error: 8023941130,
                holding: 5202501808,
                toBeDelivered: 2714748563,
                waiting: 7183178327,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewTenantCode must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewSystemId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'e5bfecf8-fc98-4948-8bc0-760056122280',
                tenantId: '67991c2b-6d3a-4789-abb7-106d30a00172',
                tenantCode: '2coqnggmudl28c0i69ff72hltslfa9gv6c8106vzj5dblr7lw2',
                systemName: '8c52q46ckqseufgoehk1',
                executionId: 'e17a5678-c160-4478-a6ff-79148ee9ad26',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 04:28:54',
                executionMonitoringStartAt: '2021-05-22 23:47:49',
                executionMonitoringEndAt: '2021-05-23 12:02:13',
                numberMax: 3314728529,
                numberDays: 8531333134,
                success: 2506377655,
                cancelled: 9819160129,
                delivering: 4473760758,
                error: 9423898482,
                holding: 5748019619,
                toBeDelivered: 4839346194,
                waiting: 8046223307,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSystemId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewSystemName property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'abede6ed-fe48-4814-83ea-7d9217d99dea',
                tenantId: '67ba99d3-86df-4c44-8522-062be2106220',
                tenantCode: 'l04n7m40y9jghznajafxjari82rea871zsxpcdx9rlgl4ju376',
                systemId: '1baa0f77-1882-4a95-a471-bd87fe1c00fb',
                executionId: '84ddb1ac-ed8d-480a-92cf-0800ca326934',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 11:43:51',
                executionMonitoringStartAt: '2021-05-23 00:42:18',
                executionMonitoringEndAt: '2021-05-22 23:06:29',
                numberMax: 5065386527,
                numberDays: 4502373913,
                success: 2932423396,
                cancelled: 5579571314,
                delivering: 5684358089,
                error: 5497288255,
                holding: 2913901829,
                toBeDelivered: 3050225266,
                waiting: 7708905016,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSystemName must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewExecutionId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '2f0efdc8-c658-4df6-a6d6-76c7b29dd0e3',
                tenantId: 'caa79a92-fc93-4b9c-8f14-65a574d38b4f',
                tenantCode: 'hstskiwmkwafz1yfv5kfvio74ctk2ch3uqab7kdru4zojmspt4',
                systemId: '8ce59ab7-be39-4d7b-a0c0-64c5be28bb60',
                systemName: 'x6kn2ar08svgsjbfmd28',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 10:55:15',
                executionMonitoringStartAt: '2021-05-22 23:48:39',
                executionMonitoringEndAt: '2021-05-23 12:43:27',
                numberMax: 5087904762,
                numberDays: 9573876046,
                success: 4108293875,
                cancelled: 6612068752,
                delivering: 4589145027,
                error: 5577317874,
                holding: 9192547853,
                toBeDelivered: 8687781482,
                waiting: 4581219320,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewExecutionType property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'deaa7c29-598f-4581-8ab0-628ee1c12694',
                tenantId: '248c6e2c-623e-47a5-905f-0111b9eaa1da',
                tenantCode: 'nsndhusch59jpgfet563n5r6k6fcuqyeqcgd1fw4r2kt5f3ld9',
                systemId: '4ce122f2-a918-47f6-b521-8461edb204b2',
                systemName: 'kc6da6ak8teqzvm3jcto',
                executionId: '2e8bbc38-a763-4759-a9f4-f77884e761ff',
                executionExecutedAt: '2021-05-22 21:12:54',
                executionMonitoringStartAt: '2021-05-23 03:21:06',
                executionMonitoringEndAt: '2021-05-23 07:35:42',
                numberMax: 1540446542,
                numberDays: 9038838505,
                success: 2626122230,
                cancelled: 2555648185,
                delivering: 4355791800,
                error: 8616369252,
                holding: 7417231408,
                toBeDelivered: 2391248177,
                waiting: 7220494531,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionType must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewExecutionExecutedAt property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'bbb8536e-3df1-4e7b-b75f-cccadd32de62',
                tenantId: '717ccf6b-7c01-4724-a058-8d340233c88b',
                tenantCode: 'dbpf75n8mxbsmd3g58mhembzqyg0xvflwck7ps7xlb3lyyn46x',
                systemId: 'e2b1350c-6fb3-4848-ba14-3803ef1d378a',
                systemName: 'nvbyyb8yuk2g1ypiiyin',
                executionId: '40aeeca9-c815-4cd1-b39d-a2d7799f210f',
                executionType: 'DETAIL',
                executionMonitoringStartAt: '2021-05-23 11:39:41',
                executionMonitoringEndAt: '2021-05-23 13:30:38',
                numberMax: 2126621693,
                numberDays: 5884105154,
                success: 1180019877,
                cancelled: 6827317057,
                delivering: 9909107839,
                error: 6386126495,
                holding: 6340682574,
                toBeDelivered: 1349304110,
                waiting: 9785490232,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionExecutedAt must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewExecutionMonitoringStartAt property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '6e17ec62-5486-4fde-81b7-2d68640e0418',
                tenantId: '79f36fee-8d72-412a-8a77-c586073bbd01',
                tenantCode: 'vi4aym7odlxbvqp653lojfvr7gai36o5e3de6fea4fhpghg47r',
                systemId: 'a75b06c2-7053-4bbe-8fbd-f41fd39cc588',
                systemName: 'syuur4o1cxjji8rh9oql',
                executionId: '68d6f865-70bd-483b-9194-5e5510c9daa6',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 11:34:44',
                executionMonitoringEndAt: '2021-05-23 01:38:28',
                numberMax: 9266513757,
                numberDays: 6623322293,
                success: 2921429674,
                cancelled: 5763280465,
                delivering: 3676794162,
                error: 2644994386,
                holding: 6152234846,
                toBeDelivered: 4059204133,
                waiting: 9147601628,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewExecutionMonitoringEndAt property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '58d5661a-cfe4-472c-b7e5-12e645a16ee1',
                tenantId: '4cd84b5b-5c2e-4cb3-8803-33991555efa8',
                tenantCode: '94bf1ospvjjgp5kvbla38thlfzzlmsmsd4gxm8wokyxt8c94nl',
                systemId: '9aabc54d-7412-40d5-8b66-964ed802034b',
                systemName: 'k6sjr3jnngzlz1fkevu3',
                executionId: '5caa789f-e550-4106-a659-dea6b964f801',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 02:51:43',
                executionMonitoringStartAt: '2021-05-23 03:22:02',
                numberMax: 5856964457,
                numberDays: 2401766856,
                success: 3599845769,
                cancelled: 9730112468,
                delivering: 7320025811,
                error: 2767630968,
                holding: 2908036286,
                toBeDelivered: 2691137293,
                waiting: 1371013933,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'kozi05tnkteq4towy3atkfiqsel2l4dcb1lrv',
                tenantId: 'dca51dcf-8aa9-4c26-bdfa-7eda64ebcf78',
                tenantCode: 'cn5juzqwko6ncn41eu59bcee62e574siowl7vixvyjqotsadn3',
                systemId: '25e32f32-3df0-4315-be1e-289de0e63f73',
                systemName: '9bs3vjuc9m3v8yrm0how',
                executionId: '29d216fe-273c-4dff-9270-628321a49ce1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 09:27:59',
                executionMonitoringStartAt: '2021-05-22 17:07:29',
                executionMonitoringEndAt: '2021-05-22 14:23:33',
                numberMax: 3830102677,
                numberDays: 5183886156,
                success: 5257130661,
                cancelled: 1037002745,
                delivering: 3781838290,
                error: 8177782842,
                holding: 5078338466,
                toBeDelivered: 9732107670,
                waiting: 8022167285,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewTenantId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '11061755-9325-442d-b564-2c9c27ecb66c',
                tenantId: '40dbtfyvjdkuobsjsya1kp1lio7ti02oro9n2',
                tenantCode: '1hpwkawx1xyjsp8b4baxatri6hlqcct3mmz6ygkh02tx8nvxwg',
                systemId: 'af5e99ce-dcd5-47b9-bcf1-c1900d4e65d8',
                systemName: 'ta7kaqlrlluz1kks4fib',
                executionId: '26f81c77-f0fe-4f99-ac78-bbcffb7125b9',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-22 19:39:42',
                executionMonitoringStartAt: '2021-05-22 18:41:58',
                executionMonitoringEndAt: '2021-05-22 21:13:33',
                numberMax: 6814760685,
                numberDays: 4967491923,
                success: 8864079159,
                cancelled: 5936831144,
                delivering: 7407518276,
                error: 8666157708,
                holding: 5681588674,
                toBeDelivered: 4625700946,
                waiting: 7070204110,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewTenantId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewSystemId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '28cad49e-e7a2-4383-933f-b528da5f9552',
                tenantId: '82e8767c-4173-4ad5-b727-cfa1d0724f6c',
                tenantCode: '2a1cwsv5b6xr18mxeniy30udw68g7lwpn1c4d7nyeil4uc1yvg',
                systemId: 'hsxfkzwkm3s65z4ely2l2fl4ehk4z3pwycxuv',
                systemName: '1mwmywntu6mz1k0pxghh',
                executionId: 'd57e4f82-4eef-4b00-98b3-89ceecce7221',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 13:17:36',
                executionMonitoringStartAt: '2021-05-23 12:09:22',
                executionMonitoringEndAt: '2021-05-22 17:05:48',
                numberMax: 1161555034,
                numberDays: 8563701360,
                success: 1887536123,
                cancelled: 1753651227,
                delivering: 5106004385,
                error: 8393632212,
                holding: 1355863340,
                toBeDelivered: 9980122849,
                waiting: 9878752392,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSystemId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewExecutionId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5337cced-c9dd-45b6-8b3c-61ad81f864e2',
                tenantId: 'e9873ff8-e83f-4fce-b9f0-9491728d42cc',
                tenantCode: 'zekhsu3t9yu6wlfixfy925amg2ium3wsmhx0oehq1x3ul3xve0',
                systemId: '5bc784c0-448a-4dbf-98c7-e567a7dd551d',
                systemName: '6azhzi7ykugs5xudq79u',
                executionId: 'nhdms4jo1gsdr375lxl3rafryq98fjia6ntm8',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 04:41:17',
                executionMonitoringStartAt: '2021-05-23 09:33:36',
                executionMonitoringEndAt: '2021-05-22 18:46:05',
                numberMax: 3526086933,
                numberDays: 2985146221,
                success: 5174481787,
                cancelled: 3270277560,
                delivering: 9672704788,
                error: 1965570222,
                holding: 5598744380,
                toBeDelivered: 2460310124,
                waiting: 3501812137,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewTenantCode is too large, has a maximum length of 50`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '51dde6ba-1344-4158-8330-d375c6f88358',
                tenantId: 'ac7ad184-ecac-4013-985f-60f4a6769f74',
                tenantCode: 'b5sdcy46ez2sr3dwik7gnoutjx37drkvp0s89ud2k3aevigj9qk',
                systemId: 'f6470dea-469f-4b39-9090-7107d98dd947',
                systemName: 'ml7z79u0qw4kte3cscbm',
                executionId: '00b8e5f2-d8ef-4a95-b58c-4c245b49b138',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-22 23:16:40',
                executionMonitoringStartAt: '2021-05-22 20:06:50',
                executionMonitoringEndAt: '2021-05-22 22:05:45',
                numberMax: 5964339811,
                numberDays: 1296497231,
                success: 1709528578,
                cancelled: 1435126253,
                delivering: 9640867155,
                error: 4131666380,
                holding: 3868137586,
                toBeDelivered: 1258568234,
                waiting: 8917331393,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewTenantCode is too large, has a maximum length of 50');
            });
    });

    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewSystemName is too large, has a maximum length of 20`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ca4a5375-98a9-427b-8457-e85b0d1862fa',
                tenantId: 'fcb088b7-c739-454a-abbf-648f1eb60d83',
                tenantCode: 's1onvdy50hakeye8tn4dqex4nu94jxtjbqmho07626q1asarmm',
                systemId: '36f24ed9-b425-4203-817b-ce20b282d33d',
                systemName: 'qe7399mcqs9ygxquqrpyz',
                executionId: '05105c86-e05b-4345-a74c-4773ae6580e2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 06:18:42',
                executionMonitoringStartAt: '2021-05-22 20:06:05',
                executionMonitoringEndAt: '2021-05-22 16:05:35',
                numberMax: 7434364642,
                numberDays: 1988332679,
                success: 9544470083,
                cancelled: 9469474211,
                delivering: 3005671390,
                error: 2540060991,
                holding: 1189429501,
                toBeDelivered: 1322523997,
                waiting: 4054388426,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSystemName is too large, has a maximum length of 20');
            });
    });

    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewNumberMax is too large, has a maximum length of 10`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'c9b548a1-7d1d-42fd-9ca1-9b1aec816c06',
                tenantId: 'ac394280-03fd-4832-8dee-3b00b3ef7a6f',
                tenantCode: 'em12gq908470mnkgpnceakn6itpnu5e1mrtzo5o6ln4ehhsay2',
                systemId: '76c5b1b4-730d-4fbf-b23b-63b49d7ec22b',
                systemName: 'muhqm5t0zd6v6twg37kj',
                executionId: '33da6386-3cb7-4af4-8f1a-aecdbd7d6089',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-22 22:54:37',
                executionMonitoringStartAt: '2021-05-22 19:15:29',
                executionMonitoringEndAt: '2021-05-23 05:57:12',
                numberMax: 40340456027,
                numberDays: 9621130950,
                success: 1832321328,
                cancelled: 4471764983,
                delivering: 5726903026,
                error: 4871462449,
                holding: 4867518511,
                toBeDelivered: 2632631854,
                waiting: 1193210533,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewNumberMax is too large, has a maximum length of 10');
            });
    });

    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewNumberDays is too large, has a maximum length of 10`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '36ebccd8-7010-42dc-9755-a757356862e3',
                tenantId: '240bb14c-de99-4295-a8a2-aa5b3f2cbfee',
                tenantCode: 'zscpk7hx7fpm6at0f3fdamphpc4khkxijpeqdwwe5bgbor4850',
                systemId: '77d50884-b736-4e73-bdd4-ebf0a81294c9',
                systemName: '729aszth2r60z7jr087c',
                executionId: 'cc9a11fc-1dad-4393-ae23-ed801835752b',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 08:35:25',
                executionMonitoringStartAt: '2021-05-22 23:55:43',
                executionMonitoringEndAt: '2021-05-23 13:41:51',
                numberMax: 4053746792,
                numberDays: 16869037452,
                success: 1253891746,
                cancelled: 1695810110,
                delivering: 4440019383,
                error: 7377970935,
                holding: 1779136400,
                toBeDelivered: 1545478352,
                waiting: 7956439822,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewNumberDays is too large, has a maximum length of 10');
            });
    });

    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewSuccess is too large, has a maximum length of 10`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '0af62b4c-f5a8-4b82-84f2-c0893b55ed4d',
                tenantId: 'f41b9a90-4967-458e-a1f2-b8487923b246',
                tenantCode: 'cbbnfrwpwb3kyiagq2ah5ra1dmcy6m1wq3clfv0cywxrzxyw8t',
                systemId: '324fde92-4cca-4fd0-8991-d0e93614480c',
                systemName: 'k007w9qbiksn4tfta9sa',
                executionId: 'cc7eda44-3e9d-4933-8e70-b7be7de9e3c8',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-22 21:32:34',
                executionMonitoringStartAt: '2021-05-23 01:16:02',
                executionMonitoringEndAt: '2021-05-23 10:44:57',
                numberMax: 1441786240,
                numberDays: 8872387093,
                success: 71673839523,
                cancelled: 6607591319,
                delivering: 3445802823,
                error: 2419501128,
                holding: 9984171289,
                toBeDelivered: 3120861207,
                waiting: 1621205854,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSuccess is too large, has a maximum length of 10');
            });
    });

    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewCancelled is too large, has a maximum length of 10`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'c4e59fe4-7dd3-4547-b0a8-9786f8a425c8',
                tenantId: '57bd926c-9925-480f-9b54-018f934566ba',
                tenantCode: 'ylqubuqf1gpq17hrbmrlnz01j80ntaa3a87we287145y1owd67',
                systemId: 'b4f769a1-6fb4-4e89-9a47-310a9705ae5e',
                systemName: 'km8cvs3yd5rizrtr7umb',
                executionId: 'b5a0777f-a943-4437-938f-9b5bd5d97d1e',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 04:11:22',
                executionMonitoringStartAt: '2021-05-22 23:24:44',
                executionMonitoringEndAt: '2021-05-22 22:27:52',
                numberMax: 8516345098,
                numberDays: 5249698980,
                success: 6633872803,
                cancelled: 24566003681,
                delivering: 4922045005,
                error: 2071138395,
                holding: 3319822393,
                toBeDelivered: 6679151645,
                waiting: 4318672261,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewCancelled is too large, has a maximum length of 10');
            });
    });

    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewDelivering is too large, has a maximum length of 10`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '6956381c-895b-4a99-8694-e0ad9b798e3d',
                tenantId: '552cfbf8-e3e1-4872-a4ec-41e651b15863',
                tenantCode: '8pdln2rgru3urz68yg78nvx5jn9993q33k9e17bhb2zez3zxov',
                systemId: '71880efb-cdbf-4558-be87-35c7aaed6291',
                systemName: 'uytsj3dz5j14k86bspl1',
                executionId: 'dad509df-5b38-4460-9990-32c2538ebac3',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-22 20:27:47',
                executionMonitoringStartAt: '2021-05-23 08:31:39',
                executionMonitoringEndAt: '2021-05-23 11:28:02',
                numberMax: 1821006218,
                numberDays: 4190195853,
                success: 7214628922,
                cancelled: 4976378734,
                delivering: 75194539121,
                error: 3849299477,
                holding: 2649155972,
                toBeDelivered: 7565401546,
                waiting: 2512546745,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewDelivering is too large, has a maximum length of 10');
            });
    });

    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewError is too large, has a maximum length of 10`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '278bb3f7-439a-4a69-b77c-7380131d1a3e',
                tenantId: '4c6f5102-713f-4a42-a349-15f20d2984cc',
                tenantCode: '5astlig2w1xfof98te91zm4vncvxsg1o4d8ybtai2g9cayn19l',
                systemId: '5e7d7ffc-29f9-42d1-ada9-3e633600eb29',
                systemName: '7zfk74px15omf7orc24r',
                executionId: 'f275d732-861a-4ca5-a36b-68fd7a0539c6',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-22 22:54:22',
                executionMonitoringStartAt: '2021-05-22 17:36:09',
                executionMonitoringEndAt: '2021-05-23 07:50:57',
                numberMax: 8188403171,
                numberDays: 4758127105,
                success: 1549658292,
                cancelled: 3296650203,
                delivering: 5941690901,
                error: 37049128463,
                holding: 9126645014,
                toBeDelivered: 5394545025,
                waiting: 6224603118,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewError is too large, has a maximum length of 10');
            });
    });

    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewHolding is too large, has a maximum length of 10`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '3a100ecf-1a06-40af-a980-a3f182b93b89',
                tenantId: '9eb57203-55ee-4362-bbd7-d81fd0c37423',
                tenantCode: 'v51ove1r3f972oe90kegxpoqf5p9dnll1p8501qjgtw36yvecj',
                systemId: 'eec33e58-11bb-4ed0-8bfe-a7e38dde8569',
                systemName: '38z3jfzfn48ngkfkdvln',
                executionId: '3604f05d-6af7-41ed-a5ad-6de084f56d54',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 07:54:49',
                executionMonitoringStartAt: '2021-05-23 13:58:02',
                executionMonitoringEndAt: '2021-05-22 15:39:47',
                numberMax: 1623850409,
                numberDays: 8829008553,
                success: 7079704584,
                cancelled: 9661678510,
                delivering: 4622553129,
                error: 4103232988,
                holding: 63482321365,
                toBeDelivered: 2705863412,
                waiting: 5586810410,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewHolding is too large, has a maximum length of 10');
            });
    });

    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewToBeDelivered is too large, has a maximum length of 10`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '0d414368-7ddd-4893-9083-ed3efa5cdd48',
                tenantId: '8b60ee1f-08e6-457a-8319-0b4c59fe9996',
                tenantCode: 'g5kyoortxq7woxrsw0rwcxu2o5u71ddv5tsbvf2j5kpmgu4ypv',
                systemId: 'a0f15ea0-e33d-48e3-92e2-bddf8ad1d2dd',
                systemName: 'pbhkeg58a1a5q6lce938',
                executionId: 'bcb6f53e-ebf0-4b34-bfb5-27ccbef68e05',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-22 16:37:45',
                executionMonitoringStartAt: '2021-05-22 22:03:41',
                executionMonitoringEndAt: '2021-05-23 02:42:58',
                numberMax: 4916342711,
                numberDays: 5986917577,
                success: 4487222022,
                cancelled: 7616987456,
                delivering: 8015253408,
                error: 5916007334,
                holding: 2318360891,
                toBeDelivered: 38816988452,
                waiting: 8083528210,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewToBeDelivered is too large, has a maximum length of 10');
            });
    });

    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewWaiting is too large, has a maximum length of 10`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '0c62f367-6500-4be7-a295-b831acc44506',
                tenantId: '9c9ff1a6-57f7-4d6f-a1b6-a4a3aa71705a',
                tenantCode: 'g31lfu9ktxqw8yq4l11wxrfs7sphaa5tm7ize07ld7vcsdvfan',
                systemId: 'bce76fc0-13fd-4c17-8eeb-48c1b743586f',
                systemName: '4revlxspag235fw8tk14',
                executionId: '3e4a230e-4e84-4dbd-8186-96a6e67da57b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 11:17:53',
                executionMonitoringStartAt: '2021-05-23 12:55:12',
                executionMonitoringEndAt: '2021-05-23 06:35:36',
                numberMax: 2544989780,
                numberDays: 8679609856,
                success: 3839775522,
                cancelled: 6851780959,
                delivering: 1237982684,
                error: 1417842748,
                holding: 3518651440,
                toBeDelivered: 7557152351,
                waiting: 47808016892,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewWaiting is too large, has a maximum length of 10');
            });
    });

    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewNumberMax must have a positive sign`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'e25e15cd-84f3-47ae-ab49-f61f7d772ed5',
                tenantId: '6a2e76f9-ed9c-4d36-93fa-39e188894133',
                tenantCode: 've02s5zdye9mqd7z4ktk06bvl6922ld17um3bfe607l5og77p3',
                systemId: '5bc64b54-5d9c-46ac-b2e8-93cdf2bd4dfc',
                systemName: 'z102u9hxx2vy4ccc18s5',
                executionId: '03bb1004-5805-40cd-9f3f-ee95c9afaeb4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-22 17:08:27',
                executionMonitoringStartAt: '2021-05-23 00:49:39',
                executionMonitoringEndAt: '2021-05-23 08:49:24',
                numberMax: -9,
                numberDays: 5384222203,
                success: 8944172723,
                cancelled: 1772285795,
                delivering: 4752857396,
                error: 9227448254,
                holding: 4245789261,
                toBeDelivered: 8681058502,
                waiting: 7696040628,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewNumberMax must have a positive sign, this field does not accept negative values');
            });
    });
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewNumberDays must have a positive sign`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'e5bec99c-affe-419a-acc7-3ede8e1e4533',
                tenantId: 'cef71b65-8e92-4472-b397-d298d67ee868',
                tenantCode: 'd7ukwzgvr6e4hk5eustbsb199lv8s5ge2yqu5iuruag9jz8drb',
                systemId: 'e5740532-4985-4a27-9779-d03d091ee861',
                systemName: '0dmb8ikl7xm1wh1lpxj8',
                executionId: '5057dc15-a64d-42ad-aedc-56eaf566b09b',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-22 22:50:58',
                executionMonitoringStartAt: '2021-05-23 10:45:29',
                executionMonitoringEndAt: '2021-05-22 20:59:16',
                numberMax: 1107028351,
                numberDays: -9,
                success: 6024224647,
                cancelled: 5359495103,
                delivering: 7715565054,
                error: 2770657001,
                holding: 5052900425,
                toBeDelivered: 5660018199,
                waiting: 3868156534,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewNumberDays must have a positive sign, this field does not accept negative values');
            });
    });
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewSuccess must have a positive sign`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '517786c8-f0b4-426e-9974-b5f4c3e1df86',
                tenantId: 'd4b758d8-c5c1-40a3-987b-34a6fa04d8fe',
                tenantCode: 'jwllixugr2q570mqd053z25erhke5ysdkqituspmztyftef04n',
                systemId: 'e19777d2-4ae5-4dc8-883b-08d3b32dcc13',
                systemName: 'qvctbjga7uow2lc39514',
                executionId: '493c6d82-25ea-4b95-9d3a-64bdbe99696f',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 02:11:51',
                executionMonitoringStartAt: '2021-05-22 21:55:38',
                executionMonitoringEndAt: '2021-05-22 22:41:45',
                numberMax: 2163208753,
                numberDays: 2293662180,
                success: -9,
                cancelled: 5243705798,
                delivering: 4186256198,
                error: 2509172834,
                holding: 1248712086,
                toBeDelivered: 5779818413,
                waiting: 5601508745,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewSuccess must have a positive sign, this field does not accept negative values');
            });
    });
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewCancelled must have a positive sign`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'caae5e08-78e4-4c99-bace-9b475c7d63a6',
                tenantId: 'cedeb03b-ced5-4f5d-a127-6ed0649b86fd',
                tenantCode: 'dtfy9erwjhn3ckcfcclwdyrc328a9jtlx6v1f6yiy1rj84nb2r',
                systemId: '49c2b0c6-85b4-40f0-8319-2e95826bc0f8',
                systemName: 'hoqk5tc8t2m4j93f2u11',
                executionId: 'a952f3e7-d9cd-4f75-9756-222c4a26798f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 13:27:01',
                executionMonitoringStartAt: '2021-05-23 07:20:51',
                executionMonitoringEndAt: '2021-05-23 06:54:02',
                numberMax: 3303657993,
                numberDays: 1878860905,
                success: 1449997784,
                cancelled: -9,
                delivering: 4518294804,
                error: 3067559705,
                holding: 6944180692,
                toBeDelivered: 3364977518,
                waiting: 6633022262,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewCancelled must have a positive sign, this field does not accept negative values');
            });
    });
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewDelivering must have a positive sign`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '8d697fa9-118c-42b1-bcf0-c59c67e6fd69',
                tenantId: '4b270390-ceaa-4ca9-a4df-463cdb9f9bb4',
                tenantCode: 'uzj3hs65jmntz2p7kfkb7ec4mgleitc5stxle25c7eq5y7j12m',
                systemId: '47cec1ce-18ef-4903-9846-084814b41e0d',
                systemName: 'jxs53h6upczew28ku7u8',
                executionId: '7b2afb1a-eacb-44c6-b099-b29c2f7ec5f9',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-22 22:45:09',
                executionMonitoringStartAt: '2021-05-23 11:39:37',
                executionMonitoringEndAt: '2021-05-22 21:42:59',
                numberMax: 5982989190,
                numberDays: 3152907800,
                success: 9988789771,
                cancelled: 8351211868,
                delivering: -9,
                error: 4317766424,
                holding: 3440347565,
                toBeDelivered: 4293462214,
                waiting: 3597734791,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewDelivering must have a positive sign, this field does not accept negative values');
            });
    });
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewError must have a positive sign`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'aff8c211-226f-4427-a5c1-6b147793c77a',
                tenantId: '047047c6-fa70-418f-9044-4975c0d03158',
                tenantCode: 'ote1hrf59t3g3sszefdd9bnzljfno562itcyiy0rilvbsxtf5q',
                systemId: '481d0124-6eca-4d9b-869b-3d51af1353df',
                systemName: 'cufiimhjtw9sbc965e52',
                executionId: '6c5c6488-7972-4f33-8d91-b7e571a0e2e6',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 10:22:48',
                executionMonitoringStartAt: '2021-05-22 21:18:21',
                executionMonitoringEndAt: '2021-05-22 17:44:22',
                numberMax: 8680562985,
                numberDays: 7187563395,
                success: 2880914494,
                cancelled: 4185731392,
                delivering: 2569619343,
                error: -9,
                holding: 7610307110,
                toBeDelivered: 8776362625,
                waiting: 1349312029,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewError must have a positive sign, this field does not accept negative values');
            });
    });
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewHolding must have a positive sign`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'b1005de8-6a2a-4232-96ff-86a18943a435',
                tenantId: '20414b95-ddb3-4359-beb2-37dd9be2907f',
                tenantCode: 'ezjle9gc0oac1jvqikig98mchg9v1th02e8y3oddhhvthloy9r',
                systemId: '0f8aaa7d-7d55-4143-a8f9-479229abccf3',
                systemName: '02su77esydwzh1xj8i3i',
                executionId: 'b70e62c5-d093-437c-b812-a81dd6a8728c',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 03:15:43',
                executionMonitoringStartAt: '2021-05-23 02:58:03',
                executionMonitoringEndAt: '2021-05-23 06:55:49',
                numberMax: 2571358738,
                numberDays: 9523137824,
                success: 1427286436,
                cancelled: 1606637287,
                delivering: 1947938831,
                error: 6176190896,
                holding: -9,
                toBeDelivered: 9656026542,
                waiting: 3593973108,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewHolding must have a positive sign, this field does not accept negative values');
            });
    });
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewToBeDelivered must have a positive sign`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7dd5e040-6686-470c-a9b3-d6ac816e2f1e',
                tenantId: '23ba220b-489b-4422-bcfd-c5de32517e95',
                tenantCode: '3zuoa6l5vsjv5e4wkmjd79jyyuod65m0zeq1bdskhyrm8jvb2r',
                systemId: '4e4ba1b9-bd97-4a69-a0f2-a0a556873041',
                systemName: 's1mhkc20w3ewbdls49fl',
                executionId: '8ca198cb-1811-4b9a-a112-6970194e8e1e',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-22 17:40:53',
                executionMonitoringStartAt: '2021-05-23 04:51:56',
                executionMonitoringEndAt: '2021-05-22 23:50:28',
                numberMax: 9765294013,
                numberDays: 3608231358,
                success: 1254379313,
                cancelled: 7270236489,
                delivering: 7687455224,
                error: 9974790400,
                holding: 8098872280,
                toBeDelivered: -9,
                waiting: 7337574434,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewToBeDelivered must have a positive sign, this field does not accept negative values');
            });
    });
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewWaiting must have a positive sign`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '2394f963-ff33-445b-a3d1-16eb97874bca',
                tenantId: '8b06f7ab-63fc-4b44-99d2-ff07acbeeaf8',
                tenantCode: '6xjrg6emy0glylebsz1f7lnyxml0ddz7ggvdvpvhhg1cp9k2m0',
                systemId: 'cc6df7ba-67ff-475d-8728-98fa8996953e',
                systemName: 'b193zcedjgoz5c343sf5',
                executionId: '69f21f29-960e-4d61-9c8a-cea5eae9063a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-22 22:07:17',
                executionMonitoringStartAt: '2021-05-23 06:10:54',
                executionMonitoringEndAt: '2021-05-22 23:49:37',
                numberMax: 5252453993,
                numberDays: 7006700844,
                success: 1478224857,
                cancelled: 7169748102,
                delivering: 9272566984,
                error: 1333554472,
                holding: 9816485509,
                toBeDelivered: 8369515323,
                waiting: -9,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewWaiting must have a positive sign, this field does not accept negative values');
            });
    });
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewExecutionType has to be a enum option of SUMMARY, DETAIL`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'c327839c-57b9-41c1-8895-ddc808c75dd8',
                tenantId: 'bdc7b09d-cfc1-4c62-875b-882e51dd1dff',
                tenantCode: 'kgrgt05ns1r1n00jct59xa7r3l7c6vk2oe71gi5vps1vktzizs',
                systemId: '7d91d46c-ed17-44e4-bad5-dacdb95266d4',
                systemName: 'eegc4f784j1tgkftizf5',
                executionId: 'b2b4d6f3-2981-494f-be15-35088c733ff1',
                executionType: 'XXXX',
                executionExecutedAt: '2021-05-23 09:59:12',
                executionMonitoringStartAt: '2021-05-22 22:33:53',
                executionMonitoringEndAt: '2021-05-23 00:25:42',
                numberMax: 7693667798,
                numberDays: 6584659514,
                success: 3444683737,
                cancelled: 4213540137,
                delivering: 7029533669,
                error: 7939285860,
                holding: 8037639720,
                toBeDelivered: 3986381549,
                waiting: 3488869865,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewExecutionExecutedAt has to be a timestamp value`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '9ff0f5a9-9856-492b-a2ae-d22b7b8aeec7',
                tenantId: '8dafb5ff-9c32-4a20-a349-56131c8d7687',
                tenantCode: 'kq9chncqs315g0bjac2ywtighmfp7y3fj91lfli5yjuyacggk8',
                systemId: '4176088b-ca49-42f9-961e-490a083edb14',
                systemName: '9p9auakqjavzulzcfwyz',
                executionId: '596b589c-800e-4081-bed1-5eec513c0884',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2021-05-23 06:09:42',
                executionMonitoringEndAt: '2021-05-23 12:09:46',
                numberMax: 3426452167,
                numberDays: 8235028176,
                success: 2410489637,
                cancelled: 3257172922,
                delivering: 6178231935,
                error: 6787814881,
                holding: 7543028472,
                toBeDelivered: 8165274441,
                waiting: 5863004784,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionExecutedAt has to be a timestamp value');
            });
    });
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewExecutionMonitoringStartAt has to be a timestamp value`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'c01708fe-0577-4220-80c5-64d552cac56a',
                tenantId: 'b4c2308d-9c16-4409-ac37-8c39f663de1a',
                tenantCode: 'riysi1a7ya4aaomvth7dauty7kf7srkqibsmakwgerugfc4t4v',
                systemId: 'c2f6f769-dc4d-4f01-828b-0b0788a8575c',
                systemName: 'ypba4cnn8d2lmfrsgs97',
                executionId: '6b07aac3-9aab-4521-807c-3c735b10f609',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 07:47:34',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2021-05-23 06:27:13',
                numberMax: 8425496040,
                numberDays: 1322350561,
                success: 1187359672,
                cancelled: 2083650071,
                delivering: 5232900594,
                error: 3449719775,
                holding: 2561413719,
                toBeDelivered: 9919912006,
                waiting: 5099374152,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewExecutionMonitoringEndAt has to be a timestamp value`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1a580922-ba15-4b19-bfa1-17732ceb4415',
                tenantId: 'f78a31dd-2dc2-4e57-8fbe-27a62c668766',
                tenantCode: 'h57cb2vyyt3a80bzcqiifci9jsmsk4i5xpnu5to0i9re5ao503',
                systemId: 'f2cb355b-ff09-4b8c-8a3c-5a9623f3f9f3',
                systemName: '9wwbfwu38vc2fhnp1udp',
                executionId: '0e266185-3972-4917-9268-d03323664923',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-22 19:22:48',
                executionMonitoringStartAt: '2021-05-22 18:15:59',
                executionMonitoringEndAt: 'XXXXXXXX',
                numberMax: 7944489037,
                numberDays: 4363179897,
                success: 7392077646,
                cancelled: 3288452866,
                delivering: 6784930804,
                error: 7514415534,
                holding: 8097103411,
                toBeDelivered: 6425036937,
                waiting: 5562427687,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionMonitoringEndAt has to be a timestamp value');
            });
    });

    test(`/REST:POST cci/message-overview - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send(seeder.collectionResponse[0])
            .expect(409);
    });

    test(`/REST:GET cci/messages-overview/paginate`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/messages-overview/paginate')
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

    test(`/REST:GET cci/messages-overview`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/messages-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(seeder.collectionResponse);
    });

    test(`/REST:GET cci/message-overview - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/message-overview')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: '84432b5f-7eb9-4240-9509-c70c3ac05dd1'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:POST cci/message-overview`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
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
                executionExecutedAt: '2021-05-23 11:13:28',
                executionMonitoringStartAt: '2021-05-23 11:13:28',
                executionMonitoringEndAt: '2021-05-23 11:13:28',
                numberMax: 7678218210,
                numberDays: 7441873487,
                success: 4724340973,
                cancelled: 4987211725,
                delivering: 8561267173,
                error: 3058749499,
                holding: 9470320705,
                toBeDelivered: 5579132978,
                waiting: 9915861849,
            })
            .expect(201);
    });

    test(`/REST:GET cci/message-overview`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/message-overview')
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

    test(`/REST:GET cci/message-overview/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/message-overview/94406315-44ca-4552-89ba-6118da3634f3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET cci/message-overview/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/message-overview/28fe4bec-6e5a-475d-b118-1567f2fd5d25')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:PUT cci/message-overview - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .put('/cci/message-overview')
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
                executionExecutedAt: '2021-05-23 13:51:25',
                executionMonitoringStartAt: '2021-05-22 16:21:09',
                executionMonitoringEndAt: '2021-05-23 07:34:10',
                numberMax: 1547668834,
                numberDays: 8042231236,
                success: 7030527926,
                cancelled: 7905272709,
                delivering: 8747912324,
                error: 7721127256,
                holding: 7319988051,
                toBeDelivered: 9079093479,
                waiting: 2711519075,
            })
            .expect(404);
    });

    test(`/REST:PUT cci/message-overview`, () =>
    {
        return request(app.getHttpServer())
            .put('/cci/message-overview')
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
                executionExecutedAt: '2021-05-23 11:13:28',
                executionMonitoringStartAt: '2021-05-23 11:13:28',
                executionMonitoringEndAt: '2021-05-23 11:13:28',
                numberMax: 8124601583,
                numberDays: 1094794151,
                success: 6413179860,
                cancelled: 3315011225,
                delivering: 2892084880,
                error: 7878070885,
                holding: 3334834734,
                toBeDelivered: 8066574997,
                waiting: 7419622919,
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:DELETE cci/message-overview/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/message-overview/f4a9b7ac-d82d-4c05-8858-a8915877e0fa')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE cci/message-overview/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/message-overview/28fe4bec-6e5a-475d-b118-1567f2fd5d25')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200);
    });

    test(`/GraphQL cciCreateMessageOverview - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:CciCreateMessageOverviewInput!)
                    {
                        cciCreateMessageOverview (payload:$payload)
                        {
                            id
                            tenantCode
                            systemName
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            numberMax
                            numberDays
                            success
                            cancelled
                            delivering
                            error
                            holding
                            toBeDelivered
                            waiting
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

    test(`/GraphQL cciPaginateMessagesOverview`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        cciPaginateMessagesOverview (query:$query constraint:$constraint)
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
                expect(res.body.data.cciPaginateMessagesOverview.total).toBe(seeder.collectionResponse.length);
                expect(res.body.data.cciPaginateMessagesOverview.count).toBe(seeder.collectionResponse.length);
                expect(res.body.data.cciPaginateMessagesOverview.rows).toStrictEqual(seeder.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL cciGetMessagesOverview`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        cciGetMessagesOverview (query:$query)
                        {
                            id
                            tenantCode
                            systemName
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            numberMax
                            numberDays
                            success
                            cancelled
                            delivering
                            error
                            holding
                            toBeDelivered
                            waiting
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.cciGetMessagesOverview.entries())
                {
                    expect(seeder.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL cciCreateMessageOverview`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:CciCreateMessageOverviewInput!)
                    {
                        cciCreateMessageOverview (payload:$payload)
                        {
                            id
                            tenantCode
                            systemName
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            numberMax
                            numberDays
                            success
                            cancelled
                            delivering
                            error
                            holding
                            toBeDelivered
                            waiting
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
                        executionExecutedAt: '2021-05-23 11:13:28',
                        executionMonitoringStartAt: '2021-05-23 11:13:28',
                        executionMonitoringEndAt: '2021-05-23 11:13:28',
                        numberMax: 9273832626,
                        numberDays: 6416822667,
                        success: 7067857241,
                        cancelled: 1881718477,
                        delivering: 3176805233,
                        error: 6457818715,
                        holding: 6289476240,
                        toBeDelivered: 2531097336,
                        waiting: 1063389970,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateMessageOverview).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL cciFindMessageOverview - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindMessageOverview (query:$query)
                        {
                            id
                            tenantCode
                            systemName
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            numberMax
                            numberDays
                            success
                            cancelled
                            delivering
                            error
                            holding
                            toBeDelivered
                            waiting
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
                            id: 'dfd931bc-ac75-4b0d-82a4-2715db7b63f3'
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

    test(`/GraphQL cciFindMessageOverview`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindMessageOverview (query:$query)
                        {
                            id
                            tenantCode
                            systemName
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            numberMax
                            numberDays
                            success
                            cancelled
                            delivering
                            error
                            holding
                            toBeDelivered
                            waiting
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
                expect(res.body.data.cciFindMessageOverview.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL cciFindMessageOverviewById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        cciFindMessageOverviewById (id:$id)
                        {
                            id
                            tenantCode
                            systemName
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            numberMax
                            numberDays
                            success
                            cancelled
                            delivering
                            error
                            holding
                            toBeDelivered
                            waiting
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'c9e3ce03-9f20-4cb0-a323-37bb6e2a2b87'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciFindMessageOverviewById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        cciFindMessageOverviewById (id:$id)
                        {
                            id
                            tenantCode
                            systemName
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            numberMax
                            numberDays
                            success
                            cancelled
                            delivering
                            error
                            holding
                            toBeDelivered
                            waiting
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
                expect(res.body.data.cciFindMessageOverviewById.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL cciUpdateMessageOverview - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:CciUpdateMessageOverviewInput!)
                    {
                        cciUpdateMessageOverview (payload:$payload)
                        {
                            id
                            tenantCode
                            systemName
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            numberMax
                            numberDays
                            success
                            cancelled
                            delivering
                            error
                            holding
                            toBeDelivered
                            waiting
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
                        executionType: 'DETAIL',
                        executionExecutedAt: '2021-05-23 13:51:25',
                        executionMonitoringStartAt: '2021-05-22 16:21:09',
                        executionMonitoringEndAt: '2021-05-23 07:34:10',
                        numberMax: 2965700498,
                        numberDays: 5385158542,
                        success: 1300213169,
                        cancelled: 8353958757,
                        delivering: 5338082161,
                        error: 3799272308,
                        holding: 4761551774,
                        toBeDelivered: 4264207038,
                        waiting: 9533440221,
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

    test(`/GraphQL cciUpdateMessageOverview`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:CciUpdateMessageOverviewInput!)
                    {
                        cciUpdateMessageOverview (payload:$payload)
                        {
                            id
                            tenantCode
                            systemName
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            numberMax
                            numberDays
                            success
                            cancelled
                            delivering
                            error
                            holding
                            toBeDelivered
                            waiting
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
                        executionExecutedAt: '2021-05-23 11:13:28',
                        executionMonitoringStartAt: '2021-05-23 11:13:28',
                        executionMonitoringEndAt: '2021-05-23 11:13:28',
                        numberMax: 4027107317,
                        numberDays: 7000694296,
                        success: 1422916705,
                        cancelled: 4080721911,
                        delivering: 9825794416,
                        error: 8449303922,
                        holding: 8445980647,
                        toBeDelivered: 4846036057,
                        waiting: 8166543260,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateMessageOverview.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL cciDeleteMessageOverviewById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteMessageOverviewById (id:$id)
                        {
                            id
                            tenantCode
                            systemName
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            numberMax
                            numberDays
                            success
                            cancelled
                            delivering
                            error
                            holding
                            toBeDelivered
                            waiting
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'c60c12fa-0857-41af-ae15-36a17033b6e2'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciDeleteMessageOverviewById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteMessageOverviewById (id:$id)
                        {
                            id
                            tenantCode
                            systemName
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            numberMax
                            numberDays
                            success
                            cancelled
                            delivering
                            error
                            holding
                            toBeDelivered
                            waiting
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
                expect(res.body.data.cciDeleteMessageOverviewById.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});