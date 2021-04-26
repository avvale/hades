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
                name: 'zfr8og4hv2q1hv85ccfwbyave0xcr9fpfva1fbtr4vu3v7wvbqafa33kjloqr78uu403o544ksyzqs9uyz1cmpioqm1ly2rwmacmlcwi2cavlaerwjahlargxjzwkfdhqej29wvec3l9cmca8wyor1txofhgigkq21z3uj3unixsypdvmrtg3yitynstepp12uzabtk1dwlmiajyldm4bdo8xevr0mvuq0dyq9a7fqlkxbazy7w672so712fa5g',
                root: 'wekslpq97ueviq9sh2043z2lkt33m1',
                sort: 636674,
                isActive: true,
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
                id: 'cef47bec-0100-46f9-9824-efbc05867634',
                name: null,
                root: 'u67qrpjcvk0ep04tp8ipluds1ttlcc',
                sort: 758644,
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
                id: 'cef47bec-0100-46f9-9824-efbc05867634',
                name: 'ecs52r36kestssk5sv3yptnq5ca4sionsxbhcao2qca0utpxwtwea0wlz19fden6xlpfhuxbftxjxk56znhfljn92jgta2ygxgrl4lg9epe8lyj0219rjv8nyumcvk3jd6p8nrkodjc0430ak3zyayd0qxm4rmzi062ifwe9dcqcpp4rqlgfl2i1adg4hmcvn7ox0fi4fj1uiomtn0g37v5rhgsksm0dgop43kcquxwhcsbuy9hu38ulskc7v00',
                root: null,
                sort: 427903,
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
                id: 'cef47bec-0100-46f9-9824-efbc05867634',
                name: 'hpfkhwj45fnivgfaxj90g85j7bsm9jok3vjh94g3696e2fmb7l9oz2o427la2btvxe96mn3o11q0bep9ze8ekmv1toq7xazkt1hz1v9vqydpmenoy8m3lrt234f91cm0irpxx9pdsbp6ljktf8g0po25z53rugpmnco2bcay1qfb0qahio2t3ngcghdbjr48tmorlzbq9396ygl4ktbh3o91mlgulzqooyufukg3vp5ip6mly9oierevr7rd1wk',
                root: 'q0eu89wiw2f5c0leeuisgkboedqgdl',
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
                id: 'cef47bec-0100-46f9-9824-efbc05867634',
                name: 'vz1pdrsgf45avgb3yoqzb7wrt7i7htrnjhp27f3acvl9u2dj7nygpraz1e4vj4g9um5exybci1azzozaf2iqwqjqvam8xeabnw00bw0u831724za5aw66kccw680aj8frepv1yu6laqurmmf2a0d8o1vfuj01sdf73u9nh9dz1pzbmbi1jf34c1z2k0w9qwsa7z4e3efz3kojlzexpujbznq1aygm9dv5a83npk1vh6bet2z7g2xs1zp3xt8eyl',
                root: 'j6lqzc2udx83zc4b30a4r2ev6x1m2u',
                sort: 842441,
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
                name: '6eg8qvwp2fatll4ihkid6r1gjkgorw4bvhirrg4hvwa4pvtx5dpyjycg5qtergc8lyy9ipcfyn6n8vk60gvwydq6nugvdppjsxu2o99moosx3bej33nocc37stygk5qljgpjp8j86kflfabdmcracnux9cmxarliv00in9egktteu78y9qpiinz775k9780dkw90t8iuomrlbkcabi8uevre0jkuh6g3nillfcafofzip8sk6o5rz56oxk3tr3e',
                root: '7c27g89zox1am53c4msqkt7aa9uc8n',
                sort: 103975,
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
                id: 'cef47bec-0100-46f9-9824-efbc05867634',
                root: '5qke9m85lv8t7s4i6ue8sp0h4ez6ez',
                sort: 371407,
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
                id: 'cef47bec-0100-46f9-9824-efbc05867634',
                name: 'e6i1pty2w7cbyxgc6751g0omfvnc04f74jdz666l5ymg2f49highxp4lc02dcr49jvuga0yygj4k7y6e6jgzobyxbb00moaid4ycvzuhdjsnkyph03pbv1ni6xzfnn7ha89isigvn9ip3hu8g2w7lfx57z7dzktvxt6hzy2uh3duzpfwbvg34j23591thzcscc2z4x2qxrtuiqjel04jt0y1qbrquhzs2pa81yyo3dag0m6xmwr8ibree5powb9',
                sort: 418876,
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
                id: 'cef47bec-0100-46f9-9824-efbc05867634',
                name: 's16fp3xazu58b18nxsthyn4rhkvn6z10qt18fhuid1m4miy0s5wfx1b56ovqbmsszlnibhvpmx8q8ve9nn6dskgdbb7kyfu3ev4k1i9rb3mrnsa9ag9m5ifit0tluuf2m0pxb4rlrcnou1wsrcs0qw1lh2h99lu21zhr1m0biritfv4ir2d96gyayzfano87bvumylyii5lzkpeg5em04x9qoznyxrd58mt4yvzd2cqtkspjelzjmtxzs9pt5og',
                root: 'dly02e9bwva1zhs0f6cfdg7e6ewn8h',
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
                id: 'cef47bec-0100-46f9-9824-efbc05867634',
                name: 'wmz42zhh40uat74wytahkm648p1eofb21vdrl83pn5xmhvsu0pj6m0uojpy8mvjv4idazgisbt3isfvkimya4z6tupqxz7cbatfo8smhnjtiqssub3x4iotfb6m8tv0rs1yshl4fs0s2tzi34ybaee37h1yc5lpvlu7qlbinguar60g4yn8an76nbllbtydq29rm7okt91v0f7pl7bh8pjsk0glbqf748jv9qto9r2kns0bxec1jm54j8yzfcti',
                root: 'mbty0mfanpdrvikqdzdkzxc47qmepf',
                sort: 893188,
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
                id: '1xx5vnpcnzqqaiax2wwhw67ejayfwwc388c8q',
                name: 'rjvqxr3oe49n0doixchrj8a49vedmkk2fsatzlxbhr19kfnlabxbsc8p4hq0hqdsy3s9oml02doxycfz3lji983ntgopma1crw5obblh3aezh8l0vidmmy0d4tnsdsh6ujqrulq7dadzjpupo0mahnbuniwakgdu8wwg0vhz5obplskjkpih4mxwiy87zxfm2n54vty2fk69k0hj1in0cgfu5eb3rww7wxna092ie5izx5v4jh38v24kxudt2lw',
                root: 'zq3paf9n63yyyzcjdsnczuqyqqvaap',
                sort: 962738,
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
                id: 'cef47bec-0100-46f9-9824-efbc05867634',
                name: '49jo17ylx2r3ckl9g6ps5gi5ol5un117ovohnzidmbhogx2pp4seqb0gdgk2fz88poinpwypqhtyuhz52r5cfu5fba3oj2yq4szgbh8v7f9g8w2qmv58ds8geplsdmdk7kelfyezdpgve5tpx8l4i16smsw93rtn48x3ji6o734bc6cgpo1duokykhr6nd7pleaijy86aw4y4x69sms8c2mpv8irp5y9j695h63bsuotehj17r3kh9p0j3zk3k19',
                root: '5ok88qr88xjoryblx2f3ihlyscddml',
                sort: 205887,
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
                id: 'cef47bec-0100-46f9-9824-efbc05867634',
                name: 'nj1ck5k3nxxchtfsrg5oiyt109shrz68wsdpqhxgqxkcrpi87ui9q4uk3ydxg2mkrxwm7ay6c3t43ad9dq3h4h22s1qhi11x5rmx2bjetx49a01k722zejuxdmf0y4qrgk7y6hnv34jmr85tt5c9lmlvxahl72e6jpc9a3eumglqmkj5vt3o5pb86p61bk2q78el8w2v312zvsvlfsh8vy67iu7ety68z6deijx6r0oyokvh28fdxmz5uu7xjtu',
                root: 'xcfcr224tblkex5hzx4lt4a5ncbq7fj',
                sort: 130528,
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
                id: 'cef47bec-0100-46f9-9824-efbc05867634',
                name: 'q5mvnlmsh134oviihc8guvczt8xifxlnnrwrwulqt1tt4r9f5ik1fpf6yoq7rsqwnsjddveylgm24f9ml2oxn6epyo4ix0blw17dzdunu8etel64jk8y5nsh60ssgmo4zr9fj13938tx0vbjzke9iargzndkntq4qr01qyj051mft46vz2a389cvts447hpblwgxtrj5c9f918kku7nwwut88zme0x0mc4rde1o85rwg9jwgfkoxl1xdji7k5mz',
                root: 'xlesob6zhudqcb039gycwzaqq29tou',
                sort: 5240067,
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
                id: 'cef47bec-0100-46f9-9824-efbc05867634',
                name: 'oyqz0v928w74u676coo7tcsr86wom5mwrhwssmdn3ooifv5b7xgklgsr10mzurb6y3976sixvvkxk8h4ipklqeea01q81d538e2whw0ak79ryfs329bytngz9wg4h5ry0m4oxyyndbiy8cjqtkedcixr8qkzal4bv0c694vv58k10f41ix1nfp53041l96xm56fu1md4boe6nxmnp5pjstd4vefa771w5ahjlrc0ehujnk6si7jiejpq4d7ssk5',
                root: 'tfv5a3hnl1w1ugim7rml05n6u4xwan',
                sort: 977349,
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
                id: 'cef47bec-0100-46f9-9824-efbc05867634',
                name: 'ilre47jh19vbdnu377vkq24e8dhzmizwo3hzk3rt7b0o68508ce9tacxjurv8zxg1p5ve5bxrepwtpmois2fc7yd8xxv5jc9p9x1priv6ws4d4qk2yrqp7c4aw6qsfibek9o77ujd3d8towain17xts2gfvhn6k1eg2hvem5y7vf9vgcmqx0nr6xd2y4ksyrbpvi848u6y4wbk8exlxeoiablv45cpj3ibicjak92ntqrv38p7j661u20m3ao7y',
                root: 'wfpil5702qieves9kk616ltz10qe64',
                sort: 634075,
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
                        id: '79f8701d-94fd-4834-80e3-ad15b771941e'
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
                        id: 'cef47bec-0100-46f9-9824-efbc05867634'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'cef47bec-0100-46f9-9824-efbc05867634'));
    });

    test(`/REST:GET iam/bounded-context/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/bounded-context/abdc1d00-7598-45de-a4e4-5fd1a9afa654')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET iam/bounded-context/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/bounded-context/cef47bec-0100-46f9-9824-efbc05867634')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'cef47bec-0100-46f9-9824-efbc05867634'));
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
                id: '87bb950d-4281-489d-a518-4befb950c241',
                name: 'm49yqt82y0upxqrxbzwa4pd4gy90086bl6xmzxnfdwtpwd2c5k1ctby6wilec4w5oi63fy5dhf3ibi53vf7m0sav2jua7rwprsb6lesis2snz5gya8k2e0zklp0jorrhixzz05i83x97qjwahk0af1s6d35q6aisbp3jvy1l98fml9byaeiltdft8euyimsnfp7pqv1ib969z448s163s4t92ix9smmyjnhp22o4hdqyy88ops2yszt9gxxch9n',
                root: 'u2x6721odglfa4s9q0l40q3drsxxyq',
                sort: 501976,
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
                id: 'cef47bec-0100-46f9-9824-efbc05867634',
                name: 'cb4nbu76m1uxj59v5kn4z0d3zli8jyemhlltaikmcq4b5wti4e90e5fkppoq85egzm24hjzj2d9grqaf6koefudiolfjpdnm50es3ovuwysu8nnw70mf1nfn6uretfex71r76de9lp5c2bee5uouwvh1fpat7xv5l0l0dncd2pbwvnwke7s7c0aig0hq9wgeuhulqd73ki83sol0n825ozytw6htrk30w40jhdlqnc8vztxhq53zk52ym5hu7kg',
                root: 'qlhnj0lhw2w1y8c6kujksxboa0mq71',
                sort: 867746,
                isActive: false,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'cef47bec-0100-46f9-9824-efbc05867634'));
    });

    test(`/REST:DELETE iam/bounded-context/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/bounded-context/4d8ee6f5-54a3-4ac5-9a40-e41a9d5793ff')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE iam/bounded-context/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/bounded-context/cef47bec-0100-46f9-9824-efbc05867634')
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
                        id: 'fdfc454b-63d2-4d8e-b759-bb5d5ad246ed',
                        name: 'ep645xlvh91ypf3hwqxuf0t7r6oans569l41oscseo1fnxwoqiej2f9cezh4gufld6n52o3jxi1l89n9ckgc6odlzallp4zmqx9lwxlnvyi2lmicl014l1pbjieyoaju7w97c339e0j94z32ebd9654fphyukbht9v7m79nczkttp8horgmwbvt53r6mnve6n6w6py7zezxxfv8ifm34cs33qummd49qkajvqi3vslog103m55nbrnpjx4ic3t1',
                        root: 'g8ppqydkce2gkpzvzdkxqniv8184w8',
                        sort: 563636,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreateBoundedContext).toHaveProperty('id', 'fdfc454b-63d2-4d8e-b759-bb5d5ad246ed');
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
                            id: 'bbffb3aa-7df9-42ad-b3f6-668c11f2ab31'
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
                            id: 'cef47bec-0100-46f9-9824-efbc05867634'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindBoundedContext.id).toStrictEqual('cef47bec-0100-46f9-9824-efbc05867634');
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
                    id: '40085db6-01a2-48a4-9a98-e66b4e20e000'
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
                    id: 'cef47bec-0100-46f9-9824-efbc05867634'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindBoundedContextById.id).toStrictEqual('cef47bec-0100-46f9-9824-efbc05867634');
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
                        id: '9d2528dc-76fa-4df1-9863-faad413eb2d0',
                        name: 'k5q4ayepraqqvtsqh1azdg4bd798j408056nduvdqe7lrojhh2c0t7cp9k1w8uzh1a45f9v5r05dvionx0n2lm9eqs9bu27sgxwjnopom7kh8f54rgxksbw1qun1wb04ls4nufj2aintt8yaph7ndzzoy8mvwg08nxykhfb4qu8c47hf0t7fzyk8wl8ui77rzpf2gjl4gk1xfza02ecenx7lb7t2ok2e8z6dg1wrg0528kiq1yjvsll06uom383',
                        root: 'gcxgl9vg6xoi4ucss3rzpxlgqvmupe',
                        sort: 194953,
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
                        id: 'cef47bec-0100-46f9-9824-efbc05867634',
                        name: 'lpf7z5il2xas2kj2gbilav866fyo0t7aznhz1ji9jlazohdzhhj9co437nitb9zshuxisfp8nc4cbb97ravfujupv4lc5zpfwv2351lkhx7dt1pwilfwogm9xp522r1vh79wphnxo1cnyeyabzyklb9uxc9wtc0ol0u3ykyq2082tbisyv08gu9pl8ts2cqajegaozakognr3kv6ff3uy99u92t1khyira9uz59f6dszdb501733jyhlitbbq8p',
                        root: '1tixh4h34ayhd1fic614j1ktcjuu7w',
                        sort: 747924,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdateBoundedContext.id).toStrictEqual('cef47bec-0100-46f9-9824-efbc05867634');
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
                    id: '01a7459d-cbfd-4ef1-8b18-358cbd9ecb09'
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
                    id: 'cef47bec-0100-46f9-9824-efbc05867634'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteBoundedContextById.id).toStrictEqual('cef47bec-0100-46f9-9824-efbc05867634');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});