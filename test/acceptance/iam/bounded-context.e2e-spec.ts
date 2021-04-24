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
                name: 'amcqx7enrq81na943lwib25du9rusu3mck3d4cr9km0yx99njjyfp9ws7j6fj22j70gy8yg3pvqdgl8txifabt6rnga48o45jfhzttzoiwwax28emb2zejp3ybr6o9k8oi05n1poph7shzzkua8whdmqd2510crkp7ko2u0uz1thlj3bee46izwmh2h0fsyk0da2tx0lxzeuk1kf15bj8chepqi6wwcsz6si2wn9gw1jn5wsanzdpxpe1epgrl7',
                root: 'vyq0othlyo801mty5lh6z405ixi4u4',
                sort: 238462,
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
                id: 'bef36921-fdd7-4edb-81c6-37dec1a7b5e2',
                name: null,
                root: 'jo8bonfoqaq1u75b3pgrqwr28v84p8',
                sort: 135107,
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
                id: 'f3c38547-f643-41af-8966-8014a01eb479',
                name: 'eth98wfbbna2m1a23g75d77ovnwdhz51bn3xz8d17ikfksmv6zbr0tvfwnd7oyifo4efz8b790wruui1nbqdkw5pwgkywkt142c2j481qwf2581a4zvm2bquxv8efzp4pscq0wxlu79pny90stcba3wxgd2g3pb2mcpc07964ybvvyv7t9jr8dym1sm3jasuq5x90tqounc5xw114006s7kxzahzpauep2f6feq60wt3mbq2nma9vatd01f774a',
                root: null,
                sort: 906766,
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
                id: '696ab341-cce9-40c7-92fd-b6a14452a38a',
                name: '1hkrh5fde7wwzmdb3eto8l4amchjjzcw0sxc38vev6ojtwk40uhjarm9qmqkcpr0cjfwyybpk5t4q82sk5y4o6cppvhawfc4je92a2tasp95d5vavem3azonqh5564hhnd93mxc6ynyvys2v9hwhqqhehyeo02lwhyxkkyll153hrzzs3cqhvgtylnyux818qlz2u17uiyrnh1vxsyhqvfjce3i2frv0bnwx9svprakr8ks7gaama833s6w1tdy',
                root: 'tc0sw293ae37678d1evfn0ewjfcugm',
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
                id: '096b56cf-37ec-45e9-92e7-329ebfb72c2f',
                name: '45upabc6fcp8r6p19xpliis33yce49yb0fuzfitbttx6dw6b333p9v5acv32nsdvbhma2f6n8semva6mo0kbof3xkr4f6dei6ft3elg41bup8amowu0fdsvsdsvvlz3obxmld159jz77jjr6jp5wwfkhf53w578m962rfhhpinaao9tuwo681wf3p3o21dbjmami5c1nxwjoy8zp0703ky0r2ws2go689yh47ardu83lrjqnapx9zalu9jcu23z',
                root: 'ia3dvv5g28e1buv99r60uc664bjwy2',
                sort: 579772,
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
                name: '5kht3p4lp1zzajmab3llsdd68c5zip7awc6301lfyz5csirccbp5uhqrtjpsxrgu7fuc5a7zek48tbe7wplajdat0d5ksf8ex6hiougemgfit9vk6sa7y77ax3z5xo62kmd3p14pz34xcaus2eagkive13s8wa7xiir8plsjdlojl5luagpcjri1jft0mkjjoymmmhtkucpb5eug8ljl7l2k85uvmn27tb1cgcpr0e2oyrcdotevmibi0to3iym',
                root: 't7d8flwqz39e23mcg9gvmazvxs3f6a',
                sort: 412059,
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
                id: 'cb4cc34d-8d00-44cd-ba6c-5fa1c0208f2f',
                root: 'poebbdlmeq362zae9uc6fgtzih1x04',
                sort: 510229,
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
                id: '24d9d031-39b4-442e-b91c-c1f321d27dab',
                name: 'a2u2lophtmzkfm20atjpvxuodnhza253hz0ph3ds5zc6kcsq7es13cs87ratcn15ok3kygs0rhljb7ayodm5tiem2do74sr5j4p7kluytfgsmjly1210kpb87ockh458ybxkj50cd9uwq3xd8pdsysxaaes9ymuukzqjy9nv6ivbza6mo01pvpdhhek5n6dbnr2uzljlow9kqq8ggtd8c4xto7xlifo56mz6ypp2g55ntfhz0j61n8av5gll5gu',
                sort: 319014,
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
                id: 'a58548ba-9012-41db-9e57-e93e186757c8',
                name: '5czuzxte3ddqpu6wtob8m3kegno7y57t5n8nqgse7mgiy0ewblairbg41mr65tztpgp6j6vy361s2rl2rnien7psfb2dqxna5y914xl4l0yb44ir0xzvpinlfpysk03ecn3thxtchabnqig52cw3nyvl8kcnn51m18ac4zit0bscvw8rc86g86q36vshsmh1y01pn11tivasqgrbs7otkyzmw87mawwcqj6kpcqq558z1vvb4au6rgg8rczp7c4',
                root: 'nw785o8l5arnjw6gv0sf5glxagxkve',
                isActive: false,
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
                id: '06f81d44-5263-46de-8b94-ba0f4ec1c257',
                name: '1ku6fzgqy0xogmg5au9vh7xx7yf5jg5pgb32uyhrgnzw3gbta8o8iozllme9p1ljwgu8e718z0p45tuq9xmg44v0a8km6m93dip0tzrd3gsaau45flmd45023b6yyq4tzzl5u9pqewk6tnljy68syheqzb3q91px1xbsbq6gooootciggv5w56hc1zymaz5mhxsextnc97htvj7k4bvwe8p54ecuq04boyzje49f4d38mgb3ywsw27yl3d0b3ml',
                root: '8a2zrq0kblrmwryv6apyhsz017lwgn',
                sort: 127693,
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
                id: 'nrz893dfewiy4obzh4tchytp7qs3zvn6m809q',
                name: '4s5jcps9jkfsnjge7m28xfbk0ubyv9smoicesfaijq672gqesg92imd4s76mbv3x7m0a3qt3sow4j73llfucwq1whnbrnata1ifz820m0l3pcseuotw45lcqlhhadw1qdh8p6xm02rru9p603224ju13xs5eki89x3di48t0bpbjqok8kt4juiaq5w3cksc0blxofuw18ns6b11mj4xtawapri5wwwtr3ed2owgkfuwhfxocoe9jqk5mvtws51k',
                root: 'pdvykd3sf67ekia8uspexm10r74gm9',
                sort: 208081,
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
                id: '8cbaa830-012d-4e4c-aa87-2cf80a070fc1',
                name: 'pm1w1zk64wuh9wdx2x7nrdcbkm7mwbx1gec9g19xyuqiqjln3irvh973x2ldeoaxsvam5z93pmnsppzdz1jfbjbed5pyv5i4ji5sa8ofxmjri7tdikosqwarm80a3zzu1uz7ifkevw5h3z2rj9l8bzao4kx3zmdf0ynioxiv3ihgldntbrdvmahpxg4rxfajtg5s10alhi7a5raixhek2fqwk7hcdob6vchzieo7qjqipu6sy1lcjt0f120d39pb',
                root: 'cky3a7l2htdh9hosm4jk7olz2yrldi',
                sort: 271882,
                isActive: false,
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
                id: '8cbaa830-012d-4e4c-aa87-2cf80a070fc1',
                name: 'h10neyftc2d2msnjw67ml4mopgw1e5snxy9rh3n5n7u0tm6d48z96d8plav4r9nidw8atqqguhqh8k5892vojwg4em73u4huv3fle0fwgfblsiga011acurh0kj26235y40ujhkqmq9zh2g8ln3olnzai7y1ecwnnf31ljbkr7d9xl0vyuzbtdyrta2jxjamqzyl0ckekc7l6agmc0wvik6n22pdag2puzu14ky85xhwkyyqjk2wtjkhnccuwv3',
                root: 'm68rt3ikoom6zf5umpz7lh242tehxvq',
                sort: 204495,
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
                id: '8cbaa830-012d-4e4c-aa87-2cf80a070fc1',
                name: 'pdicj3n9ch44ml0rggyxjfy32on9f6jus8gk6uu36md49jhuonwfacf9i4m9bysuviiphmzyfo82olqaeg144k86xlarsr1x2xchafjb4omeilgubjk334mskwcc3dp418zn2jpjocyqn8o7r2ol0quu4k0sbkc8i4vqz08xqmb83z6vmabb0u94fjjp7cxzdbt6dm9skxptm007j2z4d43iai61y582y2segz54eodxy5lvx8daxzouvx5whqs',
                root: 'urpzhy42ftj5pb1nndhxlwj2bbuuil',
                sort: 3808132,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '8cbaa830-012d-4e4c-aa87-2cf80a070fc1',
                name: 'o5tvl6gf9g8j1ec6zf7375loku4vhtz1f1oc2y9aos3j3qr5ekheqag084of2bikzob6bjo0pg9ojtns9ytisf84acxojmda6y6antevln41xeez5yp2jvk8540aewmgoojuvwpgybnkyb1xhe7ysecedn6wmtw8635oc2jr00v6h5foukkp1al7ub0hrlj4zaumsm63zuod8ulg2mczql79fa44tnsg5acyqar04o4nbuznmjw52299ks2a8lr',
                root: '4vlzqv255adr6wxkezagbu4mchnrnt',
                sort: 870981,
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
                id: '8cbaa830-012d-4e4c-aa87-2cf80a070fc1',
                name: 'abvltnb5ht9l2ssvksxw96rsey9ksx3dpnusl3zb4s944jpmisce7relyn8fgvwqjxqwhz1z3hhdxxqcswn3polc5k5bc6154blbmdm4ybz0prvsp8l7v7k6awaotkdq4u5hxftzo1w8mm4kczgu61mjdefify7e6yypa5nf62ksbu4pfsk6lb84dhoqr0j38jerccnp1odam37arm3agyhakys4askyhjsw4ouitdwgevoxogy3tkag652wtg1',
                root: 'hxo65smpeknl58c4wd4m80sgcqk9sn',
                sort: 441861,
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
                        id: 'a7691e1c-aba2-4e49-8e58-0d9874bde2af'
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
                        id: '8cbaa830-012d-4e4c-aa87-2cf80a070fc1'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '8cbaa830-012d-4e4c-aa87-2cf80a070fc1'));
    });

    test(`/REST:GET iam/bounded-context/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/bounded-context/fb171289-24e1-4899-90ae-326a01d76b6f')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET iam/bounded-context/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/bounded-context/8cbaa830-012d-4e4c-aa87-2cf80a070fc1')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '8cbaa830-012d-4e4c-aa87-2cf80a070fc1'));
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
                
                id: '890decf7-d30d-4286-b247-2991b5f42a1e',
                name: 'yuak8pkcockwcumgz4z3ymwhfsnsadrz9daj22d24q1pfa5ffn9dawcfd61jwxktehvxjjtslsrlr6roclhft8l3qjw4ztfgmmmk1qcw0el7de8vrh11rb6gdugk9g83shmsizptc4pit367d4r5fv8tg4apc4jxs9u1tvqh2ca4okxy5ov3i23ba4pq1yv8zepvpcndqz2xdoyf1hie98m6vv7rvrbztaheak6cgiscqx01fgz28q81t081yvm',
                root: 'f300ax04rkyeyzjdekkkg9xg9ott8u',
                sort: 801390,
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
                
                id: '8cbaa830-012d-4e4c-aa87-2cf80a070fc1',
                name: 'p180pxad0huanx51g52xgdftj8rosrvwxtyhj9cyxdu2ab3v075lbd2rs21weu1f3yotmcjyb05solm88z9x6ed6y15zaztjmfjpv063qajfaijkf6ra8287teh35rpgh3w1iovyp89c8c8gk73s0gugxrk7yj78400r03uezg7zzpywhy3rzksgru28dovspj184i89vf3rvxnl6lnoihk6s4mjfml5fros8z7xsar7ps6jzwj40a8is3pyosx',
                root: '6picibtfkl1fribmmn6uxh1idhbb5e',
                sort: 811680,
                isActive: false,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '8cbaa830-012d-4e4c-aa87-2cf80a070fc1'));
    });

    test(`/REST:DELETE iam/bounded-context/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/bounded-context/42afcfbb-3429-4f96-9b5a-bef645575132')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE iam/bounded-context/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/bounded-context/8cbaa830-012d-4e4c-aa87-2cf80a070fc1')
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '07b368f9-c103-4461-b1cb-1bcadd21d002',
                        name: 'rutmd9c3v1urksryoqq5xr8y42a1h2p2z0niwjdhnvlhlmtxaqwo4ose8pigu5otgh199gmxou99m7s4l5bjvpbqdgm4chg3x8tgyvzg7i73bksutnj2zcu73ilegctzj1qrrkxqp45sc09scdpokeemuj2o4gw4z9608a446vx801arkey3evv2jax1vzopoeehjcxq0ycmvvi10l8mzynlzzk3b9preawdv14nhwurzjylc8hzqara7j7hwoe',
                        root: 's6w39uftzldkx8utpaaod7hkrgmjdo',
                        sort: 441840,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreateBoundedContext).toHaveProperty('id', '07b368f9-c103-4461-b1cb-1bcadd21d002');
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
                            id: '6c0f87b0-4eee-4ab4-9fa2-90da28bd5b96'
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
                            id: '8cbaa830-012d-4e4c-aa87-2cf80a070fc1'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindBoundedContext.id).toStrictEqual('8cbaa830-012d-4e4c-aa87-2cf80a070fc1');
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
                    id: '21b0c4da-5b83-4e3a-a777-67868c62a1ec'
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
                    id: '8cbaa830-012d-4e4c-aa87-2cf80a070fc1'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindBoundedContextById.id).toStrictEqual('8cbaa830-012d-4e4c-aa87-2cf80a070fc1');
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
                        
                        id: '14af3d25-e812-4d32-8477-7771721f94d7',
                        name: 'nxcq9h7w3mgnzgdqfwub3v2iootye0wp62dokwe6ljgbjmxjsd7sgnwzxjbixq84z8t75alqq9iu5ibniv7ylkec31alyrcr4z2xpj5l2s10fewy6e9vrrx7d7wr51514d07uj0ecm2ex57rzmcng8376c82lr7ois6wkz5r8lwes0734q49m7wjbv0e5j1ulsi72k51sbxvn7lgivd2rqcape9lhgaehgwc8fsz58e7bon0b9zkx3ctdbz3x53',
                        root: 'igrh64ceip4iof7mf2ynok2k3hw16n',
                        sort: 938462,
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
                        
                        id: '8cbaa830-012d-4e4c-aa87-2cf80a070fc1',
                        name: '407yw31xd1fo5jnatzamndoys6mv7t89ck6okwlaeil7l2tcgzwdnc139cc6ike0m1nh13gp4k74h40yh5xtkkha99848tyun94x3ewpexqgc0i0sool46cizqw4k1036kyw5gorn71cepy3jgqzhumlp9nq1v0qw0r6l1687532k4ula1l0s3csaut9rvbsaum8yarilm1uu6sczdav85pt1x9lao4da7i9aww7nsfdnt5evf26nk54daiw3w7',
                        root: 'uf58hjqq3e6r7mhktfsw2kb7tn8wv7',
                        sort: 909411,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdateBoundedContext.id).toStrictEqual('8cbaa830-012d-4e4c-aa87-2cf80a070fc1');
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
                    id: '9c3aa255-46b1-463c-84a7-00f9b14c54b1'
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
                    id: '8cbaa830-012d-4e4c-aa87-2cf80a070fc1'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteBoundedContextById.id).toStrictEqual('8cbaa830-012d-4e4c-aa87-2cf80a070fc1');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});