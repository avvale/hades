import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IBoundedContextRepository } from '@hades/iam/bounded-context/domain/bounded-context.repository';
import { MockBoundedContextRepository } from '@hades/iam/bounded-context/infrastructure/mock/mock-bounded-context.repository';
import { AuthorizationGuard } from '../../../src/apps/shared/modules/auth/guards/authorization.guard';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { IamModule } from './../../../src/apps/iam/iam.module';
import * as request from 'supertest';
import * as _ from 'lodash';

// has OAuth
import { JwtModule } from '@nestjs/jwt';
import { IAccountRepository } from '@hades/iam/account/domain/account.repository';
import { MockAccountRepository } from '@hades/iam/account/infrastructure/mock/mock-account.repository';
import { TestingJwtService } from './../../../src/apps/o-auth/credential/services/testing-jwt.service';
import * as fs from 'fs';

const importForeignModules = [];

describe('bounded-context', () =>
{
    let app: INestApplication;
    let repository: MockBoundedContextRepository;
    let testJwt: string;

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
                    }),
                    JwtModule.register({
                        privateKey: fs.readFileSync('src/oauth-private.key', 'utf8'),
                        publicKey: fs.readFileSync('src/oauth-public.key', 'utf8'),
                        signOptions: {
                            algorithm: 'RS256',
                        }
                    }),
                ],
                providers: [
                    TestingJwtService,
                ]
            })
            .overrideProvider(IBoundedContextRepository)
            .useClass(MockBoundedContextRepository)
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        app         = module.createNestApplication();
        repository  = <MockBoundedContextRepository>module.get<IBoundedContextRepository>(IBoundedContextRepository);
        testJwt     =  module.get(TestingJwtService).getJwt();

        await app.init();
    });

    test(`/REST:POST iam/bounded-context - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: null,
                name: 'egqtpppmkbkf6spng4cjepuo64cuecm2qxjtptnfveg84ub9z5kpsjm18otah8e1pzycmibks1oeas3bq459p107p8bhv8frj1cwxevwq13j54kakoudfnh5dkm9t6tphexawxp8igkwbzs2i2ysighpnspwu0385d4yo8x16bodrxyc0jvto0xhpxg60okc8x4d181q8w5xusfxmv9ryijwlkmxns16nn5t99mfjfc8525inclk8k6aokn5elc',
                root: '7vl4bltkz92m4e1ev9k4fj6vfl86hc',
                sort: 659943,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextId must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextName property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'b65c48ae-5257-4e88-aec4-8f54ecae60d6',
                name: null,
                root: '8h3yjc9fq3u6iysxfa3hw30klydj05',
                sort: 953066,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextName must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextRoot property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'b65c48ae-5257-4e88-aec4-8f54ecae60d6',
                name: 'jkmyiihc3uzm6hrcrraaa85i67lnwsb7ggfhkw9rvelsg7e6k8k5glq074okzbutmv57m571e0do3fncozurs11wwz6uluk5mny89t3q487orfz8zuisu6s524ouv66y5msf9t13u1isznjvk1eeep43o8vg2tbes9hxo6rqmqlyp8v3ed5y31m25lajit792osd6lg40v6carija49nrei1v7oeat1ocf92l7w8tdaqnee24absbdzuaf22rmd',
                root: null,
                sort: 777637,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextRoot must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextSort property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'b65c48ae-5257-4e88-aec4-8f54ecae60d6',
                name: 'sw69mtu5dhqpcn1l87o9dr1io2j2qrsdyqcjdopjmg5nr5q8y33v8ktzw1ebqzi3028rjjv1qqot1iede5fz7j5cuxvilyubi3mv7xib1blk64qrc5b06625wzf31hs6rcjn1kmast2v4kjpsp49j5mafmbn9d68aj24ogrhkblw53wk9sar1akbipu4lftpuxzret8ls5449xq5akpoeigl6zzdl8swxhqvqmvn351qt2g8kpsr38gmj1bvnbl',
                root: '8npo6lbuz8f63t1z65otpxquh1plbb',
                sort: null,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextSort must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextIsActive property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'b65c48ae-5257-4e88-aec4-8f54ecae60d6',
                name: 'kgznyyl0nhguwm9vke1nso9vjc68vzs0ov2626gkj9etpqaj64agdsgo2z0b1tz6k0a2cp415m8pt000fh2y2ud5gj8h6yhyon5xz2rsyy1ajwncr9y8hden3m3odg0irt57no04795ucoummu8rwbhs5h33xn8kwrmt4iooml1ssx3u5me1sgqdz8utkvsqc8dlhb99knby1jwb7bnq3mbcnwfno4e65xtewarve3lg7pqmrdviakxv1hfnn6r',
                root: 'i1ngcoxyiiwcu8cz8aupwa276aw97v',
                sort: 160865,
                isActive: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextIsActive must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                name: '8m60jq5nltvm6746yzebzlizzou0et3hrj7vmdfqg9gu9r3uh08xrvwxrxyahp727501x0nwv3icbamsyshh0rpqxl974c1r102r8nxe0naw8tn5hduw41ag431uq96nnsl2dtme8h3e1q4fupsth0jlkv3oi6qpjznx1v3dt0mx9kv3mg78sttar99hc9vt3lctawpxkpizakvqs9rz51cmw4sifhjs0iydtnb5ky4yihatn638j25t2x8otub',
                root: 'q305hzj7ddabiukbeqkw21u0x8ckho',
                sort: 900356,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextName property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'b65c48ae-5257-4e88-aec4-8f54ecae60d6',
                root: 'zkub46ndgxy5758v906wgb9rwcct0u',
                sort: 125535,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextName must be defined, can not be undefined');
            });
    });

    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextRoot property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'b65c48ae-5257-4e88-aec4-8f54ecae60d6',
                name: 'nnhwhzecpu2qd0y79u3phoa72kra519244j2pi6xmsa899d11w1dahvfdlum1ptbubslx1bzl6xagp6mbuvkp458cu9bwb61tktq48g2kbdszv7b7d8vv9qhpqbc0w1jflkjc1zbsd6kpf73fx888ffn11xbb2xq2nha8r6blrxz2j30f5fv203gd9v3uusdnprogv8qac4u95y0u90jqj3oi2bbybanlgkdpjwhwz17df7vcr3tgmwzzw8cwdn',
                sort: 165596,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextRoot must be defined, can not be undefined');
            });
    });

    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextSort property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'b65c48ae-5257-4e88-aec4-8f54ecae60d6',
                name: 'lwb0uiiw3k6b566t0eb7w94ne1bxpijkzck4b9ifkq3xwei3kekoqqf76ka93worqpmsvkosfh76t04bzeqfujn844wj1newku04041kbq8yfclw0ft9sdceitwzy4c7bhrs05ag2ysodscgzxa3fdkvqhrok2onc9520nnxbednrwx21z9vas2gpk5h1gky8i7to596c21y1ie6jclsa2dzrli93rwphocxasrsemsbrmjq1e6f11y6g2k8b4f',
                root: 'fv69a20kuzdeip3am0p7das5ez4xe3',
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextSort must be defined, can not be undefined');
            });
    });

    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextIsActive property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'b65c48ae-5257-4e88-aec4-8f54ecae60d6',
                name: '7tobugs8b8ct2guru8hlorhebyuy9rcqd6mx9kxnfezz8ummwr24dm1qotwapt7cv6tkvv776v9swhgpcklan2g1ea5sqxf3jzn4ohb49bomofq5c65369zriad76a7qgwjoi4halx9rdanvrdjbt8xitw9u9jwdzdi92m9zdmcfhb7ax49kvxhxja3fnxi3lkhicr4lp1fvqs5vykmxtokzar5kc4x9hlpl33j6jz6z59xaywruusb23uc3rmn',
                root: 'zwt4im1s35yk0uhltcnq2cd7jmisss',
                sort: 920676,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'o8gnxfo0pol9d0ev4abteeewg9x4r86t6jsiv',
                name: '8wxh3nzpf8l3373uixxlzork2blx7yi8a58q1t30vqlke8b3nnksq9krg64hvxgvanoh1eqd1qeflywy5j5mcniojpc5grud6bajpjz1jnivsik3iclsevxye0vi8an8rn3tndrbhwyw9q8383engx5ev62l3jnqvx4ff7bviszske5vpmpnderxl4bpo491amc0fi7alqek5svfdz5zz0n9f6tqyi0owapoikxky7d58a4emq5s9tnoxa0hmhz',
                root: '3ewl8l3b1k22ovlyvwswjojuo26ic6',
                sort: 237575,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'b65c48ae-5257-4e88-aec4-8f54ecae60d6',
                name: 'eyttrvp78h8juyvr2afvlnegbh11tjrsiulk4hzg721srr51q79i09y82iyzpdqu2f60pbvakc33q6d7mggab75hkgxwrq5zknyopl8ahcr8uf6ntxapmdodeko4ji7td91oc2rnpbqk60l2wykdq0jkof3uk5sgcmsutog3k3hqi80ugbglnqim6mb7qyrmmpozyfsw048aznyffedf938gf0z3fpcxsa85sk2yzhuyr6zj7q1xqn9ypmswv6ng',
                root: 'ydcmyxrcoc07tl7fct35o29egzqbw3',
                sort: 417968,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'b65c48ae-5257-4e88-aec4-8f54ecae60d6',
                name: 'xk8rfxy92ur1s36eni4ll8ervnbgrpg6tzelfb22lxiyex3ki6bmnfb7v3xbgbhj3ilxlurkb0bz12ydfcop0pvb2sowuih0gitork3l5xvt8zvcfguk9412idhq17187bvsgw2nkebfv02zirx4qss1cjys419jxfyizg25bqd90cfp50oia9ucweh5cvwh0twoiz2t2v3z2abqajmb0ae9tbzm9k93sa5pw637ygukcz630b4m4npo509vgz2',
                root: 'sfpyxjdiyxyal8qt6ly4vzd9cazkwki',
                sort: 115249,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'b65c48ae-5257-4e88-aec4-8f54ecae60d6',
                name: 'nb03xswtoklsgsubkjteez7t20jleeb5iy7b43kgntqeu6qu0ltchsuf8i0m7phrgp5hyvvb13r8mj98idwdnr5v65ztw27tdfystjbadobisvx3xla5wxobs5p1xp0l43uhec9fz2pfhu7cuz2fx6ykatrcsuhbs98x7a8sclcz6spbsr9la8uo4mmi6pvnqmicqguxw4wxh2fxmrr78aemi4meh3cadrnp4rhynhnhcuqsb0nokbbfz2su2sy',
                root: '9vvc55j102bnamqn02r09j3nqq75g6',
                sort: 3721425,
                isActive: false,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'b65c48ae-5257-4e88-aec4-8f54ecae60d6',
                name: 'z1buygot2eg4d3cfvr0hmoer7fsjeyjyksrdk0quz9j3tpdocynu03hec6u4lk20kowusnvknxtuodks43kvkw64u4g9kekd21v2oi7kuxbhav5qvtnrv68y55qhwuazcjc505b1q91dlfvc3m7y4q6hivyd90bi0ff7pdhflrfb4cpmu4y5yp8f4kv63p2yem96gcyd32rv64qozu0ul3h43wfhlzi0tb4mvkhezd7g7mxkbt9gwm6k5zmoaj6',
                root: '80reh8jsp5pnlfzj0qyvoh39psgfwf',
                sort: 493588,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'b65c48ae-5257-4e88-aec4-8f54ecae60d6',
                name: 'rqd9lnp3p169200yl3jwtddh48gphiuvfl2tditgt6hdpfjqqrebjqkme3k2g8c425t5bbzvxyvn8rc6b4ycf8qf6pixeafuat2z6thuhe1yobjv6tamgt12duc8myzdqx0fb3l9o3sy4bimavfsv245lp8bf9z2aonlki0dh47mklb92ixlz06ehvojcf0wu8ga5xqpjsa2yl4b3eyyqnhnvz7nkgmrypkbek5hefchprjcriotz05fr4x4p41',
                root: 'o0emiwiszao0vvewpkydkzteip9n5w',
                sort: 963886,
                isActive: false,
            })
            .expect(201);
    });

    test(`/REST:GET iam/bounded-contexts/paginate`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/bounded-contexts/paginate')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: 'aa328ed4-b6b2-42d9-bd1f-b589f467440b'
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: 'b65c48ae-5257-4e88-aec4-8f54ecae60d6'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'b65c48ae-5257-4e88-aec4-8f54ecae60d6'));
    });

    test(`/REST:GET iam/bounded-context/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/bounded-context/7c4af9aa-c64b-44ac-bb43-45f5d0e0ed1b')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET iam/bounded-context/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/bounded-context/b65c48ae-5257-4e88-aec4-8f54ecae60d6')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'b65c48ae-5257-4e88-aec4-8f54ecae60d6'));
    });

    test(`/REST:GET iam/bounded-contexts`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/bounded-contexts')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT iam/bounded-context - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .put('/iam/bounded-context')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '4c61a5a8-9a7d-47b4-b7a1-371a07eab883',
                name: 'fv1ysbuqqjvc3drzow3vqzhkfv6irbkmqwpvws7qgt2tkh445jp65rkbqdifunilc4o85bopclevrzcz55dn37gcwunt8gruxgt7eib47hx9at5hdtv01dlvvop6bsbgbwpaudlcsq0mcubye215fu2el35ivi1a98fnzb54lf90nlqjnb4fzcaxw9g3e6di6717cbh50idcl8yejmg390gy7leghbodszm7uxaatw8iyrehw8fbyc72pcdyh0u',
                root: 'cv8kebibx3ye811x49ezsc4ngtzc52',
                sort: 253977,
                isActive: false,
            })
            .expect(404);
    });

    test(`/REST:PUT iam/bounded-context`, () =>
    {
        return request(app.getHttpServer())
            .put('/iam/bounded-context')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'b65c48ae-5257-4e88-aec4-8f54ecae60d6',
                name: '0tutw4tp7obo1kkk7cw4pdqzy37pigqq75s24k6drjeiwfi47t4zm4n1nd2mofa2na4zcx12a7padpbrhlwe7befafikrb6ikjmm6k98xyq7l1abqu60o5xtcbqjqjhgt6jxmba4lk56hjco75yufb31b1yd2uymwtit62ntcn1eciuzxxsdori8dllmm5tpt7det5bm94i12xa7z23emaqlnh9pznd5q68wyrhr3l6gpukqnqp8pafma5dx5ch',
                root: 'mgxtf3yiy0kky0z4zpvc6ecw8bs3cz',
                sort: 107383,
                isActive: false,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'b65c48ae-5257-4e88-aec4-8f54ecae60d6'));
    });
