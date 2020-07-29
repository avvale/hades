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
                tenantId: '745c7c09-fc43-47ec-babf-fe3f38132041',
                tenantCode: '116od51ikfwcnqr5dzcph133tzcf9ah25nplw7k9eaw5840hde',
                systemId: 'b2b91cc6-7538-4e94-9054-a45adaba8699',
                systemName: 'wocyoccuvczpzkd2wf0e',
                executionId: '48488e33-1993-4078-9280-e670260f0b5a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 06:24:34',
                executionMonitoringStartAt: '2020-07-28 18:44:29',
                executionMonitoringEndAt: '2020-07-29 05:28:12',
                numberMax: 7841663103,
                numberDays: 9200708435,
                success: 8189304965,
                cancelled: 9466469826,
                delivering: 5837945147,
                error: 2328481346,
                holding: 7882489791,
                toBeDelivered: 5536642625,
                waiting: 3922997430,
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
                
                tenantId: '745c7c09-fc43-47ec-babf-fe3f38132041',
                tenantCode: '4wykyseeclo8jl4x49ay1retlc4uecuhln39ws6oqwn2dh4w7r',
                systemId: 'b2b91cc6-7538-4e94-9054-a45adaba8699',
                systemName: 'ia95ikns3zduyxxtkg7b',
                executionId: '48488e33-1993-4078-9280-e670260f0b5a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 03:42:30',
                executionMonitoringStartAt: '2020-07-29 11:52:09',
                executionMonitoringEndAt: '2020-07-29 03:01:07',
                numberMax: 6986508109,
                numberDays: 2297414193,
                success: 6862428238,
                cancelled: 1235970575,
                delivering: 6926511444,
                error: 3093451888,
                holding: 3919692606,
                toBeDelivered: 2498260775,
                waiting: 8260859660,
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
                id: '70c8bf59-fa0b-4e33-b9b1-fdbc97d2e43b',
                tenantId: null,
                tenantCode: 'y3ljj05mlekrzhtj2fvucjvtv5ishxgbcj85f3rseltpewzn06',
                systemId: 'b2b91cc6-7538-4e94-9054-a45adaba8699',
                systemName: 'p9yet8quftrkoh41fwpz',
                executionId: '48488e33-1993-4078-9280-e670260f0b5a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 12:13:21',
                executionMonitoringStartAt: '2020-07-29 16:12:04',
                executionMonitoringEndAt: '2020-07-29 12:21:10',
                numberMax: 2500749447,
                numberDays: 5914232760,
                success: 5324948153,
                cancelled: 8249866391,
                delivering: 3799011685,
                error: 9435231313,
                holding: 6531926781,
                toBeDelivered: 4353968298,
                waiting: 3476203042,
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
                id: '70c8bf59-fa0b-4e33-b9b1-fdbc97d2e43b',
                
                tenantCode: 'h4wr5a5n3v3tpgnft2bzheurrm1c0hh3j5tlvfobyumr7c07uq',
                systemId: 'b2b91cc6-7538-4e94-9054-a45adaba8699',
                systemName: 'cdcnkald9n5nvzmuksgq',
                executionId: '48488e33-1993-4078-9280-e670260f0b5a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 11:27:28',
                executionMonitoringStartAt: '2020-07-28 18:45:58',
                executionMonitoringEndAt: '2020-07-29 01:52:30',
                numberMax: 6028154517,
                numberDays: 6874956859,
                success: 6557060408,
                cancelled: 6984461686,
                delivering: 7145631366,
                error: 7957446072,
                holding: 8433093962,
                toBeDelivered: 5092346486,
                waiting: 4142628424,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '70c8bf59-fa0b-4e33-b9b1-fdbc97d2e43b',
                tenantId: '745c7c09-fc43-47ec-babf-fe3f38132041',
                tenantCode: null,
                systemId: 'b2b91cc6-7538-4e94-9054-a45adaba8699',
                systemName: 'v4y6awx634tvhbnr6f58',
                executionId: '48488e33-1993-4078-9280-e670260f0b5a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 11:15:39',
                executionMonitoringStartAt: '2020-07-29 10:57:10',
                executionMonitoringEndAt: '2020-07-28 20:45:09',
                numberMax: 5403072180,
                numberDays: 4621315285,
                success: 2630855183,
                cancelled: 6346341891,
                delivering: 1387291390,
                error: 7112606550,
                holding: 7076284927,
                toBeDelivered: 5528198070,
                waiting: 4787829818,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '70c8bf59-fa0b-4e33-b9b1-fdbc97d2e43b',
                tenantId: '745c7c09-fc43-47ec-babf-fe3f38132041',
                
                systemId: 'b2b91cc6-7538-4e94-9054-a45adaba8699',
                systemName: 'pd1uo1v3obnyjx09mdtp',
                executionId: '48488e33-1993-4078-9280-e670260f0b5a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 09:46:21',
                executionMonitoringStartAt: '2020-07-29 14:42:48',
                executionMonitoringEndAt: '2020-07-29 10:49:22',
                numberMax: 8355725536,
                numberDays: 3154500728,
                success: 3563214038,
                cancelled: 7000072460,
                delivering: 2872675247,
                error: 3301307299,
                holding: 7202756154,
                toBeDelivered: 7632017461,
                waiting: 3448027799,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '70c8bf59-fa0b-4e33-b9b1-fdbc97d2e43b',
                tenantId: '745c7c09-fc43-47ec-babf-fe3f38132041',
                tenantCode: 'wnk6s5emhcy6qrw1owqiarv6e8m76kfvw5qtyqqcjvxa6fssnx',
                systemId: null,
                systemName: 'a2081dp16hvsniou8veh',
                executionId: '48488e33-1993-4078-9280-e670260f0b5a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 01:46:32',
                executionMonitoringStartAt: '2020-07-29 14:39:17',
                executionMonitoringEndAt: '2020-07-29 05:20:27',
                numberMax: 4089500877,
                numberDays: 8879412329,
                success: 2634403634,
                cancelled: 7166303446,
                delivering: 1554440024,
                error: 7853268677,
                holding: 7753641422,
                toBeDelivered: 1797554935,
                waiting: 4064112133,
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
                id: '70c8bf59-fa0b-4e33-b9b1-fdbc97d2e43b',
                tenantId: '745c7c09-fc43-47ec-babf-fe3f38132041',
                tenantCode: 'zplvrk1fp8jbirhgdow7oyv5lw8kuhb4prximd3foir1emjari',
                
                systemName: 'bkbi86pix2dg0adcrf3m',
                executionId: '48488e33-1993-4078-9280-e670260f0b5a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 21:39:48',
                executionMonitoringStartAt: '2020-07-29 16:31:07',
                executionMonitoringEndAt: '2020-07-29 05:29:03',
                numberMax: 4969580950,
                numberDays: 1192445874,
                success: 1963066923,
                cancelled: 3541191701,
                delivering: 4755556349,
                error: 1889212620,
                holding: 7173409668,
                toBeDelivered: 7912952187,
                waiting: 4078916565,
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
                id: '70c8bf59-fa0b-4e33-b9b1-fdbc97d2e43b',
                tenantId: '745c7c09-fc43-47ec-babf-fe3f38132041',
                tenantCode: 'v8duhpifqll8xlnraux5u8g5676bibiwqq0s1gbfl9jn2p6d8x',
                systemId: 'b2b91cc6-7538-4e94-9054-a45adaba8699',
                systemName: null,
                executionId: '48488e33-1993-4078-9280-e670260f0b5a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 05:18:27',
                executionMonitoringStartAt: '2020-07-29 02:42:19',
                executionMonitoringEndAt: '2020-07-29 10:58:18',
                numberMax: 1330926332,
                numberDays: 4868846616,
                success: 6459702952,
                cancelled: 8044119494,
                delivering: 9932816249,
                error: 4283021134,
                holding: 8105422104,
                toBeDelivered: 2571392250,
                waiting: 3814090778,
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
                id: '70c8bf59-fa0b-4e33-b9b1-fdbc97d2e43b',
                tenantId: '745c7c09-fc43-47ec-babf-fe3f38132041',
                tenantCode: 't84okncwtwims6hx6u6eautrygm6qh6ni46tfu9qtp381vt4u1',
                systemId: 'b2b91cc6-7538-4e94-9054-a45adaba8699',
                
                executionId: '48488e33-1993-4078-9280-e670260f0b5a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 05:01:28',
                executionMonitoringStartAt: '2020-07-28 21:56:11',
                executionMonitoringEndAt: '2020-07-29 14:45:21',
                numberMax: 4810602613,
                numberDays: 1282289583,
                success: 9009593817,
                cancelled: 3823086928,
                delivering: 3947181091,
                error: 2505834156,
                holding: 2776989538,
                toBeDelivered: 7406753078,
                waiting: 2414987214,
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
                id: '70c8bf59-fa0b-4e33-b9b1-fdbc97d2e43b',
                tenantId: '745c7c09-fc43-47ec-babf-fe3f38132041',
                tenantCode: '5cyr50xij2vja8ye0oad4zn7nyb980o7j4lnd80lzepxkltuqr',
                systemId: 'b2b91cc6-7538-4e94-9054-a45adaba8699',
                systemName: 'pxgmpboq0yuya7onx6j8',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 17:04:24',
                executionMonitoringStartAt: '2020-07-29 03:50:41',
                executionMonitoringEndAt: '2020-07-29 09:32:25',
                numberMax: 7863219370,
                numberDays: 2606899323,
                success: 1877273281,
                cancelled: 1281822103,
                delivering: 2012038282,
                error: 6751828485,
                holding: 9567994082,
                toBeDelivered: 3187437399,
                waiting: 5487085373,
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
                id: '70c8bf59-fa0b-4e33-b9b1-fdbc97d2e43b',
                tenantId: '745c7c09-fc43-47ec-babf-fe3f38132041',
                tenantCode: 'ulx2sc781s0nixpaw5m8pn682kq46ohkrreiop85nl3i5nw6j8',
                systemId: 'b2b91cc6-7538-4e94-9054-a45adaba8699',
                systemName: 'jm7254e4fnzjvmyd3heu',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 00:50:02',
                executionMonitoringStartAt: '2020-07-29 11:00:37',
                executionMonitoringEndAt: '2020-07-29 10:53:31',
                numberMax: 8474392525,
                numberDays: 5400333431,
                success: 5170621376,
                cancelled: 9234639040,
                delivering: 5781155701,
                error: 9415710281,
                holding: 5112310409,
                toBeDelivered: 2132546376,
                waiting: 6098168844,
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
                id: '70c8bf59-fa0b-4e33-b9b1-fdbc97d2e43b',
                tenantId: '745c7c09-fc43-47ec-babf-fe3f38132041',
                tenantCode: 'uv73co6xi4pcdifzk9uncs31gdq253f44e2fsby2g7qkmt7lhd',
                systemId: 'b2b91cc6-7538-4e94-9054-a45adaba8699',
                systemName: 'ix9gwwtdy7jd3umxq59a',
                executionId: '48488e33-1993-4078-9280-e670260f0b5a',
                executionType: null,
                executionExecutedAt: '2020-07-29 14:15:10',
                executionMonitoringStartAt: '2020-07-29 04:23:33',
                executionMonitoringEndAt: '2020-07-29 02:16:07',
                numberMax: 9479418903,
                numberDays: 9835065182,
                success: 5206812551,
                cancelled: 2896992028,
                delivering: 6221739358,
                error: 7084273628,
                holding: 7966728924,
                toBeDelivered: 9286267938,
                waiting: 9667906964,
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
                id: '70c8bf59-fa0b-4e33-b9b1-fdbc97d2e43b',
                tenantId: '745c7c09-fc43-47ec-babf-fe3f38132041',
                tenantCode: 'mraxozjvnm9fx4z84dqldlqfz2vm1jacyg84qzj7gs06e03ycx',
                systemId: 'b2b91cc6-7538-4e94-9054-a45adaba8699',
                systemName: '0uuj7e6ptykmyk8otnk6',
                executionId: '48488e33-1993-4078-9280-e670260f0b5a',
                
                executionExecutedAt: '2020-07-29 08:07:42',
                executionMonitoringStartAt: '2020-07-28 22:34:48',
                executionMonitoringEndAt: '2020-07-29 15:40:59',
                numberMax: 6246181462,
                numberDays: 8098456143,
                success: 1830531316,
                cancelled: 6373325405,
                delivering: 7783501124,
                error: 8714571191,
                holding: 6882498221,
                toBeDelivered: 9319566021,
                waiting: 2018903977,
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
                id: '70c8bf59-fa0b-4e33-b9b1-fdbc97d2e43b',
                tenantId: '745c7c09-fc43-47ec-babf-fe3f38132041',
                tenantCode: '0r94i9l123gc1ds5uwgrsngqyck7nedanmxv5h7wxsuawqq57k',
                systemId: 'b2b91cc6-7538-4e94-9054-a45adaba8699',
                systemName: 'cwub07r0x8qkn3qjl1fa',
                executionId: '48488e33-1993-4078-9280-e670260f0b5a',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-29 14:16:43',
                executionMonitoringEndAt: '2020-07-29 05:47:16',
                numberMax: 6646964661,
                numberDays: 2826836169,
                success: 2270205908,
                cancelled: 4480720294,
                delivering: 2645779219,
                error: 8122637719,
                holding: 8491191742,
                toBeDelivered: 8825771018,
                waiting: 7975928692,
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
                id: '70c8bf59-fa0b-4e33-b9b1-fdbc97d2e43b',
                tenantId: '745c7c09-fc43-47ec-babf-fe3f38132041',
                tenantCode: 'rz5960xtx0z5yac4rgkm8r0li5gex1umkr4defispqodhioaxz',
                systemId: 'b2b91cc6-7538-4e94-9054-a45adaba8699',
                systemName: '3wdm75baibv48tltnitt',
                executionId: '48488e33-1993-4078-9280-e670260f0b5a',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-07-29 11:43:01',
                executionMonitoringEndAt: '2020-07-29 10:21:59',
                numberMax: 1404189115,
                numberDays: 4649337627,
                success: 6231321422,
                cancelled: 2564251286,
                delivering: 9582641088,
                error: 3996343489,
                holding: 4244058836,
                toBeDelivered: 4180409302,
                waiting: 9886259296,
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
                id: '70c8bf59-fa0b-4e33-b9b1-fdbc97d2e43b',
                tenantId: '745c7c09-fc43-47ec-babf-fe3f38132041',
                tenantCode: 'w0v71uptsd1x4hfdzg09jnfkmhixyf0uu4lzm6twg148yvo8jk',
                systemId: 'b2b91cc6-7538-4e94-9054-a45adaba8699',
                systemName: 'erar6f9uqbaye6qp9kbr',
                executionId: '48488e33-1993-4078-9280-e670260f0b5a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 03:33:27',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-29 16:05:43',
                numberMax: 3290665329,
                numberDays: 9829771832,
                success: 1183816876,
                cancelled: 4918284191,
                delivering: 7256312456,
                error: 2675864515,
                holding: 2336204347,
                toBeDelivered: 9540273646,
                waiting: 1992784030,
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
                id: '70c8bf59-fa0b-4e33-b9b1-fdbc97d2e43b',
                tenantId: '745c7c09-fc43-47ec-babf-fe3f38132041',
                tenantCode: '5ad00l4hr74wyglk3owta0azufrvsfsaiq0m65ols9zcaugng4',
                systemId: 'b2b91cc6-7538-4e94-9054-a45adaba8699',
                systemName: '65e3vjbbmqsmkfy4xrkx',
                executionId: '48488e33-1993-4078-9280-e670260f0b5a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 02:54:02',
                
                executionMonitoringEndAt: '2020-07-28 20:57:59',
                numberMax: 3020861928,
                numberDays: 3111012618,
                success: 6645943383,
                cancelled: 1256153759,
                delivering: 9713791467,
                error: 9107985351,
                holding: 6893043569,
                toBeDelivered: 3522268918,
                waiting: 5809970461,
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
                id: '70c8bf59-fa0b-4e33-b9b1-fdbc97d2e43b',
                tenantId: '745c7c09-fc43-47ec-babf-fe3f38132041',
                tenantCode: '0dta4odv0wkuej9re85ixlbm7gn2m9hjv26haqinrd32slx73i',
                systemId: 'b2b91cc6-7538-4e94-9054-a45adaba8699',
                systemName: 'men0jy20jwlh9fc6rkl4',
                executionId: '48488e33-1993-4078-9280-e670260f0b5a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 17:17:05',
                executionMonitoringStartAt: '2020-07-29 03:44:03',
                executionMonitoringEndAt: null,
                numberMax: 9620024805,
                numberDays: 9155052462,
                success: 8347065905,
                cancelled: 5517836386,
                delivering: 3355238157,
                error: 4915926109,
                holding: 2548698908,
                toBeDelivered: 3301052102,
                waiting: 6557199067,
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
                id: '70c8bf59-fa0b-4e33-b9b1-fdbc97d2e43b',
                tenantId: '745c7c09-fc43-47ec-babf-fe3f38132041',
                tenantCode: 'prr68z3zwj4im3p0o4k7wb38n2giiknz2h8fr2tr1xgknf45rx',
                systemId: 'b2b91cc6-7538-4e94-9054-a45adaba8699',
                systemName: 'wjsztwx8nq2aoxdx7fky',
                executionId: '48488e33-1993-4078-9280-e670260f0b5a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 23:24:08',
                executionMonitoringStartAt: '2020-07-29 14:10:36',
                
                numberMax: 4963855972,
                numberDays: 7791058533,
                success: 1061421178,
                cancelled: 6687361767,
                delivering: 6725617181,
                error: 3687099551,
                holding: 8845837085,
                toBeDelivered: 4066743124,
                waiting: 4712334862,
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
                id: 'ar6jco2azaz88sw08ypz8l1yv8dw3lmgzkcnd',
                tenantId: '745c7c09-fc43-47ec-babf-fe3f38132041',
                tenantCode: 'iqea3216rl2zmjx5ngabuarereueui28g80blrod6jc62i671y',
                systemId: 'b2b91cc6-7538-4e94-9054-a45adaba8699',
                systemName: 'aol29s82i2v4x3idgejg',
                executionId: '48488e33-1993-4078-9280-e670260f0b5a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 17:46:05',
                executionMonitoringStartAt: '2020-07-28 20:24:36',
                executionMonitoringEndAt: '2020-07-28 21:06:41',
                numberMax: 3883391498,
                numberDays: 2002559561,
                success: 1648879321,
                cancelled: 8621334735,
                delivering: 5753167913,
                error: 1925878492,
                holding: 5013637115,
                toBeDelivered: 7562509109,
                waiting: 7772164736,
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
                id: '70c8bf59-fa0b-4e33-b9b1-fdbc97d2e43b',
                tenantId: '42m1lt3kyf4dbd3ebv6k65s5wjzlw1bynmnb2',
                tenantCode: 'dzo2yvbimaxttiqt3o33oc8h3hgzmq83l45ed9bfavzw2ixces',
                systemId: 'b2b91cc6-7538-4e94-9054-a45adaba8699',
                systemName: 'w2jxwsyvfygvb7izfp97',
                executionId: '48488e33-1993-4078-9280-e670260f0b5a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 03:47:36',
                executionMonitoringStartAt: '2020-07-29 16:42:38',
                executionMonitoringEndAt: '2020-07-29 00:48:27',
                numberMax: 6123352321,
                numberDays: 2464736568,
                success: 7836234605,
                cancelled: 1875460094,
                delivering: 2445682711,
                error: 4139461717,
                holding: 8299389093,
                toBeDelivered: 8364956798,
                waiting: 7130755926,
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
                id: '70c8bf59-fa0b-4e33-b9b1-fdbc97d2e43b',
                tenantId: '745c7c09-fc43-47ec-babf-fe3f38132041',
                tenantCode: '7mtzp0699drv285x5ehxyv6ezcmc26e1luyrb1ccyezhc4ths1',
                systemId: 'lcxabmkzi90ya638ahs8g8e2s2llz9xfcco4q',
                systemName: 'tqrci7wqlftw92xi3mgi',
                executionId: '48488e33-1993-4078-9280-e670260f0b5a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 20:20:07',
                executionMonitoringStartAt: '2020-07-29 06:43:52',
                executionMonitoringEndAt: '2020-07-28 19:34:49',
                numberMax: 3519634291,
                numberDays: 6831100846,
                success: 8945638658,
                cancelled: 8882531273,
                delivering: 5196893706,
                error: 5724244547,
                holding: 8430884266,
                toBeDelivered: 3991316438,
                waiting: 4259246432,
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
                id: '70c8bf59-fa0b-4e33-b9b1-fdbc97d2e43b',
                tenantId: '745c7c09-fc43-47ec-babf-fe3f38132041',
                tenantCode: '3q93hs10n1bh7x7g5nwvpojuqp3ticrhti37v5d9qw1ls110pe',
                systemId: 'b2b91cc6-7538-4e94-9054-a45adaba8699',
                systemName: 'hso3l7z178ju1sdjunrg',
                executionId: 't8mlu5y4r8j3g5diq562y5h6wsvairvu6gn8x',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 03:43:41',
                executionMonitoringStartAt: '2020-07-29 06:51:59',
                executionMonitoringEndAt: '2020-07-29 15:18:00',
                numberMax: 5702843402,
                numberDays: 5668212226,
                success: 5374286461,
                cancelled: 2530804088,
                delivering: 3940212863,
                error: 1470955625,
                holding: 3526114211,
                toBeDelivered: 6053108802,
                waiting: 5457097222,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '70c8bf59-fa0b-4e33-b9b1-fdbc97d2e43b',
                tenantId: '745c7c09-fc43-47ec-babf-fe3f38132041',
                tenantCode: '4ytvxa7ne1m3rdlsg0487s7ad78jv4wsexp8lyvk3nta9a1p0w1',
                systemId: 'b2b91cc6-7538-4e94-9054-a45adaba8699',
                systemName: 'dl7l50rkouks1ws4niht',
                executionId: '48488e33-1993-4078-9280-e670260f0b5a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 08:46:27',
                executionMonitoringStartAt: '2020-07-28 20:05:26',
                executionMonitoringEndAt: '2020-07-28 21:52:37',
                numberMax: 4692491378,
                numberDays: 3414050597,
                success: 1781560551,
                cancelled: 8652615415,
                delivering: 4901508650,
                error: 5771448340,
                holding: 4290882391,
                toBeDelivered: 2914288199,
                waiting: 9428539830,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '70c8bf59-fa0b-4e33-b9b1-fdbc97d2e43b',
                tenantId: '745c7c09-fc43-47ec-babf-fe3f38132041',
                tenantCode: '6couu543oarbwicw9d06lq5npasub23wvwb3tvrsh46foose63',
                systemId: 'b2b91cc6-7538-4e94-9054-a45adaba8699',
                systemName: '2afvuaon7lx9do4f31jvq',
                executionId: '48488e33-1993-4078-9280-e670260f0b5a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 18:30:34',
                executionMonitoringStartAt: '2020-07-29 09:58:17',
                executionMonitoringEndAt: '2020-07-29 02:00:47',
                numberMax: 2611184368,
                numberDays: 9150381251,
                success: 1649675918,
                cancelled: 7470720139,
                delivering: 8419142993,
                error: 9959405931,
                holding: 1764853593,
                toBeDelivered: 9287803771,
                waiting: 1486427136,
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
                id: '70c8bf59-fa0b-4e33-b9b1-fdbc97d2e43b',
                tenantId: '745c7c09-fc43-47ec-babf-fe3f38132041',
                tenantCode: 'jo1yiqphorn695fxg1xgd3n8v8lbsc3sshzgn63w3ivh5omqwn',
                systemId: 'b2b91cc6-7538-4e94-9054-a45adaba8699',
                systemName: 'ozho1i25rkhcayog73r2',
                executionId: '48488e33-1993-4078-9280-e670260f0b5a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 19:31:06',
                executionMonitoringStartAt: '2020-07-29 06:51:35',
                executionMonitoringEndAt: '2020-07-29 04:37:59',
                numberMax: 42095295161,
                numberDays: 3565918595,
                success: 9436098596,
                cancelled: 9006923736,
                delivering: 3278723562,
                error: 6723145254,
                holding: 1424243851,
                toBeDelivered: 3474595210,
                waiting: 8773438253,
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
                id: '70c8bf59-fa0b-4e33-b9b1-fdbc97d2e43b',
                tenantId: '745c7c09-fc43-47ec-babf-fe3f38132041',
                tenantCode: 'w7dkfbnzulny0zcio3if7eu58eirqxroblc20erbf0it56e636',
                systemId: 'b2b91cc6-7538-4e94-9054-a45adaba8699',
                systemName: '65sxy67youm9lq4d1lfy',
                executionId: '48488e33-1993-4078-9280-e670260f0b5a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 19:31:02',
                executionMonitoringStartAt: '2020-07-29 14:37:36',
                executionMonitoringEndAt: '2020-07-29 13:01:48',
                numberMax: 5068049510,
                numberDays: 10413014318,
                success: 1926880679,
                cancelled: 4037265146,
                delivering: 9903751282,
                error: 9221275610,
                holding: 2456868908,
                toBeDelivered: 6179601306,
                waiting: 7015134883,
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
                id: '70c8bf59-fa0b-4e33-b9b1-fdbc97d2e43b',
                tenantId: '745c7c09-fc43-47ec-babf-fe3f38132041',
                tenantCode: 'tskkhvngf9mfsigsrov6unstrvcv1qpprp8kfjo363pl1nbl6p',
                systemId: 'b2b91cc6-7538-4e94-9054-a45adaba8699',
                systemName: '0bfjh0d7xp2ig8gl4wi7',
                executionId: '48488e33-1993-4078-9280-e670260f0b5a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 15:51:19',
                executionMonitoringStartAt: '2020-07-28 20:51:00',
                executionMonitoringEndAt: '2020-07-29 05:07:09',
                numberMax: 1293767869,
                numberDays: 6074999474,
                success: 71362614533,
                cancelled: 6182159436,
                delivering: 5123184270,
                error: 5811162459,
                holding: 8814296395,
                toBeDelivered: 2398476360,
                waiting: 7849148641,
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
                id: '70c8bf59-fa0b-4e33-b9b1-fdbc97d2e43b',
                tenantId: '745c7c09-fc43-47ec-babf-fe3f38132041',
                tenantCode: 'p077orfx0t58o5wdq3bsqtgcn1erz3vap8qhn829ysrjmmklca',
                systemId: 'b2b91cc6-7538-4e94-9054-a45adaba8699',
                systemName: 'ey02p4gqrb675kidpw5k',
                executionId: '48488e33-1993-4078-9280-e670260f0b5a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 11:10:38',
                executionMonitoringStartAt: '2020-07-29 09:45:15',
                executionMonitoringEndAt: '2020-07-29 02:43:48',
                numberMax: 8565910735,
                numberDays: 1927042063,
                success: 7134816469,
                cancelled: 90827116793,
                delivering: 3409118361,
                error: 3517378582,
                holding: 4046858908,
                toBeDelivered: 8461097350,
                waiting: 7365165466,
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
                id: '70c8bf59-fa0b-4e33-b9b1-fdbc97d2e43b',
                tenantId: '745c7c09-fc43-47ec-babf-fe3f38132041',
                tenantCode: 'owdgqfaxk1p3ck0s7kuundqgt3l9nhydzvqaduxchqwy9svxry',
                systemId: 'b2b91cc6-7538-4e94-9054-a45adaba8699',
                systemName: '66nd13hcmttqzfydxh6u',
                executionId: '48488e33-1993-4078-9280-e670260f0b5a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 15:51:31',
                executionMonitoringStartAt: '2020-07-29 10:01:03',
                executionMonitoringEndAt: '2020-07-29 04:21:54',
                numberMax: 5987255894,
                numberDays: 5570957277,
                success: 6033502642,
                cancelled: 8682152221,
                delivering: 20190165731,
                error: 9662075125,
                holding: 5764657239,
                toBeDelivered: 2679075039,
                waiting: 8309540348,
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
                id: '70c8bf59-fa0b-4e33-b9b1-fdbc97d2e43b',
                tenantId: '745c7c09-fc43-47ec-babf-fe3f38132041',
                tenantCode: 'zxyb0boclk5t32rvtnwqbs30591yolh19ov19wpbex8tyv98xv',
                systemId: 'b2b91cc6-7538-4e94-9054-a45adaba8699',
                systemName: 'yk6zerf63va8s04u8rc4',
                executionId: '48488e33-1993-4078-9280-e670260f0b5a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 13:17:17',
                executionMonitoringStartAt: '2020-07-29 12:24:42',
                executionMonitoringEndAt: '2020-07-29 05:11:28',
                numberMax: 7258429856,
                numberDays: 9142828051,
                success: 3034653402,
                cancelled: 5967054476,
                delivering: 4808942630,
                error: 17030745194,
                holding: 8339929004,
                toBeDelivered: 7864944460,
                waiting: 3994525728,
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
                id: '70c8bf59-fa0b-4e33-b9b1-fdbc97d2e43b',
                tenantId: '745c7c09-fc43-47ec-babf-fe3f38132041',
                tenantCode: 'w6etikbiytcy09cjlkrog0h6i2cvkc39p2u8po81arsmsdd17y',
                systemId: 'b2b91cc6-7538-4e94-9054-a45adaba8699',
                systemName: '5zo00wzjf1pw7tln2xwa',
                executionId: '48488e33-1993-4078-9280-e670260f0b5a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 22:54:38',
                executionMonitoringStartAt: '2020-07-29 00:46:07',
                executionMonitoringEndAt: '2020-07-29 14:08:47',
                numberMax: 7174333635,
                numberDays: 9021025122,
                success: 8608986639,
                cancelled: 4558536427,
                delivering: 9059424770,
                error: 8713978792,
                holding: 85884863389,
                toBeDelivered: 3147129982,
                waiting: 7768760619,
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
                id: '70c8bf59-fa0b-4e33-b9b1-fdbc97d2e43b',
                tenantId: '745c7c09-fc43-47ec-babf-fe3f38132041',
                tenantCode: 'iw22uhsdwchauach5rwmvavlkhqz9376og6uzxhhdbg1qmg2o6',
                systemId: 'b2b91cc6-7538-4e94-9054-a45adaba8699',
                systemName: 'ek0fgvl7thewh3vhcltn',
                executionId: '48488e33-1993-4078-9280-e670260f0b5a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 07:22:02',
                executionMonitoringStartAt: '2020-07-29 15:02:05',
                executionMonitoringEndAt: '2020-07-29 08:09:16',
                numberMax: 7788382891,
                numberDays: 7147784194,
                success: 3169618833,
                cancelled: 3279962234,
                delivering: 3838693572,
                error: 8881042414,
                holding: 5493057166,
                toBeDelivered: 26340486102,
                waiting: 8629335976,
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
                id: '70c8bf59-fa0b-4e33-b9b1-fdbc97d2e43b',
                tenantId: '745c7c09-fc43-47ec-babf-fe3f38132041',
                tenantCode: 'uyc28w4ufvxdahmtx9mwamrk9d6zw5a32hh26vsgo8v9kkdy5y',
                systemId: 'b2b91cc6-7538-4e94-9054-a45adaba8699',
                systemName: '1nvr2jcg6hy4ng23l5eb',
                executionId: '48488e33-1993-4078-9280-e670260f0b5a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 21:46:16',
                executionMonitoringStartAt: '2020-07-29 01:48:49',
                executionMonitoringEndAt: '2020-07-29 00:21:54',
                numberMax: 6694740638,
                numberDays: 2162512549,
                success: 3782125390,
                cancelled: 6251185874,
                delivering: 8574247176,
                error: 3058825521,
                holding: 6536549801,
                toBeDelivered: 3621177953,
                waiting: 92703964873,
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
                id: '70c8bf59-fa0b-4e33-b9b1-fdbc97d2e43b',
                tenantId: '745c7c09-fc43-47ec-babf-fe3f38132041',
                tenantCode: 'axtbkl41dbks8b9xgws6wu31nlr3llg7ze08gq8tlfn9mhn4r9',
                systemId: 'b2b91cc6-7538-4e94-9054-a45adaba8699',
                systemName: 'ywcj5kl4y98n2oyngz3e',
                executionId: '48488e33-1993-4078-9280-e670260f0b5a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 15:29:48',
                executionMonitoringStartAt: '2020-07-29 11:51:57',
                executionMonitoringEndAt: '2020-07-29 06:38:13',
                numberMax: -9,
                numberDays: 7941356390,
                success: 3910299984,
                cancelled: 8430155923,
                delivering: 9875173738,
                error: 5750608075,
                holding: 8326831223,
                toBeDelivered: 1635429553,
                waiting: 8573595969,
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
                id: '70c8bf59-fa0b-4e33-b9b1-fdbc97d2e43b',
                tenantId: '745c7c09-fc43-47ec-babf-fe3f38132041',
                tenantCode: '1wixvop7qrxsi1mbaata2s8txkagrtlkrupmz68hgpxbll4pkg',
                systemId: 'b2b91cc6-7538-4e94-9054-a45adaba8699',
                systemName: 'rrgnl1ymfv6ls94nxs36',
                executionId: '48488e33-1993-4078-9280-e670260f0b5a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 01:51:52',
                executionMonitoringStartAt: '2020-07-29 10:36:02',
                executionMonitoringEndAt: '2020-07-29 07:46:16',
                numberMax: 5933336692,
                numberDays: -9,
                success: 3244297338,
                cancelled: 8632356017,
                delivering: 8233558477,
                error: 2193301066,
                holding: 8425073649,
                toBeDelivered: 8769551834,
                waiting: 7044416645,
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
                id: '70c8bf59-fa0b-4e33-b9b1-fdbc97d2e43b',
                tenantId: '745c7c09-fc43-47ec-babf-fe3f38132041',
                tenantCode: 'x3sq1l98376f3bq3uo67kbqhf34x4sw3suihfeh6gke4l7u7oy',
                systemId: 'b2b91cc6-7538-4e94-9054-a45adaba8699',
                systemName: 'u27br5f3pxs6x4bsawjv',
                executionId: '48488e33-1993-4078-9280-e670260f0b5a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 18:49:48',
                executionMonitoringStartAt: '2020-07-29 06:10:41',
                executionMonitoringEndAt: '2020-07-29 13:05:25',
                numberMax: 2890314755,
                numberDays: 8901578269,
                success: -9,
                cancelled: 2427183022,
                delivering: 9766760673,
                error: 1654435142,
                holding: 8656855077,
                toBeDelivered: 1665982681,
                waiting: 5258923800,
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
                id: '70c8bf59-fa0b-4e33-b9b1-fdbc97d2e43b',
                tenantId: '745c7c09-fc43-47ec-babf-fe3f38132041',
                tenantCode: 'wb4nnzfv2tfgiw1t5l689x5fvelv1q78gnkdekjj1z4xxrf11i',
                systemId: 'b2b91cc6-7538-4e94-9054-a45adaba8699',
                systemName: 'ouwvyfbnhvs66ujwyz7j',
                executionId: '48488e33-1993-4078-9280-e670260f0b5a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 01:17:33',
                executionMonitoringStartAt: '2020-07-29 06:04:53',
                executionMonitoringEndAt: '2020-07-29 13:30:52',
                numberMax: 8646697138,
                numberDays: 6344410508,
                success: 2140323942,
                cancelled: -9,
                delivering: 4468665801,
                error: 5259041321,
                holding: 2044057395,
                toBeDelivered: 7646926837,
                waiting: 7165100403,
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
                id: '70c8bf59-fa0b-4e33-b9b1-fdbc97d2e43b',
                tenantId: '745c7c09-fc43-47ec-babf-fe3f38132041',
                tenantCode: 'bfp7yqxcw1o4zzxisdt1e92hgw5t2jz1xp814xfbvffcc9ghlo',
                systemId: 'b2b91cc6-7538-4e94-9054-a45adaba8699',
                systemName: 'ennxscp3uy0iqh3bkpxs',
                executionId: '48488e33-1993-4078-9280-e670260f0b5a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 23:08:41',
                executionMonitoringStartAt: '2020-07-29 10:12:23',
                executionMonitoringEndAt: '2020-07-29 00:36:36',
                numberMax: 3040235327,
                numberDays: 8403998624,
                success: 2724488574,
                cancelled: 2443737401,
                delivering: -9,
                error: 9596048512,
                holding: 3967588049,
                toBeDelivered: 6014077738,
                waiting: 9184206338,
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
                id: '70c8bf59-fa0b-4e33-b9b1-fdbc97d2e43b',
                tenantId: '745c7c09-fc43-47ec-babf-fe3f38132041',
                tenantCode: 'w06ungutw9kc7dgqk2stp6gq8ddskaso364xm79q1jz5lftyeh',
                systemId: 'b2b91cc6-7538-4e94-9054-a45adaba8699',
                systemName: 'z7hg8585qjifanho2t6q',
                executionId: '48488e33-1993-4078-9280-e670260f0b5a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 03:19:15',
                executionMonitoringStartAt: '2020-07-29 04:46:39',
                executionMonitoringEndAt: '2020-07-29 01:08:57',
                numberMax: 3152091181,
                numberDays: 6664537313,
                success: 8162079939,
                cancelled: 5320244857,
                delivering: 8398905096,
                error: -9,
                holding: 8864844583,
                toBeDelivered: 2916559825,
                waiting: 1095001611,
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
                id: '70c8bf59-fa0b-4e33-b9b1-fdbc97d2e43b',
                tenantId: '745c7c09-fc43-47ec-babf-fe3f38132041',
                tenantCode: 'lufbw791vwu7isu63wfhkra1jzw57ohy6oikqr9g69gfr3p0o4',
                systemId: 'b2b91cc6-7538-4e94-9054-a45adaba8699',
                systemName: '6e4q943dgx6xaye8rq36',
                executionId: '48488e33-1993-4078-9280-e670260f0b5a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 01:10:54',
                executionMonitoringStartAt: '2020-07-29 15:09:40',
                executionMonitoringEndAt: '2020-07-29 13:44:52',
                numberMax: 7076805669,
                numberDays: 7816255648,
                success: 8366599873,
                cancelled: 3815158875,
                delivering: 7345788105,
                error: 4606280991,
                holding: -9,
                toBeDelivered: 1079161444,
                waiting: 1677878404,
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
                id: '70c8bf59-fa0b-4e33-b9b1-fdbc97d2e43b',
                tenantId: '745c7c09-fc43-47ec-babf-fe3f38132041',
                tenantCode: 'h6g29qu4krkpzks56dfbui1trdbmivq62m43ettk9sb0416lox',
                systemId: 'b2b91cc6-7538-4e94-9054-a45adaba8699',
                systemName: 'gdugmwevrdpal4x0xk81',
                executionId: '48488e33-1993-4078-9280-e670260f0b5a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 17:23:28',
                executionMonitoringStartAt: '2020-07-29 15:11:27',
                executionMonitoringEndAt: '2020-07-28 16:51:22',
                numberMax: 1509394337,
                numberDays: 1514972912,
                success: 8151031870,
                cancelled: 7643467457,
                delivering: 7209577560,
                error: 8418683153,
                holding: 5890755913,
                toBeDelivered: -9,
                waiting: 4417308331,
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
                id: '70c8bf59-fa0b-4e33-b9b1-fdbc97d2e43b',
                tenantId: '745c7c09-fc43-47ec-babf-fe3f38132041',
                tenantCode: 'fmg6h87pbgnow0ej7nezgmp0x3960t56lqqbzjzzh0hzdlupv5',
                systemId: 'b2b91cc6-7538-4e94-9054-a45adaba8699',
                systemName: 'g3u2t0pstbd3p4szc6zh',
                executionId: '48488e33-1993-4078-9280-e670260f0b5a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 17:24:17',
                executionMonitoringStartAt: '2020-07-28 19:21:10',
                executionMonitoringEndAt: '2020-07-29 06:45:12',
                numberMax: 6050877093,
                numberDays: 3043475861,
                success: 6982233895,
                cancelled: 4226795931,
                delivering: 4557056096,
                error: 1233906028,
                holding: 5002785044,
                toBeDelivered: 5916010604,
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
                id: '70c8bf59-fa0b-4e33-b9b1-fdbc97d2e43b',
                tenantId: '745c7c09-fc43-47ec-babf-fe3f38132041',
                tenantCode: '8h125ui9xbwpidj5shefka9hm42xbs138zp0el1m96x7tb6v7e',
                systemId: 'b2b91cc6-7538-4e94-9054-a45adaba8699',
                systemName: 'cwptl9g3dezig72wxylw',
                executionId: '48488e33-1993-4078-9280-e670260f0b5a',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-29 00:26:43',
                executionMonitoringStartAt: '2020-07-28 22:57:07',
                executionMonitoringEndAt: '2020-07-28 23:44:13',
                numberMax: 4622358264,
                numberDays: 6094386621,
                success: 9157572999,
                cancelled: 5599716996,
                delivering: 7966125617,
                error: 7059032819,
                holding: 1456954431,
                toBeDelivered: 7548399824,
                waiting: 3835828945,
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
                id: '70c8bf59-fa0b-4e33-b9b1-fdbc97d2e43b',
                tenantId: '745c7c09-fc43-47ec-babf-fe3f38132041',
                tenantCode: '8qplpbx9j2ik6gu68qkqhf3zq2lgk4wq6uneb2vp8o3exi5qh7',
                systemId: 'b2b91cc6-7538-4e94-9054-a45adaba8699',
                systemName: 'yppuwhex97lbivm2lhmd',
                executionId: '48488e33-1993-4078-9280-e670260f0b5a',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-29 00:17:02',
                executionMonitoringEndAt: '2020-07-29 05:46:35',
                numberMax: 9437058057,
                numberDays: 2480729612,
                success: 9908816932,
                cancelled: 6201598573,
                delivering: 2720189013,
                error: 3706771544,
                holding: 8866319985,
                toBeDelivered: 6058076621,
                waiting: 5565429612,
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
                id: '70c8bf59-fa0b-4e33-b9b1-fdbc97d2e43b',
                tenantId: '745c7c09-fc43-47ec-babf-fe3f38132041',
                tenantCode: 'pn4746a8lpafbcjkfka8lzozpqrrmno2mmg9janfbllu6wo8y2',
                systemId: 'b2b91cc6-7538-4e94-9054-a45adaba8699',
                systemName: 'dtzd4dbztcynorom3d3w',
                executionId: '48488e33-1993-4078-9280-e670260f0b5a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 04:23:15',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-28 18:24:59',
                numberMax: 9023346588,
                numberDays: 7883253222,
                success: 9528904140,
                cancelled: 7413199872,
                delivering: 9047634080,
                error: 6326558938,
                holding: 1205272099,
                toBeDelivered: 4258469614,
                waiting: 8477629182,
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
                id: '70c8bf59-fa0b-4e33-b9b1-fdbc97d2e43b',
                tenantId: '745c7c09-fc43-47ec-babf-fe3f38132041',
                tenantCode: 'wfulttph5dzvob3tektggf2q79ipocwcvq9cuvpc3ziks1zguk',
                systemId: 'b2b91cc6-7538-4e94-9054-a45adaba8699',
                systemName: 'iuem8znduecj062defqc',
                executionId: '48488e33-1993-4078-9280-e670260f0b5a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 19:18:38',
                executionMonitoringStartAt: '2020-07-29 08:04:59',
                executionMonitoringEndAt: 'XXXXXXXX',
                numberMax: 6031370204,
                numberDays: 3615262909,
                success: 2684738307,
                cancelled: 7534575551,
                delivering: 2708934767,
                error: 1744457423,
                holding: 3778012603,
                toBeDelivered: 1090594663,
                waiting: 8930660849,
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
                id: '70c8bf59-fa0b-4e33-b9b1-fdbc97d2e43b',
                tenantId: '745c7c09-fc43-47ec-babf-fe3f38132041',
                tenantCode: 'flnim8iwmbqw0y2f3n2f7s5jny7t7i10c9tm78kd7vhy4sksum',
                systemId: 'b2b91cc6-7538-4e94-9054-a45adaba8699',
                systemName: 'czszidp3joy8tei3ibj3',
                executionId: '48488e33-1993-4078-9280-e670260f0b5a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 03:23:13',
                executionMonitoringStartAt: '2020-07-29 13:50:58',
                executionMonitoringEndAt: '2020-07-29 03:38:01',
                numberMax: 7405439302,
                numberDays: 7198439342,
                success: 7430917645,
                cancelled: 9126728407,
                delivering: 7953475142,
                error: 3884878274,
                holding: 9356539643,
                toBeDelivered: 9486386272,
                waiting: 7805853102,
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
                        value   : '70c8bf59-fa0b-4e33-b9b1-fdbc97d2e43b'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '70c8bf59-fa0b-4e33-b9b1-fdbc97d2e43b'));
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
            .get('/bplus-it-sappi/message-overview/70c8bf59-fa0b-4e33-b9b1-fdbc97d2e43b')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '70c8bf59-fa0b-4e33-b9b1-fdbc97d2e43b'));
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
                
                id: '0020a214-bc0c-43f7-a704-b2e17587c6f6',
                tenantId: '50fd609c-44a2-4913-8d14-16fe161158b0',
                tenantCode: '6lhfzyqv5qih0a3nux1u4xbw766xy42e14dhcoao4qboycck1i',
                systemId: '855087ec-2d43-45f7-a069-24518e7b16f8',
                systemName: '4gv88don51up8yls34or',
                executionId: '43e90726-1e53-4e32-8a5e-8cf5dc4827fc',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 20:13:24',
                executionMonitoringStartAt: '2020-07-29 03:50:54',
                executionMonitoringEndAt: '2020-07-29 02:10:13',
                numberMax: 1364350125,
                numberDays: 6995411270,
                success: 5427396747,
                cancelled: 2474193566,
                delivering: 8462442458,
                error: 6745813528,
                holding: 2855325029,
                toBeDelivered: 1553706210,
                waiting: 5307992734,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/message-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: '70c8bf59-fa0b-4e33-b9b1-fdbc97d2e43b',
                tenantId: '745c7c09-fc43-47ec-babf-fe3f38132041',
                tenantCode: '6m98t4s8blkrmpgubzubay46ydeuwmw2dxhpgckikyu6b6ve07',
                systemId: 'b2b91cc6-7538-4e94-9054-a45adaba8699',
                systemName: 'tcm327h3cqgpjjt2s1nm',
                executionId: '48488e33-1993-4078-9280-e670260f0b5a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 17:56:01',
                executionMonitoringStartAt: '2020-07-28 17:47:19',
                executionMonitoringEndAt: '2020-07-28 20:53:40',
                numberMax: 3360268359,
                numberDays: 5749292614,
                success: 5417433801,
                cancelled: 4969325526,
                delivering: 3652982886,
                error: 5258015210,
                holding: 9157421172,
                toBeDelivered: 7265383986,
                waiting: 1012089631,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '70c8bf59-fa0b-4e33-b9b1-fdbc97d2e43b'));
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
            .delete('/bplus-it-sappi/message-overview/70c8bf59-fa0b-4e33-b9b1-fdbc97d2e43b')
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
                            tenantCode
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
                            tenantCode
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
                        id: '89dec16c-a5ec-41cc-8cc9-8372f8284b80',
                        tenantId: '745c7c09-fc43-47ec-babf-fe3f38132041',
                        tenantCode: '20xz0ga0lijyoupwx4as92peitw52ha00y4f0r91cnvk45dq49',
                        systemId: 'b2b91cc6-7538-4e94-9054-a45adaba8699',
                        systemName: '8pnlpqyz3rhduivioli2',
                        executionId: '48488e33-1993-4078-9280-e670260f0b5a',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-28 21:36:33',
                        executionMonitoringStartAt: '2020-07-29 09:31:29',
                        executionMonitoringEndAt: '2020-07-28 18:13:43',
                        numberMax: 7350756403,
                        numberDays: 7662372710,
                        success: 4749683558,
                        cancelled: 9098402468,
                        delivering: 3792295202,
                        error: 1772317127,
                        holding: 5760227776,
                        toBeDelivered: 6180648096,
                        waiting: 5355178348,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateMessageOverview).toHaveProperty('id', '89dec16c-a5ec-41cc-8cc9-8372f8284b80');
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
                            tenantCode
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
                            tenantCode
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
                            value   : '70c8bf59-fa0b-4e33-b9b1-fdbc97d2e43b'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageOverview.id).toStrictEqual('70c8bf59-fa0b-4e33-b9b1-fdbc97d2e43b');
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
                            tenantCode
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
                            tenantCode
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
                    id: '70c8bf59-fa0b-4e33-b9b1-fdbc97d2e43b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageOverviewById.id).toStrictEqual('70c8bf59-fa0b-4e33-b9b1-fdbc97d2e43b');
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
                            tenantCode
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
                            tenantCode
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
                        
                        id: '3ed0e668-4442-4664-94c6-564b2169d339',
                        tenantId: '86913174-faa0-47da-a7c6-9b9c8438a824',
                        tenantCode: 'jrtqjb3bi4bbtkut5ta6ya2y9zd2bva75bmvp1c4mq40wc4yzs',
                        systemId: '047bd028-50b1-4479-8276-ecb2bf6f4634',
                        systemName: 'a8bsa2ye6c3ar01og6ph',
                        executionId: '2a236171-a884-4d0f-943d-0c8be74a50fb',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-28 22:15:47',
                        executionMonitoringStartAt: '2020-07-28 23:09:49',
                        executionMonitoringEndAt: '2020-07-28 17:48:15',
                        numberMax: 9262588734,
                        numberDays: 8313809378,
                        success: 6135793679,
                        cancelled: 3678975403,
                        delivering: 8385948589,
                        error: 4360022283,
                        holding: 5073256247,
                        toBeDelivered: 3041742656,
                        waiting: 8646737107,
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
                            tenantCode
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
                        
                        id: '70c8bf59-fa0b-4e33-b9b1-fdbc97d2e43b',
                        tenantId: '745c7c09-fc43-47ec-babf-fe3f38132041',
                        tenantCode: 'wrixuhfsovbu6xta2gkxxdinxae9tmdhu2jddr07vnfnct31ze',
                        systemId: 'b2b91cc6-7538-4e94-9054-a45adaba8699',
                        systemName: '9rkir7ld5prhipyynzec',
                        executionId: '48488e33-1993-4078-9280-e670260f0b5a',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-28 23:17:39',
                        executionMonitoringStartAt: '2020-07-28 23:41:32',
                        executionMonitoringEndAt: '2020-07-29 13:55:30',
                        numberMax: 3422151155,
                        numberDays: 5699196659,
                        success: 7857639202,
                        cancelled: 3622635058,
                        delivering: 1609230085,
                        error: 8415635802,
                        holding: 4235174967,
                        toBeDelivered: 4471553004,
                        waiting: 6687059474,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateMessageOverview.id).toStrictEqual('70c8bf59-fa0b-4e33-b9b1-fdbc97d2e43b');
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
                            tenantCode
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
                            tenantCode
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
                    id: '70c8bf59-fa0b-4e33-b9b1-fdbc97d2e43b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteMessageOverviewById.id).toStrictEqual('70c8bf59-fa0b-4e33-b9b1-fdbc97d2e43b');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});