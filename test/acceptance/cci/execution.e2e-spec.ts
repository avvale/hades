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
                tenantId: '485ee692-26e5-4063-a969-f2dc166be622',
                tenantCode: '2hykh5pybckc8weceg0ty79mv7zh26neuirrtcfebwzn32flat',
                systemId: 'c257947e-5c53-49d5-8ce8-a1db0f9a8fc6',
                systemName: 'nz1hyf23ieoab69q2i5u',
                version: 'zc53lhoo0x30vga8bmvl',
                type: 'SUMMARY',
                executedAt: '2020-11-03 22:10:50',
                monitoringStartAt: '2020-11-03 23:52:05',
                monitoringEndAt: '2020-11-03 20:20:17',
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
                
                tenantId: '485ee692-26e5-4063-a969-f2dc166be622',
                tenantCode: 'fsg5ef1alz6iukbuvom6ey9m3k76wdvwshyl6y0wax7ebsxrr5',
                systemId: 'c257947e-5c53-49d5-8ce8-a1db0f9a8fc6',
                systemName: 'pd27yxnah2xj2uo0ygsq',
                version: 't95o2eeu6ajsqt2c1mlt',
                type: 'SUMMARY',
                executedAt: '2020-11-03 20:19:10',
                monitoringStartAt: '2020-11-04 17:12:40',
                monitoringEndAt: '2020-11-04 04:10:01',
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
                id: '69683a91-ce81-4ff2-a55d-16c9842ce971',
                tenantId: null,
                tenantCode: '8s0zky3r93w3i2zfywpiwwcotjo7ue4y0a28fey9hu6tp8zcdw',
                systemId: 'c257947e-5c53-49d5-8ce8-a1db0f9a8fc6',
                systemName: 'cjqditgscoor3vkc2c2j',
                version: '3llbg5jvwvdyru7stdpd',
                type: 'SUMMARY',
                executedAt: '2020-11-04 01:33:01',
                monitoringStartAt: '2020-11-04 15:48:15',
                monitoringEndAt: '2020-11-04 18:28:45',
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
                id: '69683a91-ce81-4ff2-a55d-16c9842ce971',
                
                tenantCode: 'qxv8w5ns1rlq0ce4g873k8ny4pv3qjrrbo1qqbngvemyms1fg1',
                systemId: 'c257947e-5c53-49d5-8ce8-a1db0f9a8fc6',
                systemName: 'ssnthfcdvuesrpuh0g7l',
                version: 'q7dcb4gxcu5y41vabmt5',
                type: 'DETAIL',
                executedAt: '2020-11-04 15:37:47',
                monitoringStartAt: '2020-11-04 04:51:37',
                monitoringEndAt: '2020-11-04 11:03:29',
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
                id: '69683a91-ce81-4ff2-a55d-16c9842ce971',
                tenantId: '485ee692-26e5-4063-a969-f2dc166be622',
                tenantCode: null,
                systemId: 'c257947e-5c53-49d5-8ce8-a1db0f9a8fc6',
                systemName: 'j7l6e4471cjlmeez2tga',
                version: 'v0ysutgbq3qhkpyka4x8',
                type: 'SUMMARY',
                executedAt: '2020-11-04 09:58:14',
                monitoringStartAt: '2020-11-04 06:12:27',
                monitoringEndAt: '2020-11-03 22:55:08',
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
                id: '69683a91-ce81-4ff2-a55d-16c9842ce971',
                tenantId: '485ee692-26e5-4063-a969-f2dc166be622',
                
                systemId: 'c257947e-5c53-49d5-8ce8-a1db0f9a8fc6',
                systemName: 'rplzjgz6j75v7zap6owh',
                version: 'chayxam0wnzv9ya1459f',
                type: 'SUMMARY',
                executedAt: '2020-11-03 22:00:33',
                monitoringStartAt: '2020-11-04 00:04:56',
                monitoringEndAt: '2020-11-04 11:51:32',
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
                id: '69683a91-ce81-4ff2-a55d-16c9842ce971',
                tenantId: '485ee692-26e5-4063-a969-f2dc166be622',
                tenantCode: 'u9x5a4o7ftxbtkoqt1j17xjukfaedic6sphumslqdm2wvgaynb',
                systemId: null,
                systemName: 'obxjt6z0f6lpj6c1s4z1',
                version: 'i4kc6eyg2042535l8e1w',
                type: 'SUMMARY',
                executedAt: '2020-11-04 09:15:40',
                monitoringStartAt: '2020-11-04 18:33:50',
                monitoringEndAt: '2020-11-04 13:26:12',
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
                id: '69683a91-ce81-4ff2-a55d-16c9842ce971',
                tenantId: '485ee692-26e5-4063-a969-f2dc166be622',
                tenantCode: 'ft38jwufzm4wrcqfb0svozr6wnqzox7tf7wkav2vamr5zv09st',
                
                systemName: '5u28kisugwgjum196a9q',
                version: '1pld9bhkill9g5v1cjd0',
                type: 'SUMMARY',
                executedAt: '2020-11-03 21:24:14',
                monitoringStartAt: '2020-11-04 06:42:35',
                monitoringEndAt: '2020-11-04 13:55:19',
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
                id: '69683a91-ce81-4ff2-a55d-16c9842ce971',
                tenantId: '485ee692-26e5-4063-a969-f2dc166be622',
                tenantCode: 'm5k57okegux33zyxfjgd3yfcdq2whjhkpo58gzupqvjw6tye4g',
                systemId: 'c257947e-5c53-49d5-8ce8-a1db0f9a8fc6',
                systemName: null,
                version: '8zsmi23bd3idndnty7o9',
                type: 'SUMMARY',
                executedAt: '2020-11-04 09:19:56',
                monitoringStartAt: '2020-11-04 15:30:38',
                monitoringEndAt: '2020-11-03 23:58:57',
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
                id: '69683a91-ce81-4ff2-a55d-16c9842ce971',
                tenantId: '485ee692-26e5-4063-a969-f2dc166be622',
                tenantCode: 'k0d8m8s8sqj0ijqb3f7sv3hwkxaaankr1e44dd8kyuwoxqzqo9',
                systemId: 'c257947e-5c53-49d5-8ce8-a1db0f9a8fc6',
                
                version: '0qv2vj9mtj6g98tlbxwl',
                type: 'SUMMARY',
                executedAt: '2020-11-03 19:30:38',
                monitoringStartAt: '2020-11-03 19:40:46',
                monitoringEndAt: '2020-11-04 17:53:22',
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
                id: '69683a91-ce81-4ff2-a55d-16c9842ce971',
                tenantId: '485ee692-26e5-4063-a969-f2dc166be622',
                tenantCode: 'p0k7m2be7ch7c5pwcic8zjis1lhrn0v1chku7hf8v1t813h0i5',
                systemId: 'c257947e-5c53-49d5-8ce8-a1db0f9a8fc6',
                systemName: 'y4g14791qxod005gdjyd',
                version: null,
                type: 'SUMMARY',
                executedAt: '2020-11-04 10:35:44',
                monitoringStartAt: '2020-11-04 18:26:08',
                monitoringEndAt: '2020-11-04 14:06:31',
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
                id: '69683a91-ce81-4ff2-a55d-16c9842ce971',
                tenantId: '485ee692-26e5-4063-a969-f2dc166be622',
                tenantCode: 'iflt6c5q9qrqy5ft8s1nqjr2lxv2zkr80ev8x72v6cufjnpwkh',
                systemId: 'c257947e-5c53-49d5-8ce8-a1db0f9a8fc6',
                systemName: 'fbzi6gilidp2e9da8v2y',
                
                type: 'SUMMARY',
                executedAt: '2020-11-04 16:13:13',
                monitoringStartAt: '2020-11-04 16:35:59',
                monitoringEndAt: '2020-11-04 03:20:34',
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
                id: '69683a91-ce81-4ff2-a55d-16c9842ce971',
                tenantId: '485ee692-26e5-4063-a969-f2dc166be622',
                tenantCode: 'rrd2bo81s4nmnyakpamxedorwsf0jal2eknh1kkummjx5g7gf9',
                systemId: 'c257947e-5c53-49d5-8ce8-a1db0f9a8fc6',
                systemName: '496aovtnxxzni7g1xasd',
                version: 'w95ij2xck3ib9a383x2d',
                type: null,
                executedAt: '2020-11-04 06:38:47',
                monitoringStartAt: '2020-11-04 15:31:29',
                monitoringEndAt: '2020-11-04 19:13:50',
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
                id: '69683a91-ce81-4ff2-a55d-16c9842ce971',
                tenantId: '485ee692-26e5-4063-a969-f2dc166be622',
                tenantCode: 'gprpy2110o44bahx6h7u2elp4f4wqcp3krzbkhf46ry5wizs3p',
                systemId: 'c257947e-5c53-49d5-8ce8-a1db0f9a8fc6',
                systemName: 'wook0tpuovqio9rfcdfx',
                version: 'oki4w8p7wiuvcc6gmfxq',
                
                executedAt: '2020-11-04 10:23:30',
                monitoringStartAt: '2020-11-04 02:06:33',
                monitoringEndAt: '2020-11-04 03:51:58',
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
                id: '69683a91-ce81-4ff2-a55d-16c9842ce971',
                tenantId: '485ee692-26e5-4063-a969-f2dc166be622',
                tenantCode: 'p09s6v4cgqr2i7z6murwdqp35vkib0mk3sfcpd50oz5ge61gva',
                systemId: 'c257947e-5c53-49d5-8ce8-a1db0f9a8fc6',
                systemName: '6qg19aah0bty9sigl5g5',
                version: 'bbq7gopc5qzzz8nryh4y',
                type: 'DETAIL',
                executedAt: null,
                monitoringStartAt: '2020-11-03 23:31:37',
                monitoringEndAt: '2020-11-04 11:00:20',
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
                id: '69683a91-ce81-4ff2-a55d-16c9842ce971',
                tenantId: '485ee692-26e5-4063-a969-f2dc166be622',
                tenantCode: '783lpczqlxkf9kdsflrvo57auafs3c2276xipvud82xsmaemlp',
                systemId: 'c257947e-5c53-49d5-8ce8-a1db0f9a8fc6',
                systemName: 'zd4b88akqbhorxwxw8w3',
                version: 'znbj4z8h88bpahzq22ha',
                type: 'DETAIL',
                
                monitoringStartAt: '2020-11-04 04:17:42',
                monitoringEndAt: '2020-11-04 02:58:25',
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
                id: '69683a91-ce81-4ff2-a55d-16c9842ce971',
                tenantId: '485ee692-26e5-4063-a969-f2dc166be622',
                tenantCode: 'oyzu3lkrmv00qnsiommukhmx2owpd6jto53zxlql42j40kvuod',
                systemId: 'c257947e-5c53-49d5-8ce8-a1db0f9a8fc6',
                systemName: '6qxxt13l80f5s23qgdca',
                version: 'qkxrh2wbxa3pilgieff1',
                type: 'DETAIL',
                executedAt: '2020-11-03 23:21:35',
                monitoringStartAt: null,
                monitoringEndAt: '2020-11-04 06:04:39',
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
                id: '69683a91-ce81-4ff2-a55d-16c9842ce971',
                tenantId: '485ee692-26e5-4063-a969-f2dc166be622',
                tenantCode: 'iwvig9qt2lsqd5srpw8khfh3tpisr4mlzp2gnl5wet45k8rd6t',
                systemId: 'c257947e-5c53-49d5-8ce8-a1db0f9a8fc6',
                systemName: 'm7vw4qlqt8zcfwq2gl1r',
                version: '427q2kq3ievyozy29ose',
                type: 'SUMMARY',
                executedAt: '2020-11-04 13:25:18',
                
                monitoringEndAt: '2020-11-03 21:00:49',
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
                id: '69683a91-ce81-4ff2-a55d-16c9842ce971',
                tenantId: '485ee692-26e5-4063-a969-f2dc166be622',
                tenantCode: '8ug9mtgdn6iisv93qwhi5gzxj7jtnrbp5i914z8g5ypgeqt4dq',
                systemId: 'c257947e-5c53-49d5-8ce8-a1db0f9a8fc6',
                systemName: 'oe3qoi6mgyrzp7hnspet',
                version: 'e6pao5yq2qvr92qkohsh',
                type: 'DETAIL',
                executedAt: '2020-11-04 13:11:08',
                monitoringStartAt: '2020-11-03 23:16:51',
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
                id: '69683a91-ce81-4ff2-a55d-16c9842ce971',
                tenantId: '485ee692-26e5-4063-a969-f2dc166be622',
                tenantCode: '2g4uew4hrb0z4fwxjm0k8d6uzu4rlwa6f53bzoy7kvus989umm',
                systemId: 'c257947e-5c53-49d5-8ce8-a1db0f9a8fc6',
                systemName: '8pxinh0ejrhtl3bcs1l0',
                version: 'x1bf8mq8luw3s1yju5o9',
                type: 'SUMMARY',
                executedAt: '2020-11-04 13:46:24',
                monitoringStartAt: '2020-11-03 20:20:28',
                
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
                id: 'fct4dfz41dl74387lxacsi6q8lndveqcaxwv5',
                tenantId: '485ee692-26e5-4063-a969-f2dc166be622',
                tenantCode: 'g3yup2vyjfuwnx78m1y8vgrpj7pj56g0vk8o9mbved8f5q5ea5',
                systemId: 'c257947e-5c53-49d5-8ce8-a1db0f9a8fc6',
                systemName: 'h4ilqgaggojt4pna6ar8',
                version: '58bnjdtepqzj0dc9bkfx',
                type: 'DETAIL',
                executedAt: '2020-11-04 12:42:57',
                monitoringStartAt: '2020-11-04 10:56:15',
                monitoringEndAt: '2020-11-04 05:14:27',
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
                id: '69683a91-ce81-4ff2-a55d-16c9842ce971',
                tenantId: '6x50v9jllst7mrdw0wxk7c3rncpkjcnjzka00',
                tenantCode: 'dx1qv30yy2ucdarzibtgcqp8xka48fu7bj7jxcl4nnqa10d0hx',
                systemId: 'c257947e-5c53-49d5-8ce8-a1db0f9a8fc6',
                systemName: '1l6p42wxx047oovoipfl',
                version: 'pvh5sxh070ols6gtpg1r',
                type: 'DETAIL',
                executedAt: '2020-11-03 22:58:41',
                monitoringStartAt: '2020-11-04 10:18:24',
                monitoringEndAt: '2020-11-04 11:09:09',
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
                id: '69683a91-ce81-4ff2-a55d-16c9842ce971',
                tenantId: '485ee692-26e5-4063-a969-f2dc166be622',
                tenantCode: 'icraa5ezqd8oi2fxpr7iqyhet81qr6x7jitvu0r1yynh7agc8e',
                systemId: 'w5wlm0e91jw0ful5xb0sb6cnt0potspadymq0',
                systemName: 'tkrews98v1oaizwkw5ln',
                version: 'vovws2kdt4fxoxxnpsfv',
                type: 'DETAIL',
                executedAt: '2020-11-04 01:14:24',
                monitoringStartAt: '2020-11-04 08:01:40',
                monitoringEndAt: '2020-11-03 22:35:03',
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
                id: '69683a91-ce81-4ff2-a55d-16c9842ce971',
                tenantId: '485ee692-26e5-4063-a969-f2dc166be622',
                tenantCode: 'z3xq15zj0wxi0yi2atrgy1vwrr332awsp6g095fjsdwql6z2hn7',
                systemId: 'c257947e-5c53-49d5-8ce8-a1db0f9a8fc6',
                systemName: 'i7kb18koht6640w5nmc6',
                version: 'oz3ftrn8i047w2q7il0l',
                type: 'SUMMARY',
                executedAt: '2020-11-04 15:59:23',
                monitoringStartAt: '2020-11-04 19:10:33',
                monitoringEndAt: '2020-11-04 02:47:00',
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
                id: '69683a91-ce81-4ff2-a55d-16c9842ce971',
                tenantId: '485ee692-26e5-4063-a969-f2dc166be622',
                tenantCode: '4t0v4cma5gdgpy9js6l8jolnuwrkaipy4rmw2v17xkmquzfcn6',
                systemId: 'c257947e-5c53-49d5-8ce8-a1db0f9a8fc6',
                systemName: '9vymqyj8hnvrzmb3uyf6j',
                version: 'ipoz7if7o3t7as7afnsy',
                type: 'SUMMARY',
                executedAt: '2020-11-04 14:55:08',
                monitoringStartAt: '2020-11-04 03:14:49',
                monitoringEndAt: '2020-11-04 10:18:15',
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
                id: '69683a91-ce81-4ff2-a55d-16c9842ce971',
                tenantId: '485ee692-26e5-4063-a969-f2dc166be622',
                tenantCode: 'lops2mir8aa2z0qpw5wrylqgpadyicjr5lnibm4qdt9og74vjz',
                systemId: 'c257947e-5c53-49d5-8ce8-a1db0f9a8fc6',
                systemName: 'f3wohd58jaullsh39s1i',
                version: '1i619rd2q30fhf75cki6v',
                type: 'DETAIL',
                executedAt: '2020-11-04 03:56:40',
                monitoringStartAt: '2020-11-03 22:45:31',
                monitoringEndAt: '2020-11-03 22:43:56',
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
                id: '69683a91-ce81-4ff2-a55d-16c9842ce971',
                tenantId: '485ee692-26e5-4063-a969-f2dc166be622',
                tenantCode: '2dbq18nyb5mmw60rrldtoaqg61jz7cv9zl8s4w317n4unye9eq',
                systemId: 'c257947e-5c53-49d5-8ce8-a1db0f9a8fc6',
                systemName: 'w91pq2if33t06femzb8j',
                version: 'f2k3fhoqul3yt13r8nsz',
                type: 'XXXX',
                executedAt: '2020-11-03 22:26:52',
                monitoringStartAt: '2020-11-03 21:43:17',
                monitoringEndAt: '2020-11-03 22:33:44',
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
                id: '69683a91-ce81-4ff2-a55d-16c9842ce971',
                tenantId: '485ee692-26e5-4063-a969-f2dc166be622',
                tenantCode: 'wne8tvxsbpgjhj4zdntav7v8mhif8alr4wnqs6uh1edwoshesf',
                systemId: 'c257947e-5c53-49d5-8ce8-a1db0f9a8fc6',
                systemName: 'ch4ubjgdp75s5f82dbop',
                version: 'gwfiyo2jl95v0mtut7hl',
                type: 'SUMMARY',
                executedAt: 'XXXXXXXX',
                monitoringStartAt: '2020-11-04 17:31:05',
                monitoringEndAt: '2020-11-04 09:21:56',
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
                id: '69683a91-ce81-4ff2-a55d-16c9842ce971',
                tenantId: '485ee692-26e5-4063-a969-f2dc166be622',
                tenantCode: 'ux76vu2zwx78o02n9xy3bnpo05mh15ctxom2pvuut8ygoctepf',
                systemId: 'c257947e-5c53-49d5-8ce8-a1db0f9a8fc6',
                systemName: 'apfugaq9qzunjnbhjo75',
                version: 'enorsjs5ggbphlxsow1v',
                type: 'SUMMARY',
                executedAt: '2020-11-03 20:35:09',
                monitoringStartAt: 'XXXXXXXX',
                monitoringEndAt: '2020-11-04 10:49:22',
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
                id: '69683a91-ce81-4ff2-a55d-16c9842ce971',
                tenantId: '485ee692-26e5-4063-a969-f2dc166be622',
                tenantCode: 'nd4imsj77maepsxvzo86mmrwigmpmgt0ke4l2m0wbb3vccuuok',
                systemId: 'c257947e-5c53-49d5-8ce8-a1db0f9a8fc6',
                systemName: 'mlbvd1p0u49p6jzxukz9',
                version: '24lb3fn9sj45hy1sbbzb',
                type: 'DETAIL',
                executedAt: '2020-11-04 07:15:02',
                monitoringStartAt: '2020-11-04 15:02:38',
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
                id: '69683a91-ce81-4ff2-a55d-16c9842ce971',
                tenantId: '485ee692-26e5-4063-a969-f2dc166be622',
                tenantCode: '8kovfve2hv5wdfqgr1lfki6k4d9vax9rz3xs5bhks5q0y6asig',
                systemId: 'c257947e-5c53-49d5-8ce8-a1db0f9a8fc6',
                systemName: 'yybs4xe0ds6633nja34c',
                version: '1688tne121uiyl2n8pav',
                type: 'SUMMARY',
                executedAt: '2020-11-04 07:06:02',
                monitoringStartAt: '2020-11-04 18:45:07',
                monitoringEndAt: '2020-11-04 17:39:51',
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
                        id: 'fa5198ce-d724-4aa1-b187-6ac01f750cd3'
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
                        id: '69683a91-ce81-4ff2-a55d-16c9842ce971'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '69683a91-ce81-4ff2-a55d-16c9842ce971'));
    });

    test(`/REST:GET cci/execution/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/execution/5212ec02-9edc-421c-883f-b8fb6ef6255e')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/execution/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/execution/69683a91-ce81-4ff2-a55d-16c9842ce971')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '69683a91-ce81-4ff2-a55d-16c9842ce971'));
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
                
                id: 'cff14d30-aca3-4aae-8b73-20899f8aa8fe',
                tenantId: 'bc26ad9a-da62-4dd9-afac-74e5dd784d24',
                tenantCode: 'co4q18tnj4p5kt36u4t6jkd103hglqb2s6wyo260ipcq8gh6tp',
                systemId: '5eca01a5-9016-44e0-9fb1-ede7c61ca9d8',
                systemName: 'm0t8ptohluhzbco3n2tn',
                version: 'kbagqegpdprzfbtoithq',
                type: 'DETAIL',
                executedAt: '2020-11-04 16:00:20',
                monitoringStartAt: '2020-11-04 14:52:26',
                monitoringEndAt: '2020-11-04 18:02:22',
            })
            .expect(404);
    });

    test(`/REST:PUT cci/execution`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                
                id: '69683a91-ce81-4ff2-a55d-16c9842ce971',
                tenantId: '485ee692-26e5-4063-a969-f2dc166be622',
                tenantCode: 'fvmzg92w3t31xa5ow3crgeiu303bxfn8csq1n725m8sjhmkzv9',
                systemId: 'c257947e-5c53-49d5-8ce8-a1db0f9a8fc6',
                systemName: 'lw1709nfbq9q5zt5cocn',
                version: 'mwo4wey1ekkmsmbzcmo3',
                type: 'DETAIL',
                executedAt: '2020-11-03 20:02:47',
                monitoringStartAt: '2020-11-04 05:34:16',
                monitoringEndAt: '2020-11-04 10:25:10',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '69683a91-ce81-4ff2-a55d-16c9842ce971'));
    });

    test(`/REST:DELETE cci/execution/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/execution/86aba650-4f21-4cfc-a003-3bd655ef500e')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/execution/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/execution/69683a91-ce81-4ff2-a55d-16c9842ce971')
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
                        id: 'fc661128-48be-40ec-8afa-cefbd4b71f67',
                        tenantId: '485ee692-26e5-4063-a969-f2dc166be622',
                        tenantCode: '7knnb18j2xa3w62u1c3173g6vhng4t3pnxgo1rflqp7hkwajfu',
                        systemId: 'c257947e-5c53-49d5-8ce8-a1db0f9a8fc6',
                        systemName: '46ajj0dpv4k65gme98yt',
                        version: 'rbvex5uf7cvkoqn7dllj',
                        type: 'SUMMARY',
                        executedAt: '2020-11-04 11:36:55',
                        monitoringStartAt: '2020-11-04 02:48:12',
                        monitoringEndAt: '2020-11-03 19:40:52',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateExecution).toHaveProperty('id', 'fc661128-48be-40ec-8afa-cefbd4b71f67');
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
                            id: '7c963853-1236-4ab8-8271-4a18c128e2b0'
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
                            id: '69683a91-ce81-4ff2-a55d-16c9842ce971'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindExecution.id).toStrictEqual('69683a91-ce81-4ff2-a55d-16c9842ce971');
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
                    id: '540a3906-5c3b-4a4a-b550-402adad9ede6'
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
                    id: '69683a91-ce81-4ff2-a55d-16c9842ce971'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindExecutionById.id).toStrictEqual('69683a91-ce81-4ff2-a55d-16c9842ce971');
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
                        
                        id: '81eddc06-126c-4f30-8d8c-3824a1b09c5e',
                        tenantId: 'aaaaf920-ae76-4df3-a49f-bfcf1ca73eea',
                        tenantCode: 'ns4saa8nzl6m8sw2ss8m57g3ncla7hcjvf2hadfctsgdijq51h',
                        systemId: '2dff1ade-1052-4a1e-a8ef-42fd5448978f',
                        systemName: '340t3zg2t43d4o9ffn1y',
                        version: 'vo81q46b42tq0icsw8po',
                        type: 'DETAIL',
                        executedAt: '2020-11-04 08:06:44',
                        monitoringStartAt: '2020-11-04 12:49:06',
                        monitoringEndAt: '2020-11-04 12:15:02',
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
                        
                        id: '69683a91-ce81-4ff2-a55d-16c9842ce971',
                        tenantId: '485ee692-26e5-4063-a969-f2dc166be622',
                        tenantCode: 'pxvnosc5egzsomr2w4iqfzay3q5c48tknznxshmnusbt0zyraz',
                        systemId: 'c257947e-5c53-49d5-8ce8-a1db0f9a8fc6',
                        systemName: '857fq0iqm18f33lzx6r2',
                        version: 'ttl71vbqbztkpd0qvupu',
                        type: 'SUMMARY',
                        executedAt: '2020-11-04 14:25:52',
                        monitoringStartAt: '2020-11-04 14:53:01',
                        monitoringEndAt: '2020-11-03 22:21:43',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateExecution.id).toStrictEqual('69683a91-ce81-4ff2-a55d-16c9842ce971');
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
                    id: '192263e7-0173-4c8e-9636-8ea9e46f7146'
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
                    id: '69683a91-ce81-4ff2-a55d-16c9842ce971'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteExecutionById.id).toStrictEqual('69683a91-ce81-4ff2-a55d-16c9842ce971');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});