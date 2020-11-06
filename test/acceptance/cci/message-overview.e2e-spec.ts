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
                tenantId: '52b49739-c02b-462f-ae7b-ecda3c797d66',
                tenantCode: 'zj1w431c0gs3n1hj4b8tl3x68nbfi8u96cylnt0ubb59oza5id',
                systemId: '7c4ea213-d810-4452-9d97-256f4a8e32ae',
                systemName: '9bnfqfixl4ifkrzxzgq3',
                executionId: 'ffa50060-6076-44f6-934e-d5ece144fd4b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-06 04:01:13',
                executionMonitoringStartAt: '2020-11-06 08:23:09',
                executionMonitoringEndAt: '2020-11-05 17:26:29',
                numberMax: 6076777913,
                numberDays: 3478816611,
                success: 3135805396,
                cancelled: 4578195704,
                delivering: 1854024207,
                error: 9951348496,
                holding: 4683135985,
                toBeDelivered: 8302225370,
                waiting: 6561356784,
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
                
                tenantId: '52b49739-c02b-462f-ae7b-ecda3c797d66',
                tenantCode: 'ijh2zdz4p0evezndwfk57ey8ik8r1hlkqtjr53mh7zu6pz9ynl',
                systemId: '7c4ea213-d810-4452-9d97-256f4a8e32ae',
                systemName: 'rhr0mj6xki1ha1mylyg4',
                executionId: 'ffa50060-6076-44f6-934e-d5ece144fd4b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 15:14:59',
                executionMonitoringStartAt: '2020-11-05 16:03:46',
                executionMonitoringEndAt: '2020-11-05 14:49:45',
                numberMax: 5416576389,
                numberDays: 1920402936,
                success: 1082850644,
                cancelled: 3468831099,
                delivering: 2070847650,
                error: 3706608620,
                holding: 4242430271,
                toBeDelivered: 4345490671,
                waiting: 5132851144,
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
                id: 'da4b0fff-b5f3-4ff9-9394-8e72e39df088',
                tenantId: null,
                tenantCode: 'h7d0wb06p5gakmpw2ap8n4nu5k9rka69coqlmhoq20ixvfrtpg',
                systemId: '7c4ea213-d810-4452-9d97-256f4a8e32ae',
                systemName: 'lpkc74d04d8elo4i07ks',
                executionId: 'ffa50060-6076-44f6-934e-d5ece144fd4b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-05 21:59:38',
                executionMonitoringStartAt: '2020-11-06 01:41:52',
                executionMonitoringEndAt: '2020-11-06 09:54:03',
                numberMax: 3814578435,
                numberDays: 2091905328,
                success: 2318026154,
                cancelled: 5742115214,
                delivering: 3789108911,
                error: 3421113726,
                holding: 2726679809,
                toBeDelivered: 3092735976,
                waiting: 8630475692,
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
                id: 'da4b0fff-b5f3-4ff9-9394-8e72e39df088',
                
                tenantCode: 'l25t4b2ff0wut1o47wn4l545xyhiwnhzsv9bpc872khu4fkzwj',
                systemId: '7c4ea213-d810-4452-9d97-256f4a8e32ae',
                systemName: 'yo5t6do1lyeyojpclr9v',
                executionId: 'ffa50060-6076-44f6-934e-d5ece144fd4b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-05 17:41:08',
                executionMonitoringStartAt: '2020-11-06 00:09:12',
                executionMonitoringEndAt: '2020-11-06 06:25:46',
                numberMax: 9990351156,
                numberDays: 1875878899,
                success: 8461302734,
                cancelled: 3527654277,
                delivering: 8824594106,
                error: 7670568143,
                holding: 6809315796,
                toBeDelivered: 9071153151,
                waiting: 2212444719,
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
                id: 'da4b0fff-b5f3-4ff9-9394-8e72e39df088',
                tenantId: '52b49739-c02b-462f-ae7b-ecda3c797d66',
                tenantCode: null,
                systemId: '7c4ea213-d810-4452-9d97-256f4a8e32ae',
                systemName: '3lgidlxagziq630u0d19',
                executionId: 'ffa50060-6076-44f6-934e-d5ece144fd4b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 07:41:31',
                executionMonitoringStartAt: '2020-11-05 18:35:53',
                executionMonitoringEndAt: '2020-11-06 02:23:21',
                numberMax: 4194153481,
                numberDays: 3109698396,
                success: 2378392853,
                cancelled: 3080905175,
                delivering: 3928314674,
                error: 2157768315,
                holding: 4775635226,
                toBeDelivered: 7382877460,
                waiting: 8140495392,
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
                id: 'da4b0fff-b5f3-4ff9-9394-8e72e39df088',
                tenantId: '52b49739-c02b-462f-ae7b-ecda3c797d66',
                
                systemId: '7c4ea213-d810-4452-9d97-256f4a8e32ae',
                systemName: 'cnm6ptphaa1ocldq1fss',
                executionId: 'ffa50060-6076-44f6-934e-d5ece144fd4b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-05 23:16:47',
                executionMonitoringStartAt: '2020-11-05 16:43:17',
                executionMonitoringEndAt: '2020-11-05 19:19:01',
                numberMax: 6236378002,
                numberDays: 8677159262,
                success: 2000487913,
                cancelled: 5730137022,
                delivering: 9799378681,
                error: 1628952722,
                holding: 6562860147,
                toBeDelivered: 9491457991,
                waiting: 3355498978,
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
                id: 'da4b0fff-b5f3-4ff9-9394-8e72e39df088',
                tenantId: '52b49739-c02b-462f-ae7b-ecda3c797d66',
                tenantCode: 'xwyf5j03lj2zh2ffkdsq2cfx80nfxjblteh6r30hfiimup82gj',
                systemId: null,
                systemName: 'wt3l478lfigq39f58qpl',
                executionId: 'ffa50060-6076-44f6-934e-d5ece144fd4b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 00:59:44',
                executionMonitoringStartAt: '2020-11-05 17:05:40',
                executionMonitoringEndAt: '2020-11-05 14:13:26',
                numberMax: 9970446044,
                numberDays: 5795898676,
                success: 1180365088,
                cancelled: 6403785435,
                delivering: 5095028184,
                error: 4937550013,
                holding: 4738882884,
                toBeDelivered: 3242659487,
                waiting: 8735063295,
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
                id: 'da4b0fff-b5f3-4ff9-9394-8e72e39df088',
                tenantId: '52b49739-c02b-462f-ae7b-ecda3c797d66',
                tenantCode: '8xns050c0xdinc7t0u2uhqjg1wqcfxjamd3u23d0n9edcn9cjx',
                
                systemName: 'jap6zi41w4up85gdxrxk',
                executionId: 'ffa50060-6076-44f6-934e-d5ece144fd4b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-06 04:32:51',
                executionMonitoringStartAt: '2020-11-05 19:45:55',
                executionMonitoringEndAt: '2020-11-05 21:04:59',
                numberMax: 4639951355,
                numberDays: 5197967829,
                success: 2018995931,
                cancelled: 8193492158,
                delivering: 6863321205,
                error: 6768740445,
                holding: 6778324348,
                toBeDelivered: 4603727413,
                waiting: 4368023696,
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
                id: 'da4b0fff-b5f3-4ff9-9394-8e72e39df088',
                tenantId: '52b49739-c02b-462f-ae7b-ecda3c797d66',
                tenantCode: '42fidz1bebgbvdno4y42vmfgcm6l7x7d7kj7qfbfl2pbxngqda',
                systemId: '7c4ea213-d810-4452-9d97-256f4a8e32ae',
                systemName: null,
                executionId: 'ffa50060-6076-44f6-934e-d5ece144fd4b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-05 17:37:46',
                executionMonitoringStartAt: '2020-11-05 18:00:21',
                executionMonitoringEndAt: '2020-11-06 05:47:24',
                numberMax: 7099501858,
                numberDays: 1693977996,
                success: 2930562351,
                cancelled: 5476002116,
                delivering: 5294625617,
                error: 4862499437,
                holding: 4092640906,
                toBeDelivered: 8519988111,
                waiting: 3615122443,
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
                id: 'da4b0fff-b5f3-4ff9-9394-8e72e39df088',
                tenantId: '52b49739-c02b-462f-ae7b-ecda3c797d66',
                tenantCode: 'et3wc1z8ri4ql0l7m7amw3oqhesut2gtc1cab5oikf77tb9x40',
                systemId: '7c4ea213-d810-4452-9d97-256f4a8e32ae',
                
                executionId: 'ffa50060-6076-44f6-934e-d5ece144fd4b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-05 14:55:49',
                executionMonitoringStartAt: '2020-11-06 06:13:22',
                executionMonitoringEndAt: '2020-11-06 11:53:06',
                numberMax: 7465839121,
                numberDays: 9810720721,
                success: 2280802451,
                cancelled: 3451814348,
                delivering: 8110217099,
                error: 7928935840,
                holding: 9817141967,
                toBeDelivered: 9487875970,
                waiting: 8480223757,
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
                id: 'da4b0fff-b5f3-4ff9-9394-8e72e39df088',
                tenantId: '52b49739-c02b-462f-ae7b-ecda3c797d66',
                tenantCode: '4qmgw2c06fb9i7vrll416eo9d4nzi8ufhkcnwtl3unvqv0jcze',
                systemId: '7c4ea213-d810-4452-9d97-256f4a8e32ae',
                systemName: 'j5cq59wumpbfkdg1d4nc',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 02:39:18',
                executionMonitoringStartAt: '2020-11-06 06:20:46',
                executionMonitoringEndAt: '2020-11-05 17:20:53',
                numberMax: 6799221168,
                numberDays: 3332120784,
                success: 9267166468,
                cancelled: 6987659348,
                delivering: 6128479997,
                error: 5639699873,
                holding: 8133695200,
                toBeDelivered: 1456325585,
                waiting: 4303804097,
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
                id: 'da4b0fff-b5f3-4ff9-9394-8e72e39df088',
                tenantId: '52b49739-c02b-462f-ae7b-ecda3c797d66',
                tenantCode: 'yknkzuodbdave7v8zgqyilz8zbqyur582ez6slfr00x42ik1at',
                systemId: '7c4ea213-d810-4452-9d97-256f4a8e32ae',
                systemName: 'm0u8ig8hjuyuvz3lcpgu',
                
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 23:03:19',
                executionMonitoringStartAt: '2020-11-06 00:32:28',
                executionMonitoringEndAt: '2020-11-06 06:10:15',
                numberMax: 9797801244,
                numberDays: 1263030742,
                success: 9564550938,
                cancelled: 4302498453,
                delivering: 4428937948,
                error: 4370782911,
                holding: 3012632043,
                toBeDelivered: 2497906766,
                waiting: 1043199736,
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
                id: 'da4b0fff-b5f3-4ff9-9394-8e72e39df088',
                tenantId: '52b49739-c02b-462f-ae7b-ecda3c797d66',
                tenantCode: 'xnxmd5cpuqdylaq70eq91rx3dv75w74oh3uul6yssgoj37euxd',
                systemId: '7c4ea213-d810-4452-9d97-256f4a8e32ae',
                systemName: 'mb7l3rwar27e7u82pil9',
                executionId: 'ffa50060-6076-44f6-934e-d5ece144fd4b',
                executionType: null,
                executionExecutedAt: '2020-11-06 01:49:24',
                executionMonitoringStartAt: '2020-11-06 11:57:31',
                executionMonitoringEndAt: '2020-11-05 17:30:48',
                numberMax: 2796642407,
                numberDays: 7593002300,
                success: 3392778062,
                cancelled: 9631797117,
                delivering: 1970097777,
                error: 8727620350,
                holding: 1673321179,
                toBeDelivered: 4754684531,
                waiting: 6300158668,
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
                id: 'da4b0fff-b5f3-4ff9-9394-8e72e39df088',
                tenantId: '52b49739-c02b-462f-ae7b-ecda3c797d66',
                tenantCode: 'wruffe6jgsxip6ayzte3z2hey6uk690y4gy6g58u2x1gyu59fw',
                systemId: '7c4ea213-d810-4452-9d97-256f4a8e32ae',
                systemName: '0dihdi62cnb0c0zkdejg',
                executionId: 'ffa50060-6076-44f6-934e-d5ece144fd4b',
                
                executionExecutedAt: '2020-11-06 10:50:36',
                executionMonitoringStartAt: '2020-11-05 21:20:39',
                executionMonitoringEndAt: '2020-11-05 21:21:55',
                numberMax: 2102245091,
                numberDays: 1234841946,
                success: 2439924803,
                cancelled: 8696599793,
                delivering: 7086241643,
                error: 7868771117,
                holding: 3227824908,
                toBeDelivered: 7914436815,
                waiting: 6952624667,
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
                id: 'da4b0fff-b5f3-4ff9-9394-8e72e39df088',
                tenantId: '52b49739-c02b-462f-ae7b-ecda3c797d66',
                tenantCode: 'q6zy4xu1p8s6lpko5pvmraauiknij0i9vuinohf4vbm9k64mro',
                systemId: '7c4ea213-d810-4452-9d97-256f4a8e32ae',
                systemName: 'qu5l7kxxhld2tk2trtja',
                executionId: 'ffa50060-6076-44f6-934e-d5ece144fd4b',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-11-06 01:35:30',
                executionMonitoringEndAt: '2020-11-05 18:03:22',
                numberMax: 5319387103,
                numberDays: 7380047487,
                success: 9542774815,
                cancelled: 9785001360,
                delivering: 4464113081,
                error: 7509680653,
                holding: 7128593819,
                toBeDelivered: 5828236527,
                waiting: 4456575922,
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
                id: 'da4b0fff-b5f3-4ff9-9394-8e72e39df088',
                tenantId: '52b49739-c02b-462f-ae7b-ecda3c797d66',
                tenantCode: 'o8vqcdd8g19lo83gchpna2vqeoz97sgkerbygp9ec6uxvl2fzz',
                systemId: '7c4ea213-d810-4452-9d97-256f4a8e32ae',
                systemName: 'd9kghwny2zaiqriaijz9',
                executionId: 'ffa50060-6076-44f6-934e-d5ece144fd4b',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-11-05 16:24:33',
                executionMonitoringEndAt: '2020-11-06 00:26:54',
                numberMax: 9376366254,
                numberDays: 3541765536,
                success: 7419181774,
                cancelled: 6087246523,
                delivering: 6408923119,
                error: 3929825564,
                holding: 3999028994,
                toBeDelivered: 3015567687,
                waiting: 6044791936,
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
                id: 'da4b0fff-b5f3-4ff9-9394-8e72e39df088',
                tenantId: '52b49739-c02b-462f-ae7b-ecda3c797d66',
                tenantCode: '99oheuub4j8a8yswhl4cfbnujcnvkg5fxnog6752c8imj4gbl5',
                systemId: '7c4ea213-d810-4452-9d97-256f4a8e32ae',
                systemName: '0h02vuba4rxhcseq3epx',
                executionId: 'ffa50060-6076-44f6-934e-d5ece144fd4b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 11:50:08',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-11-06 08:02:27',
                numberMax: 6104104909,
                numberDays: 5283679024,
                success: 4996331142,
                cancelled: 5749669167,
                delivering: 2393266380,
                error: 7280789451,
                holding: 1095720092,
                toBeDelivered: 9466198835,
                waiting: 7499088242,
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
                id: 'da4b0fff-b5f3-4ff9-9394-8e72e39df088',
                tenantId: '52b49739-c02b-462f-ae7b-ecda3c797d66',
                tenantCode: '6987v6o8s2fvcp6hacmpccgztdpjaajok9p573c5jojr3hhzzx',
                systemId: '7c4ea213-d810-4452-9d97-256f4a8e32ae',
                systemName: '23gmulcpg2z1qgcxs59p',
                executionId: 'ffa50060-6076-44f6-934e-d5ece144fd4b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-05 22:50:23',
                
                executionMonitoringEndAt: '2020-11-06 01:58:31',
                numberMax: 6018619252,
                numberDays: 5283884677,
                success: 9154039930,
                cancelled: 6031951856,
                delivering: 2471232687,
                error: 6502261287,
                holding: 4022509324,
                toBeDelivered: 3099074189,
                waiting: 1461713730,
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
                id: 'da4b0fff-b5f3-4ff9-9394-8e72e39df088',
                tenantId: '52b49739-c02b-462f-ae7b-ecda3c797d66',
                tenantCode: '0n55acmr2vc6xuwmtl3dpoftvwram1w2005j4tg2esw4ypr8to',
                systemId: '7c4ea213-d810-4452-9d97-256f4a8e32ae',
                systemName: 'idj8titn5redt19aisdd',
                executionId: 'ffa50060-6076-44f6-934e-d5ece144fd4b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-06 07:27:39',
                executionMonitoringStartAt: '2020-11-06 06:56:47',
                executionMonitoringEndAt: null,
                numberMax: 2120630566,
                numberDays: 1126914753,
                success: 3633143191,
                cancelled: 5792443131,
                delivering: 9553778261,
                error: 7159734661,
                holding: 9652969001,
                toBeDelivered: 3715804303,
                waiting: 6531626027,
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
                id: 'da4b0fff-b5f3-4ff9-9394-8e72e39df088',
                tenantId: '52b49739-c02b-462f-ae7b-ecda3c797d66',
                tenantCode: 'rlep193osw60ctw7q2v1qy8bqw0jevxl4g091qac48rj1mblpe',
                systemId: '7c4ea213-d810-4452-9d97-256f4a8e32ae',
                systemName: 'pesccap22jveisqrrx25',
                executionId: 'ffa50060-6076-44f6-934e-d5ece144fd4b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-05 17:50:33',
                executionMonitoringStartAt: '2020-11-06 07:22:45',
                
                numberMax: 1813682957,
                numberDays: 3073427925,
                success: 8001487047,
                cancelled: 3501835533,
                delivering: 2236952869,
                error: 2644699767,
                holding: 2267722663,
                toBeDelivered: 8167057489,
                waiting: 6844740818,
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
                id: 'hctl29xdh92sdx4tb4oz81bljnq90qb6r8r1w',
                tenantId: '52b49739-c02b-462f-ae7b-ecda3c797d66',
                tenantCode: 'gpvxv9l73a53eotwwkl5f7mmifx9w6ypshk21lowaaba218mty',
                systemId: '7c4ea213-d810-4452-9d97-256f4a8e32ae',
                systemName: 'k7beorv6eodrh0e59wgd',
                executionId: 'ffa50060-6076-44f6-934e-d5ece144fd4b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-05 23:37:22',
                executionMonitoringStartAt: '2020-11-05 13:51:43',
                executionMonitoringEndAt: '2020-11-05 17:30:01',
                numberMax: 1616723333,
                numberDays: 8539886553,
                success: 8646704443,
                cancelled: 8869360723,
                delivering: 7704968631,
                error: 4692271029,
                holding: 1916185525,
                toBeDelivered: 7018918705,
                waiting: 9221311107,
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
                id: 'da4b0fff-b5f3-4ff9-9394-8e72e39df088',
                tenantId: 'h9drp7l0xq4x7bd4j9bbfn5p0y1zcs4zw8rs8',
                tenantCode: 'bfl0dgyugcdlgispz8dmdckvml25jla7wfyotwjdiq64v8ux3t',
                systemId: '7c4ea213-d810-4452-9d97-256f4a8e32ae',
                systemName: 'sq7slmzqbini9a12tr6n',
                executionId: 'ffa50060-6076-44f6-934e-d5ece144fd4b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-06 11:06:22',
                executionMonitoringStartAt: '2020-11-06 05:57:42',
                executionMonitoringEndAt: '2020-11-06 01:58:03',
                numberMax: 9295465387,
                numberDays: 6430030879,
                success: 6528049865,
                cancelled: 6284271013,
                delivering: 4337921500,
                error: 9929545029,
                holding: 4362636075,
                toBeDelivered: 2623352877,
                waiting: 5338685558,
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
                id: 'da4b0fff-b5f3-4ff9-9394-8e72e39df088',
                tenantId: '52b49739-c02b-462f-ae7b-ecda3c797d66',
                tenantCode: 'doysxxp7kh4e9akamrs3o5k6orw0z03vrxb10rb4vjlxds20gg',
                systemId: 'agqwo9gvhw4edjwqgrzlg047op2ph9dhy24a0',
                systemName: '4slhjroebs6g0f4srjlp',
                executionId: 'ffa50060-6076-44f6-934e-d5ece144fd4b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-05 20:15:02',
                executionMonitoringStartAt: '2020-11-05 16:42:54',
                executionMonitoringEndAt: '2020-11-06 08:57:33',
                numberMax: 1466115030,
                numberDays: 4329938770,
                success: 6914646449,
                cancelled: 1089947292,
                delivering: 4941667996,
                error: 4804458269,
                holding: 7717878549,
                toBeDelivered: 4010861722,
                waiting: 8806729418,
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
                id: 'da4b0fff-b5f3-4ff9-9394-8e72e39df088',
                tenantId: '52b49739-c02b-462f-ae7b-ecda3c797d66',
                tenantCode: '54nu7z66qjphqggxug8sj1fzqgp8tpzq7nh5aa3aifra58g9as',
                systemId: '7c4ea213-d810-4452-9d97-256f4a8e32ae',
                systemName: 'j1dteay2mqa99499l9d2',
                executionId: '7h7rcjm1kezzaq0haqdkjcqm5chwopauab24o',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-05 20:31:44',
                executionMonitoringStartAt: '2020-11-06 07:34:12',
                executionMonitoringEndAt: '2020-11-05 22:51:56',
                numberMax: 8855909142,
                numberDays: 2785560059,
                success: 5060340473,
                cancelled: 8886652194,
                delivering: 2353131219,
                error: 5121000325,
                holding: 7886628041,
                toBeDelivered: 3939379103,
                waiting: 8801443425,
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
                id: 'da4b0fff-b5f3-4ff9-9394-8e72e39df088',
                tenantId: '52b49739-c02b-462f-ae7b-ecda3c797d66',
                tenantCode: 'm102skx54tc8w2fy0iswmzbhyb7yc7y9x2lfj2qe4suf65f5qg3',
                systemId: '7c4ea213-d810-4452-9d97-256f4a8e32ae',
                systemName: 'jwit9mlgqiegsm074gl4',
                executionId: 'ffa50060-6076-44f6-934e-d5ece144fd4b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 13:25:37',
                executionMonitoringStartAt: '2020-11-06 04:19:24',
                executionMonitoringEndAt: '2020-11-05 13:32:14',
                numberMax: 4515228275,
                numberDays: 2339885798,
                success: 8526548409,
                cancelled: 1639274352,
                delivering: 6759838301,
                error: 2736699762,
                holding: 9468454176,
                toBeDelivered: 2704819501,
                waiting: 5201056774,
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
                id: 'da4b0fff-b5f3-4ff9-9394-8e72e39df088',
                tenantId: '52b49739-c02b-462f-ae7b-ecda3c797d66',
                tenantCode: 'fydtr6pu3xvr1tzswy8ceqllydrjozbyxtm7p6p5f4h8v46smi',
                systemId: '7c4ea213-d810-4452-9d97-256f4a8e32ae',
                systemName: 'fa0t2hb26uybkwx8j4dy5',
                executionId: 'ffa50060-6076-44f6-934e-d5ece144fd4b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-06 00:21:03',
                executionMonitoringStartAt: '2020-11-06 10:00:14',
                executionMonitoringEndAt: '2020-11-05 14:00:11',
                numberMax: 2278615549,
                numberDays: 8903692048,
                success: 6948413712,
                cancelled: 9564120358,
                delivering: 4677744360,
                error: 6793587832,
                holding: 2207836195,
                toBeDelivered: 2094674516,
                waiting: 4110572165,
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
                id: 'da4b0fff-b5f3-4ff9-9394-8e72e39df088',
                tenantId: '52b49739-c02b-462f-ae7b-ecda3c797d66',
                tenantCode: '10idm3q52ffb05x3vmw5vie2jboum08eyrk1xw0pladaywtg0l',
                systemId: '7c4ea213-d810-4452-9d97-256f4a8e32ae',
                systemName: 'cuk98tczh9vrkxtez7cw',
                executionId: 'ffa50060-6076-44f6-934e-d5ece144fd4b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 18:58:09',
                executionMonitoringStartAt: '2020-11-05 13:51:14',
                executionMonitoringEndAt: '2020-11-06 00:47:56',
                numberMax: 93972599949,
                numberDays: 5334231664,
                success: 4380013541,
                cancelled: 3391922516,
                delivering: 6310115849,
                error: 8970624178,
                holding: 1600011651,
                toBeDelivered: 9053898072,
                waiting: 4015426956,
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
                id: 'da4b0fff-b5f3-4ff9-9394-8e72e39df088',
                tenantId: '52b49739-c02b-462f-ae7b-ecda3c797d66',
                tenantCode: '8vsiu7t13eupppvb3wtsiyxk7d5qotkc5xxs923fqbnc0d5qtl',
                systemId: '7c4ea213-d810-4452-9d97-256f4a8e32ae',
                systemName: '5fj2upwzfgedv52wt6pv',
                executionId: 'ffa50060-6076-44f6-934e-d5ece144fd4b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-05 23:06:56',
                executionMonitoringStartAt: '2020-11-05 17:24:32',
                executionMonitoringEndAt: '2020-11-06 04:43:06',
                numberMax: 9925529083,
                numberDays: 65156668671,
                success: 4840117624,
                cancelled: 7372330237,
                delivering: 6474265501,
                error: 8193077201,
                holding: 6578602920,
                toBeDelivered: 1256640554,
                waiting: 7873649141,
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
                id: 'da4b0fff-b5f3-4ff9-9394-8e72e39df088',
                tenantId: '52b49739-c02b-462f-ae7b-ecda3c797d66',
                tenantCode: 'tq9qjj4wvh35dufiahi3xbgs9sqqr6o0qcf8jfzri2wx3i0q7a',
                systemId: '7c4ea213-d810-4452-9d97-256f4a8e32ae',
                systemName: 'emxfxahygrjpl7qb81fl',
                executionId: 'ffa50060-6076-44f6-934e-d5ece144fd4b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-05 14:21:33',
                executionMonitoringStartAt: '2020-11-05 12:49:00',
                executionMonitoringEndAt: '2020-11-06 01:36:21',
                numberMax: 6075840660,
                numberDays: 2413694103,
                success: 69767556958,
                cancelled: 7224582290,
                delivering: 5032827224,
                error: 9207683146,
                holding: 7938574710,
                toBeDelivered: 2291500842,
                waiting: 2142542458,
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
                id: 'da4b0fff-b5f3-4ff9-9394-8e72e39df088',
                tenantId: '52b49739-c02b-462f-ae7b-ecda3c797d66',
                tenantCode: 'u2f91glt3x1bw2rkaa2fli24t1u9t612g53ehcjaph4mj3rex6',
                systemId: '7c4ea213-d810-4452-9d97-256f4a8e32ae',
                systemName: '599cu4o3o6p0eyyeyqzz',
                executionId: 'ffa50060-6076-44f6-934e-d5ece144fd4b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-05 21:10:07',
                executionMonitoringStartAt: '2020-11-06 02:51:53',
                executionMonitoringEndAt: '2020-11-06 01:44:20',
                numberMax: 6613990061,
                numberDays: 2218497534,
                success: 7722523460,
                cancelled: 17906793258,
                delivering: 5700692723,
                error: 8704542704,
                holding: 8373309496,
                toBeDelivered: 3409412592,
                waiting: 8527840895,
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
                id: 'da4b0fff-b5f3-4ff9-9394-8e72e39df088',
                tenantId: '52b49739-c02b-462f-ae7b-ecda3c797d66',
                tenantCode: 'fmea2txt5uw3vkask41lnntrbyht5ux4zfdig7g9j9k4inx144',
                systemId: '7c4ea213-d810-4452-9d97-256f4a8e32ae',
                systemName: 'sriye5k8pqab363yvy41',
                executionId: 'ffa50060-6076-44f6-934e-d5ece144fd4b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-05 13:25:17',
                executionMonitoringStartAt: '2020-11-05 21:01:15',
                executionMonitoringEndAt: '2020-11-05 19:33:01',
                numberMax: 6915810081,
                numberDays: 1316418055,
                success: 3751924920,
                cancelled: 8982267591,
                delivering: 79087174795,
                error: 7103319985,
                holding: 3669755128,
                toBeDelivered: 2469219481,
                waiting: 6807199001,
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
                id: 'da4b0fff-b5f3-4ff9-9394-8e72e39df088',
                tenantId: '52b49739-c02b-462f-ae7b-ecda3c797d66',
                tenantCode: 'wwifij8rjfbqd88grfxgyi8mz2i1b5aw46vepfioiphvnw6gqd',
                systemId: '7c4ea213-d810-4452-9d97-256f4a8e32ae',
                systemName: 'qzah86wql84eu0hbjt58',
                executionId: 'ffa50060-6076-44f6-934e-d5ece144fd4b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-06 00:19:07',
                executionMonitoringStartAt: '2020-11-06 11:43:46',
                executionMonitoringEndAt: '2020-11-05 15:30:41',
                numberMax: 7560632876,
                numberDays: 5284855129,
                success: 5839796499,
                cancelled: 3659019423,
                delivering: 5381215417,
                error: 37078889962,
                holding: 8843506501,
                toBeDelivered: 7988475559,
                waiting: 3165819558,
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
                id: 'da4b0fff-b5f3-4ff9-9394-8e72e39df088',
                tenantId: '52b49739-c02b-462f-ae7b-ecda3c797d66',
                tenantCode: 'mu7jegra3fajz0bdvpgrvi0a94bgcs0v8ngjids2i5u2kw6l9t',
                systemId: '7c4ea213-d810-4452-9d97-256f4a8e32ae',
                systemName: 'narup8nw3w05i8qckido',
                executionId: 'ffa50060-6076-44f6-934e-d5ece144fd4b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-06 00:18:14',
                executionMonitoringStartAt: '2020-11-06 08:39:03',
                executionMonitoringEndAt: '2020-11-05 23:29:03',
                numberMax: 9702824619,
                numberDays: 1798933673,
                success: 3675846467,
                cancelled: 4042741945,
                delivering: 4259767230,
                error: 9325974716,
                holding: 80432249578,
                toBeDelivered: 8897426235,
                waiting: 6248776992,
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
                id: 'da4b0fff-b5f3-4ff9-9394-8e72e39df088',
                tenantId: '52b49739-c02b-462f-ae7b-ecda3c797d66',
                tenantCode: 'vqm161iutcur2yr1x68g4llbijosqcor2o6jdzv55hx5vxy9kb',
                systemId: '7c4ea213-d810-4452-9d97-256f4a8e32ae',
                systemName: 'umh8f3esy08o6xbmrni0',
                executionId: 'ffa50060-6076-44f6-934e-d5ece144fd4b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 05:52:01',
                executionMonitoringStartAt: '2020-11-06 05:45:16',
                executionMonitoringEndAt: '2020-11-05 20:36:43',
                numberMax: 4499927226,
                numberDays: 9777641285,
                success: 2179099869,
                cancelled: 3373021776,
                delivering: 3213762669,
                error: 7958355842,
                holding: 3430498443,
                toBeDelivered: 97311380194,
                waiting: 2564107741,
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
                id: 'da4b0fff-b5f3-4ff9-9394-8e72e39df088',
                tenantId: '52b49739-c02b-462f-ae7b-ecda3c797d66',
                tenantCode: 'tstb122duz0mwnlryvcpojkfafyjhw2m75jt7quu9ar2an7uai',
                systemId: '7c4ea213-d810-4452-9d97-256f4a8e32ae',
                systemName: 'smmih209oqp6glzphybj',
                executionId: 'ffa50060-6076-44f6-934e-d5ece144fd4b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-06 10:11:02',
                executionMonitoringStartAt: '2020-11-05 12:40:29',
                executionMonitoringEndAt: '2020-11-05 17:40:00',
                numberMax: 5604663067,
                numberDays: 6292202978,
                success: 7001269663,
                cancelled: 3786940105,
                delivering: 3618564149,
                error: 7430108704,
                holding: 4664927032,
                toBeDelivered: 2210525975,
                waiting: 20852017370,
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
                id: 'da4b0fff-b5f3-4ff9-9394-8e72e39df088',
                tenantId: '52b49739-c02b-462f-ae7b-ecda3c797d66',
                tenantCode: '9ur63sj2r7k9s9jcchideivbnp2l1i0q4xdo2gcftj45jlwt86',
                systemId: '7c4ea213-d810-4452-9d97-256f4a8e32ae',
                systemName: 'vj2612fpfpdg0nvz3n7n',
                executionId: 'ffa50060-6076-44f6-934e-d5ece144fd4b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-05 22:37:50',
                executionMonitoringStartAt: '2020-11-06 04:20:41',
                executionMonitoringEndAt: '2020-11-06 02:14:58',
                numberMax: -9,
                numberDays: 8354800234,
                success: 7532867398,
                cancelled: 8365169706,
                delivering: 5921260117,
                error: 1676059674,
                holding: 9407615329,
                toBeDelivered: 6429913711,
                waiting: 6668349679,
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
                id: 'da4b0fff-b5f3-4ff9-9394-8e72e39df088',
                tenantId: '52b49739-c02b-462f-ae7b-ecda3c797d66',
                tenantCode: '6ua19rgynioc1p7nrflv8obi514jenb0th42yz31kdmi3ggecc',
                systemId: '7c4ea213-d810-4452-9d97-256f4a8e32ae',
                systemName: 'gm36qhphx9bei2jrdf3h',
                executionId: 'ffa50060-6076-44f6-934e-d5ece144fd4b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-06 01:08:43',
                executionMonitoringStartAt: '2020-11-05 19:55:56',
                executionMonitoringEndAt: '2020-11-06 04:21:56',
                numberMax: 8615496488,
                numberDays: -9,
                success: 2271208314,
                cancelled: 2578810253,
                delivering: 5525434350,
                error: 1741983474,
                holding: 8139426032,
                toBeDelivered: 2031310184,
                waiting: 8162288910,
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
                id: 'da4b0fff-b5f3-4ff9-9394-8e72e39df088',
                tenantId: '52b49739-c02b-462f-ae7b-ecda3c797d66',
                tenantCode: 'j3xph8uqtc3p8r7z21lpr00zbo1kr7umvoiipaci9vybcvf3jn',
                systemId: '7c4ea213-d810-4452-9d97-256f4a8e32ae',
                systemName: 'y3tk632jkmm04npissm6',
                executionId: 'ffa50060-6076-44f6-934e-d5ece144fd4b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-06 00:31:31',
                executionMonitoringStartAt: '2020-11-06 01:21:59',
                executionMonitoringEndAt: '2020-11-06 08:29:31',
                numberMax: 5865146594,
                numberDays: 9924146718,
                success: -9,
                cancelled: 1961578825,
                delivering: 5147448919,
                error: 1317282157,
                holding: 8332065828,
                toBeDelivered: 3882410740,
                waiting: 2234896148,
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
                id: 'da4b0fff-b5f3-4ff9-9394-8e72e39df088',
                tenantId: '52b49739-c02b-462f-ae7b-ecda3c797d66',
                tenantCode: 'a1fy3ejfa1o4ckiyk7mfq196pw4nhjo31ju0khn1iialt0rxu5',
                systemId: '7c4ea213-d810-4452-9d97-256f4a8e32ae',
                systemName: '87i6jx2nb4w5056ogaxk',
                executionId: 'ffa50060-6076-44f6-934e-d5ece144fd4b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 02:58:16',
                executionMonitoringStartAt: '2020-11-06 04:04:08',
                executionMonitoringEndAt: '2020-11-06 12:05:29',
                numberMax: 9694129137,
                numberDays: 1697552676,
                success: 4037671124,
                cancelled: -9,
                delivering: 9259917040,
                error: 7510473394,
                holding: 9561546401,
                toBeDelivered: 5882189842,
                waiting: 9132615036,
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
                id: 'da4b0fff-b5f3-4ff9-9394-8e72e39df088',
                tenantId: '52b49739-c02b-462f-ae7b-ecda3c797d66',
                tenantCode: '5ic2t7i7phh15c3ubgbax95boyep4bpg7ao2wlzo89dw4ktem5',
                systemId: '7c4ea213-d810-4452-9d97-256f4a8e32ae',
                systemName: '2sbutjun6fdpxioawf2r',
                executionId: 'ffa50060-6076-44f6-934e-d5ece144fd4b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 15:35:23',
                executionMonitoringStartAt: '2020-11-06 04:43:57',
                executionMonitoringEndAt: '2020-11-06 10:54:15',
                numberMax: 2740525252,
                numberDays: 6461021111,
                success: 4517809185,
                cancelled: 3657660049,
                delivering: -9,
                error: 1866546862,
                holding: 4324485478,
                toBeDelivered: 5913344292,
                waiting: 2414048780,
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
                id: 'da4b0fff-b5f3-4ff9-9394-8e72e39df088',
                tenantId: '52b49739-c02b-462f-ae7b-ecda3c797d66',
                tenantCode: 'h5sc3h3aeqs5wtxv2osfaahck7nf1gdw2f132brev37t5op06o',
                systemId: '7c4ea213-d810-4452-9d97-256f4a8e32ae',
                systemName: 'yglfsa7xoh23qiike3ib',
                executionId: 'ffa50060-6076-44f6-934e-d5ece144fd4b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 15:59:16',
                executionMonitoringStartAt: '2020-11-06 06:40:01',
                executionMonitoringEndAt: '2020-11-05 21:44:58',
                numberMax: 2542590132,
                numberDays: 4265512527,
                success: 4527670345,
                cancelled: 1826967079,
                delivering: 4874805098,
                error: -9,
                holding: 8041777879,
                toBeDelivered: 8404729856,
                waiting: 6736927215,
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
                id: 'da4b0fff-b5f3-4ff9-9394-8e72e39df088',
                tenantId: '52b49739-c02b-462f-ae7b-ecda3c797d66',
                tenantCode: '8uz2b5pc49t5kl7uwmy1tegaoewljcody9vw4amj60mvg5allf',
                systemId: '7c4ea213-d810-4452-9d97-256f4a8e32ae',
                systemName: '5o2nro6np6v3ljeudbhu',
                executionId: 'ffa50060-6076-44f6-934e-d5ece144fd4b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-06 09:04:46',
                executionMonitoringStartAt: '2020-11-05 14:41:42',
                executionMonitoringEndAt: '2020-11-05 22:58:42',
                numberMax: 5176206567,
                numberDays: 5958488507,
                success: 8920718900,
                cancelled: 6114219415,
                delivering: 6639730492,
                error: 6071807941,
                holding: -9,
                toBeDelivered: 6104057748,
                waiting: 7815700980,
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
                id: 'da4b0fff-b5f3-4ff9-9394-8e72e39df088',
                tenantId: '52b49739-c02b-462f-ae7b-ecda3c797d66',
                tenantCode: '6x0ie9qwxaw1b4miy3c0tbv3sia6s9wwcpd7bzfskg0wlhxd8t',
                systemId: '7c4ea213-d810-4452-9d97-256f4a8e32ae',
                systemName: '6puo05xiauvft16s6qtg',
                executionId: 'ffa50060-6076-44f6-934e-d5ece144fd4b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-05 18:00:35',
                executionMonitoringStartAt: '2020-11-06 10:04:56',
                executionMonitoringEndAt: '2020-11-06 02:28:56',
                numberMax: 4365657928,
                numberDays: 5315438767,
                success: 1578955038,
                cancelled: 8326261588,
                delivering: 5522231492,
                error: 9099915792,
                holding: 8939218014,
                toBeDelivered: -9,
                waiting: 5500235530,
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
                id: 'da4b0fff-b5f3-4ff9-9394-8e72e39df088',
                tenantId: '52b49739-c02b-462f-ae7b-ecda3c797d66',
                tenantCode: 'ata79yl43bfv20p0dh9mrlzdgr58wbjib66dqpcomiw2litizk',
                systemId: '7c4ea213-d810-4452-9d97-256f4a8e32ae',
                systemName: 'by19ib4tf39igbzho835',
                executionId: 'ffa50060-6076-44f6-934e-d5ece144fd4b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 09:41:57',
                executionMonitoringStartAt: '2020-11-05 23:20:21',
                executionMonitoringEndAt: '2020-11-06 07:14:27',
                numberMax: 4101678480,
                numberDays: 9972096417,
                success: 1414075860,
                cancelled: 1639356984,
                delivering: 2566928491,
                error: 9964842409,
                holding: 6803879165,
                toBeDelivered: 2129839223,
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
                id: 'da4b0fff-b5f3-4ff9-9394-8e72e39df088',
                tenantId: '52b49739-c02b-462f-ae7b-ecda3c797d66',
                tenantCode: 'keufkp7ppk71nh9b9t38qqbv1pc4bejfzsylt81bttwp9hyc2b',
                systemId: '7c4ea213-d810-4452-9d97-256f4a8e32ae',
                systemName: 'g3dlnw18tayd6vxsyxa7',
                executionId: 'ffa50060-6076-44f6-934e-d5ece144fd4b',
                executionType: 'XXXX',
                executionExecutedAt: '2020-11-06 11:48:41',
                executionMonitoringStartAt: '2020-11-05 15:31:23',
                executionMonitoringEndAt: '2020-11-05 16:15:16',
                numberMax: 4136259643,
                numberDays: 7873162455,
                success: 2010985222,
                cancelled: 7181660766,
                delivering: 5279317274,
                error: 6070331272,
                holding: 3362552642,
                toBeDelivered: 1700092766,
                waiting: 7008832668,
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
                id: 'da4b0fff-b5f3-4ff9-9394-8e72e39df088',
                tenantId: '52b49739-c02b-462f-ae7b-ecda3c797d66',
                tenantCode: '0t1x4mlq6iskpkbjodja8wk9p2qlk1zi0iivykbfzmjbbed4q5',
                systemId: '7c4ea213-d810-4452-9d97-256f4a8e32ae',
                systemName: 'b0saubd2y9t6rjk44u16',
                executionId: 'ffa50060-6076-44f6-934e-d5ece144fd4b',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-11-06 09:11:23',
                executionMonitoringEndAt: '2020-11-05 17:58:10',
                numberMax: 5259020459,
                numberDays: 3021817034,
                success: 7349582622,
                cancelled: 3208107867,
                delivering: 3621864411,
                error: 1471920163,
                holding: 3308068778,
                toBeDelivered: 6708066867,
                waiting: 4971645136,
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
                id: 'da4b0fff-b5f3-4ff9-9394-8e72e39df088',
                tenantId: '52b49739-c02b-462f-ae7b-ecda3c797d66',
                tenantCode: 'ppoiv9za6amffbct4rak0iwbo0bs3pirohdshvj6a1n18x8zvn',
                systemId: '7c4ea213-d810-4452-9d97-256f4a8e32ae',
                systemName: 'ggccb8ifnmyzyn0u1mxu',
                executionId: 'ffa50060-6076-44f6-934e-d5ece144fd4b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 11:24:08',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-11-05 17:31:54',
                numberMax: 3679455367,
                numberDays: 1668217502,
                success: 3849457681,
                cancelled: 4697800817,
                delivering: 8241273128,
                error: 3907724688,
                holding: 9231387749,
                toBeDelivered: 8202112566,
                waiting: 6415935473,
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
                id: 'da4b0fff-b5f3-4ff9-9394-8e72e39df088',
                tenantId: '52b49739-c02b-462f-ae7b-ecda3c797d66',
                tenantCode: 'p7o98kvb51k7c833shtjol0ksevako6vssqsu3tf4zi4trw0ga',
                systemId: '7c4ea213-d810-4452-9d97-256f4a8e32ae',
                systemName: 'r772g87yv398yxvpknb6',
                executionId: 'ffa50060-6076-44f6-934e-d5ece144fd4b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 16:02:29',
                executionMonitoringStartAt: '2020-11-05 15:03:27',
                executionMonitoringEndAt: 'XXXXXXXX',
                numberMax: 4686093426,
                numberDays: 3586628230,
                success: 6166043677,
                cancelled: 4584862196,
                delivering: 3498124383,
                error: 1397692378,
                holding: 5710151921,
                toBeDelivered: 1311782685,
                waiting: 7441782241,
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
                id: 'da4b0fff-b5f3-4ff9-9394-8e72e39df088',
                tenantId: '52b49739-c02b-462f-ae7b-ecda3c797d66',
                tenantCode: 'dopeedvxlg62b45v3xdwlv7b8anovxoygxsij039czp2evi0sf',
                systemId: '7c4ea213-d810-4452-9d97-256f4a8e32ae',
                systemName: 'rvjkr176n7cy92gnmlfz',
                executionId: 'ffa50060-6076-44f6-934e-d5ece144fd4b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-05 23:23:00',
                executionMonitoringStartAt: '2020-11-05 17:09:43',
                executionMonitoringEndAt: '2020-11-05 23:30:15',
                numberMax: 2391026697,
                numberDays: 1539076966,
                success: 5524743547,
                cancelled: 2945277153,
                delivering: 3567482347,
                error: 8004208745,
                holding: 3574243425,
                toBeDelivered: 8948627090,
                waiting: 7344867480,
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
                        id: '50e7d0c2-5e93-42be-a646-f0a734282d1f'
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
                        id: 'da4b0fff-b5f3-4ff9-9394-8e72e39df088'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'da4b0fff-b5f3-4ff9-9394-8e72e39df088'));
    });

    test(`/REST:GET cci/message-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/message-overview/6ec8c56e-a2b7-4d65-ac51-0c4ee900666c')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/message-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/message-overview/da4b0fff-b5f3-4ff9-9394-8e72e39df088')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'da4b0fff-b5f3-4ff9-9394-8e72e39df088'));
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
                
                id: '6ab7aeff-8cdd-4556-9d4a-74c5e15feb48',
                tenantId: '58aeb251-afc9-475c-b032-1261312ed7ed',
                tenantCode: 'p3f3r9ile0d7pre97oq2waaxmgi6dte0fc7ljsc19f3dqz2zks',
                systemId: '96a179fa-4813-4e53-9552-fbb283e86507',
                systemName: 'x12v58lbgle63cnsd7do',
                executionId: '848b5d5b-cd48-4c5d-8b5c-a28a2094d947',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 10:59:54',
                executionMonitoringStartAt: '2020-11-05 19:19:32',
                executionMonitoringEndAt: '2020-11-05 22:13:32',
                numberMax: 3730974985,
                numberDays: 2674990833,
                success: 8393701934,
                cancelled: 3069391608,
                delivering: 2038051321,
                error: 6126015474,
                holding: 7985794381,
                toBeDelivered: 6971839660,
                waiting: 7352131691,
            })
            .expect(404);
    });

    test(`/REST:PUT cci/message-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: 'da4b0fff-b5f3-4ff9-9394-8e72e39df088',
                tenantId: '52b49739-c02b-462f-ae7b-ecda3c797d66',
                tenantCode: '8tnomff0c1z4zik7u39g2s4b0peleewmx7ivcza6tx9seqez8b',
                systemId: '7c4ea213-d810-4452-9d97-256f4a8e32ae',
                systemName: 'mrmar7nkvh7dnj1h9win',
                executionId: 'ffa50060-6076-44f6-934e-d5ece144fd4b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 20:37:02',
                executionMonitoringStartAt: '2020-11-05 23:20:15',
                executionMonitoringEndAt: '2020-11-06 10:55:54',
                numberMax: 7357804898,
                numberDays: 5220168310,
                success: 6532018883,
                cancelled: 7697606113,
                delivering: 1197624247,
                error: 1303451933,
                holding: 5140534073,
                toBeDelivered: 4560456615,
                waiting: 2297401886,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'da4b0fff-b5f3-4ff9-9394-8e72e39df088'));
    });

    test(`/REST:DELETE cci/message-overview/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/message-overview/151f4a57-7e7a-4466-bb9a-1c04f51f113f')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/message-overview/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/message-overview/da4b0fff-b5f3-4ff9-9394-8e72e39df088')
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
                        id: '5f1647bb-b772-4ebe-8704-aa35feffd182',
                        tenantId: '52b49739-c02b-462f-ae7b-ecda3c797d66',
                        tenantCode: '74haxbcjx1ca701i9cbzgvojh6jmv4yhjq601qdbo2q6djrqvl',
                        systemId: '7c4ea213-d810-4452-9d97-256f4a8e32ae',
                        systemName: 'ow3bo30a9d7g49f52uxc',
                        executionId: 'ffa50060-6076-44f6-934e-d5ece144fd4b',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-11-05 22:03:56',
                        executionMonitoringStartAt: '2020-11-05 13:13:27',
                        executionMonitoringEndAt: '2020-11-06 06:15:28',
                        numberMax: 9173498967,
                        numberDays: 8592483436,
                        success: 7478738042,
                        cancelled: 4805362596,
                        delivering: 7198838653,
                        error: 8470306191,
                        holding: 2116211456,
                        toBeDelivered: 9214256667,
                        waiting: 5692311650,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateMessageOverview).toHaveProperty('id', '5f1647bb-b772-4ebe-8704-aa35feffd182');
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
                            id: '15c134ed-956b-48f6-a369-172f0b66150d'
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
                            id: 'da4b0fff-b5f3-4ff9-9394-8e72e39df088'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindMessageOverview.id).toStrictEqual('da4b0fff-b5f3-4ff9-9394-8e72e39df088');
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
                    id: 'ba9bf483-44ca-41fc-8e11-f2ca5f011ccd'
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
                    id: 'da4b0fff-b5f3-4ff9-9394-8e72e39df088'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindMessageOverviewById.id).toStrictEqual('da4b0fff-b5f3-4ff9-9394-8e72e39df088');
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
                        
                        id: '01dbb110-6c57-426c-b047-afedaded13c2',
                        tenantId: '4aaa87a1-9bd9-44d4-85a5-9bad12ff2acd',
                        tenantCode: '7v74e5k4ck3vus0wo7pr6utuu5rotof9d79p45ke9lj42cnbdu',
                        systemId: 'f614aa9f-eb5f-4500-9082-ae754036b718',
                        systemName: 'yxw1p0q1ho7xpj877nz4',
                        executionId: '93d431c8-f2ce-4408-9f61-5a53bbd9dd3c',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-11-06 09:11:25',
                        executionMonitoringStartAt: '2020-11-05 19:35:17',
                        executionMonitoringEndAt: '2020-11-05 17:48:42',
                        numberMax: 2607750575,
                        numberDays: 2707559149,
                        success: 9955550756,
                        cancelled: 5501424735,
                        delivering: 5457316400,
                        error: 8033752194,
                        holding: 6005399226,
                        toBeDelivered: 6144232089,
                        waiting: 9145770054,
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
                        
                        id: 'da4b0fff-b5f3-4ff9-9394-8e72e39df088',
                        tenantId: '52b49739-c02b-462f-ae7b-ecda3c797d66',
                        tenantCode: 'wfgwq41twvre63i329c2c9fyq2725u8jkurt2hb36ym41cxnc5',
                        systemId: '7c4ea213-d810-4452-9d97-256f4a8e32ae',
                        systemName: 'dpks39a5er79xku1vb7v',
                        executionId: 'ffa50060-6076-44f6-934e-d5ece144fd4b',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-11-06 03:17:17',
                        executionMonitoringStartAt: '2020-11-05 20:33:22',
                        executionMonitoringEndAt: '2020-11-06 08:03:40',
                        numberMax: 8008288081,
                        numberDays: 4686606008,
                        success: 8473830023,
                        cancelled: 9169850225,
                        delivering: 2442023250,
                        error: 6264152048,
                        holding: 8717024758,
                        toBeDelivered: 8176040479,
                        waiting: 7566066634,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateMessageOverview.id).toStrictEqual('da4b0fff-b5f3-4ff9-9394-8e72e39df088');
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
                    id: '750545fb-c790-4c3f-bebb-b000bb4fa0ce'
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
                    id: 'da4b0fff-b5f3-4ff9-9394-8e72e39df088'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteMessageOverviewById.id).toStrictEqual('da4b0fff-b5f3-4ff9-9394-8e72e39df088');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});