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

    it(`/REST:POST bplus-it-sappi/channel-overview - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: 'a7051b5c-5600-4eb2-88a5-db0d04762c01',
                systemId: '1340cec3-fbca-4131-8fba-c1a2a7fb826c',
                systemName: '1sdrjewj7gqgxx27xug3',
                executionId: '816dc44c-9607-4cdf-a859-465710286163',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 11:07:43',
                executionMonitoringStartAt: '2020-07-17 12:28:49',
                executionMonitoringEndAt: '2020-07-17 02:18:44',
                error: 1377372927,
                inactive: 5179650722,
                successful: 4677458850,
                stopped: 3587883602,
                unknown: 4045055533,
                unregistered: 6380333746,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: 'a7051b5c-5600-4eb2-88a5-db0d04762c01',
                systemId: '1340cec3-fbca-4131-8fba-c1a2a7fb826c',
                systemName: 'ow3hk4m4x46zp0th3o8f',
                executionId: '816dc44c-9607-4cdf-a859-465710286163',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 09:03:23',
                executionMonitoringStartAt: '2020-07-16 22:16:28',
                executionMonitoringEndAt: '2020-07-17 05:47:31',
                error: 7710326142,
                inactive: 2118673226,
                successful: 5520999691,
                stopped: 7930336019,
                unknown: 3102911406,
                unregistered: 5665999209,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bfaac914-73ac-45fc-9c74-2b64d6df0ffc',
                tenantId: null,
                systemId: '1340cec3-fbca-4131-8fba-c1a2a7fb826c',
                systemName: '418j67brjuhb4chvfrna',
                executionId: '816dc44c-9607-4cdf-a859-465710286163',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 16:15:22',
                executionMonitoringStartAt: '2020-07-17 03:25:54',
                executionMonitoringEndAt: '2020-07-17 09:41:51',
                error: 9601631591,
                inactive: 6613922638,
                successful: 7353849395,
                stopped: 2205891171,
                unknown: 1040653269,
                unregistered: 2831276157,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewTenantId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bfaac914-73ac-45fc-9c74-2b64d6df0ffc',
                
                systemId: '1340cec3-fbca-4131-8fba-c1a2a7fb826c',
                systemName: 'q3t2ytyqgmor4gp0hg0s',
                executionId: '816dc44c-9607-4cdf-a859-465710286163',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 19:14:46',
                executionMonitoringStartAt: '2020-07-17 09:20:06',
                executionMonitoringEndAt: '2020-07-16 18:15:57',
                error: 6851131427,
                inactive: 5907892496,
                successful: 3056741574,
                stopped: 1118343027,
                unknown: 7804770675,
                unregistered: 2709008040,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewTenantId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bfaac914-73ac-45fc-9c74-2b64d6df0ffc',
                tenantId: 'a7051b5c-5600-4eb2-88a5-db0d04762c01',
                systemId: null,
                systemName: 'wd3n6sse6w05osxb49vc',
                executionId: '816dc44c-9607-4cdf-a859-465710286163',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 09:26:38',
                executionMonitoringStartAt: '2020-07-16 18:22:05',
                executionMonitoringEndAt: '2020-07-16 23:43:38',
                error: 5429911371,
                inactive: 9082868204,
                successful: 4982335716,
                stopped: 6243153220,
                unknown: 9757640008,
                unregistered: 1809376398,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewSystemId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bfaac914-73ac-45fc-9c74-2b64d6df0ffc',
                tenantId: 'a7051b5c-5600-4eb2-88a5-db0d04762c01',
                
                systemName: 'js8s7lx4hlagxwi1soci',
                executionId: '816dc44c-9607-4cdf-a859-465710286163',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 07:10:24',
                executionMonitoringStartAt: '2020-07-17 01:35:56',
                executionMonitoringEndAt: '2020-07-17 00:45:56',
                error: 2262614121,
                inactive: 3668751354,
                successful: 2469181336,
                stopped: 1520942310,
                unknown: 2514926722,
                unregistered: 3191318746,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewSystemId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bfaac914-73ac-45fc-9c74-2b64d6df0ffc',
                tenantId: 'a7051b5c-5600-4eb2-88a5-db0d04762c01',
                systemId: '1340cec3-fbca-4131-8fba-c1a2a7fb826c',
                systemName: null,
                executionId: '816dc44c-9607-4cdf-a859-465710286163',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 23:26:21',
                executionMonitoringStartAt: '2020-07-17 04:09:55',
                executionMonitoringEndAt: '2020-07-17 03:25:54',
                error: 5796477132,
                inactive: 9375281255,
                successful: 6699343073,
                stopped: 3589907788,
                unknown: 6246717864,
                unregistered: 2123143657,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewSystemName must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bfaac914-73ac-45fc-9c74-2b64d6df0ffc',
                tenantId: 'a7051b5c-5600-4eb2-88a5-db0d04762c01',
                systemId: '1340cec3-fbca-4131-8fba-c1a2a7fb826c',
                
                executionId: '816dc44c-9607-4cdf-a859-465710286163',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 19:54:25',
                executionMonitoringStartAt: '2020-07-16 20:40:29',
                executionMonitoringEndAt: '2020-07-17 09:08:35',
                error: 3405987255,
                inactive: 8666474871,
                successful: 3961639179,
                stopped: 9195429995,
                unknown: 4155119900,
                unregistered: 4216703449,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewSystemName must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bfaac914-73ac-45fc-9c74-2b64d6df0ffc',
                tenantId: 'a7051b5c-5600-4eb2-88a5-db0d04762c01',
                systemId: '1340cec3-fbca-4131-8fba-c1a2a7fb826c',
                systemName: '3hd9prwkzl0u53rew6oy',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 22:12:21',
                executionMonitoringStartAt: '2020-07-17 07:18:30',
                executionMonitoringEndAt: '2020-07-17 13:02:28',
                error: 5223561590,
                inactive: 9619983167,
                successful: 5799491190,
                stopped: 1051987098,
                unknown: 3121144221,
                unregistered: 8405173471,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bfaac914-73ac-45fc-9c74-2b64d6df0ffc',
                tenantId: 'a7051b5c-5600-4eb2-88a5-db0d04762c01',
                systemId: '1340cec3-fbca-4131-8fba-c1a2a7fb826c',
                systemName: 'n57i5q41fvue0u0bdoti',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 08:10:24',
                executionMonitoringStartAt: '2020-07-17 09:34:35',
                executionMonitoringEndAt: '2020-07-16 21:28:37',
                error: 8488595053,
                inactive: 5853606796,
                successful: 9433390524,
                stopped: 8939631062,
                unknown: 5771400432,
                unregistered: 3213924660,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bfaac914-73ac-45fc-9c74-2b64d6df0ffc',
                tenantId: 'a7051b5c-5600-4eb2-88a5-db0d04762c01',
                systemId: '1340cec3-fbca-4131-8fba-c1a2a7fb826c',
                systemName: 'mvy7t4ul3845h3hi2qec',
                executionId: '816dc44c-9607-4cdf-a859-465710286163',
                executionType: null,
                executionExecutedAt: '2020-07-17 03:15:35',
                executionMonitoringStartAt: '2020-07-16 18:39:03',
                executionMonitoringEndAt: '2020-07-17 03:12:50',
                error: 5594288481,
                inactive: 4865779682,
                successful: 4636240218,
                stopped: 6897897254,
                unknown: 4272539203,
                unregistered: 4583457660,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionType must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bfaac914-73ac-45fc-9c74-2b64d6df0ffc',
                tenantId: 'a7051b5c-5600-4eb2-88a5-db0d04762c01',
                systemId: '1340cec3-fbca-4131-8fba-c1a2a7fb826c',
                systemName: '336i92kqbpxibejkul9h',
                executionId: '816dc44c-9607-4cdf-a859-465710286163',
                
                executionExecutedAt: '2020-07-16 18:12:39',
                executionMonitoringStartAt: '2020-07-17 03:33:32',
                executionMonitoringEndAt: '2020-07-17 14:49:37',
                error: 5596033519,
                inactive: 1437234314,
                successful: 9155776226,
                stopped: 3901358068,
                unknown: 9435103557,
                unregistered: 8231706973,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionType must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bfaac914-73ac-45fc-9c74-2b64d6df0ffc',
                tenantId: 'a7051b5c-5600-4eb2-88a5-db0d04762c01',
                systemId: '1340cec3-fbca-4131-8fba-c1a2a7fb826c',
                systemName: '2m4lo3akq6uwjcjky7kl',
                executionId: '816dc44c-9607-4cdf-a859-465710286163',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-16 17:10:13',
                executionMonitoringEndAt: '2020-07-16 19:56:00',
                error: 9964514664,
                inactive: 1360706687,
                successful: 1909726899,
                stopped: 3452478174,
                unknown: 6347352492,
                unregistered: 4671015785,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionExecutedAt must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bfaac914-73ac-45fc-9c74-2b64d6df0ffc',
                tenantId: 'a7051b5c-5600-4eb2-88a5-db0d04762c01',
                systemId: '1340cec3-fbca-4131-8fba-c1a2a7fb826c',
                systemName: 'f11jkdn215uqwimsqa24',
                executionId: '816dc44c-9607-4cdf-a859-465710286163',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-07-17 12:47:50',
                executionMonitoringEndAt: '2020-07-17 09:26:34',
                error: 8783438725,
                inactive: 1488311704,
                successful: 2818273662,
                stopped: 3422828115,
                unknown: 8016954566,
                unregistered: 1280034978,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bfaac914-73ac-45fc-9c74-2b64d6df0ffc',
                tenantId: 'a7051b5c-5600-4eb2-88a5-db0d04762c01',
                systemId: '1340cec3-fbca-4131-8fba-c1a2a7fb826c',
                systemName: 'x0akf3a7npex6i4s738h',
                executionId: '816dc44c-9607-4cdf-a859-465710286163',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 12:01:09',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-17 00:43:18',
                error: 3238870673,
                inactive: 9405965394,
                successful: 7371715613,
                stopped: 2800552331,
                unknown: 9297730532,
                unregistered: 9957398080,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bfaac914-73ac-45fc-9c74-2b64d6df0ffc',
                tenantId: 'a7051b5c-5600-4eb2-88a5-db0d04762c01',
                systemId: '1340cec3-fbca-4131-8fba-c1a2a7fb826c',
                systemName: 'hg8q60yooq9ge21udqip',
                executionId: '816dc44c-9607-4cdf-a859-465710286163',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 02:23:41',
                
                executionMonitoringEndAt: '2020-07-16 19:33:54',
                error: 5333895877,
                inactive: 5879494634,
                successful: 1405720566,
                stopped: 9488660522,
                unknown: 1221548080,
                unregistered: 6373162500,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bfaac914-73ac-45fc-9c74-2b64d6df0ffc',
                tenantId: 'a7051b5c-5600-4eb2-88a5-db0d04762c01',
                systemId: '1340cec3-fbca-4131-8fba-c1a2a7fb826c',
                systemName: 'tzz0x19xi9xju8gg31o8',
                executionId: '816dc44c-9607-4cdf-a859-465710286163',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 08:22:39',
                executionMonitoringStartAt: '2020-07-16 19:14:33',
                executionMonitoringEndAt: null,
                error: 3488718943,
                inactive: 9903198974,
                successful: 3495549785,
                stopped: 2677824285,
                unknown: 3122575043,
                unregistered: 9819848799,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bfaac914-73ac-45fc-9c74-2b64d6df0ffc',
                tenantId: 'a7051b5c-5600-4eb2-88a5-db0d04762c01',
                systemId: '1340cec3-fbca-4131-8fba-c1a2a7fb826c',
                systemName: 'uwt1caef9zgrvugps05g',
                executionId: '816dc44c-9607-4cdf-a859-465710286163',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 14:52:38',
                executionMonitoringStartAt: '2020-07-16 19:00:26',
                
                error: 8322034869,
                inactive: 9491520399,
                successful: 2755099244,
                stopped: 4118108317,
                unknown: 7109439958,
                unregistered: 5565070879,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'z727kx8cwydz34f38wqq9ex5791iodq7mjkn6',
                tenantId: 'a7051b5c-5600-4eb2-88a5-db0d04762c01',
                systemId: '1340cec3-fbca-4131-8fba-c1a2a7fb826c',
                systemName: '4zwflrqri3p3z4w6dcfe',
                executionId: '816dc44c-9607-4cdf-a859-465710286163',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 11:24:42',
                executionMonitoringStartAt: '2020-07-16 21:51:08',
                executionMonitoringEndAt: '2020-07-16 19:12:28',
                error: 1047207391,
                inactive: 2374901473,
                successful: 5405504012,
                stopped: 4505663518,
                unknown: 8171129165,
                unregistered: 1951533711,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bfaac914-73ac-45fc-9c74-2b64d6df0ffc',
                tenantId: 'dcqjb3xhukwguva2i27tmjnk7loido82oh4z6',
                systemId: '1340cec3-fbca-4131-8fba-c1a2a7fb826c',
                systemName: 'dj4r1iprq1yn02mu71h7',
                executionId: '816dc44c-9607-4cdf-a859-465710286163',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 00:11:06',
                executionMonitoringStartAt: '2020-07-17 01:53:35',
                executionMonitoringEndAt: '2020-07-16 20:32:28',
                error: 3093804552,
                inactive: 8233402741,
                successful: 9179893265,
                stopped: 4726625060,
                unknown: 1252879225,
                unregistered: 5865462676,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewTenantId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bfaac914-73ac-45fc-9c74-2b64d6df0ffc',
                tenantId: 'a7051b5c-5600-4eb2-88a5-db0d04762c01',
                systemId: 'ja5hfhkbibk1sq7pxzjumy1okpndwkdh7nob4',
                systemName: 'depw8m4qqcnt0oz27vxt',
                executionId: '816dc44c-9607-4cdf-a859-465710286163',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 02:05:31',
                executionMonitoringStartAt: '2020-07-17 07:29:03',
                executionMonitoringEndAt: '2020-07-17 04:24:46',
                error: 8153225659,
                inactive: 6423247939,
                successful: 4674621227,
                stopped: 2015338346,
                unknown: 1547406120,
                unregistered: 6780796341,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewSystemId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bfaac914-73ac-45fc-9c74-2b64d6df0ffc',
                tenantId: 'a7051b5c-5600-4eb2-88a5-db0d04762c01',
                systemId: '1340cec3-fbca-4131-8fba-c1a2a7fb826c',
                systemName: '658zns8rxezvalz5ot0z',
                executionId: '0b98fxn0qrrvtk2x0r8sk9t1wli2d4e3a9r6g',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 01:40:29',
                executionMonitoringStartAt: '2020-07-17 05:47:17',
                executionMonitoringEndAt: '2020-07-16 20:23:35',
                error: 1652507006,
                inactive: 4772553256,
                successful: 7964423029,
                stopped: 7341440664,
                unknown: 1297396336,
                unregistered: 9268912799,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionId is not allowed, must be a length of 36');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bfaac914-73ac-45fc-9c74-2b64d6df0ffc',
                tenantId: 'a7051b5c-5600-4eb2-88a5-db0d04762c01',
                systemId: '1340cec3-fbca-4131-8fba-c1a2a7fb826c',
                systemName: '332vcrb2l46he3u4sig69',
                executionId: '816dc44c-9607-4cdf-a859-465710286163',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 19:32:36',
                executionMonitoringStartAt: '2020-07-17 15:22:02',
                executionMonitoringEndAt: '2020-07-17 03:59:49',
                error: 5993773960,
                inactive: 6598583897,
                successful: 9964783600,
                stopped: 8127269509,
                unknown: 5088339120,
                unregistered: 8294888018,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewSystemName is too large, has a maximum length of 20');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewError is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bfaac914-73ac-45fc-9c74-2b64d6df0ffc',
                tenantId: 'a7051b5c-5600-4eb2-88a5-db0d04762c01',
                systemId: '1340cec3-fbca-4131-8fba-c1a2a7fb826c',
                systemName: 'd5n9x4grg795acb8dqok',
                executionId: '816dc44c-9607-4cdf-a859-465710286163',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 20:47:49',
                executionMonitoringStartAt: '2020-07-17 00:04:47',
                executionMonitoringEndAt: '2020-07-16 19:28:43',
                error: 24147728181,
                inactive: 5166224375,
                successful: 1446913228,
                stopped: 9319328230,
                unknown: 9788807795,
                unregistered: 9827512428,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewError is too large, has a maximum length of 10');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewInactive is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bfaac914-73ac-45fc-9c74-2b64d6df0ffc',
                tenantId: 'a7051b5c-5600-4eb2-88a5-db0d04762c01',
                systemId: '1340cec3-fbca-4131-8fba-c1a2a7fb826c',
                systemName: '8u23drlcca8xm4d68cqs',
                executionId: '816dc44c-9607-4cdf-a859-465710286163',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 03:57:31',
                executionMonitoringStartAt: '2020-07-16 21:24:33',
                executionMonitoringEndAt: '2020-07-17 09:21:22',
                error: 6400573213,
                inactive: 88934141910,
                successful: 1164175321,
                stopped: 9072627313,
                unknown: 6738940515,
                unregistered: 2816509379,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewInactive is too large, has a maximum length of 10');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewSuccessful is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bfaac914-73ac-45fc-9c74-2b64d6df0ffc',
                tenantId: 'a7051b5c-5600-4eb2-88a5-db0d04762c01',
                systemId: '1340cec3-fbca-4131-8fba-c1a2a7fb826c',
                systemName: 'rt41ujzigazdj7tod7ak',
                executionId: '816dc44c-9607-4cdf-a859-465710286163',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 14:52:45',
                executionMonitoringStartAt: '2020-07-17 05:07:13',
                executionMonitoringEndAt: '2020-07-17 13:38:43',
                error: 3149267326,
                inactive: 2029222280,
                successful: 75289447793,
                stopped: 6936623385,
                unknown: 9394472001,
                unregistered: 9711525947,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewSuccessful is too large, has a maximum length of 10');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewStopped is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bfaac914-73ac-45fc-9c74-2b64d6df0ffc',
                tenantId: 'a7051b5c-5600-4eb2-88a5-db0d04762c01',
                systemId: '1340cec3-fbca-4131-8fba-c1a2a7fb826c',
                systemName: '5dlywepf8ma3m5dsx17f',
                executionId: '816dc44c-9607-4cdf-a859-465710286163',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 05:42:18',
                executionMonitoringStartAt: '2020-07-17 04:02:23',
                executionMonitoringEndAt: '2020-07-16 23:02:34',
                error: 4411802307,
                inactive: 4465930118,
                successful: 6135963096,
                stopped: 78778718468,
                unknown: 6561667477,
                unregistered: 6678439243,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewStopped is too large, has a maximum length of 10');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewUnknown is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bfaac914-73ac-45fc-9c74-2b64d6df0ffc',
                tenantId: 'a7051b5c-5600-4eb2-88a5-db0d04762c01',
                systemId: '1340cec3-fbca-4131-8fba-c1a2a7fb826c',
                systemName: 's7psrgzpxv4f99wpazc2',
                executionId: '816dc44c-9607-4cdf-a859-465710286163',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 19:20:30',
                executionMonitoringStartAt: '2020-07-17 14:52:48',
                executionMonitoringEndAt: '2020-07-17 10:41:48',
                error: 4603002395,
                inactive: 5768375625,
                successful: 7381135459,
                stopped: 9178065859,
                unknown: 55111192202,
                unregistered: 1247066251,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewUnknown is too large, has a maximum length of 10');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewUnregistered is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bfaac914-73ac-45fc-9c74-2b64d6df0ffc',
                tenantId: 'a7051b5c-5600-4eb2-88a5-db0d04762c01',
                systemId: '1340cec3-fbca-4131-8fba-c1a2a7fb826c',
                systemName: 'ytvqrkm8ekkmhrbsbw8t',
                executionId: '816dc44c-9607-4cdf-a859-465710286163',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 14:56:16',
                executionMonitoringStartAt: '2020-07-16 17:48:54',
                executionMonitoringEndAt: '2020-07-17 15:37:45',
                error: 7962947621,
                inactive: 7216094682,
                successful: 5527162152,
                stopped: 6242508030,
                unknown: 1380264412,
                unregistered: 75311522885,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewUnregistered is too large, has a maximum length of 10');
            });
    });
    

    

    
    
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewError must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bfaac914-73ac-45fc-9c74-2b64d6df0ffc',
                tenantId: 'a7051b5c-5600-4eb2-88a5-db0d04762c01',
                systemId: '1340cec3-fbca-4131-8fba-c1a2a7fb826c',
                systemName: 'm5e3fdgm9sssdpubzet3',
                executionId: '816dc44c-9607-4cdf-a859-465710286163',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 19:05:03',
                executionMonitoringStartAt: '2020-07-16 23:59:23',
                executionMonitoringEndAt: '2020-07-16 18:10:30',
                error: -9,
                inactive: 1625851986,
                successful: 7548231804,
                stopped: 6833893717,
                unknown: 5253492549,
                unregistered: 4125399554,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelOverviewError must have a positive sign, this field does not accept negative values');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewInactive must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bfaac914-73ac-45fc-9c74-2b64d6df0ffc',
                tenantId: 'a7051b5c-5600-4eb2-88a5-db0d04762c01',
                systemId: '1340cec3-fbca-4131-8fba-c1a2a7fb826c',
                systemName: 'xbyy9deccg50ox38rn0j',
                executionId: '816dc44c-9607-4cdf-a859-465710286163',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 11:34:45',
                executionMonitoringStartAt: '2020-07-16 22:57:51',
                executionMonitoringEndAt: '2020-07-17 01:15:56',
                error: 2972639637,
                inactive: -9,
                successful: 7372604550,
                stopped: 6606390909,
                unknown: 5364537003,
                unregistered: 8259586642,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelOverviewInactive must have a positive sign, this field does not accept negative values');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewSuccessful must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bfaac914-73ac-45fc-9c74-2b64d6df0ffc',
                tenantId: 'a7051b5c-5600-4eb2-88a5-db0d04762c01',
                systemId: '1340cec3-fbca-4131-8fba-c1a2a7fb826c',
                systemName: '1jtg0jza91ufwj3uz9d6',
                executionId: '816dc44c-9607-4cdf-a859-465710286163',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 03:42:45',
                executionMonitoringStartAt: '2020-07-17 15:34:34',
                executionMonitoringEndAt: '2020-07-16 22:19:20',
                error: 9872998585,
                inactive: 2113814081,
                successful: -9,
                stopped: 2983063187,
                unknown: 8359935363,
                unregistered: 2688879565,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelOverviewSuccessful must have a positive sign, this field does not accept negative values');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewStopped must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bfaac914-73ac-45fc-9c74-2b64d6df0ffc',
                tenantId: 'a7051b5c-5600-4eb2-88a5-db0d04762c01',
                systemId: '1340cec3-fbca-4131-8fba-c1a2a7fb826c',
                systemName: '0nbb41s8t8sq58c9qhzz',
                executionId: '816dc44c-9607-4cdf-a859-465710286163',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 15:54:17',
                executionMonitoringStartAt: '2020-07-17 01:46:10',
                executionMonitoringEndAt: '2020-07-17 11:17:33',
                error: 7238824746,
                inactive: 1090573163,
                successful: 3427934489,
                stopped: -9,
                unknown: 8068614841,
                unregistered: 7050014391,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelOverviewStopped must have a positive sign, this field does not accept negative values');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewUnknown must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bfaac914-73ac-45fc-9c74-2b64d6df0ffc',
                tenantId: 'a7051b5c-5600-4eb2-88a5-db0d04762c01',
                systemId: '1340cec3-fbca-4131-8fba-c1a2a7fb826c',
                systemName: 'i5v5rslkqjzg8ii444l4',
                executionId: '816dc44c-9607-4cdf-a859-465710286163',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 17:03:39',
                executionMonitoringStartAt: '2020-07-17 02:14:42',
                executionMonitoringEndAt: '2020-07-17 06:27:38',
                error: 1472713203,
                inactive: 3649802040,
                successful: 2307607350,
                stopped: 4782601381,
                unknown: -9,
                unregistered: 3635939854,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelOverviewUnknown must have a positive sign, this field does not accept negative values');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewUnregistered must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bfaac914-73ac-45fc-9c74-2b64d6df0ffc',
                tenantId: 'a7051b5c-5600-4eb2-88a5-db0d04762c01',
                systemId: '1340cec3-fbca-4131-8fba-c1a2a7fb826c',
                systemName: 'dk9lw0muv63e0cuxmmzx',
                executionId: '816dc44c-9607-4cdf-a859-465710286163',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 16:21:19',
                executionMonitoringStartAt: '2020-07-17 00:10:59',
                executionMonitoringEndAt: '2020-07-17 13:41:21',
                error: 1750219101,
                inactive: 3177977639,
                successful: 1269094425,
                stopped: 5469646268,
                unknown: 6324778131,
                unregistered: -9,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelOverviewUnregistered must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bfaac914-73ac-45fc-9c74-2b64d6df0ffc',
                tenantId: 'a7051b5c-5600-4eb2-88a5-db0d04762c01',
                systemId: '1340cec3-fbca-4131-8fba-c1a2a7fb826c',
                systemName: '1ub1eqeuts8881ylz6ij',
                executionId: '816dc44c-9607-4cdf-a859-465710286163',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-17 03:48:13',
                executionMonitoringStartAt: '2020-07-16 23:42:41',
                executionMonitoringEndAt: '2020-07-17 03:32:00',
                error: 6927817377,
                inactive: 9696393019,
                successful: 7805329271,
                stopped: 6687091625,
                unknown: 9982755138,
                unregistered: 4232191705,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bfaac914-73ac-45fc-9c74-2b64d6df0ffc',
                tenantId: 'a7051b5c-5600-4eb2-88a5-db0d04762c01',
                systemId: '1340cec3-fbca-4131-8fba-c1a2a7fb826c',
                systemName: 'z1rplif9f8zrsd32u0zn',
                executionId: '816dc44c-9607-4cdf-a859-465710286163',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-17 01:10:08',
                executionMonitoringEndAt: '2020-07-17 08:44:00',
                error: 4450248260,
                inactive: 7813627696,
                successful: 4681850927,
                stopped: 1923474585,
                unknown: 4954299222,
                unregistered: 7606191560,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionExecutedAt has to be a timestamp value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionMonitoringStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bfaac914-73ac-45fc-9c74-2b64d6df0ffc',
                tenantId: 'a7051b5c-5600-4eb2-88a5-db0d04762c01',
                systemId: '1340cec3-fbca-4131-8fba-c1a2a7fb826c',
                systemName: 's6sgo3o3obm8mt6dlnol',
                executionId: '816dc44c-9607-4cdf-a859-465710286163',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 11:34:42',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-17 03:23:17',
                error: 3008945074,
                inactive: 9268448539,
                successful: 4690995046,
                stopped: 6441693649,
                unknown: 1990912004,
                unregistered: 1498656488,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionMonitoringEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bfaac914-73ac-45fc-9c74-2b64d6df0ffc',
                tenantId: 'a7051b5c-5600-4eb2-88a5-db0d04762c01',
                systemId: '1340cec3-fbca-4131-8fba-c1a2a7fb826c',
                systemName: 'a9ca54plcifdjy99f98k',
                executionId: '816dc44c-9607-4cdf-a859-465710286163',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 17:54:37',
                executionMonitoringStartAt: '2020-07-16 19:01:43',
                executionMonitoringEndAt: 'XXXXXXXX',
                error: 5060585630,
                inactive: 4706291340,
                successful: 2178474913,
                stopped: 2019588472,
                unknown: 1060073155,
                unregistered: 9883743271,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    

    it(`/REST:POST bplus-it-sappi/channel-overview`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'bfaac914-73ac-45fc-9c74-2b64d6df0ffc',
                tenantId: 'a7051b5c-5600-4eb2-88a5-db0d04762c01',
                systemId: '1340cec3-fbca-4131-8fba-c1a2a7fb826c',
                systemName: 'at87gk0cxc3ozncv3t5b',
                executionId: '816dc44c-9607-4cdf-a859-465710286163',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 21:34:53',
                executionMonitoringStartAt: '2020-07-16 22:37:21',
                executionMonitoringEndAt: '2020-07-17 08:46:40',
                error: 6329541620,
                inactive: 7007914470,
                successful: 1832549274,
                stopped: 3212839082,
                unknown: 7196527884,
                unregistered: 4423821500,
            })
            .expect(201);
    });

    it(`/REST:GET bplus-it-sappi/channels-overview/paginate`, () => 
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

    it(`/REST:GET bplus-it-sappi/channel-overview - Got 404 Not Found`, () => 
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

    it(`/REST:GET bplus-it-sappi/channel-overview`, () => 
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
                        value   : 'bfaac914-73ac-45fc-9c74-2b64d6df0ffc'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'bfaac914-73ac-45fc-9c74-2b64d6df0ffc'));
    });

    it(`/REST:GET bplus-it-sappi/channel-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel-overview/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:GET bplus-it-sappi/channel-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel-overview/bfaac914-73ac-45fc-9c74-2b64d6df0ffc')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'bfaac914-73ac-45fc-9c74-2b64d6df0ffc'));
    });

    it(`/REST:GET bplus-it-sappi/channels-overview`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channels-overview')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    it(`/REST:PUT bplus-it-sappi/channel-overview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: 'de525304-74d1-4fb0-b99d-c73fbea08692',
                tenantId: 'f2073a74-679f-4539-b0a1-6c66947cacee',
                systemId: 'f9e0bd6b-f94d-4fe8-99ad-9949a8d94118',
                systemName: 'zf9bavqupjpbm7wd53s1',
                executionId: '82bb2aaf-23a3-465a-b4f6-f15c3ea81346',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 07:32:59',
                executionMonitoringStartAt: '2020-07-17 15:31:59',
                executionMonitoringEndAt: '2020-07-16 22:04:12',
                error: 8035064741,
                inactive: 5977615971,
                successful: 5933907162,
                stopped: 7180334049,
                unknown: 9703166966,
                unregistered: 7403744981,
            })
            .expect(404);
    });

    it(`/REST:PUT bplus-it-sappi/channel-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: 'bfaac914-73ac-45fc-9c74-2b64d6df0ffc',
                tenantId: 'a7051b5c-5600-4eb2-88a5-db0d04762c01',
                systemId: '1340cec3-fbca-4131-8fba-c1a2a7fb826c',
                systemName: '6is5h3gbq72qv6pbu20l',
                executionId: '816dc44c-9607-4cdf-a859-465710286163',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 08:38:39',
                executionMonitoringStartAt: '2020-07-17 11:54:15',
                executionMonitoringEndAt: '2020-07-17 15:17:48',
                error: 8247091730,
                inactive: 5401656616,
                successful: 1717964755,
                stopped: 9369009823,
                unknown: 4833895483,
                unregistered: 1840859202,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'bfaac914-73ac-45fc-9c74-2b64d6df0ffc'));
    });

    it(`/REST:DELETE bplus-it-sappi/channel-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel-overview/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:DELETE bplus-it-sappi/channel-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel-overview/bfaac914-73ac-45fc-9c74-2b64d6df0ffc')
            .set('Accept', 'application/json')
            .expect(200);
    });

    it(`/GraphQL bplusItSappiCreateChannelOverview - Got 409 Conflict, item already exist in database`, () => 
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

    it(`/GraphQL bplusItSappiCreateChannelOverview`, () => 
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
                        id: '54e75672-4fff-4495-ac1c-fe9f312bb43a',
                        tenantId: 'a7051b5c-5600-4eb2-88a5-db0d04762c01',
                        systemId: '1340cec3-fbca-4131-8fba-c1a2a7fb826c',
                        systemName: 'xfnv1dxk5n9epi6yvpzx',
                        executionId: '816dc44c-9607-4cdf-a859-465710286163',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-17 13:46:42',
                        executionMonitoringStartAt: '2020-07-16 22:46:33',
                        executionMonitoringEndAt: '2020-07-16 23:37:15',
                        error: 1914597696,
                        inactive: 2559965633,
                        successful: 7259508210,
                        stopped: 3097267131,
                        unknown: 9812846665,
                        unregistered: 3356815763,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannelOverview).toHaveProperty('id', '54e75672-4fff-4495-ac1c-fe9f312bb43a');
            });
    });

    it(`/GraphQL bplusItSappiPaginateChannelsOverview`, () => 
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

    it(`/GraphQL bplusItSappiFindChannelOverview - Got 404 Not Found`, () => 
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

    it(`/GraphQL bplusItSappiFindChannelOverview`, () => 
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
                            value   : 'bfaac914-73ac-45fc-9c74-2b64d6df0ffc'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelOverview.id).toStrictEqual('bfaac914-73ac-45fc-9c74-2b64d6df0ffc');
            });
    });

    it(`/GraphQL bplusItSappiFindChannelOverviewById - Got 404 Not Found`, () => 
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

    it(`/GraphQL bplusItSappiFindChannelOverviewById`, () => 
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
                    id: 'bfaac914-73ac-45fc-9c74-2b64d6df0ffc'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelOverviewById.id).toStrictEqual('bfaac914-73ac-45fc-9c74-2b64d6df0ffc');
            });
    });

    it(`/GraphQL bplusItSappiGetChannelsOverview`, () => 
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

    it(`/GraphQL bplusItSappiUpdateChannelOverview - Got 404 Not Found`, () => 
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
                        
                        id: 'c6cc5075-f4f8-47cc-981a-542e472c9e48',
                        tenantId: 'e0e64713-54be-49ef-bff8-631b59d74417',
                        systemId: '0b1a5a7e-ee98-430e-8b3a-4fabc7541ec4',
                        systemName: 'ischyfojnoga6qzip02n',
                        executionId: 'c89bf280-1f15-4090-81fb-502175916299',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-17 11:51:48',
                        executionMonitoringStartAt: '2020-07-17 03:33:43',
                        executionMonitoringEndAt: '2020-07-17 11:12:11',
                        error: 8708578973,
                        inactive: 5177759233,
                        successful: 3168193229,
                        stopped: 9248636685,
                        unknown: 3529961001,
                        unregistered: 3334974457,
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

    it(`/GraphQL bplusItSappiUpdateChannelOverview`, () => 
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
                        
                        id: 'bfaac914-73ac-45fc-9c74-2b64d6df0ffc',
                        tenantId: 'a7051b5c-5600-4eb2-88a5-db0d04762c01',
                        systemId: '1340cec3-fbca-4131-8fba-c1a2a7fb826c',
                        systemName: 'mm73l2aw04n1nnjd1pat',
                        executionId: '816dc44c-9607-4cdf-a859-465710286163',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-17 12:58:26',
                        executionMonitoringStartAt: '2020-07-16 23:10:53',
                        executionMonitoringEndAt: '2020-07-17 07:12:59',
                        error: 9058437119,
                        inactive: 1371558036,
                        successful: 3315715924,
                        stopped: 5789085015,
                        unknown: 3855096265,
                        unregistered: 6338183137,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannelOverview.id).toStrictEqual('bfaac914-73ac-45fc-9c74-2b64d6df0ffc');
            });
    });

    it(`/GraphQL bplusItSappiDeleteChannelOverviewById - Got 404 Not Found`, () => 
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

    it(`/GraphQL bplusItSappiDeleteChannelOverviewById`, () => 
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
                    id: 'bfaac914-73ac-45fc-9c74-2b64d6df0ffc'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelOverviewById.id).toStrictEqual('bfaac914-73ac-45fc-9c74-2b64d6df0ffc');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});