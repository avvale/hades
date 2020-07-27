import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IMessageOverviewRepository } from '@hades/bplus-it-sappi/message-overview/domain/message-overview.repository';
import { MockMessageOverviewRepository } from '@hades/bplus-it-sappi/message-overview/infrastructure/mock/mock-message-overview.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
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
            .overrideProvider(IMessageOverviewRepository)
            .useClass(MockMessageOverviewRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockMessageOverviewRepository>module.get<IMessageOverviewRepository>(IMessageOverviewRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/message-overview - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: 'fb5d68b5-532b-46e3-8a2e-4a932ea5e5b4',
                tenantCode: '8c3cwq5l0c2ahw2st0e5oru49zt3kvkyr59ias1qmuzf60ergb',
                systemId: '5e5a4b9b-ad3c-4316-a380-3c2e28cda9ef',
                systemName: 'afrbkzyaa1vynodoou8a',
                executionId: 'ee13a826-3591-4d05-9c8b-1a000cc79b7a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 03:44:25',
                executionMonitoringStartAt: '2020-07-27 10:33:22',
                executionMonitoringEndAt: '2020-07-27 21:40:58',
                numberMax: 4222303709,
                numberDays: 3153602453,
                success: 5234693178,
                cancelled: 5182191708,
                delivering: 6796686767,
                error: 6885999814,
                holding: 7972248668,
                toBeDelivered: 3087969204,
                waiting: 2460780200,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: 'fb5d68b5-532b-46e3-8a2e-4a932ea5e5b4',
                tenantCode: '08bo4alm2yofc8332fcj00boshx3mxhjv7iwi3mz2e7buiz8ac',
                systemId: '5e5a4b9b-ad3c-4316-a380-3c2e28cda9ef',
                systemName: 'ao8go3eeiqxqu72m6pdf',
                executionId: 'ee13a826-3591-4d05-9c8b-1a000cc79b7a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 04:03:22',
                executionMonitoringStartAt: '2020-07-27 19:35:34',
                executionMonitoringEndAt: '2020-07-27 20:44:18',
                numberMax: 2954962273,
                numberDays: 3518320067,
                success: 3885656857,
                cancelled: 2437602061,
                delivering: 3103432570,
                error: 2785058521,
                holding: 7246569454,
                toBeDelivered: 6159767701,
                waiting: 4773935978,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '1f7762ce-b6f9-47eb-b9d0-31a290b1157f',
                tenantId: null,
                tenantCode: 'nrtutqo7bs1eitpxyfyq6qcxgu6i35aj9mdii4tf3vj6ns3fq8',
                systemId: '5e5a4b9b-ad3c-4316-a380-3c2e28cda9ef',
                systemName: 'bncrk1z37ue0jqn7j0i6',
                executionId: 'ee13a826-3591-4d05-9c8b-1a000cc79b7a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 20:54:51',
                executionMonitoringStartAt: '2020-07-27 07:07:03',
                executionMonitoringEndAt: '2020-07-27 05:11:48',
                numberMax: 6073472061,
                numberDays: 7478824597,
                success: 2897407657,
                cancelled: 3519539249,
                delivering: 3293016410,
                error: 1337977710,
                holding: 2479040201,
                toBeDelivered: 9121076338,
                waiting: 6129498752,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '1f7762ce-b6f9-47eb-b9d0-31a290b1157f',
                
                tenantCode: '7l1wu6qun3a4f7nuj2i6mpnn43f5mk24dm1lsw6q0m4hyiso76',
                systemId: '5e5a4b9b-ad3c-4316-a380-3c2e28cda9ef',
                systemName: 'vxngj8k775cyxi35588z',
                executionId: 'ee13a826-3591-4d05-9c8b-1a000cc79b7a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 16:20:42',
                executionMonitoringStartAt: '2020-07-28 00:39:08',
                executionMonitoringEndAt: '2020-07-27 21:05:06',
                numberMax: 9263604799,
                numberDays: 6154981693,
                success: 1286529063,
                cancelled: 1814718363,
                delivering: 1755683465,
                error: 6965427761,
                holding: 2498263273,
                toBeDelivered: 7590881941,
                waiting: 8022169475,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '1f7762ce-b6f9-47eb-b9d0-31a290b1157f',
                tenantId: 'fb5d68b5-532b-46e3-8a2e-4a932ea5e5b4',
                tenantCode: null,
                systemId: '5e5a4b9b-ad3c-4316-a380-3c2e28cda9ef',
                systemName: 'c62m9vrnq76qcq3voji5',
                executionId: 'ee13a826-3591-4d05-9c8b-1a000cc79b7a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 22:19:57',
                executionMonitoringStartAt: '2020-07-27 11:29:54',
                executionMonitoringEndAt: '2020-07-27 14:39:57',
                numberMax: 8831491164,
                numberDays: 5151251576,
                success: 6832256491,
                cancelled: 7737458444,
                delivering: 8877305603,
                error: 2093405994,
                holding: 4544896063,
                toBeDelivered: 9967868765,
                waiting: 3955749071,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '1f7762ce-b6f9-47eb-b9d0-31a290b1157f',
                tenantId: 'fb5d68b5-532b-46e3-8a2e-4a932ea5e5b4',
                
                systemId: '5e5a4b9b-ad3c-4316-a380-3c2e28cda9ef',
                systemName: 'qpu8hpqe9r2y4yvhgs3c',
                executionId: 'ee13a826-3591-4d05-9c8b-1a000cc79b7a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 07:17:32',
                executionMonitoringStartAt: '2020-07-27 04:42:15',
                executionMonitoringEndAt: '2020-07-27 20:44:11',
                numberMax: 9481912972,
                numberDays: 5820259316,
                success: 4038897946,
                cancelled: 9596501534,
                delivering: 6423963307,
                error: 6381179656,
                holding: 6205218830,
                toBeDelivered: 4729455426,
                waiting: 6775616070,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '1f7762ce-b6f9-47eb-b9d0-31a290b1157f',
                tenantId: 'fb5d68b5-532b-46e3-8a2e-4a932ea5e5b4',
                tenantCode: 'zv5fhe830rmib4s3wxl2ta537tl0tigvawmadfq5u2whmaqt8w',
                systemId: null,
                systemName: 'daw76esen1yni1ttsskj',
                executionId: 'ee13a826-3591-4d05-9c8b-1a000cc79b7a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 00:39:06',
                executionMonitoringStartAt: '2020-07-27 05:12:31',
                executionMonitoringEndAt: '2020-07-27 02:38:59',
                numberMax: 2493435298,
                numberDays: 2416911351,
                success: 9164443520,
                cancelled: 4614583117,
                delivering: 1688188974,
                error: 7185060106,
                holding: 7816754271,
                toBeDelivered: 9880473870,
                waiting: 9011779645,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '1f7762ce-b6f9-47eb-b9d0-31a290b1157f',
                tenantId: 'fb5d68b5-532b-46e3-8a2e-4a932ea5e5b4',
                tenantCode: 'qi418j2ie6941qhzhww13cm2k3fhv1f4qxq6tmjqme57qma1vz',
                
                systemName: 'cy0fplj51irxqrr3xh9n',
                executionId: 'ee13a826-3591-4d05-9c8b-1a000cc79b7a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 05:24:18',
                executionMonitoringStartAt: '2020-07-27 09:49:46',
                executionMonitoringEndAt: '2020-07-27 03:14:54',
                numberMax: 5094553795,
                numberDays: 6933895103,
                success: 3243693470,
                cancelled: 8129151022,
                delivering: 1836712834,
                error: 4393687208,
                holding: 1988803240,
                toBeDelivered: 2011585878,
                waiting: 3769056051,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '1f7762ce-b6f9-47eb-b9d0-31a290b1157f',
                tenantId: 'fb5d68b5-532b-46e3-8a2e-4a932ea5e5b4',
                tenantCode: '4956npahuipu6rju2x4pcb6df928mynm88veghe31dqfbfr0p4',
                systemId: '5e5a4b9b-ad3c-4316-a380-3c2e28cda9ef',
                systemName: null,
                executionId: 'ee13a826-3591-4d05-9c8b-1a000cc79b7a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 10:11:31',
                executionMonitoringStartAt: '2020-07-27 21:52:20',
                executionMonitoringEndAt: '2020-07-27 01:13:14',
                numberMax: 3355488232,
                numberDays: 8009651968,
                success: 5891553227,
                cancelled: 3467623754,
                delivering: 9055570770,
                error: 5943363985,
                holding: 4403515140,
                toBeDelivered: 7373676792,
                waiting: 3013730564,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '1f7762ce-b6f9-47eb-b9d0-31a290b1157f',
                tenantId: 'fb5d68b5-532b-46e3-8a2e-4a932ea5e5b4',
                tenantCode: '3jegqrkv7dr3yejxkar6da1dx6uhw7jn1mqe7zopkxnzcl69x2',
                systemId: '5e5a4b9b-ad3c-4316-a380-3c2e28cda9ef',
                
                executionId: 'ee13a826-3591-4d05-9c8b-1a000cc79b7a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 07:02:10',
                executionMonitoringStartAt: '2020-07-27 19:35:55',
                executionMonitoringEndAt: '2020-07-27 04:05:28',
                numberMax: 7661835923,
                numberDays: 3182024603,
                success: 2238051490,
                cancelled: 8101848788,
                delivering: 1698162892,
                error: 6514699271,
                holding: 3528414137,
                toBeDelivered: 5785376658,
                waiting: 2623910061,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '1f7762ce-b6f9-47eb-b9d0-31a290b1157f',
                tenantId: 'fb5d68b5-532b-46e3-8a2e-4a932ea5e5b4',
                tenantCode: 'ynntozhxpclxbx1oh4wcd6xhdb5dp1zfvp8grfli3tdkt9flvq',
                systemId: '5e5a4b9b-ad3c-4316-a380-3c2e28cda9ef',
                systemName: '7uujkixtbahzwvucdc2l',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 10:11:42',
                executionMonitoringStartAt: '2020-07-27 17:02:13',
                executionMonitoringEndAt: '2020-07-28 00:02:46',
                numberMax: 5660311754,
                numberDays: 9549591365,
                success: 2696760360,
                cancelled: 2960248422,
                delivering: 9275969782,
                error: 8358099757,
                holding: 4589286356,
                toBeDelivered: 2038274169,
                waiting: 5686164612,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '1f7762ce-b6f9-47eb-b9d0-31a290b1157f',
                tenantId: 'fb5d68b5-532b-46e3-8a2e-4a932ea5e5b4',
                tenantCode: 'qnk7hum9vmzqh3okxq3qk5x85m0lfrso95drl2q1h78owsk8c6',
                systemId: '5e5a4b9b-ad3c-4316-a380-3c2e28cda9ef',
                systemName: '73mtt2kj3jqr4hzk15rr',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 05:27:23',
                executionMonitoringStartAt: '2020-07-27 10:12:05',
                executionMonitoringEndAt: '2020-07-27 05:40:15',
                numberMax: 7520119054,
                numberDays: 2988192638,
                success: 6700919539,
                cancelled: 1584336979,
                delivering: 2148198501,
                error: 8667192009,
                holding: 9938851019,
                toBeDelivered: 3821645746,
                waiting: 3170555733,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '1f7762ce-b6f9-47eb-b9d0-31a290b1157f',
                tenantId: 'fb5d68b5-532b-46e3-8a2e-4a932ea5e5b4',
                tenantCode: 'bahb30qnom5uu0guuop3oo451hpn0ipbjjo1j049bucgo8ub0x',
                systemId: '5e5a4b9b-ad3c-4316-a380-3c2e28cda9ef',
                systemName: 'w1r4q6c5n9icicot5nli',
                executionId: 'ee13a826-3591-4d05-9c8b-1a000cc79b7a',
                executionType: null,
                executionExecutedAt: '2020-07-27 04:25:50',
                executionMonitoringStartAt: '2020-07-27 04:09:56',
                executionMonitoringEndAt: '2020-07-27 06:46:59',
                numberMax: 9326896970,
                numberDays: 6330881057,
                success: 2053577495,
                cancelled: 3771574605,
                delivering: 2186717038,
                error: 2458157476,
                holding: 5446429273,
                toBeDelivered: 6825928513,
                waiting: 8726040840,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionType must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '1f7762ce-b6f9-47eb-b9d0-31a290b1157f',
                tenantId: 'fb5d68b5-532b-46e3-8a2e-4a932ea5e5b4',
                tenantCode: 'ai9r09y8cl3lvlyfykvbjagedepylq8aomcaur6zfa6sap5cj8',
                systemId: '5e5a4b9b-ad3c-4316-a380-3c2e28cda9ef',
                systemName: '5xk4ko29ekhdzhrczy7w',
                executionId: 'ee13a826-3591-4d05-9c8b-1a000cc79b7a',
                
                executionExecutedAt: '2020-07-27 16:18:34',
                executionMonitoringStartAt: '2020-07-27 04:07:26',
                executionMonitoringEndAt: '2020-07-27 22:04:07',
                numberMax: 3938541485,
                numberDays: 9420376139,
                success: 6155878620,
                cancelled: 6895065031,
                delivering: 4278218825,
                error: 6239515533,
                holding: 6459812752,
                toBeDelivered: 5387058022,
                waiting: 2920635265,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionType must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '1f7762ce-b6f9-47eb-b9d0-31a290b1157f',
                tenantId: 'fb5d68b5-532b-46e3-8a2e-4a932ea5e5b4',
                tenantCode: 'w9kjhpnxeebnm3gb6o2snkpqxowb12klou56q2f5h9z1g6dwwe',
                systemId: '5e5a4b9b-ad3c-4316-a380-3c2e28cda9ef',
                systemName: 'i3uawm6s935vnx93iuhn',
                executionId: 'ee13a826-3591-4d05-9c8b-1a000cc79b7a',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-27 07:46:13',
                executionMonitoringEndAt: '2020-07-27 02:24:39',
                numberMax: 1782637916,
                numberDays: 2997746906,
                success: 9620367493,
                cancelled: 7279583988,
                delivering: 2798981678,
                error: 6799632347,
                holding: 9903468817,
                toBeDelivered: 7756377863,
                waiting: 8513371608,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionExecutedAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '1f7762ce-b6f9-47eb-b9d0-31a290b1157f',
                tenantId: 'fb5d68b5-532b-46e3-8a2e-4a932ea5e5b4',
                tenantCode: 'p50xoa0b1jfkusxtqh6oztky7w3dkfi2u6nt4a1l1wctldf8f6',
                systemId: '5e5a4b9b-ad3c-4316-a380-3c2e28cda9ef',
                systemName: 'x9dz865ff95mg74ozon8',
                executionId: 'ee13a826-3591-4d05-9c8b-1a000cc79b7a',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-07-27 03:42:28',
                executionMonitoringEndAt: '2020-07-27 12:10:47',
                numberMax: 5756382806,
                numberDays: 6711922961,
                success: 9570317453,
                cancelled: 2438485296,
                delivering: 2609905800,
                error: 5650301879,
                holding: 1214359661,
                toBeDelivered: 1261145792,
                waiting: 6216900377,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '1f7762ce-b6f9-47eb-b9d0-31a290b1157f',
                tenantId: 'fb5d68b5-532b-46e3-8a2e-4a932ea5e5b4',
                tenantCode: 'e1k6vza5tubghrhzel1p4sf7avasry0iwcr4gbn9fjq6s2o5um',
                systemId: '5e5a4b9b-ad3c-4316-a380-3c2e28cda9ef',
                systemName: '7x9asfc8m606epzizgnj',
                executionId: 'ee13a826-3591-4d05-9c8b-1a000cc79b7a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 11:27:49',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-27 11:52:10',
                numberMax: 6263430220,
                numberDays: 8131685427,
                success: 9380820301,
                cancelled: 5533262226,
                delivering: 1220306359,
                error: 4889193315,
                holding: 3501054963,
                toBeDelivered: 1998893486,
                waiting: 6775379653,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '1f7762ce-b6f9-47eb-b9d0-31a290b1157f',
                tenantId: 'fb5d68b5-532b-46e3-8a2e-4a932ea5e5b4',
                tenantCode: 'si0jck0vibp2h7uq5hhdysl4tz2ajk7nwz2xws97bgdilsfe84',
                systemId: '5e5a4b9b-ad3c-4316-a380-3c2e28cda9ef',
                systemName: '9y6l0mke32k77fu3e8ps',
                executionId: 'ee13a826-3591-4d05-9c8b-1a000cc79b7a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 18:13:27',
                
                executionMonitoringEndAt: '2020-07-27 13:49:25',
                numberMax: 7104496689,
                numberDays: 7736246942,
                success: 9641714710,
                cancelled: 5106818461,
                delivering: 5124975632,
                error: 6066822185,
                holding: 3982257752,
                toBeDelivered: 4337518384,
                waiting: 1417980440,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '1f7762ce-b6f9-47eb-b9d0-31a290b1157f',
                tenantId: 'fb5d68b5-532b-46e3-8a2e-4a932ea5e5b4',
                tenantCode: 'tbxiqm80vbsv1jpgizd1ntb97o4et6b593up5zcxm9z648kjl8',
                systemId: '5e5a4b9b-ad3c-4316-a380-3c2e28cda9ef',
                systemName: 'n7lpvim7w4j7vqjbiz4p',
                executionId: 'ee13a826-3591-4d05-9c8b-1a000cc79b7a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 18:05:01',
                executionMonitoringStartAt: '2020-07-27 15:40:50',
                executionMonitoringEndAt: null,
                numberMax: 2168803482,
                numberDays: 5677551242,
                success: 6362954871,
                cancelled: 1457691142,
                delivering: 1885742181,
                error: 3166513736,
                holding: 3456824472,
                toBeDelivered: 5935274193,
                waiting: 5246147898,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '1f7762ce-b6f9-47eb-b9d0-31a290b1157f',
                tenantId: 'fb5d68b5-532b-46e3-8a2e-4a932ea5e5b4',
                tenantCode: 'aw3ulavavduf1ur2d4t5hxus441elg719gyysc7rhwjab81ahh',
                systemId: '5e5a4b9b-ad3c-4316-a380-3c2e28cda9ef',
                systemName: 'khue2t78z74heih5bnlh',
                executionId: 'ee13a826-3591-4d05-9c8b-1a000cc79b7a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 05:07:48',
                executionMonitoringStartAt: '2020-07-27 19:10:10',
                
                numberMax: 2809934572,
                numberDays: 9602391715,
                success: 6635133819,
                cancelled: 4001526004,
                delivering: 8291513568,
                error: 3477854579,
                holding: 7866098119,
                toBeDelivered: 3322627544,
                waiting: 6556711089,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'm8yxf5bosk53w6doknsg7g1jmaykjdidk62ly',
                tenantId: 'fb5d68b5-532b-46e3-8a2e-4a932ea5e5b4',
                tenantCode: 'fyrzxgj13g0hq2n0hnyvnsc51vqw22o7btwova98op3werirmj',
                systemId: '5e5a4b9b-ad3c-4316-a380-3c2e28cda9ef',
                systemName: 'v6fv6tuziqu481p07gpb',
                executionId: 'ee13a826-3591-4d05-9c8b-1a000cc79b7a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 02:24:38',
                executionMonitoringStartAt: '2020-07-27 11:58:55',
                executionMonitoringEndAt: '2020-07-28 00:43:46',
                numberMax: 5263876904,
                numberDays: 1104926170,
                success: 5484998958,
                cancelled: 8755930983,
                delivering: 6315072039,
                error: 9271727282,
                holding: 4695040196,
                toBeDelivered: 5745761175,
                waiting: 7752899132,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '1f7762ce-b6f9-47eb-b9d0-31a290b1157f',
                tenantId: 'z1ioswimgtxjihoqdkmfuqlp6tj6zvmvuv8gs',
                tenantCode: 'y5h1m087o5u88gwf313i7u01roasaibf1cbn2g1wr9qf6v6kpf',
                systemId: '5e5a4b9b-ad3c-4316-a380-3c2e28cda9ef',
                systemName: '7mvjq4uop32z79fdv8fo',
                executionId: 'ee13a826-3591-4d05-9c8b-1a000cc79b7a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 09:54:28',
                executionMonitoringStartAt: '2020-07-27 06:34:59',
                executionMonitoringEndAt: '2020-07-27 23:30:48',
                numberMax: 9463599644,
                numberDays: 6990913003,
                success: 7876285480,
                cancelled: 9817001006,
                delivering: 1859346648,
                error: 6352665105,
                holding: 3593094003,
                toBeDelivered: 1957993641,
                waiting: 9798008910,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '1f7762ce-b6f9-47eb-b9d0-31a290b1157f',
                tenantId: 'fb5d68b5-532b-46e3-8a2e-4a932ea5e5b4',
                tenantCode: 'u525dwjx59ca7u77u16wfcjs9o2a7raugcyaoa5imfuyurajly',
                systemId: '3swtaxe954hp6eak0qznsh3sejkv31lkbcr5a',
                systemName: 'kmxhddqyzm5qn4uaurot',
                executionId: 'ee13a826-3591-4d05-9c8b-1a000cc79b7a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 09:55:52',
                executionMonitoringStartAt: '2020-07-27 16:00:48',
                executionMonitoringEndAt: '2020-07-27 02:06:19',
                numberMax: 5770039590,
                numberDays: 8247465631,
                success: 6249416561,
                cancelled: 6918302720,
                delivering: 8163683494,
                error: 9137483676,
                holding: 5939418393,
                toBeDelivered: 1633192808,
                waiting: 8145293593,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '1f7762ce-b6f9-47eb-b9d0-31a290b1157f',
                tenantId: 'fb5d68b5-532b-46e3-8a2e-4a932ea5e5b4',
                tenantCode: 'dw1pck57yifpfozops6vq0rlacs0g6y6ia932p6cl8jvra6k58',
                systemId: '5e5a4b9b-ad3c-4316-a380-3c2e28cda9ef',
                systemName: 'smgxc9qz8ne83tflg8pl',
                executionId: '9kvna6d5c7r6393snq3navoyjskagb5vj50cx',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 13:32:16',
                executionMonitoringStartAt: '2020-07-27 11:15:28',
                executionMonitoringEndAt: '2020-07-27 14:21:38',
                numberMax: 2690220499,
                numberDays: 6558754395,
                success: 6886790076,
                cancelled: 9284305979,
                delivering: 3597970507,
                error: 3189928827,
                holding: 4329432659,
                toBeDelivered: 2780329453,
                waiting: 8106278520,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '1f7762ce-b6f9-47eb-b9d0-31a290b1157f',
                tenantId: 'fb5d68b5-532b-46e3-8a2e-4a932ea5e5b4',
                tenantCode: 'g3wv8okdmpkl9bysi581rxskr922t252wi9zer8pgnn19qzwmen',
                systemId: '5e5a4b9b-ad3c-4316-a380-3c2e28cda9ef',
                systemName: 'dzy6lwno4u0nv5ozgi6s',
                executionId: 'ee13a826-3591-4d05-9c8b-1a000cc79b7a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 17:08:38',
                executionMonitoringStartAt: '2020-07-27 04:48:32',
                executionMonitoringEndAt: '2020-07-27 12:50:58',
                numberMax: 3554955235,
                numberDays: 3251262496,
                success: 3866895572,
                cancelled: 6324366777,
                delivering: 6035450767,
                error: 3319528598,
                holding: 4505122196,
                toBeDelivered: 3161104213,
                waiting: 1068425696,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '1f7762ce-b6f9-47eb-b9d0-31a290b1157f',
                tenantId: 'fb5d68b5-532b-46e3-8a2e-4a932ea5e5b4',
                tenantCode: '4mf7cowuj30y1gi32n8zg8ira57laihsartcrc9h2271cf05k4',
                systemId: '5e5a4b9b-ad3c-4316-a380-3c2e28cda9ef',
                systemName: 'wr3i3ha8ztznlsbzmxhoy',
                executionId: 'ee13a826-3591-4d05-9c8b-1a000cc79b7a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 18:49:29',
                executionMonitoringStartAt: '2020-07-27 15:26:40',
                executionMonitoringEndAt: '2020-07-27 13:04:45',
                numberMax: 8679869296,
                numberDays: 2054745321,
                success: 4484368310,
                cancelled: 8655460810,
                delivering: 7944802937,
                error: 9335655389,
                holding: 7439185215,
                toBeDelivered: 9769066779,
                waiting: 3619963546,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewNumberMax is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '1f7762ce-b6f9-47eb-b9d0-31a290b1157f',
                tenantId: 'fb5d68b5-532b-46e3-8a2e-4a932ea5e5b4',
                tenantCode: 'hsafe6nv6r028wmp1yisxik8uo450h2bobbs8h3uld6tdhs1o3',
                systemId: '5e5a4b9b-ad3c-4316-a380-3c2e28cda9ef',
                systemName: 't2ni4chyhuvk9idq6hca',
                executionId: 'ee13a826-3591-4d05-9c8b-1a000cc79b7a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 04:56:06',
                executionMonitoringStartAt: '2020-07-27 07:48:44',
                executionMonitoringEndAt: '2020-07-27 11:39:24',
                numberMax: 64194730627,
                numberDays: 8473092704,
                success: 7215490454,
                cancelled: 6891769037,
                delivering: 7837002097,
                error: 1900043651,
                holding: 6498566331,
                toBeDelivered: 4041699938,
                waiting: 4971844857,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewNumberMax is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewNumberDays is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '1f7762ce-b6f9-47eb-b9d0-31a290b1157f',
                tenantId: 'fb5d68b5-532b-46e3-8a2e-4a932ea5e5b4',
                tenantCode: '7gpw1t22j8fj9jhil0j2438dcjriilox8atgylmmoffzfgfgs5',
                systemId: '5e5a4b9b-ad3c-4316-a380-3c2e28cda9ef',
                systemName: 'eqnzt1zn7p8whhglcs1u',
                executionId: 'ee13a826-3591-4d05-9c8b-1a000cc79b7a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 10:33:37',
                executionMonitoringStartAt: '2020-07-27 11:49:37',
                executionMonitoringEndAt: '2020-07-27 04:53:56',
                numberMax: 4583850142,
                numberDays: 63420445494,
                success: 9217041847,
                cancelled: 4385686046,
                delivering: 6157515759,
                error: 8678369572,
                holding: 7958343859,
                toBeDelivered: 4657474003,
                waiting: 1133408796,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewNumberDays is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewSuccess is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '1f7762ce-b6f9-47eb-b9d0-31a290b1157f',
                tenantId: 'fb5d68b5-532b-46e3-8a2e-4a932ea5e5b4',
                tenantCode: 'c6oicoit9njqi4nddl2wri9k0ac27rwfx5p1qkn9jbuf2vffjw',
                systemId: '5e5a4b9b-ad3c-4316-a380-3c2e28cda9ef',
                systemName: 'c0s69si81oes7sez32r4',
                executionId: 'ee13a826-3591-4d05-9c8b-1a000cc79b7a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 08:09:17',
                executionMonitoringStartAt: '2020-07-28 00:35:49',
                executionMonitoringEndAt: '2020-07-27 12:00:20',
                numberMax: 9546884851,
                numberDays: 2891720912,
                success: 79752905399,
                cancelled: 7308796200,
                delivering: 3388771287,
                error: 1967150838,
                holding: 6124826799,
                toBeDelivered: 4352363049,
                waiting: 6711334327,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSuccess is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewCancelled is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '1f7762ce-b6f9-47eb-b9d0-31a290b1157f',
                tenantId: 'fb5d68b5-532b-46e3-8a2e-4a932ea5e5b4',
                tenantCode: 'vpdu62ofj48hcof6bup7whw49i20qkk8csy842zwtxnc8h1a3n',
                systemId: '5e5a4b9b-ad3c-4316-a380-3c2e28cda9ef',
                systemName: '99mwq67irz6lpamzyqym',
                executionId: 'ee13a826-3591-4d05-9c8b-1a000cc79b7a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 05:35:10',
                executionMonitoringStartAt: '2020-07-27 15:22:50',
                executionMonitoringEndAt: '2020-07-27 17:52:57',
                numberMax: 2956797464,
                numberDays: 3785603535,
                success: 1563412389,
                cancelled: 43864758288,
                delivering: 2384953625,
                error: 4202452539,
                holding: 4885959824,
                toBeDelivered: 7217368565,
                waiting: 9135539294,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewCancelled is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewDelivering is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '1f7762ce-b6f9-47eb-b9d0-31a290b1157f',
                tenantId: 'fb5d68b5-532b-46e3-8a2e-4a932ea5e5b4',
                tenantCode: 'z5cbuahkgqvqv1m0ayt48dyfiqcp4umxnwajxi778mp8jm8ddf',
                systemId: '5e5a4b9b-ad3c-4316-a380-3c2e28cda9ef',
                systemName: 'meebybuao3bu1tvt83h1',
                executionId: 'ee13a826-3591-4d05-9c8b-1a000cc79b7a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 11:27:49',
                executionMonitoringStartAt: '2020-07-27 20:27:01',
                executionMonitoringEndAt: '2020-07-27 04:49:25',
                numberMax: 3395807594,
                numberDays: 8491579972,
                success: 5696171489,
                cancelled: 6514835021,
                delivering: 29566469967,
                error: 3240506676,
                holding: 9994850124,
                toBeDelivered: 5859063340,
                waiting: 8339592076,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewDelivering is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewError is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '1f7762ce-b6f9-47eb-b9d0-31a290b1157f',
                tenantId: 'fb5d68b5-532b-46e3-8a2e-4a932ea5e5b4',
                tenantCode: 'jcc5cdqi4d1ftwfmawegkrvhrnvvqvxwebu0ay2zhik9km1ll3',
                systemId: '5e5a4b9b-ad3c-4316-a380-3c2e28cda9ef',
                systemName: 'tqfj69clpw46ltz98j7s',
                executionId: 'ee13a826-3591-4d05-9c8b-1a000cc79b7a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 01:26:42',
                executionMonitoringStartAt: '2020-07-28 00:47:49',
                executionMonitoringEndAt: '2020-07-28 00:48:28',
                numberMax: 5782716388,
                numberDays: 9578561047,
                success: 3459733967,
                cancelled: 9265852951,
                delivering: 3145905160,
                error: 37888746724,
                holding: 4310084291,
                toBeDelivered: 6936659518,
                waiting: 3604578094,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewError is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewHolding is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '1f7762ce-b6f9-47eb-b9d0-31a290b1157f',
                tenantId: 'fb5d68b5-532b-46e3-8a2e-4a932ea5e5b4',
                tenantCode: 'd82iibbjmdfakgy8ijgsfpa8b075uh0lcg631xlzuoj563kbxu',
                systemId: '5e5a4b9b-ad3c-4316-a380-3c2e28cda9ef',
                systemName: '5wv4ve1z9w2o8780j061',
                executionId: 'ee13a826-3591-4d05-9c8b-1a000cc79b7a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 21:56:23',
                executionMonitoringStartAt: '2020-07-27 14:09:30',
                executionMonitoringEndAt: '2020-07-27 01:07:06',
                numberMax: 5695227710,
                numberDays: 4584829561,
                success: 4207023690,
                cancelled: 6731741851,
                delivering: 4926433841,
                error: 7578143860,
                holding: 41567417351,
                toBeDelivered: 6754033839,
                waiting: 4675673027,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewHolding is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewToBeDelivered is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '1f7762ce-b6f9-47eb-b9d0-31a290b1157f',
                tenantId: 'fb5d68b5-532b-46e3-8a2e-4a932ea5e5b4',
                tenantCode: 'iv8qudrnyerq9mc01hmz6vftdjh8fl3o5byossw2jbbgjvudzu',
                systemId: '5e5a4b9b-ad3c-4316-a380-3c2e28cda9ef',
                systemName: 'oipvsb9swdmez8kv6gfy',
                executionId: 'ee13a826-3591-4d05-9c8b-1a000cc79b7a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 23:38:41',
                executionMonitoringStartAt: '2020-07-27 07:35:40',
                executionMonitoringEndAt: '2020-07-28 00:31:54',
                numberMax: 8271926611,
                numberDays: 5438630599,
                success: 1912136311,
                cancelled: 8235135077,
                delivering: 4235187743,
                error: 9948020300,
                holding: 5165840938,
                toBeDelivered: 30602194394,
                waiting: 5307613958,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewToBeDelivered is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewWaiting is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '1f7762ce-b6f9-47eb-b9d0-31a290b1157f',
                tenantId: 'fb5d68b5-532b-46e3-8a2e-4a932ea5e5b4',
                tenantCode: '3c1hjf0mxaiuig4haa5huzoarc0gpfhos3mbiekj6rojnc6z2a',
                systemId: '5e5a4b9b-ad3c-4316-a380-3c2e28cda9ef',
                systemName: 'pcxjyfb7obvb923mimn7',
                executionId: 'ee13a826-3591-4d05-9c8b-1a000cc79b7a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 04:10:44',
                executionMonitoringStartAt: '2020-07-27 16:22:10',
                executionMonitoringEndAt: '2020-07-27 18:12:15',
                numberMax: 2310525437,
                numberDays: 1511213808,
                success: 7527944820,
                cancelled: 2545787753,
                delivering: 4069883457,
                error: 5113731901,
                holding: 3667975511,
                toBeDelivered: 4105486704,
                waiting: 50767102699,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewWaiting is too large, has a maximum length of 10');
            });
    });
    

    

    
    
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewNumberMax must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '1f7762ce-b6f9-47eb-b9d0-31a290b1157f',
                tenantId: 'fb5d68b5-532b-46e3-8a2e-4a932ea5e5b4',
                tenantCode: '9hjlmxf3wds8sf75x7gtshb6jb8l1h4a0ki5ecekyrwixme53e',
                systemId: '5e5a4b9b-ad3c-4316-a380-3c2e28cda9ef',
                systemName: '3ly9be30zabyjp759wx3',
                executionId: 'ee13a826-3591-4d05-9c8b-1a000cc79b7a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 15:41:43',
                executionMonitoringStartAt: '2020-07-27 01:03:11',
                executionMonitoringEndAt: '2020-07-27 06:53:25',
                numberMax: -9,
                numberDays: 5814876527,
                success: 6815254858,
                cancelled: 5060986078,
                delivering: 4422361070,
                error: 2488600491,
                holding: 7551858721,
                toBeDelivered: 3556650354,
                waiting: 9290276871,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewNumberMax must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewNumberDays must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '1f7762ce-b6f9-47eb-b9d0-31a290b1157f',
                tenantId: 'fb5d68b5-532b-46e3-8a2e-4a932ea5e5b4',
                tenantCode: 'u4uj3nrrrrjghv882s10wphnadvwi3ssa97g3vkeibrldswzts',
                systemId: '5e5a4b9b-ad3c-4316-a380-3c2e28cda9ef',
                systemName: 'ih5mvlqf9icgzs4k8cjc',
                executionId: 'ee13a826-3591-4d05-9c8b-1a000cc79b7a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 07:21:18',
                executionMonitoringStartAt: '2020-07-27 03:06:37',
                executionMonitoringEndAt: '2020-07-27 04:16:46',
                numberMax: 7537767588,
                numberDays: -9,
                success: 6044005269,
                cancelled: 1758899001,
                delivering: 1594594818,
                error: 1785441002,
                holding: 9810501916,
                toBeDelivered: 5227418450,
                waiting: 8922014178,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewNumberDays must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewSuccess must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '1f7762ce-b6f9-47eb-b9d0-31a290b1157f',
                tenantId: 'fb5d68b5-532b-46e3-8a2e-4a932ea5e5b4',
                tenantCode: 'p9xvro83n291k39zolq1x7zfz0ubt9kye717ipex7go9g0iip5',
                systemId: '5e5a4b9b-ad3c-4316-a380-3c2e28cda9ef',
                systemName: 'ce8ypyn4fh6mnst6v542',
                executionId: 'ee13a826-3591-4d05-9c8b-1a000cc79b7a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 09:08:21',
                executionMonitoringStartAt: '2020-07-27 13:55:15',
                executionMonitoringEndAt: '2020-07-27 20:20:29',
                numberMax: 3661976254,
                numberDays: 7348604216,
                success: -9,
                cancelled: 4321303924,
                delivering: 3013227277,
                error: 9373544909,
                holding: 1317207553,
                toBeDelivered: 5272194216,
                waiting: 2021209699,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewSuccess must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewCancelled must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '1f7762ce-b6f9-47eb-b9d0-31a290b1157f',
                tenantId: 'fb5d68b5-532b-46e3-8a2e-4a932ea5e5b4',
                tenantCode: 'jqgdv7ys05ffkl6e93la7qi8jcib5uz1zcn4s1f5y6gz1hz3az',
                systemId: '5e5a4b9b-ad3c-4316-a380-3c2e28cda9ef',
                systemName: '3hbg0vq34419t3f2eugd',
                executionId: 'ee13a826-3591-4d05-9c8b-1a000cc79b7a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 13:58:57',
                executionMonitoringStartAt: '2020-07-27 05:40:08',
                executionMonitoringEndAt: '2020-07-27 12:45:27',
                numberMax: 3107048063,
                numberDays: 2593294949,
                success: 2214322070,
                cancelled: -9,
                delivering: 8860500851,
                error: 4989136330,
                holding: 6127313163,
                toBeDelivered: 4869152547,
                waiting: 2003452896,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewCancelled must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewDelivering must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '1f7762ce-b6f9-47eb-b9d0-31a290b1157f',
                tenantId: 'fb5d68b5-532b-46e3-8a2e-4a932ea5e5b4',
                tenantCode: 'q5ude3ppbwuslmservlo0ipvufs312cqyazxvqbxon0ko0gu7s',
                systemId: '5e5a4b9b-ad3c-4316-a380-3c2e28cda9ef',
                systemName: '9tu11il7gg4bt2474rfs',
                executionId: 'ee13a826-3591-4d05-9c8b-1a000cc79b7a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 02:31:39',
                executionMonitoringStartAt: '2020-07-27 09:00:16',
                executionMonitoringEndAt: '2020-07-27 17:05:32',
                numberMax: 9380966883,
                numberDays: 4647493438,
                success: 4763693805,
                cancelled: 4159860371,
                delivering: -9,
                error: 8865217369,
                holding: 8728747044,
                toBeDelivered: 4708539585,
                waiting: 8233861654,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewDelivering must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewError must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '1f7762ce-b6f9-47eb-b9d0-31a290b1157f',
                tenantId: 'fb5d68b5-532b-46e3-8a2e-4a932ea5e5b4',
                tenantCode: 'cc9xdv13b6prf4lolujho2gqtdtc76dfslfwx57g2f2ivdgvon',
                systemId: '5e5a4b9b-ad3c-4316-a380-3c2e28cda9ef',
                systemName: 'js6tfp9nhde46rkyt4ju',
                executionId: 'ee13a826-3591-4d05-9c8b-1a000cc79b7a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 05:08:11',
                executionMonitoringStartAt: '2020-07-27 18:43:33',
                executionMonitoringEndAt: '2020-07-27 06:15:07',
                numberMax: 6079395330,
                numberDays: 1053107284,
                success: 4406436500,
                cancelled: 8609750688,
                delivering: 3237555116,
                error: -9,
                holding: 2458968075,
                toBeDelivered: 5629697233,
                waiting: 9911353359,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewError must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewHolding must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '1f7762ce-b6f9-47eb-b9d0-31a290b1157f',
                tenantId: 'fb5d68b5-532b-46e3-8a2e-4a932ea5e5b4',
                tenantCode: 'ip0fs477p80txl3bhjoup64z27tko5aui1m1h69ajz0b75n9md',
                systemId: '5e5a4b9b-ad3c-4316-a380-3c2e28cda9ef',
                systemName: '8oq6114bge3e2jv1l2xa',
                executionId: 'ee13a826-3591-4d05-9c8b-1a000cc79b7a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 21:26:31',
                executionMonitoringStartAt: '2020-07-27 09:33:33',
                executionMonitoringEndAt: '2020-07-27 03:06:12',
                numberMax: 1092318321,
                numberDays: 2483289506,
                success: 9106901436,
                cancelled: 1413869978,
                delivering: 1095001630,
                error: 8690927319,
                holding: -9,
                toBeDelivered: 8201306429,
                waiting: 2976259305,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewHolding must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewToBeDelivered must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '1f7762ce-b6f9-47eb-b9d0-31a290b1157f',
                tenantId: 'fb5d68b5-532b-46e3-8a2e-4a932ea5e5b4',
                tenantCode: 'sgg1304zov39r38d6n1iaf7ak2gans6wslzjxpu2yjcxjwi5j8',
                systemId: '5e5a4b9b-ad3c-4316-a380-3c2e28cda9ef',
                systemName: 'w7g0xcvzehf7m9xmg9ui',
                executionId: 'ee13a826-3591-4d05-9c8b-1a000cc79b7a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 01:34:44',
                executionMonitoringStartAt: '2020-07-27 09:51:26',
                executionMonitoringEndAt: '2020-07-27 06:04:28',
                numberMax: 4393859202,
                numberDays: 8081656099,
                success: 9873636127,
                cancelled: 4840546023,
                delivering: 2997092004,
                error: 2577187688,
                holding: 1139757137,
                toBeDelivered: -9,
                waiting: 6686992886,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewToBeDelivered must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewWaiting must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '1f7762ce-b6f9-47eb-b9d0-31a290b1157f',
                tenantId: 'fb5d68b5-532b-46e3-8a2e-4a932ea5e5b4',
                tenantCode: 'da9snfvr6crb9iluzspfzc0pq09xxisduhtqcp9skjdja572fj',
                systemId: '5e5a4b9b-ad3c-4316-a380-3c2e28cda9ef',
                systemName: '1fydnsaymstp10vfk07e',
                executionId: 'ee13a826-3591-4d05-9c8b-1a000cc79b7a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 04:54:59',
                executionMonitoringStartAt: '2020-07-27 02:30:22',
                executionMonitoringEndAt: '2020-07-27 13:11:05',
                numberMax: 9490638023,
                numberDays: 6835795362,
                success: 4168939889,
                cancelled: 3835346718,
                delivering: 2351238081,
                error: 4329044273,
                holding: 6037486756,
                toBeDelivered: 1082542114,
                waiting: -9,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewWaiting must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '1f7762ce-b6f9-47eb-b9d0-31a290b1157f',
                tenantId: 'fb5d68b5-532b-46e3-8a2e-4a932ea5e5b4',
                tenantCode: 'wsbizd4e0z3fk21zc22berhw4u3msg8qs3upyfqnaaqzrexog9',
                systemId: '5e5a4b9b-ad3c-4316-a380-3c2e28cda9ef',
                systemName: 'zf3in8ylvyzvjaznyerm',
                executionId: 'ee13a826-3591-4d05-9c8b-1a000cc79b7a',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-27 04:01:04',
                executionMonitoringStartAt: '2020-07-27 05:11:42',
                executionMonitoringEndAt: '2020-07-27 08:45:27',
                numberMax: 5982326629,
                numberDays: 2632552943,
                success: 5483751028,
                cancelled: 5286745239,
                delivering: 5395312826,
                error: 8186800724,
                holding: 1047400736,
                toBeDelivered: 9768847446,
                waiting: 4429558921,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '1f7762ce-b6f9-47eb-b9d0-31a290b1157f',
                tenantId: 'fb5d68b5-532b-46e3-8a2e-4a932ea5e5b4',
                tenantCode: 'w4qfie31ptc6iay38m3b317195o9l3ddjkxdx5g8po3ucy6ewp',
                systemId: '5e5a4b9b-ad3c-4316-a380-3c2e28cda9ef',
                systemName: 'w8bxa8xnfop6vnzbltnd',
                executionId: 'ee13a826-3591-4d05-9c8b-1a000cc79b7a',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-27 19:34:15',
                executionMonitoringEndAt: '2020-07-27 05:54:12',
                numberMax: 1798083116,
                numberDays: 9630145239,
                success: 1904763794,
                cancelled: 7490213390,
                delivering: 4222681618,
                error: 9035777004,
                holding: 9745245162,
                toBeDelivered: 3680825330,
                waiting: 7272612958,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionExecutedAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionMonitoringStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '1f7762ce-b6f9-47eb-b9d0-31a290b1157f',
                tenantId: 'fb5d68b5-532b-46e3-8a2e-4a932ea5e5b4',
                tenantCode: 'r8w3arbkd556x7qg7od01oezpyxtsbbuap42bsgv48e89d2bmk',
                systemId: '5e5a4b9b-ad3c-4316-a380-3c2e28cda9ef',
                systemName: 'g774bp1cbtbct6nhyk7w',
                executionId: 'ee13a826-3591-4d05-9c8b-1a000cc79b7a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 05:26:25',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-27 11:03:26',
                numberMax: 6866760798,
                numberDays: 4851916491,
                success: 6179518895,
                cancelled: 5546870527,
                delivering: 2895585942,
                error: 2323330652,
                holding: 3772766151,
                toBeDelivered: 9781681675,
                waiting: 3642411454,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionMonitoringEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '1f7762ce-b6f9-47eb-b9d0-31a290b1157f',
                tenantId: 'fb5d68b5-532b-46e3-8a2e-4a932ea5e5b4',
                tenantCode: 'cdcm3c4ltekf12ih4b2uty6fjengs024msxfrbslkt3eop1v8v',
                systemId: '5e5a4b9b-ad3c-4316-a380-3c2e28cda9ef',
                systemName: 'sa2dl91un3i4pheg3cqh',
                executionId: 'ee13a826-3591-4d05-9c8b-1a000cc79b7a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 07:16:48',
                executionMonitoringStartAt: '2020-07-27 03:02:19',
                executionMonitoringEndAt: 'XXXXXXXX',
                numberMax: 7067335538,
                numberDays: 6206825308,
                success: 7178161181,
                cancelled: 3048180945,
                delivering: 7444950368,
                error: 9413111622,
                holding: 8613704028,
                toBeDelivered: 6732640890,
                waiting: 2541036703,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST bplus-it-sappi/message-overview`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '1f7762ce-b6f9-47eb-b9d0-31a290b1157f',
                tenantId: 'fb5d68b5-532b-46e3-8a2e-4a932ea5e5b4',
                tenantCode: '8vbmjo61c180xkai6gaz9j8rzn3jzwraly10hkyey8sxx97xo8',
                systemId: '5e5a4b9b-ad3c-4316-a380-3c2e28cda9ef',
                systemName: '67zega15xo2i2j8q7gz7',
                executionId: 'ee13a826-3591-4d05-9c8b-1a000cc79b7a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 08:12:18',
                executionMonitoringStartAt: '2020-07-27 15:33:12',
                executionMonitoringEndAt: '2020-07-27 16:29:07',
                numberMax: 4576523303,
                numberDays: 6343735569,
                success: 8342231895,
                cancelled: 2209185309,
                delivering: 1350193480,
                error: 8759654246,
                holding: 2640723330,
                toBeDelivered: 2320382664,
                waiting: 8664555830,
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/messages-overview/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/messages-overview/paginate')
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

    test(`/REST:GET bplus-it-sappi/message-overview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-overview')
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

    test(`/REST:GET bplus-it-sappi/message-overview`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '1f7762ce-b6f9-47eb-b9d0-31a290b1157f'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '1f7762ce-b6f9-47eb-b9d0-31a290b1157f'));
    });

    test(`/REST:GET bplus-it-sappi/message-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-overview/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/message-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-overview/1f7762ce-b6f9-47eb-b9d0-31a290b1157f')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '1f7762ce-b6f9-47eb-b9d0-31a290b1157f'));
    });

    test(`/REST:GET bplus-it-sappi/messages-overview`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/messages-overview')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/message-overview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: 'a9d0b953-c9d9-469a-bb5d-36c5df333501',
                tenantId: '7bed91e2-0624-4b7c-9d20-deb301306616',
                tenantCode: 'a23577zbfpcu43h4bvqxllk1ru4dmdqifilwln7b5xpl8c2mzx',
                systemId: '94d9d28c-7765-4add-aa76-b104c2913ef9',
                systemName: 'rvnn6pz1zd9vruno8xti',
                executionId: 'ea30c47d-82f2-4a61-a08a-898898cd5ecb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 00:04:31',
                executionMonitoringStartAt: '2020-07-27 14:43:11',
                executionMonitoringEndAt: '2020-07-27 11:52:00',
                numberMax: 3913651860,
                numberDays: 5215737962,
                success: 2437502084,
                cancelled: 9151281177,
                delivering: 2137849857,
                error: 5938938459,
                holding: 2869464919,
                toBeDelivered: 6157819455,
                waiting: 4959292240,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/message-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: '1f7762ce-b6f9-47eb-b9d0-31a290b1157f',
                tenantId: 'fb5d68b5-532b-46e3-8a2e-4a932ea5e5b4',
                tenantCode: 'vi5b0ijmemy1y5dgva4bcg3xxo1fdznw0q3v7zhj8y0myvomdf',
                systemId: '5e5a4b9b-ad3c-4316-a380-3c2e28cda9ef',
                systemName: 'skuv1ogfzircxkef3tqs',
                executionId: 'ee13a826-3591-4d05-9c8b-1a000cc79b7a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 03:12:29',
                executionMonitoringStartAt: '2020-07-27 22:56:51',
                executionMonitoringEndAt: '2020-07-27 23:42:17',
                numberMax: 9937947261,
                numberDays: 3371513247,
                success: 3369114748,
                cancelled: 1172400614,
                delivering: 4118008029,
                error: 2599873781,
                holding: 2653871914,
                toBeDelivered: 6735546312,
                waiting: 6973758140,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '1f7762ce-b6f9-47eb-b9d0-31a290b1157f'));
    });

    test(`/REST:DELETE bplus-it-sappi/message-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/message-overview/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/message-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/message-overview/1f7762ce-b6f9-47eb-b9d0-31a290b1157f')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateMessageOverview - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateMessageOverviewInput!)
                    {
                        bplusItSappiCreateMessageOverview (payload:$payload)
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

    test(`/GraphQL bplusItSappiCreateMessageOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateMessageOverviewInput!)
                    {
                        bplusItSappiCreateMessageOverview (payload:$payload)
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
                        id: 'e45cd4ec-8669-4bf9-9be1-253d7f2a7f35',
                        tenantId: 'fb5d68b5-532b-46e3-8a2e-4a932ea5e5b4',
                        tenantCode: '218xvsa87ptjq0f8a7o39se6vrefq2etkl9xlz1saafdmszubm',
                        systemId: '5e5a4b9b-ad3c-4316-a380-3c2e28cda9ef',
                        systemName: 'ytdvyypv0gjqj5soh9kl',
                        executionId: 'ee13a826-3591-4d05-9c8b-1a000cc79b7a',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-27 20:43:45',
                        executionMonitoringStartAt: '2020-07-27 22:46:34',
                        executionMonitoringEndAt: '2020-07-27 17:49:40',
                        numberMax: 4068301772,
                        numberDays: 6902111942,
                        success: 9965101307,
                        cancelled: 8730328632,
                        delivering: 8154306461,
                        error: 9244221069,
                        holding: 8753677238,
                        toBeDelivered: 7037777607,
                        waiting: 2662476433,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateMessageOverview).toHaveProperty('id', 'e45cd4ec-8669-4bf9-9be1-253d7f2a7f35');
            });
    });

    test(`/GraphQL bplusItSappiPaginateMessagesOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateMessagesOverview (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateMessagesOverview.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateMessagesOverview.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateMessagesOverview.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindMessageOverview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindMessageOverview (query:$query)
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

    test(`/GraphQL bplusItSappiFindMessageOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindMessageOverview (query:$query)
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
                    query: [
                        {
                            command : Command.WHERE,
                            column  : 'id',
                            operator: Operator.EQUALS,
                            value   : '1f7762ce-b6f9-47eb-b9d0-31a290b1157f'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageOverview.id).toStrictEqual('1f7762ce-b6f9-47eb-b9d0-31a290b1157f');
            });
    });

    test(`/GraphQL bplusItSappiFindMessageOverviewById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindMessageOverviewById (id:$id)
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

    test(`/GraphQL bplusItSappiFindMessageOverviewById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindMessageOverviewById (id:$id)
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
                    id: '1f7762ce-b6f9-47eb-b9d0-31a290b1157f'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageOverviewById.id).toStrictEqual('1f7762ce-b6f9-47eb-b9d0-31a290b1157f');
            });
    });

    test(`/GraphQL bplusItSappiGetMessagesOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetMessagesOverview (query:$query)
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
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetMessagesOverview.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateMessageOverview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateMessageOverviewInput!)
                    {
                        bplusItSappiUpdateMessageOverview (payload:$payload)
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
                        
                        id: 'c5621bba-47c5-48d2-8fdc-99963e0dd990',
                        tenantId: 'f23b81b3-8200-45e6-9b80-c2c55822be27',
                        tenantCode: 'jxwkj9e9nmtnmywxtaug862r7gz8dy94ltdubvad3y8wvqaj06',
                        systemId: 'f69fb1b1-c173-41eb-9899-0d4357cf7a8b',
                        systemName: 'lezojxrc11v3j2lcxwk9',
                        executionId: '04745f4c-b508-41bb-822e-19fccec5a91f',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-27 07:32:26',
                        executionMonitoringStartAt: '2020-07-27 14:25:52',
                        executionMonitoringEndAt: '2020-07-27 16:00:55',
                        numberMax: 7333681379,
                        numberDays: 9736056009,
                        success: 1143424456,
                        cancelled: 5992035626,
                        delivering: 6970416084,
                        error: 5260811719,
                        holding: 8909580313,
                        toBeDelivered: 8248729239,
                        waiting: 2413778453,
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

    test(`/GraphQL bplusItSappiUpdateMessageOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateMessageOverviewInput!)
                    {
                        bplusItSappiUpdateMessageOverview (payload:$payload)
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
                        
                        id: '1f7762ce-b6f9-47eb-b9d0-31a290b1157f',
                        tenantId: 'fb5d68b5-532b-46e3-8a2e-4a932ea5e5b4',
                        tenantCode: 'f02hhnxyem0umetg8t8wsxwiykuze00ag708tgqqi9fvs82jll',
                        systemId: '5e5a4b9b-ad3c-4316-a380-3c2e28cda9ef',
                        systemName: 'hqgitgda101djr0ka0te',
                        executionId: 'ee13a826-3591-4d05-9c8b-1a000cc79b7a',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-27 01:33:06',
                        executionMonitoringStartAt: '2020-07-27 19:22:14',
                        executionMonitoringEndAt: '2020-07-27 19:18:57',
                        numberMax: 4587906177,
                        numberDays: 4840923849,
                        success: 5636446691,
                        cancelled: 9927286467,
                        delivering: 4218904175,
                        error: 4983766861,
                        holding: 6338777976,
                        toBeDelivered: 5844457258,
                        waiting: 6083726526,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateMessageOverview.id).toStrictEqual('1f7762ce-b6f9-47eb-b9d0-31a290b1157f');
            });
    });

    test(`/GraphQL bplusItSappiDeleteMessageOverviewById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteMessageOverviewById (id:$id)
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

    test(`/GraphQL bplusItSappiDeleteMessageOverviewById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteMessageOverviewById (id:$id)
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
                    id: '1f7762ce-b6f9-47eb-b9d0-31a290b1157f'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteMessageOverviewById.id).toStrictEqual('1f7762ce-b6f9-47eb-b9d0-31a290b1157f');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});