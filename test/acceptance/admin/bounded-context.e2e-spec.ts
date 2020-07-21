import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IBoundedContextRepository } from '@hades/admin/bounded-context/domain/bounded-context.repository';
import { MockBoundedContextRepository } from '@hades/admin/bounded-context/infrastructure/mock/mock-bounded-context.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('bounded-context', () => 
{
    let app: INestApplication;
    let repository: MockBoundedContextRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    AdminModule,
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
            .overrideProvider(IBoundedContextRepository)
            .useClass(MockBoundedContextRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockBoundedContextRepository>module.get<IBoundedContextRepository>(IBoundedContextRepository);

        await app.init();
    });

    test(`/REST:POST admin/bounded-context - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: null,
                name: 'ymkd7hzr07jl5dbjgmzo5wpnrn5yu4np5rju276p3kgq34bl1utr0y31r00e7mjo7l0vqlh82o7ytjjs4nr4ikfte8csmdga7r7o66o89x59l9fak4i016zv0wbl3ai1amt92nsi25wx8sk2n88863ykxu6thd2ekta5gv1aad32sf2naueol2qdjp80eh4646dj68nokvtm9wt32p2r2aqzdyeb0975infbjbyntonv7nwbbf91gl2nes0x45x',
                root: 'dcdi17zfg6fmjz1t7cwv',
                sort: 774770,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                
                name: 'gvqscl4p4g9ea285dwjtj2vy1t4h25vdcbk7wc8l88winqz0itulyz82bm84qrp2uarz54wvi2cngxx9m0u0e58j5vjcn2hugvxudczyalfkty8i93am3gc7y32g3y7u5cnievx0ink86x9egrcz0fzlrnckxs86fq4tk8mg5gqhuebmpb4u0t74sir8jpvuq9wgu5h7ijr1xxy0y5axpdnriq8f41heug3h5y635lmk5h86ldiug8nz82om0cm',
                root: 'yrxq7bv5s5bo4qlv36g6',
                sort: 437780,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: 'a8355191-017b-41b4-aa48-e167d3051c1d',
                name: null,
                root: 'xxugtbd2wzfiq7bl7ccg',
                sort: 592455,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextName must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: 'a8355191-017b-41b4-aa48-e167d3051c1d',
                
                root: 'a6cx40ohfo63mxm9ntpk',
                sort: 642204,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextRoot property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: 'a8355191-017b-41b4-aa48-e167d3051c1d',
                name: 'd0j5uyqb9sxlfnryu100qwjcujhnfum050bzgokndu7tk226ie96glqvuvxxuq7xtdxb5s562cq874rj6c41hifnhpadrqyclc4pwy8inteqvc063ioj226zn33zh17huva9rkz1g0gimodr4lvalmplgkq22zlzwnt69xfr1pvzgy7iuka58q90d0803mul5xiim1sale055934g2fx9s6dawsb41zgkqryaot37g3my2zphk1w3aeksd7fr6i',
                root: null,
                sort: 685599,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextRoot must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextRoot property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: 'a8355191-017b-41b4-aa48-e167d3051c1d',
                name: '75tw00nb1i268yvyqayjeuycd2161ko4dt5d6nz1hm0dtewt6hm9gun6h55ex37bodj3k4z34bgx1sfnpk4hf5019s6gesyqgyp5gs72k6oyg54actuauz1we0705nriwtvrnqvfnjda4s4i1mdhv575d6jzwmc895hlizy0egnbabw7fo0hnpjzgv65q94ea93mghnnidu5mtsbwc4y9a5d4kt78cezgpei7sqj19ltyoiwit8me5zue6pmnpr',
                
                sort: 691065,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextRoot must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextSort property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: 'a8355191-017b-41b4-aa48-e167d3051c1d',
                name: 'valsx8wta8patm2g5ztpyjlgm75p4gw05culd1hpyhfbxm5agium5475e0jzfkk8cmfgd79jki9ndjb6k6p9gnd7w534jn23zlhxz0ivkxv7iprk5u70k1v0c63wlk6ooxj1brjgjkvg78se4i5keroxer0rm2cg19z480atrwaj0j7tpp66zijcaj58px1j6s61w8vbnix683boxb0svkb42l954c59i4d9l6rtyhboptkaig2lro0z89a8jzv',
                root: 'jrzesduiuk6laaol4qs0',
                sort: null,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextSort must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextSort property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: 'a8355191-017b-41b4-aa48-e167d3051c1d',
                name: 'ctxlctadnmp32xau4fp42lrm019tt2qcyvt7jhhxz0xdhbwy4434hpcq853ux33nfjortjxxj1ro3jmn3pw38b9a2ymiod9vgwjmxq966wo4bsc024knyzvdn1q0ufaez9ogckqpb16z751feejxg5czrf2xo2xmnjv62xra8jvf1qugv0c6bkgqpbgc7iin7syzoys4vbettr0zk7x6xgx1rh8ihhwisvrp1bd0xvcso2shtnkltwf5a3fyb5i',
                root: '7hncakj54s52xv7q7jkz',
                
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextSort must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: 'a8355191-017b-41b4-aa48-e167d3051c1d',
                name: 'd3ok66a65lllmbpae2jw1skpekq106dwyjoz8exrr7le1r8189m46aos4lgbarqk42cyoahiy01h4cet9kdx8asmmkb3too8i4cxv7axzvi2qbwry1otlply7vkf0kay7t0pp8te83n5a7dmrep8bgxb3j3ewp84et582m4bsm84c2nf6j1e5gnl0uehq7ztjiz5ewat92ce3ed976z5ylk1njdc4gm9qars49cmo6nky6w7llcnwv4rez0ku0b',
                root: 'zjc4wx9opg6rmr51thnb',
                sort: 255831,
                isActive: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextIsActive must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextIsActive property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: 'a8355191-017b-41b4-aa48-e167d3051c1d',
                name: 'v8bvne0t9rk9hwjh2idlbppcznt4aax8enu51yopnvz2kypmzqp5j4bk1mxxz79tvcwx4k2p8el3719pmvynfftr49ekcc5xb56mpg7nvr87yc323ad407vopjwii2b6kiga92vgg5s5dhrjd55qb862dzrbjdk218cp5ywyvkbo9c80ufn5mmk7ak55dhiukl8oww3xusmanpfid8pa7iw5ti83onkho5mmbjhdm70v7kk4rc99g67g854blxf',
                root: 'lviq08tergy9en6w55o4',
                sort: 289312,
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextIsActive must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '34nkruix0m5syov2ejggn4cs8ytoidbiur64a',
                name: 'kzh02vjeh590ienxwgngls5uuqq37kyg5w6ahsytbfi0swimjenydn6nk9rbd3othbommefl6bna7hx9d6c3q0dj75rzgnhkeqp3ezubq6rgsia6t7yzcgs4f5179ldk1ynkbfvwvuss0rq1letn2ubrjqvm6yrt3lm859ji4doht40nsiha8u7j7vj8qwbq9tsgtzrx7bpziupqkv0vd3x1np3vpegkfc6isvadez79i4lt4z13qgjsdm9lh3y',
                root: '87tqjqbf1g7j8mdcc7c3',
                sort: 339162,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: 'a8355191-017b-41b4-aa48-e167d3051c1d',
                name: 'xnzevbv136xz2v57g7lsqzu9m2r8cx5o18qmtwxutclbue29waewssno7l58kmsve71zjusj41c9pgfsm1l5qx0d7y08el9k8xef8nn6docv6f5ztcnhiu8q83aabr4i1jq0v6x67t6v4ywhtrhoaucieiclxgxyo4kus9vbw04b13mff34r91ykzhzg56xj8brc7nqr855e6pm1b5jl46d4le8ogm7fu4znb8p65oyh90s8bwm60mvvrm6nnkfc',
                root: 'luj3fisdcx7h44ba42ei',
                sort: 407099,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextRoot is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: 'a8355191-017b-41b4-aa48-e167d3051c1d',
                name: 'fd8wdypfov81yi8r8ctnxko6l32pxrg0i5nzsmvixat1c66yd5a2iysw5ei2x4npjkey8yey3q71vowy6dk3spskqk8eq28anh0nsdmkm2uft7g5qjlz77bfbjw4yh3jcmkxoyd451fr0sv5f9vun3gqyoh04icaig3cdpv72hq1jij9op2odhs1b1idqet0c8xk9mrs0del8ez7qoqqpcifvd9t0n79jjnrrgdp68hlywxxi6n95qs6vpbak2h',
                root: 'nt1340x45ak2pockqa5ls',
                sort: 127098,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextRoot is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextSort is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: 'a8355191-017b-41b4-aa48-e167d3051c1d',
                name: 'x7ysnre3865szaqemfah3lp6ora5uogyicr908y0dvvno65bvrmq9hfp11ritt802pnl9iuqi6x6lgiu48e3la9tgyqkza6msf8odxs1j7ok8vsubnxm6pd5qabofbm3m3st20iw9tkpbvt6wiow1gsu2szelij3cry4b7pan1wzbwi7q9tykoe60slyqa81rutfnnio6syj8fogpe74bx1tr4qrq919b7ogzt1kld3f6wwor1imsumkm0xunzv',
                root: 'o8buflehzxcl40v74zwo',
                sort: 6005873,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextSort is too large, has a maximum length of 6');
            });
    });
    

    

    
    
    

    
    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextIsActive has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: 'a8355191-017b-41b4-aa48-e167d3051c1d',
                name: '2tjrtq6u4c03xmgx30tz27d8b7e71dv2cuw8yloivhyn1k0p4nfrvmkx1o0scpaxh4ld9nd2gcl30khn3oi3cbtbpa8xk9675yu6o6ey89r66x8qhhqmg751s4i6on80yzhrw5haewk42ioz1p9wja0yywrk0lnc2ct2l1j0wh45ubv2q1l1zhhqin7fm9598u63x8itnh9ipmjpt7k2r7dxnv61ytfjlsppt8uxaaoo52aqin3of9epm0trn25',
                root: 'decdyix2sayynf9zs9jv',
                sort: 768112,
                isActive: 'true',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextIsActive has to be a boolean value');
            });
    });
    

    

    

    test(`/REST:POST admin/bounded-context`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: 'a8355191-017b-41b4-aa48-e167d3051c1d',
                name: '7nnm5f9c2u8fq7g5hbibawn5rwfwdwmmh7p1f248hqann2cx1yybyk99lipqtlm2bctbpml7wzsjld34eqzmlo7jwuu7flxzr15ci0p7ynspuxunc4cjxfx828gaqxsu0fr4panon4fjsjy2m5z9cczcvmkjgtadbsreqfbz6lmyl9pszmadgkr5bhjhryvpxpvc418ol79ao685p9zefijq1qt3chgiqyiou8fho97oyoxvr5qm5fsx8al5zlm',
                root: 'u0fq5y73ua53p3fgdrrf',
                sort: 567255,
                isActive: true,
            })
            .expect(201);
    });

    test(`/REST:GET admin/bounded-contexts/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/bounded-contexts/paginate')
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

    test(`/REST:GET admin/bounded-context - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/bounded-context')
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

    test(`/REST:GET admin/bounded-context`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : 'a8355191-017b-41b4-aa48-e167d3051c1d'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'a8355191-017b-41b4-aa48-e167d3051c1d'));
    });

    test(`/REST:GET admin/bounded-context/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/bounded-context/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/bounded-context/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/bounded-context/a8355191-017b-41b4-aa48-e167d3051c1d')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'a8355191-017b-41b4-aa48-e167d3051c1d'));
    });

    test(`/REST:GET admin/bounded-contexts`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/bounded-contexts')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT admin/bounded-context - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                
                id: '73d73a41-4f81-4b80-bd54-4216c181a568',
                name: 'xaveydzmnf8jbhpsfpbtp4gchppect7ninriegzhcbvw6xw199puu06xduq391ooxni8w1oyu4ssor7zjg7fm29rp3fjcja26p0a48lhco7f0mcjo8q9x3kat8r3p2i97beqhy5i0vlok9o7ll5e7fniaqb2aqvdbzl9k7x94gefe45hh04awkobwvhrnqgqg478hivcu1hctl0drcc7lpm1kdamjwa2wfvvp9n06u1usg9kg0ocycvy8ywv4a2',
                root: 'g7sylr8v1ivvlz8fwhf3',
                sort: 998562,
                isActive: true,
            })
            .expect(404);
    });

    test(`/REST:PUT admin/bounded-context`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                
                id: 'a8355191-017b-41b4-aa48-e167d3051c1d',
                name: 'hfdle60cm1ufoq196bryx4dyo8w8xcz6tgmg2h51z34tpfwsih2tws442lb3zvz7dxjfsjjmxaow2ofzdgndi5cs08jtseidekom7na5gfhg7oe3m8uvve2fch8ocjtnw44m71esv2zf03f1bssek5dlqor6ibr8c4vkrh8r9w6s4bbdzvqp4ohxczf3ml2wpezkt0sjld5625ky9uvms9rgyx4ykxllpp0knlxcr8znc00lig9eqrssm66yyeg',
                root: 'wauhig5xnssd0jadnjce',
                sort: 201755,
                isActive: true,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'a8355191-017b-41b4-aa48-e167d3051c1d'));
    });

    test(`/REST:DELETE admin/bounded-context/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/bounded-context/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/bounded-context/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/bounded-context/a8355191-017b-41b4-aa48-e167d3051c1d')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL adminCreateBoundedContext - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateBoundedContextInput!)
                    {
                        adminCreateBoundedContext (payload:$payload)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
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

    test(`/GraphQL adminCreateBoundedContext`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateBoundedContextInput!)
                    {
                        adminCreateBoundedContext (payload:$payload)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '7072d9cb-d490-464e-8c86-8e791ea56a9c',
                        name: 'wntntaiy68kgdgero68kcrxf8mnff55mv7dx83diwqfzhdi7bh0gtfxjsub19nbbfd9b3gxcyyrrxdmuo3cqamxoqaz85lsuaa6ohahgzgadzssbhtpkupdk4nvxn79x8qyrrmxikik1ogw0d0ka2xoz3tqmzrluosoazh3b4ivvat0qs6ghu8jopebmv2ynogppidg8mg8loreo0fgzjyptt2zvrwzam0iulxic7lb2hp4p94sxmm46ac6jgph',
                        root: 'qrbpvisgxd780h1xywem',
                        sort: 766001,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateBoundedContext).toHaveProperty('id', '7072d9cb-d490-464e-8c86-8e791ea56a9c');
            });
    });

    test(`/GraphQL adminPaginateBoundedContexts`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        adminPaginateBoundedContexts (query:$query constraint:$constraint)
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
                expect(res.body.data.adminPaginateBoundedContexts.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateBoundedContexts.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateBoundedContexts.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL adminFindBoundedContext - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        adminFindBoundedContext (query:$query)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
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

    test(`/GraphQL adminFindBoundedContext`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        adminFindBoundedContext (query:$query)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
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
                            value   : 'a8355191-017b-41b4-aa48-e167d3051c1d'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindBoundedContext.id).toStrictEqual('a8355191-017b-41b4-aa48-e167d3051c1d');
            });
    });

    test(`/GraphQL adminFindBoundedContextById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindBoundedContextById (id:$id)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
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

    test(`/GraphQL adminFindBoundedContextById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindBoundedContextById (id:$id)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'a8355191-017b-41b4-aa48-e167d3051c1d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindBoundedContextById.id).toStrictEqual('a8355191-017b-41b4-aa48-e167d3051c1d');
            });
    });

    test(`/GraphQL adminGetBoundedContexts`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        adminGetBoundedContexts (query:$query)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.adminGetBoundedContexts.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL adminUpdateBoundedContext - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateBoundedContextInput!)
                    {
                        adminUpdateBoundedContext (payload:$payload)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '107fb232-f79a-4c98-8f90-e9722c5e1ccc',
                        name: '0tweo0dh9x972gv8vwrpiytjox96pyo8782z83szlrni95lagtcwppanuwc7smqch4534tp7f9100qqhwcg3g6rm05vz64kucjtryotub4ph8blkvnlznfkrq7kedjnum5upk8lffsukwlkjnpb0w12xo3enlyrbj1mr01afz5cdl952mh6h02qsc20of0suq5gj5paie8mijbroqpuzwsv9knacfhck7vdh649re7qn41sqtv4j5kf24ztor74',
                        root: 'swve6e32k4e2ed3fp9jm',
                        sort: 377600,
                        isActive: true,
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

    test(`/GraphQL adminUpdateBoundedContext`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateBoundedContextInput!)
                    {
                        adminUpdateBoundedContext (payload:$payload)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'a8355191-017b-41b4-aa48-e167d3051c1d',
                        name: 'd15lpl4yb1h586v7zf0a5mt926y586d9q7uo6egli93h0va9hqzj3de3wg70zhetnu7shpzdxojx3kh1c6ipenv2xxjirid1m8514ejvow2g4mr5a3xb3y82nkoqm8wwfjlytgvyu1yl4gcvvvrj7myfdbw45njpcbt1ygefd5qm9xjwkwl0tlliatdmw74xys7ug5liqueep32s73pxxr93sh98oyk0yaiv36w0vxqmrtkkq29ndvam8elqr6l',
                        root: 'xr0bw245ndrhtpk6kauz',
                        sort: 518394,
                        isActive: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateBoundedContext.id).toStrictEqual('a8355191-017b-41b4-aa48-e167d3051c1d');
            });
    });

    test(`/GraphQL adminDeleteBoundedContextById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteBoundedContextById (id:$id)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
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

    test(`/GraphQL adminDeleteBoundedContextById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteBoundedContextById (id:$id)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'a8355191-017b-41b4-aa48-e167d3051c1d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteBoundedContextById.id).toStrictEqual('a8355191-017b-41b4-aa48-e167d3051c1d');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});