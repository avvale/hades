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
                email: 'g7qcxr8qfmvq7m188w8wcawmc16ummfgo32nnqwliuqtufpnngkvwv058nd7t8rl92y2dgt4f3415kzd21hrn6ri8e1gacarracx0ihb35b73lk1v9q5itlw',
                isActive: false,
                clientId: '77a77557-5a1c-43ef-ae14-49f69136aa84',
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
                
                type: 'SERVICE',
                email: '4p7wrwfdmv311obg3pauf5vv5a230x9lzcn9m3htbb247ijtv692us4jms2cmn9os73y98c3d205sk5bqqko85amffsj0j9f26xzuzgrn7eea2yixbebnqsw',
                isActive: true,
                clientId: '77a77557-5a1c-43ef-ae14-49f69136aa84',
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
                id: 'd5dc5786-416a-4e9a-9ab8-360fa0c4cdfc',
                type: null,
                email: 'k4kblrztzbcgg7d5peih1fkkxvnelh3q0w3x90xazhkhvwk6jt6p6xdwcw1h6jgdoti7a4ca5kzm2qter9fipz219umcvkawrxsje8myb9qjxaousr1fpqar',
                isActive: false,
                clientId: '77a77557-5a1c-43ef-ae14-49f69136aa84',
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
                id: 'd5dc5786-416a-4e9a-9ab8-360fa0c4cdfc',
                
                email: '6qaem9povd5mrzf68c5bitnlt4jvs4jg7iy1oeh8topues3ud1vlgtwo9lt7c2fqwnelshb6l6dytrc40vggtshmy7gk994nxnhryf8g5rcmdlslmun77a69',
                isActive: false,
                clientId: '77a77557-5a1c-43ef-ae14-49f69136aa84',
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
                id: 'd5dc5786-416a-4e9a-9ab8-360fa0c4cdfc',
                type: 'SERVICE',
                email: null,
                isActive: false,
                clientId: '77a77557-5a1c-43ef-ae14-49f69136aa84',
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
                id: 'd5dc5786-416a-4e9a-9ab8-360fa0c4cdfc',
                type: 'SERVICE',
                
                isActive: false,
                clientId: '77a77557-5a1c-43ef-ae14-49f69136aa84',
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
                id: 'd5dc5786-416a-4e9a-9ab8-360fa0c4cdfc',
                type: 'USER',
                email: 't0vsiitg182efqc6f7macachc24kt3c7js7tivvr13yyb772z0mhcbfomls0eosk4y501am78xik18x8ww02heu4u38rtj7ilb6cn9aj3i6utdnbwmmo9iec',
                isActive: null,
                clientId: '77a77557-5a1c-43ef-ae14-49f69136aa84',
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
                id: 'd5dc5786-416a-4e9a-9ab8-360fa0c4cdfc',
                type: 'SERVICE',
                email: 'kbek9jj0ve5bh6e4h8cyvuv1b9ruec73edicfuwytwlf85bev9dkxk1j1o8e5aozwzoyb3uf8yumxqbq1mrzstxef65rhvaupx81pqoelyida0k0rdl4ote1',
                
                clientId: '77a77557-5a1c-43ef-ae14-49f69136aa84',
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
                id: 'd5dc5786-416a-4e9a-9ab8-360fa0c4cdfc',
                type: 'USER',
                email: 'mj838nlcnv7plspld8mvv03aumu21113dqts5z52mtfim4kavbyiyv2msjjrpvn7j1n8dt0rg3bquloywg94amoujgpnp9nhhg205sf747d3rjustqrjmwlh',
                isActive: true,
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
                id: 'd5dc5786-416a-4e9a-9ab8-360fa0c4cdfc',
                type: 'SERVICE',
                email: 'b55g3osh9yhyltbmxrjfar84yqasqsw22oe1cj3enx52j7njysj1d9hdc26x28es8rpq271y8tfw1psf5fhnoooh9agmvuipib2xv95qkvaev7ho4s36gr5t',
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
                id: 'd5dc5786-416a-4e9a-9ab8-360fa0c4cdfc',
                type: 'SERVICE',
                email: 'moau9j69qppef0uiyg3dpxlhb2d2gnphrmsnez94cfe5o54s6wfghvcns8pzt8vj8rvi91b9qi9dikocj4kv04rqq76blgho6eat660nc35m8uu5ofue7wxo',
                isActive: false,
                clientId: '77a77557-5a1c-43ef-ae14-49f69136aa84',
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
                id: 'd5dc5786-416a-4e9a-9ab8-360fa0c4cdfc',
                type: 'USER',
                email: 'uo2d2mqjq8d3ulnu590zrywzdjcn3w5nc7bafnsfuwa7jrp21sa77jgte4mirdtjdvp6nl99ynve5fwbx2cub85mfi7zvuhl4c62r4vwogwz1zgew1kcqw9o',
                isActive: false,
                clientId: '77a77557-5a1c-43ef-ae14-49f69136aa84',
                
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
                id: 'd5dc5786-416a-4e9a-9ab8-360fa0c4cdfc',
                type: 'USER',
                email: '0jiy9offln279dxz6a3ox93m2dmhmsessgdlsuc1qpex7572ytdngc4muvj3efg1jeesxiu0luuhmbsv9feke0q63wm9xerqndu6xbcz9xsdpj0yyoghpagb',
                isActive: false,
                clientId: '77a77557-5a1c-43ef-ae14-49f69136aa84',
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
                id: 'd5dc5786-416a-4e9a-9ab8-360fa0c4cdfc',
                type: 'SERVICE',
                email: 'lzed7xns8b83y0ioh2havpqesktxzjto3mqq33dchpbnoro4swjirlxni8tm6g9dtrmlqgenxsj6jez3j2nhy6xx557wlrqjzgulwagnlaoa80nn15ymamcf',
                isActive: false,
                clientId: '77a77557-5a1c-43ef-ae14-49f69136aa84',
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
                id: 'd5dc5786-416a-4e9a-9ab8-360fa0c4cdfc',
                type: 'USER',
                email: '3bod4jnv6s2yk97cwb7rr1yi2furm0pwb9a0pm5gqhvo4hq6tvd3i2jtvrxj9t5jqktnjm4g15i25fuj8dic5u3yo9fe6zhtpe068oskc4zmpv9dpbppszca',
                isActive: true,
                clientId: '77a77557-5a1c-43ef-ae14-49f69136aa84',
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
                id: 'd5dc5786-416a-4e9a-9ab8-360fa0c4cdfc',
                type: 'SERVICE',
                email: 'xc6blrbn0kf315bvazw1g2rp01xi8f3bju6wdmwkqflovwd73w1ng9v5r4xbwbs62nkbr0fiyetqqyvhkirdyuvz2jf7qnuoczgh659s2otzivfvs0ppk8lw',
                isActive: false,
                clientId: '77a77557-5a1c-43ef-ae14-49f69136aa84',
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
                id: 'oxy39zh61dwn6gbyroor17ojdy73mku68mpes',
                type: 'SERVICE',
                email: '4vpi2nfog77vwq1jwdh2pyrzxf89uo2t5pzgg5rhtkwa59167gta2y1utxivjws8cbqfkndu7ic7ceo6sqyvexdnd5dj8l544n9q80t6ir7brnbnw7gcp65n',
                isActive: false,
                clientId: '77a77557-5a1c-43ef-ae14-49f69136aa84',
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
                id: 'd5dc5786-416a-4e9a-9ab8-360fa0c4cdfc',
                type: 'SERVICE',
                email: 'mjiqc9sv0vm3hudjixapntjnwje7qj6xpbnyjxlj4xhtqtdaz7opod0dxmphc9bzfqzsq6lllgmfj12vqfsy26e83up3a2kd5fcykp7bibrue5g1ezp3jkxt',
                isActive: true,
                clientId: 'spz0k9dd0rk96idao40g086gg9sl2ngxs97ff',
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
                id: 'd5dc5786-416a-4e9a-9ab8-360fa0c4cdfc',
                type: 'USER',
                email: '8dtczpt6pmk03at2ppqqn2pdpu9rmwa170eo8hg1u1clrb6mzoabw2vsl840my205zx69yvzolg3fwjcybrc9szs9qvy791lcvppywtqtvo1jsbpm2mem3le6',
                isActive: true,
                clientId: '77a77557-5a1c-43ef-ae14-49f69136aa84',
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
                id: 'd5dc5786-416a-4e9a-9ab8-360fa0c4cdfc',
                type: 'USER',
                email: 'q16jl9i11y81e2ix2z9hb2rpygr9aotyl5t8yau1gjwiltafn95j9ff2egdthsql9d3y086875klts1j7lheiz4sftftjsm37axnwhinvmr617m94jqr6z2p',
                isActive: 'true',
                clientId: '77a77557-5a1c-43ef-ae14-49f69136aa84',
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
                id: 'd5dc5786-416a-4e9a-9ab8-360fa0c4cdfc',
                type: 'XXXX',
                email: 'fbe04418qmjjhhu84a9mpttf4g8t60jak6jdb5tqh2yfi5x6x9bc6himjq259lfji1dxr5tq5nxbvpxi2r4hgprfeiepnhaw6u30ctezexkr1obw7jc5ik8f',
                isActive: false,
                clientId: '77a77557-5a1c-43ef-ae14-49f69136aa84',
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
                id: 'd5dc5786-416a-4e9a-9ab8-360fa0c4cdfc',
                type: 'SERVICE',
                email: '7ront51tjgbcdjjriwfv7dt1c3sgwxlntyfcvbzpwhe0qsl67p7g9l74bczhjrnsa7stbwqfvzt7gd6nyy5q3yqkvc04bhf6halqavhqskg2b4ulylw4qlpi',
                isActive: true,
                clientId: '77a77557-5a1c-43ef-ae14-49f69136aa84',
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
                        id: 'ddeb2522-f007-413b-8711-d00af5032a18'
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
                        id: 'd5dc5786-416a-4e9a-9ab8-360fa0c4cdfc'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'd5dc5786-416a-4e9a-9ab8-360fa0c4cdfc'));
    });

    test(`/REST:GET iam/account/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/account/ed2b6a23-5285-4769-9eaa-1e1947899653')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET iam/account/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/account/d5dc5786-416a-4e9a-9ab8-360fa0c4cdfc')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'd5dc5786-416a-4e9a-9ab8-360fa0c4cdfc'));
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
                
                id: 'd53d7aa6-14a5-43e0-bb6a-b4f4263abc4e',
                type: 'USER',
                email: 'a1wwba5yj7lophedclpcr7tqblelsbsh6tweef45ylcjppeneb43opsc5vjhn6fep4v6oyabatocgxiwgo15kmrz5p9jqg753z886ydv31kkhn3592js3gw7',
                isActive: false,
                clientId: 'd0e4bff6-646a-44b0-9514-fe52aa17b175',
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
                
                id: 'd5dc5786-416a-4e9a-9ab8-360fa0c4cdfc',
                type: 'SERVICE',
                email: 'h0jla9w9txr3gkr90ujjbty2n1i96rmwlvrzhvpz7pjz0b4igo8mul7rh58ps12dwjjt91scd680djlsd6z74pankr3olu7t6zzd1tjma1pejcsix8ryxsvd',
                isActive: true,
                clientId: '77a77557-5a1c-43ef-ae14-49f69136aa84',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'd5dc5786-416a-4e9a-9ab8-360fa0c4cdfc'));
    });

    test(`/REST:DELETE iam/account/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/account/7d367911-a4be-41a9-8a10-5ae33b24f6b7')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE iam/account/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/account/d5dc5786-416a-4e9a-9ab8-360fa0c4cdfc')
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
                        id: 'd027b499-1f8c-467e-8ef1-57c497b22853',
                        type: 'USER',
                        email: 'noe8ta9dnzuajslv9fjlnsjt2w6sg6co425lv9vozdq5q6vmhfu327aa8oobuca6dd8zdj7mks0mhytoyzz2xkpjit7lweh7zypkz814oobzhhsq2o810sj1',
                        isActive: false,
                        clientId: '77a77557-5a1c-43ef-ae14-49f69136aa84',
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
                expect(res.body.data.iamCreateAccount).toHaveProperty('id', 'd027b499-1f8c-467e-8ef1-57c497b22853');
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
                            id: '623ed11e-fc7b-4451-af76-08d95a62cb1a'
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
                            id: 'd5dc5786-416a-4e9a-9ab8-360fa0c4cdfc'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindAccount.id).toStrictEqual('d5dc5786-416a-4e9a-9ab8-360fa0c4cdfc');
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
                    id: 'd937effb-c41d-4b5c-b182-9e162a120a41'
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
                    id: 'd5dc5786-416a-4e9a-9ab8-360fa0c4cdfc'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindAccountById.id).toStrictEqual('d5dc5786-416a-4e9a-9ab8-360fa0c4cdfc');
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
                        
                        id: '4e26609c-b38e-4741-8165-4a97e736a89b',
                        type: 'SERVICE',
                        email: '11fzomkbxq7pj4tf7crupg6tbs3wevwfd50y3lonapon8rx00ydy1pcclgqcdruc7ngna71lljy7trgs7ktj3yqqj269dclo03uo0kuvp3tzsj3blnq5wl18',
                        isActive: true,
                        clientId: 'ec16dc0d-874f-4d42-81b0-58de15966962',
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
                        
                        id: 'd5dc5786-416a-4e9a-9ab8-360fa0c4cdfc',
                        type: 'USER',
                        email: '15j0d6uo01dip4d341cwdsqrvniplihnrfje5soqd3swpir1peyqbyyh1f8jo6r13wxpdmpctihekgll57v5trr0qj0kzq7up9rk97mzro98vu77dnyl9jr7',
                        isActive: false,
                        clientId: '77a77557-5a1c-43ef-ae14-49f69136aa84',
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
                expect(res.body.data.iamUpdateAccount.id).toStrictEqual('d5dc5786-416a-4e9a-9ab8-360fa0c4cdfc');
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
                    id: '24b6ef93-3305-4c49-afd7-3874213e7f3a'
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
                    id: 'd5dc5786-416a-4e9a-9ab8-360fa0c4cdfc'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteAccountById.id).toStrictEqual('d5dc5786-416a-4e9a-9ab8-360fa0c4cdfc');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});