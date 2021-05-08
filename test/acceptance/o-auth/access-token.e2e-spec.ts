import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAccessTokenRepository } from '@hades/o-auth/access-token/domain/access-token.repository';
import { MockAccessTokenSeeder } from '@hades/o-auth/access-token/infrastructure/mock/mock-access-token.seeder';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { OAuthModule } from './../../../src/apps/o-auth/o-auth.module';
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

const importForeignModules = [];

describe('access-token', () =>
{
    let app: INestApplication;
    let repository: IAccessTokenRepository;
    let seeder: MockAccessTokenSeeder;
    let testJwt: string;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    OAuthModule,
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
                    MockAccessTokenSeeder,
                    TestingJwtService,
                ]
            })
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        app         = module.createNestApplication();
        repository  = module.get<IAccessTokenRepository>(IAccessTokenRepository);
        seeder      = module.get<MockAccessTokenSeeder>(MockAccessTokenSeeder);
        testJwt     = module.get(TestingJwtService).getJwt();

        // seed mock data in memory database
        repository.insert(seeder.collectionSource);

        await app.init();
    });

    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: null,
                clientId: '07ca055e-dc94-44ad-bba2-6856b100dc04',
                accountId: '649d4f97-97af-4fce-8f0f-2d21e0054368',
                token: 'Omnis repellendus assumenda. Inventore non aliquid sit quia corporis. A eius ratione.',
                name: 'mcyos5jycyhyf83p5wkrxdq527powz6kl30ff90panwx0t7djs2n24rro91xc0ij6m8lo23ladlod0viqaig0c3t1ndi5iknbu6d0zfmsreh0ed0oz6wxqhlyyb4cuit42536utzz5873aycvu5pi8j8g0ypahv5qz33w9i9mcmfookv3o7bgelvu2kt5dv9kbhj814wt7poyq9jy7ivi3g2h46at0q8f4hwqsqf5pkat6qt5zb0czmp9uepnin',
                isRevoked: true,
                expiresAt: '2021-05-07 23:41:13',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenId must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenClientId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '68fea85d-c1a3-4515-ac14-93a556157405',
                clientId: null,
                accountId: '6c899dfe-c179-42f0-8d58-c2bee963029c',
                token: 'Et in quia. Porro optio voluptatibus ut et quos fuga. Iste culpa consequatur perspiciatis delectus culpa. Est consequatur eaque.',
                name: 'yipa4zz2ikhvt5383kj0ut39fnh6lhgbhpv30yl8yz81muujj1tc94l9qhhxqt8yo8jml4f5swmn032x7fzaaunmzkj0z9i90q71ejs41vnexxf1tt189c8h8b31vkcn143w0g9ps4d1ogg8map9kcmao4k81zijvidwtvqv43qmutqnbz1tg7gji50mlqjs4b64766ldwvx2l7kjosv6g78ro7s7dg7udk0iwct5hlggh99aau9evw0jsxotc6',
                isRevoked: false,
                expiresAt: '2021-05-08 21:00:56',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenClientId must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenToken property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '62e2db6d-3c20-4460-851a-688841796edc',
                clientId: 'ed9c6dfa-3f40-4310-afbd-329399f73d4a',
                accountId: '7e35ef3c-2a4a-4da9-85e7-cfa9779068a5',
                token: null,
                name: '9r04mw48vgn4c08p2j46zmq3t67d7e8w4hf1aiwcwqgoan4cif3ge47wupn3jqp73psjgj5qkywsl6s0w0prhdnucwagqwck488tllztxmkdq66addj25p8q65noy3svh45t1icy9vybz55qmyud6zrsy229zhl477uyih9y91f9i8gvclwhg7iyk9j4hcl3bwt48nfpm9dpwsb3wk91edjd5u7lc4iaoh4ga0jfw7hsmbwncrgscvcj90xwaz9',
                isRevoked: true,
                expiresAt: '2021-05-08 07:10:34',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenToken must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenIsRevoked property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'e78ebc3d-120a-4419-81d1-a08f2fd7ed7e',
                clientId: 'f0603835-c995-4d75-b2c0-f63bb71e9a52',
                accountId: '2edaccd8-032e-4f63-8f52-f4ca6c0aa268',
                token: 'Commodi veniam perspiciatis est et perferendis soluta et ut inventore. Aut quibusdam sapiente minima aut dolorum error consectetur inventore. Omnis quae voluptas et corporis. Nihil autem possimus consequatur in ipsam tenetur architecto.',
                name: 'zue0wbsmln1dcyzum1r0clamhjph2eottdbhtq0lyboeglb6hkln01anbf1wr0kysff82b66knpemsryhbwczrn4e0aj7mekh87zqpgd2pl4otkim43ns4iji8kqxa0cbmhbhwsfnrjhi560qq68ycsmq3s34pn6achc1zbno5we2jinh5g6r11dkh16h5fu6z3t7jdgiu7ban21i9tlfetcze8wkbfzo1hiym1upbirev1tzi4jbs7khdk7j42',
                isRevoked: null,
                expiresAt: '2021-05-08 07:15:38',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenIsRevoked must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                clientId: '76d218b6-d6be-4e00-982c-9b99bdfd9ee1',
                accountId: '42c61792-7973-4fc0-92fb-de5c11c5289c',
                token: 'Recusandae dolore tempora amet quod dignissimos sint aliquid occaecati. Tempore quasi autem doloribus. Molestiae ad rerum nulla quas. Blanditiis pariatur nesciunt voluptatem voluptatum. At et dolores id repellendus animi aut. Aliquam sunt pariatur.',
                name: 'pq3c3021hjo7544f08t4buk1jnj7od928kvosaybju4m6m9xptfndxehcwd4akvon4k5sf052njflsynz6yp8frswdia1y91xjlmdoq1aph6my94f9u8r9xdwcj7qrxdjddimo2jkvnt26hcueryhobqm4gxbvayk7412b2f7dw9tl3mrnmoe0x26icyqd0fp9nxrevknscooe6p1ybfn1u4r6p0owclbz7zpksl4pi5zl3ck1gblc1gwfe0arf',
                isRevoked: true,
                expiresAt: '2021-05-08 13:59:08',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenClientId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '628e73c6-5628-4bcb-be76-f0942ad2dd87',
                accountId: 'e537c134-855b-45e8-94a9-abc63821d2db',
                token: 'Quia tenetur et possimus quo autem necessitatibus facilis. Vero sint vero quod aliquid expedita qui rerum. Minima ut sed provident cumque magnam voluptas sed doloremque. Est laboriosam et ut similique ut cumque nemo dolorum. Et quis quae. Quo qui aliquid molestiae voluptate mollitia eius deleniti.',
                name: '56bay7mo6900vailouuh3chx6svbmlzxmk20m4bizzq9emjn32ojnmd6nvttbj21rxriqcmi29a1n88fcp99jus7fg4lejzj7u1qw35ccqhgy7f1nch1paw11w95o01hnmr5szix8pyhvzhb8ob9abuhuuuqyw1403jze8vtlznik4fwxadr99s5r9msu03lvcu5as5s3aqddl5p0rl4tfujrs0bh5i55ge1nrdnkp5i4pqdih8nryuob8re61r',
                isRevoked: false,
                expiresAt: '2021-05-08 08:54:51',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenClientId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenToken property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '286606f5-d4da-4831-a26f-829a01d284a7',
                clientId: 'f940424b-23e9-4854-b90a-2b4ebc236638',
                accountId: '42fc0ac9-3648-4f3a-a7ec-ed4e3cb58b3e',
                name: 'abbvddc87r544fj8vcif1v5fw7eokcpf9xe4feb7rltt926vuwjsvfwi54q5hnrzd7rx44ztodo12u6r51igbsvna7r8dc9iae3e6f2ttle7xwqcisk007l1r5034bxko46f5rquenu9tt7yc0yz9ff3z8sz4phj9qxhb7ndk3pu0pg53ipp80pzuoe3mbl77yzt3gosessxjrqqmep6jqs6irzevhyyckmjszemu1hlzpdcele92pi14l24zoh',
                isRevoked: true,
                expiresAt: '2021-05-08 12:47:12',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenToken must be defined, can not be undefined');
            });
    });

    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenIsRevoked property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '0bf4606e-2263-436a-bdb1-3acc40a975e6',
                clientId: '678ecc43-5c87-43bb-9357-f5ef273f0354',
                accountId: '09ccc3ae-d735-4dcb-8a4f-2709aa7bd1a7',
                token: 'Consequatur eos vero repellendus debitis temporibus laborum sapiente architecto reiciendis. Est aliquam qui reprehenderit et in fugiat quod iure. At aut esse ad culpa id rem. Qui corrupti tenetur rerum quaerat occaecati aut est eligendi ullam. Nihil voluptatem alias aut dolor rem eum a dolore et.',
                name: 'uabainzzmrk1eovet8dieosbia15u0d9p3vcdm94ijj0351h5jt4w5qhb84fp0nuk50mi1q12no0f7kz5a2d92vxno7pzwqxi3keck3pj06fe6dj6x9n5aj0qracxt8kcp1a5dlmie2ko2m1rze9x9980mzfiypc8soidduw0af3g5pobibpggs2rg8bcenvaq36nel0m96uzdth0igld19ho8356iptspia36avqkucghw9kfyegx2xcrpjjze',
                expiresAt: '2021-05-08 01:09:51',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenIsRevoked must be defined, can not be undefined');
            });
    });

    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'sfngbef1386t4qemr3aujso044h6d9jb1gede',
                clientId: 'a5819cdb-93a0-4aab-8ce4-904f532e17db',
                accountId: '699116c7-7221-45c0-bd84-1a4520fc1a37',
                token: 'Sint deserunt error doloremque dignissimos. Qui dolorem delectus minima repellendus quos. Consequatur laboriosam harum. Maiores voluptatum aut nobis. Eaque possimus suscipit neque asperiores. Ea maxime earum non ad.',
                name: 'cdgof2j5w2hb6illwrrpfnui6e8aqdjx5dbu84oq7unk5uc8168syhlyqfnrdpe2qex3law8f9mfrbyy2lht161lachb74thhlt3gx58ta5pctwj98dqakc4yjdf7khrxskkyucuh6asl0srz6iqld97y0ga1rarfl1dpz9988nompgrf7fj8yk342ep82qw6y710wke10g3g08tshtpcjpippbkfba5e8if8b3mlf0wk410mz6goa94gjpc5r9',
                isRevoked: false,
                expiresAt: '2021-05-08 16:16:31',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenClientId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'feb62eb5-15ff-4a6f-94b2-24b2291bc223',
                clientId: 'upggwgjvq820ofmdfqjh5xaisqvdk2yd4eu45',
                accountId: 'e60f675d-8e40-4ec1-b33c-56c462fa0cf6',
                token: 'Placeat enim adipisci voluptas sint et. Et fugit commodi sed vitae sunt. Voluptate perferendis in saepe illo. Enim similique voluptatem nihil earum omnis. Sapiente quas qui blanditiis sunt aut.',
                name: 'plwreox8oxydrdng7i2uq01keuabs0yfu5rtontrs91mb0et18hbrktz5kmfi1he53p5zhdhd96bamcxpl9g8vl9a3y20xdri36syybt2eo630p8uqxq4n7gk4kh0vkbuwlnsrd9yl7rq4jonfi4qpqzngnplza4iwqwd3qwpi1fipyo59znctdeszrikqo270boei5uhj2y255fo1p6gwwcykwmg36ldnhgwrfdxdxape79wddq8o4h2j1xtbv',
                isRevoked: true,
                expiresAt: '2021-05-08 12:43:56',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenClientId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenAccountId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'e79bcd05-13b5-4618-bb9d-9bd0695d4b8b',
                clientId: '28a9d765-9312-41b5-bebd-1774f88e9b9a',
                accountId: 'lbvgejga1tqhm0svvuy74y8v2rwhvwnjn37o7',
                token: 'Nisi beatae et ea sed. Aut praesentium atque molestiae id. Sapiente et unde alias ea et commodi unde omnis eligendi. Molestiae magni saepe omnis vel fugiat eius eos. Et eius totam. Vel optio sequi et atque.',
                name: '2w5len7i3gsq93x7xt73vzhnautr6l1nc5x0pw1tb5c8na1tchc2qgb1tnm038osnqm5rkujhhx43spbo0amudxxg9l7d9byjhuek3x3y2zmojwo04vwxyhwvutzdxhw5zwkn4da35fcr3w8j3pqvyc3daf5ebf7y3q199af1bjc4cutn0ocbl1dga5cw776cwpbggqwswxbi16ayjochcd5z8fccreh9rk1l5g8tswnxglbgxlevazyy3w7uth',
                isRevoked: true,
                expiresAt: '2021-05-08 20:36:31',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenAccountId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenName is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '248ab6c7-2b09-4083-9011-17f5ef30b61b',
                clientId: '2e02ced9-d6a1-4688-9612-32c4763bb54b',
                accountId: '51c12fa6-d1d4-4425-b99e-cb374846fd04',
                token: 'Culpa ab et perspiciatis error veniam. Doloremque enim maxime expedita. Ea qui quas omnis hic rem nesciunt perspiciatis omnis aliquid. Tenetur molestias et et.',
                name: '6ayayh6i3s61du2k49mrbqlgsc6tdb3y7kxphi9gpfzwd1ale5gfkw1jh8a5pgull9m6o0ra9arbl9m5end0gkfnbowrm7mfxmdydhfmq3iordkhnwj06ib0j6hpemzofax376sxrvzp3hzig4jewx0lzjquiq76aab62kj7tw5fwibp36b7usorrpszhdrw6o1d58ylhskt3y4vzuujm32v3q4xbpab6b42h3etvec3cyq5klkexwhq84i2hxor',
                isRevoked: true,
                expiresAt: '2021-05-08 10:59:26',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenName is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenIsRevoked has to be a boolean value`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '4ab2b687-d4e4-4e99-8efc-c099e9bde625',
                clientId: '2ef5f879-4832-40a3-90bc-dcc0b7c91acd',
                accountId: 'b2ac390e-5205-47b2-931f-6a893b4837a2',
                token: 'Molestiae laborum aut blanditiis consequatur delectus nesciunt at voluptate a. Rerum magni nisi sunt eum. Ut magni omnis corrupti facere.',
                name: 'n51i8in0stweyzltnp4kxq6yjtfh3eqez7y4lk3jfdm37eyxze7zs0td21tcn52qv5towzg8geeuwqoiso3q0ahamz768oc0nb8v8m5zcb69dybqwtfllhmj2oz94gommyzg4eroyvu43nyqobth4udmn0vuvawzb5azk5sjwzwsj6fp3962z02n2u9a1awsiiujt7vqujx732wefocif85jk3nez35jteee4ktyi6hz9pcgomxam2bl5ptccyj',
                isRevoked: 'true',
                expiresAt: '2021-05-08 21:49:38',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenIsRevoked has to be a boolean value');
            });
    });
    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenExpiresAt has to be a timestamp value`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'd21cf770-5ab4-4588-ba3a-a72474ffab1e',
                clientId: '216acaeb-d52a-4f90-8dde-8fb83448f368',
                accountId: '8fe49d7d-6713-4a41-b146-c0c60888f4b3',
                token: 'Quae nesciunt recusandae omnis at consequatur facere libero aut vel. Id quae repellendus illum non ut culpa et. Qui dolorem non et aliquam fugiat ullam in ea. Aut quas molestias accusantium dolorem vitae natus enim. Nobis dolor est et incidunt nostrum et omnis voluptatibus dolorem.',
                name: 'guv7fi7ax62yvyie0yplczzk7elbxjpk3lb9w49swqn2h1mf50q7ayxlggwpk5ky3bfccys7dbvy11mjho1xg0krx6l31bu2ivqt1ro9cj1cd5wak02t6qo9ruuwbqry6wizs7z5i0qdap3zo1vgp2kopgurluhbq50de35g9b8p0lymlh0wllz7nbr6li7msbetjjphsuto2zfoswbgj87h7s63dbkims09x34dygqgxh2nbf51czgnce21lf0',
                isRevoked: false,
                expiresAt: 'XXXXXXXX',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenExpiresAt has to be a timestamp value');
            });
    });

    test(`/REST:POST o-auth/access-token - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send(seeder.collectionResponse[0])
            .expect(409);
    });

    test(`/REST:GET o-auth/access-tokens/paginate`, () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-tokens/paginate')
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

    test(`/REST:GET o-auth/access-tokens`, () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-tokens')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(seeder.collectionResponse);
    });

    test(`/REST:GET o-auth/access-token - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: 'd6430872-1603-4eab-9450-08a508206b99'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:POST o-auth/access-token`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                clientId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                accountId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                token: 'Delectus eveniet quaerat nihil eveniet omnis autem. Suscipit et qui laboriosam voluptas numquam quia sed perspiciatis vitae. Eum ducimus sapiente magni earum.',
                name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                isRevoked: false,
                expiresAt: '2021-05-08 20:08:25',
            })
            .expect(201);
    });

    test(`/REST:GET o-auth/access-token`, () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token')
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

    test(`/REST:GET o-auth/access-token/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/ec8f6c19-8a48-4a56-a133-98cd374f86b7')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET o-auth/access-token/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/28fe4bec-6e5a-475d-b118-1567f2fd5d25')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:PUT o-auth/access-token - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .put('/o-auth/access-token')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '23fc2902-ddc3-4a2e-9894-029b3450f1ef',
                clientId: '01d3c56e-5728-46aa-8427-4d9639511b96',
                accountId: 'c5a9a341-abe0-497f-9b71-d1e1b4c58473',
                token: 'Explicabo optio earum delectus dolores eius. Perferendis rerum et et explicabo sequi aliquid eos. Nobis laborum dicta quas error consequatur voluptatem voluptatum voluptatum.',
                name: 'yu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmh',
                isRevoked: false,
                expiresAt: '2021-05-08 17:10:35',
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/access-token`, () =>
    {
        return request(app.getHttpServer())
            .put('/o-auth/access-token')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                clientId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                accountId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                token: 'Delectus eveniet quaerat nihil eveniet omnis autem. Suscipit et qui laboriosam voluptas numquam quia sed perspiciatis vitae. Eum ducimus sapiente magni earum.',
                name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                isRevoked: false,
                expiresAt: '2021-05-08 20:08:25',
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:DELETE o-auth/access-token/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/3b107f68-4d15-497f-9422-5797e1c650b7')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE o-auth/access-token/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/28fe4bec-6e5a-475d-b118-1567f2fd5d25')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200);
    });

    test(`/GraphQL oAuthCreateAccessToken - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:OAuthCreateAccessTokenInput!)
                    {
                        oAuthCreateAccessToken (payload:$payload)
                        {
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
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

    test(`/GraphQL oAuthPaginateAccessTokens`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        oAuthPaginateAccessTokens (query:$query constraint:$constraint)
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
                expect(res.body.data.oAuthPaginateAccessTokens.total).toBe(seeder.collectionResponse.length);
                expect(res.body.data.oAuthPaginateAccessTokens.count).toBe(seeder.collectionResponse.length);
                expect(res.body.data.oAuthPaginateAccessTokens.rows).toStrictEqual(seeder.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL oAuthGetAccessTokens`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthGetAccessTokens (query:$query)
                        {
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.oAuthGetAccessTokens.entries())
                {
                    expect(seeder.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL oAuthCreateAccessToken`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:OAuthCreateAccessTokenInput!)
                    {
                        oAuthCreateAccessToken (payload:$payload)
                        {
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        clientId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        accountId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        token: 'Delectus eveniet quaerat nihil eveniet omnis autem. Suscipit et qui laboriosam voluptas numquam quia sed perspiciatis vitae. Eum ducimus sapiente magni earum.',
                        name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        isRevoked: false,
                        expiresAt: '2021-05-08 20:08:25',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateAccessToken).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL oAuthFindAccessToken - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindAccessToken (query:$query)
                        {
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
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
                            id: 'd1f485c3-d347-4861-b3bb-f0f722553fcd'
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

    test(`/GraphQL oAuthFindAccessToken`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindAccessToken (query:$query)
                        {
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
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
                expect(res.body.data.oAuthFindAccessToken.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL oAuthFindAccessTokenById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindAccessTokenById (id:$id)
                        {
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '4aee6833-a105-4361-85b6-5f35a761dab1'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL oAuthFindAccessTokenById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindAccessTokenById (id:$id)
                        {
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
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
                expect(res.body.data.oAuthFindAccessTokenById.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL oAuthUpdateAccessToken - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:OAuthUpdateAccessTokenInput!)
                    {
                        oAuthUpdateAccessToken (payload:$payload)
                        {
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '23fc2902-ddc3-4a2e-9894-029b3450f1ef',
                        clientId: '01d3c56e-5728-46aa-8427-4d9639511b96',
                        accountId: 'c5a9a341-abe0-497f-9b71-d1e1b4c58473',
                        token: 'Explicabo optio earum delectus dolores eius. Perferendis rerum et et explicabo sequi aliquid eos. Nobis laborum dicta quas error consequatur voluptatem voluptatum voluptatum.',
                        name: 'yu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmh',
                        isRevoked: false,
                        expiresAt: '2021-05-08 17:10:35',
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

    test(`/GraphQL oAuthUpdateAccessToken`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:OAuthUpdateAccessTokenInput!)
                    {
                        oAuthUpdateAccessToken (payload:$payload)
                        {
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        clientId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        accountId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        token: 'Delectus eveniet quaerat nihil eveniet omnis autem. Suscipit et qui laboriosam voluptas numquam quia sed perspiciatis vitae. Eum ducimus sapiente magni earum.',
                        name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        isRevoked: false,
                        expiresAt: '2021-05-08 20:08:25',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateAccessToken.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL oAuthDeleteAccessTokenById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteAccessTokenById (id:$id)
                        {
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '690c499d-b1c6-4c93-890b-df1aa7135e62'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL oAuthDeleteAccessTokenById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteAccessTokenById (id:$id)
                        {
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
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
                expect(res.body.data.oAuthDeleteAccessTokenById.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});