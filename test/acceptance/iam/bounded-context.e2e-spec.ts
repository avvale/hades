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
                name: '3cqrkaa5nt2dmjm3d5gh3gmpakk7nl2klw59wj3ewgsx119hv7eiz4etk5z718gpekoq28o2zt9ajqwrnh3tf5xsevd9jzzo7lra3u82jmr019jkea8ysafsgmz7pxi7m34jq223kfbtbvgz92z4ewg463lly8iq9hbtyu02wdjqgtiavoy4shckffuici9hlng2uq71kbg098f38y2wr584mpi8yciep5iq0e2to9udjmc5lkdja4ra0yn6kxb',
                root: 'b54w30q0aesmnwgchp48jbuyr2z69g',
                sort: 418276,
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
                id: '11e5b2e8-637a-4786-b77f-03d307a324aa',
                name: null,
                root: 'wtttfdb6m37rgprts4r3orlvjoyt31',
                sort: 624717,
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
                id: '11e5b2e8-637a-4786-b77f-03d307a324aa',
                name: 'jdqv7cw4zfg9amyzpxm7s41nostu0zcmeo7r0fq9eyn8l0qxbvb5rxfawqwfwbj0vwklihmwk7al0y0i2ypjpcqq736ryu82235nh6s6qhpmt74udf1gnipkxz9z7nanajyp2klsksyaqdreqqn8xfb2mt19ze05ougbbvk5yz7n5nwryhe3svrk3o3s5501rioq7kacke2n67vhni2eykpo2l6lg8quyxcuc4or4ot8scrkjjz98ack7l5bjp5',
                root: null,
                sort: 326937,
                isActive: true,
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
                id: '11e5b2e8-637a-4786-b77f-03d307a324aa',
                name: '15g4lwy6pof4td2ylpdfr6o2amq8t5uy9gbutrys20qgueltdud5seih5ayms5oaenwfgggiqxkrpeb0fsrwuz4dyetosm8we2dhpwfmqmn8gbzy83lk5j11frya0yhry726wtoyanktvfguo0p3ksaj8gj3zapijkzf7rpnb4d5ect8mpdix7w6v7523aj0o90tiga99eebczxgjqs881q3gems40sqf5fno3e275c0sgj1c87ktjm98tqyo95',
                root: 'jwsdowho3u2p38rle1uqr12brrmkpv',
                sort: null,
                isActive: false,
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
                id: '11e5b2e8-637a-4786-b77f-03d307a324aa',
                name: 'j503173tp21f3kc3euu6nri9nh9wjletx8jzw95ouuz1s0mkpnsiah2jbctgx0alnarkgpg5ujzjw4akojwbdub9btgiu6mq8u6kbgfsemribcq5gth56ohzakisuilcwhnaa270wmufo2u1agij7m8wav8dpjevspveo5rjsd30zkzhuvfy1g00xje7cukbs078kifaj8ltbj2uuvqapwlsvodtobr416ktv3hx1gx32dkaakt4qas1p2rt300',
                root: 'ap09prjrueu60lyu5mjf7lmgyrr49j',
                sort: 520875,
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
                name: '9dvoxhmf396tnlcypxo8qlga6ld2lfo0ki5n6tw392c1yu0hukkfm500yjs4hsyxa75hrmw9de7q0iu1cvryjhuqosvbqcn8xusel2nyzw80sukm8q1tnx7ycchlf4xvudf6zotsvsrrxy6yi1tq7z27frtvyr2skd8340odey0yo4nwbw13ob8ke6c9v6ldy57pjsymu0ikpwfac81015w5cb9wb9zi7f1zl110sh161wlgivar9hmnylxf7kv',
                root: 'kfoh9602hs4omoerdoqprzi8jtkr7p',
                sort: 314346,
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
                id: '11e5b2e8-637a-4786-b77f-03d307a324aa',
                root: 'vgr5g2z3p51lg5qkb3r20uhmkfug44',
                sort: 967913,
                isActive: true,
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
                id: '11e5b2e8-637a-4786-b77f-03d307a324aa',
                name: 'p84rkwjj455jx14c7krsf1mg5kpspzn4rxmltp5l6axn2d87z7hcbxh0ip7hdyp24qo2fp6x2k5dnxr8mer60asb264pcxcnudzluxcslg9hxmfrizjn9n0wp0zo0mvwgj9fw9r1v215xs4v5adblcbbaxoyvnvghfn4z0t6jq3pbef2gcmbhuzmi45puu50lzcytzuezgpk5z1xynj5wmhfa8qj0itvhazgz1m50npptoo957l8s82hefgsawl',
                sort: 681851,
                isActive: false,
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
                id: '11e5b2e8-637a-4786-b77f-03d307a324aa',
                name: 'n075bhl7f121fedspmam0fmkikcq03w7o1qogo4sqk2y0fpznw5qrtq62d9p62nsv3v1d0q67ad3qvvkp7q1rdv9zakgxxxwvyh4aj00ibuke6dpkpc3r7e85j093r9p6pk9fbyccysbdo84xfjkf9d5kxr4rn1vmast30ko7v7xqdd8jbms1l64qw46c22ekj5ssos0xf99jou82e6jv4qmv1mx2poxrn2d3hx3mp8fbpt16nva3egjyuz2izv',
                root: '1nl62f7isg8dlzbkvo5csezjhl42mc',
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
                id: '11e5b2e8-637a-4786-b77f-03d307a324aa',
                name: 'ei59bptvohknmgyvtnul2oofng2nlab0agsja8m392qwbuhcj10pg5p02o0x7d5e3lytn9aeg4z8i9nbfwxx79a8rz3eu40x4hqgtjyzvj3yzmdooez6lbza8v33n32k7nfhotrxgx5i7zh5c39jhzs01xjjru86pma2q09blca7oatd144ei3fplxa8k0aqeth3rtkidmou9m7wkwhsehyfwbx8xn9gkghkvnc6o7t93ohnojww6r7ap69b1zv',
                root: 'n8rikrsebiuez54ambimim0f6x29mt',
                sort: 140706,
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
                id: 'mwkho2zmc18fheg7atffz2sf957qnvaedkyvl',
                name: 'h13jlikarithqil8e3cw1d2wvbckqa643i1k1cgv7q4v4265wi0i8tx696bopn5ku7le8moyxgukezy6ena5r68n9wv88hrx7qmj9s9khx0dkhncte9xxj5jer4gwqs804oy7e1sqpd2aju3kg97lzj59296y2ehthie6t48e24ylu62z2zuw6uy30gejede314tagqhm6rudi737rxzgm5dep5dujsqbvircsx9wqbwbxqfyfeh4dtgd6s3q3e',
                root: 'yyneo9zhew1cspur7p055ebzkrcgus',
                sort: 215403,
                isActive: false,
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
                id: '11e5b2e8-637a-4786-b77f-03d307a324aa',
                name: 'mjgred8jygkd8ufcsof303c9w6o8cp3mgb0eh2ggh43pc0wpfum5josyassnjl6ggbd6g68c4rfurp3h4c5t5abbcbnhcc17eg81pmf2ev118bvse61qq78zz28erqdg2byi9x5uvijm6t7gaj6ehwzcbgplmari6hot7ugozgipxzkohxg4vuvrjwpa5allo4wq0j1ew4ijgapitow76uk6eyl3xtcz2a93f6sxry3t92f09f4w4d3si60upcys',
                root: 'pqzgglocyg3t8l0znqdldxwtc14zkg',
                sort: 990818,
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
                id: '11e5b2e8-637a-4786-b77f-03d307a324aa',
                name: '2ugl9565hyeakvbrn6rdr9iu0dfn6isxl5ojb0pomisadg238s8mz4vccqpgxsy6lmlr2m5uqa6yqxrykfv07llt2mz1g6ydmh6x0cx3i2uvbt3fiv6cgz4put8z9kasyp449g6hsfivgtv7sscz4vzko7ny9mvvmv4e7yloo6cn5b1lha8e0ujogvavvwbmsn9lvosm501zvzvh1fkon56q9m8y3al9qr8d6u02ufvzl6zuvbm2tu9ciouewpg',
                root: '6tbste1n0nqhvi34sjbn5ybdn8gyfdi',
                sort: 500192,
                isActive: true,
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
                id: '11e5b2e8-637a-4786-b77f-03d307a324aa',
                name: 'shoyns315d4xag92nop5hdqkehpgih3y0ekj6sdc2eugakg3o7jmq3jtp28658pg1b8b30ggwywfw2ed15dxeq0jhbyk3t1xqv85b4ld4qtp99gytohivmfabrpgr804fghvbhzmqaxmlo1pvjfgay0clzqhegxd5pjp67egnucq23knb4xjft6v3sa9l5nsmqbbzgy43spikl2u1mqcflbiygiklmcv1uwlxjfl43o8wuwp9t3bibxosk3f6iu',
                root: '4r00ifixlvsoltqnq2yva0wpckpl4h',
                sort: 4820419,
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
                id: '11e5b2e8-637a-4786-b77f-03d307a324aa',
                name: '8ehlxc7klj4nl72ac3qejtk6sv9ahzjbjmap4u31sqx7klchd4aroxeoodmt3ptjqkzc6mr12fxg5e3ymkslzjg1x5tjb87cl8f30s5zcrlpdo2hqx2ge6ieh4er6c36164h7buuiac25ez8z5abbsyplcvb8h68oepf0ta5f7lmmvytur557ggkqbbydirct6md6icevxuo56qy20xp57o61hosu5y4dvt1vj5qj1seog940kdudrgaeciyvlu',
                root: '8tbtrww8r4o2e9rrylvvim0spqo1b7',
                sort: 774653,
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
                id: '11e5b2e8-637a-4786-b77f-03d307a324aa',
                name: 'ddua3aehb3m6v8ehtvojpljderwjlx820h7cgi3bo5p249gcmquh36rent0cm6k5q6pnet5x5kfkpytydmy8xo8butpv33pyf5oj363iz6fnusookieei73cqoeamdu76tiu3is386he647joba1ggepmw5a5ww3zzaeo6s2q0tv3ayq28ul5bdemzr6uz0bq7e8jmugj6bjr6gw2ei8bdiffqw7dh13fziywmndeqg80fvmpv6exkdxh1nkz2p',
                root: '4a72fa7w35r0f3bc6p875pb6xfc7jh',
                sort: 463542,
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
                        id: '9c97b351-824f-46d3-a20a-89f1222b4a6d'
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
                        id: '11e5b2e8-637a-4786-b77f-03d307a324aa'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '11e5b2e8-637a-4786-b77f-03d307a324aa'));
    });

    test(`/REST:GET iam/bounded-context/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/bounded-context/846b8901-538b-48b8-a9af-4111f70693e0')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET iam/bounded-context/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/bounded-context/11e5b2e8-637a-4786-b77f-03d307a324aa')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '11e5b2e8-637a-4786-b77f-03d307a324aa'));
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
                id: '464d3e11-ae99-47da-86c9-bef6b884e86c',
                name: 'xpewc2jgd1aud0m0eytaqj9jrr10pc67s4qbz3902pbl96tpie68x7jadtnpl1ih0oekrrh721ts9rkx9jxhejeppyz9g6ddsk5hs4ju576o83ryoydcmx4w4x55tos0il49sas1waak2mzdjgf0lpu99sgpgefs1qbbo5up75og5e5fckfosxji0jt4srej0pghctx735egxd76yhfa2rvn06r7gcowr58z6ti7ymoeimmnyn547ml9f0tcidv',
                root: 'bp0kk9rlpjt5llxexpic4e5d1zqbk9',
                sort: 104562,
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
                id: '11e5b2e8-637a-4786-b77f-03d307a324aa',
                name: '8mcd2oqajmlscrcs4jifygn6vx128084org0my48zxrqeozriqoui63tajnq7uswal73jsigrz9ygki6bbx46lrmjegh4l1j5z91bqj6hjm1qkvl15xah5xpmxmnz06f770djpez47bqtikgmkwdes7o8acvpsbmexek3n2t8afx3lnlm3i2z6r5l5uv0z2wwkh3s6mt9gyfihkymvi4loer2nc8j5mdkrbn7r7ikneqloiw5k1uos712oi01sp',
                root: 'kyuwatb54n6i6vamqnuyztldoc4sp2',
                sort: 995785,
                isActive: true,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '11e5b2e8-637a-4786-b77f-03d307a324aa'));
    });

    test(`/REST:DELETE iam/bounded-context/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/bounded-context/ff2bf108-c955-49d8-b0dd-3694385d91ab')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE iam/bounded-context/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/bounded-context/11e5b2e8-637a-4786-b77f-03d307a324aa')
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
                            id
                            name
                            root
                            sort
                            isActive
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
                            id
                            name
                            root
                            sort
                            isActive
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '00704b7c-f4b7-4820-9bfc-f7f014febca2',
                        name: 't2jpcg1gnf514gclqqht5sge0ix4388gc292y623wo1srvwq834ol7k30g1yobluluos7h0ag316kw3ejis06vawza68h2uy0n2x2g9vnyq6wadmc1z8nh72iteyr8z18adr1ncaodcuj084hip5fbgzf7mm5tiebbsnkzbw82yjafktuhtrn9ybh7jzz1o8rkozsy7er6bp45mc16t6uotxzzzc1s59sd53go8biyfykbe2wj7rsqrfis7a4fq',
                        root: 'neal3m8gbpexhlbcsvhh26rfb1ekpu',
                        sort: 353065,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreateBoundedContext).toHaveProperty('id', '00704b7c-f4b7-4820-9bfc-f7f014febca2');
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
                            id: 'e0405307-66c2-4feb-983d-2feaa3a24600'
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
                            id: '11e5b2e8-637a-4786-b77f-03d307a324aa'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindBoundedContext.id).toStrictEqual('11e5b2e8-637a-4786-b77f-03d307a324aa');
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
                    id: '33878c37-4c2f-4e2f-b1b0-ee05f57cf0e1'
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
                    id: '11e5b2e8-637a-4786-b77f-03d307a324aa'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindBoundedContextById.id).toStrictEqual('11e5b2e8-637a-4786-b77f-03d307a324aa');
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
            .set('Authorization', `Bearer ${testJwt}`)
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
                        id: '647277c2-6c74-4c80-8cef-941f5bc3f13b',
                        name: '9xz8pumahqbekvh8pw2iqeq7q5j8t6y3co2yt7dcvvz985qv2g76gbai1qkcicwri3gyr6nqilr45yg0snwb6ybqu7yer1636wmqoaybx17ce3xfmbohvjbhymaott9n3wotvv2l2lv07h2s2tt4h6mo6r1q30nbqzv5t30xt534ck54yjc57smdzgonox44a104f7mbu2ntqar2gwviustq9g62iad2az5b9ivok5870d20aec2g5kycmeyt4f',
                        root: 'ls24rs12gy87a09k043y9lv0725p99',
                        sort: 227398,
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
                        id: '11e5b2e8-637a-4786-b77f-03d307a324aa',
                        name: '3ufcorqfwblpved7mavo0v40trbtgmuwklhmzntylwfuf05kludd6awve6n9wh0w85un947kevoc7ti2npudx7lbqnxloo40wv4y6r0f1afkjyo9vm7vz89e9qfk7hebi2kr59rlfz8qjc3z4oup8xj0f0lig0hg58p4if5zxhn7rv9x2cbsqky10cbeyxps5z35k18dxwl7uenmtqxoohs1vh58bxmshn52di42158nofe25ar69do6ibh33ae',
                        root: 'otlwnj1501ifmn7gk8rld0k9njb654',
                        sort: 170946,
                        isActive: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdateBoundedContext.id).toStrictEqual('11e5b2e8-637a-4786-b77f-03d307a324aa');
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
                    id: '6d1728db-dd99-4e28-b2ac-32629912a555'
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
                    id: '11e5b2e8-637a-4786-b77f-03d307a324aa'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteBoundedContextById.id).toStrictEqual('11e5b2e8-637a-4786-b77f-03d307a324aa');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});