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
                tenantId: '96060f6f-f09a-427a-8114-2e696696decd',
                systemId: '6a93db02-d7e7-4d16-90dc-fcff0b205949',
                systemName: 'u82ejaegbm6x3igc73px',
                executionId: 'ac0e7279-193f-47b7-8223-591dee3950b1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 22:04:27',
                executionMonitoringStartAt: '2020-07-21 02:38:01',
                executionMonitoringEndAt: '2020-07-21 20:00:48',
                error: 8077474868,
                inactive: 2248570053,
                successful: 3260517120,
                stopped: 2090927885,
                unknown: 3647409046,
                unregistered: 9460484003,
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
                
                tenantId: '96060f6f-f09a-427a-8114-2e696696decd',
                systemId: '6a93db02-d7e7-4d16-90dc-fcff0b205949',
                systemName: '4dmhn81etjnh7ls3jik1',
                executionId: 'ac0e7279-193f-47b7-8223-591dee3950b1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 18:30:54',
                executionMonitoringStartAt: '2020-07-21 12:39:54',
                executionMonitoringEndAt: '2020-07-21 22:06:45',
                error: 8761349316,
                inactive: 2881540902,
                successful: 6598638671,
                stopped: 3759682898,
                unknown: 5717794663,
                unregistered: 2452521194,
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
                id: 'd52a7f7c-8be8-4fae-93a5-4d939ec53e8f',
                tenantId: null,
                systemId: '6a93db02-d7e7-4d16-90dc-fcff0b205949',
                systemName: '02i5vy99bi3viz4n21g7',
                executionId: 'ac0e7279-193f-47b7-8223-591dee3950b1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-22 00:24:06',
                executionMonitoringStartAt: '2020-07-21 15:55:26',
                executionMonitoringEndAt: '2020-07-21 10:59:51',
                error: 2298610688,
                inactive: 3778186623,
                successful: 2564603628,
                stopped: 5643157975,
                unknown: 2106871183,
                unregistered: 3478001567,
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
                id: 'd52a7f7c-8be8-4fae-93a5-4d939ec53e8f',
                
                systemId: '6a93db02-d7e7-4d16-90dc-fcff0b205949',
                systemName: '7i1zwsg9vn4decwbrofa',
                executionId: 'ac0e7279-193f-47b7-8223-591dee3950b1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 14:31:04',
                executionMonitoringStartAt: '2020-07-21 10:03:09',
                executionMonitoringEndAt: '2020-07-21 03:00:50',
                error: 3501367181,
                inactive: 2301795090,
                successful: 8410933520,
                stopped: 4214421161,
                unknown: 8339659350,
                unregistered: 6823141410,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd52a7f7c-8be8-4fae-93a5-4d939ec53e8f',
                tenantId: '96060f6f-f09a-427a-8114-2e696696decd',
                systemId: null,
                systemName: 'jlwlll9lff0altbab7sv',
                executionId: 'ac0e7279-193f-47b7-8223-591dee3950b1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 10:21:48',
                executionMonitoringStartAt: '2020-07-21 23:07:18',
                executionMonitoringEndAt: '2020-07-21 06:03:23',
                error: 8911609032,
                inactive: 1986839315,
                successful: 2589544453,
                stopped: 8552270073,
                unknown: 8655195260,
                unregistered: 7916725893,
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
                id: 'd52a7f7c-8be8-4fae-93a5-4d939ec53e8f',
                tenantId: '96060f6f-f09a-427a-8114-2e696696decd',
                
                systemName: 'xharz4bv0n93itfnsmgt',
                executionId: 'ac0e7279-193f-47b7-8223-591dee3950b1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 06:33:37',
                executionMonitoringStartAt: '2020-07-21 20:22:32',
                executionMonitoringEndAt: '2020-07-21 11:35:21',
                error: 4037986661,
                inactive: 2485191549,
                successful: 9446334710,
                stopped: 5012974848,
                unknown: 4736294527,
                unregistered: 8210097373,
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
                id: 'd52a7f7c-8be8-4fae-93a5-4d939ec53e8f',
                tenantId: '96060f6f-f09a-427a-8114-2e696696decd',
                systemId: '6a93db02-d7e7-4d16-90dc-fcff0b205949',
                systemName: null,
                executionId: 'ac0e7279-193f-47b7-8223-591dee3950b1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 08:42:39',
                executionMonitoringStartAt: '2020-07-21 14:38:32',
                executionMonitoringEndAt: '2020-07-21 13:58:18',
                error: 4983615876,
                inactive: 7714569244,
                successful: 2096860209,
                stopped: 4675220498,
                unknown: 3782345770,
                unregistered: 6284612328,
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
                id: 'd52a7f7c-8be8-4fae-93a5-4d939ec53e8f',
                tenantId: '96060f6f-f09a-427a-8114-2e696696decd',
                systemId: '6a93db02-d7e7-4d16-90dc-fcff0b205949',
                
                executionId: 'ac0e7279-193f-47b7-8223-591dee3950b1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 19:10:26',
                executionMonitoringStartAt: '2020-07-21 03:16:23',
                executionMonitoringEndAt: '2020-07-21 12:12:17',
                error: 4056192304,
                inactive: 3539108310,
                successful: 5817323128,
                stopped: 1436287906,
                unknown: 1033592545,
                unregistered: 7570139338,
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
                id: 'd52a7f7c-8be8-4fae-93a5-4d939ec53e8f',
                tenantId: '96060f6f-f09a-427a-8114-2e696696decd',
                systemId: '6a93db02-d7e7-4d16-90dc-fcff0b205949',
                systemName: 'wzha03ng590icee3nk2x',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 01:28:39',
                executionMonitoringStartAt: '2020-07-21 04:02:07',
                executionMonitoringEndAt: '2020-07-21 08:57:12',
                error: 3649844215,
                inactive: 8648519351,
                successful: 6128167999,
                stopped: 7354562983,
                unknown: 6407130317,
                unregistered: 2783773197,
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
                id: 'd52a7f7c-8be8-4fae-93a5-4d939ec53e8f',
                tenantId: '96060f6f-f09a-427a-8114-2e696696decd',
                systemId: '6a93db02-d7e7-4d16-90dc-fcff0b205949',
                systemName: 'wizuwzfnogo70qbu9nft',
                
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 16:59:02',
                executionMonitoringStartAt: '2020-07-21 13:51:55',
                executionMonitoringEndAt: '2020-07-21 16:09:07',
                error: 6148809706,
                inactive: 9180254422,
                successful: 8127427244,
                stopped: 4225492033,
                unknown: 7266792683,
                unregistered: 1850275218,
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
                id: 'd52a7f7c-8be8-4fae-93a5-4d939ec53e8f',
                tenantId: '96060f6f-f09a-427a-8114-2e696696decd',
                systemId: '6a93db02-d7e7-4d16-90dc-fcff0b205949',
                systemName: 'mjxwi7l3nw95pg9n5edz',
                executionId: 'ac0e7279-193f-47b7-8223-591dee3950b1',
                executionType: null,
                executionExecutedAt: '2020-07-21 09:58:09',
                executionMonitoringStartAt: '2020-07-21 03:26:07',
                executionMonitoringEndAt: '2020-07-21 12:29:52',
                error: 2794384526,
                inactive: 5732119096,
                successful: 9788181982,
                stopped: 7382258192,
                unknown: 9326482969,
                unregistered: 1038454664,
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
                id: 'd52a7f7c-8be8-4fae-93a5-4d939ec53e8f',
                tenantId: '96060f6f-f09a-427a-8114-2e696696decd',
                systemId: '6a93db02-d7e7-4d16-90dc-fcff0b205949',
                systemName: 'eulm6mpf9fgdvf04qtn0',
                executionId: 'ac0e7279-193f-47b7-8223-591dee3950b1',
                
                executionExecutedAt: '2020-07-21 14:33:59',
                executionMonitoringStartAt: '2020-07-21 21:44:10',
                executionMonitoringEndAt: '2020-07-21 16:20:06',
                error: 7448797963,
                inactive: 6103248284,
                successful: 7358574051,
                stopped: 2590338624,
                unknown: 7770804660,
                unregistered: 6132581278,
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
                id: 'd52a7f7c-8be8-4fae-93a5-4d939ec53e8f',
                tenantId: '96060f6f-f09a-427a-8114-2e696696decd',
                systemId: '6a93db02-d7e7-4d16-90dc-fcff0b205949',
                systemName: '8k21weko0t6f236z45zm',
                executionId: 'ac0e7279-193f-47b7-8223-591dee3950b1',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-21 21:22:27',
                executionMonitoringEndAt: '2020-07-21 09:53:23',
                error: 2814575072,
                inactive: 9990510310,
                successful: 4013847637,
                stopped: 5172703833,
                unknown: 1378074701,
                unregistered: 9756958090,
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
                id: 'd52a7f7c-8be8-4fae-93a5-4d939ec53e8f',
                tenantId: '96060f6f-f09a-427a-8114-2e696696decd',
                systemId: '6a93db02-d7e7-4d16-90dc-fcff0b205949',
                systemName: 'xd5kserg4zc39pv281bx',
                executionId: 'ac0e7279-193f-47b7-8223-591dee3950b1',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-07-21 15:08:25',
                executionMonitoringEndAt: '2020-07-21 04:17:56',
                error: 1957686111,
                inactive: 6658788290,
                successful: 2430770299,
                stopped: 5388737630,
                unknown: 6070821035,
                unregistered: 6180328904,
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
                id: 'd52a7f7c-8be8-4fae-93a5-4d939ec53e8f',
                tenantId: '96060f6f-f09a-427a-8114-2e696696decd',
                systemId: '6a93db02-d7e7-4d16-90dc-fcff0b205949',
                systemName: 'zemzcn9uorqgbpmaoc1f',
                executionId: 'ac0e7279-193f-47b7-8223-591dee3950b1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 08:59:30',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-21 21:13:22',
                error: 4845341094,
                inactive: 4320158838,
                successful: 3714776925,
                stopped: 6107487627,
                unknown: 2023887967,
                unregistered: 7369050385,
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
                id: 'd52a7f7c-8be8-4fae-93a5-4d939ec53e8f',
                tenantId: '96060f6f-f09a-427a-8114-2e696696decd',
                systemId: '6a93db02-d7e7-4d16-90dc-fcff0b205949',
                systemName: 'mlcz0le9ehn80rpemidp',
                executionId: 'ac0e7279-193f-47b7-8223-591dee3950b1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 08:12:14',
                
                executionMonitoringEndAt: '2020-07-21 21:09:37',
                error: 7045852982,
                inactive: 2493464187,
                successful: 8252116299,
                stopped: 4743688013,
                unknown: 7675507936,
                unregistered: 9666940589,
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
                id: 'd52a7f7c-8be8-4fae-93a5-4d939ec53e8f',
                tenantId: '96060f6f-f09a-427a-8114-2e696696decd',
                systemId: '6a93db02-d7e7-4d16-90dc-fcff0b205949',
                systemName: 'ry0xugogwycjn3h99tr8',
                executionId: 'ac0e7279-193f-47b7-8223-591dee3950b1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 16:19:53',
                executionMonitoringStartAt: '2020-07-21 06:51:28',
                executionMonitoringEndAt: null,
                error: 1839299827,
                inactive: 8691495528,
                successful: 3487548818,
                stopped: 1105653952,
                unknown: 5454585086,
                unregistered: 9796033592,
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
                id: 'd52a7f7c-8be8-4fae-93a5-4d939ec53e8f',
                tenantId: '96060f6f-f09a-427a-8114-2e696696decd',
                systemId: '6a93db02-d7e7-4d16-90dc-fcff0b205949',
                systemName: 'kazdgj947e1pn4xxmpmz',
                executionId: 'ac0e7279-193f-47b7-8223-591dee3950b1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 20:58:16',
                executionMonitoringStartAt: '2020-07-21 20:35:41',
                
                error: 2506572384,
                inactive: 4693197886,
                successful: 8380352990,
                stopped: 4483662573,
                unknown: 6272047206,
                unregistered: 3324142380,
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
                id: 'c5pdtqnhtanoqpr2r70hv5jx8tca7jepvi8t1',
                tenantId: '96060f6f-f09a-427a-8114-2e696696decd',
                systemId: '6a93db02-d7e7-4d16-90dc-fcff0b205949',
                systemName: 'inr7ln1mnzgvqloa82sm',
                executionId: 'ac0e7279-193f-47b7-8223-591dee3950b1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 12:32:21',
                executionMonitoringStartAt: '2020-07-21 17:27:08',
                executionMonitoringEndAt: '2020-07-21 09:50:57',
                error: 5463650979,
                inactive: 7185235522,
                successful: 2386472423,
                stopped: 2957494106,
                unknown: 5699943215,
                unregistered: 4406996418,
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
                id: 'd52a7f7c-8be8-4fae-93a5-4d939ec53e8f',
                tenantId: 'rux7tmolye2m2uk8jfhhvtu0ebukp2uf4i8ex',
                systemId: '6a93db02-d7e7-4d16-90dc-fcff0b205949',
                systemName: 'cre9047kbsb0gkovd5b5',
                executionId: 'ac0e7279-193f-47b7-8223-591dee3950b1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 22:47:59',
                executionMonitoringStartAt: '2020-07-21 10:28:27',
                executionMonitoringEndAt: '2020-07-21 08:32:19',
                error: 9016976903,
                inactive: 5465700284,
                successful: 6442799695,
                stopped: 7135773378,
                unknown: 3867457816,
                unregistered: 1576891591,
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
                id: 'd52a7f7c-8be8-4fae-93a5-4d939ec53e8f',
                tenantId: '96060f6f-f09a-427a-8114-2e696696decd',
                systemId: 'alrnd9s80nx7h121m1p2ie3qjhfhym7dwqul0',
                systemName: 'g4xxnqzmp3vyemw105rn',
                executionId: 'ac0e7279-193f-47b7-8223-591dee3950b1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 16:31:45',
                executionMonitoringStartAt: '2020-07-21 21:22:30',
                executionMonitoringEndAt: '2020-07-21 13:54:10',
                error: 9423796872,
                inactive: 6230045651,
                successful: 2870663017,
                stopped: 9475769024,
                unknown: 3815199996,
                unregistered: 5289061263,
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
                id: 'd52a7f7c-8be8-4fae-93a5-4d939ec53e8f',
                tenantId: '96060f6f-f09a-427a-8114-2e696696decd',
                systemId: '6a93db02-d7e7-4d16-90dc-fcff0b205949',
                systemName: 'v8jxcgd0ph53i2pqq3xl',
                executionId: 't450ewxbqelcsfujmzmmd7mspihmeg2g8uvte',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 03:29:12',
                executionMonitoringStartAt: '2020-07-21 11:20:55',
                executionMonitoringEndAt: '2020-07-21 06:56:38',
                error: 9457128607,
                inactive: 7499663735,
                successful: 9570558738,
                stopped: 2164629546,
                unknown: 9491850286,
                unregistered: 5137955046,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd52a7f7c-8be8-4fae-93a5-4d939ec53e8f',
                tenantId: '96060f6f-f09a-427a-8114-2e696696decd',
                systemId: '6a93db02-d7e7-4d16-90dc-fcff0b205949',
                systemName: '2k25kmtgksytdzkowvd81',
                executionId: 'ac0e7279-193f-47b7-8223-591dee3950b1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 08:37:59',
                executionMonitoringStartAt: '2020-07-21 06:46:22',
                executionMonitoringEndAt: '2020-07-21 13:47:12',
                error: 3068119798,
                inactive: 6651928770,
                successful: 8134355526,
                stopped: 3803924600,
                unknown: 9091883835,
                unregistered: 7566563805,
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
                id: 'd52a7f7c-8be8-4fae-93a5-4d939ec53e8f',
                tenantId: '96060f6f-f09a-427a-8114-2e696696decd',
                systemId: '6a93db02-d7e7-4d16-90dc-fcff0b205949',
                systemName: 'twld8uwe1fh7lcfy9mfz',
                executionId: 'ac0e7279-193f-47b7-8223-591dee3950b1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 16:23:38',
                executionMonitoringStartAt: '2020-07-21 15:08:23',
                executionMonitoringEndAt: '2020-07-22 00:39:21',
                error: 30196402667,
                inactive: 2340278017,
                successful: 5601670329,
                stopped: 7612103700,
                unknown: 7716974790,
                unregistered: 7481661866,
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
                id: 'd52a7f7c-8be8-4fae-93a5-4d939ec53e8f',
                tenantId: '96060f6f-f09a-427a-8114-2e696696decd',
                systemId: '6a93db02-d7e7-4d16-90dc-fcff0b205949',
                systemName: '50az0p6u56c5pgjei1dz',
                executionId: 'ac0e7279-193f-47b7-8223-591dee3950b1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 10:29:35',
                executionMonitoringStartAt: '2020-07-21 22:25:13',
                executionMonitoringEndAt: '2020-07-21 02:38:23',
                error: 3089585002,
                inactive: 75668419463,
                successful: 4608814492,
                stopped: 8374293861,
                unknown: 3796698540,
                unregistered: 5782640550,
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
                id: 'd52a7f7c-8be8-4fae-93a5-4d939ec53e8f',
                tenantId: '96060f6f-f09a-427a-8114-2e696696decd',
                systemId: '6a93db02-d7e7-4d16-90dc-fcff0b205949',
                systemName: '1fpm5p22v00vxiy4ysrw',
                executionId: 'ac0e7279-193f-47b7-8223-591dee3950b1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 22:37:01',
                executionMonitoringStartAt: '2020-07-21 14:41:14',
                executionMonitoringEndAt: '2020-07-21 05:10:48',
                error: 6935836029,
                inactive: 3654695538,
                successful: 64129665270,
                stopped: 4822063888,
                unknown: 6299387754,
                unregistered: 7608427920,
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
                id: 'd52a7f7c-8be8-4fae-93a5-4d939ec53e8f',
                tenantId: '96060f6f-f09a-427a-8114-2e696696decd',
                systemId: '6a93db02-d7e7-4d16-90dc-fcff0b205949',
                systemName: 'y9rd83us9jxgthda4gja',
                executionId: 'ac0e7279-193f-47b7-8223-591dee3950b1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 13:44:00',
                executionMonitoringStartAt: '2020-07-21 03:52:58',
                executionMonitoringEndAt: '2020-07-21 08:43:16',
                error: 9954335987,
                inactive: 6840466930,
                successful: 7901959599,
                stopped: 16962836979,
                unknown: 9708451525,
                unregistered: 1052934895,
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
                id: 'd52a7f7c-8be8-4fae-93a5-4d939ec53e8f',
                tenantId: '96060f6f-f09a-427a-8114-2e696696decd',
                systemId: '6a93db02-d7e7-4d16-90dc-fcff0b205949',
                systemName: '0b5oxk1ai3e5i5r6gcnk',
                executionId: 'ac0e7279-193f-47b7-8223-591dee3950b1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 23:29:45',
                executionMonitoringStartAt: '2020-07-21 20:42:34',
                executionMonitoringEndAt: '2020-07-21 18:46:11',
                error: 6596160912,
                inactive: 9771716898,
                successful: 9122200436,
                stopped: 5392997439,
                unknown: 49814012352,
                unregistered: 2530145686,
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
                id: 'd52a7f7c-8be8-4fae-93a5-4d939ec53e8f',
                tenantId: '96060f6f-f09a-427a-8114-2e696696decd',
                systemId: '6a93db02-d7e7-4d16-90dc-fcff0b205949',
                systemName: '4cxreju64uowvzz8j4u0',
                executionId: 'ac0e7279-193f-47b7-8223-591dee3950b1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 07:17:52',
                executionMonitoringStartAt: '2020-07-21 21:08:31',
                executionMonitoringEndAt: '2020-07-21 05:08:50',
                error: 4300391096,
                inactive: 1318507392,
                successful: 1916011187,
                stopped: 7619846005,
                unknown: 7512353194,
                unregistered: 26892028904,
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
                id: 'd52a7f7c-8be8-4fae-93a5-4d939ec53e8f',
                tenantId: '96060f6f-f09a-427a-8114-2e696696decd',
                systemId: '6a93db02-d7e7-4d16-90dc-fcff0b205949',
                systemName: 'ls44ce6d1ulblrbnq8fc',
                executionId: 'ac0e7279-193f-47b7-8223-591dee3950b1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 16:40:47',
                executionMonitoringStartAt: '2020-07-21 14:25:50',
                executionMonitoringEndAt: '2020-07-21 07:49:33',
                error: -9,
                inactive: 2365141279,
                successful: 5384230206,
                stopped: 2914767241,
                unknown: 1661072623,
                unregistered: 1308630176,
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
                id: 'd52a7f7c-8be8-4fae-93a5-4d939ec53e8f',
                tenantId: '96060f6f-f09a-427a-8114-2e696696decd',
                systemId: '6a93db02-d7e7-4d16-90dc-fcff0b205949',
                systemName: 'hi46uvyy2csxpdp1qyq9',
                executionId: 'ac0e7279-193f-47b7-8223-591dee3950b1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 17:59:04',
                executionMonitoringStartAt: '2020-07-21 08:14:04',
                executionMonitoringEndAt: '2020-07-21 22:51:29',
                error: 2977230570,
                inactive: -9,
                successful: 8425712491,
                stopped: 5157669249,
                unknown: 8351867805,
                unregistered: 7474523318,
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
                id: 'd52a7f7c-8be8-4fae-93a5-4d939ec53e8f',
                tenantId: '96060f6f-f09a-427a-8114-2e696696decd',
                systemId: '6a93db02-d7e7-4d16-90dc-fcff0b205949',
                systemName: 'p4kadcn8ivo4snqpfhfh',
                executionId: 'ac0e7279-193f-47b7-8223-591dee3950b1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 13:23:27',
                executionMonitoringStartAt: '2020-07-21 09:39:01',
                executionMonitoringEndAt: '2020-07-21 03:49:56',
                error: 7709427245,
                inactive: 2904533358,
                successful: -9,
                stopped: 8186291624,
                unknown: 7820416805,
                unregistered: 5878503163,
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
                id: 'd52a7f7c-8be8-4fae-93a5-4d939ec53e8f',
                tenantId: '96060f6f-f09a-427a-8114-2e696696decd',
                systemId: '6a93db02-d7e7-4d16-90dc-fcff0b205949',
                systemName: 'c533g507ycuohvutjo2h',
                executionId: 'ac0e7279-193f-47b7-8223-591dee3950b1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 07:17:24',
                executionMonitoringStartAt: '2020-07-21 23:57:36',
                executionMonitoringEndAt: '2020-07-21 06:48:43',
                error: 8691707101,
                inactive: 3407225848,
                successful: 4909406482,
                stopped: -9,
                unknown: 1307590516,
                unregistered: 4098578243,
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
                id: 'd52a7f7c-8be8-4fae-93a5-4d939ec53e8f',
                tenantId: '96060f6f-f09a-427a-8114-2e696696decd',
                systemId: '6a93db02-d7e7-4d16-90dc-fcff0b205949',
                systemName: '5l2kgwva8tl5gq8xnarq',
                executionId: 'ac0e7279-193f-47b7-8223-591dee3950b1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 20:56:22',
                executionMonitoringStartAt: '2020-07-21 03:50:19',
                executionMonitoringEndAt: '2020-07-21 08:36:00',
                error: 8733196110,
                inactive: 6142145793,
                successful: 4955655576,
                stopped: 7134606086,
                unknown: -9,
                unregistered: 4899606489,
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
                id: 'd52a7f7c-8be8-4fae-93a5-4d939ec53e8f',
                tenantId: '96060f6f-f09a-427a-8114-2e696696decd',
                systemId: '6a93db02-d7e7-4d16-90dc-fcff0b205949',
                systemName: 'u5f9l5xt5nrtuzyit46o',
                executionId: 'ac0e7279-193f-47b7-8223-591dee3950b1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 15:36:46',
                executionMonitoringStartAt: '2020-07-21 18:27:20',
                executionMonitoringEndAt: '2020-07-21 05:11:20',
                error: 2885311831,
                inactive: 6453530623,
                successful: 4846750960,
                stopped: 4837140972,
                unknown: 9664460975,
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
                id: 'd52a7f7c-8be8-4fae-93a5-4d939ec53e8f',
                tenantId: '96060f6f-f09a-427a-8114-2e696696decd',
                systemId: '6a93db02-d7e7-4d16-90dc-fcff0b205949',
                systemName: 'qv3oxdtagtzqgedt0bsq',
                executionId: 'ac0e7279-193f-47b7-8223-591dee3950b1',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-21 11:22:59',
                executionMonitoringStartAt: '2020-07-21 10:50:16',
                executionMonitoringEndAt: '2020-07-21 16:42:32',
                error: 6476083757,
                inactive: 9647378129,
                successful: 4650492948,
                stopped: 4506272613,
                unknown: 6060304392,
                unregistered: 4480973605,
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
                id: 'd52a7f7c-8be8-4fae-93a5-4d939ec53e8f',
                tenantId: '96060f6f-f09a-427a-8114-2e696696decd',
                systemId: '6a93db02-d7e7-4d16-90dc-fcff0b205949',
                systemName: '43uao6p201uj763yviup',
                executionId: 'ac0e7279-193f-47b7-8223-591dee3950b1',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-21 17:21:37',
                executionMonitoringEndAt: '2020-07-21 04:48:47',
                error: 3875060723,
                inactive: 3454489590,
                successful: 2398053386,
                stopped: 9683414129,
                unknown: 2672001118,
                unregistered: 1663122315,
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
                id: 'd52a7f7c-8be8-4fae-93a5-4d939ec53e8f',
                tenantId: '96060f6f-f09a-427a-8114-2e696696decd',
                systemId: '6a93db02-d7e7-4d16-90dc-fcff0b205949',
                systemName: '99pdl72lunmipaxdz7f1',
                executionId: 'ac0e7279-193f-47b7-8223-591dee3950b1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 14:38:52',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-21 03:18:46',
                error: 8805819269,
                inactive: 4832256093,
                successful: 6869257065,
                stopped: 5134880267,
                unknown: 1565503820,
                unregistered: 6629763358,
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
                id: 'd52a7f7c-8be8-4fae-93a5-4d939ec53e8f',
                tenantId: '96060f6f-f09a-427a-8114-2e696696decd',
                systemId: '6a93db02-d7e7-4d16-90dc-fcff0b205949',
                systemName: 'mdcycc5hlfz9bziiqm6h',
                executionId: 'ac0e7279-193f-47b7-8223-591dee3950b1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 21:06:02',
                executionMonitoringStartAt: '2020-07-21 02:29:54',
                executionMonitoringEndAt: 'XXXXXXXX',
                error: 8637989857,
                inactive: 7163118532,
                successful: 3492972936,
                stopped: 9212346793,
                unknown: 5947699458,
                unregistered: 4076225731,
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
                id: 'd52a7f7c-8be8-4fae-93a5-4d939ec53e8f',
                tenantId: '96060f6f-f09a-427a-8114-2e696696decd',
                systemId: '6a93db02-d7e7-4d16-90dc-fcff0b205949',
                systemName: 'pbfzkixlw5a0t1knwvzo',
                executionId: 'ac0e7279-193f-47b7-8223-591dee3950b1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 16:56:43',
                executionMonitoringStartAt: '2020-07-21 11:25:57',
                executionMonitoringEndAt: '2020-07-21 20:31:41',
                error: 9829811782,
                inactive: 7617511069,
                successful: 3472893720,
                stopped: 9198983035,
                unknown: 2854344782,
                unregistered: 4801611452,
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
                        value   : 'd52a7f7c-8be8-4fae-93a5-4d939ec53e8f'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'd52a7f7c-8be8-4fae-93a5-4d939ec53e8f'));
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
            .get('/bplus-it-sappi/channel-overview/d52a7f7c-8be8-4fae-93a5-4d939ec53e8f')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'd52a7f7c-8be8-4fae-93a5-4d939ec53e8f'));
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
                
                id: 'f33695d4-c662-4db6-82c2-9b0281f4ce02',
                tenantId: '0dbd3ac2-02d5-4c35-a092-f45a60edf41f',
                systemId: '4c5f6ec3-2e8e-4f42-89e9-6e6f4f3352c3',
                systemName: '8hv1pueembyggnp3br0a',
                executionId: 'b4f90211-e65a-4bbc-bb9d-c50df04a03d3',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 03:33:50',
                executionMonitoringStartAt: '2020-07-21 04:23:58',
                executionMonitoringEndAt: '2020-07-21 08:44:41',
                error: 7502321161,
                inactive: 7051683210,
                successful: 3427379116,
                stopped: 9268828125,
                unknown: 9818654200,
                unregistered: 2472841974,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/channel-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: 'd52a7f7c-8be8-4fae-93a5-4d939ec53e8f',
                tenantId: '96060f6f-f09a-427a-8114-2e696696decd',
                systemId: '6a93db02-d7e7-4d16-90dc-fcff0b205949',
                systemName: 'unxvdvpgcc1ozhzly3il',
                executionId: 'ac0e7279-193f-47b7-8223-591dee3950b1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 10:40:50',
                executionMonitoringStartAt: '2020-07-21 12:39:31',
                executionMonitoringEndAt: '2020-07-21 21:27:20',
                error: 9559330710,
                inactive: 4729967888,
                successful: 3527985074,
                stopped: 3002306668,
                unknown: 4943640176,
                unregistered: 3145645396,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'd52a7f7c-8be8-4fae-93a5-4d939ec53e8f'));
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
            .delete('/bplus-it-sappi/channel-overview/d52a7f7c-8be8-4fae-93a5-4d939ec53e8f')
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
                        id: 'd1819260-3edd-4c12-82bd-acc635222912',
                        tenantId: '96060f6f-f09a-427a-8114-2e696696decd',
                        systemId: '6a93db02-d7e7-4d16-90dc-fcff0b205949',
                        systemName: 'r9xd8rgl8hle59i1e9b3',
                        executionId: 'ac0e7279-193f-47b7-8223-591dee3950b1',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-21 06:39:06',
                        executionMonitoringStartAt: '2020-07-21 23:08:43',
                        executionMonitoringEndAt: '2020-07-21 20:01:25',
                        error: 3763340568,
                        inactive: 1128839279,
                        successful: 2957008875,
                        stopped: 1492814307,
                        unknown: 7930029855,
                        unregistered: 4978398030,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannelOverview).toHaveProperty('id', 'd1819260-3edd-4c12-82bd-acc635222912');
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
                            value   : 'd52a7f7c-8be8-4fae-93a5-4d939ec53e8f'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelOverview.id).toStrictEqual('d52a7f7c-8be8-4fae-93a5-4d939ec53e8f');
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
                    id: 'd52a7f7c-8be8-4fae-93a5-4d939ec53e8f'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelOverviewById.id).toStrictEqual('d52a7f7c-8be8-4fae-93a5-4d939ec53e8f');
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
                        
                        id: '68953647-ce2c-4810-8492-73e752a3950d',
                        tenantId: '4a4047ec-4367-428f-a3dd-5c0b43a3887f',
                        systemId: '23ae7602-b8a9-4bef-bab0-f80afcbe0807',
                        systemName: '6v2c2ev2h43m4no7jhkc',
                        executionId: 'd5175036-0b39-44f1-a066-1339d10bf5cd',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-21 02:10:50',
                        executionMonitoringStartAt: '2020-07-21 10:35:11',
                        executionMonitoringEndAt: '2020-07-21 12:20:22',
                        error: 9395307057,
                        inactive: 1860736326,
                        successful: 6023561266,
                        stopped: 9513328616,
                        unknown: 6627011509,
                        unregistered: 5351272758,
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
                        
                        id: 'd52a7f7c-8be8-4fae-93a5-4d939ec53e8f',
                        tenantId: '96060f6f-f09a-427a-8114-2e696696decd',
                        systemId: '6a93db02-d7e7-4d16-90dc-fcff0b205949',
                        systemName: 'imo775ei7usc3g3pqckq',
                        executionId: 'ac0e7279-193f-47b7-8223-591dee3950b1',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-21 16:55:12',
                        executionMonitoringStartAt: '2020-07-21 23:39:01',
                        executionMonitoringEndAt: '2020-07-21 07:18:11',
                        error: 7697202678,
                        inactive: 8253468367,
                        successful: 1335053476,
                        stopped: 3428361010,
                        unknown: 6474048324,
                        unregistered: 6649947217,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannelOverview.id).toStrictEqual('d52a7f7c-8be8-4fae-93a5-4d939ec53e8f');
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
                    id: 'd52a7f7c-8be8-4fae-93a5-4d939ec53e8f'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelOverviewById.id).toStrictEqual('d52a7f7c-8be8-4fae-93a5-4d939ec53e8f');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});