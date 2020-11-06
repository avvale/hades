import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IExecutionRepository } from '@hades/cci/execution/domain/execution.repository';
import { MockExecutionRepository } from '@hades/cci/execution/infrastructure/mock/mock-execution.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { CciModule } from './../../../src/apps/cci/cci.module';
import * as request from 'supertest';
import * as _ from 'lodash';
import { IamModule } from './../../../src/apps/iam/iam.module';

const importForeignModules = [
    IamModule
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
            .overrideProvider(IExecutionRepository)
            .useClass(MockExecutionRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockExecutionRepository>module.get<IExecutionRepository>(IExecutionRepository);

        await app.init();
    });

    test(`/REST:POST cci/execution - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: 'e030202d-9031-40c4-8704-5c0f288dbea7',
                tenantCode: 's9xh5edrxml0zytqccg19mof2kh870d85u6hz9a6x3h2m3hb9b',
                systemId: '7cee2245-fefd-4973-a6ec-b8b1f4f740e8',
                systemName: 'vv8svgqxxxmfqm7jwtdk',
                version: 'm0no9yidim0kcmc6bkxd',
                type: 'SUMMARY',
                executedAt: '2020-11-06 02:33:49',
                monitoringStartAt: '2020-11-05 14:53:01',
                monitoringEndAt: '2020-11-05 19:34:56',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: 'e030202d-9031-40c4-8704-5c0f288dbea7',
                tenantCode: '5f8mlq59y6w1hrqto42xrgucc5emms3q5u23hypnuocp610qz1',
                systemId: '7cee2245-fefd-4973-a6ec-b8b1f4f740e8',
                systemName: '7qd6zytr7g2ngi01k3h5',
                version: 'fgv6ndo7fwb3h6l7o2ct',
                type: 'DETAIL',
                executedAt: '2020-11-05 12:55:43',
                monitoringStartAt: '2020-11-06 00:40:47',
                monitoringEndAt: '2020-11-06 04:57:03',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: '645eb39f-4f69-4f6c-a209-afb545aa6a57',
                tenantId: null,
                tenantCode: 'md3frxa7od6m6o11q0ancjkl4ejrwp3u3isslokfwqpo13zhxb',
                systemId: '7cee2245-fefd-4973-a6ec-b8b1f4f740e8',
                systemName: '2og94i0xhvfiqrzp6tia',
                version: 'eep7lwt2b2zw7w1j0vyg',
                type: 'SUMMARY',
                executedAt: '2020-11-05 18:48:27',
                monitoringStartAt: '2020-11-05 21:47:37',
                monitoringEndAt: '2020-11-05 20:13:22',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: '645eb39f-4f69-4f6c-a209-afb545aa6a57',
                
                tenantCode: '7tnkhjdj6sufmmeus4xuailtge4yq5dyvl3jb0rdw0atfc9k0w',
                systemId: '7cee2245-fefd-4973-a6ec-b8b1f4f740e8',
                systemName: '7dpgcj962fsk1uydavsf',
                version: '07ugqegtk083je70kfdh',
                type: 'SUMMARY',
                executedAt: '2020-11-05 21:45:10',
                monitoringStartAt: '2020-11-05 19:53:37',
                monitoringEndAt: '2020-11-05 14:13:28',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: '645eb39f-4f69-4f6c-a209-afb545aa6a57',
                tenantId: 'e030202d-9031-40c4-8704-5c0f288dbea7',
                tenantCode: null,
                systemId: '7cee2245-fefd-4973-a6ec-b8b1f4f740e8',
                systemName: 'o1i573po46ijgndma21l',
                version: 'k91h72r35d3gcjtyqjy6',
                type: 'SUMMARY',
                executedAt: '2020-11-06 03:12:15',
                monitoringStartAt: '2020-11-05 17:31:48',
                monitoringEndAt: '2020-11-06 08:33:58',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: '645eb39f-4f69-4f6c-a209-afb545aa6a57',
                tenantId: 'e030202d-9031-40c4-8704-5c0f288dbea7',
                
                systemId: '7cee2245-fefd-4973-a6ec-b8b1f4f740e8',
                systemName: 'pvem7x165jtd5a15uhia',
                version: 'l011youzzolzjxeqqjx8',
                type: 'SUMMARY',
                executedAt: '2020-11-05 18:18:53',
                monitoringStartAt: '2020-11-05 15:00:49',
                monitoringEndAt: '2020-11-06 11:28:56',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: '645eb39f-4f69-4f6c-a209-afb545aa6a57',
                tenantId: 'e030202d-9031-40c4-8704-5c0f288dbea7',
                tenantCode: '5pmeu5vgnst5bja45kmv4ihlem3drjebtdkrc97l91v89xxq7w',
                systemId: null,
                systemName: 'cqkpor4jv9p27vmzjtwc',
                version: 'yzvvind8lrrofzcnprid',
                type: 'DETAIL',
                executedAt: '2020-11-05 12:33:53',
                monitoringStartAt: '2020-11-05 18:47:06',
                monitoringEndAt: '2020-11-05 16:30:00',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: '645eb39f-4f69-4f6c-a209-afb545aa6a57',
                tenantId: 'e030202d-9031-40c4-8704-5c0f288dbea7',
                tenantCode: 'aff4womr8uhtvo2yw5j17fp6b4zzifj6dj8wvgyh1dwveadtmp',
                
                systemName: '3qyhl5wmbu3jbr3dwv6z',
                version: '84ic4kdr6x5xt8sn7ex3',
                type: 'DETAIL',
                executedAt: '2020-11-05 22:36:35',
                monitoringStartAt: '2020-11-06 07:36:07',
                monitoringEndAt: '2020-11-06 00:42:23',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: '645eb39f-4f69-4f6c-a209-afb545aa6a57',
                tenantId: 'e030202d-9031-40c4-8704-5c0f288dbea7',
                tenantCode: '6xqe3ldymaaqg1aihl2cn4pftfjo288wv1s4v0ym3j3lsrz87n',
                systemId: '7cee2245-fefd-4973-a6ec-b8b1f4f740e8',
                systemName: null,
                version: 'biydb22q6nbgfb4abrrs',
                type: 'DETAIL',
                executedAt: '2020-11-05 16:13:22',
                monitoringStartAt: '2020-11-06 11:25:44',
                monitoringEndAt: '2020-11-05 12:23:50',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: '645eb39f-4f69-4f6c-a209-afb545aa6a57',
                tenantId: 'e030202d-9031-40c4-8704-5c0f288dbea7',
                tenantCode: 'wm2kamzz7nomd56v246npc0r6wdkycfd8giqirxfve3psrb9ar',
                systemId: '7cee2245-fefd-4973-a6ec-b8b1f4f740e8',
                
                version: 'q6okkkt0h75tv5x45ita',
                type: 'DETAIL',
                executedAt: '2020-11-06 02:02:28',
                monitoringStartAt: '2020-11-05 22:35:15',
                monitoringEndAt: '2020-11-06 10:28:13',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionVersion property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: '645eb39f-4f69-4f6c-a209-afb545aa6a57',
                tenantId: 'e030202d-9031-40c4-8704-5c0f288dbea7',
                tenantCode: 'zwgtx5vi1avdtt45096yg0tpu5outzzgozdqx9p89voqjxptbg',
                systemId: '7cee2245-fefd-4973-a6ec-b8b1f4f740e8',
                systemName: 'w1ss4ck6pu9mnaky40f7',
                version: null,
                type: 'SUMMARY',
                executedAt: '2020-11-06 02:13:00',
                monitoringStartAt: '2020-11-05 15:56:43',
                monitoringEndAt: '2020-11-06 06:05:21',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionVersion must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionVersion property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: '645eb39f-4f69-4f6c-a209-afb545aa6a57',
                tenantId: 'e030202d-9031-40c4-8704-5c0f288dbea7',
                tenantCode: 'snmprfltds878pklzzeudc0h4xj36q56i4kyd338m733byqeso',
                systemId: '7cee2245-fefd-4973-a6ec-b8b1f4f740e8',
                systemName: 'wpjxay6kt9ob73h1xezm',
                
                type: 'SUMMARY',
                executedAt: '2020-11-05 14:08:13',
                monitoringStartAt: '2020-11-06 11:09:01',
                monitoringEndAt: '2020-11-06 07:22:56',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionVersion must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: '645eb39f-4f69-4f6c-a209-afb545aa6a57',
                tenantId: 'e030202d-9031-40c4-8704-5c0f288dbea7',
                tenantCode: 'hzie70k8vre1n4crc41fhyx6og3cwo9jlsqqp6m482f6kr5zt1',
                systemId: '7cee2245-fefd-4973-a6ec-b8b1f4f740e8',
                systemName: '57sbow8hm0gdkaxbikz9',
                version: '8ibfvjczl9joqjva3rkq',
                type: null,
                executedAt: '2020-11-05 23:22:01',
                monitoringStartAt: '2020-11-06 10:02:59',
                monitoringEndAt: '2020-11-05 15:53:53',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionType must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: '645eb39f-4f69-4f6c-a209-afb545aa6a57',
                tenantId: 'e030202d-9031-40c4-8704-5c0f288dbea7',
                tenantCode: '2ti1fczvl411z29t4w9pf6ski1942h6mehsexb6pnwgnz8dnvc',
                systemId: '7cee2245-fefd-4973-a6ec-b8b1f4f740e8',
                systemName: 'cj16jq5ws3szhjpibcou',
                version: '10cwdl0fk0gimsu46z6e',
                
                executedAt: '2020-11-05 20:23:36',
                monitoringStartAt: '2020-11-06 05:09:56',
                monitoringEndAt: '2020-11-06 11:17:11',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionType must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: '645eb39f-4f69-4f6c-a209-afb545aa6a57',
                tenantId: 'e030202d-9031-40c4-8704-5c0f288dbea7',
                tenantCode: 't3ed6pnfqezabhd5n8t8jro8niaepzbyimz7m3zngdhjx3phki',
                systemId: '7cee2245-fefd-4973-a6ec-b8b1f4f740e8',
                systemName: 'w18rhe1btfezy0wtyzs6',
                version: 'zepubs7nghz4mlcgeibr',
                type: 'SUMMARY',
                executedAt: null,
                monitoringStartAt: '2020-11-05 22:10:00',
                monitoringEndAt: '2020-11-06 07:04:25',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionExecutedAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: '645eb39f-4f69-4f6c-a209-afb545aa6a57',
                tenantId: 'e030202d-9031-40c4-8704-5c0f288dbea7',
                tenantCode: 'wbm1z712ythbzec2fcwia61jmlgzjdjwvhqwfckf0rr48rtrhd',
                systemId: '7cee2245-fefd-4973-a6ec-b8b1f4f740e8',
                systemName: '7x2b4zkfeim9gjeopaax',
                version: 'exfgtihjjt2dwqdd3st9',
                type: 'DETAIL',
                
                monitoringStartAt: '2020-11-06 09:16:09',
                monitoringEndAt: '2020-11-05 17:45:40',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: '645eb39f-4f69-4f6c-a209-afb545aa6a57',
                tenantId: 'e030202d-9031-40c4-8704-5c0f288dbea7',
                tenantCode: 'upu1l4gfyl82h4p3zwax4b3bk4lvw4hged6gn8jbavisjvuco8',
                systemId: '7cee2245-fefd-4973-a6ec-b8b1f4f740e8',
                systemName: '1r4f13k1n9f5r3hay2mv',
                version: 't2ladl3yu1j51w2ce5ji',
                type: 'SUMMARY',
                executedAt: '2020-11-05 17:35:28',
                monitoringStartAt: null,
                monitoringEndAt: '2020-11-05 17:10:08',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: '645eb39f-4f69-4f6c-a209-afb545aa6a57',
                tenantId: 'e030202d-9031-40c4-8704-5c0f288dbea7',
                tenantCode: 'xiw982dyof6lbf9wwi1xn41omp4e6wnq919b18mp4w7goaoyo2',
                systemId: '7cee2245-fefd-4973-a6ec-b8b1f4f740e8',
                systemName: '1g34gyvbhwwr0jbnffvp',
                version: 'hroqgnnq461mu30hmi0s',
                type: 'SUMMARY',
                executedAt: '2020-11-05 23:02:55',
                
                monitoringEndAt: '2020-11-05 15:00:48',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: '645eb39f-4f69-4f6c-a209-afb545aa6a57',
                tenantId: 'e030202d-9031-40c4-8704-5c0f288dbea7',
                tenantCode: 'ierykmzazmeoktzdo6n2uf71az7mw9hiqzuv554aj1trfaimhy',
                systemId: '7cee2245-fefd-4973-a6ec-b8b1f4f740e8',
                systemName: 'nlmhnjrd2udjd90vsh5g',
                version: '6ozn7r3mznv4xd0dwztb',
                type: 'SUMMARY',
                executedAt: '2020-11-06 02:16:14',
                monitoringStartAt: '2020-11-06 01:43:38',
                monitoringEndAt: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: '645eb39f-4f69-4f6c-a209-afb545aa6a57',
                tenantId: 'e030202d-9031-40c4-8704-5c0f288dbea7',
                tenantCode: '1v5q3juqptqn3bnsn2c4iyl3lpq10t6rhqlfv4kgq8wx3nxplh',
                systemId: '7cee2245-fefd-4973-a6ec-b8b1f4f740e8',
                systemName: 'hvip4wvqk61bz3b6jzhh',
                version: 'i2di9oslfuz08kflfaaj',
                type: 'SUMMARY',
                executedAt: '2020-11-06 11:56:25',
                monitoringStartAt: '2020-11-06 12:05:29',
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'qqo1zbvbyl7samhs1b0dnive2463j3mug6g6g',
                tenantId: 'e030202d-9031-40c4-8704-5c0f288dbea7',
                tenantCode: 'hzaziseppzput6jmuzwge84qy0o25vpnuak6nxr294syxl4ul7',
                systemId: '7cee2245-fefd-4973-a6ec-b8b1f4f740e8',
                systemName: 'nng0rrqkl0le9pu5oigc',
                version: 'q62jfx4mfwxxcfgovysx',
                type: 'SUMMARY',
                executedAt: '2020-11-06 08:15:11',
                monitoringStartAt: '2020-11-06 05:04:44',
                monitoringEndAt: '2020-11-06 08:01:17',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: '645eb39f-4f69-4f6c-a209-afb545aa6a57',
                tenantId: '6goung70jhcpddxq4qjd8ipmgd9yhabs4c5q2',
                tenantCode: 'nmb1o2n22cvi7nwa7b09f8xi9hmy4f9diablhvdr5zm1p0id08',
                systemId: '7cee2245-fefd-4973-a6ec-b8b1f4f740e8',
                systemName: '072cws41bdbi07ixuqsw',
                version: 'mshc7ci4tdaeaxlb3c8i',
                type: 'SUMMARY',
                executedAt: '2020-11-05 15:07:51',
                monitoringStartAt: '2020-11-06 01:56:44',
                monitoringEndAt: '2020-11-06 10:55:28',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: '645eb39f-4f69-4f6c-a209-afb545aa6a57',
                tenantId: 'e030202d-9031-40c4-8704-5c0f288dbea7',
                tenantCode: 'ric92pf3jucrbi0ei1kclg5rptwbppxyxl82c5gw8dpgnvxcfk',
                systemId: '9kyqe5xj8kkgj7vcmnp7lyvudu94drk28ctl9',
                systemName: 'ueo0egenicp7r5ovos8f',
                version: '1dei3h178nm5wbc69ugy',
                type: 'DETAIL',
                executedAt: '2020-11-06 04:42:07',
                monitoringStartAt: '2020-11-05 16:46:30',
                monitoringEndAt: '2020-11-05 21:53:29',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionSystemId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: '645eb39f-4f69-4f6c-a209-afb545aa6a57',
                tenantId: 'e030202d-9031-40c4-8704-5c0f288dbea7',
                tenantCode: 'kda4v1b16dwuy02pnsve56vbbgzeqzj5k5ccchde0le5cq77b6b',
                systemId: '7cee2245-fefd-4973-a6ec-b8b1f4f740e8',
                systemName: 'g8kn329okzuyfra011mk',
                version: 'zp3guy2xvel7oe4vbrfl',
                type: 'SUMMARY',
                executedAt: '2020-11-05 12:11:15',
                monitoringStartAt: '2020-11-06 04:02:46',
                monitoringEndAt: '2020-11-06 09:11:36',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: '645eb39f-4f69-4f6c-a209-afb545aa6a57',
                tenantId: 'e030202d-9031-40c4-8704-5c0f288dbea7',
                tenantCode: 't3cb5v75lvk1zq6p9dk2a0r2c6d5xvkdiv11431wtb1qqv87n7',
                systemId: '7cee2245-fefd-4973-a6ec-b8b1f4f740e8',
                systemName: 'ign5oib7o09jxrtnxj8ep',
                version: 'th7vs3oiakask1guckih',
                type: 'DETAIL',
                executedAt: '2020-11-06 01:49:02',
                monitoringStartAt: '2020-11-05 23:14:55',
                monitoringEndAt: '2020-11-05 19:14:13',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionVersion is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: '645eb39f-4f69-4f6c-a209-afb545aa6a57',
                tenantId: 'e030202d-9031-40c4-8704-5c0f288dbea7',
                tenantCode: 'ljswlqof936dulvj3fulsje6h6br2et6vbqpfntcw7qsxnjdse',
                systemId: '7cee2245-fefd-4973-a6ec-b8b1f4f740e8',
                systemName: 'u0d1m3rv977tqorjh49m',
                version: 'wn5yxayuo2iljsifue2ax',
                type: 'DETAIL',
                executedAt: '2020-11-05 13:58:51',
                monitoringStartAt: '2020-11-05 23:13:11',
                monitoringEndAt: '2020-11-06 00:12:13',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionVersion is too large, has a maximum length of 20');
            });
    });
    

    

    

    

    

    
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: '645eb39f-4f69-4f6c-a209-afb545aa6a57',
                tenantId: 'e030202d-9031-40c4-8704-5c0f288dbea7',
                tenantCode: '80jxym8aiapf9340foziz49p2no7l2vspk5qy2uzut8yeihjm0',
                systemId: '7cee2245-fefd-4973-a6ec-b8b1f4f740e8',
                systemName: 'p6ju97h53eanopcj2gaq',
                version: 'bgffwthj5gcpf2bk9vtm',
                type: 'XXXX',
                executedAt: '2020-11-06 01:44:25',
                monitoringStartAt: '2020-11-06 00:51:57',
                monitoringEndAt: '2020-11-06 06:34:35',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    

    
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: '645eb39f-4f69-4f6c-a209-afb545aa6a57',
                tenantId: 'e030202d-9031-40c4-8704-5c0f288dbea7',
                tenantCode: 'znez0kxgheek10h37lwsme0eb3oyp28k7075oy1hkl2gawmk4z',
                systemId: '7cee2245-fefd-4973-a6ec-b8b1f4f740e8',
                systemName: '6q33ifxh40g1lkfhkidy',
                version: 'r54986e2do73vp5tu4m7',
                type: 'DETAIL',
                executedAt: 'XXXXXXXX',
                monitoringStartAt: '2020-11-05 16:25:32',
                monitoringEndAt: '2020-11-06 00:34:12',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionExecutedAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionMonitoringStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: '645eb39f-4f69-4f6c-a209-afb545aa6a57',
                tenantId: 'e030202d-9031-40c4-8704-5c0f288dbea7',
                tenantCode: '2m08jk62fzatgi2fhr3pxx767upzswlosgghy6vbzbbcql8pbv',
                systemId: '7cee2245-fefd-4973-a6ec-b8b1f4f740e8',
                systemName: '86pgh99gi32zal60zvga',
                version: '7bmdmb8maoflyvp8eztm',
                type: 'DETAIL',
                executedAt: '2020-11-06 09:43:34',
                monitoringStartAt: 'XXXXXXXX',
                monitoringEndAt: '2020-11-06 11:52:21',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionMonitoringEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: '645eb39f-4f69-4f6c-a209-afb545aa6a57',
                tenantId: 'e030202d-9031-40c4-8704-5c0f288dbea7',
                tenantCode: '0c8q4oxnuudnxip7g3h2ui50mn0d4husf3d31o6mtrr3p4qohx',
                systemId: '7cee2245-fefd-4973-a6ec-b8b1f4f740e8',
                systemName: 'gqe2t6uwsjk7u069zisc',
                version: 'rlbvww9ps03m7z8l0g5w',
                type: 'SUMMARY',
                executedAt: '2020-11-05 12:36:29',
                monitoringStartAt: '2020-11-05 16:57:43',
                monitoringEndAt: 'XXXXXXXX',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST cci/execution`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: '645eb39f-4f69-4f6c-a209-afb545aa6a57',
                tenantId: 'e030202d-9031-40c4-8704-5c0f288dbea7',
                tenantCode: 'yqergdiptfapv1n9xpmexyvnvdrtc7i1w8ftvp8eycxid7lq8o',
                systemId: '7cee2245-fefd-4973-a6ec-b8b1f4f740e8',
                systemName: '3uyyuuhc5poc1i4l5fjy',
                version: '34zvejoqrqtihh3vpdjr',
                type: 'SUMMARY',
                executedAt: '2020-11-05 22:17:22',
                monitoringStartAt: '2020-11-05 15:34:23',
                monitoringEndAt: '2020-11-06 11:37:15',
            })
            .expect(201);
    });

    test(`/REST:GET cci/executions/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/executions/paginate')
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

    test(`/REST:GET cci/execution - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '041f133b-b31f-4868-9d5e-356a076041ee'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET cci/execution`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '645eb39f-4f69-4f6c-a209-afb545aa6a57'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '645eb39f-4f69-4f6c-a209-afb545aa6a57'));
    });

    test(`/REST:GET cci/execution/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/execution/6cc68cb7-5cca-46d2-8745-5bb5aa6dd1a2')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/execution/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/execution/645eb39f-4f69-4f6c-a209-afb545aa6a57')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '645eb39f-4f69-4f6c-a209-afb545aa6a57'));
    });

    test(`/REST:GET cci/executions`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/executions')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT cci/execution - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                
                id: '7df50c57-d959-4b32-84b6-77f38f7e6c6a',
                tenantId: 'f37a69f9-8c34-4fc2-9754-08d32b990d35',
                tenantCode: 'qz1sojp27s5oj69841pr8d6t10i0s6txlteneh5775eylhwpyh',
                systemId: 'a7614dbc-d070-49ae-a5ec-c1e32af54b72',
                systemName: 'f3ckqehh9w4ssswus5q3',
                version: '3rl9g71w3sbdo1mzrem5',
                type: 'SUMMARY',
                executedAt: '2020-11-05 20:40:54',
                monitoringStartAt: '2020-11-06 02:17:48',
                monitoringEndAt: '2020-11-05 23:33:01',
            })
            .expect(404);
    });

    test(`/REST:PUT cci/execution`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                
                id: '645eb39f-4f69-4f6c-a209-afb545aa6a57',
                tenantId: 'e030202d-9031-40c4-8704-5c0f288dbea7',
                tenantCode: 'ev5zajhfh7c40zo1mfdxl9knim3ssjhsq7k6c5w2zayl45zd73',
                systemId: '7cee2245-fefd-4973-a6ec-b8b1f4f740e8',
                systemName: 'st07x2dgb70br7ylqdea',
                version: '20lho5g54dkdf0nrv15q',
                type: 'SUMMARY',
                executedAt: '2020-11-05 18:49:48',
                monitoringStartAt: '2020-11-05 15:03:35',
                monitoringEndAt: '2020-11-06 00:53:59',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '645eb39f-4f69-4f6c-a209-afb545aa6a57'));
    });

    test(`/REST:DELETE cci/execution/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/execution/7c95c000-4dcd-4ad2-9975-673cac2ccbf5')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/execution/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/execution/645eb39f-4f69-4f6c-a209-afb545aa6a57')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL cciCreateExecution - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateExecutionInput!)
                    {
                        cciCreateExecution (payload:$payload)
                        {   
                            id
                            tenantCode
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

    test(`/GraphQL cciCreateExecution`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateExecutionInput!)
                    {
                        cciCreateExecution (payload:$payload)
                        {   
                            id
                            tenantCode
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
                        id: '960e2eb8-112b-44a1-a675-5ef02b6df7ce',
                        tenantId: 'e030202d-9031-40c4-8704-5c0f288dbea7',
                        tenantCode: 'xhc116acrl87l8afliguaj44s6ozrw2kb28h5puwr0ujig22ph',
                        systemId: '7cee2245-fefd-4973-a6ec-b8b1f4f740e8',
                        systemName: 'l1wjzj9wvwxdmdysen1z',
                        version: 'y5m9c4d3wq2exm84jdjf',
                        type: 'DETAIL',
                        executedAt: '2020-11-06 10:43:46',
                        monitoringStartAt: '2020-11-06 08:58:57',
                        monitoringEndAt: '2020-11-06 05:53:41',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateExecution).toHaveProperty('id', '960e2eb8-112b-44a1-a675-5ef02b6df7ce');
            });
    });

    test(`/GraphQL cciPaginateExecutions`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        cciPaginateExecutions (query:$query constraint:$constraint)
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
                expect(res.body.data.cciPaginateExecutions.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateExecutions.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateExecutions.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL cciFindExecution - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindExecution (query:$query)
                        {   
                            id
                            tenantCode
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
                variables: 
                {
                    query: 
                    {
                        where: 
                        {
                            id: 'dca27de4-aa0b-47aa-88c5-f68e85909ac1'
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

    test(`/GraphQL cciFindExecution`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindExecution (query:$query)
                        {   
                            id
                            tenantCode
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
                variables: 
                {
                    query: 
                    {
                        where: 
                        {
                            id: '645eb39f-4f69-4f6c-a209-afb545aa6a57'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindExecution.id).toStrictEqual('645eb39f-4f69-4f6c-a209-afb545aa6a57');
            });
    });

    test(`/GraphQL cciFindExecutionById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindExecutionById (id:$id)
                        {   
                            id
                            tenantCode
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
                    id: '097578cb-9c7a-49c6-af83-18ec0d873eb3'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciFindExecutionById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindExecutionById (id:$id)
                        {   
                            id
                            tenantCode
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
                    id: '645eb39f-4f69-4f6c-a209-afb545aa6a57'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindExecutionById.id).toStrictEqual('645eb39f-4f69-4f6c-a209-afb545aa6a57');
            });
    });

    test(`/GraphQL cciGetExecutions`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciGetExecutions (query:$query)
                        {   
                            id
                            tenantCode
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
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.cciGetExecutions.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL cciUpdateExecution - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateExecutionInput!)
                    {
                        cciUpdateExecution (payload:$payload)
                        {   
                            id
                            tenantCode
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
                        
                        id: '69312926-e0ed-4ae0-b012-9035ae1b14e0',
                        tenantId: '63c2a330-a55b-4efc-8380-81eac1a601e7',
                        tenantCode: 'h8trddkduhwb0r75a6m9r6nr0k79oiohxaqqa2x8ri5o8zymfz',
                        systemId: 'addb3497-7a98-4c9e-a13a-d4ee4dcc0af8',
                        systemName: '0o51oi4sw945o9q0vw0y',
                        version: '4845wfc27lqy1empd7qq',
                        type: 'DETAIL',
                        executedAt: '2020-11-05 16:09:43',
                        monitoringStartAt: '2020-11-06 00:12:27',
                        monitoringEndAt: '2020-11-05 21:42:35',
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

    test(`/GraphQL cciUpdateExecution`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateExecutionInput!)
                    {
                        cciUpdateExecution (payload:$payload)
                        {   
                            id
                            tenantCode
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
                        
                        id: '645eb39f-4f69-4f6c-a209-afb545aa6a57',
                        tenantId: 'e030202d-9031-40c4-8704-5c0f288dbea7',
                        tenantCode: 'efsa64uaxl4xpnw9zmuaxu8jee7uhp7qugaknwirk2i9bo2e82',
                        systemId: '7cee2245-fefd-4973-a6ec-b8b1f4f740e8',
                        systemName: 'xdhu7ggfs1g3ad4tnsqy',
                        version: '4zwhkxd6ovgct8lou5dd',
                        type: 'DETAIL',
                        executedAt: '2020-11-06 10:34:53',
                        monitoringStartAt: '2020-11-05 16:54:15',
                        monitoringEndAt: '2020-11-06 11:52:04',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateExecution.id).toStrictEqual('645eb39f-4f69-4f6c-a209-afb545aa6a57');
            });
    });

    test(`/GraphQL cciDeleteExecutionById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteExecutionById (id:$id)
                        {   
                            id
                            tenantCode
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
                    id: 'e48da8c6-2aa6-4903-810b-38e43f59edd6'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciDeleteExecutionById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteExecutionById (id:$id)
                        {   
                            id
                            tenantCode
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
                    id: '645eb39f-4f69-4f6c-a209-afb545aa6a57'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteExecutionById.id).toStrictEqual('645eb39f-4f69-4f6c-a209-afb545aa6a57');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});