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
import { IamModule } from './../../../src/apps/iam/iam.module';
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
                name: 'hbo1h5rijg803yvqzslgtae6gxwhnqpfjnts20hxw6pvhhm5olc3k39f22kpx833p2c0ea6esvh9glnznndreftiaahdnlw5ge310b8bd87vept1i2a5t6iczi4zpklb8z63ga2u2x4wtvw427m8b1eyr4qdrzfrnx35pyj8crbkiox0d0q369kja42v6858nd2rpxc1h0agn9rauts9js0hws5wipw5mhuzt69v408zw87dkmbh8warndrrogw',
                code: 'tiagyzd5ttxwcohh19jndnwv5n05duwxkbxe4ub2uvvrvgv5t9',
                secret: '70v050q7jq79zz0ftr9wxqbta53u764amqtix9tutvu12q7rzqd8xz3hoteba12vt8f642w6l9w06vxkthd8mf9drk',
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
                id: '848817a6-345b-4a0f-aa27-a21b6ab0ed6b',
                name: null,
                code: 'z71n1jnpyr79qd0nx9dc33rvzzz5kfk7m1olz12z3chmof84hh',
                secret: 'ugokr0iea3ho92htqwpownfwtdws9wtkpm670kn79g8c2ra8yc0o32xjpxmmmntn8w0v6dsnodnndmweteodclbojl',
                isMaster: true,
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
                id: 'a81925b8-0fb8-40f4-9ca1-278eb870eca3',
                name: 'muv2jflb1hv5vcl1cn705qh2newknmuhry8e7fbd77tbtzrrlmed6ijyjkwfis9lqdediewhiyh6h7wxscjhvqhm65hmzqaxiry1lmo1drdyggu80858q121nf99cxa181k53m1kvean5q5qicmnespdwq69z9hf6539qhntsnb05rlooud2j6qsq3tjbj404llpqa3ol6p7hxmc9ru25sfdyupklzwyumyrwbwpo3u9hkha7brjx6w7hibnjb6',
                code: null,
                secret: 'zg8rjzh50vasju8o62tskrrwajpfmmudpaowf5tvse9ueujffndk28spulquhuzlsouys69cmndu96ggg08mtenfad',
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
                id: '88ed9305-6b57-431a-bb59-1792daff9049',
                name: 'wq6wyka8ngswb2qjv346s4znlsnw8b4hzap7nmzq49c3jmp2c0l8yx3mfblbv40ymkdompu54td614shmrcgnhc17f6pi8x1vx8fm3tu6qha65se9364vz8jsu6xc4p1ub3vjcmiro45rpmnp3qg3m2jmsilmaz90fn04nz3a93xo8dryf4ft4rxm9x7jezg0msnruk5017fzdef1ukei94bohapqa2v3f98iroqq12pzlmyv3swt1bncq78qq1',
                code: 'tz84b6xj5rqlfdeq6hgr3nx1j85d17my8crrxce0zt6j3jcuan',
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
                id: '8fa802cd-2090-4a2b-b526-b418cd71c2fd',
                name: '0ydd1h5zhfgr77ebh3b3yd0chfpr3047v7ujt6i65480zav1lnnt6wua8xso5t0kuq200kt2h1t83w5l0l2r2o2dp0lu593zzawisz584f5ugwnr1x26p0w214zteswbi7758wk22525ns7ec4ysrzvdn15dzlatj1leksfyz54l1p5edkw8xy7r0f2oo9tk5cgy60svmks5gna5ti9bwpetgp8u40v2mp9vo5iwwtkt0bh2p77uu92a5y0nq31',
                code: 'k8gdh16g4gyr8m6sif8q0p6dxrtm6okv0ignxje57815fpxn4h',
                secret: 'arer060dm6y50wbl0icmr42j334tobyz85kp8fmbgcx739h6k4ay4hkwctfisfs81hwk317uud39kjh8v2v8hlanol',
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
                name: '8kp59ag0u3ynm84kgv2eyd8dwxiudddslbj7xilgn9ifapve38z8b9oym5lmo0f2imc9u75x81av8wrdh5v23wrl95vnq8k42yf5z79fgd52xizqewxrx3ac24amdwzlzl4ukdl2hmz7aaaax33ckb71ylexqzh0u3uis9zug3tr47qntjjoe0wggtwurwd7xgwo7cbdzrhjho63m2gy5h1snjhxhx92h5n2plcg77pcnmm624p7peq7wawfplz',
                code: 'qve5g2zzksslqmqkrv8nr32da3t0gz7oc1sndko7x1hh6kiv2p',
                secret: 'wdjgbzn5bo0mbf92td1wrdpwn4ryy48yioz90gslu3drx99yb9r7etygod0eku9oyqbexkgv3wxvc164im0r3t173b',
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
                id: '63c4033d-d72d-4950-92d3-410e00de31c3',
                code: 'to4z4g7q6iunnns7ied8jylstxy9bhf4uzd7sf8qqzfuw2q0b4',
                secret: 'dklu4hvz87b0rjekhx5kbyg9nnlepaofgodfix2mlm28ail598p3qtxhhqi1btm4jr31n0vaavbrhr1apfa4iqp7e2',
                isMaster: true,
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
                id: '97ff2d55-47eb-4e1e-bef7-ee75f6c11cee',
                name: 'tdfyrdy0tobvoob2ikr68zdu0camk8hy0fwwzf1q6ju1fm8bt0u1bsky9p97hg721eatucclwpos4iemtqs9npay85293db1jfuakdeai78wwqp745h6q0dr52fzh3kagm8on1guruk0ffisn5kqa93vmp4ccb1zjl448a0p46jhui3hf1vacx23nmxnk0gkjw7iin7y34rl1n17cddctgx89szvxct0vbs1uslg7viubaivtwgltonvw4ocbux',
                secret: 'blspzq6umpvlprf3p9dke6qucafqnsh0il0wcs75af4g5f1u2mql6yyztvxgu5y2bb6ja8x3yb8yy81fwfr6i93po6',
                isMaster: false,
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
                id: 'b11be3a4-ad40-4cba-84e6-2b6d8954b3fd',
                name: 'p4jvt52kb9wlmjk93ekfqanjpkurk9j8r6tk1dhm4ef7pl1rdlb7een3s955a1i16csfqctydcbdhvt67c64ak87ule1xmm0il3p50bnauuebgjby89brjegwspz81ti6txl9xwvbj7dlr5v96vibymzh2qyuxr8ovgmuhla5kx2iwf9zcwyazjhm1u1fxrt7dlsp34miuzydbuz3so2ssxqd1i0afwlenuh4fdhn5div3cq8eu8dtjsw1nzyia',
                code: 'z4s5pc8v07lmzdu12y1hmrysqfp8gp7tm7l5qy9t4bh6zg2zmp',
                isMaster: false,
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
                id: 'de74b7c8-30f6-4cfe-8f51-501d9272fd93',
                name: 'bysvibbmhcs7meyvwxd19iwm1vhcndswfyq21vc1ojboqscwdvxksdvazw307pc4t5954rlgssqi71p6i55xyetl46rmmcv86recyfkux6v0ipow5fbmk8if0chb04w01ddv2anaza6y4m60uh2uv1lsffctdbeywszvrnt4l51n4cmn2xuvb5lokh4u9el8koswvleo8gax07ev0unbjoce98f1npi2pioe9r7ha0gziapcr8aux3yopb508vy',
                code: 'ec91bvoirek783i9czbum612m58j4676s19fvjdwuajeh09lsv',
                secret: '27x3cnw7hjrxmlr10fubx60g2vdln39cffmk8hn2ldlcqf5ddrp2ykb00djopqco9h8u59u1egpbz6ukjk0t6fos42',
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
                id: 'vbm7ibkq3cutciq28x1n81yssg44zuw1gpaev',
                name: '96068ogaskn9nhyivdt0m3wdzqykep6a9ao6jllpa8sl0r068g2k1h0za1nf80jb110u4oha2o477zhh9jvpyhm21sl8891gj4e6xh9v1zpk74ide7o1o3f356cqffxnfhazgxk16lmff5ajl1pz1yhrnt2qvwths4tyhe8oozvr5m2wbux2jmgwld1tilpjt7c4q7x4gacudoj3rxgnfht1f24jvr2zhloidb6g8iqlmijdfxvht40mxzj51e7',
                code: 'i974yco0olhtdyq7f3wvsagtd7542mwmqm9fziwmb784g5u6ui',
                secret: 'lvns3j5s9kxfxxyd48tr2uc84n5ucnx4awp5jbqbyczhk13d2b8vagoky6gt0wimjlrh4nrxtryp7juaz81lcwi1qa',
                isMaster: false,
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
                id: 'f39d09e2-6bc9-4954-bce1-6bdbf828b2db',
                name: 'incmchrstkrwzg78f4nrfdet6a082zj0rowg2ff41bj5bbcr4sdelybgnba5b1o7u3hyyr2xlen4wql17wnkc60xbnu6h8kbvsvzq38v8z0fyu8oosqu3k26ruhgjxnne5zme324nhukdhvi4iqdwg6tcigy5oxp8bz4pv9tc0vjcy6rtr988cz4q4nbivrbo5ve8tal4k1noy0reloggvw5451kamycdss7wpeg3gh5tn9lk82ha3b33jg0g30k',
                code: 'w9o07wu4jzumwyu6xynvzvxl1ebidlgskx4r36wpase08p9etn',
                secret: '6htl4ebt8qn3jxyrthtckocyg1xus8qjhhtlkyl23d5tzglidqa9k8ncbcf4rwy7npksb2e0y3lv939u9r8ukdtkky',
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
                id: 'b971e70b-add1-464e-80a6-d1cf18abcde6',
                name: '0ecfbbpr80ede6xc6eiq3fvraxaj32avwqlp77ueumglsusdw3tf1h1lcey8hmnynpzz3zwg8rm8lw4spjjmbf219ie5wz4da9sjby6oag1x8omcbmel8v7lwwls2ug2pp6r3egpmow4ema7z65sl1d5cg3h482mm1eutlzcbkkp8uyfgzxzawt29jm832uzzlrt1lytx1op3ydtd18u1tj5fyoaql02h7dra2fpsunmswgm7vfajhxqryzodvq',
                code: 'myjnvo6k6jia7r5dg01clturwoj6zou8mmc9ay9e84ck0gczfa7',
                secret: 'qwo0p05ksn0w7w2ie6ntdvzakdsfcwmjab37l90zp917fr4qmv0o0eoqdbaor3atviwbyci176ul34ls39lxvuyru0',
                isMaster: false,
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
                id: '8c7a517e-3567-4621-9091-800ff765b4e9',
                name: 'xyd7dki0bq6a8yclimlq35plo5q2tvwhmivxskz0hp4213ja0j0le0nlclvids02k04l7qv40j472y06e9afv5xpmgz31pto1dvg8n5zxe7dxudlu69upyq9bgjfrvgkusngahsyawv1kk1y5yhyu7izti56asqp4595tvwzbomqobhxrq069clyfzrttlpkbo8j59835347kxr5eezpx4cu684qvwk73s3qiof04cetsb89tuyr2c7cd8yknjn',
                code: 'm1hqqnoay1q8jbqmfva7sfpqibhjml2zev484wjqbdp1a879lr',
                secret: 'sfh9uq0ksoo5fk9zfmee60dz6vqycrqqt649xjlnp486mf7q7bqho8fxcm8j0zdg4u2kmjkx8xdempinaaufn77156n',
                isMaster: true,
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
                id: 'f5ba195b-1322-4ce1-9f10-4b03dfc1fa9e',
                name: '8f6dkfxqiiewwvyw1vxk8p0dy06jwqmiprdehtf4pt19d37rxturqzk15r0t37x2o9gqw7m0spjomtchpx9qi65u67dsymlkifeqrl4ku3bqt064l97w9ysjma6s8qvy1bafvmjhvbllm5vwq83evxl2t2cacrng6w7jct9o8mkqhpz2bwq9whyvx4ej5v1s7b2ynt2wbzqq12y28rpujjkv35fog7ryzk7o00vkkkl2uubd197hjc3slocw5fp',
                code: 'sckvofglgm5lo20x40y3oe2foo73gzbv541qvzujdy376skrd2',
                secret: '0sb1nbcihrqbfvkxo8vl8k6vu0wermz7fsn9117s627ugjma29rpzmqluv535p2z6o7e9eqcwzb1j6yelllm69sgbz',
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
                id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                code: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                secret: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44',
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
                        id: '2c12dd6c-8ed4-48c1-9d0e-a1e73fdfca2e'
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
                        id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '28fe4bec-6e5a-475d-b118-1567f2fd5d25'));
    });

    test(`/REST:GET o-auth/application/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/application/394a15d0-3585-48b1-b84c-95865652e34c')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET o-auth/application/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/application/28fe4bec-6e5a-475d-b118-1567f2fd5d25')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '28fe4bec-6e5a-475d-b118-1567f2fd5d25'));
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
                id: '23fc2902-ddc3-4a2e-9894-029b3450f1ef',
                name: '12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g4',
                code: '3tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkp',
                secret: 'ahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a',
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
                id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                code: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                secret: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44',
                isMaster: false,
                clientIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '28fe4bec-6e5a-475d-b118-1567f2fd5d25'));
    });

    test(`/REST:DELETE o-auth/application/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/application/41934ad1-7bc3-4ac5-8bfa-f8764ee422cb')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE o-auth/application/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/application/28fe4bec-6e5a-475d-b118-1567f2fd5d25')
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
                        id: '18d4f1fb-5182-429a-8f35-bb39facb2962',
                        name: '58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qio',
                        code: 'cdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4k',
                        secret: 'je3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af',
                        isMaster: false,
                        clientIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateApplication).toHaveProperty('id', '18d4f1fb-5182-429a-8f35-bb39facb2962');
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
                            id: 'ebfa683c-cce9-4fac-a879-b3b642ec262c'
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
                            id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindApplication.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
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
                    id: '4316ac00-f968-4e4d-9662-0e6fac4f6154'
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
                    id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindApplicationById.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
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
                        id: '23fc2902-ddc3-4a2e-9894-029b3450f1ef',
                        name: '12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g4',
                        code: '3tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkp',
                        secret: 'ahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a',
                        isMaster: false,
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
                        id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        code: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                        secret: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44',
                        isMaster: false,
                        clientIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateApplication.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
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
                    id: 'd0612bab-d2b6-41f7-9b47-c4f29338617b'
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
                    id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteApplicationById.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});