import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IChannelOverviewRepository } from '@hades/bplus-it-sappi/channel-overview/domain/channel-overview.repository';
import { MockChannelOverviewRepository } from '@hades/bplus-it-sappi/channel-overview/infrastructure/mock/mock-channel-overview.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
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
            .overrideProvider(IChannelOverviewRepository)
            .useClass(MockChannelOverviewRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockChannelOverviewRepository>module.get<IChannelOverviewRepository>(IChannelOverviewRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/channel-overview - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: 'ae9eef35-4be6-4496-ab7e-b1f4012f29ad',
                tenantCode: 'ecr38mz9rd0yxlqdco8uykp6w4dokev8mdw7qhz222hiuyic8r',
                systemId: '0b3338b9-e7e8-4557-bad1-d8eefff68250',
                systemName: 'fzfbsl12s2l5vd34c428',
                executionId: '8af391b4-abe7-443d-8827-6f9109ba6512',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-02 23:12:06',
                executionMonitoringStartAt: '2020-08-03 07:22:21',
                executionMonitoringEndAt: '2020-08-03 08:16:05',
                error: 6624048905,
                inactive: 7142865101,
                successful: 3637636577,
                stopped: 9325199166,
                unknown: 7334134304,
                unregistered: 8040908704,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: 'ae9eef35-4be6-4496-ab7e-b1f4012f29ad',
                tenantCode: 'evfvx5lggjrjyq4sccq02zq3nwaa2a7ocevsinzrau5mm86ivr',
                systemId: '0b3338b9-e7e8-4557-bad1-d8eefff68250',
                systemName: '2w7j99txjejl5edd7tle',
                executionId: '8af391b4-abe7-443d-8827-6f9109ba6512',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 00:09:52',
                executionMonitoringStartAt: '2020-08-02 22:48:59',
                executionMonitoringEndAt: '2020-08-03 01:45:21',
                error: 5195028690,
                inactive: 5710543124,
                successful: 7168150937,
                stopped: 9030654820,
                unknown: 9568184434,
                unregistered: 3269856222,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '45d7174e-c0b4-4bf9-be6b-12d830621d4c',
                tenantId: null,
                tenantCode: 'wmdypi2bavgusuh0ka2ofbztdvcmmiq9x1glof6fa0vxd8j13k',
                systemId: '0b3338b9-e7e8-4557-bad1-d8eefff68250',
                systemName: 'xqxulekchen9pd5vnxqv',
                executionId: '8af391b4-abe7-443d-8827-6f9109ba6512',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 17:38:39',
                executionMonitoringStartAt: '2020-08-02 18:39:54',
                executionMonitoringEndAt: '2020-08-02 20:32:38',
                error: 2761136117,
                inactive: 5688854381,
                successful: 8129673388,
                stopped: 1579229876,
                unknown: 7986324189,
                unregistered: 4388380696,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '45d7174e-c0b4-4bf9-be6b-12d830621d4c',
                
                tenantCode: '3z0jsoh7pxzun4m31s27u1sb5331r3eybluqnikksxfbjg8p5m',
                systemId: '0b3338b9-e7e8-4557-bad1-d8eefff68250',
                systemName: 'zkacgtcai8mp4d05n3gi',
                executionId: '8af391b4-abe7-443d-8827-6f9109ba6512',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-02 20:07:28',
                executionMonitoringStartAt: '2020-08-03 15:33:35',
                executionMonitoringEndAt: '2020-08-03 14:44:02',
                error: 5954113313,
                inactive: 9476649794,
                successful: 8759513338,
                stopped: 3727474377,
                unknown: 9312731672,
                unregistered: 9902198465,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '45d7174e-c0b4-4bf9-be6b-12d830621d4c',
                tenantId: 'ae9eef35-4be6-4496-ab7e-b1f4012f29ad',
                tenantCode: null,
                systemId: '0b3338b9-e7e8-4557-bad1-d8eefff68250',
                systemName: 'h8cku1tcchzgxn3o3oop',
                executionId: '8af391b4-abe7-443d-8827-6f9109ba6512',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 12:54:11',
                executionMonitoringStartAt: '2020-08-03 11:24:20',
                executionMonitoringEndAt: '2020-08-03 14:22:44',
                error: 3415827785,
                inactive: 3093091473,
                successful: 1137901471,
                stopped: 5463708934,
                unknown: 3183256191,
                unregistered: 5205077403,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '45d7174e-c0b4-4bf9-be6b-12d830621d4c',
                tenantId: 'ae9eef35-4be6-4496-ab7e-b1f4012f29ad',
                
                systemId: '0b3338b9-e7e8-4557-bad1-d8eefff68250',
                systemName: 'r092ulc35mbxjnypyhzb',
                executionId: '8af391b4-abe7-443d-8827-6f9109ba6512',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 12:39:15',
                executionMonitoringStartAt: '2020-08-03 06:17:03',
                executionMonitoringEndAt: '2020-08-03 01:43:24',
                error: 6881471543,
                inactive: 4547366508,
                successful: 2058108782,
                stopped: 8358752731,
                unknown: 1645209523,
                unregistered: 2623337189,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '45d7174e-c0b4-4bf9-be6b-12d830621d4c',
                tenantId: 'ae9eef35-4be6-4496-ab7e-b1f4012f29ad',
                tenantCode: 'zunhjuo6pgqx433a6zhhm88sawesdw21m2mrua2si7vrk4mz71',
                systemId: null,
                systemName: '1l8nfqoaq76wrfthvqld',
                executionId: '8af391b4-abe7-443d-8827-6f9109ba6512',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 18:28:19',
                executionMonitoringStartAt: '2020-08-03 10:51:55',
                executionMonitoringEndAt: '2020-08-03 03:45:49',
                error: 4297962776,
                inactive: 5732620312,
                successful: 5698259632,
                stopped: 6480321213,
                unknown: 2984049480,
                unregistered: 5099518127,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '45d7174e-c0b4-4bf9-be6b-12d830621d4c',
                tenantId: 'ae9eef35-4be6-4496-ab7e-b1f4012f29ad',
                tenantCode: 'divl2pvb6lqhwbyfwt0wyqmek7o53zi5pn7z07kotkcv3op3oa',
                
                systemName: 'esqpngqofvdt0fijuthf',
                executionId: '8af391b4-abe7-443d-8827-6f9109ba6512',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 09:05:52',
                executionMonitoringStartAt: '2020-08-03 03:42:46',
                executionMonitoringEndAt: '2020-08-03 03:20:00',
                error: 7317485078,
                inactive: 9926298907,
                successful: 9624721118,
                stopped: 6665593261,
                unknown: 1807974975,
                unregistered: 1865457315,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '45d7174e-c0b4-4bf9-be6b-12d830621d4c',
                tenantId: 'ae9eef35-4be6-4496-ab7e-b1f4012f29ad',
                tenantCode: 'qfvbymudjvgqw0st2dy08olenmku81j0hbzznuz95glmg7rk8n',
                systemId: '0b3338b9-e7e8-4557-bad1-d8eefff68250',
                systemName: null,
                executionId: '8af391b4-abe7-443d-8827-6f9109ba6512',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 08:24:10',
                executionMonitoringStartAt: '2020-08-03 06:08:19',
                executionMonitoringEndAt: '2020-08-03 16:27:08',
                error: 4029171500,
                inactive: 5082687338,
                successful: 6612862189,
                stopped: 9038513962,
                unknown: 3623315423,
                unregistered: 5090774140,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '45d7174e-c0b4-4bf9-be6b-12d830621d4c',
                tenantId: 'ae9eef35-4be6-4496-ab7e-b1f4012f29ad',
                tenantCode: 'atpdz7h4je58le3dsmu4n37bvwn2to7b79eq98d9s64d1f2tew',
                systemId: '0b3338b9-e7e8-4557-bad1-d8eefff68250',
                
                executionId: '8af391b4-abe7-443d-8827-6f9109ba6512',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-02 22:10:05',
                executionMonitoringStartAt: '2020-08-03 10:58:46',
                executionMonitoringEndAt: '2020-08-02 23:26:00',
                error: 5966872565,
                inactive: 6328405370,
                successful: 6264179115,
                stopped: 8664897036,
                unknown: 4361749955,
                unregistered: 7496193546,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '45d7174e-c0b4-4bf9-be6b-12d830621d4c',
                tenantId: 'ae9eef35-4be6-4496-ab7e-b1f4012f29ad',
                tenantCode: '48wyoo64blu1d221oplw5c76aozxnnegq3tnuxlg8chr1zew27',
                systemId: '0b3338b9-e7e8-4557-bad1-d8eefff68250',
                systemName: '8auis5bgvjawnd06ms76',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 10:31:12',
                executionMonitoringStartAt: '2020-08-03 13:52:28',
                executionMonitoringEndAt: '2020-08-02 21:45:55',
                error: 8495505156,
                inactive: 5029773105,
                successful: 7287648960,
                stopped: 6954935752,
                unknown: 5958649790,
                unregistered: 9592691339,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '45d7174e-c0b4-4bf9-be6b-12d830621d4c',
                tenantId: 'ae9eef35-4be6-4496-ab7e-b1f4012f29ad',
                tenantCode: 'lgn5gqnh94i3zn0ax2v6eyiuvnvn2qmen8ohbcj540mym3e2m1',
                systemId: '0b3338b9-e7e8-4557-bad1-d8eefff68250',
                systemName: 'oiegt3o2j28q10f17fzq',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 16:04:58',
                executionMonitoringStartAt: '2020-08-03 14:33:07',
                executionMonitoringEndAt: '2020-08-03 13:29:29',
                error: 6575905510,
                inactive: 6366367242,
                successful: 1479374099,
                stopped: 5663199617,
                unknown: 4950868102,
                unregistered: 6582826462,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '45d7174e-c0b4-4bf9-be6b-12d830621d4c',
                tenantId: 'ae9eef35-4be6-4496-ab7e-b1f4012f29ad',
                tenantCode: 'p74t5f0toyjv38u0lgnyerwx6nezvqjpo1lfjfqusj9dq9fn9l',
                systemId: '0b3338b9-e7e8-4557-bad1-d8eefff68250',
                systemName: 'y84c8le5i6lrc0l4qi4y',
                executionId: '8af391b4-abe7-443d-8827-6f9109ba6512',
                executionType: null,
                executionExecutedAt: '2020-08-03 00:45:21',
                executionMonitoringStartAt: '2020-08-03 11:56:07',
                executionMonitoringEndAt: '2020-08-02 18:48:49',
                error: 4033482611,
                inactive: 1949384860,
                successful: 1832281255,
                stopped: 2009373255,
                unknown: 2537293213,
                unregistered: 8166670428,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionType must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '45d7174e-c0b4-4bf9-be6b-12d830621d4c',
                tenantId: 'ae9eef35-4be6-4496-ab7e-b1f4012f29ad',
                tenantCode: '9xzhvist8uxk1beknikqzfcfkmgvesxpy4r7zfr507vw343feu',
                systemId: '0b3338b9-e7e8-4557-bad1-d8eefff68250',
                systemName: 'horkucjvc8qqs68fcj2s',
                executionId: '8af391b4-abe7-443d-8827-6f9109ba6512',
                
                executionExecutedAt: '2020-08-03 15:53:39',
                executionMonitoringStartAt: '2020-08-03 02:07:56',
                executionMonitoringEndAt: '2020-08-03 09:38:55',
                error: 3314135513,
                inactive: 7674153800,
                successful: 6599423943,
                stopped: 1766372793,
                unknown: 6293319223,
                unregistered: 6338188257,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionType must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '45d7174e-c0b4-4bf9-be6b-12d830621d4c',
                tenantId: 'ae9eef35-4be6-4496-ab7e-b1f4012f29ad',
                tenantCode: 'b6ht9qye6y7xh85n11iryzoei74s5dw4tccicco7bpshzjyynr',
                systemId: '0b3338b9-e7e8-4557-bad1-d8eefff68250',
                systemName: 'zdz3a24vhz35hizlplh8',
                executionId: '8af391b4-abe7-443d-8827-6f9109ba6512',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-08-02 20:36:46',
                executionMonitoringEndAt: '2020-08-03 00:17:39',
                error: 6610930311,
                inactive: 3487294947,
                successful: 8879156590,
                stopped: 1134103633,
                unknown: 1791651800,
                unregistered: 7097524461,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionExecutedAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '45d7174e-c0b4-4bf9-be6b-12d830621d4c',
                tenantId: 'ae9eef35-4be6-4496-ab7e-b1f4012f29ad',
                tenantCode: 'alzqkl0d66h2wjx13gqom8n1xqw2ixduqnolkfyde1twcp68kq',
                systemId: '0b3338b9-e7e8-4557-bad1-d8eefff68250',
                systemName: 'q0odhc8t07nax57nx0ip',
                executionId: '8af391b4-abe7-443d-8827-6f9109ba6512',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-08-03 06:38:58',
                executionMonitoringEndAt: '2020-08-02 20:51:26',
                error: 6364697266,
                inactive: 4783451557,
                successful: 4561551485,
                stopped: 9111764928,
                unknown: 3499024620,
                unregistered: 9499544123,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '45d7174e-c0b4-4bf9-be6b-12d830621d4c',
                tenantId: 'ae9eef35-4be6-4496-ab7e-b1f4012f29ad',
                tenantCode: '6y0ne8nxpkjn5k3wu9nylyiajzu3gkp6tvpa1mvpphrhyzs7bq',
                systemId: '0b3338b9-e7e8-4557-bad1-d8eefff68250',
                systemName: 'ionhe37w00tmw7fc4352',
                executionId: '8af391b4-abe7-443d-8827-6f9109ba6512',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-02 19:00:00',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-08-02 21:58:32',
                error: 6872245897,
                inactive: 9241432320,
                successful: 8309941719,
                stopped: 7221073300,
                unknown: 5874580101,
                unregistered: 8052235547,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '45d7174e-c0b4-4bf9-be6b-12d830621d4c',
                tenantId: 'ae9eef35-4be6-4496-ab7e-b1f4012f29ad',
                tenantCode: 'tclh6ymqg1zzddtvtrnthkxe2pfakh30af1gjsab8fy1nulxdc',
                systemId: '0b3338b9-e7e8-4557-bad1-d8eefff68250',
                systemName: 'i2abfrbff95pghk9soq7',
                executionId: '8af391b4-abe7-443d-8827-6f9109ba6512',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 11:19:23',
                
                executionMonitoringEndAt: '2020-08-03 03:11:01',
                error: 9426498470,
                inactive: 6328999081,
                successful: 8891192597,
                stopped: 2906811632,
                unknown: 2006364599,
                unregistered: 5660707964,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '45d7174e-c0b4-4bf9-be6b-12d830621d4c',
                tenantId: 'ae9eef35-4be6-4496-ab7e-b1f4012f29ad',
                tenantCode: 'cxd1a5f7nf4pdn1ru12ickyceuqtoxtbm7qcp06f9d14f7uzt9',
                systemId: '0b3338b9-e7e8-4557-bad1-d8eefff68250',
                systemName: 'otrz1ar2rs82aompy0vf',
                executionId: '8af391b4-abe7-443d-8827-6f9109ba6512',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 10:27:36',
                executionMonitoringStartAt: '2020-08-03 16:40:35',
                executionMonitoringEndAt: null,
                error: 2522299828,
                inactive: 7526732882,
                successful: 4365646388,
                stopped: 9970547304,
                unknown: 4963560142,
                unregistered: 8170396822,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '45d7174e-c0b4-4bf9-be6b-12d830621d4c',
                tenantId: 'ae9eef35-4be6-4496-ab7e-b1f4012f29ad',
                tenantCode: 'g2b79dafe0xxrqyh7mlrzyoychy5hftbelppsz5axtncpomntq',
                systemId: '0b3338b9-e7e8-4557-bad1-d8eefff68250',
                systemName: 'uua21kv21iq8i74bd6q2',
                executionId: '8af391b4-abe7-443d-8827-6f9109ba6512',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 10:16:54',
                executionMonitoringStartAt: '2020-08-03 13:24:09',
                
                error: 5599154141,
                inactive: 3946642957,
                successful: 9414800189,
                stopped: 5297795532,
                unknown: 1843222688,
                unregistered: 8896924968,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'jw4g7394q47o2bm6a1y2mwzp2x63zpcnn8n3o',
                tenantId: 'ae9eef35-4be6-4496-ab7e-b1f4012f29ad',
                tenantCode: 'zrlokhfagm88yjmngdygnug1tuf1ikir00479y52jqg6v8pi3d',
                systemId: '0b3338b9-e7e8-4557-bad1-d8eefff68250',
                systemName: 'uw3wq05dquhkoifcjp4p',
                executionId: '8af391b4-abe7-443d-8827-6f9109ba6512',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 11:41:00',
                executionMonitoringStartAt: '2020-08-03 03:55:25',
                executionMonitoringEndAt: '2020-08-03 11:06:59',
                error: 7253223002,
                inactive: 5325726336,
                successful: 3896629734,
                stopped: 6875574708,
                unknown: 4084273902,
                unregistered: 7093061959,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '45d7174e-c0b4-4bf9-be6b-12d830621d4c',
                tenantId: 'h6lrjtk57ijdsy16o5bku53idac7ddi6tcv95',
                tenantCode: 'un2n51je1kxkhuxdva6porycbwwddsz6g1go34ki7hn88ip5n8',
                systemId: '0b3338b9-e7e8-4557-bad1-d8eefff68250',
                systemName: 'd3ryjn2bv1v6ubixcv3r',
                executionId: '8af391b4-abe7-443d-8827-6f9109ba6512',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 15:52:32',
                executionMonitoringStartAt: '2020-08-03 08:55:32',
                executionMonitoringEndAt: '2020-08-03 11:07:53',
                error: 2247825553,
                inactive: 9021627204,
                successful: 6279178841,
                stopped: 3610642549,
                unknown: 2769129201,
                unregistered: 7862013051,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '45d7174e-c0b4-4bf9-be6b-12d830621d4c',
                tenantId: 'ae9eef35-4be6-4496-ab7e-b1f4012f29ad',
                tenantCode: '5femyl2j9vsjkk6lbj0zwgb4eywbgth3qbquau2tw6ov0obu29',
                systemId: 'i2njdnrzdbwo2cvnzcc5o1idimquwybsieei9',
                systemName: 'aeztdyr1sxj3p19i8jdu',
                executionId: '8af391b4-abe7-443d-8827-6f9109ba6512',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 11:30:29',
                executionMonitoringStartAt: '2020-08-03 04:20:54',
                executionMonitoringEndAt: '2020-08-03 00:44:11',
                error: 4528795510,
                inactive: 7448891551,
                successful: 9628125828,
                stopped: 6639290685,
                unknown: 2051574297,
                unregistered: 5128860362,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '45d7174e-c0b4-4bf9-be6b-12d830621d4c',
                tenantId: 'ae9eef35-4be6-4496-ab7e-b1f4012f29ad',
                tenantCode: 'h1gl9lgiyhwphqn0khl8nfxni4rfxzaztx9vh3kgfqft6tx98o',
                systemId: '0b3338b9-e7e8-4557-bad1-d8eefff68250',
                systemName: '3z9tta53zsf480wm7vzm',
                executionId: 'ffgfrvyate1m17pjj8j7dbljqf7gop5dop6r1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 14:09:20',
                executionMonitoringStartAt: '2020-08-03 04:21:14',
                executionMonitoringEndAt: '2020-08-03 14:34:34',
                error: 3172795099,
                inactive: 2182330458,
                successful: 2666467403,
                stopped: 8131837951,
                unknown: 7644206540,
                unregistered: 7442516660,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '45d7174e-c0b4-4bf9-be6b-12d830621d4c',
                tenantId: 'ae9eef35-4be6-4496-ab7e-b1f4012f29ad',
                tenantCode: '2wq52ix0953qiv6w54ku4wq7yjnldvtfwnl1jizbjqo25g4zb57',
                systemId: '0b3338b9-e7e8-4557-bad1-d8eefff68250',
                systemName: 'uvfkwy2mjxmjxb6szkw5',
                executionId: '8af391b4-abe7-443d-8827-6f9109ba6512',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 08:28:16',
                executionMonitoringStartAt: '2020-08-03 06:21:36',
                executionMonitoringEndAt: '2020-08-03 08:03:05',
                error: 7523436321,
                inactive: 2099847090,
                successful: 5876133866,
                stopped: 3002022991,
                unknown: 6021795049,
                unregistered: 5388129131,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '45d7174e-c0b4-4bf9-be6b-12d830621d4c',
                tenantId: 'ae9eef35-4be6-4496-ab7e-b1f4012f29ad',
                tenantCode: 'pv543teggocl2y05q38sr6q3phma2gh5c54hrcdxwof13wr1zn',
                systemId: '0b3338b9-e7e8-4557-bad1-d8eefff68250',
                systemName: '4qtttewyw821flfi7arfi',
                executionId: '8af391b4-abe7-443d-8827-6f9109ba6512',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 05:38:09',
                executionMonitoringStartAt: '2020-08-03 00:31:08',
                executionMonitoringEndAt: '2020-08-02 22:44:11',
                error: 8777072207,
                inactive: 1360789067,
                successful: 1538603496,
                stopped: 3998745420,
                unknown: 5253093150,
                unregistered: 3866701527,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewError is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '45d7174e-c0b4-4bf9-be6b-12d830621d4c',
                tenantId: 'ae9eef35-4be6-4496-ab7e-b1f4012f29ad',
                tenantCode: 'my5hpw3d27uzhsx67oenvvli6rjk94fpnl4nwe1u9ugtxm22o6',
                systemId: '0b3338b9-e7e8-4557-bad1-d8eefff68250',
                systemName: 'd91gzpzgark3el4mp4ch',
                executionId: '8af391b4-abe7-443d-8827-6f9109ba6512',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 02:07:05',
                executionMonitoringStartAt: '2020-08-03 01:46:42',
                executionMonitoringEndAt: '2020-08-02 21:30:22',
                error: 77997356494,
                inactive: 6295245869,
                successful: 1552209270,
                stopped: 9400939847,
                unknown: 4125768843,
                unregistered: 2385365495,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewError is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewInactive is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '45d7174e-c0b4-4bf9-be6b-12d830621d4c',
                tenantId: 'ae9eef35-4be6-4496-ab7e-b1f4012f29ad',
                tenantCode: 'cjrqyfzb5lwk6x4jqdugav8x3s6a3q43l7lphfying6tm0r5z7',
                systemId: '0b3338b9-e7e8-4557-bad1-d8eefff68250',
                systemName: 'e59ngcma5qa4w2cjfusd',
                executionId: '8af391b4-abe7-443d-8827-6f9109ba6512',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-02 21:52:06',
                executionMonitoringStartAt: '2020-08-03 14:48:02',
                executionMonitoringEndAt: '2020-08-03 08:14:10',
                error: 2071256613,
                inactive: 42921048953,
                successful: 1592069020,
                stopped: 4456192810,
                unknown: 6580645835,
                unregistered: 4786324896,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewInactive is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewSuccessful is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '45d7174e-c0b4-4bf9-be6b-12d830621d4c',
                tenantId: 'ae9eef35-4be6-4496-ab7e-b1f4012f29ad',
                tenantCode: '6yzylyfmednr61qw13xc6sv6e4r89tbvx410zp8olhoubuves4',
                systemId: '0b3338b9-e7e8-4557-bad1-d8eefff68250',
                systemName: '9ut95tb9jav644az8hfe',
                executionId: '8af391b4-abe7-443d-8827-6f9109ba6512',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 11:04:50',
                executionMonitoringStartAt: '2020-08-03 17:50:19',
                executionMonitoringEndAt: '2020-08-03 18:15:33',
                error: 9223291157,
                inactive: 7472779121,
                successful: 55317088783,
                stopped: 8241993262,
                unknown: 8518110200,
                unregistered: 1597061909,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewSuccessful is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewStopped is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '45d7174e-c0b4-4bf9-be6b-12d830621d4c',
                tenantId: 'ae9eef35-4be6-4496-ab7e-b1f4012f29ad',
                tenantCode: 'k9bsnfwa2ovokjy6hjfix4qfszq90ga43olslnsfb6ywqjt20g',
                systemId: '0b3338b9-e7e8-4557-bad1-d8eefff68250',
                systemName: 'mj4zo815uhvzwh8x7fqd',
                executionId: '8af391b4-abe7-443d-8827-6f9109ba6512',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 06:48:34',
                executionMonitoringStartAt: '2020-08-03 15:29:26',
                executionMonitoringEndAt: '2020-08-02 23:44:58',
                error: 7265748813,
                inactive: 8704387977,
                successful: 3044633260,
                stopped: 52710022162,
                unknown: 5266742472,
                unregistered: 8429052523,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewStopped is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewUnknown is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '45d7174e-c0b4-4bf9-be6b-12d830621d4c',
                tenantId: 'ae9eef35-4be6-4496-ab7e-b1f4012f29ad',
                tenantCode: '14g227fmhh68vdl6baccxiu79w7mbgzzew3gyc56wxgmuykfcf',
                systemId: '0b3338b9-e7e8-4557-bad1-d8eefff68250',
                systemName: 'ovucasjyfpwswiugww95',
                executionId: '8af391b4-abe7-443d-8827-6f9109ba6512',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 16:56:47',
                executionMonitoringStartAt: '2020-08-02 21:16:55',
                executionMonitoringEndAt: '2020-08-03 10:06:10',
                error: 5976325838,
                inactive: 2271334049,
                successful: 3427812137,
                stopped: 1183028998,
                unknown: 64689821868,
                unregistered: 2424372840,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewUnknown is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewUnregistered is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '45d7174e-c0b4-4bf9-be6b-12d830621d4c',
                tenantId: 'ae9eef35-4be6-4496-ab7e-b1f4012f29ad',
                tenantCode: 'kw4066l3m7wenptguavrkrnpvuto1fa27b4hsui7ttjdmq3s7n',
                systemId: '0b3338b9-e7e8-4557-bad1-d8eefff68250',
                systemName: 'zrfzq50b7vftqf2tutgb',
                executionId: '8af391b4-abe7-443d-8827-6f9109ba6512',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 00:20:05',
                executionMonitoringStartAt: '2020-08-03 02:53:00',
                executionMonitoringEndAt: '2020-08-03 02:35:03',
                error: 2968128753,
                inactive: 2252535498,
                successful: 5186868606,
                stopped: 3299902053,
                unknown: 4399448162,
                unregistered: 51434864942,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewUnregistered is too large, has a maximum length of 10');
            });
    });
    

    

    
    
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewError must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '45d7174e-c0b4-4bf9-be6b-12d830621d4c',
                tenantId: 'ae9eef35-4be6-4496-ab7e-b1f4012f29ad',
                tenantCode: '0ygiz4hbvd6x9g83otfjqhvmbss8kt29vwo91fuyafzwtruzb0',
                systemId: '0b3338b9-e7e8-4557-bad1-d8eefff68250',
                systemName: 'd7h8zlf4mf3lggdjmc67',
                executionId: '8af391b4-abe7-443d-8827-6f9109ba6512',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 09:10:30',
                executionMonitoringStartAt: '2020-08-03 05:00:03',
                executionMonitoringEndAt: '2020-08-02 23:10:54',
                error: -9,
                inactive: 6561808167,
                successful: 5224632321,
                stopped: 2315448388,
                unknown: 1822622013,
                unregistered: 1707184951,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelOverviewError must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewInactive must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '45d7174e-c0b4-4bf9-be6b-12d830621d4c',
                tenantId: 'ae9eef35-4be6-4496-ab7e-b1f4012f29ad',
                tenantCode: 'up2olr8gvkcwibr47clwrak761gi0gvl0j7z553cl060w79xmy',
                systemId: '0b3338b9-e7e8-4557-bad1-d8eefff68250',
                systemName: 'ay4jk2tdnrl26ei24lgr',
                executionId: '8af391b4-abe7-443d-8827-6f9109ba6512',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 04:52:23',
                executionMonitoringStartAt: '2020-08-03 06:24:18',
                executionMonitoringEndAt: '2020-08-02 19:34:44',
                error: 2087268685,
                inactive: -9,
                successful: 2611307134,
                stopped: 1334336526,
                unknown: 8870753508,
                unregistered: 8344504145,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelOverviewInactive must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewSuccessful must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '45d7174e-c0b4-4bf9-be6b-12d830621d4c',
                tenantId: 'ae9eef35-4be6-4496-ab7e-b1f4012f29ad',
                tenantCode: 'emrj0sgrte8tlw0vecn4fq5hob1qs045suauojpi0tywix200f',
                systemId: '0b3338b9-e7e8-4557-bad1-d8eefff68250',
                systemName: '8s57vh2lg51mg1n7agbv',
                executionId: '8af391b4-abe7-443d-8827-6f9109ba6512',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 18:14:49',
                executionMonitoringStartAt: '2020-08-03 02:58:45',
                executionMonitoringEndAt: '2020-08-03 01:49:30',
                error: 7766491758,
                inactive: 5800811678,
                successful: -9,
                stopped: 2161322918,
                unknown: 6211729785,
                unregistered: 9828382938,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelOverviewSuccessful must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewStopped must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '45d7174e-c0b4-4bf9-be6b-12d830621d4c',
                tenantId: 'ae9eef35-4be6-4496-ab7e-b1f4012f29ad',
                tenantCode: 'sumalx1ghxz0t99zs27vmvf564qd360ml18lo730qxxv8brcc4',
                systemId: '0b3338b9-e7e8-4557-bad1-d8eefff68250',
                systemName: 'l8rgyqg21e7x0qforktb',
                executionId: '8af391b4-abe7-443d-8827-6f9109ba6512',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 08:33:44',
                executionMonitoringStartAt: '2020-08-03 06:38:27',
                executionMonitoringEndAt: '2020-08-03 10:17:34',
                error: 1745791259,
                inactive: 2557080920,
                successful: 5322933718,
                stopped: -9,
                unknown: 6076334594,
                unregistered: 1946545059,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelOverviewStopped must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewUnknown must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '45d7174e-c0b4-4bf9-be6b-12d830621d4c',
                tenantId: 'ae9eef35-4be6-4496-ab7e-b1f4012f29ad',
                tenantCode: '3t6y9pwf4htf2i7py3b5gtv56uybn38ni2y7btod7y8vj2jugd',
                systemId: '0b3338b9-e7e8-4557-bad1-d8eefff68250',
                systemName: 'yqxyqercruzotp5zbvcl',
                executionId: '8af391b4-abe7-443d-8827-6f9109ba6512',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 11:26:00',
                executionMonitoringStartAt: '2020-08-02 23:32:23',
                executionMonitoringEndAt: '2020-08-03 04:41:50',
                error: 8354768096,
                inactive: 4156399994,
                successful: 4677532659,
                stopped: 7099183021,
                unknown: -9,
                unregistered: 8349489895,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelOverviewUnknown must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewUnregistered must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '45d7174e-c0b4-4bf9-be6b-12d830621d4c',
                tenantId: 'ae9eef35-4be6-4496-ab7e-b1f4012f29ad',
                tenantCode: 'a7tpb1k199r40p67x4f8azi53dah90ojp6migvt4wd5by4z7r5',
                systemId: '0b3338b9-e7e8-4557-bad1-d8eefff68250',
                systemName: '5mohv71tsvescxtazu4m',
                executionId: '8af391b4-abe7-443d-8827-6f9109ba6512',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 03:52:19',
                executionMonitoringStartAt: '2020-08-03 17:55:16',
                executionMonitoringEndAt: '2020-08-03 13:17:11',
                error: 6530346874,
                inactive: 2091273021,
                successful: 9812509805,
                stopped: 5466996602,
                unknown: 5097108540,
                unregistered: -9,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelOverviewUnregistered must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '45d7174e-c0b4-4bf9-be6b-12d830621d4c',
                tenantId: 'ae9eef35-4be6-4496-ab7e-b1f4012f29ad',
                tenantCode: 'crsu90ah1j58aksr4wh1zr9uq2ocakr8zded71kv58eemu71lf',
                systemId: '0b3338b9-e7e8-4557-bad1-d8eefff68250',
                systemName: '03xkncvs9y0yh3hkt7kb',
                executionId: '8af391b4-abe7-443d-8827-6f9109ba6512',
                executionType: 'XXXX',
                executionExecutedAt: '2020-08-02 20:28:28',
                executionMonitoringStartAt: '2020-08-03 12:45:39',
                executionMonitoringEndAt: '2020-08-02 19:46:08',
                error: 8913378029,
                inactive: 5666041684,
                successful: 6252499039,
                stopped: 8430524449,
                unknown: 8106037011,
                unregistered: 4537121823,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '45d7174e-c0b4-4bf9-be6b-12d830621d4c',
                tenantId: 'ae9eef35-4be6-4496-ab7e-b1f4012f29ad',
                tenantCode: 'ukpid85e26rj0wwhqivq6fjoty1wvcld2j2pthnzljm124ijmo',
                systemId: '0b3338b9-e7e8-4557-bad1-d8eefff68250',
                systemName: 'pczn27qnllxpi4e0qjxf',
                executionId: '8af391b4-abe7-443d-8827-6f9109ba6512',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-08-03 12:56:55',
                executionMonitoringEndAt: '2020-08-03 17:33:34',
                error: 8368066070,
                inactive: 5610819647,
                successful: 3528372615,
                stopped: 4589363899,
                unknown: 3756841411,
                unregistered: 9758726520,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionExecutedAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionMonitoringStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '45d7174e-c0b4-4bf9-be6b-12d830621d4c',
                tenantId: 'ae9eef35-4be6-4496-ab7e-b1f4012f29ad',
                tenantCode: '0wcpd9ukkawfgkpohg16l7p1g0w5wh8icplftxbbzscd9qrtv9',
                systemId: '0b3338b9-e7e8-4557-bad1-d8eefff68250',
                systemName: 'tyue8j91866k2gq3cp87',
                executionId: '8af391b4-abe7-443d-8827-6f9109ba6512',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 02:13:35',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-08-03 06:37:11',
                error: 4091419090,
                inactive: 2285939314,
                successful: 6385693220,
                stopped: 4658478201,
                unknown: 6839821704,
                unregistered: 3043160865,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionMonitoringEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '45d7174e-c0b4-4bf9-be6b-12d830621d4c',
                tenantId: 'ae9eef35-4be6-4496-ab7e-b1f4012f29ad',
                tenantCode: 'tj4t5jabv38egb40kz4l8s4vgrym5phljqzvnoeqzxz3svb3eb',
                systemId: '0b3338b9-e7e8-4557-bad1-d8eefff68250',
                systemName: '81ese99s4sj3euy1zfgo',
                executionId: '8af391b4-abe7-443d-8827-6f9109ba6512',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 14:40:34',
                executionMonitoringStartAt: '2020-08-03 03:07:15',
                executionMonitoringEndAt: 'XXXXXXXX',
                error: 9815708053,
                inactive: 7877539290,
                successful: 1386295177,
                stopped: 5036156725,
                unknown: 7825514619,
                unregistered: 6500956602,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST bplus-it-sappi/channel-overview`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '45d7174e-c0b4-4bf9-be6b-12d830621d4c',
                tenantId: 'ae9eef35-4be6-4496-ab7e-b1f4012f29ad',
                tenantCode: 'f6rv1ofbgevp3l0lohzuuw9lg8oz6e1kjhhcttsoqbpi52xxih',
                systemId: '0b3338b9-e7e8-4557-bad1-d8eefff68250',
                systemName: 'jyx4eclps6a3vzbnt1gy',
                executionId: '8af391b4-abe7-443d-8827-6f9109ba6512',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 09:50:45',
                executionMonitoringStartAt: '2020-08-03 15:59:02',
                executionMonitoringEndAt: '2020-08-03 04:41:44',
                error: 3861271864,
                inactive: 4445011886,
                successful: 7790421902,
                stopped: 8681798851,
                unknown: 5707392282,
                unregistered: 4049191039,
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/channels-overview/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channels-overview/paginate')
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

    test(`/REST:GET bplus-it-sappi/channel-overview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : 'aa7350a6-21ca-48c3-b10c-31d26253bf75'
                    }
                ]
            })
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/channel-overview`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '45d7174e-c0b4-4bf9-be6b-12d830621d4c'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '45d7174e-c0b4-4bf9-be6b-12d830621d4c'));
    });

    test(`/REST:GET bplus-it-sappi/channel-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel-overview/86a83bdf-5eb0-4c46-b7ae-8923e235cfa6')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/channel-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel-overview/45d7174e-c0b4-4bf9-be6b-12d830621d4c')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '45d7174e-c0b4-4bf9-be6b-12d830621d4c'));
    });

    test(`/REST:GET bplus-it-sappi/channels-overview`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channels-overview')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/channel-overview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: '1b7d3a5e-f687-4b81-868e-8da871e3dbae',
                tenantId: 'a79714eb-daf5-4522-ae62-c7366ff0cd8f',
                tenantCode: 'm625vkbgw6adhfvjanwt3t0y1i63gooc6ppv0tx1h2pvxfnpxk',
                systemId: 'd81c2030-94de-4e98-a73e-735331383ae0',
                systemName: '1uqaq5z16hnetpn2r10t',
                executionId: 'da5f8407-9aa3-460c-a8fe-50ffa8c1d90e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 04:36:02',
                executionMonitoringStartAt: '2020-08-03 11:14:33',
                executionMonitoringEndAt: '2020-08-03 04:40:04',
                error: 6079485323,
                inactive: 1444891768,
                successful: 4919390745,
                stopped: 3232251674,
                unknown: 2234840160,
                unregistered: 3629123753,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/channel-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: '45d7174e-c0b4-4bf9-be6b-12d830621d4c',
                tenantId: 'ae9eef35-4be6-4496-ab7e-b1f4012f29ad',
                tenantCode: 'kjl5pecey2drnz0ytwofp1d3dfoq2ap4w20cof68my40qc1sqh',
                systemId: '0b3338b9-e7e8-4557-bad1-d8eefff68250',
                systemName: 'omvokmfc2l4rsuztdlxg',
                executionId: '8af391b4-abe7-443d-8827-6f9109ba6512',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 09:00:39',
                executionMonitoringStartAt: '2020-08-03 14:12:45',
                executionMonitoringEndAt: '2020-08-03 12:04:23',
                error: 7144617798,
                inactive: 1288749744,
                successful: 2800083668,
                stopped: 3910693969,
                unknown: 4724798713,
                unregistered: 4196282677,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '45d7174e-c0b4-4bf9-be6b-12d830621d4c'));
    });

    test(`/REST:DELETE bplus-it-sappi/channel-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel-overview/c6080073-b30e-4d1e-a563-f2fc809295ee')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/channel-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel-overview/45d7174e-c0b4-4bf9-be6b-12d830621d4c')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateChannelOverview - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateChannelOverviewInput!)
                    {
                        bplusItSappiCreateChannelOverview (payload:$payload)
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

    test(`/GraphQL bplusItSappiCreateChannelOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateChannelOverviewInput!)
                    {
                        bplusItSappiCreateChannelOverview (payload:$payload)
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
                        id: '479c83a0-228b-4fa7-be60-411709fd1e31',
                        tenantId: 'ae9eef35-4be6-4496-ab7e-b1f4012f29ad',
                        tenantCode: 'x4qd9fkqnhuu8wcy86ddmn9nto4j7s1g7rn806zt0y04rg8rjf',
                        systemId: '0b3338b9-e7e8-4557-bad1-d8eefff68250',
                        systemName: 'v88x0z8o2htqanaykn39',
                        executionId: '8af391b4-abe7-443d-8827-6f9109ba6512',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-08-02 19:46:56',
                        executionMonitoringStartAt: '2020-08-02 19:18:30',
                        executionMonitoringEndAt: '2020-08-03 10:47:38',
                        error: 2182664874,
                        inactive: 9503539726,
                        successful: 9683618590,
                        stopped: 8725829335,
                        unknown: 1166668346,
                        unregistered: 8706666725,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannelOverview).toHaveProperty('id', '479c83a0-228b-4fa7-be60-411709fd1e31');
            });
    });

    test(`/GraphQL bplusItSappiPaginateChannelsOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateChannelsOverview (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateChannelsOverview.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateChannelsOverview.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateChannelsOverview.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindChannelOverview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindChannelOverview (query:$query)
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
                    query: [
                        {
                            command : Command.WHERE,
                            column  : 'id',
                            operator: Operator.EQUALS,
                            value   : '68001fd6-1ad9-4502-9938-1feb5a837627'
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

    test(`/GraphQL bplusItSappiFindChannelOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindChannelOverview (query:$query)
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
                    query: [
                        {
                            command : Command.WHERE,
                            column  : 'id',
                            operator: Operator.EQUALS,
                            value   : '45d7174e-c0b4-4bf9-be6b-12d830621d4c'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelOverview.id).toStrictEqual('45d7174e-c0b4-4bf9-be6b-12d830621d4c');
            });
    });

    test(`/GraphQL bplusItSappiFindChannelOverviewById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindChannelOverviewById (id:$id)
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
                    id: 'cdad6ebb-ada2-40db-8684-ebaaaf1deac1'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiFindChannelOverviewById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindChannelOverviewById (id:$id)
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
                    id: '45d7174e-c0b4-4bf9-be6b-12d830621d4c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelOverviewById.id).toStrictEqual('45d7174e-c0b4-4bf9-be6b-12d830621d4c');
            });
    });

    test(`/GraphQL bplusItSappiGetChannelsOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetChannelsOverview (query:$query)
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
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetChannelsOverview.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateChannelOverview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateChannelOverviewInput!)
                    {
                        bplusItSappiUpdateChannelOverview (payload:$payload)
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
                        
                        id: 'ec3a6aa8-fc93-4513-bda8-82363b4c54a0',
                        tenantId: '3a1e4fcc-81b2-4654-ac60-058d5491a9fb',
                        tenantCode: '90hn0kgwwuzx4acijh6vlmwbsi6ef0cbgiuqtm94iwq6kzh6r0',
                        systemId: 'ea003459-8554-4384-90dc-e5c27901d052',
                        systemName: '3ggcoqe4m7iauntzt8sk',
                        executionId: '394ac30b-9eaa-425a-b247-2d390611fc04',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-08-03 00:07:54',
                        executionMonitoringStartAt: '2020-08-03 06:46:31',
                        executionMonitoringEndAt: '2020-08-02 19:50:59',
                        error: 8695336295,
                        inactive: 2230480682,
                        successful: 4344336612,
                        stopped: 7483630645,
                        unknown: 6667213973,
                        unregistered: 5249718122,
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

    test(`/GraphQL bplusItSappiUpdateChannelOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateChannelOverviewInput!)
                    {
                        bplusItSappiUpdateChannelOverview (payload:$payload)
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
                        
                        id: '45d7174e-c0b4-4bf9-be6b-12d830621d4c',
                        tenantId: 'ae9eef35-4be6-4496-ab7e-b1f4012f29ad',
                        tenantCode: '0j82duvvxp2bxbe26lq3mt7huqkv951q5qvsssu89rkoj0q5c5',
                        systemId: '0b3338b9-e7e8-4557-bad1-d8eefff68250',
                        systemName: 'zleyh09h21087k99aryf',
                        executionId: '8af391b4-abe7-443d-8827-6f9109ba6512',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-08-03 12:53:56',
                        executionMonitoringStartAt: '2020-08-02 18:33:20',
                        executionMonitoringEndAt: '2020-08-03 06:40:13',
                        error: 2014620271,
                        inactive: 8508505783,
                        successful: 5287645961,
                        stopped: 6036508469,
                        unknown: 2417766193,
                        unregistered: 8463271743,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannelOverview.id).toStrictEqual('45d7174e-c0b4-4bf9-be6b-12d830621d4c');
            });
    });

    test(`/GraphQL bplusItSappiDeleteChannelOverviewById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteChannelOverviewById (id:$id)
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
                    id: '784f5369-1250-43e1-8d59-138b11b3f57d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiDeleteChannelOverviewById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteChannelOverviewById (id:$id)
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
                    id: '45d7174e-c0b4-4bf9-be6b-12d830621d4c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelOverviewById.id).toStrictEqual('45d7174e-c0b4-4bf9-be6b-12d830621d4c');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});