import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IMessageOverviewRepository } from '@hades/cci/message-overview/domain/message-overview.repository';
import { MockMessageOverviewRepository } from '@hades/cci/message-overview/infrastructure/mock/mock-message-overview.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { CciModule } from './../../../src/apps/cci/cci.module';
import * as request from 'supertest';
import * as _ from 'lodash';
import { IamModule } from './../../../src/apps/iam/iam.module';

const importForeignModules = [
    IamModule
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
                    CciModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
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

    test(`/REST:POST cci/message-overview - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '0815f27d-fe2a-42fe-a4b6-a3196d51fc78',
                tenantCode: '6n0c9q8r9lc1grv3clhagu46x07l3wrphssylu26vp2hca9gm8',
                systemId: 'ab8af538-0a5b-42f5-b92e-9b2322d1aad3',
                systemName: 'oj230o8nkiyjh2p5qk9u',
                executionId: '614191a0-c210-4be7-95f2-cd0f8a6a3ef7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 23:08:40',
                executionMonitoringStartAt: '2020-11-04 16:22:54',
                executionMonitoringEndAt: '2020-11-04 20:37:06',
                numberMax: 8369450624,
                numberDays: 4372122878,
                success: 4402197526,
                cancelled: 2242015242,
                delivering: 1008451387,
                error: 4022925158,
                holding: 1333566339,
                toBeDelivered: 2841462455,
                waiting: 7690500571,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '0815f27d-fe2a-42fe-a4b6-a3196d51fc78',
                tenantCode: 'if14ahxnnms7yrv54ryn0ewysva5r7xfs6qsjj76nanpjrby5s',
                systemId: 'ab8af538-0a5b-42f5-b92e-9b2322d1aad3',
                systemName: 'fpf3y59qpen0ds49vamc',
                executionId: '614191a0-c210-4be7-95f2-cd0f8a6a3ef7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 10:44:51',
                executionMonitoringStartAt: '2020-11-04 21:40:27',
                executionMonitoringEndAt: '2020-11-04 08:07:05',
                numberMax: 4670208331,
                numberDays: 8493913448,
                success: 2774516825,
                cancelled: 1102710256,
                delivering: 1786059065,
                error: 4010219847,
                holding: 1223716908,
                toBeDelivered: 1414554011,
                waiting: 3640565333,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '61dc705e-6b5c-4926-b636-4fcef37a3861',
                tenantId: null,
                tenantCode: 'rzpexyohu1fa9nzixixu213a2bui97dpctarv9avpxaefsym5l',
                systemId: 'ab8af538-0a5b-42f5-b92e-9b2322d1aad3',
                systemName: '5zbyllcyhjs6xexnspth',
                executionId: '614191a0-c210-4be7-95f2-cd0f8a6a3ef7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 07:49:43',
                executionMonitoringStartAt: '2020-11-04 03:56:11',
                executionMonitoringEndAt: '2020-11-04 13:13:53',
                numberMax: 4042742606,
                numberDays: 8644340992,
                success: 4874261967,
                cancelled: 3876802099,
                delivering: 2240449906,
                error: 6501762079,
                holding: 4623403501,
                toBeDelivered: 2441175393,
                waiting: 2367082678,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '61dc705e-6b5c-4926-b636-4fcef37a3861',
                
                tenantCode: '8mzt6az019a97klrp6g87goi9hhlq10bwxnfnfqmgnne5c33pv',
                systemId: 'ab8af538-0a5b-42f5-b92e-9b2322d1aad3',
                systemName: 'u0v9959b635tuyttibs5',
                executionId: '614191a0-c210-4be7-95f2-cd0f8a6a3ef7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 00:19:46',
                executionMonitoringStartAt: '2020-11-04 15:58:36',
                executionMonitoringEndAt: '2020-11-04 22:19:27',
                numberMax: 2019607478,
                numberDays: 3512236516,
                success: 6499536748,
                cancelled: 9481010971,
                delivering: 4594635415,
                error: 9659951021,
                holding: 3359181813,
                toBeDelivered: 9390814927,
                waiting: 7395093423,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '61dc705e-6b5c-4926-b636-4fcef37a3861',
                tenantId: '0815f27d-fe2a-42fe-a4b6-a3196d51fc78',
                tenantCode: null,
                systemId: 'ab8af538-0a5b-42f5-b92e-9b2322d1aad3',
                systemName: '6e42nr6a55jmi40428if',
                executionId: '614191a0-c210-4be7-95f2-cd0f8a6a3ef7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 09:20:39',
                executionMonitoringStartAt: '2020-11-04 11:09:50',
                executionMonitoringEndAt: '2020-11-04 09:31:50',
                numberMax: 8973355592,
                numberDays: 8714531764,
                success: 6479148592,
                cancelled: 7803224370,
                delivering: 1906318715,
                error: 8658569342,
                holding: 3091128449,
                toBeDelivered: 7490500947,
                waiting: 5828254148,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '61dc705e-6b5c-4926-b636-4fcef37a3861',
                tenantId: '0815f27d-fe2a-42fe-a4b6-a3196d51fc78',
                
                systemId: 'ab8af538-0a5b-42f5-b92e-9b2322d1aad3',
                systemName: '77boep1stvry2ne2kgp7',
                executionId: '614191a0-c210-4be7-95f2-cd0f8a6a3ef7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 00:00:37',
                executionMonitoringStartAt: '2020-11-04 22:49:02',
                executionMonitoringEndAt: '2020-11-04 16:42:15',
                numberMax: 9720251969,
                numberDays: 4627348979,
                success: 1336648976,
                cancelled: 5308351959,
                delivering: 3693179515,
                error: 4161397926,
                holding: 5785849038,
                toBeDelivered: 9570323133,
                waiting: 2126276043,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '61dc705e-6b5c-4926-b636-4fcef37a3861',
                tenantId: '0815f27d-fe2a-42fe-a4b6-a3196d51fc78',
                tenantCode: 'ltozkw44t4gxd28tu8bvkbqpqusvt8yltzkexs5q7rehbwg0th',
                systemId: null,
                systemName: 'yd958k8x2fjyjr0eb2vw',
                executionId: '614191a0-c210-4be7-95f2-cd0f8a6a3ef7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 15:15:52',
                executionMonitoringStartAt: '2020-11-04 05:16:52',
                executionMonitoringEndAt: '2020-11-04 03:53:47',
                numberMax: 8186323560,
                numberDays: 5856071149,
                success: 8279175737,
                cancelled: 3188657324,
                delivering: 3431292336,
                error: 8882506544,
                holding: 9584896308,
                toBeDelivered: 8150812012,
                waiting: 2046908165,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '61dc705e-6b5c-4926-b636-4fcef37a3861',
                tenantId: '0815f27d-fe2a-42fe-a4b6-a3196d51fc78',
                tenantCode: '2j2txa1gu1th4qjafrc6w4bjz1o7dic7xznix8mo4y73vw8aqq',
                
                systemName: 'z0yoofcoxejj6nsrm4sz',
                executionId: '614191a0-c210-4be7-95f2-cd0f8a6a3ef7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 17:53:13',
                executionMonitoringStartAt: '2020-11-04 19:04:15',
                executionMonitoringEndAt: '2020-11-04 22:59:15',
                numberMax: 9914555611,
                numberDays: 8962359725,
                success: 9350493374,
                cancelled: 8982776442,
                delivering: 3269120186,
                error: 5354121995,
                holding: 6076721789,
                toBeDelivered: 4107790508,
                waiting: 2806697349,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '61dc705e-6b5c-4926-b636-4fcef37a3861',
                tenantId: '0815f27d-fe2a-42fe-a4b6-a3196d51fc78',
                tenantCode: '8f4vb4ez6puanswywk5o1k3jhpyjel8yvbw3i8jjfv9at75rng',
                systemId: 'ab8af538-0a5b-42f5-b92e-9b2322d1aad3',
                systemName: null,
                executionId: '614191a0-c210-4be7-95f2-cd0f8a6a3ef7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 01:21:18',
                executionMonitoringStartAt: '2020-11-04 15:24:39',
                executionMonitoringEndAt: '2020-11-04 09:09:03',
                numberMax: 4269931502,
                numberDays: 5453461348,
                success: 2410835552,
                cancelled: 2338427061,
                delivering: 1525119665,
                error: 7947253864,
                holding: 5073629318,
                toBeDelivered: 6674590923,
                waiting: 7854156681,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '61dc705e-6b5c-4926-b636-4fcef37a3861',
                tenantId: '0815f27d-fe2a-42fe-a4b6-a3196d51fc78',
                tenantCode: '23ibku774j7kmye1lk4lqmju0o5gy1fpxkwu833zyns0jxuxrn',
                systemId: 'ab8af538-0a5b-42f5-b92e-9b2322d1aad3',
                
                executionId: '614191a0-c210-4be7-95f2-cd0f8a6a3ef7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 02:53:14',
                executionMonitoringStartAt: '2020-11-04 11:59:44',
                executionMonitoringEndAt: '2020-11-04 03:41:50',
                numberMax: 6801098115,
                numberDays: 8518005328,
                success: 1608625820,
                cancelled: 8610748889,
                delivering: 9736978500,
                error: 1811957474,
                holding: 2555098399,
                toBeDelivered: 3596059088,
                waiting: 8688246098,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '61dc705e-6b5c-4926-b636-4fcef37a3861',
                tenantId: '0815f27d-fe2a-42fe-a4b6-a3196d51fc78',
                tenantCode: 'kri0orjbapz7h707no64o9sycnec242659y34st6m26p6ju8m2',
                systemId: 'ab8af538-0a5b-42f5-b92e-9b2322d1aad3',
                systemName: 'z3tq7gg4lrvk2six163e',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 13:44:48',
                executionMonitoringStartAt: '2020-11-04 19:46:52',
                executionMonitoringEndAt: '2020-11-04 15:02:32',
                numberMax: 9626443292,
                numberDays: 4281608328,
                success: 2646126064,
                cancelled: 1885033935,
                delivering: 8914881056,
                error: 7359013641,
                holding: 5373477156,
                toBeDelivered: 4880982263,
                waiting: 6167298738,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '61dc705e-6b5c-4926-b636-4fcef37a3861',
                tenantId: '0815f27d-fe2a-42fe-a4b6-a3196d51fc78',
                tenantCode: 'nmxnr55b26nlgr6on2zv2xs0nqx27f1rk38arnen732l8v4d69',
                systemId: 'ab8af538-0a5b-42f5-b92e-9b2322d1aad3',
                systemName: 'qzrl93gi2c3ax3h0vbx8',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 01:29:38',
                executionMonitoringStartAt: '2020-11-04 22:48:18',
                executionMonitoringEndAt: '2020-11-04 01:21:27',
                numberMax: 9992263387,
                numberDays: 8630770641,
                success: 9597476409,
                cancelled: 3088296151,
                delivering: 7261888912,
                error: 9042610628,
                holding: 3779782522,
                toBeDelivered: 8643088106,
                waiting: 1764205888,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '61dc705e-6b5c-4926-b636-4fcef37a3861',
                tenantId: '0815f27d-fe2a-42fe-a4b6-a3196d51fc78',
                tenantCode: 'fveqsblwacsgbkw23ugz806rb7x4yeokmm6ky9cegk0k6zxfsi',
                systemId: 'ab8af538-0a5b-42f5-b92e-9b2322d1aad3',
                systemName: 'dgqjhc5p875jnt54sd9r',
                executionId: '614191a0-c210-4be7-95f2-cd0f8a6a3ef7',
                executionType: null,
                executionExecutedAt: '2020-11-04 22:46:12',
                executionMonitoringStartAt: '2020-11-04 16:17:03',
                executionMonitoringEndAt: '2020-11-04 16:14:56',
                numberMax: 6640556194,
                numberDays: 6128777536,
                success: 5381095851,
                cancelled: 7831635911,
                delivering: 1490843927,
                error: 5825620471,
                holding: 9097456392,
                toBeDelivered: 2993501792,
                waiting: 4996868749,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionType must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '61dc705e-6b5c-4926-b636-4fcef37a3861',
                tenantId: '0815f27d-fe2a-42fe-a4b6-a3196d51fc78',
                tenantCode: '5hrikcio4ux23nllihy2fgpva54zht68us24v8ai0jplogbrx1',
                systemId: 'ab8af538-0a5b-42f5-b92e-9b2322d1aad3',
                systemName: '6p7le50it1m770xybiup',
                executionId: '614191a0-c210-4be7-95f2-cd0f8a6a3ef7',
                
                executionExecutedAt: '2020-11-04 00:30:42',
                executionMonitoringStartAt: '2020-11-04 22:13:01',
                executionMonitoringEndAt: '2020-11-04 00:46:34',
                numberMax: 4963048819,
                numberDays: 3713627657,
                success: 1978402417,
                cancelled: 1043642054,
                delivering: 2994831944,
                error: 2271262054,
                holding: 7441129330,
                toBeDelivered: 5268148689,
                waiting: 8746532992,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionType must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '61dc705e-6b5c-4926-b636-4fcef37a3861',
                tenantId: '0815f27d-fe2a-42fe-a4b6-a3196d51fc78',
                tenantCode: 'tcg17f3hokrvb7cuudkoubchavzwsrw149tiskuums1003kor0',
                systemId: 'ab8af538-0a5b-42f5-b92e-9b2322d1aad3',
                systemName: 'wac8efgy803s9n2nevok',
                executionId: '614191a0-c210-4be7-95f2-cd0f8a6a3ef7',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-11-04 21:11:11',
                executionMonitoringEndAt: '2020-11-04 21:53:41',
                numberMax: 2911840488,
                numberDays: 7720095533,
                success: 9438186080,
                cancelled: 6156692598,
                delivering: 3319560556,
                error: 1757938383,
                holding: 8696173431,
                toBeDelivered: 3604804240,
                waiting: 2603006918,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionExecutedAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '61dc705e-6b5c-4926-b636-4fcef37a3861',
                tenantId: '0815f27d-fe2a-42fe-a4b6-a3196d51fc78',
                tenantCode: 'xxz8q7r32z1jx5pfmhyji1v8lq1rujc171sde6brll61mgtfcm',
                systemId: 'ab8af538-0a5b-42f5-b92e-9b2322d1aad3',
                systemName: 'rq409yo1blz3mcdmvihy',
                executionId: '614191a0-c210-4be7-95f2-cd0f8a6a3ef7',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-11-04 18:09:55',
                executionMonitoringEndAt: '2020-11-04 13:39:28',
                numberMax: 9520843899,
                numberDays: 7968084625,
                success: 2740813757,
                cancelled: 6599636398,
                delivering: 6844711579,
                error: 2747665203,
                holding: 3672586169,
                toBeDelivered: 5969462689,
                waiting: 7905762336,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '61dc705e-6b5c-4926-b636-4fcef37a3861',
                tenantId: '0815f27d-fe2a-42fe-a4b6-a3196d51fc78',
                tenantCode: '02t4vmwgxp79xau7gut5kapi8d74fqicc8bxaeh7bd4pf9xwi4',
                systemId: 'ab8af538-0a5b-42f5-b92e-9b2322d1aad3',
                systemName: 'ocjywijyv4g0pzs6rvo2',
                executionId: '614191a0-c210-4be7-95f2-cd0f8a6a3ef7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 12:27:58',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-11-04 07:36:03',
                numberMax: 9842867003,
                numberDays: 9216149078,
                success: 6531780963,
                cancelled: 9452270514,
                delivering: 6694202794,
                error: 3407052012,
                holding: 9432098074,
                toBeDelivered: 5805281666,
                waiting: 1134956304,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '61dc705e-6b5c-4926-b636-4fcef37a3861',
                tenantId: '0815f27d-fe2a-42fe-a4b6-a3196d51fc78',
                tenantCode: '8dz8yxxtffzhn5qj65iow63jm2m8fqdl273ljxn5ubol6p68qg',
                systemId: 'ab8af538-0a5b-42f5-b92e-9b2322d1aad3',
                systemName: 'rnoyw20mxp6ewusyme0e',
                executionId: '614191a0-c210-4be7-95f2-cd0f8a6a3ef7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 13:15:58',
                
                executionMonitoringEndAt: '2020-11-04 18:32:03',
                numberMax: 9918720733,
                numberDays: 3857663881,
                success: 4362845248,
                cancelled: 7949857609,
                delivering: 9771998703,
                error: 8787858120,
                holding: 1740324225,
                toBeDelivered: 9629030368,
                waiting: 3059805476,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '61dc705e-6b5c-4926-b636-4fcef37a3861',
                tenantId: '0815f27d-fe2a-42fe-a4b6-a3196d51fc78',
                tenantCode: 'dcs5ctg1xrhjyka042pbk5mzc46bu3wprhpw8dvg85kktfvhrt',
                systemId: 'ab8af538-0a5b-42f5-b92e-9b2322d1aad3',
                systemName: '46wsbwxvcgwijyyb021r',
                executionId: '614191a0-c210-4be7-95f2-cd0f8a6a3ef7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 23:07:57',
                executionMonitoringStartAt: '2020-11-04 06:38:37',
                executionMonitoringEndAt: null,
                numberMax: 9478948517,
                numberDays: 1127111937,
                success: 3564170068,
                cancelled: 7737731529,
                delivering: 5183843196,
                error: 1998911318,
                holding: 7255229912,
                toBeDelivered: 3568319086,
                waiting: 2137705995,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '61dc705e-6b5c-4926-b636-4fcef37a3861',
                tenantId: '0815f27d-fe2a-42fe-a4b6-a3196d51fc78',
                tenantCode: 'r3bcs1cmjyvem853ombzc2vfz81cw75y4vyrptac6bicc7irvw',
                systemId: 'ab8af538-0a5b-42f5-b92e-9b2322d1aad3',
                systemName: 'it3ntprmxcbeuwyjsush',
                executionId: '614191a0-c210-4be7-95f2-cd0f8a6a3ef7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 01:25:07',
                executionMonitoringStartAt: '2020-11-04 05:54:32',
                
                numberMax: 1734295935,
                numberDays: 5734517211,
                success: 1933941460,
                cancelled: 3505688395,
                delivering: 1807528691,
                error: 9010526331,
                holding: 8933715787,
                toBeDelivered: 6174622309,
                waiting: 2439777991,
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
            .send({
                id: 'qt3f7i8wxt43z2y3r4jvee1rkwqidyhe7d5jh',
                tenantId: '0815f27d-fe2a-42fe-a4b6-a3196d51fc78',
                tenantCode: '6x2creg72hyfj6mvwrezxhlexgf43v8ahk89eubsm4qy9k6x27',
                systemId: 'ab8af538-0a5b-42f5-b92e-9b2322d1aad3',
                systemName: '5a20fdibyhbt47c58zdb',
                executionId: '614191a0-c210-4be7-95f2-cd0f8a6a3ef7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 10:55:07',
                executionMonitoringStartAt: '2020-11-04 13:49:24',
                executionMonitoringEndAt: '2020-11-04 15:29:28',
                numberMax: 4569281655,
                numberDays: 1668676233,
                success: 4971085575,
                cancelled: 5418456681,
                delivering: 4814356972,
                error: 8577551361,
                holding: 6107671797,
                toBeDelivered: 8624579973,
                waiting: 7130760449,
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
            .send({
                id: '61dc705e-6b5c-4926-b636-4fcef37a3861',
                tenantId: '7rmnnt83b3k78kvqkqjjw6i45vjffqs5j9ap6',
                tenantCode: 'qfczvx7mgm9hlnek7ebpayk3g2kqc54l4qlpsl6qclrh83p9d5',
                systemId: 'ab8af538-0a5b-42f5-b92e-9b2322d1aad3',
                systemName: 'hn2x0meac7wmjjpb46u7',
                executionId: '614191a0-c210-4be7-95f2-cd0f8a6a3ef7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 16:40:49',
                executionMonitoringStartAt: '2020-11-04 11:18:24',
                executionMonitoringEndAt: '2020-11-04 11:17:41',
                numberMax: 7527521221,
                numberDays: 4847028981,
                success: 4686149908,
                cancelled: 7952156754,
                delivering: 9953841679,
                error: 2943294814,
                holding: 3752135845,
                toBeDelivered: 2460014680,
                waiting: 1133531512,
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
            .send({
                id: '61dc705e-6b5c-4926-b636-4fcef37a3861',
                tenantId: '0815f27d-fe2a-42fe-a4b6-a3196d51fc78',
                tenantCode: 'bmtpie1hq3pu9muaxi80k44trt15jdra9d2z662lb3b1j65msv',
                systemId: '42gfv1n20m3100t3xbv1dr2axgbb5ypfo5k6u',
                systemName: '09kbq5p3fsth9bw8zst8',
                executionId: '614191a0-c210-4be7-95f2-cd0f8a6a3ef7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 23:01:03',
                executionMonitoringStartAt: '2020-11-04 00:13:00',
                executionMonitoringEndAt: '2020-11-03 23:10:20',
                numberMax: 7818005456,
                numberDays: 3249063613,
                success: 2905814371,
                cancelled: 1789132847,
                delivering: 1664923045,
                error: 2556219987,
                holding: 8171937171,
                toBeDelivered: 8585036272,
                waiting: 7007533100,
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
            .send({
                id: '61dc705e-6b5c-4926-b636-4fcef37a3861',
                tenantId: '0815f27d-fe2a-42fe-a4b6-a3196d51fc78',
                tenantCode: '44205e2e4cgvr66zj0tvtwrrdgsuyj0gsmp73mw14z0ca8lnoa',
                systemId: 'ab8af538-0a5b-42f5-b92e-9b2322d1aad3',
                systemName: 'un52codpuw6khgbm3s7i',
                executionId: 'mubysa2wzsjcryugyyy1ozwhmzc061f2ptijy',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 15:36:00',
                executionMonitoringStartAt: '2020-11-04 22:13:48',
                executionMonitoringEndAt: '2020-11-04 22:58:13',
                numberMax: 3014813402,
                numberDays: 5988018107,
                success: 3045943500,
                cancelled: 5506136056,
                delivering: 1300395283,
                error: 8707280747,
                holding: 4839395248,
                toBeDelivered: 7077009194,
                waiting: 6700417698,
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
            .send({
                id: '61dc705e-6b5c-4926-b636-4fcef37a3861',
                tenantId: '0815f27d-fe2a-42fe-a4b6-a3196d51fc78',
                tenantCode: 'yz7rf3s3rphnclm22amjlq2omjei07zuuiia0ezpukj36ps7218',
                systemId: 'ab8af538-0a5b-42f5-b92e-9b2322d1aad3',
                systemName: 'yjr0t4wk8up4tluu426z',
                executionId: '614191a0-c210-4be7-95f2-cd0f8a6a3ef7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 20:21:07',
                executionMonitoringStartAt: '2020-11-04 03:32:59',
                executionMonitoringEndAt: '2020-11-04 22:45:24',
                numberMax: 7889708238,
                numberDays: 1434650876,
                success: 5152444425,
                cancelled: 1724196898,
                delivering: 7660702690,
                error: 1845428735,
                holding: 1909945563,
                toBeDelivered: 7259077110,
                waiting: 7135016702,
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
            .send({
                id: '61dc705e-6b5c-4926-b636-4fcef37a3861',
                tenantId: '0815f27d-fe2a-42fe-a4b6-a3196d51fc78',
                tenantCode: 'qx41qb55bdrlylajudsrgwyljyei8pbw2bfqvipm23dktyssg0',
                systemId: 'ab8af538-0a5b-42f5-b92e-9b2322d1aad3',
                systemName: 'bh0alriewixz3nhw0th3q',
                executionId: '614191a0-c210-4be7-95f2-cd0f8a6a3ef7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 05:56:47',
                executionMonitoringStartAt: '2020-11-04 10:40:35',
                executionMonitoringEndAt: '2020-11-04 15:36:09',
                numberMax: 6419514161,
                numberDays: 1986953044,
                success: 6485782733,
                cancelled: 4401474345,
                delivering: 5445234131,
                error: 7587259272,
                holding: 3159262982,
                toBeDelivered: 2949369100,
                waiting: 7276512561,
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
            .send({
                id: '61dc705e-6b5c-4926-b636-4fcef37a3861',
                tenantId: '0815f27d-fe2a-42fe-a4b6-a3196d51fc78',
                tenantCode: 'vvbcwjcagn6w7dfah5mhftk9pdazdadyf2ncvihnljwrz7xm7g',
                systemId: 'ab8af538-0a5b-42f5-b92e-9b2322d1aad3',
                systemName: 'w9wm78kqzvek26s4k514',
                executionId: '614191a0-c210-4be7-95f2-cd0f8a6a3ef7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 14:13:09',
                executionMonitoringStartAt: '2020-11-04 02:17:29',
                executionMonitoringEndAt: '2020-11-04 13:28:32',
                numberMax: 17835915621,
                numberDays: 8618325016,
                success: 3925439899,
                cancelled: 3712260244,
                delivering: 5809275424,
                error: 3823842080,
                holding: 8858237296,
                toBeDelivered: 3917529794,
                waiting: 8768441541,
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
            .send({
                id: '61dc705e-6b5c-4926-b636-4fcef37a3861',
                tenantId: '0815f27d-fe2a-42fe-a4b6-a3196d51fc78',
                tenantCode: 'jdkao1lq9jgexpgk9ptglalfz724x6ao8ca97lodev9dlsumsb',
                systemId: 'ab8af538-0a5b-42f5-b92e-9b2322d1aad3',
                systemName: 'pb90n32bwrheefeiowlr',
                executionId: '614191a0-c210-4be7-95f2-cd0f8a6a3ef7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 13:49:35',
                executionMonitoringStartAt: '2020-11-04 14:34:12',
                executionMonitoringEndAt: '2020-11-04 17:13:03',
                numberMax: 2413834618,
                numberDays: 23204688569,
                success: 8934867894,
                cancelled: 7640898972,
                delivering: 6197131664,
                error: 4119767928,
                holding: 9745003679,
                toBeDelivered: 5858404455,
                waiting: 1639278101,
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
            .send({
                id: '61dc705e-6b5c-4926-b636-4fcef37a3861',
                tenantId: '0815f27d-fe2a-42fe-a4b6-a3196d51fc78',
                tenantCode: 'oerhm8lqhawqcrp38nitr2qm1xd77bvpgi2eczob59wd7fw26d',
                systemId: 'ab8af538-0a5b-42f5-b92e-9b2322d1aad3',
                systemName: 'wrjy0ifq6duclgke7aqq',
                executionId: '614191a0-c210-4be7-95f2-cd0f8a6a3ef7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 14:09:20',
                executionMonitoringStartAt: '2020-11-04 19:00:58',
                executionMonitoringEndAt: '2020-11-04 00:09:32',
                numberMax: 7049019313,
                numberDays: 1712602834,
                success: 62101439909,
                cancelled: 5496340392,
                delivering: 5450333624,
                error: 6667328075,
                holding: 8285129735,
                toBeDelivered: 6759820489,
                waiting: 5655150672,
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
            .send({
                id: '61dc705e-6b5c-4926-b636-4fcef37a3861',
                tenantId: '0815f27d-fe2a-42fe-a4b6-a3196d51fc78',
                tenantCode: '4qsu63bef16c23fvpkxld0aqsiyzdmy8yrbi7wok4zgnwwgu3v',
                systemId: 'ab8af538-0a5b-42f5-b92e-9b2322d1aad3',
                systemName: 'z7r95hbajuy5f4osa4oj',
                executionId: '614191a0-c210-4be7-95f2-cd0f8a6a3ef7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 13:32:15',
                executionMonitoringStartAt: '2020-11-04 14:21:05',
                executionMonitoringEndAt: '2020-11-03 23:33:28',
                numberMax: 9574403239,
                numberDays: 2185554486,
                success: 7793492636,
                cancelled: 39406631347,
                delivering: 6285752077,
                error: 1690140788,
                holding: 6856609969,
                toBeDelivered: 2089336996,
                waiting: 2178267170,
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
            .send({
                id: '61dc705e-6b5c-4926-b636-4fcef37a3861',
                tenantId: '0815f27d-fe2a-42fe-a4b6-a3196d51fc78',
                tenantCode: '89q1hrk97autffm7zjnxma6pdz41k6w8qh1ekg7quktqq6p084',
                systemId: 'ab8af538-0a5b-42f5-b92e-9b2322d1aad3',
                systemName: 'bjpm6kt4h00wo1qqaihj',
                executionId: '614191a0-c210-4be7-95f2-cd0f8a6a3ef7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 03:33:34',
                executionMonitoringStartAt: '2020-11-04 08:39:41',
                executionMonitoringEndAt: '2020-11-04 03:52:32',
                numberMax: 5857741782,
                numberDays: 3905153580,
                success: 3493941136,
                cancelled: 4385922441,
                delivering: 33920051420,
                error: 5925331463,
                holding: 7757063899,
                toBeDelivered: 2904997621,
                waiting: 6663385994,
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
            .send({
                id: '61dc705e-6b5c-4926-b636-4fcef37a3861',
                tenantId: '0815f27d-fe2a-42fe-a4b6-a3196d51fc78',
                tenantCode: '89vpaart1hag7u24rb45p9ioe5e9uidckutwdd6fbklapu5sbw',
                systemId: 'ab8af538-0a5b-42f5-b92e-9b2322d1aad3',
                systemName: 'bzvklwdcwp7lpiyz0v6x',
                executionId: '614191a0-c210-4be7-95f2-cd0f8a6a3ef7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 16:31:37',
                executionMonitoringStartAt: '2020-11-04 15:01:14',
                executionMonitoringEndAt: '2020-11-04 10:42:48',
                numberMax: 8069417929,
                numberDays: 8508687824,
                success: 2522508974,
                cancelled: 1670134825,
                delivering: 8519496721,
                error: 79180414767,
                holding: 8993894757,
                toBeDelivered: 6205718912,
                waiting: 8654752748,
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
            .send({
                id: '61dc705e-6b5c-4926-b636-4fcef37a3861',
                tenantId: '0815f27d-fe2a-42fe-a4b6-a3196d51fc78',
                tenantCode: 'x0xverd3jlexs9rc7f4t63xj9nvk7zbvtd9rocdmz4i6aewv01',
                systemId: 'ab8af538-0a5b-42f5-b92e-9b2322d1aad3',
                systemName: 'hu3ipb34zi8fuhcru9fu',
                executionId: '614191a0-c210-4be7-95f2-cd0f8a6a3ef7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 15:11:08',
                executionMonitoringStartAt: '2020-11-04 13:46:34',
                executionMonitoringEndAt: '2020-11-04 09:41:38',
                numberMax: 7622949949,
                numberDays: 5843921230,
                success: 4518692716,
                cancelled: 2970454635,
                delivering: 2470212595,
                error: 6718720353,
                holding: 23029438415,
                toBeDelivered: 4992892939,
                waiting: 4915116679,
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
            .send({
                id: '61dc705e-6b5c-4926-b636-4fcef37a3861',
                tenantId: '0815f27d-fe2a-42fe-a4b6-a3196d51fc78',
                tenantCode: 'wdp8b8qb95v1njkc9q8wm4zo22duautd8zdan2xknidpm3nckw',
                systemId: 'ab8af538-0a5b-42f5-b92e-9b2322d1aad3',
                systemName: 'k93h5w46oc44vevxiiut',
                executionId: '614191a0-c210-4be7-95f2-cd0f8a6a3ef7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 21:13:20',
                executionMonitoringStartAt: '2020-11-04 19:26:58',
                executionMonitoringEndAt: '2020-11-04 05:27:07',
                numberMax: 2870613297,
                numberDays: 1793966071,
                success: 4223825838,
                cancelled: 7715802849,
                delivering: 4669544690,
                error: 9144708122,
                holding: 7241492055,
                toBeDelivered: 74685299325,
                waiting: 5552981997,
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
            .send({
                id: '61dc705e-6b5c-4926-b636-4fcef37a3861',
                tenantId: '0815f27d-fe2a-42fe-a4b6-a3196d51fc78',
                tenantCode: 'hk0ogmh1sqkogth2qsp0lq6cg07js0x337hjlm6zvjilzc5pdr',
                systemId: 'ab8af538-0a5b-42f5-b92e-9b2322d1aad3',
                systemName: 'tkp5id1yj8slviezqass',
                executionId: '614191a0-c210-4be7-95f2-cd0f8a6a3ef7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 17:23:11',
                executionMonitoringStartAt: '2020-11-04 07:57:01',
                executionMonitoringEndAt: '2020-11-04 02:41:24',
                numberMax: 9958924679,
                numberDays: 3509945988,
                success: 7521158221,
                cancelled: 9035343639,
                delivering: 3184977234,
                error: 8811183829,
                holding: 1346241977,
                toBeDelivered: 8926094164,
                waiting: 41872879574,
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
            .send({
                id: '61dc705e-6b5c-4926-b636-4fcef37a3861',
                tenantId: '0815f27d-fe2a-42fe-a4b6-a3196d51fc78',
                tenantCode: 'i2361bwdec1nugqv44ymlflaw4jk53sbq5jxqjbklu9hi3067p',
                systemId: 'ab8af538-0a5b-42f5-b92e-9b2322d1aad3',
                systemName: 'njvtkim8mqlf0b7rqhhr',
                executionId: '614191a0-c210-4be7-95f2-cd0f8a6a3ef7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 14:07:34',
                executionMonitoringStartAt: '2020-11-04 00:37:59',
                executionMonitoringEndAt: '2020-11-04 21:20:39',
                numberMax: -9,
                numberDays: 7868413400,
                success: 8701433158,
                cancelled: 4361520591,
                delivering: 1371273039,
                error: 3538532856,
                holding: 4285484089,
                toBeDelivered: 1795028225,
                waiting: 5420034993,
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
            .send({
                id: '61dc705e-6b5c-4926-b636-4fcef37a3861',
                tenantId: '0815f27d-fe2a-42fe-a4b6-a3196d51fc78',
                tenantCode: 'hj5cus7gqms4bu77sm9a0vwkenwva8q4kpxqrui59zhzq9pbpa',
                systemId: 'ab8af538-0a5b-42f5-b92e-9b2322d1aad3',
                systemName: 'zau3gtv4wax9pl2573xh',
                executionId: '614191a0-c210-4be7-95f2-cd0f8a6a3ef7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 16:53:49',
                executionMonitoringStartAt: '2020-11-04 01:31:39',
                executionMonitoringEndAt: '2020-11-04 22:11:56',
                numberMax: 5297224429,
                numberDays: -9,
                success: 7488401419,
                cancelled: 4635232905,
                delivering: 2698111823,
                error: 9487052899,
                holding: 8091114795,
                toBeDelivered: 1158586397,
                waiting: 7539521120,
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
            .send({
                id: '61dc705e-6b5c-4926-b636-4fcef37a3861',
                tenantId: '0815f27d-fe2a-42fe-a4b6-a3196d51fc78',
                tenantCode: 'whzggtwb526r57c8lumcjnhziptxhyg3goz7s7zysv35n3g78y',
                systemId: 'ab8af538-0a5b-42f5-b92e-9b2322d1aad3',
                systemName: '7a11f0827yeoorfk7iil',
                executionId: '614191a0-c210-4be7-95f2-cd0f8a6a3ef7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 17:22:39',
                executionMonitoringStartAt: '2020-11-04 17:38:30',
                executionMonitoringEndAt: '2020-11-04 09:42:50',
                numberMax: 9013623187,
                numberDays: 7862585616,
                success: -9,
                cancelled: 2427971636,
                delivering: 6821888416,
                error: 8629882926,
                holding: 7363468776,
                toBeDelivered: 3220895162,
                waiting: 2281818762,
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
            .send({
                id: '61dc705e-6b5c-4926-b636-4fcef37a3861',
                tenantId: '0815f27d-fe2a-42fe-a4b6-a3196d51fc78',
                tenantCode: 'pfw3q3vs5o09jqtmpvt9rvlzj7r9jnexcx5bbxqcqk6cp41ot5',
                systemId: 'ab8af538-0a5b-42f5-b92e-9b2322d1aad3',
                systemName: '5r5a4qd6snp2kptamyqk',
                executionId: '614191a0-c210-4be7-95f2-cd0f8a6a3ef7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 01:54:49',
                executionMonitoringStartAt: '2020-11-04 05:04:59',
                executionMonitoringEndAt: '2020-11-04 18:31:02',
                numberMax: 1886610800,
                numberDays: 9622368426,
                success: 4959613861,
                cancelled: -9,
                delivering: 6577799673,
                error: 9895267327,
                holding: 4319788595,
                toBeDelivered: 2704501530,
                waiting: 4780911588,
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
            .send({
                id: '61dc705e-6b5c-4926-b636-4fcef37a3861',
                tenantId: '0815f27d-fe2a-42fe-a4b6-a3196d51fc78',
                tenantCode: 'krn57i8jkfecdvqj4cp5kp06pjqcnqhmhet4h8lchhfpd24i7c',
                systemId: 'ab8af538-0a5b-42f5-b92e-9b2322d1aad3',
                systemName: 'jifzkm92afuzqb5tlszw',
                executionId: '614191a0-c210-4be7-95f2-cd0f8a6a3ef7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 17:25:10',
                executionMonitoringStartAt: '2020-11-04 21:11:44',
                executionMonitoringEndAt: '2020-11-04 17:30:32',
                numberMax: 5583958684,
                numberDays: 6942744298,
                success: 9729066660,
                cancelled: 7712765506,
                delivering: -9,
                error: 2909873839,
                holding: 7139724652,
                toBeDelivered: 9978344278,
                waiting: 9043983145,
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
            .send({
                id: '61dc705e-6b5c-4926-b636-4fcef37a3861',
                tenantId: '0815f27d-fe2a-42fe-a4b6-a3196d51fc78',
                tenantCode: 'qhjwxe5x81x1m050gtoxfwwu1gwchte4136cuhmhzp6ishda2u',
                systemId: 'ab8af538-0a5b-42f5-b92e-9b2322d1aad3',
                systemName: '2fmfpjyzmhevc2tp01qh',
                executionId: '614191a0-c210-4be7-95f2-cd0f8a6a3ef7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 07:16:04',
                executionMonitoringStartAt: '2020-11-04 02:04:19',
                executionMonitoringEndAt: '2020-11-04 03:46:21',
                numberMax: 1127567244,
                numberDays: 4966202510,
                success: 8834147465,
                cancelled: 7122091651,
                delivering: 8555785636,
                error: -9,
                holding: 2195906185,
                toBeDelivered: 2870163537,
                waiting: 3250859745,
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
            .send({
                id: '61dc705e-6b5c-4926-b636-4fcef37a3861',
                tenantId: '0815f27d-fe2a-42fe-a4b6-a3196d51fc78',
                tenantCode: 'rtaxr9kttxmlvnruf3nmba0dln90ptzpycrnm6xzw6l7zmm3ic',
                systemId: 'ab8af538-0a5b-42f5-b92e-9b2322d1aad3',
                systemName: 'uwzmus3vm0564sov9srb',
                executionId: '614191a0-c210-4be7-95f2-cd0f8a6a3ef7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 22:57:28',
                executionMonitoringStartAt: '2020-11-04 02:32:20',
                executionMonitoringEndAt: '2020-11-04 00:22:02',
                numberMax: 2280854663,
                numberDays: 2081584127,
                success: 7054730211,
                cancelled: 4026610976,
                delivering: 5867453450,
                error: 3192692870,
                holding: -9,
                toBeDelivered: 4021835558,
                waiting: 2685106682,
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
            .send({
                id: '61dc705e-6b5c-4926-b636-4fcef37a3861',
                tenantId: '0815f27d-fe2a-42fe-a4b6-a3196d51fc78',
                tenantCode: 'tlg27w3h1s0dbotnb9xxh1ke304oybd6k0y8rx8kae9sbj5nc1',
                systemId: 'ab8af538-0a5b-42f5-b92e-9b2322d1aad3',
                systemName: 'jsd2r1wigg5t3jpx5wjf',
                executionId: '614191a0-c210-4be7-95f2-cd0f8a6a3ef7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 07:02:57',
                executionMonitoringStartAt: '2020-11-04 02:54:05',
                executionMonitoringEndAt: '2020-11-04 06:55:29',
                numberMax: 5115452620,
                numberDays: 3477823079,
                success: 7147886579,
                cancelled: 4699444837,
                delivering: 1863516670,
                error: 1056025378,
                holding: 7406364698,
                toBeDelivered: -9,
                waiting: 6292727013,
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
            .send({
                id: '61dc705e-6b5c-4926-b636-4fcef37a3861',
                tenantId: '0815f27d-fe2a-42fe-a4b6-a3196d51fc78',
                tenantCode: 'ggu15p3iv1go9h38ftr52vu2is9mdhmc7ntao0m3cop07o2i4t',
                systemId: 'ab8af538-0a5b-42f5-b92e-9b2322d1aad3',
                systemName: 'kg2j219y5yg1rqclhs7o',
                executionId: '614191a0-c210-4be7-95f2-cd0f8a6a3ef7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 10:48:59',
                executionMonitoringStartAt: '2020-11-04 08:05:39',
                executionMonitoringEndAt: '2020-11-04 00:35:45',
                numberMax: 2682409646,
                numberDays: 1069087982,
                success: 2854843133,
                cancelled: 3635444699,
                delivering: 5561483738,
                error: 7934052170,
                holding: 1662355784,
                toBeDelivered: 5778346039,
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
            .send({
                id: '61dc705e-6b5c-4926-b636-4fcef37a3861',
                tenantId: '0815f27d-fe2a-42fe-a4b6-a3196d51fc78',
                tenantCode: '1rq1ba1e2k5hxx1atfwreap1ekzk08oyh72f61t0498h8hfoxp',
                systemId: 'ab8af538-0a5b-42f5-b92e-9b2322d1aad3',
                systemName: 'u3w3j3og2ogwiy8jmgve',
                executionId: '614191a0-c210-4be7-95f2-cd0f8a6a3ef7',
                executionType: 'XXXX',
                executionExecutedAt: '2020-11-04 06:14:07',
                executionMonitoringStartAt: '2020-11-04 00:07:00',
                executionMonitoringEndAt: '2020-11-04 01:08:23',
                numberMax: 5242629093,
                numberDays: 1564587761,
                success: 4285969125,
                cancelled: 7326574677,
                delivering: 8820290651,
                error: 3182782046,
                holding: 8999035017,
                toBeDelivered: 3879709236,
                waiting: 6023228422,
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
            .send({
                id: '61dc705e-6b5c-4926-b636-4fcef37a3861',
                tenantId: '0815f27d-fe2a-42fe-a4b6-a3196d51fc78',
                tenantCode: '49cpvgxcr16tgebofdyxp6detgoi3qodcvuzxpf60jwgkyutzc',
                systemId: 'ab8af538-0a5b-42f5-b92e-9b2322d1aad3',
                systemName: 'czu8do2gtkrji8c5c093',
                executionId: '614191a0-c210-4be7-95f2-cd0f8a6a3ef7',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-11-04 04:28:54',
                executionMonitoringEndAt: '2020-11-04 03:58:28',
                numberMax: 1588043903,
                numberDays: 9493293245,
                success: 9533684097,
                cancelled: 4264350697,
                delivering: 9745789175,
                error: 5500043066,
                holding: 5128882107,
                toBeDelivered: 6555003378,
                waiting: 7551980358,
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
            .send({
                id: '61dc705e-6b5c-4926-b636-4fcef37a3861',
                tenantId: '0815f27d-fe2a-42fe-a4b6-a3196d51fc78',
                tenantCode: 'jyblf62yfzxhnjq2p4519pmolj3eoopudet8k8azgdxw83k35k',
                systemId: 'ab8af538-0a5b-42f5-b92e-9b2322d1aad3',
                systemName: '96605fuy2kfknc2dyijp',
                executionId: '614191a0-c210-4be7-95f2-cd0f8a6a3ef7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 23:45:35',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-11-04 21:32:25',
                numberMax: 4397350636,
                numberDays: 5675397913,
                success: 4906529652,
                cancelled: 2251227742,
                delivering: 4177183602,
                error: 6985919974,
                holding: 1150097440,
                toBeDelivered: 6162931816,
                waiting: 9264329601,
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
            .send({
                id: '61dc705e-6b5c-4926-b636-4fcef37a3861',
                tenantId: '0815f27d-fe2a-42fe-a4b6-a3196d51fc78',
                tenantCode: 'o1w620yvivy59pus9y8sa5adb65blxdse1un6ly587jd37pw0s',
                systemId: 'ab8af538-0a5b-42f5-b92e-9b2322d1aad3',
                systemName: '28ovpxs9af8wdx77aa4d',
                executionId: '614191a0-c210-4be7-95f2-cd0f8a6a3ef7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 06:11:03',
                executionMonitoringStartAt: '2020-11-04 07:44:49',
                executionMonitoringEndAt: 'XXXXXXXX',
                numberMax: 8578314556,
                numberDays: 4644141500,
                success: 4286906521,
                cancelled: 2471983512,
                delivering: 3589458482,
                error: 4567301532,
                holding: 9408015834,
                toBeDelivered: 2732171365,
                waiting: 9299135777,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST cci/message-overview`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '61dc705e-6b5c-4926-b636-4fcef37a3861',
                tenantId: '0815f27d-fe2a-42fe-a4b6-a3196d51fc78',
                tenantCode: 'jv4v79jns9bnzrd90bj63ljaa3d7rdfynhhrgpp3d7irr0fktm',
                systemId: 'ab8af538-0a5b-42f5-b92e-9b2322d1aad3',
                systemName: 'satph0bf3r1a8xz9vv9s',
                executionId: '614191a0-c210-4be7-95f2-cd0f8a6a3ef7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 18:01:06',
                executionMonitoringStartAt: '2020-11-04 16:09:43',
                executionMonitoringEndAt: '2020-11-04 14:27:29',
                numberMax: 8535319260,
                numberDays: 4361515947,
                success: 3983122679,
                cancelled: 4544224253,
                delivering: 9523453812,
                error: 8015375954,
                holding: 3796632564,
                toBeDelivered: 6037902028,
                waiting: 2612568656,
            })
            .expect(201);
    });

    test(`/REST:GET cci/messages-overview/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/messages-overview/paginate')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    offset: 0,
                    limit: 5
                }
            })
            .expect(200)
            .expect({ 
                total   : repository.collectionResponse.length, 
                count   : repository.collectionResponse.length, 
                rows    : repository.collectionResponse.slice(0, 5)
            });
    });

    test(`/REST:GET cci/message-overview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '7b01022b-e49d-43bf-8119-0dd08fefef77'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET cci/message-overview`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '61dc705e-6b5c-4926-b636-4fcef37a3861'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '61dc705e-6b5c-4926-b636-4fcef37a3861'));
    });

    test(`/REST:GET cci/message-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/message-overview/e790e9ae-71be-4078-a3ff-e064d7b282c7')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/message-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/message-overview/61dc705e-6b5c-4926-b636-4fcef37a3861')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '61dc705e-6b5c-4926-b636-4fcef37a3861'));
    });

    test(`/REST:GET cci/messages-overview`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/messages-overview')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT cci/message-overview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: '114524de-fce8-40cb-b716-951d85d9e4a9',
                tenantId: '156cf6c6-8e52-4007-a4b7-0e5b7146f276',
                tenantCode: '6pzw6rnhf0c2e78kwja9r5g9m6jv5k79w7b3h9gpussjin7hks',
                systemId: '405ebf1c-f7cf-4162-af45-8f9bf5a0153f',
                systemName: '5e33p1gxmgb3z5jxoqwc',
                executionId: '7ec9c005-e652-4354-9fe7-24623f407b9e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 11:58:00',
                executionMonitoringStartAt: '2020-11-03 23:19:18',
                executionMonitoringEndAt: '2020-11-04 13:27:34',
                numberMax: 3513120933,
                numberDays: 2391309220,
                success: 3028190271,
                cancelled: 6223330125,
                delivering: 1805418801,
                error: 2433754086,
                holding: 9486627136,
                toBeDelivered: 1407925175,
                waiting: 5795742991,
            })
            .expect(404);
    });

    test(`/REST:PUT cci/message-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: '61dc705e-6b5c-4926-b636-4fcef37a3861',
                tenantId: '0815f27d-fe2a-42fe-a4b6-a3196d51fc78',
                tenantCode: 'wiygz3vhl79kvzf7z50rdqgfo1ogcigu3p8kxzl9v2sbhv8y8c',
                systemId: 'ab8af538-0a5b-42f5-b92e-9b2322d1aad3',
                systemName: '12mie4ukayqjwd53b2kk',
                executionId: '614191a0-c210-4be7-95f2-cd0f8a6a3ef7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 18:37:28',
                executionMonitoringStartAt: '2020-11-04 21:34:12',
                executionMonitoringEndAt: '2020-11-04 13:58:10',
                numberMax: 5302386916,
                numberDays: 5372371106,
                success: 9963055222,
                cancelled: 7497535712,
                delivering: 8232198465,
                error: 3921774429,
                holding: 8825851471,
                toBeDelivered: 7592322814,
                waiting: 7083892468,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '61dc705e-6b5c-4926-b636-4fcef37a3861'));
    });

    test(`/REST:DELETE cci/message-overview/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/message-overview/73a191a1-4c0c-400f-b076-2e708a5ee317')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/message-overview/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/message-overview/61dc705e-6b5c-4926-b636-4fcef37a3861')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL cciCreateMessageOverview - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: 
                {
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

    test(`/GraphQL cciCreateMessageOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '87f1cdb6-2975-4b1c-8d64-ab80aff5c9ab',
                        tenantId: '0815f27d-fe2a-42fe-a4b6-a3196d51fc78',
                        tenantCode: 'tg7coxta4r8dw8e6x5gs8y6753z3sttnufmebftev95ys4bdts',
                        systemId: 'ab8af538-0a5b-42f5-b92e-9b2322d1aad3',
                        systemName: '7mlcrdii7a5w1pdzh1mt',
                        executionId: '614191a0-c210-4be7-95f2-cd0f8a6a3ef7',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-11-03 23:40:35',
                        executionMonitoringStartAt: '2020-11-04 05:38:41',
                        executionMonitoringEndAt: '2020-11-04 22:17:51',
                        numberMax: 3025953430,
                        numberDays: 1226551424,
                        success: 1750064908,
                        cancelled: 8021567043,
                        delivering: 7691151717,
                        error: 4651730067,
                        holding: 1047156289,
                        toBeDelivered: 2225399661,
                        waiting: 2383596082,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateMessageOverview).toHaveProperty('id', '87f1cdb6-2975-4b1c-8d64-ab80aff5c9ab');
            });
    });

    test(`/GraphQL cciPaginateMessagesOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                expect(res.body.data.cciPaginateMessagesOverview.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateMessagesOverview.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateMessagesOverview.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL cciFindMessageOverview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                            id: 'af5a5666-997b-4dc4-9949-21458432b82b'
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
                            id: '61dc705e-6b5c-4926-b636-4fcef37a3861'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindMessageOverview.id).toStrictEqual('61dc705e-6b5c-4926-b636-4fcef37a3861');
            });
    });

    test(`/GraphQL cciFindMessageOverviewById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                    id: 'e8af214b-dd5f-4c2e-8838-ec265dd15554'
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
                    id: '61dc705e-6b5c-4926-b636-4fcef37a3861'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindMessageOverviewById.id).toStrictEqual('61dc705e-6b5c-4926-b636-4fcef37a3861');
            });
    });

    test(`/GraphQL cciGetMessagesOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL cciUpdateMessageOverview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                        
                        id: '13249cbe-8fce-40cd-823b-288878082c19',
                        tenantId: 'a3f7b340-cce4-4187-8ec7-ed26123ad31c',
                        tenantCode: '9q1uogg5f1ftk9tlwmypmnkqwq9ue4wm9kiqk8hg2w1s79xa2o',
                        systemId: '6c447854-9555-41e4-b651-5e3d5d22f5da',
                        systemName: '1xcac1uu6879btzz6j96',
                        executionId: 'b8f1e5f3-130b-4210-b9ac-01891ec22248',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-11-04 03:14:36',
                        executionMonitoringStartAt: '2020-11-04 18:39:39',
                        executionMonitoringEndAt: '2020-11-04 22:44:10',
                        numberMax: 6308751984,
                        numberDays: 8830391002,
                        success: 2876299810,
                        cancelled: 6344422701,
                        delivering: 4347941818,
                        error: 9518250808,
                        holding: 7005415590,
                        toBeDelivered: 5247691170,
                        waiting: 1478796704,
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
                        
                        id: '61dc705e-6b5c-4926-b636-4fcef37a3861',
                        tenantId: '0815f27d-fe2a-42fe-a4b6-a3196d51fc78',
                        tenantCode: '36jt2355md80f22g07nhhoxfbk9fzjj440pf1k7wyqzbeh6dh9',
                        systemId: 'ab8af538-0a5b-42f5-b92e-9b2322d1aad3',
                        systemName: 'ciuegggc3by7zi862h94',
                        executionId: '614191a0-c210-4be7-95f2-cd0f8a6a3ef7',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-11-04 22:26:45',
                        executionMonitoringStartAt: '2020-11-04 09:45:51',
                        executionMonitoringEndAt: '2020-11-04 17:59:17',
                        numberMax: 7344860454,
                        numberDays: 1744067869,
                        success: 9706000215,
                        cancelled: 9154973291,
                        delivering: 9554285404,
                        error: 2262809985,
                        holding: 8979255529,
                        toBeDelivered: 5786603996,
                        waiting: 2286739677,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateMessageOverview.id).toStrictEqual('61dc705e-6b5c-4926-b636-4fcef37a3861');
            });
    });

    test(`/GraphQL cciDeleteMessageOverviewById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                    id: '21383b87-cf4d-4fe9-9762-599310bd55b3'
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
                    id: '61dc705e-6b5c-4926-b636-4fcef37a3861'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteMessageOverviewById.id).toStrictEqual('61dc705e-6b5c-4926-b636-4fcef37a3861');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});