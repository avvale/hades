import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IMessageOverviewRepository } from '@hades/bplus-it-sappi/message-overview/domain/message-overview.repository';
import { MockMessageOverviewRepository } from '@hades/bplus-it-sappi/message-overview/infrastructure/mock/mock-message-overview.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('message-overview', () => 
{
    let app: INestApplication;
    let repository: MockMessageOverviewRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    BplusItSappiModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            dialect: 'mysql',
                            host: 'localhost',
                            port: 3306,
                            username: 'root',
                            password: 'root',
                            database: 'test',
                            synchronize: false,
                            autoLoadModels: true,
                            models: [],
                        })
                    })
                ]
            })
            .overrideProvider(IMessageOverviewRepository)
            .useClass(MockMessageOverviewRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockMessageOverviewRepository>module.get<IMessageOverviewRepository>(IMessageOverviewRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/message-overview - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: 'b6edecd4-33d0-43a4-8e61-afb0efaa456f',
                systemId: '3fef01a2-5194-4339-ba78-4ab6deeb348c',
                systemName: '48pjlz27gcjbsr3vo2vg',
                executionId: '30130d03-fc77-4e8e-ad7f-a3da85d0f950',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 15:27:48',
                executionMonitoringStartAt: '2020-07-21 19:56:39',
                executionMonitoringEndAt: '2020-07-21 05:50:49',
                numberMax: 7008594467,
                numberDays: 7760626923,
                success: 2770451441,
                cancelled: 1451885695,
                delivering: 9883849361,
                error: 1189566685,
                holding: 2496137074,
                toBeDelivered: 4362816804,
                waiting: 5739154288,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: 'b6edecd4-33d0-43a4-8e61-afb0efaa456f',
                systemId: '3fef01a2-5194-4339-ba78-4ab6deeb348c',
                systemName: '659rbslj28fmnvynuk61',
                executionId: '30130d03-fc77-4e8e-ad7f-a3da85d0f950',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 14:50:14',
                executionMonitoringStartAt: '2020-07-21 08:58:52',
                executionMonitoringEndAt: '2020-07-21 23:01:24',
                numberMax: 3815875649,
                numberDays: 2468287163,
                success: 4585315345,
                cancelled: 3167576193,
                delivering: 8506218312,
                error: 5079726396,
                holding: 5726579237,
                toBeDelivered: 9410632971,
                waiting: 6709916370,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '857b4225-b827-4044-8f58-f1881a248932',
                tenantId: null,
                systemId: '3fef01a2-5194-4339-ba78-4ab6deeb348c',
                systemName: 'ip5jfjkh0g1xo36957hh',
                executionId: '30130d03-fc77-4e8e-ad7f-a3da85d0f950',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 06:48:42',
                executionMonitoringStartAt: '2020-07-21 19:11:34',
                executionMonitoringEndAt: '2020-07-21 19:42:03',
                numberMax: 4261869556,
                numberDays: 9570341123,
                success: 6423357114,
                cancelled: 8029426829,
                delivering: 1431036696,
                error: 5768620333,
                holding: 3173978376,
                toBeDelivered: 3995998431,
                waiting: 7764937391,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '857b4225-b827-4044-8f58-f1881a248932',
                
                systemId: '3fef01a2-5194-4339-ba78-4ab6deeb348c',
                systemName: 'jvkvan5b7pj6gutt35d8',
                executionId: '30130d03-fc77-4e8e-ad7f-a3da85d0f950',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 20:29:42',
                executionMonitoringStartAt: '2020-07-21 11:07:02',
                executionMonitoringEndAt: '2020-07-21 04:54:28',
                numberMax: 9165917325,
                numberDays: 8108148316,
                success: 6396362850,
                cancelled: 5789233173,
                delivering: 2175071679,
                error: 7565729104,
                holding: 8080719937,
                toBeDelivered: 9536094254,
                waiting: 6142547484,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '857b4225-b827-4044-8f58-f1881a248932',
                tenantId: 'b6edecd4-33d0-43a4-8e61-afb0efaa456f',
                systemId: null,
                systemName: 'e0xgbkasz65mr2kllujs',
                executionId: '30130d03-fc77-4e8e-ad7f-a3da85d0f950',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-22 00:06:39',
                executionMonitoringStartAt: '2020-07-21 02:07:41',
                executionMonitoringEndAt: '2020-07-21 01:05:16',
                numberMax: 6770080227,
                numberDays: 9364322419,
                success: 7251835432,
                cancelled: 5929454721,
                delivering: 1136279008,
                error: 2100574264,
                holding: 9145291546,
                toBeDelivered: 3363230776,
                waiting: 7399594146,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '857b4225-b827-4044-8f58-f1881a248932',
                tenantId: 'b6edecd4-33d0-43a4-8e61-afb0efaa456f',
                
                systemName: 'pcmi72u11a7wbi2w4kye',
                executionId: '30130d03-fc77-4e8e-ad7f-a3da85d0f950',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 23:00:57',
                executionMonitoringStartAt: '2020-07-21 01:59:28',
                executionMonitoringEndAt: '2020-07-21 09:46:03',
                numberMax: 9484974306,
                numberDays: 3586509370,
                success: 7013080322,
                cancelled: 1344685229,
                delivering: 4121970032,
                error: 7770566715,
                holding: 8664358893,
                toBeDelivered: 3748119828,
                waiting: 9163281126,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '857b4225-b827-4044-8f58-f1881a248932',
                tenantId: 'b6edecd4-33d0-43a4-8e61-afb0efaa456f',
                systemId: '3fef01a2-5194-4339-ba78-4ab6deeb348c',
                systemName: null,
                executionId: '30130d03-fc77-4e8e-ad7f-a3da85d0f950',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 08:30:56',
                executionMonitoringStartAt: '2020-07-21 09:39:35',
                executionMonitoringEndAt: '2020-07-21 08:29:00',
                numberMax: 1303987485,
                numberDays: 4589525486,
                success: 4124596704,
                cancelled: 7289719572,
                delivering: 5489639790,
                error: 6974645678,
                holding: 9604742314,
                toBeDelivered: 1453743204,
                waiting: 3891992806,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '857b4225-b827-4044-8f58-f1881a248932',
                tenantId: 'b6edecd4-33d0-43a4-8e61-afb0efaa456f',
                systemId: '3fef01a2-5194-4339-ba78-4ab6deeb348c',
                
                executionId: '30130d03-fc77-4e8e-ad7f-a3da85d0f950',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 10:25:59',
                executionMonitoringStartAt: '2020-07-21 17:15:39',
                executionMonitoringEndAt: '2020-07-21 03:34:41',
                numberMax: 2601694055,
                numberDays: 6086952453,
                success: 6326522887,
                cancelled: 4731823305,
                delivering: 3176749677,
                error: 9320620845,
                holding: 7729734763,
                toBeDelivered: 6210966471,
                waiting: 9536577421,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '857b4225-b827-4044-8f58-f1881a248932',
                tenantId: 'b6edecd4-33d0-43a4-8e61-afb0efaa456f',
                systemId: '3fef01a2-5194-4339-ba78-4ab6deeb348c',
                systemName: '6rfkpeqxeup5rhx3rdlo',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 12:59:47',
                executionMonitoringStartAt: '2020-07-21 23:44:02',
                executionMonitoringEndAt: '2020-07-21 03:22:24',
                numberMax: 8207186877,
                numberDays: 6432999824,
                success: 4824157605,
                cancelled: 2668224410,
                delivering: 5492451444,
                error: 5581706334,
                holding: 2694473532,
                toBeDelivered: 4327314534,
                waiting: 2453663173,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '857b4225-b827-4044-8f58-f1881a248932',
                tenantId: 'b6edecd4-33d0-43a4-8e61-afb0efaa456f',
                systemId: '3fef01a2-5194-4339-ba78-4ab6deeb348c',
                systemName: 'q6s1ppdhxrrngm6616ld',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 04:09:29',
                executionMonitoringStartAt: '2020-07-21 03:47:30',
                executionMonitoringEndAt: '2020-07-21 19:43:35',
                numberMax: 4285615196,
                numberDays: 5819678556,
                success: 1372265796,
                cancelled: 9148110452,
                delivering: 8821328139,
                error: 7332957861,
                holding: 5643686935,
                toBeDelivered: 1543486621,
                waiting: 8509289781,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '857b4225-b827-4044-8f58-f1881a248932',
                tenantId: 'b6edecd4-33d0-43a4-8e61-afb0efaa456f',
                systemId: '3fef01a2-5194-4339-ba78-4ab6deeb348c',
                systemName: 'yy7hftbnyayuu5o7igfe',
                executionId: '30130d03-fc77-4e8e-ad7f-a3da85d0f950',
                executionType: null,
                executionExecutedAt: '2020-07-21 10:30:26',
                executionMonitoringStartAt: '2020-07-21 12:15:48',
                executionMonitoringEndAt: '2020-07-21 13:19:08',
                numberMax: 7375359169,
                numberDays: 6951447139,
                success: 2431666833,
                cancelled: 1835678253,
                delivering: 6392218213,
                error: 6732822848,
                holding: 9337092944,
                toBeDelivered: 4413219530,
                waiting: 3000608963,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionType must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '857b4225-b827-4044-8f58-f1881a248932',
                tenantId: 'b6edecd4-33d0-43a4-8e61-afb0efaa456f',
                systemId: '3fef01a2-5194-4339-ba78-4ab6deeb348c',
                systemName: 'dpqgvgblsgiuxivs58a2',
                executionId: '30130d03-fc77-4e8e-ad7f-a3da85d0f950',
                
                executionExecutedAt: '2020-07-21 08:27:00',
                executionMonitoringStartAt: '2020-07-21 23:31:32',
                executionMonitoringEndAt: '2020-07-21 10:47:22',
                numberMax: 3449732422,
                numberDays: 9226975424,
                success: 7527151256,
                cancelled: 9192050762,
                delivering: 6584169061,
                error: 1215962291,
                holding: 8113185394,
                toBeDelivered: 4961730794,
                waiting: 9271449073,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionType must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '857b4225-b827-4044-8f58-f1881a248932',
                tenantId: 'b6edecd4-33d0-43a4-8e61-afb0efaa456f',
                systemId: '3fef01a2-5194-4339-ba78-4ab6deeb348c',
                systemName: '092zuv08nm3cl5pgrdk4',
                executionId: '30130d03-fc77-4e8e-ad7f-a3da85d0f950',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-21 12:01:57',
                executionMonitoringEndAt: '2020-07-21 16:14:52',
                numberMax: 6331502513,
                numberDays: 9217516653,
                success: 4570189830,
                cancelled: 5663154518,
                delivering: 2644400991,
                error: 8705761669,
                holding: 2390213417,
                toBeDelivered: 5184912909,
                waiting: 5426316689,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionExecutedAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '857b4225-b827-4044-8f58-f1881a248932',
                tenantId: 'b6edecd4-33d0-43a4-8e61-afb0efaa456f',
                systemId: '3fef01a2-5194-4339-ba78-4ab6deeb348c',
                systemName: 'cwhx5xscbzw9paj6lmcq',
                executionId: '30130d03-fc77-4e8e-ad7f-a3da85d0f950',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-07-21 15:41:07',
                executionMonitoringEndAt: '2020-07-21 10:08:33',
                numberMax: 3864681716,
                numberDays: 7175308809,
                success: 6126600969,
                cancelled: 6499030196,
                delivering: 5643348555,
                error: 7206375949,
                holding: 8793756866,
                toBeDelivered: 5235556810,
                waiting: 5640144508,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '857b4225-b827-4044-8f58-f1881a248932',
                tenantId: 'b6edecd4-33d0-43a4-8e61-afb0efaa456f',
                systemId: '3fef01a2-5194-4339-ba78-4ab6deeb348c',
                systemName: 'yrnwekqelcsfg2j5zvqf',
                executionId: '30130d03-fc77-4e8e-ad7f-a3da85d0f950',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 17:44:40',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-21 05:53:43',
                numberMax: 8128675498,
                numberDays: 9700050589,
                success: 1084880381,
                cancelled: 9563906100,
                delivering: 2928515553,
                error: 9114866882,
                holding: 1075846241,
                toBeDelivered: 8652222413,
                waiting: 6528154312,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '857b4225-b827-4044-8f58-f1881a248932',
                tenantId: 'b6edecd4-33d0-43a4-8e61-afb0efaa456f',
                systemId: '3fef01a2-5194-4339-ba78-4ab6deeb348c',
                systemName: 'm5s477p7h9cv0t03e0rd',
                executionId: '30130d03-fc77-4e8e-ad7f-a3da85d0f950',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 18:03:39',
                
                executionMonitoringEndAt: '2020-07-21 06:05:44',
                numberMax: 9005493787,
                numberDays: 6228802270,
                success: 7682047613,
                cancelled: 1475674912,
                delivering: 4220041174,
                error: 7523621490,
                holding: 4707650292,
                toBeDelivered: 3567623545,
                waiting: 2233184232,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '857b4225-b827-4044-8f58-f1881a248932',
                tenantId: 'b6edecd4-33d0-43a4-8e61-afb0efaa456f',
                systemId: '3fef01a2-5194-4339-ba78-4ab6deeb348c',
                systemName: 'ba46fudfn9y6klf8am5s',
                executionId: '30130d03-fc77-4e8e-ad7f-a3da85d0f950',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 01:18:24',
                executionMonitoringStartAt: '2020-07-21 12:41:20',
                executionMonitoringEndAt: null,
                numberMax: 7080541495,
                numberDays: 5768873361,
                success: 8523242229,
                cancelled: 7408519270,
                delivering: 6670441729,
                error: 6702247306,
                holding: 3498271990,
                toBeDelivered: 6112289797,
                waiting: 4663758837,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '857b4225-b827-4044-8f58-f1881a248932',
                tenantId: 'b6edecd4-33d0-43a4-8e61-afb0efaa456f',
                systemId: '3fef01a2-5194-4339-ba78-4ab6deeb348c',
                systemName: 'wsqbvvb3s13mr4pj6dl6',
                executionId: '30130d03-fc77-4e8e-ad7f-a3da85d0f950',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-22 00:37:58',
                executionMonitoringStartAt: '2020-07-21 07:16:47',
                
                numberMax: 3806501102,
                numberDays: 1730781230,
                success: 4629283322,
                cancelled: 6644663624,
                delivering: 8254913013,
                error: 2614929361,
                holding: 4807010061,
                toBeDelivered: 1758731837,
                waiting: 2224186325,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'j2i0rjrzfs22df2kye9eij41oaaylbvs8kxl0',
                tenantId: 'b6edecd4-33d0-43a4-8e61-afb0efaa456f',
                systemId: '3fef01a2-5194-4339-ba78-4ab6deeb348c',
                systemName: 'oq4v3s31y7xez3xin9uz',
                executionId: '30130d03-fc77-4e8e-ad7f-a3da85d0f950',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 18:32:48',
                executionMonitoringStartAt: '2020-07-21 10:19:15',
                executionMonitoringEndAt: '2020-07-22 00:27:47',
                numberMax: 8441637585,
                numberDays: 9286318103,
                success: 1472715959,
                cancelled: 7613514565,
                delivering: 1717071032,
                error: 4799447525,
                holding: 4099159614,
                toBeDelivered: 5214656160,
                waiting: 3310845838,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '857b4225-b827-4044-8f58-f1881a248932',
                tenantId: 'zcdjxjjeaxku2lfgquqotlriq2vhgsge2eq4t',
                systemId: '3fef01a2-5194-4339-ba78-4ab6deeb348c',
                systemName: 'z0zeimpnjyjf2ue85pdi',
                executionId: '30130d03-fc77-4e8e-ad7f-a3da85d0f950',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 21:35:15',
                executionMonitoringStartAt: '2020-07-21 22:08:20',
                executionMonitoringEndAt: '2020-07-21 10:51:00',
                numberMax: 3342610346,
                numberDays: 8169026482,
                success: 3363359584,
                cancelled: 1613614964,
                delivering: 6496274142,
                error: 4603111061,
                holding: 7218735173,
                toBeDelivered: 8950367075,
                waiting: 4318227344,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '857b4225-b827-4044-8f58-f1881a248932',
                tenantId: 'b6edecd4-33d0-43a4-8e61-afb0efaa456f',
                systemId: 'geyzr8qikw4a395dxfo30igv0j7ep41yrg9ew',
                systemName: 'bn9zie25gr1yqp29j7eg',
                executionId: '30130d03-fc77-4e8e-ad7f-a3da85d0f950',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 09:49:33',
                executionMonitoringStartAt: '2020-07-21 15:08:45',
                executionMonitoringEndAt: '2020-07-21 21:35:46',
                numberMax: 7460705014,
                numberDays: 5656540639,
                success: 5039735352,
                cancelled: 5588659296,
                delivering: 5342196574,
                error: 8394351544,
                holding: 9803882592,
                toBeDelivered: 9847004465,
                waiting: 3414627842,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '857b4225-b827-4044-8f58-f1881a248932',
                tenantId: 'b6edecd4-33d0-43a4-8e61-afb0efaa456f',
                systemId: '3fef01a2-5194-4339-ba78-4ab6deeb348c',
                systemName: 'di1x4dxcz3mqwjbcvc7n',
                executionId: 'iu13ns6hcepjzpoer40h7p2qs3wjfvln6s39c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 09:53:25',
                executionMonitoringStartAt: '2020-07-21 21:46:49',
                executionMonitoringEndAt: '2020-07-21 09:26:49',
                numberMax: 3920038087,
                numberDays: 5331181687,
                success: 2249947000,
                cancelled: 9216679838,
                delivering: 6233825962,
                error: 2001325895,
                holding: 6219347120,
                toBeDelivered: 2515449849,
                waiting: 8342079869,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '857b4225-b827-4044-8f58-f1881a248932',
                tenantId: 'b6edecd4-33d0-43a4-8e61-afb0efaa456f',
                systemId: '3fef01a2-5194-4339-ba78-4ab6deeb348c',
                systemName: 'vulokmf2y2mzr9953e2qf',
                executionId: '30130d03-fc77-4e8e-ad7f-a3da85d0f950',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 11:09:47',
                executionMonitoringStartAt: '2020-07-21 23:59:02',
                executionMonitoringEndAt: '2020-07-21 17:15:11',
                numberMax: 7784076198,
                numberDays: 7616002008,
                success: 6009854616,
                cancelled: 6386749748,
                delivering: 2356276360,
                error: 5673708687,
                holding: 5944211559,
                toBeDelivered: 7510517029,
                waiting: 4191480170,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewNumberMax is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '857b4225-b827-4044-8f58-f1881a248932',
                tenantId: 'b6edecd4-33d0-43a4-8e61-afb0efaa456f',
                systemId: '3fef01a2-5194-4339-ba78-4ab6deeb348c',
                systemName: 'it9qsnpo9krqmyootk97',
                executionId: '30130d03-fc77-4e8e-ad7f-a3da85d0f950',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 21:29:49',
                executionMonitoringStartAt: '2020-07-21 22:55:00',
                executionMonitoringEndAt: '2020-07-21 07:11:21',
                numberMax: 12958099700,
                numberDays: 2823911134,
                success: 8936052283,
                cancelled: 8445126659,
                delivering: 2230115840,
                error: 9380831492,
                holding: 2688638315,
                toBeDelivered: 5192227954,
                waiting: 6397633293,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewNumberMax is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewNumberDays is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '857b4225-b827-4044-8f58-f1881a248932',
                tenantId: 'b6edecd4-33d0-43a4-8e61-afb0efaa456f',
                systemId: '3fef01a2-5194-4339-ba78-4ab6deeb348c',
                systemName: 'c1x2s2pdzxzsppwtbvf4',
                executionId: '30130d03-fc77-4e8e-ad7f-a3da85d0f950',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 19:57:53',
                executionMonitoringStartAt: '2020-07-21 23:48:03',
                executionMonitoringEndAt: '2020-07-21 16:32:29',
                numberMax: 5196248935,
                numberDays: 87995350882,
                success: 2583836408,
                cancelled: 6711386788,
                delivering: 2174305095,
                error: 1161116571,
                holding: 4757595989,
                toBeDelivered: 1139601928,
                waiting: 7888435960,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewNumberDays is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewSuccess is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '857b4225-b827-4044-8f58-f1881a248932',
                tenantId: 'b6edecd4-33d0-43a4-8e61-afb0efaa456f',
                systemId: '3fef01a2-5194-4339-ba78-4ab6deeb348c',
                systemName: '7sbi4u9h0cc27729gra1',
                executionId: '30130d03-fc77-4e8e-ad7f-a3da85d0f950',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 06:47:18',
                executionMonitoringStartAt: '2020-07-21 01:51:27',
                executionMonitoringEndAt: '2020-07-21 03:48:38',
                numberMax: 3596933902,
                numberDays: 7135586517,
                success: 77990792208,
                cancelled: 2729399720,
                delivering: 4742288401,
                error: 4863907923,
                holding: 6525345854,
                toBeDelivered: 2789312103,
                waiting: 2602289984,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSuccess is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewCancelled is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '857b4225-b827-4044-8f58-f1881a248932',
                tenantId: 'b6edecd4-33d0-43a4-8e61-afb0efaa456f',
                systemId: '3fef01a2-5194-4339-ba78-4ab6deeb348c',
                systemName: '1eermjb3rymnf5xpnrxs',
                executionId: '30130d03-fc77-4e8e-ad7f-a3da85d0f950',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 09:17:34',
                executionMonitoringStartAt: '2020-07-21 22:34:24',
                executionMonitoringEndAt: '2020-07-21 12:21:05',
                numberMax: 1762093770,
                numberDays: 3751834889,
                success: 8202229656,
                cancelled: 13043948243,
                delivering: 2439580120,
                error: 4794106204,
                holding: 6192605177,
                toBeDelivered: 4680068623,
                waiting: 4545097782,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewCancelled is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewDelivering is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '857b4225-b827-4044-8f58-f1881a248932',
                tenantId: 'b6edecd4-33d0-43a4-8e61-afb0efaa456f',
                systemId: '3fef01a2-5194-4339-ba78-4ab6deeb348c',
                systemName: 'pa2smhjy53e48po4tq0j',
                executionId: '30130d03-fc77-4e8e-ad7f-a3da85d0f950',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 11:34:07',
                executionMonitoringStartAt: '2020-07-21 10:36:57',
                executionMonitoringEndAt: '2020-07-21 12:30:00',
                numberMax: 6139988991,
                numberDays: 4727442384,
                success: 5204562789,
                cancelled: 4372001568,
                delivering: 24765614336,
                error: 8657469294,
                holding: 5210129949,
                toBeDelivered: 7351328365,
                waiting: 1931708057,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewDelivering is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewError is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '857b4225-b827-4044-8f58-f1881a248932',
                tenantId: 'b6edecd4-33d0-43a4-8e61-afb0efaa456f',
                systemId: '3fef01a2-5194-4339-ba78-4ab6deeb348c',
                systemName: '600eaeh58akdn9aetawo',
                executionId: '30130d03-fc77-4e8e-ad7f-a3da85d0f950',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 21:53:03',
                executionMonitoringStartAt: '2020-07-21 14:14:41',
                executionMonitoringEndAt: '2020-07-21 14:15:07',
                numberMax: 3381955748,
                numberDays: 8729949310,
                success: 5049582990,
                cancelled: 3633756392,
                delivering: 3677130478,
                error: 95082576997,
                holding: 3009761352,
                toBeDelivered: 8899579343,
                waiting: 2078073978,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewError is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewHolding is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '857b4225-b827-4044-8f58-f1881a248932',
                tenantId: 'b6edecd4-33d0-43a4-8e61-afb0efaa456f',
                systemId: '3fef01a2-5194-4339-ba78-4ab6deeb348c',
                systemName: '9j0xtg6lqb9jnwq5bipd',
                executionId: '30130d03-fc77-4e8e-ad7f-a3da85d0f950',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 12:26:39',
                executionMonitoringStartAt: '2020-07-21 20:34:33',
                executionMonitoringEndAt: '2020-07-21 08:41:43',
                numberMax: 6648961298,
                numberDays: 3006847699,
                success: 2225541780,
                cancelled: 9220103682,
                delivering: 1926983041,
                error: 8729421665,
                holding: 81992432434,
                toBeDelivered: 7805978601,
                waiting: 2715932746,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewHolding is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewToBeDelivered is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '857b4225-b827-4044-8f58-f1881a248932',
                tenantId: 'b6edecd4-33d0-43a4-8e61-afb0efaa456f',
                systemId: '3fef01a2-5194-4339-ba78-4ab6deeb348c',
                systemName: 'e0g7rsqbt56tldxr4js9',
                executionId: '30130d03-fc77-4e8e-ad7f-a3da85d0f950',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 09:56:25',
                executionMonitoringStartAt: '2020-07-21 12:56:07',
                executionMonitoringEndAt: '2020-07-21 16:13:26',
                numberMax: 8031380884,
                numberDays: 6756798364,
                success: 6974743703,
                cancelled: 4877401771,
                delivering: 1201538779,
                error: 2306423875,
                holding: 3285909823,
                toBeDelivered: 33666397795,
                waiting: 5256287495,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewToBeDelivered is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewWaiting is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '857b4225-b827-4044-8f58-f1881a248932',
                tenantId: 'b6edecd4-33d0-43a4-8e61-afb0efaa456f',
                systemId: '3fef01a2-5194-4339-ba78-4ab6deeb348c',
                systemName: '976wvvb4lg3g33ezvm2f',
                executionId: '30130d03-fc77-4e8e-ad7f-a3da85d0f950',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 05:26:15',
                executionMonitoringStartAt: '2020-07-21 02:59:44',
                executionMonitoringEndAt: '2020-07-21 22:03:53',
                numberMax: 9050974250,
                numberDays: 6895682894,
                success: 7471214391,
                cancelled: 2754900887,
                delivering: 4659196012,
                error: 3825214784,
                holding: 4321422766,
                toBeDelivered: 3772520337,
                waiting: 72884214773,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewWaiting is too large, has a maximum length of 10');
            });
    });
    

    

    
    
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewNumberMax must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '857b4225-b827-4044-8f58-f1881a248932',
                tenantId: 'b6edecd4-33d0-43a4-8e61-afb0efaa456f',
                systemId: '3fef01a2-5194-4339-ba78-4ab6deeb348c',
                systemName: 'cc93gt7tgjdqtekzu4ys',
                executionId: '30130d03-fc77-4e8e-ad7f-a3da85d0f950',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 18:57:49',
                executionMonitoringStartAt: '2020-07-21 19:12:15',
                executionMonitoringEndAt: '2020-07-21 20:26:55',
                numberMax: -9,
                numberDays: 7125108596,
                success: 9590834577,
                cancelled: 3794800727,
                delivering: 8344116185,
                error: 9029123468,
                holding: 7387675946,
                toBeDelivered: 6015096647,
                waiting: 8388294839,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewNumberMax must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewNumberDays must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '857b4225-b827-4044-8f58-f1881a248932',
                tenantId: 'b6edecd4-33d0-43a4-8e61-afb0efaa456f',
                systemId: '3fef01a2-5194-4339-ba78-4ab6deeb348c',
                systemName: '83yrd3fi5fjujd9pct7v',
                executionId: '30130d03-fc77-4e8e-ad7f-a3da85d0f950',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 21:32:42',
                executionMonitoringStartAt: '2020-07-21 22:17:26',
                executionMonitoringEndAt: '2020-07-21 16:26:31',
                numberMax: 4313027420,
                numberDays: -9,
                success: 3500954724,
                cancelled: 3507909812,
                delivering: 8856108527,
                error: 5563096393,
                holding: 8783913807,
                toBeDelivered: 4879573081,
                waiting: 7189380778,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewNumberDays must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewSuccess must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '857b4225-b827-4044-8f58-f1881a248932',
                tenantId: 'b6edecd4-33d0-43a4-8e61-afb0efaa456f',
                systemId: '3fef01a2-5194-4339-ba78-4ab6deeb348c',
                systemName: '2sr8ts1ucspsgj8aekjb',
                executionId: '30130d03-fc77-4e8e-ad7f-a3da85d0f950',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 08:35:43',
                executionMonitoringStartAt: '2020-07-21 17:00:35',
                executionMonitoringEndAt: '2020-07-21 12:33:16',
                numberMax: 1531033162,
                numberDays: 3120231373,
                success: -9,
                cancelled: 4938275976,
                delivering: 7047312603,
                error: 7509238905,
                holding: 9891934778,
                toBeDelivered: 4861496076,
                waiting: 9651752086,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewSuccess must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewCancelled must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '857b4225-b827-4044-8f58-f1881a248932',
                tenantId: 'b6edecd4-33d0-43a4-8e61-afb0efaa456f',
                systemId: '3fef01a2-5194-4339-ba78-4ab6deeb348c',
                systemName: 'ba1zxch3xttghyo9cxbw',
                executionId: '30130d03-fc77-4e8e-ad7f-a3da85d0f950',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 22:42:03',
                executionMonitoringStartAt: '2020-07-21 19:35:43',
                executionMonitoringEndAt: '2020-07-21 16:10:31',
                numberMax: 3179388172,
                numberDays: 7990830619,
                success: 5249501543,
                cancelled: -9,
                delivering: 5333898059,
                error: 4464575459,
                holding: 3385389705,
                toBeDelivered: 5719243393,
                waiting: 6233835560,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewCancelled must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewDelivering must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '857b4225-b827-4044-8f58-f1881a248932',
                tenantId: 'b6edecd4-33d0-43a4-8e61-afb0efaa456f',
                systemId: '3fef01a2-5194-4339-ba78-4ab6deeb348c',
                systemName: '90v57prlitti8qtw2nlr',
                executionId: '30130d03-fc77-4e8e-ad7f-a3da85d0f950',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 03:33:03',
                executionMonitoringStartAt: '2020-07-21 03:13:45',
                executionMonitoringEndAt: '2020-07-21 18:54:49',
                numberMax: 3905221929,
                numberDays: 7189281948,
                success: 4348419030,
                cancelled: 1002781916,
                delivering: -9,
                error: 4156913905,
                holding: 3397521621,
                toBeDelivered: 6461062876,
                waiting: 3867343190,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewDelivering must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewError must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '857b4225-b827-4044-8f58-f1881a248932',
                tenantId: 'b6edecd4-33d0-43a4-8e61-afb0efaa456f',
                systemId: '3fef01a2-5194-4339-ba78-4ab6deeb348c',
                systemName: 'qpcupb7wqzh5zd3c5k2n',
                executionId: '30130d03-fc77-4e8e-ad7f-a3da85d0f950',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 18:37:40',
                executionMonitoringStartAt: '2020-07-21 11:25:15',
                executionMonitoringEndAt: '2020-07-21 20:38:19',
                numberMax: 4157240566,
                numberDays: 5329527321,
                success: 4055523643,
                cancelled: 7130084112,
                delivering: 3322625346,
                error: -9,
                holding: 3013807712,
                toBeDelivered: 4955777694,
                waiting: 8072884861,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewError must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewHolding must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '857b4225-b827-4044-8f58-f1881a248932',
                tenantId: 'b6edecd4-33d0-43a4-8e61-afb0efaa456f',
                systemId: '3fef01a2-5194-4339-ba78-4ab6deeb348c',
                systemName: '017mdbsfk9vilzoj6glu',
                executionId: '30130d03-fc77-4e8e-ad7f-a3da85d0f950',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 22:10:28',
                executionMonitoringStartAt: '2020-07-22 00:13:39',
                executionMonitoringEndAt: '2020-07-21 03:01:47',
                numberMax: 3927019604,
                numberDays: 5477859279,
                success: 8663156943,
                cancelled: 7338256319,
                delivering: 3863214389,
                error: 1343603769,
                holding: -9,
                toBeDelivered: 1332367882,
                waiting: 2900787344,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewHolding must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewToBeDelivered must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '857b4225-b827-4044-8f58-f1881a248932',
                tenantId: 'b6edecd4-33d0-43a4-8e61-afb0efaa456f',
                systemId: '3fef01a2-5194-4339-ba78-4ab6deeb348c',
                systemName: 'b8im9ky8jgyaresplshq',
                executionId: '30130d03-fc77-4e8e-ad7f-a3da85d0f950',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 18:58:47',
                executionMonitoringStartAt: '2020-07-21 11:10:04',
                executionMonitoringEndAt: '2020-07-21 08:11:06',
                numberMax: 7850016947,
                numberDays: 8675678772,
                success: 6768886283,
                cancelled: 8328006043,
                delivering: 2718801666,
                error: 2991488528,
                holding: 5039317168,
                toBeDelivered: -9,
                waiting: 2353563287,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewToBeDelivered must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewWaiting must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '857b4225-b827-4044-8f58-f1881a248932',
                tenantId: 'b6edecd4-33d0-43a4-8e61-afb0efaa456f',
                systemId: '3fef01a2-5194-4339-ba78-4ab6deeb348c',
                systemName: 'v0c7i7iic3j8ti4bxisn',
                executionId: '30130d03-fc77-4e8e-ad7f-a3da85d0f950',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 20:51:18',
                executionMonitoringStartAt: '2020-07-21 01:56:44',
                executionMonitoringEndAt: '2020-07-21 17:48:55',
                numberMax: 9288905209,
                numberDays: 9800879155,
                success: 1911285912,
                cancelled: 8282576390,
                delivering: 3321879533,
                error: 1320198374,
                holding: 3896159278,
                toBeDelivered: 8061502717,
                waiting: -9,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewWaiting must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '857b4225-b827-4044-8f58-f1881a248932',
                tenantId: 'b6edecd4-33d0-43a4-8e61-afb0efaa456f',
                systemId: '3fef01a2-5194-4339-ba78-4ab6deeb348c',
                systemName: '2tumckxdpjojiqi2kzjs',
                executionId: '30130d03-fc77-4e8e-ad7f-a3da85d0f950',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-21 07:22:20',
                executionMonitoringStartAt: '2020-07-21 20:00:56',
                executionMonitoringEndAt: '2020-07-21 03:37:43',
                numberMax: 2216810640,
                numberDays: 3337623109,
                success: 4133426044,
                cancelled: 1108336951,
                delivering: 1867638032,
                error: 5749496520,
                holding: 1657255525,
                toBeDelivered: 6094522378,
                waiting: 6756479882,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '857b4225-b827-4044-8f58-f1881a248932',
                tenantId: 'b6edecd4-33d0-43a4-8e61-afb0efaa456f',
                systemId: '3fef01a2-5194-4339-ba78-4ab6deeb348c',
                systemName: 'sebkrv8xqpljkn0ckduu',
                executionId: '30130d03-fc77-4e8e-ad7f-a3da85d0f950',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-21 22:25:55',
                executionMonitoringEndAt: '2020-07-21 05:59:24',
                numberMax: 3084695958,
                numberDays: 2918164825,
                success: 8365939109,
                cancelled: 1866179703,
                delivering: 9099449594,
                error: 4011961582,
                holding: 9176911975,
                toBeDelivered: 3568412492,
                waiting: 7402310708,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionExecutedAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionMonitoringStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '857b4225-b827-4044-8f58-f1881a248932',
                tenantId: 'b6edecd4-33d0-43a4-8e61-afb0efaa456f',
                systemId: '3fef01a2-5194-4339-ba78-4ab6deeb348c',
                systemName: 'nc6t991bx298ky38rpfa',
                executionId: '30130d03-fc77-4e8e-ad7f-a3da85d0f950',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 02:36:54',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-21 20:18:03',
                numberMax: 7383330169,
                numberDays: 9968260284,
                success: 3851726885,
                cancelled: 7430233582,
                delivering: 6512886325,
                error: 9032529145,
                holding: 1587049085,
                toBeDelivered: 2019857313,
                waiting: 2096110541,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionMonitoringEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '857b4225-b827-4044-8f58-f1881a248932',
                tenantId: 'b6edecd4-33d0-43a4-8e61-afb0efaa456f',
                systemId: '3fef01a2-5194-4339-ba78-4ab6deeb348c',
                systemName: 'wbi8slx93y5ilv7ijbhv',
                executionId: '30130d03-fc77-4e8e-ad7f-a3da85d0f950',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 04:46:05',
                executionMonitoringStartAt: '2020-07-21 20:36:56',
                executionMonitoringEndAt: 'XXXXXXXX',
                numberMax: 7894856051,
                numberDays: 8373300795,
                success: 7700163128,
                cancelled: 9269349651,
                delivering: 2591832548,
                error: 7200826782,
                holding: 1431115282,
                toBeDelivered: 5991598695,
                waiting: 9298848492,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST bplus-it-sappi/message-overview`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '857b4225-b827-4044-8f58-f1881a248932',
                tenantId: 'b6edecd4-33d0-43a4-8e61-afb0efaa456f',
                systemId: '3fef01a2-5194-4339-ba78-4ab6deeb348c',
                systemName: 'v3lww9c2li9oguostub3',
                executionId: '30130d03-fc77-4e8e-ad7f-a3da85d0f950',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 01:22:58',
                executionMonitoringStartAt: '2020-07-21 23:07:43',
                executionMonitoringEndAt: '2020-07-21 23:30:31',
                numberMax: 9424983658,
                numberDays: 8132709238,
                success: 6777453009,
                cancelled: 2800713215,
                delivering: 7862520094,
                error: 4273316035,
                holding: 8106682652,
                toBeDelivered: 4317824730,
                waiting: 3687933754,
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/messages-overview/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/messages-overview/paginate')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command: Command.OFFSET,
                        value: 0
                    },
                    {
                        command: Command.LIMIT,
                        value: 10
                    }
                ]
            })
            .expect(200)
            .expect({ 
                total   : repository.collectionResponse.length, 
                count   : repository.collectionResponse.length, 
                rows    : repository.collectionResponse.slice(0, 10)
            });
    });

    test(`/REST:GET bplus-it-sappi/message-overview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '00000000-0000-0000-0000-000000000000'
                    }
                ]
            })
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/message-overview`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '857b4225-b827-4044-8f58-f1881a248932'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '857b4225-b827-4044-8f58-f1881a248932'));
    });

    test(`/REST:GET bplus-it-sappi/message-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-overview/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/message-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-overview/857b4225-b827-4044-8f58-f1881a248932')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '857b4225-b827-4044-8f58-f1881a248932'));
    });

    test(`/REST:GET bplus-it-sappi/messages-overview`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/messages-overview')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/message-overview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: 'e481bd83-64df-4899-a3e8-1934a46bb8b7',
                tenantId: 'b7e36c28-0480-4a97-a018-e5e536744456',
                systemId: '6fcf7e44-5471-4999-adf0-4ba0115427b2',
                systemName: '7m9nxytbe0bextw4tgmv',
                executionId: '81fe31ca-4fe2-41a5-a78c-4b2bc74b7cf1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 09:46:49',
                executionMonitoringStartAt: '2020-07-21 22:52:28',
                executionMonitoringEndAt: '2020-07-21 18:12:19',
                numberMax: 7093954559,
                numberDays: 6910766560,
                success: 1003167174,
                cancelled: 8695333246,
                delivering: 3829687103,
                error: 3654488657,
                holding: 3704199202,
                toBeDelivered: 5063133014,
                waiting: 6793153700,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/message-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: '857b4225-b827-4044-8f58-f1881a248932',
                tenantId: 'b6edecd4-33d0-43a4-8e61-afb0efaa456f',
                systemId: '3fef01a2-5194-4339-ba78-4ab6deeb348c',
                systemName: '7ec8au9hza7f2cmczngo',
                executionId: '30130d03-fc77-4e8e-ad7f-a3da85d0f950',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 23:38:46',
                executionMonitoringStartAt: '2020-07-21 11:03:54',
                executionMonitoringEndAt: '2020-07-21 15:13:41',
                numberMax: 4112648830,
                numberDays: 9304379804,
                success: 6991757879,
                cancelled: 9868189518,
                delivering: 4246041580,
                error: 1422297364,
                holding: 5222145845,
                toBeDelivered: 7607031620,
                waiting: 7677167824,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '857b4225-b827-4044-8f58-f1881a248932'));
    });

    test(`/REST:DELETE bplus-it-sappi/message-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/message-overview/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/message-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/message-overview/857b4225-b827-4044-8f58-f1881a248932')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateMessageOverview - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateMessageOverviewInput!)
                    {
                        bplusItSappiCreateMessageOverview (payload:$payload)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            executionId
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
                    payload: _.omit(repository.collectionResponse[0], ['createdAt','updatedAt','deletedAt'])
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(409);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('already exist in database');
            });
    });

    test(`/GraphQL bplusItSappiCreateMessageOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateMessageOverviewInput!)
                    {
                        bplusItSappiCreateMessageOverview (payload:$payload)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            executionId
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
                        id: 'fc051c87-0448-4605-8747-1ff7a998e522',
                        tenantId: 'b6edecd4-33d0-43a4-8e61-afb0efaa456f',
                        systemId: '3fef01a2-5194-4339-ba78-4ab6deeb348c',
                        systemName: 'mpg9jadoz80nheybzs88',
                        executionId: '30130d03-fc77-4e8e-ad7f-a3da85d0f950',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-21 19:55:41',
                        executionMonitoringStartAt: '2020-07-21 02:25:10',
                        executionMonitoringEndAt: '2020-07-22 00:31:14',
                        numberMax: 8596543469,
                        numberDays: 2156607475,
                        success: 2841796540,
                        cancelled: 7410652962,
                        delivering: 8740868485,
                        error: 6495491105,
                        holding: 8097355227,
                        toBeDelivered: 6279284462,
                        waiting: 6872668712,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateMessageOverview).toHaveProperty('id', 'fc051c87-0448-4605-8747-1ff7a998e522');
            });
    });

    test(`/GraphQL bplusItSappiPaginateMessagesOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateMessagesOverview (query:$query constraint:$constraint)
                        {   
                            total
                            count
                            rows
                        }
                    }
                `,
                variables: {
                    query: [
                        {
                            "command": "OFFSET",
                            "value": 0
                        },
                        {
                            "command": "LIMIT",
                            "value": 10
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiPaginateMessagesOverview.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateMessagesOverview.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateMessagesOverview.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindMessageOverview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindMessageOverview (query:$query)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            executionId
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
                    query: [
                        {
                            command : Command.WHERE,
                            column  : 'id',
                            operator: Operator.EQUALS,
                            value   : '00000000-0000-0000-0000-000000000000'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiFindMessageOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindMessageOverview (query:$query)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            executionId
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
                    query: [
                        {
                            command : Command.WHERE,
                            column  : 'id',
                            operator: Operator.EQUALS,
                            value   : '857b4225-b827-4044-8f58-f1881a248932'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageOverview.id).toStrictEqual('857b4225-b827-4044-8f58-f1881a248932');
            });
    });

    test(`/GraphQL bplusItSappiFindMessageOverviewById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindMessageOverviewById (id:$id)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            executionId
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
                    id: '00000000-0000-0000-0000-000000000000'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiFindMessageOverviewById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindMessageOverviewById (id:$id)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            executionId
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
                    id: '857b4225-b827-4044-8f58-f1881a248932'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageOverviewById.id).toStrictEqual('857b4225-b827-4044-8f58-f1881a248932');
            });
    });

    test(`/GraphQL bplusItSappiGetMessagesOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetMessagesOverview (query:$query)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            executionId
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
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetMessagesOverview.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateMessageOverview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateMessageOverviewInput!)
                    {
                        bplusItSappiUpdateMessageOverview (payload:$payload)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            executionId
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
                        
                        id: 'a985409b-fe69-42cf-b5d0-d8589743e9f7',
                        tenantId: 'e50f912d-97a4-45a3-bd12-82cd5e6a9865',
                        systemId: '7838a1a8-bcf5-4215-af90-4b231832a425',
                        systemName: 'etbdy0vcyeqbd8s8mac0',
                        executionId: '1f17920d-b489-4a41-84e7-064cfa714414',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-22 00:43:47',
                        executionMonitoringStartAt: '2020-07-21 09:12:23',
                        executionMonitoringEndAt: '2020-07-21 22:12:48',
                        numberMax: 5179264558,
                        numberDays: 5241613003,
                        success: 6614440218,
                        cancelled: 1066433920,
                        delivering: 9412583825,
                        error: 3158635192,
                        holding: 3154605557,
                        toBeDelivered: 5565144964,
                        waiting: 9771807602,
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

    test(`/GraphQL bplusItSappiUpdateMessageOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateMessageOverviewInput!)
                    {
                        bplusItSappiUpdateMessageOverview (payload:$payload)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            executionId
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
                        
                        id: '857b4225-b827-4044-8f58-f1881a248932',
                        tenantId: 'b6edecd4-33d0-43a4-8e61-afb0efaa456f',
                        systemId: '3fef01a2-5194-4339-ba78-4ab6deeb348c',
                        systemName: '738iy7e8270lkq72o1lc',
                        executionId: '30130d03-fc77-4e8e-ad7f-a3da85d0f950',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-21 12:25:06',
                        executionMonitoringStartAt: '2020-07-21 05:21:39',
                        executionMonitoringEndAt: '2020-07-21 18:48:17',
                        numberMax: 9093125788,
                        numberDays: 2781912750,
                        success: 3846426207,
                        cancelled: 2452613906,
                        delivering: 9066827954,
                        error: 4987412411,
                        holding: 8661586611,
                        toBeDelivered: 5368549046,
                        waiting: 6658273361,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateMessageOverview.id).toStrictEqual('857b4225-b827-4044-8f58-f1881a248932');
            });
    });

    test(`/GraphQL bplusItSappiDeleteMessageOverviewById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteMessageOverviewById (id:$id)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            executionId
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
                    id: '00000000-0000-0000-0000-000000000000'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiDeleteMessageOverviewById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteMessageOverviewById (id:$id)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            executionId
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
                    id: '857b4225-b827-4044-8f58-f1881a248932'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteMessageOverviewById.id).toStrictEqual('857b4225-b827-4044-8f58-f1881a248932');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});