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
                tenantId: '4a099db8-dd80-46ba-a503-b5f789d84363',
                tenantCode: '7ehec17fwin1rf0iu5l7g9ap15pguiugdba4xbr0jir9zro8nm',
                systemId: 'abf94730-83a6-4649-9b18-474b30e50025',
                systemName: 'u03khp35ee95apvstosp',
                executionId: 'bee1331c-7e69-42d1-921b-47b56204b375',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-05 20:07:54',
                executionMonitoringStartAt: '2020-11-06 09:57:35',
                executionMonitoringEndAt: '2020-11-05 15:59:33',
                error: 7568361453,
                inactive: 8350423701,
                successful: 4604317773,
                stopped: 5336010598,
                unknown: 4753613613,
                unregistered: 3606824305,
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
                
                tenantId: '4a099db8-dd80-46ba-a503-b5f789d84363',
                tenantCode: 'fq7e70aahorqx3d4wrf12ggnhvjwpimdg5nj64a5jgwevgnr37',
                systemId: 'abf94730-83a6-4649-9b18-474b30e50025',
                systemName: '62o8lzeziu6x7x1108rh',
                executionId: 'bee1331c-7e69-42d1-921b-47b56204b375',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 11:21:10',
                executionMonitoringStartAt: '2020-11-05 23:29:18',
                executionMonitoringEndAt: '2020-11-06 08:25:27',
                error: 6135654140,
                inactive: 9893474327,
                successful: 7534233279,
                stopped: 2192385023,
                unknown: 4193513971,
                unregistered: 6888199656,
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
                id: '82847bca-9c80-490c-918d-e9e4dc51ba60',
                tenantId: null,
                tenantCode: 'smw6dbhpz1ay98tha0gty2qs1o9ildqkjabeixrp32p55fqy38',
                systemId: 'abf94730-83a6-4649-9b18-474b30e50025',
                systemName: 'jskt57oy21jsr4wwyopx',
                executionId: 'bee1331c-7e69-42d1-921b-47b56204b375',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 00:03:50',
                executionMonitoringStartAt: '2020-11-05 22:54:39',
                executionMonitoringEndAt: '2020-11-06 07:09:18',
                error: 7511518901,
                inactive: 1550846427,
                successful: 7114006515,
                stopped: 2021438565,
                unknown: 7341527480,
                unregistered: 8979586083,
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
                id: '82847bca-9c80-490c-918d-e9e4dc51ba60',
                
                tenantCode: 'kweo30mqgosgr1qoz2fylu0u5xwzv1xirrvnsuz3plo3n24tun',
                systemId: 'abf94730-83a6-4649-9b18-474b30e50025',
                systemName: 's62lsqz3727llo8rsmql',
                executionId: 'bee1331c-7e69-42d1-921b-47b56204b375',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-05 22:47:43',
                executionMonitoringStartAt: '2020-11-05 23:54:20',
                executionMonitoringEndAt: '2020-11-05 13:45:38',
                error: 2109653992,
                inactive: 1293829086,
                successful: 7535583868,
                stopped: 1060405157,
                unknown: 8415717214,
                unregistered: 4151783929,
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
                id: '82847bca-9c80-490c-918d-e9e4dc51ba60',
                tenantId: '4a099db8-dd80-46ba-a503-b5f789d84363',
                tenantCode: null,
                systemId: 'abf94730-83a6-4649-9b18-474b30e50025',
                systemName: '9xskwwcyf56zmqmj2dnk',
                executionId: 'bee1331c-7e69-42d1-921b-47b56204b375',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 12:45:41',
                executionMonitoringStartAt: '2020-11-06 11:07:42',
                executionMonitoringEndAt: '2020-11-06 06:54:19',
                error: 8404203716,
                inactive: 8575697325,
                successful: 6381882014,
                stopped: 6502401401,
                unknown: 3149885176,
                unregistered: 7025880858,
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
                id: '82847bca-9c80-490c-918d-e9e4dc51ba60',
                tenantId: '4a099db8-dd80-46ba-a503-b5f789d84363',
                
                systemId: 'abf94730-83a6-4649-9b18-474b30e50025',
                systemName: '8nl5jqtx857482dtrpfd',
                executionId: 'bee1331c-7e69-42d1-921b-47b56204b375',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-06 07:06:45',
                executionMonitoringStartAt: '2020-11-05 13:18:48',
                executionMonitoringEndAt: '2020-11-06 07:37:42',
                error: 7958994137,
                inactive: 4812103223,
                successful: 4291367599,
                stopped: 7189519711,
                unknown: 4455504424,
                unregistered: 8484108833,
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
                id: '82847bca-9c80-490c-918d-e9e4dc51ba60',
                tenantId: '4a099db8-dd80-46ba-a503-b5f789d84363',
                tenantCode: 'np587e8t7g254tkegbr9vajd78almk6qjgsum4z7rd6g19bxpv',
                systemId: null,
                systemName: '0bh1k8d28f67mrnz5fms',
                executionId: 'bee1331c-7e69-42d1-921b-47b56204b375',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-06 06:36:09',
                executionMonitoringStartAt: '2020-11-06 11:32:33',
                executionMonitoringEndAt: '2020-11-05 14:28:54',
                error: 6839348552,
                inactive: 3561228687,
                successful: 6127850945,
                stopped: 6881346755,
                unknown: 7254141659,
                unregistered: 4967585158,
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
                id: '82847bca-9c80-490c-918d-e9e4dc51ba60',
                tenantId: '4a099db8-dd80-46ba-a503-b5f789d84363',
                tenantCode: 'or3lfku85y8xpqmem3zcpg1x2t9v1564u0romytrpdldhxrqeg',
                
                systemName: 'yl815et2ymcvfmebehtp',
                executionId: 'bee1331c-7e69-42d1-921b-47b56204b375',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 22:28:24',
                executionMonitoringStartAt: '2020-11-05 21:39:04',
                executionMonitoringEndAt: '2020-11-05 20:00:49',
                error: 5979599669,
                inactive: 9948339350,
                successful: 3655240177,
                stopped: 4494909589,
                unknown: 8856765234,
                unregistered: 2040044388,
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
                id: '82847bca-9c80-490c-918d-e9e4dc51ba60',
                tenantId: '4a099db8-dd80-46ba-a503-b5f789d84363',
                tenantCode: '0hfr5umahx4bouh2unoi3903q7djuv8xmk15xm1uorvfn2gv9l',
                systemId: 'abf94730-83a6-4649-9b18-474b30e50025',
                systemName: null,
                executionId: 'bee1331c-7e69-42d1-921b-47b56204b375',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 05:45:25',
                executionMonitoringStartAt: '2020-11-06 04:55:24',
                executionMonitoringEndAt: '2020-11-06 07:17:31',
                error: 9181387875,
                inactive: 1081846158,
                successful: 6621477867,
                stopped: 4985905209,
                unknown: 1358232503,
                unregistered: 9342466745,
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
                id: '82847bca-9c80-490c-918d-e9e4dc51ba60',
                tenantId: '4a099db8-dd80-46ba-a503-b5f789d84363',
                tenantCode: 'ffa4qomperaxc54ikm433h0mb7wz1n66c9irgzq2p936t85vck',
                systemId: 'abf94730-83a6-4649-9b18-474b30e50025',
                
                executionId: 'bee1331c-7e69-42d1-921b-47b56204b375',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-06 08:05:41',
                executionMonitoringStartAt: '2020-11-06 05:12:48',
                executionMonitoringEndAt: '2020-11-06 09:14:19',
                error: 6405317130,
                inactive: 9834908392,
                successful: 4643804571,
                stopped: 6463347585,
                unknown: 5662699011,
                unregistered: 8885791061,
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
                id: '82847bca-9c80-490c-918d-e9e4dc51ba60',
                tenantId: '4a099db8-dd80-46ba-a503-b5f789d84363',
                tenantCode: '3cf97xyxkm3yjt1i9mh3ih80x7peoxcxqgxyrxwcvf8lefwdup',
                systemId: 'abf94730-83a6-4649-9b18-474b30e50025',
                systemName: 'rdpg8m57eta4npym88jz',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-05 18:47:53',
                executionMonitoringStartAt: '2020-11-05 22:39:35',
                executionMonitoringEndAt: '2020-11-06 03:32:15',
                error: 4806614727,
                inactive: 3932852445,
                successful: 6870628763,
                stopped: 1541839459,
                unknown: 8106876910,
                unregistered: 2383298748,
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
                id: '82847bca-9c80-490c-918d-e9e4dc51ba60',
                tenantId: '4a099db8-dd80-46ba-a503-b5f789d84363',
                tenantCode: 'rc9hxzxdkxvu2a4d10jwe2i5jqx1g90ig0e53a8n99tu6hzs6q',
                systemId: 'abf94730-83a6-4649-9b18-474b30e50025',
                systemName: '6qt3c2ib1lvgng134ap4',
                
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 22:27:08',
                executionMonitoringStartAt: '2020-11-05 17:57:56',
                executionMonitoringEndAt: '2020-11-06 07:10:57',
                error: 9209166789,
                inactive: 9026234535,
                successful: 2485842036,
                stopped: 3870933128,
                unknown: 6413763040,
                unregistered: 1888798040,
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
                id: '82847bca-9c80-490c-918d-e9e4dc51ba60',
                tenantId: '4a099db8-dd80-46ba-a503-b5f789d84363',
                tenantCode: 'znjvqvlyfm6xbgs33g74mt5yux55llju4as8mukmcr73z24wp7',
                systemId: 'abf94730-83a6-4649-9b18-474b30e50025',
                systemName: '9w01lh6ttm8effa0siik',
                executionId: 'bee1331c-7e69-42d1-921b-47b56204b375',
                executionType: null,
                executionExecutedAt: '2020-11-06 07:57:09',
                executionMonitoringStartAt: '2020-11-06 10:45:24',
                executionMonitoringEndAt: '2020-11-06 01:35:07',
                error: 7402636995,
                inactive: 5404425190,
                successful: 3041831550,
                stopped: 8485243462,
                unknown: 4014418552,
                unregistered: 2764481223,
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
                id: '82847bca-9c80-490c-918d-e9e4dc51ba60',
                tenantId: '4a099db8-dd80-46ba-a503-b5f789d84363',
                tenantCode: '1pt0lrkjnzxz6t2pumq6gdaabgjdsi935g4bp3peqmesclu94m',
                systemId: 'abf94730-83a6-4649-9b18-474b30e50025',
                systemName: 'x6oi6grq4qmhkj71o5gu',
                executionId: 'bee1331c-7e69-42d1-921b-47b56204b375',
                
                executionExecutedAt: '2020-11-05 15:02:17',
                executionMonitoringStartAt: '2020-11-06 06:45:40',
                executionMonitoringEndAt: '2020-11-06 10:49:11',
                error: 7292261541,
                inactive: 1798452411,
                successful: 8491100190,
                stopped: 1071308947,
                unknown: 4157722356,
                unregistered: 9195373449,
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
                id: '82847bca-9c80-490c-918d-e9e4dc51ba60',
                tenantId: '4a099db8-dd80-46ba-a503-b5f789d84363',
                tenantCode: '1qb5yxn7gzkncu3t82vfksjoyk2fgwinne5y5wy8hkbbf1lyrl',
                systemId: 'abf94730-83a6-4649-9b18-474b30e50025',
                systemName: 'cw2ge3o2ymrwpa9u0muq',
                executionId: 'bee1331c-7e69-42d1-921b-47b56204b375',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-11-05 15:45:30',
                executionMonitoringEndAt: '2020-11-06 02:42:43',
                error: 6507220478,
                inactive: 5915569650,
                successful: 5911184371,
                stopped: 2755748479,
                unknown: 5736330764,
                unregistered: 3625364413,
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
                id: '82847bca-9c80-490c-918d-e9e4dc51ba60',
                tenantId: '4a099db8-dd80-46ba-a503-b5f789d84363',
                tenantCode: 'rp9wl40nl0mktf78w9qcfs879w5tso4s7hfefuiwha9csrhce7',
                systemId: 'abf94730-83a6-4649-9b18-474b30e50025',
                systemName: 'fezqw9jqt4xx14f3d5bt',
                executionId: 'bee1331c-7e69-42d1-921b-47b56204b375',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-11-05 12:57:32',
                executionMonitoringEndAt: '2020-11-06 05:26:12',
                error: 2589095437,
                inactive: 3431685785,
                successful: 8839609555,
                stopped: 7948407688,
                unknown: 3406351726,
                unregistered: 7237257327,
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
                id: '82847bca-9c80-490c-918d-e9e4dc51ba60',
                tenantId: '4a099db8-dd80-46ba-a503-b5f789d84363',
                tenantCode: '21uby3d6l8snwu8n6eg42xvv8ubevj43f4ouujpjh0d0tayi07',
                systemId: 'abf94730-83a6-4649-9b18-474b30e50025',
                systemName: 'etcx2i8qrasnvf7jrnrl',
                executionId: 'bee1331c-7e69-42d1-921b-47b56204b375',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-06 02:21:59',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-11-06 10:41:41',
                error: 8843338407,
                inactive: 2533331282,
                successful: 4635153436,
                stopped: 7646448434,
                unknown: 2114723677,
                unregistered: 3296199752,
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
                id: '82847bca-9c80-490c-918d-e9e4dc51ba60',
                tenantId: '4a099db8-dd80-46ba-a503-b5f789d84363',
                tenantCode: 'wkpxaeqk8kjgnq8bwzotmjl7ja4wzoetiolu8nyu2ozjsdhoze',
                systemId: 'abf94730-83a6-4649-9b18-474b30e50025',
                systemName: '6iamys8aajznly4q5k8g',
                executionId: 'bee1331c-7e69-42d1-921b-47b56204b375',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 14:59:32',
                
                executionMonitoringEndAt: '2020-11-05 19:17:16',
                error: 3298134117,
                inactive: 9057286811,
                successful: 4640785204,
                stopped: 3013187480,
                unknown: 9064623307,
                unregistered: 1016870945,
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
                id: '82847bca-9c80-490c-918d-e9e4dc51ba60',
                tenantId: '4a099db8-dd80-46ba-a503-b5f789d84363',
                tenantCode: 'qnqhjwsdblwq8z3cr2wk1ri74rz67yps8fzimcdg7evfyrcrr1',
                systemId: 'abf94730-83a6-4649-9b18-474b30e50025',
                systemName: '04yvfxlklp7153s6c2s8',
                executionId: 'bee1331c-7e69-42d1-921b-47b56204b375',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-05 19:11:37',
                executionMonitoringStartAt: '2020-11-06 05:49:08',
                executionMonitoringEndAt: null,
                error: 3864683138,
                inactive: 9854609479,
                successful: 9520600572,
                stopped: 2558010617,
                unknown: 5212331649,
                unregistered: 8375811441,
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
                id: '82847bca-9c80-490c-918d-e9e4dc51ba60',
                tenantId: '4a099db8-dd80-46ba-a503-b5f789d84363',
                tenantCode: 'c35ox5d7uwr9jtsgg7gdofdqdknlo89y4528iki3ju9t0825co',
                systemId: 'abf94730-83a6-4649-9b18-474b30e50025',
                systemName: 'qv92pc7t2bemnc4s332u',
                executionId: 'bee1331c-7e69-42d1-921b-47b56204b375',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-06 01:34:46',
                executionMonitoringStartAt: '2020-11-05 16:09:19',
                
                error: 6675013494,
                inactive: 5469416194,
                successful: 4283398820,
                stopped: 4548417983,
                unknown: 4780014978,
                unregistered: 8633685771,
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
                id: 'diu9ebjc2634kstolx38yiqmst4zp7hqw701q',
                tenantId: '4a099db8-dd80-46ba-a503-b5f789d84363',
                tenantCode: 'xeurjwy8cii1569qt69tqcx6d37mlpfp6vkfji3bk7a9ctlle3',
                systemId: 'abf94730-83a6-4649-9b18-474b30e50025',
                systemName: '1xo155c1shk146buofwl',
                executionId: 'bee1331c-7e69-42d1-921b-47b56204b375',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-06 03:15:16',
                executionMonitoringStartAt: '2020-11-05 13:56:48',
                executionMonitoringEndAt: '2020-11-05 13:52:23',
                error: 8794377381,
                inactive: 8122911405,
                successful: 2046230004,
                stopped: 8328196317,
                unknown: 7927525795,
                unregistered: 1358538520,
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
                id: '82847bca-9c80-490c-918d-e9e4dc51ba60',
                tenantId: 'u2nbsiohjwofb0egmt8jpfb9olyqq2zmxf1xv',
                tenantCode: 'hh3wym0j5tewiurhvz84u60df3dg53i3hkrmveud5okonvu84h',
                systemId: 'abf94730-83a6-4649-9b18-474b30e50025',
                systemName: 'lzu1tnbpul0aiyxivg6g',
                executionId: 'bee1331c-7e69-42d1-921b-47b56204b375',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-05 19:20:14',
                executionMonitoringStartAt: '2020-11-06 10:08:24',
                executionMonitoringEndAt: '2020-11-06 07:36:14',
                error: 6064268086,
                inactive: 6992129968,
                successful: 6471543990,
                stopped: 4258665543,
                unknown: 4219846666,
                unregistered: 5117210628,
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
                id: '82847bca-9c80-490c-918d-e9e4dc51ba60',
                tenantId: '4a099db8-dd80-46ba-a503-b5f789d84363',
                tenantCode: 'v96nz04zb95ipgoflqvgs48b54aepaxq00hdk90wiiy4ppsy75',
                systemId: '9ot9yzo4nned8n2fgculglx0ztavk0s4l3ovn',
                systemName: 'buj5hlo271d0mdillxi8',
                executionId: 'bee1331c-7e69-42d1-921b-47b56204b375',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 04:59:42',
                executionMonitoringStartAt: '2020-11-05 20:14:00',
                executionMonitoringEndAt: '2020-11-06 07:53:51',
                error: 8420112896,
                inactive: 5548683354,
                successful: 1320719625,
                stopped: 4865500816,
                unknown: 5631231800,
                unregistered: 3224734466,
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
                id: '82847bca-9c80-490c-918d-e9e4dc51ba60',
                tenantId: '4a099db8-dd80-46ba-a503-b5f789d84363',
                tenantCode: 'ielqa1qt6ptvrgyylomrnpcjq96ltn2doqxru9rpq8a9tbehuw',
                systemId: 'abf94730-83a6-4649-9b18-474b30e50025',
                systemName: '8r449alncqq0b54y298a',
                executionId: '05jj9rvwon7l30qbt24x4jksii73iyc8h1yvi',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-05 20:47:36',
                executionMonitoringStartAt: '2020-11-05 23:13:50',
                executionMonitoringEndAt: '2020-11-06 09:52:32',
                error: 9629980151,
                inactive: 3472632199,
                successful: 5139572022,
                stopped: 2717973126,
                unknown: 8267762412,
                unregistered: 1657674351,
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
                id: '82847bca-9c80-490c-918d-e9e4dc51ba60',
                tenantId: '4a099db8-dd80-46ba-a503-b5f789d84363',
                tenantCode: '4kiqmq2o5pet9ssqfwxhqkopvkdm27iy6xnszyha3ynv8wxxiuz',
                systemId: 'abf94730-83a6-4649-9b18-474b30e50025',
                systemName: 'dnm2fl3wgn8paz25efqf',
                executionId: 'bee1331c-7e69-42d1-921b-47b56204b375',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 21:46:24',
                executionMonitoringStartAt: '2020-11-05 16:06:30',
                executionMonitoringEndAt: '2020-11-06 04:06:50',
                error: 5338893965,
                inactive: 8741566437,
                successful: 5927450958,
                stopped: 6465930837,
                unknown: 7722063889,
                unregistered: 5186616262,
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
                id: '82847bca-9c80-490c-918d-e9e4dc51ba60',
                tenantId: '4a099db8-dd80-46ba-a503-b5f789d84363',
                tenantCode: '3yla8omuq3v3o6ancehg3bpfqsqbobzzqf1w3uwfemgdx70qtc',
                systemId: 'abf94730-83a6-4649-9b18-474b30e50025',
                systemName: 'pt29a04nb34sblu58z0kj',
                executionId: 'bee1331c-7e69-42d1-921b-47b56204b375',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-06 08:06:49',
                executionMonitoringStartAt: '2020-11-05 17:19:12',
                executionMonitoringEndAt: '2020-11-06 00:06:39',
                error: 1800494228,
                inactive: 9998527290,
                successful: 8225834761,
                stopped: 7885955750,
                unknown: 2956193213,
                unregistered: 5371721242,
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
                id: '82847bca-9c80-490c-918d-e9e4dc51ba60',
                tenantId: '4a099db8-dd80-46ba-a503-b5f789d84363',
                tenantCode: 'z17ng5uixbic36tmp6758kduygdawu7wvbk5jkw85rowazf5wy',
                systemId: 'abf94730-83a6-4649-9b18-474b30e50025',
                systemName: 'oczmcahncpc722c9rwzs',
                executionId: 'bee1331c-7e69-42d1-921b-47b56204b375',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 12:40:59',
                executionMonitoringStartAt: '2020-11-06 08:31:00',
                executionMonitoringEndAt: '2020-11-06 00:13:32',
                error: 40045760737,
                inactive: 9646398035,
                successful: 7496097904,
                stopped: 5105603937,
                unknown: 9149764602,
                unregistered: 4718191840,
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
                id: '82847bca-9c80-490c-918d-e9e4dc51ba60',
                tenantId: '4a099db8-dd80-46ba-a503-b5f789d84363',
                tenantCode: '4xkfr55ucxwk4jbtf578g405miumxxhnnl4chxrkmldxmp49wq',
                systemId: 'abf94730-83a6-4649-9b18-474b30e50025',
                systemName: 'hw7p9r63i5kl351rty14',
                executionId: 'bee1331c-7e69-42d1-921b-47b56204b375',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-06 06:38:05',
                executionMonitoringStartAt: '2020-11-05 13:03:20',
                executionMonitoringEndAt: '2020-11-05 12:11:43',
                error: 9598533072,
                inactive: 77294396926,
                successful: 5822295051,
                stopped: 3149760532,
                unknown: 6864842136,
                unregistered: 2256445107,
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
                id: '82847bca-9c80-490c-918d-e9e4dc51ba60',
                tenantId: '4a099db8-dd80-46ba-a503-b5f789d84363',
                tenantCode: 'wdjfyaddd2vbcq3xsc84fe74w4td75whw3zmu79p0bt7f6g7th',
                systemId: 'abf94730-83a6-4649-9b18-474b30e50025',
                systemName: 'jdpbks0ng0rlhs81ap4o',
                executionId: 'bee1331c-7e69-42d1-921b-47b56204b375',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-05 19:06:09',
                executionMonitoringStartAt: '2020-11-06 01:52:14',
                executionMonitoringEndAt: '2020-11-06 00:58:41',
                error: 9738673832,
                inactive: 2272447093,
                successful: 29647201622,
                stopped: 8683425674,
                unknown: 5890158844,
                unregistered: 9833424807,
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
                id: '82847bca-9c80-490c-918d-e9e4dc51ba60',
                tenantId: '4a099db8-dd80-46ba-a503-b5f789d84363',
                tenantCode: 'pzks4gca2zsprvnquzilta23wlsfsyjk1hf1freugws8rmba4z',
                systemId: 'abf94730-83a6-4649-9b18-474b30e50025',
                systemName: 'ybzbwb07f7bx2e9woqey',
                executionId: 'bee1331c-7e69-42d1-921b-47b56204b375',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 20:36:27',
                executionMonitoringStartAt: '2020-11-05 23:29:17',
                executionMonitoringEndAt: '2020-11-06 00:54:00',
                error: 6904959143,
                inactive: 9219598650,
                successful: 7689536506,
                stopped: 86293853534,
                unknown: 1178341562,
                unregistered: 1902613514,
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
                id: '82847bca-9c80-490c-918d-e9e4dc51ba60',
                tenantId: '4a099db8-dd80-46ba-a503-b5f789d84363',
                tenantCode: 'efjwanq4a4mwxuqbg5f7czy0hw7acpp63tacihgmnruz0orrz7',
                systemId: 'abf94730-83a6-4649-9b18-474b30e50025',
                systemName: '95zkjfx111vruafd6lni',
                executionId: 'bee1331c-7e69-42d1-921b-47b56204b375',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 04:05:52',
                executionMonitoringStartAt: '2020-11-06 08:30:08',
                executionMonitoringEndAt: '2020-11-05 13:44:48',
                error: 1857158506,
                inactive: 1600613186,
                successful: 4338185438,
                stopped: 7182760939,
                unknown: 39854055437,
                unregistered: 2574164699,
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
                id: '82847bca-9c80-490c-918d-e9e4dc51ba60',
                tenantId: '4a099db8-dd80-46ba-a503-b5f789d84363',
                tenantCode: 'j2b4mt5gw42e45ce836sxeawq4m59v2iecs9n0wf1dpbb2l2kf',
                systemId: 'abf94730-83a6-4649-9b18-474b30e50025',
                systemName: 'bmesas7h2f8bdxmlwyhn',
                executionId: 'bee1331c-7e69-42d1-921b-47b56204b375',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 23:51:13',
                executionMonitoringStartAt: '2020-11-05 20:53:21',
                executionMonitoringEndAt: '2020-11-06 11:20:31',
                error: 4614748978,
                inactive: 5386099551,
                successful: 5327673841,
                stopped: 5739021842,
                unknown: 8076572042,
                unregistered: 63623450468,
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
                id: '82847bca-9c80-490c-918d-e9e4dc51ba60',
                tenantId: '4a099db8-dd80-46ba-a503-b5f789d84363',
                tenantCode: 'sbnqnwsq91et6n56mqfkuboll8occ5zih7rqrxrwjprn7ciftr',
                systemId: 'abf94730-83a6-4649-9b18-474b30e50025',
                systemName: 'kja57nnm0rio94szgwem',
                executionId: 'bee1331c-7e69-42d1-921b-47b56204b375',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-06 09:26:11',
                executionMonitoringStartAt: '2020-11-05 21:14:37',
                executionMonitoringEndAt: '2020-11-06 11:10:10',
                error: -9,
                inactive: 3859890283,
                successful: 5080427352,
                stopped: 9387075324,
                unknown: 2224168477,
                unregistered: 2467059860,
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
                id: '82847bca-9c80-490c-918d-e9e4dc51ba60',
                tenantId: '4a099db8-dd80-46ba-a503-b5f789d84363',
                tenantCode: 'oe2ii0wbizd9e0m3l2s4bu2dbpzjrs5qj0zo3vct9ogl48t70p',
                systemId: 'abf94730-83a6-4649-9b18-474b30e50025',
                systemName: 'mft9r5giqmrhkrwlihbh',
                executionId: 'bee1331c-7e69-42d1-921b-47b56204b375',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 17:14:44',
                executionMonitoringStartAt: '2020-11-05 18:58:09',
                executionMonitoringEndAt: '2020-11-05 23:51:03',
                error: 7516575396,
                inactive: -9,
                successful: 5385827920,
                stopped: 9192672439,
                unknown: 3026539452,
                unregistered: 5813002360,
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
                id: '82847bca-9c80-490c-918d-e9e4dc51ba60',
                tenantId: '4a099db8-dd80-46ba-a503-b5f789d84363',
                tenantCode: 'g1x210n1s2m82ao3g9uuxnxjsigk0v69kj87v4y0vt34fmcsfd',
                systemId: 'abf94730-83a6-4649-9b18-474b30e50025',
                systemName: 'fmlhft03jwfe812t1f46',
                executionId: 'bee1331c-7e69-42d1-921b-47b56204b375',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 03:09:36',
                executionMonitoringStartAt: '2020-11-05 14:13:25',
                executionMonitoringEndAt: '2020-11-06 08:48:52',
                error: 5447557851,
                inactive: 1875098249,
                successful: -9,
                stopped: 5574254159,
                unknown: 2396823364,
                unregistered: 9728611266,
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
                id: '82847bca-9c80-490c-918d-e9e4dc51ba60',
                tenantId: '4a099db8-dd80-46ba-a503-b5f789d84363',
                tenantCode: 'rsm2zlwd1h63sw5e9c6t48v8830mwqaepr5pm2gqhl99bdj6su',
                systemId: 'abf94730-83a6-4649-9b18-474b30e50025',
                systemName: 'n6h7drfpv8ckqacod2pw',
                executionId: 'bee1331c-7e69-42d1-921b-47b56204b375',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-06 11:23:18',
                executionMonitoringStartAt: '2020-11-06 01:29:56',
                executionMonitoringEndAt: '2020-11-06 03:53:29',
                error: 5149654609,
                inactive: 3196832663,
                successful: 9278797594,
                stopped: -9,
                unknown: 8334311747,
                unregistered: 1876182345,
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
                id: '82847bca-9c80-490c-918d-e9e4dc51ba60',
                tenantId: '4a099db8-dd80-46ba-a503-b5f789d84363',
                tenantCode: 'u3077jz1pd4qco2khjds60pwzf9i0lppymkiveodhfsp9eb8uu',
                systemId: 'abf94730-83a6-4649-9b18-474b30e50025',
                systemName: 'c2et1cpn0yujr7yock4l',
                executionId: 'bee1331c-7e69-42d1-921b-47b56204b375',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-05 22:57:02',
                executionMonitoringStartAt: '2020-11-05 20:53:35',
                executionMonitoringEndAt: '2020-11-06 09:26:06',
                error: 9823110499,
                inactive: 5384335124,
                successful: 5086347523,
                stopped: 7960986645,
                unknown: -9,
                unregistered: 4537727301,
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
                id: '82847bca-9c80-490c-918d-e9e4dc51ba60',
                tenantId: '4a099db8-dd80-46ba-a503-b5f789d84363',
                tenantCode: 'rqs2i3l767kl253gmo0b14inqqbyg45whb4pcqu17f8xjypqdw',
                systemId: 'abf94730-83a6-4649-9b18-474b30e50025',
                systemName: 'phkl7x7indq4gl6rpcne',
                executionId: 'bee1331c-7e69-42d1-921b-47b56204b375',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-05 19:25:35',
                executionMonitoringStartAt: '2020-11-06 07:56:10',
                executionMonitoringEndAt: '2020-11-06 01:55:16',
                error: 6021769279,
                inactive: 5393501852,
                successful: 7559548444,
                stopped: 4232512061,
                unknown: 8415479876,
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
                id: '82847bca-9c80-490c-918d-e9e4dc51ba60',
                tenantId: '4a099db8-dd80-46ba-a503-b5f789d84363',
                tenantCode: 'xyjehqzp3vev5rjvc8hyjjar5hh8p0pvcndxsc272n9r7qcmv9',
                systemId: 'abf94730-83a6-4649-9b18-474b30e50025',
                systemName: 'h95ncxa7u6ea9lizal8j',
                executionId: 'bee1331c-7e69-42d1-921b-47b56204b375',
                executionType: 'XXXX',
                executionExecutedAt: '2020-11-06 04:33:28',
                executionMonitoringStartAt: '2020-11-05 23:54:04',
                executionMonitoringEndAt: '2020-11-06 01:38:41',
                error: 9701170258,
                inactive: 1202121750,
                successful: 8607235252,
                stopped: 9590809876,
                unknown: 8794944583,
                unregistered: 4162312023,
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
                id: '82847bca-9c80-490c-918d-e9e4dc51ba60',
                tenantId: '4a099db8-dd80-46ba-a503-b5f789d84363',
                tenantCode: 'in3dir1da43ezpzleq3gl5eurlnz3midppxzgenfdq81z4ia18',
                systemId: 'abf94730-83a6-4649-9b18-474b30e50025',
                systemName: 'v7n8f90a46bclv495scr',
                executionId: 'bee1331c-7e69-42d1-921b-47b56204b375',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-11-05 15:39:39',
                executionMonitoringEndAt: '2020-11-05 12:27:03',
                error: 8153404995,
                inactive: 8815385603,
                successful: 7767825783,
                stopped: 4527294195,
                unknown: 2720844770,
                unregistered: 5058701682,
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
                id: '82847bca-9c80-490c-918d-e9e4dc51ba60',
                tenantId: '4a099db8-dd80-46ba-a503-b5f789d84363',
                tenantCode: 'yxcub81xu5w5iq7l4q3o57grp26yctrapi7my6yd7u5o3v8hbv',
                systemId: 'abf94730-83a6-4649-9b18-474b30e50025',
                systemName: 'xmppky0w3da914e5ephd',
                executionId: 'bee1331c-7e69-42d1-921b-47b56204b375',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-05 14:17:06',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-11-06 02:56:43',
                error: 9334826296,
                inactive: 1180312805,
                successful: 6548390167,
                stopped: 1920385551,
                unknown: 4715680167,
                unregistered: 9040426410,
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
                id: '82847bca-9c80-490c-918d-e9e4dc51ba60',
                tenantId: '4a099db8-dd80-46ba-a503-b5f789d84363',
                tenantCode: 'd37x8lz0n5n65iytlloenkanlnurugmopgbzgtsytnrsnpilbb',
                systemId: 'abf94730-83a6-4649-9b18-474b30e50025',
                systemName: 'ebk5w8dhsg8ruhdt1lyq',
                executionId: 'bee1331c-7e69-42d1-921b-47b56204b375',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-05 23:53:27',
                executionMonitoringStartAt: '2020-11-05 17:06:30',
                executionMonitoringEndAt: 'XXXXXXXX',
                error: 5978693690,
                inactive: 5954928018,
                successful: 9568249051,
                stopped: 3177857440,
                unknown: 4567633750,
                unregistered: 1076110781,
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
                id: '82847bca-9c80-490c-918d-e9e4dc51ba60',
                tenantId: '4a099db8-dd80-46ba-a503-b5f789d84363',
                tenantCode: 'ahnaqp61bkbnnpudydagt0x0nnyfp0m5xu3qmhv2i0opoyf8nq',
                systemId: 'abf94730-83a6-4649-9b18-474b30e50025',
                systemName: 'xo93j7a33t8il208ezcs',
                executionId: 'bee1331c-7e69-42d1-921b-47b56204b375',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 15:26:06',
                executionMonitoringStartAt: '2020-11-06 05:16:53',
                executionMonitoringEndAt: '2020-11-06 01:27:50',
                error: 2907403119,
                inactive: 9580526277,
                successful: 8004569553,
                stopped: 7899505221,
                unknown: 9054870974,
                unregistered: 4868840073,
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
                        id: '95a84fbc-3f9d-4d31-98c2-f60cbd21a61d'
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
                        id: '82847bca-9c80-490c-918d-e9e4dc51ba60'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '82847bca-9c80-490c-918d-e9e4dc51ba60'));
    });

    test(`/REST:GET cci/channel-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channel-overview/7b06351f-fc80-48c5-af16-fcaf486e3112')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/channel-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channel-overview/82847bca-9c80-490c-918d-e9e4dc51ba60')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '82847bca-9c80-490c-918d-e9e4dc51ba60'));
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
                
                id: 'b4756a0f-a2e0-48ed-84e2-95ec561c9a79',
                tenantId: '522b2481-cade-4478-a0f3-948766a2f488',
                tenantCode: 'hfxvdavk9v2p9fn6l0njr2qoalmrpope5nw1k52io45crc6no1',
                systemId: 'f2727b6c-4082-4716-b46c-14749654aa88',
                systemName: '6qq3tfl6cipowhig0a0j',
                executionId: '7d3747e8-f3ce-4d16-af08-44eef25b10d3',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 10:50:57',
                executionMonitoringStartAt: '2020-11-06 02:35:45',
                executionMonitoringEndAt: '2020-11-06 04:19:43',
                error: 8694266808,
                inactive: 7928109614,
                successful: 7488182768,
                stopped: 6493816249,
                unknown: 4648176831,
                unregistered: 4737735048,
            })
            .expect(404);
    });

    test(`/REST:PUT cci/channel-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/channel-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: '82847bca-9c80-490c-918d-e9e4dc51ba60',
                tenantId: '4a099db8-dd80-46ba-a503-b5f789d84363',
                tenantCode: '22lcz710x5p92pdt8xyq7cp0hg3hhzyx6dzu1zbvnty8g6yd97',
                systemId: 'abf94730-83a6-4649-9b18-474b30e50025',
                systemName: '5inaj6h374vwfasveety',
                executionId: 'bee1331c-7e69-42d1-921b-47b56204b375',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-06 01:36:08',
                executionMonitoringStartAt: '2020-11-05 23:27:35',
                executionMonitoringEndAt: '2020-11-06 10:55:20',
                error: 7524072129,
                inactive: 4514418845,
                successful: 4207331365,
                stopped: 9412714073,
                unknown: 6258290671,
                unregistered: 2450066918,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '82847bca-9c80-490c-918d-e9e4dc51ba60'));
    });

    test(`/REST:DELETE cci/channel-overview/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/channel-overview/fde2b975-94ac-4b73-8f16-4b583035c86f')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/channel-overview/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/channel-overview/82847bca-9c80-490c-918d-e9e4dc51ba60')
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
                        id: '769be8cd-3ccb-4b8f-887c-01b07a4bca9d',
                        tenantId: '4a099db8-dd80-46ba-a503-b5f789d84363',
                        tenantCode: 'ihgej3e8kokns6t21i3oc9q2mipl78e1ndh6lc3e937gusnaz0',
                        systemId: 'abf94730-83a6-4649-9b18-474b30e50025',
                        systemName: 'b3p18hc9wru5b0lb1w9v',
                        executionId: 'bee1331c-7e69-42d1-921b-47b56204b375',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-11-05 15:24:46',
                        executionMonitoringStartAt: '2020-11-06 08:34:48',
                        executionMonitoringEndAt: '2020-11-06 03:29:25',
                        error: 9814361136,
                        inactive: 7240839490,
                        successful: 6040396202,
                        stopped: 5912827059,
                        unknown: 3454536949,
                        unregistered: 9096623588,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateChannelOverview).toHaveProperty('id', '769be8cd-3ccb-4b8f-887c-01b07a4bca9d');
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
                            id: 'd97acbf5-1144-4148-a42d-9136920d893e'
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
                            id: '82847bca-9c80-490c-918d-e9e4dc51ba60'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindChannelOverview.id).toStrictEqual('82847bca-9c80-490c-918d-e9e4dc51ba60');
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
                    id: 'aa7c6829-ccdf-4203-9605-60c6e7bb0f72'
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
                    id: '82847bca-9c80-490c-918d-e9e4dc51ba60'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindChannelOverviewById.id).toStrictEqual('82847bca-9c80-490c-918d-e9e4dc51ba60');
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
                        
                        id: '6217d1e6-a15a-4286-8778-98bb55884243',
                        tenantId: '398bec71-9359-4e89-8fb8-bbf2bf51a1e9',
                        tenantCode: 'c8sllhqxcrur7khuq0cdcn0zjhy0i9bnyb5tzzxj2aca2sqd48',
                        systemId: 'bb3b9426-22e4-4f55-ac7b-fdb93b63303a',
                        systemName: 'j7imdxeuv23c8fucwof9',
                        executionId: '33ffad59-a277-4a49-8804-704fbd285e9e',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-11-06 01:29:39',
                        executionMonitoringStartAt: '2020-11-06 00:20:15',
                        executionMonitoringEndAt: '2020-11-06 08:06:46',
                        error: 5179026419,
                        inactive: 2183049489,
                        successful: 1619173227,
                        stopped: 6313520058,
                        unknown: 6448458194,
                        unregistered: 5927964159,
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
                        
                        id: '82847bca-9c80-490c-918d-e9e4dc51ba60',
                        tenantId: '4a099db8-dd80-46ba-a503-b5f789d84363',
                        tenantCode: 'm8rz3jjriyfs84i21be2uduj4exgi68n8xtaudeei0jzc7ecoy',
                        systemId: 'abf94730-83a6-4649-9b18-474b30e50025',
                        systemName: 'p6batns72b0y6ra7mfkv',
                        executionId: 'bee1331c-7e69-42d1-921b-47b56204b375',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-11-05 21:29:44',
                        executionMonitoringStartAt: '2020-11-06 01:53:45',
                        executionMonitoringEndAt: '2020-11-05 18:49:29',
                        error: 5927663823,
                        inactive: 7258176268,
                        successful: 9355925254,
                        stopped: 6351755621,
                        unknown: 2549540418,
                        unregistered: 1351669512,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateChannelOverview.id).toStrictEqual('82847bca-9c80-490c-918d-e9e4dc51ba60');
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
                    id: 'f00c8409-3192-4751-af70-e38fa6be0120'
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
                    id: '82847bca-9c80-490c-918d-e9e4dc51ba60'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteChannelOverviewById.id).toStrictEqual('82847bca-9c80-490c-918d-e9e4dc51ba60');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});