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
                tenantId: '2c144a33-8514-46b5-8d38-7b6bb4f9f806',
                tenantCode: '9j5l7d59i98ziy2ls751gwh9jy8e9ckwvw96wcwprm2zbhjcu5',
                version: 's',
                name: '5',
                environment: '4',
                isActive: true,
                cancelledAt: '2020-08-03 22:43:28',
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
                
                tenantId: '2c144a33-8514-46b5-8d38-7b6bb4f9f806',
                tenantCode: 'vha5185iyydtnnq1zfrjvongoe47whop2p74h0x630dffq7ul3',
                version: 'b',
                name: 'i',
                environment: 'm',
                isActive: true,
                cancelledAt: '2020-08-03 18:28:02',
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
                id: '46d882c5-57b1-462c-8501-e6c073b01af6',
                tenantId: null,
                tenantCode: 'lkghzzhw2lc25qpe1qqlegtfaecquy0w9udsacbjnf78tx58uu',
                version: '8',
                name: 'x',
                environment: 'y',
                isActive: false,
                cancelledAt: '2020-08-04 00:32:45',
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
                id: '46d882c5-57b1-462c-8501-e6c073b01af6',
                
                tenantCode: 'netkfikhb3jgxkhp8itxvz6vqobmyyyljloa16ss8q3btfrld3',
                version: 'q',
                name: 'c',
                environment: 'r',
                isActive: true,
                cancelledAt: '2020-08-04 09:48:36',
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
                id: '46d882c5-57b1-462c-8501-e6c073b01af6',
                tenantId: '2c144a33-8514-46b5-8d38-7b6bb4f9f806',
                tenantCode: null,
                version: 't',
                name: 't',
                environment: 'i',
                isActive: false,
                cancelledAt: '2020-08-03 21:23:59',
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
                id: '46d882c5-57b1-462c-8501-e6c073b01af6',
                tenantId: '2c144a33-8514-46b5-8d38-7b6bb4f9f806',
                
                version: 'o',
                name: 'q',
                environment: 'v',
                isActive: true,
                cancelledAt: '2020-08-03 19:14:24',
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
                id: '46d882c5-57b1-462c-8501-e6c073b01af6',
                tenantId: '2c144a33-8514-46b5-8d38-7b6bb4f9f806',
                tenantCode: 'zf0h8eo2fm0tk3r5c663iqmnne1b9jpqsq7jytmlzitqo55ecc',
                version: null,
                name: 'q',
                environment: 'd',
                isActive: true,
                cancelledAt: '2020-08-04 08:29:14',
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
                id: '46d882c5-57b1-462c-8501-e6c073b01af6',
                tenantId: '2c144a33-8514-46b5-8d38-7b6bb4f9f806',
                tenantCode: 'hhu15y31didtbvjejjlnc7yiygupgfr3580hkqo112r4bedtoi',
                
                name: 'k',
                environment: '0',
                isActive: false,
                cancelledAt: '2020-08-03 19:08:26',
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
                id: '46d882c5-57b1-462c-8501-e6c073b01af6',
                tenantId: '2c144a33-8514-46b5-8d38-7b6bb4f9f806',
                tenantCode: 'p8aasdc8cx60df6uerrw2hvvpzt5tvvwn00bx1ityekftf4m73',
                version: 'j',
                name: null,
                environment: '1',
                isActive: false,
                cancelledAt: '2020-08-04 06:42:51',
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
                id: '46d882c5-57b1-462c-8501-e6c073b01af6',
                tenantId: '2c144a33-8514-46b5-8d38-7b6bb4f9f806',
                tenantCode: 'kxhznf7mwx59lffxrjcze3iofcnzb06wtdpg38cd009e0h7u30',
                version: 'w',
                
                environment: 'd',
                isActive: false,
                cancelledAt: '2020-08-03 16:23:27',
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
                id: '46d882c5-57b1-462c-8501-e6c073b01af6',
                tenantId: '2c144a33-8514-46b5-8d38-7b6bb4f9f806',
                tenantCode: 'm8f5hhvf1pzncvjrqc8nfdtplky9x8e9ovujpetdcam67ggc1q',
                version: 'u',
                name: 'h',
                environment: null,
                isActive: false,
                cancelledAt: '2020-08-04 06:26:29',
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
                id: '46d882c5-57b1-462c-8501-e6c073b01af6',
                tenantId: '2c144a33-8514-46b5-8d38-7b6bb4f9f806',
                tenantCode: 'ux8q4k6jny7vxhpluvudvo5h6i8kpcafynvbjn7u8uh9h28ajo',
                version: '0',
                name: 'a',
                
                isActive: true,
                cancelledAt: '2020-08-04 12:29:11',
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
                id: '46d882c5-57b1-462c-8501-e6c073b01af6',
                tenantId: '2c144a33-8514-46b5-8d38-7b6bb4f9f806',
                tenantCode: 'ux96jomstbuwyic0k3vsz7ewvjmejia2q1pc7bqhi576qzqdk2',
                version: 'i',
                name: 'l',
                environment: 't',
                isActive: null,
                cancelledAt: '2020-08-04 04:29:06',
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
                id: '46d882c5-57b1-462c-8501-e6c073b01af6',
                tenantId: '2c144a33-8514-46b5-8d38-7b6bb4f9f806',
                tenantCode: '93vyvm4tu26bwyxnr6z3rgprrwgwqf7oiyh5k1396zyawjtbjf',
                version: '1',
                name: 'i',
                environment: 'c',
                
                cancelledAt: '2020-08-03 17:55:13',
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
                id: 'h56q51aal1lqqm4glq8sj5qzol18t0giy88zc',
                tenantId: '2c144a33-8514-46b5-8d38-7b6bb4f9f806',
                tenantCode: 'ev9qnkf0i6ywffuvrf5dvj7jipg5gta2ld7yzptrlwcahkara7',
                version: 'o',
                name: '1',
                environment: 'w',
                isActive: true,
                cancelledAt: '2020-08-04 13:28:10',
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
                id: '46d882c5-57b1-462c-8501-e6c073b01af6',
                tenantId: 'fyd6tpc5o5t256c10xoyj7h36r09ykcrtc64v',
                tenantCode: 'sif8omsl5ajpa53mu5flyk8mt422yzca2amzcys5eeszsh7ak3',
                version: '4',
                name: 'q',
                environment: 'd',
                isActive: false,
                cancelledAt: '2020-08-04 01:36:27',
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
                id: '46d882c5-57b1-462c-8501-e6c073b01af6',
                tenantId: '2c144a33-8514-46b5-8d38-7b6bb4f9f806',
                tenantCode: 'kinhph3j5eap72vc8b7um6cj6ff78vnsr66h54ztnk7uraxm26p',
                version: 'm',
                name: 'q',
                environment: '9',
                isActive: true,
                cancelledAt: '2020-08-04 02:31:13',
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
                id: '46d882c5-57b1-462c-8501-e6c073b01af6',
                tenantId: '2c144a33-8514-46b5-8d38-7b6bb4f9f806',
                tenantCode: 'pnprp05gqcn81vvwkujkba7dipw4tmnw4mekiijauatnj7gp01',
                version: 'y',
                name: 'e',
                environment: '5',
                isActive: 'true',
                cancelledAt: '2020-08-03 17:28:31',
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
                id: '46d882c5-57b1-462c-8501-e6c073b01af6',
                tenantId: '2c144a33-8514-46b5-8d38-7b6bb4f9f806',
                tenantCode: '2xrnh124y9nexehfwrf9or1gzdy15tbsevnxpic8g0qa5vebdp',
                version: '1',
                name: 'x',
                environment: 'j',
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
                id: '46d882c5-57b1-462c-8501-e6c073b01af6',
                tenantId: '2c144a33-8514-46b5-8d38-7b6bb4f9f806',
                tenantCode: 'sqt0nbg74z94cs7sykmbh2jj63vu0z15rk97pwj2oqxz2dk6p1',
                version: '7',
                name: '5',
                environment: '9',
                isActive: false,
                cancelledAt: '2020-08-03 19:09:48',
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
                        value   : '46df8462-4dbf-4552-9150-d73c4286e2f3'
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
                        value   : '46d882c5-57b1-462c-8501-e6c073b01af6'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '46d882c5-57b1-462c-8501-e6c073b01af6'));
    });

    test(`/REST:GET bplus-it-sappi/system/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/system/040c723c-c435-4363-a6cb-712b3d5df149')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/system/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/system/46d882c5-57b1-462c-8501-e6c073b01af6')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '46d882c5-57b1-462c-8501-e6c073b01af6'));
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
                
                id: 'e6dbad92-948d-40d3-be8b-c88eb6c34a36',
                tenantId: '1cf7fba3-7d76-4466-9905-7f98d4a6f7fe',
                tenantCode: '8l2l9082xmpplibn7v3wgh9vh4vnbnlu0zyj1zao3m7bmvmk0f',
                version: 'l',
                name: '0',
                environment: 'j',
                isActive: false,
                cancelledAt: '2020-08-04 12:55:37',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/system`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                
                id: '46d882c5-57b1-462c-8501-e6c073b01af6',
                tenantId: '2c144a33-8514-46b5-8d38-7b6bb4f9f806',
                tenantCode: 'gnrrrt9oo65znruudtqhd51obujt0hrp315acp5xnoueczju39',
                version: 'e',
                name: 'r',
                environment: 'w',
                isActive: true,
                cancelledAt: '2020-08-04 04:52:25',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '46d882c5-57b1-462c-8501-e6c073b01af6'));
    });

    test(`/REST:DELETE bplus-it-sappi/system/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/system/d6a90dd4-d2c2-4141-a651-03461b1315da')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/system/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/system/46d882c5-57b1-462c-8501-e6c073b01af6')
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
                        id: 'bbc4ad5c-0fdd-4f35-a0b3-c0ea7f239303',
                        tenantId: '2c144a33-8514-46b5-8d38-7b6bb4f9f806',
                        tenantCode: 'vgdkwm7zcnb79o43m0ldupjdrmyirof4u73x16otyd85ordnac',
                        version: '1',
                        name: 'j',
                        environment: 'o',
                        isActive: true,
                        cancelledAt: '2020-08-04 05:59:47',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateSystem).toHaveProperty('id', 'bbc4ad5c-0fdd-4f35-a0b3-c0ea7f239303');
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
                            value   : '0509f968-1713-478b-abf7-fd494d308343'
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
                            value   : '46d882c5-57b1-462c-8501-e6c073b01af6'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindSystem.id).toStrictEqual('46d882c5-57b1-462c-8501-e6c073b01af6');
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
                    id: 'd8bd3632-6ef1-4166-975b-0919e3d29a1a'
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
                    id: '46d882c5-57b1-462c-8501-e6c073b01af6'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindSystemById.id).toStrictEqual('46d882c5-57b1-462c-8501-e6c073b01af6');
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
                        
                        id: '1371c725-ca07-4213-82cf-7bdcc402c2b1',
                        tenantId: '1a6c6943-d433-4e9e-b0d9-1a28e7923886',
                        tenantCode: '7tzf7zeww9lv5q41be39uuepubhvte8yocbif7kp8xkm3kggpf',
                        version: 'x',
                        name: 'w',
                        environment: 't',
                        isActive: false,
                        cancelledAt: '2020-08-04 12:36:22',
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
                        
                        id: '46d882c5-57b1-462c-8501-e6c073b01af6',
                        tenantId: '2c144a33-8514-46b5-8d38-7b6bb4f9f806',
                        tenantCode: 'dubknj39dgqm3v9qb8fxnecpoyxk8o5yyl09dukohyrr1uv345',
                        version: 'z',
                        name: 'd',
                        environment: 'h',
                        isActive: false,
                        cancelledAt: '2020-08-04 00:25:27',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateSystem.id).toStrictEqual('46d882c5-57b1-462c-8501-e6c073b01af6');
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
                    id: '06928494-b410-4db6-8f7b-ae30ebd8408b'
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
                    id: '46d882c5-57b1-462c-8501-e6c073b01af6'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteSystemById.id).toStrictEqual('46d882c5-57b1-462c-8501-e6c073b01af6');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});