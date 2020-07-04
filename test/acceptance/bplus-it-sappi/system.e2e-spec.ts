import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ISystemRepository } from '@hades/bplus-it-sappi/system/domain/system.repository';
import { MockSystemRepository } from '@hades/bplus-it-sappi/system/infrastructure/mock/mock-system.repository';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';

describe('system', () => 
{
    let app: INestApplication;
    let repository: MockSystemRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    BplusItSappiModule,
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

    it(`/REST:POST bplus-it-sappi/system - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    it(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: 'f1394b0d-77fb-4613-a343-1b6dd20aea71',
                name: 'zqrl5yppvmewk8qoky45',
                tenantCode: 'lix39uqwy4gnrq59peuj',
                environment: 'k48uivm4uk1ek3x5sw23',
                version: 'hq0mgn3lquo9zqqykvim',
                isActive: false,
                cancelledAt: '2020-06-26 05:50:36',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: 'f1394b0d-77fb-4613-a343-1b6dd20aea71',
                name: '6dczxa66pb3196xealxe',
                tenantCode: 'nlnfytejoyiua6ozmdu8',
                environment: 'uqv7iis08mugdkkjx3ga',
                version: '3eeddxucpx4pdt8anxqg',
                isActive: false,
                cancelledAt: '2020-06-26 09:25:24',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: 'f10700e8-add5-4be5-ad9f-3ab1fce72996',
                tenantId: null,
                name: 'hs6db1h7e2zsl4ii0b03',
                tenantCode: 'n2u2way43o8j5fp776wi',
                environment: 'elvp6oq2sicxa5a5nkf4',
                version: 'wgq80oja7tq93d2kjfpj',
                isActive: true,
                cancelledAt: '2020-06-26 10:29:06',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: 'f10700e8-add5-4be5-ad9f-3ab1fce72996',
                
                name: 'ulrlkemphnrgnsupwz1y',
                tenantCode: 'dvfsfjrlo7z20y20o3ex',
                environment: '5ubhu1w13lryb0cov0f9',
                version: 'aei1h64sy74xy23j1zhj',
                isActive: false,
                cancelledAt: '2020-06-26 06:37:44',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: 'f10700e8-add5-4be5-ad9f-3ab1fce72996',
                tenantId: 'f1394b0d-77fb-4613-a343-1b6dd20aea71',
                name: null,
                tenantCode: 'hpzkm5cnr9z92fikl1lh',
                environment: 'ic5aqzzl8bz6tdg3c5pv',
                version: '40ni3k25jzjo83adfif5',
                isActive: false,
                cancelledAt: '2020-06-26 07:04:59',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemName must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: 'f10700e8-add5-4be5-ad9f-3ab1fce72996',
                tenantId: 'f1394b0d-77fb-4613-a343-1b6dd20aea71',
                
                tenantCode: 'nd8aew2c28rewg8jnv5h',
                environment: 'b80to04u2i1g58ftd8tg',
                version: 'ns8eofg9ktmixizrmj03',
                isActive: true,
                cancelledAt: '2020-06-26 02:08:52',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemName must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: 'f10700e8-add5-4be5-ad9f-3ab1fce72996',
                tenantId: 'f1394b0d-77fb-4613-a343-1b6dd20aea71',
                name: 'e81gjz3ljygy74vrkrxs',
                tenantCode: null,
                environment: 'g71wj26qlh9sejvzgg7o',
                version: '4r1lt16rub2pwe79mk7w',
                isActive: true,
                cancelledAt: '2020-06-26 12:28:19',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantCode must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: 'f10700e8-add5-4be5-ad9f-3ab1fce72996',
                tenantId: 'f1394b0d-77fb-4613-a343-1b6dd20aea71',
                name: '5k4pdv5mwvhq95z6lhtp',
                
                environment: '5om1bawp2kcj2unxofl9',
                version: 'dbp2sspzd01twoyvaobo',
                isActive: true,
                cancelledAt: '2020-06-26 07:46:49',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantCode must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemEnvironment property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: 'f10700e8-add5-4be5-ad9f-3ab1fce72996',
                tenantId: 'f1394b0d-77fb-4613-a343-1b6dd20aea71',
                name: '2amk3h3506oswijw9ti1',
                tenantCode: 'fncgat53n8zb6dzjpqum',
                environment: null,
                version: 'vtg4x8l7noz6r9y51clt',
                isActive: true,
                cancelledAt: '2020-06-26 10:03:51',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemEnvironment must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemEnvironment property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: 'f10700e8-add5-4be5-ad9f-3ab1fce72996',
                tenantId: 'f1394b0d-77fb-4613-a343-1b6dd20aea71',
                name: 'vo1cr6zhhejla1ny62xm',
                tenantCode: 'lixe6e59qimf1zu7wfxw',
                
                version: '0od6un5859tgnbxsvnpe',
                isActive: false,
                cancelledAt: '2020-06-26 04:29:51',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemEnvironment must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemVersion property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: 'f10700e8-add5-4be5-ad9f-3ab1fce72996',
                tenantId: 'f1394b0d-77fb-4613-a343-1b6dd20aea71',
                name: '4cktvmaf3mefmlq9obav',
                tenantCode: 'jhwow9369djo5yq0p8kg',
                environment: 's7sxtqac43w6gug8y2fu',
                version: null,
                isActive: true,
                cancelledAt: '2020-06-26 16:35:03',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemVersion must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemVersion property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: 'f10700e8-add5-4be5-ad9f-3ab1fce72996',
                tenantId: 'f1394b0d-77fb-4613-a343-1b6dd20aea71',
                name: 'ou2t9m2vb9fr8nr6vlqy',
                tenantCode: 'hbl2zr349dds37zeh8n5',
                environment: 'jzkdhk4qwf5w0yzgbogg',
                
                isActive: true,
                cancelledAt: '2020-06-26 11:57:36',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemVersion must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: 'f10700e8-add5-4be5-ad9f-3ab1fce72996',
                tenantId: 'f1394b0d-77fb-4613-a343-1b6dd20aea71',
                name: '3phkbgljeopg50bdasbl',
                tenantCode: 'b59r54zq9dgwtaou1250',
                environment: 'vgday908otpzgjwzzj1c',
                version: 'q6h9pewolokslbak7tz8',
                isActive: null,
                cancelledAt: '2020-06-26 03:09:10',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemIsActive must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemIsActive property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: 'f10700e8-add5-4be5-ad9f-3ab1fce72996',
                tenantId: 'f1394b0d-77fb-4613-a343-1b6dd20aea71',
                name: 'go7grt63fz3n7zjva3z1',
                tenantCode: 'jj72dnayzdv083byruzb',
                environment: 's1t7x79rjqkba7g15gv3',
                version: 'omddslgx7pn6s2n0edae',
                
                cancelledAt: '2020-06-26 10:25:14',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemIsActive must be defined, can not be undefined');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: 'ic10ahm1uxkqaxyk9hh7bp7l9dy574sogakjv',
                tenantId: 'f1394b0d-77fb-4613-a343-1b6dd20aea71',
                name: 'orrbnxbjnj3nf5lzsri1',
                tenantCode: 'sx9w7i8ywbhogmqdtgto',
                environment: 'ztdxy8nuf8uqswcy5fan',
                version: '8rhup1adnye1ozxr62ce',
                isActive: true,
                cancelledAt: '2020-06-26 00:12:25',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: 'f10700e8-add5-4be5-ad9f-3ab1fce72996',
                tenantId: 'uht50akmkyi3qair0ympg442t2ixs2wnrwj9c',
                name: '295mwp95oftzt2snlmwg',
                tenantCode: 'xiyl7iljfkowq19287y8',
                environment: 'sde4jq8ay8dgnvu9ujm0',
                version: '3dp63k1zs1fug0q8bu5w',
                isActive: true,
                cancelledAt: '2020-06-26 16:47:50',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantId is not allowed, must be a length of 36');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: 'f10700e8-add5-4be5-ad9f-3ab1fce72996',
                tenantId: 'f1394b0d-77fb-4613-a343-1b6dd20aea71',
                name: 'tjnth66pdtp7oulnqw5et',
                tenantCode: '7c83wyg38jmhmolio5re',
                environment: 'qh2l0xf687n48h7bfqnk',
                version: 'kqwi1rvlhxkjlxf3wyvg',
                isActive: true,
                cancelledAt: '2020-06-26 15:06:01',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemName is too large, has a maximum length of 20');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemTenantCode is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: 'f10700e8-add5-4be5-ad9f-3ab1fce72996',
                tenantId: 'f1394b0d-77fb-4613-a343-1b6dd20aea71',
                name: 'e371gcldmf9stjtq3ve9',
                tenantCode: 'hsmbkb4abusimz3z28o09',
                environment: 'g8a1putj7thbvife2iho',
                version: 'w69vm4uj7xoil06mj68w',
                isActive: false,
                cancelledAt: '2020-06-26 08:02:41',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantCode is too large, has a maximum length of 20');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemEnvironment is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: 'f10700e8-add5-4be5-ad9f-3ab1fce72996',
                tenantId: 'f1394b0d-77fb-4613-a343-1b6dd20aea71',
                name: 'hd66yx7zb13loh9bmut8',
                tenantCode: 'jwvkgw2awjzl0gxvswen',
                environment: 'aa6wfzl5r37ubmxndpq23',
                version: 'kdvmv91s33ml1eddfgat',
                isActive: false,
                cancelledAt: '2020-06-26 06:34:10',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemEnvironment is too large, has a maximum length of 20');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemVersion is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: 'f10700e8-add5-4be5-ad9f-3ab1fce72996',
                tenantId: 'f1394b0d-77fb-4613-a343-1b6dd20aea71',
                name: 'mps0q6bzk5pdm27eerpx',
                tenantCode: 'vbl1z68p60mv7f1648ea',
                environment: 'muxs0796yfz5mgodnw0t',
                version: 'qygmy8utdg7oitz8w2ri6',
                isActive: false,
                cancelledAt: '2020-06-26 04:59:47',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemVersion is too large, has a maximum length of 20');
            });
    });
    

    

    

    
    it(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemIsActive has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: 'f10700e8-add5-4be5-ad9f-3ab1fce72996',
                tenantId: 'f1394b0d-77fb-4613-a343-1b6dd20aea71',
                name: 'nij3jt54dz3tw5nwtwa3',
                tenantCode: 'hqdbtwfq9jlwu8meksd4',
                environment: '3c7ao0a70zqs04kys406',
                version: 'zjgg0qv3ahbm5k8sm9ui',
                isActive: 'true',
                cancelledAt: '2020-06-25 23:06:02',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemIsActive has to be a boolean value');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemCancelledAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: 'f10700e8-add5-4be5-ad9f-3ab1fce72996',
                tenantId: 'f1394b0d-77fb-4613-a343-1b6dd20aea71',
                name: 'vrgo6bip27n2vorx6l0i',
                tenantCode: 'wj4ct6t3cme0c9rom1r7',
                environment: 'hxfwtzvwytwnhggmoxtf',
                version: 'wldm3imf1nmyj4a95iic',
                isActive: true,
                cancelledAt: 'XXXXXXXX',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemCancelledAt has to be a timestamp value');
            });
    });
    

    it(`/REST:POST bplus-it-sappi/system`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: 'f10700e8-add5-4be5-ad9f-3ab1fce72996',
                tenantId: 'f1394b0d-77fb-4613-a343-1b6dd20aea71',
                name: 'pl0y1ahaq4woymtiay9u',
                tenantCode: 'cgvvm4yrbzdlpi29hcj7',
                environment: 'glv8dr77fqniybw5jyqd',
                version: 'zto2kpeiq5b4mth4f5dn',
                isActive: true,
                cancelledAt: '2020-06-26 13:07:52',
            })
            .expect(201);
    });

    it(`/REST:GET bplus-it-sappi/systems/paginate`, () => 
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

    it(`/REST:GET bplus-it-sappi/system - Got 404 Not Found`, () => 
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
                        value   : '00000000-0000-0000-0000-000000000000'
                    }
                ]
            })
            .expect(404);
    });

    it(`/REST:GET bplus-it-sappi/system`, () => 
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
                        value   : 'f10700e8-add5-4be5-ad9f-3ab1fce72996'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'f10700e8-add5-4be5-ad9f-3ab1fce72996'));
    });

    it(`/REST:GET bplus-it-sappi/system/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/system/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:GET bplus-it-sappi/system/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/system/f10700e8-add5-4be5-ad9f-3ab1fce72996')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'f10700e8-add5-4be5-ad9f-3ab1fce72996'));
    });

    it(`/REST:GET bplus-it-sappi/systems`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/systems')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    it(`/REST:PUT bplus-it-sappi/system - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                
                id: 'c92c54a8-9615-4169-ab74-68e1388e1d35',
                tenantId: '25639ef7-6233-4c11-bc9b-7e9e2e5a080e',
                name: 'di8hv90lmesn3ue5gss0',
                tenantCode: '0zw6tbiw1x2x2ye0cwdv',
                environment: 'jd9qrc7xpb87jxfjrpr5',
                version: 'l3h5108s5xb6ubjvp2sx',
                isActive: true,
                cancelledAt: '2020-06-26 00:31:50',
            })
            .expect(404);
    });

    it(`/REST:PUT bplus-it-sappi/system`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                
                id: 'f10700e8-add5-4be5-ad9f-3ab1fce72996',
                tenantId: 'f1394b0d-77fb-4613-a343-1b6dd20aea71',
                name: 'lqai8sxzatjtyy1eu9cd',
                tenantCode: 'y1vyq7eoppxjb5r1gssh',
                environment: 'b3pfulisur8gdtvn892i',
                version: 'vd1a1fgtlz83sbkzwv8q',
                isActive: true,
                cancelledAt: '2020-06-26 02:39:21',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'f10700e8-add5-4be5-ad9f-3ab1fce72996'));
    });

    it(`/REST:DELETE bplus-it-sappi/system/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/system/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:DELETE bplus-it-sappi/system/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/system/f10700e8-add5-4be5-ad9f-3ab1fce72996')
            .set('Accept', 'application/json')
            .expect(200);
    });

    it(`/GraphQL bplusItSappiCreateSystem - Got 409 Conflict, item already exist in database`, () => 
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
                            name
                            tenantCode
                            environment
                            version
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

    it(`/GraphQL bplusItSappiCreateSystem`, () => 
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
                            name
                            tenantCode
                            environment
                            version
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'cad6480d-191a-42b5-b475-ce6a4ee20234',
                        tenantId: 'f1394b0d-77fb-4613-a343-1b6dd20aea71',
                        name: 'kw16eddvh14hbnico7bs',
                        tenantCode: 'z7gx274zjx21ep012g08',
                        environment: '01w83gi7foycusapu9pt',
                        version: 'nitpf61eu4zwwn8u3fzj',
                        isActive: false,
                        cancelledAt: '2020-06-26 04:38:27',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateSystem).toHaveProperty('id', 'cad6480d-191a-42b5-b475-ce6a4ee20234');
            });
    });

    it(`/GraphQL bplusItSappiPaginateSystems`, () => 
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

    it(`/GraphQL bplusItSappiFindSystem - Got 404 Not Found`, () => 
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
                            name
                            tenantCode
                            environment
                            version
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

    it(`/GraphQL bplusItSappiFindSystem`, () => 
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
                            name
                            tenantCode
                            environment
                            version
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
                            value   : 'f10700e8-add5-4be5-ad9f-3ab1fce72996'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindSystem.id).toStrictEqual('f10700e8-add5-4be5-ad9f-3ab1fce72996');
            });
    });

    it(`/GraphQL bplusItSappiFindSystemById - Got 404 Not Found`, () => 
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
                            name
                            tenantCode
                            environment
                            version
                            isActive
                            cancelledAt
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

    it(`/GraphQL bplusItSappiFindSystemById`, () => 
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
                            name
                            tenantCode
                            environment
                            version
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'f10700e8-add5-4be5-ad9f-3ab1fce72996'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindSystemById.id).toStrictEqual('f10700e8-add5-4be5-ad9f-3ab1fce72996');
            });
    });

    it(`/GraphQL bplusItSappiGetSystems`, () => 
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
                            name
                            tenantCode
                            environment
                            version
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

    it(`/GraphQL bplusItSappiUpdateSystem - Got 404 Not Found`, () => 
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
                            name
                            tenantCode
                            environment
                            version
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '23bdb471-cbf8-4c0c-8ec2-a30691dae0ed',
                        tenantId: '337a2230-5a70-4808-b5ce-2e5424b1192a',
                        name: 'e67cwb72t7clu4eupn4u',
                        tenantCode: 'ms8iyi32m7stwia8pk7t',
                        environment: '1t095vyz4tdrl360elts',
                        version: 'xbs45pzgkxyw6ixymndz',
                        isActive: true,
                        cancelledAt: '2020-06-26 09:54:29',
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

    it(`/GraphQL bplusItSappiUpdateSystem`, () => 
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
                            name
                            tenantCode
                            environment
                            version
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'f10700e8-add5-4be5-ad9f-3ab1fce72996',
                        tenantId: 'f1394b0d-77fb-4613-a343-1b6dd20aea71',
                        name: 'zcnqhrf25p67aao89cvp',
                        tenantCode: 'muiuus7wour4hn2w8y06',
                        environment: 'b71j6da1w502a98jzyiu',
                        version: 'pv72p1g3u3lfmj1fpfdr',
                        isActive: false,
                        cancelledAt: '2020-06-26 05:49:29',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateSystem.id).toStrictEqual('f10700e8-add5-4be5-ad9f-3ab1fce72996');
            });
    });

    it(`/GraphQL bplusItSappiDeleteSystemById - Got 404 Not Found`, () => 
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
                            name
                            tenantCode
                            environment
                            version
                            isActive
                            cancelledAt
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

    it(`/GraphQL bplusItSappiDeleteSystemById`, () => 
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
                            name
                            tenantCode
                            environment
                            version
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'f10700e8-add5-4be5-ad9f-3ab1fce72996'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteSystemById.id).toStrictEqual('f10700e8-add5-4be5-ad9f-3ab1fce72996');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});