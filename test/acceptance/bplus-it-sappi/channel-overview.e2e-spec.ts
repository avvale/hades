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
                tenantId: '83f4c826-996d-466a-bfcc-cd8c82c24766',
                tenantCode: 'uc0p0v4t7u5jgbybc8m7omn1n0dxa5hgwvopqs34jlgamkgpxy',
                systemId: '8c4d6ea4-b94c-482c-a4ab-1115b95c4b2c',
                systemName: 'zrpgeubutrp7o9aeff3o',
                executionId: '21a8abf9-b880-4b28-a8f6-9dfa81c54517',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 13:28:49',
                executionMonitoringStartAt: '2020-08-04 12:17:37',
                executionMonitoringEndAt: '2020-08-05 07:12:22',
                error: 2556465902,
                inactive: 9506095580,
                successful: 1648695266,
                stopped: 4215480149,
                unknown: 8795190957,
                unregistered: 2543592701,
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
                
                tenantId: '83f4c826-996d-466a-bfcc-cd8c82c24766',
                tenantCode: 'gdpsctrf2ak6zebygr3bw3y87icm6zxjlywkbdbnibqdorvong',
                systemId: '8c4d6ea4-b94c-482c-a4ab-1115b95c4b2c',
                systemName: 'ivvjjxdatj3mfoz295i9',
                executionId: '21a8abf9-b880-4b28-a8f6-9dfa81c54517',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-05 01:02:33',
                executionMonitoringStartAt: '2020-08-04 14:06:19',
                executionMonitoringEndAt: '2020-08-04 21:23:57',
                error: 8041901342,
                inactive: 9359216449,
                successful: 9142720678,
                stopped: 3591512011,
                unknown: 4214041664,
                unregistered: 8039940201,
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
                id: 'fb23e53e-397f-4a19-9507-1e160bfae7db',
                tenantId: null,
                tenantCode: 'o55csjzxvwjyndytb3961o1je967ofe5oji2bzxz114evfr4zr',
                systemId: '8c4d6ea4-b94c-482c-a4ab-1115b95c4b2c',
                systemName: '3yelaj401h5lzqtgww8l',
                executionId: '21a8abf9-b880-4b28-a8f6-9dfa81c54517',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 10:38:48',
                executionMonitoringStartAt: '2020-08-04 12:32:40',
                executionMonitoringEndAt: '2020-08-04 15:01:49',
                error: 3375613500,
                inactive: 4392597405,
                successful: 8883470189,
                stopped: 8794730457,
                unknown: 6330505964,
                unregistered: 3212870133,
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
                id: 'fb23e53e-397f-4a19-9507-1e160bfae7db',
                
                tenantCode: 'prrefxmcm1guxz5tiycb6fv4o920p0sojhck7u2yxvmww51ak1',
                systemId: '8c4d6ea4-b94c-482c-a4ab-1115b95c4b2c',
                systemName: 'i98mr16024e7oog37igf',
                executionId: '21a8abf9-b880-4b28-a8f6-9dfa81c54517',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-05 00:19:29',
                executionMonitoringStartAt: '2020-08-04 10:59:16',
                executionMonitoringEndAt: '2020-08-05 06:24:28',
                error: 4680190961,
                inactive: 4237722475,
                successful: 3856987546,
                stopped: 8211001725,
                unknown: 5077402880,
                unregistered: 3931430143,
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
                id: 'fb23e53e-397f-4a19-9507-1e160bfae7db',
                tenantId: '83f4c826-996d-466a-bfcc-cd8c82c24766',
                tenantCode: null,
                systemId: '8c4d6ea4-b94c-482c-a4ab-1115b95c4b2c',
                systemName: '89l6zvadza20b8ba8kxz',
                executionId: '21a8abf9-b880-4b28-a8f6-9dfa81c54517',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 18:29:08',
                executionMonitoringStartAt: '2020-08-04 23:34:33',
                executionMonitoringEndAt: '2020-08-04 12:50:31',
                error: 6355193429,
                inactive: 4143853323,
                successful: 3358415433,
                stopped: 7227461340,
                unknown: 3625142036,
                unregistered: 1850776196,
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
                id: 'fb23e53e-397f-4a19-9507-1e160bfae7db',
                tenantId: '83f4c826-996d-466a-bfcc-cd8c82c24766',
                
                systemId: '8c4d6ea4-b94c-482c-a4ab-1115b95c4b2c',
                systemName: 'xi1quypftu4xtppudw47',
                executionId: '21a8abf9-b880-4b28-a8f6-9dfa81c54517',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-05 06:08:56',
                executionMonitoringStartAt: '2020-08-04 21:30:16',
                executionMonitoringEndAt: '2020-08-04 10:33:55',
                error: 5219023721,
                inactive: 4762825869,
                successful: 9027354800,
                stopped: 4032961324,
                unknown: 3860871910,
                unregistered: 3607837046,
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
                id: 'fb23e53e-397f-4a19-9507-1e160bfae7db',
                tenantId: '83f4c826-996d-466a-bfcc-cd8c82c24766',
                tenantCode: 'lclo8tu2cml8pfjtts56t6yidvwdt6qhr6wd3mzbxsw1atacr0',
                systemId: null,
                systemName: 'sg85kezg6yxqcsa67d3a',
                executionId: '21a8abf9-b880-4b28-a8f6-9dfa81c54517',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-05 04:11:39',
                executionMonitoringStartAt: '2020-08-04 14:16:46',
                executionMonitoringEndAt: '2020-08-04 23:32:08',
                error: 1075918999,
                inactive: 3342723321,
                successful: 8539561427,
                stopped: 3621751882,
                unknown: 7684392240,
                unregistered: 6009271540,
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
                id: 'fb23e53e-397f-4a19-9507-1e160bfae7db',
                tenantId: '83f4c826-996d-466a-bfcc-cd8c82c24766',
                tenantCode: 'bl0k4bzbf72rpatdxbdcej09sgjes7xvsb7q57av7milluzu11',
                
                systemName: 'digjj8lwrgg2bjodyc0k',
                executionId: '21a8abf9-b880-4b28-a8f6-9dfa81c54517',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 21:07:57',
                executionMonitoringStartAt: '2020-08-04 21:57:59',
                executionMonitoringEndAt: '2020-08-04 23:58:28',
                error: 9178354905,
                inactive: 3022669970,
                successful: 7514635523,
                stopped: 1477023955,
                unknown: 3714275334,
                unregistered: 1944129369,
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
                id: 'fb23e53e-397f-4a19-9507-1e160bfae7db',
                tenantId: '83f4c826-996d-466a-bfcc-cd8c82c24766',
                tenantCode: 'h1xu8oclxy3eqksw61lkijbx7ofxiheymenledgg3df3307m8c',
                systemId: '8c4d6ea4-b94c-482c-a4ab-1115b95c4b2c',
                systemName: null,
                executionId: '21a8abf9-b880-4b28-a8f6-9dfa81c54517',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 11:28:03',
                executionMonitoringStartAt: '2020-08-05 05:33:47',
                executionMonitoringEndAt: '2020-08-04 16:54:41',
                error: 6348921139,
                inactive: 3138815009,
                successful: 1133936271,
                stopped: 4197932789,
                unknown: 3679270474,
                unregistered: 6282864394,
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
                id: 'fb23e53e-397f-4a19-9507-1e160bfae7db',
                tenantId: '83f4c826-996d-466a-bfcc-cd8c82c24766',
                tenantCode: 'q5de0ifuu5yxwckcnrq3xdimab1ata5f7ahr4db9ac70ois4vw',
                systemId: '8c4d6ea4-b94c-482c-a4ab-1115b95c4b2c',
                
                executionId: '21a8abf9-b880-4b28-a8f6-9dfa81c54517',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-05 01:31:39',
                executionMonitoringStartAt: '2020-08-04 16:22:44',
                executionMonitoringEndAt: '2020-08-04 19:36:43',
                error: 2839333125,
                inactive: 5652012268,
                successful: 9235906621,
                stopped: 4245165201,
                unknown: 3007717732,
                unregistered: 5421503646,
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
                id: 'fb23e53e-397f-4a19-9507-1e160bfae7db',
                tenantId: '83f4c826-996d-466a-bfcc-cd8c82c24766',
                tenantCode: 'dxd1skfsqeh8kigarqyh5emr86opkxzd6ikr6h8w6yrfjk55b4',
                systemId: '8c4d6ea4-b94c-482c-a4ab-1115b95c4b2c',
                systemName: 'xm2vgd5al1eduxlcid43',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-05 05:10:33',
                executionMonitoringStartAt: '2020-08-05 04:55:40',
                executionMonitoringEndAt: '2020-08-05 02:46:17',
                error: 5996946264,
                inactive: 8549705664,
                successful: 2200828449,
                stopped: 2434587925,
                unknown: 7538100874,
                unregistered: 7485287601,
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
                id: 'fb23e53e-397f-4a19-9507-1e160bfae7db',
                tenantId: '83f4c826-996d-466a-bfcc-cd8c82c24766',
                tenantCode: 'e2pg2rkyj7sw78ykdo6gjm5usmv1qfjuqp4l555gtu0rvtsg7i',
                systemId: '8c4d6ea4-b94c-482c-a4ab-1115b95c4b2c',
                systemName: 'tz4utiqvdswufui17tth',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-05 00:37:49',
                executionMonitoringStartAt: '2020-08-05 07:15:41',
                executionMonitoringEndAt: '2020-08-04 11:50:37',
                error: 9587426493,
                inactive: 9104953275,
                successful: 7800709658,
                stopped: 7197255293,
                unknown: 4140093376,
                unregistered: 3539038737,
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
                id: 'fb23e53e-397f-4a19-9507-1e160bfae7db',
                tenantId: '83f4c826-996d-466a-bfcc-cd8c82c24766',
                tenantCode: '2op3978mmbo13xr1rzclvd02xytu9gwwns7auooqgdg837e471',
                systemId: '8c4d6ea4-b94c-482c-a4ab-1115b95c4b2c',
                systemName: '9man42tzdtqy9gqr60sn',
                executionId: '21a8abf9-b880-4b28-a8f6-9dfa81c54517',
                executionType: null,
                executionExecutedAt: '2020-08-05 08:52:43',
                executionMonitoringStartAt: '2020-08-04 19:29:35',
                executionMonitoringEndAt: '2020-08-05 08:43:15',
                error: 4090802011,
                inactive: 2866036594,
                successful: 3748315998,
                stopped: 1329907896,
                unknown: 5893900416,
                unregistered: 3491671074,
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
                id: 'fb23e53e-397f-4a19-9507-1e160bfae7db',
                tenantId: '83f4c826-996d-466a-bfcc-cd8c82c24766',
                tenantCode: 'jes5oswjqz8ztow21cki4jhb2bqkbnrm7s2dl7oxhp7neqcexm',
                systemId: '8c4d6ea4-b94c-482c-a4ab-1115b95c4b2c',
                systemName: '18nuecaooprn34ekvvcg',
                executionId: '21a8abf9-b880-4b28-a8f6-9dfa81c54517',
                
                executionExecutedAt: '2020-08-04 15:42:50',
                executionMonitoringStartAt: '2020-08-04 13:11:20',
                executionMonitoringEndAt: '2020-08-04 10:52:54',
                error: 1203785423,
                inactive: 3093069820,
                successful: 5968156730,
                stopped: 7807092928,
                unknown: 1653211631,
                unregistered: 4289654852,
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
                id: 'fb23e53e-397f-4a19-9507-1e160bfae7db',
                tenantId: '83f4c826-996d-466a-bfcc-cd8c82c24766',
                tenantCode: 'x3mzhu3lf046r66kca0viwptbbs8t3jieltb0pq3ql03j1b2z8',
                systemId: '8c4d6ea4-b94c-482c-a4ab-1115b95c4b2c',
                systemName: 'dczvtoixlwdcdf2f9wif',
                executionId: '21a8abf9-b880-4b28-a8f6-9dfa81c54517',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-08-04 23:19:34',
                executionMonitoringEndAt: '2020-08-04 21:13:59',
                error: 7916972861,
                inactive: 2788681921,
                successful: 1314342016,
                stopped: 1876625446,
                unknown: 4825921700,
                unregistered: 7725090641,
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
                id: 'fb23e53e-397f-4a19-9507-1e160bfae7db',
                tenantId: '83f4c826-996d-466a-bfcc-cd8c82c24766',
                tenantCode: 'pu4koeacox0898xsrr8dlm2xjqgtfekld3c3x4nt0kpfu5upih',
                systemId: '8c4d6ea4-b94c-482c-a4ab-1115b95c4b2c',
                systemName: 'fgxuoqial0lqiwdnd2ry',
                executionId: '21a8abf9-b880-4b28-a8f6-9dfa81c54517',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-08-04 23:50:37',
                executionMonitoringEndAt: '2020-08-04 12:49:00',
                error: 7540003989,
                inactive: 2466949854,
                successful: 7190650135,
                stopped: 1101447160,
                unknown: 2677493873,
                unregistered: 9398152813,
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
                id: 'fb23e53e-397f-4a19-9507-1e160bfae7db',
                tenantId: '83f4c826-996d-466a-bfcc-cd8c82c24766',
                tenantCode: 'la58u4nwsnkl9vhusxdfezdbcv7avzd14qippow5fuvu22t5r6',
                systemId: '8c4d6ea4-b94c-482c-a4ab-1115b95c4b2c',
                systemName: 'xbu1m1ua8ljcf0j2bu3m',
                executionId: '21a8abf9-b880-4b28-a8f6-9dfa81c54517',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-05 07:57:00',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-08-04 10:31:52',
                error: 1549736523,
                inactive: 3032500078,
                successful: 2809978267,
                stopped: 9866160949,
                unknown: 6244542977,
                unregistered: 1970680120,
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
                id: 'fb23e53e-397f-4a19-9507-1e160bfae7db',
                tenantId: '83f4c826-996d-466a-bfcc-cd8c82c24766',
                tenantCode: 'vawt9oco3a5nhu88w3dmtfukrkodpgij5gbowm9t4nx4frs30a',
                systemId: '8c4d6ea4-b94c-482c-a4ab-1115b95c4b2c',
                systemName: 'tjcwmgslgx3tzc64cvjk',
                executionId: '21a8abf9-b880-4b28-a8f6-9dfa81c54517',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-05 06:03:30',
                
                executionMonitoringEndAt: '2020-08-04 17:43:44',
                error: 6630201528,
                inactive: 6434845071,
                successful: 3896931014,
                stopped: 9498882057,
                unknown: 4813288843,
                unregistered: 8553874449,
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
                id: 'fb23e53e-397f-4a19-9507-1e160bfae7db',
                tenantId: '83f4c826-996d-466a-bfcc-cd8c82c24766',
                tenantCode: '7hkytt5gkxn2sxtva81caqkeynpz3ay6is0ao4kvsx2d82vubh',
                systemId: '8c4d6ea4-b94c-482c-a4ab-1115b95c4b2c',
                systemName: 'uofi87xoxpw95dkxddcd',
                executionId: '21a8abf9-b880-4b28-a8f6-9dfa81c54517',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 20:11:33',
                executionMonitoringStartAt: '2020-08-04 10:21:56',
                executionMonitoringEndAt: null,
                error: 1743372863,
                inactive: 2817952610,
                successful: 4149690683,
                stopped: 8395782290,
                unknown: 3626445627,
                unregistered: 3819945431,
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
                id: 'fb23e53e-397f-4a19-9507-1e160bfae7db',
                tenantId: '83f4c826-996d-466a-bfcc-cd8c82c24766',
                tenantCode: '8a22cyddqnmbn88dj4soyj8xhdh4jjei8hq7kaimt61gr5j96p',
                systemId: '8c4d6ea4-b94c-482c-a4ab-1115b95c4b2c',
                systemName: 'utmn00wboq57nu91hhie',
                executionId: '21a8abf9-b880-4b28-a8f6-9dfa81c54517',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-05 07:25:21',
                executionMonitoringStartAt: '2020-08-05 01:39:02',
                
                error: 3933641416,
                inactive: 3087313800,
                successful: 3209873444,
                stopped: 8668631775,
                unknown: 5199512742,
                unregistered: 3191437264,
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
                id: 'cza22834ghiwm56f8dojmjyh0scgreccfe4tf',
                tenantId: '83f4c826-996d-466a-bfcc-cd8c82c24766',
                tenantCode: 'h40fpr3h49mwi1uzebfk0h7a5dlsvml1g82q0hbemvryvodofw',
                systemId: '8c4d6ea4-b94c-482c-a4ab-1115b95c4b2c',
                systemName: '3tmxshxzmapc11fgnpxz',
                executionId: '21a8abf9-b880-4b28-a8f6-9dfa81c54517',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 12:03:08',
                executionMonitoringStartAt: '2020-08-04 20:08:21',
                executionMonitoringEndAt: '2020-08-05 08:59:36',
                error: 6162263282,
                inactive: 3682470432,
                successful: 7839188931,
                stopped: 5566794578,
                unknown: 6530196644,
                unregistered: 4847779512,
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
                id: 'fb23e53e-397f-4a19-9507-1e160bfae7db',
                tenantId: '3cqabp9rar9871npr8bqvr3vwhpti4lpgu5e3',
                tenantCode: 'e8n6dsj3ponq465wgoui43pt0429ikidg6sk7610y3jrodqx1o',
                systemId: '8c4d6ea4-b94c-482c-a4ab-1115b95c4b2c',
                systemName: '6yohaiv9puodgh962f5j',
                executionId: '21a8abf9-b880-4b28-a8f6-9dfa81c54517',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-05 06:45:17',
                executionMonitoringStartAt: '2020-08-04 11:46:56',
                executionMonitoringEndAt: '2020-08-04 17:15:11',
                error: 3164403077,
                inactive: 9611176757,
                successful: 8523375392,
                stopped: 5208238249,
                unknown: 4763967285,
                unregistered: 7494911881,
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
                id: 'fb23e53e-397f-4a19-9507-1e160bfae7db',
                tenantId: '83f4c826-996d-466a-bfcc-cd8c82c24766',
                tenantCode: '8h9l6030u3gw81ylzs4ubbjm8mfw02ooe37aekb7qttmt9eb45',
                systemId: 'ik7jywdmwt4xwuf5g4ykmt4otwrzpeltvzrad',
                systemName: 'j8gvv1wcrqlhnthqv4ql',
                executionId: '21a8abf9-b880-4b28-a8f6-9dfa81c54517',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 15:07:06',
                executionMonitoringStartAt: '2020-08-04 16:28:57',
                executionMonitoringEndAt: '2020-08-04 20:36:50',
                error: 1110718629,
                inactive: 3719170225,
                successful: 3446689655,
                stopped: 9727428492,
                unknown: 2993387183,
                unregistered: 1522732288,
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
                id: 'fb23e53e-397f-4a19-9507-1e160bfae7db',
                tenantId: '83f4c826-996d-466a-bfcc-cd8c82c24766',
                tenantCode: 'gb7787stg57ekvzpi1tmpzo3zobshstmrwnd3dsfk1dxefrkj9',
                systemId: '8c4d6ea4-b94c-482c-a4ab-1115b95c4b2c',
                systemName: 'yn0n8p47zdas2e8rq3m5',
                executionId: '4mbfsydt9r42l9539dr2zt8ehx6tc26lq6ap8',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 12:41:24',
                executionMonitoringStartAt: '2020-08-04 22:00:28',
                executionMonitoringEndAt: '2020-08-04 22:03:14',
                error: 7728871681,
                inactive: 5112377015,
                successful: 3718650071,
                stopped: 4076891168,
                unknown: 1012397281,
                unregistered: 6592953808,
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
                id: 'fb23e53e-397f-4a19-9507-1e160bfae7db',
                tenantId: '83f4c826-996d-466a-bfcc-cd8c82c24766',
                tenantCode: 'cdw5trus1rksrcm1b1ba1t9dvh2rp86468jiq6xktpjpg1gmqoe',
                systemId: '8c4d6ea4-b94c-482c-a4ab-1115b95c4b2c',
                systemName: 'eol9yva8x1gb0e9yupj2',
                executionId: '21a8abf9-b880-4b28-a8f6-9dfa81c54517',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 19:49:29',
                executionMonitoringStartAt: '2020-08-04 11:25:48',
                executionMonitoringEndAt: '2020-08-04 21:59:31',
                error: 3936987265,
                inactive: 9603228394,
                successful: 4657025490,
                stopped: 9145807066,
                unknown: 8558060901,
                unregistered: 9360544055,
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
                id: 'fb23e53e-397f-4a19-9507-1e160bfae7db',
                tenantId: '83f4c826-996d-466a-bfcc-cd8c82c24766',
                tenantCode: '2u0mzgdpplufkb3uzs8z16qnr03kw5ubtphvabi0njl8rxlqx3',
                systemId: '8c4d6ea4-b94c-482c-a4ab-1115b95c4b2c',
                systemName: 'o1we4h47i3h6ggo6lqucn',
                executionId: '21a8abf9-b880-4b28-a8f6-9dfa81c54517',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-05 05:59:46',
                executionMonitoringStartAt: '2020-08-05 08:38:25',
                executionMonitoringEndAt: '2020-08-04 21:20:33',
                error: 7352246412,
                inactive: 1619788507,
                successful: 7084091220,
                stopped: 4429884287,
                unknown: 4860256275,
                unregistered: 3215659356,
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
                id: 'fb23e53e-397f-4a19-9507-1e160bfae7db',
                tenantId: '83f4c826-996d-466a-bfcc-cd8c82c24766',
                tenantCode: 'bny59gqjfsta3mn4pmcuc3ac6hr21mw7968o1dbkynp6nhjmd3',
                systemId: '8c4d6ea4-b94c-482c-a4ab-1115b95c4b2c',
                systemName: 'aw4ptzm7smz4dqe5lf1e',
                executionId: '21a8abf9-b880-4b28-a8f6-9dfa81c54517',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 17:03:14',
                executionMonitoringStartAt: '2020-08-04 17:01:04',
                executionMonitoringEndAt: '2020-08-05 08:05:45',
                error: 93532509188,
                inactive: 3769470807,
                successful: 3677315523,
                stopped: 7001562466,
                unknown: 8037533002,
                unregistered: 3608141514,
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
                id: 'fb23e53e-397f-4a19-9507-1e160bfae7db',
                tenantId: '83f4c826-996d-466a-bfcc-cd8c82c24766',
                tenantCode: '397rs5kjmrgghtr7rh13q4b1witkvm1othyfidrvasj8v3fcm4',
                systemId: '8c4d6ea4-b94c-482c-a4ab-1115b95c4b2c',
                systemName: '9jau0zq2gjkhnz871d85',
                executionId: '21a8abf9-b880-4b28-a8f6-9dfa81c54517',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-05 08:32:23',
                executionMonitoringStartAt: '2020-08-05 00:31:58',
                executionMonitoringEndAt: '2020-08-04 11:57:03',
                error: 5191320011,
                inactive: 13699850613,
                successful: 3279460568,
                stopped: 4872733388,
                unknown: 8039430631,
                unregistered: 9295051424,
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
                id: 'fb23e53e-397f-4a19-9507-1e160bfae7db',
                tenantId: '83f4c826-996d-466a-bfcc-cd8c82c24766',
                tenantCode: 'hr2yac06zzl436y5zgy4jwdf9ox0qybkk0l8xbcqdqx3d6qs74',
                systemId: '8c4d6ea4-b94c-482c-a4ab-1115b95c4b2c',
                systemName: 'h3px7ig0py5vt100sven',
                executionId: '21a8abf9-b880-4b28-a8f6-9dfa81c54517',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 16:41:35',
                executionMonitoringStartAt: '2020-08-04 21:53:28',
                executionMonitoringEndAt: '2020-08-04 11:09:28',
                error: 1799837566,
                inactive: 2286987410,
                successful: 54601673710,
                stopped: 5655307270,
                unknown: 7972514169,
                unregistered: 7305108366,
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
                id: 'fb23e53e-397f-4a19-9507-1e160bfae7db',
                tenantId: '83f4c826-996d-466a-bfcc-cd8c82c24766',
                tenantCode: 'yuhn3yzv18eb5iqu3h28l8u88wnug157ydhpd7mjx32zs3jwpf',
                systemId: '8c4d6ea4-b94c-482c-a4ab-1115b95c4b2c',
                systemName: '3kuipbr66mq38ey3o8dd',
                executionId: '21a8abf9-b880-4b28-a8f6-9dfa81c54517',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-05 04:55:54',
                executionMonitoringStartAt: '2020-08-04 21:40:52',
                executionMonitoringEndAt: '2020-08-04 14:03:56',
                error: 6631028223,
                inactive: 3185941969,
                successful: 4967308926,
                stopped: 38748110647,
                unknown: 9927831264,
                unregistered: 1670089569,
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
                id: 'fb23e53e-397f-4a19-9507-1e160bfae7db',
                tenantId: '83f4c826-996d-466a-bfcc-cd8c82c24766',
                tenantCode: 'cy4se6oh4ljbrxngk8ktuhrkhcmw4hldvllvxmj71b9mo0tpv2',
                systemId: '8c4d6ea4-b94c-482c-a4ab-1115b95c4b2c',
                systemName: 'hl3zpwlg2clpurpfys0i',
                executionId: '21a8abf9-b880-4b28-a8f6-9dfa81c54517',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 13:03:59',
                executionMonitoringStartAt: '2020-08-05 02:32:34',
                executionMonitoringEndAt: '2020-08-05 01:37:46',
                error: 3026842030,
                inactive: 9729854182,
                successful: 1809201902,
                stopped: 6448201076,
                unknown: 62519852954,
                unregistered: 2049510913,
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
                id: 'fb23e53e-397f-4a19-9507-1e160bfae7db',
                tenantId: '83f4c826-996d-466a-bfcc-cd8c82c24766',
                tenantCode: 'f4q0nnyjmsumc0p6m651svzol56l9pajvz4lcs723wxp2dh11t',
                systemId: '8c4d6ea4-b94c-482c-a4ab-1115b95c4b2c',
                systemName: 'cbavl7nchiichtlx6t5o',
                executionId: '21a8abf9-b880-4b28-a8f6-9dfa81c54517',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 23:28:46',
                executionMonitoringStartAt: '2020-08-04 11:04:03',
                executionMonitoringEndAt: '2020-08-04 13:42:46',
                error: 5420928119,
                inactive: 8452054990,
                successful: 1080236323,
                stopped: 5709491606,
                unknown: 9777478031,
                unregistered: 91160110750,
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
                id: 'fb23e53e-397f-4a19-9507-1e160bfae7db',
                tenantId: '83f4c826-996d-466a-bfcc-cd8c82c24766',
                tenantCode: '4fy8mdadcrfdoz57ply19gt51jx74haukj3fenv9eb7nk6n25d',
                systemId: '8c4d6ea4-b94c-482c-a4ab-1115b95c4b2c',
                systemName: 'yb96rg4e97io0xzrtvgo',
                executionId: '21a8abf9-b880-4b28-a8f6-9dfa81c54517',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-05 06:32:37',
                executionMonitoringStartAt: '2020-08-04 10:43:58',
                executionMonitoringEndAt: '2020-08-05 01:07:00',
                error: -9,
                inactive: 5136214608,
                successful: 7389860784,
                stopped: 9946896813,
                unknown: 5487015108,
                unregistered: 8469774366,
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
                id: 'fb23e53e-397f-4a19-9507-1e160bfae7db',
                tenantId: '83f4c826-996d-466a-bfcc-cd8c82c24766',
                tenantCode: 'pmzkhou59kpfx9iji0bfgrc1s5npxjxploth4umymjy3818u8s',
                systemId: '8c4d6ea4-b94c-482c-a4ab-1115b95c4b2c',
                systemName: '8alz9jle9uxiaen3inia',
                executionId: '21a8abf9-b880-4b28-a8f6-9dfa81c54517',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 21:52:06',
                executionMonitoringStartAt: '2020-08-05 01:19:12',
                executionMonitoringEndAt: '2020-08-04 09:11:13',
                error: 9130800890,
                inactive: -9,
                successful: 5182417154,
                stopped: 4054934979,
                unknown: 7992178692,
                unregistered: 5053590177,
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
                id: 'fb23e53e-397f-4a19-9507-1e160bfae7db',
                tenantId: '83f4c826-996d-466a-bfcc-cd8c82c24766',
                tenantCode: 'u9our1jn9hc0mpfx90kmwbraqtpqi38bmy8i5gmkjvuqte9ym8',
                systemId: '8c4d6ea4-b94c-482c-a4ab-1115b95c4b2c',
                systemName: 'fu4mry9u6c14w71nmhac',
                executionId: '21a8abf9-b880-4b28-a8f6-9dfa81c54517',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 21:26:15',
                executionMonitoringStartAt: '2020-08-05 07:25:36',
                executionMonitoringEndAt: '2020-08-04 13:13:13',
                error: 6276041072,
                inactive: 7059474960,
                successful: -9,
                stopped: 8329566268,
                unknown: 6277416734,
                unregistered: 2191249923,
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
                id: 'fb23e53e-397f-4a19-9507-1e160bfae7db',
                tenantId: '83f4c826-996d-466a-bfcc-cd8c82c24766',
                tenantCode: '186qrvze3177tfnzy2s1trhgkm5gtf519hgmgrn1o9oafk682x',
                systemId: '8c4d6ea4-b94c-482c-a4ab-1115b95c4b2c',
                systemName: 'ftr5qc8yi4u5olqaicbf',
                executionId: '21a8abf9-b880-4b28-a8f6-9dfa81c54517',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 10:28:18',
                executionMonitoringStartAt: '2020-08-05 08:31:59',
                executionMonitoringEndAt: '2020-08-04 09:48:46',
                error: 9940154951,
                inactive: 1198123809,
                successful: 7266540717,
                stopped: -9,
                unknown: 6742446509,
                unregistered: 1808004768,
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
                id: 'fb23e53e-397f-4a19-9507-1e160bfae7db',
                tenantId: '83f4c826-996d-466a-bfcc-cd8c82c24766',
                tenantCode: '7ehgjpii9888n4vd1x51m3ztwqsrolhpe1xici82jwv0fg3om0',
                systemId: '8c4d6ea4-b94c-482c-a4ab-1115b95c4b2c',
                systemName: 'hx9ka6zrl13782ij8boq',
                executionId: '21a8abf9-b880-4b28-a8f6-9dfa81c54517',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 21:31:41',
                executionMonitoringStartAt: '2020-08-05 06:00:17',
                executionMonitoringEndAt: '2020-08-05 07:53:47',
                error: 2090565792,
                inactive: 6315170612,
                successful: 9201256802,
                stopped: 9479469661,
                unknown: -9,
                unregistered: 7055119793,
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
                id: 'fb23e53e-397f-4a19-9507-1e160bfae7db',
                tenantId: '83f4c826-996d-466a-bfcc-cd8c82c24766',
                tenantCode: 'sj3fqbdfn65mcfgzmm65swcxxkil6gbawftihcx3lvu04cpx52',
                systemId: '8c4d6ea4-b94c-482c-a4ab-1115b95c4b2c',
                systemName: 'bbp9bv2cyr741gwbw9nx',
                executionId: '21a8abf9-b880-4b28-a8f6-9dfa81c54517',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-05 05:13:55',
                executionMonitoringStartAt: '2020-08-05 02:25:43',
                executionMonitoringEndAt: '2020-08-04 11:50:57',
                error: 3815575882,
                inactive: 5502978940,
                successful: 6791310322,
                stopped: 9278562820,
                unknown: 9663277331,
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
                id: 'fb23e53e-397f-4a19-9507-1e160bfae7db',
                tenantId: '83f4c826-996d-466a-bfcc-cd8c82c24766',
                tenantCode: '33km2tapuk46lzxih82loadczfiq25gdiv0qsmjqdd3q89diye',
                systemId: '8c4d6ea4-b94c-482c-a4ab-1115b95c4b2c',
                systemName: 'f4mp1dbqrtlopgz8takn',
                executionId: '21a8abf9-b880-4b28-a8f6-9dfa81c54517',
                executionType: 'XXXX',
                executionExecutedAt: '2020-08-04 16:50:53',
                executionMonitoringStartAt: '2020-08-04 22:37:11',
                executionMonitoringEndAt: '2020-08-04 10:09:28',
                error: 5258057655,
                inactive: 1479918551,
                successful: 7496061109,
                stopped: 7010771526,
                unknown: 7232893317,
                unregistered: 6251687529,
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
                id: 'fb23e53e-397f-4a19-9507-1e160bfae7db',
                tenantId: '83f4c826-996d-466a-bfcc-cd8c82c24766',
                tenantCode: 'plxpu6p8ukqop33qvfoi4fkrigcty7wmvoln8ab8bl9sx3mjdn',
                systemId: '8c4d6ea4-b94c-482c-a4ab-1115b95c4b2c',
                systemName: 'lgj6mo3hi1u8idk1waxy',
                executionId: '21a8abf9-b880-4b28-a8f6-9dfa81c54517',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-08-04 22:42:57',
                executionMonitoringEndAt: '2020-08-04 13:22:22',
                error: 6470478255,
                inactive: 3845770837,
                successful: 4297446166,
                stopped: 8779724517,
                unknown: 2266698573,
                unregistered: 5334782906,
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
                id: 'fb23e53e-397f-4a19-9507-1e160bfae7db',
                tenantId: '83f4c826-996d-466a-bfcc-cd8c82c24766',
                tenantCode: 'apqmluh7rxerlnvf7eu691ldrkv7tswbe7iukjvc4pivd38jeo',
                systemId: '8c4d6ea4-b94c-482c-a4ab-1115b95c4b2c',
                systemName: 'v6lmb3evw1amrmz1j9gw',
                executionId: '21a8abf9-b880-4b28-a8f6-9dfa81c54517',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-05 03:54:56',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-08-04 14:44:36',
                error: 9472285675,
                inactive: 5443472047,
                successful: 9263634272,
                stopped: 3372600379,
                unknown: 7713111137,
                unregistered: 2371613941,
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
                id: 'fb23e53e-397f-4a19-9507-1e160bfae7db',
                tenantId: '83f4c826-996d-466a-bfcc-cd8c82c24766',
                tenantCode: 'f047d5s6lqparze8zpji836fgj0dp2c4ehuu2wqm0y49qu01f0',
                systemId: '8c4d6ea4-b94c-482c-a4ab-1115b95c4b2c',
                systemName: 'xs63qf1wx6w41tdvfu7q',
                executionId: '21a8abf9-b880-4b28-a8f6-9dfa81c54517',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-05 06:34:24',
                executionMonitoringStartAt: '2020-08-05 08:50:51',
                executionMonitoringEndAt: 'XXXXXXXX',
                error: 7920330639,
                inactive: 7042593518,
                successful: 9658109116,
                stopped: 3889214461,
                unknown: 4932552714,
                unregistered: 7959261622,
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
                id: 'fb23e53e-397f-4a19-9507-1e160bfae7db',
                tenantId: '83f4c826-996d-466a-bfcc-cd8c82c24766',
                tenantCode: 'fqkxi6iswozu0v6v6h7wwaj7y4b9ltjkjqlq09n8s01vsfsg1h',
                systemId: '8c4d6ea4-b94c-482c-a4ab-1115b95c4b2c',
                systemName: 'yg2na93d3fspjripqgg6',
                executionId: '21a8abf9-b880-4b28-a8f6-9dfa81c54517',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 10:33:05',
                executionMonitoringStartAt: '2020-08-05 04:10:20',
                executionMonitoringEndAt: '2020-08-04 19:09:24',
                error: 4338393442,
                inactive: 4134876441,
                successful: 7823096389,
                stopped: 1550518658,
                unknown: 5922919191,
                unregistered: 7522783880,
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
                        value   : '4322786f-596a-41fd-8f86-c3190192906c'
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
                        value   : 'fb23e53e-397f-4a19-9507-1e160bfae7db'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'fb23e53e-397f-4a19-9507-1e160bfae7db'));
    });

    test(`/REST:GET bplus-it-sappi/channel-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel-overview/e3b208cf-7e87-460a-9c62-9af978674fa1')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/channel-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel-overview/fb23e53e-397f-4a19-9507-1e160bfae7db')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'fb23e53e-397f-4a19-9507-1e160bfae7db'));
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
                
                id: '26b73c4e-0bca-432f-8990-48e421d1e195',
                tenantId: '1cf30456-f96f-4958-aaac-9778206d403e',
                tenantCode: '9360asvg3vuitxu6k7eiedeujezf32fk7f6ycrr2s1gxrn3eyo',
                systemId: 'f425a721-05fc-4432-8059-d32684f7df1e',
                systemName: 'cpov8gohx9p9ms2hoiec',
                executionId: '38c08fee-42e1-4445-8254-12027242d94e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 23:33:54',
                executionMonitoringStartAt: '2020-08-04 16:33:27',
                executionMonitoringEndAt: '2020-08-04 14:06:03',
                error: 4463863624,
                inactive: 9616602769,
                successful: 1339292593,
                stopped: 8953431138,
                unknown: 7680604101,
                unregistered: 6905928666,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/channel-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: 'fb23e53e-397f-4a19-9507-1e160bfae7db',
                tenantId: '83f4c826-996d-466a-bfcc-cd8c82c24766',
                tenantCode: 'yfpnwcfk5lxu9kszikqd7jg6k8j36mytullknzinw8tpvkzj2f',
                systemId: '8c4d6ea4-b94c-482c-a4ab-1115b95c4b2c',
                systemName: 'll9wz6tfxwzhnyoiruqe',
                executionId: '21a8abf9-b880-4b28-a8f6-9dfa81c54517',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-05 06:51:07',
                executionMonitoringStartAt: '2020-08-04 17:11:20',
                executionMonitoringEndAt: '2020-08-04 11:16:18',
                error: 7472883279,
                inactive: 2922222034,
                successful: 4881251800,
                stopped: 7420001313,
                unknown: 1070693218,
                unregistered: 2986258977,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'fb23e53e-397f-4a19-9507-1e160bfae7db'));
    });

    test(`/REST:DELETE bplus-it-sappi/channel-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel-overview/73f0bc52-2d21-435c-8b1f-13aee3713756')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/channel-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel-overview/fb23e53e-397f-4a19-9507-1e160bfae7db')
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
                        id: '36499e2d-f4b5-442e-b3a8-d12d5b02a33e',
                        tenantId: '83f4c826-996d-466a-bfcc-cd8c82c24766',
                        tenantCode: 'aoy5rmxgrk6y9t68ubfu9ofc4u5pclhr250sisjkd4jp66eaw7',
                        systemId: '8c4d6ea4-b94c-482c-a4ab-1115b95c4b2c',
                        systemName: '8pdo072hxk2h9afxepuh',
                        executionId: '21a8abf9-b880-4b28-a8f6-9dfa81c54517',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-08-04 15:39:25',
                        executionMonitoringStartAt: '2020-08-04 17:08:46',
                        executionMonitoringEndAt: '2020-08-04 15:07:01',
                        error: 4090277690,
                        inactive: 5698169040,
                        successful: 7319589546,
                        stopped: 1839969298,
                        unknown: 2940136810,
                        unregistered: 6977053389,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannelOverview).toHaveProperty('id', '36499e2d-f4b5-442e-b3a8-d12d5b02a33e');
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
                            value   : 'b2fa77c3-c424-4540-a764-5fd225779ed3'
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
                            value   : 'fb23e53e-397f-4a19-9507-1e160bfae7db'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelOverview.id).toStrictEqual('fb23e53e-397f-4a19-9507-1e160bfae7db');
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
                    id: 'dffa273c-cbfb-4c6a-9f83-c11de393f6ed'
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
                    id: 'fb23e53e-397f-4a19-9507-1e160bfae7db'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelOverviewById.id).toStrictEqual('fb23e53e-397f-4a19-9507-1e160bfae7db');
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
                        
                        id: 'b743bb4f-11ed-4175-b64c-461a8b9aef0b',
                        tenantId: '60c10e0f-5f8d-4868-a5eb-33cb6324e572',
                        tenantCode: 'dowuqejmm7sd7zymeyxjtlr7b9ceqgk1krb7hcb58ttlkqesos',
                        systemId: '531a04e3-ea13-4bb2-a3d6-8759db2ed96d',
                        systemName: 'dsldjxes7egbosmbjp7o',
                        executionId: 'ed199777-bc6c-4942-8246-d60065dd52c9',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-08-05 07:26:40',
                        executionMonitoringStartAt: '2020-08-05 04:57:30',
                        executionMonitoringEndAt: '2020-08-04 10:19:13',
                        error: 1388479015,
                        inactive: 3276630275,
                        successful: 8555015268,
                        stopped: 4303213139,
                        unknown: 5262068690,
                        unregistered: 1634886613,
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
                        
                        id: 'fb23e53e-397f-4a19-9507-1e160bfae7db',
                        tenantId: '83f4c826-996d-466a-bfcc-cd8c82c24766',
                        tenantCode: 'y758cwo3mki2yxnem43tr5jykighwd0ydrgd7m6sf6z3le4yj1',
                        systemId: '8c4d6ea4-b94c-482c-a4ab-1115b95c4b2c',
                        systemName: 'elovlh8aquwt7jto9ivu',
                        executionId: '21a8abf9-b880-4b28-a8f6-9dfa81c54517',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-08-04 09:54:08',
                        executionMonitoringStartAt: '2020-08-04 19:33:42',
                        executionMonitoringEndAt: '2020-08-04 18:53:31',
                        error: 1103955988,
                        inactive: 3648767484,
                        successful: 9956621938,
                        stopped: 3960425845,
                        unknown: 2444892601,
                        unregistered: 1314294236,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannelOverview.id).toStrictEqual('fb23e53e-397f-4a19-9507-1e160bfae7db');
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
                    id: '5770c42e-ac8c-481b-8133-6b6d3067be24'
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
                    id: 'fb23e53e-397f-4a19-9507-1e160bfae7db'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelOverviewById.id).toStrictEqual('fb23e53e-397f-4a19-9507-1e160bfae7db');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});