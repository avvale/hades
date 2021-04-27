import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAttachmentLibraryRepository } from '@hades/admin/attachment-library/domain/attachment-library.repository';
import { MockAttachmentLibraryRepository } from '@hades/admin/attachment-library/infrastructure/mock/mock-attachment-library.repository';
import { AuthorizationGuard } from '../../../src/apps/shared/modules/auth/guards/authorization.guard';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import * as request from 'supertest';
import * as _ from 'lodash';

// has OAuth
import { JwtModule } from '@nestjs/jwt';
import { IAccountRepository } from '@hades/iam/account/domain/account.repository';
import { MockAccountRepository } from '@hades/iam/account/infrastructure/mock/mock-account.repository';
import { IamModule } from './../../../src/apps/iam/iam.module';
import { TestingJwtService } from './../../../src/apps/o-auth/credential/services/testing-jwt.service';
import * as fs from 'fs';

const importForeignModules = [
    IamModule
];

describe('attachment-library', () =>
{
    let app: INestApplication;
    let repository: MockAttachmentLibraryRepository;
    let testJwt: string;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    AdminModule,
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
            .overrideProvider(IAttachmentLibraryRepository)
            .useClass(MockAttachmentLibraryRepository)
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        app         = module.createNestApplication();
        repository  = <MockAttachmentLibraryRepository>module.get<IAttachmentLibraryRepository>(IAttachmentLibraryRepository);
        testJwt     =  module.get(TestingJwtService).getJwt();

        await app.init();
    });

    test(`/REST:POST admin/attachment-library - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: null,
                name: '6',
                pathname: 'o',
                filename: '3',
                url: 'i',
                mime: 'o',
                extension: 'v',
                size: 6,
                width: 3,
                height: 5,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryPathname property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7afff5cc-2aea-42d8-bcb9-c1fbe1967dde',
                name: 'c',
                pathname: null,
                filename: 'i',
                url: '8',
                mime: 's',
                extension: 'i',
                size: 1,
                width: 2,
                height: 9,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryPathname must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryFilename property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7afff5cc-2aea-42d8-bcb9-c1fbe1967dde',
                name: '0',
                pathname: '3',
                filename: null,
                url: 'k',
                mime: '1',
                extension: 'k',
                size: 6,
                width: 5,
                height: 4,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryFilename must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryUrl property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7afff5cc-2aea-42d8-bcb9-c1fbe1967dde',
                name: 'h',
                pathname: '9',
                filename: '6',
                url: null,
                mime: 's',
                extension: 'q',
                size: 7,
                width: 6,
                height: 4,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryUrl must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryMime property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7afff5cc-2aea-42d8-bcb9-c1fbe1967dde',
                name: 'b',
                pathname: 'k',
                filename: 'g',
                url: 'z',
                mime: null,
                extension: 'e',
                size: 9,
                width: 4,
                height: 3,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryMime must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibrarySize property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7afff5cc-2aea-42d8-bcb9-c1fbe1967dde',
                name: 'g',
                pathname: 'l',
                filename: 'm',
                url: 'n',
                mime: 'g',
                extension: 'j',
                size: null,
                width: 7,
                height: 7,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibrarySize must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                name: 'w',
                pathname: 'y',
                filename: '7',
                url: 'm',
                mime: '1',
                extension: '4',
                size: 8,
                width: 6,
                height: 6,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryPathname property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7afff5cc-2aea-42d8-bcb9-c1fbe1967dde',
                name: '7',
                filename: 'm',
                url: 'n',
                mime: '2',
                extension: 'o',
                size: 9,
                width: 3,
                height: 1,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryPathname must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryFilename property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7afff5cc-2aea-42d8-bcb9-c1fbe1967dde',
                name: 'j',
                pathname: 'h',
                url: 'j',
                mime: '5',
                extension: 'r',
                size: 9,
                width: 4,
                height: 6,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryFilename must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryUrl property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7afff5cc-2aea-42d8-bcb9-c1fbe1967dde',
                name: 's',
                pathname: '4',
                filename: '1',
                mime: '4',
                extension: 'p',
                size: 6,
                width: 4,
                height: 9,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryUrl must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryMime property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7afff5cc-2aea-42d8-bcb9-c1fbe1967dde',
                name: 'y',
                pathname: 'y',
                filename: 'f',
                url: 'a',
                extension: '7',
                size: 7,
                width: 4,
                height: 2,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryMime must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibrarySize property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7afff5cc-2aea-42d8-bcb9-c1fbe1967dde',
                name: 't',
                pathname: 'r',
                filename: 'h',
                url: 'f',
                mime: 'p',
                extension: '9',
                width: 3,
                height: 3,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibrarySize must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'iv75hb6xvhnbvfq51cemsk2s12d5jg6k0p211',
                name: 'o',
                pathname: 'z',
                filename: '2',
                url: '1',
                mime: '7',
                extension: 'k',
                size: 2,
                width: 8,
                height: 4,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryName is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7afff5cc-2aea-42d8-bcb9-c1fbe1967dde',
                name: 'h8dyzpj3mmo3umyakstrgmmhffqdoi8mbf5fy0xjbok0us1535pz6b5vfh52u85h7kegd7gns44kkievie0xzf5mdv45ioic1iaj1bb6erxrdwm3u8vno6fnsdnofr0snhwkoezx9xcp46efvg7vykles1axjmcbhso805oi7eg5wn97wkwlov95t5alvq431cj7gx75gotqso7lbpty2cmj6mgthi43vgxppoi8lzi6s6a2ltt97g2nfv64im9d',
                pathname: '0',
                filename: 'g',
                url: 'm',
                mime: '3',
                extension: 'p',
                size: 9,
                width: 9,
                height: 5,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryName is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryPathname is too large, has a maximum length of 1024`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7afff5cc-2aea-42d8-bcb9-c1fbe1967dde',
                name: '3',
                pathname: 'r0f7ff0g3oywybhyoqtgnu7xm7vc5mfu91z3ufp1hqj7xzf1haovuqgmzp4m8gotwx87feuci4h5zyb5r3xxox0oshg8wwx8a0l172pdx6vx3j0hdp7o33rkyr2thlxm3b9z1mb5vdhr21dvqbuapdd94kcl4pi6d59lto4zxrhp4agj98uepbyhpjrjny2oagwll5tdx4f6qb4cyzkdav75w2huomfy5h0tsa1c0nzj19v86tt8s6vfynzz3qimyryk63q8o2utfojraarqg2iqtz4rffomyvhkesucx0aqxjs9iyki77i3e4opri2jpa7wfeav5bciuzdln5kqv91d4kmx5xhx0st83awl0ylzaujxufl076ifpd7ngsr6ldkgmsddtxpp301t6eunkwawr9q47h91ggsjedjq3rx79g7ezqd1sdzrfzpf1l9ubnh7xfivyrmgexv5qf27ldvy5vd64movtfar464980278j231p612h9aysjigujuegj9czxrit16gg77azqv3hcqo7z5hcj4n0wdfve3bqritqy5dtuwvi76ga443edhoys3qvakglim80iskme71utzqe8r9itvp5t5smbx0wi4gv5xd7v7eyse3774bjtb1lwwo6biuqicem3p399esolgsboyat4ck8ngsnoww8oxq76izwilxtqyea2uujjtyevj6hx03x5a08ekkfeyu8zjtgw0klvkoal4zwsiaxcjvm1ej1hv98zg3anw7kojmsjg92l1kfrgg9bxovvcp1f5gpsrtdhi7kb93qij6yidfvv479temq30vktrzq9kiucaoszt7pkbq8gf6694825x44wp24buivd71ngbhlaie6thi22t8917x8awqmephpc8pamp7ncc1cocjkzjhcpeptgya9x20vcjm8szbz9hzx6ewws8kw3wp1c0w28w8is1790qf561sfp9o1zxdm0fmd0721ehkkm400usmzuhwzgpv04wxxdu2jp0z5l3o',
                filename: 'i',
                url: 'i',
                mime: '0',
                extension: 'b',
                size: 4,
                width: 7,
                height: 5,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryPathname is too large, has a maximum length of 1024');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryFilename is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7afff5cc-2aea-42d8-bcb9-c1fbe1967dde',
                name: 'j',
                pathname: 'z',
                filename: 'lloqwzwd59wadwr9gqb1o7k56j342lc7wv2kcm4ce0dfb85oyhnh5egy8rg5detbp7beovr9nvdph5awz9w9zsekj8hgpaduhwyq41pfhpm5u8bhpwlu7iu1maaeznpocr3enk29vrytz5codudjo5dqkfkrsqdwqnhbr96zfjz4k8iht5lbwlt94i6mco26t8bmf8crjrzhq3vsbnfozx2fizaawvwtmy8ardo9lve5efq0c04l87w9sij7oufx',
                url: 'y',
                mime: 'y',
                extension: 'y',
                size: 1,
                width: 7,
                height: 5,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryFilename is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryUrl is too large, has a maximum length of 1024`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7afff5cc-2aea-42d8-bcb9-c1fbe1967dde',
                name: 'n',
                pathname: '2',
                filename: '3',
                url: 'kl5b0433v7ajy0oo4px5a4ltqbhy9yyrh08f3iiqzvt59cut0t29kcsr5tf5e3dan3fg1e9czfk8dy7vmnx5clxmmvq7q6qjl4cfymj1eihhzhw3wnzhmblktsbaepb02q8hwr26u2pqod29jjs8v0eboltweepx49ei2j2hw3g0az10wxqv44qhb2hvna743a2dhabcdzojjmse0i4nyzmm0q49x8voc1yc176vvhzza6oqhert707ytklew03x4xwfcl3u0xj57xf80e6p0l2hao88zmhm58ookuklgqramyyqhu118uzitueldsyk37tnogzrjhf6n2t5bmfey0oc3j7zk0z91gxr5ev2b75ek8t781dz4fxjky4o8n6c7t8jlecfogzd92vtwkdkbr8aouzag9pxf4hrednmr9mk7t5dy0pgcxx4ke80wjmcp21ulfks3i7kuent7ojpzexmxrtev0pwheu8y8gj2m3s4frpkawmiv9wemxp38qt779t4rkhd3bwpwv5694nwng1y6aobrex3dt0tw4iga3mpi72sjdnvwy5yg05dczpyrc1sp6svymjckztvfkwefd4g5i6fwegw8tvd5j22cl2jvq9rz8rmyk95dzxejazl3x32lxmx5y9i6nuub0llhkwsvsfdr6ve03ljakse8xd0mn9p0a9gpxon7uhs8sc71gq3oxts9mon7hco2x6sl9c5q2tf2vzy2axkx5a4pe7sgej6f00sfw8o2w84lnmowtvr3juupruowzuytnzyowrkmqqgbbvksbqtcq5zstt6s7j0su16r1uynkvi29mjrdvb7km55zbv4d9eommd8vjhtfa9od43e9aqraqpqq16dhfitozkp3rbrv7ttebdi0prrcmi6u66y7vwanulynbexmq8egmi5wplkdfzkxb243l2amc0btw0crubvwt3kn59xqrleqxk4uovncy7nctdtkl4ee7bbbvzjwx93eii0irwyen6xbk6gptgni8w',
                mime: 'f',
                extension: 't',
                size: 8,
                width: 5,
                height: 7,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryUrl is too large, has a maximum length of 1024');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryMime is too large, has a maximum length of 50`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7afff5cc-2aea-42d8-bcb9-c1fbe1967dde',
                name: 'v',
                pathname: 'h',
                filename: 'i',
                url: 's',
                mime: '1zyhb89l9leljm10ez7r83nhmeaq70rtvu06yg7rvui9zy1lqp8',
                extension: 'l',
                size: 8,
                width: 6,
                height: 3,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryMime is too large, has a maximum length of 50');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryExtension is too large, has a maximum length of 50`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7afff5cc-2aea-42d8-bcb9-c1fbe1967dde',
                name: 'c',
                pathname: 'o',
                filename: '1',
                url: 't',
                mime: 'o',
                extension: '0agmgsh84w7ki6tmdqrm9olaq4j9jl2t3yzaujpsq5ql3ajtm6r',
                size: 2,
                width: 2,
                height: 7,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryExtension is too large, has a maximum length of 50');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibrarySize is too large, has a maximum length of 10`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7afff5cc-2aea-42d8-bcb9-c1fbe1967dde',
                name: '0',
                pathname: 'b',
                filename: 'n',
                url: 'a',
                mime: 'c',
                extension: 'j',
                size: 70493407098,
                width: 9,
                height: 9,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibrarySize is too large, has a maximum length of 10');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryWidth is too large, has a maximum length of 6`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7afff5cc-2aea-42d8-bcb9-c1fbe1967dde',
                name: 'q',
                pathname: 'd',
                filename: 'e',
                url: 'n',
                mime: 'k',
                extension: 'd',
                size: 8,
                width: 7061521,
                height: 9,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryWidth is too large, has a maximum length of 6');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryHeight is too large, has a maximum length of 6`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7afff5cc-2aea-42d8-bcb9-c1fbe1967dde',
                name: '5',
                pathname: 'd',
                filename: 'i',
                url: 'x',
                mime: '0',
                extension: 'f',
                size: 5,
                width: 4,
                height: 4303666,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryHeight is too large, has a maximum length of 6');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibrarySize must have a positive sign`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7afff5cc-2aea-42d8-bcb9-c1fbe1967dde',
                name: 'a',
                pathname: '0',
                filename: 'x',
                url: 'n',
                mime: '8',
                extension: 'p',
                size: -9,
                width: 7,
                height: 6,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for AttachmentLibrarySize must have a positive sign, this field does not accept negative values');
            });
    });

    test(`/REST:POST admin/attachment-library`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7afff5cc-2aea-42d8-bcb9-c1fbe1967dde',
                name: 'x',
                pathname: 'd',
                filename: 'v',
                url: 'n',
                mime: 'm',
                extension: 'w',
                size: 9,
                width: 8,
                height: 6,
                data: { "foo" : "bar" },
            })
            .expect(201);
    });

    test(`/REST:GET admin/attachment-libraries/paginate`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-libraries/paginate')
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

    test(`/REST:GET admin/attachment-library - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: 'e3d48d66-dff5-4bfe-a146-20a88e7c2797'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET admin/attachment-library`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: '7afff5cc-2aea-42d8-bcb9-c1fbe1967dde'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '7afff5cc-2aea-42d8-bcb9-c1fbe1967dde'));
    });

    test(`/REST:GET admin/attachment-library/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-library/8c1d40b6-adb9-4681-b0b8-0717ba906006')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET admin/attachment-library/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-library/7afff5cc-2aea-42d8-bcb9-c1fbe1967dde')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '7afff5cc-2aea-42d8-bcb9-c1fbe1967dde'));
    });

    test(`/REST:GET admin/attachment-libraries`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-libraries')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT admin/attachment-library - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .put('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'b566e49b-d1c4-4e5f-9a57-2913c956e8e2',
                name: 's',
                pathname: '8',
                filename: 'j',
                url: 'x',
                mime: '0',
                extension: 'p',
                size: 5,
                width: 3,
                height: 8,
                data: { "foo" : "bar" },
            })
            .expect(404);
    });

    test(`/REST:PUT admin/attachment-library`, () =>
    {
        return request(app.getHttpServer())
            .put('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7afff5cc-2aea-42d8-bcb9-c1fbe1967dde',
                name: 'c',
                pathname: 'q',
                filename: 'j',
                url: 'u',
                mime: 'b',
                extension: 'y',
                size: 2,
                width: 9,
                height: 4,
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '7afff5cc-2aea-42d8-bcb9-c1fbe1967dde'));
    });

    test(`/REST:DELETE admin/attachment-library/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment-library/306f4cdf-51f6-4d63-b233-3a30ca5ca29c')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE admin/attachment-library/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment-library/7afff5cc-2aea-42d8-bcb9-c1fbe1967dde')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200);
    });

    test(`/GraphQL adminCreateAttachmentLibrary - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminCreateAttachmentLibraryInput!)
                    {
                        adminCreateAttachmentLibrary (payload:$payload)
                        {
                            id
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            data
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

    test(`/GraphQL adminCreateAttachmentLibrary`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminCreateAttachmentLibraryInput!)
                    {
                        adminCreateAttachmentLibrary (payload:$payload)
                        {
                            id
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            data
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '5e333b16-11ed-40a1-9382-788c4e8f7f6d',
                        name: '3',
                        pathname: 'e',
                        filename: 'q',
                        url: 'e',
                        mime: 'x',
                        extension: 'v',
                        size: 2,
                        width: 9,
                        height: 8,
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateAttachmentLibrary).toHaveProperty('id', '5e333b16-11ed-40a1-9382-788c4e8f7f6d');
            });
    });

    test(`/GraphQL adminPaginateAttachmentLibraries`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        adminPaginateAttachmentLibraries (query:$query constraint:$constraint)
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
                expect(res.body.data.adminPaginateAttachmentLibraries.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateAttachmentLibraries.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateAttachmentLibraries.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL adminFindAttachmentLibrary - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAttachmentLibrary (query:$query)
                        {
                            id
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            data
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
                            id: 'a6a03d9c-a8d9-4497-b326-767ca6c6d517'
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

    test(`/GraphQL adminFindAttachmentLibrary`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAttachmentLibrary (query:$query)
                        {
                            id
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            data
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
                            id: '7afff5cc-2aea-42d8-bcb9-c1fbe1967dde'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachmentLibrary.id).toStrictEqual('7afff5cc-2aea-42d8-bcb9-c1fbe1967dde');
            });
    });

    test(`/GraphQL adminFindAttachmentLibraryById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        adminFindAttachmentLibraryById (id:$id)
                        {
                            id
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '3f3cbeec-1291-4008-96ad-07a1defe2517'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminFindAttachmentLibraryById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        adminFindAttachmentLibraryById (id:$id)
                        {
                            id
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '7afff5cc-2aea-42d8-bcb9-c1fbe1967dde'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachmentLibraryById.id).toStrictEqual('7afff5cc-2aea-42d8-bcb9-c1fbe1967dde');
            });
    });

    test(`/GraphQL adminGetAttachmentLibraries`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        adminGetAttachmentLibraries (query:$query)
                        {
                            id
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.adminGetAttachmentLibraries.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL adminUpdateAttachmentLibrary - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminUpdateAttachmentLibraryInput!)
                    {
                        adminUpdateAttachmentLibrary (payload:$payload)
                        {
                            id
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'bcc78a98-b376-44cc-9404-26c2ac498ceb',
                        name: 'y',
                        pathname: '5',
                        filename: 'e',
                        url: 'k',
                        mime: '3',
                        extension: '6',
                        size: 1,
                        width: 1,
                        height: 7,
                        data: { "foo" : "bar" },
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

    test(`/GraphQL adminUpdateAttachmentLibrary`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminUpdateAttachmentLibraryInput!)
                    {
                        adminUpdateAttachmentLibrary (payload:$payload)
                        {
                            id
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '7afff5cc-2aea-42d8-bcb9-c1fbe1967dde',
                        name: 'x',
                        pathname: 'l',
                        filename: 'b',
                        url: '3',
                        mime: '3',
                        extension: '0',
                        size: 6,
                        width: 2,
                        height: 5,
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateAttachmentLibrary.id).toStrictEqual('7afff5cc-2aea-42d8-bcb9-c1fbe1967dde');
            });
    });

    test(`/GraphQL adminDeleteAttachmentLibraryById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAttachmentLibraryById (id:$id)
                        {
                            id
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '4d9d4344-e812-435a-b31c-e59c08f74b3d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminDeleteAttachmentLibraryById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAttachmentLibraryById (id:$id)
                        {
                            id
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '7afff5cc-2aea-42d8-bcb9-c1fbe1967dde'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteAttachmentLibraryById.id).toStrictEqual('7afff5cc-2aea-42d8-bcb9-c1fbe1967dde');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});