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
                name: '75isyye3oevqg1bot3584f6x08zsyjbe4oyrag11d33ok87zf50qr7ybegzhqomx6tatkb03glomzjjc7j9yymw7vpqzf09uq00dpjome0ikaqx1c1n2iidbh7ntbix2k7anovoxd85qmk23urg6iiec8q3zm485hjx36kvepik18zxn9bzosq38o1b2wztvihz7lvmq7051qeh9tdghqalve0u8myqwgz0i9gwdh1fxah6ru8jucg4obpc6jk6',
                root: 'n50atw5p0fibnj698vzvte0fky7xmf',
                sort: 181105,
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
                id: '52381693-cf44-491f-845b-2476030f521d',
                name: null,
                root: 'cazs4hj4fxj04hsv9mbsq1zury7f8m',
                sort: 546625,
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
                id: '1708d308-92cd-402f-afa8-5d557bcc971b',
                name: 'h4iwu845dy6g3qyolyfvlywqlopkdfp685royppgqevrs33su75txsxbith71vqw73jo604n0xm2ujagopyet9ru9ibgu4rirxdht42psjtrohnlx4bvjx87o92mrch3v95vv1w2sxhqetd4jn2wlkffqtfz6vphjd3ncla6dk3y5rd3gulkf0rovk264qpwesgh7qmytv7jwznu23ixy3nulhuw6dencc87vq0jz4l1ypxkpts3h8bovz25ncg',
                root: null,
                sort: 457959,
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
                id: 'd151fe22-76a0-4e4d-9c4b-afa90e690d4c',
                name: 'uc3ctpmoeker8orzc88fxs5kznbm76t0u0s8tsfkd0gz4oz0q33ljjnrac887gqitkwrd5k4k0rjm5d08uvjr26qr56yolqlengd0bv4ddxjvdgd9rq3865zn5wn59f80rekjj2tsu62akm5exxjn8i1jrkxzzv5s4z6xxix6flkbjdy80tnrutt3aupkd02poqtdovgqemu4kvogdagsx452sta0s04u93jor0my8xyd6yj16c7cw72x7uc89a',
                root: 'wh1cfbpaoqfs00qf670e3ipmgzehqk',
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
                id: 'f163addd-ca78-43d3-9ca5-cb600680a349',
                name: '681xx1bck2tdxnfbew0m9yo0u3u68yo019lagf0r6e061d0whzr4bnolxh8jwv1ua3o4w0xuag3by2mgpggst6s2dqoear7ppkmkpta4rn207fb3ij0n36cvb75kpn4cbxi1xtmpp2bj2zlbaa83lou4vj3ijkfi5alu0niv168wewqhkfhfxtssovnxzxe2sn3gj8lma47eg9icmbstemgjg1p7d0vx8bz5tu1w32uo96i8vc103k9f3ik6u25',
                root: 'pz32khuhcbk64cdt7ugqnot1ep6i1m',
                sort: 444886,
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
                
                name: 'm7nx66zpv6i02e5al78642euhgk36nejdkytjullkoekm5l3f42hh9hfefnpxpgc4bnxi6tsfjtuudo31gw622d3p82idis909go7davuj48dp3but63k11ncj4ytripj9sd57aaqzdwtakusaaplb4bib82yv9vgtsley8n7fmog0qzrb6d7pvmyvjftpe4p5tk05k014rmeywk1ogp4kophfb98f0xcvt7df6bdagvu12lqhebwwclzkiqyzq',
                root: 'unf08ny6cjfmfgrt5gywvkqk4w6q5t',
                sort: 492873,
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
                id: '57d42ee3-1ea5-4688-8e20-a00777f83ebc',
                
                root: 'hjbtk6acuh8b1z0rojimvxvkiqme53',
                sort: 369581,
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
                id: '57d42ee3-1ea5-4688-8e20-a00777f83ebc',
                name: 'rv22trjm3v6oisfx6xn9g8nsuljksxs8ejnoto6tsjlrwcccys0gz67lpkgurnr1s32b67y7o37hlqf1huh5d8nzrz4d5405rt9zmoks55zj6fjlhre4xortu6opfwmcrf42x9q61rb0xsqzjpq4n9lg0kwhirfubiwja32topwc1fat9mmjtc8urjk94iglvrzw1xxi4b9zl5zq0ulht4k9f1mn0oh8fxh5xs253go2g6xa839hbkymbb8z1m5',
                
                sort: 740503,
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
                id: '57d42ee3-1ea5-4688-8e20-a00777f83ebc',
                name: 'kbpk4plmr5hfq8dv97a3yvvh1q93oriiad8sc96vptk3lgyze7g6d48wdanhjo9a8f4gwg1f6wljig3igjrvjhf504dgyhf11rjolts2kl17zdi8mcu2zo4bql238bxbeyja5zwns2zogcchoh7xgbbne41ql8h73s5vra0l7vmyyo8unrc193twar12udj5dxls7p1itqv0flpls7r2xqu8oru6ytgwprziue1uvdm1p1zgbqsa0he5ycqbt86',
                root: 'l3xsfab3pxb8i0zs361m3kqghb89t4',
                
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
                id: '57d42ee3-1ea5-4688-8e20-a00777f83ebc',
                name: 'c4o9r1ip0k6br8w285lga1fxnodt200ggcp5ijxmdot2c1zpjyie16tko1p3lpskh91d77fqhd44d4y2lzxle38bu5v3aiavt6lnj34s2vy49u0b4qtlt8ttgf5f1nzob98158826mkrmyla4xda8olzrw9a7mzq8nc9uxwxmojhgdo4e44ixper4twn2xghmfuekhvw1hsbddowosbivyexk3ws3pe903mjtxa2bbmfm4pnjd89knh1ylaqbku',
                root: '5vbkxvqavrjz3ba7fmznidr6nff7sw',
                sort: 538360,
                
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
                id: 'igs1xxteg0d9nivbhagfiwf9ahk5o5ttbscv6',
                name: '4krlw92qibqtalx0ui3ztadtl3hqps0mv99h72n678lvduh128me1kootpd3xt3jtab28daxa4v01fmt7inbfeps1rktanaqty43gviaqo0poqxmqlix02hpq3tm6sgodeaak03iudsdpu3syhjkodok4bsx6wilh7b4ai129jhi394zb1io8hzqat8vfvpfx949xold0w4g75ix077ksbq0zd39f4j8rf3hxoj9dknhl01dylp6mrea1cnsy85',
                root: 'oyml6pwg6slm951s0mm42tobqe29ro',
                sort: 919051,
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
                id: '57d42ee3-1ea5-4688-8e20-a00777f83ebc',
                name: 'e234uumtjt5bps0b2bojy2ty0sh8ilw61vacxfpc7ppu0m241py2qzk59e1ytwey5402dsa3qvlhx3kanypmocfofj3s43eoayphsfuooql6jam7t75mgia89kx4v2m2dr3860odx7wka2fzqing927kx6senpx4iz2ku188smle3flcm62mgzea3el5lbky6oe4e8l5x7rlk0ako0sh5t14hqls35vtzpi63cfxhgcrkdvwwwe485e0ee1bi6ai',
                root: 'lmg3yao9lhwoqs895oistvxwh5lid9',
                sort: 970001,
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
                id: '57d42ee3-1ea5-4688-8e20-a00777f83ebc',
                name: '658s8rmlc59w61qpjan17u3flurbsjnv9bz4n58vzmvrjd63jm13ey8oduro5ftw4rbfd1sj9k2lyfquhdihpulpsuzfjtgcgmgaz5vn4b4gyyvpvllid6sxlnq99i5sxas9pj1b12g80ysudgu3mapw77i9pj68hgnpdkjyxrzhdm9slhdbj16ozn956s9c3qwd0p90mlsjnkqaycrvdy7jk29r1n6p3w390wf8saskiwk74o7tbv6pqii5698',
                root: '9mmqmzeexmuokupjfxhp0nwmod01nsm',
                sort: 989909,
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
                id: '57d42ee3-1ea5-4688-8e20-a00777f83ebc',
                name: 'v8jvyn7jma9hkfxd14a8upxvctetj90fatqsfvpxux77p0k42a5qp0kkhiu0815kjavdzlr3hu2e5hc67a9h915rupevvfuogmip8tiihap03rp4mkxfbfqy9nojopzmvuzdkzhfsaq2tqdzfqgl6l4wtppdo76dor86og37up6zwmta4wqzubfxo55b2wk04tua6iba6a8hj20eca3aov63eenulwhffnpxgoezlr3zbhjp0tcdb7vqnc66o3p',
                root: 'wv8td7mig21olb23wnep2m0fry0nd5',
                sort: 9316617,
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
                id: '57d42ee3-1ea5-4688-8e20-a00777f83ebc',
                name: 'pwxdsy0l58lx2k1m7wozbnf1s9fv95lhkoszkaprv5cb7ewvm9f0bsssspg6o6nzzni1mg9ivukjb9oi9yfjyrzqr4uv2ti96wtr3jyhyb8t5v4znztsovbrrj8hoyz5c2op0tsqe9929d3y4v18m1d2vp5hexr1pcshm581epjyv265v7axv4crcdhluv56ubrgfwipcu5aezn65qjksaxptez4642teulixqwratmnrov44lrfq6k4amkixgk',
                root: 'q0pmsc3fin9b1j480dyh8syejtx5iq',
                sort: 416543,
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
                id: '57d42ee3-1ea5-4688-8e20-a00777f83ebc',
                name: '3ygidc121t0tdf0jjg1oy50t22d3oevmaxbjt74xja2ksa6tj4ni6h0034bzyce054jpbt1ptb2jw3r4trs7pie703bcq4j5vunh0c8quu5k3fqlwovnzyb5wsaio4xtzi1amrt1n62ack218qe8bpdk4w8u3ipd9x7vf91jxqe9vuvf5zsgdyeethsepbarvbp0mcz5r7v2ulng3aylzizwc1mrgyytaf1wr4gsx2skmliol8kr9w0i82r7dlt',
                root: '0knwpxh4761wl17vbf0xyaharvfatz',
                sort: 869537,
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
                        id: 'c7f79c6d-234d-43f8-96b5-358256cf44fd'
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
                        id: '57d42ee3-1ea5-4688-8e20-a00777f83ebc'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '57d42ee3-1ea5-4688-8e20-a00777f83ebc'));
    });

    test(`/REST:GET iam/bounded-context/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/bounded-context/79497e66-4f81-44a2-92bb-084414f5d35f')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET iam/bounded-context/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/bounded-context/57d42ee3-1ea5-4688-8e20-a00777f83ebc')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '57d42ee3-1ea5-4688-8e20-a00777f83ebc'));
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
                
                id: 'cfa6cc6f-57ef-4772-b435-417914c0c296',
                name: 'z3om2exbg3h6x5dz8z08r1dgapwfokkyp1en9eohm6r68lux1jykylj6lscqtrblnt4m23z2lk82keqx40t6au7ik10ffvclb2ghce4g4u65svx5zjwqy8tomwul32mme4085uvpf15qcx7aek05yiu252ola5jshchzplvkt6609pdsw4ieb5tmpy74cdj5a38velhx84azu028cphxc0q5kz5oktyfqq6yq66e46mbr677mft2la9v7lsdoih',
                root: 'jctjxp3qwjeqxczrcct8s3a5mdx3u7',
                sort: 419780,
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
                
                id: '57d42ee3-1ea5-4688-8e20-a00777f83ebc',
                name: '7ziwep7obqkb8optm1q52enb6ahrrgye0xgmgcmrfz39iifmgd4exvsc48kgkw2bevlvc0uieqj56w87nyismhac877w4ly8msgdiuoptz7gdc3ds6a35trml4lp3c6l6qhc07cxwtnn4nxuxp3d6orsgw1fjlbep1mz2iyj6xxjnenzvjqpsaivpj6nkj22scrb0sgcqi6riz4a79e5q24n86xw62eh47w5rk39uyabyje298a90s7q36xgk7v',
                root: 'khbj23k2544530w5gnsaa7757hatvj',
                sort: 225291,
                isActive: false,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '57d42ee3-1ea5-4688-8e20-a00777f83ebc'));
    });

    test(`/REST:DELETE iam/bounded-context/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/bounded-context/73512b2a-6907-4e42-a69b-a770ad52571f')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE iam/bounded-context/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/bounded-context/57d42ee3-1ea5-4688-8e20-a00777f83ebc')
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
                        id: '516e0b2a-f4cc-4956-9026-92c613df39c7',
                        name: 'uwnu0rmtqsws6ympgsrleihrossn5jwuntffp0vlftw4fj17tnx9503guwxh35w6rg8t58ycnwnfhcnztfe930yu2jxcmjif15cm58nw8ozslz5qfo1csf6429ncyac0my580t0sefntogi0trtqqmuz1ps935d4ejk8ncpvupov1124kuz8or32nkbmuf2mj5dfdgitkootet84b8pqosm9azvv9wqa4c3rs2jnv43p4vpeqhif2q2qp453ohn',
                        root: '4v3fkm5w7q6b9lboqm1a8dccl1p43a',
                        sort: 984954,
                        isActive: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreateBoundedContext).toHaveProperty('id', '516e0b2a-f4cc-4956-9026-92c613df39c7');
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
                            id: '7a2fbde5-765e-4576-a034-f1c19e4c622c'
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
                            id: '57d42ee3-1ea5-4688-8e20-a00777f83ebc'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindBoundedContext.id).toStrictEqual('57d42ee3-1ea5-4688-8e20-a00777f83ebc');
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
                    id: '0a51f24a-e523-438b-bad9-8bf31e5877c6'
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
                    id: '57d42ee3-1ea5-4688-8e20-a00777f83ebc'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindBoundedContextById.id).toStrictEqual('57d42ee3-1ea5-4688-8e20-a00777f83ebc');
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
                        
                        id: 'ae7bb8d4-2c9e-4871-986e-4565505d1d4b',
                        name: 'p83sh8qh8nzsiuhv0tsli9uu7nc10i9jiztyrut6c4sayo8yr90x0cv7vgr4jo2wucsijlh9rfsskvjnf9ys1my16axkkezafd5hzei2qrhy12y32y4l8mwx76g4th270rpezkl5uwl2j4kevc6uko4xjyrh72jbr58k33wtka6h2fxxuzd408x69r7zgtto1konbd5azyc0lrf6jko8vep0y15s19vw55z7v8tb0ohlh4v1sotwxnpyvq1epa0',
                        root: 'dq2hkp7m9jki4h5j5cnc56j1c1adxp',
                        sort: 653150,
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
                        
                        id: '57d42ee3-1ea5-4688-8e20-a00777f83ebc',
                        name: '6vjfl0wjr8990ghjft3lya503va0bqmci65bwcu0131mpq9krghzacekyypqeoxhbeabf5weniu0jlf5c0xfjpjk0ax4ylgrqmnnqly0nxvivhvodq419qd1n6k3ilcsfs0yqtyl7ok4n4df3qvtqq1fgez6ozh0dkpm71puyo6duo8uj5klv3i3htreukypo465cjfsnmb81vopjtq6ew2xhmra81dlf7el7at8p2wmg2kg09oqt0htufvtune',
                        root: 'sg13mlig24k6po9jndrarzgwsn77hc',
                        sort: 107947,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdateBoundedContext.id).toStrictEqual('57d42ee3-1ea5-4688-8e20-a00777f83ebc');
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
                    id: '5e6f17c4-6354-426d-ae14-b33917b0ad1d'
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
                    id: '57d42ee3-1ea5-4688-8e20-a00777f83ebc'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteBoundedContextById.id).toStrictEqual('57d42ee3-1ea5-4688-8e20-a00777f83ebc');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});