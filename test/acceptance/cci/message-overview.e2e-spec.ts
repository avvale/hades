import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IMessageOverviewRepository } from '@hades/cci/message-overview/domain/message-overview.repository';
import { MockMessageOverviewRepository } from '@hades/cci/message-overview/infrastructure/mock/mock-message-overview.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { CciModule } from './../../../src/apps/cci/cci.module';
import * as request from 'supertest';
import * as _ from 'lodash';
import { IamModule } from './../../../src/apps/iam/iam.module';

const importForeignModules = [
    IamModule
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
            .overrideProvider(IMessageOverviewRepository)
            .useClass(MockMessageOverviewRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockMessageOverviewRepository>module.get<IMessageOverviewRepository>(IMessageOverviewRepository);

        await app.init();
    });

    test(`/REST:POST cci/message-overview - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '58fddb8a-9fb2-4168-be2d-1de82a824b54',
                tenantCode: 'm78fqod8w8h95en97pnrntipxwb9hlim1rp05pxrq4db564mtl',
                systemId: '4b4b9e5b-f8f2-4896-a2fc-9c985cfe8767',
                systemName: 'anqerb3vhdwr530lkcfk',
                executionId: '7fa4f7c9-d28d-43c4-ae32-cfa0ca755c89',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 17:53:09',
                executionMonitoringStartAt: '2020-11-04 15:48:58',
                executionMonitoringEndAt: '2020-11-04 08:12:37',
                numberMax: 8201575248,
                numberDays: 6674241864,
                success: 7935676090,
                cancelled: 9742244661,
                delivering: 5615370118,
                error: 9462315308,
                holding: 1323025383,
                toBeDelivered: 8034863679,
                waiting: 9073307667,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '58fddb8a-9fb2-4168-be2d-1de82a824b54',
                tenantCode: '1k4r9bptqlhhidbftlb8d1wu5w42pl6dcht8de039yaasxa0pj',
                systemId: '4b4b9e5b-f8f2-4896-a2fc-9c985cfe8767',
                systemName: '9lkxa48zj5felgry4lwp',
                executionId: '7fa4f7c9-d28d-43c4-ae32-cfa0ca755c89',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 02:09:26',
                executionMonitoringStartAt: '2020-11-04 06:58:21',
                executionMonitoringEndAt: '2020-11-03 22:22:18',
                numberMax: 9300599678,
                numberDays: 1020968943,
                success: 5506215670,
                cancelled: 2597872031,
                delivering: 4665673962,
                error: 3683939615,
                holding: 5302984633,
                toBeDelivered: 4784128462,
                waiting: 3948475399,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '47303dd8-f22c-41be-9813-8cdf86502323',
                tenantId: null,
                tenantCode: 'palx56arm8bw4khjpi1dv7gdev1zrbz66ut50ye5fkx46tdk1f',
                systemId: '4b4b9e5b-f8f2-4896-a2fc-9c985cfe8767',
                systemName: 'qlimio2rgde5098pw9jg',
                executionId: '7fa4f7c9-d28d-43c4-ae32-cfa0ca755c89',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 01:02:00',
                executionMonitoringStartAt: '2020-11-04 08:27:59',
                executionMonitoringEndAt: '2020-11-04 13:26:37',
                numberMax: 5287881066,
                numberDays: 6380566172,
                success: 4977262750,
                cancelled: 8297908949,
                delivering: 7764975840,
                error: 3793173345,
                holding: 7588539820,
                toBeDelivered: 5468211041,
                waiting: 3143277017,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '47303dd8-f22c-41be-9813-8cdf86502323',
                
                tenantCode: 'uddcb8y61y4yqbg3z9zits5gfcn0m3qqfbgb65gsm38iyqma7u',
                systemId: '4b4b9e5b-f8f2-4896-a2fc-9c985cfe8767',
                systemName: 'kxrhg6y7h56bnxcemzpo',
                executionId: '7fa4f7c9-d28d-43c4-ae32-cfa0ca755c89',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 09:03:08',
                executionMonitoringStartAt: '2020-11-04 13:27:11',
                executionMonitoringEndAt: '2020-11-04 06:50:55',
                numberMax: 6903571737,
                numberDays: 3209012472,
                success: 8385498242,
                cancelled: 1802933191,
                delivering: 6849730904,
                error: 5936550156,
                holding: 3647694756,
                toBeDelivered: 8267699639,
                waiting: 9623352880,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '47303dd8-f22c-41be-9813-8cdf86502323',
                tenantId: '58fddb8a-9fb2-4168-be2d-1de82a824b54',
                tenantCode: null,
                systemId: '4b4b9e5b-f8f2-4896-a2fc-9c985cfe8767',
                systemName: 'q4dua9z0u4bva97otj6w',
                executionId: '7fa4f7c9-d28d-43c4-ae32-cfa0ca755c89',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 19:32:55',
                executionMonitoringStartAt: '2020-11-04 05:56:01',
                executionMonitoringEndAt: '2020-11-04 16:14:55',
                numberMax: 5702578917,
                numberDays: 6170324147,
                success: 1207000097,
                cancelled: 1950377836,
                delivering: 8354989392,
                error: 5891586695,
                holding: 1527230380,
                toBeDelivered: 9233135454,
                waiting: 8405080427,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '47303dd8-f22c-41be-9813-8cdf86502323',
                tenantId: '58fddb8a-9fb2-4168-be2d-1de82a824b54',
                
                systemId: '4b4b9e5b-f8f2-4896-a2fc-9c985cfe8767',
                systemName: 'g6z45o7vu2gqpim9gefe',
                executionId: '7fa4f7c9-d28d-43c4-ae32-cfa0ca755c89',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 01:54:18',
                executionMonitoringStartAt: '2020-11-04 03:42:23',
                executionMonitoringEndAt: '2020-11-04 16:19:59',
                numberMax: 6669209375,
                numberDays: 8975312203,
                success: 8487788358,
                cancelled: 8803700362,
                delivering: 7901569273,
                error: 4627986484,
                holding: 2049327099,
                toBeDelivered: 8271677534,
                waiting: 9594293521,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '47303dd8-f22c-41be-9813-8cdf86502323',
                tenantId: '58fddb8a-9fb2-4168-be2d-1de82a824b54',
                tenantCode: 'lj96l2qw7vn2x5t210xwrzsved90ngtxcn3eymh26pcricp8um',
                systemId: null,
                systemName: '8rpcb1fnlosv1iczc8ef',
                executionId: '7fa4f7c9-d28d-43c4-ae32-cfa0ca755c89',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 03:36:02',
                executionMonitoringStartAt: '2020-11-03 19:51:06',
                executionMonitoringEndAt: '2020-11-04 15:06:18',
                numberMax: 4670435721,
                numberDays: 9573074252,
                success: 8425583308,
                cancelled: 6107648759,
                delivering: 3978239154,
                error: 4700554379,
                holding: 7173832076,
                toBeDelivered: 8288089792,
                waiting: 7701046325,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '47303dd8-f22c-41be-9813-8cdf86502323',
                tenantId: '58fddb8a-9fb2-4168-be2d-1de82a824b54',
                tenantCode: 'cb41ohwfppz4k4w30jbz9swahtqnnm0yuhdmq6i6jgja38niv7',
                
                systemName: 'u6x5rr8yhrqk38gf25z6',
                executionId: '7fa4f7c9-d28d-43c4-ae32-cfa0ca755c89',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 12:12:34',
                executionMonitoringStartAt: '2020-11-04 08:47:17',
                executionMonitoringEndAt: '2020-11-04 14:18:40',
                numberMax: 3863346056,
                numberDays: 3061028521,
                success: 8700061705,
                cancelled: 3570280066,
                delivering: 5305832644,
                error: 3107168114,
                holding: 5336502440,
                toBeDelivered: 4998390641,
                waiting: 2850522779,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '47303dd8-f22c-41be-9813-8cdf86502323',
                tenantId: '58fddb8a-9fb2-4168-be2d-1de82a824b54',
                tenantCode: 'o43vniq1nisi6shxg5d7g8usumr9t4a3qz2033es3hp8ew78e1',
                systemId: '4b4b9e5b-f8f2-4896-a2fc-9c985cfe8767',
                systemName: null,
                executionId: '7fa4f7c9-d28d-43c4-ae32-cfa0ca755c89',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 23:39:45',
                executionMonitoringStartAt: '2020-11-04 08:33:28',
                executionMonitoringEndAt: '2020-11-04 18:04:43',
                numberMax: 1889644876,
                numberDays: 4269679984,
                success: 6814457168,
                cancelled: 1567053218,
                delivering: 7608367624,
                error: 1023667458,
                holding: 5349710200,
                toBeDelivered: 4188802264,
                waiting: 5514671286,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '47303dd8-f22c-41be-9813-8cdf86502323',
                tenantId: '58fddb8a-9fb2-4168-be2d-1de82a824b54',
                tenantCode: 'u8yayjd2950tqxzto6z12stjh63hnc76wbz8kr3cvv71urrife',
                systemId: '4b4b9e5b-f8f2-4896-a2fc-9c985cfe8767',
                
                executionId: '7fa4f7c9-d28d-43c4-ae32-cfa0ca755c89',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 02:40:19',
                executionMonitoringStartAt: '2020-11-04 07:57:34',
                executionMonitoringEndAt: '2020-11-04 16:10:11',
                numberMax: 6836332874,
                numberDays: 1223062690,
                success: 3205485652,
                cancelled: 6043006474,
                delivering: 6051622294,
                error: 3027637603,
                holding: 9930275742,
                toBeDelivered: 7442031378,
                waiting: 1824901976,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '47303dd8-f22c-41be-9813-8cdf86502323',
                tenantId: '58fddb8a-9fb2-4168-be2d-1de82a824b54',
                tenantCode: 'fgodjqzlv0cugbcko1asmmqri5mf4e7b24xi48jft3o6ex0ru7',
                systemId: '4b4b9e5b-f8f2-4896-a2fc-9c985cfe8767',
                systemName: 'jk205l7tspmy49lusuia',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 06:10:20',
                executionMonitoringStartAt: '2020-11-04 02:16:23',
                executionMonitoringEndAt: '2020-11-03 23:56:03',
                numberMax: 1810454832,
                numberDays: 8033207987,
                success: 1021658909,
                cancelled: 3653541044,
                delivering: 4828571363,
                error: 1683256490,
                holding: 9199733531,
                toBeDelivered: 2000681649,
                waiting: 7787500720,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '47303dd8-f22c-41be-9813-8cdf86502323',
                tenantId: '58fddb8a-9fb2-4168-be2d-1de82a824b54',
                tenantCode: 'vbk745me4livzs27lkttd54amkjuvw354xyden6k7o2bxdoje1',
                systemId: '4b4b9e5b-f8f2-4896-a2fc-9c985cfe8767',
                systemName: '99o2jtj4vlqyknd7jvl7',
                
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 12:57:41',
                executionMonitoringStartAt: '2020-11-04 02:48:42',
                executionMonitoringEndAt: '2020-11-04 13:23:24',
                numberMax: 8055705987,
                numberDays: 8385520629,
                success: 2954033445,
                cancelled: 8046860649,
                delivering: 6656554977,
                error: 3792890000,
                holding: 9381435402,
                toBeDelivered: 7271071277,
                waiting: 2401253027,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '47303dd8-f22c-41be-9813-8cdf86502323',
                tenantId: '58fddb8a-9fb2-4168-be2d-1de82a824b54',
                tenantCode: '8ya9ry315s5juddumvine8i6sw98pctjko66s0uycnh1trwwxn',
                systemId: '4b4b9e5b-f8f2-4896-a2fc-9c985cfe8767',
                systemName: 'bwc1r43wzpknywxlx36x',
                executionId: '7fa4f7c9-d28d-43c4-ae32-cfa0ca755c89',
                executionType: null,
                executionExecutedAt: '2020-11-04 06:05:58',
                executionMonitoringStartAt: '2020-11-04 04:49:49',
                executionMonitoringEndAt: '2020-11-04 00:29:08',
                numberMax: 9236209332,
                numberDays: 8658280815,
                success: 8229477040,
                cancelled: 5470143171,
                delivering: 9492128295,
                error: 4814326402,
                holding: 3614111850,
                toBeDelivered: 7588660422,
                waiting: 2046844641,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionType must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '47303dd8-f22c-41be-9813-8cdf86502323',
                tenantId: '58fddb8a-9fb2-4168-be2d-1de82a824b54',
                tenantCode: '9ewzb2cve3qjfrzj1l71n59kvhk6fadl5ppfd8icqp7oz03lik',
                systemId: '4b4b9e5b-f8f2-4896-a2fc-9c985cfe8767',
                systemName: 'izftgj900dd67vnksuiu',
                executionId: '7fa4f7c9-d28d-43c4-ae32-cfa0ca755c89',
                
                executionExecutedAt: '2020-11-04 15:38:41',
                executionMonitoringStartAt: '2020-11-03 21:42:12',
                executionMonitoringEndAt: '2020-11-04 03:54:04',
                numberMax: 9386715356,
                numberDays: 1807376989,
                success: 2560840541,
                cancelled: 5218907992,
                delivering: 2249478604,
                error: 6291734243,
                holding: 9512079655,
                toBeDelivered: 9798625777,
                waiting: 4439037646,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionType must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '47303dd8-f22c-41be-9813-8cdf86502323',
                tenantId: '58fddb8a-9fb2-4168-be2d-1de82a824b54',
                tenantCode: 'a2m28gjrxl4j2cbx7osd6f4apfnviuvewbqnyke84iilizb0tq',
                systemId: '4b4b9e5b-f8f2-4896-a2fc-9c985cfe8767',
                systemName: '96ufyujcojoqxr3l6w2d',
                executionId: '7fa4f7c9-d28d-43c4-ae32-cfa0ca755c89',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-11-04 17:03:06',
                executionMonitoringEndAt: '2020-11-04 15:18:55',
                numberMax: 7072637259,
                numberDays: 7090658153,
                success: 8356392543,
                cancelled: 2063957626,
                delivering: 1030948197,
                error: 2612302876,
                holding: 4895055936,
                toBeDelivered: 9380761277,
                waiting: 6356824264,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionExecutedAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '47303dd8-f22c-41be-9813-8cdf86502323',
                tenantId: '58fddb8a-9fb2-4168-be2d-1de82a824b54',
                tenantCode: 'lpuvbi0idnhe14e8wxuggu2p4ifo5nyxqo7fuu5hu3ptupztzx',
                systemId: '4b4b9e5b-f8f2-4896-a2fc-9c985cfe8767',
                systemName: '29fegp79zwvuvluw5tcu',
                executionId: '7fa4f7c9-d28d-43c4-ae32-cfa0ca755c89',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-11-04 19:00:22',
                executionMonitoringEndAt: '2020-11-04 05:18:01',
                numberMax: 4392797792,
                numberDays: 5612529978,
                success: 1479568167,
                cancelled: 9875667219,
                delivering: 3764385191,
                error: 4727371290,
                holding: 3276688400,
                toBeDelivered: 6515664267,
                waiting: 6582223338,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '47303dd8-f22c-41be-9813-8cdf86502323',
                tenantId: '58fddb8a-9fb2-4168-be2d-1de82a824b54',
                tenantCode: 'umyr2t4n6v0z4o6fx8eyjjd3p8zmd2kdi5co114s2hrblrnoze',
                systemId: '4b4b9e5b-f8f2-4896-a2fc-9c985cfe8767',
                systemName: '0hayby410j9yny58mq58',
                executionId: '7fa4f7c9-d28d-43c4-ae32-cfa0ca755c89',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 10:42:55',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-11-03 23:45:09',
                numberMax: 9658305324,
                numberDays: 5013119013,
                success: 2754334972,
                cancelled: 2862216150,
                delivering: 1078049441,
                error: 7683988191,
                holding: 2913815720,
                toBeDelivered: 4249291116,
                waiting: 7053842063,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '47303dd8-f22c-41be-9813-8cdf86502323',
                tenantId: '58fddb8a-9fb2-4168-be2d-1de82a824b54',
                tenantCode: 'varlvryhgxy12vs2bepyvoteieqgtpe2aj7ger0kijuqw7wm7y',
                systemId: '4b4b9e5b-f8f2-4896-a2fc-9c985cfe8767',
                systemName: 'vss26igrgcsthx1qjkun',
                executionId: '7fa4f7c9-d28d-43c4-ae32-cfa0ca755c89',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 06:57:23',
                
                executionMonitoringEndAt: '2020-11-04 02:29:16',
                numberMax: 5887682115,
                numberDays: 5864126945,
                success: 7999504205,
                cancelled: 2440621325,
                delivering: 2516028276,
                error: 5688814131,
                holding: 9824549555,
                toBeDelivered: 1502267711,
                waiting: 7817847234,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '47303dd8-f22c-41be-9813-8cdf86502323',
                tenantId: '58fddb8a-9fb2-4168-be2d-1de82a824b54',
                tenantCode: 'heuj1b17rul3sqdx14dw2qn2w3uskez668y1ao8iy8sicx2yxu',
                systemId: '4b4b9e5b-f8f2-4896-a2fc-9c985cfe8767',
                systemName: 'bi20qqwkj7pjllwy8a8v',
                executionId: '7fa4f7c9-d28d-43c4-ae32-cfa0ca755c89',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 03:45:52',
                executionMonitoringStartAt: '2020-11-04 03:54:18',
                executionMonitoringEndAt: null,
                numberMax: 3863221401,
                numberDays: 8537378102,
                success: 8382701284,
                cancelled: 8986079816,
                delivering: 4652975916,
                error: 3297071450,
                holding: 8887988089,
                toBeDelivered: 2222660855,
                waiting: 6417881263,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '47303dd8-f22c-41be-9813-8cdf86502323',
                tenantId: '58fddb8a-9fb2-4168-be2d-1de82a824b54',
                tenantCode: 'xep4nfely8eg2443vopwsxiy59oqizs01ya4yr0llaj9iqa3yz',
                systemId: '4b4b9e5b-f8f2-4896-a2fc-9c985cfe8767',
                systemName: 'ihltzvcv88whw87rfjp5',
                executionId: '7fa4f7c9-d28d-43c4-ae32-cfa0ca755c89',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 16:08:08',
                executionMonitoringStartAt: '2020-11-04 17:52:25',
                
                numberMax: 2333612849,
                numberDays: 5044789646,
                success: 2689686968,
                cancelled: 8955928286,
                delivering: 1511491747,
                error: 1623237003,
                holding: 1192407837,
                toBeDelivered: 5180256420,
                waiting: 8162915047,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'oq2zua6zbjtjb8ifr9t0nms1qc9l15tkzlenj',
                tenantId: '58fddb8a-9fb2-4168-be2d-1de82a824b54',
                tenantCode: '0buetvlwgf9ja4bxv7y075swoar7ezmmliecvwja5qptx573fd',
                systemId: '4b4b9e5b-f8f2-4896-a2fc-9c985cfe8767',
                systemName: 'yqzxgbc84je8r6yrswli',
                executionId: '7fa4f7c9-d28d-43c4-ae32-cfa0ca755c89',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 08:52:05',
                executionMonitoringStartAt: '2020-11-04 12:31:55',
                executionMonitoringEndAt: '2020-11-04 00:53:58',
                numberMax: 3080814867,
                numberDays: 8629809831,
                success: 3891786838,
                cancelled: 2315372124,
                delivering: 7723487738,
                error: 7449758003,
                holding: 3235973353,
                toBeDelivered: 9647844719,
                waiting: 4202597870,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '47303dd8-f22c-41be-9813-8cdf86502323',
                tenantId: '0wrxk0g2zsct190i1fm0ht1xrp4b9itt019q5',
                tenantCode: 'xk6j9xpuvwyy2d6pzfdxfu2oq25vwd46bgd3cvwincvsji6lui',
                systemId: '4b4b9e5b-f8f2-4896-a2fc-9c985cfe8767',
                systemName: '3e685m4sat1bgnbhrbmq',
                executionId: '7fa4f7c9-d28d-43c4-ae32-cfa0ca755c89',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 13:17:26',
                executionMonitoringStartAt: '2020-11-03 23:37:36',
                executionMonitoringEndAt: '2020-11-04 10:42:00',
                numberMax: 5568597507,
                numberDays: 9052287410,
                success: 2293758423,
                cancelled: 8199665958,
                delivering: 7885419552,
                error: 3785551578,
                holding: 8010944921,
                toBeDelivered: 7899530252,
                waiting: 1514373716,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '47303dd8-f22c-41be-9813-8cdf86502323',
                tenantId: '58fddb8a-9fb2-4168-be2d-1de82a824b54',
                tenantCode: '7ybmgb48vdy5999qdqnqc6mlhmtaaz47qtc160ur6kuw6i7m3n',
                systemId: 'b9uen4dqizw0kkmt1np1708wop441espf0l47',
                systemName: 'gu557obi4bng762hg550',
                executionId: '7fa4f7c9-d28d-43c4-ae32-cfa0ca755c89',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 01:56:15',
                executionMonitoringStartAt: '2020-11-04 08:18:39',
                executionMonitoringEndAt: '2020-11-04 00:03:18',
                numberMax: 4108658199,
                numberDays: 1946140801,
                success: 5041855019,
                cancelled: 6105228633,
                delivering: 3814848222,
                error: 5284388721,
                holding: 1800042059,
                toBeDelivered: 9978954920,
                waiting: 9390773802,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '47303dd8-f22c-41be-9813-8cdf86502323',
                tenantId: '58fddb8a-9fb2-4168-be2d-1de82a824b54',
                tenantCode: '1nk9nzjxtj9kuiltzyy6fdn5k9m4f3q5v7ca1vzegkvq2bqzjg',
                systemId: '4b4b9e5b-f8f2-4896-a2fc-9c985cfe8767',
                systemName: 'l5rv9tptolvenl44cs4z',
                executionId: 'o18v2v6trhzsjzhi3yh6oyt7ydjpa5lknva1d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 02:36:36',
                executionMonitoringStartAt: '2020-11-04 17:27:17',
                executionMonitoringEndAt: '2020-11-04 02:29:24',
                numberMax: 1284923514,
                numberDays: 5228164629,
                success: 8081355513,
                cancelled: 8628518309,
                delivering: 3477519284,
                error: 4774199562,
                holding: 7669745693,
                toBeDelivered: 8535543921,
                waiting: 4592675267,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '47303dd8-f22c-41be-9813-8cdf86502323',
                tenantId: '58fddb8a-9fb2-4168-be2d-1de82a824b54',
                tenantCode: 'i4o596yq24bodxbifku0wv3vnzo4z8nk6ovlsz5ne535rklyaf5',
                systemId: '4b4b9e5b-f8f2-4896-a2fc-9c985cfe8767',
                systemName: 'nu0anqs5hsoxpp9h3fua',
                executionId: '7fa4f7c9-d28d-43c4-ae32-cfa0ca755c89',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 00:49:16',
                executionMonitoringStartAt: '2020-11-04 17:48:50',
                executionMonitoringEndAt: '2020-11-04 13:12:52',
                numberMax: 7514970537,
                numberDays: 2746673264,
                success: 3177585406,
                cancelled: 1380157021,
                delivering: 9591894133,
                error: 3306448426,
                holding: 6567171756,
                toBeDelivered: 1435418896,
                waiting: 5295860190,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '47303dd8-f22c-41be-9813-8cdf86502323',
                tenantId: '58fddb8a-9fb2-4168-be2d-1de82a824b54',
                tenantCode: '9q3cd5c64i95ef6nlkgma0e9ijeq0jcecw3apfw156c10m9qst',
                systemId: '4b4b9e5b-f8f2-4896-a2fc-9c985cfe8767',
                systemName: '0zv2xzeiiw5lefnu7kcti',
                executionId: '7fa4f7c9-d28d-43c4-ae32-cfa0ca755c89',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 06:41:20',
                executionMonitoringStartAt: '2020-11-04 12:16:52',
                executionMonitoringEndAt: '2020-11-04 10:46:11',
                numberMax: 1951871513,
                numberDays: 6612826020,
                success: 5068042002,
                cancelled: 6701371401,
                delivering: 9708995502,
                error: 4864530203,
                holding: 1182709527,
                toBeDelivered: 9757157698,
                waiting: 1834989821,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewNumberMax is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '47303dd8-f22c-41be-9813-8cdf86502323',
                tenantId: '58fddb8a-9fb2-4168-be2d-1de82a824b54',
                tenantCode: 'nl5t0mz66a2e4c7lhfai3cci4oqg2papupfkjoru8zsnvpvqyh',
                systemId: '4b4b9e5b-f8f2-4896-a2fc-9c985cfe8767',
                systemName: 'v568pdl77gml8kkopnqu',
                executionId: '7fa4f7c9-d28d-43c4-ae32-cfa0ca755c89',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 17:55:39',
                executionMonitoringStartAt: '2020-11-04 04:24:15',
                executionMonitoringEndAt: '2020-11-04 02:34:39',
                numberMax: 40769812168,
                numberDays: 5378268377,
                success: 4243459605,
                cancelled: 9007511598,
                delivering: 3379210575,
                error: 2011693553,
                holding: 3812735026,
                toBeDelivered: 6790300151,
                waiting: 7905421342,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewNumberMax is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewNumberDays is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '47303dd8-f22c-41be-9813-8cdf86502323',
                tenantId: '58fddb8a-9fb2-4168-be2d-1de82a824b54',
                tenantCode: 'lfav465awfoumgnpz64n5mztdi9e16sgj2dyw2iue329b05x14',
                systemId: '4b4b9e5b-f8f2-4896-a2fc-9c985cfe8767',
                systemName: 'z1bqz3y16fctn9g5tewq',
                executionId: '7fa4f7c9-d28d-43c4-ae32-cfa0ca755c89',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 01:34:06',
                executionMonitoringStartAt: '2020-11-04 11:31:27',
                executionMonitoringEndAt: '2020-11-04 11:33:21',
                numberMax: 1837295729,
                numberDays: 50216238985,
                success: 7406747870,
                cancelled: 1216500143,
                delivering: 2984826659,
                error: 8291691360,
                holding: 5732456802,
                toBeDelivered: 2147088969,
                waiting: 1891642180,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewNumberDays is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewSuccess is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '47303dd8-f22c-41be-9813-8cdf86502323',
                tenantId: '58fddb8a-9fb2-4168-be2d-1de82a824b54',
                tenantCode: '8ytoti8b6jxp63lr1x5jsv001odd0qelavlma4lq35q44hacq3',
                systemId: '4b4b9e5b-f8f2-4896-a2fc-9c985cfe8767',
                systemName: '0x43zgkmk9vgpl1aq2ak',
                executionId: '7fa4f7c9-d28d-43c4-ae32-cfa0ca755c89',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 02:07:28',
                executionMonitoringStartAt: '2020-11-04 03:17:28',
                executionMonitoringEndAt: '2020-11-04 05:49:28',
                numberMax: 9892107218,
                numberDays: 3694040627,
                success: 58963331074,
                cancelled: 5242764082,
                delivering: 9025337914,
                error: 9988395034,
                holding: 9666035931,
                toBeDelivered: 6233138507,
                waiting: 4089327798,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSuccess is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewCancelled is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '47303dd8-f22c-41be-9813-8cdf86502323',
                tenantId: '58fddb8a-9fb2-4168-be2d-1de82a824b54',
                tenantCode: 'tbl8z510g523qcpwps0wqa502n9hfn6nvao6if9ppo5pyl8bl4',
                systemId: '4b4b9e5b-f8f2-4896-a2fc-9c985cfe8767',
                systemName: '4xg61hippyji86we7r8u',
                executionId: '7fa4f7c9-d28d-43c4-ae32-cfa0ca755c89',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 22:27:29',
                executionMonitoringStartAt: '2020-11-04 14:08:07',
                executionMonitoringEndAt: '2020-11-04 04:41:17',
                numberMax: 9393574180,
                numberDays: 9438536180,
                success: 7668862789,
                cancelled: 38280987795,
                delivering: 5883392170,
                error: 4161830380,
                holding: 7512107817,
                toBeDelivered: 4966381557,
                waiting: 3084045235,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewCancelled is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewDelivering is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '47303dd8-f22c-41be-9813-8cdf86502323',
                tenantId: '58fddb8a-9fb2-4168-be2d-1de82a824b54',
                tenantCode: 'xgci0w1odgwze0w598yaig09fe630c59plxxb3il90m26j28y3',
                systemId: '4b4b9e5b-f8f2-4896-a2fc-9c985cfe8767',
                systemName: '8pkvzo8lpxyzkaxad7sm',
                executionId: '7fa4f7c9-d28d-43c4-ae32-cfa0ca755c89',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 03:52:11',
                executionMonitoringStartAt: '2020-11-03 20:20:15',
                executionMonitoringEndAt: '2020-11-04 01:15:32',
                numberMax: 2241944225,
                numberDays: 2464709139,
                success: 7530320322,
                cancelled: 5795465808,
                delivering: 17735513918,
                error: 8649126115,
                holding: 4919524509,
                toBeDelivered: 8492710531,
                waiting: 3404908291,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewDelivering is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewError is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '47303dd8-f22c-41be-9813-8cdf86502323',
                tenantId: '58fddb8a-9fb2-4168-be2d-1de82a824b54',
                tenantCode: '2jfcv7u3ep9h8fbibxft43z86e7ky7r8b604ps7bx4yff9zrhn',
                systemId: '4b4b9e5b-f8f2-4896-a2fc-9c985cfe8767',
                systemName: 'am2ebr88jb3jdawj9roy',
                executionId: '7fa4f7c9-d28d-43c4-ae32-cfa0ca755c89',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 21:47:00',
                executionMonitoringStartAt: '2020-11-04 01:22:51',
                executionMonitoringEndAt: '2020-11-03 20:29:49',
                numberMax: 3094996865,
                numberDays: 2084389826,
                success: 7693384582,
                cancelled: 4319515819,
                delivering: 1575037652,
                error: 12969562375,
                holding: 3296241658,
                toBeDelivered: 4061795361,
                waiting: 5286704769,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewError is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewHolding is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '47303dd8-f22c-41be-9813-8cdf86502323',
                tenantId: '58fddb8a-9fb2-4168-be2d-1de82a824b54',
                tenantCode: 'nesjdvmw4ck07ij34gnx76gvgtlnmg0yckwoohpbo0jvb8a2g2',
                systemId: '4b4b9e5b-f8f2-4896-a2fc-9c985cfe8767',
                systemName: 'wekk9pgkyi72ftmlbta2',
                executionId: '7fa4f7c9-d28d-43c4-ae32-cfa0ca755c89',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 08:00:50',
                executionMonitoringStartAt: '2020-11-04 14:19:39',
                executionMonitoringEndAt: '2020-11-03 21:32:23',
                numberMax: 7409817082,
                numberDays: 2097278791,
                success: 9941665538,
                cancelled: 2870951111,
                delivering: 2957790480,
                error: 8883471366,
                holding: 33474023638,
                toBeDelivered: 2474642621,
                waiting: 5290276003,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewHolding is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewToBeDelivered is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '47303dd8-f22c-41be-9813-8cdf86502323',
                tenantId: '58fddb8a-9fb2-4168-be2d-1de82a824b54',
                tenantCode: '0flrjm27s92znba373a3rbqpoag5mf062owjwcd1zq0vyfig73',
                systemId: '4b4b9e5b-f8f2-4896-a2fc-9c985cfe8767',
                systemName: 'gaaesgm0hfney6rig74k',
                executionId: '7fa4f7c9-d28d-43c4-ae32-cfa0ca755c89',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 15:05:55',
                executionMonitoringStartAt: '2020-11-04 02:52:52',
                executionMonitoringEndAt: '2020-11-04 04:28:53',
                numberMax: 2387451215,
                numberDays: 8084530134,
                success: 4331188463,
                cancelled: 4541079113,
                delivering: 9686378743,
                error: 7854380114,
                holding: 7593451858,
                toBeDelivered: 56942777505,
                waiting: 1858894251,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewToBeDelivered is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewWaiting is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '47303dd8-f22c-41be-9813-8cdf86502323',
                tenantId: '58fddb8a-9fb2-4168-be2d-1de82a824b54',
                tenantCode: 'zdex56vg9xsqlop9sdcvfixxkc44cmr7o081ep7r55cmvhndey',
                systemId: '4b4b9e5b-f8f2-4896-a2fc-9c985cfe8767',
                systemName: '5u8lcgbh6o1w0mv7cv47',
                executionId: '7fa4f7c9-d28d-43c4-ae32-cfa0ca755c89',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 20:46:16',
                executionMonitoringStartAt: '2020-11-04 14:16:16',
                executionMonitoringEndAt: '2020-11-04 13:58:04',
                numberMax: 3888552047,
                numberDays: 6918980433,
                success: 1763299754,
                cancelled: 1442191867,
                delivering: 4732912307,
                error: 1232097313,
                holding: 7935397145,
                toBeDelivered: 7738749191,
                waiting: 99913724281,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewWaiting is too large, has a maximum length of 10');
            });
    });
    

    

    

    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewNumberMax must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '47303dd8-f22c-41be-9813-8cdf86502323',
                tenantId: '58fddb8a-9fb2-4168-be2d-1de82a824b54',
                tenantCode: 'ni8z3zuvmiiwh8nnk0hnjfg6w630ic0w0v4gdz8ceplpsvc04r',
                systemId: '4b4b9e5b-f8f2-4896-a2fc-9c985cfe8767',
                systemName: '5n68ow15vs8bzpro9w7j',
                executionId: '7fa4f7c9-d28d-43c4-ae32-cfa0ca755c89',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 13:05:49',
                executionMonitoringStartAt: '2020-11-04 00:36:20',
                executionMonitoringEndAt: '2020-11-04 12:11:17',
                numberMax: -9,
                numberDays: 9985326057,
                success: 5400463273,
                cancelled: 6352016679,
                delivering: 6536278394,
                error: 4837185820,
                holding: 7004026554,
                toBeDelivered: 1083077425,
                waiting: 1463006833,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewNumberMax must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewNumberDays must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '47303dd8-f22c-41be-9813-8cdf86502323',
                tenantId: '58fddb8a-9fb2-4168-be2d-1de82a824b54',
                tenantCode: 'o63em1pkznhrfy5fphqgoyegtguxlslyzww3hh5rb1os0mvu1q',
                systemId: '4b4b9e5b-f8f2-4896-a2fc-9c985cfe8767',
                systemName: 'm6sz6tnp13y9hax9i19o',
                executionId: '7fa4f7c9-d28d-43c4-ae32-cfa0ca755c89',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 04:47:43',
                executionMonitoringStartAt: '2020-11-04 06:57:12',
                executionMonitoringEndAt: '2020-11-04 01:23:17',
                numberMax: 8952483867,
                numberDays: -9,
                success: 4166839073,
                cancelled: 7065668788,
                delivering: 8388135229,
                error: 1408298149,
                holding: 8222672907,
                toBeDelivered: 4606891589,
                waiting: 5399001783,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewNumberDays must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewSuccess must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '47303dd8-f22c-41be-9813-8cdf86502323',
                tenantId: '58fddb8a-9fb2-4168-be2d-1de82a824b54',
                tenantCode: 'rcacdwcbsa6drd9qcfq01c8frr13dbhz45i0usyqv6zh5yq9ce',
                systemId: '4b4b9e5b-f8f2-4896-a2fc-9c985cfe8767',
                systemName: 'xkk6qe5d3bjyrusr0s37',
                executionId: '7fa4f7c9-d28d-43c4-ae32-cfa0ca755c89',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 22:20:56',
                executionMonitoringStartAt: '2020-11-04 16:49:43',
                executionMonitoringEndAt: '2020-11-04 11:57:07',
                numberMax: 4257271491,
                numberDays: 9462216579,
                success: -9,
                cancelled: 7407860747,
                delivering: 8563397661,
                error: 1731360571,
                holding: 2192574375,
                toBeDelivered: 7091697497,
                waiting: 1842466409,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewSuccess must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewCancelled must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '47303dd8-f22c-41be-9813-8cdf86502323',
                tenantId: '58fddb8a-9fb2-4168-be2d-1de82a824b54',
                tenantCode: '9u7q642m159qw74p0uhb6x15b05qjlhegfu9bvrp4tswlqa4p3',
                systemId: '4b4b9e5b-f8f2-4896-a2fc-9c985cfe8767',
                systemName: 'ojbaiwy1hwqoosdytbn0',
                executionId: '7fa4f7c9-d28d-43c4-ae32-cfa0ca755c89',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 14:36:04',
                executionMonitoringStartAt: '2020-11-04 16:45:17',
                executionMonitoringEndAt: '2020-11-04 19:13:03',
                numberMax: 8965463395,
                numberDays: 9934964480,
                success: 6797393856,
                cancelled: -9,
                delivering: 6859290942,
                error: 4578202443,
                holding: 5968909472,
                toBeDelivered: 6889451119,
                waiting: 4124421001,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewCancelled must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewDelivering must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '47303dd8-f22c-41be-9813-8cdf86502323',
                tenantId: '58fddb8a-9fb2-4168-be2d-1de82a824b54',
                tenantCode: 'h4v61m1cro88uggrik3nm4rkd1pbfmdlyetbn7lj70whojvebb',
                systemId: '4b4b9e5b-f8f2-4896-a2fc-9c985cfe8767',
                systemName: 'nflne760cc4045n3ngl2',
                executionId: '7fa4f7c9-d28d-43c4-ae32-cfa0ca755c89',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 12:13:44',
                executionMonitoringStartAt: '2020-11-04 15:53:36',
                executionMonitoringEndAt: '2020-11-04 03:08:16',
                numberMax: 3969407728,
                numberDays: 9454781687,
                success: 3630419778,
                cancelled: 2801682214,
                delivering: -9,
                error: 4458719369,
                holding: 6315561887,
                toBeDelivered: 3812322683,
                waiting: 4887858439,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewDelivering must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewError must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '47303dd8-f22c-41be-9813-8cdf86502323',
                tenantId: '58fddb8a-9fb2-4168-be2d-1de82a824b54',
                tenantCode: '192o9vz1s01gx51e6a3uzaagr86rpr37q4bc6cze4zwncfja8f',
                systemId: '4b4b9e5b-f8f2-4896-a2fc-9c985cfe8767',
                systemName: '901lfoy9vzgcnv98xsjx',
                executionId: '7fa4f7c9-d28d-43c4-ae32-cfa0ca755c89',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 08:15:44',
                executionMonitoringStartAt: '2020-11-03 20:34:49',
                executionMonitoringEndAt: '2020-11-03 21:06:52',
                numberMax: 3128789210,
                numberDays: 3671000847,
                success: 4600607109,
                cancelled: 4285627123,
                delivering: 2307448275,
                error: -9,
                holding: 5587211465,
                toBeDelivered: 7981107048,
                waiting: 5701111769,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewError must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewHolding must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '47303dd8-f22c-41be-9813-8cdf86502323',
                tenantId: '58fddb8a-9fb2-4168-be2d-1de82a824b54',
                tenantCode: 'ensm1hu1e0fqmvw4q9429y6pooc7lv91y0bqae0ivzq6kznuup',
                systemId: '4b4b9e5b-f8f2-4896-a2fc-9c985cfe8767',
                systemName: 'mixe3zxlcobp4f0osj4o',
                executionId: '7fa4f7c9-d28d-43c4-ae32-cfa0ca755c89',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 00:58:43',
                executionMonitoringStartAt: '2020-11-04 16:48:22',
                executionMonitoringEndAt: '2020-11-04 04:26:31',
                numberMax: 6215466265,
                numberDays: 4612835880,
                success: 7655244327,
                cancelled: 2266836283,
                delivering: 5349409935,
                error: 5465231198,
                holding: -9,
                toBeDelivered: 2493337231,
                waiting: 2843769122,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewHolding must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewToBeDelivered must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '47303dd8-f22c-41be-9813-8cdf86502323',
                tenantId: '58fddb8a-9fb2-4168-be2d-1de82a824b54',
                tenantCode: 'gxynzuuj0n5shhloxnkyf4dxbqktu241a84kh19alhx4rcudh5',
                systemId: '4b4b9e5b-f8f2-4896-a2fc-9c985cfe8767',
                systemName: 'q16ftnx7matbscgb0l4u',
                executionId: '7fa4f7c9-d28d-43c4-ae32-cfa0ca755c89',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 18:00:15',
                executionMonitoringStartAt: '2020-11-03 19:44:18',
                executionMonitoringEndAt: '2020-11-04 05:47:21',
                numberMax: 7225390845,
                numberDays: 7007783499,
                success: 4637264773,
                cancelled: 8725599978,
                delivering: 2889468767,
                error: 7071229737,
                holding: 5053363828,
                toBeDelivered: -9,
                waiting: 7514693452,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewToBeDelivered must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewWaiting must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '47303dd8-f22c-41be-9813-8cdf86502323',
                tenantId: '58fddb8a-9fb2-4168-be2d-1de82a824b54',
                tenantCode: 'u7heacppw3uta76702gzj1ss2oujia0n74c9exookb31a7frxj',
                systemId: '4b4b9e5b-f8f2-4896-a2fc-9c985cfe8767',
                systemName: '922hpcmihml9pi1fz3yh',
                executionId: '7fa4f7c9-d28d-43c4-ae32-cfa0ca755c89',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 16:43:04',
                executionMonitoringStartAt: '2020-11-04 08:56:25',
                executionMonitoringEndAt: '2020-11-04 18:45:39',
                numberMax: 6852723323,
                numberDays: 3338559238,
                success: 3263750766,
                cancelled: 6807565796,
                delivering: 8818089137,
                error: 5011372366,
                holding: 8937692133,
                toBeDelivered: 1049772758,
                waiting: -9,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewWaiting must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '47303dd8-f22c-41be-9813-8cdf86502323',
                tenantId: '58fddb8a-9fb2-4168-be2d-1de82a824b54',
                tenantCode: 'mnlwtv63cggzb1uqkwghhqndgq3jfmr5w9nod52yrei68kny80',
                systemId: '4b4b9e5b-f8f2-4896-a2fc-9c985cfe8767',
                systemName: '5hubujlkahvqpwa5t82m',
                executionId: '7fa4f7c9-d28d-43c4-ae32-cfa0ca755c89',
                executionType: 'XXXX',
                executionExecutedAt: '2020-11-04 14:00:14',
                executionMonitoringStartAt: '2020-11-03 21:03:27',
                executionMonitoringEndAt: '2020-11-04 08:15:57',
                numberMax: 3978263417,
                numberDays: 5467948854,
                success: 9542170362,
                cancelled: 5958990339,
                delivering: 5482574226,
                error: 1796155693,
                holding: 5551805158,
                toBeDelivered: 1881479623,
                waiting: 7905317453,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    

    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '47303dd8-f22c-41be-9813-8cdf86502323',
                tenantId: '58fddb8a-9fb2-4168-be2d-1de82a824b54',
                tenantCode: '75163xrnkel4b91y6x78xyrgoh882xyci7n9xpw01l6ztcbiaa',
                systemId: '4b4b9e5b-f8f2-4896-a2fc-9c985cfe8767',
                systemName: 'w8s929z2o24b1ctc8l62',
                executionId: '7fa4f7c9-d28d-43c4-ae32-cfa0ca755c89',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-11-04 00:59:21',
                executionMonitoringEndAt: '2020-11-04 17:54:14',
                numberMax: 4342836909,
                numberDays: 8349402722,
                success: 2588622658,
                cancelled: 8681301754,
                delivering: 9611754551,
                error: 8176714655,
                holding: 3439057638,
                toBeDelivered: 6483763534,
                waiting: 1411732851,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionExecutedAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewExecutionMonitoringStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '47303dd8-f22c-41be-9813-8cdf86502323',
                tenantId: '58fddb8a-9fb2-4168-be2d-1de82a824b54',
                tenantCode: 'k8opiabjt7117mdnxt0gr4dvk3k0pg6kwjzj2z03idm0onfy4l',
                systemId: '4b4b9e5b-f8f2-4896-a2fc-9c985cfe8767',
                systemName: 'nmcjws8d2waioaqy0o4p',
                executionId: '7fa4f7c9-d28d-43c4-ae32-cfa0ca755c89',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 03:15:23',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-11-04 00:56:12',
                numberMax: 6626016946,
                numberDays: 8053310329,
                success: 6550031141,
                cancelled: 9527931917,
                delivering: 4177825486,
                error: 8911204744,
                holding: 1944878539,
                toBeDelivered: 8973306284,
                waiting: 5343468979,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST cci/message-overview - Got 400 Conflict, MessageOverviewExecutionMonitoringEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '47303dd8-f22c-41be-9813-8cdf86502323',
                tenantId: '58fddb8a-9fb2-4168-be2d-1de82a824b54',
                tenantCode: 'p1us67yvaied94gtdkhgtrwu9f2l7az2iqefs5fvccrirvv3dq',
                systemId: '4b4b9e5b-f8f2-4896-a2fc-9c985cfe8767',
                systemName: 'yp701nnzzzrmejtcdqiy',
                executionId: '7fa4f7c9-d28d-43c4-ae32-cfa0ca755c89',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 13:38:58',
                executionMonitoringStartAt: '2020-11-04 11:00:19',
                executionMonitoringEndAt: 'XXXXXXXX',
                numberMax: 8578307570,
                numberDays: 8626216429,
                success: 8321762066,
                cancelled: 7061089252,
                delivering: 1565385437,
                error: 5008056909,
                holding: 4876361779,
                toBeDelivered: 8473802454,
                waiting: 3188103756,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST cci/message-overview`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '47303dd8-f22c-41be-9813-8cdf86502323',
                tenantId: '58fddb8a-9fb2-4168-be2d-1de82a824b54',
                tenantCode: 'xhznllaa1284j679eghsndm950bpi8z6nel8p6g6kpftr2m7z9',
                systemId: '4b4b9e5b-f8f2-4896-a2fc-9c985cfe8767',
                systemName: 'h1rbj6p4l3x0ic61fz7e',
                executionId: '7fa4f7c9-d28d-43c4-ae32-cfa0ca755c89',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 22:52:57',
                executionMonitoringStartAt: '2020-11-03 21:33:45',
                executionMonitoringEndAt: '2020-11-04 00:22:59',
                numberMax: 5356076698,
                numberDays: 6188038605,
                success: 4421941378,
                cancelled: 5001479817,
                delivering: 7402180416,
                error: 2622250345,
                holding: 9850250541,
                toBeDelivered: 1599022854,
                waiting: 8012971473,
            })
            .expect(201);
    });

    test(`/REST:GET cci/messages-overview/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/messages-overview/paginate')
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

    test(`/REST:GET cci/message-overview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '1fb34980-1285-4b0c-ad40-121af5eb490a'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET cci/message-overview`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '47303dd8-f22c-41be-9813-8cdf86502323'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '47303dd8-f22c-41be-9813-8cdf86502323'));
    });

    test(`/REST:GET cci/message-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/message-overview/e820b761-ac45-44ac-8c75-8859c183438f')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/message-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/message-overview/47303dd8-f22c-41be-9813-8cdf86502323')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '47303dd8-f22c-41be-9813-8cdf86502323'));
    });

    test(`/REST:GET cci/messages-overview`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/messages-overview')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT cci/message-overview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: '5bedb7bb-24d6-458f-b149-a33e60f4965f',
                tenantId: '76d5bbf1-d2bc-4f15-b6c6-1214d857ebc1',
                tenantCode: '5lc1rnii3yu5am0kbkap3nql2480z8wlcpt69c4yuoatr62nhm',
                systemId: '19cffbee-6c4c-47cd-a236-a264d7879204',
                systemName: '00pzvz7cd0ku9j8wp74k',
                executionId: '66d0da2f-e4ec-4ff8-8d62-61a75b2cd287',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 17:33:40',
                executionMonitoringStartAt: '2020-11-03 19:56:22',
                executionMonitoringEndAt: '2020-11-04 08:50:31',
                numberMax: 8124094703,
                numberDays: 7417901388,
                success: 3018237046,
                cancelled: 6156206849,
                delivering: 5202538579,
                error: 9479966963,
                holding: 6581169588,
                toBeDelivered: 7099031906,
                waiting: 5924193231,
            })
            .expect(404);
    });

    test(`/REST:PUT cci/message-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/message-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: '47303dd8-f22c-41be-9813-8cdf86502323',
                tenantId: '58fddb8a-9fb2-4168-be2d-1de82a824b54',
                tenantCode: 'qyfk86p1c7hh1tz8ahmq6c77d33s5a2niolw4f44o9qedrrdu9',
                systemId: '4b4b9e5b-f8f2-4896-a2fc-9c985cfe8767',
                systemName: 'sulh1djnou24vy6sitod',
                executionId: '7fa4f7c9-d28d-43c4-ae32-cfa0ca755c89',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 04:47:35',
                executionMonitoringStartAt: '2020-11-04 01:08:08',
                executionMonitoringEndAt: '2020-11-04 04:48:29',
                numberMax: 7179895573,
                numberDays: 1783588167,
                success: 6276339849,
                cancelled: 8071401903,
                delivering: 1219814913,
                error: 6826798052,
                holding: 1021507709,
                toBeDelivered: 4151002273,
                waiting: 9275421294,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '47303dd8-f22c-41be-9813-8cdf86502323'));
    });

    test(`/REST:DELETE cci/message-overview/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/message-overview/e3de13eb-5453-494a-bb8f-e6dc991000c5')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/message-overview/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/message-overview/47303dd8-f22c-41be-9813-8cdf86502323')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL cciCreateMessageOverview - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateMessageOverviewInput!)
                    {
                        cciCreateMessageOverview (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
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

    test(`/GraphQL cciCreateMessageOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateMessageOverviewInput!)
                    {
                        cciCreateMessageOverview (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
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
                        id: '12f08c5b-cd76-43fd-9ad3-fa79c68b3d12',
                        tenantId: '58fddb8a-9fb2-4168-be2d-1de82a824b54',
                        tenantCode: 'd2i7h1rfqhsy274omdz0c3elb24vd1hoiek05m2qzbpt0hdh25',
                        systemId: '4b4b9e5b-f8f2-4896-a2fc-9c985cfe8767',
                        systemName: '048g8dvfuhsfadf9xzg0',
                        executionId: '7fa4f7c9-d28d-43c4-ae32-cfa0ca755c89',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-11-03 20:52:16',
                        executionMonitoringStartAt: '2020-11-04 19:29:35',
                        executionMonitoringEndAt: '2020-11-03 20:03:41',
                        numberMax: 6604104928,
                        numberDays: 3333947827,
                        success: 8683724196,
                        cancelled: 3827220803,
                        delivering: 2477941829,
                        error: 4134633450,
                        holding: 4565878961,
                        toBeDelivered: 7513650736,
                        waiting: 4026550514,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateMessageOverview).toHaveProperty('id', '12f08c5b-cd76-43fd-9ad3-fa79c68b3d12');
            });
    });

    test(`/GraphQL cciPaginateMessagesOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        cciPaginateMessagesOverview (query:$query constraint:$constraint)
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
                expect(res.body.data.cciPaginateMessagesOverview.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateMessagesOverview.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateMessagesOverview.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL cciFindMessageOverview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindMessageOverview (query:$query)
                        {   
                            id
                            tenantCode
                            systemName
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
                variables: 
                {
                    query: 
                    {
                        where: 
                        {
                            id: '1345798c-dfa4-474a-8990-5383b99d508f'
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

    test(`/GraphQL cciFindMessageOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindMessageOverview (query:$query)
                        {   
                            id
                            tenantCode
                            systemName
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
                variables: 
                {
                    query: 
                    {
                        where: 
                        {
                            id: '47303dd8-f22c-41be-9813-8cdf86502323'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindMessageOverview.id).toStrictEqual('47303dd8-f22c-41be-9813-8cdf86502323');
            });
    });

    test(`/GraphQL cciFindMessageOverviewById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindMessageOverviewById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
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
                    id: 'e22c81cb-8b55-426b-82fc-d2906964254f'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciFindMessageOverviewById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindMessageOverviewById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
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
                    id: '47303dd8-f22c-41be-9813-8cdf86502323'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindMessageOverviewById.id).toStrictEqual('47303dd8-f22c-41be-9813-8cdf86502323');
            });
    });

    test(`/GraphQL cciGetMessagesOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciGetMessagesOverview (query:$query)
                        {   
                            id
                            tenantCode
                            systemName
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
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.cciGetMessagesOverview.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL cciUpdateMessageOverview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateMessageOverviewInput!)
                    {
                        cciUpdateMessageOverview (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
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
                        
                        id: '49ad4d96-26c3-4a84-974e-9f8ee18956b8',
                        tenantId: 'fa058e31-5814-45f2-af00-4d957e3727ec',
                        tenantCode: 'ndmv35b27ulifi7s4jskadhovyqaur40ee0sj62x1625y68cp7',
                        systemId: '1d03254a-7015-4ff2-a02d-cd79f17b5281',
                        systemName: '3uf2z64rdg8nomyyslpn',
                        executionId: '5fbeb329-c60c-4f5f-8d30-26f0ed854eae',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-11-04 18:22:32',
                        executionMonitoringStartAt: '2020-11-04 04:13:14',
                        executionMonitoringEndAt: '2020-11-04 10:37:24',
                        numberMax: 2540190371,
                        numberDays: 3686187731,
                        success: 3857384560,
                        cancelled: 4937268937,
                        delivering: 6032276540,
                        error: 1192234882,
                        holding: 7998573507,
                        toBeDelivered: 1250779859,
                        waiting: 8978975441,
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

    test(`/GraphQL cciUpdateMessageOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateMessageOverviewInput!)
                    {
                        cciUpdateMessageOverview (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
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
                        
                        id: '47303dd8-f22c-41be-9813-8cdf86502323',
                        tenantId: '58fddb8a-9fb2-4168-be2d-1de82a824b54',
                        tenantCode: 'jvjtwwftp3x3slszpxa854zs1td5jnpbg4qf8vanued8yzb8du',
                        systemId: '4b4b9e5b-f8f2-4896-a2fc-9c985cfe8767',
                        systemName: 'a1qzj21b5427f47eeewu',
                        executionId: '7fa4f7c9-d28d-43c4-ae32-cfa0ca755c89',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-11-04 07:16:56',
                        executionMonitoringStartAt: '2020-11-03 22:57:29',
                        executionMonitoringEndAt: '2020-11-04 05:02:23',
                        numberMax: 6369514893,
                        numberDays: 7645846086,
                        success: 1585169180,
                        cancelled: 6799049655,
                        delivering: 1951675315,
                        error: 9152399789,
                        holding: 2093191029,
                        toBeDelivered: 1427406741,
                        waiting: 4367147887,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateMessageOverview.id).toStrictEqual('47303dd8-f22c-41be-9813-8cdf86502323');
            });
    });

    test(`/GraphQL cciDeleteMessageOverviewById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteMessageOverviewById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
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
                    id: 'da65e1a4-d850-43d8-b55b-27cee856d1d8'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciDeleteMessageOverviewById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteMessageOverviewById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
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
                    id: '47303dd8-f22c-41be-9813-8cdf86502323'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteMessageOverviewById.id).toStrictEqual('47303dd8-f22c-41be-9813-8cdf86502323');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});