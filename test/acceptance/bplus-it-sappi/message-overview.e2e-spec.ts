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
                tenantId: '96585ecd-8986-4a3e-b1b1-fce865f754e9',
                tenantCode: '9ae16z2kloyrh066d6qcdtyxd59p4ylxhr0per6gka588mk1rs',
                systemId: 'a0a3ac43-1659-410d-b646-53d5e5ab400f',
                systemName: '2cqkerujbcoukjddnqnt',
                executionId: 'b8bd3c32-4f4c-4794-87af-9ae80e128de1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 15:05:25',
                executionMonitoringStartAt: '2020-07-22 21:37:22',
                executionMonitoringEndAt: '2020-07-23 00:31:33',
                numberMax: 7333070807,
                numberDays: 7125062591,
                success: 3446855230,
                cancelled: 1621303652,
                delivering: 1124174843,
                error: 8122185303,
                holding: 8385752314,
                toBeDelivered: 2069301276,
                waiting: 2327679421,
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
                
                tenantId: '96585ecd-8986-4a3e-b1b1-fce865f754e9',
                tenantCode: 'y8c13ygf9zzmm0iyps0de2qmz9xqoh983ur9ehq10tqaai27tk',
                systemId: 'a0a3ac43-1659-410d-b646-53d5e5ab400f',
                systemName: 'n4aspl94gta205ydt6f6',
                executionId: 'b8bd3c32-4f4c-4794-87af-9ae80e128de1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 13:37:40',
                executionMonitoringStartAt: '2020-07-23 02:27:02',
                executionMonitoringEndAt: '2020-07-23 02:32:25',
                numberMax: 1838829765,
                numberDays: 1369890141,
                success: 2850494799,
                cancelled: 1351718286,
                delivering: 4112525891,
                error: 2137267832,
                holding: 4682641931,
                toBeDelivered: 3164087190,
                waiting: 3572371601,
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
                id: '6121f161-a148-4e86-9a4f-17702ba0e0f6',
                tenantId: null,
                tenantCode: '1qcpgxdlfqx2txsue5pe7lz6cu66cxpn10dwqqxkjackex6dvg',
                systemId: 'a0a3ac43-1659-410d-b646-53d5e5ab400f',
                systemName: 'yklcefigzg1liutxjymf',
                executionId: 'b8bd3c32-4f4c-4794-87af-9ae80e128de1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 00:01:51',
                executionMonitoringStartAt: '2020-07-23 15:00:05',
                executionMonitoringEndAt: '2020-07-23 02:28:36',
                numberMax: 9943685840,
                numberDays: 3736852331,
                success: 1497572024,
                cancelled: 1123941930,
                delivering: 6114478649,
                error: 2733022064,
                holding: 7696218617,
                toBeDelivered: 7007615128,
                waiting: 5723540205,
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
                id: '6121f161-a148-4e86-9a4f-17702ba0e0f6',
                
                tenantCode: 'i5g7mzyozvk1f82obhrpd99gqma82fvgkfrqqy98urerczpxoz',
                systemId: 'a0a3ac43-1659-410d-b646-53d5e5ab400f',
                systemName: 'fh2e8y6ryp1zgm9mtear',
                executionId: 'b8bd3c32-4f4c-4794-87af-9ae80e128de1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 15:15:36',
                executionMonitoringStartAt: '2020-07-23 01:46:17',
                executionMonitoringEndAt: '2020-07-23 12:24:20',
                numberMax: 6714130109,
                numberDays: 7990518793,
                success: 4728324177,
                cancelled: 7449064847,
                delivering: 5322773205,
                error: 1892857847,
                holding: 4458416707,
                toBeDelivered: 8133347422,
                waiting: 9907835366,
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
                id: '6121f161-a148-4e86-9a4f-17702ba0e0f6',
                tenantId: '96585ecd-8986-4a3e-b1b1-fce865f754e9',
                tenantCode: null,
                systemId: 'a0a3ac43-1659-410d-b646-53d5e5ab400f',
                systemName: 't9z293cqki8tc99m02o5',
                executionId: 'b8bd3c32-4f4c-4794-87af-9ae80e128de1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 18:14:49',
                executionMonitoringStartAt: '2020-07-22 19:30:11',
                executionMonitoringEndAt: '2020-07-23 02:42:35',
                numberMax: 6043267255,
                numberDays: 1832025656,
                success: 5871128755,
                cancelled: 5660310375,
                delivering: 4451377964,
                error: 4399092163,
                holding: 7109897990,
                toBeDelivered: 7842291659,
                waiting: 8455271552,
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
                id: '6121f161-a148-4e86-9a4f-17702ba0e0f6',
                tenantId: '96585ecd-8986-4a3e-b1b1-fce865f754e9',
                
                systemId: 'a0a3ac43-1659-410d-b646-53d5e5ab400f',
                systemName: '4945t5aqbacitqgqso2u',
                executionId: 'b8bd3c32-4f4c-4794-87af-9ae80e128de1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 16:10:54',
                executionMonitoringStartAt: '2020-07-23 08:45:54',
                executionMonitoringEndAt: '2020-07-23 06:11:27',
                numberMax: 4020897114,
                numberDays: 9550310518,
                success: 2916284450,
                cancelled: 8033754167,
                delivering: 9060109016,
                error: 8335753670,
                holding: 7240133006,
                toBeDelivered: 4110945347,
                waiting: 9637165905,
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
                id: '6121f161-a148-4e86-9a4f-17702ba0e0f6',
                tenantId: '96585ecd-8986-4a3e-b1b1-fce865f754e9',
                tenantCode: 'zd1d4ga56bpkl0wglkbmg5g8d7mcto92ungusvlvvlqgcg8qr6',
                systemId: null,
                systemName: '8dtcj9tbfvpv3tz6khhm',
                executionId: 'b8bd3c32-4f4c-4794-87af-9ae80e128de1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 09:55:52',
                executionMonitoringStartAt: '2020-07-23 15:47:30',
                executionMonitoringEndAt: '2020-07-23 02:22:24',
                numberMax: 9840932049,
                numberDays: 3820859576,
                success: 8468218859,
                cancelled: 8969240381,
                delivering: 3698454056,
                error: 3258701011,
                holding: 3438322495,
                toBeDelivered: 8020146471,
                waiting: 6040449080,
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
                id: '6121f161-a148-4e86-9a4f-17702ba0e0f6',
                tenantId: '96585ecd-8986-4a3e-b1b1-fce865f754e9',
                tenantCode: 'x0wmotl6zhbnx74waktx7zofcb1l40n2zftm7dzxqh2eqj1qux',
                
                systemName: 'uza3umj83j8hrz52uo6q',
                executionId: 'b8bd3c32-4f4c-4794-87af-9ae80e128de1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-22 20:19:56',
                executionMonitoringStartAt: '2020-07-22 19:48:43',
                executionMonitoringEndAt: '2020-07-22 23:28:29',
                numberMax: 3896980678,
                numberDays: 9785739455,
                success: 7050501378,
                cancelled: 7236643318,
                delivering: 4134243059,
                error: 5517339308,
                holding: 2911500859,
                toBeDelivered: 5220329075,
                waiting: 5541697418,
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
                id: '6121f161-a148-4e86-9a4f-17702ba0e0f6',
                tenantId: '96585ecd-8986-4a3e-b1b1-fce865f754e9',
                tenantCode: 'dg4e80tnsyh4jod8muk9koh89mlx7rlnkuvkeaas8x7gxovpb3',
                systemId: 'a0a3ac43-1659-410d-b646-53d5e5ab400f',
                systemName: null,
                executionId: 'b8bd3c32-4f4c-4794-87af-9ae80e128de1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 06:49:35',
                executionMonitoringStartAt: '2020-07-22 23:17:38',
                executionMonitoringEndAt: '2020-07-22 19:37:42',
                numberMax: 1246209978,
                numberDays: 7837218510,
                success: 5387766424,
                cancelled: 6604548834,
                delivering: 9222233457,
                error: 5718061383,
                holding: 2848423267,
                toBeDelivered: 2258847130,
                waiting: 8248269515,
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
                id: '6121f161-a148-4e86-9a4f-17702ba0e0f6',
                tenantId: '96585ecd-8986-4a3e-b1b1-fce865f754e9',
                tenantCode: 'erpn9puu64j4tfit2b6rpxs6m8ixq9rz8zp1zwtsu2c5mhv175',
                systemId: 'a0a3ac43-1659-410d-b646-53d5e5ab400f',
                
                executionId: 'b8bd3c32-4f4c-4794-87af-9ae80e128de1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-22 20:32:35',
                executionMonitoringStartAt: '2020-07-23 03:09:22',
                executionMonitoringEndAt: '2020-07-23 17:51:24',
                numberMax: 2722352701,
                numberDays: 8497659533,
                success: 3441132742,
                cancelled: 3433241902,
                delivering: 2227485206,
                error: 2912878855,
                holding: 6199825377,
                toBeDelivered: 8531366594,
                waiting: 5209891411,
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
                id: '6121f161-a148-4e86-9a4f-17702ba0e0f6',
                tenantId: '96585ecd-8986-4a3e-b1b1-fce865f754e9',
                tenantCode: 'yy5vwn7nqdzxvyb24nyai0141x6lpjq6av9k09bfsm8kz88l2n',
                systemId: 'a0a3ac43-1659-410d-b646-53d5e5ab400f',
                systemName: 'samwotkdseha3s9dnxul',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 02:35:30',
                executionMonitoringStartAt: '2020-07-23 15:48:01',
                executionMonitoringEndAt: '2020-07-23 15:07:07',
                numberMax: 2288661442,
                numberDays: 9484541400,
                success: 5258826145,
                cancelled: 2325738323,
                delivering: 6513803930,
                error: 7030685265,
                holding: 1117962697,
                toBeDelivered: 6839389028,
                waiting: 5270312636,
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
                id: '6121f161-a148-4e86-9a4f-17702ba0e0f6',
                tenantId: '96585ecd-8986-4a3e-b1b1-fce865f754e9',
                tenantCode: 'rx88s967dd9kmonfkvwzyllbotwgzs79ylp0vjzqcnnoai12rt',
                systemId: 'a0a3ac43-1659-410d-b646-53d5e5ab400f',
                systemName: '1izcgepza5wuu8w61dij',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 12:43:38',
                executionMonitoringStartAt: '2020-07-23 00:39:13',
                executionMonitoringEndAt: '2020-07-23 14:26:27',
                numberMax: 9682323483,
                numberDays: 2630482286,
                success: 5465077268,
                cancelled: 7416466135,
                delivering: 6257250217,
                error: 4248608407,
                holding: 3790097681,
                toBeDelivered: 6851985379,
                waiting: 2376524477,
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
                id: '6121f161-a148-4e86-9a4f-17702ba0e0f6',
                tenantId: '96585ecd-8986-4a3e-b1b1-fce865f754e9',
                tenantCode: '6i3c3tchuuobohj4xmo3kplspqzzp1q35ggxl61ndhrgfily7j',
                systemId: 'a0a3ac43-1659-410d-b646-53d5e5ab400f',
                systemName: 'ok8oi8qok8d5hrjwomtf',
                executionId: 'b8bd3c32-4f4c-4794-87af-9ae80e128de1',
                executionType: null,
                executionExecutedAt: '2020-07-23 14:43:52',
                executionMonitoringStartAt: '2020-07-23 09:03:13',
                executionMonitoringEndAt: '2020-07-22 23:10:20',
                numberMax: 8993020826,
                numberDays: 3213226891,
                success: 6002631300,
                cancelled: 7208878279,
                delivering: 2690837802,
                error: 2155701236,
                holding: 8577018142,
                toBeDelivered: 9678752905,
                waiting: 9495605033,
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
                id: '6121f161-a148-4e86-9a4f-17702ba0e0f6',
                tenantId: '96585ecd-8986-4a3e-b1b1-fce865f754e9',
                tenantCode: 'gs3vd7k31iftcw9b3h9tc7d8brtts59bj999kcg3jgydcm86ny',
                systemId: 'a0a3ac43-1659-410d-b646-53d5e5ab400f',
                systemName: 'o99jox7n6fs6ag3iiims',
                executionId: 'b8bd3c32-4f4c-4794-87af-9ae80e128de1',
                
                executionExecutedAt: '2020-07-23 09:57:11',
                executionMonitoringStartAt: '2020-07-22 20:22:54',
                executionMonitoringEndAt: '2020-07-23 01:34:53',
                numberMax: 2901843039,
                numberDays: 4220658837,
                success: 2681935230,
                cancelled: 3947820829,
                delivering: 5068184799,
                error: 1298831515,
                holding: 4675957881,
                toBeDelivered: 9447087892,
                waiting: 6871634750,
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
                id: '6121f161-a148-4e86-9a4f-17702ba0e0f6',
                tenantId: '96585ecd-8986-4a3e-b1b1-fce865f754e9',
                tenantCode: 'traxz270o2uszq1rg6q5hymqfwb5ysoxc0klz4ncl047o2tenx',
                systemId: 'a0a3ac43-1659-410d-b646-53d5e5ab400f',
                systemName: 'y9qlhlvr0kzl4lb884rm',
                executionId: 'b8bd3c32-4f4c-4794-87af-9ae80e128de1',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-22 18:59:39',
                executionMonitoringEndAt: '2020-07-23 09:35:29',
                numberMax: 2208310638,
                numberDays: 7887049416,
                success: 9167978805,
                cancelled: 1572628272,
                delivering: 6419068986,
                error: 7179052272,
                holding: 5535279316,
                toBeDelivered: 3827975804,
                waiting: 5777188425,
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
                id: '6121f161-a148-4e86-9a4f-17702ba0e0f6',
                tenantId: '96585ecd-8986-4a3e-b1b1-fce865f754e9',
                tenantCode: 'he97ls6n0b551uyihad7xil8wrw9rlxp77x8u0orm0b1racxsd',
                systemId: 'a0a3ac43-1659-410d-b646-53d5e5ab400f',
                systemName: 'g6cr5hhsft45il6hf365',
                executionId: 'b8bd3c32-4f4c-4794-87af-9ae80e128de1',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-07-22 20:18:46',
                executionMonitoringEndAt: '2020-07-23 11:32:33',
                numberMax: 7057739411,
                numberDays: 9164809906,
                success: 2245476679,
                cancelled: 5123603186,
                delivering: 1833792842,
                error: 2620284164,
                holding: 7226544953,
                toBeDelivered: 3677817514,
                waiting: 4515301654,
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
                id: '6121f161-a148-4e86-9a4f-17702ba0e0f6',
                tenantId: '96585ecd-8986-4a3e-b1b1-fce865f754e9',
                tenantCode: 'aca7yi6vvlozwk14z2vs9vdgxxip9a2u6uo6q66m39vz56fk2n',
                systemId: 'a0a3ac43-1659-410d-b646-53d5e5ab400f',
                systemName: 'evasbbn234gt72alca2v',
                executionId: 'b8bd3c32-4f4c-4794-87af-9ae80e128de1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 07:18:14',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-22 19:09:36',
                numberMax: 3128538479,
                numberDays: 8547015183,
                success: 7660387762,
                cancelled: 4650938203,
                delivering: 6621946863,
                error: 7600042268,
                holding: 1786785455,
                toBeDelivered: 6894785209,
                waiting: 4555633722,
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
                id: '6121f161-a148-4e86-9a4f-17702ba0e0f6',
                tenantId: '96585ecd-8986-4a3e-b1b1-fce865f754e9',
                tenantCode: '62b8x5zfjvfbhdhpzthzfamir5z4fdxkidwacym8td1jil8qeg',
                systemId: 'a0a3ac43-1659-410d-b646-53d5e5ab400f',
                systemName: 'iaazm3pa7309yc1sqdz0',
                executionId: 'b8bd3c32-4f4c-4794-87af-9ae80e128de1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 13:34:19',
                
                executionMonitoringEndAt: '2020-07-22 19:26:26',
                numberMax: 2656502877,
                numberDays: 2040508884,
                success: 9797261244,
                cancelled: 4679895881,
                delivering: 1724605764,
                error: 4447185881,
                holding: 5183967120,
                toBeDelivered: 3715954793,
                waiting: 3887482126,
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
                id: '6121f161-a148-4e86-9a4f-17702ba0e0f6',
                tenantId: '96585ecd-8986-4a3e-b1b1-fce865f754e9',
                tenantCode: '7jziz8fg8gv6163ty0j97inttoxmbus52ply9n4qammbr69mwn',
                systemId: 'a0a3ac43-1659-410d-b646-53d5e5ab400f',
                systemName: 'iaojmqlm7bds7990dkax',
                executionId: 'b8bd3c32-4f4c-4794-87af-9ae80e128de1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 01:21:18',
                executionMonitoringStartAt: '2020-07-23 18:19:32',
                executionMonitoringEndAt: null,
                numberMax: 7322165132,
                numberDays: 5836732495,
                success: 6860852660,
                cancelled: 3327998022,
                delivering: 2388378726,
                error: 3139092105,
                holding: 7508512820,
                toBeDelivered: 3345010042,
                waiting: 8223765245,
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
                id: '6121f161-a148-4e86-9a4f-17702ba0e0f6',
                tenantId: '96585ecd-8986-4a3e-b1b1-fce865f754e9',
                tenantCode: '31e252yjla6cjv7untv1yzz2t0ltkrx38spohumh3o6akiwxoj',
                systemId: 'a0a3ac43-1659-410d-b646-53d5e5ab400f',
                systemName: 'lqt6ifcuco7369wdnkfi',
                executionId: 'b8bd3c32-4f4c-4794-87af-9ae80e128de1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-22 23:42:32',
                executionMonitoringStartAt: '2020-07-23 11:00:08',
                
                numberMax: 5391141396,
                numberDays: 5941225124,
                success: 8461736116,
                cancelled: 8796083532,
                delivering: 8323347765,
                error: 7160530533,
                holding: 4891957238,
                toBeDelivered: 5844142739,
                waiting: 3111054982,
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
                id: 'u56wfj85a23f3q4pxwcmzs9i0gholr2bb4ywy',
                tenantId: '96585ecd-8986-4a3e-b1b1-fce865f754e9',
                tenantCode: 'gzl5usn2v98x6kcluwob3vcu2ty3wcfro0p3if9o1rv3r721vn',
                systemId: 'a0a3ac43-1659-410d-b646-53d5e5ab400f',
                systemName: '9peik8fikvzm5zzdjrwd',
                executionId: 'b8bd3c32-4f4c-4794-87af-9ae80e128de1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 17:04:19',
                executionMonitoringStartAt: '2020-07-23 06:23:38',
                executionMonitoringEndAt: '2020-07-22 21:30:18',
                numberMax: 4270240546,
                numberDays: 3090756584,
                success: 3437206534,
                cancelled: 8805847958,
                delivering: 7900607507,
                error: 9641200831,
                holding: 2045291370,
                toBeDelivered: 1026643893,
                waiting: 8376570248,
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
                id: '6121f161-a148-4e86-9a4f-17702ba0e0f6',
                tenantId: '07zkb4e2plno80w5bemkeiwqy7uo7jjpj6aag',
                tenantCode: '24vmpjijdwhlt352vmg4ekj0ajq865c5ojduyayej52kybjs7t',
                systemId: 'a0a3ac43-1659-410d-b646-53d5e5ab400f',
                systemName: 'jchces5qtfitoh82yatv',
                executionId: 'b8bd3c32-4f4c-4794-87af-9ae80e128de1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 12:27:13',
                executionMonitoringStartAt: '2020-07-23 12:44:45',
                executionMonitoringEndAt: '2020-07-23 09:20:45',
                numberMax: 9134711872,
                numberDays: 6189145077,
                success: 5040088082,
                cancelled: 7057393874,
                delivering: 3513449359,
                error: 4985602310,
                holding: 4407948619,
                toBeDelivered: 1967938466,
                waiting: 1568668457,
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
                id: '6121f161-a148-4e86-9a4f-17702ba0e0f6',
                tenantId: '96585ecd-8986-4a3e-b1b1-fce865f754e9',
                tenantCode: '94xuhki8uo8hvfxmhqyxtjyofuy3uohddsvu1u8tz9kp9tvcds',
                systemId: 'wa0wdajg3brptefpfp7okac37dl9n04jvl3fi',
                systemName: 'jqa69x2keqeqf0jjfiqs',
                executionId: 'b8bd3c32-4f4c-4794-87af-9ae80e128de1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 03:53:09',
                executionMonitoringStartAt: '2020-07-23 05:35:39',
                executionMonitoringEndAt: '2020-07-23 17:34:06',
                numberMax: 8832723148,
                numberDays: 9308096302,
                success: 1437934185,
                cancelled: 1112002489,
                delivering: 6650551460,
                error: 9808784619,
                holding: 5663493373,
                toBeDelivered: 2806368317,
                waiting: 1330106699,
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
                id: '6121f161-a148-4e86-9a4f-17702ba0e0f6',
                tenantId: '96585ecd-8986-4a3e-b1b1-fce865f754e9',
                tenantCode: 'rigmsa09ggjnaf6rqsrvcc3gkzozqs9lsxneg1y3xhc1pp59nh',
                systemId: 'a0a3ac43-1659-410d-b646-53d5e5ab400f',
                systemName: '7qaptcaa7qcs9yjb0j7a',
                executionId: 'ell0pavhhl2orvj413vcft2buezei4bkvwrwd',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 17:32:47',
                executionMonitoringStartAt: '2020-07-22 23:36:22',
                executionMonitoringEndAt: '2020-07-23 10:23:34',
                numberMax: 2115372339,
                numberDays: 5400228540,
                success: 3391058606,
                cancelled: 2960519972,
                delivering: 9069280538,
                error: 8805819443,
                holding: 5024072361,
                toBeDelivered: 7665220812,
                waiting: 5162128272,
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
                id: '6121f161-a148-4e86-9a4f-17702ba0e0f6',
                tenantId: '96585ecd-8986-4a3e-b1b1-fce865f754e9',
                tenantCode: 'h9l0dtmmhc6th3qxvghftrs0cjh7frhpe2c98dbzvfnmeced17w',
                systemId: 'a0a3ac43-1659-410d-b646-53d5e5ab400f',
                systemName: 'ofpgcbmjkqtfhvrpl7dn',
                executionId: 'b8bd3c32-4f4c-4794-87af-9ae80e128de1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 06:33:33',
                executionMonitoringStartAt: '2020-07-23 12:01:19',
                executionMonitoringEndAt: '2020-07-23 14:45:18',
                numberMax: 5390246549,
                numberDays: 6087180600,
                success: 6587870124,
                cancelled: 4951659373,
                delivering: 5969988883,
                error: 2359254326,
                holding: 5067001176,
                toBeDelivered: 9860222213,
                waiting: 9900176170,
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
                id: '6121f161-a148-4e86-9a4f-17702ba0e0f6',
                tenantId: '96585ecd-8986-4a3e-b1b1-fce865f754e9',
                tenantCode: 'xjuicbeg9qzbo22kyykt60d0cn800p9h1p7tgwz91h815gyu36',
                systemId: 'a0a3ac43-1659-410d-b646-53d5e5ab400f',
                systemName: 'gurb5r951gk5zaln54zzn',
                executionId: 'b8bd3c32-4f4c-4794-87af-9ae80e128de1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 11:36:24',
                executionMonitoringStartAt: '2020-07-23 01:56:28',
                executionMonitoringEndAt: '2020-07-23 12:24:47',
                numberMax: 7171153520,
                numberDays: 6754398965,
                success: 3650122583,
                cancelled: 8375655532,
                delivering: 2442784585,
                error: 5615146677,
                holding: 1237972744,
                toBeDelivered: 2098899536,
                waiting: 7140788488,
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
                id: '6121f161-a148-4e86-9a4f-17702ba0e0f6',
                tenantId: '96585ecd-8986-4a3e-b1b1-fce865f754e9',
                tenantCode: 'yfguec7a13el8zt9l2epeq2t75jdoqm8p4yr4by6pp9gq31ovi',
                systemId: 'a0a3ac43-1659-410d-b646-53d5e5ab400f',
                systemName: 'utkb1sj8ersmvxrt67kk',
                executionId: 'b8bd3c32-4f4c-4794-87af-9ae80e128de1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 18:13:25',
                executionMonitoringStartAt: '2020-07-23 04:28:12',
                executionMonitoringEndAt: '2020-07-22 19:32:47',
                numberMax: 35036135822,
                numberDays: 5489655929,
                success: 3701473127,
                cancelled: 7261999434,
                delivering: 7746683989,
                error: 9192727929,
                holding: 2589136404,
                toBeDelivered: 7051381547,
                waiting: 9147141429,
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
                id: '6121f161-a148-4e86-9a4f-17702ba0e0f6',
                tenantId: '96585ecd-8986-4a3e-b1b1-fce865f754e9',
                tenantCode: '6nkkh7sleisv27oz29exuj30uxtkx572ahm4v7igz0797une3n',
                systemId: 'a0a3ac43-1659-410d-b646-53d5e5ab400f',
                systemName: 'rv25t5af8bpyuokyn1ki',
                executionId: 'b8bd3c32-4f4c-4794-87af-9ae80e128de1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-22 19:08:34',
                executionMonitoringStartAt: '2020-07-23 03:28:51',
                executionMonitoringEndAt: '2020-07-23 17:53:49',
                numberMax: 5195649646,
                numberDays: 39472309877,
                success: 4812629528,
                cancelled: 7711230819,
                delivering: 9568253537,
                error: 1305386955,
                holding: 5983122130,
                toBeDelivered: 8156720848,
                waiting: 9252088197,
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
                id: '6121f161-a148-4e86-9a4f-17702ba0e0f6',
                tenantId: '96585ecd-8986-4a3e-b1b1-fce865f754e9',
                tenantCode: 'z1gop1c6ks88h6tfahkwbf0hz0g76tijienb8x8vwxub19baff',
                systemId: 'a0a3ac43-1659-410d-b646-53d5e5ab400f',
                systemName: 's9txcln8ther139e6shn',
                executionId: 'b8bd3c32-4f4c-4794-87af-9ae80e128de1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 18:26:24',
                executionMonitoringStartAt: '2020-07-23 16:26:20',
                executionMonitoringEndAt: '2020-07-23 17:09:23',
                numberMax: 5551981180,
                numberDays: 6927549193,
                success: 28646729012,
                cancelled: 8621326617,
                delivering: 1218154704,
                error: 8933069017,
                holding: 7741215599,
                toBeDelivered: 2883477663,
                waiting: 6648439468,
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
                id: '6121f161-a148-4e86-9a4f-17702ba0e0f6',
                tenantId: '96585ecd-8986-4a3e-b1b1-fce865f754e9',
                tenantCode: 'kw0rjz206my7sdg62ej4w425fe22l6zzjo3kfdf2homfbknw9k',
                systemId: 'a0a3ac43-1659-410d-b646-53d5e5ab400f',
                systemName: 'ne5zhy3l3mtwr5k1spur',
                executionId: 'b8bd3c32-4f4c-4794-87af-9ae80e128de1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-22 21:19:16',
                executionMonitoringStartAt: '2020-07-23 15:56:52',
                executionMonitoringEndAt: '2020-07-23 10:12:52',
                numberMax: 8891804994,
                numberDays: 1742044713,
                success: 4546652330,
                cancelled: 95659923056,
                delivering: 9719146360,
                error: 9462275007,
                holding: 5351148612,
                toBeDelivered: 7175266062,
                waiting: 3142661115,
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
                id: '6121f161-a148-4e86-9a4f-17702ba0e0f6',
                tenantId: '96585ecd-8986-4a3e-b1b1-fce865f754e9',
                tenantCode: 'qizhrhtlykjxzsx6boakfn81m1she96lu9hhmu1hplpj2ok9gs',
                systemId: 'a0a3ac43-1659-410d-b646-53d5e5ab400f',
                systemName: 'av3vhnjlhvtq8tj100rv',
                executionId: 'b8bd3c32-4f4c-4794-87af-9ae80e128de1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 05:13:07',
                executionMonitoringStartAt: '2020-07-23 01:09:42',
                executionMonitoringEndAt: '2020-07-23 02:00:23',
                numberMax: 3802668544,
                numberDays: 6500422188,
                success: 3349758398,
                cancelled: 3737963101,
                delivering: 26629214455,
                error: 3078210252,
                holding: 5362605889,
                toBeDelivered: 6838578809,
                waiting: 3802636535,
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
                id: '6121f161-a148-4e86-9a4f-17702ba0e0f6',
                tenantId: '96585ecd-8986-4a3e-b1b1-fce865f754e9',
                tenantCode: '47asow1432sbq97ij53lp3mvj6bb3yryc0ja5dsjdl1bcndmvs',
                systemId: 'a0a3ac43-1659-410d-b646-53d5e5ab400f',
                systemName: 'v6tbgumz0m59sysf84mh',
                executionId: 'b8bd3c32-4f4c-4794-87af-9ae80e128de1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 16:17:00',
                executionMonitoringStartAt: '2020-07-23 00:56:06',
                executionMonitoringEndAt: '2020-07-23 18:06:06',
                numberMax: 3637897418,
                numberDays: 7827271230,
                success: 8492360739,
                cancelled: 6152432882,
                delivering: 7833908642,
                error: 18736547873,
                holding: 3788928302,
                toBeDelivered: 6469905874,
                waiting: 1610410445,
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
                id: '6121f161-a148-4e86-9a4f-17702ba0e0f6',
                tenantId: '96585ecd-8986-4a3e-b1b1-fce865f754e9',
                tenantCode: '9i3ujitu7brspmi3k47plx0ug3boqzn5d3zlqxcrauygulg1ht',
                systemId: 'a0a3ac43-1659-410d-b646-53d5e5ab400f',
                systemName: 'z5zm9nhzrftnc054gvaa',
                executionId: 'b8bd3c32-4f4c-4794-87af-9ae80e128de1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 15:40:04',
                executionMonitoringStartAt: '2020-07-22 23:45:09',
                executionMonitoringEndAt: '2020-07-23 16:18:44',
                numberMax: 5670096344,
                numberDays: 8545036095,
                success: 3113609061,
                cancelled: 9456266989,
                delivering: 6049285573,
                error: 3998922287,
                holding: 51652386856,
                toBeDelivered: 1389931688,
                waiting: 9468585249,
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
                id: '6121f161-a148-4e86-9a4f-17702ba0e0f6',
                tenantId: '96585ecd-8986-4a3e-b1b1-fce865f754e9',
                tenantCode: '34e4tgyx67jhze40wyyan0inf95wr5um4zm174ammmgzyig1sn',
                systemId: 'a0a3ac43-1659-410d-b646-53d5e5ab400f',
                systemName: '7z5nmuqnfyseiqhas4ph',
                executionId: 'b8bd3c32-4f4c-4794-87af-9ae80e128de1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 03:51:55',
                executionMonitoringStartAt: '2020-07-23 10:23:06',
                executionMonitoringEndAt: '2020-07-23 03:38:10',
                numberMax: 8516232826,
                numberDays: 6183962103,
                success: 9254063375,
                cancelled: 9196168313,
                delivering: 3584112360,
                error: 4366016741,
                holding: 7005641656,
                toBeDelivered: 97689652946,
                waiting: 1482143557,
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
                id: '6121f161-a148-4e86-9a4f-17702ba0e0f6',
                tenantId: '96585ecd-8986-4a3e-b1b1-fce865f754e9',
                tenantCode: 'p06cst6gl200v731g864kiv5236k29172ujj9rko8bq3i2g7k7',
                systemId: 'a0a3ac43-1659-410d-b646-53d5e5ab400f',
                systemName: 'at4a0j85gti6fzt0uqdv',
                executionId: 'b8bd3c32-4f4c-4794-87af-9ae80e128de1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-22 19:49:11',
                executionMonitoringStartAt: '2020-07-22 22:21:19',
                executionMonitoringEndAt: '2020-07-23 06:51:33',
                numberMax: 8916638934,
                numberDays: 1973053185,
                success: 3568797387,
                cancelled: 7587541725,
                delivering: 9684104465,
                error: 9774296092,
                holding: 5806039537,
                toBeDelivered: 3409923182,
                waiting: 59619281636,
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
                id: '6121f161-a148-4e86-9a4f-17702ba0e0f6',
                tenantId: '96585ecd-8986-4a3e-b1b1-fce865f754e9',
                tenantCode: 'k11yk3t9dwpihh9objn8or9zm6sveh63rskq99pqxnd1z8czhg',
                systemId: 'a0a3ac43-1659-410d-b646-53d5e5ab400f',
                systemName: 'njey3mi5vq68x0pcd1s3',
                executionId: 'b8bd3c32-4f4c-4794-87af-9ae80e128de1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 01:46:49',
                executionMonitoringStartAt: '2020-07-23 06:34:27',
                executionMonitoringEndAt: '2020-07-23 17:31:39',
                numberMax: -9,
                numberDays: 9258946793,
                success: 7340718211,
                cancelled: 1985926669,
                delivering: 1189187656,
                error: 4531213450,
                holding: 5082618325,
                toBeDelivered: 2049308118,
                waiting: 9815259716,
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
                id: '6121f161-a148-4e86-9a4f-17702ba0e0f6',
                tenantId: '96585ecd-8986-4a3e-b1b1-fce865f754e9',
                tenantCode: '9khpkm6v1tjsyc4u07rbzovqff8qnicosxby00mzircg72yoc8',
                systemId: 'a0a3ac43-1659-410d-b646-53d5e5ab400f',
                systemName: '6ex6vf6t69izj8yovsfj',
                executionId: 'b8bd3c32-4f4c-4794-87af-9ae80e128de1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 18:08:12',
                executionMonitoringStartAt: '2020-07-23 09:30:23',
                executionMonitoringEndAt: '2020-07-23 13:10:41',
                numberMax: 5766881544,
                numberDays: -9,
                success: 4462474106,
                cancelled: 4671849248,
                delivering: 9045323419,
                error: 2058375615,
                holding: 7064206725,
                toBeDelivered: 7952601695,
                waiting: 9262975644,
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
                id: '6121f161-a148-4e86-9a4f-17702ba0e0f6',
                tenantId: '96585ecd-8986-4a3e-b1b1-fce865f754e9',
                tenantCode: '5gkioaolperiv0n3gzq2v6mlukde7dj82x4tslogf4vugtxijp',
                systemId: 'a0a3ac43-1659-410d-b646-53d5e5ab400f',
                systemName: 'fmd54l0b0rfne4n64det',
                executionId: 'b8bd3c32-4f4c-4794-87af-9ae80e128de1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 08:41:33',
                executionMonitoringStartAt: '2020-07-23 16:56:37',
                executionMonitoringEndAt: '2020-07-23 11:17:43',
                numberMax: 1372600500,
                numberDays: 9918432412,
                success: -9,
                cancelled: 4454821020,
                delivering: 7265163017,
                error: 4902683583,
                holding: 1511501365,
                toBeDelivered: 9482390056,
                waiting: 2417622396,
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
                id: '6121f161-a148-4e86-9a4f-17702ba0e0f6',
                tenantId: '96585ecd-8986-4a3e-b1b1-fce865f754e9',
                tenantCode: 'l37af1ld1gcvweqgynmpf6njd1627j663a5zqc8sgn8cxqxy0u',
                systemId: 'a0a3ac43-1659-410d-b646-53d5e5ab400f',
                systemName: 'jc8nw16ukezo55fs8dls',
                executionId: 'b8bd3c32-4f4c-4794-87af-9ae80e128de1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 14:50:52',
                executionMonitoringStartAt: '2020-07-23 07:55:57',
                executionMonitoringEndAt: '2020-07-23 02:39:07',
                numberMax: 7325624127,
                numberDays: 3671447319,
                success: 4342754110,
                cancelled: -9,
                delivering: 7243989088,
                error: 3284372703,
                holding: 7566882689,
                toBeDelivered: 4907376198,
                waiting: 7498055287,
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
                id: '6121f161-a148-4e86-9a4f-17702ba0e0f6',
                tenantId: '96585ecd-8986-4a3e-b1b1-fce865f754e9',
                tenantCode: 'tpjrugxfgfafvyuhzt2bxv7mwyjz7rxu5vmca8k69mw9zpacsd',
                systemId: 'a0a3ac43-1659-410d-b646-53d5e5ab400f',
                systemName: 'htx34imyzb0x72app1i1',
                executionId: 'b8bd3c32-4f4c-4794-87af-9ae80e128de1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 04:22:39',
                executionMonitoringStartAt: '2020-07-23 13:37:33',
                executionMonitoringEndAt: '2020-07-23 06:12:06',
                numberMax: 8031776098,
                numberDays: 9263275767,
                success: 6381935780,
                cancelled: 6389843138,
                delivering: -9,
                error: 6101319683,
                holding: 7949695615,
                toBeDelivered: 2999475695,
                waiting: 7860564135,
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
                id: '6121f161-a148-4e86-9a4f-17702ba0e0f6',
                tenantId: '96585ecd-8986-4a3e-b1b1-fce865f754e9',
                tenantCode: '4ix6zksfbbwh583bhuz39h35e691pwey6kfnlkzdp7z16srfut',
                systemId: 'a0a3ac43-1659-410d-b646-53d5e5ab400f',
                systemName: 's1m0iwqjbasl99gpefz3',
                executionId: 'b8bd3c32-4f4c-4794-87af-9ae80e128de1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 01:53:38',
                executionMonitoringStartAt: '2020-07-23 03:10:39',
                executionMonitoringEndAt: '2020-07-22 19:14:09',
                numberMax: 5893496432,
                numberDays: 3684249756,
                success: 5371074507,
                cancelled: 2965463790,
                delivering: 9918545293,
                error: -9,
                holding: 6288656740,
                toBeDelivered: 9655994481,
                waiting: 5095104540,
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
                id: '6121f161-a148-4e86-9a4f-17702ba0e0f6',
                tenantId: '96585ecd-8986-4a3e-b1b1-fce865f754e9',
                tenantCode: 'xam6p99bkzkar4mjgyw1ah481ix09xkxi655xiunmthhiuh45m',
                systemId: 'a0a3ac43-1659-410d-b646-53d5e5ab400f',
                systemName: 'rtafrlixxnihhazduw56',
                executionId: 'b8bd3c32-4f4c-4794-87af-9ae80e128de1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-22 18:52:23',
                executionMonitoringStartAt: '2020-07-22 23:17:30',
                executionMonitoringEndAt: '2020-07-23 08:04:01',
                numberMax: 8610572839,
                numberDays: 3108693426,
                success: 6631378576,
                cancelled: 9803783945,
                delivering: 7522318960,
                error: 6772396940,
                holding: -9,
                toBeDelivered: 1333703366,
                waiting: 9367278977,
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
                id: '6121f161-a148-4e86-9a4f-17702ba0e0f6',
                tenantId: '96585ecd-8986-4a3e-b1b1-fce865f754e9',
                tenantCode: 'kquhj9iuskebcpzynw9fec9unqjunc0941u7ebpl6zc9zkt1c0',
                systemId: 'a0a3ac43-1659-410d-b646-53d5e5ab400f',
                systemName: '9y0xkzcpjch98vy3r93x',
                executionId: 'b8bd3c32-4f4c-4794-87af-9ae80e128de1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 12:43:09',
                executionMonitoringStartAt: '2020-07-23 04:58:16',
                executionMonitoringEndAt: '2020-07-23 16:39:17',
                numberMax: 6984758950,
                numberDays: 8306618956,
                success: 4397989772,
                cancelled: 6140623349,
                delivering: 3114834698,
                error: 9903829208,
                holding: 8938066381,
                toBeDelivered: -9,
                waiting: 2851941038,
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
                id: '6121f161-a148-4e86-9a4f-17702ba0e0f6',
                tenantId: '96585ecd-8986-4a3e-b1b1-fce865f754e9',
                tenantCode: 'm1n3t4l3im1mkibkhjoqqovtamltibbd79ktj1nocffu5yqb08',
                systemId: 'a0a3ac43-1659-410d-b646-53d5e5ab400f',
                systemName: 'e3jk6jkcyje5im85vklf',
                executionId: 'b8bd3c32-4f4c-4794-87af-9ae80e128de1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 17:44:45',
                executionMonitoringStartAt: '2020-07-23 10:55:43',
                executionMonitoringEndAt: '2020-07-22 23:16:45',
                numberMax: 2437107335,
                numberDays: 5612757525,
                success: 3073616397,
                cancelled: 8945230257,
                delivering: 5068913928,
                error: 1356149716,
                holding: 6990492636,
                toBeDelivered: 6295675388,
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
                id: '6121f161-a148-4e86-9a4f-17702ba0e0f6',
                tenantId: '96585ecd-8986-4a3e-b1b1-fce865f754e9',
                tenantCode: 'ejka22tj0w9elqcgia8rjwvou4nsipmbpdpz8eqe81acg4z47y',
                systemId: 'a0a3ac43-1659-410d-b646-53d5e5ab400f',
                systemName: 'ducziie3s4flxiwmp4ec',
                executionId: 'b8bd3c32-4f4c-4794-87af-9ae80e128de1',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-22 20:14:52',
                executionMonitoringStartAt: '2020-07-23 02:02:43',
                executionMonitoringEndAt: '2020-07-23 00:50:51',
                numberMax: 4215174036,
                numberDays: 1090046917,
                success: 4476010093,
                cancelled: 1549643032,
                delivering: 6100749358,
                error: 7613578703,
                holding: 3611375526,
                toBeDelivered: 2691876050,
                waiting: 2434129226,
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
                id: '6121f161-a148-4e86-9a4f-17702ba0e0f6',
                tenantId: '96585ecd-8986-4a3e-b1b1-fce865f754e9',
                tenantCode: '1a66x2rouov0rnyjcywqwybl4zd4vvs0101vtiika3evwdycou',
                systemId: 'a0a3ac43-1659-410d-b646-53d5e5ab400f',
                systemName: 'iv8m24uul5d10gpms39x',
                executionId: 'b8bd3c32-4f4c-4794-87af-9ae80e128de1',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-23 02:39:55',
                executionMonitoringEndAt: '2020-07-23 17:13:44',
                numberMax: 4974688907,
                numberDays: 8328983338,
                success: 7453358487,
                cancelled: 2927718982,
                delivering: 8421066509,
                error: 9071633817,
                holding: 8267288652,
                toBeDelivered: 5483014461,
                waiting: 8154315628,
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
                id: '6121f161-a148-4e86-9a4f-17702ba0e0f6',
                tenantId: '96585ecd-8986-4a3e-b1b1-fce865f754e9',
                tenantCode: 'zhmttdozqwr5o7rz5kh6gd7oqrmyjdxnt9byma8bxl9848bimf',
                systemId: 'a0a3ac43-1659-410d-b646-53d5e5ab400f',
                systemName: 'j12z4e6rq46608fvwo25',
                executionId: 'b8bd3c32-4f4c-4794-87af-9ae80e128de1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 01:44:13',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-23 09:53:38',
                numberMax: 2637232009,
                numberDays: 7296162436,
                success: 8552571969,
                cancelled: 1505253527,
                delivering: 7816453444,
                error: 7547526971,
                holding: 3235685873,
                toBeDelivered: 5687080864,
                waiting: 1579732299,
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
                id: '6121f161-a148-4e86-9a4f-17702ba0e0f6',
                tenantId: '96585ecd-8986-4a3e-b1b1-fce865f754e9',
                tenantCode: '4qvtmqu72e7g2s9qnmn0pjnqnumv4h3v9jv7gi3fpm5gw1dmsr',
                systemId: 'a0a3ac43-1659-410d-b646-53d5e5ab400f',
                systemName: 'zktkic76le85exdar559',
                executionId: 'b8bd3c32-4f4c-4794-87af-9ae80e128de1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 11:30:29',
                executionMonitoringStartAt: '2020-07-23 12:12:50',
                executionMonitoringEndAt: 'XXXXXXXX',
                numberMax: 3310211276,
                numberDays: 7277743980,
                success: 4872008624,
                cancelled: 9986850885,
                delivering: 3058166982,
                error: 3145616975,
                holding: 5154175757,
                toBeDelivered: 3320104405,
                waiting: 4111244908,
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
                id: '6121f161-a148-4e86-9a4f-17702ba0e0f6',
                tenantId: '96585ecd-8986-4a3e-b1b1-fce865f754e9',
                tenantCode: 'zzpnjn03di952te03eycx6oqcotpqo5nq5ptklv0zhlg1iw2p8',
                systemId: 'a0a3ac43-1659-410d-b646-53d5e5ab400f',
                systemName: 'i7vuera5tlxazh4oenaj',
                executionId: 'b8bd3c32-4f4c-4794-87af-9ae80e128de1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 04:47:56',
                executionMonitoringStartAt: '2020-07-23 11:18:23',
                executionMonitoringEndAt: '2020-07-22 22:32:56',
                numberMax: 7327539912,
                numberDays: 8249935996,
                success: 3054893198,
                cancelled: 7143397354,
                delivering: 5051304954,
                error: 1063355773,
                holding: 6660706454,
                toBeDelivered: 7684475909,
                waiting: 4065875713,
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
                        value   : '6121f161-a148-4e86-9a4f-17702ba0e0f6'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '6121f161-a148-4e86-9a4f-17702ba0e0f6'));
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
            .get('/bplus-it-sappi/message-overview/6121f161-a148-4e86-9a4f-17702ba0e0f6')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '6121f161-a148-4e86-9a4f-17702ba0e0f6'));
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
                
                id: 'e4db88bf-2328-4f87-a3ed-131c75bc8a59',
                tenantId: '74439c9c-9493-4508-a7cc-b99c4d5d3925',
                tenantCode: 'g5776iswht57ellf86515pzyxfll18nzawtqyu3owrwkev0gl7',
                systemId: 'c28f35a4-2238-4b6b-a94b-a4f625dc82a5',
                systemName: '0vopu054upgcoz3pyqg7',
                executionId: '91ee54d8-1e4e-4690-a16c-b1da9fe781bb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 02:41:38',
                executionMonitoringStartAt: '2020-07-23 11:45:35',
                executionMonitoringEndAt: '2020-07-23 18:10:28',
                numberMax: 7461355532,
                numberDays: 5906586241,
                success: 8434482503,
                cancelled: 3638150060,
                delivering: 1764596460,
                error: 5689224329,
                holding: 1927528843,
                toBeDelivered: 4305330966,
                waiting: 3076663313,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/message-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: '6121f161-a148-4e86-9a4f-17702ba0e0f6',
                tenantId: '96585ecd-8986-4a3e-b1b1-fce865f754e9',
                tenantCode: 'p0zfpyk3pqc1hqtre04v8xcu6322cdselda0jses1u9m1r3d8l',
                systemId: 'a0a3ac43-1659-410d-b646-53d5e5ab400f',
                systemName: '3oj3ahjqm3hsf1t7bz9j',
                executionId: 'b8bd3c32-4f4c-4794-87af-9ae80e128de1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 04:40:47',
                executionMonitoringStartAt: '2020-07-23 14:17:26',
                executionMonitoringEndAt: '2020-07-23 16:02:00',
                numberMax: 4070710790,
                numberDays: 7963699181,
                success: 1802521797,
                cancelled: 1195792496,
                delivering: 1903992460,
                error: 6880807350,
                holding: 7090016805,
                toBeDelivered: 6769889370,
                waiting: 6699538233,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '6121f161-a148-4e86-9a4f-17702ba0e0f6'));
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
            .delete('/bplus-it-sappi/message-overview/6121f161-a148-4e86-9a4f-17702ba0e0f6')
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
                        id: 'dead3515-c5b3-4234-8e9a-9b2a82be067e',
                        tenantId: '96585ecd-8986-4a3e-b1b1-fce865f754e9',
                        tenantCode: 'ub3ky2bn5et6s6vh1g16q7t704kgqhzwjtq1e07xmwwcj7163s',
                        systemId: 'a0a3ac43-1659-410d-b646-53d5e5ab400f',
                        systemName: 'j46lkcvbielvijox2ei8',
                        executionId: 'b8bd3c32-4f4c-4794-87af-9ae80e128de1',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-23 16:09:42',
                        executionMonitoringStartAt: '2020-07-23 07:36:52',
                        executionMonitoringEndAt: '2020-07-23 01:12:10',
                        numberMax: 5053107388,
                        numberDays: 8017161590,
                        success: 5746340730,
                        cancelled: 5519942492,
                        delivering: 7545209845,
                        error: 5051291416,
                        holding: 5406509678,
                        toBeDelivered: 4061649697,
                        waiting: 5983947383,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateMessageOverview).toHaveProperty('id', 'dead3515-c5b3-4234-8e9a-9b2a82be067e');
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
                            value   : '6121f161-a148-4e86-9a4f-17702ba0e0f6'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageOverview.id).toStrictEqual('6121f161-a148-4e86-9a4f-17702ba0e0f6');
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
                    id: '6121f161-a148-4e86-9a4f-17702ba0e0f6'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageOverviewById.id).toStrictEqual('6121f161-a148-4e86-9a4f-17702ba0e0f6');
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
                        
                        id: 'b5337edf-3933-47bd-afff-1faee29c4ab0',
                        tenantId: '4ea9a36d-0fb6-4fd9-8f94-2cb7ecbac2ac',
                        tenantCode: '6e31e04vm5dbms15d7lpl38t1w7jpuzcamqyiwk5rzf3hmn03b',
                        systemId: 'cfd1a7d9-6dd4-4fd5-a6a8-23d34eaf9993',
                        systemName: '70g5rq4ro7hxef3tx6iz',
                        executionId: '471ed8ee-8a70-45ae-8a7c-30233a78bf34',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-23 04:49:54',
                        executionMonitoringStartAt: '2020-07-22 20:55:24',
                        executionMonitoringEndAt: '2020-07-23 15:01:56',
                        numberMax: 2971956170,
                        numberDays: 9184332392,
                        success: 5489866276,
                        cancelled: 8276980417,
                        delivering: 2290019783,
                        error: 8357351073,
                        holding: 7234186817,
                        toBeDelivered: 7676145768,
                        waiting: 2636901879,
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
                        
                        id: '6121f161-a148-4e86-9a4f-17702ba0e0f6',
                        tenantId: '96585ecd-8986-4a3e-b1b1-fce865f754e9',
                        tenantCode: '841kanwowo4p6l5pvoyj9cvisubvt1p51jupqzta2useil16ie',
                        systemId: 'a0a3ac43-1659-410d-b646-53d5e5ab400f',
                        systemName: '96nqibfexcbyj2cfmlz0',
                        executionId: 'b8bd3c32-4f4c-4794-87af-9ae80e128de1',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-23 00:47:15',
                        executionMonitoringStartAt: '2020-07-23 00:09:29',
                        executionMonitoringEndAt: '2020-07-23 06:01:43',
                        numberMax: 1800510482,
                        numberDays: 3660473382,
                        success: 2535222908,
                        cancelled: 2638849349,
                        delivering: 5210797195,
                        error: 6543930521,
                        holding: 8851174696,
                        toBeDelivered: 2213623808,
                        waiting: 7348418900,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateMessageOverview.id).toStrictEqual('6121f161-a148-4e86-9a4f-17702ba0e0f6');
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
                    id: '6121f161-a148-4e86-9a4f-17702ba0e0f6'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteMessageOverviewById.id).toStrictEqual('6121f161-a148-4e86-9a4f-17702ba0e0f6');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});