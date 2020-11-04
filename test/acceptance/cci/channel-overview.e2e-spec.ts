import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IChannelOverviewRepository } from '@hades/cci/channel-overview/domain/channel-overview.repository';
import { MockChannelOverviewRepository } from '@hades/cci/channel-overview/infrastructure/mock/mock-channel-overview.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { CciModule } from './../../../src/apps/cci/cci.module';
import * as request from 'supertest';
import * as _ from 'lodash';
import { IamModule } from './../../../src/apps/iam/iam.module';

const importForeignModules = [
    IamModule
];

describe('channel-overview', () =>
{
    let app: INestApplication;
    let repository: MockChannelOverviewRepository;

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
            .overrideProvider(IChannelOverviewRepository)
            .useClass(MockChannelOverviewRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockChannelOverviewRepository>module.get<IChannelOverviewRepository>(IChannelOverviewRepository);

        await app.init();
    });

    test(`/REST:POST cci/channel-overview - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: 'b1787f5b-5525-495e-8bd4-5cf45a8ab078',
                tenantCode: 'efp6ak7hph308iu4ck8vntez1q1wmkdf9vxvnbtwbsxhwp90ao',
                systemId: '4d5577fb-4e34-4c2f-aa86-d0c0683d9254',
                systemName: '5drj9ivly0hp2bwop9df',
                executionId: 'b4be52da-ae1b-46d0-9f8d-ed4028adfafe',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 23:10:07',
                executionMonitoringStartAt: '2020-11-04 10:30:16',
                executionMonitoringEndAt: '2020-11-03 20:35:41',
                error: 3715942267,
                inactive: 6207405586,
                successful: 4707436996,
                stopped: 8348220773,
                unknown: 9079986607,
                unregistered: 4058623136,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: 'b1787f5b-5525-495e-8bd4-5cf45a8ab078',
                tenantCode: 'vnlfj2k2i8wvcp9jlj0g4v1c7n701gfoep0svl51cu37c98yws',
                systemId: '4d5577fb-4e34-4c2f-aa86-d0c0683d9254',
                systemName: 'mkjw1qk9msj8tfqhmrnb',
                executionId: 'b4be52da-ae1b-46d0-9f8d-ed4028adfafe',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 19:03:31',
                executionMonitoringStartAt: '2020-11-03 21:43:29',
                executionMonitoringEndAt: '2020-11-03 20:34:50',
                error: 7668663932,
                inactive: 2640733686,
                successful: 8338729069,
                stopped: 7985563634,
                unknown: 8315368648,
                unregistered: 4090026294,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'b441e714-ffd1-4a15-8eae-f1ed5d986aa3',
                tenantId: null,
                tenantCode: 'ulq6ydumfye4rwl4665m734pk9kmdgvmea9kb3v88q62qgbj3h',
                systemId: '4d5577fb-4e34-4c2f-aa86-d0c0683d9254',
                systemName: '0nt6pfwuwflve9n3mkhl',
                executionId: 'b4be52da-ae1b-46d0-9f8d-ed4028adfafe',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 18:13:39',
                executionMonitoringStartAt: '2020-11-03 21:11:44',
                executionMonitoringEndAt: '2020-11-03 22:43:09',
                error: 2898409145,
                inactive: 9814470469,
                successful: 8755003416,
                stopped: 3851633929,
                unknown: 3689946387,
                unregistered: 4725112449,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'b441e714-ffd1-4a15-8eae-f1ed5d986aa3',
                
                tenantCode: '570l8dgtpukp6iadd2mx8npea57bbg1m58q16wtbad14f2n1il',
                systemId: '4d5577fb-4e34-4c2f-aa86-d0c0683d9254',
                systemName: 'fmhx172yguom99qk27d9',
                executionId: 'b4be52da-ae1b-46d0-9f8d-ed4028adfafe',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 02:08:23',
                executionMonitoringStartAt: '2020-11-03 22:57:27',
                executionMonitoringEndAt: '2020-11-04 01:08:10',
                error: 3706982300,
                inactive: 3181016305,
                successful: 7317162012,
                stopped: 8890461785,
                unknown: 6357643623,
                unregistered: 6892631752,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'b441e714-ffd1-4a15-8eae-f1ed5d986aa3',
                tenantId: 'b1787f5b-5525-495e-8bd4-5cf45a8ab078',
                tenantCode: null,
                systemId: '4d5577fb-4e34-4c2f-aa86-d0c0683d9254',
                systemName: 'pkjeqof3wu13tae241yt',
                executionId: 'b4be52da-ae1b-46d0-9f8d-ed4028adfafe',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 18:30:05',
                executionMonitoringStartAt: '2020-11-04 10:17:50',
                executionMonitoringEndAt: '2020-11-04 04:45:12',
                error: 9777662254,
                inactive: 8946725515,
                successful: 1955518724,
                stopped: 2929276264,
                unknown: 6578852809,
                unregistered: 1236855882,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'b441e714-ffd1-4a15-8eae-f1ed5d986aa3',
                tenantId: 'b1787f5b-5525-495e-8bd4-5cf45a8ab078',
                
                systemId: '4d5577fb-4e34-4c2f-aa86-d0c0683d9254',
                systemName: '23j9sg31vfypszcw2bh6',
                executionId: 'b4be52da-ae1b-46d0-9f8d-ed4028adfafe',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 02:36:23',
                executionMonitoringStartAt: '2020-11-04 11:26:00',
                executionMonitoringEndAt: '2020-11-04 17:24:45',
                error: 2282504863,
                inactive: 7853154945,
                successful: 9449732041,
                stopped: 6502789631,
                unknown: 2172022667,
                unregistered: 9859034117,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'b441e714-ffd1-4a15-8eae-f1ed5d986aa3',
                tenantId: 'b1787f5b-5525-495e-8bd4-5cf45a8ab078',
                tenantCode: 'qfo55e0uf9r4c7sbnc4p6tsw5fkt6g2xz45qnx6ldh622376gf',
                systemId: null,
                systemName: 'zxy5apn8yl8dziupxowu',
                executionId: 'b4be52da-ae1b-46d0-9f8d-ed4028adfafe',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 17:53:14',
                executionMonitoringStartAt: '2020-11-04 00:54:34',
                executionMonitoringEndAt: '2020-11-03 20:18:15',
                error: 1092972969,
                inactive: 8953866947,
                successful: 5809474786,
                stopped: 8256478999,
                unknown: 1576592689,
                unregistered: 6803910294,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'b441e714-ffd1-4a15-8eae-f1ed5d986aa3',
                tenantId: 'b1787f5b-5525-495e-8bd4-5cf45a8ab078',
                tenantCode: 'jh7b40m5pj73nfo6mjrusheay98nycvnz7npus2hzga1smzu5j',
                
                systemName: '4k0ye18r418hhnj3gqy0',
                executionId: 'b4be52da-ae1b-46d0-9f8d-ed4028adfafe',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 10:21:30',
                executionMonitoringStartAt: '2020-11-04 01:48:14',
                executionMonitoringEndAt: '2020-11-04 07:04:18',
                error: 9957276898,
                inactive: 7197732883,
                successful: 4969502233,
                stopped: 2735019029,
                unknown: 6950072905,
                unregistered: 4673435382,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'b441e714-ffd1-4a15-8eae-f1ed5d986aa3',
                tenantId: 'b1787f5b-5525-495e-8bd4-5cf45a8ab078',
                tenantCode: 'fjwppmgn31512l0o61gf2ygrlnsq33dl77v9eegccivc2p4kei',
                systemId: '4d5577fb-4e34-4c2f-aa86-d0c0683d9254',
                systemName: null,
                executionId: 'b4be52da-ae1b-46d0-9f8d-ed4028adfafe',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 03:09:56',
                executionMonitoringStartAt: '2020-11-04 13:01:18',
                executionMonitoringEndAt: '2020-11-04 03:28:38',
                error: 8352953798,
                inactive: 5982395532,
                successful: 4168674175,
                stopped: 8148801685,
                unknown: 1348178191,
                unregistered: 1150437354,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'b441e714-ffd1-4a15-8eae-f1ed5d986aa3',
                tenantId: 'b1787f5b-5525-495e-8bd4-5cf45a8ab078',
                tenantCode: 'bov8x5iky449duj9z27ujwstfezb18cg7dfgrkn25ge6itmie2',
                systemId: '4d5577fb-4e34-4c2f-aa86-d0c0683d9254',
                
                executionId: 'b4be52da-ae1b-46d0-9f8d-ed4028adfafe',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 13:46:34',
                executionMonitoringStartAt: '2020-11-04 12:32:38',
                executionMonitoringEndAt: '2020-11-04 06:04:37',
                error: 1783986275,
                inactive: 1463921139,
                successful: 9248732507,
                stopped: 6045390088,
                unknown: 4392336748,
                unregistered: 4433397651,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'b441e714-ffd1-4a15-8eae-f1ed5d986aa3',
                tenantId: 'b1787f5b-5525-495e-8bd4-5cf45a8ab078',
                tenantCode: 'mj74mt7rphcjy0zkpuuecn0sgn5luqnrmhh13x8qtlch054a5t',
                systemId: '4d5577fb-4e34-4c2f-aa86-d0c0683d9254',
                systemName: 'z9fle7ua8fj63fupgghf',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 04:03:48',
                executionMonitoringStartAt: '2020-11-04 12:30:57',
                executionMonitoringEndAt: '2020-11-04 02:26:32',
                error: 7252450718,
                inactive: 3196140183,
                successful: 4066654159,
                stopped: 6695409911,
                unknown: 7161235115,
                unregistered: 4361068953,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'b441e714-ffd1-4a15-8eae-f1ed5d986aa3',
                tenantId: 'b1787f5b-5525-495e-8bd4-5cf45a8ab078',
                tenantCode: 'ggr39b6uk5tgwvqzz546go3tfzveivmja612q9azf8pzinp92q',
                systemId: '4d5577fb-4e34-4c2f-aa86-d0c0683d9254',
                systemName: '5r0cg3rejxeier1iwsaz',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 22:35:50',
                executionMonitoringStartAt: '2020-11-03 21:08:13',
                executionMonitoringEndAt: '2020-11-04 03:17:42',
                error: 1868914188,
                inactive: 1625564511,
                successful: 3415166465,
                stopped: 2901595413,
                unknown: 6124848365,
                unregistered: 2221742472,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'b441e714-ffd1-4a15-8eae-f1ed5d986aa3',
                tenantId: 'b1787f5b-5525-495e-8bd4-5cf45a8ab078',
                tenantCode: '1w5rfda3rcy7iqo6yzom2uzg6zlf6d7h7r3rgs04qxuqdpeyha',
                systemId: '4d5577fb-4e34-4c2f-aa86-d0c0683d9254',
                systemName: 'lbenmar9hdknle344wco',
                executionId: 'b4be52da-ae1b-46d0-9f8d-ed4028adfafe',
                executionType: null,
                executionExecutedAt: '2020-11-04 06:05:55',
                executionMonitoringStartAt: '2020-11-04 10:59:42',
                executionMonitoringEndAt: '2020-11-04 02:42:53',
                error: 2456148317,
                inactive: 6205472065,
                successful: 6831970079,
                stopped: 9067804512,
                unknown: 2305986234,
                unregistered: 2316003210,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionType must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'b441e714-ffd1-4a15-8eae-f1ed5d986aa3',
                tenantId: 'b1787f5b-5525-495e-8bd4-5cf45a8ab078',
                tenantCode: 'heuexjinmisqcwgrjs64ur6zu895gef24uuvc53zfw7vfjxcp7',
                systemId: '4d5577fb-4e34-4c2f-aa86-d0c0683d9254',
                systemName: 'g32ynyf8vo215ia4vpmy',
                executionId: 'b4be52da-ae1b-46d0-9f8d-ed4028adfafe',
                
                executionExecutedAt: '2020-11-04 13:04:24',
                executionMonitoringStartAt: '2020-11-04 14:10:54',
                executionMonitoringEndAt: '2020-11-04 06:03:02',
                error: 5677349291,
                inactive: 3509112015,
                successful: 9027895729,
                stopped: 4368593798,
                unknown: 9006757986,
                unregistered: 7643911125,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionType must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'b441e714-ffd1-4a15-8eae-f1ed5d986aa3',
                tenantId: 'b1787f5b-5525-495e-8bd4-5cf45a8ab078',
                tenantCode: '4oc4w8csebsbwb757rj6omektzochw0fridl15i7j7tink0rzb',
                systemId: '4d5577fb-4e34-4c2f-aa86-d0c0683d9254',
                systemName: 'ky3dv6up5y4o1e89rbpq',
                executionId: 'b4be52da-ae1b-46d0-9f8d-ed4028adfafe',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-11-04 09:46:41',
                executionMonitoringEndAt: '2020-11-04 12:03:16',
                error: 4019872078,
                inactive: 5598213972,
                successful: 1232014104,
                stopped: 3227215954,
                unknown: 5945912644,
                unregistered: 7449547548,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionExecutedAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'b441e714-ffd1-4a15-8eae-f1ed5d986aa3',
                tenantId: 'b1787f5b-5525-495e-8bd4-5cf45a8ab078',
                tenantCode: 'l19iqw4vud7o34fd0t9cojbhiq15unu55e5no47tc73vbv2eqf',
                systemId: '4d5577fb-4e34-4c2f-aa86-d0c0683d9254',
                systemName: '5f9sg4g1ba4fbqgvkzih',
                executionId: 'b4be52da-ae1b-46d0-9f8d-ed4028adfafe',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-11-04 01:41:19',
                executionMonitoringEndAt: '2020-11-04 04:45:28',
                error: 7510902520,
                inactive: 8916907408,
                successful: 7648462182,
                stopped: 9616082185,
                unknown: 2949479398,
                unregistered: 8994780082,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'b441e714-ffd1-4a15-8eae-f1ed5d986aa3',
                tenantId: 'b1787f5b-5525-495e-8bd4-5cf45a8ab078',
                tenantCode: 'b9unt6xnkw13ehbnpbe8hk030jwe79el0iuruu3v42yi7xv7yl',
                systemId: '4d5577fb-4e34-4c2f-aa86-d0c0683d9254',
                systemName: 'y5x9xl6rr5h6k83sbr0n',
                executionId: 'b4be52da-ae1b-46d0-9f8d-ed4028adfafe',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 16:41:31',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-11-03 20:41:56',
                error: 8408187467,
                inactive: 4012004788,
                successful: 9748867451,
                stopped: 2109831248,
                unknown: 3262231573,
                unregistered: 1309348017,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'b441e714-ffd1-4a15-8eae-f1ed5d986aa3',
                tenantId: 'b1787f5b-5525-495e-8bd4-5cf45a8ab078',
                tenantCode: 'suhowne1tbqoomo27kaoeqigrico37r1e392yxu22il9l6nrdm',
                systemId: '4d5577fb-4e34-4c2f-aa86-d0c0683d9254',
                systemName: 'qrn0hv0nyi9tewcynvny',
                executionId: 'b4be52da-ae1b-46d0-9f8d-ed4028adfafe',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 20:47:10',
                
                executionMonitoringEndAt: '2020-11-04 09:02:45',
                error: 6712051476,
                inactive: 2317317018,
                successful: 4522246716,
                stopped: 5679089772,
                unknown: 1727430061,
                unregistered: 6969054696,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'b441e714-ffd1-4a15-8eae-f1ed5d986aa3',
                tenantId: 'b1787f5b-5525-495e-8bd4-5cf45a8ab078',
                tenantCode: 'ysc8l79cnwygxpxtvjkjg4w7d3fa5ijt8fh7rkrr2norhkxuv1',
                systemId: '4d5577fb-4e34-4c2f-aa86-d0c0683d9254',
                systemName: 'bu0hz7ylj5fx4y7celkd',
                executionId: 'b4be52da-ae1b-46d0-9f8d-ed4028adfafe',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 18:26:48',
                executionMonitoringStartAt: '2020-11-04 00:47:26',
                executionMonitoringEndAt: null,
                error: 6280154232,
                inactive: 1014905874,
                successful: 1088775304,
                stopped: 7626658880,
                unknown: 6777327053,
                unregistered: 2201694254,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-overview - Got 400 Conflict, ChannelOverviewExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'b441e714-ffd1-4a15-8eae-f1ed5d986aa3',
                tenantId: 'b1787f5b-5525-495e-8bd4-5cf45a8ab078',
                tenantCode: '3s2lqc0kywodxmvt0agnatpse6bmtg9eanie3ww950wzhihaw4',
                systemId: '4d5577fb-4e34-4c2f-aa86-d0c0683d9254',
                systemName: 'pj50znqnppuqpor1jnas',
                executionId: 'b4be52da-ae1b-46d0-9f8d-ed4028adfafe',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 07:38:53',
                executionMonitoringStartAt: '2020-11-03 20:44:01',
                
                error: 8114007122,
                inactive: 7709546579,
                successful: 9284539651,
                stopped: 3319884505,
                unknown: 5837743909,
                unregistered: 3376295080,
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
            .send({
                id: 'v0nphtmdt5foobu3m8xfc5s2mrc4i6dvegx1a',
                tenantId: 'b1787f5b-5525-495e-8bd4-5cf45a8ab078',
                tenantCode: 'k3gaxnvmv24fqgfgdf8su5yukamopqrel2m5c8eabjwfspl3dd',
                systemId: '4d5577fb-4e34-4c2f-aa86-d0c0683d9254',
                systemName: 'r0ry3cyv0y1wfb1kiu6s',
                executionId: 'b4be52da-ae1b-46d0-9f8d-ed4028adfafe',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 17:59:24',
                executionMonitoringStartAt: '2020-11-03 21:33:55',
                executionMonitoringEndAt: '2020-11-04 14:39:45',
                error: 3339899769,
                inactive: 9217675273,
                successful: 8873642218,
                stopped: 7393827870,
                unknown: 5392230010,
                unregistered: 8869524098,
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
            .send({
                id: 'b441e714-ffd1-4a15-8eae-f1ed5d986aa3',
                tenantId: '6bb43c13amfz5bztwvswtqemcmwykt644yt89',
                tenantCode: 'qekqd3hour341owvipkvng4iywww83d8ow7vrpdmu9qvp875cl',
                systemId: '4d5577fb-4e34-4c2f-aa86-d0c0683d9254',
                systemName: '2drvot7fowh4q194ep0v',
                executionId: 'b4be52da-ae1b-46d0-9f8d-ed4028adfafe',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 13:53:30',
                executionMonitoringStartAt: '2020-11-03 22:42:58',
                executionMonitoringEndAt: '2020-11-03 20:31:35',
                error: 2722991949,
                inactive: 4247660460,
                successful: 4828049785,
                stopped: 7337545474,
                unknown: 4423476878,
                unregistered: 1291082833,
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
            .send({
                id: 'b441e714-ffd1-4a15-8eae-f1ed5d986aa3',
                tenantId: 'b1787f5b-5525-495e-8bd4-5cf45a8ab078',
                tenantCode: 'vdnxhhrmql1gvo0ofmxbabukoi54bun9hv431yddi6peni3pn3',
                systemId: 'jdslrbim6acsbogya339w12rk1u5c3nj6nz4l',
                systemName: '16w48gxb291lew6grymc',
                executionId: 'b4be52da-ae1b-46d0-9f8d-ed4028adfafe',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 18:47:12',
                executionMonitoringStartAt: '2020-11-04 18:49:03',
                executionMonitoringEndAt: '2020-11-04 00:19:31',
                error: 2449832473,
                inactive: 3276044157,
                successful: 8898818590,
                stopped: 6996746703,
                unknown: 1082599466,
                unregistered: 4516711616,
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
            .send({
                id: 'b441e714-ffd1-4a15-8eae-f1ed5d986aa3',
                tenantId: 'b1787f5b-5525-495e-8bd4-5cf45a8ab078',
                tenantCode: '5yb9vn3ka4pvo7tifcbv8n1hps7ebl4v7jl3cmgeysijjr16ud',
                systemId: '4d5577fb-4e34-4c2f-aa86-d0c0683d9254',
                systemName: '87mgwk8h1nv7z0xl79pu',
                executionId: 'jd13oequ001dsor0qw5t8ckms5rqftorvxd5i',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 20:17:01',
                executionMonitoringStartAt: '2020-11-04 03:06:41',
                executionMonitoringEndAt: '2020-11-04 19:20:10',
                error: 4302982917,
                inactive: 6225430582,
                successful: 1286022997,
                stopped: 6199167196,
                unknown: 1328561562,
                unregistered: 1506918815,
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
            .send({
                id: 'b441e714-ffd1-4a15-8eae-f1ed5d986aa3',
                tenantId: 'b1787f5b-5525-495e-8bd4-5cf45a8ab078',
                tenantCode: 'yf6ckw9p3shp24lxc43ygyzwxso60vwgbswm1xedatjexdxiyvx',
                systemId: '4d5577fb-4e34-4c2f-aa86-d0c0683d9254',
                systemName: '11j33brz07l0kjkufld2',
                executionId: 'b4be52da-ae1b-46d0-9f8d-ed4028adfafe',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 06:14:34',
                executionMonitoringStartAt: '2020-11-04 04:19:21',
                executionMonitoringEndAt: '2020-11-04 17:29:04',
                error: 6117366248,
                inactive: 6337437960,
                successful: 7199178028,
                stopped: 1280053870,
                unknown: 7299707551,
                unregistered: 2946433348,
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
            .send({
                id: 'b441e714-ffd1-4a15-8eae-f1ed5d986aa3',
                tenantId: 'b1787f5b-5525-495e-8bd4-5cf45a8ab078',
                tenantCode: 'xi9fd3acuvvy5ravq20tzyqbk6z6bzxft3e9hehhzcb2hicpxk',
                systemId: '4d5577fb-4e34-4c2f-aa86-d0c0683d9254',
                systemName: '009l5ppdyg4nzycoppiqa',
                executionId: 'b4be52da-ae1b-46d0-9f8d-ed4028adfafe',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 22:59:10',
                executionMonitoringStartAt: '2020-11-04 13:00:20',
                executionMonitoringEndAt: '2020-11-03 22:00:54',
                error: 1945758011,
                inactive: 8139869034,
                successful: 3172730839,
                stopped: 9588089953,
                unknown: 5727686621,
                unregistered: 4995804801,
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
            .send({
                id: 'b441e714-ffd1-4a15-8eae-f1ed5d986aa3',
                tenantId: 'b1787f5b-5525-495e-8bd4-5cf45a8ab078',
                tenantCode: 'ikfrg884htuj5vrbagddsfndnu06xpr86bjivvjx3i7po5q8et',
                systemId: '4d5577fb-4e34-4c2f-aa86-d0c0683d9254',
                systemName: '7t1yo7qliieazdah8mke',
                executionId: 'b4be52da-ae1b-46d0-9f8d-ed4028adfafe',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 02:44:02',
                executionMonitoringStartAt: '2020-11-04 01:15:11',
                executionMonitoringEndAt: '2020-11-04 03:16:28',
                error: 79152308512,
                inactive: 5592800253,
                successful: 2704709549,
                stopped: 2216873773,
                unknown: 2305383081,
                unregistered: 3673010428,
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
            .send({
                id: 'b441e714-ffd1-4a15-8eae-f1ed5d986aa3',
                tenantId: 'b1787f5b-5525-495e-8bd4-5cf45a8ab078',
                tenantCode: '7axgpnwakyj7vo7lj57vdunpi7tjq6oyq4kknszbus69qpmi7w',
                systemId: '4d5577fb-4e34-4c2f-aa86-d0c0683d9254',
                systemName: 'pd2doxzyxamapbbhpsuh',
                executionId: 'b4be52da-ae1b-46d0-9f8d-ed4028adfafe',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 06:02:45',
                executionMonitoringStartAt: '2020-11-04 08:13:14',
                executionMonitoringEndAt: '2020-11-04 02:12:03',
                error: 9097461594,
                inactive: 37684065065,
                successful: 4845363729,
                stopped: 5680267676,
                unknown: 5625026797,
                unregistered: 1655961120,
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
            .send({
                id: 'b441e714-ffd1-4a15-8eae-f1ed5d986aa3',
                tenantId: 'b1787f5b-5525-495e-8bd4-5cf45a8ab078',
                tenantCode: 'm6fbtrw03acxp6j02vzaa29uu0ajak42ileoqi3bcukvt0rxf9',
                systemId: '4d5577fb-4e34-4c2f-aa86-d0c0683d9254',
                systemName: 'yxtic2m2bjjwc7nvfxbc',
                executionId: 'b4be52da-ae1b-46d0-9f8d-ed4028adfafe',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 13:13:37',
                executionMonitoringStartAt: '2020-11-04 13:58:11',
                executionMonitoringEndAt: '2020-11-03 20:20:25',
                error: 6714505656,
                inactive: 8006465681,
                successful: 30284617245,
                stopped: 9665385877,
                unknown: 3714013052,
                unregistered: 5056510452,
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
            .send({
                id: 'b441e714-ffd1-4a15-8eae-f1ed5d986aa3',
                tenantId: 'b1787f5b-5525-495e-8bd4-5cf45a8ab078',
                tenantCode: 'fy9dgjjga5fl68ir39qa5mwqd0ruq9r57al3bqj8kwsj9o24sb',
                systemId: '4d5577fb-4e34-4c2f-aa86-d0c0683d9254',
                systemName: 'iprg8qr05276jbdi6w52',
                executionId: 'b4be52da-ae1b-46d0-9f8d-ed4028adfafe',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 23:13:45',
                executionMonitoringStartAt: '2020-11-04 02:15:14',
                executionMonitoringEndAt: '2020-11-04 10:35:25',
                error: 9984212498,
                inactive: 1651293150,
                successful: 9865484071,
                stopped: 23666056451,
                unknown: 2767496249,
                unregistered: 7902059595,
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
            .send({
                id: 'b441e714-ffd1-4a15-8eae-f1ed5d986aa3',
                tenantId: 'b1787f5b-5525-495e-8bd4-5cf45a8ab078',
                tenantCode: 'kjw1rbyg50r1z8ycwa1n4vt01f9crcpva55t7u54agyop5h2x0',
                systemId: '4d5577fb-4e34-4c2f-aa86-d0c0683d9254',
                systemName: '0psg8b7wwnwc2unzz0a7',
                executionId: 'b4be52da-ae1b-46d0-9f8d-ed4028adfafe',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 20:43:05',
                executionMonitoringStartAt: '2020-11-03 19:34:18',
                executionMonitoringEndAt: '2020-11-03 22:13:09',
                error: 4973822279,
                inactive: 2515604385,
                successful: 6152886992,
                stopped: 7973305165,
                unknown: 21060167149,
                unregistered: 3670824189,
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
            .send({
                id: 'b441e714-ffd1-4a15-8eae-f1ed5d986aa3',
                tenantId: 'b1787f5b-5525-495e-8bd4-5cf45a8ab078',
                tenantCode: 'yn3n1dugwnxnvmn6nbaimp3n3un5rql4ox9jmllmkzrw17586z',
                systemId: '4d5577fb-4e34-4c2f-aa86-d0c0683d9254',
                systemName: 'faiw3grkwn0lxnq0341h',
                executionId: 'b4be52da-ae1b-46d0-9f8d-ed4028adfafe',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 22:24:52',
                executionMonitoringStartAt: '2020-11-04 13:38:30',
                executionMonitoringEndAt: '2020-11-04 06:55:35',
                error: 3093245147,
                inactive: 2845089453,
                successful: 4116469749,
                stopped: 8386719668,
                unknown: 1921194563,
                unregistered: 76384560004,
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
            .send({
                id: 'b441e714-ffd1-4a15-8eae-f1ed5d986aa3',
                tenantId: 'b1787f5b-5525-495e-8bd4-5cf45a8ab078',
                tenantCode: 'tme2q51f47yiie7uksj448u2di4uyyit7imgq3zpvkrrhx1t9w',
                systemId: '4d5577fb-4e34-4c2f-aa86-d0c0683d9254',
                systemName: '5v8iaoto4azac84uinpt',
                executionId: 'b4be52da-ae1b-46d0-9f8d-ed4028adfafe',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 05:49:34',
                executionMonitoringStartAt: '2020-11-03 22:37:19',
                executionMonitoringEndAt: '2020-11-04 14:12:47',
                error: -9,
                inactive: 9240843057,
                successful: 3415653854,
                stopped: 8972792586,
                unknown: 3355236891,
                unregistered: 1358762261,
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
            .send({
                id: 'b441e714-ffd1-4a15-8eae-f1ed5d986aa3',
                tenantId: 'b1787f5b-5525-495e-8bd4-5cf45a8ab078',
                tenantCode: '7nzjs76yusaodnpckk9ra6p9phjxx9l22xkuaalo5k2rghn9qw',
                systemId: '4d5577fb-4e34-4c2f-aa86-d0c0683d9254',
                systemName: 'txhf0w67f7n91jkw6mv4',
                executionId: 'b4be52da-ae1b-46d0-9f8d-ed4028adfafe',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 22:40:49',
                executionMonitoringStartAt: '2020-11-04 08:30:32',
                executionMonitoringEndAt: '2020-11-04 07:21:24',
                error: 4293102801,
                inactive: -9,
                successful: 5526251883,
                stopped: 5284828519,
                unknown: 8591093735,
                unregistered: 7170277006,
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
            .send({
                id: 'b441e714-ffd1-4a15-8eae-f1ed5d986aa3',
                tenantId: 'b1787f5b-5525-495e-8bd4-5cf45a8ab078',
                tenantCode: 'og7sahuh3ke5ddag7k1oo3rz82up5mha676zcz64b35lc0bkqz',
                systemId: '4d5577fb-4e34-4c2f-aa86-d0c0683d9254',
                systemName: 'xuy2d877m0qsxektsajb',
                executionId: 'b4be52da-ae1b-46d0-9f8d-ed4028adfafe',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 10:24:46',
                executionMonitoringStartAt: '2020-11-03 22:03:20',
                executionMonitoringEndAt: '2020-11-04 00:39:39',
                error: 8247031424,
                inactive: 6904379256,
                successful: -9,
                stopped: 8310533027,
                unknown: 1140154456,
                unregistered: 4276875746,
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
            .send({
                id: 'b441e714-ffd1-4a15-8eae-f1ed5d986aa3',
                tenantId: 'b1787f5b-5525-495e-8bd4-5cf45a8ab078',
                tenantCode: '3nktv8u623adqsiw66z36jzjs5tpbk29hwsxlupez23q00zm55',
                systemId: '4d5577fb-4e34-4c2f-aa86-d0c0683d9254',
                systemName: '78xl0d80p15htq55a1om',
                executionId: 'b4be52da-ae1b-46d0-9f8d-ed4028adfafe',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 05:36:27',
                executionMonitoringStartAt: '2020-11-04 01:25:26',
                executionMonitoringEndAt: '2020-11-03 23:53:26',
                error: 1025335695,
                inactive: 1079874181,
                successful: 7201176795,
                stopped: -9,
                unknown: 8866896970,
                unregistered: 2214545334,
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
            .send({
                id: 'b441e714-ffd1-4a15-8eae-f1ed5d986aa3',
                tenantId: 'b1787f5b-5525-495e-8bd4-5cf45a8ab078',
                tenantCode: 'p0flcdtum8xs7msahk1dcs6imzm8oy76pcsyu8d3jkp9kgwd09',
                systemId: '4d5577fb-4e34-4c2f-aa86-d0c0683d9254',
                systemName: 'lf91lx4xg2lkbmgm4t22',
                executionId: 'b4be52da-ae1b-46d0-9f8d-ed4028adfafe',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 16:57:51',
                executionMonitoringStartAt: '2020-11-04 09:16:49',
                executionMonitoringEndAt: '2020-11-04 10:44:31',
                error: 5900468728,
                inactive: 2220992135,
                successful: 3794139636,
                stopped: 7503853499,
                unknown: -9,
                unregistered: 6797430983,
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
            .send({
                id: 'b441e714-ffd1-4a15-8eae-f1ed5d986aa3',
                tenantId: 'b1787f5b-5525-495e-8bd4-5cf45a8ab078',
                tenantCode: 'fyo6ip3ka6i2kbtopfq646d0lm1lpt2znucg5wlyhi6x7lei2w',
                systemId: '4d5577fb-4e34-4c2f-aa86-d0c0683d9254',
                systemName: 'ozrcz2xidfif1gthk28z',
                executionId: 'b4be52da-ae1b-46d0-9f8d-ed4028adfafe',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 08:22:42',
                executionMonitoringStartAt: '2020-11-04 07:14:53',
                executionMonitoringEndAt: '2020-11-04 02:41:07',
                error: 6138966170,
                inactive: 1135276983,
                successful: 4444596819,
                stopped: 1519255736,
                unknown: 1713151614,
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
            .send({
                id: 'b441e714-ffd1-4a15-8eae-f1ed5d986aa3',
                tenantId: 'b1787f5b-5525-495e-8bd4-5cf45a8ab078',
                tenantCode: '5o5td3ks2zlv5b2ris00rdb563bmpbwl7szlcmhwpbi33phz0l',
                systemId: '4d5577fb-4e34-4c2f-aa86-d0c0683d9254',
                systemName: 'aifo9cmjg1mdrvj59367',
                executionId: 'b4be52da-ae1b-46d0-9f8d-ed4028adfafe',
                executionType: 'XXXX',
                executionExecutedAt: '2020-11-04 03:56:52',
                executionMonitoringStartAt: '2020-11-04 03:43:06',
                executionMonitoringEndAt: '2020-11-04 00:22:35',
                error: 5392559719,
                inactive: 8221132854,
                successful: 3429157566,
                stopped: 8661309822,
                unknown: 7318939168,
                unregistered: 7122608531,
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
            .send({
                id: 'b441e714-ffd1-4a15-8eae-f1ed5d986aa3',
                tenantId: 'b1787f5b-5525-495e-8bd4-5cf45a8ab078',
                tenantCode: 'fs89so3v26w41rx6mp9atlnet9a7a5onxs3uqm32g42ltfn8yw',
                systemId: '4d5577fb-4e34-4c2f-aa86-d0c0683d9254',
                systemName: 'yh22hp43giaanciin7m2',
                executionId: 'b4be52da-ae1b-46d0-9f8d-ed4028adfafe',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-11-03 19:31:56',
                executionMonitoringEndAt: '2020-11-04 09:16:07',
                error: 2105378239,
                inactive: 5978791667,
                successful: 9501921711,
                stopped: 3636298408,
                unknown: 2308228797,
                unregistered: 3914119499,
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
            .send({
                id: 'b441e714-ffd1-4a15-8eae-f1ed5d986aa3',
                tenantId: 'b1787f5b-5525-495e-8bd4-5cf45a8ab078',
                tenantCode: 'fo3vdedn6pn6cys698mrzpnwpku29c2y7b5h3i2pj9084vs3ak',
                systemId: '4d5577fb-4e34-4c2f-aa86-d0c0683d9254',
                systemName: '9r7xv7szczw0l78j9qzu',
                executionId: 'b4be52da-ae1b-46d0-9f8d-ed4028adfafe',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 09:54:29',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-11-04 10:07:08',
                error: 5458139978,
                inactive: 5372885956,
                successful: 1040005698,
                stopped: 9673934092,
                unknown: 8032377867,
                unregistered: 6164479381,
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
            .send({
                id: 'b441e714-ffd1-4a15-8eae-f1ed5d986aa3',
                tenantId: 'b1787f5b-5525-495e-8bd4-5cf45a8ab078',
                tenantCode: 'f9gki01jsxcq1qe35mane0k25xcobpjxxvz3p4khi8utd9pkx7',
                systemId: '4d5577fb-4e34-4c2f-aa86-d0c0683d9254',
                systemName: 'l0ydo3yf62w74djb9yq0',
                executionId: 'b4be52da-ae1b-46d0-9f8d-ed4028adfafe',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 15:49:16',
                executionMonitoringStartAt: '2020-11-03 19:50:36',
                executionMonitoringEndAt: 'XXXXXXXX',
                error: 3483239529,
                inactive: 1965303010,
                successful: 8290371316,
                stopped: 4462769080,
                unknown: 1374252544,
                unregistered: 9008863605,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST cci/channel-overview`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'b441e714-ffd1-4a15-8eae-f1ed5d986aa3',
                tenantId: 'b1787f5b-5525-495e-8bd4-5cf45a8ab078',
                tenantCode: 'iddqipq6odpe1ggw6iibt8ldhjyvhk8u6201pfdv5v89x14c2d',
                systemId: '4d5577fb-4e34-4c2f-aa86-d0c0683d9254',
                systemName: 'arfc9bku1advs8mrj9vb',
                executionId: 'b4be52da-ae1b-46d0-9f8d-ed4028adfafe',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 10:59:13',
                executionMonitoringStartAt: '2020-11-04 03:53:21',
                executionMonitoringEndAt: '2020-11-04 00:20:41',
                error: 6505347413,
                inactive: 4934216594,
                successful: 7421205455,
                stopped: 5223437032,
                unknown: 5722360796,
                unregistered: 3190204710,
            })
            .expect(201);
    });

    test(`/REST:GET cci/channels-overview/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channels-overview/paginate')
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

    test(`/REST:GET cci/channel-overview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'c2473748-2380-444f-8f5b-c7c3ebb5ada4'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET cci/channel-overview`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'b441e714-ffd1-4a15-8eae-f1ed5d986aa3'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'b441e714-ffd1-4a15-8eae-f1ed5d986aa3'));
    });

    test(`/REST:GET cci/channel-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channel-overview/3075fea9-807c-4ea2-9891-967e62fd954b')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/channel-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channel-overview/b441e714-ffd1-4a15-8eae-f1ed5d986aa3')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'b441e714-ffd1-4a15-8eae-f1ed5d986aa3'));
    });

    test(`/REST:GET cci/channels-overview`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channels-overview')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT cci/channel-overview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: '2d25df50-6f51-492c-bc34-8cf327fcfd32',
                tenantId: '0670e104-4d7a-434e-abf3-d3a9b3ffb9c0',
                tenantCode: 'zp3h1auectev5zckillpwf3ter9v4dmwefsj9x9ty6n9sw2bk8',
                systemId: '711def22-c576-45d7-8ec3-38a89d2ad5f0',
                systemName: '41mmcf7rol4nsgu2jmtz',
                executionId: 'e41760f3-3155-46e4-9316-e02f85e5fab5',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 02:49:12',
                executionMonitoringStartAt: '2020-11-03 23:55:09',
                executionMonitoringEndAt: '2020-11-04 07:00:32',
                error: 9074631529,
                inactive: 6302282501,
                successful: 8288843705,
                stopped: 3761901832,
                unknown: 5390668857,
                unregistered: 6466619484,
            })
            .expect(404);
    });

    test(`/REST:PUT cci/channel-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: 'b441e714-ffd1-4a15-8eae-f1ed5d986aa3',
                tenantId: 'b1787f5b-5525-495e-8bd4-5cf45a8ab078',
                tenantCode: 'h1zipnqeyabs43zc47bv9t3fy0aoxt84d24bkfdyxz49nkx9pq',
                systemId: '4d5577fb-4e34-4c2f-aa86-d0c0683d9254',
                systemName: '0idhbupl7xf84cv9rz60',
                executionId: 'b4be52da-ae1b-46d0-9f8d-ed4028adfafe',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 00:09:23',
                executionMonitoringStartAt: '2020-11-04 07:17:34',
                executionMonitoringEndAt: '2020-11-03 21:26:47',
                error: 1157422545,
                inactive: 9543593626,
                successful: 3138239641,
                stopped: 2332511691,
                unknown: 2047680518,
                unregistered: 3801802778,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'b441e714-ffd1-4a15-8eae-f1ed5d986aa3'));
    });

    test(`/REST:DELETE cci/channel-overview/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/channel-overview/7860c3a7-b208-4bec-95a3-a1f21dd8bd81')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/channel-overview/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/channel-overview/b441e714-ffd1-4a15-8eae-f1ed5d986aa3')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL cciCreateChannelOverview - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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

    test(`/GraphQL cciCreateChannelOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '1595e74c-f10f-4f92-9a56-275607b89785',
                        tenantId: 'b1787f5b-5525-495e-8bd4-5cf45a8ab078',
                        tenantCode: 'u761sg968qzl4gvjnry9fcntdl0g1i4tzp29jkf4a8t9t25tbw',
                        systemId: '4d5577fb-4e34-4c2f-aa86-d0c0683d9254',
                        systemName: '6nr00jkl5kvbngp0w24g',
                        executionId: 'b4be52da-ae1b-46d0-9f8d-ed4028adfafe',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-11-04 09:59:37',
                        executionMonitoringStartAt: '2020-11-04 01:05:48',
                        executionMonitoringEndAt: '2020-11-04 15:11:43',
                        error: 9282750921,
                        inactive: 4046180072,
                        successful: 9999988478,
                        stopped: 1360574332,
                        unknown: 5570626283,
                        unregistered: 2105918325,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateChannelOverview).toHaveProperty('id', '1595e74c-f10f-4f92-9a56-275607b89785');
            });
    });

    test(`/GraphQL cciPaginateChannelsOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                expect(res.body.data.cciPaginateChannelsOverview.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateChannelsOverview.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateChannelsOverview.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL cciFindChannelOverview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                            id: '54ae670d-efc8-4314-987c-a68da002a5ac'
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
                            id: 'b441e714-ffd1-4a15-8eae-f1ed5d986aa3'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindChannelOverview.id).toStrictEqual('b441e714-ffd1-4a15-8eae-f1ed5d986aa3');
            });
    });

    test(`/GraphQL cciFindChannelOverviewById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                    id: '4a416cf2-0e9c-46a8-b7e9-00dfad774697'
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
                    id: 'b441e714-ffd1-4a15-8eae-f1ed5d986aa3'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindChannelOverviewById.id).toStrictEqual('b441e714-ffd1-4a15-8eae-f1ed5d986aa3');
            });
    });

    test(`/GraphQL cciGetChannelsOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL cciUpdateChannelOverview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                        
                        id: '9d215e83-7899-4bc8-8a16-646e3b3ca2fc',
                        tenantId: '370a55b5-0709-4f0e-a177-c567a4e8a613',
                        tenantCode: 'osjsj7igpn8c3h26m98sxt8ci5jn84tto4nri1xi0hojcmje5t',
                        systemId: '74f4e8c8-4a15-4fa3-a8d8-31cbad1d612e',
                        systemName: 'uhe5u5gcvl34zy4ex7r1',
                        executionId: '6a524786-4fd0-48ec-a69d-d7534fd306aa',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-11-04 08:04:11',
                        executionMonitoringStartAt: '2020-11-04 01:34:45',
                        executionMonitoringEndAt: '2020-11-04 15:58:07',
                        error: 6466906816,
                        inactive: 3010498730,
                        successful: 4568456769,
                        stopped: 4650701294,
                        unknown: 4939426305,
                        unregistered: 9673588982,
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
                        
                        id: 'b441e714-ffd1-4a15-8eae-f1ed5d986aa3',
                        tenantId: 'b1787f5b-5525-495e-8bd4-5cf45a8ab078',
                        tenantCode: '8mnq5qtxbcc7g0us0h7m2lvuybnf02cjut49zhlnrwfjrml7p9',
                        systemId: '4d5577fb-4e34-4c2f-aa86-d0c0683d9254',
                        systemName: '20nkbrzge7yqdgwptxc2',
                        executionId: 'b4be52da-ae1b-46d0-9f8d-ed4028adfafe',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-11-04 01:42:23',
                        executionMonitoringStartAt: '2020-11-04 01:12:09',
                        executionMonitoringEndAt: '2020-11-04 06:20:57',
                        error: 3084494693,
                        inactive: 6991887726,
                        successful: 1954231840,
                        stopped: 9280563258,
                        unknown: 6817320110,
                        unregistered: 9345245569,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateChannelOverview.id).toStrictEqual('b441e714-ffd1-4a15-8eae-f1ed5d986aa3');
            });
    });

    test(`/GraphQL cciDeleteChannelOverviewById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                    id: 'e96801ba-1ab7-4fd2-8df4-057ca9057248'
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
                    id: 'b441e714-ffd1-4a15-8eae-f1ed5d986aa3'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteChannelOverviewById.id).toStrictEqual('b441e714-ffd1-4a15-8eae-f1ed5d986aa3');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});