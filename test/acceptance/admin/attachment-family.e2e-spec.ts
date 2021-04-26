import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAttachmentFamilyRepository } from '@hades/admin/attachment-family/domain/attachment-family.repository';
import { MockAttachmentFamilyRepository } from '@hades/admin/attachment-family/infrastructure/mock/mock-attachment-family.repository';
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

describe('attachment-family', () =>
{
    let app: INestApplication;
    let repository: MockAttachmentFamilyRepository;
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
            .overrideProvider(IAttachmentFamilyRepository)
            .useClass(MockAttachmentFamilyRepository)
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        app         = module.createNestApplication();
        repository  = <MockAttachmentFamilyRepository>module.get<IAttachmentFamilyRepository>(IAttachmentFamilyRepository);
        testJwt     =  module.get(TestingJwtService).getJwt();

        await app.init();
    });

    test(`/REST:POST admin/attachment-family - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: null,
                name: 'o8mg6v53aqccet0rj2pvuc77rbo8sxni3w5y3u9jeq7htt5xxl0ekucq2ss0wfd1ud9brd6wfo9s73ol75zd7qhj83nmasxadup4qq49p7ogfifttunbbo28l74occjyg2s86bolku3yw2fqa5fdyf2p90ayhrw85tvgbn123dretghiwfgipc9lmbawycpx1bhcipv38bn7f8v8cgf1eack3gyllucvhpg8cioobdeup0jtyrhuyhqykvsmaxz',
                resourceIds: [],
                width: 680030,
                height: 573340,
                fit: 'FREE_HEIGHT',
                sizes: { &quot;foo&quot; : &quot;bar&quot; },
                quality: 105,
                format: 'GIF',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyName property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '539fea5d-91ff-4765-ba30-a3214ccd652b',
                name: null,
                resourceIds: [],
                width: 638974,
                height: 711384,
                fit: 'CROP',
                sizes: { &quot;foo&quot; : &quot;bar&quot; },
                quality: 116,
                format: 'TIF',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyName must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                name: 'zn0ohpuruyppeqxy147suv7cc7hsadvxk7g72phvfu2ipxta0f6s1djxmidcsqp8z9lug1wa4ktdi5fxo20nqwglz7kk548g3mz0d33cxpp6qzqww8tzmxifgbd1lxds0j53ngsyqiop14tod3a753dqcdhp028qjikws4rw33qjbgxfy1ook0vbkysd83nqm91pgs4nsi056hlx0d5m5pt5r2x4omachg0g0ojsaocsrjgms6u3vy8g69egors',
                resourceIds: [],
                width: 676980,
                height: 287629,
                fit: 'WIDTH',
                sizes: { &quot;foo&quot; : &quot;bar&quot; },
                quality: 640,
                format: 'DATA_URL',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyName property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '539fea5d-91ff-4765-ba30-a3214ccd652b',
                resourceIds: [],
                width: 605669,
                height: 567700,
                fit: 'HEIGHT',
                sizes: { &quot;foo&quot; : &quot;bar&quot; },
                quality: 944,
                format: 'TIF',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyName must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'dt4o8n3mqijjkzssc2fqyvkbor9o6j1nq8xfw',
                name: 'ioip7neglh2cu1icu5b2sjj4fcqqsbsyp22z60kzc6tb5pw2f5cql0gim5xnegyqs78gj1zks8yq265kbmsxz561y2n5w0yjbdutnp8x75118y3yilsc5u826o5sderst75h6q7pzqeq1y5p4n4dnouxymiagkmqr1j4h5h1cs9ryh6mjpxuz87pjk6p9jv3cqykukeqo4ia9hkk7290v4iacwqft9j3xu181okho3icslndp0eomi2ybo5gp50',
                resourceIds: [],
                width: 192979,
                height: 387248,
                fit: 'FREE_WIDTH',
                sizes: { &quot;foo&quot; : &quot;bar&quot; },
                quality: 739,
                format: 'TIF',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyName is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '539fea5d-91ff-4765-ba30-a3214ccd652b',
                name: 't509c7mlyblzzuhww9577sjdeq0ozewvlsn6hd2h09ceph903je9nl03w5ike9c9brc0t1cb2howzbgrxogfeomlbjqoxb8ah2rsvhxqitmoss040bhx36aig6kuybupamkf07q0qo95p2u678ug36k20vjml1huzfe809xy211g39kuwytcexeb0poy3eihxrpnlsj5wkoaj3d017i4cblup7oxcsgr2aeawhxld28bssbzgonkpbm4v9ir3yrn',
                resourceIds: [],
                width: 420347,
                height: 221561,
                fit: 'CROP',
                sizes: { &quot;foo&quot; : &quot;bar&quot; },
                quality: 857,
                format: 'DATA_URL',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyName is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyWidth is too large, has a maximum length of 6`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '539fea5d-91ff-4765-ba30-a3214ccd652b',
                name: '7bd8ho56jcqe6nclck79klm36jpi6y6emzuc8jl5osc9698ep17b528mi4veevo6txf6d2lzuez6dva2d4bxdtv8a5k87iqngj3yc4sesb494d3dm6o20l6o40utqnhqtm91p2r843iw1k21gipa576ac8fqb947ohba7zyogd9ie0aqlcozf8lzq4c9yh1iutdnxov38tymn3igxfre3kr6cqlwl1zc6qj9suyf1hseq3ganmt3n76cm6dqe7p',
                resourceIds: [],
                width: 4859069,
                height: 779771,
                fit: 'HEIGHT',
                sizes: { &quot;foo&quot; : &quot;bar&quot; },
                quality: 548,
                format: 'JPG',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyWidth is too large, has a maximum length of 6');
            });
    });

    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyHeight is too large, has a maximum length of 6`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '539fea5d-91ff-4765-ba30-a3214ccd652b',
                name: 'ez2ouwhepvqzj2o1bo97feq9bk6pkufz33xw45wbeg23qbcvm8rqs1jg04rrl80dcmg2dlio6zocsx40wdxr3hklzuw0xvn03jgwwonwj5c6fdme9da5f7nia9si998xlw77irt2ciibvd24ma8pxjirfs5gx7hh56hi7kb8evvtzarztj4f8m5715fq7dozs43jbzhzbz1cyke2vm2aivkqm9wh83oi0ds8et78wdvfhpw2f0tdxyj8hnxuqu6',
                resourceIds: [],
                width: 922279,
                height: 6678829,
                fit: 'HEIGHT',
                sizes: { &quot;foo&quot; : &quot;bar&quot; },
                quality: 416,
                format: 'TIF',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyHeight is too large, has a maximum length of 6');
            });
    });

    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyQuality is too large, has a maximum length of 3`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '539fea5d-91ff-4765-ba30-a3214ccd652b',
                name: 'cd9kzykygbxm3o2j8a222hejb8mysy0j25rezq0cm2vezesbo35q2zwtpez4wsdqbmh8bau62co9jtpb9l3ws7zux2iyf49r08n0xxiv2v9hpwiukjswq9nkppz4i3i8ydqsy1l4efh9kl74xp0jpl1ddj6r68ztogk2geuo5b0uomiihtn5wpm0ppbngq9e41l25xif3crqovqsqb7awgamjih2nh8ck72hyr2epy9mdjuxej83ebbjj8obt03',
                resourceIds: [],
                width: 188912,
                height: 623242,
                fit: 'CROP',
                sizes: { &quot;foo&quot; : &quot;bar&quot; },
                quality: 6652,
                format: 'TIF',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyQuality is too large, has a maximum length of 3');
            });
    });

    test(`/REST:POST / - Got 400 Conflict, Fit has to be a enum option of CROP, WIDTH, HEIGHT, FREE_WIDTH, FREE_HEIGHT`, () =>
    {
        return request(app.getHttpServer())
            .post('//')
            .set('Accept', 'application/json')
            .send({
                id: '539fea5d-91ff-4765-ba30-a3214ccd652b',
                name: '17q4b8y8qx4r7ngzzxfpsjwnmz5fo0tg3btl43odgfp389ynypp4pi50zwq5osiv61zdsje48yp9hwvprx26z37s6n5cmstv63ye0syk5j6fszon3ht7762c9nd7aqt68xshxzo1mlip867yj5dz9ur8ppkg7762zmxxreupexs5cm7oatqtvzx455z2t27c7el9ohwj07001bp80pc0ytuepo3ltecogv1tzvurt8jdctd0ip649qfu66qpvod',
                resourceIds: [],
                width: 671906,
                height: 619813,
                fit: 'XXXX',
                sizes: { &quot;foo&quot; : &quot;bar&quot; },
                quality: 581,
                format: 'GIF',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for Fit has to be any of this options: CROP, WIDTH, HEIGHT, FREE_WIDTH, FREE_HEIGHT');
            });
    });
    test(`/REST:POST / - Got 400 Conflict, Format has to be a enum option of JPG, PNG, GIF, TIF, BMP, DATA_URL`, () =>
    {
        return request(app.getHttpServer())
            .post('//')
            .set('Accept', 'application/json')
            .send({
                id: '539fea5d-91ff-4765-ba30-a3214ccd652b',
                name: '4i2tx9sqw464odbe04tyjwdb29bgvylthqssv6yqwctl12co20sx3hoq9kl1skzlher5sle2h037rrgmuef2g3z83i3gy59y83hn36pnndnb65z1wzv7v9f98w9rutlobzx5g4zrlg2h915w753kbmcrmdfzuty0hy8amornoiiyyjoaz4l5rixu2u1tev1m9m8ztg49e2hikg1rl969fmqnwbikrzi6sdcvqcflu59aikvuw3tnk0vllhipe6n',
                resourceIds: [],
                width: 413715,
                height: 102106,
                fit: 'FREE_HEIGHT',
                sizes: { &quot;foo&quot; : &quot;bar&quot; },
                quality: 386,
                format: 'XXXX',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for Format has to be any of this options: JPG, PNG, GIF, TIF, BMP, DATA_URL');
            });
    });

    test(`/REST:POST admin/attachment-family`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '539fea5d-91ff-4765-ba30-a3214ccd652b',
                name: 'pxpcjqfcdrkj6t7kfwgta6o1hg0vaeah79urflfsj8bycuhtwzxow7r225a7mlrld7av92pvlo87fe9q66jpr7z3zfm5r8z6xti70hb1nki34tjeya7d5wkh7f259ztefmuewuybyixz0d5ke9spvvcmxn07e4dzjq3al4cucjkes72zc4312nwbnbinwlf2rstv79qnz6ridr8putv8etdhcewpxi198481j8ok1te1ljh6jwruaxftbwshjcq',
                resourceIds: [],
                width: 266904,
                height: 263290,
                fit: 'WIDTH',
                sizes: { &quot;foo&quot; : &quot;bar&quot; },
                quality: 358,
                format: 'TIF',
            })
            .expect(201);
    });

    test(`/REST:GET admin/attachment-families/paginate`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-families/paginate')
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

    test(`/REST:GET admin/attachment-family - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-family')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: '7563cd77-f81a-4543-b408-53ad675dc357'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET admin/attachment-family`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-family')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: '539fea5d-91ff-4765-ba30-a3214ccd652b'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '539fea5d-91ff-4765-ba30-a3214ccd652b'));
    });

    test(`/REST:GET admin/attachment-family/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-family/4d92db56-305c-476e-826b-cdd5abc97089')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET admin/attachment-family/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-family/539fea5d-91ff-4765-ba30-a3214ccd652b')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '539fea5d-91ff-4765-ba30-a3214ccd652b'));
    });

    test(`/REST:GET admin/attachment-families`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-families')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT admin/attachment-family - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .put('/admin/attachment-family')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '06975687-24ce-4cd8-bb83-b0d5adaa7e1d',
                name: 'ji7i6temot3pe8sbsu51ae77mqjbduk16tm7rpfsomf034mcybut8oc5sn4qjutlugguvvc5y9dcnv8qvb5970mzfk9t8pxjl7fyltpyndpnpkl3l2e0so69meu7808kblk00zu3d8lg5qap441gaxc2mxgm2dg28bfkg17descj0r8z25owtlcc3z2uwl54ipbqwuqh02qf9gw3hgv8ltsgx8i4gau1kf22k858ke91oimx9pcm8byqbi39e10',
                resourceIds: [],
                width: 783775,
                height: 464674,
                fit: 'WIDTH',
                sizes: { &quot;foo&quot; : &quot;bar&quot; },
                quality: 901,
                format: 'GIF',
            })
            .expect(404);
    });

    test(`/REST:PUT admin/attachment-family`, () =>
    {
        return request(app.getHttpServer())
            .put('/admin/attachment-family')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '539fea5d-91ff-4765-ba30-a3214ccd652b',
                name: 'rq6adfjexhamhnrdjdknaz1jeuzhitl1l02z3pjcnezsbeehmunvlyh9q3hf10hcoo4i5xggtanof0htn52v9tter6ybdkwz9sv8p0upq8i72uui03doetkh9gkm6lrym8qn8ympxdanpsc99owf48pwx4i02tw63q5pqu4b1sllgqafmrztce1trs71jgt16fqdrs29dmyzc2rrh882fa9l5gykw23tskfy0v6ku93nwocwh6vszlg53tgr8z5',
                resourceIds: [],
                width: 727944,
                height: 424659,
                fit: 'WIDTH',
                sizes: { &quot;foo&quot; : &quot;bar&quot; },
                quality: 781,
                format: 'DATA_URL',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '539fea5d-91ff-4765-ba30-a3214ccd652b'));
    });

    test(`/REST:DELETE admin/attachment-family/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment-family/cddbd32a-cb7b-4dde-8ae0-7af5ee046ac7')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE admin/attachment-family/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment-family/539fea5d-91ff-4765-ba30-a3214ccd652b')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200);
    });

    test(`/GraphQL adminCreateAttachmentFamily - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminCreateAttachmentFamilyInput!)
                    {
                        adminCreateAttachmentFamily (payload:$payload)
                        {
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
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

    test(`/GraphQL adminCreateAttachmentFamily`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminCreateAttachmentFamilyInput!)
                    {
                        adminCreateAttachmentFamily (payload:$payload)
                        {
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '3ffb3db8-4a72-40a5-8cd1-002ece3c051a',
                        name: 'qfukii8dlhe9wh12r9bqinhl4knafdxvxzvcke3ycon5z1ppilq15xaji0dqquzjh3y69niigr243deqejw75b57wt1lx3cr2tqwzomprlj2bsycwdbifrcpu0clayd6nas4bv3y4qj8hxkuvf3ql0zb53pynt8rlgk49lfkqkco9iqr3oia6c4u44bgwnc03jk3j6m5gusk7dqgkkzfuy34ezm7kll7w1noedhnf8zedjcw8udyp729rr85lte',
                        width: 198894,
                        height: 570009,
                        fit: 'FREE_HEIGHT',
                        sizes: { &quot;foo&quot; : &quot;bar&quot; },
                        quality: 756,
                        format: 'TIF',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateAttachmentFamily).toHaveProperty('id', '3ffb3db8-4a72-40a5-8cd1-002ece3c051a');
            });
    });

    test(`/GraphQL adminPaginateAttachmentFamilies`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        adminPaginateAttachmentFamilies (query:$query constraint:$constraint)
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
                expect(res.body.data.adminPaginateAttachmentFamilies.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateAttachmentFamilies.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateAttachmentFamilies.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL adminFindAttachmentFamily - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAttachmentFamily (query:$query)
                        {
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
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
                            id: '68e6a15d-d6f8-427e-a3e0-c286e4623ea7'
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

    test(`/GraphQL adminFindAttachmentFamily`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAttachmentFamily (query:$query)
                        {
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
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
                            id: '539fea5d-91ff-4765-ba30-a3214ccd652b'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachmentFamily.id).toStrictEqual('539fea5d-91ff-4765-ba30-a3214ccd652b');
            });
    });

    test(`/GraphQL adminFindAttachmentFamilyById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        adminFindAttachmentFamilyById (id:$id)
                        {
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '5e28c1f2-5cf3-49bb-9fd7-3eb3a57fe539'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminFindAttachmentFamilyById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        adminFindAttachmentFamilyById (id:$id)
                        {
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '539fea5d-91ff-4765-ba30-a3214ccd652b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachmentFamilyById.id).toStrictEqual('539fea5d-91ff-4765-ba30-a3214ccd652b');
            });
    });

    test(`/GraphQL adminGetAttachmentFamilies`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        adminGetAttachmentFamilies (query:$query)
                        {
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.adminGetAttachmentFamilies.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL adminUpdateAttachmentFamily - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminUpdateAttachmentFamilyInput!)
                    {
                        adminUpdateAttachmentFamily (payload:$payload)
                        {
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '07114492-105a-43c1-ac14-4b65adb29847',
                        name: '8dkthifdsw57gufip4vs3hw60llvegfxh98datxuysbo3tiokep58azd5n5hy1bzyaykz7olqd9kuwiksnjynm2l2urcft2af8afmdbmch10tehxclzty7lmng260tff17ikkdevgnvrc8th95exyxkle42lmc01inyq87zghkhg4nhml28ri64r1xew4apwnjn7h5w93ovl8hjld1o96jmbbf54zfymt5r78r2xml5xgj951zi7g2ii7av263l',
                        resourceIds: [],
                        width: 471320,
                        height: 259436,
                        fit: 'HEIGHT',
                        sizes: { &quot;foo&quot; : &quot;bar&quot; },
                        quality: 187,
                        format: 'TIF',
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

    test(`/GraphQL adminUpdateAttachmentFamily`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminUpdateAttachmentFamilyInput!)
                    {
                        adminUpdateAttachmentFamily (payload:$payload)
                        {
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '539fea5d-91ff-4765-ba30-a3214ccd652b',
                        name: 'tw5w3fqrdeuoahksft1h89xc78fvr70ygqtq11agxar9a9xogq72eeyidzra6p2gxiy3kausy8ixzjrpy51uxajlia4yjk0hfcjnt0yxyk7xewvkh51s2buvjvupp55np88fcprv2xjqa1h5hm6f6yr82tqddiosatts7hykftw3l0xllhbi3nh86onwfr9mji54xs2pefiuyc4lwf5rnsnj5vzhoh2otpc6tma9gdvxlerk2j5v0b8sl2udekx',
                        resourceIds: [],
                        width: 708478,
                        height: 191572,
                        fit: 'FREE_WIDTH',
                        sizes: { &quot;foo&quot; : &quot;bar&quot; },
                        quality: 698,
                        format: 'JPG',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateAttachmentFamily.id).toStrictEqual('539fea5d-91ff-4765-ba30-a3214ccd652b');
            });
    });

    test(`/GraphQL adminDeleteAttachmentFamilyById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAttachmentFamilyById (id:$id)
                        {
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '20f9ab8b-3fdb-41fd-a5b0-3ead4a06eada'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminDeleteAttachmentFamilyById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAttachmentFamilyById (id:$id)
                        {
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '539fea5d-91ff-4765-ba30-a3214ccd652b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteAttachmentFamilyById.id).toStrictEqual('539fea5d-91ff-4765-ba30-a3214ccd652b');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});