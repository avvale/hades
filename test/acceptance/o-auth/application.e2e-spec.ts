import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IApplicationRepository } from '@hades/o-auth/application/domain/application.repository';
import { MockApplicationRepository } from '@hades/o-auth/application/infrastructure/mock/mock-application.repository';
import { AuthorizationGuard } from '../../../src/apps/shared/modules/auth/guards/authorization.guard';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { OAuthModule } from './../../../src/apps/o-auth/o-auth.module';
import * as request from 'supertest';
import * as _ from 'lodash';

// has OAuth
import { JwtModule } from '@nestjs/jwt';
import { IAccountRepository } from '@hades/iam/account/domain/account.repository';
import { MockAccountRepository } from '@hades/iam/account/infrastructure/mock/mock-account.repository';
import { TestingJwtService } from './../../../src/apps/o-auth/credential/services/testing-jwt.service';
import * as fs from 'fs';

const importForeignModules = [];

describe('application', () =>
{
    let app: INestApplication;
    let repository: MockApplicationRepository;
    let testJwt: string;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    OAuthModule,
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
            .overrideProvider(IApplicationRepository)
            .useClass(MockApplicationRepository)
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        app         = module.createNestApplication();
        repository  = <MockApplicationRepository>module.get<IApplicationRepository>(IApplicationRepository);
        testJwt     =  module.get(TestingJwtService).getJwt();

        await app.init();
    });

    test(`/REST:POST o-auth/application - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: null,
                name: '6mlv9efqxcvfjducvmoigfof0hhiyhy4tg1vvpjmxg0zo0xepn2ancggony3ap9vtgic7k6z8ec5jn3bgqaqtij0tb9vnkejje5t6a9cdjrye94gsz03fltm51rolp0zxeoc9lxfhijxsw835kmo035zrbrmprqff70qpox9putg4r6zdva8pmap4iye0s2f341i7lpk5sjvzosv7wfmxjow3chn29oanhr0vek01hg5rfthh5k178ks7h364ah',
                code: '3mutwuwdb5vdkc8b2pg79jqkehf78gj7amzi81l0otqdk4cb3w',
                secret: 'cl66u1crjecza8vtjyv60zf0zqib85o1sc3i6xkir9f41h5r4xf9ncbs2703rodd76b6jxr5ypxx9nkgvj0419ssw7',
                isMaster: false,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationId must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationName property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5535c3f4-26f0-4961-916a-2159c79eb4c3',
                name: null,
                code: 'azqdcraijczfdbwgf4z54e200qc08u0r8kaqijqxaijbp0b33c',
                secret: 'wnfiyj6s2io0cm4xma1i1my3ja7slxl2mb73o1f4jdlwovjhojtki1f6y4nlt35isqo4nklatnt0xkx5z6xkyi3ugd',
                isMaster: false,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationName must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationCode property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5535c3f4-26f0-4961-916a-2159c79eb4c3',
                name: 'ra5bt3bewfqd441n653wmxxm40c6eko11aqv1sehakz2m3em1zb825dao26601qsa31jk9mxalr4elbmyt78ayfjbinkj1gwsucdqbp4bshpmciuo0zv1ir4s2dnevgkdnn9b1h3bue247q1tx3deyleax6ygo3qagjvvfdp5x5rp83t2ryphssfb4hu20rbelikzgzbyk3kga51dno4w1qyt3uxtggrlc5cjz8k8xec6vmd84sdwo48lpba335',
                code: null,
                secret: 'l5ll6p76ivug8uexiefptf8dnb5cjngiy07cquboqt419d25jbrp6m0jkyrvwm4ama6pwcncxhppzp6x8laa48j6w5',
                isMaster: true,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationCode must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationSecret property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5535c3f4-26f0-4961-916a-2159c79eb4c3',
                name: 'zyxwziqzood187ab1thi7wzsu0tbolst2lhzhx9hk4zbkcsc2p3o1f3djohvog8a262nq4c6fei52hzxic2diosmkosfweg7fqhi7wdjcmrj0c3vpfxii59fk6hwjekb28lmlbjfcw71iw522xrbykgr2d7l72vw44mcx1t282s3ne7v1y33ujl3k10npp4xh1g7mpr0f54pz8efnn5oru6ztwz4pj9akke803yof22r89gs4vvtisgr5j67li3',
                code: 'o4akh7j8tiyszakc2glgu88usolfurh779vgyoaqs7cdpve8ot',
                secret: null,
                isMaster: true,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationSecret must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationIsMaster property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5535c3f4-26f0-4961-916a-2159c79eb4c3',
                name: 'dwa0vvndoleak0g5m6pxrpd813vnonfitnd9lkwrgj77kvfh5a99eb8rq3e4ou8oqkt2jtod02i9aj5acx5cq3351mtxz8a4znt5g9y1dj44klw4o6bh71lxvdoeoa5cl6qyqfhcyatz62i8eum0qq3ipjo43ulh1w8qlt2vfu9e7k1j0x3x1z15tpfd2sh4ibyrns3ti4b7q9r88azyfxpe4vtmiq3jy3jisvno6gcxrzjmomg3c8pr0bxug9g',
                code: 'byrhxkv3avssouqo4qm0al2lk4loklfpeewuoboi2j6aq7adhm',
                secret: '1abs2w4gbphux6vxwjz31qp86xl7vpmx8dec3n5jhuxpl4zkky5akcfv1tgt75hoilj6q8qyr8kape99ueualgl0n3',
                isMaster: null,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationIsMaster must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                name: '7vv0t9dzvr2635lpcvr27ojqs9gl81nnsk2vg5uzbfg5hg4hjhsrfyw1x9b5w52qar6lphydd9bg8bihykwpkkp1lcoxkja9nr91i86ofotik8jtpnkz83uln9bdnik1ammijps913916e28ov48iv9cgsyx62vhoxydtn5dovsuq12cij47li3z0dqxdb3n617obhdeqzs8g7mww5a8taoay0hj80bmx05dt8cp3xmf5t7yzyggid409kyl25g',
                code: 'bbkkc1rfw197mpipqdj4naf36pi2t1oob92us1niggc2gcu3uc',
                secret: 'yprtzoolvo3p2r7jpjixbsb6zcaepmel7u4aajfijb0zuj905hys4gtt9t4zhd7eazztf2d8cgsu0g7z4x4o70vsn5',
                isMaster: true,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationName property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5535c3f4-26f0-4961-916a-2159c79eb4c3',
                code: 'nv3ken1izbg06b5x5rdp6wq9mhac005im0v0f31c4lzzqlwx0g',
                secret: 'w56xtkgi6kqafntebqavf8yopwz4y60ksctyk7o52dq8rsbyhjq8znam3t03g1b7gdbgj52zlxkb5fcjjckhf7jdqq',
                isMaster: false,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationName must be defined, can not be undefined');
            });
    });

    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationCode property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5535c3f4-26f0-4961-916a-2159c79eb4c3',
                name: 'rdmxwbnaca0t4yqs82qizo48r3lwggiz0cw1q4rirvi4nhihfnh83a1kc4fwtxdbgufxgwk52kyam05rae4nu98jh1yqm0x16dnushefocsynh02sl3ng07zr7fteh9tkue4g99v1dc8405q2z4jxlthovp9fekylozgiaoa5pfn02ecz005avtfy4sr1s4z64t20faoznpzj5pxuae4vaqvyn4d504fm2ch5tvm8ksnpolwpkis6odph59bnwl',
                secret: 'iyz21lsd6c1v10n548kbtskljcg0mwh2vvr9yf6xmlefzg9mk4l2jkg6kss6i9435qgp9wuqwqmv0p8s9vqfu6a4pr',
                isMaster: true,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationCode must be defined, can not be undefined');
            });
    });

    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationSecret property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5535c3f4-26f0-4961-916a-2159c79eb4c3',
                name: 'j6kfhwygers364yb2oj4q0m384mo7dy1jfk0ivztnrsj7skn1wym5x8yy9kj1l9gdthmtk7n5uk6wb180mkrv1f2litdy0btek7amjyl8gmdrhnw20suz4b8raxofqjspioe0s9qpp2pgj2o3bin3x3oe62ggvx44q3f7yxtu258ciq9ufg924wa43p1rpn5c9s8ib69xwuxbqadtud6onosbkuc0cxwhds92yzm7avcxptei4f7vswwxjv651y',
                code: 'xbfjbrd1xhi940j7yrxgnq1raj0fxvrbonxtcy7egd41ka2qt7',
                isMaster: true,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationSecret must be defined, can not be undefined');
            });
    });

    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationIsMaster property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5535c3f4-26f0-4961-916a-2159c79eb4c3',
                name: 'ueopf3ygv00yexlujltxmckos3k7xy7tbbynz3u6dbhz1isn2cxb1n4nbqcixpz4xlt6chletg3d7ngzpuov0k5c3tok3razg9mzuogu6apsuw4w1i6mn2l95j5pmyysdnf3wkosydq6i44w9dqhhhw6f6pbwhpt26husdcot8xmginbk10gvnm7ykzsy78cisbp7m30zpi19n317x4z19yxxu06nap1sx0vmylbairlvhe67py6ck66nyodcdy',
                code: 'zhvsvuqlufrbm14tdrm794e04qoin6w0yk2d0uaxe7ml49uew4',
                secret: '76caisvkrdthr4vh89v0t0j5wln8yrjfh9zyzf5wxdodfzaeo1qk2htq8voi101sspxp9kyzf711g4gwu4rsyya6nn',
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationIsMaster must be defined, can not be undefined');
            });
    });

    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 's4psln3ul8jd1msmrlz2nnbd78w4qhdyiygz4',
                name: 'h8bfszvvt869tm3z4qdnkpsy7742y0b992shumbavzhfmtuudno9rejpdknt2kwvue9lbckcdl0bjgb4h4hv1pcjno7q5sulolrzqvxaa386wmnze9ruxsaeownm3bbqrs4fs7sr746b8vopbges2e1hhldi0fucly95543qljflx77cdi6whh5r2o7gb75dajpgl3wmiybqltmvpi5enmuhko61q0ats4gr1xsyq2swp8ihaldffu3x6ycpspv',
                code: '0dz6q36bozxdh8jf4qre3cb1db4v2etghelkt1rvbniq3psx31',
                secret: 'lvjk1sr3vg28ah416udu5ypnatmcuw7jo6btgm3t7whynmwjrffxjr6c0qj91rpmdupr9nxdt7qqbsbayrieolzdq6',
                isMaster: true,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationName is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5535c3f4-26f0-4961-916a-2159c79eb4c3',
                name: 'wyb4duo30w29af7elxomkw4qzvtz0bs4n5jyu1lduqneyz5fw5fnjjuvh1gsp37qm5mwfwy74dj4l5b71glds2y0sb12zsj1el0lfz004cg3g13adrqfptz01wl1xh3uccghnoiorqffglulo55ddhp1n7nr609u3d1fjr8y9pc7ty7i5w711vze7vafythbtpduln7q4okmtrihs3exia3gv004yc8a017td10tpd0m8rl6x8vxbi8ecphfour1',
                code: 'i53bc95gg63ezhmwcww2vwe71ue6fwp3cb5wwwp4rqs4uh5pvx',
                secret: '8x0tyl1z00d2g0f6a2vcf1xvd6jzmt6vw04rpoh7d6bij13ojqbkfqehziyhvkbcfn6ub15lzkbo4ofqquq8p3aitf',
                isMaster: false,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationName is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationCode is too large, has a maximum length of 50`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5535c3f4-26f0-4961-916a-2159c79eb4c3',
                name: 'btqwco805mjg3jo3kg0nofo19ev2cnegxiovd9p18r3xlhiig2hmpmlfqwk1fy2dlagiysz5ggwupq20oc4pb1y26g4lmm4otx60nf4qkici19pv220wz8es35grqw31cmipvsq073bnyj8ivvg84vamyyqy3yz0harrf213loycj494sefnoyp5vza25miz1shnec3040s04c3d08jgvovqvtqy93apt034x62bk4uyustg3ke2y6poveydwzl',
                code: 'ev0e11vm27nl0a6uizy6x2nm3yt5bxixtzuzx9qjmhdz7ob759k',
                secret: 'r6leznxix8qbbpnlttfjae0hdl5nwncd1wpif148s0bhrxwbjxftfjdtsyu635czqkxhqgmbp9tiqygsn6ooyibpr7',
                isMaster: true,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationCode is too large, has a maximum length of 50');
            });
    });

    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationSecret is too large, has a maximum length of 90`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5535c3f4-26f0-4961-916a-2159c79eb4c3',
                name: 'bpytoaf88w1c1wfbis3wch3omcdkkrpconx489p2uflogg2jq37ry1u2limuh440kma1iqtzeylhwq6xuigjh5s860z6m004ws3opatipa9jxdc45jtb3ojb13fza7kljuaazb525iyf3niutd3051lozxpmvstc8pjat6tgkxtll1yz51awqkvqe3u8mvqshrb1ccb0rq2c38uw60extmr1gpv2iq2cpais6pwjpx8m9cqd8kcdszznur6h51h',
                code: 'x5kut0s495uj51wsgol33wrnq9xe5ibom275svenl8h8rirarb',
                secret: '324app2vsi0ki6x0th263q62pnqzt9bgfoo3orro8xrzr8lgnu06ezjav7in0vrlsfuote0bvtf2mlxx1vr8ni5bp1u',
                isMaster: false,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationSecret is too large, has a maximum length of 90');
            });
    });

    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationIsMaster has to be a boolean value`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5535c3f4-26f0-4961-916a-2159c79eb4c3',
                name: 'vvprvjl3h8nkclc6yuaulj43bse34edam4zj5h4ab4d8ep110snll6si4pwbazf5im6hogv3hgh04m1oj31t8ea2cjv0mnom06gm7ddrn79xpoptvtvsty91s4s5bf19ryk799ydsrpyia9tr6nua32puxm5n1f10cuzxsq33g6pjzvmdm9rzg8lt690nt0ha92gtbg2368q4ie7j3oxdk1b8gu6p28yd3rdxlkpy0268rr0z6hznbq50grt22l',
                code: 'cnj20no9nt1hbnukblniltnvrd0v6hpf6ihv9b93fz3vjrzg46',
                secret: '3x1oa6tvz3l0so04917hmngbmynydm8lyp5iqy53944wpdtn5wwvyc69vatjwr7xcp9pknhs844uta0pxjpvz7zy3i',
                isMaster: 'true',
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationIsMaster has to be a boolean value');
            });
    });

    test(`/REST:POST o-auth/application`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5535c3f4-26f0-4961-916a-2159c79eb4c3',
                name: 'z701s52sxnxvgld8veeedbzmtz6yig9xavv5d6p4n9srvq1dklcix2259yc9tnhpels2yt1t7wymz2akfa42opzzf8zx2fn2cts2wlqunsyzsfvruqj2mwhvw3jj20qjrd7fsy4at6z7sh1cxoy54teqrtloyar9vrm9mmkgvrl9261q80j3i6egsxhcagazxcsusjxh88c6s3x47zcduo9tcmv6hi8h6xgeg2drgb5omo018j6c2m2fnsjd8p5',
                code: 'as8vlvcww1jyvzzdhq5mh16zsnyaj92atogi4t5egtarhbwcwn',
                secret: '40tx8fz5qnfhc1iwjn5syouosppz27p2gdagn1opag06ex8tcoq40xojns528fa0c67gq50fuabw45ixlynx3787nd',
                isMaster: false,
                clientIds: [],
            })
            .expect(201);
    });

    test(`/REST:GET o-auth/applications/paginate`, () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/applications/paginate')
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

    test(`/REST:GET o-auth/application - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/application')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: 'acd96888-7b0e-43e1-acd9-ad6a1d2cb0d2'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET o-auth/application`, () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/application')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: '5535c3f4-26f0-4961-916a-2159c79eb4c3'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '5535c3f4-26f0-4961-916a-2159c79eb4c3'));
    });

    test(`/REST:GET o-auth/application/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/application/9210ce82-012a-4c09-bdb3-247249ca1545')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET o-auth/application/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/application/5535c3f4-26f0-4961-916a-2159c79eb4c3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '5535c3f4-26f0-4961-916a-2159c79eb4c3'));
    });

    test(`/REST:GET o-auth/applications`, () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/applications')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT o-auth/application - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .put('/o-auth/application')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'a0ac1809-9731-4137-a71a-0dc864bf498d',
                name: 'pndbba3d2hw10c4f0j0jebw8yp56p2lbmgbgewia1l56trxzk1jyi1czn91av3qqbeo3h7gx3ioyxcxig8byd8ls0iabywl1bj8hh2f9gaxsotlkd9mg90y2nkdztzuf0k6q06d6bhrkj5js0fkqjherdnlq3ag6bcrp0jvcwy88ub19euu5kb9nn952p45blh030caokkjdcr0nh9ikl992b21u10xemb8makj7j08af978rabf6nfn9ibn7t2',
                code: 'qqchykcm4jm8kashfp7pxprdku6eech6gskhhgm48ix2qw6nqw',
                secret: 'u7c4wqv3ssz6kmz0emx5aslzwsec9di6oev0en2n34u4hu5wk4jqwi3ztf4eg16joxmi09p1dbnoe2ivrrxnm0qfbo',
                isMaster: false,
                clientIds: [],
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/application`, () =>
    {
        return request(app.getHttpServer())
            .put('/o-auth/application')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5535c3f4-26f0-4961-916a-2159c79eb4c3',
                name: '2sdlisr924d0v01ty541hvc6ykw7bxtyjkxl2f9dh8bh9q3098aib7b5ias2vt85gzv950gjh7u4zpbrzagfbdh2ep2qotep9h5vbf0rk444xu5pvqj9v3oi2mqihdmh245n0lbdrdiocbblfvc4jz7347zs5gr7fltkveclvk7xk60eaxgj8ubpmza7gr0vp4yu9qyxmwkaao67j83flqr9d3sms76zt7w2odu0y5gby2ccxtggx27wjmzg6bj',
                code: 'g8czamg3qu5kybxjby1y2xt1oes6ft6wggiu2cf6e7gosswkzp',
                secret: 'dz16q7cjwj29535hk7op7ecx8s7nqf8agu511mrkrrx68f5hoffdqhfonddx8avta25e1yh7pg1y0sjgau2vzw4gcf',
                isMaster: true,
                clientIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '5535c3f4-26f0-4961-916a-2159c79eb4c3'));
    });

    test(`/REST:DELETE o-auth/application/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/application/321b90f4-cc09-4548-8dc0-05b73377192c')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE o-auth/application/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/application/5535c3f4-26f0-4961-916a-2159c79eb4c3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200);
    });

    test(`/GraphQL oAuthCreateApplication - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:OAuthCreateApplicationInput!)
                    {
                        oAuthCreateApplication (payload:$payload)
                        {
                            id
                            name
                            code
                            secret
                            isMaster
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

    test(`/GraphQL oAuthCreateApplication`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:OAuthCreateApplicationInput!)
                    {
                        oAuthCreateApplication (payload:$payload)
                        {
                            id
                            name
                            code
                            secret
                            isMaster
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'f2ea50bc-2677-49ad-8e1b-a9b4ec6c280b',
                        name: 'y2bcyv65p259d5fb0phnytur327pa2mgnx7ggbnsv7qd68vm5ui3hn9gx6h99em41xxuvz6mmqcts7xjs53i4isgddghif5vl04cttdq92rg03mymfqzvk2euyjljclcxx0txeud5ej2gn78bbjsnb7qmpzmsia2rrrim5qerb20bj1wr58wa53p053sbx9s4e1ymzjtahvh6z0g438f9xlhfzfdczatmgtr8yjzucwi6v8txhvdc3njkqg7od7',
                        code: '4ylj917coflpcilhscurmo37hsxiy97xqk3y0jjt0fvjrt3t03',
                        secret: '8jgahgy8f3mcdq8p4qszmac5joo5is2f8l7mfm9ae84l196wl33nd45mr7e9xmu21m1p5fqh3uqlvn3mzpev901rge',
                        isMaster: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateApplication).toHaveProperty('id', 'f2ea50bc-2677-49ad-8e1b-a9b4ec6c280b');
            });
    });

    test(`/GraphQL oAuthPaginateApplications`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        oAuthPaginateApplications (query:$query constraint:$constraint)
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
                expect(res.body.data.oAuthPaginateApplications.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.oAuthPaginateApplications.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.oAuthPaginateApplications.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL oAuthFindApplication - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindApplication (query:$query)
                        {
                            id
                            name
                            code
                            secret
                            isMaster
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
                            id: '753227ab-c191-4be2-982c-84e6227ed1c8'
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

    test(`/GraphQL oAuthFindApplication`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindApplication (query:$query)
                        {
                            id
                            name
                            code
                            secret
                            isMaster
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
                            id: '5535c3f4-26f0-4961-916a-2159c79eb4c3'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindApplication.id).toStrictEqual('5535c3f4-26f0-4961-916a-2159c79eb4c3');
            });
    });

    test(`/GraphQL oAuthFindApplicationById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindApplicationById (id:$id)
                        {
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '98d01586-259e-4c3a-a423-72563aff7a71'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL oAuthFindApplicationById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindApplicationById (id:$id)
                        {
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '5535c3f4-26f0-4961-916a-2159c79eb4c3'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindApplicationById.id).toStrictEqual('5535c3f4-26f0-4961-916a-2159c79eb4c3');
            });
    });

    test(`/GraphQL oAuthGetApplications`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthGetApplications (query:$query)
                        {
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.oAuthGetApplications.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL oAuthUpdateApplication - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:OAuthUpdateApplicationInput!)
                    {
                        oAuthUpdateApplication (payload:$payload)
                        {
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '56031501-82db-48ff-a9f1-f154463499b3',
                        name: '4mizanlkzncqbtotf62occldje85b6kpzuhc6t9ml97api61ej2kd4i6q14lw68l3ehzbdtmrbvvy3c2pvjrip20dwnw1oi57yyhecawj64vnrh953obaynnh6rcylwjnrj4w2ahszgas2cmnj50rs4mu61q63uxhn3g397vzndivjjjc9hzlhsyhzmvrqvyxj5pm5iclyl7mde4un6zbc9qfa6l1c3pv5ga7iarm0e2q1y2jhb11a767xn23rm',
                        code: 'f04cyl5i1klw0k6xve6dx03rbs7825vqvauw6sm1rplnlj09cq',
                        secret: 'jn14jm8i4qm8ahvmcbaqf1vfiri58hjhako6eha6c3vm68cbf34gz78g3u2yju3ooa3ibect84kwzbkrwwsbhxm5vw',
                        isMaster: true,
                        clientIds: [],
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

    test(`/GraphQL oAuthUpdateApplication`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:OAuthUpdateApplicationInput!)
                    {
                        oAuthUpdateApplication (payload:$payload)
                        {
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '5535c3f4-26f0-4961-916a-2159c79eb4c3',
                        name: 'pkelyo0p2gxcsbzqj1q6xxutanpnxddrb1r8exx6pk8ixuy15nlmdqiquobur9rtd2dxn7hbk6sr7bkdcr4mhb968kdkrcsvu6zzhcipl0yjvtwy177vfz4iy9j640jenkypr69loy2jvfv3inxriug9qzdyv670naxof4quhkmkimkq2c9m2r00n8zs5odjvslf9opyiue1fwfx1k2g4xwgjduv9ih9odd1stgkabnfi46pi96bvuedhwwh4gc',
                        code: '3xqj6y7fbe8ufrhkvel0qigxxtjpgezgydniiobz1y6gm2q75v',
                        secret: 'bmrhc55rurpiq8b05wrknc4jmbgem44nm41109pluvrgg2n15mh95226tw9clvj848r7vax7hmgpkjvm1dzmoulosf',
                        isMaster: false,
                        clientIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateApplication.id).toStrictEqual('5535c3f4-26f0-4961-916a-2159c79eb4c3');
            });
    });

    test(`/GraphQL oAuthDeleteApplicationById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteApplicationById (id:$id)
                        {
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'e340fa42-aa75-4359-a124-3d0a8e750138'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL oAuthDeleteApplicationById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteApplicationById (id:$id)
                        {
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '5535c3f4-26f0-4961-916a-2159c79eb4c3'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteApplicationById.id).toStrictEqual('5535c3f4-26f0-4961-916a-2159c79eb4c3');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});