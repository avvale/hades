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
                executionExecutedAt: '2021-05-23 02:02:33',
                executionMonitoringStartAt: '2021-05-23 03:09:06',
                executionMonitoringEndAt: '2021-05-23 14:22:01',
                numberMax: 9404646147,
                numberDays: 9598383421,
                success: 2006046205,
                cancelled: 3151457607,
                delivering: 2454515852,
                error: 1462220893,
                holding: 3544407224,
                toBeDelivered: 5837859416,
                waiting: 7203918814,
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
                executionExecutedAt: '2021-05-23 04:24:39',
                executionMonitoringStartAt: '2021-05-23 08:50:04',
                executionMonitoringEndAt: '2021-05-23 21:24:38',
                numberMax: 5892034974,
                numberDays: 1561955171,
                success: 8179131217,
                cancelled: 3550832855,
                delivering: 7626421212,
                error: 6578960864,
                holding: 4672866061,
                toBeDelivered: 2697195408,
                waiting: 8198659090,
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
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 22:59:28',
                executionMonitoringStartAt: '2021-05-23 19:51:09',
                executionMonitoringEndAt: '2021-05-23 08:01:04',
                numberMax: 4320912995,
                numberDays: 1787908272,
                success: 7493046457,
                cancelled: 3005186836,
                delivering: 3420332901,
                error: 3389350674,
                holding: 3384418657,
                toBeDelivered: 1568329043,
                waiting: 9803609366,
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
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 07:45:34',
                executionMonitoringStartAt: '2021-05-23 19:43:33',
                executionMonitoringEndAt: '2021-05-23 09:55:20',
                numberMax: 9099744208,
                numberDays: 9399167811,
                success: 6130545066,
                cancelled: 3912490798,
                delivering: 7340804838,
                error: 6825029774,
                holding: 3198542555,
                toBeDelivered: 4119981750,
                waiting: 7609544357,
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
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 18:20:52',
                executionMonitoringStartAt: '2021-05-23 18:26:34',
                executionMonitoringEndAt: '2021-05-23 17:56:44',
                numberMax: 9894985965,
                numberDays: 5197383944,
                success: 1566535762,
                cancelled: 7568009345,
                delivering: 8090811228,
                error: 3452623953,
                holding: 5138471458,
                toBeDelivered: 3291041491,
                waiting: 6909386694,
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
                executionExecutedAt: '2021-05-23 14:40:06',
                executionMonitoringStartAt: '2021-05-23 18:49:39',
                executionMonitoringEndAt: '2021-05-23 19:06:59',
                numberMax: 2933696220,
                numberDays: 8323629138,
                success: 9828597306,
                cancelled: 3068369462,
                delivering: 6903406213,
                error: 9400785335,
                holding: 8605500830,
                toBeDelivered: 5660420449,
                waiting: 6291641963,
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
                executionExecutedAt: '2021-05-23 07:02:48',
                executionMonitoringStartAt: '2021-05-23 01:31:16',
                executionMonitoringEndAt: '2021-05-23 02:55:53',
                numberMax: 8240622028,
                numberDays: 9312109641,
                success: 4703815526,
                cancelled: 3170698581,
                delivering: 7816438941,
                error: 6033400661,
                holding: 7364554745,
                toBeDelivered: 3731436634,
                waiting: 1672215138,
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
                executionMonitoringStartAt: '2021-05-23 18:03:19',
                executionMonitoringEndAt: '2021-05-23 17:18:59',
                numberMax: 8834776327,
                numberDays: 9041224676,
                success: 6193058844,
                cancelled: 7478082810,
                delivering: 5672949571,
                error: 9889062495,
                holding: 4910496689,
                toBeDelivered: 2922646738,
                waiting: 4645060084,
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
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 14:41:42',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2021-05-23 03:02:53',
                numberMax: 7394961075,
                numberDays: 2130184424,
                success: 9307516369,
                cancelled: 7425702132,
                delivering: 1712888571,
                error: 8796788391,
                holding: 6642590366,
                toBeDelivered: 5272970338,
                waiting: 7470802832,
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
                executionExecutedAt: '2021-05-23 20:23:51',
                executionMonitoringStartAt: '2021-05-23 02:25:34',
                executionMonitoringEndAt: null,
                numberMax: 2083220164,
                numberDays: 3322251215,
                success: 2795246950,
                cancelled: 6352035784,
                delivering: 8431386736,
                error: 6848655382,
                holding: 2162746543,
                toBeDelivered: 7034583160,
                waiting: 4007608037,
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
                executionExecutedAt: '2021-05-23 01:10:13',
                executionMonitoringStartAt: '2021-05-23 22:10:29',
                executionMonitoringEndAt: '2021-05-23 21:57:45',
                numberMax: 1348361573,
                numberDays: 9360549506,
                success: 6624449056,
                cancelled: 3746343817,
                delivering: 7664075870,
                error: 2861255408,
                holding: 4873535648,
                toBeDelivered: 4599862710,
                waiting: 8930624630,
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
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 03:31:01',
                executionMonitoringStartAt: '2021-05-23 02:22:00',
                executionMonitoringEndAt: '2021-05-23 04:06:41',
                numberMax: 2763766799,
                numberDays: 7969302620,
                success: 6761024843,
                cancelled: 6390088901,
                delivering: 4093397479,
                error: 4967022263,
                holding: 6743868547,
                toBeDelivered: 8675062817,
                waiting: 9784335915,
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
                executionExecutedAt: '2021-05-23 16:19:33',
                executionMonitoringStartAt: '2021-05-23 08:22:38',
                executionMonitoringEndAt: '2021-05-23 18:58:11',
                numberMax: 2021981341,
                numberDays: 2969474589,
                success: 5893543019,
                cancelled: 7735408835,
                delivering: 5719315323,
                error: 8472091357,
                holding: 3018862699,
                toBeDelivered: 2661266665,
                waiting: 9606613156,
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
                executionExecutedAt: '2021-05-23 14:42:42',
                executionMonitoringStartAt: '2021-05-23 10:01:36',
                executionMonitoringEndAt: '2021-05-23 22:16:01',
                numberMax: 3514022226,
                numberDays: 5532998286,
                success: 6067384132,
                cancelled: 2805449753,
                delivering: 3877137962,
                error: 4712714837,
                holding: 6935032854,
                toBeDelivered: 4466680736,
                waiting: 6415405013,
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
                executionExecutedAt: '2021-05-23 21:57:38',
                executionMonitoringStartAt: '2021-05-23 10:56:05',
                executionMonitoringEndAt: '2021-05-23 09:20:16',
                numberMax: 5607444530,
                numberDays: 4860508935,
                success: 7793365083,
                cancelled: 3221348190,
                delivering: 2454151936,
                error: 2923374671,
                holding: 6891661701,
                toBeDelivered: 4347687392,
                waiting: 4516342342,
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
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 21:09:03',
                executionMonitoringStartAt: '2021-05-23 10:02:26',
                executionMonitoringEndAt: '2021-05-23 22:57:14',
                numberMax: 1619950294,
                numberDays: 2482431249,
                success: 2355849268,
                cancelled: 6261727616,
                delivering: 5954396515,
                error: 6185133321,
                holding: 4535749593,
                toBeDelivered: 5519524836,
                waiting: 6973002999,
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
                executionExecutedAt: '2021-05-23 07:26:42',
                executionMonitoringStartAt: '2021-05-23 13:34:54',
                executionMonitoringEndAt: '2021-05-23 17:49:29',
                numberMax: 4156606430,
                numberDays: 7363783649,
                success: 4574023703,
                cancelled: 8364360724,
                delivering: 3501691406,
                error: 4851550204,
                holding: 6381862797,
                toBeDelivered: 6941016107,
                waiting: 6980317173,
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
                executionMonitoringStartAt: '2021-05-23 21:53:29',
                executionMonitoringEndAt: '2021-05-23 23:44:25',
                numberMax: 8336756512,
                numberDays: 8731214942,
                success: 8462041597,
                cancelled: 7748325967,
                delivering: 2653275300,
                error: 1588793696,
                holding: 8731867555,
                toBeDelivered: 8268919491,
                waiting: 7264306291,
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
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 21:48:31',
                executionMonitoringEndAt: '2021-05-23 11:52:16',
                numberMax: 2709695426,
                numberDays: 1137591508,
                success: 7797161759,
                cancelled: 2791204863,
                delivering: 1829111459,
                error: 9719204757,
                holding: 7619241588,
                toBeDelivered: 3251519221,
                waiting: 5517964886,
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
                executionExecutedAt: '2021-05-23 13:05:31',
                executionMonitoringStartAt: '2021-05-23 13:35:50',
                numberMax: 3586246532,
                numberDays: 7943313480,
                success: 7845169395,
                cancelled: 2800693733,
                delivering: 6005269705,
                error: 6333367884,
                holding: 3505497971,
                toBeDelivered: 3940003110,
                waiting: 8054037897,
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
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 19:41:47',
                executionMonitoringStartAt: '2021-05-23 03:21:17',
                executionMonitoringEndAt: '2021-05-23 00:37:21',
                numberMax: 2794065852,
                numberDays: 9644322647,
                success: 5062698766,
                cancelled: 6659597439,
                delivering: 3871559572,
                error: 3769177762,
                holding: 5161739551,
                toBeDelivered: 6281771318,
                waiting: 6424673830,
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
                executionExecutedAt: '2021-05-23 05:53:29',
                executionMonitoringStartAt: '2021-05-23 04:55:46',
                executionMonitoringEndAt: '2021-05-23 07:27:21',
                numberMax: 2391826119,
                numberDays: 8488535241,
                success: 8111018061,
                cancelled: 3416322020,
                delivering: 5073021280,
                error: 1687429940,
                holding: 2581200086,
                toBeDelivered: 3323674369,
                waiting: 5089720837,
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
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 23:31:24',
                executionMonitoringStartAt: '2021-05-23 22:23:10',
                executionMonitoringEndAt: '2021-05-23 03:19:36',
                numberMax: 1968704170,
                numberDays: 8409094715,
                success: 9884020381,
                cancelled: 3274320589,
                delivering: 9900508557,
                error: 3060617297,
                holding: 3616305588,
                toBeDelivered: 1685493647,
                waiting: 5522494990,
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
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 14:55:05',
                executionMonitoringStartAt: '2021-05-23 19:47:23',
                executionMonitoringEndAt: '2021-05-23 04:59:53',
                numberMax: 5527595152,
                numberDays: 1569617409,
                success: 9300681041,
                cancelled: 2084233520,
                delivering: 5425393346,
                error: 4238323476,
                holding: 9592741788,
                toBeDelivered: 4141254005,
                waiting: 5513051819,
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
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 09:30:28',
                executionMonitoringStartAt: '2021-05-23 06:20:38',
                executionMonitoringEndAt: '2021-05-23 08:19:33',
                numberMax: 1406720971,
                numberDays: 4820997557,
                success: 9385565500,
                cancelled: 3785731340,
                delivering: 6169258568,
                error: 3905140878,
                holding: 2919117294,
                toBeDelivered: 6063025663,
                waiting: 6142297012,
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
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 16:32:30',
                executionMonitoringStartAt: '2021-05-23 06:19:53',
                executionMonitoringEndAt: '2021-05-23 02:19:23',
                numberMax: 6640810571,
                numberDays: 9235657240,
                success: 5865609498,
                cancelled: 6961045156,
                delivering: 7730121195,
                error: 2651730295,
                holding: 5129104023,
                toBeDelivered: 9175558363,
                waiting: 8872756877,
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
                executionExecutedAt: '2021-05-23 09:08:25',
                executionMonitoringStartAt: '2021-05-23 05:29:16',
                executionMonitoringEndAt: '2021-05-23 16:11:00',
                numberMax: 47651693471,
                numberDays: 5849037371,
                success: 9691112609,
                cancelled: 6546193359,
                delivering: 7071038242,
                error: 2230829316,
                holding: 6254700773,
                toBeDelivered: 7542624525,
                waiting: 7903669031,
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
                executionExecutedAt: '2021-05-23 18:49:13',
                executionMonitoringStartAt: '2021-05-23 10:09:30',
                executionMonitoringEndAt: '2021-05-23 23:55:39',
                numberMax: 3671682603,
                numberDays: 35860319234,
                success: 5882258272,
                cancelled: 6156680212,
                delivering: 3726447585,
                error: 7562773653,
                holding: 4518799206,
                toBeDelivered: 7460350836,
                waiting: 6104774040,
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
                executionExecutedAt: '2021-05-23 07:46:22',
                executionMonitoringStartAt: '2021-05-23 11:29:50',
                executionMonitoringEndAt: '2021-05-23 20:58:45',
                numberMax: 7203304960,
                numberDays: 3337531458,
                success: 23746319403,
                cancelled: 5055353138,
                delivering: 5975210029,
                error: 7739676988,
                holding: 5864786562,
                toBeDelivered: 8658501660,
                waiting: 5592645448,
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
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 14:25:10',
                executionMonitoringStartAt: '2021-05-23 09:38:31',
                executionMonitoringEndAt: '2021-05-23 08:41:40',
                numberMax: 1227343587,
                numberDays: 5426388084,
                success: 5565831041,
                cancelled: 17901164574,
                delivering: 1470275573,
                error: 7274828070,
                holding: 6089790068,
                toBeDelivered: 7302975074,
                waiting: 2533541236,
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
                executionExecutedAt: '2021-05-23 06:41:35',
                executionMonitoringStartAt: '2021-05-23 18:45:27',
                executionMonitoringEndAt: '2021-05-23 21:41:49',
                numberMax: 5011118788,
                numberDays: 3895296465,
                success: 8313528829,
                cancelled: 1532976981,
                delivering: 41097376058,
                error: 5905739756,
                holding: 1583606585,
                toBeDelivered: 5278841014,
                waiting: 2194803185,
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
                executionExecutedAt: '2021-05-23 09:08:10',
                executionMonitoringStartAt: '2021-05-23 03:49:57',
                executionMonitoringEndAt: '2021-05-23 18:04:45',
                numberMax: 1510197560,
                numberDays: 2692798910,
                success: 3118911874,
                cancelled: 7527511524,
                delivering: 1588814169,
                error: 92568985680,
                holding: 4770602834,
                toBeDelivered: 9331811767,
                waiting: 4847185642,
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
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 18:08:37',
                executionMonitoringStartAt: '2021-05-24 00:11:49',
                executionMonitoringEndAt: '2021-05-23 01:53:34',
                numberMax: 6138081173,
                numberDays: 4881910611,
                success: 2084871884,
                cancelled: 9736646269,
                delivering: 6514875448,
                error: 6708756562,
                holding: 14052508915,
                toBeDelivered: 9436894114,
                waiting: 4565866534,
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
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 02:51:33',
                executionMonitoringStartAt: '2021-05-23 08:17:29',
                executionMonitoringEndAt: '2021-05-23 12:56:45',
                numberMax: 4683861714,
                numberDays: 1383859717,
                success: 3400402349,
                cancelled: 3566455634,
                delivering: 2631106166,
                error: 8346209699,
                holding: 1888567465,
                toBeDelivered: 12465527375,
                waiting: 9345951958,
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
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 21:31:41',
                executionMonitoringStartAt: '2021-05-23 23:09:00',
                executionMonitoringEndAt: '2021-05-23 16:49:24',
                numberMax: 4072623781,
                numberDays: 5764999679,
                success: 1735648142,
                cancelled: 5802273271,
                delivering: 8171170482,
                error: 3378337267,
                holding: 6879377682,
                toBeDelivered: 3680425516,
                waiting: 95885449767,
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
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 03:22:15',
                executionMonitoringStartAt: '2021-05-23 11:03:26',
                executionMonitoringEndAt: '2021-05-23 19:03:12',
                numberMax: -9,
                numberDays: 7484510123,
                success: 9434183189,
                cancelled: 2630472455,
                delivering: 3697849031,
                error: 1145811750,
                holding: 7009599680,
                toBeDelivered: 7413437589,
                waiting: 7573779565,
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
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 09:04:46',
                executionMonitoringStartAt: '2021-05-23 20:59:16',
                executionMonitoringEndAt: '2021-05-23 07:13:04',
                numberMax: 1190380511,
                numberDays: -9,
                success: 5771404692,
                cancelled: 5015560802,
                delivering: 5630640167,
                error: 2928472639,
                holding: 4862620069,
                toBeDelivered: 5504282796,
                waiting: 7677131154,
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
                executionExecutedAt: '2021-05-23 12:25:39',
                executionMonitoringStartAt: '2021-05-23 08:09:26',
                executionMonitoringEndAt: '2021-05-23 08:55:33',
                numberMax: 3811251231,
                numberDays: 5608368053,
                success: -9,
                cancelled: 8142982277,
                delivering: 8944037553,
                error: 8911319037,
                holding: 5141736760,
                toBeDelivered: 7965513696,
                waiting: 6553258612,
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
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 23:40:48',
                executionMonitoringStartAt: '2021-05-23 17:34:39',
                executionMonitoringEndAt: '2021-05-23 17:07:50',
                numberMax: 8773505522,
                numberDays: 1934659400,
                success: 8562761972,
                cancelled: -9,
                delivering: 8323770767,
                error: 3098567026,
                holding: 4760104601,
                toBeDelivered: 6597636969,
                waiting: 7731946900,
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
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 08:58:57',
                executionMonitoringStartAt: '2021-05-23 21:53:25',
                executionMonitoringEndAt: '2021-05-23 07:56:47',
                numberMax: 6159098386,
                numberDays: 4048808670,
                success: 3017482508,
                cancelled: 1632225088,
                delivering: -9,
                error: 5132244857,
                holding: 4756781401,
                toBeDelivered: 3551420579,
                waiting: 9772809234,
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
                executionExecutedAt: '2021-05-23 20:36:36',
                executionMonitoringStartAt: '2021-05-23 07:32:09',
                executionMonitoringEndAt: '2021-05-23 03:58:09',
                numberMax: 6744249462,
                numberDays: 1470226948,
                success: 4681506512,
                cancelled: 3749854510,
                delivering: 4280740183,
                error: -9,
                holding: 2066098745,
                toBeDelivered: 6854471453,
                waiting: 7230519455,
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
                executionExecutedAt: '2021-05-23 13:29:31',
                executionMonitoringStartAt: '2021-05-23 13:11:51',
                executionMonitoringEndAt: '2021-05-23 17:09:37',
                numberMax: 7048988255,
                numberDays: 4884987741,
                success: 7799571530,
                cancelled: 2122868918,
                delivering: 7689887810,
                error: 2204042032,
                holding: -9,
                toBeDelivered: 7440323057,
                waiting: 9532995658,
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
                executionExecutedAt: '2021-05-23 03:54:41',
                executionMonitoringStartAt: '2021-05-23 15:05:44',
                executionMonitoringEndAt: '2021-05-23 10:04:16',
                numberMax: 2108510424,
                numberDays: 1647921349,
                success: 4391653758,
                cancelled: 3482121807,
                delivering: 9610016272,
                error: 9595634754,
                holding: 4635076004,
                toBeDelivered: -9,
                waiting: 5332337160,
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
                executionExecutedAt: '2021-05-23 08:21:05',
                executionMonitoringStartAt: '2021-05-23 16:24:42',
                executionMonitoringEndAt: '2021-05-23 10:03:24',
                numberMax: 4028240069,
                numberDays: 7078770360,
                success: 2125535212,
                cancelled: 7168044477,
                delivering: 2145317933,
                error: 2953380642,
                holding: 6640479260,
                toBeDelivered: 4410655102,
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
                executionExecutedAt: '2021-05-23 20:12:59',
                executionMonitoringStartAt: '2021-05-23 08:47:41',
                executionMonitoringEndAt: '2021-05-23 10:39:29',
                numberMax: 9104215312,
                numberDays: 1651751666,
                success: 7483866177,
                cancelled: 3830197191,
                delivering: 2575616228,
                error: 9405891320,
                holding: 9879746106,
                toBeDelivered: 2359075530,
                waiting: 1578922404,
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
                executionMonitoringStartAt: '2021-05-23 16:23:30',
                executionMonitoringEndAt: '2021-05-23 22:23:33',
                numberMax: 6112169673,
                numberDays: 5183242545,
                success: 9926076284,
                cancelled: 9715832280,
                delivering: 2319533308,
                error: 8029798478,
                holding: 8349281884,
                toBeDelivered: 5393367615,
                waiting: 9674952054,
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
                executionExecutedAt: '2021-05-23 18:01:21',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2021-05-23 16:41:01',
                numberMax: 6879812179,
                numberDays: 1209564347,
                success: 7238503896,
                cancelled: 4037324783,
                delivering: 1264264342,
                error: 3612518556,
                holding: 8168809260,
                toBeDelivered: 3265223957,
                waiting: 9081209764,
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
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 05:36:35',
                executionMonitoringStartAt: '2021-05-23 04:29:47',
                executionMonitoringEndAt: 'XXXXXXXX',
                numberMax: 2108540671,
                numberDays: 1272738140,
                success: 3030476353,
                cancelled: 1293354500,
                delivering: 3728922886,
                error: 7422668523,
                holding: 9066807039,
                toBeDelivered: 8449754536,
                waiting: 7406048002,
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
                        id: 'a05aeae0-44ef-4a92-bcfd-b7de277bd863'
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
                executionExecutedAt: '2021-05-23 21:27:16',
                executionMonitoringStartAt: '2021-05-23 21:27:16',
                executionMonitoringEndAt: '2021-05-23 21:27:16',
                numberMax: 6054112775,
                numberDays: 6069131625,
                success: 9950155845,
                cancelled: 7796582124,
                delivering: 1986222655,
                error: 2680117431,
                holding: 3046822709,
                toBeDelivered: 6133689615,
                waiting: 8646272418,
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
            .get('/cci/message-overview/bd6c0565-c594-49b4-a5e1-e566a054b9a2')
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
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-24 00:05:12',
                executionMonitoringStartAt: '2021-05-23 02:34:56',
                executionMonitoringEndAt: '2021-05-23 17:47:57',
                numberMax: 6656649194,
                numberDays: 3485676320,
                success: 9869785299,
                cancelled: 3606198366,
                delivering: 4660855748,
                error: 4031069408,
                holding: 1412529335,
                toBeDelivered: 4386756917,
                waiting: 6874142671,
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
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 21:27:16',
                executionMonitoringStartAt: '2021-05-23 21:27:16',
                executionMonitoringEndAt: '2021-05-23 21:27:16',
                numberMax: 3814376178,
                numberDays: 8735797440,
                success: 4486789036,
                cancelled: 2390395565,
                delivering: 7922783077,
                error: 4325417480,
                holding: 9188725594,
                toBeDelivered: 8646338928,
                waiting: 2180918760,
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:DELETE cci/message-overview/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/message-overview/a764a608-a081-435d-8203-c30348d35863')
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
                        executionExecutedAt: '2021-05-23 21:27:16',
                        executionMonitoringStartAt: '2021-05-23 21:27:16',
                        executionMonitoringEndAt: '2021-05-23 21:27:16',
                        numberMax: 3023833408,
                        numberDays: 5979509525,
                        success: 2373305579,
                        cancelled: 2300645590,
                        delivering: 1703106828,
                        error: 6039630112,
                        holding: 4770366156,
                        toBeDelivered: 6227690215,
                        waiting: 5324569065,
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
                            id: '6693c745-d8e7-48b4-93de-88a74c71e4c6'
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
                    id: '70d5ee04-a688-475f-b365-e1b62a61dc76'
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
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2021-05-24 00:05:12',
                        executionMonitoringStartAt: '2021-05-23 02:34:56',
                        executionMonitoringEndAt: '2021-05-23 17:47:57',
                        numberMax: 8144847997,
                        numberDays: 9101286017,
                        success: 1312837264,
                        cancelled: 8759233406,
                        delivering: 3265965128,
                        error: 5826003284,
                        holding: 4289109853,
                        toBeDelivered: 2490252489,
                        waiting: 1710314811,
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
                        executionType: 'DETAIL',
                        executionExecutedAt: '2021-05-23 21:27:16',
                        executionMonitoringStartAt: '2021-05-23 21:27:16',
                        executionMonitoringEndAt: '2021-05-23 21:27:16',
                        numberMax: 8078343175,
                        numberDays: 3910120597,
                        success: 1966254536,
                        cancelled: 8612718117,
                        delivering: 1177884935,
                        error: 8137832497,
                        holding: 4476393589,
                        toBeDelivered: 7500877570,
                        waiting: 9280184357,
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
                    id: '9851b795-df00-4a77-9dfd-0e5df64986b2'
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