/*
    test(`/REST:DELETE iam/bounded-context/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/bounded-context/6d2debc1-f748-4fec-a0cc-50331df3b1c1')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE iam/bounded-context/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/bounded-context/b65c48ae-5257-4e88-aec4-8f54ecae60d6')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200);
    });

    test(`/GraphQL iamCreateBoundedContext - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:IamCreateBoundedContextInput!)
                    {
                        iamCreateBoundedContext (payload:$payload)
                        {   
                            
                            
                            
                            
                            
                            
                            
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:IamCreateBoundedContextInput!)
                    {
                        iamCreateBoundedContext (payload:$payload)
                        {   
                            
                            
                            
                            
                            
                            
                            
                        }
                    }
                `,
                variables: {
                    payload: {
                        : a42caf7e-06ef-4524-9e43-9cd8ae217857,
                        : 8vms4vxgnb3wi7e01p3y5msphmsq5gixvrtlo4ifc7wb61b0t0z48ccyq59z616otg781l6pqfby0j6o9mxnua6wo2aqpwf8kidf0la5d57cb4irkkgcfbascbxznmsuquu47wksbbqvyfuziehvrkuopgqwgpy5rz42w2qdm0pbsk9s4ib5cbxfc5sx0t7hxktx53m8fsnliyngzt5c4tbxa1xrekf8tyvidjvv6t5b45j0o1xb73m7dcqs1gi,
                        : r2jhqo5j5fll2pquuyqsbkzla9ace7,
                        : 664938,
                        : true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreateBoundedContext).toHaveProperty('id', 'a42caf7e-06ef-4524-9e43-9cd8ae217857');
            });
    });

    test(`/GraphQL iamPaginateBoundedContexts`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindBoundedContext (query:$query)
                        {   
                            
                            
                            
                            
                            
                            
                            
                        }
                    }
                `,
                variables:
                {
                    query:
                    {
                        where:
                        {
                            id: 'a3a1d6dd-0339-4381-a65d-70be165461de'
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindBoundedContext (query:$query)
                        {   
                            
                            
                            
                            
                            
                            
                            
                        }
                    }
                `,
                variables:
                {
                    query:
                    {
                        where:
                        {
                            id: 'b65c48ae-5257-4e88-aec4-8f54ecae60d6'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindBoundedContext.id).toStrictEqual('b65c48ae-5257-4e88-aec4-8f54ecae60d6');
            });
    });

    test(`/GraphQL iamFindBoundedContextById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        iamFindBoundedContextById (id:$id)
                        {   
                            
                            
                            
                            
                            
                            
                            
                        }
                    }
                `,
                variables: {
                    id: '89503ddf-864a-415b-a01e-e8c561e1e839'
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        iamFindBoundedContextById (id:$id)
                        {   
                            
                            
                            
                            
                            
                            
                            
                        }
                    }
                `,
                variables: {
                    id: 'b65c48ae-5257-4e88-aec4-8f54ecae60d6'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindBoundedContextById.id).toStrictEqual('b65c48ae-5257-4e88-aec4-8f54ecae60d6');
            });
    });

    test(`/GraphQL iamGetBoundedContexts`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        iamGetBoundedContexts (query:$query)
                        {   
                            
                            
                            
                            
                            
                            
                            
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:IamUpdateBoundedContextInput!)
                    {
                        iamUpdateBoundedContext (payload:$payload)
                        {   
                            
                            
                            
                            
                            
                            
                            
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        : eb8bb22e-34ca-467f-8a9f-d8a70b22c201,
                        : 51csf984ftn4rtc6qu8tx3dqvdjck6psfv8i1om5p4hxd09omkl6ynyzn304x6ia2lxjqm4afw4anssmy2wwhf8e36joq0a9g65r1s5rjtf20f33eec2ghetehxl5n8tolf30f38tt3qkjemcsdaelc3jmt4heoaeu2tm8lkabbenzjkcblbynpf26k9vrinai6vkvo4514t55nnk1u0rwj19nbb5osvkzvt09pys4dsorj58gydhlbzeyi4d7d,
                        : m1ighsxmh0yed10suir7ahwgv6m1d9,
                        : 156228,
                        : true,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:IamUpdateBoundedContextInput!)
                    {
                        iamUpdateBoundedContext (payload:$payload)
                        {   
                            
                            
                            
                            
                            
                            
                            
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        : b65c48ae-5257-4e88-aec4-8f54ecae60d6,
                        : 3pzvt4b4bc9ir1chtkdnva8s77bbjoxt7b5sjldxafbrzuqjf4xlp7fz9l8v4xobwt1tts4rd3qm834lh6vph7nqoa3guhvexlzfma4ejf1r23obidcxjispfzqpnq5vxd74frdga5mbanqv70wxvadqsqmu1mzjmcl7h46h7jvwb2h1hypfgfsj0bvnfv6li0q547whg5ih3apanas0ymu6cdqsd24szzw3o0wazxnqkxvhecqtkfk44lpf2sj,
                        : yd9gj16uhvaru9hfp599xy1qrwcdxy,
                        : 669637,
                        : false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdateBoundedContext.id).toStrictEqual('b65c48ae-5257-4e88-aec4-8f54ecae60d6');
            });
    });

    test(`/GraphQL iamDeleteBoundedContextById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteBoundedContextById (id:$id)
                        {   
                            
                            
                            
                            
                            
                            
                            
                        }
                    }
                `,
                variables: {
                    id: '8146920e-d019-4345-94c9-777f5b2ca4a5'
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteBoundedContextById (id:$id)
                        {   
                            
                            
                            
                            
                            
                            
                            
                        }
                    }
                `,
                variables: {
                    id: 'b65c48ae-5257-4e88-aec4-8f54ecae60d6'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteBoundedContextById.id).toStrictEqual('b65c48ae-5257-4e88-aec4-8f54ecae60d6');
            });
    });
    */

    afterAll(async () =>
    {
        await app.close();
    });
});