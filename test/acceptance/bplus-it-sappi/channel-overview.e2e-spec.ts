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
                tenantId: '44be8393-d0ce-4ee2-af89-8942b0df21f0',
                tenantCode: 'jclr322potth2tzi3lmn8u8rb6httjh16p0q603yt6ldsvwg99',
                systemId: 'fdbf202a-3e00-407d-b01c-c9c27e5b4e05',
                systemName: 'bg80b4m6g4sgz542lcnb',
                executionId: '52d71da2-0618-42cd-8910-58e4e75bf243',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 02:04:30',
                executionMonitoringStartAt: '2020-07-29 04:29:46',
                executionMonitoringEndAt: '2020-07-29 08:59:10',
                error: 5333866852,
                inactive: 3382477987,
                successful: 1941353583,
                stopped: 7974990797,
                unknown: 2517165744,
                unregistered: 8753347009,
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
                
                tenantId: '44be8393-d0ce-4ee2-af89-8942b0df21f0',
                tenantCode: 'ds5sz3om8y58qjg6sj0ov96qc31dn2fyb2gi9yy8fcdf98m9qv',
                systemId: 'fdbf202a-3e00-407d-b01c-c9c27e5b4e05',
                systemName: 'jtmoo49smw63q3rrlono',
                executionId: '52d71da2-0618-42cd-8910-58e4e75bf243',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 22:58:39',
                executionMonitoringStartAt: '2020-07-29 08:09:25',
                executionMonitoringEndAt: '2020-07-28 21:19:34',
                error: 5724365723,
                inactive: 6267170713,
                successful: 8066348160,
                stopped: 3901554769,
                unknown: 1491071263,
                unregistered: 8089333331,
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
                id: '93875555-6cec-42d5-81d2-e1df6f932027',
                tenantId: null,
                tenantCode: '7n2m91lour6e516pui5vzea2m0zagkzfmgivrkvz81549iv3nd',
                systemId: 'fdbf202a-3e00-407d-b01c-c9c27e5b4e05',
                systemName: 'j80tfpwc7jtbx3ef3dlc',
                executionId: '52d71da2-0618-42cd-8910-58e4e75bf243',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 22:46:52',
                executionMonitoringStartAt: '2020-07-28 21:09:17',
                executionMonitoringEndAt: '2020-07-28 18:33:50',
                error: 2966958259,
                inactive: 1406175497,
                successful: 7579830498,
                stopped: 9992412900,
                unknown: 7891709152,
                unregistered: 9147928564,
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
                id: '93875555-6cec-42d5-81d2-e1df6f932027',
                
                tenantCode: '9a97htywcg66id0wum8tfzajkfa22olcwxoc1cztijfiwwy0if',
                systemId: 'fdbf202a-3e00-407d-b01c-c9c27e5b4e05',
                systemName: 'xvnic9733cjqwjs03cq8',
                executionId: '52d71da2-0618-42cd-8910-58e4e75bf243',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 17:05:45',
                executionMonitoringStartAt: '2020-07-29 14:01:00',
                executionMonitoringEndAt: '2020-07-29 02:53:27',
                error: 6634571751,
                inactive: 5653215506,
                successful: 6142691303,
                stopped: 3812926228,
                unknown: 6404957322,
                unregistered: 7660253775,
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
                id: '93875555-6cec-42d5-81d2-e1df6f932027',
                tenantId: '44be8393-d0ce-4ee2-af89-8942b0df21f0',
                tenantCode: null,
                systemId: 'fdbf202a-3e00-407d-b01c-c9c27e5b4e05',
                systemName: '9mrud33lwp34dcqw1qw7',
                executionId: '52d71da2-0618-42cd-8910-58e4e75bf243',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 14:11:37',
                executionMonitoringStartAt: '2020-07-29 12:49:28',
                executionMonitoringEndAt: '2020-07-29 13:51:46',
                error: 9807328603,
                inactive: 5427146228,
                successful: 1498783091,
                stopped: 6183905231,
                unknown: 4011613018,
                unregistered: 3778248768,
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
                id: '93875555-6cec-42d5-81d2-e1df6f932027',
                tenantId: '44be8393-d0ce-4ee2-af89-8942b0df21f0',
                
                systemId: 'fdbf202a-3e00-407d-b01c-c9c27e5b4e05',
                systemName: 'xhx7rar167wf6yx2m2l2',
                executionId: '52d71da2-0618-42cd-8910-58e4e75bf243',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 00:03:03',
                executionMonitoringStartAt: '2020-07-29 10:34:27',
                executionMonitoringEndAt: '2020-07-29 06:00:22',
                error: 5336910439,
                inactive: 2289334736,
                successful: 3031562399,
                stopped: 1410805082,
                unknown: 7041884589,
                unregistered: 2788361329,
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
                id: '93875555-6cec-42d5-81d2-e1df6f932027',
                tenantId: '44be8393-d0ce-4ee2-af89-8942b0df21f0',
                tenantCode: '187069s3ane9esszu32oorpkym0rp4m1qzg0h0m2s8s4c2nqxy',
                systemId: null,
                systemName: 'kt8wm5yv14nfer3b43ij',
                executionId: '52d71da2-0618-42cd-8910-58e4e75bf243',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 13:10:06',
                executionMonitoringStartAt: '2020-07-29 06:38:34',
                executionMonitoringEndAt: '2020-07-29 02:09:01',
                error: 6001669075,
                inactive: 4950879761,
                successful: 6303568656,
                stopped: 2159804102,
                unknown: 9702390946,
                unregistered: 2288352915,
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
                id: '93875555-6cec-42d5-81d2-e1df6f932027',
                tenantId: '44be8393-d0ce-4ee2-af89-8942b0df21f0',
                tenantCode: 'sz31cg2t74c5tnawa3z9bjtugfb8n5vyn2hkcn0u18j6h5480g',
                
                systemName: '4nrqg7iaoa2s2m89sjbn',
                executionId: '52d71da2-0618-42cd-8910-58e4e75bf243',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 09:08:03',
                executionMonitoringStartAt: '2020-07-28 18:53:09',
                executionMonitoringEndAt: '2020-07-29 09:32:30',
                error: 1937640297,
                inactive: 8465054406,
                successful: 4112491761,
                stopped: 1072915914,
                unknown: 2681975141,
                unregistered: 8205611695,
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
                id: '93875555-6cec-42d5-81d2-e1df6f932027',
                tenantId: '44be8393-d0ce-4ee2-af89-8942b0df21f0',
                tenantCode: '1wpxum14qholxmz4ff3guafhjq2afh90pjqabim7doq5slk3ac',
                systemId: 'fdbf202a-3e00-407d-b01c-c9c27e5b4e05',
                systemName: null,
                executionId: '52d71da2-0618-42cd-8910-58e4e75bf243',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 14:59:56',
                executionMonitoringStartAt: '2020-07-29 10:55:53',
                executionMonitoringEndAt: '2020-07-29 02:45:17',
                error: 8589665696,
                inactive: 2089904897,
                successful: 1843399029,
                stopped: 6805239810,
                unknown: 8526448433,
                unregistered: 1358369380,
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
                id: '93875555-6cec-42d5-81d2-e1df6f932027',
                tenantId: '44be8393-d0ce-4ee2-af89-8942b0df21f0',
                tenantCode: 'cqp9uymjh7800vscrddikoz0op0mrpuy13r8ycp6afjgv9g69r',
                systemId: 'fdbf202a-3e00-407d-b01c-c9c27e5b4e05',
                
                executionId: '52d71da2-0618-42cd-8910-58e4e75bf243',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 10:28:13',
                executionMonitoringStartAt: '2020-07-28 23:10:25',
                executionMonitoringEndAt: '2020-07-29 07:26:01',
                error: 9257269863,
                inactive: 8884272670,
                successful: 5082397752,
                stopped: 3756728133,
                unknown: 1558440432,
                unregistered: 6586631399,
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
                id: '93875555-6cec-42d5-81d2-e1df6f932027',
                tenantId: '44be8393-d0ce-4ee2-af89-8942b0df21f0',
                tenantCode: 'xoytgi95ei5m0t89pzp6b4jtkif3ji4g4hewdg69zp57e6itgj',
                systemId: 'fdbf202a-3e00-407d-b01c-c9c27e5b4e05',
                systemName: 'tns7h43htq5mbq3lp9lg',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 21:57:12',
                executionMonitoringStartAt: '2020-07-29 14:26:47',
                executionMonitoringEndAt: '2020-07-29 04:22:04',
                error: 4090127754,
                inactive: 3178322557,
                successful: 3078892571,
                stopped: 8172741667,
                unknown: 7445948275,
                unregistered: 4204625146,
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
                id: '93875555-6cec-42d5-81d2-e1df6f932027',
                tenantId: '44be8393-d0ce-4ee2-af89-8942b0df21f0',
                tenantCode: '8ebmzleae70qoiukp3adegb9uhlnztb06ooswbuhpwyt1rrhcz',
                systemId: 'fdbf202a-3e00-407d-b01c-c9c27e5b4e05',
                systemName: '2h7nx40yfq18gqspyyhd',
                
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 09:20:25',
                executionMonitoringStartAt: '2020-07-28 19:18:55',
                executionMonitoringEndAt: '2020-07-29 13:09:45',
                error: 9026886227,
                inactive: 3068105638,
                successful: 2307907324,
                stopped: 7297997006,
                unknown: 5439949532,
                unregistered: 8784583874,
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
                id: '93875555-6cec-42d5-81d2-e1df6f932027',
                tenantId: '44be8393-d0ce-4ee2-af89-8942b0df21f0',
                tenantCode: 'c6wg6v5mnjmt8fo817zvd9iniuyn8j437123nna2ct0aezyrzl',
                systemId: 'fdbf202a-3e00-407d-b01c-c9c27e5b4e05',
                systemName: 'asyovnufqe9qjjw6x28s',
                executionId: '52d71da2-0618-42cd-8910-58e4e75bf243',
                executionType: null,
                executionExecutedAt: '2020-07-29 04:37:51',
                executionMonitoringStartAt: '2020-07-28 18:30:00',
                executionMonitoringEndAt: '2020-07-29 13:13:54',
                error: 9330623961,
                inactive: 4891771953,
                successful: 5220994448,
                stopped: 8191067656,
                unknown: 8649360160,
                unregistered: 7152990405,
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
                id: '93875555-6cec-42d5-81d2-e1df6f932027',
                tenantId: '44be8393-d0ce-4ee2-af89-8942b0df21f0',
                tenantCode: 'y6m8vv69sjo83onoh1xdvohiii5zp962iwczcnvrha7dpre8nf',
                systemId: 'fdbf202a-3e00-407d-b01c-c9c27e5b4e05',
                systemName: 'kvlsfv49nv9t64okxyq9',
                executionId: '52d71da2-0618-42cd-8910-58e4e75bf243',
                
                executionExecutedAt: '2020-07-29 15:34:58',
                executionMonitoringStartAt: '2020-07-29 04:45:10',
                executionMonitoringEndAt: '2020-07-28 18:11:00',
                error: 8806632271,
                inactive: 8138863151,
                successful: 3919036562,
                stopped: 8919643195,
                unknown: 3190954437,
                unregistered: 3032767786,
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
                id: '93875555-6cec-42d5-81d2-e1df6f932027',
                tenantId: '44be8393-d0ce-4ee2-af89-8942b0df21f0',
                tenantCode: 'nj7a1uy19q2bnx0jos21ahj4x3q99qgtv2i009uyo0goca3u2r',
                systemId: 'fdbf202a-3e00-407d-b01c-c9c27e5b4e05',
                systemName: '144wbauqc1rn1oge1c2k',
                executionId: '52d71da2-0618-42cd-8910-58e4e75bf243',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-29 08:00:43',
                executionMonitoringEndAt: '2020-07-28 23:13:23',
                error: 5291461719,
                inactive: 2329011604,
                successful: 1255436791,
                stopped: 9129052156,
                unknown: 3444260219,
                unregistered: 3611448844,
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
                id: '93875555-6cec-42d5-81d2-e1df6f932027',
                tenantId: '44be8393-d0ce-4ee2-af89-8942b0df21f0',
                tenantCode: '6thw25qowuu9nyv2csofzl62bemimwarac4rjdfvf5vdvp3e7e',
                systemId: 'fdbf202a-3e00-407d-b01c-c9c27e5b4e05',
                systemName: 'dysqbzcwa9wqhdp50bnw',
                executionId: '52d71da2-0618-42cd-8910-58e4e75bf243',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-07-28 22:20:10',
                executionMonitoringEndAt: '2020-07-28 19:31:59',
                error: 3158401936,
                inactive: 1173345478,
                successful: 8490337886,
                stopped: 4202054963,
                unknown: 1614605260,
                unregistered: 6890013976,
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
                id: '93875555-6cec-42d5-81d2-e1df6f932027',
                tenantId: '44be8393-d0ce-4ee2-af89-8942b0df21f0',
                tenantCode: 'pf19r5j9wb3mvi1w0b7z8tjxszxnst0u8c2ehwm63ur8rua0i4',
                systemId: 'fdbf202a-3e00-407d-b01c-c9c27e5b4e05',
                systemName: '2u7dzn05z0qjfej89w47',
                executionId: '52d71da2-0618-42cd-8910-58e4e75bf243',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 13:10:12',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-29 12:00:01',
                error: 5454649380,
                inactive: 4382931688,
                successful: 8584835180,
                stopped: 1475356881,
                unknown: 9686473558,
                unregistered: 7537098332,
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
                id: '93875555-6cec-42d5-81d2-e1df6f932027',
                tenantId: '44be8393-d0ce-4ee2-af89-8942b0df21f0',
                tenantCode: 'qvg3h4r4kpkx3jwo8fzlhzwa9akoem40o10rkgjp25i0balhas',
                systemId: 'fdbf202a-3e00-407d-b01c-c9c27e5b4e05',
                systemName: '790cfp9o1jxoj5n47ldw',
                executionId: '52d71da2-0618-42cd-8910-58e4e75bf243',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 14:27:02',
                
                executionMonitoringEndAt: '2020-07-29 04:00:29',
                error: 8786938327,
                inactive: 5453351018,
                successful: 3969772900,
                stopped: 4046632692,
                unknown: 7177266489,
                unregistered: 5276247444,
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
                id: '93875555-6cec-42d5-81d2-e1df6f932027',
                tenantId: '44be8393-d0ce-4ee2-af89-8942b0df21f0',
                tenantCode: '10fyjfim45l0my07nf4i5y9vmprksil5vdjgvc7229xxxe6itp',
                systemId: 'fdbf202a-3e00-407d-b01c-c9c27e5b4e05',
                systemName: '33umnmvdockc2f2d7ruo',
                executionId: '52d71da2-0618-42cd-8910-58e4e75bf243',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 19:17:15',
                executionMonitoringStartAt: '2020-07-29 00:43:52',
                executionMonitoringEndAt: null,
                error: 1193878010,
                inactive: 1398212243,
                successful: 2979938258,
                stopped: 9502179604,
                unknown: 8065941697,
                unregistered: 3736995233,
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
                id: '93875555-6cec-42d5-81d2-e1df6f932027',
                tenantId: '44be8393-d0ce-4ee2-af89-8942b0df21f0',
                tenantCode: '081xcmx4c6zxg12q8fbjo2nxs4u5g6x0jey34wkmznxwtjyhpy',
                systemId: 'fdbf202a-3e00-407d-b01c-c9c27e5b4e05',
                systemName: 'kuloc7j11r27xcanbx7j',
                executionId: '52d71da2-0618-42cd-8910-58e4e75bf243',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 00:08:41',
                executionMonitoringStartAt: '2020-07-29 06:07:39',
                
                error: 6626907426,
                inactive: 8417061869,
                successful: 1033283473,
                stopped: 2599497792,
                unknown: 8731719572,
                unregistered: 8336395423,
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
                id: 'uvmd1vw9v9eiodsdbyzgienbsyiv88t8cbxei',
                tenantId: '44be8393-d0ce-4ee2-af89-8942b0df21f0',
                tenantCode: 'iekvbjngu0npps5rh5u8kflo2uw15v63p9dkx7nococw8epk3b',
                systemId: 'fdbf202a-3e00-407d-b01c-c9c27e5b4e05',
                systemName: 'upao6ydz3yzt35noorrt',
                executionId: '52d71da2-0618-42cd-8910-58e4e75bf243',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 23:47:36',
                executionMonitoringStartAt: '2020-07-29 00:30:23',
                executionMonitoringEndAt: '2020-07-28 22:30:46',
                error: 1312325651,
                inactive: 1884077157,
                successful: 5164241510,
                stopped: 1755645310,
                unknown: 8918183037,
                unregistered: 3343743971,
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
                id: '93875555-6cec-42d5-81d2-e1df6f932027',
                tenantId: 'h9q9fu73jatqxrmbdjl3u189larp82z77trr8',
                tenantCode: 'rh3iley8ciolrqwhkg7q4g2v41rj1bs0q0woozrqvsjddfdesr',
                systemId: 'fdbf202a-3e00-407d-b01c-c9c27e5b4e05',
                systemName: '8jctabpttvxbcapwmj2m',
                executionId: '52d71da2-0618-42cd-8910-58e4e75bf243',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 05:43:55',
                executionMonitoringStartAt: '2020-07-29 09:56:53',
                executionMonitoringEndAt: '2020-07-28 16:58:46',
                error: 9197465498,
                inactive: 5437562900,
                successful: 1423395926,
                stopped: 5236021323,
                unknown: 6740355201,
                unregistered: 8092746693,
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
                id: '93875555-6cec-42d5-81d2-e1df6f932027',
                tenantId: '44be8393-d0ce-4ee2-af89-8942b0df21f0',
                tenantCode: '3rcohe32rg234sag951602devn1hrfu8psxgwprckuspd1uc0a',
                systemId: 'shnldogs9v1v3n03amnqy3p5qww1glc2mxl18',
                systemName: 'osbc9nadib1d68bu61ti',
                executionId: '52d71da2-0618-42cd-8910-58e4e75bf243',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 22:00:29',
                executionMonitoringStartAt: '2020-07-28 17:05:28',
                executionMonitoringEndAt: '2020-07-28 23:01:37',
                error: 3878218296,
                inactive: 6811685277,
                successful: 2212819642,
                stopped: 1258136333,
                unknown: 6649772369,
                unregistered: 7068687606,
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
                id: '93875555-6cec-42d5-81d2-e1df6f932027',
                tenantId: '44be8393-d0ce-4ee2-af89-8942b0df21f0',
                tenantCode: 'zjo4b3t8zsjvehxg8wkaaurw60ikyivepfpf2ba0gxw18k2fi6',
                systemId: 'fdbf202a-3e00-407d-b01c-c9c27e5b4e05',
                systemName: 'zwuu3bq43erpyepl1xd8',
                executionId: 'a85pwulzg27lfyhcj9b6d0nj2knk67ps46w7v',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 11:16:14',
                executionMonitoringStartAt: '2020-07-29 12:49:36',
                executionMonitoringEndAt: '2020-07-29 06:54:41',
                error: 3815189363,
                inactive: 1634536634,
                successful: 1648445824,
                stopped: 5065607079,
                unknown: 8464268729,
                unregistered: 4873368155,
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
                id: '93875555-6cec-42d5-81d2-e1df6f932027',
                tenantId: '44be8393-d0ce-4ee2-af89-8942b0df21f0',
                tenantCode: 'ziz8nls80g03bls8zp2cc6lws72ihj8obizjnmq2mqbh7rf4v6e',
                systemId: 'fdbf202a-3e00-407d-b01c-c9c27e5b4e05',
                systemName: 'kvulhm1gk2wcb8ght1ul',
                executionId: '52d71da2-0618-42cd-8910-58e4e75bf243',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 14:39:18',
                executionMonitoringStartAt: '2020-07-29 09:50:16',
                executionMonitoringEndAt: '2020-07-29 14:02:37',
                error: 8475058489,
                inactive: 5740975094,
                successful: 7583932541,
                stopped: 3927227127,
                unknown: 2119561518,
                unregistered: 3223400481,
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
                id: '93875555-6cec-42d5-81d2-e1df6f932027',
                tenantId: '44be8393-d0ce-4ee2-af89-8942b0df21f0',
                tenantCode: '77ue7dzrath1ohikbp7w4j2iou6fznu189he3mr3kwsns3gnnc',
                systemId: 'fdbf202a-3e00-407d-b01c-c9c27e5b4e05',
                systemName: '6fqo5y834nm79yxz35vse',
                executionId: '52d71da2-0618-42cd-8910-58e4e75bf243',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 05:58:07',
                executionMonitoringStartAt: '2020-07-29 09:34:52',
                executionMonitoringEndAt: '2020-07-29 11:01:26',
                error: 4319672114,
                inactive: 7098345808,
                successful: 2511498649,
                stopped: 6294424247,
                unknown: 2814893729,
                unregistered: 5495576345,
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
                id: '93875555-6cec-42d5-81d2-e1df6f932027',
                tenantId: '44be8393-d0ce-4ee2-af89-8942b0df21f0',
                tenantCode: '5uumdvg32onzwhtt4hz8s5fw8jytgodlpmjc24nq21hxclfoth',
                systemId: 'fdbf202a-3e00-407d-b01c-c9c27e5b4e05',
                systemName: 'nud1pr4gk7vwnnnr6wgx',
                executionId: '52d71da2-0618-42cd-8910-58e4e75bf243',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 21:47:27',
                executionMonitoringStartAt: '2020-07-29 11:16:27',
                executionMonitoringEndAt: '2020-07-29 02:40:20',
                error: 32999399796,
                inactive: 1555869581,
                successful: 7201603049,
                stopped: 9743330061,
                unknown: 6425888705,
                unregistered: 5320589285,
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
                id: '93875555-6cec-42d5-81d2-e1df6f932027',
                tenantId: '44be8393-d0ce-4ee2-af89-8942b0df21f0',
                tenantCode: 'zike0ov15lh7fyca7qsd0bsbzyh4jci0abj1o4liucek2nbhc5',
                systemId: 'fdbf202a-3e00-407d-b01c-c9c27e5b4e05',
                systemName: '208erchb5oaf7fnrvlce',
                executionId: '52d71da2-0618-42cd-8910-58e4e75bf243',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 11:34:19',
                executionMonitoringStartAt: '2020-07-29 05:41:44',
                executionMonitoringEndAt: '2020-07-28 21:47:49',
                error: 4681582117,
                inactive: 66008876365,
                successful: 9473068266,
                stopped: 4188323838,
                unknown: 8651952267,
                unregistered: 7066935976,
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
                id: '93875555-6cec-42d5-81d2-e1df6f932027',
                tenantId: '44be8393-d0ce-4ee2-af89-8942b0df21f0',
                tenantCode: 'h5ehfdsvhwxltx58ow63bnx3opf1x18fyuqsq0pntz7rwjjovl',
                systemId: 'fdbf202a-3e00-407d-b01c-c9c27e5b4e05',
                systemName: 'ldkq9b2hi4i6gt9cumte',
                executionId: '52d71da2-0618-42cd-8910-58e4e75bf243',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 12:32:56',
                executionMonitoringStartAt: '2020-07-29 05:02:04',
                executionMonitoringEndAt: '2020-07-29 00:34:50',
                error: 4931150178,
                inactive: 2296759914,
                successful: 77223023866,
                stopped: 3960947192,
                unknown: 6471976156,
                unregistered: 7497322463,
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
                id: '93875555-6cec-42d5-81d2-e1df6f932027',
                tenantId: '44be8393-d0ce-4ee2-af89-8942b0df21f0',
                tenantCode: '3zjyf85feoszwcg4jerpc840qz66v09t9miz6zdcm0cmgqv0k3',
                systemId: 'fdbf202a-3e00-407d-b01c-c9c27e5b4e05',
                systemName: 'bnah7adxuhk65l31pwml',
                executionId: '52d71da2-0618-42cd-8910-58e4e75bf243',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 14:42:33',
                executionMonitoringStartAt: '2020-07-29 10:24:37',
                executionMonitoringEndAt: '2020-07-29 14:07:59',
                error: 3901505530,
                inactive: 5960423155,
                successful: 3571478402,
                stopped: 16494227090,
                unknown: 6338740490,
                unregistered: 8956855017,
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
                id: '93875555-6cec-42d5-81d2-e1df6f932027',
                tenantId: '44be8393-d0ce-4ee2-af89-8942b0df21f0',
                tenantCode: 'mvnwymcjvhw8yobamjr6cw05teea0dxzautwuq0g9qppeqpd33',
                systemId: 'fdbf202a-3e00-407d-b01c-c9c27e5b4e05',
                systemName: 'r7jyx9rur82jq5kyobnd',
                executionId: '52d71da2-0618-42cd-8910-58e4e75bf243',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 23:59:01',
                executionMonitoringStartAt: '2020-07-28 22:09:24',
                executionMonitoringEndAt: '2020-07-29 08:28:11',
                error: 3506571159,
                inactive: 6227168547,
                successful: 8351746094,
                stopped: 3993111441,
                unknown: 67304195597,
                unregistered: 2550500479,
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
                id: '93875555-6cec-42d5-81d2-e1df6f932027',
                tenantId: '44be8393-d0ce-4ee2-af89-8942b0df21f0',
                tenantCode: 'cu3u78j0hiy0q3m3lwrbh2k02252plahgujyh6xcocpkgrun7h',
                systemId: 'fdbf202a-3e00-407d-b01c-c9c27e5b4e05',
                systemName: '2sign9qi80t98oms77bw',
                executionId: '52d71da2-0618-42cd-8910-58e4e75bf243',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 18:33:53',
                executionMonitoringStartAt: '2020-07-28 22:46:18',
                executionMonitoringEndAt: '2020-07-29 05:21:41',
                error: 7273657320,
                inactive: 5636539660,
                successful: 8289837474,
                stopped: 8893468267,
                unknown: 8209968682,
                unregistered: 80994563137,
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
                id: '93875555-6cec-42d5-81d2-e1df6f932027',
                tenantId: '44be8393-d0ce-4ee2-af89-8942b0df21f0',
                tenantCode: '4cgprdo5aiisktget2babpn943pgzx9aenprlvfjnwm8c5gr8u',
                systemId: 'fdbf202a-3e00-407d-b01c-c9c27e5b4e05',
                systemName: 'b9cs79jhc3tdm9l1np33',
                executionId: '52d71da2-0618-42cd-8910-58e4e75bf243',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 01:30:48',
                executionMonitoringStartAt: '2020-07-28 22:21:39',
                executionMonitoringEndAt: '2020-07-29 05:55:27',
                error: -9,
                inactive: 4282785681,
                successful: 9722056046,
                stopped: 3263969904,
                unknown: 1117749760,
                unregistered: 7371619659,
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
                id: '93875555-6cec-42d5-81d2-e1df6f932027',
                tenantId: '44be8393-d0ce-4ee2-af89-8942b0df21f0',
                tenantCode: '9xrb4t3rfpi4jk573h6szc8w1f8jv69z1osehuv4qk7m1nb11g',
                systemId: 'fdbf202a-3e00-407d-b01c-c9c27e5b4e05',
                systemName: 'cc9abodli4htw7zuufmy',
                executionId: '52d71da2-0618-42cd-8910-58e4e75bf243',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 11:19:33',
                executionMonitoringStartAt: '2020-07-29 13:33:55',
                executionMonitoringEndAt: '2020-07-29 12:28:23',
                error: 8350704959,
                inactive: -9,
                successful: 8575193020,
                stopped: 5163101069,
                unknown: 1431957613,
                unregistered: 4792735889,
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
                id: '93875555-6cec-42d5-81d2-e1df6f932027',
                tenantId: '44be8393-d0ce-4ee2-af89-8942b0df21f0',
                tenantCode: '99vf8sbas6fgi95nir7n160mbleh1ml363rif1nmd95rftzp7v',
                systemId: 'fdbf202a-3e00-407d-b01c-c9c27e5b4e05',
                systemName: 'j2gf7re5hclezngikjii',
                executionId: '52d71da2-0618-42cd-8910-58e4e75bf243',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 14:35:57',
                executionMonitoringStartAt: '2020-07-29 02:35:09',
                executionMonitoringEndAt: '2020-07-28 19:31:24',
                error: 3006676457,
                inactive: 1523577334,
                successful: -9,
                stopped: 4991468486,
                unknown: 8443715462,
                unregistered: 8940122173,
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
                id: '93875555-6cec-42d5-81d2-e1df6f932027',
                tenantId: '44be8393-d0ce-4ee2-af89-8942b0df21f0',
                tenantCode: 'f5n6z57xxjrj3u6txrtowunql9vrbdb5g9nybpigbm0of3td1b',
                systemId: 'fdbf202a-3e00-407d-b01c-c9c27e5b4e05',
                systemName: 'rtye8sew7flq3nkyfjid',
                executionId: '52d71da2-0618-42cd-8910-58e4e75bf243',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 01:12:39',
                executionMonitoringStartAt: '2020-07-28 17:51:53',
                executionMonitoringEndAt: '2020-07-29 13:13:31',
                error: 3940469091,
                inactive: 1841666955,
                successful: 8679466552,
                stopped: -9,
                unknown: 6810742340,
                unregistered: 1703743430,
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
                id: '93875555-6cec-42d5-81d2-e1df6f932027',
                tenantId: '44be8393-d0ce-4ee2-af89-8942b0df21f0',
                tenantCode: 'c6gc6kdejt3s0dnkxzdz3rc3ylah6hxy5issoehftminjsrebx',
                systemId: 'fdbf202a-3e00-407d-b01c-c9c27e5b4e05',
                systemName: 'ekv7tgawdfox2t088auz',
                executionId: '52d71da2-0618-42cd-8910-58e4e75bf243',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 22:12:30',
                executionMonitoringStartAt: '2020-07-29 10:33:26',
                executionMonitoringEndAt: '2020-07-28 17:24:58',
                error: 1879813641,
                inactive: 5725314731,
                successful: 9496936070,
                stopped: 9993054721,
                unknown: -9,
                unregistered: 3413590387,
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
                id: '93875555-6cec-42d5-81d2-e1df6f932027',
                tenantId: '44be8393-d0ce-4ee2-af89-8942b0df21f0',
                tenantCode: 'bi1k594p2gqt1mn22b8ninmf6q16ow7xgl39z6pwj9ybbb6bqk',
                systemId: 'fdbf202a-3e00-407d-b01c-c9c27e5b4e05',
                systemName: 'wjcads6pp20qkoqm9ygq',
                executionId: '52d71da2-0618-42cd-8910-58e4e75bf243',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 15:57:39',
                executionMonitoringStartAt: '2020-07-29 05:34:48',
                executionMonitoringEndAt: '2020-07-28 22:13:58',
                error: 9346765134,
                inactive: 4982534367,
                successful: 8880753321,
                stopped: 5168587226,
                unknown: 6293132425,
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
                id: '93875555-6cec-42d5-81d2-e1df6f932027',
                tenantId: '44be8393-d0ce-4ee2-af89-8942b0df21f0',
                tenantCode: '6s72pxq7czae85zax6w5cwakwbepjfhpshrry8ucikc9smlj2s',
                systemId: 'fdbf202a-3e00-407d-b01c-c9c27e5b4e05',
                systemName: 'mevv5eh6wj5f7icsu2ua',
                executionId: '52d71da2-0618-42cd-8910-58e4e75bf243',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-29 08:44:07',
                executionMonitoringStartAt: '2020-07-29 00:56:26',
                executionMonitoringEndAt: '2020-07-29 04:08:12',
                error: 8703845272,
                inactive: 1257458047,
                successful: 1415815184,
                stopped: 9200402269,
                unknown: 4618863780,
                unregistered: 8582426082,
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
                id: '93875555-6cec-42d5-81d2-e1df6f932027',
                tenantId: '44be8393-d0ce-4ee2-af89-8942b0df21f0',
                tenantCode: 'k1alrfl3lvevxgoo9t1hr62wc7ap3falq16j6xskdof01eeczf',
                systemId: 'fdbf202a-3e00-407d-b01c-c9c27e5b4e05',
                systemName: 'b5uy3t8ywax9vjwi918h',
                executionId: '52d71da2-0618-42cd-8910-58e4e75bf243',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-29 10:30:03',
                executionMonitoringEndAt: '2020-07-29 02:08:19',
                error: 3270750629,
                inactive: 3961782600,
                successful: 1223280032,
                stopped: 1612783116,
                unknown: 4913035540,
                unregistered: 8589224191,
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
                id: '93875555-6cec-42d5-81d2-e1df6f932027',
                tenantId: '44be8393-d0ce-4ee2-af89-8942b0df21f0',
                tenantCode: '74ydg5ugksvu8qr4bn518jbjqv60e7cby195ucd7mtjt841tev',
                systemId: 'fdbf202a-3e00-407d-b01c-c9c27e5b4e05',
                systemName: 'fym69026j1u50u0fh6rk',
                executionId: '52d71da2-0618-42cd-8910-58e4e75bf243',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 18:26:12',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-28 17:12:18',
                error: 4110679964,
                inactive: 1048852021,
                successful: 6548737039,
                stopped: 6232208763,
                unknown: 3386537627,
                unregistered: 5356915602,
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
                id: '93875555-6cec-42d5-81d2-e1df6f932027',
                tenantId: '44be8393-d0ce-4ee2-af89-8942b0df21f0',
                tenantCode: 'sir5g49uf904iwgdtppk2k1cnl6uoag35xvwncly8dh0zeblvt',
                systemId: 'fdbf202a-3e00-407d-b01c-c9c27e5b4e05',
                systemName: 'g5losy87zy1tsy4kdiie',
                executionId: '52d71da2-0618-42cd-8910-58e4e75bf243',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 20:17:39',
                executionMonitoringStartAt: '2020-07-29 11:09:11',
                executionMonitoringEndAt: 'XXXXXXXX',
                error: 3955913306,
                inactive: 2165607608,
                successful: 4993571062,
                stopped: 2331608906,
                unknown: 7678659583,
                unregistered: 6665452243,
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
                id: '93875555-6cec-42d5-81d2-e1df6f932027',
                tenantId: '44be8393-d0ce-4ee2-af89-8942b0df21f0',
                tenantCode: 'etrnwi5hnstsl0newt6umb2e4azjw3j2uofh877kehzs8w6epx',
                systemId: 'fdbf202a-3e00-407d-b01c-c9c27e5b4e05',
                systemName: 'fei6qw2u7eoyg6w2pdcd',
                executionId: '52d71da2-0618-42cd-8910-58e4e75bf243',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 23:40:27',
                executionMonitoringStartAt: '2020-07-29 11:10:43',
                executionMonitoringEndAt: '2020-07-29 04:22:38',
                error: 1151294064,
                inactive: 9753511060,
                successful: 6428073718,
                stopped: 2393358520,
                unknown: 9170433880,
                unregistered: 7230467374,
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
                        value   : '93875555-6cec-42d5-81d2-e1df6f932027'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '93875555-6cec-42d5-81d2-e1df6f932027'));
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
            .get('/bplus-it-sappi/channel-overview/93875555-6cec-42d5-81d2-e1df6f932027')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '93875555-6cec-42d5-81d2-e1df6f932027'));
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
                
                id: 'cb1fb8bd-fee1-44e0-8e8c-5bc07d38818b',
                tenantId: '6b34c508-9e83-4415-97f2-51d961259377',
                tenantCode: 'mdyoa0gfea19vklj1uldnryjlercbhpm7u6jn77mp56vs23nb3',
                systemId: '7182ebed-0bca-4944-9745-7d2928e23b0b',
                systemName: 'qqbho5t4qk8399x4u3mk',
                executionId: 'd071acf2-4d19-48fb-8733-d530eee0ec16',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 12:43:33',
                executionMonitoringStartAt: '2020-07-28 18:55:11',
                executionMonitoringEndAt: '2020-07-28 18:07:12',
                error: 5704737079,
                inactive: 4215896234,
                successful: 2753704358,
                stopped: 4538467824,
                unknown: 5067572280,
                unregistered: 8635038644,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/channel-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: '93875555-6cec-42d5-81d2-e1df6f932027',
                tenantId: '44be8393-d0ce-4ee2-af89-8942b0df21f0',
                tenantCode: 'rn2t96gghwykwhyallynrt0zk58y0qzza8lhexb2jubgy2f55s',
                systemId: 'fdbf202a-3e00-407d-b01c-c9c27e5b4e05',
                systemName: 'r6wmqkoqnvgkopu99th7',
                executionId: '52d71da2-0618-42cd-8910-58e4e75bf243',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 01:13:23',
                executionMonitoringStartAt: '2020-07-29 13:30:06',
                executionMonitoringEndAt: '2020-07-28 23:42:06',
                error: 6184447319,
                inactive: 3621310392,
                successful: 5183016199,
                stopped: 4273772767,
                unknown: 3116044144,
                unregistered: 4216330415,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '93875555-6cec-42d5-81d2-e1df6f932027'));
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
            .delete('/bplus-it-sappi/channel-overview/93875555-6cec-42d5-81d2-e1df6f932027')
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
                        id: '77e72cab-97fe-4191-91a8-de9b20157609',
                        tenantId: '44be8393-d0ce-4ee2-af89-8942b0df21f0',
                        tenantCode: 'bliz521cpkzhaksq9toh4zdngf1keyvisglnsi6a6jng3k3w6w',
                        systemId: 'fdbf202a-3e00-407d-b01c-c9c27e5b4e05',
                        systemName: '32xjd0f1xbyb7rrucnto',
                        executionId: '52d71da2-0618-42cd-8910-58e4e75bf243',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-28 19:50:39',
                        executionMonitoringStartAt: '2020-07-28 18:07:50',
                        executionMonitoringEndAt: '2020-07-29 13:26:29',
                        error: 5296279817,
                        inactive: 5824669506,
                        successful: 6080081760,
                        stopped: 9445386673,
                        unknown: 8323690917,
                        unregistered: 8968646388,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannelOverview).toHaveProperty('id', '77e72cab-97fe-4191-91a8-de9b20157609');
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
                            value   : '93875555-6cec-42d5-81d2-e1df6f932027'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelOverview.id).toStrictEqual('93875555-6cec-42d5-81d2-e1df6f932027');
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
                    id: '93875555-6cec-42d5-81d2-e1df6f932027'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelOverviewById.id).toStrictEqual('93875555-6cec-42d5-81d2-e1df6f932027');
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
                        
                        id: 'e5dc0ae7-8e68-4501-b133-270654038cdf',
                        tenantId: '29246d2a-b392-4e58-b2f7-22ff77ca0cb4',
                        tenantCode: '1t7jdz654orddwyz50d93golsfi74tiykaoo6v0madpcr8ezig',
                        systemId: 'aebed055-57d9-4176-83a8-f8844d0a8d46',
                        systemName: 's3ks8m2aeyizzi86ann2',
                        executionId: 'e4e7d601-463d-44c6-8b73-5c6aace6e31e',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-29 01:09:21',
                        executionMonitoringStartAt: '2020-07-29 12:30:06',
                        executionMonitoringEndAt: '2020-07-29 02:02:58',
                        error: 6512382619,
                        inactive: 6437395140,
                        successful: 6727601621,
                        stopped: 9775151230,
                        unknown: 9625654473,
                        unregistered: 5141228229,
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
                        
                        id: '93875555-6cec-42d5-81d2-e1df6f932027',
                        tenantId: '44be8393-d0ce-4ee2-af89-8942b0df21f0',
                        tenantCode: 'rr7iqavlq4lgter2uc9t7k4s8n23x4hsq4pjgzprkm9erxlvus',
                        systemId: 'fdbf202a-3e00-407d-b01c-c9c27e5b4e05',
                        systemName: 'tby1jx2575q8qb89mwd9',
                        executionId: '52d71da2-0618-42cd-8910-58e4e75bf243',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-28 22:06:45',
                        executionMonitoringStartAt: '2020-07-29 09:38:23',
                        executionMonitoringEndAt: '2020-07-28 20:31:14',
                        error: 5654510335,
                        inactive: 9452157583,
                        successful: 1205156207,
                        stopped: 4984033664,
                        unknown: 4856882558,
                        unregistered: 1445597630,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannelOverview.id).toStrictEqual('93875555-6cec-42d5-81d2-e1df6f932027');
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
                    id: '93875555-6cec-42d5-81d2-e1df6f932027'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelOverviewById.id).toStrictEqual('93875555-6cec-42d5-81d2-e1df6f932027');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});