import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IRoleRepository } from '@hades/bplus-it-sappi/role/domain/role.repository';
import { MockRoleRepository } from '@hades/bplus-it-sappi/role/infrastructure/mock/mock-role.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('role', () => 
{
    let app: INestApplication;
    let repository: MockRoleRepository;
    
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
            .overrideProvider(IRoleRepository)
            .useClass(MockRoleRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockRoleRepository>module.get<IRoleRepository>(IRoleRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/role - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '5a020b84-7fe0-46ad-8f4f-364dca1fad6d',
                tenantCode: 'c2ihhl4ogr3gm9hwuy9ni0jbdj0zoqklin9gz7ns5vx2fxbe39',
                name: 'tcta2op6ksw3k0ixe4zhnog3l93r3qu8s8nb79l2fdkfx4e8i41d58z05uzvywgt1qiyok268vs3bnvrstfki2e6v4o9be9qdeokw72qi40dvbwklavpjagl3jbocl0lkwpebq22agm0b9gqljtk505hkpgzw02juyfw4t9pjgj10ennkj2l96han0qrzqd6m3ctfnubk5tviwtx6p5b3vwnh573pf938ub0yzqyps68zxshn9w8cz5j3fxehra',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '5a020b84-7fe0-46ad-8f4f-364dca1fad6d',
                tenantCode: '45nsyci3x6ljc5qzgf6sqk8odvk1jiss2k46r2mgnhlagevh2b',
                name: 'i0vjcvduw61kgaz5c6xor8ogypk6balelm84k87llp8cjibvt7iqtxb1pben7y8sgtogav8pl6roz2f9pu9ivu8nabekchdhnyafjqckogju50auzvcrm7rj1l89jsdohddqa6h7gcg9q2m8tt9v4ungvjb49w78pjk5yih25qtxyrzou3024c9etf452te4ie4ggokec30dladt58vce9cmh7lgt9u4vfa09t0j6zcqv2hhwdtb4bhvhl7egmi',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: '911e426a-e32e-49d5-a827-7fcf0ba40100',
                tenantId: null,
                tenantCode: '99xobdtp3bqhcflcli8p90hje8mgetz6roesevl5molt01ldzf',
                name: 'aqnso9ulimz0uu1maubpesg9z6phk4o72fghyo3bhg4gwl4gin2h2jlhfuzqvf7gpc0db6h37jn45dgzthxapnbn7ejyri3ihww2byr4w09en8hayaj1eqaqwgfbshz5ghxfxdm4ht03xw5s8edhqwyxuzouhzy95p7noxxrwe20j6dpdozu877lnn45z535j2kjafp352hoxdknkkj8ir8lqqsoao4lwlqn8yfa35xtodc88lqyw8whbzmysy8',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: '911e426a-e32e-49d5-a827-7fcf0ba40100',
                
                tenantCode: 'fbf0ohlq49ow4e0m4jhafmxu2dxbwf7x5uvgmcl1j3j2k7yb5p',
                name: '6nanxszttr4lvaoqg14spy1yscdu9kcir6tncvdnthrouf9a0zoe9xnn7djrvd0vqobuu7cjvno5iv60nynfxdu1noojl9wn19w3v3au9ol9iucv46begi4dyt2ie0p46h7xv1dqvcrkmstw41bpg5k362dw687ykqnntk1h9f78c6isuxgg4jvf37m3ee0tywk2swt3snns70u6difonxoya9ixwq18nzrvs3d9gbgi2p2o1rlhovh1r0ha9ab',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: '911e426a-e32e-49d5-a827-7fcf0ba40100',
                tenantId: '5a020b84-7fe0-46ad-8f4f-364dca1fad6d',
                tenantCode: null,
                name: 'nmkm9g62l1s968x7hcy3pxuhwjvjc20dpol6ucu2k9h9cxj7l7jmg2ufq63lm7k83flu3nlmkz2bhcatq8cmxzq3twvj1exliaxmsyi0rdcmx93f0tvoha0id0135jkdvoh7jl5ms3y1uykpbhjbr2iho2fb0h88t80do3qpy8fwy8eonw63nv5v3v99zlrmizbaz3vhzho48rjug8kin78mo9m00nweww4t5gaaush6odgatjnidydd52in0bo',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: '911e426a-e32e-49d5-a827-7fcf0ba40100',
                tenantId: '5a020b84-7fe0-46ad-8f4f-364dca1fad6d',
                
                name: '12pwh8vd3y60qll52dowr97yymgpgh992lkd8del8sdndx90fhto8esoxt36r2ch3ohahzd9mui3gw7xd4qxi2mggpsehubbyjoqhfjgozltv7vi9l8a5i5qpn1bsigqsubpwfylw22m7c89eux5q8avcx8vc5lm2d8ebqtekkyo3xtvx4or5w7o53i7p063oqap1yrdixycmxnh8fvp5crs04yu1deiljw2z4vhd3b594935vm66vv7bbswi0q',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: '911e426a-e32e-49d5-a827-7fcf0ba40100',
                tenantId: '5a020b84-7fe0-46ad-8f4f-364dca1fad6d',
                tenantCode: 'z2whdla6biz19xaw9m94hhotxv30slhsi9unghxcg030z3wxqn',
                name: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: '911e426a-e32e-49d5-a827-7fcf0ba40100',
                tenantId: '5a020b84-7fe0-46ad-8f4f-364dca1fad6d',
                tenantCode: 'ilidl85bta3drms1ugem81v49pwh04gxfkq0qjj2bvz3f6wedl',
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleName must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: '762dqiwkbzv12rwgwgiwxksoqkytdzggytjn8',
                tenantId: '5a020b84-7fe0-46ad-8f4f-364dca1fad6d',
                tenantCode: 'pa2ehlsr9veceaaeid1ykj5w65401gjt9wgyvddxk4yr0ec8wv',
                name: 'earc6htunv8v63i556e2yfgbu2d9rb8ez3rgv1ckxh0sust2no01to19wdciyhu5q6qymox3d6w0rgrqyob7pq9qgo81oj6ejcp9rk0mugnslypbd6so5sxkol97p3dcbmxmy29wjxtyy08xlmfjrhfv1hgbbvpdifdncwj0rld2n0zcwjjfhrl1uiiywnd2shjfnxrtu2mhggyre330cvcnw42ta4biz9s0ylo2iuhwqks5yarhydp0jn4gwzy',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: '911e426a-e32e-49d5-a827-7fcf0ba40100',
                tenantId: 'o200qnilcahypfjdbea4li0tjnzxkpxtzd4o1',
                tenantCode: 'qaskbofshkwz8n83fc630we6kaikaq0s37vrup9lukwze6mint',
                name: 'gp3sbb123sus1oouoalr144kjjtqoljuntbp4mvwy40casgbu0uda8cial1ayqp4locycvzdnpk6ry1kdduon9jxd1fv04mewrl3zqfy2dtbugy4sklkmeognclzydg7jjbasrkcrjyn3wsydqt9zn92z8q1jt7tcvw5dvbl18tnauj5v5sbnz7hojkszgb82izoi3kppl4ihoc6edbrva3xr7df3o3ui9hb3g9ym83v2oh9bac424v1q1bit7f',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleTenantId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: '911e426a-e32e-49d5-a827-7fcf0ba40100',
                tenantId: '5a020b84-7fe0-46ad-8f4f-364dca1fad6d',
                tenantCode: 's6xjc1x2a80swz7fkmsbldazr4wj41iytijxu0lek52gkfwrprn',
                name: 'cah3r0ktlazvqce95yui0tu1b7gr6t5uuhsvmnbjx62799ky0i732vog8xhcwu8xtpkb7p4qjermqq1yiyc4aa1wwfesdmkh9viwbek37nompwkpy7p30mafpz6shy19xh8fm1472w15iolcsaky6jy7jbuofvvitush02rjng2ns397k8v48zn7ex9if9lk91ddk7uhsoyuxexp3yws108nbmoz5ke1napmceur6eotqm4s6y31yd2a0ntq752',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: '911e426a-e32e-49d5-a827-7fcf0ba40100',
                tenantId: '5a020b84-7fe0-46ad-8f4f-364dca1fad6d',
                tenantCode: 'iracg7kpp0aapuhiukvdrooqp9nlpti135fsk8vvif2zrxyuhr',
                name: 'o4e28gjkeu86mvayf1xi6rg73ktfr32txfxa0is01bm8ya1tbh7hyqijhu2euvjzi8uxjbk1ch7n23nii3c4km73ijw5xoj5rps8j7yv4ygstydzvnosyw743irxhknmpinysu2tzbxq9foaxuozmmrtqahs8h7ewrmntkw3ntbwkdu8v734wpmrwwtroam19v3vylqnnfdi8qwbtq1htrm0ruht6jwk05f3pinp18jplesqm4yry5b2x9is8tcs',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleName is too large, has a maximum length of 255');
            });
    });
    

    

    
    
    

    

    

    

    test(`/REST:POST bplus-it-sappi/role`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: '911e426a-e32e-49d5-a827-7fcf0ba40100',
                tenantId: '5a020b84-7fe0-46ad-8f4f-364dca1fad6d',
                tenantCode: 'kx4jw6x586cbxvkyrog1bk3yy5vwds4vazf4e5osgekyt7k769',
                name: 'zuf5bkwell6s1cre9kx96oiezi31j33yzufnaue3ytyodpsyih2p83hj15uwu1xif37s8cbrdhmusdrq4s0j1sdo2y2yrafu3idrlantwtmsx5x68fq03xid52ykll4wpm70kvxnq2zj0k8f2fyi68nc3m1ifh36at6hfkoajji9cms96zjx1zc2hlosj4nanfbsmo5whkp2t0gs3xf1jy1c7kt6rglc2ekfkpdax7vm973qzi2v7m8ze87y16q',
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/roles/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/roles/paginate')
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

    test(`/REST:GET bplus-it-sappi/role - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/role')
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

    test(`/REST:GET bplus-it-sappi/role`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '911e426a-e32e-49d5-a827-7fcf0ba40100'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '911e426a-e32e-49d5-a827-7fcf0ba40100'));
    });

    test(`/REST:GET bplus-it-sappi/role/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/role/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/role/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/role/911e426a-e32e-49d5-a827-7fcf0ba40100')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '911e426a-e32e-49d5-a827-7fcf0ba40100'));
    });

    test(`/REST:GET bplus-it-sappi/roles`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/roles')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/role - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                
                id: '1a295391-e2f7-4a99-9d36-086374e5a7eb',
                tenantId: 'd1cc8716-035b-405f-b7c3-46a2542fee72',
                tenantCode: '6umx2h4dcu9ss1f7xqojgafgxdppf4iobgfp5ppr69z5bu0qqp',
                name: '0f8e2ylalq8j0ogo4fkkdood7007zdpho1iwlluk8wyrqluhdb6ucj282y0il04qrdue534h1y1qesxs95wqfh8qhsi2f2depzoyizs6eu1mfg1dry48iowe9h57zao2n5o3rvahwow8mn182iib66zl0xotp7t09o2b6ckg2n9un6tu97lws78h9lnltg3y5g9jnokmmw8an37fwb5n78f32t7fifklh53he5kafjzdttoxebiokl85iwntdst',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/role`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                
                id: '911e426a-e32e-49d5-a827-7fcf0ba40100',
                tenantId: '5a020b84-7fe0-46ad-8f4f-364dca1fad6d',
                tenantCode: 'dnve3bneywjm6m53zx26ewvjjeu44occu3ave6rj2v2e9t3957',
                name: 'vwkkjpb5c8q93rrj1xuqrji64kyzol68a6r6q6dam91sl2b51p5y4dloiy0kp1r503xzueqvbpdpcpop55gwj2uegl6kycszlgoc4ziez951johk53sdzb3tpyioc6bi13d0jyoui7lcj7pzo9c3edmgxhigkzluy02idzicumabfw7jtvlkzi0lykwwm6qijmweu7wolcbnw2kvsu65adg53rnz2hd8x0unjyabdfkobypl8iutnc0uavcbofc',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '911e426a-e32e-49d5-a827-7fcf0ba40100'));
    });

    test(`/REST:DELETE bplus-it-sappi/role/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/role/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/role/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/role/911e426a-e32e-49d5-a827-7fcf0ba40100')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateRole - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateRoleInput!)
                    {
                        bplusItSappiCreateRole (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            name
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

    test(`/GraphQL bplusItSappiCreateRole`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateRoleInput!)
                    {
                        bplusItSappiCreateRole (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'c9eef70b-6feb-43fa-a38f-3834302135b0',
                        tenantId: '5a020b84-7fe0-46ad-8f4f-364dca1fad6d',
                        tenantCode: 'ao3jwu8xbesju84g1wq8o9lowbfnw5x826nlt3xoicp9cybiw9',
                        name: 'qau1f4pi3d91ori886ywl5r64cwhuy8cqdnxzcpm6sliydb95nspz71x21f67eexfyhd1djutdepppb3q78jmkoe2flewr4i2wmuqwle9sppzne72eogag8pizokbsycufsejevefi4pb9yyjisksrl3dxx7nzc8ubwar4xyl6h889ds2xm9oyq6yc3cgv8xuujtp96uf825a642xrov9e2ybx997akoqjpqw7np0fu7uqo7t14z1r32jggqypk',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateRole).toHaveProperty('id', 'c9eef70b-6feb-43fa-a38f-3834302135b0');
            });
    });

    test(`/GraphQL bplusItSappiPaginateRoles`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateRoles (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateRoles.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateRoles.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateRoles.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindRole - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindRole (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            name
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

    test(`/GraphQL bplusItSappiFindRole`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindRole (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            name
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
                            value   : '911e426a-e32e-49d5-a827-7fcf0ba40100'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindRole.id).toStrictEqual('911e426a-e32e-49d5-a827-7fcf0ba40100');
            });
    });

    test(`/GraphQL bplusItSappiFindRoleById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindRoleById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            name
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

    test(`/GraphQL bplusItSappiFindRoleById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindRoleById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '911e426a-e32e-49d5-a827-7fcf0ba40100'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindRoleById.id).toStrictEqual('911e426a-e32e-49d5-a827-7fcf0ba40100');
            });
    });

    test(`/GraphQL bplusItSappiGetRoles`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetRoles (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetRoles.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateRole - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateRoleInput!)
                    {
                        bplusItSappiUpdateRole (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'bb3dc8c9-6c93-4749-af85-cb4a152d4919',
                        tenantId: '2d9cbe29-35e8-4b06-8b93-53aaf3da80cf',
                        tenantCode: 'vu6pdgdcdt0uwmvy5qf1da45ziqkcqeyurgx8a7r5bb7jc5whe',
                        name: 'tqgtg70h43kyy1g4y5q6rrvj8atcv5p8w1rrgftbcihtvrxfgun0set5012bgresbq2c2bzbff996ntmonyxukwew4gl5i7zkf31qtni4ky1l91sawxgwyo682u4t3poxur9wspf6mlbnk61k8qadmz7ap1z5yofjby98op5i4q2gbk2dc27rehbzvrtgdpuq1l32d94r9swzedqs4wbw8phsejudkzi2u4uwdq09280r4xbe21n9f3hilqtvwm',
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

    test(`/GraphQL bplusItSappiUpdateRole`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateRoleInput!)
                    {
                        bplusItSappiUpdateRole (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '911e426a-e32e-49d5-a827-7fcf0ba40100',
                        tenantId: '5a020b84-7fe0-46ad-8f4f-364dca1fad6d',
                        tenantCode: 'txpboamlvj15a35hmnpciwwixh6mvp6vdjuyw3am1x0n5i9y0j',
                        name: 'o4gcrfry85y25nrny9bzbm1tgmfyo5774tyvg2gu7bnggt81y8sy2stkez57ecjzkne19u71yggkchzn2p6709oopty8papy73h557bulqi1b4aphs4u7anvzxwkcffzzukddqtbljj2gqkf6ywgmek5evgfvpnadycr40ko3t0j0zoc7diqqj7ee8rym3f07mt4mlekharvazw8w4w9n1lrnb02mlereyq206sfv6z6unvnrrm53m7rvbxfgh5',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateRole.id).toStrictEqual('911e426a-e32e-49d5-a827-7fcf0ba40100');
            });
    });

    test(`/GraphQL bplusItSappiDeleteRoleById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteRoleById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            name
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

    test(`/GraphQL bplusItSappiDeleteRoleById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteRoleById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '911e426a-e32e-49d5-a827-7fcf0ba40100'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteRoleById.id).toStrictEqual('911e426a-e32e-49d5-a827-7fcf0ba40100');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});