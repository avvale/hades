import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAttachmentFamilyRepository } from '@hades/admin/attachment-family/domain/attachment-family.repository';
import { MockAttachmentFamilySeeder } from '@hades/admin/attachment-family/infrastructure/mock/mock-attachment-family.seeder';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import * as request from 'supertest';
import * as _ from 'lodash';

// has OAuth
import { JwtModule } from '@nestjs/jwt';
import { IAccountRepository } from '@hades/iam/account/domain/account.repository';
import { MockAccountRepository } from '@hades/iam/account/infrastructure/mock/mock-account.repository';
import { IamModule } from './../../../src/apps/iam/iam.module';
import { AuthorizationGuard } from '../../../src/apps/shared/modules/auth/guards/authorization.guard';
import { TestingJwtService } from './../../../src/apps/o-auth/credential/services/testing-jwt.service';
import * as fs from 'fs';

const importForeignModules = [
    IamModule
];

describe('attachment-family', () =>
{
    let app: INestApplication;
    let repository: IAttachmentFamilyRepository;
    let seeder: MockAttachmentFamilySeeder;
    let testJwt: string;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    AdminModule,
                    IamModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRoot({
                        dialect: 'sqlite',
                        storage: ':memory:',
                        logging: false,
                        autoLoadModels: true,
                        models: [],
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
                    MockAttachmentFamilySeeder,
                    TestingJwtService,
                ]
            })
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        app         = module.createNestApplication();
        repository  = module.get<IAttachmentFamilyRepository>(IAttachmentFamilyRepository);
        seeder      = module.get<MockAttachmentFamilySeeder>(MockAttachmentFamilySeeder);
        testJwt     = module.get(TestingJwtService).getJwt();

        // seed mock data in memory database
        repository.insert(seeder.collectionSource);

        await app.init();
    });

    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: null,
                name: 'rxjhi6pd3u6409ptrzw5t04y3w702bvu8jkdzrexlqdihe7baiq02p5d5b1suqy8n492vrcwq4p4cjfmtp8cffrcm5vwru9jv8h16jbecds1nlgb1j0asdyspshnvrlfq628j3xe7g3k1o55szr6owf2olvnmebk474n5o4hhbyl2zda68ikt7j6o91mz4gd49qecpwxn4a235jl5nam5fhe9rr2fecnsffccr2wjczi840m1n8mb17jvm7wv2j',
                resourceIds: [],
                width: 495207,
                height: 365820,
                fit: 'WIDTH',
                sizes: {"foo":"sY?GC@dGI?","bar":92252,"bike":14307,"a":56397,"b":58154,"name":95619,"prop":"age!%zT-Zw"},
                quality: 519,
                format: 'BMP',
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
                id: '1451789f-882f-471f-aa60-2de2b8e02914',
                name: null,
                resourceIds: [],
                width: 607678,
                height: 236638,
                fit: 'CROP',
                sizes: {"foo":"l{PtdqFhtP","bar":67676,"bike":44680,"a":58717,"b":"e.-t<+h3x!","name":29688,"prop":"X;-*y;iSR_"},
                quality: 645,
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
                name: 'h2rwo6guvaw9o6cjkwu695y5uz60weo9maxka4dwkml5dxxgnodw7upnt5bsmxr4apj9txhbfenijuq1cavrx0zuakposjbn5v6i4k5i46bw0c243xiibf641lgwxa8mxo5f1e4gnet5mi33cr6o0sqqvcnb4c0dew3abz1xb48oa40fwc4z5fqrw80ir2a2wfls6wjud0p473pai91afrz0smjr9eew2e1wbhq16f1028eyoa0eeciqks2q24y',
                resourceIds: [],
                width: 153110,
                height: 779168,
                fit: 'FREE_WIDTH',
                sizes: {"foo":"}L\\pL0m!wn","bar":"\"P;{^nu\\1D","bike":22567,"a":"tG(q;rf-%o","b":"JM%i*Wv{Xa","name":"EO(\\!jX|x#","prop":30453},
                quality: 647,
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
                id: '8ed353f6-2d2a-4083-85d0-8e82c748e32d',
                resourceIds: [],
                width: 669186,
                height: 771901,
                fit: 'FREE_WIDTH',
                sizes: {"foo":"2uFkayW3ae","bar":1829,"bike":"8pu9uf%Wo=","a":5522,"b":78704,"name":70571,"prop":"frtx&{\"}kT"},
                quality: 465,
                format: 'PNG',
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
                id: '8z978nf62slre3ylhnlf8v74iza5vaoraxmnp',
                name: '6q42ff27f66z9y3h6fzptecg1i1np02nir45dzegrvojbg0ymmkxq8ll9htbxlzasrryuipqmo200ntntotkpn1agzavzj92xlo6rcore4kxh4wmmcthp56fc8wqrtn9pvibtsk74i4z9ilw9bnyqn6v25nj4af293hq5s29jepu08fpgno4y5k8e1qptq7vywi4cf5qku4yew352zazi3sgxfbofd4x48p3ek1rdd7603975xz7euay5wpuloe',
                resourceIds: [],
                width: 976428,
                height: 449608,
                fit: 'FREE_HEIGHT',
                sizes: {"foo":"sB3ah8dffI","bar":83164,"bike":53891,"a":85222,"b":"uO}5{sMDb1","name":"o[CWuoj|X/","prop":47521},
                quality: 960,
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
                id: 'f65d2c40-bff7-4a97-8a8c-6072935e95ea',
                name: 'w3d7aqbwu9y6g1x7ez6ezw1lj1wf0fkqr5hfv3ah7472vjb3vu935ahp3aa19obmfhigklt806adxmbiewu5xg6ds1rf5hcvoii30gszwl3bhca5s7kp1rrn6dfqziqwfbdev7vwapj58iodllqfugxfxzx0ckwi7s8z1p37lit9iiuomkyvk1666tank71wcv7s01ty5gfdoe2iqi1rcw3dmusy0amb6pci8gs2oaldxz4nf9vbzofyp97akhdk',
                resourceIds: [],
                width: 532794,
                height: 478561,
                fit: 'FREE_HEIGHT',
                sizes: {"foo":"8JH?\"K3oJk","bar":"n@R8k0IW]k","bike":"Sj(!<J}Ozn","a":71716,"b":25544,"name":"IFn:v)^;7,","prop":44175},
                quality: 745,
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
                id: '9dd69835-5a3f-43e7-aa03-4159e7babd04',
                name: 'lsvqt193emzmcnxdklufvtvybc34mzm96syfye7s5m0cmf4ovnqcj8ehra8ln2imymuhtepf9dai0a0h64092kjby5qqj7g2io7bfbpor5mzzeaj3bcwpfsqb5v1qaln4x07f6p6j2a460sprx3btzr9arx0we47gjmrsipg5seiq0hv5kb5p737395xphr9rmqc8e7bq55u66arkh12gqjnyfqouc1vjety0e8n8tn5nxaxzdk4cld48mnfttn',
                resourceIds: [],
                width: 4196291,
                height: 930319,
                fit: 'FREE_WIDTH',
                sizes: {"foo":75044,"bar":98395,"bike":"Wp^Nl;K6n=","a":"0rb,5x8`f@","b":"ayo}^+&7=(","name":"uTth(^B%UV","prop":5811},
                quality: 571,
                format: 'BMP',
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
                id: 'ef63fad7-4d73-4fb6-a28b-837b2439709a',
                name: 'ine89d1dsr43vx6cxshknr5w3wvqn4hl6zazjikl26v3v6cc57ys5e1md1uvcdfrrsagetec67la5s3pz9z6zwl552a2gk9o65sw0zhim0ndscozbxxeoa0hhbypitynqfro8f8v5puugaj4ait151mqmopvnbmmxvkqteatvw5e3tr669ecpxjnv7iawemo0ytqwizidf2dom497cfz1g5k282uobey17pgj4p8frm7cl0n9kjg74vawe1974n',
                resourceIds: [],
                width: 157615,
                height: 8587736,
                fit: 'CROP',
                sizes: {"foo":71924,"bar":43609,"bike":"hDU295WAI}","a":"HU7^f;4S*#","b":32369,"name":"j%y_l:)/dX","prop":11474},
                quality: 918,
                format: 'BMP',
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
                id: '055c64d5-28a7-4b61-b747-56eafb78370a',
                name: 'vjx8b1ameq3xhta8g3u7rdez7c137p59rjpnecf0kj6rqqbbpipdh8glch776j40xjezxfrdj5xq9npfinraruehnoo1pat02ghlpluocz72rw1w42iw7572pxtz3ki8c66czj952jmyu7r9gtpd27rke3rqw7p24rfzjqcjrljwtoi67jw80jw1r4gtm4krt3qmyqq84ydvn0ptvhirpxc2m55z5m3kbtgrbnmjnxgwcey8mqin6w5znjv067g',
                resourceIds: [],
                width: 806400,
                height: 980549,
                fit: 'FREE_HEIGHT',
                sizes: {"foo":15206,"bar":"u^qPiH,@YA","bike":83006,"a":"]|v6e:E*eK","b":71547,"name":18753,"prop":71547},
                quality: 1499,
                format: 'BMP',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyQuality is too large, has a maximum length of 3');
            });
    });

    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyFit has to be a enum option of CROP, WIDTH, HEIGHT, FREE_WIDTH, FREE_HEIGHT`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'c4bba735-9dca-4700-a4bb-b01e6593ff41',
                name: 'o66r4mzph99ked13eb3btj2asxz0c1zymms9jxerq7p96tjo8brzoip9iaoehasudosbz4pucerqgsuxu6gorbe7s9invwd3qqh7b7zicmn3ooq501eokkdplcwcfdbga6voe60ftkjnzwb3k6zcx5oimefafungv0gvm9ztifz1e8pqejawy3gnb9k3xk1hv6acpeu52z6gkhq0sfymoobzxjrcaakm6rvjlnlurl7yhrhcxd2dew0coa0l74r',
                resourceIds: [],
                width: 785810,
                height: 614354,
                fit: 'XXXX',
                sizes: {"foo":3362,"bar":43664,"bike":"z#`]:WF/W%","a":"-rfH0n'=U:","b":"JLTtbL9_JP","name":"wW<%#._!r`","prop":97327},
                quality: 321,
                format: 'DATA_URL',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyFit has to be any of this options: CROP, WIDTH, HEIGHT, FREE_WIDTH, FREE_HEIGHT');
            });
    });
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyFormat has to be a enum option of JPG, PNG, GIF, TIF, BMP, DATA_URL`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'd10a8eb9-64ec-4e1f-951e-d2771c6d49fb',
                name: 'y0f8dyhefqhpda12pdvj4kgsu7hgoirqk8y34632v36q0qf4ffez8qsot2cf6v47s6chvxng6xb08rzd1nnr8d9lpx3fwz2suqib6mq7ge1pszdpnxi4qp9exsau3wxpm5zchsqy8u8mm20blnqfeh59l4na05p4nznzxjas7ihjxl5q5wy31j6m8okzmd2vx76nvkodh2ku7x9gw9udze6ehu4qz4bry8w26wd6k1rjf1pgssnxdin43vrv8cu',
                resourceIds: [],
                width: 946830,
                height: 458082,
                fit: 'FREE_WIDTH',
                sizes: {"foo":33353,"bar":39544,"bike":53955,"a":71798,"b":88461,"name":15274,"prop":2032},
                quality: 909,
                format: 'XXXX',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyFormat has to be any of this options: JPG, PNG, GIF, TIF, BMP, DATA_URL');
            });
    });

    test(`/REST:POST admin/attachment-family - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send(seeder.collectionResponse[0])
            .expect(409);
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
                total   : seeder.collectionResponse.length,
                count   : seeder.collectionResponse.length,
                rows    : seeder.collectionResponse.slice(0, 5)
            });
    });

    test(`/REST:GET admin/attachment-families`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-families')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(seeder.collectionResponse);
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
                        id: 'ae11c10b-f3e2-462e-ac1c-d957b50c47b5'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:POST admin/attachment-family`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                resourceIds: [],
                width: 603707,
                height: 732310,
                fit: 'FREE_WIDTH',
                sizes: {"foo":51491,"bar":"t9btiDw@[J","bike":84025,"a":12310,"b":54302,"name":37301,"prop":44799},
                quality: 996,
                format: 'GIF',
            })
            .expect(201);
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
                        id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:GET admin/attachment-family/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-family/e74bbf02-9cb8-4ae4-af50-c3b285509bd3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET admin/attachment-family/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-family/28fe4bec-6e5a-475d-b118-1567f2fd5d25')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:PUT admin/attachment-family - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .put('/admin/attachment-family')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '23fc2902-ddc3-4a2e-9894-029b3450f1ef',
                name: '12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g4',
                resourceIds: [],
                width: 662839,
                height: 758362,
                fit: 'HEIGHT',
                sizes: {"foo":80830,"bar":54793,"bike":40020,"a":57535,"b":81869,"name":67003,"prop":".YNn,URF+f"},
                quality: 302,
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
                id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                resourceIds: [],
                width: 857164,
                height: 978709,
                fit: 'FREE_HEIGHT',
                sizes: {"foo":51491,"bar":"t9btiDw@[J","bike":84025,"a":12310,"b":54302,"name":37301,"prop":44799},
                quality: 963,
                format: 'TIF',
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:DELETE admin/attachment-family/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment-family/13d2f02e-0f30-4800-8a7a-f8bbdd1d33c9')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE admin/attachment-family/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment-family/28fe4bec-6e5a-475d-b118-1567f2fd5d25')
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
                    payload: _.omit(seeder.collectionResponse[0], ['createdAt','updatedAt','deletedAt'])
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(409);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('already exist in database');
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
                expect(res.body.data.adminPaginateAttachmentFamilies.total).toBe(seeder.collectionResponse.length);
                expect(res.body.data.adminPaginateAttachmentFamilies.count).toBe(seeder.collectionResponse.length);
                expect(res.body.data.adminPaginateAttachmentFamilies.rows).toStrictEqual(seeder.collectionResponse.slice(0, 5));
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
                    expect(seeder.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
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
                        id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        resourceIds: [],
                        width: 493574,
                        height: 198936,
                        fit: 'FREE_WIDTH',
                        sizes: {"foo":51491,"bar":"t9btiDw@[J","bike":84025,"a":12310,"b":54302,"name":37301,"prop":44799},
                        quality: 694,
                        format: 'BMP',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateAttachmentFamily).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
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
                            id: '3fe52614-bddf-46e6-adf8-93e3d3418685'
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
                            id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachmentFamily.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
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
                    id: '80f9d2ba-d593-425e-96e0-32c4b3caf0c6'
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
                    id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachmentFamilyById.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
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
                        id: '23fc2902-ddc3-4a2e-9894-029b3450f1ef',
                        name: '12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g4',
                        resourceIds: [],
                        width: 854843,
                        height: 956892,
                        fit: 'WIDTH',
                        sizes: {"foo":80830,"bar":54793,"bike":40020,"a":57535,"b":81869,"name":67003,"prop":".YNn,URF+f"},
                        quality: 939,
                        format: 'DATA_URL',
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
                        id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        resourceIds: [],
                        width: 483123,
                        height: 856244,
                        fit: 'WIDTH',
                        sizes: {"foo":51491,"bar":"t9btiDw@[J","bike":84025,"a":12310,"b":54302,"name":37301,"prop":44799},
                        quality: 803,
                        format: 'JPG',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateAttachmentFamily.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
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
                    id: 'f3f17793-9401-416c-8c19-2015491b422f'
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
                    id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteAttachmentFamilyById.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});