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
                tenantId: '9dedd47c-1e9b-4b60-ad3b-6c93b5ed9a9f',
                tenantCode: '7b0rw1htlkxjzic7fcojqc9yf2v9alios3io7ej0oevvh6ican',
                name: 'cfm907r0thwnamde6ltnoyf5ju0kawusqpvb4yb3pizl2ilteb18b2kqxx9fvmpktjv8yyybz0mvxfxt4z0g96zfp4c01mgowfzzl3wom56onr3plcx2521kzw02152595a6qmydgirkghn3dl66fomvbpspuus5o0jmarylreqzbeixc9w1dxyvdrjsjq2acn0dnk1wrenohnhb2sslotptgdl8yo79j1t9ipvs30drsor9xgg9chscpsrg724',
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
                
                tenantId: '9dedd47c-1e9b-4b60-ad3b-6c93b5ed9a9f',
                tenantCode: 'lxrz8hrw5qfjdamgwfl06ab9napydpgs4r97928tqlomwu76al',
                name: 'lqigxjarf3sfp1pd7kpgv8es429nhj35tke2zpo5cmlr94kn6zqthtq1fnqnptzao591opntptcob1qiwlbus5srylewb0bixo9v850fyrr32418mv2cl1tw7es59b6sfpes46oacvadpg2xvm2qqx85zu5mj1k6smk43ww4pj4jisrbatah91jhs3lxfdnkf5qnqtl2mzunohnschunlqozewqipg55u959jlcrzth1m57yhg2sygsn9xk5fva',
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
                id: '6f22b4b1-1899-4f82-8717-fafe9a72032b',
                tenantId: null,
                tenantCode: 'kniep4ggsoddlyqpcspr41qpuyinl5fxdsoedenezfon3qmuvp',
                name: 't0q7lgbojkn51v5kbmklx6txb64zp829vhvvvux2dzdi55at4wanspslft4r7bqcmfz7jrmfuc2pi0no4ugbsgwdfc8wjgk89zippn536n62purzdwlfxzhb1qys534cnyj0awzyi8dkslydqdy7b6gero65qcu40pbsdfys2ylnbxthmby10nohpiet38nflkypvpldorfp9j60abgpokuxpkrzf9jf294c1p67rc83lvmiacloq6nzp0z2lst',
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
                id: '6f22b4b1-1899-4f82-8717-fafe9a72032b',
                
                tenantCode: 's8ssu03z4ykadggfg5twyjjbpqm38h5hn60f7q80xyhcirdiqh',
                name: '67bwa1m9utn6wfakchmduoqyk4c0yegx8x2mqie8n85eod1ra3pozeyba6fjdsm1k3ym12bxt7hggbsr60r753v0ew4u1fx8hbvqxt2ckxadzkmxit9lg33qab8k02vp0upb35obglgo8e284a86itd7s9co6caclztaz6td47yf09quu1v9uutcm2olm86q1nppwe1eg3jkwvhm7elthi2p84gg7vrmxciim8r4ofwyg7ks47n3wgrz1xc1gzw',
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
                id: '6f22b4b1-1899-4f82-8717-fafe9a72032b',
                tenantId: '9dedd47c-1e9b-4b60-ad3b-6c93b5ed9a9f',
                tenantCode: null,
                name: 'hml20itjbnj0sb0dhzmetrgmbo53c2rd1ynjdptp3wedfjdq5y6isvtd94c58wbtihcoeqetcqxnpt2amc42y17vapypucugjpmepinz9qmab74xnsmw322y1ui1pg4o4grtxas5ygo29a4bm1jrs1bgdrq15xi9gulovm6m2e5shvouqm8y63zxoyjnb7yjq113h6xl5fy68msc1aj8bms7kvzqcd12nb6bia91171fb2r940w2e1yfjdre4xj',
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
                id: '6f22b4b1-1899-4f82-8717-fafe9a72032b',
                tenantId: '9dedd47c-1e9b-4b60-ad3b-6c93b5ed9a9f',
                
                name: 'cgtmghelgytduprbp3whi8yphm1swl1ias0ukdnezn9k19t33ntqpfrodop322kcutfxuq1n9iiiv4r6uphsevx7cot5yj0qqnbggolz5pm8xs9dzctcucvxfbqzzqj3zcnk90ltaifu02guakos4pvqdehn3x67kjuw6zap84pj3m7zqbhdz2m977txhbzrvublcpgvhjvp1ic8tzh90qm8wulpu3jhapvbz7eawe8qs7wra3n4i86o5r09gvd',
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
                id: '6f22b4b1-1899-4f82-8717-fafe9a72032b',
                tenantId: '9dedd47c-1e9b-4b60-ad3b-6c93b5ed9a9f',
                tenantCode: '00oykpxf8euen8bocevp7e3ozqosejv7pgeqa0i8vuqzziiom1',
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
                id: '6f22b4b1-1899-4f82-8717-fafe9a72032b',
                tenantId: '9dedd47c-1e9b-4b60-ad3b-6c93b5ed9a9f',
                tenantCode: 'kzwdkuubh80m58on7ukwp31tvs413ejk36cmp8ccvudzg8c817',
                
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
                id: 'indgvr8kze9f33zmjclxsx4v8or4w84daate1',
                tenantId: '9dedd47c-1e9b-4b60-ad3b-6c93b5ed9a9f',
                tenantCode: 'sgia7jomxlue2zmnt7imxjbt8qqnpv1jsjsoqgykfmq8kg3sea',
                name: 'ca4f09n1brivxthhyqbpgskbjc6n931qxw0m76mjehkffx9myllrdsjyuxkmelum4voumkcuo3aa5uuzrr0dxilaey52qgb5i3wb8nuzjkwa5hmmsl9oqajgs4efv0vulp2vglrxpbf1yoen3rax6oj4trum9r5djerbj9fp71dl5m7vkq23pyemo4luesrqswacxex87fgofkahyhojbqjgbnduld6auq1uhii8jhpf48r3gvydwi97lcqjohz',
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
                id: '6f22b4b1-1899-4f82-8717-fafe9a72032b',
                tenantId: 'ndayqbl4we6ovxzsjbptnvonzr9sm93x79aff',
                tenantCode: 'xlumumi4g8s5wbm10nd963oa6q4a92v2e2dyc0rz0lfkux9itw',
                name: 'zyuvsfcado4hu2ariheera4qiq047df0xxly810tiegitc96xhxszcshhnezxgitrpube1mkg7lg4zw2txamex0pmmoma99ca38j8w569sfs53w5dfg6qu47qzn6dm58r6p4x9wlchjri0axhpf7f7zte795q1k99s3psbmw4uue8qgp3zlbdeq9nyv00ptut0c7x5al3mhibs1j4kcytp8nqmr0x05wmo3i3zxt9ofpndv8ium8ao6czbanmgv',
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
                id: '6f22b4b1-1899-4f82-8717-fafe9a72032b',
                tenantId: '9dedd47c-1e9b-4b60-ad3b-6c93b5ed9a9f',
                tenantCode: 'xbfwipipzlqzxff9z1n6g5umwamaasmawt9ajwer47lor3tx65m',
                name: 'tdv6m6bwlrh4aqf7ulgv3a66asa4cbccdef6o3e45summ2x4impu1erxegupmckzy8eccn1yfoolr6y3puyflrinrp8ff0bgjzj93febk1rmmgdfjtb5xs4ktcjlt9ie1173dto8n9m1zf3pk7zozo3zgyo83gnpx4nfjqmf0flwrmrvc5t9xv4k57feowk69t3u9p6lj9x6wrap6u0lbyr7det53ywcbkn4abbb9tjhpt892hiaeo3za5qreod',
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
                id: '6f22b4b1-1899-4f82-8717-fafe9a72032b',
                tenantId: '9dedd47c-1e9b-4b60-ad3b-6c93b5ed9a9f',
                tenantCode: 'fypeqz18899aezy2ulhjupsq954jo7f4savin4qm19jx53nm1z',
                name: 'sizaku4ivl8xmjw9427tvq5alt7ly6ufduxx61ef694wdjdhlxwgb1uycbwkr11qq1jbicwkw9ekraoe1y0vwehaetaexxp46tape1rz19vk4sq1dc2pzy8m6jq151hlyv7djitj01vpphgdao8xludqy90fatfpl02zbv714lpuh92ty9988pdmcdct5y38jt1he7yvwdslg3kghajzs460tib6uao3jhh2la5s79l28ecpec1nbykxpmwbpam7',
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
                id: '6f22b4b1-1899-4f82-8717-fafe9a72032b',
                tenantId: '9dedd47c-1e9b-4b60-ad3b-6c93b5ed9a9f',
                tenantCode: 'dc89q5sch1fjyl626za3gvwxm27pwi8bxc1lm010lcafwmrjts',
                name: '6gfsa952tf4578oadkvm6na4531ev6tjkd0eigbc9aoinilh9k890y8si4jn93ugisjz85qsk0inxv9d0oj04dzcfejxi1w5llwhadaa702ushlrp1iere7y8ic04jbfuoopzok10030bpbh6qzs717m7of3oamlpi8mgn8wwemyk0o0niv244sn5ma5yygkhz77doahn0x15aue2uyh440mdd9v7d9mkdkrid9iswi3mzghwxa2a5kwnbajwhh',
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
                        value   : '6f22b4b1-1899-4f82-8717-fafe9a72032b'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '6f22b4b1-1899-4f82-8717-fafe9a72032b'));
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
            .get('/bplus-it-sappi/role/6f22b4b1-1899-4f82-8717-fafe9a72032b')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '6f22b4b1-1899-4f82-8717-fafe9a72032b'));
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
                
                id: 'b49aee36-97bb-4a64-99e0-f503c80155f0',
                tenantId: 'f422b6f8-27d9-41c9-ac17-b148c10007b6',
                tenantCode: 'nm6ae2izivchu1zkyprp69fknfko4ksum9e4giku1l1uzo2ayv',
                name: 'yd998sbjgkash5go58k2swxxzfnb9pzhsrdfl3mk0xzm20diwpr1cp1uhibld93h114gtavkqg42yo8qu6xszi9liv77ymepriufrvrzi9mhctp6pyciis1c53v3hly5yggmz211sex31cd81plz56f6wfduhkpq9uyo8y1g03t02del2zsg8yxf71t7uyg1ufimnzm9ss9r2rkuyz8sv92hpc5p7du5b0ymgow1vmj478ilre846m7wick84gi',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/role`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                
                id: '6f22b4b1-1899-4f82-8717-fafe9a72032b',
                tenantId: '9dedd47c-1e9b-4b60-ad3b-6c93b5ed9a9f',
                tenantCode: 'vl3iwx1nzhjks0t0v3bcrkv6ugtp5dkherm0lpoul22hl8t7ss',
                name: 'gpzjkgwu7iskif9n7uuwk1w27r078irforxm3uw2h49hcsg679m0kciz3986a38rlw6lta5zxa119aoq7bcins8zhs7ohayrfeyqcd2m4p7b9nrvty1et4pdxpidcd3lbjeltadzzgopv96zrrq4q57224jlpyuyjgfpr2xdwmnqn3zk8o48gwsore4ue9a9u28q106qrhhem0by7zhyltxnc2q04primdw5syxh1tytwshi0q5unngtejt9uca',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '6f22b4b1-1899-4f82-8717-fafe9a72032b'));
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
            .delete('/bplus-it-sappi/role/6f22b4b1-1899-4f82-8717-fafe9a72032b')
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
                        id: '12f58328-79ea-44bb-a910-b30305bb028b',
                        tenantId: '9dedd47c-1e9b-4b60-ad3b-6c93b5ed9a9f',
                        tenantCode: 'pe3v7a6crai4m392r8ktpzf2e9nnn4kfhaizbgcsm21lg6k16k',
                        name: 'cz3q985usqyg0pc2ywcax29j74owvp0pzrwfybhuv799xcvg2f8rvxghbarvik8wzmkkakdhc70neo2thb3u4f9tfnr269itu0yhyx59rr2vqf8tr7iznlaer06tdekfofx0rqodhaowgaa5zq7t4fbxdv2mfca84nktunhefbmz3cs22fhebtyyggvvh7hu1q8i25s63t1ju5qo0epdu3gsa5v1f8kzj66ivfk8r5v37nxat5bglawb141n5jd',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateRole).toHaveProperty('id', '12f58328-79ea-44bb-a910-b30305bb028b');
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
                            value   : '6f22b4b1-1899-4f82-8717-fafe9a72032b'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindRole.id).toStrictEqual('6f22b4b1-1899-4f82-8717-fafe9a72032b');
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
                    id: '6f22b4b1-1899-4f82-8717-fafe9a72032b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindRoleById.id).toStrictEqual('6f22b4b1-1899-4f82-8717-fafe9a72032b');
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
                        
                        id: '5802fece-c104-4223-8149-5fad4cd632cf',
                        tenantId: 'a2e29adc-d8e5-48c2-b5b6-5c0ae80aaa18',
                        tenantCode: '1jhtvbweod8rng7pn4zars64doexlfyvcf2x5rw9dh2uh2jq6h',
                        name: 's3zxgymr3pdnrnbuz9zayv2u2s726gxzjnczcywpwf1vm832p5lb0pz62o9nsk1hpwzx2x5tx8dotyado7gxhsgirv7f3b4l8zy7q01bgkoi474t7onc4a15nt9fufj2xo1kguzunjutzvwjef4665894acjjjrnqcdslp6jxm0sv4rm98lyqs3xqfwhd17v03u87bp982vlhpxmrl6raxrlqo58myqjwc6rmg50ksmaeu9c9ymfm9m278wqads',
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
                        
                        id: '6f22b4b1-1899-4f82-8717-fafe9a72032b',
                        tenantId: '9dedd47c-1e9b-4b60-ad3b-6c93b5ed9a9f',
                        tenantCode: '4hqoe5wok6x2gyt2rnwz6jo416n516oo5hz7zzd34oosjp67e3',
                        name: 'u0wngbj7ecrol3cdu92ycj9m0j9q8dzvr33w3x14dqgyhgvbbtoz0r7yowvwcnyrat4anu12l2l8pjm6c4podye70s65aluikno8ol2lx8am2vw1asr26w7s3ecf5na4udbqqkpbf0vzc8dmxsdhfgfci0iqxphixyfsr9g4twyjdttpp1ynfyo3kopj1ae1lf6tctejj08gvr8tcwzaxv7t5yx6cn5tr9i8g19uvpua5ls8z0jbuojh8ll9gqp',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateRole.id).toStrictEqual('6f22b4b1-1899-4f82-8717-fafe9a72032b');
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
                    id: '6f22b4b1-1899-4f82-8717-fafe9a72032b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteRoleById.id).toStrictEqual('6f22b4b1-1899-4f82-8717-fafe9a72032b');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});