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
                tenantId: '1c56f03a-c62d-4233-9d01-1384da5dea11',
                tenantCode: 'yysnsmlh1n1bgrg6281tdm4moqmt66yy1hj9jymfktn5mo8kg1',
                systemId: 'f51dee00-203a-4efc-b6ce-336414c2943a',
                systemName: '7p3k075dk3mu4f3j6ziy',
                executionId: 'db6388d3-eb59-4ce7-a270-704fdde0eaea',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 04:58:38',
                executionMonitoringStartAt: '2020-07-29 14:11:37',
                executionMonitoringEndAt: '2020-07-29 06:02:01',
                error: 6594718810,
                inactive: 3516123615,
                successful: 2869206709,
                stopped: 2560470978,
                unknown: 9714605377,
                unregistered: 2179605459,
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
                
                tenantId: '1c56f03a-c62d-4233-9d01-1384da5dea11',
                tenantCode: '773aq12gxf3k2637nf4ebuhqwnjy4tb0ion2ghhsqbg7h2uec5',
                systemId: 'f51dee00-203a-4efc-b6ce-336414c2943a',
                systemName: 'yxw8o3uv96y715gr7qpx',
                executionId: 'db6388d3-eb59-4ce7-a270-704fdde0eaea',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 03:14:27',
                executionMonitoringStartAt: '2020-07-29 10:33:33',
                executionMonitoringEndAt: '2020-07-28 17:48:56',
                error: 2537574836,
                inactive: 1545615403,
                successful: 7682593514,
                stopped: 2975440006,
                unknown: 5457153290,
                unregistered: 7949726416,
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
                id: 'e483c0ba-8758-493b-8fc2-c4649fcb0f2a',
                tenantId: null,
                tenantCode: '712fb47aajtdw5tqzeqf1xha9krinblffhopkkp4z3eap26x8y',
                systemId: 'f51dee00-203a-4efc-b6ce-336414c2943a',
                systemName: '8oi1vokfvq990cojbz13',
                executionId: 'db6388d3-eb59-4ce7-a270-704fdde0eaea',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 09:10:25',
                executionMonitoringStartAt: '2020-07-28 17:32:18',
                executionMonitoringEndAt: '2020-07-29 01:48:14',
                error: 5068601616,
                inactive: 8919697246,
                successful: 4437985724,
                stopped: 8151952942,
                unknown: 2801658678,
                unregistered: 5968150033,
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
                id: 'e483c0ba-8758-493b-8fc2-c4649fcb0f2a',
                
                tenantCode: '6sjquir77934i1tgrqi26w790qfppl7lf7jxzem9wy1j3id4s3',
                systemId: 'f51dee00-203a-4efc-b6ce-336414c2943a',
                systemName: 'sv91s5rfzsd0nw2mrj2s',
                executionId: 'db6388d3-eb59-4ce7-a270-704fdde0eaea',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 08:46:22',
                executionMonitoringStartAt: '2020-07-29 06:59:26',
                executionMonitoringEndAt: '2020-07-29 00:57:02',
                error: 5199031039,
                inactive: 6883040440,
                successful: 4481087481,
                stopped: 5515845703,
                unknown: 6145431158,
                unregistered: 5043645073,
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
                id: 'e483c0ba-8758-493b-8fc2-c4649fcb0f2a',
                tenantId: '1c56f03a-c62d-4233-9d01-1384da5dea11',
                tenantCode: null,
                systemId: 'f51dee00-203a-4efc-b6ce-336414c2943a',
                systemName: 'zb239a4wtjdegomxedng',
                executionId: 'db6388d3-eb59-4ce7-a270-704fdde0eaea',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 07:08:35',
                executionMonitoringStartAt: '2020-07-29 02:37:12',
                executionMonitoringEndAt: '2020-07-28 20:49:12',
                error: 1747511801,
                inactive: 3825325936,
                successful: 5021261328,
                stopped: 2197035551,
                unknown: 2003570282,
                unregistered: 4805527080,
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
                id: 'e483c0ba-8758-493b-8fc2-c4649fcb0f2a',
                tenantId: '1c56f03a-c62d-4233-9d01-1384da5dea11',
                
                systemId: 'f51dee00-203a-4efc-b6ce-336414c2943a',
                systemName: 'aoyn5fd02owf2s8k5khs',
                executionId: 'db6388d3-eb59-4ce7-a270-704fdde0eaea',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 03:47:41',
                executionMonitoringStartAt: '2020-07-28 17:00:23',
                executionMonitoringEndAt: '2020-07-29 11:40:19',
                error: 1942365967,
                inactive: 2002366754,
                successful: 9721038453,
                stopped: 8551473232,
                unknown: 4979438349,
                unregistered: 4749797727,
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
                id: 'e483c0ba-8758-493b-8fc2-c4649fcb0f2a',
                tenantId: '1c56f03a-c62d-4233-9d01-1384da5dea11',
                tenantCode: '6ox6izctlc1low3fu8vgf53bjinynynw6lifg3nep2e5rnwqa6',
                systemId: null,
                systemName: 'ufkiaw74a113dhnj7m7k',
                executionId: 'db6388d3-eb59-4ce7-a270-704fdde0eaea',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 17:08:05',
                executionMonitoringStartAt: '2020-07-28 21:51:13',
                executionMonitoringEndAt: '2020-07-29 02:56:27',
                error: 4236028662,
                inactive: 3023201276,
                successful: 6100962461,
                stopped: 9438103331,
                unknown: 6234654861,
                unregistered: 6760717392,
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
                id: 'e483c0ba-8758-493b-8fc2-c4649fcb0f2a',
                tenantId: '1c56f03a-c62d-4233-9d01-1384da5dea11',
                tenantCode: '52tjuhsn3q3saivsgaiysp2hw4bsfgyeurhz56c29hk0ixsbv0',
                
                systemName: '5pumjqhsuukpkukppeke',
                executionId: 'db6388d3-eb59-4ce7-a270-704fdde0eaea',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 08:28:44',
                executionMonitoringStartAt: '2020-07-29 11:49:33',
                executionMonitoringEndAt: '2020-07-29 15:30:51',
                error: 7264866582,
                inactive: 1233057256,
                successful: 6984499821,
                stopped: 4337540212,
                unknown: 1714545714,
                unregistered: 3337148226,
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
                id: 'e483c0ba-8758-493b-8fc2-c4649fcb0f2a',
                tenantId: '1c56f03a-c62d-4233-9d01-1384da5dea11',
                tenantCode: 'cvuhznnipw3ix7ihbo5qzsbewygq0vwtoczh4tyzsmq2fnnwfv',
                systemId: 'f51dee00-203a-4efc-b6ce-336414c2943a',
                systemName: null,
                executionId: 'db6388d3-eb59-4ce7-a270-704fdde0eaea',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 10:12:29',
                executionMonitoringStartAt: '2020-07-29 01:36:53',
                executionMonitoringEndAt: '2020-07-29 07:24:57',
                error: 4807166379,
                inactive: 9614402504,
                successful: 1524479786,
                stopped: 5597580344,
                unknown: 4998307814,
                unregistered: 3874343838,
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
                id: 'e483c0ba-8758-493b-8fc2-c4649fcb0f2a',
                tenantId: '1c56f03a-c62d-4233-9d01-1384da5dea11',
                tenantCode: 'oq7gcxuehgmpaw9ujnnby13a8w4o2sis6yph5uy6l1ft3j4mrl',
                systemId: 'f51dee00-203a-4efc-b6ce-336414c2943a',
                
                executionId: 'db6388d3-eb59-4ce7-a270-704fdde0eaea',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 07:00:03',
                executionMonitoringStartAt: '2020-07-29 06:39:43',
                executionMonitoringEndAt: '2020-07-29 08:21:25',
                error: 3104521996,
                inactive: 6959101357,
                successful: 3152204175,
                stopped: 2368515285,
                unknown: 1047880760,
                unregistered: 1492325003,
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
                id: 'e483c0ba-8758-493b-8fc2-c4649fcb0f2a',
                tenantId: '1c56f03a-c62d-4233-9d01-1384da5dea11',
                tenantCode: 'ok6i34nsf71v8ri87a71smlrpuctt01lts67dufz3nzp1tz5ov',
                systemId: 'f51dee00-203a-4efc-b6ce-336414c2943a',
                systemName: 'bdegeod8c2ej4e68yzk8',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 21:08:55',
                executionMonitoringStartAt: '2020-07-29 15:47:08',
                executionMonitoringEndAt: '2020-07-29 13:23:43',
                error: 1083325047,
                inactive: 9392848111,
                successful: 9517350563,
                stopped: 7978238663,
                unknown: 6713337576,
                unregistered: 2641475750,
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
                id: 'e483c0ba-8758-493b-8fc2-c4649fcb0f2a',
                tenantId: '1c56f03a-c62d-4233-9d01-1384da5dea11',
                tenantCode: 'fsvj1dv2c5vdkv25oxhx8v4urbi3th8hbnklvy16r01ee4s3kf',
                systemId: 'f51dee00-203a-4efc-b6ce-336414c2943a',
                systemName: '256bm394r3vvstuffogd',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 11:03:40',
                executionMonitoringStartAt: '2020-07-29 04:34:39',
                executionMonitoringEndAt: '2020-07-28 22:57:11',
                error: 4171488338,
                inactive: 5482284082,
                successful: 8435277540,
                stopped: 3042096170,
                unknown: 3648249710,
                unregistered: 1604588555,
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
                id: 'e483c0ba-8758-493b-8fc2-c4649fcb0f2a',
                tenantId: '1c56f03a-c62d-4233-9d01-1384da5dea11',
                tenantCode: 'g0o0ero2tg2sj1vhtqmw846zp3pida2cua1mls454eth9qty3l',
                systemId: 'f51dee00-203a-4efc-b6ce-336414c2943a',
                systemName: '4hu78a488rumg473wcoe',
                executionId: 'db6388d3-eb59-4ce7-a270-704fdde0eaea',
                executionType: null,
                executionExecutedAt: '2020-07-29 15:14:42',
                executionMonitoringStartAt: '2020-07-29 12:37:03',
                executionMonitoringEndAt: '2020-07-29 04:06:54',
                error: 3179617123,
                inactive: 2277173555,
                successful: 8037566943,
                stopped: 7644341687,
                unknown: 9455765325,
                unregistered: 2542295294,
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
                id: 'e483c0ba-8758-493b-8fc2-c4649fcb0f2a',
                tenantId: '1c56f03a-c62d-4233-9d01-1384da5dea11',
                tenantCode: 'qhek4che68dpu0jw54u51okd3qm7awrokpvtgmgbtmx1j2w7nc',
                systemId: 'f51dee00-203a-4efc-b6ce-336414c2943a',
                systemName: '65fw4fjgn2e31sjhpvwa',
                executionId: 'db6388d3-eb59-4ce7-a270-704fdde0eaea',
                
                executionExecutedAt: '2020-07-28 17:46:43',
                executionMonitoringStartAt: '2020-07-29 01:01:17',
                executionMonitoringEndAt: '2020-07-28 17:05:32',
                error: 1448690483,
                inactive: 5827385798,
                successful: 5044654210,
                stopped: 8574156116,
                unknown: 8123628961,
                unregistered: 2848210626,
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
                id: 'e483c0ba-8758-493b-8fc2-c4649fcb0f2a',
                tenantId: '1c56f03a-c62d-4233-9d01-1384da5dea11',
                tenantCode: 'ruvdijnlik3duh3lbdee8fm1xn59w8f38j34piaridb6dndcns',
                systemId: 'f51dee00-203a-4efc-b6ce-336414c2943a',
                systemName: 'hw4t7djgyyin6qao5if1',
                executionId: 'db6388d3-eb59-4ce7-a270-704fdde0eaea',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-28 17:26:15',
                executionMonitoringEndAt: '2020-07-29 00:04:24',
                error: 6359979577,
                inactive: 1035676352,
                successful: 5000997445,
                stopped: 6710606265,
                unknown: 9479198839,
                unregistered: 4253381396,
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
                id: 'e483c0ba-8758-493b-8fc2-c4649fcb0f2a',
                tenantId: '1c56f03a-c62d-4233-9d01-1384da5dea11',
                tenantCode: 'wg587gtnj97lfrw3yyd3qqkc0kvc8yav3s7oc9g157sy9i5743',
                systemId: 'f51dee00-203a-4efc-b6ce-336414c2943a',
                systemName: '5u6lic5r4lyxd1d2etk4',
                executionId: 'db6388d3-eb59-4ce7-a270-704fdde0eaea',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-07-28 22:11:22',
                executionMonitoringEndAt: '2020-07-28 23:12:59',
                error: 6278188179,
                inactive: 2130213245,
                successful: 7165112244,
                stopped: 9122653087,
                unknown: 3436219389,
                unregistered: 6909494443,
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
                id: 'e483c0ba-8758-493b-8fc2-c4649fcb0f2a',
                tenantId: '1c56f03a-c62d-4233-9d01-1384da5dea11',
                tenantCode: 'aus6d628jjh6fz97datrtrtzh3j1hoovce29nvjh3oek8o8cgo',
                systemId: 'f51dee00-203a-4efc-b6ce-336414c2943a',
                systemName: 'oqniw9uyxyeiuyt1w9ru',
                executionId: 'db6388d3-eb59-4ce7-a270-704fdde0eaea',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 09:23:46',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-28 23:25:52',
                error: 6896089589,
                inactive: 2685655598,
                successful: 6510496585,
                stopped: 8802166687,
                unknown: 1504567835,
                unregistered: 2892639529,
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
                id: 'e483c0ba-8758-493b-8fc2-c4649fcb0f2a',
                tenantId: '1c56f03a-c62d-4233-9d01-1384da5dea11',
                tenantCode: 'rdv7okbqov0nf8tnk5khdbljhtcmpdxdvy2om6xx4stv2c5y2c',
                systemId: 'f51dee00-203a-4efc-b6ce-336414c2943a',
                systemName: '5x2fow0xk21f1u60zd0z',
                executionId: 'db6388d3-eb59-4ce7-a270-704fdde0eaea',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 03:13:32',
                
                executionMonitoringEndAt: '2020-07-28 19:03:42',
                error: 5380128272,
                inactive: 6949752797,
                successful: 4319675196,
                stopped: 5948238415,
                unknown: 9024731864,
                unregistered: 4497001934,
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
                id: 'e483c0ba-8758-493b-8fc2-c4649fcb0f2a',
                tenantId: '1c56f03a-c62d-4233-9d01-1384da5dea11',
                tenantCode: 'vnhqs0gevq11f7wy3pakrv8uvdmu0b35ypkhqfwkhbk1osm6du',
                systemId: 'f51dee00-203a-4efc-b6ce-336414c2943a',
                systemName: 'fpj0a8078a6tu7qtuu27',
                executionId: 'db6388d3-eb59-4ce7-a270-704fdde0eaea',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 09:02:42',
                executionMonitoringStartAt: '2020-07-28 21:23:58',
                executionMonitoringEndAt: null,
                error: 5480736613,
                inactive: 7218256685,
                successful: 6166134510,
                stopped: 3657770242,
                unknown: 9726902982,
                unregistered: 6128613377,
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
                id: 'e483c0ba-8758-493b-8fc2-c4649fcb0f2a',
                tenantId: '1c56f03a-c62d-4233-9d01-1384da5dea11',
                tenantCode: 'h82fqnbjdizd4iwx9kpswwxwgr7mfxbcogsus743lhobbav758',
                systemId: 'f51dee00-203a-4efc-b6ce-336414c2943a',
                systemName: 'mbf74q441cd6tr3qvvax',
                executionId: 'db6388d3-eb59-4ce7-a270-704fdde0eaea',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 17:03:27',
                executionMonitoringStartAt: '2020-07-28 17:04:44',
                
                error: 6799923013,
                inactive: 5939631654,
                successful: 5720625296,
                stopped: 6905230413,
                unknown: 4377903498,
                unregistered: 6124710444,
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
                id: 'auhc11up6n127tj3mhz4y98sth1ndgt423b1q',
                tenantId: '1c56f03a-c62d-4233-9d01-1384da5dea11',
                tenantCode: 'hzaocmo05oipgtv282cjdp8jldgim6ura8m07l3pbsm3dat7o6',
                systemId: 'f51dee00-203a-4efc-b6ce-336414c2943a',
                systemName: 'e28jc895s2s7r6iyp3i4',
                executionId: 'db6388d3-eb59-4ce7-a270-704fdde0eaea',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 01:10:27',
                executionMonitoringStartAt: '2020-07-29 10:36:45',
                executionMonitoringEndAt: '2020-07-29 05:19:54',
                error: 3618547096,
                inactive: 1158087636,
                successful: 1320657312,
                stopped: 3892099779,
                unknown: 6182802204,
                unregistered: 5576305908,
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
                id: 'e483c0ba-8758-493b-8fc2-c4649fcb0f2a',
                tenantId: 'kayfb8db0xcn8qq52krio24o7jm2l70u20txv',
                tenantCode: 'fh8xleu171u77xzm9t1fmd7kubzwnrhy7klzngcltqjl95nnq3',
                systemId: 'f51dee00-203a-4efc-b6ce-336414c2943a',
                systemName: 'mftc2gzwljtx7u05rhrj',
                executionId: 'db6388d3-eb59-4ce7-a270-704fdde0eaea',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 06:48:46',
                executionMonitoringStartAt: '2020-07-29 12:17:06',
                executionMonitoringEndAt: '2020-07-29 15:09:13',
                error: 8856176101,
                inactive: 5762676139,
                successful: 1923169413,
                stopped: 5879094939,
                unknown: 2975468031,
                unregistered: 6629670341,
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
                id: 'e483c0ba-8758-493b-8fc2-c4649fcb0f2a',
                tenantId: '1c56f03a-c62d-4233-9d01-1384da5dea11',
                tenantCode: 'x6zqk1npmelczkmith47qmao99y8upvehqock1g5p1w3rcxss7',
                systemId: 'j6mvz3q0n8nqthyf9imm8mqmk9195rnnfuigw',
                systemName: 'x2wb09u02zli0zvg8kxy',
                executionId: 'db6388d3-eb59-4ce7-a270-704fdde0eaea',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 15:09:22',
                executionMonitoringStartAt: '2020-07-28 18:08:23',
                executionMonitoringEndAt: '2020-07-28 16:52:12',
                error: 8680233618,
                inactive: 6680567102,
                successful: 1563779329,
                stopped: 3574198572,
                unknown: 2833878259,
                unregistered: 5365206608,
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
                id: 'e483c0ba-8758-493b-8fc2-c4649fcb0f2a',
                tenantId: '1c56f03a-c62d-4233-9d01-1384da5dea11',
                tenantCode: '09ex994bve50mi7b0nsfequ87w9fuqyoxxpjlg1nd7nz3yoeut',
                systemId: 'f51dee00-203a-4efc-b6ce-336414c2943a',
                systemName: 'r0n3th2pqb2prbcgnejy',
                executionId: 'halkuwskbxc079djhwgqp4mz4624gdgd04roc',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 06:41:16',
                executionMonitoringStartAt: '2020-07-28 21:38:31',
                executionMonitoringEndAt: '2020-07-29 00:25:09',
                error: 3353845590,
                inactive: 9521619594,
                successful: 3706464752,
                stopped: 8065106411,
                unknown: 5139123737,
                unregistered: 2602137695,
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
                id: 'e483c0ba-8758-493b-8fc2-c4649fcb0f2a',
                tenantId: '1c56f03a-c62d-4233-9d01-1384da5dea11',
                tenantCode: '37kiye9k6infllx9ntmojrqpdkn0xx6kxez1deymagdw2pwns2k',
                systemId: 'f51dee00-203a-4efc-b6ce-336414c2943a',
                systemName: '719nluy61uxycxd5o1y9',
                executionId: 'db6388d3-eb59-4ce7-a270-704fdde0eaea',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 10:06:23',
                executionMonitoringStartAt: '2020-07-28 17:32:11',
                executionMonitoringEndAt: '2020-07-29 08:18:31',
                error: 6360185599,
                inactive: 1583051461,
                successful: 4147926135,
                stopped: 4376662068,
                unknown: 3032215358,
                unregistered: 5715471371,
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
                id: 'e483c0ba-8758-493b-8fc2-c4649fcb0f2a',
                tenantId: '1c56f03a-c62d-4233-9d01-1384da5dea11',
                tenantCode: 'upjtiu0wygql5kd14w6kjeau6dkw2znry9x0796n39gepc696y',
                systemId: 'f51dee00-203a-4efc-b6ce-336414c2943a',
                systemName: 'xn0abkrh8gxsipdvkm3u4',
                executionId: 'db6388d3-eb59-4ce7-a270-704fdde0eaea',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 10:30:48',
                executionMonitoringStartAt: '2020-07-29 06:03:10',
                executionMonitoringEndAt: '2020-07-29 10:04:01',
                error: 4844615955,
                inactive: 8008229692,
                successful: 7412021398,
                stopped: 4886890067,
                unknown: 2287596568,
                unregistered: 3241876619,
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
                id: 'e483c0ba-8758-493b-8fc2-c4649fcb0f2a',
                tenantId: '1c56f03a-c62d-4233-9d01-1384da5dea11',
                tenantCode: 'un69rou7dtmv3myhxmmi7eicoep8bkdqcqux4pqjxsn9fjetx6',
                systemId: 'f51dee00-203a-4efc-b6ce-336414c2943a',
                systemName: 'rlpr6kuycjpbdxzdz88d',
                executionId: 'db6388d3-eb59-4ce7-a270-704fdde0eaea',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 10:36:16',
                executionMonitoringStartAt: '2020-07-29 03:13:25',
                executionMonitoringEndAt: '2020-07-28 22:10:26',
                error: 61863183898,
                inactive: 3158636518,
                successful: 2268398986,
                stopped: 6327463153,
                unknown: 2668477358,
                unregistered: 3026172345,
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
                id: 'e483c0ba-8758-493b-8fc2-c4649fcb0f2a',
                tenantId: '1c56f03a-c62d-4233-9d01-1384da5dea11',
                tenantCode: 'l0k9y8eframbypi1qtoubx45x57lm26k1th73krd1fuz4p5c7r',
                systemId: 'f51dee00-203a-4efc-b6ce-336414c2943a',
                systemName: '8ttv9z7w0eomrspqf00k',
                executionId: 'db6388d3-eb59-4ce7-a270-704fdde0eaea',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 04:56:10',
                executionMonitoringStartAt: '2020-07-29 02:05:18',
                executionMonitoringEndAt: '2020-07-29 12:28:32',
                error: 4050300518,
                inactive: 38871211302,
                successful: 1695775844,
                stopped: 9233088498,
                unknown: 5570331258,
                unregistered: 9080729245,
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
                id: 'e483c0ba-8758-493b-8fc2-c4649fcb0f2a',
                tenantId: '1c56f03a-c62d-4233-9d01-1384da5dea11',
                tenantCode: 'vim2fex0sj0ybie8ssmcltr444t2aik36h5zucynm4o6f3vahx',
                systemId: 'f51dee00-203a-4efc-b6ce-336414c2943a',
                systemName: '74dyk5vqa5vfj9u0q4ea',
                executionId: 'db6388d3-eb59-4ce7-a270-704fdde0eaea',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 16:46:48',
                executionMonitoringStartAt: '2020-07-29 15:15:40',
                executionMonitoringEndAt: '2020-07-28 18:34:05',
                error: 2198421192,
                inactive: 8184838566,
                successful: 12594510551,
                stopped: 5862777626,
                unknown: 2078408502,
                unregistered: 7680549205,
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
                id: 'e483c0ba-8758-493b-8fc2-c4649fcb0f2a',
                tenantId: '1c56f03a-c62d-4233-9d01-1384da5dea11',
                tenantCode: '6bk1dnk1314qnx7dxdkreiqaaozn7ysg9rjh4aku5vb0jbavds',
                systemId: 'f51dee00-203a-4efc-b6ce-336414c2943a',
                systemName: 'bwej8abkk0oq933oafgk',
                executionId: 'db6388d3-eb59-4ce7-a270-704fdde0eaea',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 02:30:36',
                executionMonitoringStartAt: '2020-07-28 22:23:49',
                executionMonitoringEndAt: '2020-07-29 14:58:33',
                error: 5772689786,
                inactive: 1215955023,
                successful: 4790133980,
                stopped: 81011061392,
                unknown: 7042014878,
                unregistered: 9559787882,
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
                id: 'e483c0ba-8758-493b-8fc2-c4649fcb0f2a',
                tenantId: '1c56f03a-c62d-4233-9d01-1384da5dea11',
                tenantCode: 'bsznw7p64v1xb77djttju728lo8utxjcl8r94frcuqjvzw53xn',
                systemId: 'f51dee00-203a-4efc-b6ce-336414c2943a',
                systemName: 'gjuieg395bcxs2aqf04w',
                executionId: 'db6388d3-eb59-4ce7-a270-704fdde0eaea',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 11:00:51',
                executionMonitoringStartAt: '2020-07-28 22:31:21',
                executionMonitoringEndAt: '2020-07-28 22:19:55',
                error: 5403752225,
                inactive: 4062678256,
                successful: 6506723932,
                stopped: 1485832569,
                unknown: 49255877685,
                unregistered: 9460249791,
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
                id: 'e483c0ba-8758-493b-8fc2-c4649fcb0f2a',
                tenantId: '1c56f03a-c62d-4233-9d01-1384da5dea11',
                tenantCode: 'fzst32xyq3i68z789lbdkt77f0z4ne8sd1odue7ixq6qjc1hdm',
                systemId: 'f51dee00-203a-4efc-b6ce-336414c2943a',
                systemName: 'g2efdaaq6algk205882j',
                executionId: 'db6388d3-eb59-4ce7-a270-704fdde0eaea',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 21:40:58',
                executionMonitoringStartAt: '2020-07-29 05:28:29',
                executionMonitoringEndAt: '2020-07-28 20:37:53',
                error: 6091312211,
                inactive: 9650034796,
                successful: 2847733365,
                stopped: 9519850458,
                unknown: 9841919440,
                unregistered: 18549938936,
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
                id: 'e483c0ba-8758-493b-8fc2-c4649fcb0f2a',
                tenantId: '1c56f03a-c62d-4233-9d01-1384da5dea11',
                tenantCode: 'pc5xr1p6i15ara3rprqc5f6utuq8excwp63wf7cibkde7ljjoz',
                systemId: 'f51dee00-203a-4efc-b6ce-336414c2943a',
                systemName: '47zn7fhlsp8f6rfh78ou',
                executionId: 'db6388d3-eb59-4ce7-a270-704fdde0eaea',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 20:03:01',
                executionMonitoringStartAt: '2020-07-29 01:22:31',
                executionMonitoringEndAt: '2020-07-29 14:40:53',
                error: -9,
                inactive: 1578805816,
                successful: 1034345445,
                stopped: 9725379250,
                unknown: 5871084096,
                unregistered: 3979132930,
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
                id: 'e483c0ba-8758-493b-8fc2-c4649fcb0f2a',
                tenantId: '1c56f03a-c62d-4233-9d01-1384da5dea11',
                tenantCode: '08faniagrx975vmymqk2inoahbp0732k06yeaqlhmavh5z6p5m',
                systemId: 'f51dee00-203a-4efc-b6ce-336414c2943a',
                systemName: 'advbn1yttqc7u8k39ixa',
                executionId: 'db6388d3-eb59-4ce7-a270-704fdde0eaea',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 15:21:13',
                executionMonitoringStartAt: '2020-07-28 23:29:49',
                executionMonitoringEndAt: '2020-07-28 17:15:22',
                error: 2633256038,
                inactive: -9,
                successful: 5098733885,
                stopped: 7494058127,
                unknown: 3038019614,
                unregistered: 3130240163,
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
                id: 'e483c0ba-8758-493b-8fc2-c4649fcb0f2a',
                tenantId: '1c56f03a-c62d-4233-9d01-1384da5dea11',
                tenantCode: 'h5jrin7zmczewog41fxqk9u6n68p6o3n2znryptvznyqo2c9vc',
                systemId: 'f51dee00-203a-4efc-b6ce-336414c2943a',
                systemName: 'copd0tdlcmmms2a5kz0q',
                executionId: 'db6388d3-eb59-4ce7-a270-704fdde0eaea',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 09:13:11',
                executionMonitoringStartAt: '2020-07-28 22:16:34',
                executionMonitoringEndAt: '2020-07-29 07:28:29',
                error: 2700186702,
                inactive: 2216790744,
                successful: -9,
                stopped: 4850992855,
                unknown: 6452653939,
                unregistered: 6438580489,
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
                id: 'e483c0ba-8758-493b-8fc2-c4649fcb0f2a',
                tenantId: '1c56f03a-c62d-4233-9d01-1384da5dea11',
                tenantCode: '7ryfzb77mr5ccjmbrq872liq0vj4sq2n0d3d47rushxf0egbnb',
                systemId: 'f51dee00-203a-4efc-b6ce-336414c2943a',
                systemName: 'jbihw0o0lxwyxpfmkpat',
                executionId: 'db6388d3-eb59-4ce7-a270-704fdde0eaea',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 14:48:07',
                executionMonitoringStartAt: '2020-07-29 06:08:28',
                executionMonitoringEndAt: '2020-07-29 07:22:57',
                error: 3898355742,
                inactive: 1244443960,
                successful: 7856297651,
                stopped: -9,
                unknown: 8827052946,
                unregistered: 6925753637,
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
                id: 'e483c0ba-8758-493b-8fc2-c4649fcb0f2a',
                tenantId: '1c56f03a-c62d-4233-9d01-1384da5dea11',
                tenantCode: 'fnb2hsqlwfrjhh0m1nk05odcj2jr7ybscv4qoz7nbvsyej3y09',
                systemId: 'f51dee00-203a-4efc-b6ce-336414c2943a',
                systemName: 'nnlc9hvmzuibdyzgqqih',
                executionId: 'db6388d3-eb59-4ce7-a270-704fdde0eaea',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 21:10:25',
                executionMonitoringStartAt: '2020-07-29 07:19:22',
                executionMonitoringEndAt: '2020-07-28 16:01:10',
                error: 1096341978,
                inactive: 5366288296,
                successful: 6751682731,
                stopped: 9951156040,
                unknown: -9,
                unregistered: 4924568746,
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
                id: 'e483c0ba-8758-493b-8fc2-c4649fcb0f2a',
                tenantId: '1c56f03a-c62d-4233-9d01-1384da5dea11',
                tenantCode: 'xc43rg1obn2i6xx09zpmgro23lopeti5b1q6ybwc4p768b1qut',
                systemId: 'f51dee00-203a-4efc-b6ce-336414c2943a',
                systemName: 'sbikvs2z9ibt91ohfubj',
                executionId: 'db6388d3-eb59-4ce7-a270-704fdde0eaea',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 02:23:17',
                executionMonitoringStartAt: '2020-07-29 12:19:20',
                executionMonitoringEndAt: '2020-07-29 12:32:18',
                error: 6451537931,
                inactive: 5788529460,
                successful: 9093314601,
                stopped: 6140690668,
                unknown: 7746115943,
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
                id: 'e483c0ba-8758-493b-8fc2-c4649fcb0f2a',
                tenantId: '1c56f03a-c62d-4233-9d01-1384da5dea11',
                tenantCode: 'qz8hs34423slm0g1bzplzznak6d9fifzwfwkqf2kyhczhkvy0g',
                systemId: 'f51dee00-203a-4efc-b6ce-336414c2943a',
                systemName: 'g53833s1waaa1v4qioms',
                executionId: 'db6388d3-eb59-4ce7-a270-704fdde0eaea',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-29 10:36:18',
                executionMonitoringStartAt: '2020-07-28 19:25:45',
                executionMonitoringEndAt: '2020-07-28 21:55:09',
                error: 1639693170,
                inactive: 7648372243,
                successful: 6604790293,
                stopped: 1624754287,
                unknown: 7294403453,
                unregistered: 8273733949,
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
                id: 'e483c0ba-8758-493b-8fc2-c4649fcb0f2a',
                tenantId: '1c56f03a-c62d-4233-9d01-1384da5dea11',
                tenantCode: '29mezzkyxlkjtbti2lm2fv3mm5wbm45vo4bx414sq90xa566rn',
                systemId: 'f51dee00-203a-4efc-b6ce-336414c2943a',
                systemName: '05pbwc45etn5yh3mmyk5',
                executionId: 'db6388d3-eb59-4ce7-a270-704fdde0eaea',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-29 07:13:05',
                executionMonitoringEndAt: '2020-07-29 08:14:01',
                error: 2986736635,
                inactive: 5054774935,
                successful: 1147127009,
                stopped: 4446196646,
                unknown: 4732594301,
                unregistered: 7360840818,
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
                id: 'e483c0ba-8758-493b-8fc2-c4649fcb0f2a',
                tenantId: '1c56f03a-c62d-4233-9d01-1384da5dea11',
                tenantCode: 'zlufw830a2o5j2x9bwb8h3p3u9pk9l3pzj8zk6l15plfzltha8',
                systemId: 'f51dee00-203a-4efc-b6ce-336414c2943a',
                systemName: '9o7utw3lun2forcmj8u8',
                executionId: 'db6388d3-eb59-4ce7-a270-704fdde0eaea',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 01:55:56',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-29 03:21:49',
                error: 5734287076,
                inactive: 3772918139,
                successful: 3092085430,
                stopped: 7071045835,
                unknown: 3445721674,
                unregistered: 2131008990,
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
                id: 'e483c0ba-8758-493b-8fc2-c4649fcb0f2a',
                tenantId: '1c56f03a-c62d-4233-9d01-1384da5dea11',
                tenantCode: 'vj4hbq63d8eqn0qg6eattq8eguv12lqh9a9hrmgqrn7tpidib1',
                systemId: 'f51dee00-203a-4efc-b6ce-336414c2943a',
                systemName: '19gguzjcfp2ck6yvzwid',
                executionId: 'db6388d3-eb59-4ce7-a270-704fdde0eaea',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 15:23:52',
                executionMonitoringStartAt: '2020-07-28 18:20:32',
                executionMonitoringEndAt: 'XXXXXXXX',
                error: 1070043795,
                inactive: 1830024007,
                successful: 3631929786,
                stopped: 7906888411,
                unknown: 1474780513,
                unregistered: 8771174995,
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
                id: 'e483c0ba-8758-493b-8fc2-c4649fcb0f2a',
                tenantId: '1c56f03a-c62d-4233-9d01-1384da5dea11',
                tenantCode: 'ry38akwhoeyc182uwnevwtz1sah2152ha6np7wg25ttstuzfdn',
                systemId: 'f51dee00-203a-4efc-b6ce-336414c2943a',
                systemName: 'vkppigiom08y8d5d4vsi',
                executionId: 'db6388d3-eb59-4ce7-a270-704fdde0eaea',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 04:34:37',
                executionMonitoringStartAt: '2020-07-29 14:32:56',
                executionMonitoringEndAt: '2020-07-28 16:44:47',
                error: 7063910333,
                inactive: 7695942117,
                successful: 5922965712,
                stopped: 3659875307,
                unknown: 1043241260,
                unregistered: 6415510694,
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
                        value   : 'e483c0ba-8758-493b-8fc2-c4649fcb0f2a'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'e483c0ba-8758-493b-8fc2-c4649fcb0f2a'));
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
            .get('/bplus-it-sappi/channel-overview/e483c0ba-8758-493b-8fc2-c4649fcb0f2a')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e483c0ba-8758-493b-8fc2-c4649fcb0f2a'));
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
                
                id: '955dd619-0086-4e00-8062-f108daf323a9',
                tenantId: 'be1be013-a0fd-4a1d-8e05-56211b6be9d6',
                tenantCode: 'uartjtxke5i2nmf8cd51zx57rg1x46ow0ebukmuvn2deji48cb',
                systemId: '65e3724e-8685-46b5-881c-86e22cd4afa8',
                systemName: 'iddi9smqb6dk4wj8b534',
                executionId: '44095040-1f4c-49ef-a905-993f71e9f8b3',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 03:27:53',
                executionMonitoringStartAt: '2020-07-29 11:30:12',
                executionMonitoringEndAt: '2020-07-28 20:38:26',
                error: 9986894272,
                inactive: 7605799725,
                successful: 1765710933,
                stopped: 5991585762,
                unknown: 1676560984,
                unregistered: 9254184374,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/channel-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: 'e483c0ba-8758-493b-8fc2-c4649fcb0f2a',
                tenantId: '1c56f03a-c62d-4233-9d01-1384da5dea11',
                tenantCode: 'hw24bxvuildwj21scmdct9btf3wo9kbr26wp7lho419m83x90g',
                systemId: 'f51dee00-203a-4efc-b6ce-336414c2943a',
                systemName: 'gzzab21plpc19a1ysfjk',
                executionId: 'db6388d3-eb59-4ce7-a270-704fdde0eaea',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 09:51:47',
                executionMonitoringStartAt: '2020-07-29 07:39:20',
                executionMonitoringEndAt: '2020-07-28 20:16:19',
                error: 8040774040,
                inactive: 5089958176,
                successful: 3813343203,
                stopped: 9818997958,
                unknown: 7916933641,
                unregistered: 8436973734,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e483c0ba-8758-493b-8fc2-c4649fcb0f2a'));
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
            .delete('/bplus-it-sappi/channel-overview/e483c0ba-8758-493b-8fc2-c4649fcb0f2a')
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
                        id: '6f864ec2-81bb-409e-8cdc-d2613bfe9d4a',
                        tenantId: '1c56f03a-c62d-4233-9d01-1384da5dea11',
                        tenantCode: '2y0nn68v5stwisd2zsn442ioxbyvh5y8wa70snwaiew56368xr',
                        systemId: 'f51dee00-203a-4efc-b6ce-336414c2943a',
                        systemName: '7u7lkn02lslv2j160jz9',
                        executionId: 'db6388d3-eb59-4ce7-a270-704fdde0eaea',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-29 15:07:35',
                        executionMonitoringStartAt: '2020-07-29 09:30:21',
                        executionMonitoringEndAt: '2020-07-29 04:04:55',
                        error: 7159190358,
                        inactive: 5386773807,
                        successful: 6315016319,
                        stopped: 9696934104,
                        unknown: 6729300122,
                        unregistered: 5061843078,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannelOverview).toHaveProperty('id', '6f864ec2-81bb-409e-8cdc-d2613bfe9d4a');
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
                            value   : 'e483c0ba-8758-493b-8fc2-c4649fcb0f2a'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelOverview.id).toStrictEqual('e483c0ba-8758-493b-8fc2-c4649fcb0f2a');
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
                    id: 'e483c0ba-8758-493b-8fc2-c4649fcb0f2a'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelOverviewById.id).toStrictEqual('e483c0ba-8758-493b-8fc2-c4649fcb0f2a');
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
                        
                        id: '6558be18-68bd-4f0f-896f-39aa4ada6808',
                        tenantId: 'b87dbbd5-3d81-47ea-9a51-faf59120150b',
                        tenantCode: 'i75pidqn6u6zh2ykfaxjgwrxc9tuhau69gy9j71kc2qa8yve21',
                        systemId: '092bddb8-1090-4c47-b14b-0d649efea0e0',
                        systemName: 'ivdqilv6rtzgsaj708gb',
                        executionId: 'a86c7280-a351-4284-b1cc-0ca160f2ecaf',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-29 11:56:26',
                        executionMonitoringStartAt: '2020-07-29 07:42:49',
                        executionMonitoringEndAt: '2020-07-29 07:19:25',
                        error: 7493118939,
                        inactive: 6140465111,
                        successful: 8518306967,
                        stopped: 4893244797,
                        unknown: 8686556987,
                        unregistered: 6994166502,
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
                        
                        id: 'e483c0ba-8758-493b-8fc2-c4649fcb0f2a',
                        tenantId: '1c56f03a-c62d-4233-9d01-1384da5dea11',
                        tenantCode: '9s0t6w1s0azceybx0nfurkn7j4ey37w93inrn0ey9cye1i8nra',
                        systemId: 'f51dee00-203a-4efc-b6ce-336414c2943a',
                        systemName: '8jh0gm63y6q0ffgac06d',
                        executionId: 'db6388d3-eb59-4ce7-a270-704fdde0eaea',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-28 18:36:23',
                        executionMonitoringStartAt: '2020-07-29 08:12:52',
                        executionMonitoringEndAt: '2020-07-28 15:57:14',
                        error: 6618953065,
                        inactive: 6043877761,
                        successful: 7656170620,
                        stopped: 2670423036,
                        unknown: 5799391499,
                        unregistered: 6848959888,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannelOverview.id).toStrictEqual('e483c0ba-8758-493b-8fc2-c4649fcb0f2a');
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
                    id: 'e483c0ba-8758-493b-8fc2-c4649fcb0f2a'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelOverviewById.id).toStrictEqual('e483c0ba-8758-493b-8fc2-c4649fcb0f2a');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});