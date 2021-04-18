import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAccessTokenRepository } from '@hades/o-auth/access-token/domain/access-token.repository';
import { MockAccessTokenRepository } from '@hades/o-auth/access-token/infrastructure/mock/mock-access-token.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { OAuthModule } from './../../../src/apps/o-auth/o-auth.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('access-token', () =>
{
    let app: INestApplication;
    let repository: MockAccessTokenRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    OAuthModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
                            models: [],
                        })
                    })
                ]
            })
            .overrideProvider(IAccessTokenRepository)
            .useClass(MockAccessTokenRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockAccessTokenRepository>module.get<IAccessTokenRepository>(IAccessTokenRepository);

        await app.init();
    });

    test(`/REST:POST o-auth/access-token - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                id: null,
                clientId: '534ee75b-4127-4711-bc26-53f4ca029a61',
                accountId: '4afb1611-d356-42ba-9780-f45a0764fcc3',
                token: 'Cum expedita voluptatem tempore exercitationem odit quia quae. Quia minima deleniti et harum reprehenderit vel ullam. Ut quam dolorum possimus numquam iusto recusandae. Iure ab reprehenderit aliquam totam quia. Et quis voluptas. At facere veniam qui ipsam qui.',
                name: 'bgowu6wrop8e521awu3zkuu9a1phsdz7e8i8d5iinjcnfado3orvejc1l8805t5g8oz8jcfwakhvivx365draieowkkzor13jln58lnjuxcxddvih7w0sa0nnwli1xvgna4wmpbbmnt2w737c00y5e9xqbbr541xmmeq6sy0njgtje2h66w836g736uz3sxtion2f9tyo2yjvmzbxhe6bhgo0t3qsr2y2feuhng527d19c0d99qab4bxtrc37vs',
                isRevoked: false,
                expiresAt: '2021-04-17 22:27:01',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenId must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                
                clientId: '534ee75b-4127-4711-bc26-53f4ca029a61',
                accountId: '4afb1611-d356-42ba-9780-f45a0764fcc3',
                token: 'Possimus quam qui officia rerum modi. Animi laborum alias repellendus incidunt totam aut eligendi. Cum neque rerum aliquid necessitatibus ad in.',
                name: 'dgax1dzxwmaaad21vbuxqltf4c5rhx5bg2jzrnlwi01u2rm5uvq8xzfjvy4kwr2fidx3y391p712rcq2oq8cz2gdq9rnev8mpw9qwuii20kes2sboumk7cd39xet4pqcj3ki49j0wm9vgfirlkrnb2t6q7bjgbrvrys76q7pb8it267n23uifn78ot9l5holiwmpyi2lthgn6bkeaw93b6m4bk9p1roz76crz2do7c7fe9jrc2f3zsq589srnwz',
                isRevoked: false,
                expiresAt: '2021-04-18 02:58:46',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenClientId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                id: 'fec6c424-3438-4e91-adcc-69ba35dcb59b',
                clientId: null,
                accountId: '4afb1611-d356-42ba-9780-f45a0764fcc3',
                token: 'Velit vel sed sit sint ut dolor dolorem. Et molestias a sapiente dolore beatae assumenda vitae qui laborum. Id excepturi vel officiis qui est ut.',
                name: 'mhi1kfjdr3b6mtnbianqfrzr4n568bdt8hk0848gni48qnnpaqsf2wdtt45lobd9gt42haopcb87cjtbiicwliqxm2jbde74lcbuwo4kxcdyoo81roe7cm7mkjolhqa56ec5wql2n18a81btqwllhqc2it0airnjzlkomt1knau26so9i5vkex6thzyeeapxz6it3mebiszxr8yps0v2mv0yswe6wj2sd7vaq2n03frqoktnyhcdfnowst4cssl',
                isRevoked: false,
                expiresAt: '2021-04-18 12:15:55',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenClientId must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenClientId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                id: 'fec6c424-3438-4e91-adcc-69ba35dcb59b',
                
                accountId: '4afb1611-d356-42ba-9780-f45a0764fcc3',
                token: 'Et odio omnis ad necessitatibus. Ut dolores suscipit doloremque omnis quos quam sint voluptatem nihil. Quas omnis deleniti veniam qui quis sit. Qui unde officia tempora consectetur qui et ducimus incidunt.',
                name: '3lgwhs7tfk0ooy2dlqa25xahw1h26pt4ovr7l2qz4ijkjsdb6s1b6jyau9cs0rtol2pnjrkjwrwpcrrjkr0uisc2hjstfc16cka0dgti8q098ulsfw34tb1ezkz3bgmnby07pva2p7hjskhpvawjkp8bsvq9qzfbilnyh53e42eaw87bwcjuqnlbwpg0fah8rophm2r9hrpwkdh7d3xzs90poj9xj6pwqe9v9f1z1103evjmalacp5xxer569ch',
                isRevoked: true,
                expiresAt: '2021-04-18 09:22:15',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenClientId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenToken property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                id: 'fec6c424-3438-4e91-adcc-69ba35dcb59b',
                clientId: '534ee75b-4127-4711-bc26-53f4ca029a61',
                accountId: '4afb1611-d356-42ba-9780-f45a0764fcc3',
                token: null,
                name: '1ib9ofiqn5zg7jj4vzt8iaxsp24d0vmlgt4hyxc19s96fy3sn2hag5zuh8u2q59z9zw4apze6i5zxhyb06199avbovgl7oc74tyfkh8ffl442sg0f43qfnejk4em4coxjng7nnhg9e0anov95g7bxp8gmtuu9c7y8o5cw2jqxt24jkx3uispzr9v2qj876rpsdjmsg2qe249p40q74fxmm63hucqbeh9z06ch57qih1d2tn5jvru1y94jew919i',
                isRevoked: true,
                expiresAt: '2021-04-18 05:43:22',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenToken must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenToken property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                id: 'fec6c424-3438-4e91-adcc-69ba35dcb59b',
                clientId: '534ee75b-4127-4711-bc26-53f4ca029a61',
                accountId: '4afb1611-d356-42ba-9780-f45a0764fcc3',
                
                name: 'dboxs48g9n8u4nhd8x32aph2mbh3m4u2xiwqpmdshzl3n87wghvse8zwlndgrh6b8n9gk8sf5ebqjbjps15kitqx9irqi2qma1mae06zgn571fl6wrrp9q96t310mhllofor923dwdqdmn4qqq1z36fvijcp8a1ja1p1trjb707k1gcfzqlm82hg369z46isfzbv3rluxtks3451zbnoi0rrnnkw8az9vjazjjm3djjxh6kkqmidgsp3xb4ungn',
                isRevoked: true,
                expiresAt: '2021-04-17 17:18:31',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenToken must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenIsRevoked property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                id: 'fec6c424-3438-4e91-adcc-69ba35dcb59b',
                clientId: '534ee75b-4127-4711-bc26-53f4ca029a61',
                accountId: '4afb1611-d356-42ba-9780-f45a0764fcc3',
                token: 'Laboriosam ut aliquam qui praesentium sed ut illo non. Et rerum magnam. Ab eos reiciendis occaecati laborum. Rerum eos quia est atque quo et consequatur similique ipsam.',
                name: 'g3f3mb2bljwaphyrv97rl87f3ru8tl858ss464lbir9v9o8lhw7x3em7k57nxpzh6qliaye1xcg46odxulx7nl9altlunzzp9qnapt1fsarn3wxoxpdr1n2ih5a2o7774pq18tg5la90qm4wm9zhylde4m83gkt6c5z3uuoofa3lidjzu5pt97awk7mj78uohkihpbq0amqx7lgzztwyuqqd93itiwy4r3tiu5o3ru15yiddw9iqmrt91qg8w90',
                isRevoked: null,
                expiresAt: '2021-04-17 21:16:12',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenIsRevoked must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenIsRevoked property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                id: 'fec6c424-3438-4e91-adcc-69ba35dcb59b',
                clientId: '534ee75b-4127-4711-bc26-53f4ca029a61',
                accountId: '4afb1611-d356-42ba-9780-f45a0764fcc3',
                token: 'Et vel ducimus facilis. Quod sed exercitationem reprehenderit sit dolor ut debitis culpa. Ad dolores magnam ullam sed et omnis voluptatem. Quis non saepe quasi accusantium et aperiam ducimus molestiae magni. Dicta molestiae commodi.',
                name: 'e2m2p0mhivge14inkv7d8m5li297xm3pcyblwkexcqsap0a1db7wduhnxi5m7lrk87549ianu9vpuhy2z089kywo4542kwjar025rdfs0wvhzq5vgq2qimysqx1p0cw148kdvpurqogl2lphagbzmer6o7028colctf8ldhggg77tfj1xf810lctndaer7fhas4o32rl8er7y4yv6mnq0auq4448z27asfssre5vuhg378uf79hzj6b0a967hpn',
                
                expiresAt: '2021-04-18 12:23:21',
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
            .send({
                id: 'e22edwfa0wpop5qnolf0g38koxw92gxtsjgvp',
                clientId: '534ee75b-4127-4711-bc26-53f4ca029a61',
                accountId: '4afb1611-d356-42ba-9780-f45a0764fcc3',
                token: 'Voluptas sed ipsa non. Ex eligendi quae repudiandae eaque. Consequatur architecto voluptatum veniam. Id sunt minus officia. Repellat non nam quia ad enim.',
                name: 'utrj7dsqweodelfp3a4c6fdm5lki1z1dujiqallbjwq3vlyftp32snzszkj8s71htmy6tm117r2j8ar912xdw4dzpfifnaxdlo86cgwo3zhzx2giuk0twx3v56bbrujlhhle1ydypn5skp7p3pxixhhm8tf1rdl7uhstqh2v7i36lo7m20r5s82i6p9kiz04sy3vi0en8dmbtoyjevi0gnm882vqqhgmvt368peycymm6an3wn68dw20v76bgx0',
                isRevoked: false,
                expiresAt: '2021-04-18 01:48:44',
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
            .send({
                id: 'fec6c424-3438-4e91-adcc-69ba35dcb59b',
                clientId: 'n0ojwczadfrx7olkfx9axambfpooe3ihqs49h',
                accountId: '4afb1611-d356-42ba-9780-f45a0764fcc3',
                token: 'Soluta possimus nisi veritatis autem enim dolore nemo id tenetur. Tempora laborum placeat. Sint impedit in est vitae aut.',
                name: 'udl6yohkxape3ysg03if7phydcv7qspn3p4pm58upsetdorwjykiqjugaddatm3r16dqvn57mfl71g6od3qivnfgr8lawrprewr6lyi9wb18h5nz9awr3pdu2yy1j1f84ei1lm6emfgm4h7us7q8jtu8iqd0o3hdgiepgqeaq5yfm9f2dmq01nmdw16bbcb0go5rilqhk6vpott74gxp0vbhypi923mw7mnbjchvo9p1raxkiymorbhek22i094',
                isRevoked: false,
                expiresAt: '2021-04-18 12:31:22',
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
            .send({
                id: 'fec6c424-3438-4e91-adcc-69ba35dcb59b',
                clientId: '534ee75b-4127-4711-bc26-53f4ca029a61',
                accountId: 'lzivn3nrsea8weq5jbo86t6liekbj6rne2q2g',
                token: 'Quia qui labore sit quo id dolores dolor quos ipsam. Possimus dolores repellat consequuntur provident tenetur vel. Ab sit soluta beatae et sit modi consequatur enim. Architecto necessitatibus veritatis vel voluptates maiores est nemo aut dolore. Similique voluptatem ut velit aperiam.',
                name: 'tq0svjw39ji65ncwxu5ue0ysk76zxomdscdp9ebjcf1i39cmujkx32buafc54p5qtocrdfzger654427bztuepi7iajlnzayo4ngh83qlm911y05pakzghzaxnhre7ekb8bfg7pprtohybmjoptk4y6pojsp97br9mvyteqntotidr7xkoyjx93cpnm29wog0xk9qc1i2bm4lfitmuziyj2423ya4ts4qikr2u6yhkbvanwtlve7ep9giuaddud',
                isRevoked: true,
                expiresAt: '2021-04-18 02:04:25',
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
            .send({
                id: 'fec6c424-3438-4e91-adcc-69ba35dcb59b',
                clientId: '534ee75b-4127-4711-bc26-53f4ca029a61',
                accountId: '4afb1611-d356-42ba-9780-f45a0764fcc3',
                token: 'Iste sint quidem necessitatibus amet quod. Maxime culpa porro odit animi quo error ratione ipsa. Et hic fuga quam voluptas quae optio atque est. Et totam et quia impedit qui.',
                name: '7knwcetlhcssotw6ayh9gyhdlsu2vvhjbnjed3pjmxkur7wq18ckru0qex4o58h4kn2qcvy9hzbcsoapdfr4xvnup8js9g3ittz7qmo7b6o7h760yc9x0hrrymzvi5gsufk2ma6x0wen6onngfa9ybyxngza8ira0yi3t2ggu5vcyzuhymyv6apgs1mtii3ipkzgrr26qkctkae5njwej60tc0qg8xekgxncvyono8h8mxq17kk353cq7oemp8it',
                isRevoked: true,
                expiresAt: '2021-04-17 18:21:17',
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
            .send({
                id: 'fec6c424-3438-4e91-adcc-69ba35dcb59b',
                clientId: '534ee75b-4127-4711-bc26-53f4ca029a61',
                accountId: '4afb1611-d356-42ba-9780-f45a0764fcc3',
                token: 'Eum aut qui eum odit itaque accusantium et est rerum. Ipsa necessitatibus repellat unde quia. Laboriosam quo eos. Non voluptatem quae nostrum qui. Necessitatibus error aut voluptas quis excepturi tenetur qui. Et laboriosam tempore adipisci commodi.',
                name: '6l7h791ikos89q8n8rcnkzovxs09n3pco10q2x8y0xptrezgvndaw5tgyane1m61udgidf3eriufyu0npodbhme60plryrideov02u6lljbtphxs4xqtbkgrxhk7s3qesbnon44tq7dntzp67c2t9jd5e3vpy6qe1eli1v6hw73ssy8a2sase9j0kpglq810tcq7p2onblcldn7l8g7vea0om8plrrkdjx3l1llc5t0z3tiroirouafae68efq8',
                isRevoked: 'true',
                expiresAt: '2021-04-18 07:27:56',
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
            .send({
                id: 'fec6c424-3438-4e91-adcc-69ba35dcb59b',
                clientId: '534ee75b-4127-4711-bc26-53f4ca029a61',
                accountId: '4afb1611-d356-42ba-9780-f45a0764fcc3',
                token: 'Illo porro repudiandae molestiae. Voluptate ad molestiae iure culpa. Ut nulla sit eum.',
                name: 'vhf8glo6ebjo70gkuttkys29i0tw6uzekl3gdxod7j1j0dbofrmipujz33wtz53ql1op2gccyvc26k2i8fnkbl4jsi5trrhsmnszsgiikx6q8ignzyymxzbndj3pnth2lm533wsibfnva7tgwddyg5ee2dxhh8gbe2ke3bmy3j4jcvbu9krgvyjoud75kjdss4xmvtxt0uxgf6ktswfv4t8e8yg6fxntt8muv17pqr6qurgcs0zxuwb94x0tyn5',
                isRevoked: false,
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
            .send({
                id: 'fec6c424-3438-4e91-adcc-69ba35dcb59b',
                clientId: '534ee75b-4127-4711-bc26-53f4ca029a61',
                accountId: '4afb1611-d356-42ba-9780-f45a0764fcc3',
                token: 'Tempore ut illo sed sit rerum asperiores neque quidem. Minus molestias at pariatur autem et libero ut occaecati. Perspiciatis quo exercitationem cupiditate rem sint pariatur quo harum.',
                name: 'lz7ca7o31fziiab6ruwxxwo0nwtb9tntncy4cfpeisnthr4ywy6y9lrm0bvb7xvk15bpuodmyczupu2iz5uzbf3y7wzfasttqrk4exvfzb03o6jq6ow67xeumomqu7hy27zwyrm9xjo82rbw8j7ekzs5kh8prnf3640xjfd8rrr8gosfsferoc0tctoabxo1er1vujl21i8ejzt5fo14xsgw9rd1yhc0ycx1j9lsyylwdx0y5609t53hm32jdwd',
                isRevoked: true,
                expiresAt: '2021-04-17 22:37:09',
            })
            .expect(201);
    });

    test(`/REST:GET o-auth/access-tokens/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-tokens/paginate')
            .set('Accept', 'application/json')
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
            .send({
                query: 
                {
                    where: 
                    {
                        id: '85103f2a-f2b6-4b46-9cc7-4b0d57b58ee4'
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
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'fec6c424-3438-4e91-adcc-69ba35dcb59b'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'fec6c424-3438-4e91-adcc-69ba35dcb59b'));
    });

    test(`/REST:GET o-auth/access-token/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/67ca46a8-49b4-4f3d-91a7-e8cb0210a52e')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/access-token/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/fec6c424-3438-4e91-adcc-69ba35dcb59b')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'fec6c424-3438-4e91-adcc-69ba35dcb59b'));
    });

    test(`/REST:GET o-auth/access-tokens`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-tokens')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT o-auth/access-token - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                
                id: '039ddd29-a378-40c8-8cac-863af57b9f79',
                clientId: '9235c5c1-4b47-4111-8d2d-d3b69ce82beb',
                accountId: 'a0f967f8-d1bc-4059-85e4-e25edf3f594a',
                token: 'Ea minus itaque. Rerum consequatur delectus aut quisquam consequuntur ipsum est. Dolore quia quo.',
                name: 'hi3fqcoa257adbkviayne61nipkk502b6lg8yldqb5mlw0pmn4dcmcdszwob4ugqxuo9sn2bgbx3nq82ttey6zwta4xdm0oo8s8fa2brap7apvoir4dalwnznkvbol1xwfx13eutdu5rt1ig6yuhdnpvyuzlgvcxk632o1by948dm06g7yss8suhxrvrox7dhs9244ibwqaaxt06pxihnmbjta9efye0naagkalmjv45z0sf6xqbisy6pper5xo',
                isRevoked: true,
                expiresAt: '2021-04-18 04:08:29',
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/access-token`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                
                id: 'fec6c424-3438-4e91-adcc-69ba35dcb59b',
                clientId: '534ee75b-4127-4711-bc26-53f4ca029a61',
                accountId: '4afb1611-d356-42ba-9780-f45a0764fcc3',
                token: 'Sit minus beatae neque corrupti facilis qui culpa. Fuga fugit et asperiores eligendi est. Sed pariatur nulla est. Excepturi aperiam aut omnis sit eos illo deleniti. Excepturi fugiat inventore autem dolor fugiat. Corrupti qui voluptates vitae.',
                name: '3osd99as3tbnnsalln11gciuqx9lsa4na9it6530j6dom6fjimqfbs8q7fznw56kzf733d3cwi4v2rze6n6batj9ygtqe5gjgyiswjcfmccy07y2n9k2a16a70dwasp2rc1rwptuzalofm7bdm33vwgcci4usauwopx6w9tg0hp6rqctodccgabm748plog9s6l8axtfagm1aus15u0mainyh3btao6yjca8gg9x31oxy2isjnro7t0bii0mt9l',
                isRevoked: true,
                expiresAt: '2021-04-18 11:44:41',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'fec6c424-3438-4e91-adcc-69ba35dcb59b'));
    });

    test(`/REST:DELETE o-auth/access-token/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/0f87d2e2-4b5e-4d49-bb97-b2322623d0b0')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/access-token/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/fec6c424-3438-4e91-adcc-69ba35dcb59b')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL oAuthCreateAccessToken - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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

    test(`/GraphQL oAuthCreateAccessToken`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'f21222d4-d8ad-43e8-ba15-adadc36c3434',
                        clientId: '534ee75b-4127-4711-bc26-53f4ca029a61',
                        accountId: '4afb1611-d356-42ba-9780-f45a0764fcc3',
                        token: 'Repellendus odio aspernatur est ut iure qui dolor minus. Vero ab porro commodi amet minus. Cumque molestias consectetur vero molestias voluptatem aut.',
                        name: 'jv37qg88cq4rtdl3prj0a9zg51nqghceuahmtbbkdhi37jac9y1r99voc7pbn1497royaqhlhn7jjvuwlbsh3y0a89b0n4ukazplhb23uazzit27xcjy9s2mhp8m7fp4ipm20nk697264dkne809dua47ph1x58khcgnml6xkkubswakbmq1qlbe6pu9mqzvgf59bwy9fl9izdp6af88rfedrpqf4uw613d5pcq9qinbwtui4shsweeagr0bld1',
                        isRevoked: true,
                        expiresAt: '2021-04-17 16:37:28',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateAccessToken).toHaveProperty('id', 'f21222d4-d8ad-43e8-ba15-adadc36c3434');
            });
    });

    test(`/GraphQL oAuthPaginateAccessTokens`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                            id: '4efbaa12-bc1c-4e43-a9e5-f5ab5db40db7'
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
                            id: 'fec6c424-3438-4e91-adcc-69ba35dcb59b'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindAccessToken.id).toStrictEqual('fec6c424-3438-4e91-adcc-69ba35dcb59b');
            });
    });

    test(`/GraphQL oAuthFindAccessTokenById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                    id: '8416f061-8fbe-4d3c-8ee8-5060631d7575'
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
                    id: 'fec6c424-3438-4e91-adcc-69ba35dcb59b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindAccessTokenById.id).toStrictEqual('fec6c424-3438-4e91-adcc-69ba35dcb59b');
            });
    });

    test(`/GraphQL oAuthGetAccessTokens`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                        
                        id: '15d7b817-2426-4128-a0ce-a96a29a77baf',
                        clientId: '75a18738-924a-455b-8f1b-558535e537fa',
                        accountId: '06500324-4ced-41e6-b86b-6c591ec4177d',
                        token: 'Nihil voluptas nisi omnis et nihil qui deleniti autem. Sint qui sed ipsa excepturi quae et consequatur at laboriosam. Et et quae ut nihil. Voluptatibus commodi et. Eius ad non occaecati. Quo tempora illo ut aut sunt enim.',
                        name: 'r8raekngxmgtun0ywao6ua8lzqc00dr647523ph56ggayckk8qlvfn8vzy5apkdhpnc7f8ej3u0kchfuw45d6a4q3p0hdu6g9dborolpa7sacad8h851nng194kn1sk24txepp1wua29x5mr3atf7da0kxplwkasa3olyo0fkpk98h16ozrc62z3o5skgebbsg3ejllrjicm3288wbwz4e0gw11kjslhc9d9b8pq6z63u6y98wrao078rrjh7cs',
                        isRevoked: true,
                        expiresAt: '2021-04-18 08:57:55',
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
                        
                        id: 'fec6c424-3438-4e91-adcc-69ba35dcb59b',
                        clientId: '534ee75b-4127-4711-bc26-53f4ca029a61',
                        accountId: '4afb1611-d356-42ba-9780-f45a0764fcc3',
                        token: 'Et ad tenetur. Blanditiis ullam aut quia rerum. Quia harum consectetur perferendis nam voluptatem aut inventore. Deserunt quia delectus quia. Temporibus possimus et libero animi ducimus impedit sit.',
                        name: 'uppi7nc602kb96ezguq6rqqo40ido48ibn7ba8cgu5zr3383x4lkggaafbq7ucjrk51mhm0hosupoliiaimfbpk60ivk0aytaosf87josadtacay2yntlx2cmoebukcvbknzxgrb51sb1ouymj5kfokyzd5b99t38fe1r0uuosi9cvbx145y9ahjxcr6q49tkpcr1cgk4vqmr8323enyfw9qn6f7ml2te55auf4dypxbujy7yfp22fscj7fuoy9',
                        isRevoked: true,
                        expiresAt: '2021-04-18 04:34:27',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateAccessToken.id).toStrictEqual('fec6c424-3438-4e91-adcc-69ba35dcb59b');
            });
    });

    test(`/GraphQL oAuthDeleteAccessTokenById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                    id: 'ed086139-d3a1-475c-9c5f-78a9d9768aa4'
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
                    id: 'fec6c424-3438-4e91-adcc-69ba35dcb59b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteAccessTokenById.id).toStrictEqual('fec6c424-3438-4e91-adcc-69ba35dcb59b');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});