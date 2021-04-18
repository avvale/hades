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
                clientId: '6a926149-1442-4677-9fe2-bb9eb2efbfb5',
                accountId: '23870970-6803-484e-8e3d-0f1637af5f10',
                token: 'Assumenda veniam quasi quaerat excepturi. Expedita et placeat id reiciendis et consequuntur sunt et quaerat. Quis amet et impedit.',
                name: '56e0a0edf7zxg7sgsbyjxnw7hdg33iljbz1dhi2ffss1mtis6uz54ha4h8wzuzl8e3uvkqeiyf5cnqlybm0nhiiplyedrsejparxytiw6g6vzqvilellx0vqws24ihmt9p0jcoa6rsyvrcfza26s6izfxy1iwqhovwwa80p76fmuul4jz4btk5ebuo9w1nnmawmbreiaug6yft1yyqzz37kxzxldcx3hi28xhq2x49vbbejgt9y71gh011umghs',
                isRevoked: false,
                expiresAt: '2021-04-17 16:51:42',
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
                
                clientId: '6a926149-1442-4677-9fe2-bb9eb2efbfb5',
                accountId: '23870970-6803-484e-8e3d-0f1637af5f10',
                token: 'Reprehenderit at modi est aut quam. Sunt est explicabo vero quae voluptas commodi deserunt minima quo. Explicabo debitis sapiente qui dolor eligendi aut enim dolores quos.',
                name: 'biuz60jcc1k02nlhudo0k9osrh7pms895xjboq7723aipoc6yymajlh2w77qg0xy7jkzu9z9ojqslpipezji5fu32n4d3c6bb253wqo750y8mqgtt1zjn48wk52p13zrdd5a1msm7l8hps37ozmwrpnu6sgc83upln1ni3r2r1mq0g93z2abib9qnz8rdlkplepp8prov6of8io62bpr7kqdqz0h7c6l5p7dq6icvqyns2hqyf0z4l8rd23vn4o',
                isRevoked: false,
                expiresAt: '2021-04-18 12:28:48',
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
                id: '2425b6ba-0741-42cb-be8c-e5c33cd60b44',
                clientId: null,
                accountId: '23870970-6803-484e-8e3d-0f1637af5f10',
                token: 'Enim minima nam. Ad molestias et hic veritatis qui molestias. Omnis dignissimos amet culpa ut. Qui non nisi itaque iusto. Eum rerum sit ex in dolorem numquam. Vel voluptatem earum sapiente nihil doloribus ullam in.',
                name: '76fivdp5z383k1zxhgw88qomrjz8ulbsuovckhczufhjl13fz16v5kcm1o0ppap7lq9vmcprcfydx6dcuvt6lx11rsf9ep9f2dsncr9p210koeh6u280r9kzg3ah8nu7ezpffwx170ggs83ppm027txxb0w5k0mhtzwc2q3st7wqpq9vz7ssa6dyulzzz8vtamiha2akul7pf4d35vbqt2mabyswex0utscwaxy5e93i6y160rc4pbka9v1is1s',
                isRevoked: true,
                expiresAt: '2021-04-18 09:21:25',
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
                id: '2425b6ba-0741-42cb-be8c-e5c33cd60b44',
                
                accountId: '23870970-6803-484e-8e3d-0f1637af5f10',
                token: 'Omnis delectus mollitia expedita iste. Magni alias quia ea et veniam qui. Ratione et dignissimos suscipit delectus veniam aut enim iusto numquam. Neque eaque mollitia est enim hic.',
                name: 'haaeo84jutee0uoltxvo1c5cqafub5plpb5a0q92dula99b7leatye6slczfgu9o3r5ztz4zag6mocvb2bo50h4chjq3tfn5efb5f1unpn8d1iy42r0hek9j7dfawh743ryjhhsok6znskv2isok7q9wrxwjp9bz2jcn60nuhvdxd9ghhryihds5hcw9x7z71wlwm9wmlb6pkup5s7r36x4yu8xxw52jgkxzs5c7n4co4b7ivzmkegdxlolwpqe',
                isRevoked: false,
                expiresAt: '2021-04-18 00:53:29',
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
                id: '2425b6ba-0741-42cb-be8c-e5c33cd60b44',
                clientId: '6a926149-1442-4677-9fe2-bb9eb2efbfb5',
                accountId: '23870970-6803-484e-8e3d-0f1637af5f10',
                token: null,
                name: '3c6joufd9qz7pykd8dim0bpw0s1huibepe5uos2gngu0rd5ie8k1i2t56n2lhkpjnyjstmcscn2l3lgihsofdpit4bqn4nnk082h3107pt0nt9tomh47rfafnqp3wu77opt7ma9oi538carjs113qo6lyyfh65hcq4orxerpl1u3sren2v9bvjtoebnor5wzrlekh326dr01usriodcvvh1ysr71v4z4w7870j8gaha0cjsjcp8bejb5v539pn1',
                isRevoked: true,
                expiresAt: '2021-04-17 14:39:20',
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
                id: '2425b6ba-0741-42cb-be8c-e5c33cd60b44',
                clientId: '6a926149-1442-4677-9fe2-bb9eb2efbfb5',
                accountId: '23870970-6803-484e-8e3d-0f1637af5f10',
                
                name: 'm8binu3ql7z23v8qcs06wfo5xcw3sy033yblmdb1ppbrgnwx7cs39pf3rngjpnyccid87zjilc0lcnw44nm8ypcl9hnaarhuu28zqn3z5bj3reacrhp6algiirhx08kis1kw7xnhhjdpjv6uvgpvpna309dvrgf62adctfzgnbjk4xxmjfkwdus55joklsg0birh6flc2fkyrmw8urz442u1ze932culc3i893g4i9t4autax1su3d5l2183087',
                isRevoked: false,
                expiresAt: '2021-04-18 06:01:26',
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
                id: '2425b6ba-0741-42cb-be8c-e5c33cd60b44',
                clientId: '6a926149-1442-4677-9fe2-bb9eb2efbfb5',
                accountId: '23870970-6803-484e-8e3d-0f1637af5f10',
                token: 'Quis ratione qui. Modi voluptatem tempora enim. Ipsam placeat est temporibus tempore optio. Tempora assumenda quo.',
                name: '6xly1bk15t7x2911mibff3mmjla04cyiaoq72t70la5o6k76ynigbf75ajckotnfnkri1ud0mmf60rma4nqmarxfoout5361ebkr3upjgu9pvwgwkumag5si9ri0gaav7t0lwuqx7sfodojw4b8a8aujvefetl8171wxzbieckg58hr6x9k29hptlquj6i0zol46s9z6o5acfdmp856u20h4q1qm5s8dkhc4k6ur95t6oh4we2avq1f19q3c0b2',
                isRevoked: null,
                expiresAt: '2021-04-17 22:59:48',
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
                id: '2425b6ba-0741-42cb-be8c-e5c33cd60b44',
                clientId: '6a926149-1442-4677-9fe2-bb9eb2efbfb5',
                accountId: '23870970-6803-484e-8e3d-0f1637af5f10',
                token: 'Est velit officiis suscipit aut iure cupiditate fugit. Qui ipsa earum laborum voluptas dolores. Quia mollitia et ut error alias corrupti dicta est veritatis.',
                name: 'n9i4fternb36p8whbd54ewq93izrntempm5atyw07mc0g4uncgy3au9zninco4h2018b4in47xzxxym3mgwshokj9gfrxkda7lwzin219xy2nlaa9v5y5uz4pnkanxnssfc76m9jh5lrg8h4kxa2p0u6aycbo3uy1klgl5ol570p4xazz50pa77ghngub39okfojeggdotigqx8old3emwi2kk3lffjh0ngu61i75cqk3hu3z02z4yg2idkhrci',
                
                expiresAt: '2021-04-17 23:21:48',
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
                id: 'bufsacubfzoo6ord87wkoe8dytr7vwue40n5a',
                clientId: '6a926149-1442-4677-9fe2-bb9eb2efbfb5',
                accountId: '23870970-6803-484e-8e3d-0f1637af5f10',
                token: 'Libero rerum voluptas qui officiis sequi voluptatum cupiditate molestias a. Quo adipisci eos. Iure magnam exercitationem. Quia facilis accusantium occaecati. Qui nulla beatae labore eius aut blanditiis debitis. Molestiae non velit distinctio voluptas voluptas quam.',
                name: 'zx3yguoqedr1c368yeudh2m45j9q4xo1da4rgioqut8plerjowb8vsp4itf16w9ui0qvcgbwchz3yf7cc0ukvoawboj2stduaytjfwa6cossfo8zr59kgtf2zhmcdwm62etqb9wy6gs30mb2iyoite096ffvoqja874tel6mlb5qnjc8a9t9vv9xhkpze14j8232edy87ncvg77ugbaih6v3jvzj17a4fn1jaz1mcm032dmhhzjr3cy21g1exli',
                isRevoked: false,
                expiresAt: '2021-04-18 06:08:09',
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
                id: '2425b6ba-0741-42cb-be8c-e5c33cd60b44',
                clientId: 'rq8hbvuqgqf1xngbe22i2r6wry191ux90pxpv',
                accountId: '23870970-6803-484e-8e3d-0f1637af5f10',
                token: 'Quidem assumenda veritatis nostrum doloribus et doloremque architecto. Temporibus eos debitis sit rerum doloremque sint suscipit natus. Ex expedita ea qui voluptatem molestias. Blanditiis eveniet fugit optio quod accusamus doloremque et beatae assumenda. Et temporibus est esse quo dolore.',
                name: 'm58q4wunw9ha1rzick7pveoxuqnfizt67s2nq1ak3og669jwo0svkdh77r3kqtc2kjvv8pm4a52lhu75l1uv3xgljclgds9swrrpbpj8j8enymjbdem48dgvryi9ku2anw0f1v38vwxowuwvzg70ijy1c1l2o01spwq4aummkpkavnx6ijj626awyubfnbj4z8h3alkj39yvdcvtnslfoks3owkunz229y0zwh3v0h0r760spfpqybosnhhf8v3',
                isRevoked: true,
                expiresAt: '2021-04-18 12:08:25',
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
                id: '2425b6ba-0741-42cb-be8c-e5c33cd60b44',
                clientId: '6a926149-1442-4677-9fe2-bb9eb2efbfb5',
                accountId: 'af6gqcu7jb5byz9ohbdb1y2xcucu1asc82kdf',
                token: 'Reprehenderit occaecati minus corrupti. Dolorem neque quos corrupti repellat. Eveniet aut repellat at porro a vitae vero. Corporis vero placeat labore. Sed quas cum ut quo est odio mollitia. Ut hic tempora pariatur quos.',
                name: 'bj43ksq3vzm92vis9fvtqrwsddfl3vcu8dmdsaom3psu5d5z59lzw877rdn4605aaky5aotk58rmb70jd57y9qrp65vgasa01io4xg5oc230ool9cyfokco7fcpl5j50tloea13ew71d78rcd9syowj5swcnky8bdegqdjwo5ya1zgclkxfde1ouvlkk0amgnjrwqdojjq4nks0vhxt4fialhzpxuejr5xpdale1uwx66yybw0pg89l81relypi',
                isRevoked: false,
                expiresAt: '2021-04-18 00:39:16',
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
                id: '2425b6ba-0741-42cb-be8c-e5c33cd60b44',
                clientId: '6a926149-1442-4677-9fe2-bb9eb2efbfb5',
                accountId: '23870970-6803-484e-8e3d-0f1637af5f10',
                token: 'Error impedit id voluptatem harum quas eum quibusdam repellat nemo. Dicta et id quisquam. Et neque et deleniti et aliquam tempore autem.',
                name: '4kccp8rx7dlc4nbkzxucybcaxzz20ry3efo1x670mwafz5g1yolliielvv00c94uw7x4fj792jcmtceoado3k0yvz156try89jzitvju6u46xtlrzw27vdv57dnxm3ol0bo01lmcp409v9678gfayxheqppryd99xn08ia37b68au9c2j8xvv0bnc47t2c911xyi3qkm8rzaq9cwgzxtez54291jl6z4cc9qzrjqi1jqkimqlzlvjhn8gteecot3',
                isRevoked: false,
                expiresAt: '2021-04-18 07:12:13',
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
                id: '2425b6ba-0741-42cb-be8c-e5c33cd60b44',
                clientId: '6a926149-1442-4677-9fe2-bb9eb2efbfb5',
                accountId: '23870970-6803-484e-8e3d-0f1637af5f10',
                token: 'Dicta quam earum dolorem quo ipsum omnis sed velit. Similique laborum ab repellat ea voluptas est cumque. Et qui excepturi magnam dolore ut possimus quasi sit.',
                name: '4co22b578qwa7s8jruxgddy8shny6jpjw73cgmfzyjkrdkdpw8whe0ucftkfg6ahglymkrz2tlqfm34jf3k8sq1tvgk5iuttg54rsl9z87svd6sn0rmm8rma0sssdqkws4qzge8n0qmml4inkif7mi7erbdpzz89uz4xm7d3j8fyocnpuj9ly5xrsskbn2ib2rc7e1oldykjgne38cwyql9xtcyoq6yib9wyk3xtke4hrksfhp6dg7cimgpjfo9',
                isRevoked: 'true',
                expiresAt: '2021-04-17 17:49:30',
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
                id: '2425b6ba-0741-42cb-be8c-e5c33cd60b44',
                clientId: '6a926149-1442-4677-9fe2-bb9eb2efbfb5',
                accountId: '23870970-6803-484e-8e3d-0f1637af5f10',
                token: 'Laudantium assumenda incidunt accusamus fugiat adipisci unde ea. Temporibus quia ipsum. Ipsam qui maxime et distinctio.',
                name: 'g4p2h0budk8jzgq0bbvfkker3aaif82zopyqt5r9kwbdvezbq6n45jsjy8pehpkkdx63ytwmgly0t1m1pmi3nhhb9br0n4b9ez0f8oydpaakmc2x4gc4ey9fm7nep6fhglr81k0pmyovi5x0wxfzcy4u8sysb73e6akmw1tlkz5kellanmjvor4a7zhfdt3glnmeyv57tm8rvaeh3fi9qhi6iemhw0ufbm9jnoppa04cqn5xbpiy7cllxe1qv9a',
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
            .send({
                id: '2425b6ba-0741-42cb-be8c-e5c33cd60b44',
                clientId: '6a926149-1442-4677-9fe2-bb9eb2efbfb5',
                accountId: '23870970-6803-484e-8e3d-0f1637af5f10',
                token: 'Est nesciunt minima voluptas vero voluptas eos aut aut. Cum ut velit ipsum excepturi qui. Porro amet quia quae rem ratione. Similique voluptas possimus aliquam temporibus qui eius praesentium nam hic.',
                name: 'fgqevpq8i6gn9qlly18r5u1rkivxr9fuob9h9n4hy5tgxsyr6gzdhbfo25xt5e150fme4c9l0oupph88ap6ysjcywdjrsul3wj3b2tq97icntamw5k9sm05bzyglc45r3i8rd8x2h25m10xhmezfwk7qpkcknts9tnqniivkt11kkq5ys5yv7kn09w65139l95k0vx1rzgvszhszzzameek18ktdc8glbzik9gnjytexjogeu8o2vxzbjulusqz',
                isRevoked: false,
                expiresAt: '2021-04-17 13:38:27',
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
                        id: '85914b5d-56a6-415c-853d-e66e37cc6a44'
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
                        id: '2425b6ba-0741-42cb-be8c-e5c33cd60b44'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '2425b6ba-0741-42cb-be8c-e5c33cd60b44'));
    });

    test(`/REST:GET o-auth/access-token/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/c8700db0-250c-4756-a53d-14d57c7481b5')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/access-token/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/2425b6ba-0741-42cb-be8c-e5c33cd60b44')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '2425b6ba-0741-42cb-be8c-e5c33cd60b44'));
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
                
                id: 'bf6c3840-f041-49d6-8289-c47a3d2236ad',
                clientId: '3808edad-482b-406b-9dc2-bcf61de982d3',
                accountId: 'fe86adea-a265-4109-9b6b-ed06a06cf934',
                token: 'Et eligendi quis vel eligendi omnis mollitia unde consequatur. Perferendis ipsum suscipit necessitatibus facere voluptas vero quo saepe laboriosam. Error culpa nulla in molestiae qui est. Omnis cupiditate sit odio animi cupiditate animi debitis pariatur consectetur. Perferendis reprehenderit velit hic qui ut pariatur qui itaque.',
                name: 'ptht6wrhek55h3m9emrfsfvzayt2bn4xixq85uvwcvkfcvftuq3wjqkp26ckwdxn2rt7c1zbc0qr0cepiglebgrxf2m53wy7zgq3wc6fhaaldc5aus629l431djvdxhuduw26wznnp26ebisnw5q2qgu7fzyv17kayd4wsnjhxgjg7lemh18sa23yj7f9s4ak7coebpdkn70r7eobyuvrn6kdy859nzjpib4706t4krsdq3f2qyqys7bd2aulsl',
                isRevoked: false,
                expiresAt: '2021-04-18 00:40:22',
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/access-token`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                
                id: '2425b6ba-0741-42cb-be8c-e5c33cd60b44',
                clientId: '6a926149-1442-4677-9fe2-bb9eb2efbfb5',
                accountId: '23870970-6803-484e-8e3d-0f1637af5f10',
                token: 'Qui id dolorem odit. Explicabo tenetur earum eos ratione dolor esse. Eum non quidem nulla.',
                name: 'uck0gog05k78wk2espnhjrsijpx8lcq8j3h940ujdrocpdo0nc643tax8ppvnuxeh7jub6ryfp5m522u3pua1llpkuadldln0scx0tzsrrjy30cyeljmxvyul5aa6wkg3518g1k6x2p0f5w8tbscwfmzstyb3wn7y3uo6f6v0astpbmhbxkdivkblupmaj8b0s1j3u2xuwrmwl6yj7w76fyh55lft7ssuv5ipm8787ubtjzgwdthb0z7rl8bli4',
                isRevoked: true,
                expiresAt: '2021-04-18 01:59:16',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '2425b6ba-0741-42cb-be8c-e5c33cd60b44'));
    });

    test(`/REST:DELETE o-auth/access-token/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/105dc794-08e4-40a4-8de0-59abe4d11232')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/access-token/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/2425b6ba-0741-42cb-be8c-e5c33cd60b44')
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
                        id: '311ac24c-84b6-400f-b0fd-2229b741adb7',
                        clientId: '6a926149-1442-4677-9fe2-bb9eb2efbfb5',
                        accountId: '23870970-6803-484e-8e3d-0f1637af5f10',
                        token: 'Tempore ut impedit quis quia voluptatibus minima ducimus et. Voluptas et doloribus. Veritatis illo vel assumenda omnis dolores ut quas. Quod aliquid deserunt. Occaecati nihil mollitia reiciendis cumque.',
                        name: '60z0bcytp5rezlbee4tb8yghg31lgaxojj81s6l7s55dr4akn8zxr7uo4wig2y9knffmukvwzk8erg1b9opavkjr7eb7xt90o3dk3e12qhnsd0zdd5zwz3rip5nzsbejikgkcg1l13qjp6rkmaxmg3klhdsg4cj8u9gcjjhmbvpp792i8id8qbr6l8dyd63xksun9wg6dl9b99nhww8jcyu03r2vz0xdx7xfqow0epfra3zf8pxb4kvde93kz57',
                        isRevoked: false,
                        expiresAt: '2021-04-17 19:59:40',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateAccessToken).toHaveProperty('id', '311ac24c-84b6-400f-b0fd-2229b741adb7');
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
                            id: '0eea99fe-7c37-41f8-806a-bb631b94be5b'
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
                            id: '2425b6ba-0741-42cb-be8c-e5c33cd60b44'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindAccessToken.id).toStrictEqual('2425b6ba-0741-42cb-be8c-e5c33cd60b44');
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
                    id: 'd1ee3701-5816-440f-b94f-ca8cff313716'
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
                    id: '2425b6ba-0741-42cb-be8c-e5c33cd60b44'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindAccessTokenById.id).toStrictEqual('2425b6ba-0741-42cb-be8c-e5c33cd60b44');
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
                        
                        id: 'b4dc9c09-66a0-40b5-a763-da428938d719',
                        clientId: 'dd8b3ae6-8281-423e-b0b0-91ab85297cef',
                        accountId: '1a3fb4bc-8a03-4173-a631-e37a4ea68bdb',
                        token: 'Voluptas pariatur velit fugiat perspiciatis adipisci omnis dolor error. Velit voluptates culpa quasi quo. Cupiditate consequatur quisquam. Aut porro est accusantium.',
                        name: 'gz0lgrwumawe4af847xanbti52h4f6x4pls7xw98eguzdrdgtbr68mdae5zq9nu50kf4wehnanb5uu8mz8krshxvze4zwos202dwt3f20mhjqhmqor2e95hp447qwownst10fl367tyi1m7nezwj9soix5own15z4redxpnnoz4x3jhp761zd1pc9upcn7p473d76xkmum7jtqmpe0ex9j3uubj9patcu4k052ls8nywafc4bxfvxkykgkwqd22',
                        isRevoked: false,
                        expiresAt: '2021-04-17 15:34:50',
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
                        
                        id: '2425b6ba-0741-42cb-be8c-e5c33cd60b44',
                        clientId: '6a926149-1442-4677-9fe2-bb9eb2efbfb5',
                        accountId: '23870970-6803-484e-8e3d-0f1637af5f10',
                        token: 'Nesciunt eum possimus maxime et. Delectus dolores atque nam. Vitae odio alias magnam earum et. Quae omnis id amet. Et voluptatem voluptatibus id atque.',
                        name: 'ke92breiix1i8eyad77cgekdz2yh142my9jbb2yevmt4o6mt7c9k0wiyp3ltmbdw3f72vsg4w71awj79sqxp4ohhpkqb348d5d1900v0y9apyzz9zzt0intcx3034od6o95svwo3xixd59adbdz8e6asgyrra2sjbsf635qz11vitu8ktodvvk4e6vmny79xq16kp7tslrf0mzlpd97kaxt4ut5nya9soxj16i85h5ik46dvkx262ojp8lyijls',
                        isRevoked: true,
                        expiresAt: '2021-04-18 08:56:24',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateAccessToken.id).toStrictEqual('2425b6ba-0741-42cb-be8c-e5c33cd60b44');
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
                    id: 'a5207135-2fce-44d4-8740-d67c0e0ebb8d'
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
                    id: '2425b6ba-0741-42cb-be8c-e5c33cd60b44'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteAccessTokenById.id).toStrictEqual('2425b6ba-0741-42cb-be8c-e5c33cd60b44');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});