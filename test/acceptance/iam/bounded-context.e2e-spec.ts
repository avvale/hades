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
                name: '0xqjuuowf9oz3yr3x5u7s95x45ab72fb32oaw7h4e2o8n6ozw83x1ocyx6cbbfkatg537ur8j0dkcyw3bi2j7rkhff0ycfl0ztkjz2zup27m5wcd3i75ztnwegoijffrvz0bjj1w0uxqescnp5gk52mf8xi4h6y1pn4auuzi6r0tyaw69kzg4xt55v9pxb66qzeyx52pqxb0f01cy0rzixcutaan0shtbapkvrvhk3sryz9fcsjgz07h55t1o2k',
                root: 'za55mduc8osuvmgqkl8t1vcox0rqfb',
                sort: 945173,
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
                id: '1bccab0c-9cee-4ca8-9d2d-92355f197d57',
                name: null,
                root: 'trlw817s0u0m1p105f6jygyfq1neot',
                sort: 818150,
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
                id: '1bccab0c-9cee-4ca8-9d2d-92355f197d57',
                name: 'izkdqutqwknrli2oyrcl487gz9h8o5ebuf3c1vndrfqxutd47wy0z6haf4iz6kuvows9kxswtxtyag17s8kpschnaw3cb8wfbwto26yh37jgrf6ztds9llopbalz4pcmpgx2pf7uet0q96itq9e99nfw8f03apaqfgwz9zavk309x0vl9xw8uzd8pq77pnlsr9tdod5jtqg16n6it5s6pimucbiywmiznkko6ph89zvnd8cdjmxujfu92z4panh',
                root: null,
                sort: 825154,
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
                id: '1bccab0c-9cee-4ca8-9d2d-92355f197d57',
                name: 'kduaqfvvjwfvacruhuzwgy085n0bhqzpeww9ttqok4zhklal5v52nsol75h8g36x7xm99kuz4hvr188o1d0xhulpvq0grlquo77f4e9t2b8ld5sv1qgikqt93voekgc1aufbintrxmp5wovgfqlkfbbyzlfg5ehyt94i26r4u95aknar39jx2c0dju7kfldceoob9wajavfbvd0ur5dkpre0p4qfg8towoleho652jcc6lst4h8bsjpz7ejiqne',
                root: 'y7psxwcs7tbbtybe7zxawgkyi92e2q',
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
                id: '1bccab0c-9cee-4ca8-9d2d-92355f197d57',
                name: 'biznj5uzyjjfq5jmlkjwrkd1gkfmka06uogah06li9am1qcfae6yxq5h9dri205817jm0v6i7obmqmxtfprd368rofohglcn0xtck19mt5upudmxwpy8w0jan3vm3n44021rg45r2n3orkkcak41q8s3irfpla1568n46yu3a1vc99y0rvoz91e8au9ovhh98a0yzvznied91q4ksp02uk44gaxgpzbkcepvysfdq0cp32m5luqhoa094n6c6ks',
                root: 'qywbn0rknl3zk36v4ouz2a7zfe9vol',
                sort: 441390,
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
                name: 'b8n84j0cyz9pgzvrheus53o8jlwhfdap44s6r013tepglteozas9p5cwtal41wqq4bb7apur3zkb46mi9fohi3rrru2ra11fr54bjbytdkuw8983g7twoq14izr7jelcnle86cnj9pycbgo1qq8ro7un6zdr43bmo9pqiiidque33ukcwam1joephzkx53ubko47l6gzo1pl7orazcfmn0j5fnpb31mtgfdjjm7vnriq4u3jxj1imxnn70pphic',
                root: 'wpwsbk7mi40bhm0cea50jsunix897f',
                sort: 605666,
                isActive: false,
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
                id: '1bccab0c-9cee-4ca8-9d2d-92355f197d57',
                root: '18nrh2tsgawex20xid2zsjy617pq82',
                sort: 590429,
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
                id: '1bccab0c-9cee-4ca8-9d2d-92355f197d57',
                name: '7ck1o8dnrrb6enikob3huf1prxlywjx2rejjzu2iebxd4pa15gma83pv2dweslieq39lyy3o8xlc93io4ozrhnzyrytq3lcynw8mllf2cr3dgr7ufp8sqpaxyel2vh7ts14eke71slog9hsyragrem81qqn7wcppk7bm7ku5gzdv2a0poly1tcf5dfltaxat91i6598weiikkgzmhzky03ftei3pe1xorxwuffgby6emvpym2cyphll5ey4vh0w',
                sort: 475588,
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
                id: '1bccab0c-9cee-4ca8-9d2d-92355f197d57',
                name: 'mifrla24rphs8rry2sndgawz8h9zd02xnp3xdfej0w4v77bbjnc9kfsh6lv42m4qzl53n7yzc6d89hdheqpgh5d7ceg8le124kvcglnxhwaqko2kxvap5e0d05wop4fsu0lka1vfuc7cbkcoo3efk2ks9hwgmtyx0y3j5v2vzyvj3qwqwb8jl0p1nnkbsps8q7nwte7qoog7v062qc1fw3zyg11qjoijqwypsmfxuq427rgxoq1mcq3uwjvtk0v',
                root: 'ptocer9vy7olh45vds8g3c6s33gou7',
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
                id: '1bccab0c-9cee-4ca8-9d2d-92355f197d57',
                name: 'mwirmo9krxbqu74sklvxifj6u4h34cagm5e07t7djs00ly5mtcp0o4mgpgxwnzp8u7iuptxeakk4zdm470jvi46m1s2awhn54ckqhi338sr3s1h2e4k50i7bjhderbdkve9lavt0vx3gf2my5mo9ljg5vwaqz1efto86wkgtolsp3gn07h7dgbyasd3usa9f4waau3kfqnvzrcl9bkpe0uxmrfudd55wulrzfvrrb2umiq399eoog67t1v009cv',
                root: 'lhd2h1s8psskc6owr3fd7wgn1ao2ix',
                sort: 275338,
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
                id: 'dmxnyiihigi6tqla5otrllzrnprqrkysiymv3',
                name: 'vze1zwz40lep7ts71o67qh4njidqi2hghlg5daz19be1a6tg1nnpyfih56nyzx3cqn10s4klf76orckqgd47fhdk37zgrpqjie4mtp9eritxb6o312v0qy7f6toimi3hus00fbjehbk64mhr4tlnmj6h58spluh8mkm2yp4v3wxr3rfss3iudwg14dxj6vp03glor9lum2frdsl0fw2p0ewosmh7blj55ioky6ouqg9tpyywhkomyjkaiysr882',
                root: 'bskfgwfv8cla3362abccda6sujh3tu',
                sort: 755315,
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
                id: '1bccab0c-9cee-4ca8-9d2d-92355f197d57',
                name: 'mhqt485ng4dk1pe2ualqsh2306jgiwjecpip49exim73u0zh349zbtuiaqqijkcw7hfz0ad3ie8rdy80vsxyffh0pxsernys0n8kuomzs9odufgdx05cvlk080hn1f8maf921xdzse50rie6l8sgunrxixlykmw20rokkozj14hkm6jynf193ck8g5qo05jg2xzwrsghrl6hxbn2vdxlklgcimff2cyznnwdz2ife6oomsp5bo698eprmonrnhxn',
                root: 'mfy5dy242kcmkqqh3pk2dujp2f8f7w',
                sort: 198017,
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
                id: '1bccab0c-9cee-4ca8-9d2d-92355f197d57',
                name: 'h2as4lsl64ugo7tphyycjsradninfetoga4kesihcbt5b4l31jgyja8dn6vvber7fewty9wgry2gb44zln2qif8qtledu4gdztn4of3uoff2kclupq30dgys8ir09j8b75s5ygv7ptfs4241cvj7rc9qyvqhmdja9mbt3qvsc6id29bgyq4m3cbcnb11vl4ctqtr0dbdqgbj3jtbenliy8jw4n3p3gfium0kfe6lz9vh1ycavv7pwwg351heon1',
                root: '6m4aru6yff18s9tnehjjfrzrudd7al8',
                sort: 703939,
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
                id: '1bccab0c-9cee-4ca8-9d2d-92355f197d57',
                name: 'likph090wf0jlbg49xvl0qlcaycnnj0bt9bhbccddjhuxvuj610h2ab1506rbikesvrlpgglmur11fuqi3jlqzmv7b97t4kslev7skf5xef7tpv9ei3237sn0jkkfdup82isc6bw8nhmxn1jeelpr5kgs7x68q46kml78jwkcyw3xxdms70r12qpv17fbl6nd8t7zizjwidpnhq61vbxywvvagn579uec9snflmsiswrppxr2kqtxqiu85khnf6',
                root: 'wulylg2kp0k36ob7bw2fz8sazn5njw',
                sort: 6816147,
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
                id: '1bccab0c-9cee-4ca8-9d2d-92355f197d57',
                name: 'ehxkd7lkr2imm6n9ibmtbry0j10hd3ktioub3xy915tlmipj9zd4f67iiu60urnei1lgzixfk3fn2c9ijyzbn6mxusm973x3q88259doxfd2nzmd7gggalbg9ta3lms7o8jvlz95dj70uhayw1ji99umo35tcsivq2ia009av7vkeaqz6og671nzba2k2zqkbl8jdb1mh9f8iobx9es8gn3g0yv0jcd6hwfrnd958j88cdtvzrybzfzfjw7icgu',
                root: 'con1w81b10j3f3x98flxb7e7dpgzme',
                sort: 916702,
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
                id: '1bccab0c-9cee-4ca8-9d2d-92355f197d57',
                name: 'tie4r75eqdm1sqrj5pjymb5x7uls8v1rn894j18unom066yg8whiow5j7dvt533t26nohh8pd3pa3epszv7l29fvlycvvlbfxvcy22n77z2xcnkgg6dezts28pbrafq29grp1klcxjvtewkhekt7p5yxtnq78q5hmg06hha7g6m2h6420us0txt41dvhk9hrh560ffuoc1ejj51uqge0g3bdjcw3ylbwp1d1azube2b9gtpihnp1rmswcv92btk',
                root: 'w7uik2xz34rtgk0koj9oeec5p98b75',
                sort: 387187,
                isActive: true,
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
                        id: '96f72457-f2fa-4dbc-b6f5-fa2b4d27249c'
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
                        id: '1bccab0c-9cee-4ca8-9d2d-92355f197d57'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '1bccab0c-9cee-4ca8-9d2d-92355f197d57'));
    });

    test(`/REST:GET iam/bounded-context/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/bounded-context/c24fb648-92a9-4d8a-880e-163ab84a1b60')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET iam/bounded-context/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/bounded-context/1bccab0c-9cee-4ca8-9d2d-92355f197d57')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '1bccab0c-9cee-4ca8-9d2d-92355f197d57'));
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
                id: '37c49d70-af43-4079-bfbb-23a76361e236',
                name: '0epcbbrq5fybyfk5zyap0kjv8zwq1lmqqqik1s5sfxfl9ksm3d1smqrrrznhxrwcbdl6z14358knkx2mz2v4qr9obwercdl03svgeyfsxxu9f7d5mfur5z16p0p1oj0csmvchc8tlkswlng166hmhwp71ityp6y4inhm6zvttzjb6i4lhtz1seqxseh9mos81avsuefyhhw9xxxkyn31ikief68bner91yjz3q1a4p471ei6mg7pra1ftn36jkw',
                root: 'zk0cn3wftu30xz67hay2d9q8app9e2',
                sort: 201918,
                isActive: true,
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
                id: '1bccab0c-9cee-4ca8-9d2d-92355f197d57',
                name: 'tqwnl14eo7qk8stwk8ib4otcr4lyi511z3xnkhle7jlja4swtv9iu61ehpl124cbwdd3n0pn5gsr0s60n3dsbjo6teu2qokhe0aarnt45l7vnxx7jg638yclzjctsq66yxyd1lvxlztugxeu4whvykim8wqc1nbi5m13xg5b8qfpuysdi5t6frhnhaeeovchy1y5mj1s2yc79o1tmh43pldff4k6bxj4pu7ly1eet0av36ksyfamij2u6wqkook',
                root: 'q09rjr6gn3dykxpadgveeh39qb3vsm',
                sort: 434037,
                isActive: true,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '1bccab0c-9cee-4ca8-9d2d-92355f197d57'));
    });

    test(`/REST:DELETE iam/bounded-context/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/bounded-context/5378cd38-e157-4bda-98cf-31d38aaa7486')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE iam/bounded-context/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/bounded-context/1bccab0c-9cee-4ca8-9d2d-92355f197d57')
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
                        id: '6ea340c5-01da-45a6-aced-b64bd597f97b',
                        name: '6r23rpy6m4cztqya12iybvpy3vxwubxxig27v2p0og2neigu7qu1y2pq24x80y5yrjrm19vumr8js51fx54npmloomgy0qelagm6pqij8h36n65194m3v4dc2j7stms1tdkuz2k5vp09d4ddn3i1xaz1ymvdblcbd6qk4u07vagxh80bs6g6qwow75wy6eysk8ckhw12z0c6eokcl5klkvtarbjpxb6ca710dphvzwysgny3itms5w5333zd42j',
                        root: 'h8ibo3qgbsv4yi87py9a47ysrvjjnv',
                        sort: 999278,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreateBoundedContext).toHaveProperty('id', '6ea340c5-01da-45a6-aced-b64bd597f97b');
            });
    });
