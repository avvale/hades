import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ISystemRepository } from '@hades/bplus-it-sappi/system/domain/system.repository';
import { MockSystemRepository } from '@hades/bplus-it-sappi/system/infrastructure/mock/mock-system.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('system', () => 
{
    let app: INestApplication;
    let repository: MockSystemRepository;
    
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
            .overrideProvider(ISystemRepository)
            .useClass(MockSystemRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockSystemRepository>module.get<ISystemRepository>(ISystemRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/system - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '6d6f348f-5953-4e11-8eb9-42f8a5ad019b',
                tenantCode: '5nbcffmfd06ejewe5nbtv5ljcrem9pfmuj2lqhau2zku44u20z',
                version: 's',
                name: '0',
                environment: 'a',
                isActive: false,
                cancelledAt: '2020-07-31 12:45:05',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '6d6f348f-5953-4e11-8eb9-42f8a5ad019b',
                tenantCode: 'ijdui0o463utobge48g0yj43cj47oxelpfb41yv1nq5khuapko',
                version: 'm',
                name: 'z',
                environment: '0',
                isActive: false,
                cancelledAt: '2020-07-31 06:15:04',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '6031af03-16ab-4961-95a9-e0fe80046e0c',
                tenantId: null,
                tenantCode: '7jalx1fp1x6rmrdeowsetix7dxlvctwrt1ibx2ajpchivqrb76',
                version: 'q',
                name: 'e',
                environment: 'z',
                isActive: true,
                cancelledAt: '2020-07-31 13:11:34',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '6031af03-16ab-4961-95a9-e0fe80046e0c',
                
                tenantCode: '1p0h9i4jo4kzte1id41f7dro8wag5uthn9xs06ecfpkdqttekf',
                version: '4',
                name: 't',
                environment: 'j',
                isActive: false,
                cancelledAt: '2020-07-30 15:56:24',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '6031af03-16ab-4961-95a9-e0fe80046e0c',
                tenantId: '6d6f348f-5953-4e11-8eb9-42f8a5ad019b',
                tenantCode: null,
                version: 'm',
                name: 'a',
                environment: 'r',
                isActive: true,
                cancelledAt: '2020-07-31 11:21:20',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '6031af03-16ab-4961-95a9-e0fe80046e0c',
                tenantId: '6d6f348f-5953-4e11-8eb9-42f8a5ad019b',
                
                version: 'f',
                name: 'r',
                environment: '2',
                isActive: false,
                cancelledAt: '2020-07-31 08:58:38',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemVersion property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '6031af03-16ab-4961-95a9-e0fe80046e0c',
                tenantId: '6d6f348f-5953-4e11-8eb9-42f8a5ad019b',
                tenantCode: 'o7o9x80h3bhfdmaqg100l3u94vmdztmw0smbyulf63feak24ft',
                version: null,
                name: '4',
                environment: 'm',
                isActive: true,
                cancelledAt: '2020-07-30 17:10:11',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemVersion must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemVersion property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '6031af03-16ab-4961-95a9-e0fe80046e0c',
                tenantId: '6d6f348f-5953-4e11-8eb9-42f8a5ad019b',
                tenantCode: 'vd7qd8bnj0ya3xxdb56x7sxh5pwr59oqmsthxpv5zj3d2aqg3d',
                
                name: 'y',
                environment: '9',
                isActive: true,
                cancelledAt: '2020-07-30 22:24:12',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemVersion must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '6031af03-16ab-4961-95a9-e0fe80046e0c',
                tenantId: '6d6f348f-5953-4e11-8eb9-42f8a5ad019b',
                tenantCode: 'n2z0waxhguoozrbu3dakn14wh845bt7wbfabrwwhdjrwh28j1s',
                version: 'w',
                name: null,
                environment: 'a',
                isActive: false,
                cancelledAt: '2020-07-31 03:45:30',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '6031af03-16ab-4961-95a9-e0fe80046e0c',
                tenantId: '6d6f348f-5953-4e11-8eb9-42f8a5ad019b',
                tenantCode: 'zcejp6zozh70io0oyjuije0ifrnom10061mgzgo6rhyohi7w1x',
                version: 'c',
                
                environment: 'k',
                isActive: true,
                cancelledAt: '2020-07-31 13:10:59',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemEnvironment property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '6031af03-16ab-4961-95a9-e0fe80046e0c',
                tenantId: '6d6f348f-5953-4e11-8eb9-42f8a5ad019b',
                tenantCode: 'zuot1lgmfp3uhg1cpkpc6rqj1jvjq8k57nf2h0gsc5v2jvc8uk',
                version: 'b',
                name: 'a',
                environment: null,
                isActive: true,
                cancelledAt: '2020-07-30 19:38:39',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemEnvironment must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemEnvironment property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '6031af03-16ab-4961-95a9-e0fe80046e0c',
                tenantId: '6d6f348f-5953-4e11-8eb9-42f8a5ad019b',
                tenantCode: 't3p5307u8vkw20r03d6pdszyaxxtnqqofftk1winvrtfyutsx2',
                version: 'v',
                name: 'w',
                
                isActive: true,
                cancelledAt: '2020-07-31 11:59:23',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemEnvironment must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '6031af03-16ab-4961-95a9-e0fe80046e0c',
                tenantId: '6d6f348f-5953-4e11-8eb9-42f8a5ad019b',
                tenantCode: 'gk5d4om1tbvwyx1hif5jljqi4v0m19f52xkvnnay7mlysbkcpv',
                version: 'z',
                name: 'e',
                environment: '9',
                isActive: null,
                cancelledAt: '2020-07-30 17:03:32',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemIsActive must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemIsActive property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '6031af03-16ab-4961-95a9-e0fe80046e0c',
                tenantId: '6d6f348f-5953-4e11-8eb9-42f8a5ad019b',
                tenantCode: 'qpst1ht6umk7ndrc52mr4z1tdgwn4g4bvbbokwdljhuxrtu2jz',
                version: 's',
                name: 'g',
                environment: '2',
                
                cancelledAt: '2020-07-31 05:01:33',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemIsActive must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: 'ivkid2x36t1n0x1n2v2alawwsfs91hnuga1t0',
                tenantId: '6d6f348f-5953-4e11-8eb9-42f8a5ad019b',
                tenantCode: 'zwispgvgxafdnnlonj3jpnye1tj55yokpdflh7jr9nesk2cefz',
                version: '8',
                name: '3',
                environment: 'b',
                isActive: true,
                cancelledAt: '2020-07-30 22:46:08',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '6031af03-16ab-4961-95a9-e0fe80046e0c',
                tenantId: 'pkft3dea2icf6th3aau18kpz44jfoi1kskw48',
                tenantCode: 'ba8mao4r80rsxsatirrj155hyhd9g1t8kqwe6613s993h7p8q4',
                version: 'o',
                name: '8',
                environment: '2',
                isActive: false,
                cancelledAt: '2020-07-31 02:00:27',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '6031af03-16ab-4961-95a9-e0fe80046e0c',
                tenantId: '6d6f348f-5953-4e11-8eb9-42f8a5ad019b',
                tenantCode: 'ahkmjodrptqyyl04fu8z6kyyvp1d95jekji1vl5zbzw0wvkjg1x',
                version: 'v',
                name: 'i',
                environment: 'u',
                isActive: true,
                cancelledAt: '2020-07-31 06:56:49',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantCode is too large, has a maximum length of 50');
            });
    });
    

    

    
    
    

    
    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemIsActive has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '6031af03-16ab-4961-95a9-e0fe80046e0c',
                tenantId: '6d6f348f-5953-4e11-8eb9-42f8a5ad019b',
                tenantCode: 'rixigajnuxlvkxo4f2v9zui0bfwcjobnt7et9f75olo7tq70d7',
                version: '9',
                name: 'a',
                environment: 'n',
                isActive: 'true',
                cancelledAt: '2020-07-31 05:49:31',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemIsActive has to be a boolean value');
            });
    });
    

    

    
    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemCancelledAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '6031af03-16ab-4961-95a9-e0fe80046e0c',
                tenantId: '6d6f348f-5953-4e11-8eb9-42f8a5ad019b',
                tenantCode: 'wwdsfesssoujzkwuoonv15w466g5ydrl1vnasmrvoi5yskuasv',
                version: '7',
                name: 'e',
                environment: 'z',
                isActive: false,
                cancelledAt: 'XXXXXXXX',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemCancelledAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST bplus-it-sappi/system`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '6031af03-16ab-4961-95a9-e0fe80046e0c',
                tenantId: '6d6f348f-5953-4e11-8eb9-42f8a5ad019b',
                tenantCode: 'vpmr3d38h1lt9gyeolv77elhr7rt4iomouk200sdzz1ybdziuw',
                version: 'z',
                name: '0',
                environment: '7',
                isActive: false,
                cancelledAt: '2020-07-31 09:06:05',
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/systems/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/systems/paginate')
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

    test(`/REST:GET bplus-it-sappi/system - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : 'e15cf912-e82b-493b-b25f-89a50acbd24c'
                    }
                ]
            })
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/system`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '6031af03-16ab-4961-95a9-e0fe80046e0c'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '6031af03-16ab-4961-95a9-e0fe80046e0c'));
    });

    test(`/REST:GET bplus-it-sappi/system/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/system/3f5dc4d1-5c2c-4db3-9fd7-f702f101b071')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/system/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/system/6031af03-16ab-4961-95a9-e0fe80046e0c')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '6031af03-16ab-4961-95a9-e0fe80046e0c'));
    });

    test(`/REST:GET bplus-it-sappi/systems`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/systems')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/system - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                
                id: '041245f7-b117-40d6-9073-4fed5810b72b',
                tenantId: '4fb4ddf3-202d-49cd-b4b2-a0b4a50c25a2',
                tenantCode: '32bboojppfsmp8htz9z8no2vkkhno6bcqoyrcc8fu8amtiaz9n',
                version: 'm',
                name: 'w',
                environment: 'f',
                isActive: false,
                cancelledAt: '2020-07-30 17:55:53',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/system`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                
                id: '6031af03-16ab-4961-95a9-e0fe80046e0c',
                tenantId: '6d6f348f-5953-4e11-8eb9-42f8a5ad019b',
                tenantCode: 'o6paddxiqrqugxys5ncce5ql9ebnokfi1irwvvcwdqd8dw1i6w',
                version: '3',
                name: 'i',
                environment: 'l',
                isActive: true,
                cancelledAt: '2020-07-31 04:32:16',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '6031af03-16ab-4961-95a9-e0fe80046e0c'));
    });

    test(`/REST:DELETE bplus-it-sappi/system/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/system/589d8e02-ff50-4bf2-8e2a-9e9cc1936da0')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/system/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/system/6031af03-16ab-4961-95a9-e0fe80046e0c')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateSystem - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateSystemInput!)
                    {
                        bplusItSappiCreateSystem (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            version
                            name
                            environment
                            isActive
                            cancelledAt
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

    test(`/GraphQL bplusItSappiCreateSystem`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateSystemInput!)
                    {
                        bplusItSappiCreateSystem (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            version
                            name
                            environment
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'e36f425c-6288-4ffa-8c5d-13bfb18df65e',
                        tenantId: '6d6f348f-5953-4e11-8eb9-42f8a5ad019b',
                        tenantCode: 'nhoh1rp6xgmo5lu2r05lle2uil6x94mcj9hhxhrae7o85ljvvi',
                        version: 'c',
                        name: '9',
                        environment: 'f',
                        isActive: true,
                        cancelledAt: '2020-07-31 05:15:34',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateSystem).toHaveProperty('id', 'e36f425c-6288-4ffa-8c5d-13bfb18df65e');
            });
    });

    test(`/GraphQL bplusItSappiPaginateSystems`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateSystems (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateSystems.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateSystems.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateSystems.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindSystem - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindSystem (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            version
                            name
                            environment
                            isActive
                            cancelledAt
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
                            value   : 'ab9e206a-283c-45fd-90b8-c8a5592c18b4'
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

    test(`/GraphQL bplusItSappiFindSystem`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindSystem (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            version
                            name
                            environment
                            isActive
                            cancelledAt
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
                            value   : '6031af03-16ab-4961-95a9-e0fe80046e0c'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindSystem.id).toStrictEqual('6031af03-16ab-4961-95a9-e0fe80046e0c');
            });
    });

    test(`/GraphQL bplusItSappiFindSystemById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindSystemById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            version
                            name
                            environment
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '61bb576b-7319-469c-bf57-18e43821d0b7'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiFindSystemById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindSystemById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            version
                            name
                            environment
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '6031af03-16ab-4961-95a9-e0fe80046e0c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindSystemById.id).toStrictEqual('6031af03-16ab-4961-95a9-e0fe80046e0c');
            });
    });

    test(`/GraphQL bplusItSappiGetSystems`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetSystems (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            version
                            name
                            environment
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetSystems.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateSystem - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateSystemInput!)
                    {
                        bplusItSappiUpdateSystem (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            version
                            name
                            environment
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '52b2439c-e3ea-487c-91f2-9eaadad61a09',
                        tenantId: 'c6ac97ad-e007-4ea0-8148-d01c733ef9df',
                        tenantCode: 'i4897u0zw2oqgiw8rgxjlbhvz1o1o55qynghenxqmbxf9x1ubo',
                        version: '6',
                        name: '2',
                        environment: '9',
                        isActive: false,
                        cancelledAt: '2020-07-31 04:53:15',
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

    test(`/GraphQL bplusItSappiUpdateSystem`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateSystemInput!)
                    {
                        bplusItSappiUpdateSystem (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            version
                            name
                            environment
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '6031af03-16ab-4961-95a9-e0fe80046e0c',
                        tenantId: '6d6f348f-5953-4e11-8eb9-42f8a5ad019b',
                        tenantCode: '23dhbj3hjp5vz0ibh1l6sb0f87q2xhx8rmxqn3bc9duvb6z3nq',
                        version: 'u',
                        name: '0',
                        environment: 'r',
                        isActive: false,
                        cancelledAt: '2020-07-30 20:54:52',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateSystem.id).toStrictEqual('6031af03-16ab-4961-95a9-e0fe80046e0c');
            });
    });

    test(`/GraphQL bplusItSappiDeleteSystemById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteSystemById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            version
                            name
                            environment
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'a6867a9c-4c16-4e7d-9fdc-2c236d2ca083'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiDeleteSystemById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteSystemById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            version
                            name
                            environment
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '6031af03-16ab-4961-95a9-e0fe80046e0c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteSystemById.id).toStrictEqual('6031af03-16ab-4961-95a9-e0fe80046e0c');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});