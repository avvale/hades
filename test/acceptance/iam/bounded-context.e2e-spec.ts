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
                name: 'n6sovtyg2cxdfggyi00dzacowcfycx7xwugoztarvz7wx4rcfzs6mhb6hast79sjkkyzqfi5xtrvd817qlfnhetwzczuhbqm8iz5x197ghe20kqixqd1nqnry4w7lulg9we2zge30ik31vdain7a24k7enwnzbi9vmeu94q4697o3g8ifefpxmysij7u1ipnr20uxve3h8owd2j0n9x26dppx2ev86ln4pee634k31cc5kglw6guus4y3wq4dfm',
                root: '73gmjaak7q0d0len69zz3sc8rso468',
                sort: 953021,
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
                id: 'bf308c5b-6988-4b2a-b631-63105ab5566f',
                name: null,
                root: 'd1wk2o0ztshu24ot0931wjz4m05fio',
                sort: 914791,
                isActive: false,
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
                id: 'bf308c5b-6988-4b2a-b631-63105ab5566f',
                name: '7iwdmvpm4snqleu3po0wiht5excqx7kdzks7049hojdqbhp5vj5shxtrz5rmnglp18cnf6ambm8jhe8ct1bctjapt5m5mgz7uk7lzs40c2xrefsm60slldvcc7leri7bqfa4dtb34fok1baxjbj2740j7c1csizvc3io6kho50axkf53p4wekrp3nrc4y2pb3mtj1vohvuqxrxrzk1jm91u89nly8reotp613m3vejea48efhxmy473iboisv8k',
                root: null,
                sort: 747734,
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
                id: 'bf308c5b-6988-4b2a-b631-63105ab5566f',
                name: '01m3ndeqszd2j8mwtgl7usmmkuwma1yuzu4zyzmccv4pe4cjsvdsxcnxhhcbhy8hrim1zv0s03yo1t59n3es8gldzaqnbkig93gejaqycpxkeaaugl6ybz6wv9kcvyslor2nvkorxx1f511c158nzmzn63y0c44wa3q1nm7gewz2jqvlpxfzq4ao78zx09qm8qleir5gkuixkhrkpolt93hjbmbna6g2td84ihfdlxz693brqy52x7rldhm1cz9',
                root: 'g1nfjig59n1cdoxyxsv4ioonrm42ey',
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
                id: 'bf308c5b-6988-4b2a-b631-63105ab5566f',
                name: 'syc0pcmud7w94puz1p6zf0fqwekr7uh1298dnbhfbhw0ekwln8e3snuvibhix3o356b6eiil9rd10g3t4ckooc1zembazx84qmi9c09n8n4aeq5vzxplh0pquz327ynqbypg5teb9mdpecppq59vdntckk6z4xz30bp3ta46nauh5etu5fu8br5p2dprlxeyhv833tv006w99iivbrf9rcnshb77jaty9271n60o0jmdgaow598d8dunmij86lk',
                root: '9ljht01ioq5i1b35g8u38evwll3dvh',
                sort: 126992,
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
                name: '1x9t6xyq2tcdmwuoinq403hrfseep7xeeyk9xsnc38u055omk3k1uxd35sapdyk80tzk6w0kfy9hiixa5mxd0n5vh5glo20j5mzaeqz471oy6m05mbyuuw649mw8jk2whg27bfn9cytrx9tfpnv6f22n6pi2p23dznaksm3rrbgyq6ttlnt2f7om5m412dezeg6c9z199or44rxolrxne5gqoy7wrx9r9f9l3p3up56w04ugo2hxkpa6c01cclp',
                root: 'kritjjmntddntrw2zg8ii2k2u1qhm7',
                sort: 361048,
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
                id: 'bf308c5b-6988-4b2a-b631-63105ab5566f',
                root: 'jebvfmswx8julbcynazm4pnygepcyo',
                sort: 898650,
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
                id: 'bf308c5b-6988-4b2a-b631-63105ab5566f',
                name: 'mdkxwqz2qzogw7lfz0p3wn5ma3k1n2v0kfsu8dc4wil2x79twxido32dybw2ctdg574hsj5abc0iarznysu7sigwwxl688bhckop3e2w9h4oxwtu6gd3cbwcw10zq7wx2chlbf674uxe1tff2qnr1uv57q8sjof4i2uhspc26ldxlydfg826fvkjtttcjuz3r0yzva1zfl4tkr3ds2guyv5ruq0box7g8pk6t383fu9bw8l7azh6ctx527ndr2x',
                sort: 987035,
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
                id: 'bf308c5b-6988-4b2a-b631-63105ab5566f',
                name: 'zhlp0oikoc20i8pmbr5zguhsxtn3n2cah5gxrthrsc8mi8gn3z8bo6zpl04swsotvyt2qzecb0szti74uk7zqitu5ct9th8om59ugxs83yipvrp2klk5mcgzzzkj9isduufs25nkp2lvonlhempcgsblrjjowktft0pmzymwuf1gs70vy42787sd4x0f7e55dgzy7oaa86raz12b3driwrns073n9z751x4qrb598uzslsz0eoscrt8gkgeizzi',
                root: '71p7abaqr940ynjesfoohip1e2rx2g',
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
                id: 'bf308c5b-6988-4b2a-b631-63105ab5566f',
                name: 'ammdi0wqqqtqmiswcwb11lvsdvavlz0y1n2mqel08c2y2oxtxdefovdg08dpna6pek1lzmtrl9rpu4uoav4za1pftk12934hs5rf4ewjl8v8f3zaw3zcue0pduee964h5bu0ali8nu86bbk1tk2it8vqhwmvjosm2uiy06tjeif1owcf947xtrxec6xbfjid0y5parkdo7r30yd8ylj7xzmuxhtje5onllq2ccd638cznmwzoe3mwalyuzd3h1g',
                root: 'a0d4tkrtirqxktvdv781bjeefcmz4w',
                sort: 137040,
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
                id: 'jhe321zro8a787tobwz7l45t86iidm4zy9mmi',
                name: 'kqoaef3vl9pqcwdk2i73xof0o4si61xevsj0yahpg48hc7itaot1lqdpf8synx00q8dovtexfxqub2gfejs8cod5amkyg6ed2kr7qnknbj98z8lrp0uwqm3q0u072whsxlra3adc8tc93ud7l8dq3xerqz5an1hujlc4lmavo4qsf9iz4uyla5ytsulk8jhydsgfvclvonop0uguvh3u6fk2ieu5nuijdh5dox0dazbdyor7x7t9qngcoc2vq5z',
                root: '642r4j8i8706nsr6vk5l8etz0i17ox',
                sort: 359180,
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
                id: 'bf308c5b-6988-4b2a-b631-63105ab5566f',
                name: '88uzsaizwafxfmnmr9cztqep4cv4d9wp16ijfav0uy77or8597b804mwixqtt3uc0sgxhaibg8eaaygid9twgz25yar63u8jbn4phiejv1qlfzzu9n6k6sstoxp39xg87w07s46jw2fj42t90d80827ztjnt91gvgj5agm6fltiksnd3dff6ekc5cf1y0a4bkqgwwtfit7uud433lsw6hgqnnbaaa6qi0ouwp0t4xcu12kykofdh5n44sm906t68',
                root: 'wbxldiy2xv26mf5ezf2n5hj9zfwqib',
                sort: 139882,
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
                id: 'bf308c5b-6988-4b2a-b631-63105ab5566f',
                name: '93o5je6u869iiwtf2l1gi79rwukaq8m0rrbqnu1xz0dfl8vyw7rbbsgtl4jq5g8l9anwikt7lbbsffegdfk22cxol6cq0zqt2iyt1fbe7xr04y62lqz0wn1a8nsnxxpiaax5s614h1sim011s39onlut01569e2qknxxggc9iayzuq2djll6t76b2vqr27azn6abwvcqf8llcovbw3kjh1m5h0zqqh4rmly1zvz5b30utqulwy2bw0k0fso2uat',
                root: 'zrgo42o0nody6rd4nnc6b40tluszl5a',
                sort: 766576,
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
                id: 'bf308c5b-6988-4b2a-b631-63105ab5566f',
                name: '4jp2e9z3j3nvytn4iswxt03hs18cevhsk2ekc6edc939foaz9t4e4axdg07mbu4grby7nxh8mof0pyjddbtx523m73botd2l07ufg45ujjsnfifhdfi7pip3waea6m0dtd3u8cv9fk8ghuvcu565iiiua9crrog4k4xqs3lai9ethoxq2cac39okcg8z2zuuuys6u0spgsb60ccx4phf9d9b0sjglpoz2kum9h3zxs3a2eufxytvs62611a01nn',
                root: 'oeafltk2jm8f6rljxi7rrmiy91e2wf',
                sort: 3567277,
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
                id: 'bf308c5b-6988-4b2a-b631-63105ab5566f',
                name: '0xymsee44nhwj8yr2sf338nlpnp1hza16krp09eox9e405mnkc7h03ucmhxchlnz0npz13u1pkjy1ay3ndyycs9mqo24jkzhny4dgpxyynql2x9azaxz6ltn3lc8xhrdikn5guu27zrvzl7mgkk0r40xjud6efys10hzupdszobz76haqmnz8nrcej9rlm67l9rb0i3kqbmkc4wc4yzuib59yllgtemh7x243095xw691qlkrzjnrk19r4nozr8',
                root: '2lh18xjde831lfway4dvkx3c7cze2h',
                sort: 406098,
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
                id: 'bf308c5b-6988-4b2a-b631-63105ab5566f',
                name: '75f9o4iu8pko040t4n7c5yh7s2yivgods0oqk17k2q1mvhbrmq3x79hhz1wgvzn9tuwvei2qlsa1em7k8xspg630pn0m5ayt9bp8fuj2qyd3eul6i2xnrgtkv87xb2mya60hvzl525lakytzfcp14w034socjjzwmgaagitai8ak4lq29ktf0kwe01jmf7k7q52hpri25zlmu069fc3q5yc6lxlv7d5i56zem323ajmd4bkx5tx4q574q5kpy4e',
                root: 'srsbkljy7w92fje7q28u3pxaniew5n',
                sort: 450358,
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
                        id: '7e902eca-478d-4d27-9578-def7c8829178'
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
                        id: 'bf308c5b-6988-4b2a-b631-63105ab5566f'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'bf308c5b-6988-4b2a-b631-63105ab5566f'));
    });

    test(`/REST:GET iam/bounded-context/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/bounded-context/434fc9d6-fa59-4ebf-ac3e-9ac6b0f6b2b2')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET iam/bounded-context/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/bounded-context/bf308c5b-6988-4b2a-b631-63105ab5566f')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'bf308c5b-6988-4b2a-b631-63105ab5566f'));
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
                id: 'dc79816f-459e-4e15-b145-e2ab0d62ea0f',
                name: 'f24omb0shgzdqxuldhla5yjrwsc4cjzhsx2nz6om15wkyp05myb71vcotf3791xdiu1ydiv0q3xx9t29viw7fl42ehf8xsw5anon659erhqal31dm6cfrfjc9e3qiroro58jbk4byca95x36469t4is2figan14qx9ocyfcrmq35pej5pkm5sm9cphsrw0pgkk7g88m0yvm4sgs92l8xh2clqntfh6mvocbcwdnkzdt9td5cd463et52hxfwghu',
                root: '8pc2m7vrct7ia2cb619ivo331qntuw',
                sort: 346388,
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
                id: 'bf308c5b-6988-4b2a-b631-63105ab5566f',
                name: 'n95m2kbrctz40krmkav3teourf31t5csiu83tkni27b3kf3d7ck0t6qerl65mt94dmgezk89tch9hwh2hpri3e6jz3k9wc3fe8gvdb61hst6df2enq44me824d2c4h2k8ou7ceh44wxqt1tzhnrkc7qhlc64wu10bcdrj4wbn7lxzqc3lebszr4dyfm0kete5c0btpenena9do49kogwm7z905u4h6k3voeah9hzu10uyg9l39eqvdfmijxnrnt',
                root: 'urh3ogijelw3o9vr2lkoz6adu162nt',
                sort: 564564,
                isActive: true,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'bf308c5b-6988-4b2a-b631-63105ab5566f'));
    });

    test(`/REST:DELETE iam/bounded-context/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/bounded-context/cd3bcbe6-f9fb-488e-8b00-ad42f7ae182f')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE iam/bounded-context/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/bounded-context/bf308c5b-6988-4b2a-b631-63105ab5566f')
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
                        id: '24c2d81e-72eb-4953-904b-0baf2585d7e6',
                        name: '9qogw6nljmalr2ltqozyfftyicla0nhm94rcrj6crmvyb3444dr6e997v1laynmm4n307c4exf68byzrj0kjr23efjlin6eiho24yrdbp4t2sr8ctp3rwwiso5ufk4akg5o8fb76t8hbl1dzfpyyb2o2fe4992mdz09zgm8e0vspfuj4liy9p8rwgqxvc8f69p16i1wc333cm7durwbwyhpqszqg11lagsx89u2ewsfjdq8tmze3k0lvvuehet2',
                        root: 'hsnz3sz6xtizjhk6qktpsndl2ob7zv',
                        sort: 250802,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreateBoundedContext).toHaveProperty('id', '24c2d81e-72eb-4953-904b-0baf2585d7e6');
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
                            id: '62d20e8a-1a87-4fa6-8c44-e7a04062392f'
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
                            id: 'bf308c5b-6988-4b2a-b631-63105ab5566f'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindBoundedContext.id).toStrictEqual('bf308c5b-6988-4b2a-b631-63105ab5566f');
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
                    id: '6c518ae2-a6d1-4fb4-b3d5-8416e0f62215'
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
                    id: 'bf308c5b-6988-4b2a-b631-63105ab5566f'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindBoundedContextById.id).toStrictEqual('bf308c5b-6988-4b2a-b631-63105ab5566f');
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
                        id: '301bf4af-5b91-463e-9123-5bf0cd4bcc50',
                        name: 'iqwx2svrc1q8wlb32cag23ro3hj6zx7iai942zqygag7pnl0i9983rs5a0ydfjvih7ljs79vuspc0pk3o7d4wv1hp7cw8rlhquj9mhgtu5ly6ekyadza66e4p0glsptolegjkcpq5ddbnj8y60nsltlqxhznhtile0nv9194mwpij31h6upke2zgh7butvaem2tj6zux5kviei4sv1u4bfn65iaeohswe3qc04ewr666jcbf8qycn6riex09pbu',
                        root: 'j2wh15ky7vkxb5g90nap8g1x3p4p8h',
                        sort: 299153,
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
                        id: 'bf308c5b-6988-4b2a-b631-63105ab5566f',
                        name: 'c4ph8p16gv7kre0cdaodfgku6wnurhjydv8tyoespeim8o5h7mf8rukgizg0abllzjj1whbijpvn2gpuxw8ne7pr18fi5h8gark3xahbrccan85o4crpzwdnh1s63zs8ffv32kf56xqjwkjgj2bafyxxgj3ya10yi5iihp3crujt6euewtim19yno8e5b06ym2aq9gwy0jgilfbi91hwdd62ws2uf7z4ksatb6oz14ebzdq735f9zp7a20sh7ix',
                        root: 'cn5frhbgohssimr77g5e0sy9ce7fvm',
                        sort: 450365,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdateBoundedContext.id).toStrictEqual('bf308c5b-6988-4b2a-b631-63105ab5566f');
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
                    id: '555c87e8-ce66-4bb9-a23e-d89494c71c09'
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
                    id: 'bf308c5b-6988-4b2a-b631-63105ab5566f'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteBoundedContextById.id).toStrictEqual('bf308c5b-6988-4b2a-b631-63105ab5566f');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});