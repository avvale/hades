import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IBoundedContextRepository } from '@hades/iam/bounded-context/domain/bounded-context.repository';
import { MockBoundedContextRepository } from '@hades/iam/bounded-context/infrastructure/mock/mock-bounded-context.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { IamModule } from './../../../src/apps/iam/iam.module';
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
            .overrideProvider(IBoundedContextRepository)
            .useClass(MockBoundedContextRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockBoundedContextRepository>module.get<IBoundedContextRepository>(IBoundedContextRepository);

        await app.init();
    });

    test(`/REST:POST iam/bounded-context - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: null,
                name: '5l1ubtxqbxro8qkcpo71fitj3l4b75lfggzfqmpvxmk2hx0cj2477xwgp2r3z4b2w5q8280uenzl0in86z0z2j7pgdt45dw0ifg7173t86v2x841da6bkj6kcjx11p5e92mye9qt0l27m0bbf7xrwohaoo24dmwe7r71co1zn5amcabcf8txc70atv7u8mvhzi51nkyd3qvk35jsy00vhgjs4jb2jz4d8ry57x8qyq9ti0p5etln714w84i2wrf',
                root: 'lhfqt0ttiwfza9m40a44jkswf7mmip',
                sort: 326689,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextId must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                
                name: '0qav1ev3rubkc2pl7nwhjv9ub1vjuceindewhhcauan6x9kpyip8mu76uwivllj2nnsotno3q5avhtg6iwcr477iocgmcl9e10jooim306o4attr4d0pduk2wul8amb08jivwazrmsk1y2im784rxh4snbgex25xgme91cgyuq723mb0855kllabcwndrfb80ejnuwjo10paf22uqrhl71iku5e82be9skcgdltcr03t3ix7wjvyf3l975vodxq',
                root: 'zsivcaw9vuu1u2vm25oevc1y6zwr0o',
                sort: 433231,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '7dc7a3cd-d918-45f4-a418-f2c48606d352',
                name: null,
                root: '2qac9bg51ciiy0t1eqwh2h9luse8yg',
                sort: 369777,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextName must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '7dc7a3cd-d918-45f4-a418-f2c48606d352',
                
                root: 'mwrcspv90lf5gs33weqjmffs3y7enl',
                sort: 409599,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextRoot property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '7dc7a3cd-d918-45f4-a418-f2c48606d352',
                name: 'os47lhvhjq6tnhegbw6tndkbppb9wsmfm8oh2ntaln973gzy9ollb1e1hu60ziydn82r4oelm86trm4qlhazjdexmffltg14r5wvkypml3wo3pbcv9g8zi3uwpg2nwy94qrnzmupv3ukuv7vtw8kp1ogexfwhf4go29p323n5vim7l7fyxhijtket5v4xktkjhgdb8v78wxn921gmprr363zh9ajgidylrvdj0qlmj2c4ds7dtlvt95swiq4que',
                root: null,
                sort: 216675,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextRoot must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextRoot property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '7dc7a3cd-d918-45f4-a418-f2c48606d352',
                name: '453osoafxzlokow4tmbeluqd21m0m9bvhnl2jpll5ck4u7llf72hhzn2gx9cup7kaurnxycwui9p09x8wm304tz817wglyedvwv400mnb0dgcgyrjsvvyprokw17o2wwo5zfv3250mzh1khtwax9gp0b1n5iev14gywcy1kqcn1bbd50ttswqrbgzuq35teg701o40vjzqk50d7tp6iaagun5slljfpf5jr6t1idchpcyncb97z8d6kg9hwzoqb',
                
                sort: 989289,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextRoot must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextSort property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '7dc7a3cd-d918-45f4-a418-f2c48606d352',
                name: 'ipwjy47ptuxtlerpni2m7bjyoog1wwczjdbu0fp79hly3kd2wb7st74cphn3q7ktzwbcl2mq1uf82ccbkaiufcptl8ffkucvdlivz8ixvskpqjp552okj2q5wcooaciuqkd3pgcvrwog7cgnfhw0zr1ht9nuedc7ly30ueb1si0c880ijugh7159apihvzypp4ji0c51ea7a3gr3m6sahm60joouqptl81y14i5qrv9y5825uudjvlbfgpa4aii',
                root: '603fyay2lnro09fqd41vtpxi7fkin7',
                sort: null,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextSort must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextSort property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '7dc7a3cd-d918-45f4-a418-f2c48606d352',
                name: 'dliwmx6qomnfj0smezg083utzjh7sjwdtm59xjefbe8cheywsktsfdv5fks31cqakdbfjom7ldbfp91zg8v0nq5c6ukojygo6ioyycj5m8as736ul0rwxvtwpvj6dmst998acastv2yr6e4qc90tp2tkn0yujcclo6mc0qshkf9dv77batpor5p112tx4xqpy1tahrybjsixxqe0b540jqdiuf679d9ptwdnondk4wex12viwhv92jg9yauyzn4',
                root: 'itd0fjrihzseyszr6mjh9tlvl0uddv',
                
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextSort must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '7dc7a3cd-d918-45f4-a418-f2c48606d352',
                name: 'o9pi4gedgl8tdztjj74hmyn5cixoo54cezqgui6r7eooirhaidfgec99ozkovd47fqq8j24yzzbgl1t3rnhooi0rd6453dzlytmtefsu83ve9jzqgt8m3ys1d8muakfkyn23qlsgvpqj22p2x6f14qenq2dllm8tt21qztfn1r6i2cxr8h6mtlkk4ragp6l5f32of2t3spg3dpdwuz880z3ddp6suplfevlflh2izzbrtil08b1yhaj5qcd1irq',
                root: 'oz7n8a4gmb92ucybwjxj5pk3h1gokb',
                sort: 531417,
                isActive: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextIsActive must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextIsActive property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '7dc7a3cd-d918-45f4-a418-f2c48606d352',
                name: 'i2jsk43x17x0rg41szn3xoebajcp9zmzz7rxatca94qgeummad38sa8lgtn80umvuwk93c6d78i12rm1cxvnyqy0gj74hmy6p1rq2b4sbxtrv35l6hnuaeqeshripl3cjliinu9huqm0qrzmpgj7qlzy9xmx8z5wmubja23iwy7c2m0ooirlfwb4ifn28rc6ut6n33fow9t27ci1rztvviurm6hqyzt7jd895gf5aectmduv8qjpgy0bwadyyd9',
                root: 'bqucghxiq1do6v6p28ejlpi1ak6afh',
                sort: 969284,
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextIsActive must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: 'i6r0atsa2fu4w1nk1ha5ozg595ok0jwoqc2yz',
                name: 'h6b22icsvvwkll2dbny0l73k8ona3qnjf9gxthk27ugkex59zw9bw5uf6cmeiy503qgqfp6c7pgy2fthejm8nx3i7qb06fe0xinkgxxm72jf4viu466wffl182bvfxfwm92um6i2ztp4s8azlt38jo7vkcvv7x79tfv4kt3jixicph7nqz3rfic0l1dmohhvpzyq3wvluh0s11xbllswp63bdhkin3bveh81mpl7kn5h9v44kyx83hmeh3ccsir',
                root: 'm0xy8fopk7fyfh0qp7lcxk70ceanwe',
                sort: 307071,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '7dc7a3cd-d918-45f4-a418-f2c48606d352',
                name: '9rkai2xqzbnfl8z0tt9dnprexftqm7gmsxwucfqnlj606fg18u7y5ght3cdy7y67xyd1c7ckgwrbcscv51gqamo4bd79pwv9woxyqv9edxzbli6fwuwqiwn9j3cgubk73s6slz9b45630gknbzonqarhwsofxhqd1htugcskn1l284gazh17xq4pvuytcgyabp1psnpr1h5lfoz5qm0qyv0l04dxevx9i9r2dsiqojqoyzye9e5j36ujjviunnfx',
                root: 'x1fqu839b3vtkx2gqn1ferbo0uiyf7',
                sort: 644261,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextRoot is too large, has a maximum length of 30`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '7dc7a3cd-d918-45f4-a418-f2c48606d352',
                name: '58koszfq9mccxybfmcqpdywwvtrk5onwiee7jkiicj0zjm3lzngxyyg6mofz2sm8qbbzezqrex2vfxafjuhir5vhzq15wa0wibnakw9t1lxmonov1xc8pftjc3w9amf9v92y9weq0luvyha119mlc9i2rqgpbzpywrt9u7eq6omucq4awpczec46tqolwukhfwkkjswoy82j33bch0t0hzfsylu944t8hyx5lfvwkhxu4gzd4mnb8flul0rainx',
                root: 'xuf9yfpzna6151mbouzpyi6ga4k53j6',
                sort: 870751,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextRoot is too large, has a maximum length of 30');
            });
    });
    
    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextSort is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '7dc7a3cd-d918-45f4-a418-f2c48606d352',
                name: 'h9oducje3e7habdxvb4l0tr6nl9zizi2udhz3m3kc2vq47zxbamoma7wfo0mqllqzkh418bb18w368ja6prl4308cb137fijnhe876uox4fso0be6pq4d5hygk5zmqicbhvl449mk47onq229cgwyyegjq95ykl7412ltcruvy5xnsi45wkab8scxagqmkcnl3hhci4itk5m2466s6p5ousnxscauezvmw1l0kaqheefhqawnhvhr90zgmrkc1k',
                root: 'xo6zautqor0m2h2qky659vxsdtr68k',
                sort: 7929429,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextSort is too large, has a maximum length of 6');
            });
    });
    

    

    
    
    

    
    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextIsActive has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '7dc7a3cd-d918-45f4-a418-f2c48606d352',
                name: '76bp3rweble1pmmjjmdvqa5sng5ekwyb2ogjmyr2z6ykqnlmt1qpq5n1x2j8ew27t0y4buajikhxcnz8o9gp2v6jfkii62gmu6c9hjt665rp03qivc19es3tm6cl3espdhgk31t6hyy2nzayx86m8e1fucx4fnhytenepkvq98ljvjwlb7pk2f8lo7pzlmj20leaq0k1d16dhrmzzwhtx1m5yrqevhca7c56zndkn69cqzp8ynwf7826z7olcrj',
                root: '0y76ubwuzihbft6x7yh1jpflezbw24',
                sort: 625068,
                isActive: 'true',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextIsActive has to be a boolean value');
            });
    });
    

    

    

    test(`/REST:POST iam/bounded-context`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '7dc7a3cd-d918-45f4-a418-f2c48606d352',
                name: '3koizdgml66cbddu4cyfc0z3vrtv2pgp2d5vmrpzt5cle1afgy8995egtsol2ue2ab3xu31sk952342619c7fbqmelcdbuvbflwps1a17c6xsg9kmyyrvl7ask6ikjs25dp1yogt1t3u31kvicif487hkk0k81vbaclzl0u9a2n0llbntucb9xde47lr3zzp44rkvuo7aygrmi6d416zp7ib4jvfwo8l77eb2hf7qguhgxhwieyr5oejqs3ukc9',
                root: 'uit3lfcfyktm02g91q4a5tndemm4xa',
                sort: 909838,
                isActive: false,
            })
            .expect(201);
    });

    test(`/REST:GET iam/bounded-contexts/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/bounded-contexts/paginate')
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

    test(`/REST:GET iam/bounded-context - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '8c8b1287-5f77-4a83-a3e7-7bce09ecb95a'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET iam/bounded-context`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '7dc7a3cd-d918-45f4-a418-f2c48606d352'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '7dc7a3cd-d918-45f4-a418-f2c48606d352'));
    });

    test(`/REST:GET iam/bounded-context/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/bounded-context/bbc303ea-9ff4-41f7-8cab-a38256b1a8b4')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET iam/bounded-context/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/bounded-context/7dc7a3cd-d918-45f4-a418-f2c48606d352')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '7dc7a3cd-d918-45f4-a418-f2c48606d352'));
    });

    test(`/REST:GET iam/bounded-contexts`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/bounded-contexts')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT iam/bounded-context - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                
                id: '474efc06-2d99-4c99-b7ea-635bc56644d1',
                name: '3xbv4xdaya3nbepxryk0av7nici3okz2tapfysv79oqjttdmxbged99pg47myrq00m2ufo58h6i6kbapciw4s4s3z2v49j13tmb5h0naiukz4z7y76uycuogw9wevvqkgr2vkedg67ahi0l1zp2j4n3ls00yqz17xqf3aootlor7hejkwfvpne83tvau93tu1c8nnx0prlfx486c3sluexyx0qd2xtrbnq8av98zpqas2jmajuobgt920b63ijw',
                root: '1s7xq1pbkuwvhgyqdxvm1u2h8bw81q',
                sort: 199519,
                isActive: true,
            })
            .expect(404);
    });

    test(`/REST:PUT iam/bounded-context`, () => 
    {
        return request(app.getHttpServer())
            .put('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                
                id: '7dc7a3cd-d918-45f4-a418-f2c48606d352',
                name: '1z4xx1hnddupdfyw0r5bkt62r7hg0f14jz2dmbt33r92zzyoh3j3fcwqi6nkgapfow60lidop1s6mzuu65v7dymcafuo903c0wit3nofltulyh5kqu2mvbwhj9tfz1dmaitn064a1hxrc4k5vq21l7iilya13tnsrd1utob5kbepwfl23t4qsmtd0axty2667chetm6gyl68unwcmi0u0iumvvnmuuwgxbuif04ujjnylojy6c5o0r2wkactev6',
                root: 'ndr4wqgksf45fr8zhvx8g4otrfghvb',
                sort: 362866,
                isActive: false,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '7dc7a3cd-d918-45f4-a418-f2c48606d352'));
    });

    test(`/REST:DELETE iam/bounded-context/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/iam/bounded-context/c3c308d6-f738-427a-b159-3ee8fd2ccbdc')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE iam/bounded-context/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/iam/bounded-context/7dc7a3cd-d918-45f4-a418-f2c48606d352')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL iamCreateBoundedContext - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamCreateBoundedContextInput!)
                    {
                        iamCreateBoundedContext (payload:$payload)
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

    test(`/GraphQL iamCreateBoundedContext`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamCreateBoundedContextInput!)
                    {
                        iamCreateBoundedContext (payload:$payload)
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
                        id: 'c5746877-9e01-43f8-9d1e-8ac1a0dbad38',
                        name: '3whbseyun55735shxsjilos3apwgecm06vuo2fbzhnebr5b7djzz72zw28yff9da00jp8csxb4pyxgnrv2rzy7snw89euzby7v7qnt70cx8gik0zi99acqojxm9llyp360fgcau84i08qs3wmy6605q1sp5uyak36w5sxbhg6brh76ihm3aelgye1ppk8f99o7uuw40rbo2p7lsavpuuhee5ij6isxcay59irkfhir6uiz111q61hckv0qnm8o6',
                        root: 'rjper4s0thxhllv4woj5l051tyh7nr',
                        sort: 540200,
                        isActive: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreateBoundedContext).toHaveProperty('id', 'c5746877-9e01-43f8-9d1e-8ac1a0dbad38');
            });
    });

    test(`/GraphQL iamPaginateBoundedContexts`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        iamPaginateBoundedContexts (query:$query constraint:$constraint)
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
                expect(res.body.data.iamPaginateBoundedContexts.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginateBoundedContexts.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginateBoundedContexts.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL iamFindBoundedContext - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindBoundedContext (query:$query)
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
                variables: 
                {
                    query: 
                    {
                        where: 
                        {
                            id: 'ddc16508-fc0c-4528-a4cb-9042e195ea7e'
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

    test(`/GraphQL iamFindBoundedContext`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindBoundedContext (query:$query)
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
                variables: 
                {
                    query: 
                    {
                        where: 
                        {
                            id: '7dc7a3cd-d918-45f4-a418-f2c48606d352'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindBoundedContext.id).toStrictEqual('7dc7a3cd-d918-45f4-a418-f2c48606d352');
            });
    });

    test(`/GraphQL iamFindBoundedContextById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        iamFindBoundedContextById (id:$id)
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
                    id: 'a08992fb-aa20-438e-a6d5-16bf1b72242e'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamFindBoundedContextById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        iamFindBoundedContextById (id:$id)
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
                    id: '7dc7a3cd-d918-45f4-a418-f2c48606d352'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindBoundedContextById.id).toStrictEqual('7dc7a3cd-d918-45f4-a418-f2c48606d352');
            });
    });

    test(`/GraphQL iamGetBoundedContexts`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamGetBoundedContexts (query:$query)
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
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.iamGetBoundedContexts.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL iamUpdateBoundedContext - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamUpdateBoundedContextInput!)
                    {
                        iamUpdateBoundedContext (payload:$payload)
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
                        
                        id: 'ec77ec1c-104c-4c0a-a912-13e3c8f89ca3',
                        name: '6hpcz613k42yf045aflebp6ehoeza4viov783o80nk6nyg248kmpfqx7s2ecdfsq14bo815rsazva7i169etkpfs6bsqa70wktswhcfd2lz9jh4q26nqh4cemf72n68sirvk54dm40rsle7r8usu0mh0300roca62wziafkokbfk153gjpunq35t9qd850qrfyn9fcftqoq21aopqkh2p8cokm6einolq6u4uqpe57i3ds8xexs429l9g5hm2fw',
                        root: '53uq98w0btpcoj360f8tx6fi2vtprd',
                        sort: 582972,
                        isActive: false,
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

    test(`/GraphQL iamUpdateBoundedContext`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamUpdateBoundedContextInput!)
                    {
                        iamUpdateBoundedContext (payload:$payload)
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
                        
                        id: '7dc7a3cd-d918-45f4-a418-f2c48606d352',
                        name: 'dhszcuif8qof6e9gz9ejuu8pxrtjkzeot7cz0u2jzar2tyjx27mhyo679vx96g3cfx6qeycztc82535c6ycjf1rzuhejdyyuu0eqbgwp37m054nx2k001qj9zbizqg7ab9puf26y8we1l2198bqns7prn19dhpsotn8zngg4isqpzatxe30yzz4gjcw5v6pro176wyghesvbkeutwti4hcgzn2tm8hmeclljzwtbbj37jp6zqgso4iv2vn4ksct',
                        root: 'lbtjqcba6snnwe995jy9u8eopengq2',
                        sort: 401223,
                        isActive: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdateBoundedContext.id).toStrictEqual('7dc7a3cd-d918-45f4-a418-f2c48606d352');
            });
    });

    test(`/GraphQL iamDeleteBoundedContextById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteBoundedContextById (id:$id)
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
                    id: '43b92d1f-d635-40a0-8a1d-4c4d1bc6c198'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamDeleteBoundedContextById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteBoundedContextById (id:$id)
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
                    id: '7dc7a3cd-d918-45f4-a418-f2c48606d352'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteBoundedContextById.id).toStrictEqual('7dc7a3cd-d918-45f4-a418-f2c48606d352');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});