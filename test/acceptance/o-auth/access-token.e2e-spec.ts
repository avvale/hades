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
                clientId: '7cd4ed81-8c63-4b05-8efa-3e45aa4d9dc6',
                token: 'Voluptas commodi quis hic dolorum repellat omnis aperiam omnis. Culpa ipsa voluptate pariatur sit distinctio rerum sint exercitationem deleniti. Asperiores eveniet amet. Qui dignissimos voluptatibus consequatur laborum repellat. Id velit qui.',
                name: '6t8p7afvm574os0558t74c19qkxdr7a4inx2gkb7zpsixyet6qed0e2c7wy5nuj5ovkqdbhg1tq9i65i2swtxgcefn4qum5brpzlsjh2lacd2jzusnpzov8vi0g0do4f878l7kznma1nel86uxn3a6ixm30a12a3xcd31r6e6yf30hb0oc7uaqd0djt9a87q9w1rfqplvyvb03wr2kwwa0scmszysp8up3akc1gjxtv9e59quou6hlhprrzbxkk',
                isRevoked: false,
                expiresAt: '2020-09-20 00:38:37',
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
                
                clientId: '7cd4ed81-8c63-4b05-8efa-3e45aa4d9dc6',
                token: 'Optio tenetur aut ratione accusantium aut molestiae libero sequi hic. Ut voluptatibus aut consequatur blanditiis quibusdam optio. Quia sit dolores placeat nostrum natus ut est non. Dolores laudantium reiciendis dolores ea accusamus. Optio corrupti aut.',
                name: 'ytoahiqpvzyu3fs5jcr0vjsx43ywjrfkv5xgqt260i5fu53uk60iuhtjzblqo7smdu79dgsnmew4au7jlhojgtdqp3zo6do0ynf3xb5f9507m46lucvtptjzedpi8alxnwmpwhoi4q5l320dw1qlaok3bqo989jldnahmg04t13rpm7lct78gahw4hoy553wv74arq7r25eq43h0vmhfu1ghmyxp2m97vxjt2ugrz84gwd3z6oicrdm1v8zde7q',
                isRevoked: false,
                expiresAt: '2020-09-19 18:05:03',
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
                id: 'cc9fb6ca-b741-42f4-8511-9b4058fb6c38',
                clientId: null,
                token: 'Nemo accusamus voluptatum architecto neque quos nam est. Ut recusandae laboriosam autem aut occaecati et suscipit. Nulla aut vel sunt sed voluptatem et ut. Cupiditate cupiditate vitae.',
                name: '4a5pouv3ory8vmrv2h5nziwvs3u33pq67pby2xpcdsn1eei5tx88k30uciajjz9p3cqpffpel1edljqqq7oxm9cy33im28ffzoqh008fgzjn9hxsvylxh87qbflkq4mf3bqvfv2wecj8jn8dqrwla2a65fb9q6zxbfa3q31hjt5mz79b79tw13fjzgevxxbgunp79qq31lsz2io39tlwkv1yqqft41buoogbmw45phxnp2j7lp5rc1hq1nxizwf',
                isRevoked: false,
                expiresAt: '2020-09-20 07:20:38',
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
                id: 'cc9fb6ca-b741-42f4-8511-9b4058fb6c38',
                
                token: 'Qui at a nemo. Sed doloribus est. Tenetur quia maiores. Earum iusto autem veniam quisquam et. Earum beatae est dolores.',
                name: '68sahmsw2anawjypo45c2p8rgf7emi2ywxrq1lvtnxs3sg7xqodb6vklsf4tnyha6o7p6vimftcucwue0ydnt0ajotc4ud3qwtksz6f88d4rq306lpto62k55h85oge2tbdfjx18djpvqrfa5pld7s08oqgtxft7mtom8q54ghpx2v7o192yfee99wyn6tnhml9kyhlao9qyj49gf5xc3hdjkddv8uzttoqxhv8jxct8eh3w98sh581xqo55hh9',
                isRevoked: false,
                expiresAt: '2020-09-19 20:43:52',
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
                id: 'cc9fb6ca-b741-42f4-8511-9b4058fb6c38',
                clientId: '7cd4ed81-8c63-4b05-8efa-3e45aa4d9dc6',
                token: null,
                name: 'juc5gy7lc77xvp759j9nl6nhb84phovkdngofv89xb35bdk8jy3918g601fby5k3a0xbtn1kbit008o0bnywwmknlbanz8i1lz0arbb4u9s7dhpebhbl0ifgv8x1dw6hohnwpos7x36t1vwxrqzhwll6pfe9x01wq9qzwvki5pqu7jx852ayiewuol0j6ll6cxf2cxh6qy80diedbig95yf1huivruwdmk3k6bgujawi2g6kmkrn8ig5l5bwqe0',
                isRevoked: false,
                expiresAt: '2020-09-20 01:54:01',
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
                id: 'cc9fb6ca-b741-42f4-8511-9b4058fb6c38',
                clientId: '7cd4ed81-8c63-4b05-8efa-3e45aa4d9dc6',
                
                name: '0at2h3c5vd65uocx27pc0213nzme2pq5ljnbyao09rp08dxwdwnm7m89fwwet00g3uioujfiyzjb2jw546p74voytfef8s3j037eae2z4t72yymazvig7ysp7arhkrflf9n6qr3ba6sysbao2j8ykgiytih9thdgpok616dhnhddjfaffx3q3ol082vc2lrrxyqmsymxaaag633ym70fnfx26mudfm4ultmmtiwg3yr400rr05ul7ox1srqqxvy',
                isRevoked: false,
                expiresAt: '2020-09-19 22:19:00',
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
                id: 'cc9fb6ca-b741-42f4-8511-9b4058fb6c38',
                clientId: '7cd4ed81-8c63-4b05-8efa-3e45aa4d9dc6',
                token: 'Impedit dolores harum ratione sint voluptatibus eos et sed veritatis. Est omnis doloremque occaecati. Itaque impedit rerum est repudiandae ipsum. Aut blanditiis est qui ea placeat libero dicta.',
                name: 'c992gqf3863k4bivfprtnofx0t4m63cb6t6719gaj8gwbgx10l7dsn021i6nietkpp5hzpvbnxr76xon4wsl7rvef1i4cz7idcppgfjldkv5xqlrrzxzwdea4puagnrhr9xlxyhppjwq6bf5etjt7ufxb0ojruoijc5objggul847eurftfbx20tyeo00hwm936vihov390fxfdx7qt8wxzm9eo49ipfjkx6zf9thw30ajq72qvaxwt3stjcyky',
                isRevoked: null,
                expiresAt: '2020-09-20 10:06:14',
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
                id: 'cc9fb6ca-b741-42f4-8511-9b4058fb6c38',
                clientId: '7cd4ed81-8c63-4b05-8efa-3e45aa4d9dc6',
                token: 'Modi debitis odio a accusamus sit sed quibusdam unde. Consectetur quae quas ipsam quia assumenda quidem omnis. Quis beatae laborum alias.',
                name: 'zjmzcsqceyi8i3urjjmp24a2iyb0hqawnog4j4ui8xohcjg6gnnpe0hzejbki8o4lamutdk5kj8qenzetvqz8ddx3huuwo4g4ijor93p5ol4rp9n2rs6e66jhjx5qz6u47cbwiuwt7ti7su1tf5gks02bk9vkbdu9uxo2ow0gibw3uai54e95par6isy8cmq8j5ma0mu0x1plgh63z4uuvsnii7j21yxcdqg3f3lidshwh7oqt7v12qt3kgmdv3',
                
                expiresAt: '2020-09-20 11:28:21',
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
                id: '3p41zcpispcpbmuoidyd477xerq9cog09lsrf',
                clientId: '7cd4ed81-8c63-4b05-8efa-3e45aa4d9dc6',
                token: 'Et dolor quibusdam qui veritatis corporis. Veritatis eveniet laboriosam. Quos vero ratione recusandae ut. Suscipit dolorum sed. Facere cum omnis sint iure reprehenderit cumque sit.',
                name: '2u56fboc3qhgh5i69s5ttyele25ey53gzqfy0m6sz71w48jlq4puphiuse6m2bklecyydn3w2nsiux6t6qscbiqvnw5i2vzxdazp3szjo2ip10kukmkxlnlelgri5mje2bb9t5vcio5owot2irhw50n4pouovsvh5pce14q9n82ympmhv26ksxgq21f8wpc3efhu6kxgllldicpi2nskcp4zkvct97b4mmt8trqfymu10a3pcl1ziwn1oznlbe1',
                isRevoked: true,
                expiresAt: '2020-09-20 00:55:32',
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
                id: 'cc9fb6ca-b741-42f4-8511-9b4058fb6c38',
                clientId: '8n5s3ucigifq7i4by4sxweq4pqlfdanb2lfpk',
                token: 'Culpa in iusto voluptas cum quod a. Amet sapiente autem suscipit fugit rerum. Corrupti temporibus nulla quia illum aut ipsa ipsa. Illo fugit deserunt nihil at.',
                name: 'qxqvta46lp2w2igny9x8vid7frxj8gqpv1d8hcq6iyuhtygrpua6cjjvdqwultdo02v32zra4mss7nzlyl1wdq48oqklp9nd6mer6gizlxa77kbua5aaa4iidbhcisozys5rarcnxr33m5h0d0hw28rlcqeao8cba0y6tkj4dvkgfvfq047r7obvy4f391nhquhhl780p86p8luor0srfq3bj90qqmo656eg712mr19tfx9s2opph8zxb3vvphw',
                isRevoked: true,
                expiresAt: '2020-09-20 11:37:58',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenClientId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                id: 'cc9fb6ca-b741-42f4-8511-9b4058fb6c38',
                clientId: '7cd4ed81-8c63-4b05-8efa-3e45aa4d9dc6',
                token: 'Eveniet cum est et repellat dolorum sint nesciunt sed voluptatem. Voluptas totam ipsam alias iusto nisi neque. Rem minima possimus doloremque eos. Sapiente officia qui et qui veritatis ea doloribus. Nulla rem nobis corporis aspernatur eaque quidem.',
                name: 'eijpy9wrlckuqb0kwvj4jnfov8vafa8w1n1mfie5it8gwh01b3aga1o9hew0wk5xtmh7agbqtygcwn8lv68tf9eqipncp4j63xhbxkc12zpqtn0o1g3k3rz9j5a58b7tce87bz8xrghp4zgjf93vpvdy9d3uj3g10vdpggegp2qun8z3i1lkso1wxabddusgx8d2w1z4c0r1gn8ekki0wghqb1yso55o4kc397lveou8otbgdltpi58hhv83kn6j',
                isRevoked: true,
                expiresAt: '2020-09-20 13:54:31',
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
                id: 'cc9fb6ca-b741-42f4-8511-9b4058fb6c38',
                clientId: '7cd4ed81-8c63-4b05-8efa-3e45aa4d9dc6',
                token: 'Quo quod aut id quia nihil ad dolorem. Porro iste aliquid et. Molestiae architecto inventore quia. Quia eaque nihil possimus expedita officia aut et.',
                name: '682ff5rtixihmkx88wizir4rar8hdfaua3cugfwrbo6lee6ye4hzmy1eyn2ndz5cbu55vfrs4rja7vgx2uilkyacp4fgcejrco3521h2p4fs8dauj81h2mxf9qgqk7bu1wpl8q3nr6tgooq69cw44qn3h2bwsqp2usxvysxlnuudn50sy9kdcwgq23d0zj66repkkrmifk3exzp96nsuqjd8cf3q2lnjq7pnvsao6ipzlbcz4fnrzmhf9ffaw1l',
                isRevoked: 'true',
                expiresAt: '2020-09-20 14:02:31',
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
                id: 'cc9fb6ca-b741-42f4-8511-9b4058fb6c38',
                clientId: '7cd4ed81-8c63-4b05-8efa-3e45aa4d9dc6',
                token: 'Iure rerum laboriosam error omnis error rerum. Aut iusto natus doloribus. Repellat unde quo et suscipit doloribus. Est sed saepe ipsam necessitatibus fugiat ducimus. Earum rerum et molestiae odit vel. Voluptatem corrupti saepe non eos fuga porro vel.',
                name: 's1ekw5zns4znhn9fu7v9ld9nah0hin9eo4bggwwcjs722yg8c6kp6q0pz7pr2sskbh6rhkuo9zzopvw6g6xmldqbdggki0m6wqynxx7jt5ztjr7qzx2y6pxxgydtegc1rjyakbt96y040fbe90qksftgkjcad8gdk8toozjsiair94j03gzec990umrx9ev8lme185d6uqb5d7rl2njhklc01i76ejpvoibd4z1dcbbxgwwyu90fktlxr6acfpq',
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
                id: 'cc9fb6ca-b741-42f4-8511-9b4058fb6c38',
                clientId: '7cd4ed81-8c63-4b05-8efa-3e45aa4d9dc6',
                token: 'Cum commodi iusto. Suscipit ipsam harum voluptas aut incidunt et maxime. Voluptatum similique dolor voluptatem voluptatem sit ut doloremque est et. Id eum deleniti fuga et facere. Ullam qui necessitatibus.',
                name: 'w2wey1oor4q9p0ebgyvs64u5thb64z6vf4xj7adhsrvvesesy69wf6gb64wqcwcipcaiv6cf4cgdh8ptz5h435k1dm2ewblp97sazw280hbk6dqlfwo0p17qfnyoaeq0otkvrefq6s30cnan33xnq482urx6i0275uy9cxtoz1qd1b5ugtol8dsi1icf5v7zit6uffzknku4z1isdw66y336aimmqwpz54o1ytmlbt925rryy1fyfqtulncmtn2',
                isRevoked: false,
                expiresAt: '2020-09-19 21:46:23',
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
                        id: 'da151c56-96f3-4039-8f2a-efd1e23afbfe'
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
                        id: 'cc9fb6ca-b741-42f4-8511-9b4058fb6c38'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'cc9fb6ca-b741-42f4-8511-9b4058fb6c38'));
    });

    test(`/REST:GET o-auth/access-token/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/ea0be8d2-0a3d-4769-9e34-e97c3f392d15')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/access-token/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/cc9fb6ca-b741-42f4-8511-9b4058fb6c38')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'cc9fb6ca-b741-42f4-8511-9b4058fb6c38'));
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
                
                id: '80214724-3a83-4495-bf79-26b5e97d4d79',
                clientId: '21096160-d983-4fe7-b0ae-8c6eee3299be',
                token: 'Iure esse quia omnis accusamus voluptatum aut vel. Aut perspiciatis modi suscipit vel et ut qui. In nam odio. Est qui earum explicabo possimus vitae nulla sunt esse consequatur.',
                name: 'yvle3vn0gpl3wu18e3lr67bbht4czdljv087hrwx1c1zf3wimlpkzcywn8710btjinrqpa38aoc9r63stuv6ou682179ng4uk4e6s6kdqyo1o4ij085oidh446l9a6ffgdyd17k12f26r7idodiv6hwmrm0joc7oru4l7osl59ah0ybcp2xpi0u6lj6u02vqna84lvbyvn0at6nmga8ejhcjtw63xn37sjjv9jh52hwip17qen8nuictkd6otgs',
                isRevoked: false,
                expiresAt: '2020-09-20 08:17:35',
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/access-token`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                
                id: 'cc9fb6ca-b741-42f4-8511-9b4058fb6c38',
                clientId: '7cd4ed81-8c63-4b05-8efa-3e45aa4d9dc6',
                token: 'Quam qui recusandae voluptates quos alias tenetur voluptatibus est. Eum minima dolor voluptatem qui fugit aut omnis. Aliquam nisi aut. Libero eveniet minus quia.',
                name: 'jff16hw0dlp7a5yez1y3xfl62jbcz87vgt0o4r7tysj650tcpytwy0ajue3kk7s7bj04bybj6lgyqes51fi5bgjg3nyd6u20cf2m6zc72d3nwo8il70rrzp4cpc7l83kjin5k96e3d3yhvisphwvgmovj4s2jj6hq2havvsx6kt6ndaqb8ujqn48nfkgbp0yuwh0bdojw7yhzwlofbn7csjprr9toyut0fbuqaji6pkrzuyvxeuoo1ktks15d1g',
                isRevoked: true,
                expiresAt: '2020-09-19 23:23:27',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'cc9fb6ca-b741-42f4-8511-9b4058fb6c38'));
    });

    test(`/REST:DELETE o-auth/access-token/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/e4e877b1-c95f-496f-b082-e539be264f3e')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/access-token/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/cc9fb6ca-b741-42f4-8511-9b4058fb6c38')
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
                        id: '7f59bbc5-9382-4759-a796-b2cae57c4d80',
                        clientId: '7cd4ed81-8c63-4b05-8efa-3e45aa4d9dc6',
                        token: 'Nam illo enim perferendis dolores labore vero. Vel aut quibusdam mollitia. Dolorum dolore soluta consequuntur optio.',
                        name: 'z6hf6njeakjh9fx6b0ewua98dcb0n21nnci56kf2r8qqla7ncl06puzkukeae33mt74v6ww33264obduqog2xcu1je45ga21ojubdk9a2ojrwre7l7sudw7sd941ntysehll8etj01peujpsa88aa3oi7xlb6sjxd44r3j3yta1zd6i07zm0xtql0v8d0kgrminmgh7n8pnqin5c1lqo8ipjw25u16bw7tlj9c63spal83qfl738x06b8dn53tc',
                        isRevoked: true,
                        expiresAt: '2020-09-19 21:46:27',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateAccessToken).toHaveProperty('id', '7f59bbc5-9382-4759-a796-b2cae57c4d80');
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
                            id: 'f2214f8f-0b3e-496a-944c-d1c1ac261509'
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
                            id: 'cc9fb6ca-b741-42f4-8511-9b4058fb6c38'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindAccessToken.id).toStrictEqual('cc9fb6ca-b741-42f4-8511-9b4058fb6c38');
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
                    id: 'ca9ffb9b-68eb-4ade-883f-ea4ffeea4d8f'
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
                    id: 'cc9fb6ca-b741-42f4-8511-9b4058fb6c38'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindAccessTokenById.id).toStrictEqual('cc9fb6ca-b741-42f4-8511-9b4058fb6c38');
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
                        
                        id: '3f5593fa-d09e-4921-b0d5-235e3b29476b',
                        clientId: '40885cd4-7070-447e-817d-9e4c90bd7835',
                        token: 'Facere nisi beatae possimus aperiam ipsam id facilis facere sapiente. Earum in magni qui laborum itaque consequuntur quo. Aspernatur quisquam aliquid incidunt.',
                        name: '92jpbax8fkd6z8lppvytzvl7ohjgxi700y5botgsq5wp9dd8nlcme9tu061w6v2avixuekevqibdw47lwikm1gj1coorths8n345tq294f227c5ddcku04yc246czufh0nl2kzxe4w5tabwlxtve7yxzh7c0rmz6o11ggldpqua6kv8grhcky2gkjux51tehblj4pokffwxqfgz7q1t2s8o4uv833t6siuwz3ey8u191d5fzfvjklxgw0gou4lu',
                        isRevoked: false,
                        expiresAt: '2020-09-20 01:23:30',
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
                        
                        id: 'cc9fb6ca-b741-42f4-8511-9b4058fb6c38',
                        clientId: '7cd4ed81-8c63-4b05-8efa-3e45aa4d9dc6',
                        token: 'Porro saepe tempore quia dolorem amet accusantium quisquam ut. Minus vel natus qui ut. Aut qui placeat aut nemo eius. Consequatur velit incidunt labore ut error et facere non in.',
                        name: '4gtk9woh8bfd4npj1rkk931iz0dqc2xqm1jvn30j7fnvjoytmfmojrsjqlxftcdunw6ikot96inse80py6qmlgx2wlfcdl57rn6pcqvy5qkozxjlusm0bzw91rizqqdtd933b4gwzovcmvvsg5bctstehdfmzt689647wo72yu1qxxbdqxbcu39qura389kj4x517x5mkfltqzrf4yt41wyen3s7z0in3v43asigtxwuor80zlgg155lzlyni2n',
                        isRevoked: false,
                        expiresAt: '2020-09-20 15:53:41',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateAccessToken.id).toStrictEqual('cc9fb6ca-b741-42f4-8511-9b4058fb6c38');
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
                    id: '56a8eee8-5265-4a39-b6aa-00f9f6aabc1a'
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
                    id: 'cc9fb6ca-b741-42f4-8511-9b4058fb6c38'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteAccessTokenById.id).toStrictEqual('cc9fb6ca-b741-42f4-8511-9b4058fb6c38');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});