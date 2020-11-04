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
                tenantId: 'fe7de818-1ae7-414c-acdf-8bb4eb4e2c5e',
                tenantCode: 'pyyz6c98cgrth65bbl8q48b0r061vh3xbzyt28jt9q93zho6co',
                systemId: 'c8b2ef22-51bd-48d1-8bdc-a1f729dc3a0c',
                systemName: 'nd830lb7juigyvwdpd6m',
                executionId: 'a881f2ca-075c-4b26-942a-8b39c17fb558',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 03:14:46',
                executionMonitoringStartAt: '2020-11-04 16:00:58',
                executionMonitoringEndAt: '2020-11-04 15:00:43',
                error: 7136191322,
                inactive: 1906192792,
                successful: 9442393307,
                stopped: 3894931507,
                unknown: 1191843017,
                unregistered: 7178396551,
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
                
                tenantId: 'fe7de818-1ae7-414c-acdf-8bb4eb4e2c5e',
                tenantCode: 'qtwnc5rmudfa5quobf5oal4gq9mzel43t8evk1t2xrfkxqk4c2',
                systemId: 'c8b2ef22-51bd-48d1-8bdc-a1f729dc3a0c',
                systemName: '23mklcpozxwrj4xve88s',
                executionId: 'a881f2ca-075c-4b26-942a-8b39c17fb558',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 15:34:44',
                executionMonitoringStartAt: '2020-11-04 18:06:23',
                executionMonitoringEndAt: '2020-11-04 08:18:41',
                error: 1275924003,
                inactive: 4602409398,
                successful: 6552221997,
                stopped: 6884845288,
                unknown: 7222915399,
                unregistered: 3886610795,
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
                id: '428dbc36-ad1f-42b2-8752-f4d6204459a2',
                tenantId: null,
                tenantCode: 'w5n9un1hzwwuzfuq50h9d6vbh9lr6qartcfvun7071vsyu5pel',
                systemId: 'c8b2ef22-51bd-48d1-8bdc-a1f729dc3a0c',
                systemName: 'qc4nj91rfcl4ewu0mdvc',
                executionId: 'a881f2ca-075c-4b26-942a-8b39c17fb558',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 04:06:26',
                executionMonitoringStartAt: '2020-11-04 12:49:20',
                executionMonitoringEndAt: '2020-11-04 19:20:23',
                error: 9743397963,
                inactive: 1765941946,
                successful: 1591135253,
                stopped: 6833694774,
                unknown: 6691621867,
                unregistered: 6625540347,
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
                id: '428dbc36-ad1f-42b2-8752-f4d6204459a2',
                
                tenantCode: '2ummhitz018inuurulu4szlfcsaij5e1040r21r7x0dqqnhd06',
                systemId: 'c8b2ef22-51bd-48d1-8bdc-a1f729dc3a0c',
                systemName: 'j19m06asvvqvuy11eguy',
                executionId: 'a881f2ca-075c-4b26-942a-8b39c17fb558',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 02:00:38',
                executionMonitoringStartAt: '2020-11-04 10:31:11',
                executionMonitoringEndAt: '2020-11-04 15:47:06',
                error: 8632692239,
                inactive: 3826268282,
                successful: 4186599308,
                stopped: 2937614104,
                unknown: 3110108122,
                unregistered: 8298911679,
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
                id: '428dbc36-ad1f-42b2-8752-f4d6204459a2',
                tenantId: 'fe7de818-1ae7-414c-acdf-8bb4eb4e2c5e',
                tenantCode: null,
                systemId: 'c8b2ef22-51bd-48d1-8bdc-a1f729dc3a0c',
                systemName: 'tx5962qke74hdxaw2uxa',
                executionId: 'a881f2ca-075c-4b26-942a-8b39c17fb558',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 17:33:08',
                executionMonitoringStartAt: '2020-11-04 05:15:45',
                executionMonitoringEndAt: '2020-11-04 17:05:51',
                error: 5087302992,
                inactive: 2878180351,
                successful: 9864584642,
                stopped: 6292374296,
                unknown: 4456965126,
                unregistered: 2897699092,
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
                id: '428dbc36-ad1f-42b2-8752-f4d6204459a2',
                tenantId: 'fe7de818-1ae7-414c-acdf-8bb4eb4e2c5e',
                
                systemId: 'c8b2ef22-51bd-48d1-8bdc-a1f729dc3a0c',
                systemName: 'r147ewvflc3d5vzfgg7p',
                executionId: 'a881f2ca-075c-4b26-942a-8b39c17fb558',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 23:09:07',
                executionMonitoringStartAt: '2020-11-04 12:41:43',
                executionMonitoringEndAt: '2020-11-04 21:50:57',
                error: 2019810409,
                inactive: 9772609296,
                successful: 6714504535,
                stopped: 9174260176,
                unknown: 7405048592,
                unregistered: 8274672874,
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
                id: '428dbc36-ad1f-42b2-8752-f4d6204459a2',
                tenantId: 'fe7de818-1ae7-414c-acdf-8bb4eb4e2c5e',
                tenantCode: 'a0amro1cc91oyltvv69x8oxrrpma31mgcy0b63av5qg17t48ot',
                systemId: null,
                systemName: 'ueteglxygcztd38bzqgs',
                executionId: 'a881f2ca-075c-4b26-942a-8b39c17fb558',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 17:15:23',
                executionMonitoringStartAt: '2020-11-04 05:12:07',
                executionMonitoringEndAt: '2020-11-04 15:57:21',
                error: 2921706047,
                inactive: 5055632080,
                successful: 9697904620,
                stopped: 1450001217,
                unknown: 4252394780,
                unregistered: 7394190916,
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
                id: '428dbc36-ad1f-42b2-8752-f4d6204459a2',
                tenantId: 'fe7de818-1ae7-414c-acdf-8bb4eb4e2c5e',
                tenantCode: 'c20scx5k8bhly1vejpuddqp9ul9xad4l3w77f1rxvf4xu9puba',
                
                systemName: 'qbu2m3936w1zd2327pe8',
                executionId: 'a881f2ca-075c-4b26-942a-8b39c17fb558',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 21:34:52',
                executionMonitoringStartAt: '2020-11-04 13:49:25',
                executionMonitoringEndAt: '2020-11-03 23:34:56',
                error: 9954955175,
                inactive: 6463717579,
                successful: 9259277467,
                stopped: 4134643129,
                unknown: 7818048121,
                unregistered: 1985465606,
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
                id: '428dbc36-ad1f-42b2-8752-f4d6204459a2',
                tenantId: 'fe7de818-1ae7-414c-acdf-8bb4eb4e2c5e',
                tenantCode: 'w53usa180xozz4zo2pattl4qpr6a0xfu7esw1wg83kls4xa4vx',
                systemId: 'c8b2ef22-51bd-48d1-8bdc-a1f729dc3a0c',
                systemName: null,
                executionId: 'a881f2ca-075c-4b26-942a-8b39c17fb558',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 05:31:01',
                executionMonitoringStartAt: '2020-11-04 01:36:02',
                executionMonitoringEndAt: '2020-11-04 16:16:11',
                error: 1309375739,
                inactive: 3756100487,
                successful: 8999357477,
                stopped: 2960354259,
                unknown: 5504974242,
                unregistered: 2092882864,
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
                id: '428dbc36-ad1f-42b2-8752-f4d6204459a2',
                tenantId: 'fe7de818-1ae7-414c-acdf-8bb4eb4e2c5e',
                tenantCode: 'n0zhsc2n6j2eemrjkfecjkz78u7z2rp0wm2i6b6lp2lc0kqugm',
                systemId: 'c8b2ef22-51bd-48d1-8bdc-a1f729dc3a0c',
                
                executionId: 'a881f2ca-075c-4b26-942a-8b39c17fb558',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 16:21:52',
                executionMonitoringStartAt: '2020-11-04 04:59:31',
                executionMonitoringEndAt: '2020-11-04 14:46:46',
                error: 2026720565,
                inactive: 4274552576,
                successful: 3905521232,
                stopped: 6567555204,
                unknown: 4703099229,
                unregistered: 8511507179,
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
                id: '428dbc36-ad1f-42b2-8752-f4d6204459a2',
                tenantId: 'fe7de818-1ae7-414c-acdf-8bb4eb4e2c5e',
                tenantCode: 'cxzb7g66i0zu7rkfn5n0e5j1xdpwf52zczs0chf52yuwu1qq9m',
                systemId: 'c8b2ef22-51bd-48d1-8bdc-a1f729dc3a0c',
                systemName: 'opif622tlxq55v3jh6p7',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 17:19:10',
                executionMonitoringStartAt: '2020-11-04 17:03:50',
                executionMonitoringEndAt: '2020-11-04 02:26:20',
                error: 4333307471,
                inactive: 4440882286,
                successful: 4847957479,
                stopped: 6998982171,
                unknown: 5012451338,
                unregistered: 2011164653,
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
                id: '428dbc36-ad1f-42b2-8752-f4d6204459a2',
                tenantId: 'fe7de818-1ae7-414c-acdf-8bb4eb4e2c5e',
                tenantCode: '5cmdgkaq9ptweh3izgswc042btkibkqlpl0oi2wowiwgkplgpr',
                systemId: 'c8b2ef22-51bd-48d1-8bdc-a1f729dc3a0c',
                systemName: 'ftkbika9r3bmrcq9dwr5',
                
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 03:34:52',
                executionMonitoringStartAt: '2020-11-04 13:41:48',
                executionMonitoringEndAt: '2020-11-04 11:54:03',
                error: 3894092966,
                inactive: 7074532755,
                successful: 3693239004,
                stopped: 2678816950,
                unknown: 4976881342,
                unregistered: 4332859278,
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
                id: '428dbc36-ad1f-42b2-8752-f4d6204459a2',
                tenantId: 'fe7de818-1ae7-414c-acdf-8bb4eb4e2c5e',
                tenantCode: '8x7l43t5smx079f8nln2om5pznqpzwiohfx3u1uie695cqcmfo',
                systemId: 'c8b2ef22-51bd-48d1-8bdc-a1f729dc3a0c',
                systemName: 'zcrj8gj3wnjjoc3fx9vy',
                executionId: 'a881f2ca-075c-4b26-942a-8b39c17fb558',
                executionType: null,
                executionExecutedAt: '2020-11-04 09:34:55',
                executionMonitoringStartAt: '2020-11-04 14:03:51',
                executionMonitoringEndAt: '2020-11-04 22:47:56',
                error: 1229553276,
                inactive: 9283121385,
                successful: 8060722271,
                stopped: 7871405229,
                unknown: 6264087981,
                unregistered: 9588252629,
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
                id: '428dbc36-ad1f-42b2-8752-f4d6204459a2',
                tenantId: 'fe7de818-1ae7-414c-acdf-8bb4eb4e2c5e',
                tenantCode: '1bj7ec4n47nu3dlickaiy5f9ouqukbsohpx4xpjtrd8igqp7uh',
                systemId: 'c8b2ef22-51bd-48d1-8bdc-a1f729dc3a0c',
                systemName: 'nfxr4g3hjg5w60slwfe9',
                executionId: 'a881f2ca-075c-4b26-942a-8b39c17fb558',
                
                executionExecutedAt: '2020-11-04 01:48:25',
                executionMonitoringStartAt: '2020-11-04 09:40:17',
                executionMonitoringEndAt: '2020-11-04 22:53:53',
                error: 7685688003,
                inactive: 8706843269,
                successful: 5396490436,
                stopped: 6789478432,
                unknown: 2219824651,
                unregistered: 2988865220,
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
                id: '428dbc36-ad1f-42b2-8752-f4d6204459a2',
                tenantId: 'fe7de818-1ae7-414c-acdf-8bb4eb4e2c5e',
                tenantCode: '7kia6pxxv388b3cq3pc99a4zzz4ze8pu9829fauirzzegp88s4',
                systemId: 'c8b2ef22-51bd-48d1-8bdc-a1f729dc3a0c',
                systemName: 'qh322hem6xau626c01nj',
                executionId: 'a881f2ca-075c-4b26-942a-8b39c17fb558',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-11-04 11:52:13',
                executionMonitoringEndAt: '2020-11-04 12:19:22',
                error: 8763412819,
                inactive: 9774669167,
                successful: 3189233058,
                stopped: 6345020695,
                unknown: 5561090159,
                unregistered: 9007088041,
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
                id: '428dbc36-ad1f-42b2-8752-f4d6204459a2',
                tenantId: 'fe7de818-1ae7-414c-acdf-8bb4eb4e2c5e',
                tenantCode: '4d0k8bac0zqce2th9bvhod0rs2mxbc1lnuy7imbzcdbxbdputs',
                systemId: 'c8b2ef22-51bd-48d1-8bdc-a1f729dc3a0c',
                systemName: 'ty14otgf0o5unmtjtae8',
                executionId: 'a881f2ca-075c-4b26-942a-8b39c17fb558',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-11-04 01:33:40',
                executionMonitoringEndAt: '2020-11-04 09:11:38',
                error: 2939290416,
                inactive: 6451429854,
                successful: 5341294594,
                stopped: 1168557410,
                unknown: 1698656894,
                unregistered: 6948573909,
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
                id: '428dbc36-ad1f-42b2-8752-f4d6204459a2',
                tenantId: 'fe7de818-1ae7-414c-acdf-8bb4eb4e2c5e',
                tenantCode: 'qaxcukxb60gyyotfofch9l3dfzzjjno5dkkcly8zq0krvlur29',
                systemId: 'c8b2ef22-51bd-48d1-8bdc-a1f729dc3a0c',
                systemName: '13ga2ge0a62xpden0ysd',
                executionId: 'a881f2ca-075c-4b26-942a-8b39c17fb558',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 18:48:13',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-11-04 08:38:15',
                error: 2597780806,
                inactive: 1375303628,
                successful: 5038913607,
                stopped: 9512864216,
                unknown: 1473730204,
                unregistered: 6535600487,
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
                id: '428dbc36-ad1f-42b2-8752-f4d6204459a2',
                tenantId: 'fe7de818-1ae7-414c-acdf-8bb4eb4e2c5e',
                tenantCode: 'zjpgyqylf5jn3vqmrv7j3gjuv6hlipsa25vz7k8j0glxzy9mbh',
                systemId: 'c8b2ef22-51bd-48d1-8bdc-a1f729dc3a0c',
                systemName: 'sk9tfiauobq6gaorphzv',
                executionId: 'a881f2ca-075c-4b26-942a-8b39c17fb558',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 15:14:41',
                
                executionMonitoringEndAt: '2020-11-04 22:15:07',
                error: 9011585744,
                inactive: 9538588725,
                successful: 6021212889,
                stopped: 3346547984,
                unknown: 1040635254,
                unregistered: 3166863851,
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
                id: '428dbc36-ad1f-42b2-8752-f4d6204459a2',
                tenantId: 'fe7de818-1ae7-414c-acdf-8bb4eb4e2c5e',
                tenantCode: 'z2jzvjd6vwe2t6d4biic3gaz1hof1cuyn8doewu51cr7qt1xd0',
                systemId: 'c8b2ef22-51bd-48d1-8bdc-a1f729dc3a0c',
                systemName: 'clravwy9dlg2pyl2fl90',
                executionId: 'a881f2ca-075c-4b26-942a-8b39c17fb558',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 12:27:25',
                executionMonitoringStartAt: '2020-11-04 03:24:24',
                executionMonitoringEndAt: null,
                error: 3642453038,
                inactive: 5957240491,
                successful: 9829060929,
                stopped: 4870445948,
                unknown: 5965281825,
                unregistered: 4718607650,
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
                id: '428dbc36-ad1f-42b2-8752-f4d6204459a2',
                tenantId: 'fe7de818-1ae7-414c-acdf-8bb4eb4e2c5e',
                tenantCode: '9skbeqi8x8sz8l1zmoporwsfp4cb605fsmin7npd298lrtbof0',
                systemId: 'c8b2ef22-51bd-48d1-8bdc-a1f729dc3a0c',
                systemName: '9lv9rnxj6h20efyvamwb',
                executionId: 'a881f2ca-075c-4b26-942a-8b39c17fb558',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 18:21:50',
                executionMonitoringStartAt: '2020-11-04 16:14:34',
                
                error: 1904389499,
                inactive: 3160671885,
                successful: 5499823356,
                stopped: 2442329380,
                unknown: 4230725104,
                unregistered: 1602636993,
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
                id: 'qx6ja7w5c6oaibdmvtyktzyfepwpazs20pmn1',
                tenantId: 'fe7de818-1ae7-414c-acdf-8bb4eb4e2c5e',
                tenantCode: 'ihijskevunx8t985tipyw3vng8ahnlab6n2upujmryr2e6lfnz',
                systemId: 'c8b2ef22-51bd-48d1-8bdc-a1f729dc3a0c',
                systemName: 't5rcjtne60bbgmh12t2h',
                executionId: 'a881f2ca-075c-4b26-942a-8b39c17fb558',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 23:39:46',
                executionMonitoringStartAt: '2020-11-04 14:08:48',
                executionMonitoringEndAt: '2020-11-04 03:00:46',
                error: 8786374376,
                inactive: 2729297510,
                successful: 4808950841,
                stopped: 6571508986,
                unknown: 5004418448,
                unregistered: 9336080323,
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
                id: '428dbc36-ad1f-42b2-8752-f4d6204459a2',
                tenantId: 'mkmlik0e6dwrcdymvcy0fbzo3do8tkxupurbm',
                tenantCode: 'avf0hewu80de4qujtia8z76ofy2q6gj53984prvvrarh7xohps',
                systemId: 'c8b2ef22-51bd-48d1-8bdc-a1f729dc3a0c',
                systemName: 'mrqhcbc2su3hisixpgrl',
                executionId: 'a881f2ca-075c-4b26-942a-8b39c17fb558',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 15:30:59',
                executionMonitoringStartAt: '2020-11-03 23:07:33',
                executionMonitoringEndAt: '2020-11-04 18:40:24',
                error: 1031663891,
                inactive: 7324888920,
                successful: 8047171037,
                stopped: 7106369439,
                unknown: 3238830587,
                unregistered: 2325914318,
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
                id: '428dbc36-ad1f-42b2-8752-f4d6204459a2',
                tenantId: 'fe7de818-1ae7-414c-acdf-8bb4eb4e2c5e',
                tenantCode: 'ysb44o7a4hnkotqe5pfdykhsr1etg5m438smcu7pag9g3go0ek',
                systemId: 'yrvzr0ql2ah3c7d3v45btzwe3snarlc6cx355',
                systemName: 'eyfigwipyd0hb86i8poi',
                executionId: 'a881f2ca-075c-4b26-942a-8b39c17fb558',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 11:28:25',
                executionMonitoringStartAt: '2020-11-04 01:38:51',
                executionMonitoringEndAt: '2020-11-04 00:18:23',
                error: 8077983991,
                inactive: 2150518205,
                successful: 7497099143,
                stopped: 6679693703,
                unknown: 3069658071,
                unregistered: 4677590676,
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
                id: '428dbc36-ad1f-42b2-8752-f4d6204459a2',
                tenantId: 'fe7de818-1ae7-414c-acdf-8bb4eb4e2c5e',
                tenantCode: 'aklzvfqybnvxu06uuhyjak287nj9wejkd69ojv6yy3fs15a2zv',
                systemId: 'c8b2ef22-51bd-48d1-8bdc-a1f729dc3a0c',
                systemName: 'gjvnogt2tg4p5spa9xbg',
                executionId: 'ae5jbj88becxufl6owqdohf8bav0m6oxpyynj',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 08:48:37',
                executionMonitoringStartAt: '2020-11-04 11:00:51',
                executionMonitoringEndAt: '2020-11-04 13:57:02',
                error: 5326061885,
                inactive: 3304501217,
                successful: 2667365285,
                stopped: 1116842848,
                unknown: 1705985543,
                unregistered: 2492971438,
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
                id: '428dbc36-ad1f-42b2-8752-f4d6204459a2',
                tenantId: 'fe7de818-1ae7-414c-acdf-8bb4eb4e2c5e',
                tenantCode: '12scjjc6hb3oo9euev3kthpizev9pnlgecqlk8hetfa1ds1p10q',
                systemId: 'c8b2ef22-51bd-48d1-8bdc-a1f729dc3a0c',
                systemName: 'eg59d5rw3rgkn6mj0qfh',
                executionId: 'a881f2ca-075c-4b26-942a-8b39c17fb558',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 01:41:05',
                executionMonitoringStartAt: '2020-11-04 17:45:04',
                executionMonitoringEndAt: '2020-11-04 04:29:37',
                error: 1660181833,
                inactive: 1108140939,
                successful: 6558163172,
                stopped: 6988244288,
                unknown: 3117770349,
                unregistered: 9361433213,
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
                id: '428dbc36-ad1f-42b2-8752-f4d6204459a2',
                tenantId: 'fe7de818-1ae7-414c-acdf-8bb4eb4e2c5e',
                tenantCode: 'tq31ivf0emkwfp4folxzoqwnh3hp4qvmzpy31d44y5qxxbuko8',
                systemId: 'c8b2ef22-51bd-48d1-8bdc-a1f729dc3a0c',
                systemName: 'pxagu279m2m85mnrgbpmk',
                executionId: 'a881f2ca-075c-4b26-942a-8b39c17fb558',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 21:16:10',
                executionMonitoringStartAt: '2020-11-04 19:44:42',
                executionMonitoringEndAt: '2020-11-04 15:33:38',
                error: 5390242840,
                inactive: 1496134808,
                successful: 8262554839,
                stopped: 5989868250,
                unknown: 1520828453,
                unregistered: 5978946031,
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
                id: '428dbc36-ad1f-42b2-8752-f4d6204459a2',
                tenantId: 'fe7de818-1ae7-414c-acdf-8bb4eb4e2c5e',
                tenantCode: 'ju55irgrzkeh0chuedm5jx3x771251to3kmonginvyo226el9j',
                systemId: 'c8b2ef22-51bd-48d1-8bdc-a1f729dc3a0c',
                systemName: 'uehfmcxu92slyfddnjd3',
                executionId: 'a881f2ca-075c-4b26-942a-8b39c17fb558',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 18:04:56',
                executionMonitoringStartAt: '2020-11-04 05:37:29',
                executionMonitoringEndAt: '2020-11-04 12:27:32',
                error: 75115515713,
                inactive: 2272426526,
                successful: 4603813867,
                stopped: 3993681172,
                unknown: 9002662219,
                unregistered: 1509144127,
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
                id: '428dbc36-ad1f-42b2-8752-f4d6204459a2',
                tenantId: 'fe7de818-1ae7-414c-acdf-8bb4eb4e2c5e',
                tenantCode: 'upsateas4773oly3s5nyy2laps8hlt2dckzm5n2sye2dbn4ahe',
                systemId: 'c8b2ef22-51bd-48d1-8bdc-a1f729dc3a0c',
                systemName: '4oxwdorqyttvgw5j9mwi',
                executionId: 'a881f2ca-075c-4b26-942a-8b39c17fb558',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 09:29:17',
                executionMonitoringStartAt: '2020-11-04 07:56:18',
                executionMonitoringEndAt: '2020-11-04 17:22:25',
                error: 4825433160,
                inactive: 38968671946,
                successful: 1181383024,
                stopped: 6394272952,
                unknown: 5246286515,
                unregistered: 3968858527,
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
                id: '428dbc36-ad1f-42b2-8752-f4d6204459a2',
                tenantId: 'fe7de818-1ae7-414c-acdf-8bb4eb4e2c5e',
                tenantCode: 'fgtugcl8aokl719twmm9atyczczuz2k97vd9rrx2545i8598nx',
                systemId: 'c8b2ef22-51bd-48d1-8bdc-a1f729dc3a0c',
                systemName: 'ajh8101sz4q1cficr36x',
                executionId: 'a881f2ca-075c-4b26-942a-8b39c17fb558',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 16:37:06',
                executionMonitoringStartAt: '2020-11-04 18:50:53',
                executionMonitoringEndAt: '2020-11-04 21:11:05',
                error: 3279625470,
                inactive: 3870092733,
                successful: 98968958033,
                stopped: 7234023577,
                unknown: 5762069838,
                unregistered: 4711302204,
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
                id: '428dbc36-ad1f-42b2-8752-f4d6204459a2',
                tenantId: 'fe7de818-1ae7-414c-acdf-8bb4eb4e2c5e',
                tenantCode: '7bp511to0cc5dygas63k3o6oyj5omfaljyanx4g6gy1msunnkd',
                systemId: 'c8b2ef22-51bd-48d1-8bdc-a1f729dc3a0c',
                systemName: '7tmbvj5p6tsk4rycfja1',
                executionId: 'a881f2ca-075c-4b26-942a-8b39c17fb558',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 01:06:20',
                executionMonitoringStartAt: '2020-11-04 16:28:36',
                executionMonitoringEndAt: '2020-11-04 08:02:06',
                error: 6798803968,
                inactive: 8617066021,
                successful: 6137002036,
                stopped: 49467967835,
                unknown: 4941328661,
                unregistered: 2293645654,
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
                id: '428dbc36-ad1f-42b2-8752-f4d6204459a2',
                tenantId: 'fe7de818-1ae7-414c-acdf-8bb4eb4e2c5e',
                tenantCode: '2f9o0yr4o7tv4cxwo2h2x7d1mcjlw70rbt9kpz2kgtxgbabaup',
                systemId: 'c8b2ef22-51bd-48d1-8bdc-a1f729dc3a0c',
                systemName: 'bink5u3q6zft122rzot9',
                executionId: 'a881f2ca-075c-4b26-942a-8b39c17fb558',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 14:25:42',
                executionMonitoringStartAt: '2020-11-04 01:56:09',
                executionMonitoringEndAt: '2020-11-04 05:26:06',
                error: 5156190447,
                inactive: 7259076515,
                successful: 7937680607,
                stopped: 9619019578,
                unknown: 69858210590,
                unregistered: 6697780121,
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
                id: '428dbc36-ad1f-42b2-8752-f4d6204459a2',
                tenantId: 'fe7de818-1ae7-414c-acdf-8bb4eb4e2c5e',
                tenantCode: '2f5t7tj5g0dhv32tx16d999c9ey670r5j6iuu9tht52ax8wbc8',
                systemId: 'c8b2ef22-51bd-48d1-8bdc-a1f729dc3a0c',
                systemName: 'c72m5qzzfy84yhigg5kc',
                executionId: 'a881f2ca-075c-4b26-942a-8b39c17fb558',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 00:15:44',
                executionMonitoringStartAt: '2020-11-04 12:43:07',
                executionMonitoringEndAt: '2020-11-04 01:28:54',
                error: 3073977605,
                inactive: 2611520375,
                successful: 7172564088,
                stopped: 2037487699,
                unknown: 7760725023,
                unregistered: 83297756292,
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
                id: '428dbc36-ad1f-42b2-8752-f4d6204459a2',
                tenantId: 'fe7de818-1ae7-414c-acdf-8bb4eb4e2c5e',
                tenantCode: 'hro4j55gt1tkm08q19cu2udzxd3nyhowamcc2btjn34s493x0q',
                systemId: 'c8b2ef22-51bd-48d1-8bdc-a1f729dc3a0c',
                systemName: 'tohr38437ux2uh0bd1ai',
                executionId: 'a881f2ca-075c-4b26-942a-8b39c17fb558',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 04:18:56',
                executionMonitoringStartAt: '2020-11-04 09:12:36',
                executionMonitoringEndAt: '2020-11-04 11:01:11',
                error: -9,
                inactive: 6035739318,
                successful: 1750353928,
                stopped: 6097074791,
                unknown: 4743716768,
                unregistered: 4743340861,
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
                id: '428dbc36-ad1f-42b2-8752-f4d6204459a2',
                tenantId: 'fe7de818-1ae7-414c-acdf-8bb4eb4e2c5e',
                tenantCode: 'wn5dj0i4ez2uje4d9oxos6wg67zxzf6kdpfhudawzoc19007sw',
                systemId: 'c8b2ef22-51bd-48d1-8bdc-a1f729dc3a0c',
                systemName: 'jrdtq668bn4o0e2a0sg3',
                executionId: 'a881f2ca-075c-4b26-942a-8b39c17fb558',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 04:39:36',
                executionMonitoringStartAt: '2020-11-04 09:19:15',
                executionMonitoringEndAt: '2020-11-04 10:47:36',
                error: 4720528707,
                inactive: -9,
                successful: 8108602292,
                stopped: 8847054050,
                unknown: 5310226669,
                unregistered: 3027853665,
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
                id: '428dbc36-ad1f-42b2-8752-f4d6204459a2',
                tenantId: 'fe7de818-1ae7-414c-acdf-8bb4eb4e2c5e',
                tenantCode: 'gv9bzla4llo4whwu2um812twzqlyxp5jjz6rn7q077d3qo3sss',
                systemId: 'c8b2ef22-51bd-48d1-8bdc-a1f729dc3a0c',
                systemName: 'g0dopurzoj86r9ymekex',
                executionId: 'a881f2ca-075c-4b26-942a-8b39c17fb558',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 12:14:10',
                executionMonitoringStartAt: '2020-11-04 00:51:49',
                executionMonitoringEndAt: '2020-11-04 07:28:15',
                error: 9997348388,
                inactive: 8779316428,
                successful: -9,
                stopped: 6435549912,
                unknown: 5026473388,
                unregistered: 8834933391,
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
                id: '428dbc36-ad1f-42b2-8752-f4d6204459a2',
                tenantId: 'fe7de818-1ae7-414c-acdf-8bb4eb4e2c5e',
                tenantCode: 'fhwk7bu5pwf1h6dhy4bn5pwwhxb2owb924ddo4hht6nlcn20v3',
                systemId: 'c8b2ef22-51bd-48d1-8bdc-a1f729dc3a0c',
                systemName: '8tr9cz3mdf1dq3mfh5se',
                executionId: 'a881f2ca-075c-4b26-942a-8b39c17fb558',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 07:07:41',
                executionMonitoringStartAt: '2020-11-04 04:34:39',
                executionMonitoringEndAt: '2020-11-04 12:18:46',
                error: 3813010442,
                inactive: 8740559491,
                successful: 2670160741,
                stopped: -9,
                unknown: 6227217033,
                unregistered: 4979631913,
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
                id: '428dbc36-ad1f-42b2-8752-f4d6204459a2',
                tenantId: 'fe7de818-1ae7-414c-acdf-8bb4eb4e2c5e',
                tenantCode: 'fg69v0jhlrioxdutfme7q8yhlkchtshcaz1zs8kp95qvirek6s',
                systemId: 'c8b2ef22-51bd-48d1-8bdc-a1f729dc3a0c',
                systemName: '6e1fphf2m9vxur56x1v0',
                executionId: 'a881f2ca-075c-4b26-942a-8b39c17fb558',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 11:43:27',
                executionMonitoringStartAt: '2020-11-04 01:52:23',
                executionMonitoringEndAt: '2020-11-04 16:10:22',
                error: 6194972758,
                inactive: 3077726673,
                successful: 3477109001,
                stopped: 5332322266,
                unknown: -9,
                unregistered: 3552457111,
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
                id: '428dbc36-ad1f-42b2-8752-f4d6204459a2',
                tenantId: 'fe7de818-1ae7-414c-acdf-8bb4eb4e2c5e',
                tenantCode: 'b02rhk3f9l0969nzp3qaozev5lu5imd7xo3arghx1xffeyabyr',
                systemId: 'c8b2ef22-51bd-48d1-8bdc-a1f729dc3a0c',
                systemName: '9fuhe0j9laq0ff7dm4wd',
                executionId: 'a881f2ca-075c-4b26-942a-8b39c17fb558',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 05:08:05',
                executionMonitoringStartAt: '2020-11-04 22:40:37',
                executionMonitoringEndAt: '2020-11-04 06:10:58',
                error: 2777016866,
                inactive: 6625473531,
                successful: 9539067076,
                stopped: 3613555296,
                unknown: 3531178113,
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
                id: '428dbc36-ad1f-42b2-8752-f4d6204459a2',
                tenantId: 'fe7de818-1ae7-414c-acdf-8bb4eb4e2c5e',
                tenantCode: '2csjya948pm4u4fnfoasaha8puln51136baflxzj6e78xo5em3',
                systemId: 'c8b2ef22-51bd-48d1-8bdc-a1f729dc3a0c',
                systemName: 'i03umzy30miylceaa3rs',
                executionId: 'a881f2ca-075c-4b26-942a-8b39c17fb558',
                executionType: 'XXXX',
                executionExecutedAt: '2020-11-04 18:00:14',
                executionMonitoringStartAt: '2020-11-03 23:59:13',
                executionMonitoringEndAt: '2020-11-04 02:39:47',
                error: 5124298125,
                inactive: 5027069956,
                successful: 6200184847,
                stopped: 8192365123,
                unknown: 4932647551,
                unregistered: 5941678486,
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
                id: '428dbc36-ad1f-42b2-8752-f4d6204459a2',
                tenantId: 'fe7de818-1ae7-414c-acdf-8bb4eb4e2c5e',
                tenantCode: 'wp0kyo3go37ozx4fv8pwax0l8vjez8rkv7jeuedqoeivqo65ia',
                systemId: 'c8b2ef22-51bd-48d1-8bdc-a1f729dc3a0c',
                systemName: 'sc79i34elikc9m6t78lw',
                executionId: 'a881f2ca-075c-4b26-942a-8b39c17fb558',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-11-04 14:56:40',
                executionMonitoringEndAt: '2020-11-04 17:12:39',
                error: 9542542020,
                inactive: 1070805950,
                successful: 5390387287,
                stopped: 3796292154,
                unknown: 6710573804,
                unregistered: 3559985734,
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
                id: '428dbc36-ad1f-42b2-8752-f4d6204459a2',
                tenantId: 'fe7de818-1ae7-414c-acdf-8bb4eb4e2c5e',
                tenantCode: '2119tf1qgrx3avul5i1gtxt2d5g9yhy67ocbh35erbc5iaxxni',
                systemId: 'c8b2ef22-51bd-48d1-8bdc-a1f729dc3a0c',
                systemName: 'ign5nqkf61jsh9d85owd',
                executionId: 'a881f2ca-075c-4b26-942a-8b39c17fb558',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 04:50:03',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-11-04 05:20:10',
                error: 3657062012,
                inactive: 7760358945,
                successful: 6038741011,
                stopped: 3055176631,
                unknown: 2910806253,
                unregistered: 1111577812,
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
                id: '428dbc36-ad1f-42b2-8752-f4d6204459a2',
                tenantId: 'fe7de818-1ae7-414c-acdf-8bb4eb4e2c5e',
                tenantCode: '2dgm5kg6gwr71tpvw882yq7p65gvux4xyezhyk8gr511y28jsa',
                systemId: 'c8b2ef22-51bd-48d1-8bdc-a1f729dc3a0c',
                systemName: 'qov4oj10j1lsyuglz4em',
                executionId: 'a881f2ca-075c-4b26-942a-8b39c17fb558',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 07:24:25',
                executionMonitoringStartAt: '2020-11-04 06:08:28',
                executionMonitoringEndAt: 'XXXXXXXX',
                error: 9453293226,
                inactive: 7969164974,
                successful: 4795256411,
                stopped: 3920225019,
                unknown: 2232238052,
                unregistered: 6261820044,
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
                id: '428dbc36-ad1f-42b2-8752-f4d6204459a2',
                tenantId: 'fe7de818-1ae7-414c-acdf-8bb4eb4e2c5e',
                tenantCode: '0gg9ak8hd62mmbopakn50vbafd49bo5iywy10dvzsqpeq4pj07',
                systemId: 'c8b2ef22-51bd-48d1-8bdc-a1f729dc3a0c',
                systemName: 'hm6pq9s3h5nbxdcg08bc',
                executionId: 'a881f2ca-075c-4b26-942a-8b39c17fb558',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 18:33:14',
                executionMonitoringStartAt: '2020-11-04 08:06:28',
                executionMonitoringEndAt: '2020-11-04 03:41:02',
                error: 9662487224,
                inactive: 8829276101,
                successful: 1967755175,
                stopped: 9635127509,
                unknown: 8976088220,
                unregistered: 4246045070,
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
                        id: '821e5025-3942-484d-804b-3eab1125736b'
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
                        id: '428dbc36-ad1f-42b2-8752-f4d6204459a2'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '428dbc36-ad1f-42b2-8752-f4d6204459a2'));
    });

    test(`/REST:GET cci/channel-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channel-overview/418908b5-3185-4456-b39c-55c573fe0ecc')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/channel-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channel-overview/428dbc36-ad1f-42b2-8752-f4d6204459a2')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '428dbc36-ad1f-42b2-8752-f4d6204459a2'));
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
                
                id: 'a433e65a-5c3a-43fc-bc58-f5adf4ff5708',
                tenantId: 'c2280325-bca3-4fc9-898c-d6b4ff94545e',
                tenantCode: 'vn89xmhi66y40qcje45fjjif03i8w91xs0zk58w17yyq34c06e',
                systemId: '50892d94-364a-40d5-928e-3925a90cb494',
                systemName: 'uok9rcgb13paxzgtqn3i',
                executionId: '2840987f-1c04-4cad-aa99-295b7f16c4a7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 10:42:03',
                executionMonitoringStartAt: '2020-11-04 14:58:00',
                executionMonitoringEndAt: '2020-11-04 17:03:15',
                error: 8504901373,
                inactive: 3460982417,
                successful: 2955847119,
                stopped: 1483651086,
                unknown: 7726926050,
                unregistered: 2640415012,
            })
            .expect(404);
    });

    test(`/REST:PUT cci/channel-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: '428dbc36-ad1f-42b2-8752-f4d6204459a2',
                tenantId: 'fe7de818-1ae7-414c-acdf-8bb4eb4e2c5e',
                tenantCode: '3laj7fn3yr3ss8anwrkm28b6b4834waanog2bolk68x9ivpzl3',
                systemId: 'c8b2ef22-51bd-48d1-8bdc-a1f729dc3a0c',
                systemName: '99nqa1omudtf00x4s3ne',
                executionId: 'a881f2ca-075c-4b26-942a-8b39c17fb558',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 22:49:28',
                executionMonitoringStartAt: '2020-11-04 21:13:16',
                executionMonitoringEndAt: '2020-11-04 18:18:02',
                error: 5468225137,
                inactive: 2217597904,
                successful: 7331804896,
                stopped: 4562209555,
                unknown: 3436199570,
                unregistered: 2917258118,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '428dbc36-ad1f-42b2-8752-f4d6204459a2'));
    });

    test(`/REST:DELETE cci/channel-overview/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/channel-overview/3a27c1a7-1c37-4366-a056-1747e5330ad0')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/channel-overview/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/channel-overview/428dbc36-ad1f-42b2-8752-f4d6204459a2')
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
                        id: 'cced5080-7576-426f-aa27-698da5d781c2',
                        tenantId: 'fe7de818-1ae7-414c-acdf-8bb4eb4e2c5e',
                        tenantCode: 'g9rjytq4f9n5mlcu7tvsmrnx35k4e4mjulcm8nx6w5f3hyufwe',
                        systemId: 'c8b2ef22-51bd-48d1-8bdc-a1f729dc3a0c',
                        systemName: '2qm7p3k0cdzk5e3bytgi',
                        executionId: 'a881f2ca-075c-4b26-942a-8b39c17fb558',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-11-04 09:25:10',
                        executionMonitoringStartAt: '2020-11-04 00:57:58',
                        executionMonitoringEndAt: '2020-11-04 13:03:13',
                        error: 7065382280,
                        inactive: 5678848458,
                        successful: 4628608556,
                        stopped: 1913373691,
                        unknown: 6110459974,
                        unregistered: 9765041113,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateChannelOverview).toHaveProperty('id', 'cced5080-7576-426f-aa27-698da5d781c2');
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
                            id: '5ca9ff07-1336-4479-b557-cb0294576294'
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
                            id: '428dbc36-ad1f-42b2-8752-f4d6204459a2'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindChannelOverview.id).toStrictEqual('428dbc36-ad1f-42b2-8752-f4d6204459a2');
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
                    id: '911e996b-0668-463b-abeb-9304728d781b'
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
                    id: '428dbc36-ad1f-42b2-8752-f4d6204459a2'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindChannelOverviewById.id).toStrictEqual('428dbc36-ad1f-42b2-8752-f4d6204459a2');
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
                        
                        id: '717f368c-0b93-4cd5-9b63-ddfddf10f960',
                        tenantId: '0371ccc5-8b19-4057-b4fb-d137944795f4',
                        tenantCode: 'u6ha9n8om575c0lwxsfp3327qbtv9wbyp11alnhbsgeevewbb9',
                        systemId: '879fb349-eac1-4f75-9238-60e38bad9c78',
                        systemName: 'rst5e2z1lwqsd6885dn6',
                        executionId: '4729c12f-692a-465d-a54b-e6ed583eca60',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-11-04 15:08:22',
                        executionMonitoringStartAt: '2020-11-04 22:56:57',
                        executionMonitoringEndAt: '2020-11-04 16:26:43',
                        error: 9484147412,
                        inactive: 6849902883,
                        successful: 4632573807,
                        stopped: 2801892939,
                        unknown: 8905270022,
                        unregistered: 9114533290,
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
                        
                        id: '428dbc36-ad1f-42b2-8752-f4d6204459a2',
                        tenantId: 'fe7de818-1ae7-414c-acdf-8bb4eb4e2c5e',
                        tenantCode: 'mn7yjzudzld6yd4e11cmaa6aohchnumm5uzw0xvz37kvqptbo8',
                        systemId: 'c8b2ef22-51bd-48d1-8bdc-a1f729dc3a0c',
                        systemName: 'bcvuvkc457pd5p0ki63y',
                        executionId: 'a881f2ca-075c-4b26-942a-8b39c17fb558',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-11-04 19:45:43',
                        executionMonitoringStartAt: '2020-11-04 02:25:30',
                        executionMonitoringEndAt: '2020-11-04 18:27:44',
                        error: 2618703913,
                        inactive: 7991633176,
                        successful: 4409756635,
                        stopped: 2786628632,
                        unknown: 6777178843,
                        unregistered: 1369629440,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateChannelOverview.id).toStrictEqual('428dbc36-ad1f-42b2-8752-f4d6204459a2');
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
                    id: '0e4e4c57-e4ae-47b1-9955-25a4786491b7'
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
                    id: '428dbc36-ad1f-42b2-8752-f4d6204459a2'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteChannelOverviewById.id).toStrictEqual('428dbc36-ad1f-42b2-8752-f4d6204459a2');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});