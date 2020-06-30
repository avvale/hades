import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { IJobOverviewRepository } from '@hades/bplus-it-sappi/job-overview/domain/job-overview.repository';
import { MockJobOverviewRepository } from '@hades/bplus-it-sappi/job-overview/infrastructure/mock/mock-job-overview.repository';
import { AppModule } from './../../../src/app.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { config } from 'process';

describe('job-overview', () => 
{
    let app: INestApplication;
    let repository: MockJobOverviewRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [AppModule]
            })
            .overrideProvider(IJobOverviewRepository)
            .useClass(MockJobOverviewRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockJobOverviewRepository>module.get<IJobOverviewRepository>(IJobOverviewRepository);

        await app.init();
    });

    it(`/REST:POST bplus-it-sappi/job-overview - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: 'b6372430-2806-4225-9c30-275012460f21',
                systemId: '476318f0-9577-4fa9-bfd7-9f5133c6dc8d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-06-30 16:31:13',
                executionMonitoringStartAt: '2020-06-30 01:05:19',
                executionMonitoringEndAt: '2020-06-30 09:22:43',
                cancelled: 3151406587,
                completed: 8422307947,
                error: 2911172209,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: 'b6372430-2806-4225-9c30-275012460f21',
                systemId: '476318f0-9577-4fa9-bfd7-9f5133c6dc8d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-06-30 17:39:43',
                executionMonitoringStartAt: '2020-06-30 00:54:30',
                executionMonitoringEndAt: '2020-07-01 00:41:37',
                cancelled: 2904841090,
                completed: 8430864892,
                error: 5284631882,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a89cd7f7-6d71-4275-81bf-b7372ac67357',
                tenantId: null,
                systemId: '476318f0-9577-4fa9-bfd7-9f5133c6dc8d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-06-30 03:18:01',
                executionMonitoringStartAt: '2020-06-30 19:12:42',
                executionMonitoringEndAt: '2020-06-30 09:34:44',
                cancelled: 8056598753,
                completed: 8126933530,
                error: 7133407768,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewTenantId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a89cd7f7-6d71-4275-81bf-b7372ac67357',
                
                systemId: '476318f0-9577-4fa9-bfd7-9f5133c6dc8d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-06-30 21:02:21',
                executionMonitoringStartAt: '2020-06-30 20:12:09',
                executionMonitoringEndAt: '2020-06-30 14:51:35',
                cancelled: 4156960863,
                completed: 3038075627,
                error: 5884227329,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewTenantId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a89cd7f7-6d71-4275-81bf-b7372ac67357',
                tenantId: 'b6372430-2806-4225-9c30-275012460f21',
                systemId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-06-30 01:06:44',
                executionMonitoringStartAt: '2020-06-30 15:02:08',
                executionMonitoringEndAt: '2020-06-30 07:02:38',
                cancelled: 9800053628,
                completed: 2387704586,
                error: 8851014876,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewSystemId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a89cd7f7-6d71-4275-81bf-b7372ac67357',
                tenantId: 'b6372430-2806-4225-9c30-275012460f21',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-06-30 08:50:59',
                executionMonitoringStartAt: '2020-06-30 18:19:16',
                executionMonitoringEndAt: '2020-06-30 04:11:15',
                cancelled: 7035565883,
                completed: 3643357760,
                error: 5780925270,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewSystemId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a89cd7f7-6d71-4275-81bf-b7372ac67357',
                tenantId: 'b6372430-2806-4225-9c30-275012460f21',
                systemId: '476318f0-9577-4fa9-bfd7-9f5133c6dc8d',
                executionType: null,
                executionExecutedAt: '2020-06-30 18:08:25',
                executionMonitoringStartAt: '2020-06-30 10:30:45',
                executionMonitoringEndAt: '2020-06-30 01:17:10',
                cancelled: 8531287080,
                completed: 6517630702,
                error: 4538634577,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionType must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a89cd7f7-6d71-4275-81bf-b7372ac67357',
                tenantId: 'b6372430-2806-4225-9c30-275012460f21',
                systemId: '476318f0-9577-4fa9-bfd7-9f5133c6dc8d',
                
                executionExecutedAt: '2020-07-01 00:50:57',
                executionMonitoringStartAt: '2020-06-30 04:26:20',
                executionMonitoringEndAt: '2020-06-30 16:16:43',
                cancelled: 5326238008,
                completed: 6142296239,
                error: 7509413780,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionType must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a89cd7f7-6d71-4275-81bf-b7372ac67357',
                tenantId: 'b6372430-2806-4225-9c30-275012460f21',
                systemId: '476318f0-9577-4fa9-bfd7-9f5133c6dc8d',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-06-30 17:52:26',
                executionMonitoringEndAt: '2020-06-30 19:38:44',
                cancelled: 4526033041,
                completed: 3022711781,
                error: 5936050150,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionExecutedAt must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a89cd7f7-6d71-4275-81bf-b7372ac67357',
                tenantId: 'b6372430-2806-4225-9c30-275012460f21',
                systemId: '476318f0-9577-4fa9-bfd7-9f5133c6dc8d',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-06-30 03:56:11',
                executionMonitoringEndAt: '2020-06-30 04:59:04',
                cancelled: 7408908109,
                completed: 7012693797,
                error: 9030989849,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a89cd7f7-6d71-4275-81bf-b7372ac67357',
                tenantId: 'b6372430-2806-4225-9c30-275012460f21',
                systemId: '476318f0-9577-4fa9-bfd7-9f5133c6dc8d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-06-30 20:37:17',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-06-30 20:14:58',
                cancelled: 6881892833,
                completed: 2593324944,
                error: 6864207332,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a89cd7f7-6d71-4275-81bf-b7372ac67357',
                tenantId: 'b6372430-2806-4225-9c30-275012460f21',
                systemId: '476318f0-9577-4fa9-bfd7-9f5133c6dc8d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-06-30 09:29:30',
                
                executionMonitoringEndAt: '2020-06-30 08:16:29',
                cancelled: 9601071571,
                completed: 2767345238,
                error: 1692882352,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a89cd7f7-6d71-4275-81bf-b7372ac67357',
                tenantId: 'b6372430-2806-4225-9c30-275012460f21',
                systemId: '476318f0-9577-4fa9-bfd7-9f5133c6dc8d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-06-30 11:47:06',
                executionMonitoringStartAt: '2020-06-30 15:19:33',
                executionMonitoringEndAt: null,
                cancelled: 1248456482,
                completed: 7640729248,
                error: 4884136701,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a89cd7f7-6d71-4275-81bf-b7372ac67357',
                tenantId: 'b6372430-2806-4225-9c30-275012460f21',
                systemId: '476318f0-9577-4fa9-bfd7-9f5133c6dc8d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-06-30 12:32:04',
                executionMonitoringStartAt: '2020-06-30 14:24:07',
                
                cancelled: 2893565445,
                completed: 2533188241,
                error: 6772595194,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '5yo6yfivn94dzqnwjqyxtuq29lvpvokwrsv7o',
                tenantId: 'b6372430-2806-4225-9c30-275012460f21',
                systemId: '476318f0-9577-4fa9-bfd7-9f5133c6dc8d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-06-30 03:33:34',
                executionMonitoringStartAt: '2020-06-30 03:32:10',
                executionMonitoringEndAt: '2020-06-30 21:35:37',
                cancelled: 2144012688,
                completed: 1286969442,
                error: 8921858138,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a89cd7f7-6d71-4275-81bf-b7372ac67357',
                tenantId: 'ji5hd0ej81jpz515oq07i3nzuyq9ny7gsyw3z',
                systemId: '476318f0-9577-4fa9-bfd7-9f5133c6dc8d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-06-30 17:56:25',
                executionMonitoringStartAt: '2020-06-30 12:42:54',
                executionMonitoringEndAt: '2020-06-30 13:48:41',
                cancelled: 9706051278,
                completed: 2676749383,
                error: 6904084864,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewTenantId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a89cd7f7-6d71-4275-81bf-b7372ac67357',
                tenantId: 'b6372430-2806-4225-9c30-275012460f21',
                systemId: 't31r0zipm2ys2odridtfaiwcxfxxfy5ff2gqv',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-06-30 13:41:04',
                executionMonitoringStartAt: '2020-07-01 00:30:00',
                executionMonitoringEndAt: '2020-06-30 09:07:11',
                cancelled: 2318089874,
                completed: 1399541872,
                error: 1341921751,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewSystemId is not allowed, must be a length of 36');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewCancelled is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a89cd7f7-6d71-4275-81bf-b7372ac67357',
                tenantId: 'b6372430-2806-4225-9c30-275012460f21',
                systemId: '476318f0-9577-4fa9-bfd7-9f5133c6dc8d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-06-30 16:06:08',
                executionMonitoringStartAt: '2020-06-30 01:12:55',
                executionMonitoringEndAt: '2020-06-30 10:17:18',
                cancelled: 73157118057,
                completed: 4137456352,
                error: 2314871956,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewCancelled is too large, has a maximum length of 10');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewCompleted is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a89cd7f7-6d71-4275-81bf-b7372ac67357',
                tenantId: 'b6372430-2806-4225-9c30-275012460f21',
                systemId: '476318f0-9577-4fa9-bfd7-9f5133c6dc8d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-06-30 08:01:45',
                executionMonitoringStartAt: '2020-06-30 17:29:30',
                executionMonitoringEndAt: '2020-06-30 15:41:09',
                cancelled: 1164356439,
                completed: 21492571423,
                error: 3090842716,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewCompleted is too large, has a maximum length of 10');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewError is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a89cd7f7-6d71-4275-81bf-b7372ac67357',
                tenantId: 'b6372430-2806-4225-9c30-275012460f21',
                systemId: '476318f0-9577-4fa9-bfd7-9f5133c6dc8d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-06-30 04:50:36',
                executionMonitoringStartAt: '2020-06-30 07:43:38',
                executionMonitoringEndAt: '2020-06-30 21:53:03',
                cancelled: 9688619442,
                completed: 9703304061,
                error: 76065460315,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewError is too large, has a maximum length of 10');
            });
    });
    

    

    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewCancelled has to be a integer value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a89cd7f7-6d71-4275-81bf-b7372ac67357',
                tenantId: 'b6372430-2806-4225-9c30-275012460f21',
                systemId: '476318f0-9577-4fa9-bfd7-9f5133c6dc8d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-06-30 14:11:06',
                executionMonitoringStartAt: '2020-06-30 20:37:32',
                executionMonitoringEndAt: '2020-06-30 01:33:06',
                cancelled: 100.10,
                completed: 6208308225,
                error: 3328717961,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewCancelled has to be a integer value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewCompleted has to be a integer value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a89cd7f7-6d71-4275-81bf-b7372ac67357',
                tenantId: 'b6372430-2806-4225-9c30-275012460f21',
                systemId: '476318f0-9577-4fa9-bfd7-9f5133c6dc8d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-06-30 13:02:21',
                executionMonitoringStartAt: '2020-07-01 00:29:46',
                executionMonitoringEndAt: '2020-06-30 15:43:21',
                cancelled: 4986556800,
                completed: 100.10,
                error: 1762624427,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewCompleted has to be a integer value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewError has to be a integer value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a89cd7f7-6d71-4275-81bf-b7372ac67357',
                tenantId: 'b6372430-2806-4225-9c30-275012460f21',
                systemId: '476318f0-9577-4fa9-bfd7-9f5133c6dc8d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-06-30 20:32:42',
                executionMonitoringStartAt: '2020-06-30 13:16:46',
                executionMonitoringEndAt: '2020-06-30 20:07:34',
                cancelled: 2939450283,
                completed: 6689278879,
                error: 100.10,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewError has to be a integer value');
            });
    });
    

    

    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a89cd7f7-6d71-4275-81bf-b7372ac67357',
                tenantId: 'b6372430-2806-4225-9c30-275012460f21',
                systemId: '476318f0-9577-4fa9-bfd7-9f5133c6dc8d',
                executionType: 'XXXX',
                executionExecutedAt: '2020-06-30 13:40:06',
                executionMonitoringStartAt: '2020-06-30 06:58:50',
                executionMonitoringEndAt: '2020-06-30 15:03:42',
                cancelled: 6712810187,
                completed: 9830455387,
                error: 5623008042,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a89cd7f7-6d71-4275-81bf-b7372ac67357',
                tenantId: 'b6372430-2806-4225-9c30-275012460f21',
                systemId: '476318f0-9577-4fa9-bfd7-9f5133c6dc8d',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-06-30 21:52:01',
                executionMonitoringEndAt: '2020-06-30 09:02:15',
                cancelled: 5996536921,
                completed: 4167322442,
                error: 3092210258,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionExecutedAt has to be a timestamp value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionMonitoringStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a89cd7f7-6d71-4275-81bf-b7372ac67357',
                tenantId: 'b6372430-2806-4225-9c30-275012460f21',
                systemId: '476318f0-9577-4fa9-bfd7-9f5133c6dc8d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-06-30 10:59:24',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-06-30 09:09:18',
                cancelled: 1808815809,
                completed: 6721614552,
                error: 4707211295,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionMonitoringEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a89cd7f7-6d71-4275-81bf-b7372ac67357',
                tenantId: 'b6372430-2806-4225-9c30-275012460f21',
                systemId: '476318f0-9577-4fa9-bfd7-9f5133c6dc8d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-06-30 16:44:01',
                executionMonitoringStartAt: '2020-06-30 03:48:12',
                executionMonitoringEndAt: 'XXXXXXXX',
                cancelled: 6389540318,
                completed: 4510826624,
                error: 6963138440,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    

    it(`/REST:POST bplus-it-sappi/job-overview`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a89cd7f7-6d71-4275-81bf-b7372ac67357',
                tenantId: 'b6372430-2806-4225-9c30-275012460f21',
                systemId: '476318f0-9577-4fa9-bfd7-9f5133c6dc8d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-06-30 19:34:33',
                executionMonitoringStartAt: '2020-06-30 23:13:42',
                executionMonitoringEndAt: '2020-06-30 22:19:04',
                cancelled: 1583727655,
                completed: 1564039067,
                error: 4257900766,
            })
            .expect(201);
    });

    it(`/REST:GET bplus-it-sappi/jobs-overview/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/jobs-overview/paginate')
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

    it(`/REST:GET bplus-it-sappi/job-overview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/job-overview')
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

    it(`/REST:GET bplus-it-sappi/job-overview`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : 'a89cd7f7-6d71-4275-81bf-b7372ac67357'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'a89cd7f7-6d71-4275-81bf-b7372ac67357'));
    });

    it(`/REST:GET bplus-it-sappi/job-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/job-overview/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:GET bplus-it-sappi/job-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/job-overview/a89cd7f7-6d71-4275-81bf-b7372ac67357')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'a89cd7f7-6d71-4275-81bf-b7372ac67357'));
    });

    it(`/REST:GET bplus-it-sappi/jobs-overview`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/jobs-overview')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    it(`/REST:PUT bplus-it-sappi/job-overview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: '5dafa4fe-7beb-4db8-9977-62cb4cdf6306',
                tenantId: '879aa276-caf7-4701-993c-71cdc977b19d',
                systemId: 'b218b4c6-fa2d-4ec3-a92d-3f7ff2cbe291',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-06-30 06:56:18',
                executionMonitoringStartAt: '2020-06-30 01:12:55',
                executionMonitoringEndAt: '2020-06-30 04:48:51',
                cancelled: 5607579408,
                completed: 2363463842,
                error: 5514974070,
            })
            .expect(404);
    });

    it(`/REST:PUT bplus-it-sappi/job-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: 'a89cd7f7-6d71-4275-81bf-b7372ac67357',
                tenantId: 'b6372430-2806-4225-9c30-275012460f21',
                systemId: '476318f0-9577-4fa9-bfd7-9f5133c6dc8d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-06-30 13:29:15',
                executionMonitoringStartAt: '2020-06-30 08:01:29',
                executionMonitoringEndAt: '2020-06-30 02:57:49',
                cancelled: 5008568746,
                completed: 8414980867,
                error: 3862516952,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'a89cd7f7-6d71-4275-81bf-b7372ac67357'));
    });

    it(`/REST:DELETE bplus-it-sappi/job-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/job-overview/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:DELETE bplus-it-sappi/job-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/job-overview/a89cd7f7-6d71-4275-81bf-b7372ac67357')
            .set('Accept', 'application/json')
            .expect(200);
    });

    it(`/GraphQL bplusItSappiCreateJobOverview - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateJobOverviewInput!)
                    {
                        bplusItSappiCreateJobOverview (payload:$payload)
                        {   
                            id
                            tenantId
                            systemId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            cancelled
                            completed
                            error
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

    it(`/GraphQL bplusItSappiCreateJobOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateJobOverviewInput!)
                    {
                        bplusItSappiCreateJobOverview (payload:$payload)
                        {   
                            id
                            tenantId
                            systemId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            cancelled
                            completed
                            error
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '1bfee970-81ce-4fd7-b4f5-39a4f053713b',
                        tenantId: 'b6372430-2806-4225-9c30-275012460f21',
                        systemId: '476318f0-9577-4fa9-bfd7-9f5133c6dc8d',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-06-30 20:28:48',
                        executionMonitoringStartAt: '2020-06-30 12:58:43',
                        executionMonitoringEndAt: '2020-06-30 02:40:26',
                        cancelled: 9821112562,
                        completed: 8042266428,
                        error: 4457481010,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateJobOverview).toHaveProperty('id', '1bfee970-81ce-4fd7-b4f5-39a4f053713b');
            });
    });

    it(`/GraphQL bplusItSappiPaginateJobsOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateJobsOverview (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateJobsOverview.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateJobsOverview.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateJobsOverview.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    it(`/GraphQL bplusItSappiFindJobOverview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindJobOverview (query:$query)
                        {   
                            id
                            tenantId
                            systemId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            cancelled
                            completed
                            error
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

    it(`/GraphQL bplusItSappiFindJobOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindJobOverview (query:$query)
                        {   
                            id
                            tenantId
                            systemId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            cancelled
                            completed
                            error
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
                            value   : 'a89cd7f7-6d71-4275-81bf-b7372ac67357'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobOverview.id).toStrictEqual('a89cd7f7-6d71-4275-81bf-b7372ac67357');
            });
    });

    it(`/GraphQL bplusItSappiFindJobOverviewById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindJobOverviewById (id:$id)
                        {   
                            id
                            tenantId
                            systemId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            cancelled
                            completed
                            error
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

    it(`/GraphQL bplusItSappiFindJobOverviewById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindJobOverviewById (id:$id)
                        {   
                            id
                            tenantId
                            systemId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            cancelled
                            completed
                            error
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'a89cd7f7-6d71-4275-81bf-b7372ac67357'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobOverviewById.id).toStrictEqual('a89cd7f7-6d71-4275-81bf-b7372ac67357');
            });
    });

    it(`/GraphQL bplusItSappiGetJobsOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetJobsOverview (query:$query)
                        {   
                            id
                            tenantId
                            systemId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            cancelled
                            completed
                            error
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetJobsOverview.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    it(`/GraphQL bplusItSappiUpdateJobOverview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateJobOverviewInput!)
                    {
                        bplusItSappiUpdateJobOverview (payload:$payload)
                        {   
                            id
                            tenantId
                            systemId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            cancelled
                            completed
                            error
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '1b97be8a-430e-4f2d-ba37-7c1fadb7f295',
                        tenantId: '1f80236c-aab2-4531-a157-96b8235db899',
                        systemId: 'b913c862-ad1c-4624-a283-e8b5b8343275',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-01 00:21:02',
                        executionMonitoringStartAt: '2020-06-30 05:44:29',
                        executionMonitoringEndAt: '2020-06-30 01:31:42',
                        cancelled: 7145615954,
                        completed: 5445134909,
                        error: 9301492554,
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

    it(`/GraphQL bplusItSappiUpdateJobOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateJobOverviewInput!)
                    {
                        bplusItSappiUpdateJobOverview (payload:$payload)
                        {   
                            id
                            tenantId
                            systemId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            cancelled
                            completed
                            error
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'a89cd7f7-6d71-4275-81bf-b7372ac67357',
                        tenantId: 'b6372430-2806-4225-9c30-275012460f21',
                        systemId: '476318f0-9577-4fa9-bfd7-9f5133c6dc8d',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-06-30 11:40:16',
                        executionMonitoringStartAt: '2020-06-30 11:07:15',
                        executionMonitoringEndAt: '2020-06-30 19:25:54',
                        cancelled: 7593142056,
                        completed: 1813708089,
                        error: 3017865415,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateJobOverview.id).toStrictEqual('a89cd7f7-6d71-4275-81bf-b7372ac67357');
            });
    });

    it(`/GraphQL bplusItSappiDeleteJobOverviewById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteJobOverviewById (id:$id)
                        {   
                            id
                            tenantId
                            systemId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            cancelled
                            completed
                            error
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

    it(`/GraphQL bplusItSappiDeleteJobOverviewById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteJobOverviewById (id:$id)
                        {   
                            id
                            tenantId
                            systemId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            cancelled
                            completed
                            error
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'a89cd7f7-6d71-4275-81bf-b7372ac67357'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteJobOverviewById.id).toStrictEqual('a89cd7f7-6d71-4275-81bf-b7372ac67357');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});