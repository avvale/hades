import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAccessTokenRepository } from '@hades/o-auth/access-token/domain/access-token.repository';
import { MockAccessTokenRepository } from '@hades/o-auth/access-token/infrastructure/mock/mock-access-token.repository';
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

describe('access-token', () =>
{
    let app: INestApplication;
    let repository: MockAccessTokenRepository;
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
            .overrideProvider(IAccessTokenRepository)
            .useClass(MockAccessTokenRepository)
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        app         = module.createNestApplication();
        repository  = <MockAccessTokenRepository>module.get<IAccessTokenRepository>(IAccessTokenRepository);
        testJwt     =  module.get(TestingJwtService).getJwt();

        await app.init();
    });

    test(`/REST:POST o-auth/access-token - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: null,
                clientId: 'e668cdbf-c670-413f-9a06-5ee0a66b825b',
                accountId: '931e63ab-4c97-4021-91e1-9f42d6084dd4',
                token: 'Temporibus nesciunt laboriosam officiis quia quidem cum voluptas. Consequatur rerum dolor velit ea eligendi nisi eveniet. Eum laborum voluptatem quia.',
                name: 'ehhdn9qhhwskwj2lav1ksgwzryeopsyzwgjhr3f9jola9dwf1nj2pyw11t6dk4wae1tuxa0mwkrxr0yygchkuim79er60r1wdkfc2ue4v3662302u3yawoqg5j4io6urhbswghs4qiw2guaew8usn4bx9u11a1tt3ksm6ilu3sx1ct3meq4kzgidc0zjpm7bemhgo63nrnd7f1zm73d2h5du9mi10tepymnzcnnrs5us33o3cjkyhoazzuaa9fl',
                isRevoked: true,
                expiresAt: '2021-04-29 11:55:19',
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
                id: 'a17f1473-ead9-48c9-b6ba-f93a4cb1fd8b',
                clientId: null,
                accountId: '219934e6-d0d3-430a-9aee-8cc50a97643e',
                token: 'Est id dicta doloremque dolor consequatur sit ullam voluptatibus. Repellat qui molestiae quia aperiam distinctio. Delectus eum est enim qui soluta voluptatem id aut. Aut maxime aliquid culpa est consequatur facere. Neque eius est praesentium minus eos.',
                name: 'jx0pv99rb7zvc2cj3mmrrouok0nkuay52awtvjd4xp6s8d31m61kvw2wc6gtjz1znx4ak4x2hg6ozvnp1rb5z0ofqe51zm11pzvjtzoog55jn4avxvjxv3q7gr7y4skximxr7vdrc7i53qowqp6tsyr5t5ut4pg9m4pdva13hv6qxhxdqgwdzwls75rvkpo0bmztwvm5kp4iulxheneg7s1crua28o0q5hc3ufpp37w6z5jqqmbg9ruv2axy5za',
                isRevoked: true,
                expiresAt: '2021-04-29 06:39:23',
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
                id: '1cbfdab5-f764-4d71-98f6-e8519ecc47f8',
                clientId: 'c0bfddf4-947f-4acf-bbf3-330f6cc1dc10',
                accountId: 'f2b8e5e1-b3e3-4411-9e83-ae8a251f5d67',
                token: null,
                name: '7gyssxdz9olkgwm4yx6s6p432g1usqx3bo686sznz2kekdzo42lievavubn5l72oiiza7mc3sil7h7kmu1hfe78s3ik1k6d2s5k3k8gq5hoahiek39i2jfpn49rd806blfx4owregkixvhej7uqu44k6qtducoqhcjnuos2eaoxjadfma7nl67yg15ilcygbiv4vgodfwz2rooswp8df08pf508kebht23oz2tv1g9whnavfjmvynfk42seys3q',
                isRevoked: true,
                expiresAt: '2021-04-29 23:22:46',
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
                id: '90e4dfd5-a922-4ea0-b518-28beba098161',
                clientId: '206b24b1-b656-4a8a-bd55-1b3b50250096',
                accountId: '5c70ce49-e4b1-4ba9-a2ab-dbcb801ed258',
                token: 'Explicabo consequatur aut deleniti numquam et est eligendi laudantium. Vitae sit excepturi placeat odit iste dolor commodi et. Maxime non laboriosam magni ipsam sequi deserunt nisi amet. Perferendis cumque quo quia nihil numquam officia asperiores rem.',
                name: '6a2klb2np9g5p4fv41ykt4i5oc3ubd9laqoeljzhf9132r8geews48wd4bgnuf7y4boi692fw2oxxjkdx4lhxcqcrdg8fg64wzp8basydkoo44qa5tim027qo51knb8f8g0fcl5cqviyu5248roflvbf3bhzalyg2k08gf3bms69z7tjdetwn388is26itxjgd1md5kvvwhaylj3h62oj33upo3ua4wtftewosemj1b2q6540f6guafwrvc1osn',
                isRevoked: null,
                expiresAt: '2021-04-29 09:15:55',
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
                clientId: '2df3f22b-0b9a-4831-8226-863735143e81',
                accountId: '3730bae8-d131-4034-88de-dfc63ec87e92',
                token: 'Quos error repudiandae dolor aut asperiores occaecati. Perferendis ipsum consequuntur qui nostrum ullam. Nulla at modi tempore dolores. Laboriosam voluptatem deleniti et saepe quo sapiente dignissimos. Sequi magni non molestiae ullam consequatur aut eos vero ducimus. Sequi aliquam sed consequatur est tenetur earum esse.',
                name: 'rhztg9kk8i3o0gvi2l91a5g9ksno6v2gjmb0eu4g1ks41j3oe8f3knq2kohja2ygmyhd16lopx6gzmyajrp52avukgxn2wi8gi3c0xw7m1rgkzbsmbbana0bm14hybddfsnxxd0t7b183z6uyzeoy0s6b3c6cgpd886qo0u8jno11aq49imtg684jjb0eecfpc32e538k02u6ka3gxuxaq7q01szxvxlsnfohi1pgjl62gazt7ldjglt4d1iwoj',
                isRevoked: true,
                expiresAt: '2021-04-29 11:56:53',
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
                id: '646decf6-6136-4f59-81f7-89e6986676da',
                accountId: '571a4224-3b06-4c99-ad0f-b62a2b5a5511',
                token: 'Qui quo non et. Inventore praesentium at. Dolore et dolorum saepe dolorum dolorum aut. Esse possimus repellat recusandae eveniet qui. In mollitia aut et enim odit consequatur quisquam sunt ad.',
                name: 'x7gli1na0ybcxo8xqlpoxoij60c229kx3433yynag7p1dji844xhezh190kqlojvxzqu5ut3swn0h6glnmq0i5o8mfjly5r9084gdwd4uu9xsqt5nd1jxfyh9ckei0wag5vie8fmq1xcci4ciy8nm1jou33ub6z637n6xmft2a0l4ax8e62ev8kv4ugn25l9hm2icdfnm9twd02ykblkvumbzku3n9tf8rcyacc0lg3k5selii17cjw28xn2ip9',
                isRevoked: true,
                expiresAt: '2021-04-29 02:34:59',
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
                id: 'a3f13f22-5c86-400a-aa0b-b29c0d275b76',
                clientId: '9ae12e95-a64b-49a9-878c-48269906a2a4',
                accountId: '4a09af6f-2ef0-4941-a89c-d946dd0b64e0',
                name: 'f062x0yvedqpfe8rjqd9lgj1vdzst3czsdiv16ovmotlopevsf03svu5fxcd0tiumt2dhwdisuz31vbaydffadcbiags545xgakxmpyo40whkd1356ccf8jxq4pxbevuxil1xxd3bo8xtxh42ufpb77zsfcnq8facb8atmrwd5oo0sl8dorm4l9yiw0ruwzlnpqc8ecomtlizir4ep5e53r6kz7dfvl82wub59ulqek5ohjda22tgxw0qdqfqfh',
                isRevoked: true,
                expiresAt: '2021-04-29 20:23:32',
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
                id: '31c771d4-f3d0-4ee4-9011-0621100e1137',
                clientId: '8302e3ad-c0a2-401f-9275-58909bbcce0a',
                accountId: '171bd7db-07a7-4f7c-a003-35b5d67dea9e',
                token: 'Omnis iusto asperiores doloremque dolorum. Nam qui cupiditate mollitia nisi architecto necessitatibus. Mollitia sed enim incidunt iusto quia ut consequuntur reprehenderit quasi.',
                name: 'f0xevwibrndfjtvwl1unxlyegx458e2kf8buf70ka9xhq2g9h36l5vym8wrq7nbvl9ys3boi1ukumei2xolgoqebek9ea1ab59e1y4kvnsc2rmwv0xdhzue28w3zqyzl48epacy837jxzuk27t7bubm12lvq3bey6fzmetl8pjvicp13m5o0vj0yu44h5206nc0ttippfmjded7cd0bonc5lyr9b0u0gfjujl4isgil4694jkha5t218mikm9sd',
                expiresAt: '2021-04-29 04:27:37',
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
                id: 'uup1rnywvlukzraqjbb6oi2fnesifuaadsmx2',
                clientId: '5288389e-c6b1-466d-8756-52d0fed6de49',
                accountId: 'c4b010b5-d2c3-4325-85f3-57b3d318e8f1',
                token: 'Assumenda deleniti nihil. Voluptas esse quia fugit rerum ut. Dicta omnis consequatur est sunt mollitia possimus ut et. Dolor quia alias numquam in. Sed vel consectetur pariatur odio sit. Est ab ut deserunt.',
                name: 'wcqox7eqtz3fqxe0vmoo9hu7xx0w1ohqjh6jrtxsz3s2khxrjtdtfp8nf8kgsih11cqh6uiowdbi4bmln8zslc9012wue25a20bmwvxfyx1wcir7mod4fhyn16sgxef0bm8088tnpau07p393rkv8pmob8l5kg0hky40b30uuv2xwjlocgpy01bamanqp4zocxyt20m2zxzknmcn99l5490aixs2t6znnjt6v7hpss7mzivke4phglipujn25md',
                isRevoked: false,
                expiresAt: '2021-04-29 06:00:36',
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
                id: '1d435246-8fa5-49fc-916b-711c86503f60',
                clientId: 'va8iv2bbbklfowexdqrcr0tiydflgs9wx058j',
                accountId: 'bd381aee-bfc4-4852-8a89-97362be17560',
                token: 'Quasi odit omnis consequatur sunt et. Non error earum eaque doloremque qui cupiditate dolorem. Aut quia et.',
                name: 'cv950w45falzusp9cp7ksjxge5s1a0pb7jx3z7p3itwmxo0srszvxmigfg1ff0fh8lvp083f84codwlgp5gigcvf53v014nqa5fckkeqlaf11qfkvj0cpktbnue75brxydoqmh7f04buxv4ns5hetzc71ruacvplq6q6zm5x75s21zgrmewylwla6aq4e21soq3dbhgsy4ghf140fmf5xzs8eajvhakaquybgl14o80wzqzl7v9t4xhxf0nf3qr',
                isRevoked: false,
                expiresAt: '2021-04-29 22:31:24',
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
                id: 'dd524ba6-a4ca-4b9a-9a6d-cfa7108d32d1',
                clientId: '28dc3851-d76a-41a8-b5fa-30efefd5c0f5',
                accountId: 'uxrizblicnvb7iiihizvc04qpewjgm6vbeqm7',
                token: 'Modi consequatur reiciendis autem hic molestiae hic corrupti sunt dicta. Illo eos cumque eos. Eius et vero id est. Et consectetur officia ullam ut culpa soluta deserunt.',
                name: '7iw9cv63axk3ybpu8git5voa2rdy1hnve5r6brz5u06adg39n7jwd5lk7taqo8x0p3ftd3cu6z5mjncif6fbvuk6ih7am3rwp9qkfufjidl71afks8bo1nktzdvzm77al4t9tcfkdwkz4d9df9ismmm9t0bqfxmesv36y3iavpyerlcrcxab8b065yp8pzsaqhv5rtqk11v7vs649w8srm131ttkm7lvctqjplpgj9jwi2yziwo910bi2bwczxe',
                isRevoked: false,
                expiresAt: '2021-04-29 02:47:36',
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
                id: '6c9f6fd4-5db5-4cd6-8e10-09d6b7acbc3f',
                clientId: '7e732220-cecd-4092-9b8b-56e9714aafca',
                accountId: '669fddb9-e221-45aa-978c-1f00c9c8ea69',
                token: 'Eveniet perspiciatis aliquam eos dolorum natus occaecati. Sint nostrum aliquid corrupti. Ipsam est dolorem sit totam molestiae assumenda molestiae. Aspernatur sit qui omnis aut. Vel magnam qui ea dolorem veniam. Enim magnam dolor.',
                name: 'acmqcb1dsjv6sljffojq8efc2ihf7k7vgr0luki4hh5qpfx3tmjyrm1h355jys7xd82k2nlv5r85dkasejwa8945aoo4cdvj6nwvtsiqgi2id7vjsffnwq4mtyxjs5799x3ekk3clsdz2bfvab8684jyzkjrk3qatagjbfr2ypvw6782gzxqhoafhpaw615kl19h27hg4py6vhf07jnkqhee11p0lmldtwgw1zqk360bu7j8dvi9qgjzdkd36afw',
                isRevoked: false,
                expiresAt: '2021-04-29 10:28:01',
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
                id: 'a82b7da7-130a-44df-839f-8469e76a11cd',
                clientId: '7abfb70e-92cb-42ea-be2d-070b52e23bf1',
                accountId: 'f9e63e7c-adfc-4d67-aed2-77cdd5791d26',
                token: 'Dignissimos sunt sint sequi deleniti quam omnis. Molestiae dolorem et voluptas totam vitae odio quod neque sit. Eveniet provident eos dolores praesentium. Dolores qui voluptas maiores temporibus dolorem sed ut. Consequatur deserunt molestiae ut suscipit. Sunt delectus totam voluptatem deleniti minus.',
                name: 'vfj77293i4fhzh4h6x3bfkhbskoa9tep6pkw3f900lr2hxgeh6qbn4ty0w3zwuhtn3f3yph3zo9u0siyk1r3ummdvpkxh2vc242o9lk674ox281v5iol91u21r7p53igcgw27uxqhif81bd9l4mh0nfvhzhy06h7sz9gvk7ejdvsu9m1tm5ia84ark3trdtqt8fsp9ga0k13guchi53k8mkzqgoz7qxfpjk2ofr41s3rwzm4pm3652hjvqjl32u',
                isRevoked: 'true',
                expiresAt: '2021-04-29 22:55:21',
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
                id: 'e185592a-ccef-441e-aac7-c3cc5e794105',
                clientId: '51dc079a-9128-480f-be14-008432fc5c2c',
                accountId: '07e34f2c-e702-4199-b852-dca64983822d',
                token: 'Accusantium suscipit modi aspernatur occaecati. Fugiat consequuntur voluptate quia quia optio voluptas impedit pariatur dolores. Voluptas ducimus illum quos ut dolor consequuntur nemo odio. Omnis possimus nesciunt consequuntur laboriosam. Doloribus ut incidunt. Ea dolores et id officia omnis totam.',
                name: '7nrsmb5omz1y4f9ceqg44n7vcuxkpcffump4nu7g9yn6fpkw0n3yuhmv056ypn1jh1sn2ob27wwiw6jps831abdd4shvncin911nxe44k1fc8fivbnjnio1flaizlkg1vbpy5h8nag5ihckxh70orimepw3cmc7dxerwjqhatojuga37fzi6r30v3rj6jsg9bbwvsxrfs6lzxa4tgak787iqer0kss6yv5stifubmtoxsuytw0385qmmrn5yiw7',
                isRevoked: true,
                expiresAt: 'XXXXXXXX',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenExpiresAt has to be a timestamp value');
            });
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
                expiresAt: '2021-04-29 22:16:31',
            })
            .expect(201);
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
                total   : repository.collectionResponse.length,
                count   : repository.collectionResponse.length,
                rows    : repository.collectionResponse.slice(0, 5)
            });
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
                        id: 'bce7e674-3a41-4bb4-a637-fce52e034157'
                    }
                }
            })
            .expect(404);
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
            .expect(repository.collectionResponse.find(item => item.id === '28fe4bec-6e5a-475d-b118-1567f2fd5d25'));
    });

    test(`/REST:GET o-auth/access-token/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/da3f4811-3a29-4982-b6bb-1dac1ed7855b')
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
            .expect(repository.collectionResponse.find(e => e.id === '28fe4bec-6e5a-475d-b118-1567f2fd5d25'));
    });

    test(`/REST:GET o-auth/access-tokens`, () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-tokens')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse);
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
                expiresAt: '2021-04-29 19:18:41',
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
                expiresAt: '2021-04-29 22:16:31',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '28fe4bec-6e5a-475d-b118-1567f2fd5d25'));
    });

    test(`/REST:DELETE o-auth/access-token/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/26c856ff-5d4a-41d1-bc83-7e14fcfe7c26')
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
                        id: 'c8c8ae70-d935-463d-ada7-8f24bcc3dac5',
                        clientId: '23fc2902-ddc3-4a2e-9894-029b3450f1ef',
                        accountId: '01d3c56e-5728-46aa-8427-4d9639511b96',
                        token: 'Distinctio mollitia distinctio velit nemo. Tempore minus et. In deleniti earum. Eligendi dolores vitae. Aut eveniet et minus exercitationem possimus ipsam natus enim. Non eos corrupti explicabo optio earum.',
                        name: 'y47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6w',
                        isRevoked: true,
                        expiresAt: '2021-04-29 18:34:19',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateAccessToken).toHaveProperty('id', 'c8c8ae70-d935-463d-ada7-8f24bcc3dac5');
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
                expect(res.body.data.oAuthPaginateAccessTokens.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.oAuthPaginateAccessTokens.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.oAuthPaginateAccessTokens.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
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
                            id: '1197d120-49b5-4211-a9cb-d534e8568eb6'
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
                    id: '2670728a-b922-4526-aff6-c03f9d155f54'
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
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
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
                        expiresAt: '2021-04-29 19:18:41',
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
                        expiresAt: '2021-04-29 22:16:31',
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
                    id: '8249b49d-6938-4d46-8290-9f9bd8ef8107'
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