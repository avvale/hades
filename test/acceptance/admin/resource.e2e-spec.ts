import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IResourceRepository } from '@hades/admin/resource/domain/resource.repository';
import { MockResourceRepository } from '@hades/admin/resource/infrastructure/mock/mock-resource.repository';
import { AuthorizationGuard } from '../../../src/apps/shared/modules/auth/guards/authorization.guard';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import * as request from 'supertest';
import * as _ from 'lodash';

// has OAuth
import { JwtModule } from '@nestjs/jwt';
import { IAccountRepository } from '@hades/iam/account/domain/account.repository';
import { MockAccountRepository } from '@hades/iam/account/infrastructure/mock/mock-account.repository';
import { TestingJwtService } from './../../../src/apps/o-auth/credential/services/testing-jwt.service';
import * as fs from 'fs';
import { IamModule } from './../../../src/apps/iam/iam.module';

const importForeignModules = [
    IamModule
];

describe('resource', () =>
{
    let app: INestApplication;
    let repository: MockResourceRepository;
    let testJwt: string;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    AdminModule,
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
            .overrideProvider(IResourceRepository)
            .useClass(MockResourceRepository)
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        app         = module.createNestApplication();
        repository  = <MockResourceRepository>module.get<IResourceRepository>(IResourceRepository);
        testJwt     =  module.get(TestingJwtService).getJwt();

        await app.init();
    });

    test(`/REST:POST admin/resource - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: null,
                boundedContextId: '4cdd300e-45c2-4eee-acbd-74ef264ee039',
                attachmentFamilyIds: [],
                name: 'mrnklaqdht670q9yfhf4y4iundjziynic198bs8mnaribft67am3g2h1ase83i2z8jybx297b4b7w7vuvgzrfwk5yhj1jky81ot651uaa17ftpet4adm9o90nuj0zci2c9ngktiwlu5tg6fq371ko9oz2lsavqfyhw3nlesgso4k8v0lk583hv3r58opcuebl4k67m8pgb17j8taq0bbi4iegquhhyqc6pi03bgp05afnd2pjhg7r42yjc10icu',
                hasCustomFields: true,
                hasAttachments: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceBoundedContextId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'fecce084-4903-4b61-9872-05fbc20d475b',
                boundedContextId: null,
                attachmentFamilyIds: [],
                name: 'kp8mp4zyovu75nx31c0odhjfrk4e3lekf6rmp6cpl6w7km3902e6k3yqqc7wwce7rxxsij4iet2skp6lfjv2uumjg7po8b9m896u7bnl3tkwtf7zdnjz2cuxmvfacharnpmcmfdkt443ps0z76fxeux8wudm6tsmu3q2s8vl10zouw1pqi4v1dk9ht7qk5rs1346jsy4lk0tr0vraaexxgxgv9t7d3x5woj61wmjpew5d8nhnwprkpshpqdrxw9',
                hasCustomFields: false,
                hasAttachments: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceBoundedContextId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceName property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'fecce084-4903-4b61-9872-05fbc20d475b',
                boundedContextId: '4cdd300e-45c2-4eee-acbd-74ef264ee039',
                attachmentFamilyIds: [],
                name: null,
                hasCustomFields: true,
                hasAttachments: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceName must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceHasCustomFields property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'fecce084-4903-4b61-9872-05fbc20d475b',
                boundedContextId: '4cdd300e-45c2-4eee-acbd-74ef264ee039',
                attachmentFamilyIds: [],
                name: '3rntif7a97klz6up43pahr7o0lgfha8c09x8coc3ivrqzsqwpb3kmsyf93j7acubsk05le96koso3okxb9qild6wkot7rsj5g63buckarzo2v7iib9ad20rfqisgqr9t17v6jzbgkc8mvxydtvie1eg7jrn59gxreftcs9v3zp4vuir3d9zhfr49636hs090vmrtmutxfegqho527pn9hg7fbw6pn4o0hl80qvjbcn7ormsocezx08rijqdyuku',
                hasCustomFields: null,
                hasAttachments: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceHasCustomFields must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceHasAttachments property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'fecce084-4903-4b61-9872-05fbc20d475b',
                boundedContextId: '4cdd300e-45c2-4eee-acbd-74ef264ee039',
                attachmentFamilyIds: [],
                name: 'x5uafllfdot08051g9wussatyo73q3qmyui06be0jgaadp97irp2l59i3jqbeo0293s9nrr2pptfqfys8oc2aj1562v3r2wi8rklhppysvc5mxscsi90xyygza6sjzdjysm4km4rk6gs70mrxrjsrlqn6xe1ls0r7mov700zyyz8w51dndp1r0g8rcrpbpd4rb9ggmmrtgtug4ln0sa82vfa6bhx3wej5mviuyuzmealu9kp2ckgbwcw7qhfzq2',
                hasCustomFields: true,
                hasAttachments: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceHasAttachments must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                boundedContextId: '4cdd300e-45c2-4eee-acbd-74ef264ee039',
                attachmentFamilyIds: [],
                name: 'l291ewql7d4l7hauq3upz5i9o7dezjjvr80epuc7jsicxqw712gzo4h0d8ct7781p198dn5ta7kbnr7tl4ywv7l0arsw6tpep0cjch6zwerctvg8wzw23dyx6qo7cobnvesq60swnah8pb7fuifoy5md8klkm8wfbssznocs2cm91vic841993a761mcdlvr7tifejb4tyhxrr8036le0k427hwqcua9n1r55a3vc6lq4yab268kolak2zhq6jx',
                hasCustomFields: true,
                hasAttachments: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceBoundedContextId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'fecce084-4903-4b61-9872-05fbc20d475b',
                attachmentFamilyIds: [],
                name: 'o15q47fxi6cdeh3nzsnt76tzac6mf8ovueetvrzmxi5vffhzs41lewjqbfvmo21veffbhtp3w317z3ativ8w5t4h4espt2yio7yfaix3p5nxdg0sle1dygi4t6bz589b709wmsxjykz0f7jl3g5w1cvdxcds4fw1zd8tka4j8t9m8v4bhkejftfn86tannmd8o5jkxeo5ki598qtqo91rlrtmnpta90ajxw9igr0g8nw37p4mu6sfax4mox1fl7',
                hasCustomFields: false,
                hasAttachments: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceBoundedContextId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceName property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'fecce084-4903-4b61-9872-05fbc20d475b',
                boundedContextId: '4cdd300e-45c2-4eee-acbd-74ef264ee039',
                attachmentFamilyIds: [],
                hasCustomFields: true,
                hasAttachments: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceName must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceHasCustomFields property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'fecce084-4903-4b61-9872-05fbc20d475b',
                boundedContextId: '4cdd300e-45c2-4eee-acbd-74ef264ee039',
                attachmentFamilyIds: [],
                name: 'kngd8kj8e09im5jlfg1g6vkxyus0opm2t3895jtke76urihw1wck65lmocv7zsjnnrb6wxe72j1nnym508kmrvq0d8rjey9eglib33dbm8qxcfv9vc7d9eivrfip979hywuemr92vops3ow6e031aslm047ag56mer7fi7bd5gpcb0yfuhgi2f9hbs5mmfzehsqe6aeo19mvofh41229aoeadcgzewqgm8smwxr29628jld8vjnoo7nm3ptazz7',
                hasAttachments: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceHasCustomFields must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceHasAttachments property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'fecce084-4903-4b61-9872-05fbc20d475b',
                boundedContextId: '4cdd300e-45c2-4eee-acbd-74ef264ee039',
                attachmentFamilyIds: [],
                name: 'wezaiy6g0ghsx626aq39xzqee0y981fs2v46uev61rnp7mpw1153elgesxosk9gwrku0w4mnicgp9sef0ahkjwg4h0apyowz2kqi1aw9d1xhd5qod5qxidgfofnx1helpcqfhw57023nxd6xv414n0mn1xr700x5zgpggp3z3wdibo69myslg871ayv6iu762trec429nipjjwfs8rr7kpi4oy1c8j8od86hi7wv8ryculivrzdcoclo7knd9yf',
                hasCustomFields: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceHasAttachments must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'vytox5ucqve8cvcw0wfd4gtp0no1ejtl1xin8',
                boundedContextId: '4cdd300e-45c2-4eee-acbd-74ef264ee039',
                attachmentFamilyIds: [],
                name: '35klhhanjhwbvuq8qafzaxgogm3xu8lbcrfnze2pfdl2o44bx9kj1dnlv1fth6aqiphny8e8u5j806hty9twqh2tyrw5ymuamj72xudv6upyk3lzkk5358wue42fiuvvl0chcftlxly446mc9pxdvfnre64wx4sn34na52e9opiphx69vq0z2kwlfgc544lpey268qs1jvakjym01l4kbbaqo95ml5ei06g466apanwluovlr85n8hca96eapd8',
                hasCustomFields: true,
                hasAttachments: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceBoundedContextId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'fecce084-4903-4b61-9872-05fbc20d475b',
                boundedContextId: 'iqez3kn0n2iofc7d588isorbahu8kvkifpz02',
                attachmentFamilyIds: [],
                name: 'mcjhv3lb69m1fbugwjkc7f93lrqlzg988572uuaq9plsmrybjw4enx913qb3d6orak40493j7x9w5alz1hy7zsgxs06dr8oivfm9iuz2kiq8v2jr595pifdf476vlakopny4pee924r90jlokcv6636klssox5qkz9ulxp6nyvco2036eaftnla99d8meyc8t5t0dbh1pt26i3rs2rk71515qfx7sy2ppoeevnaxybxfraf8ejohrf7f45tgfg0',
                hasCustomFields: true,
                hasAttachments: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceBoundedContextId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceName is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'fecce084-4903-4b61-9872-05fbc20d475b',
                boundedContextId: '4cdd300e-45c2-4eee-acbd-74ef264ee039',
                attachmentFamilyIds: [],
                name: 'dq209h4575f30q0j6xz3xjrl1b2qlvwh99uwoyb02fdpomyug7yrokua4tnsrnrab9ynsnpdugfaujywwnjjmyagmn7jsfdwn5gb20zvmjiyi0c10wnmawvw4g5seabj5l1q5xe0zeqaa6qtbvahavvcsqanusfk3f425ebl5ovhhurigxahwzvggwekhzpoky28vy7mjtcc490sa76zhxbdgp16vgnwjx6fsjh4bdkeyr2sa8s9oua1sm8cf8a9',
                hasCustomFields: true,
                hasAttachments: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceName is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceHasCustomFields has to be a boolean value`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'fecce084-4903-4b61-9872-05fbc20d475b',
                boundedContextId: '4cdd300e-45c2-4eee-acbd-74ef264ee039',
                attachmentFamilyIds: [],
                name: '44lbo0msi1wcqxnh7aypd3amfcttyxuo0daub5f7t0il1br9ta4ptx85dxyam2kofzw3wvcib5yaksor7h1uij6hlwnevgv6t7eqhy2caizc7otsyaj41710flnb8g9asyw3yflfpy9qugk6n9gcrvz6qpjp0me9rok07ad1yzeuhrvtee6wr7f9ubsnrvglcqcnrxytqh9xkv7926aeiv2a8b32v5so8yki63xg7wev6hl337c9rtkef7ko02h',
                hasCustomFields: 'true',
                hasAttachments: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceHasCustomFields has to be a boolean value');
            });
    });
    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceHasAttachments has to be a boolean value`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'fecce084-4903-4b61-9872-05fbc20d475b',
                boundedContextId: '4cdd300e-45c2-4eee-acbd-74ef264ee039',
                attachmentFamilyIds: [],
                name: '51r3a42pjq3hysl6pco9x0qin0vyqixenf4gmt5rh5vokexop3jqjmag2lh1k5nqyjy42wsss3r77j8qtg7wk8go8cttb1gd58y49mtq9lo47o34vcry8cxwz8ozyazv9l0oz8q6p2601c1grkqbtyct9q81gqgz8w33o8o6ukgqi8gjs3xtd6ra7zscvtzk3cyvxwbbewor8mpgshvkkdb9b6v8wi6u80bzwg6bm28k4wk50nuvs0sc7ezpyxo',
                hasCustomFields: false,
                hasAttachments: 'true',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceHasAttachments has to be a boolean value');
            });
    });

    test(`/REST:POST admin/resource`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'fecce084-4903-4b61-9872-05fbc20d475b',
                boundedContextId: '4cdd300e-45c2-4eee-acbd-74ef264ee039',
                attachmentFamilyIds: [],
                name: 'plnjx1iinxm19tdpi0p71rjuni9y532unfbpo095xy0ln15b9ii2yaz7x7egn6n4nggb5togycnh58w326gae0yi02ux5fton60ayj4achkro1ckucjws8qkwcso2sebhx8erhiyhfcsgbky7zql2nnf5sjw55296h0vmcj5hfdh1ujotn20nnx9h0yyd6cay1vew2tgyiks1iv2c3db737e4h9o5bcsndqyicre0inzz3fauwhntgkr4un0kpd',
                hasCustomFields: false,
                hasAttachments: true,
            })
            .expect(201);
    });

    test(`/REST:GET admin/resources/paginate`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/resources/paginate')
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

    test(`/REST:GET admin/resource - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/resource')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: '16dd007f-befb-4cc0-b482-152503390a9f'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET admin/resource`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/resource')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: 'fecce084-4903-4b61-9872-05fbc20d475b'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'fecce084-4903-4b61-9872-05fbc20d475b'));
    });

    test(`/REST:GET admin/resource/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/resource/54d1fed6-1235-427a-9cb8-87898a17f430')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET admin/resource/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/resource/fecce084-4903-4b61-9872-05fbc20d475b')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'fecce084-4903-4b61-9872-05fbc20d475b'));
    });

    test(`/REST:GET admin/resources`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/resources')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT admin/resource - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .put('/admin/resource')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '2db51e4c-c33b-446e-baee-3b6aa1b64be3',
                boundedContextId: 'eedbb094-e690-432f-bcf2-9877490bf39c',
                attachmentFamilyIds: [],
                name: '3vk24susvphu276f7b287l93kxl33kwt7dl9caao3a7ohw3r64ehprunhua4aw1ddrpasv4ebme8fctajaa6vtxlyrbfpkbjapp71ymk5k0zt2w0jp9k7h9ab9omd48faydpp73qal29v2lpowpywrei0qhqagwwbnu2nj8crrc2i24z2dhnrzpst54dy8m0fv1l48ngm5ilk9p1bhu5vc7kkthvwjzf2asoije5a6n28fljrul5wdx7dx5v8t3',
                hasCustomFields: true,
                hasAttachments: false,
            })
            .expect(404);
    });

    test(`/REST:PUT admin/resource`, () =>
    {
        return request(app.getHttpServer())
            .put('/admin/resource')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'fecce084-4903-4b61-9872-05fbc20d475b',
                boundedContextId: '4cdd300e-45c2-4eee-acbd-74ef264ee039',
                attachmentFamilyIds: [],
                name: 'q6bes6kc6n447xfrz0943n8lfppckgqa7owf770sv28ne7y6yfzb56b2xw79thga04ie83ewrpsh0ngr4qnsl6be4w8n7sh6zkadn4y8txn1l50wfxyy03zzf0i1ttlv20pad3csj3ou2dlgi1di297odlnditbshxh3041wlpneyyetysi0ozegdie3ddjzntxj0xr60jl067yr1k53eodpedbnhwjlqjycf835m7qgzlbvgyskaoc6l11662w',
                hasCustomFields: false,
                hasAttachments: false,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'fecce084-4903-4b61-9872-05fbc20d475b'));
    });

    test(`/REST:DELETE admin/resource/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/resource/99ed175f-5214-472b-b873-010904775175')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE admin/resource/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/resource/fecce084-4903-4b61-9872-05fbc20d475b')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200);
    });

    test(`/GraphQL adminCreateResource - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminCreateResourceInput!)
                    {
                        adminCreateResource (payload:$payload)
                        {
                            id
                            name
                            hasCustomFields
                            hasAttachments
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

    test(`/GraphQL adminCreateResource`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminCreateResourceInput!)
                    {
                        adminCreateResource (payload:$payload)
                        {
                            id
                            name
                            hasCustomFields
                            hasAttachments
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '6e7c3837-5299-44f5-92dc-49c97ea6dec1',
                        name: 'nk6ngbyn74op0qcreyf869a95lpodtww817v1u0i4shy9bf51wr44t2tkbhvj9i9vbitwwbhx13dtc14tmo7plbib0hp0bt43jacmec8hts48pkgnfhseqgz8q0hr86b08n90c0pzvm2k33c4zo19gjer1xui6zn02e9e9ed94m8u1ui696rsidwbs3l1cm96iuayzf433dmpt9kcy6tvvqtfmmkhb6j3p7d3f9cv3r9pyq0e05775q0xfkdpj1',
                        hasCustomFields: false,
                        hasAttachments: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateResource).toHaveProperty('id', '6e7c3837-5299-44f5-92dc-49c97ea6dec1');
            });
    });

    test(`/GraphQL adminPaginateResources`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        adminPaginateResources (query:$query constraint:$constraint)
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
                expect(res.body.data.adminPaginateResources.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateResources.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateResources.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL adminFindResource - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindResource (query:$query)
                        {
                            id
                            name
                            hasCustomFields
                            hasAttachments
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
                            id: '960a497a-fb56-4eb5-935b-e957958a6ee1'
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

    test(`/GraphQL adminFindResource`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindResource (query:$query)
                        {
                            id
                            name
                            hasCustomFields
                            hasAttachments
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
                            id: 'fecce084-4903-4b61-9872-05fbc20d475b'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindResource.id).toStrictEqual('fecce084-4903-4b61-9872-05fbc20d475b');
            });
    });

    test(`/GraphQL adminFindResourceById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        adminFindResourceById (id:$id)
                        {
                            id
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '3d236977-bfe0-4760-96a3-59b08e7f1306'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminFindResourceById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        adminFindResourceById (id:$id)
                        {
                            id
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'fecce084-4903-4b61-9872-05fbc20d475b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindResourceById.id).toStrictEqual('fecce084-4903-4b61-9872-05fbc20d475b');
            });
    });

    test(`/GraphQL adminGetResources`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        adminGetResources (query:$query)
                        {
                            id
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.adminGetResources.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL adminUpdateResource - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminUpdateResourceInput!)
                    {
                        adminUpdateResource (payload:$payload)
                        {
                            id
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '324e8650-e6e5-4816-b0cb-4666712c49fe',
                        boundedContextId: 'e9396bf7-500e-4261-8ef8-0c4b2cb476bc',
                        attachmentFamilyIds: [],
                        name: '8ttidxi02guc4q3woyxbwzbt6krw7aqacnkkyuhl3ugjdmng8jrj5tpbi60mol4ir0aqrzu4990m2by4qi6okj87bx9hvdek8e39n21rcadnufvc1r0o9awjrkdcyf5n65ti0ogu6jjwnpvapd0adex2es1jfrc07n62jnr85xa4satxo0t9zd7v36zp0waznb2dgq4wkcd6genn2yn2fn4imcevlx6gbjepyauv26uo4ngzbzxhg09h2vuol47',
                        hasCustomFields: true,
                        hasAttachments: false,
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

    test(`/GraphQL adminUpdateResource`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminUpdateResourceInput!)
                    {
                        adminUpdateResource (payload:$payload)
                        {
                            id
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'fecce084-4903-4b61-9872-05fbc20d475b',
                        boundedContextId: '4cdd300e-45c2-4eee-acbd-74ef264ee039',
                        attachmentFamilyIds: [],
                        name: 'aydp32zca44o2nf7modl4z4z6pmchm9jhmlo3hh58em92qo992kuxx7utie6y14pabiyejt56x5s6b2ohybyrezt6lkis7v3sk94hp6to6felpk72c9iopy8njfs0kj0cn8tacglznt4kop2h8rqw0z6apww5dj958yi78zgkibnna03wd72lc8diqx3oxcyd2f7rz0j0tzl7qj5hes8pv9fc3cx870lica07bk8ue9ssmqwhd0w0hf2osskh4r',
                        hasCustomFields: true,
                        hasAttachments: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateResource.id).toStrictEqual('fecce084-4903-4b61-9872-05fbc20d475b');
            });
    });

    test(`/GraphQL adminDeleteResourceById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteResourceById (id:$id)
                        {
                            id
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '2e2d31cd-f192-4af7-95e5-51246c97b2b6'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminDeleteResourceById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteResourceById (id:$id)
                        {
                            id
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'fecce084-4903-4b61-9872-05fbc20d475b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteResourceById.id).toStrictEqual('fecce084-4903-4b61-9872-05fbc20d475b');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});