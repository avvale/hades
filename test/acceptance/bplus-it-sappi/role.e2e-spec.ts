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
                tenantId: 'f1956da6-5a04-4877-8a26-0b40ceac824b',
                tenantCode: 'c30c1y7qm1ft1yeqmyqt640a7zuqhagly6jfrn9tzpmbkuo42l',
                name: 'k6k5n5c0d2u8acc6xv5slcthoqsaubslsxxno09kr0zbk1prowengi1dy9l7wap0mus2s5ospawjlxb3q2tt2v656gul6swjiwpyrfny64k6gkjcr819ys5x6yu24ret33vrn8xcl8lszszl6h7rsuzfwu2bfc5tt34cb1n8dicdk1zxh9lht52q8lxivlh33rhf3pf2iazorwrvh8zqmxtohx8gv39w2p1nrfco9h5uynm7wypw7mqpt61uoik',
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
                
                tenantId: 'f1956da6-5a04-4877-8a26-0b40ceac824b',
                tenantCode: 'qugaaumdem9qrdnp27w1pno8krpwxlc35rf7mtz02ujp5fhgz1',
                name: 'bfacoiovq38jfufx2vys2wl2vraw8cgelndelg1a4o6t2jdih7unnjrpcxi471wbzrewtppukg2iyo00j917fnuntmdi52kr0ze0wgu2yaf3mfd1ctbej74uxjwc3tt0j01fy64et5i3s2i3g2dz4pam1nrhdncd1mun7pxwyhhbe513y9vfiqw3rycl5ohcduc46g94te5k19p6308r9il51qezxnf3ukklm3x6gnnerphzmo5wmbgqyx1fjq2',
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
                id: 'fcd0786f-2071-4bbb-9ced-eb4238e3d895',
                tenantId: null,
                tenantCode: 'awp5457ufg3imy3v6oe0nix9diu3fvbr0y2mqm8u0dfb5aqkgw',
                name: 'tk3cfomnx3ow1nh73g1i3j3ca7nvev2matehhtr4harsvmfn0rvj4tc0qo1ekszrd0qhoevdz8m3ehxw6wfl877nqja27io45sgmeemppdiebpe3d707jq3rbze3cy5m9y6m772dqvoy1lpj9810my2540tgawrw450bppyv7j1zkclgon0r2e79mo5fr4octbodwgu2wwlg77cpupl595b6vtymcrpyy0z3md6in9h9cfyk35l8kfd3ib51pmb',
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
                id: 'fcd0786f-2071-4bbb-9ced-eb4238e3d895',
                
                tenantCode: 'djxi9pxobm1a2lg1mcswub6aki8lm9g2stkbptbdnh1d1ns8dn',
                name: 'x5s72wk0eretf5utxup6w6402hkcqk9hncqpnmgnxcjrlkmxo3npgifaafydgeczlqvr1t3a4ell8gjjbilyxrrwvgimsk99mow9xmwh4bw2wcqtfbrm8n6eoz5tuao9u7pvxhyrxvzubgtsvhln8nkz9aar96jli4qm59w69tj11yvpadi2yiwsdm65fn0muv7wa1b7llue1bd561pnghim7ul7pub341ks300730cqqfirmkclrvagya2snhs',
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
                id: 'fcd0786f-2071-4bbb-9ced-eb4238e3d895',
                tenantId: 'f1956da6-5a04-4877-8a26-0b40ceac824b',
                tenantCode: null,
                name: 'p73kh6ji9d23c2no8ppiywzey6odfdiccvgkvllse95pyl0hk3vdfvegkch3eeccmcfwbnd6b6d8a90cl165qqiww14cyqls1mexx2wbiqp0vjhncydg7w9rb5drnzma03i14xo50g7l9gy8ej03gnv12w6bqa21etwbpn9u76wpqkrwtrfw8lrru9s6kjw9somtw0rov0n354aywdd2md4dd5orc43hr311od959cvnpbns17qqvkkgsp62uxl',
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
                id: 'fcd0786f-2071-4bbb-9ced-eb4238e3d895',
                tenantId: 'f1956da6-5a04-4877-8a26-0b40ceac824b',
                
                name: 'tc81ffpx2y91spo6h5z77268pbmw26cncg1jlllosf3fnpdxi58375vy33x9e8ztl8qbf55n185lcdo3paulay3f46v3x3fxxtxfb74tc15v3uvew07nwtehr48prt2nqjc7w6zt1luoy25a43j9aufxu41qtpv1y60ngrp85fm3gx8s6cteq1rrr0h17hen1liwn9qnhsnw2a6zdhwfw7mw56djkcfzjdqf7q6z4jllyaxqxc09h7zvtigqbdb',
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
                id: 'fcd0786f-2071-4bbb-9ced-eb4238e3d895',
                tenantId: 'f1956da6-5a04-4877-8a26-0b40ceac824b',
                tenantCode: 'vwd4gk56nbbpkhdonvymh0jx8gawxis2vtl6nrbn72409s8uzv',
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
                id: 'fcd0786f-2071-4bbb-9ced-eb4238e3d895',
                tenantId: 'f1956da6-5a04-4877-8a26-0b40ceac824b',
                tenantCode: '6kfidmzp9gxl6pyofmsn9njd5kgjnugcf8mwz7k5d513jlksfs',
                
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
                id: 'ktn1hnc64u597zotc0r8vl5hgzyh5yxbz2d8o',
                tenantId: 'f1956da6-5a04-4877-8a26-0b40ceac824b',
                tenantCode: 'f8juuhujuc1i61d6r4af5xzlvj2g7y98fxrwudjsjwxkgg34pi',
                name: 'xdfvyauh3uo5cxp05xquyrbfrkc7bgr3r3ah1wu6kyafmmf29ur1idf4j6f1kuqfywoyubogc161fxioc0cmene4ckvd9u5miowtc7q18eanc22d1vt5pu21be0bo7jwgcgqtofecl6tda3tcc877x6y2xk7qz0ja34r6qo5k86tztj4tzrurs85cs7m66a8nu57i5fs6jr1omp7pk9f6272n06iizmf94v2ko7lr9uojixc0a5pa3v9wrod2r4',
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
                id: 'fcd0786f-2071-4bbb-9ced-eb4238e3d895',
                tenantId: 'nm4g2i5uwi8bjc2mcgkunflz0smuv3htkfizm',
                tenantCode: 's10n2qtcx225ezrq5hd2i0fv1wp2yd8vp6c4eacte14ejvtnuk',
                name: '7cwaj2ak3ylsd0qhpqe47qfzo8zviu42nb33v5bldbeqiuthdv5x3amshf9dmcj6ckp9ixuilxypbwf62dhza0wd71mpxujjufchg76fjxfa13gshm9nksrsq5gntib33eoc4l1honlznk38nt6cl77sc3e9h2p7e6xj6xcp5pl3ftpfj12grmnu91b7o6b7auye1g6vs728h7l5bx9qp5zax6lr1x42auhix7ispj96kdwx7kddz7bzq029mnf',
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
                id: 'fcd0786f-2071-4bbb-9ced-eb4238e3d895',
                tenantId: 'f1956da6-5a04-4877-8a26-0b40ceac824b',
                tenantCode: 'tr5nl2whkhqvx20ty73lni7vk4xgv4hgbkl3s3iyg73ju2pultz',
                name: '1wjhc9hwvrxk4rofjb595clok0io7gfs1cz3hbcux5wyv87mbaeglxuxcwzxfmejmvfjpjlnxvtag57ehsowjiwiw3awuk8ml55x3irrtxgx5kpejnu91t26395k2mhyj8ebgsln2ceftqpfknw02fzns37orx6qh31n8j7ytqsfrgfnu78zejx22y94arep0s4bhjn5ysv4ko7tmyshfd3cl4yvn2iwkdcfl1nbwu1je3fy3ht62ie3lh17i47',
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
                id: 'fcd0786f-2071-4bbb-9ced-eb4238e3d895',
                tenantId: 'f1956da6-5a04-4877-8a26-0b40ceac824b',
                tenantCode: 'ijivc6pyts7xcfhtaja6z2nvq6y416kjz2qlntt7wvfxg4fb6j',
                name: 'v4hnvpdyjtlg08st2nb9z94tfl1tdll0dl86a0vn9v7rna9s0hgns5a6fkw59sw8psxnexoslbe7zks2sqakry4o5xl24e2fa1kjrnmni32p50m0icayltoo7rxijxxs2x8cowkcyrm1coxrephohi08vqhcl46oiljlm115sifbk6sox9g4s6uia248zj6ek08vemnhmeg8hyk2c535g1d8ipcpsmswr3dcb6y4e26pcu10ljd98z3xjvc0sa0p',
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
                id: 'fcd0786f-2071-4bbb-9ced-eb4238e3d895',
                tenantId: 'f1956da6-5a04-4877-8a26-0b40ceac824b',
                tenantCode: '4r27a1tiwqmuts67ir7x06ubave0aexr80t0185hlk9b8a11n6',
                name: 'turz5cnhj509hprbukfjr4rjjskfh7rt9r8xpqqq1allr4wbiz3ytzwe4fevc1y9da9pamfpowz6vppow7jkloljf2a22jb80k5n7hfghf7vbgpondg11p66t60xj5hsjsqskv3mjen5721dla0jt3eyzkxjmr5xzp8jv8m5uisxzii53yjqmxftfepc0w5j84yujd167xt640jmujmrkiqmdjchlyrek8v9mxxepomww3ni2ft8lnzy4gey519',
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
                        value   : 'fcd0786f-2071-4bbb-9ced-eb4238e3d895'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'fcd0786f-2071-4bbb-9ced-eb4238e3d895'));
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
            .get('/bplus-it-sappi/role/fcd0786f-2071-4bbb-9ced-eb4238e3d895')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'fcd0786f-2071-4bbb-9ced-eb4238e3d895'));
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
                
                id: 'a775c7a7-3df0-418d-9f9c-a31eb2f41487',
                tenantId: '863c1d0e-c4a0-4d0f-a158-27e237efdcd7',
                tenantCode: 'ez7czbbupmsnhpxi0l0der7mg8rljve5yc5sx1eekyv0rypar9',
                name: 'bgfrk4xj8t719110mouj30v2eknw5whlglofa1vsjhibrd3c0u011vdniidxia8rm703jxe4w4t5rvxzyvtes9xrsh10jcfhjj73un6dkpo3m3w2j3f1htjpbvu7pomtdske400mwipag5x4a9zqe9bg070igzugkiixv6ksiy5sqvpd0vqtzclwagw4imaf3d4vko6fl4z9i2rl6l25la3snc3az49y06ewzxaq12x5notylfdz9aaodnbzk80',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/role`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                
                id: 'fcd0786f-2071-4bbb-9ced-eb4238e3d895',
                tenantId: 'f1956da6-5a04-4877-8a26-0b40ceac824b',
                tenantCode: '90jt39b6ue5khyp5ee28ggsm98g0nrnpveknmf0ld60hfocm5v',
                name: '5vzeokfi98jv9gi3g6n3boi86it2bco2woidosv9fqq1vjd2ukamzvi8fk1jaydkzolpja5rmuz5gert5g1rcjwlohmczf9gdykxv607eij2d7s9m202sy1p28t2g5a8a26g40ajdl6cpg1gcw3rnql94btp85mj9i8oycmg2k0s5hs07s7ejirwph21ipic3ihtrkhewjhpyss5f75d087adagns4g7897j1uh5hapyk84p0hp45byzdehapku',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'fcd0786f-2071-4bbb-9ced-eb4238e3d895'));
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
            .delete('/bplus-it-sappi/role/fcd0786f-2071-4bbb-9ced-eb4238e3d895')
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
                        id: 'd40a8485-1ff0-4b2b-9c18-118862545c3d',
                        tenantId: 'f1956da6-5a04-4877-8a26-0b40ceac824b',
                        tenantCode: 'nac2eolwh8wmvixj0fuzj28f8ypcei71xi1gkxm11nwjsml2au',
                        name: 'aw7w8m6ldahva16naz7dqckuiduynunnptf94x7jci2fvpfvqtc9vuxe8coofgpjkssdbiudrgte64fhdq9oprunpzqwjnogmacy7kmz8hhp778me5kgvgoltvtgqdfk84r4nv6vkmo38d98zz29wx0f0upabfsuo83j9b1bh4lgrks802p2991q3u5ajasni53q7t9rbbq2eu2ylofvqp7zf1ga63g5xoqc3isz79oxyhmdd6wtqcn3to41m8s',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateRole).toHaveProperty('id', 'd40a8485-1ff0-4b2b-9c18-118862545c3d');
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
                            value   : 'fcd0786f-2071-4bbb-9ced-eb4238e3d895'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindRole.id).toStrictEqual('fcd0786f-2071-4bbb-9ced-eb4238e3d895');
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
                    id: 'fcd0786f-2071-4bbb-9ced-eb4238e3d895'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindRoleById.id).toStrictEqual('fcd0786f-2071-4bbb-9ced-eb4238e3d895');
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
                        
                        id: '4ec335ca-028b-4787-bf38-e205ff3a2e12',
                        tenantId: 'e8863413-9d9a-44dc-99c4-7f8e7776bded',
                        tenantCode: 'nxszcy4e6ry9pus1hv2wwptmk8gfz3arc9my250pi8slzt6awa',
                        name: 'ghwzq6wfg9itku57nk8kgyyxmrjpoydx7t3jv95nrntiqay6bay3vtzcqjeebk7vjjrwe5gwlowa24n8vzwvryjegfv47gl9v050hdf4jknff2oxfhl7z8vhkj4p9j5267l5iv2myzmbloiesuveftil8bnzyzi8ixrlor0aa73lb7vgtzayuhslif4eugg77qdlfq4iez812jn2ek3u2rg6pbvnsrfeo0nycnm1xkcfgidnot56c1cin6j1tml',
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
                        
                        id: 'fcd0786f-2071-4bbb-9ced-eb4238e3d895',
                        tenantId: 'f1956da6-5a04-4877-8a26-0b40ceac824b',
                        tenantCode: 'mzh2kb3uitljzqvdcxd3tmxlnj6er3ryt2pz7so9x3y0uahsr0',
                        name: 'zwdap21y4ncgrtrp9ddj1c9hfqrd4yodk4m45hjz0wb9drozuxzggvfl13s15mmwp6ngcfhz8kkddyuld1k37ba9kb7msn3cun916cdw5q4fqpxis8o2x9akjbruiyuv0ta36svu6nzgddgalmmclvolp3793hp3k8oydlq1qh0m7w7whuastlebxwalnvm9z2t237jra120asrp3fbd0qzaw0q7yhetlqe948p3ouca44ufg7m2mh0z36dwdin',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateRole.id).toStrictEqual('fcd0786f-2071-4bbb-9ced-eb4238e3d895');
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
                    id: 'fcd0786f-2071-4bbb-9ced-eb4238e3d895'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteRoleById.id).toStrictEqual('fcd0786f-2071-4bbb-9ced-eb4238e3d895');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});