/*
    

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
                            id: '42b454c5-9aca-4f24-8df8-ba8d8d4b667b'
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
                            id: '1bccab0c-9cee-4ca8-9d2d-92355f197d57'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindBoundedContext.id).toStrictEqual('1bccab0c-9cee-4ca8-9d2d-92355f197d57');
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
                    id: '2c5d46cb-97ad-411f-bff8-1b6844c5b091'
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
                    id: '1bccab0c-9cee-4ca8-9d2d-92355f197d57'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindBoundedContextById.id).toStrictEqual('1bccab0c-9cee-4ca8-9d2d-92355f197d57');
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
                        
                        : 79afc4ec-e757-42b8-97cd-7713d3b74549,
                        : duplxvlz8uczpvcw1g5ity80cmnvxjcjesg2c67h8gpjucenr4sm0dx5ai68z9k30p3b7ypvmrpswh9rd925pn08w28yiq4hlrl8qr8h6i0r0v9re4zc17l2h7jqb3011tjiw8qgu0jkhpngzlax5dy3dktmiofaoq8c85sqgcsiy8ckhvc13y12ajb6ljl2osefjtt4nxtzrod2ougldhqgpgm8g874rm2fjeq8bpbnnjvrnznox7t9tti65cj,
                        : vjrifzkcxhh4gg4tfc2h9rc6d0glym,
                        : 628800,
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
                        
                        : 1bccab0c-9cee-4ca8-9d2d-92355f197d57,
                        : 4y5l2djvy6hyxqxog3i12tjgy9t7lopbyu15h51mtjefbvnmxji7cdoukwtwcmwo1cz2q0jzq81hfxaec7zqbervdmcq0byxwkubz23ik3ddnnwrziu6oxadg56cj0bgr3rtq2405vtx2uvqauceefftxkfsu1uc9t0grte2fzmm9cc5uz9zqkwlpyocso0jo5vgomkjlmovrcts8997dyeanjwzclj2r6oqncy9qgjrw6r331ltnetb99gkqlj,
                        : rnz9rvbo65qhh3qr93gra5r328rnen,
                        : 717491,
                        : false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdateBoundedContext.id).toStrictEqual('1bccab0c-9cee-4ca8-9d2d-92355f197d57');
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
                    id: 'd6ca98ff-eef1-4d7f-8886-d400b7113cb3'
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
                    id: '1bccab0c-9cee-4ca8-9d2d-92355f197d57'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteBoundedContextById.id).toStrictEqual('1bccab0c-9cee-4ca8-9d2d-92355f197d57');
            });
    });
    */

    afterAll(async () =>
    {
        await app.close();
    });
});