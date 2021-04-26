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
                name: 'brv1uwvynncdeiufy000z9gta5pr0eq443zbk1m2a008vad9udtj9mlaxdkdau3hdrmd23blfgmztf7eh5w7v7699xd6syo84r7oihil678vxyo9xeozya3fgiukd3vfq2o9hxyfnwyv6mdw5leul85aksygrj6td7jaw290olvc203hvv3treq9z10lyc39z8nh74zr7xl5rjigilttlw274wwsg3c5u58lsim4v7d9l661wwbgdzeqzo8hcik',
                resourceIds: [],
                width: 220429,
                height: 726425,
                fit: 'WIDTH',
                sizes: { "foo" : "bar" },
                quality: 416,
                format: 'PNG',
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
                id: '303c0f40-4411-4a94-a50f-8d75604dd6ed',
                name: null,
                resourceIds: [],
                width: 578529,
                height: 956517,
                fit: 'WIDTH',
                sizes: { "foo" : "bar" },
                quality: 555,
                format: 'JPG',
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
                name: 'hl57fp15af48nh3g31y5pnvvmrpjeahkoeju5f738eoqn9siq47gpi15j1g40gweodjo3o3vxzpcf30c42uqrgu1tt0fp1zd8ln7x7j5ue528d8sfwjscb8ly3uyux2881hu8vak2pyt8jer0q5smgjt3i4djozz6mp4hc9yao5ai6z2570lx2ivdlvnrqse5a5xkmsmp0wh5zbfz2h3311y7pd23emp5phxg3mdshdac9jomeu3alq1qj9yb7p',
                resourceIds: [],
                width: 481512,
                height: 701378,
                fit: 'WIDTH',
                sizes: { "foo" : "bar" },
                quality: 298,
                format: 'BMP',
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
                id: '303c0f40-4411-4a94-a50f-8d75604dd6ed',
                resourceIds: [],
                width: 283589,
                height: 594564,
                fit: 'FREE_HEIGHT',
                sizes: { "foo" : "bar" },
                quality: 844,
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
                id: 'o6nx38glnw5d5dw7hmttm1ggifs461yja169j',
                name: '57igvnbnbdlfptlp0ytkqlmqdhmeaceaqccathu4c7npblzgqf5optcjz3r7cvnm9pr8ooatxo4nxziqzfthxhwbnwvm8n5cfivo5nj4sm5nd5d8jnuvise3vjpvemm6pdjeviyi1n0pob853385c6hngxr8sxg7rhu8v66nbhaoohalav27wdutn9uqcgjgtylupalvptnfoghjckb0y9n7qcidi8xfo3rkwg1y7kgirz5zmrxjjl40f4edyhh',
                resourceIds: [],
                width: 507948,
                height: 139067,
                fit: 'HEIGHT',
                sizes: { "foo" : "bar" },
                quality: 775,
                format: 'JPG',
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
                id: '303c0f40-4411-4a94-a50f-8d75604dd6ed',
                name: 'sokj1f58wv180qzmwpapej7u74er0kuk3vwbmf3h04q0vvrx06m9xlscrsl8q0z34ff81hbdcrenhs6kjhkki8jkgtc6kv4yz07s19jbwdf3x46dlmd4yp5gb60jbtkbft93u892yppbxc6bgwn6kc2uhhdk9gbyi2880uzxk2xa03ecsdvqkk0mxgr69srxy1ifcanaxm0yz6hs1i6zdqj0czeckw25304saqkiy0dbz2m75uek2vpblh7o3gfr',
                resourceIds: [],
                width: 779026,
                height: 919498,
                fit: 'FREE_WIDTH',
                sizes: { "foo" : "bar" },
                quality: 871,
                format: 'GIF',
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
                id: '303c0f40-4411-4a94-a50f-8d75604dd6ed',
                name: 'rqqm22ehsc9kecsrocco6wu5hiznfhcs0mzu8oy770zxfndfxtic8iojplb43ddeuwa40xkwi73j180tu9mpp9hatbsy61i2ke7frlbaaaw61zctifgds0rwjf2zte51wyke6uw6jc2p5w6peowetabkng9enemwegrd9e0obe0dm01ko56anv9hw7k8q45fhir0lsakzk8joqlswjemyr5515u2dclg0nfxh3n0b1bejhqvhst2l6j4u2ytt19',
                resourceIds: [],
                width: 2108543,
                height: 671478,
                fit: 'CROP',
                sizes: { "foo" : "bar" },
                quality: 687,
                format: 'TIF',
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
                id: '303c0f40-4411-4a94-a50f-8d75604dd6ed',
                name: 'ryu52cixnym55lyknpdjsns0lr0lf1ut60p4kdmu1muynjwiknsdzy8aqbuzo9219xdl1nhcy3biowtn1mxvpqrd4yrpnshy3ghbhfulla3jp1cvd3wxjqtfgb5okwrp699gt1ikl8xc0zk79r8kh0g0xs3mp9ybb5cpwftdruj8ao88b26pvozfm0ce9rjmbe8rdfbdhnmblour35van9o6161kwfje7rtkmibz5mthxw7l7gl1gt1lfoe998i',
                resourceIds: [],
                width: 217515,
                height: 1226310,
                fit: 'HEIGHT',
                sizes: { "foo" : "bar" },
                quality: 459,
                format: 'GIF',
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
                id: '303c0f40-4411-4a94-a50f-8d75604dd6ed',
                name: 'dkeri2j2bhv7tky1ggculx1hw1h8knsibpouwuzuitrnv0iqu8kl0leddpdin7acr689na2e5bjqvvgbkjpp2iedvm0la7vzomx4tnc4866tw15ppg4n3c7m2yeue29upiejztu9obw5h728tmzqqynjxo6hw5uvofkklca70l3f2xyn49blexf3c203y5zjnvi6oiljzchtho7mrk96sw92gls0b2j414lrce5s0zh80t0tfwabowewvpq9mvt',
                resourceIds: [],
                width: 685794,
                height: 456689,
                fit: 'CROP',
                sizes: { "foo" : "bar" },
                quality: 7327,
                format: 'PNG',
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
                id: '303c0f40-4411-4a94-a50f-8d75604dd6ed',
                name: 'v2te36890fvtur5jd4b5t25tqmgm1b7qbk85hd5nl8t8tjqzztb9ngki0pglmgwlpkhxwgkjzfet2b2bikj6ygz4nlq19iy1u9p8a527eu8hg8zriywv3w732i8c7yrgty2buv6atfbly9fdqr9gi2j02xrbz1wy2679sphqn8990z9cyd8rsccmy0hzqvyzda87htc7tdfrllzy5tny4ozxi16yswe5f1i9ov7fya8dc496fw8e4osnbuowm3b',
                resourceIds: [],
                width: 898743,
                height: 863768,
                fit: 'XXXX',
                sizes: { "foo" : "bar" },
                quality: 410,
                format: 'BMP',
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
                id: '303c0f40-4411-4a94-a50f-8d75604dd6ed',
                name: '241to455f583ko1cqjlasvsa4qcmncoth4s5w8wp4vchzro9dh9kwjh7oh27t24cmnl7owspzk46graqhwky6543jgbk601kd106zunmou42y7hrnv9jiva66iuc8fhx56g9bzccsmcbv8f2i6p7v8q01jr6vfwsz5aglrteh3uxm06rlvxb8kij2wz7jxawhs72rtp3c6anp0qfwrl5hy6uqebryulv6wcngnle45j4jw9g9isgtflcz644a20',
                resourceIds: [],
                width: 339127,
                height: 233784,
                fit: 'WIDTH',
                sizes: { "foo" : "bar" },
                quality: 950,
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
                id: '303c0f40-4411-4a94-a50f-8d75604dd6ed',
                name: 'hdk6cestl61shjhprzc6hoba5gtzwy0fgh8j3ttt5930zw1fkpfnwtxk4mhuhb1f0df9704j6l8bs26extvnee1mpokczi1u19xf7o5aop7kdkhu1jivhpuy18a80jmpr0we5p7q3wguznp89djqiqkj9yvgibj8tzjk7atuj7icvfnafojkf12ob2vo420f8qve2lfbme5fznkirtoenhq40fl3mpm8ssfl9dmfr38go4kxnuz7380vjeympw0',
                resourceIds: [],
                width: 475048,
                height: 460167,
                fit: 'FREE_WIDTH',
                sizes: { "foo" : "bar" },
                quality: 482,
                format: 'JPG',
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
                        id: '077b2711-7a3c-40d8-85a2-c97180f9b0c3'
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
                        id: '303c0f40-4411-4a94-a50f-8d75604dd6ed'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '303c0f40-4411-4a94-a50f-8d75604dd6ed'));
    });

    test(`/REST:GET admin/attachment-family/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-family/77ac2dc5-2cb1-424d-8643-63593c6b9427')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET admin/attachment-family/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-family/303c0f40-4411-4a94-a50f-8d75604dd6ed')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '303c0f40-4411-4a94-a50f-8d75604dd6ed'));
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
                id: 'e813a9bd-37e3-4bb2-b57e-2b7abbd9f7cc',
                name: '5b8t2mx149z5p72sbx9ydiono7wrgxx9uzl3hrexfge30zzjvoxm9nbdc8qit2nmsu8l6mj9xoybqe6b1qk296rsw4bvsgn2swxt2joul3552y1uyg7vmohuv0mi4wvwd5xkzvonwyfller9egor3havas3m9ddjsha177n0ex5e540yc89ns5tzhn1mkjewxuxhigun4eaqp034mpj68roioldinshrqg3wfbc6ufrbkh5811fshtr95nqv4lz',
                resourceIds: [],
                width: 380671,
                height: 544107,
                fit: 'FREE_WIDTH',
                sizes: { "foo" : "bar" },
                quality: 606,
                format: 'DATA_URL',
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
                id: '303c0f40-4411-4a94-a50f-8d75604dd6ed',
                name: 'cw4ewvypsnbr5467e7633o19spt0i1qftwm6m2949x0qz2onxa1tf1xd19gqkjesylr45xpst7bsnmkrd6nh9pq8ggkzbx724wysql6vdwxrdvihfv8hi34hc9vytzquxeqvazmozzh70xaqmo7l5nowu32i84y2uwvmxu1k3twg9cn9bswrmdvyi81sfy2ejtbpf4dlbungg8tx6z9yfbep2c1hy4gu09tyle6wlzxb23g6awc3fijcnc7rqdu',
                resourceIds: [],
                width: 556781,
                height: 248210,
                fit: 'CROP',
                sizes: { "foo" : "bar" },
                quality: 973,
                format: 'PNG',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '303c0f40-4411-4a94-a50f-8d75604dd6ed'));
    });

    test(`/REST:DELETE admin/attachment-family/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment-family/f14cdb0b-6ce6-4cc5-b623-3a7728c7aec7')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE admin/attachment-family/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment-family/303c0f40-4411-4a94-a50f-8d75604dd6ed')
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
                        id: 'd5f482c7-89bd-4cb6-a796-91eababe12a4',
                        name: '660yewng6mszyykr5i6ewutifd3u08rmb8qahj5qut6k41yrkqleh07mat8nhgf5bc00ogt3erv2u6vfurbrqabuv2f4n23g2xpmiy6z8xulox6e6irrvaqnrie6py70fjcgzmkf61hk7xjbrhk7is73b4jfttwok9993ro3bphk9m5qxhq1ek0g9kjtju8q4y8lpqxjo9qb62xmiib4wlswodn8ecaf8z7oz7sgpko1h5lt69100setnr5etfq',
                        width: 682486,
                        height: 198569,
                        fit: 'CROP',
                        sizes: { "foo" : "bar" },
                        quality: 641,
                        format: 'DATA_URL',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateAttachmentFamily).toHaveProperty('id', 'd5f482c7-89bd-4cb6-a796-91eababe12a4');
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
                            id: '682f56b2-ecef-4b67-927b-3e33df39183c'
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
                            id: '303c0f40-4411-4a94-a50f-8d75604dd6ed'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachmentFamily.id).toStrictEqual('303c0f40-4411-4a94-a50f-8d75604dd6ed');
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
                    id: '087e5ddf-3824-4848-a462-28fc7303ee99'
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
                    id: '303c0f40-4411-4a94-a50f-8d75604dd6ed'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachmentFamilyById.id).toStrictEqual('303c0f40-4411-4a94-a50f-8d75604dd6ed');
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
                        id: '25eb2781-cfe9-4bcc-b767-853ee821bcd6',
                        name: '9g3vk5dicruivi0nmwn45kes9n9lk84dv9v6ti427x9o5umhir3cq7t3gcgav1jrsacdid54n2hs0uqv7yv5rwm7818lcc6th2rkaot6741b9ahbut7rz2cfbpto2oxar8ztp2vs04yqgzdvskuh0dyl7bhwhjgpxh59j48mkfa1yzs8twsc9y6kwmxcx3rzzpzw8axou2mddu6n4uj1skmxqq2382696e4vkzjwuzztz3tgzqskwe9gy2wlv3o',
                        resourceIds: [],
                        width: 165076,
                        height: 991491,
                        fit: 'FREE_HEIGHT',
                        sizes: { "foo" : "bar" },
                        quality: 490,
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
                        id: '303c0f40-4411-4a94-a50f-8d75604dd6ed',
                        name: 'a8bd6bkknw58f6chm8apy2ttjepd7n33sl6kbrqdowjv7pnmtuni2mp5eumlretd5j9novszq5qkapmrk1pyxddyh3f3sqrga4nndy4y8m2gxwnvdc328iau7xvlcoecva8pfsihwbon3puwywdo0hbkg0bu4znipywkwai69pa3z2c5enp7rirkvuy9rycknm5hjesqo6togh8a8e7o8abfx06wbnmtuc56uyj9zxpxkr119mqrcissfm35wzc',
                        resourceIds: [],
                        width: 209148,
                        height: 486860,
                        fit: 'WIDTH',
                        sizes: { "foo" : "bar" },
                        quality: 867,
                        format: 'TIF',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateAttachmentFamily.id).toStrictEqual('303c0f40-4411-4a94-a50f-8d75604dd6ed');
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
                    id: '28bf83f0-4131-414a-89a8-be3713b6b523'
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
                    id: '303c0f40-4411-4a94-a50f-8d75604dd6ed'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteAttachmentFamilyById.id).toStrictEqual('303c0f40-4411-4a94-a50f-8d75604dd6ed');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});