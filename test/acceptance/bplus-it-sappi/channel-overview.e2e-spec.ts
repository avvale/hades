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
                tenantId: 'a410202b-ff8a-41a7-9297-e8d54e5885ee',
                tenantCode: 'c4lt4m6xvrznc37a7tto66tgfigucxaesplmgxa76j59vfb5f2',
                systemId: '424156bc-1a5e-4782-bf03-a868628fcb02',
                systemName: 'cprn8q1j5otemg8c938b',
                executionId: '869702f1-92d3-4ddd-a713-62922495ff60',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 01:27:37',
                executionMonitoringStartAt: '2020-07-27 16:33:01',
                executionMonitoringEndAt: '2020-07-27 07:11:09',
                error: 1237506874,
                inactive: 2812589049,
                successful: 9157659623,
                stopped: 8756798297,
                unknown: 4872240088,
                unregistered: 4684004268,
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
                
                tenantId: 'a410202b-ff8a-41a7-9297-e8d54e5885ee',
                tenantCode: 'hvtn5n3cp9fvptfh452rxxd2w9rbcw3r7lv3wj5zoq7s2n0gtv',
                systemId: '424156bc-1a5e-4782-bf03-a868628fcb02',
                systemName: '8rgrq7rnrj6gqlzoudhy',
                executionId: '869702f1-92d3-4ddd-a713-62922495ff60',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 12:22:55',
                executionMonitoringStartAt: '2020-07-27 09:50:04',
                executionMonitoringEndAt: '2020-07-27 06:55:28',
                error: 1835806736,
                inactive: 3270900567,
                successful: 3646924136,
                stopped: 8951635983,
                unknown: 1686145254,
                unregistered: 3087782994,
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
                id: 'a4f45071-c1b0-4e25-b695-e467d2c2e859',
                tenantId: null,
                tenantCode: '7ri2gg65jk5x79jri6roicnrkqhz9y8t4hpv0k67owtspb0d0i',
                systemId: '424156bc-1a5e-4782-bf03-a868628fcb02',
                systemName: 'alfk41p8yb0y1zfs38v9',
                executionId: '869702f1-92d3-4ddd-a713-62922495ff60',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 14:03:11',
                executionMonitoringStartAt: '2020-07-27 00:25:48',
                executionMonitoringEndAt: '2020-07-26 23:01:12',
                error: 4836866680,
                inactive: 9529181649,
                successful: 5594097378,
                stopped: 9619449815,
                unknown: 6037595122,
                unregistered: 8864134529,
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
                id: 'a4f45071-c1b0-4e25-b695-e467d2c2e859',
                
                tenantCode: 'ykc6gb7ofrmbsmw0krhut03p6gh5njcbuab8tqwdl2a84s5l3u',
                systemId: '424156bc-1a5e-4782-bf03-a868628fcb02',
                systemName: 'jdbjxdyu9v48dtn5krbs',
                executionId: '869702f1-92d3-4ddd-a713-62922495ff60',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 07:59:24',
                executionMonitoringStartAt: '2020-07-27 16:36:57',
                executionMonitoringEndAt: '2020-07-26 19:45:14',
                error: 3304167947,
                inactive: 3201486345,
                successful: 9647458539,
                stopped: 6991586495,
                unknown: 6087079558,
                unregistered: 5270085618,
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
                id: 'a4f45071-c1b0-4e25-b695-e467d2c2e859',
                tenantId: 'a410202b-ff8a-41a7-9297-e8d54e5885ee',
                tenantCode: null,
                systemId: '424156bc-1a5e-4782-bf03-a868628fcb02',
                systemName: 'bxcy3mu2d41j0j9gsbvi',
                executionId: '869702f1-92d3-4ddd-a713-62922495ff60',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 02:33:26',
                executionMonitoringStartAt: '2020-07-27 00:21:39',
                executionMonitoringEndAt: '2020-07-27 12:04:57',
                error: 2245071412,
                inactive: 4761669205,
                successful: 2765394013,
                stopped: 2139309554,
                unknown: 1588651549,
                unregistered: 6467624786,
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
                id: 'a4f45071-c1b0-4e25-b695-e467d2c2e859',
                tenantId: 'a410202b-ff8a-41a7-9297-e8d54e5885ee',
                
                systemId: '424156bc-1a5e-4782-bf03-a868628fcb02',
                systemName: 't9l72tl1suxtw130gmcp',
                executionId: '869702f1-92d3-4ddd-a713-62922495ff60',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 11:11:34',
                executionMonitoringStartAt: '2020-07-26 23:20:49',
                executionMonitoringEndAt: '2020-07-27 02:04:07',
                error: 9794729150,
                inactive: 7670663217,
                successful: 7051445399,
                stopped: 9454124205,
                unknown: 7789190951,
                unregistered: 4285191512,
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
                id: 'a4f45071-c1b0-4e25-b695-e467d2c2e859',
                tenantId: 'a410202b-ff8a-41a7-9297-e8d54e5885ee',
                tenantCode: 'cmbp1pdp3fvt7c796yxwquo7p5kwbpy3g1ybbca50vc200ltt2',
                systemId: null,
                systemName: 'fyg9z9eecw4zdqmef31u',
                executionId: '869702f1-92d3-4ddd-a713-62922495ff60',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 07:19:15',
                executionMonitoringStartAt: '2020-07-27 11:52:08',
                executionMonitoringEndAt: '2020-07-27 02:44:04',
                error: 2305192502,
                inactive: 8496998868,
                successful: 3761182995,
                stopped: 6507620126,
                unknown: 5853909266,
                unregistered: 8186948858,
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
                id: 'a4f45071-c1b0-4e25-b695-e467d2c2e859',
                tenantId: 'a410202b-ff8a-41a7-9297-e8d54e5885ee',
                tenantCode: '7a10a4gw539358clkkkdyxavlz9ti7h0ws8i6yw7daeh30xjqu',
                
                systemName: 'i6xla9vem843xx5d49aq',
                executionId: '869702f1-92d3-4ddd-a713-62922495ff60',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-26 22:07:21',
                executionMonitoringStartAt: '2020-07-27 04:06:52',
                executionMonitoringEndAt: '2020-07-26 21:55:48',
                error: 9167072861,
                inactive: 7262659346,
                successful: 8422620275,
                stopped: 2254237692,
                unknown: 3701659038,
                unregistered: 5557151364,
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
                id: 'a4f45071-c1b0-4e25-b695-e467d2c2e859',
                tenantId: 'a410202b-ff8a-41a7-9297-e8d54e5885ee',
                tenantCode: 've1sva0lt2jt43yz66w7b7oqkuw4s9b3v6m0v5a5gc9y3xra2r',
                systemId: '424156bc-1a5e-4782-bf03-a868628fcb02',
                systemName: null,
                executionId: '869702f1-92d3-4ddd-a713-62922495ff60',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 17:25:16',
                executionMonitoringStartAt: '2020-07-27 15:57:23',
                executionMonitoringEndAt: '2020-07-27 05:55:53',
                error: 5307729430,
                inactive: 1603258016,
                successful: 4023830433,
                stopped: 5569282292,
                unknown: 5435425993,
                unregistered: 4843936580,
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
                id: 'a4f45071-c1b0-4e25-b695-e467d2c2e859',
                tenantId: 'a410202b-ff8a-41a7-9297-e8d54e5885ee',
                tenantCode: '6m15hpvvknxcescmy0qlkyb9ey2rtcuhzhefti02kheni4ef5s',
                systemId: '424156bc-1a5e-4782-bf03-a868628fcb02',
                
                executionId: '869702f1-92d3-4ddd-a713-62922495ff60',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 23:51:16',
                executionMonitoringStartAt: '2020-07-27 08:11:33',
                executionMonitoringEndAt: '2020-07-27 01:02:02',
                error: 2060877554,
                inactive: 9102050538,
                successful: 5990105526,
                stopped: 7216774548,
                unknown: 7623974269,
                unregistered: 3890766182,
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
                id: 'a4f45071-c1b0-4e25-b695-e467d2c2e859',
                tenantId: 'a410202b-ff8a-41a7-9297-e8d54e5885ee',
                tenantCode: 'ynyc3yulk44pnkjfe3z6f2m0ag0eerv9dgy2dhfe8ys7ftpri4',
                systemId: '424156bc-1a5e-4782-bf03-a868628fcb02',
                systemName: 'epv3kt965q1pwg9ao18e',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 11:30:45',
                executionMonitoringStartAt: '2020-07-26 21:30:40',
                executionMonitoringEndAt: '2020-07-27 14:33:24',
                error: 1923089348,
                inactive: 6488719288,
                successful: 9821939394,
                stopped: 2012950693,
                unknown: 4863321413,
                unregistered: 9468903847,
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
                id: 'a4f45071-c1b0-4e25-b695-e467d2c2e859',
                tenantId: 'a410202b-ff8a-41a7-9297-e8d54e5885ee',
                tenantCode: 'bb7vc2e6vdevpq5l90a93sssl70r6ihahd0cdzzp682pwcse89',
                systemId: '424156bc-1a5e-4782-bf03-a868628fcb02',
                systemName: '3bkedxs6dufayrqojcfp',
                
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 00:18:04',
                executionMonitoringStartAt: '2020-07-27 08:37:32',
                executionMonitoringEndAt: '2020-07-27 17:30:28',
                error: 6939799287,
                inactive: 6549937779,
                successful: 2985371168,
                stopped: 3195317921,
                unknown: 3488950762,
                unregistered: 3415355218,
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
                id: 'a4f45071-c1b0-4e25-b695-e467d2c2e859',
                tenantId: 'a410202b-ff8a-41a7-9297-e8d54e5885ee',
                tenantCode: '6p50j6cc5yypfinkjh9l1fzy8g85qks98os3g8p80vrkudjtf0',
                systemId: '424156bc-1a5e-4782-bf03-a868628fcb02',
                systemName: 'igu4ygxlhtch8tn4nlra',
                executionId: '869702f1-92d3-4ddd-a713-62922495ff60',
                executionType: null,
                executionExecutedAt: '2020-07-27 16:42:57',
                executionMonitoringStartAt: '2020-07-27 07:33:32',
                executionMonitoringEndAt: '2020-07-27 00:49:29',
                error: 8481894200,
                inactive: 1113456986,
                successful: 3658001124,
                stopped: 2838416623,
                unknown: 6210457002,
                unregistered: 2767520563,
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
                id: 'a4f45071-c1b0-4e25-b695-e467d2c2e859',
                tenantId: 'a410202b-ff8a-41a7-9297-e8d54e5885ee',
                tenantCode: '4tl7o0t7vpngxnjgltytje0eavdzegm8lgerlhwszvi8ce9vkj',
                systemId: '424156bc-1a5e-4782-bf03-a868628fcb02',
                systemName: 'u7zktyv1blmfqcsye8i6',
                executionId: '869702f1-92d3-4ddd-a713-62922495ff60',
                
                executionExecutedAt: '2020-07-27 06:43:10',
                executionMonitoringStartAt: '2020-07-27 01:25:32',
                executionMonitoringEndAt: '2020-07-27 02:23:53',
                error: 5354157423,
                inactive: 7216368051,
                successful: 7708568947,
                stopped: 5083518897,
                unknown: 9628970293,
                unregistered: 1922380145,
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
                id: 'a4f45071-c1b0-4e25-b695-e467d2c2e859',
                tenantId: 'a410202b-ff8a-41a7-9297-e8d54e5885ee',
                tenantCode: 'qoh777sgo14uxhqsuu8o181htnfh9gbgzidjkrtn5lnb3nio3m',
                systemId: '424156bc-1a5e-4782-bf03-a868628fcb02',
                systemName: 'ndv6cey419ugx1qd3tmn',
                executionId: '869702f1-92d3-4ddd-a713-62922495ff60',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-27 14:15:30',
                executionMonitoringEndAt: '2020-07-27 10:37:14',
                error: 7886492093,
                inactive: 7027744312,
                successful: 8073497615,
                stopped: 6137720877,
                unknown: 5028150255,
                unregistered: 7256401220,
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
                id: 'a4f45071-c1b0-4e25-b695-e467d2c2e859',
                tenantId: 'a410202b-ff8a-41a7-9297-e8d54e5885ee',
                tenantCode: '4tr31qyn7kfg2d7ijxvbte87u4f8cnufir0wgnh7x1m2hby88y',
                systemId: '424156bc-1a5e-4782-bf03-a868628fcb02',
                systemName: 'vnlegougmi05denb38vu',
                executionId: '869702f1-92d3-4ddd-a713-62922495ff60',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-07-26 23:48:41',
                executionMonitoringEndAt: '2020-07-27 04:18:25',
                error: 7737555568,
                inactive: 9819456103,
                successful: 6972815909,
                stopped: 9773403406,
                unknown: 6271709912,
                unregistered: 8001897695,
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
                id: 'a4f45071-c1b0-4e25-b695-e467d2c2e859',
                tenantId: 'a410202b-ff8a-41a7-9297-e8d54e5885ee',
                tenantCode: 'cp01ay3kp0yros21us9n18e5ytgk2t1g8ti8ilmbixuqp18tzs',
                systemId: '424156bc-1a5e-4782-bf03-a868628fcb02',
                systemName: 'uped8rrzhxks3ugtkac8',
                executionId: '869702f1-92d3-4ddd-a713-62922495ff60',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-26 21:02:56',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-27 02:10:22',
                error: 9596429329,
                inactive: 2828458773,
                successful: 5910693722,
                stopped: 6542668127,
                unknown: 6665801458,
                unregistered: 7529610953,
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
                id: 'a4f45071-c1b0-4e25-b695-e467d2c2e859',
                tenantId: 'a410202b-ff8a-41a7-9297-e8d54e5885ee',
                tenantCode: 'px2wypbchzadjc6jwbc1x084lgra8pgl00le7s866tssbm8a3p',
                systemId: '424156bc-1a5e-4782-bf03-a868628fcb02',
                systemName: '3f4ywdzt9vyf4aglcejq',
                executionId: '869702f1-92d3-4ddd-a713-62922495ff60',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 11:11:42',
                
                executionMonitoringEndAt: '2020-07-27 03:43:42',
                error: 6651603889,
                inactive: 6568606872,
                successful: 4915937527,
                stopped: 5289799080,
                unknown: 7238417597,
                unregistered: 3246598911,
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
                id: 'a4f45071-c1b0-4e25-b695-e467d2c2e859',
                tenantId: 'a410202b-ff8a-41a7-9297-e8d54e5885ee',
                tenantCode: '5hwn5nh14pf4o953ywj26wsysfbzp7mds4wure1xjxqgo7cey2',
                systemId: '424156bc-1a5e-4782-bf03-a868628fcb02',
                systemName: '14iajk1ftq8u3p68up3y',
                executionId: '869702f1-92d3-4ddd-a713-62922495ff60',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 00:59:00',
                executionMonitoringStartAt: '2020-07-27 08:16:01',
                executionMonitoringEndAt: null,
                error: 1822647661,
                inactive: 6376472777,
                successful: 4839023109,
                stopped: 2072723659,
                unknown: 1443523105,
                unregistered: 5659871017,
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
                id: 'a4f45071-c1b0-4e25-b695-e467d2c2e859',
                tenantId: 'a410202b-ff8a-41a7-9297-e8d54e5885ee',
                tenantCode: '2n8mj6srxd9m9x6j0vq64zc55rkitash834qqwiiaotpxxxont',
                systemId: '424156bc-1a5e-4782-bf03-a868628fcb02',
                systemName: '5sdxb63fz7agtzbmb33i',
                executionId: '869702f1-92d3-4ddd-a713-62922495ff60',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 09:17:59',
                executionMonitoringStartAt: '2020-07-27 04:01:12',
                
                error: 1028497525,
                inactive: 8547843615,
                successful: 5417561416,
                stopped: 3141911905,
                unknown: 9033310035,
                unregistered: 9227119537,
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
                id: '62kuo9xub58wb0hev00sg6o6btjbfw5y35lpe',
                tenantId: 'a410202b-ff8a-41a7-9297-e8d54e5885ee',
                tenantCode: 'l3ufrnp3eop6kifddwiib7mz9vfgeupoj3ti524leqr8zehzqr',
                systemId: '424156bc-1a5e-4782-bf03-a868628fcb02',
                systemName: '2cl6bhs13qcvkqj5me6n',
                executionId: '869702f1-92d3-4ddd-a713-62922495ff60',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-26 22:55:00',
                executionMonitoringStartAt: '2020-07-27 06:50:39',
                executionMonitoringEndAt: '2020-07-27 16:20:20',
                error: 7831069941,
                inactive: 6247326466,
                successful: 6494596141,
                stopped: 8358000827,
                unknown: 6211742238,
                unregistered: 3270117665,
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
                id: 'a4f45071-c1b0-4e25-b695-e467d2c2e859',
                tenantId: 'uv8dtc02aj8wuxr1qpqr1xhqlninj3g9rpnwa',
                tenantCode: 'd6rhdwiihcauiki9woldqm4qc9ty9xabaapuq47c9umftuky7z',
                systemId: '424156bc-1a5e-4782-bf03-a868628fcb02',
                systemName: '1quaxvhimd80zi1mhwwd',
                executionId: '869702f1-92d3-4ddd-a713-62922495ff60',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 00:41:41',
                executionMonitoringStartAt: '2020-07-27 05:13:26',
                executionMonitoringEndAt: '2020-07-27 16:33:01',
                error: 4918219557,
                inactive: 5054962283,
                successful: 9084323857,
                stopped: 8851712298,
                unknown: 5994445604,
                unregistered: 7887959498,
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
                id: 'a4f45071-c1b0-4e25-b695-e467d2c2e859',
                tenantId: 'a410202b-ff8a-41a7-9297-e8d54e5885ee',
                tenantCode: 'u2kfc83o2zye3ryjwel7ph9ybnjjf75u7v1m925m9o1wrl0qne',
                systemId: 'o0zlpc8or5tlzpjq0dcr1lpifimwthxuqwytb',
                systemName: 'lh7unben2hfcqwkrt7gk',
                executionId: '869702f1-92d3-4ddd-a713-62922495ff60',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-26 20:24:36',
                executionMonitoringStartAt: '2020-07-27 15:24:01',
                executionMonitoringEndAt: '2020-07-27 11:20:33',
                error: 9372528252,
                inactive: 3143297962,
                successful: 4475896857,
                stopped: 2827098710,
                unknown: 5995535832,
                unregistered: 4803211717,
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
                id: 'a4f45071-c1b0-4e25-b695-e467d2c2e859',
                tenantId: 'a410202b-ff8a-41a7-9297-e8d54e5885ee',
                tenantCode: '7cquwzkp6rqojjuwmzhdotci4gdh6gc2npjkwyn5pffm9gn2ok',
                systemId: '424156bc-1a5e-4782-bf03-a868628fcb02',
                systemName: 'asz48gvov39051kp9i2v',
                executionId: 'pqebrx2x41lsd5bw1tdvfjiep9oeuwsp3c4to',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 05:29:11',
                executionMonitoringStartAt: '2020-07-27 12:33:19',
                executionMonitoringEndAt: '2020-07-26 20:10:17',
                error: 6918777969,
                inactive: 8450689854,
                successful: 9326267280,
                stopped: 8540936136,
                unknown: 7780390477,
                unregistered: 3111416876,
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
                id: 'a4f45071-c1b0-4e25-b695-e467d2c2e859',
                tenantId: 'a410202b-ff8a-41a7-9297-e8d54e5885ee',
                tenantCode: 'ikaxowitsvnciiwpovwojc7ibjqqm9ifggbg4utyoznnniielbx',
                systemId: '424156bc-1a5e-4782-bf03-a868628fcb02',
                systemName: 'pfyei66zwuulsgsx69s7',
                executionId: '869702f1-92d3-4ddd-a713-62922495ff60',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 07:10:52',
                executionMonitoringStartAt: '2020-07-26 23:16:22',
                executionMonitoringEndAt: '2020-07-27 16:31:01',
                error: 8532114181,
                inactive: 2728168587,
                successful: 2501010087,
                stopped: 8620013935,
                unknown: 6015808627,
                unregistered: 1560486574,
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
                id: 'a4f45071-c1b0-4e25-b695-e467d2c2e859',
                tenantId: 'a410202b-ff8a-41a7-9297-e8d54e5885ee',
                tenantCode: 'bfjugg8zeq0kv3vjz6hinuq8xubepgog3cxicw949hqkakn6d3',
                systemId: '424156bc-1a5e-4782-bf03-a868628fcb02',
                systemName: 'e5hquo42w4wfawwckyjl4',
                executionId: '869702f1-92d3-4ddd-a713-62922495ff60',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 06:22:21',
                executionMonitoringStartAt: '2020-07-26 20:02:19',
                executionMonitoringEndAt: '2020-07-27 07:01:59',
                error: 6201043057,
                inactive: 7010142856,
                successful: 3550566672,
                stopped: 4783749919,
                unknown: 5499974639,
                unregistered: 7196339102,
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
                id: 'a4f45071-c1b0-4e25-b695-e467d2c2e859',
                tenantId: 'a410202b-ff8a-41a7-9297-e8d54e5885ee',
                tenantCode: '6g12twqfuydpayzh63v4mhnsxhza1x3rilmsu8s6z8r0qmck1x',
                systemId: '424156bc-1a5e-4782-bf03-a868628fcb02',
                systemName: 'vvz72z38zcke577723y4',
                executionId: '869702f1-92d3-4ddd-a713-62922495ff60',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 04:46:19',
                executionMonitoringStartAt: '2020-07-27 01:48:46',
                executionMonitoringEndAt: '2020-07-27 07:43:13',
                error: 65273856969,
                inactive: 1472780859,
                successful: 8568499981,
                stopped: 6070254039,
                unknown: 1239087022,
                unregistered: 7392408041,
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
                id: 'a4f45071-c1b0-4e25-b695-e467d2c2e859',
                tenantId: 'a410202b-ff8a-41a7-9297-e8d54e5885ee',
                tenantCode: '8excst62xmsg2z511cbhrgv2j8dlhlpy760r2q9bx2diho3drx',
                systemId: '424156bc-1a5e-4782-bf03-a868628fcb02',
                systemName: '268entq7rdlsm4u3tnj6',
                executionId: '869702f1-92d3-4ddd-a713-62922495ff60',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 04:56:49',
                executionMonitoringStartAt: '2020-07-27 03:43:06',
                executionMonitoringEndAt: '2020-07-26 19:16:55',
                error: 2838764225,
                inactive: 30695187841,
                successful: 4739249771,
                stopped: 6107610203,
                unknown: 5843871478,
                unregistered: 8861522197,
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
                id: 'a4f45071-c1b0-4e25-b695-e467d2c2e859',
                tenantId: 'a410202b-ff8a-41a7-9297-e8d54e5885ee',
                tenantCode: 'ojuj49gs2lbo9nhb3g8823imtujvsj3scayir7xibnuf7nfj4j',
                systemId: '424156bc-1a5e-4782-bf03-a868628fcb02',
                systemName: 'u5w4f234wqmd2wtntlrh',
                executionId: '869702f1-92d3-4ddd-a713-62922495ff60',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 08:35:13',
                executionMonitoringStartAt: '2020-07-27 00:19:49',
                executionMonitoringEndAt: '2020-07-26 20:38:28',
                error: 2437251688,
                inactive: 4291794971,
                successful: 10296206633,
                stopped: 1750346128,
                unknown: 8014018223,
                unregistered: 9977273297,
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
                id: 'a4f45071-c1b0-4e25-b695-e467d2c2e859',
                tenantId: 'a410202b-ff8a-41a7-9297-e8d54e5885ee',
                tenantCode: 'i3cemakbw70y07nknhexm4sqv0mxrs6ymupquvo24hhsyye21k',
                systemId: '424156bc-1a5e-4782-bf03-a868628fcb02',
                systemName: 'n2ak7lmn0npzl1ljyhhm',
                executionId: '869702f1-92d3-4ddd-a713-62922495ff60',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 08:48:25',
                executionMonitoringStartAt: '2020-07-27 06:19:27',
                executionMonitoringEndAt: '2020-07-26 23:34:19',
                error: 1650365359,
                inactive: 6977048639,
                successful: 1270309536,
                stopped: 47876629785,
                unknown: 6271291707,
                unregistered: 6839393628,
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
                id: 'a4f45071-c1b0-4e25-b695-e467d2c2e859',
                tenantId: 'a410202b-ff8a-41a7-9297-e8d54e5885ee',
                tenantCode: 'dt4l4nzd0lmbkze82aft0ngrg3jdkjfhpjsnv3t5437xsjbp18',
                systemId: '424156bc-1a5e-4782-bf03-a868628fcb02',
                systemName: 'a9dtpi63t5zuloa1oj4q',
                executionId: '869702f1-92d3-4ddd-a713-62922495ff60',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 19:42:07',
                executionMonitoringStartAt: '2020-07-27 05:14:36',
                executionMonitoringEndAt: '2020-07-27 01:22:20',
                error: 4768367577,
                inactive: 3199156470,
                successful: 3872786419,
                stopped: 2764183672,
                unknown: 17128286616,
                unregistered: 3329933266,
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
                id: 'a4f45071-c1b0-4e25-b695-e467d2c2e859',
                tenantId: 'a410202b-ff8a-41a7-9297-e8d54e5885ee',
                tenantCode: 'va5rnmsuaimtw2ua3s08pi1tuix80ivf4q1wn52o26v0m55iwz',
                systemId: '424156bc-1a5e-4782-bf03-a868628fcb02',
                systemName: '2xdg2hgltorqsauoc30b',
                executionId: '869702f1-92d3-4ddd-a713-62922495ff60',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 11:51:25',
                executionMonitoringStartAt: '2020-07-27 12:08:58',
                executionMonitoringEndAt: '2020-07-26 19:54:19',
                error: 7548169761,
                inactive: 8543214439,
                successful: 1428422142,
                stopped: 6462306060,
                unknown: 5041142591,
                unregistered: 74294968069,
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
                id: 'a4f45071-c1b0-4e25-b695-e467d2c2e859',
                tenantId: 'a410202b-ff8a-41a7-9297-e8d54e5885ee',
                tenantCode: '85us6ed0ssecijshrg51ivkt58u86ljfw8nhihhqb005xkr3tf',
                systemId: '424156bc-1a5e-4782-bf03-a868628fcb02',
                systemName: '9bihims0gy7cfdziieax',
                executionId: '869702f1-92d3-4ddd-a713-62922495ff60',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 18:01:02',
                executionMonitoringStartAt: '2020-07-27 17:37:18',
                executionMonitoringEndAt: '2020-07-27 07:31:55',
                error: -9,
                inactive: 1621866202,
                successful: 4362926077,
                stopped: 6857582828,
                unknown: 9567269607,
                unregistered: 9843669788,
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
                id: 'a4f45071-c1b0-4e25-b695-e467d2c2e859',
                tenantId: 'a410202b-ff8a-41a7-9297-e8d54e5885ee',
                tenantCode: 'k9ehhll9umey6w75f2lrakrpcyk1cn5ac0p7rt40v2yyz2pfgl',
                systemId: '424156bc-1a5e-4782-bf03-a868628fcb02',
                systemName: '4k1q868g982nam9ltpl7',
                executionId: '869702f1-92d3-4ddd-a713-62922495ff60',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 10:20:31',
                executionMonitoringStartAt: '2020-07-26 23:23:10',
                executionMonitoringEndAt: '2020-07-27 10:28:21',
                error: 9269273080,
                inactive: -9,
                successful: 7066727550,
                stopped: 9663947850,
                unknown: 2775210819,
                unregistered: 2178957351,
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
                id: 'a4f45071-c1b0-4e25-b695-e467d2c2e859',
                tenantId: 'a410202b-ff8a-41a7-9297-e8d54e5885ee',
                tenantCode: 'fbkh3ybu1ygasyk9vr8nxn1ptazrfu6xxf0g2iu9ydu3bo6v5h',
                systemId: '424156bc-1a5e-4782-bf03-a868628fcb02',
                systemName: 'xph50t311imkcybrx5fz',
                executionId: '869702f1-92d3-4ddd-a713-62922495ff60',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 00:45:37',
                executionMonitoringStartAt: '2020-07-27 07:39:05',
                executionMonitoringEndAt: '2020-07-27 03:21:08',
                error: 6512058053,
                inactive: 4056621483,
                successful: -9,
                stopped: 2527132740,
                unknown: 6006766864,
                unregistered: 4750599181,
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
                id: 'a4f45071-c1b0-4e25-b695-e467d2c2e859',
                tenantId: 'a410202b-ff8a-41a7-9297-e8d54e5885ee',
                tenantCode: 'c9d6k2i3vsvfjhvywllxpk3uxt9hse16vszizhi7pnupr85pc3',
                systemId: '424156bc-1a5e-4782-bf03-a868628fcb02',
                systemName: 'glvuuj1jrh8ukntr2w70',
                executionId: '869702f1-92d3-4ddd-a713-62922495ff60',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 09:26:17',
                executionMonitoringStartAt: '2020-07-27 18:17:55',
                executionMonitoringEndAt: '2020-07-27 00:44:24',
                error: 2220439800,
                inactive: 2737151608,
                successful: 8795111805,
                stopped: -9,
                unknown: 7854953959,
                unregistered: 9479429290,
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
                id: 'a4f45071-c1b0-4e25-b695-e467d2c2e859',
                tenantId: 'a410202b-ff8a-41a7-9297-e8d54e5885ee',
                tenantCode: 'w0k6u63rr3aoltlmal73ud0xpizen3runxi6l19rwfazm2h00w',
                systemId: '424156bc-1a5e-4782-bf03-a868628fcb02',
                systemName: 'dmloxk20nf8jvphekxa8',
                executionId: '869702f1-92d3-4ddd-a713-62922495ff60',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 11:23:42',
                executionMonitoringStartAt: '2020-07-26 23:42:47',
                executionMonitoringEndAt: '2020-07-27 16:56:26',
                error: 5784089456,
                inactive: 4713916533,
                successful: 3229942302,
                stopped: 7664206775,
                unknown: -9,
                unregistered: 3804382349,
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
                id: 'a4f45071-c1b0-4e25-b695-e467d2c2e859',
                tenantId: 'a410202b-ff8a-41a7-9297-e8d54e5885ee',
                tenantCode: 'xwdtdc0tg25b9a210i1dq2f3yfumzeueo1dlqsmwg5avtji5lz',
                systemId: '424156bc-1a5e-4782-bf03-a868628fcb02',
                systemName: 'bkxqpp58n18zzxam7qga',
                executionId: '869702f1-92d3-4ddd-a713-62922495ff60',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 00:47:26',
                executionMonitoringStartAt: '2020-07-27 01:20:23',
                executionMonitoringEndAt: '2020-07-27 10:28:51',
                error: 3654630925,
                inactive: 8486212124,
                successful: 7649980569,
                stopped: 2374767633,
                unknown: 1348797225,
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
                id: 'a4f45071-c1b0-4e25-b695-e467d2c2e859',
                tenantId: 'a410202b-ff8a-41a7-9297-e8d54e5885ee',
                tenantCode: 'k20676wpfm43rlx6qp5hi9z5yoe9nhvttndrjvzt3zpco3zqes',
                systemId: '424156bc-1a5e-4782-bf03-a868628fcb02',
                systemName: 'ss7ty7oauajxq9km8v43',
                executionId: '869702f1-92d3-4ddd-a713-62922495ff60',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-27 04:35:52',
                executionMonitoringStartAt: '2020-07-27 05:46:13',
                executionMonitoringEndAt: '2020-07-27 03:38:09',
                error: 6073389495,
                inactive: 3527529098,
                successful: 7911176166,
                stopped: 6426651821,
                unknown: 1133728894,
                unregistered: 6696102392,
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
                id: 'a4f45071-c1b0-4e25-b695-e467d2c2e859',
                tenantId: 'a410202b-ff8a-41a7-9297-e8d54e5885ee',
                tenantCode: 'v9x818cyqb2c3umuemseho70pzfnl5sxp9fpusifhirp6w1vai',
                systemId: '424156bc-1a5e-4782-bf03-a868628fcb02',
                systemName: 'rfxlusrefgtztb2z13a7',
                executionId: '869702f1-92d3-4ddd-a713-62922495ff60',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-27 03:36:44',
                executionMonitoringEndAt: '2020-07-27 12:27:56',
                error: 7841424120,
                inactive: 5771323182,
                successful: 3995802231,
                stopped: 7466469474,
                unknown: 9029118685,
                unregistered: 5086721781,
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
                id: 'a4f45071-c1b0-4e25-b695-e467d2c2e859',
                tenantId: 'a410202b-ff8a-41a7-9297-e8d54e5885ee',
                tenantCode: 'mt6amx3gn7q7tv7akdl43q3bgikctd1scyrgmuvhud72kycgvt',
                systemId: '424156bc-1a5e-4782-bf03-a868628fcb02',
                systemName: '6v228qe8nisz71l9u28g',
                executionId: '869702f1-92d3-4ddd-a713-62922495ff60',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 06:58:51',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-27 12:02:26',
                error: 7142215277,
                inactive: 1667058724,
                successful: 6631279706,
                stopped: 8781940689,
                unknown: 6712022524,
                unregistered: 2828962164,
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
                id: 'a4f45071-c1b0-4e25-b695-e467d2c2e859',
                tenantId: 'a410202b-ff8a-41a7-9297-e8d54e5885ee',
                tenantCode: 'lsn5e8tkjyyeiwz6ja6yypg1bt3we90xlv57feuqixds9b56s3',
                systemId: '424156bc-1a5e-4782-bf03-a868628fcb02',
                systemName: '003o6l8j9cd2go07iq12',
                executionId: '869702f1-92d3-4ddd-a713-62922495ff60',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-26 19:34:27',
                executionMonitoringStartAt: '2020-07-27 12:18:09',
                executionMonitoringEndAt: 'XXXXXXXX',
                error: 2283048159,
                inactive: 9716884199,
                successful: 7289151838,
                stopped: 6365312670,
                unknown: 7271552484,
                unregistered: 8012435835,
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
                id: 'a4f45071-c1b0-4e25-b695-e467d2c2e859',
                tenantId: 'a410202b-ff8a-41a7-9297-e8d54e5885ee',
                tenantCode: 'e479j7p3lfc1bygg8dt552tyxc1uyrej9ug825kttgfm936ok7',
                systemId: '424156bc-1a5e-4782-bf03-a868628fcb02',
                systemName: 'rx1hd4m6ybnfi940hvfw',
                executionId: '869702f1-92d3-4ddd-a713-62922495ff60',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 06:36:22',
                executionMonitoringStartAt: '2020-07-27 09:03:18',
                executionMonitoringEndAt: '2020-07-27 01:05:48',
                error: 9607399198,
                inactive: 5073914532,
                successful: 7272185072,
                stopped: 4944769531,
                unknown: 8423746301,
                unregistered: 8256034594,
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
                        value   : '00000000-0000-0000-0000-000000000000'
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
                        value   : 'a4f45071-c1b0-4e25-b695-e467d2c2e859'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'a4f45071-c1b0-4e25-b695-e467d2c2e859'));
    });

    test(`/REST:GET bplus-it-sappi/channel-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel-overview/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/channel-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel-overview/a4f45071-c1b0-4e25-b695-e467d2c2e859')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'a4f45071-c1b0-4e25-b695-e467d2c2e859'));
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
                
                id: '4a1e3502-53bc-417a-8ebc-3cd27fe48a47',
                tenantId: '81b83863-2bb5-41d1-9ffa-ec2aebd3854a',
                tenantCode: '1e9fju5waf4k6gertdphxa5eu75kotxmgzw4lriiu9zg1r7wew',
                systemId: 'afac1a60-3ecf-48fb-8d8b-cd0ea65f533c',
                systemName: 'olguraej2xin3j14fyw0',
                executionId: '0d559f9f-cc3d-46e9-bf77-c11bc4fbbb4a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 13:54:47',
                executionMonitoringStartAt: '2020-07-27 02:49:36',
                executionMonitoringEndAt: '2020-07-27 11:35:01',
                error: 8935892252,
                inactive: 9311200929,
                successful: 1821895472,
                stopped: 2491563363,
                unknown: 7546237439,
                unregistered: 4361772215,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/channel-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: 'a4f45071-c1b0-4e25-b695-e467d2c2e859',
                tenantId: 'a410202b-ff8a-41a7-9297-e8d54e5885ee',
                tenantCode: 'k4b44s2ehjfmbwnt28bvtk99gec2mvlz7r81wli5nv7bgfu1qp',
                systemId: '424156bc-1a5e-4782-bf03-a868628fcb02',
                systemName: 'yhapj1ivabd5ium1l3hh',
                executionId: '869702f1-92d3-4ddd-a713-62922495ff60',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 11:37:49',
                executionMonitoringStartAt: '2020-07-27 17:30:07',
                executionMonitoringEndAt: '2020-07-27 03:21:03',
                error: 5698017698,
                inactive: 1307746123,
                successful: 2089774631,
                stopped: 8373345138,
                unknown: 7164952680,
                unregistered: 8892863102,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'a4f45071-c1b0-4e25-b695-e467d2c2e859'));
    });

    test(`/REST:DELETE bplus-it-sappi/channel-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel-overview/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/channel-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel-overview/a4f45071-c1b0-4e25-b695-e467d2c2e859')
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
                        id: 'f69478ff-6da7-4618-a5aa-2a5b5181ea38',
                        tenantId: 'a410202b-ff8a-41a7-9297-e8d54e5885ee',
                        tenantCode: 'p03a3g4j4klx3n84zpo8bbhd5g3x7vkyjw0cnvsq8di31ithp3',
                        systemId: '424156bc-1a5e-4782-bf03-a868628fcb02',
                        systemName: '21gao6stbay8qqdktc5d',
                        executionId: '869702f1-92d3-4ddd-a713-62922495ff60',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-27 17:28:48',
                        executionMonitoringStartAt: '2020-07-27 04:15:28',
                        executionMonitoringEndAt: '2020-07-27 00:32:34',
                        error: 5010929633,
                        inactive: 4415774974,
                        successful: 5158818074,
                        stopped: 1279638598,
                        unknown: 9621398169,
                        unregistered: 2060847917,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannelOverview).toHaveProperty('id', 'f69478ff-6da7-4618-a5aa-2a5b5181ea38');
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
                            value   : 'a4f45071-c1b0-4e25-b695-e467d2c2e859'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelOverview.id).toStrictEqual('a4f45071-c1b0-4e25-b695-e467d2c2e859');
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
                    id: 'a4f45071-c1b0-4e25-b695-e467d2c2e859'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelOverviewById.id).toStrictEqual('a4f45071-c1b0-4e25-b695-e467d2c2e859');
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
                        
                        id: '8d4e4bc4-cdd1-4349-b515-85532c90c0cf',
                        tenantId: '0fd2b8dc-242b-4a63-bb97-c3fe7577148b',
                        tenantCode: 'rrzr3rqdkarb7zbft555zdsiy3yvxr6g0gtkmllzkamdlzwhx3',
                        systemId: '181ae2fd-8ab5-43e0-8932-007bd31736a3',
                        systemName: '8ityog2aabk6t384wicg',
                        executionId: '7394f93a-514b-4ba9-ac53-73aa72cb345f',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-27 02:57:54',
                        executionMonitoringStartAt: '2020-07-27 14:36:40',
                        executionMonitoringEndAt: '2020-07-26 20:20:51',
                        error: 7884029065,
                        inactive: 3739950847,
                        successful: 4894960034,
                        stopped: 2001101520,
                        unknown: 6966047012,
                        unregistered: 8920132275,
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
                        
                        id: 'a4f45071-c1b0-4e25-b695-e467d2c2e859',
                        tenantId: 'a410202b-ff8a-41a7-9297-e8d54e5885ee',
                        tenantCode: 'xwef2ahcemapnnd2dvvp823hx9rwu875kl6tamocaxoxm9ns1u',
                        systemId: '424156bc-1a5e-4782-bf03-a868628fcb02',
                        systemName: 'ifpvxvb6av9e3xtkvgy9',
                        executionId: '869702f1-92d3-4ddd-a713-62922495ff60',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-27 13:30:27',
                        executionMonitoringStartAt: '2020-07-27 10:19:50',
                        executionMonitoringEndAt: '2020-07-27 10:31:31',
                        error: 7253692775,
                        inactive: 2113406132,
                        successful: 1115824947,
                        stopped: 3301121150,
                        unknown: 2946899071,
                        unregistered: 1474864230,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannelOverview.id).toStrictEqual('a4f45071-c1b0-4e25-b695-e467d2c2e859');
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
                    id: 'a4f45071-c1b0-4e25-b695-e467d2c2e859'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelOverviewById.id).toStrictEqual('a4f45071-c1b0-4e25-b695-e467d2c2e859');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});