import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IExecutionRepository } from '@hades/bplus-it-sappi/execution/domain/execution.repository';
import { MockExecutionRepository } from '@hades/bplus-it-sappi/execution/infrastructure/mock/mock-execution.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('execution', () => 
{
    let app: INestApplication;
    let repository: MockExecutionRepository;
    
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
            .overrideProvider(IExecutionRepository)
            .useClass(MockExecutionRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockExecutionRepository>module.get<IExecutionRepository>(IExecutionRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/execution - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: 'e328d6e6-de8f-430f-a764-dc1872c27676',
                tenantCode: 'c37djz6030igyak2idudmh8l11hxbhwllpu44srjeusixe4gu7',
                systemId: 'bd8321a7-aff1-437e-95cb-9f3e5f6852ce',
                systemName: 'q8j9rjje40e7ziz6liex',
                version: '2rqr0hicpmwy2bwhh1ku',
                type: 'DETAIL',
                executedAt: '2020-07-29 00:55:44',
                monitoringStartAt: '2020-07-28 19:20:03',
                monitoringEndAt: '2020-07-28 17:54:33',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: 'e328d6e6-de8f-430f-a764-dc1872c27676',
                tenantCode: '61o5r8jbj8gnqkjkp10pdwcbyi3jou6jbsuyqc4m3hz3sl855o',
                systemId: 'bd8321a7-aff1-437e-95cb-9f3e5f6852ce',
                systemName: '2dxte68seqwc9mnglkk3',
                version: 'ycvtp2o7dm4ca8eifrap',
                type: 'SUMMARY',
                executedAt: '2020-07-29 08:14:19',
                monitoringStartAt: '2020-07-28 19:48:58',
                monitoringEndAt: '2020-07-29 01:28:08',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'cb8d8c26-29bb-465e-b18d-954921a042e4',
                tenantId: null,
                tenantCode: 'ej9qpf2n1096mfuraks124lyctzh6tl5e15odj648fdcbv935b',
                systemId: 'bd8321a7-aff1-437e-95cb-9f3e5f6852ce',
                systemName: 'nabqzmgtchvyzjqq79l3',
                version: 'a1ailja948alvxowncqs',
                type: 'SUMMARY',
                executedAt: '2020-07-29 13:14:09',
                monitoringStartAt: '2020-07-28 23:18:08',
                monitoringEndAt: '2020-07-28 16:53:07',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'cb8d8c26-29bb-465e-b18d-954921a042e4',
                
                tenantCode: 'fnjt0pppq9clgoqjio91fuoe03nr4vxgt2fyjt42wzkgife6sg',
                systemId: 'bd8321a7-aff1-437e-95cb-9f3e5f6852ce',
                systemName: 'm2q20bdlvogc8l7s6hdm',
                version: 'v8skbxz9chudcffmhh4h',
                type: 'DETAIL',
                executedAt: '2020-07-28 18:37:10',
                monitoringStartAt: '2020-07-29 04:39:39',
                monitoringEndAt: '2020-07-29 01:44:58',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'cb8d8c26-29bb-465e-b18d-954921a042e4',
                tenantId: 'e328d6e6-de8f-430f-a764-dc1872c27676',
                tenantCode: null,
                systemId: 'bd8321a7-aff1-437e-95cb-9f3e5f6852ce',
                systemName: 'iefkhmbgb5saamh7bdki',
                version: 'qmq536sijjc1nh65uxlz',
                type: 'SUMMARY',
                executedAt: '2020-07-28 17:31:25',
                monitoringStartAt: '2020-07-28 21:36:20',
                monitoringEndAt: '2020-07-29 12:06:13',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'cb8d8c26-29bb-465e-b18d-954921a042e4',
                tenantId: 'e328d6e6-de8f-430f-a764-dc1872c27676',
                
                systemId: 'bd8321a7-aff1-437e-95cb-9f3e5f6852ce',
                systemName: '5d04m1u2nvvggd7tegak',
                version: 'd4boufwsrshvlv432ygw',
                type: 'SUMMARY',
                executedAt: '2020-07-28 14:10:58',
                monitoringStartAt: '2020-07-28 17:41:31',
                monitoringEndAt: '2020-07-29 12:31:56',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'cb8d8c26-29bb-465e-b18d-954921a042e4',
                tenantId: 'e328d6e6-de8f-430f-a764-dc1872c27676',
                tenantCode: 'izuv40jhveu2afd18fe47lf6jaihp1ci10y1421eww25qfkq7u',
                systemId: null,
                systemName: 'qbkrypqu7zmtqx94irnk',
                version: 'i2hhisixyear9uzwivb0',
                type: 'SUMMARY',
                executedAt: '2020-07-29 09:48:18',
                monitoringStartAt: '2020-07-29 12:58:57',
                monitoringEndAt: '2020-07-29 02:40:25',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'cb8d8c26-29bb-465e-b18d-954921a042e4',
                tenantId: 'e328d6e6-de8f-430f-a764-dc1872c27676',
                tenantCode: '2yftfkl1ncm0qr2umqfjj1me4wu955ufm2l81gtg2nywso78ie',
                
                systemName: 'soh78njh3kmgk0y8zy39',
                version: 'uzwnk29bmxm92k7h0ngj',
                type: 'DETAIL',
                executedAt: '2020-07-29 08:20:25',
                monitoringStartAt: '2020-07-28 22:46:59',
                monitoringEndAt: '2020-07-28 18:03:21',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'cb8d8c26-29bb-465e-b18d-954921a042e4',
                tenantId: 'e328d6e6-de8f-430f-a764-dc1872c27676',
                tenantCode: 'mto48p4f2t955ca3afwekz87iwdv3eqjs9yc8g5x4p8z9bn2za',
                systemId: 'bd8321a7-aff1-437e-95cb-9f3e5f6852ce',
                systemName: null,
                version: 'hy4untskr54hmvzpqcwi',
                type: 'DETAIL',
                executedAt: '2020-07-29 06:17:48',
                monitoringStartAt: '2020-07-28 20:22:15',
                monitoringEndAt: '2020-07-29 09:35:48',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'cb8d8c26-29bb-465e-b18d-954921a042e4',
                tenantId: 'e328d6e6-de8f-430f-a764-dc1872c27676',
                tenantCode: 'cokddvx71wwb2fpcplnurcsz26tnswrejuvp125lg5s6jdn8pc',
                systemId: 'bd8321a7-aff1-437e-95cb-9f3e5f6852ce',
                
                version: 'ukdglv09f33y7v6n8mk2',
                type: 'SUMMARY',
                executedAt: '2020-07-28 22:13:31',
                monitoringStartAt: '2020-07-29 06:59:08',
                monitoringEndAt: '2020-07-28 20:55:05',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionVersion property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'cb8d8c26-29bb-465e-b18d-954921a042e4',
                tenantId: 'e328d6e6-de8f-430f-a764-dc1872c27676',
                tenantCode: 'z9idzwxac24gpgyt7g5o4h1oin7hdgctfj69x0h9pvtfhr7l7r',
                systemId: 'bd8321a7-aff1-437e-95cb-9f3e5f6852ce',
                systemName: '0zr6q1tr0a55z0qxnyrl',
                version: null,
                type: 'SUMMARY',
                executedAt: '2020-07-29 10:39:09',
                monitoringStartAt: '2020-07-29 03:28:36',
                monitoringEndAt: '2020-07-28 15:02:04',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionVersion must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionVersion property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'cb8d8c26-29bb-465e-b18d-954921a042e4',
                tenantId: 'e328d6e6-de8f-430f-a764-dc1872c27676',
                tenantCode: 'bfz9hk2ye163mf3s5s5kwodqy4vblar1p0zz3b61gj59h5o1gv',
                systemId: 'bd8321a7-aff1-437e-95cb-9f3e5f6852ce',
                systemName: 'kkwqrlsrwtohitwsaud6',
                
                type: 'SUMMARY',
                executedAt: '2020-07-29 05:24:55',
                monitoringStartAt: '2020-07-28 21:42:31',
                monitoringEndAt: '2020-07-29 02:00:31',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionVersion must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'cb8d8c26-29bb-465e-b18d-954921a042e4',
                tenantId: 'e328d6e6-de8f-430f-a764-dc1872c27676',
                tenantCode: 'hfcwzjsrg232lm4xgqigjzjwrgcknyixdhj854rir6u74jisdk',
                systemId: 'bd8321a7-aff1-437e-95cb-9f3e5f6852ce',
                systemName: 'cd9g42fkvlbo9oboc5fa',
                version: '91umqygdsuhrmooirgoc',
                type: null,
                executedAt: '2020-07-28 18:41:08',
                monitoringStartAt: '2020-07-29 12:01:38',
                monitoringEndAt: '2020-07-28 18:01:47',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionType must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'cb8d8c26-29bb-465e-b18d-954921a042e4',
                tenantId: 'e328d6e6-de8f-430f-a764-dc1872c27676',
                tenantCode: '2x2xzumngv399fc9ac10znrvly6zxvo14l4wzvukr8tuizds3c',
                systemId: 'bd8321a7-aff1-437e-95cb-9f3e5f6852ce',
                systemName: '09qb25gz6erzghhe4wve',
                version: '8wxa8i9ag1gr7aty1uf5',
                
                executedAt: '2020-07-29 12:10:28',
                monitoringStartAt: '2020-07-28 17:20:15',
                monitoringEndAt: '2020-07-29 10:22:07',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionType must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'cb8d8c26-29bb-465e-b18d-954921a042e4',
                tenantId: 'e328d6e6-de8f-430f-a764-dc1872c27676',
                tenantCode: 'thz8gbxn24e2k2i5qc7af994e4pr0brv3wm0bai1ibog2tcpmm',
                systemId: 'bd8321a7-aff1-437e-95cb-9f3e5f6852ce',
                systemName: 'sae833vkdn9foiyy26zv',
                version: 'xjcpitvsaa7vafybuhge',
                type: 'SUMMARY',
                executedAt: null,
                monitoringStartAt: '2020-07-29 09:02:05',
                monitoringEndAt: '2020-07-28 13:33:40',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionExecutedAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'cb8d8c26-29bb-465e-b18d-954921a042e4',
                tenantId: 'e328d6e6-de8f-430f-a764-dc1872c27676',
                tenantCode: 'q8jz0djyoogjmm1oens77m2e3vf25d16hj9tmn3czf2yo0oatw',
                systemId: 'bd8321a7-aff1-437e-95cb-9f3e5f6852ce',
                systemName: 'etrobjgkcb2cq3waisti',
                version: 'opjlv7xbze4cwwn3uvjo',
                type: 'SUMMARY',
                
                monitoringStartAt: '2020-07-29 09:26:31',
                monitoringEndAt: '2020-07-29 01:08:22',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'cb8d8c26-29bb-465e-b18d-954921a042e4',
                tenantId: 'e328d6e6-de8f-430f-a764-dc1872c27676',
                tenantCode: 'n7dr6tevlk3b6xdy186srathhbxrnf6tiz5osp6blw4f5mbik2',
                systemId: 'bd8321a7-aff1-437e-95cb-9f3e5f6852ce',
                systemName: '28ph8yldgkca3d1jexws',
                version: '4u3epg0pp7ht0gz8kjh4',
                type: 'DETAIL',
                executedAt: '2020-07-29 11:19:19',
                monitoringStartAt: null,
                monitoringEndAt: '2020-07-28 21:27:23',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'cb8d8c26-29bb-465e-b18d-954921a042e4',
                tenantId: 'e328d6e6-de8f-430f-a764-dc1872c27676',
                tenantCode: '5ypoj1as1gxiztju01ittk6267578hmz4c1tjqwqeooj6q0016',
                systemId: 'bd8321a7-aff1-437e-95cb-9f3e5f6852ce',
                systemName: '8l60c46htyrev9bpa0hn',
                version: 'zbeyiwni2kinoxa7h5bu',
                type: 'DETAIL',
                executedAt: '2020-07-28 19:05:03',
                
                monitoringEndAt: '2020-07-28 18:37:07',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'cb8d8c26-29bb-465e-b18d-954921a042e4',
                tenantId: 'e328d6e6-de8f-430f-a764-dc1872c27676',
                tenantCode: 'ygz3m052zy6kihehp5p2bbqfukdg0vvtaquigwisyuxvgwz2qc',
                systemId: 'bd8321a7-aff1-437e-95cb-9f3e5f6852ce',
                systemName: 'o4fe6b7332km86yb1q5p',
                version: '9v1wvmic5d2ep5rtwqcc',
                type: 'SUMMARY',
                executedAt: '2020-07-29 04:12:45',
                monitoringStartAt: '2020-07-29 07:00:55',
                monitoringEndAt: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'cb8d8c26-29bb-465e-b18d-954921a042e4',
                tenantId: 'e328d6e6-de8f-430f-a764-dc1872c27676',
                tenantCode: '33ewaz0gorqd6cbx86mlwqbcu1dvcccpyrz0wpx52uftpib3jz',
                systemId: 'bd8321a7-aff1-437e-95cb-9f3e5f6852ce',
                systemName: 'vkvuoxzpz2dco7hlkg0y',
                version: 'uperx2ynfbskwo78bm3m',
                type: 'SUMMARY',
                executedAt: '2020-07-29 12:05:21',
                monitoringStartAt: '2020-07-28 18:59:46',
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '6vdyxgif5xviqth6asgfbajg67jg3ma9gkwc1',
                tenantId: 'e328d6e6-de8f-430f-a764-dc1872c27676',
                tenantCode: 'j7f1cnqu8is8us0mblvwt5xyuzenrzwi2vieo92fvjwl8vwmtm',
                systemId: 'bd8321a7-aff1-437e-95cb-9f3e5f6852ce',
                systemName: 'ik58wh2crzxrovalnpfx',
                version: 'xnkztrhu3k96ucytcm0l',
                type: 'SUMMARY',
                executedAt: '2020-07-28 20:10:58',
                monitoringStartAt: '2020-07-29 02:27:19',
                monitoringEndAt: '2020-07-28 20:40:26',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'cb8d8c26-29bb-465e-b18d-954921a042e4',
                tenantId: 'lqewetgj3yz9tcukugzy8je0j00mufem69hnc',
                tenantCode: 'myreid5034knc8fexdatt4ryda6qyhs1uj8tzge9awr4ykxm01',
                systemId: 'bd8321a7-aff1-437e-95cb-9f3e5f6852ce',
                systemName: 'bljqguw2rvcty25zl50c',
                version: 'qrkyam7cr88takihtwel',
                type: 'DETAIL',
                executedAt: '2020-07-29 03:02:20',
                monitoringStartAt: '2020-07-29 00:32:39',
                monitoringEndAt: '2020-07-28 17:03:12',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'cb8d8c26-29bb-465e-b18d-954921a042e4',
                tenantId: 'e328d6e6-de8f-430f-a764-dc1872c27676',
                tenantCode: 'wae7xolplsxvvjalxmgf6q7tcuxzmjpz2q3mtdtb3pavg3gm8f',
                systemId: 'xd85tft43j9y7acbatv0g7x7139p4ziix3t9i',
                systemName: 'ao4ukah8cnzxq2vzf7w7',
                version: 'px9kxu56gjveae1ebgtk',
                type: 'DETAIL',
                executedAt: '2020-07-29 04:29:56',
                monitoringStartAt: '2020-07-29 12:56:57',
                monitoringEndAt: '2020-07-29 00:12:21',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionSystemId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'cb8d8c26-29bb-465e-b18d-954921a042e4',
                tenantId: 'e328d6e6-de8f-430f-a764-dc1872c27676',
                tenantCode: 'ntrejc0yzbeaafwtq8fndfh93eerh96eih8iyww0xbu2m2ysrv0',
                systemId: 'bd8321a7-aff1-437e-95cb-9f3e5f6852ce',
                systemName: '4elng5ex7vxbdgcl74by',
                version: '6fnl03106z4fhnj52uoj',
                type: 'DETAIL',
                executedAt: '2020-07-29 09:45:24',
                monitoringStartAt: '2020-07-28 16:10:11',
                monitoringEndAt: '2020-07-29 08:54:51',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'cb8d8c26-29bb-465e-b18d-954921a042e4',
                tenantId: 'e328d6e6-de8f-430f-a764-dc1872c27676',
                tenantCode: 'o7rbq77zrape9p7s1vyppvj7fx1kylfs3ro8a7s5kzw9lyjk7m',
                systemId: 'bd8321a7-aff1-437e-95cb-9f3e5f6852ce',
                systemName: '5fp1tzqm76bhb5fu6skl8',
                version: 'kigveu5hsbk9tiuqkm0p',
                type: 'SUMMARY',
                executedAt: '2020-07-28 16:17:32',
                monitoringStartAt: '2020-07-28 16:42:52',
                monitoringEndAt: '2020-07-28 16:19:05',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionVersion is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'cb8d8c26-29bb-465e-b18d-954921a042e4',
                tenantId: 'e328d6e6-de8f-430f-a764-dc1872c27676',
                tenantCode: 'eaeaco4rn6ruyib79qmk4ibbkj21a1jjubm1zz0vbaa0e6e4tj',
                systemId: 'bd8321a7-aff1-437e-95cb-9f3e5f6852ce',
                systemName: 't59qzhybpzzuetw53jaz',
                version: 'fhsqw9tnvixb2sfykztvp',
                type: 'SUMMARY',
                executedAt: '2020-07-28 19:08:39',
                monitoringStartAt: '2020-07-29 06:41:29',
                monitoringEndAt: '2020-07-29 06:00:51',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionVersion is too large, has a maximum length of 20');
            });
    });
    

    

    
    
    

    

    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'cb8d8c26-29bb-465e-b18d-954921a042e4',
                tenantId: 'e328d6e6-de8f-430f-a764-dc1872c27676',
                tenantCode: 'snq5c4ibxsb1sm2o4j5zc9hscwu8ndariq943pmdfrm0r5sls8',
                systemId: 'bd8321a7-aff1-437e-95cb-9f3e5f6852ce',
                systemName: '0uq1w5uid6gt7viqeo7k',
                version: 'usogprqqmaunlrm2kwar',
                type: 'XXXX',
                executedAt: '2020-07-29 02:16:39',
                monitoringStartAt: '2020-07-28 22:01:24',
                monitoringEndAt: '2020-07-29 01:46:15',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'cb8d8c26-29bb-465e-b18d-954921a042e4',
                tenantId: 'e328d6e6-de8f-430f-a764-dc1872c27676',
                tenantCode: 'ai5pgrle33fsgl69x6bcfhl5bgiv2sijjis1x5sbvwfv0wnwy4',
                systemId: 'bd8321a7-aff1-437e-95cb-9f3e5f6852ce',
                systemName: 'k4tvupd4kue6nlh3ofg5',
                version: 'ftvkjiqx9y4qhvde5l7g',
                type: 'DETAIL',
                executedAt: 'XXXXXXXX',
                monitoringStartAt: '2020-07-29 02:24:43',
                monitoringEndAt: '2020-07-29 07:30:35',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionExecutedAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionMonitoringStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'cb8d8c26-29bb-465e-b18d-954921a042e4',
                tenantId: 'e328d6e6-de8f-430f-a764-dc1872c27676',
                tenantCode: 'unw0kl6fxvmggskeo2x4azibmyjn219909d8wv5pyuhe3v2te2',
                systemId: 'bd8321a7-aff1-437e-95cb-9f3e5f6852ce',
                systemName: 't2f3vmmejoz43znqpra3',
                version: '9vu27qy9s3g7c8e5hszt',
                type: 'DETAIL',
                executedAt: '2020-07-29 13:03:43',
                monitoringStartAt: 'XXXXXXXX',
                monitoringEndAt: '2020-07-28 21:04:44',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionMonitoringEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'cb8d8c26-29bb-465e-b18d-954921a042e4',
                tenantId: 'e328d6e6-de8f-430f-a764-dc1872c27676',
                tenantCode: '6amll3jz09kynz4h0175azv4equbqntlvriwwh89z7vo8eic1w',
                systemId: 'bd8321a7-aff1-437e-95cb-9f3e5f6852ce',
                systemName: 'c63g2g26hij7ww4xre9n',
                version: 'jyhara7e3yg0j3edjfte',
                type: 'DETAIL',
                executedAt: '2020-07-29 10:47:20',
                monitoringStartAt: '2020-07-28 22:28:03',
                monitoringEndAt: 'XXXXXXXX',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST bplus-it-sappi/execution`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'cb8d8c26-29bb-465e-b18d-954921a042e4',
                tenantId: 'e328d6e6-de8f-430f-a764-dc1872c27676',
                tenantCode: 'a428pq0fzmsfv2gk2wu4q4lkt8lay2cy90yj074yrm9qttf38j',
                systemId: 'bd8321a7-aff1-437e-95cb-9f3e5f6852ce',
                systemName: 'bv8118inakkpali9wt35',
                version: 'za3wul5k4cryeudstoyr',
                type: 'SUMMARY',
                executedAt: '2020-07-28 15:55:06',
                monitoringStartAt: '2020-07-29 07:59:17',
                monitoringEndAt: '2020-07-28 18:48:46',
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/executions/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/executions/paginate')
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

    test(`/REST:GET bplus-it-sappi/execution - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/execution')
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

    test(`/REST:GET bplus-it-sappi/execution`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : 'cb8d8c26-29bb-465e-b18d-954921a042e4'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'cb8d8c26-29bb-465e-b18d-954921a042e4'));
    });

    test(`/REST:GET bplus-it-sappi/execution/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/execution/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/execution/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/execution/cb8d8c26-29bb-465e-b18d-954921a042e4')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'cb8d8c26-29bb-465e-b18d-954921a042e4'));
    });

    test(`/REST:GET bplus-it-sappi/executions`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/executions')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/execution - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                
                id: 'dfc22f42-e1fd-4b86-a1ae-5475eb724dc7',
                tenantId: '156bc7cb-379a-4b1b-ab74-cc966885cc8d',
                tenantCode: 'l4dofdw6izad5hjf0z59traxcixytyazmec7eo71mpo14bocux',
                systemId: 'c4979df7-6c91-44f8-b81f-7a29c5cf3b71',
                systemName: 'ompbyhoe900zfacl9a69',
                version: '4p6inhpyfk4fe3d26jhj',
                type: 'DETAIL',
                executedAt: '2020-07-29 03:32:21',
                monitoringStartAt: '2020-07-28 17:34:14',
                monitoringEndAt: '2020-07-28 14:51:00',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/execution`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                
                id: 'cb8d8c26-29bb-465e-b18d-954921a042e4',
                tenantId: 'e328d6e6-de8f-430f-a764-dc1872c27676',
                tenantCode: 'hkto61i0kpp88oze3nokutjh4ia89udq4fbe747uqlcxrhghi2',
                systemId: 'bd8321a7-aff1-437e-95cb-9f3e5f6852ce',
                systemName: '2c5gsnyvo3dw4dtsm8dx',
                version: 'mmrlk8tde62dvhbui2ef',
                type: 'SUMMARY',
                executedAt: '2020-07-29 09:55:10',
                monitoringStartAt: '2020-07-29 04:06:38',
                monitoringEndAt: '2020-07-29 07:47:02',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'cb8d8c26-29bb-465e-b18d-954921a042e4'));
    });

    test(`/REST:DELETE bplus-it-sappi/execution/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/execution/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/execution/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/execution/cb8d8c26-29bb-465e-b18d-954921a042e4')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateExecution - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateExecutionInput!)
                    {
                        bplusItSappiCreateExecution (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            type
                            executedAt
                            monitoringStartAt
                            monitoringEndAt
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

    test(`/GraphQL bplusItSappiCreateExecution`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateExecutionInput!)
                    {
                        bplusItSappiCreateExecution (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            type
                            executedAt
                            monitoringStartAt
                            monitoringEndAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '6d82929e-7c9a-4028-8b71-5700bf519de0',
                        tenantId: 'e328d6e6-de8f-430f-a764-dc1872c27676',
                        tenantCode: '7rqhkohsknd8mudoog4pdcg5kv93imqg7xlia3xce9g8ak9oiv',
                        systemId: 'bd8321a7-aff1-437e-95cb-9f3e5f6852ce',
                        systemName: 'hzfycxtnegms75m5p8i3',
                        version: '5kb9lupb89jh36oo0jha',
                        type: 'DETAIL',
                        executedAt: '2020-07-29 10:23:02',
                        monitoringStartAt: '2020-07-28 21:41:00',
                        monitoringEndAt: '2020-07-29 00:09:11',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateExecution).toHaveProperty('id', '6d82929e-7c9a-4028-8b71-5700bf519de0');
            });
    });

    test(`/GraphQL bplusItSappiPaginateExecutions`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateExecutions (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateExecutions.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateExecutions.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateExecutions.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindExecution - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindExecution (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            type
                            executedAt
                            monitoringStartAt
                            monitoringEndAt
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

    test(`/GraphQL bplusItSappiFindExecution`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindExecution (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            type
                            executedAt
                            monitoringStartAt
                            monitoringEndAt
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
                            value   : 'cb8d8c26-29bb-465e-b18d-954921a042e4'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindExecution.id).toStrictEqual('cb8d8c26-29bb-465e-b18d-954921a042e4');
            });
    });

    test(`/GraphQL bplusItSappiFindExecutionById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindExecutionById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            type
                            executedAt
                            monitoringStartAt
                            monitoringEndAt
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

    test(`/GraphQL bplusItSappiFindExecutionById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindExecutionById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            type
                            executedAt
                            monitoringStartAt
                            monitoringEndAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'cb8d8c26-29bb-465e-b18d-954921a042e4'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindExecutionById.id).toStrictEqual('cb8d8c26-29bb-465e-b18d-954921a042e4');
            });
    });

    test(`/GraphQL bplusItSappiGetExecutions`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetExecutions (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            type
                            executedAt
                            monitoringStartAt
                            monitoringEndAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetExecutions.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateExecution - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateExecutionInput!)
                    {
                        bplusItSappiUpdateExecution (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            type
                            executedAt
                            monitoringStartAt
                            monitoringEndAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'c81fe4d1-5ca0-4546-ba77-ebccfd59967f',
                        tenantId: '83df991e-b1ff-4190-aea8-8e7640728bbf',
                        tenantCode: '9j5z9cme2jjnb7ea6fqxl6znc3fqoth7o7svuhh34edk7lnwly',
                        systemId: 'd048e5d9-3c51-4956-9238-41812249fdaa',
                        systemName: 'hsiwnw5n2w99d5izg1u5',
                        version: 'udhzarv2whubz8919z3y',
                        type: 'SUMMARY',
                        executedAt: '2020-07-29 10:16:58',
                        monitoringStartAt: '2020-07-28 22:49:54',
                        monitoringEndAt: '2020-07-28 14:44:33',
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

    test(`/GraphQL bplusItSappiUpdateExecution`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateExecutionInput!)
                    {
                        bplusItSappiUpdateExecution (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            type
                            executedAt
                            monitoringStartAt
                            monitoringEndAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'cb8d8c26-29bb-465e-b18d-954921a042e4',
                        tenantId: 'e328d6e6-de8f-430f-a764-dc1872c27676',
                        tenantCode: 'o4was7og5eqhn2ln9632gyuiubnhgkwmd2xn3prtoao3ih0my6',
                        systemId: 'bd8321a7-aff1-437e-95cb-9f3e5f6852ce',
                        systemName: 'q8tkcvk8y8bso546jy30',
                        version: '9qbjlbf3qckua47fwp2w',
                        type: 'DETAIL',
                        executedAt: '2020-07-29 02:15:40',
                        monitoringStartAt: '2020-07-28 15:37:45',
                        monitoringEndAt: '2020-07-29 12:37:53',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateExecution.id).toStrictEqual('cb8d8c26-29bb-465e-b18d-954921a042e4');
            });
    });

    test(`/GraphQL bplusItSappiDeleteExecutionById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteExecutionById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            type
                            executedAt
                            monitoringStartAt
                            monitoringEndAt
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

    test(`/GraphQL bplusItSappiDeleteExecutionById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteExecutionById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            type
                            executedAt
                            monitoringStartAt
                            monitoringEndAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'cb8d8c26-29bb-465e-b18d-954921a042e4'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteExecutionById.id).toStrictEqual('cb8d8c26-29bb-465e-b18d-954921a042e4');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});