import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAccountRepository } from '@hades/iam/account/domain/account.repository';
import { MockAccountRepository } from '@hades/iam/account/infrastructure/mock/mock-account.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { IamModule } from './../../../src/apps/iam/iam.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('account', () =>
{
    let app: INestApplication;
    let repository: MockAccountRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    IamModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
                            models: [],
                        })
                    })
                ]
            })
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockAccountRepository>module.get<IAccountRepository>(IAccountRepository);

        await app.init();
    });

    test(`/REST:POST iam/account - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST iam/account - Got 400 Conflict, AccountId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: null,
                type: 'USER',
                email: 'op0udy8r7t7pewcsxk53l6xict8t6iguo3eyacjsn75toplkj14gpia0g58l7cvyerpcmn0q87e0dg7gs8sb6kj72c2w1kcsh37bc0x3r3wzepcxddor1qbp',
                isActive: false,
                clientId: '0bec85f7-356c-4b0c-9343-84f6b60960f5',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountId must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                
                type: 'USER',
                email: '3wpwoesy27v5wgjgbcdbyvdb7w1klnby5sdys1w829qghhtz3cep7xm4ss6k96kxtd0amjbn9y0rqo0h5705z4gmtdso4z2rt484vd0umu57qyw0c5fx4r7e',
                isActive: false,
                clientId: '0bec85f7-356c-4b0c-9343-84f6b60960f5',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/account - Got 400 Conflict, AccountType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '7587d893-0ac2-4ef2-83e1-c35b2f3fd213',
                type: null,
                email: 'oofmd4pu38j6lhkvotcgnxes9dffi5x0rgx10z1w9p9asmapqudok3ydeqmgm9k6ijzyyvzjaw6gxkjflhwgjqrt0jpvzup5azgqiak1117u6axwlnezr39s',
                isActive: true,
                clientId: '0bec85f7-356c-4b0c-9343-84f6b60960f5',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountType must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '7587d893-0ac2-4ef2-83e1-c35b2f3fd213',
                
                email: 'gzfgfolqg61vy1g1crompu4mv7uhg2wp4s42bfmv0xt8qkbvmz7eksnw49gc2wze0y3ac16xdbzjq0ljp1shtm2pbaz2w8jnzesap7362rskhsyet4lv3y31',
                isActive: true,
                clientId: '0bec85f7-356c-4b0c-9343-84f6b60960f5',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountType must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/account - Got 400 Conflict, AccountEmail property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '7587d893-0ac2-4ef2-83e1-c35b2f3fd213',
                type: 'USER',
                email: null,
                isActive: false,
                clientId: '0bec85f7-356c-4b0c-9343-84f6b60960f5',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountEmail must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountEmail property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '7587d893-0ac2-4ef2-83e1-c35b2f3fd213',
                type: 'USER',
                
                isActive: false,
                clientId: '0bec85f7-356c-4b0c-9343-84f6b60960f5',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountEmail must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/account - Got 400 Conflict, AccountIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '7587d893-0ac2-4ef2-83e1-c35b2f3fd213',
                type: 'USER',
                email: '2tkuzk6zhmbj48eipyulzeesetelvzxj73hrlkdzoax2gncpdflfj8mmwms2jg33f464z5bsqayr9pmgmrlivt17yn9bgwinbqvgc8klrpfw153yxjdju524',
                isActive: null,
                clientId: '0bec85f7-356c-4b0c-9343-84f6b60960f5',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountIsActive must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountIsActive property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '7587d893-0ac2-4ef2-83e1-c35b2f3fd213',
                type: 'USER',
                email: '2jpcwdcpkmmr1y7btkvvj404d3lahz6psw4qvs06i8y6oowdlgrgmxd2rebzsvcernp32cek9pxue6hpzq39p62dnkti7yclzm1r2o13cazmcmio1gs2pq6h',
                
                clientId: '0bec85f7-356c-4b0c-9343-84f6b60960f5',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountIsActive must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/account - Got 400 Conflict, AccountClientId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '7587d893-0ac2-4ef2-83e1-c35b2f3fd213',
                type: 'SERVICE',
                email: 'k34fu4hcz28oqeqnvhx7hxkssag2o0p5z8vwl9zi50601f0k2f6x9ymvs6zxuorshug2ju6kbbmc3b615jndpuomyjehmspvh8pml2auis02rqcq8qcn1zp4',
                isActive: false,
                clientId: null,
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountClientId must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountClientId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '7587d893-0ac2-4ef2-83e1-c35b2f3fd213',
                type: 'SERVICE',
                email: 'o85sr1yaub5sfabqlfudm7rzui3fgzulohlpijp4qt3ruvq3w9fr07posztsvo4wehpr6dwh5cr90ddclxz1fdbwl3cxlownnna42h97ptaa2utvthqogtqt',
                isActive: true,
                
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountClientId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/account - Got 400 Conflict, AccountDApplicationCodes property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '7587d893-0ac2-4ef2-83e1-c35b2f3fd213',
                type: 'USER',
                email: 'ogu3bpcerq9s3cnb272229cp81zw6w9uc1r2t2yr1t0alb0bh2ie051g163jwimmw5x9wepypndxh47xcmmoe95qrgbl4dte4h9dz0db5peuzxozll9u0w46',
                isActive: false,
                clientId: '0bec85f7-356c-4b0c-9343-84f6b60960f5',
                dApplicationCodes: null,
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountDApplicationCodes must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountDApplicationCodes property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '7587d893-0ac2-4ef2-83e1-c35b2f3fd213',
                type: 'USER',
                email: 'jcvglzpcsch4ns1ktj6jlrsdg0wjordpag07pp8ogpoyq6dw4xldy5l8k9ffs25kr3m5gq2a3w6z7kcbj06abn1ylafh5wn062v7ym5br61ol2zme8rr74vq',
                isActive: false,
                clientId: '0bec85f7-356c-4b0c-9343-84f6b60960f5',
                
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountDApplicationCodes must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/account - Got 400 Conflict, AccountDPermissions property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '7587d893-0ac2-4ef2-83e1-c35b2f3fd213',
                type: 'USER',
                email: 'jzwchp3jvhvjs9naek8sqeea8ab4eo4v5hd7i1qfgltcbv52d6afiytdz7ww42761xmihcz77io8ut4poabtlau6bt6oesh5fkov8dbvtq9eq5e0jqbkfrae',
                isActive: true,
                clientId: '0bec85f7-356c-4b0c-9343-84f6b60960f5',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: null,
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountDPermissions must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountDPermissions property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '7587d893-0ac2-4ef2-83e1-c35b2f3fd213',
                type: 'SERVICE',
                email: '3r8pyw5r093naa2esoszi7d5r42b3x9h4lyhxkjkavgquiqzfsguwbrog9d2te4dkxpsv41vpan9iz4cmlgyax1kyng4axa7dzilmheon2o9k9msn1yoe1kj',
                isActive: true,
                clientId: '0bec85f7-356c-4b0c-9343-84f6b60960f5',
                dApplicationCodes: { "foo" : "bar" },
                
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountDPermissions must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/account - Got 400 Conflict, AccountDTenants property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '7587d893-0ac2-4ef2-83e1-c35b2f3fd213',
                type: 'SERVICE',
                email: 'yhelukc1442b0pwkv4n0fg7bqwbooxdj422n5ge0mfxm2wkmg1ttw83tl6txld4kfs1u1uyn2w01jh224bja2ytgk9risvphosuyho69ed4wdtbozu5lt9hm',
                isActive: false,
                clientId: '0bec85f7-356c-4b0c-9343-84f6b60960f5',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: null,
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountDTenants must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountDTenants property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '7587d893-0ac2-4ef2-83e1-c35b2f3fd213',
                type: 'USER',
                email: 'ddrpazf5yfb5ydf0ihmra2rmervk7t0mc27ug8zvp0eakwrircke32iru0dxxjixbo7fgmilx2zbf1386lth790kvusxdwgea77jo052tr0xwaqsbnbf9x5t',
                isActive: true,
                clientId: '0bec85f7-356c-4b0c-9343-84f6b60960f5',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountDTenants must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST iam/account - Got 400 Conflict, AccountId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '6qjatshp3m3m1lz2rier002bvpeweljjhrbqh',
                type: 'USER',
                email: '2ai2owaw11gpd58rx5bt0gvfb0or7qctgm69hmr8ywjek1jihpw6aduquarndtl0abtcg1b2gfignrko1bnybexpytbpcr3ad4uzl8lelfe5f93ci4e8n1xg',
                isActive: false,
                clientId: '0bec85f7-356c-4b0c-9343-84f6b60960f5',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST iam/account - Got 400 Conflict, AccountClientId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '7587d893-0ac2-4ef2-83e1-c35b2f3fd213',
                type: 'SERVICE',
                email: '7f53zd8dyob0qzitodla486890082ylu92rjn9d8rcr4x9xdj9jtnku0chnl3yp0cfx7h3ct4jflotcx988in7bs4sli6eteeit82btio2d2cf5nthvjfw7j',
                isActive: false,
                clientId: 'n4mzw4zs62tslpmdqht7h4v1lw8gspsthv8gu',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountClientId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST iam/account - Got 400 Conflict, AccountEmail is too large, has a maximum length of 120`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '7587d893-0ac2-4ef2-83e1-c35b2f3fd213',
                type: 'USER',
                email: '16n891pieq16n4s2lwnmmcayj12kyn8fy42e9k56jx3ez8dyayly1x7653bxo15zjfjgfsw5arew2j0fao856l4po7sl8n85b8rwwami203ec09e6fw2ejlz5',
                isActive: false,
                clientId: '0bec85f7-356c-4b0c-9343-84f6b60960f5',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountEmail is too large, has a maximum length of 120');
            });
    });
    

    

    

    

    
    test(`/REST:POST iam/account - Got 400 Conflict, AccountIsActive has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '7587d893-0ac2-4ef2-83e1-c35b2f3fd213',
                type: 'USER',
                email: 'lyzgk4welnjtqr4zzoaq2ommtc2vinhkxhd7077uklz2j2ku2786l0aeb78fcyew75r05s1dg14q0w5y2bp59vtq6y3r46a4tqmrai643t3u1jcyuw52c4sl',
                isActive: 'true',
                clientId: '0bec85f7-356c-4b0c-9343-84f6b60960f5',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountIsActive has to be a boolean value');
            });
    });
    

    
    test(`/REST:POST iam/account - Got 400 Conflict, AccountType has to be a enum option of USER, SERVICE`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '7587d893-0ac2-4ef2-83e1-c35b2f3fd213',
                type: 'XXXX',
                email: 'uc3fhcojolmfiuegspq2xy7piw339c8lt4ka3zncdzr7rf6f0trepja7mh8ll7w8322dlzn97mry67cxc19hs4k4u0tp6kv2ivaudq33x72fspf72fv26wk3',
                isActive: false,
                clientId: '0bec85f7-356c-4b0c-9343-84f6b60960f5',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountType has to be any of this options: USER, SERVICE');
            });
    });
    

    

    test(`/REST:POST iam/account`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '7587d893-0ac2-4ef2-83e1-c35b2f3fd213',
                type: 'SERVICE',
                email: 'tku48143jxcq5wj4da03pa05d6d688v6lklr1k4ujw2n27r62j2h2wibeury95c4qjm7ub1mm4x3iu7g98f1lhrlnixz37whhqk8qi12emk0od68x1zg8f8t',
                isActive: false,
                clientId: '0bec85f7-356c-4b0c-9343-84f6b60960f5',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(201);
    });

    test(`/REST:GET iam/accounts/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/accounts/paginate')
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

    test(`/REST:GET iam/account - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/account')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'd0d0b2a4-e016-4569-9d94-7673ae73a99c'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET iam/account`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/account')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '7587d893-0ac2-4ef2-83e1-c35b2f3fd213'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '7587d893-0ac2-4ef2-83e1-c35b2f3fd213'));
    });

    test(`/REST:GET iam/account/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/account/14b287ba-7c15-4288-92ce-94eb952a8997')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET iam/account/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/account/7587d893-0ac2-4ef2-83e1-c35b2f3fd213')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '7587d893-0ac2-4ef2-83e1-c35b2f3fd213'));
    });

    test(`/REST:GET iam/accounts`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/accounts')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT iam/account - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/iam/account')
            .set('Accept', 'application/json')
            .send({
                
                id: '7176ea4f-efc9-44a8-8721-67719f008e72',
                type: 'SERVICE',
                email: '95ubne4ishu2z5041vweryi8qbr0r70elxcn6uoscsjsgtgny8o0z8irymm3s8umyo2aba8vw8m6snjfegq855wx6stuzou2grfo60bpq91v9td46budto34',
                isActive: false,
                clientId: '4f7576b8-3920-4c21-86b7-e3a9b0fbf98a',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(404);
    });

    test(`/REST:PUT iam/account`, () => 
    {
        return request(app.getHttpServer())
            .put('/iam/account')
            .set('Accept', 'application/json')
            .send({
                
                id: '7587d893-0ac2-4ef2-83e1-c35b2f3fd213',
                type: 'SERVICE',
                email: '03omfte2ijjjk6ibwq6bhq7oolmteargpl3p06ow671q6d2u3flzoadqjzrbslwwdr6aljl7moqqfthdofsv90ozt7amaf51xproe3nndtbcxfyhnp65nspf',
                isActive: false,
                clientId: '0bec85f7-356c-4b0c-9343-84f6b60960f5',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '7587d893-0ac2-4ef2-83e1-c35b2f3fd213'));
    });

    test(`/REST:DELETE iam/account/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/account/8303d79b-7453-4921-9e72-3d3c3803b09d')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE iam/account/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/account/7587d893-0ac2-4ef2-83e1-c35b2f3fd213')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL iamCreateAccount - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamCreateAccountInput!)
                    {
                        iamCreateAccount (payload:$payload)
                        {   
                            id
                            type
                            email
                            isActive
                            clientId
                            dApplicationCodes
                            dPermissions
                            dTenants
                            data
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

    test(`/GraphQL iamCreateAccount`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamCreateAccountInput!)
                    {
                        iamCreateAccount (payload:$payload)
                        {   
                            id
                            type
                            email
                            isActive
                            clientId
                            dApplicationCodes
                            dPermissions
                            dTenants
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '282952ac-f183-44aa-875b-f78cc8b98623',
                        type: 'USER',
                        email: 'xpbvopa78hi6ctbwe2xzjnenffelwtqrf889xtgrs1jkgr61w97ip0rgz4780la4hpyls4dtn5lxhgcwpt6k3pp48i0v2u97fj9h930t5sntms0zlmyiyo8z',
                        isActive: true,
                        clientId: '0bec85f7-356c-4b0c-9343-84f6b60960f5',
                        dApplicationCodes: { "foo" : "bar" },
                        dPermissions: { "foo" : "bar" },
                        dTenants: { "foo" : "bar" },
                        data: { "foo" : "bar" },
                        roleIds: [],
                        tenantIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreateAccount).toHaveProperty('id', '282952ac-f183-44aa-875b-f78cc8b98623');
            });
    });

    test(`/GraphQL iamPaginateAccounts`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        iamPaginateAccounts (query:$query constraint:$constraint)
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
                expect(res.body.data.iamPaginateAccounts.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginateAccounts.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginateAccounts.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL iamFindAccount - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindAccount (query:$query)
                        {   
                            id
                            type
                            email
                            isActive
                            clientId
                            dApplicationCodes
                            dPermissions
                            dTenants
                            data
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
                            id: '6aad0a89-be0a-4d48-ac1b-df7177d0b6b6'
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

    test(`/GraphQL iamFindAccount`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindAccount (query:$query)
                        {   
                            id
                            type
                            email
                            isActive
                            clientId
                            dApplicationCodes
                            dPermissions
                            dTenants
                            data
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
                            id: '7587d893-0ac2-4ef2-83e1-c35b2f3fd213'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindAccount.id).toStrictEqual('7587d893-0ac2-4ef2-83e1-c35b2f3fd213');
            });
    });

    test(`/GraphQL iamFindAccountById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        iamFindAccountById (id:$id)
                        {   
                            id
                            type
                            email
                            isActive
                            clientId
                            dApplicationCodes
                            dPermissions
                            dTenants
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '5da871ba-ef71-470a-8bc3-9041cbac8f49'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamFindAccountById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        iamFindAccountById (id:$id)
                        {   
                            id
                            type
                            email
                            isActive
                            clientId
                            dApplicationCodes
                            dPermissions
                            dTenants
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '7587d893-0ac2-4ef2-83e1-c35b2f3fd213'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindAccountById.id).toStrictEqual('7587d893-0ac2-4ef2-83e1-c35b2f3fd213');
            });
    });

    test(`/GraphQL iamGetAccounts`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamGetAccounts (query:$query)
                        {   
                            id
                            type
                            email
                            isActive
                            clientId
                            dApplicationCodes
                            dPermissions
                            dTenants
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.iamGetAccounts.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL iamUpdateAccount - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamUpdateAccountInput!)
                    {
                        iamUpdateAccount (payload:$payload)
                        {   
                            id
                            type
                            email
                            isActive
                            clientId
                            dApplicationCodes
                            dPermissions
                            dTenants
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '459137c8-f7e5-49e0-93d2-9ed398a3cfe9',
                        type: 'SERVICE',
                        email: '8axf4pgz7k768sbwg4xz9m24ek2mz72m7jr2wnuw5lwfzlaud1fq2mvvhnr37x2qid4etoh3u7h9q0csmlxf2la2db05xwqo4s6cewbuapb4bghitxxpu8i6',
                        isActive: false,
                        clientId: 'e683580e-3ba1-4256-acdc-2c42cd694b5d',
                        dApplicationCodes: { "foo" : "bar" },
                        dPermissions: { "foo" : "bar" },
                        dTenants: { "foo" : "bar" },
                        data: { "foo" : "bar" },
                        roleIds: [],
                        tenantIds: [],
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

    test(`/GraphQL iamUpdateAccount`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamUpdateAccountInput!)
                    {
                        iamUpdateAccount (payload:$payload)
                        {   
                            id
                            type
                            email
                            isActive
                            clientId
                            dApplicationCodes
                            dPermissions
                            dTenants
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '7587d893-0ac2-4ef2-83e1-c35b2f3fd213',
                        type: 'SERVICE',
                        email: 'z23c0ssip5kq2gzjcu1sk9osplex0guyntq5ihbjop9sgmc1md6r3mtylxg24sg5luuxfveuazprqr5nhdeg3kw1r1vhtmxn90jcgvqojzntx0nq5bddbpqu',
                        isActive: false,
                        clientId: '0bec85f7-356c-4b0c-9343-84f6b60960f5',
                        dApplicationCodes: { "foo" : "bar" },
                        dPermissions: { "foo" : "bar" },
                        dTenants: { "foo" : "bar" },
                        data: { "foo" : "bar" },
                        roleIds: [],
                        tenantIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdateAccount.id).toStrictEqual('7587d893-0ac2-4ef2-83e1-c35b2f3fd213');
            });
    });

    test(`/GraphQL iamDeleteAccountById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteAccountById (id:$id)
                        {   
                            id
                            type
                            email
                            isActive
                            clientId
                            dApplicationCodes
                            dPermissions
                            dTenants
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'c7c2a504-7928-46b9-9369-f853f7a5beb4'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamDeleteAccountById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteAccountById (id:$id)
                        {   
                            id
                            type
                            email
                            isActive
                            clientId
                            dApplicationCodes
                            dPermissions
                            dTenants
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '7587d893-0ac2-4ef2-83e1-c35b2f3fd213'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteAccountById.id).toStrictEqual('7587d893-0ac2-4ef2-83e1-c35b2f3fd213');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});