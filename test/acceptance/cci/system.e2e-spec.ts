import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ISystemRepository } from '@hades/cci/system/domain/system.repository';
import { MockSystemRepository } from '@hades/cci/system/infrastructure/mock/mock-system.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { CciModule } from './../../../src/apps/cci/cci.module';
import * as request from 'supertest';
import * as _ from 'lodash';
import { IamModule } from './../../../src/apps/iam/iam.module';

const importForeignModules = [
    IamModule
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
            .overrideProvider(ISystemRepository)
            .useClass(MockSystemRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockSystemRepository>module.get<ISystemRepository>(ISystemRepository);

        await app.init();
    });

    test(`/REST:POST cci/system - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST cci/system - Got 400 Conflict, SystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '4d3bc222-807f-45f9-8c2f-cc586bae75ca',
                tenantCode: '7yma02t0g6rxc3kprzcujr0p4vfc2o9ok2vg3cpq4nnfrw43dm',
                version: 'k',
                name: 'w',
                environment: 's',
                technology: 'WSO2',
                isActive: false,
                cancelledAt: '2020-11-04 07:34:02',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/system - Got 400 Conflict, SystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '4d3bc222-807f-45f9-8c2f-cc586bae75ca',
                tenantCode: 'rgp263zx5evlwk4td10tmupls5e1i0t38ycaydk70yeqk7qehb',
                version: 'l',
                name: '9',
                environment: 'f',
                technology: 'SAPSCI',
                isActive: false,
                cancelledAt: '2020-11-04 03:25:01',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/system - Got 400 Conflict, SystemTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                id: '9d59d33e-42ab-4a2a-85cb-dc91b1e8cdad',
                tenantId: null,
                tenantCode: 'lnculc4oe55j9mpemgy61sbrwv1yiif6fcy76njaeauozlgpx1',
                version: 's',
                name: 'c',
                environment: 'u',
                technology: 'MULESOFT',
                isActive: true,
                cancelledAt: '2020-11-04 02:02:54',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/system - Got 400 Conflict, SystemTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                id: '9d59d33e-42ab-4a2a-85cb-dc91b1e8cdad',
                
                tenantCode: '6uj7azvxsdt7kliumv9djhja3q53646wml0pezoutbnj3t5del',
                version: 'q',
                name: '5',
                environment: 'n',
                technology: 'SAPSCI',
                isActive: true,
                cancelledAt: '2020-11-04 12:31:58',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/system - Got 400 Conflict, SystemTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                id: '9d59d33e-42ab-4a2a-85cb-dc91b1e8cdad',
                tenantId: '4d3bc222-807f-45f9-8c2f-cc586bae75ca',
                tenantCode: null,
                version: 'i',
                name: '7',
                environment: 'm',
                technology: 'B2B',
                isActive: false,
                cancelledAt: '2020-11-04 08:21:56',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/system - Got 400 Conflict, SystemTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                id: '9d59d33e-42ab-4a2a-85cb-dc91b1e8cdad',
                tenantId: '4d3bc222-807f-45f9-8c2f-cc586bae75ca',
                
                version: '2',
                name: 'm',
                environment: '2',
                technology: 'WSO2',
                isActive: true,
                cancelledAt: '2020-11-04 03:06:34',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/system - Got 400 Conflict, SystemVersion property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                id: '9d59d33e-42ab-4a2a-85cb-dc91b1e8cdad',
                tenantId: '4d3bc222-807f-45f9-8c2f-cc586bae75ca',
                tenantCode: 'y6v0da8nc5nej4oevqms2aqky7fyj3cdqvu8nin09orwtpxzzc',
                version: null,
                name: 'c',
                environment: 's',
                technology: 'WSO2',
                isActive: false,
                cancelledAt: '2020-11-04 17:29:21',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemVersion must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/system - Got 400 Conflict, SystemVersion property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                id: '9d59d33e-42ab-4a2a-85cb-dc91b1e8cdad',
                tenantId: '4d3bc222-807f-45f9-8c2f-cc586bae75ca',
                tenantCode: '226lgol4z7oz7h0e3dhy9awvuowg95qrbceeujfdmpa8w3cmhu',
                
                name: '5',
                environment: 'i',
                technology: 'B2B',
                isActive: true,
                cancelledAt: '2020-11-04 02:52:03',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemVersion must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/system - Got 400 Conflict, SystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                id: '9d59d33e-42ab-4a2a-85cb-dc91b1e8cdad',
                tenantId: '4d3bc222-807f-45f9-8c2f-cc586bae75ca',
                tenantCode: '7w2lzadqzjn0otpyl4azlma4aciak8wk0vggezvmnuubqoq3vh',
                version: 'm',
                name: null,
                environment: 'u',
                technology: 'B2B',
                isActive: false,
                cancelledAt: '2020-11-04 22:13:04',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/system - Got 400 Conflict, SystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                id: '9d59d33e-42ab-4a2a-85cb-dc91b1e8cdad',
                tenantId: '4d3bc222-807f-45f9-8c2f-cc586bae75ca',
                tenantCode: 'fpiso4vp6ejh7047d6dgo7pbzuxpv2d8p63pe4exv701he3ynx',
                version: '8',
                
                environment: 'u',
                technology: 'WSO2',
                isActive: false,
                cancelledAt: '2020-11-04 09:26:35',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/system - Got 400 Conflict, SystemEnvironment property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                id: '9d59d33e-42ab-4a2a-85cb-dc91b1e8cdad',
                tenantId: '4d3bc222-807f-45f9-8c2f-cc586bae75ca',
                tenantCode: 'vssernnxl82p5kl4nh4syzuxonl1gfwifk66tiyqmccnaveywc',
                version: 'v',
                name: '0',
                environment: null,
                technology: 'WSO2',
                isActive: false,
                cancelledAt: '2020-11-04 09:27:17',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemEnvironment must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/system - Got 400 Conflict, SystemEnvironment property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                id: '9d59d33e-42ab-4a2a-85cb-dc91b1e8cdad',
                tenantId: '4d3bc222-807f-45f9-8c2f-cc586bae75ca',
                tenantCode: '20yg1k80v6palm0iugsyipkk306q9gudonkgjb4ascoyuxe5j3',
                version: 'x',
                name: 's',
                
                technology: 'MULESOFT',
                isActive: true,
                cancelledAt: '2020-11-04 02:58:39',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemEnvironment must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/system - Got 400 Conflict, SystemTechnology property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                id: '9d59d33e-42ab-4a2a-85cb-dc91b1e8cdad',
                tenantId: '4d3bc222-807f-45f9-8c2f-cc586bae75ca',
                tenantCode: 'wk5prckm4oegz0kaozc6lxis4pco2c5aldo7ccl7hscyjphpr3',
                version: 't',
                name: 's',
                environment: '5',
                technology: null,
                isActive: true,
                cancelledAt: '2020-11-04 01:33:18',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTechnology must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/system - Got 400 Conflict, SystemTechnology property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                id: '9d59d33e-42ab-4a2a-85cb-dc91b1e8cdad',
                tenantId: '4d3bc222-807f-45f9-8c2f-cc586bae75ca',
                tenantCode: 'yd053lfjhfpj13oktgzoulb5r7obb7jne5c9jwrsn6sxenejet',
                version: 'k',
                name: 'a',
                environment: '2',
                
                isActive: true,
                cancelledAt: '2020-11-04 12:51:25',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTechnology must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/system - Got 400 Conflict, SystemIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                id: '9d59d33e-42ab-4a2a-85cb-dc91b1e8cdad',
                tenantId: '4d3bc222-807f-45f9-8c2f-cc586bae75ca',
                tenantCode: '5gwq0q3awrm3iwktrp28fciqh00dur9q3m5ukvqy24ln3tdmmq',
                version: 'g',
                name: '8',
                environment: '1',
                technology: 'SAPSCI',
                isActive: null,
                cancelledAt: '2020-11-04 02:18:52',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemIsActive must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/system - Got 400 Conflict, SystemIsActive property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                id: '9d59d33e-42ab-4a2a-85cb-dc91b1e8cdad',
                tenantId: '4d3bc222-807f-45f9-8c2f-cc586bae75ca',
                tenantCode: 'y9realb3j0kspffcj4oftu1uj99n6fftkbctk7j65251okl547',
                version: 'z',
                name: 'n',
                environment: 'k',
                technology: 'WSO2',
                
                cancelledAt: '2020-11-04 02:48:21',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemIsActive must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST cci/system - Got 400 Conflict, SystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                id: 'r7twnf5fhizj2wnysrnmguhy6o8nc3s992rh9',
                tenantId: '4d3bc222-807f-45f9-8c2f-cc586bae75ca',
                tenantCode: 'u4uhj95vsjgf39fylpgl09pmg8vkqc29wq15tdrhkllai4nx1d',
                version: 'h',
                name: 'a',
                environment: 'z',
                technology: 'SAPPI',
                isActive: false,
                cancelledAt: '2020-11-04 16:14:59',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/system - Got 400 Conflict, SystemTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                id: '9d59d33e-42ab-4a2a-85cb-dc91b1e8cdad',
                tenantId: 'ieq0ug4srdw1uxodt3ch7ltdoe5osleqhf245',
                tenantCode: '1ojbkmmiy8yprjrr7k65nwxdjy4ex7dpgy0wqwsxvpgdulk8k8',
                version: 'l',
                name: 'p',
                environment: 'j',
                technology: 'MULESOFT',
                isActive: false,
                cancelledAt: '2020-11-04 01:17:47',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST cci/system - Got 400 Conflict, SystemTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                id: '9d59d33e-42ab-4a2a-85cb-dc91b1e8cdad',
                tenantId: '4d3bc222-807f-45f9-8c2f-cc586bae75ca',
                tenantCode: 'wi2k5wo5i2m5zl8z2z2by76kl2osn23cj7mr75c4j2qhozewsvi',
                version: 'q',
                name: 'o',
                environment: '9',
                technology: 'MULESOFT',
                isActive: false,
                cancelledAt: '2020-11-04 20:17:23',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantCode is too large, has a maximum length of 50');
            });
    });
    

    

    

    

    
    test(`/REST:POST cci/system - Got 400 Conflict, SystemIsActive has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                id: '9d59d33e-42ab-4a2a-85cb-dc91b1e8cdad',
                tenantId: '4d3bc222-807f-45f9-8c2f-cc586bae75ca',
                tenantCode: 'zci0aqyb9rxsqptlsmobjs5lq1xm0hyup93bujhar9qonnkw6q',
                version: 'a',
                name: '8',
                environment: 'g',
                technology: 'SAPSCI',
                isActive: 'true',
                cancelledAt: '2020-11-04 04:03:01',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemIsActive has to be a boolean value');
            });
    });
    

    
    test(`/REST:POST cci/system - Got 400 Conflict, SystemTechnology has to be a enum option of WSO2, SAPPI, B2B, MULESOFT, SAPSCI`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                id: '9d59d33e-42ab-4a2a-85cb-dc91b1e8cdad',
                tenantId: '4d3bc222-807f-45f9-8c2f-cc586bae75ca',
                tenantCode: '1i99j8t67bq4r11whlm9ss914orazua9iyow4690cyhq9fzrto',
                version: 'g',
                name: 'v',
                environment: '4',
                technology: 'XXXX',
                isActive: true,
                cancelledAt: '2020-11-04 18:51:35',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTechnology has to be any of this options: WSO2, SAPPI, B2B, MULESOFT, SAPSCI');
            });
    });
    

    
    test(`/REST:POST cci/system - Got 400 Conflict, SystemCancelledAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                id: '9d59d33e-42ab-4a2a-85cb-dc91b1e8cdad',
                tenantId: '4d3bc222-807f-45f9-8c2f-cc586bae75ca',
                tenantCode: '01sforhhhu7ntw1mfvx2042hpj7huvxdwmu9veh1384g5qxjmw',
                version: '5',
                name: '4',
                environment: 'b',
                technology: 'MULESOFT',
                isActive: false,
                cancelledAt: 'XXXXXXXX',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemCancelledAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST cci/system`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/system')
            .set('Accept', 'application/json')
            .send({
                id: '9d59d33e-42ab-4a2a-85cb-dc91b1e8cdad',
                tenantId: '4d3bc222-807f-45f9-8c2f-cc586bae75ca',
                tenantCode: 'ez4rjvjak4g7vuik67hmlkncuykm53ubxdg8b83ywetizrnb4w',
                version: 'f',
                name: '5',
                environment: 'm',
                technology: 'B2B',
                isActive: false,
                cancelledAt: '2020-11-04 11:33:32',
            })
            .expect(201);
    });

    test(`/REST:GET cci/systems/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/systems/paginate')
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

    test(`/REST:GET cci/system - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/system')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '746c0cd4-338b-41bf-b211-3939067ca529'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET cci/system`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/system')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '9d59d33e-42ab-4a2a-85cb-dc91b1e8cdad'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '9d59d33e-42ab-4a2a-85cb-dc91b1e8cdad'));
    });

    test(`/REST:GET cci/system/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/system/e1e652c2-aabe-4457-8a05-5f8aaea62960')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/system/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/system/9d59d33e-42ab-4a2a-85cb-dc91b1e8cdad')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '9d59d33e-42ab-4a2a-85cb-dc91b1e8cdad'));
    });

    test(`/REST:GET cci/systems`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/systems')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT cci/system - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/system')
            .set('Accept', 'application/json')
            .send({
                
                id: '13cde4fe-16a7-4ee5-89a7-39ac6276678a',
                tenantId: 'b8ad5fdb-c576-4dc9-9e76-6cc9bcdf8b4c',
                tenantCode: 'wyl6rizim3zmd69bzy21o6q7q0buypbvyxoy47l22wuji8krzl',
                version: '1',
                name: 'u',
                environment: 'u',
                technology: 'WSO2',
                isActive: false,
                cancelledAt: '2020-11-04 13:44:12',
            })
            .expect(404);
    });

    test(`/REST:PUT cci/system`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/system')
            .set('Accept', 'application/json')
            .send({
                
                id: '9d59d33e-42ab-4a2a-85cb-dc91b1e8cdad',
                tenantId: '4d3bc222-807f-45f9-8c2f-cc586bae75ca',
                tenantCode: '2a35cq5wklbg8im34e3rj2dduaywo5lx7huu0c49smldxffhi7',
                version: 'y',
                name: 'l',
                environment: 'l',
                technology: 'WSO2',
                isActive: false,
                cancelledAt: '2020-11-04 13:04:21',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '9d59d33e-42ab-4a2a-85cb-dc91b1e8cdad'));
    });

    test(`/REST:DELETE cci/system/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/system/e6198844-ddd3-41b1-9a18-93a96e6d7e38')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/system/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/system/9d59d33e-42ab-4a2a-85cb-dc91b1e8cdad')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL cciCreateSystem - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateSystemInput!)
                    {
                        cciCreateSystem (payload:$payload)
                        {   
                            id
                            tenantCode
                            version
                            name
                            environment
                            technology
                            isActive
                            cancelledAt
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

    test(`/GraphQL cciCreateSystem`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateSystemInput!)
                    {
                        cciCreateSystem (payload:$payload)
                        {   
                            id
                            tenantCode
                            version
                            name
                            environment
                            technology
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '72b733cc-6c8f-4018-aa04-6b59a821b965',
                        tenantId: '4d3bc222-807f-45f9-8c2f-cc586bae75ca',
                        tenantCode: '4nyalfw9d5gp7c0edon6t81vlzpgdx0fp6k3b90rbvfe76kcqe',
                        version: '1',
                        name: 'r',
                        environment: 'x',
                        technology: 'MULESOFT',
                        isActive: true,
                        cancelledAt: '2020-11-04 05:51:36',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateSystem).toHaveProperty('id', '72b733cc-6c8f-4018-aa04-6b59a821b965');
            });
    });

    test(`/GraphQL cciPaginateSystems`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        cciPaginateSystems (query:$query constraint:$constraint)
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
                expect(res.body.data.cciPaginateSystems.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateSystems.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateSystems.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL cciFindSystem - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindSystem (query:$query)
                        {   
                            id
                            tenantCode
                            version
                            name
                            environment
                            technology
                            isActive
                            cancelledAt
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
                            id: '5f82e43b-ad4f-44e1-8267-f1ed5351c063'
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

    test(`/GraphQL cciFindSystem`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindSystem (query:$query)
                        {   
                            id
                            tenantCode
                            version
                            name
                            environment
                            technology
                            isActive
                            cancelledAt
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
                            id: '9d59d33e-42ab-4a2a-85cb-dc91b1e8cdad'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindSystem.id).toStrictEqual('9d59d33e-42ab-4a2a-85cb-dc91b1e8cdad');
            });
    });

    test(`/GraphQL cciFindSystemById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindSystemById (id:$id)
                        {   
                            id
                            tenantCode
                            version
                            name
                            environment
                            technology
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '6f0b3fae-b458-4aae-bbe9-86e4b83971e9'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciFindSystemById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindSystemById (id:$id)
                        {   
                            id
                            tenantCode
                            version
                            name
                            environment
                            technology
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '9d59d33e-42ab-4a2a-85cb-dc91b1e8cdad'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindSystemById.id).toStrictEqual('9d59d33e-42ab-4a2a-85cb-dc91b1e8cdad');
            });
    });

    test(`/GraphQL cciGetSystems`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciGetSystems (query:$query)
                        {   
                            id
                            tenantCode
                            version
                            name
                            environment
                            technology
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.cciGetSystems.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL cciUpdateSystem - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateSystemInput!)
                    {
                        cciUpdateSystem (payload:$payload)
                        {   
                            id
                            tenantCode
                            version
                            name
                            environment
                            technology
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '6c47ac18-c0b7-4388-a707-f87bd662d6b9',
                        tenantId: '832f78ae-36f5-4731-90f2-165681d1024a',
                        tenantCode: '0ok0brcjyme8iye8cs3tygxeyt6vdezwpfa0lokvdgu20ft8bk',
                        version: 'a',
                        name: '1',
                        environment: 'r',
                        technology: 'WSO2',
                        isActive: false,
                        cancelledAt: '2020-11-04 18:56:20',
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

    test(`/GraphQL cciUpdateSystem`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateSystemInput!)
                    {
                        cciUpdateSystem (payload:$payload)
                        {   
                            id
                            tenantCode
                            version
                            name
                            environment
                            technology
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '9d59d33e-42ab-4a2a-85cb-dc91b1e8cdad',
                        tenantId: '4d3bc222-807f-45f9-8c2f-cc586bae75ca',
                        tenantCode: 'vvfxe9k4um3j5p00m64yooqdebg59la5ze5ra3vzkx4gronjsh',
                        version: '5',
                        name: 'z',
                        environment: 'i',
                        technology: 'MULESOFT',
                        isActive: true,
                        cancelledAt: '2020-11-04 17:20:55',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateSystem.id).toStrictEqual('9d59d33e-42ab-4a2a-85cb-dc91b1e8cdad');
            });
    });

    test(`/GraphQL cciDeleteSystemById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteSystemById (id:$id)
                        {   
                            id
                            tenantCode
                            version
                            name
                            environment
                            technology
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '392871bd-09f8-4e83-8324-dd677f9fd50d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciDeleteSystemById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteSystemById (id:$id)
                        {   
                            id
                            tenantCode
                            version
                            name
                            environment
                            technology
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '9d59d33e-42ab-4a2a-85cb-dc91b1e8cdad'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteSystemById.id).toStrictEqual('9d59d33e-42ab-4a2a-85cb-dc91b1e8cdad');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});