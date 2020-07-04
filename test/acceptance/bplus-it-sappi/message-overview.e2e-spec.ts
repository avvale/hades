import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IMessageOverviewRepository } from '@hades/bplus-it-sappi/message-overview/domain/message-overview.repository';
import { MockMessageOverviewRepository } from '@hades/bplus-it-sappi/message-overview/infrastructure/mock/mock-message-overview.repository';
import { AppModule } from './../../../src/app.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';

describe('message-overview', () => 
{
    let app: INestApplication;
    let repository: MockMessageOverviewRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    AppModule,
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

    it(`/REST:POST bplus-it-sappi/message-overview - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '297b040c-aad4-48f4-972b-d3914796cea7',
                systemId: '1326b2ab-de69-4d49-9bb5-728824aaf232',
                systemName: '68rlliu9kiwx6qp4e6tg',
                executionId: '34488ceb-3d52-483b-b70f-e68595ea2f6a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-06-30 19:11:52',
                executionMonitoringStartAt: '2020-07-01 07:52:53',
                executionMonitoringEndAt: '2020-07-01 06:02:03',
                numberMax: 8236471114,
                numberDays: 5475586228,
                success: 4484828220,
                cancelled: 1926714242,
                delivering: 9523885068,
                error: 2108226240,
                holding: 7776489176,
                toBeDelivered: 3566543410,
                waiting: 3554151510,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '297b040c-aad4-48f4-972b-d3914796cea7',
                systemId: '1326b2ab-de69-4d49-9bb5-728824aaf232',
                systemName: 'nu7t00yq89le9ivic8w1',
                executionId: '34488ceb-3d52-483b-b70f-e68595ea2f6a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-01 08:01:29',
                executionMonitoringStartAt: '2020-07-01 09:16:36',
                executionMonitoringEndAt: '2020-07-01 11:18:39',
                numberMax: 6797944548,
                numberDays: 4452165845,
                success: 3954562848,
                cancelled: 5894912887,
                delivering: 4706029343,
                error: 1143049752,
                holding: 6813901500,
                toBeDelivered: 9547523627,
                waiting: 4987652894,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '8caa60e1-fbb8-49a0-9302-c41ea4bae9a8',
                tenantId: null,
                systemId: '1326b2ab-de69-4d49-9bb5-728824aaf232',
                systemName: '1d0ykjyj0h5307g74464',
                executionId: '34488ceb-3d52-483b-b70f-e68595ea2f6a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-01 04:41:09',
                executionMonitoringStartAt: '2020-07-01 02:17:29',
                executionMonitoringEndAt: '2020-07-01 14:17:48',
                numberMax: 1423671126,
                numberDays: 2368887147,
                success: 7279661422,
                cancelled: 6521825155,
                delivering: 3452966425,
                error: 5255290892,
                holding: 9903110197,
                toBeDelivered: 5596059569,
                waiting: 3190521799,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewTenantId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '8caa60e1-fbb8-49a0-9302-c41ea4bae9a8',
                
                systemId: '1326b2ab-de69-4d49-9bb5-728824aaf232',
                systemName: 'hfn5qz2ri3yzun6fx6bl',
                executionId: '34488ceb-3d52-483b-b70f-e68595ea2f6a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-01 13:40:58',
                executionMonitoringStartAt: '2020-07-01 03:10:04',
                executionMonitoringEndAt: '2020-06-30 22:03:33',
                numberMax: 6663450539,
                numberDays: 1428092012,
                success: 1372103264,
                cancelled: 4999041202,
                delivering: 9590434685,
                error: 8332097908,
                holding: 1687800246,
                toBeDelivered: 1368878059,
                waiting: 8253101030,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewTenantId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '8caa60e1-fbb8-49a0-9302-c41ea4bae9a8',
                tenantId: '297b040c-aad4-48f4-972b-d3914796cea7',
                systemId: null,
                systemName: 'jemsfp52dkixhw4uxnlu',
                executionId: '34488ceb-3d52-483b-b70f-e68595ea2f6a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-01 06:32:10',
                executionMonitoringStartAt: '2020-07-01 15:23:04',
                executionMonitoringEndAt: '2020-07-01 06:16:07',
                numberMax: 8263103076,
                numberDays: 2905799889,
                success: 3092247658,
                cancelled: 2749640763,
                delivering: 5149624613,
                error: 5462862900,
                holding: 5881946042,
                toBeDelivered: 3380139411,
                waiting: 2326680231,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSystemId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '8caa60e1-fbb8-49a0-9302-c41ea4bae9a8',
                tenantId: '297b040c-aad4-48f4-972b-d3914796cea7',
                
                systemName: '0p0joeq6v5na6h3pqfsc',
                executionId: '34488ceb-3d52-483b-b70f-e68595ea2f6a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-01 13:01:55',
                executionMonitoringStartAt: '2020-07-01 02:33:46',
                executionMonitoringEndAt: '2020-07-01 12:14:12',
                numberMax: 5058751784,
                numberDays: 5403477334,
                success: 8668252204,
                cancelled: 2658205497,
                delivering: 2153086819,
                error: 3092828397,
                holding: 9064862549,
                toBeDelivered: 2921720757,
                waiting: 7781709663,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSystemId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '8caa60e1-fbb8-49a0-9302-c41ea4bae9a8',
                tenantId: '297b040c-aad4-48f4-972b-d3914796cea7',
                systemId: '1326b2ab-de69-4d49-9bb5-728824aaf232',
                systemName: null,
                executionId: '34488ceb-3d52-483b-b70f-e68595ea2f6a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-01 15:07:27',
                executionMonitoringStartAt: '2020-07-01 13:15:04',
                executionMonitoringEndAt: '2020-06-30 18:04:52',
                numberMax: 2243168586,
                numberDays: 1697981402,
                success: 6472455638,
                cancelled: 6235620579,
                delivering: 5883749618,
                error: 5116198971,
                holding: 2891900085,
                toBeDelivered: 3014963874,
                waiting: 5584206854,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSystemName must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '8caa60e1-fbb8-49a0-9302-c41ea4bae9a8',
                tenantId: '297b040c-aad4-48f4-972b-d3914796cea7',
                systemId: '1326b2ab-de69-4d49-9bb5-728824aaf232',
                
                executionId: '34488ceb-3d52-483b-b70f-e68595ea2f6a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-06-30 17:38:21',
                executionMonitoringStartAt: '2020-07-01 13:09:04',
                executionMonitoringEndAt: '2020-07-01 15:23:40',
                numberMax: 5022820618,
                numberDays: 5217123987,
                success: 4778191139,
                cancelled: 5390149072,
                delivering: 8859424186,
                error: 5463899779,
                holding: 9632483374,
                toBeDelivered: 6837171273,
                waiting: 2413758701,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSystemName must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '8caa60e1-fbb8-49a0-9302-c41ea4bae9a8',
                tenantId: '297b040c-aad4-48f4-972b-d3914796cea7',
                systemId: '1326b2ab-de69-4d49-9bb5-728824aaf232',
                systemName: '6zawutys2gjq3vrag468',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-01 15:22:10',
                executionMonitoringStartAt: '2020-07-01 10:29:53',
                executionMonitoringEndAt: '2020-07-01 13:41:53',
                numberMax: 5584604219,
                numberDays: 6815128960,
                success: 4969196670,
                cancelled: 1959331545,
                delivering: 1536060219,
                error: 8281274932,
                holding: 8201726990,
                toBeDelivered: 8295525725,
                waiting: 3571601514,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '8caa60e1-fbb8-49a0-9302-c41ea4bae9a8',
                tenantId: '297b040c-aad4-48f4-972b-d3914796cea7',
                systemId: '1326b2ab-de69-4d49-9bb5-728824aaf232',
                systemName: 'vlxszgwncuhocgiuzqtb',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-01 15:32:32',
                executionMonitoringStartAt: '2020-07-01 10:08:25',
                executionMonitoringEndAt: '2020-06-30 22:58:15',
                numberMax: 3892401407,
                numberDays: 2631435183,
                success: 7789077598,
                cancelled: 3108401510,
                delivering: 8093550384,
                error: 9421635837,
                holding: 6615403770,
                toBeDelivered: 3471174614,
                waiting: 5387539417,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '8caa60e1-fbb8-49a0-9302-c41ea4bae9a8',
                tenantId: '297b040c-aad4-48f4-972b-d3914796cea7',
                systemId: '1326b2ab-de69-4d49-9bb5-728824aaf232',
                systemName: '54a1moo3waaultpmgq0e',
                executionId: '34488ceb-3d52-483b-b70f-e68595ea2f6a',
                executionType: null,
                executionExecutedAt: '2020-06-30 21:38:21',
                executionMonitoringStartAt: '2020-07-01 04:57:57',
                executionMonitoringEndAt: '2020-07-01 13:41:33',
                numberMax: 5806489248,
                numberDays: 8147770770,
                success: 1436899430,
                cancelled: 7698573993,
                delivering: 1448115202,
                error: 3840384255,
                holding: 9724464351,
                toBeDelivered: 9334182932,
                waiting: 4604864686,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionType must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '8caa60e1-fbb8-49a0-9302-c41ea4bae9a8',
                tenantId: '297b040c-aad4-48f4-972b-d3914796cea7',
                systemId: '1326b2ab-de69-4d49-9bb5-728824aaf232',
                systemName: 'wfawuog5ze7fn5y07344',
                executionId: '34488ceb-3d52-483b-b70f-e68595ea2f6a',
                
                executionExecutedAt: '2020-07-01 14:08:37',
                executionMonitoringStartAt: '2020-07-01 02:24:56',
                executionMonitoringEndAt: '2020-07-01 16:59:56',
                numberMax: 4011790394,
                numberDays: 7352332373,
                success: 2115772132,
                cancelled: 4646310517,
                delivering: 4414644739,
                error: 4810525593,
                holding: 1731042469,
                toBeDelivered: 2783503278,
                waiting: 1881517639,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionType must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '8caa60e1-fbb8-49a0-9302-c41ea4bae9a8',
                tenantId: '297b040c-aad4-48f4-972b-d3914796cea7',
                systemId: '1326b2ab-de69-4d49-9bb5-728824aaf232',
                systemName: '2fofkfmtlu9lcrfkhsz8',
                executionId: '34488ceb-3d52-483b-b70f-e68595ea2f6a',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-01 01:32:27',
                executionMonitoringEndAt: '2020-07-01 08:17:41',
                numberMax: 5577343942,
                numberDays: 8362169396,
                success: 3507615465,
                cancelled: 3561104903,
                delivering: 5295762073,
                error: 8734719690,
                holding: 2633678987,
                toBeDelivered: 5699396701,
                waiting: 2788130167,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionExecutedAt must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '8caa60e1-fbb8-49a0-9302-c41ea4bae9a8',
                tenantId: '297b040c-aad4-48f4-972b-d3914796cea7',
                systemId: '1326b2ab-de69-4d49-9bb5-728824aaf232',
                systemName: 't50rfqgxzwytbsin5wuv',
                executionId: '34488ceb-3d52-483b-b70f-e68595ea2f6a',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-06-30 19:14:17',
                executionMonitoringEndAt: '2020-07-01 02:03:24',
                numberMax: 6229863155,
                numberDays: 6367142652,
                success: 8120857517,
                cancelled: 9325302926,
                delivering: 9085398115,
                error: 6486027675,
                holding: 2484941212,
                toBeDelivered: 7046820400,
                waiting: 2809271910,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '8caa60e1-fbb8-49a0-9302-c41ea4bae9a8',
                tenantId: '297b040c-aad4-48f4-972b-d3914796cea7',
                systemId: '1326b2ab-de69-4d49-9bb5-728824aaf232',
                systemName: 'jn7e95wbow50k9yydvg0',
                executionId: '34488ceb-3d52-483b-b70f-e68595ea2f6a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-01 13:34:31',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-01 10:07:28',
                numberMax: 7281193951,
                numberDays: 4877879425,
                success: 8367714644,
                cancelled: 9580260633,
                delivering: 4498766503,
                error: 8230393699,
                holding: 1589878257,
                toBeDelivered: 3246783493,
                waiting: 9949628849,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '8caa60e1-fbb8-49a0-9302-c41ea4bae9a8',
                tenantId: '297b040c-aad4-48f4-972b-d3914796cea7',
                systemId: '1326b2ab-de69-4d49-9bb5-728824aaf232',
                systemName: '2rmseb35hf4go5wd9t99',
                executionId: '34488ceb-3d52-483b-b70f-e68595ea2f6a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-06-30 22:10:00',
                
                executionMonitoringEndAt: '2020-07-01 12:14:37',
                numberMax: 4524045322,
                numberDays: 5973182797,
                success: 7146679563,
                cancelled: 4204583973,
                delivering: 7607600361,
                error: 2130001498,
                holding: 7585588521,
                toBeDelivered: 5751701924,
                waiting: 1607075920,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '8caa60e1-fbb8-49a0-9302-c41ea4bae9a8',
                tenantId: '297b040c-aad4-48f4-972b-d3914796cea7',
                systemId: '1326b2ab-de69-4d49-9bb5-728824aaf232',
                systemName: '46lxax1bjzlvfjrr3ecf',
                executionId: '34488ceb-3d52-483b-b70f-e68595ea2f6a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-01 04:57:44',
                executionMonitoringStartAt: '2020-06-30 18:59:00',
                executionMonitoringEndAt: null,
                numberMax: 6329612180,
                numberDays: 1040153957,
                success: 3045839014,
                cancelled: 6636610382,
                delivering: 8870173684,
                error: 4308310233,
                holding: 9171426295,
                toBeDelivered: 4044551631,
                waiting: 1729528690,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '8caa60e1-fbb8-49a0-9302-c41ea4bae9a8',
                tenantId: '297b040c-aad4-48f4-972b-d3914796cea7',
                systemId: '1326b2ab-de69-4d49-9bb5-728824aaf232',
                systemName: 's4npp8t6rmp3gb2g64fh',
                executionId: '34488ceb-3d52-483b-b70f-e68595ea2f6a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-01 06:20:55',
                executionMonitoringStartAt: '2020-07-01 02:14:54',
                
                numberMax: 2173440806,
                numberDays: 5681809180,
                success: 8455586789,
                cancelled: 6986583653,
                delivering: 8994398010,
                error: 1255009873,
                holding: 1519133020,
                toBeDelivered: 2798736149,
                waiting: 7935461191,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'k2ksp0wysnhjmu1j57nxzvnfi1xiijahjr01c',
                tenantId: '297b040c-aad4-48f4-972b-d3914796cea7',
                systemId: '1326b2ab-de69-4d49-9bb5-728824aaf232',
                systemName: '7oef5kisbp9oshrub4f9',
                executionId: '34488ceb-3d52-483b-b70f-e68595ea2f6a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-01 06:49:09',
                executionMonitoringStartAt: '2020-07-01 13:16:06',
                executionMonitoringEndAt: '2020-06-30 19:35:51',
                numberMax: 7322280889,
                numberDays: 2450737919,
                success: 9703018855,
                cancelled: 4545972164,
                delivering: 9497068154,
                error: 9874395030,
                holding: 6970864812,
                toBeDelivered: 8235806654,
                waiting: 3666931046,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '8caa60e1-fbb8-49a0-9302-c41ea4bae9a8',
                tenantId: '0z5kr0drbjmx4r22fa87d0q2nfxeygg70zib7',
                systemId: '1326b2ab-de69-4d49-9bb5-728824aaf232',
                systemName: 'ylbchgruieay8e4zhwqy',
                executionId: '34488ceb-3d52-483b-b70f-e68595ea2f6a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-01 15:14:14',
                executionMonitoringStartAt: '2020-06-30 22:19:09',
                executionMonitoringEndAt: '2020-07-01 05:46:02',
                numberMax: 6151328721,
                numberDays: 8843772834,
                success: 2622556082,
                cancelled: 2582446904,
                delivering: 4336737613,
                error: 1961332416,
                holding: 1606744314,
                toBeDelivered: 2151054685,
                waiting: 8720569915,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewTenantId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '8caa60e1-fbb8-49a0-9302-c41ea4bae9a8',
                tenantId: '297b040c-aad4-48f4-972b-d3914796cea7',
                systemId: 'tdenzn3i23ae4zrhgejpw67ow83tqhfzx5y94',
                systemName: 'hbmsukj99gid1wmnli4h',
                executionId: '34488ceb-3d52-483b-b70f-e68595ea2f6a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-01 12:48:53',
                executionMonitoringStartAt: '2020-07-01 04:31:59',
                executionMonitoringEndAt: '2020-06-30 21:16:42',
                numberMax: 7240557788,
                numberDays: 9694686012,
                success: 5123271053,
                cancelled: 7072763863,
                delivering: 1480131843,
                error: 6338283378,
                holding: 2130516348,
                toBeDelivered: 7513401759,
                waiting: 7934099654,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSystemId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '8caa60e1-fbb8-49a0-9302-c41ea4bae9a8',
                tenantId: '297b040c-aad4-48f4-972b-d3914796cea7',
                systemId: '1326b2ab-de69-4d49-9bb5-728824aaf232',
                systemName: 'czbhdfzmd22sahkzpoha',
                executionId: 'o580maudkxsuij51bjp6ku49o64ot65p6qvn8',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-01 09:22:34',
                executionMonitoringStartAt: '2020-07-01 12:59:04',
                executionMonitoringEndAt: '2020-07-01 03:02:51',
                numberMax: 8206067886,
                numberDays: 9569642683,
                success: 2242222191,
                cancelled: 1044087857,
                delivering: 1130356354,
                error: 6332522656,
                holding: 7496425075,
                toBeDelivered: 4621920047,
                waiting: 4806837527,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionId is not allowed, must be a length of 36');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '8caa60e1-fbb8-49a0-9302-c41ea4bae9a8',
                tenantId: '297b040c-aad4-48f4-972b-d3914796cea7',
                systemId: '1326b2ab-de69-4d49-9bb5-728824aaf232',
                systemName: '03c5lsgv4qbj8bamitwbu',
                executionId: '34488ceb-3d52-483b-b70f-e68595ea2f6a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-06-30 17:46:34',
                executionMonitoringStartAt: '2020-07-01 15:23:09',
                executionMonitoringEndAt: '2020-06-30 18:28:48',
                numberMax: 4119174746,
                numberDays: 9558304383,
                success: 2163321877,
                cancelled: 4242628749,
                delivering: 5499789975,
                error: 3148522529,
                holding: 1832157883,
                toBeDelivered: 9304111686,
                waiting: 5242048329,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSystemName is too large, has a maximum length of 20');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewNumberMax is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '8caa60e1-fbb8-49a0-9302-c41ea4bae9a8',
                tenantId: '297b040c-aad4-48f4-972b-d3914796cea7',
                systemId: '1326b2ab-de69-4d49-9bb5-728824aaf232',
                systemName: 'lehxdwle2wm9yspd99eo',
                executionId: '34488ceb-3d52-483b-b70f-e68595ea2f6a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-01 00:22:53',
                executionMonitoringStartAt: '2020-06-30 22:40:17',
                executionMonitoringEndAt: '2020-07-01 03:22:41',
                numberMax: 36951931704,
                numberDays: 2560785868,
                success: 1163805865,
                cancelled: 6405988249,
                delivering: 1112830231,
                error: 6283754168,
                holding: 4963411330,
                toBeDelivered: 2481072158,
                waiting: 3609347953,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewNumberMax is too large, has a maximum length of 10');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewNumberDays is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '8caa60e1-fbb8-49a0-9302-c41ea4bae9a8',
                tenantId: '297b040c-aad4-48f4-972b-d3914796cea7',
                systemId: '1326b2ab-de69-4d49-9bb5-728824aaf232',
                systemName: 'nqicqumas8uu1lk04lcu',
                executionId: '34488ceb-3d52-483b-b70f-e68595ea2f6a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-01 10:41:01',
                executionMonitoringStartAt: '2020-06-30 19:10:54',
                executionMonitoringEndAt: '2020-07-01 02:25:51',
                numberMax: 4205896952,
                numberDays: 17487404042,
                success: 9325310639,
                cancelled: 9624299888,
                delivering: 3882271597,
                error: 6908024917,
                holding: 6531856310,
                toBeDelivered: 5587960822,
                waiting: 2261659366,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewNumberDays is too large, has a maximum length of 10');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewSuccess is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '8caa60e1-fbb8-49a0-9302-c41ea4bae9a8',
                tenantId: '297b040c-aad4-48f4-972b-d3914796cea7',
                systemId: '1326b2ab-de69-4d49-9bb5-728824aaf232',
                systemName: '11krxkn3u1xklom7uizl',
                executionId: '34488ceb-3d52-483b-b70f-e68595ea2f6a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-01 05:39:18',
                executionMonitoringStartAt: '2020-06-30 22:21:49',
                executionMonitoringEndAt: '2020-07-01 17:10:10',
                numberMax: 9364059031,
                numberDays: 5961718231,
                success: 29692044956,
                cancelled: 1887378363,
                delivering: 1564620942,
                error: 1258119776,
                holding: 9990308607,
                toBeDelivered: 6131439845,
                waiting: 3487276185,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSuccess is too large, has a maximum length of 10');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewCancelled is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '8caa60e1-fbb8-49a0-9302-c41ea4bae9a8',
                tenantId: '297b040c-aad4-48f4-972b-d3914796cea7',
                systemId: '1326b2ab-de69-4d49-9bb5-728824aaf232',
                systemName: '0h6l1urzr2ao8oy6nva1',
                executionId: '34488ceb-3d52-483b-b70f-e68595ea2f6a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-01 04:22:18',
                executionMonitoringStartAt: '2020-07-01 06:16:57',
                executionMonitoringEndAt: '2020-07-01 10:57:18',
                numberMax: 1320518622,
                numberDays: 8347237660,
                success: 9636568384,
                cancelled: 77990536915,
                delivering: 5758694454,
                error: 5769361670,
                holding: 1008208625,
                toBeDelivered: 5186150442,
                waiting: 9009191669,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewCancelled is too large, has a maximum length of 10');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewDelivering is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '8caa60e1-fbb8-49a0-9302-c41ea4bae9a8',
                tenantId: '297b040c-aad4-48f4-972b-d3914796cea7',
                systemId: '1326b2ab-de69-4d49-9bb5-728824aaf232',
                systemName: 'f5h0y07la28kgwh7a9lp',
                executionId: '34488ceb-3d52-483b-b70f-e68595ea2f6a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-01 05:23:21',
                executionMonitoringStartAt: '2020-07-01 08:32:14',
                executionMonitoringEndAt: '2020-07-01 06:00:32',
                numberMax: 3157950338,
                numberDays: 5567895098,
                success: 3653116687,
                cancelled: 1422962112,
                delivering: 70225903907,
                error: 5940814429,
                holding: 8518568874,
                toBeDelivered: 7980637231,
                waiting: 2349966913,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewDelivering is too large, has a maximum length of 10');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewError is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '8caa60e1-fbb8-49a0-9302-c41ea4bae9a8',
                tenantId: '297b040c-aad4-48f4-972b-d3914796cea7',
                systemId: '1326b2ab-de69-4d49-9bb5-728824aaf232',
                systemName: 'b6vvq5ohb1xyjmw5jhks',
                executionId: '34488ceb-3d52-483b-b70f-e68595ea2f6a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-01 12:09:46',
                executionMonitoringStartAt: '2020-06-30 21:42:12',
                executionMonitoringEndAt: '2020-07-01 07:50:20',
                numberMax: 8272183236,
                numberDays: 8410844484,
                success: 1922795397,
                cancelled: 8182327825,
                delivering: 4121835642,
                error: 10119503970,
                holding: 7313872753,
                toBeDelivered: 7812746609,
                waiting: 9191954627,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewError is too large, has a maximum length of 10');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewHolding is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '8caa60e1-fbb8-49a0-9302-c41ea4bae9a8',
                tenantId: '297b040c-aad4-48f4-972b-d3914796cea7',
                systemId: '1326b2ab-de69-4d49-9bb5-728824aaf232',
                systemName: 'aoc8gi0wm34pu2dbtjcs',
                executionId: '34488ceb-3d52-483b-b70f-e68595ea2f6a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-01 14:29:44',
                executionMonitoringStartAt: '2020-06-30 18:56:07',
                executionMonitoringEndAt: '2020-07-01 12:40:02',
                numberMax: 5008984311,
                numberDays: 8750669574,
                success: 1967575856,
                cancelled: 2475489390,
                delivering: 2481020423,
                error: 7420610490,
                holding: 73808028386,
                toBeDelivered: 2606461149,
                waiting: 1481206156,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewHolding is too large, has a maximum length of 10');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewToBeDelivered is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '8caa60e1-fbb8-49a0-9302-c41ea4bae9a8',
                tenantId: '297b040c-aad4-48f4-972b-d3914796cea7',
                systemId: '1326b2ab-de69-4d49-9bb5-728824aaf232',
                systemName: 'xirzuwotk2czgbqotk9u',
                executionId: '34488ceb-3d52-483b-b70f-e68595ea2f6a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-01 09:13:59',
                executionMonitoringStartAt: '2020-06-30 21:32:58',
                executionMonitoringEndAt: '2020-07-01 13:03:22',
                numberMax: 8137786065,
                numberDays: 1612930568,
                success: 7580298152,
                cancelled: 4313582055,
                delivering: 8526234819,
                error: 5047151918,
                holding: 7897501951,
                toBeDelivered: 30451467297,
                waiting: 4684416395,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewToBeDelivered is too large, has a maximum length of 10');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewWaiting is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '8caa60e1-fbb8-49a0-9302-c41ea4bae9a8',
                tenantId: '297b040c-aad4-48f4-972b-d3914796cea7',
                systemId: '1326b2ab-de69-4d49-9bb5-728824aaf232',
                systemName: 'gih5vk72dd5eh94s6s5g',
                executionId: '34488ceb-3d52-483b-b70f-e68595ea2f6a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-01 03:55:01',
                executionMonitoringStartAt: '2020-07-01 16:29:43',
                executionMonitoringEndAt: '2020-07-01 04:40:52',
                numberMax: 3383784411,
                numberDays: 1718720331,
                success: 3126197073,
                cancelled: 5028810159,
                delivering: 1184562070,
                error: 5473805611,
                holding: 2142546336,
                toBeDelivered: 2111886695,
                waiting: 40626195513,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewWaiting is too large, has a maximum length of 10');
            });
    });
    

    

    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewNumberMax has to be a integer value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '8caa60e1-fbb8-49a0-9302-c41ea4bae9a8',
                tenantId: '297b040c-aad4-48f4-972b-d3914796cea7',
                systemId: '1326b2ab-de69-4d49-9bb5-728824aaf232',
                systemName: 'w1vsods0kuhbr22mgp9r',
                executionId: '34488ceb-3d52-483b-b70f-e68595ea2f6a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-01 04:58:50',
                executionMonitoringStartAt: '2020-07-01 12:31:32',
                executionMonitoringEndAt: '2020-07-01 13:58:15',
                numberMax: 100.10,
                numberDays: 5712145239,
                success: 9575212996,
                cancelled: 9106687822,
                delivering: 7015219295,
                error: 3758620292,
                holding: 5519806107,
                toBeDelivered: 6122027457,
                waiting: 6666993265,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewNumberMax has to be a integer value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewNumberDays has to be a integer value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '8caa60e1-fbb8-49a0-9302-c41ea4bae9a8',
                tenantId: '297b040c-aad4-48f4-972b-d3914796cea7',
                systemId: '1326b2ab-de69-4d49-9bb5-728824aaf232',
                systemName: '38cqs5tz9umagcon242i',
                executionId: '34488ceb-3d52-483b-b70f-e68595ea2f6a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-01 04:29:39',
                executionMonitoringStartAt: '2020-06-30 18:53:28',
                executionMonitoringEndAt: '2020-07-01 16:00:13',
                numberMax: 4538738710,
                numberDays: 100.10,
                success: 5523966482,
                cancelled: 9591954620,
                delivering: 6736569345,
                error: 9714680317,
                holding: 8854590076,
                toBeDelivered: 3926565278,
                waiting: 8827102601,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewNumberDays has to be a integer value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewSuccess has to be a integer value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '8caa60e1-fbb8-49a0-9302-c41ea4bae9a8',
                tenantId: '297b040c-aad4-48f4-972b-d3914796cea7',
                systemId: '1326b2ab-de69-4d49-9bb5-728824aaf232',
                systemName: 'ssuku4zzw7a7pvuy69zk',
                executionId: '34488ceb-3d52-483b-b70f-e68595ea2f6a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-06-30 23:03:41',
                executionMonitoringStartAt: '2020-07-01 13:22:55',
                executionMonitoringEndAt: '2020-07-01 15:39:01',
                numberMax: 4973000529,
                numberDays: 7309440400,
                success: 100.10,
                cancelled: 2442017688,
                delivering: 6686492406,
                error: 4384996963,
                holding: 5501938957,
                toBeDelivered: 7505076126,
                waiting: 4280084527,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSuccess has to be a integer value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewCancelled has to be a integer value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '8caa60e1-fbb8-49a0-9302-c41ea4bae9a8',
                tenantId: '297b040c-aad4-48f4-972b-d3914796cea7',
                systemId: '1326b2ab-de69-4d49-9bb5-728824aaf232',
                systemName: '21tffdaa19ttgdb6xmt4',
                executionId: '34488ceb-3d52-483b-b70f-e68595ea2f6a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-01 05:39:19',
                executionMonitoringStartAt: '2020-07-01 11:41:25',
                executionMonitoringEndAt: '2020-07-01 15:34:53',
                numberMax: 4544995187,
                numberDays: 7030106870,
                success: 9666794062,
                cancelled: 100.10,
                delivering: 8233518043,
                error: 5499483307,
                holding: 5322707296,
                toBeDelivered: 4069518553,
                waiting: 2386876881,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewCancelled has to be a integer value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewDelivering has to be a integer value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '8caa60e1-fbb8-49a0-9302-c41ea4bae9a8',
                tenantId: '297b040c-aad4-48f4-972b-d3914796cea7',
                systemId: '1326b2ab-de69-4d49-9bb5-728824aaf232',
                systemName: 'nk8degod1xcop05hox0g',
                executionId: '34488ceb-3d52-483b-b70f-e68595ea2f6a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-01 12:53:00',
                executionMonitoringStartAt: '2020-07-01 16:50:35',
                executionMonitoringEndAt: '2020-07-01 14:18:53',
                numberMax: 6678445134,
                numberDays: 8929363445,
                success: 6875156143,
                cancelled: 8530631178,
                delivering: 100.10,
                error: 2402118300,
                holding: 2705195995,
                toBeDelivered: 7714376401,
                waiting: 3261789723,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewDelivering has to be a integer value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewError has to be a integer value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '8caa60e1-fbb8-49a0-9302-c41ea4bae9a8',
                tenantId: '297b040c-aad4-48f4-972b-d3914796cea7',
                systemId: '1326b2ab-de69-4d49-9bb5-728824aaf232',
                systemName: 'aufpwfl4dqkspjp1l6cb',
                executionId: '34488ceb-3d52-483b-b70f-e68595ea2f6a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-06-30 18:53:04',
                executionMonitoringStartAt: '2020-07-01 00:25:43',
                executionMonitoringEndAt: '2020-07-01 10:09:56',
                numberMax: 6343920075,
                numberDays: 9129242965,
                success: 8995005903,
                cancelled: 1046039639,
                delivering: 5879088091,
                error: 100.10,
                holding: 5602609529,
                toBeDelivered: 8444662243,
                waiting: 5132374457,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewError has to be a integer value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewHolding has to be a integer value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '8caa60e1-fbb8-49a0-9302-c41ea4bae9a8',
                tenantId: '297b040c-aad4-48f4-972b-d3914796cea7',
                systemId: '1326b2ab-de69-4d49-9bb5-728824aaf232',
                systemName: '355ribthge7iulzz1vf4',
                executionId: '34488ceb-3d52-483b-b70f-e68595ea2f6a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-01 12:39:15',
                executionMonitoringStartAt: '2020-07-01 11:50:40',
                executionMonitoringEndAt: '2020-06-30 19:27:40',
                numberMax: 5852621309,
                numberDays: 7892060896,
                success: 4997292080,
                cancelled: 9738480002,
                delivering: 2896777933,
                error: 6296826453,
                holding: 100.10,
                toBeDelivered: 1073292016,
                waiting: 7918669807,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewHolding has to be a integer value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewToBeDelivered has to be a integer value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '8caa60e1-fbb8-49a0-9302-c41ea4bae9a8',
                tenantId: '297b040c-aad4-48f4-972b-d3914796cea7',
                systemId: '1326b2ab-de69-4d49-9bb5-728824aaf232',
                systemName: 'pso74ncrpy3g7yqlkzfn',
                executionId: '34488ceb-3d52-483b-b70f-e68595ea2f6a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-01 03:03:04',
                executionMonitoringStartAt: '2020-07-01 04:24:23',
                executionMonitoringEndAt: '2020-07-01 02:09:52',
                numberMax: 9390680098,
                numberDays: 6009067030,
                success: 9093179150,
                cancelled: 2632126150,
                delivering: 7020211531,
                error: 3916414455,
                holding: 3653879980,
                toBeDelivered: 100.10,
                waiting: 2565807029,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewToBeDelivered has to be a integer value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewWaiting has to be a integer value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '8caa60e1-fbb8-49a0-9302-c41ea4bae9a8',
                tenantId: '297b040c-aad4-48f4-972b-d3914796cea7',
                systemId: '1326b2ab-de69-4d49-9bb5-728824aaf232',
                systemName: 'hir04jzou1b8uz33yshf',
                executionId: '34488ceb-3d52-483b-b70f-e68595ea2f6a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-01 12:48:08',
                executionMonitoringStartAt: '2020-07-01 11:02:03',
                executionMonitoringEndAt: '2020-07-01 13:41:56',
                numberMax: 4017252998,
                numberDays: 7389777227,
                success: 6366391742,
                cancelled: 1411776149,
                delivering: 6970327082,
                error: 2475885316,
                holding: 9821104715,
                toBeDelivered: 8455573281,
                waiting: 100.10,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewWaiting has to be a integer value');
            });
    });
    

    

    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '8caa60e1-fbb8-49a0-9302-c41ea4bae9a8',
                tenantId: '297b040c-aad4-48f4-972b-d3914796cea7',
                systemId: '1326b2ab-de69-4d49-9bb5-728824aaf232',
                systemName: '4kzegx9pp83cjx4orr4v',
                executionId: '34488ceb-3d52-483b-b70f-e68595ea2f6a',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-01 02:23:11',
                executionMonitoringStartAt: '2020-06-30 18:08:19',
                executionMonitoringEndAt: '2020-06-30 17:37:50',
                numberMax: 8195309938,
                numberDays: 4635611137,
                success: 3687319936,
                cancelled: 5570675530,
                delivering: 7084497226,
                error: 2626521527,
                holding: 1618545615,
                toBeDelivered: 3658321774,
                waiting: 6808773623,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '8caa60e1-fbb8-49a0-9302-c41ea4bae9a8',
                tenantId: '297b040c-aad4-48f4-972b-d3914796cea7',
                systemId: '1326b2ab-de69-4d49-9bb5-728824aaf232',
                systemName: '9keqvmhmlwodahcgvugd',
                executionId: '34488ceb-3d52-483b-b70f-e68595ea2f6a',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-06-30 17:51:15',
                executionMonitoringEndAt: '2020-06-30 22:43:01',
                numberMax: 5779256567,
                numberDays: 5527463891,
                success: 7773527518,
                cancelled: 2541562735,
                delivering: 3643751365,
                error: 3746728943,
                holding: 4767206789,
                toBeDelivered: 3378429779,
                waiting: 5033088154,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionExecutedAt has to be a timestamp value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionMonitoringStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '8caa60e1-fbb8-49a0-9302-c41ea4bae9a8',
                tenantId: '297b040c-aad4-48f4-972b-d3914796cea7',
                systemId: '1326b2ab-de69-4d49-9bb5-728824aaf232',
                systemName: 'tgwu8k2j7otug0hrmw31',
                executionId: '34488ceb-3d52-483b-b70f-e68595ea2f6a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-01 04:53:28',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-01 14:39:27',
                numberMax: 7500051856,
                numberDays: 8359020083,
                success: 4194639464,
                cancelled: 5985829561,
                delivering: 8045412482,
                error: 9144575864,
                holding: 4193036475,
                toBeDelivered: 7176966168,
                waiting: 5072612951,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionMonitoringEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '8caa60e1-fbb8-49a0-9302-c41ea4bae9a8',
                tenantId: '297b040c-aad4-48f4-972b-d3914796cea7',
                systemId: '1326b2ab-de69-4d49-9bb5-728824aaf232',
                systemName: 's65gizg70f3y8lxau3h8',
                executionId: '34488ceb-3d52-483b-b70f-e68595ea2f6a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-01 17:14:30',
                executionMonitoringStartAt: '2020-07-01 13:42:34',
                executionMonitoringEndAt: 'XXXXXXXX',
                numberMax: 8487087352,
                numberDays: 1800358807,
                success: 4661233495,
                cancelled: 4840485684,
                delivering: 9407151305,
                error: 6037461112,
                holding: 8070789904,
                toBeDelivered: 7892792659,
                waiting: 1666667224,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    

    it(`/REST:POST bplus-it-sappi/message-overview`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '8caa60e1-fbb8-49a0-9302-c41ea4bae9a8',
                tenantId: '297b040c-aad4-48f4-972b-d3914796cea7',
                systemId: '1326b2ab-de69-4d49-9bb5-728824aaf232',
                systemName: '4a5uxvdite2yq3jfp3ut',
                executionId: '34488ceb-3d52-483b-b70f-e68595ea2f6a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-06-30 18:39:57',
                executionMonitoringStartAt: '2020-06-30 22:40:05',
                executionMonitoringEndAt: '2020-06-30 23:04:25',
                numberMax: 1071308659,
                numberDays: 1665963727,
                success: 4656060932,
                cancelled: 4178284808,
                delivering: 9196457416,
                error: 4056250816,
                holding: 6931041945,
                toBeDelivered: 5340098828,
                waiting: 6573486798,
            })
            .expect(201);
    });

    it(`/REST:GET bplus-it-sappi/messages-overview/paginate`, () => 
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

    it(`/REST:GET bplus-it-sappi/message-overview - Got 404 Not Found`, () => 
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

    it(`/REST:GET bplus-it-sappi/message-overview`, () => 
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
                        value   : '8caa60e1-fbb8-49a0-9302-c41ea4bae9a8'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '8caa60e1-fbb8-49a0-9302-c41ea4bae9a8'));
    });

    it(`/REST:GET bplus-it-sappi/message-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-overview/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:GET bplus-it-sappi/message-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-overview/8caa60e1-fbb8-49a0-9302-c41ea4bae9a8')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '8caa60e1-fbb8-49a0-9302-c41ea4bae9a8'));
    });

    it(`/REST:GET bplus-it-sappi/messages-overview`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/messages-overview')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    it(`/REST:PUT bplus-it-sappi/message-overview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: 'be35e8ae-8065-4e4b-937d-2b2b921ff2f9',
                tenantId: '568e72d4-eb40-40f2-8f15-85f6438d49c7',
                systemId: 'eb789d73-98ca-4f28-9d1c-62c15df84459',
                systemName: '8oy365memc51dzanaoj7',
                executionId: '130d3b5c-c570-4bfb-abaf-4ab9fa3452bf',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-01 03:37:23',
                executionMonitoringStartAt: '2020-07-01 17:05:41',
                executionMonitoringEndAt: '2020-06-30 21:12:38',
                numberMax: 4474083473,
                numberDays: 9207549426,
                success: 1908304003,
                cancelled: 2914261488,
                delivering: 7472974290,
                error: 4825919736,
                holding: 8505535501,
                toBeDelivered: 3929962061,
                waiting: 6189825583,
            })
            .expect(404);
    });

    it(`/REST:PUT bplus-it-sappi/message-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: '8caa60e1-fbb8-49a0-9302-c41ea4bae9a8',
                tenantId: '297b040c-aad4-48f4-972b-d3914796cea7',
                systemId: '1326b2ab-de69-4d49-9bb5-728824aaf232',
                systemName: '4juxtuwuec38a1ja4xrv',
                executionId: '34488ceb-3d52-483b-b70f-e68595ea2f6a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-01 15:36:16',
                executionMonitoringStartAt: '2020-06-30 19:29:02',
                executionMonitoringEndAt: '2020-07-01 13:59:13',
                numberMax: 4116898030,
                numberDays: 6483687901,
                success: 4216343148,
                cancelled: 3580034711,
                delivering: 1002628640,
                error: 5427906765,
                holding: 8545256382,
                toBeDelivered: 5903623188,
                waiting: 7283250576,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '8caa60e1-fbb8-49a0-9302-c41ea4bae9a8'));
    });

    it(`/REST:DELETE bplus-it-sappi/message-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/message-overview/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:DELETE bplus-it-sappi/message-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/message-overview/8caa60e1-fbb8-49a0-9302-c41ea4bae9a8')
            .set('Accept', 'application/json')
            .expect(200);
    });

    it(`/GraphQL bplusItSappiCreateMessageOverview - Got 409 Conflict, item already exist in database`, () => 
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

    it(`/GraphQL bplusItSappiCreateMessageOverview`, () => 
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
                        id: 'd23bb240-762d-4b4b-9ad2-fdbb6248349c',
                        tenantId: '297b040c-aad4-48f4-972b-d3914796cea7',
                        systemId: '1326b2ab-de69-4d49-9bb5-728824aaf232',
                        systemName: 'qzahy72i865u6fd4fsn2',
                        executionId: '34488ceb-3d52-483b-b70f-e68595ea2f6a',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-01 10:13:30',
                        executionMonitoringStartAt: '2020-07-01 04:02:00',
                        executionMonitoringEndAt: '2020-07-01 03:53:15',
                        numberMax: 2212461030,
                        numberDays: 6554449268,
                        success: 1876411394,
                        cancelled: 2207409941,
                        delivering: 7686361163,
                        error: 6000434422,
                        holding: 4477958669,
                        toBeDelivered: 8343275715,
                        waiting: 6249053105,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateMessageOverview).toHaveProperty('id', 'd23bb240-762d-4b4b-9ad2-fdbb6248349c');
            });
    });

    it(`/GraphQL bplusItSappiPaginateMessagesOverview`, () => 
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

    it(`/GraphQL bplusItSappiFindMessageOverview - Got 404 Not Found`, () => 
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

    it(`/GraphQL bplusItSappiFindMessageOverview`, () => 
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
                            value   : '8caa60e1-fbb8-49a0-9302-c41ea4bae9a8'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageOverview.id).toStrictEqual('8caa60e1-fbb8-49a0-9302-c41ea4bae9a8');
            });
    });

    it(`/GraphQL bplusItSappiFindMessageOverviewById - Got 404 Not Found`, () => 
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

    it(`/GraphQL bplusItSappiFindMessageOverviewById`, () => 
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
                    id: '8caa60e1-fbb8-49a0-9302-c41ea4bae9a8'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageOverviewById.id).toStrictEqual('8caa60e1-fbb8-49a0-9302-c41ea4bae9a8');
            });
    });

    it(`/GraphQL bplusItSappiGetMessagesOverview`, () => 
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

    it(`/GraphQL bplusItSappiUpdateMessageOverview - Got 404 Not Found`, () => 
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
                        
                        id: 'a50d553f-1446-4e78-a916-ed23ebe0ef7b',
                        tenantId: '06aeaf9e-1df4-4e0b-ba08-3af491a06211',
                        systemId: 'f6d6f9ea-5969-408b-bc52-4a9b0e927651',
                        systemName: 'cu4jps6fgett32owziil',
                        executionId: 'ed0f1efa-5e3b-40be-9b09-6799114200fe',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-01 02:14:15',
                        executionMonitoringStartAt: '2020-06-30 23:48:41',
                        executionMonitoringEndAt: '2020-06-30 18:21:05',
                        numberMax: 3754483970,
                        numberDays: 3714642009,
                        success: 2425636397,
                        cancelled: 9722326035,
                        delivering: 8384500150,
                        error: 9375694560,
                        holding: 3317194572,
                        toBeDelivered: 4871078749,
                        waiting: 1385923613,
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

    it(`/GraphQL bplusItSappiUpdateMessageOverview`, () => 
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
                        
                        id: '8caa60e1-fbb8-49a0-9302-c41ea4bae9a8',
                        tenantId: '297b040c-aad4-48f4-972b-d3914796cea7',
                        systemId: '1326b2ab-de69-4d49-9bb5-728824aaf232',
                        systemName: 'mneli9a0ggnktcmyt45f',
                        executionId: '34488ceb-3d52-483b-b70f-e68595ea2f6a',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-06-30 21:03:27',
                        executionMonitoringStartAt: '2020-07-01 08:14:31',
                        executionMonitoringEndAt: '2020-07-01 01:33:51',
                        numberMax: 1159430630,
                        numberDays: 9787874665,
                        success: 5594283333,
                        cancelled: 3636840268,
                        delivering: 1290841855,
                        error: 2266627796,
                        holding: 9594011978,
                        toBeDelivered: 4941567437,
                        waiting: 8673318647,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateMessageOverview.id).toStrictEqual('8caa60e1-fbb8-49a0-9302-c41ea4bae9a8');
            });
    });

    it(`/GraphQL bplusItSappiDeleteMessageOverviewById - Got 404 Not Found`, () => 
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

    it(`/GraphQL bplusItSappiDeleteMessageOverviewById`, () => 
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
                    id: '8caa60e1-fbb8-49a0-9302-c41ea4bae9a8'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteMessageOverviewById.id).toStrictEqual('8caa60e1-fbb8-49a0-9302-c41ea4bae9a8');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});