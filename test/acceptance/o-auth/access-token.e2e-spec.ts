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
                clientId: '82f0ffc3-32a7-4f0a-b895-4ec74d54f079',
                accountId: '8e22d638-8128-4f0d-b9b4-fa422aa213cc',
                token: 'Quia cum porro omnis delectus iusto velit. Suscipit iure possimus placeat vitae deserunt nihil omnis. Et illum delectus quas et repellendus iure ipsum. Dolores vel molestias fuga ullam possimus quam in. Vel totam architecto quod ut aliquam. Numquam pariatur consequuntur consequatur aperiam.',
                name: 'v1pln3dc2r40aw9rivtn4cw51om04qw2xdsiztsp51cky2ihhg4y93il9giah7fu0y9nlwm8o75rkitbgx5fn7e3whxp47gvb6vttqy9hozr4qupivbuz0tobve1xczno6et95zji2w16htlkp649eyx6y8fua3uh07ogns3ac8x5gq68jcgs0n26gh34c1vt1z5rchgfu9q6jjxj0jnr4c6nzywguv7jej2rawnbr79rakzir8hd0nx71s4rsg',
                isRevoked: true,
                expiresAt: '2021-04-18 01:21:54',
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
                
                clientId: '82f0ffc3-32a7-4f0a-b895-4ec74d54f079',
                accountId: '8e22d638-8128-4f0d-b9b4-fa422aa213cc',
                token: 'Eos fugit ad perspiciatis modi similique quidem ad ut. Cupiditate quas eos quia et autem eius. Similique quia excepturi autem. Delectus expedita reprehenderit molestias facere eum enim autem.',
                name: 'tp6kzv9pcbc4nkkojxujhewkbc3w2fubwan6e7ibko1s0mbide0qhk32w7ab8qr5na5nbbnol9c2m8bwzhiyn83obb1cmbf74au43zjupejm9exydm6k4x7va3fsk55zmutua4ib3c3k28mrn4vxj7eogn2xv8vw2se2p5ta54peaxxw5z6stkpg2jdfgkyjgr1qx51es2mfb6bg5uu6dly2346dhzyigedvj4et4sgonxz3tzar1v0ftfrtuxc',
                isRevoked: false,
                expiresAt: '2021-04-18 08:48:41',
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
                id: 'd799ce7a-8289-4b43-9a83-e7f0ad64189d',
                clientId: null,
                accountId: '8e22d638-8128-4f0d-b9b4-fa422aa213cc',
                token: 'Est quia ut eveniet accusamus voluptatibus quia. Doloremque nobis repellat error ad ipsum molestiae ipsa. Nihil modi aut deleniti quia voluptas numquam cumque quidem. Ut aspernatur labore voluptas non voluptatem assumenda accusantium commodi.',
                name: '6gnpfli8vjfqsarl9rwe5m15jc58ngv5a2mlatvuez68876n5elui0hxhdxqtnwqc26ypayl940gr4vxcxn1u03lsafy2721nbnrtzw011tdlw3jyemje9rxi0wgfdxwi6qzv5mdgemwjarejze72f2pl8nm2rzlqf6akdaeu1gmf6xis9xokamtlseurdw8quobhyk9wiaaif9sfuaj9tdholbmwyqepcxxdtz56tkm8ojypme80m6e8pmxy89',
                isRevoked: true,
                expiresAt: '2021-04-18 21:29:10',
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
                id: 'd799ce7a-8289-4b43-9a83-e7f0ad64189d',
                
                accountId: '8e22d638-8128-4f0d-b9b4-fa422aa213cc',
                token: 'Cum praesentium commodi corrupti quia. Omnis reprehenderit eligendi est et sed maxime vel placeat consequatur. Architecto qui sit dignissimos aut ut autem. Ut ex in itaque ut quia qui facere tenetur blanditiis. Temporibus totam et sit dolor minima numquam rerum quidem.',
                name: '2u2vg4ew93sa5lfs9odkbygtehpmm64l2l5hxz7ranolox28hzioi3dbyp20jitne9a1842rju6st6ovyzn1ogf0fv8d4juusdax2gl6y51odx96vi5tixwo77qawtrtdve9pa3e2od6dhu4qzv0uvgv94m94w1f9mw6vzs86ucw7ntzuwtgr40g7iaxc7xbfbe75wl02jxu84kqwcj37y4rzzem8lr4tkd90umoneknrm35dnks37p2f0p7pzy',
                isRevoked: true,
                expiresAt: '2021-04-18 18:32:15',
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
                id: 'd799ce7a-8289-4b43-9a83-e7f0ad64189d',
                clientId: '82f0ffc3-32a7-4f0a-b895-4ec74d54f079',
                accountId: '8e22d638-8128-4f0d-b9b4-fa422aa213cc',
                token: null,
                name: 't2uhceq2bgxlcvn6spwjcm1kfaw7epxyeq5qrorl8t8dmpx37dzpp8t5u2bkbfasgxmsn9k6arxiao3h68qstjp6u5gc5q1q190fb3bkob82ht5waqkptouh9porfozjj7bdlah6lz901uosufsrs7031pz6x0zab3v61sfr4cckvoaacvo9se3yb1bq5uq0ice9qz115qj9wguu18acn5djgkv1xufatn9rphh07wvvmxkul9ahit17scoxuwr',
                isRevoked: true,
                expiresAt: '2021-04-18 06:05:56',
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
                id: 'd799ce7a-8289-4b43-9a83-e7f0ad64189d',
                clientId: '82f0ffc3-32a7-4f0a-b895-4ec74d54f079',
                accountId: '8e22d638-8128-4f0d-b9b4-fa422aa213cc',
                
                name: 'sb9gcow8a86mahitz2v4qhtf4fexe6iegw2ysxcx9hek6mz7zk9ag0g7rlk5c8mh0auum3etymsp7b3xmjbusn9z5aeruf46fbx2o5v9ewywgk7l1f0q56vrtpeatm2t6qbm1wwdjjtbwij7198inncmctszud1jtgenm746o3oo4xohd2ebsblrd9uipw2n5oz3lwr2dz9qedv4qsjx833iw3xozfkv6s4s44m35yr20q0sh4jas9tdszf3eha',
                isRevoked: false,
                expiresAt: '2021-04-18 18:54:17',
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
                id: 'd799ce7a-8289-4b43-9a83-e7f0ad64189d',
                clientId: '82f0ffc3-32a7-4f0a-b895-4ec74d54f079',
                accountId: '8e22d638-8128-4f0d-b9b4-fa422aa213cc',
                token: 'Qui porro aspernatur quia odit omnis autem debitis. Excepturi eum quia velit commodi enim dolor voluptatem eos. Quod facere consequatur dolorum molestias excepturi facere laborum saepe dolorum. In architecto sed sunt. Rerum rerum tenetur. Id nihil et aut hic libero nemo est eum illum.',
                name: 'lt3gasqi93510xiqdxoj193r9b54a9e75835j6xsnoys1n927k60d8sj9fsxjer356asqseu346vasof0qz2pi8um9q4hq29sxdolsa934yr5unr43whzaz2biqxwc3737frafzjtpmnyoigxya9ygbr50jkv60cwjee7jlcgt0k4cbcf56iwmxz0a6heh74r8eld4qxy6u1ejcl52n68pvjzcyevcad47iqyo8e3hv81z40w7sca7twe4oj80z',
                isRevoked: null,
                expiresAt: '2021-04-18 05:39:36',
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
                id: 'd799ce7a-8289-4b43-9a83-e7f0ad64189d',
                clientId: '82f0ffc3-32a7-4f0a-b895-4ec74d54f079',
                accountId: '8e22d638-8128-4f0d-b9b4-fa422aa213cc',
                token: 'Voluptas quis odio. Blanditiis sed perspiciatis aut. Iste laborum est quia omnis eum ut aspernatur. Tempora et nemo doloribus. Quo quam iusto dolores. Et nemo eos corrupti veritatis qui magnam magnam sed quo.',
                name: '733uouvtpd2lgkt6y5f2iqgyt6c9iu084t9umiia6oz4tqjyhvd3ggox7j2illdchhdtdxzznmfi6xc3nmvmekcir9mtzhvpp2mov983k18exwqczobf504knale5q1g3ymjkd9m69m29gufej4rdv5dhsbrj5qve0uhyjtmzqe26zo9lzuwxtifbexc9tiycqmqkp9a4ca47hcie378p5hinclwasuncz4l195m0esa01du7wyu3q8vhdzedmz',
                
                expiresAt: '2021-04-18 02:45:35',
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
                id: 'spmxfkjji5hbucuetokmp5l5697sbzi0ghi0w',
                clientId: '82f0ffc3-32a7-4f0a-b895-4ec74d54f079',
                accountId: '8e22d638-8128-4f0d-b9b4-fa422aa213cc',
                token: 'Cupiditate tempore voluptate tempore amet provident explicabo repellendus. Aut saepe eos placeat nemo ut voluptatum. Error quam architecto impedit fuga iure impedit officiis voluptatibus autem. Exercitationem natus sed repellendus harum perspiciatis id omnis quidem. Nihil dicta ipsam aut distinctio a consequatur voluptatem distinctio. Totam et quis sint iure voluptatum et sint quibusdam enim.',
                name: '088blgovwqxqg3a2htjlqlkd0hti8pgq30me1vllymkinkp5k1trwgc3igmhczasptv0mmkrsl26khneajaeckgg4i5rceprrx4wih4lsxkv3nubzig59p2kntculkxv0ibofcqc7g7cpt1riljggzffda7esuzljq5nm43ge29t2k34zjzyrc2cb5a24p4hza0mpv2tw4yjbvi3nbpu9ppjeay7111moj9qqct5v39fez3exmv36mp83s97k5s',
                isRevoked: false,
                expiresAt: '2021-04-18 21:07:30',
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
                id: 'd799ce7a-8289-4b43-9a83-e7f0ad64189d',
                clientId: 'zvx980lagbaymypduwigettp6ajrdo78bd82a',
                accountId: '8e22d638-8128-4f0d-b9b4-fa422aa213cc',
                token: 'Voluptatibus ut velit nemo. Sunt non et consequatur facere ut qui voluptas blanditiis necessitatibus. Autem animi illum iusto et quisquam necessitatibus. Quos id mollitia est eius ex neque. Voluptas quod illo. Molestiae officia sed voluptas.',
                name: 'z70l0c5jidc2fgnq3771mtd61kwv7qq4k9lkxzu4zhvy0y2k4eyxbop28wvpj3b4m8fjivm2n7ucudbhtoz3u5hmfi4355s1ifywh5wfpq5yc237yy50ky9gxxinyysq1pee38jw23wml8idy1kcdehkncdbe7qhxtvtx9sw2tyxa6tahcs7hdvcs00sg3esao1cxzugo5j8wr03d7maquzc49v5pxwlibkbd49j6rl31ne9g1obkh2b5omtsqw',
                isRevoked: false,
                expiresAt: '2021-04-18 20:52:05',
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
                id: 'd799ce7a-8289-4b43-9a83-e7f0ad64189d',
                clientId: '82f0ffc3-32a7-4f0a-b895-4ec74d54f079',
                accountId: '3f5mkvv0y7k2czfo210ricky8t4f98884fmmg',
                token: 'Est doloribus non dolorem. Aliquid voluptatem alias libero sed mollitia repellat placeat error. Aut sit non laborum facere corrupti ipsum dolorem possimus. Omnis voluptates asperiores nihil labore sequi et aliquid vel sunt. Ipsam adipisci et hic.',
                name: '5k56cbra4k95mpl0uc1tkszbl05i369nhfgwq1o00cglj93m6nvbsortpqoa3d9at3n3c3nmmovzwot21ar3kht1e0qxx3tb29u4gjdhw6wchx3vieypmmqyrj4rfjxt84vyzipb1so7pbpj6ftu97olo55gkmo81z9hu4p75zl36uu6mdcaj336nxdijycxpi9tv37272x5k70edckh131m39r5ox7zbc57so0f52fsto37nx2zp7dljfehsuq',
                isRevoked: true,
                expiresAt: '2021-04-18 23:26:17',
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
                id: 'd799ce7a-8289-4b43-9a83-e7f0ad64189d',
                clientId: '82f0ffc3-32a7-4f0a-b895-4ec74d54f079',
                accountId: '8e22d638-8128-4f0d-b9b4-fa422aa213cc',
                token: 'Nemo facere autem odit sit occaecati pariatur. Adipisci reiciendis veritatis explicabo praesentium velit repudiandae officiis inventore. Labore alias doloremque eveniet.',
                name: 'jv7p0tfwbtyk4ow932ca5ovlexh6c2lnovfyhskfjlhcfgq4b87c6fsnm7k8l0jliv6g9po8cgcao09qupctpqlospwo4xw7chlchw21yd9kenycgcjcfj9ul1sjogssiiaxeaxyxgmrjzlmqg944kbrhsv3juc17swxvr7s5vurydzar61o04un1r52iib3mf8ib3ud9gdqvt3unth8felriw1vt8cvw349wks2q4w3hxf89l4qqy8tbqj7je7t',
                isRevoked: false,
                expiresAt: '2021-04-18 14:35:45',
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
                id: 'd799ce7a-8289-4b43-9a83-e7f0ad64189d',
                clientId: '82f0ffc3-32a7-4f0a-b895-4ec74d54f079',
                accountId: '8e22d638-8128-4f0d-b9b4-fa422aa213cc',
                token: 'Explicabo facilis sit labore eligendi similique aut et non omnis. Quas animi libero necessitatibus ducimus earum. Iure recusandae nesciunt sit.',
                name: '9hq6m44kc4scbu9r5sozudnc0w7iv9zba09d2ge559z1sjm6eg1dy0xgtpojxi4syt8iqrjjdfux98eplu2uqw9hjt53obr8nfomjnqcpqz5yifaeptmvczutnuzgyc22l83mjekhz2xgd6jubhdj0a3x13spcdy9a4ghfbbuakt8vp3nz6zw7coopkprvutk7d2hr8nwmgj1jdaeec6k3322zqa7nnq5wmc9ufdrobllcn6wtae80hsa0fjzfe',
                isRevoked: 'true',
                expiresAt: '2021-04-18 22:22:44',
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
                id: 'd799ce7a-8289-4b43-9a83-e7f0ad64189d',
                clientId: '82f0ffc3-32a7-4f0a-b895-4ec74d54f079',
                accountId: '8e22d638-8128-4f0d-b9b4-fa422aa213cc',
                token: 'Quia ut ut quam. Veritatis voluptas vitae et non cum rem saepe recusandae tempore. Nesciunt et nobis inventore. Incidunt error possimus.',
                name: '4301b3vz5uwiwwdt7ca8ptk6u9bf3vt087auwk96r9uka0wg5jjwkdg56utq1709t33km2v28xdf0dju2mu15yl7xkee5y8yeewv8n8f504njqksh9cje7yf8hjnmz1b1qm0ezsox56bwnqtfp2fk5d390372jewbu9m12rxz161y0tpkj1f4gtbeaj6byfnjfb3f4w3it35d6irihu2r70vajj13nmshnb0lk2gmuytzqfb4k6fyjzqk0dshfy',
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
                id: 'd799ce7a-8289-4b43-9a83-e7f0ad64189d',
                clientId: '82f0ffc3-32a7-4f0a-b895-4ec74d54f079',
                accountId: '8e22d638-8128-4f0d-b9b4-fa422aa213cc',
                token: 'Necessitatibus vel dolores laborum inventore omnis laboriosam odit. Eveniet numquam qui placeat vel voluptatem provident quibusdam aut. In sed quo assumenda consequatur. Ut quos at tempora. Ea non nemo excepturi.',
                name: 'fkucvnncu291dx87nxi609714y315pr2yzh7k4lu4aho4zi100678ps20xejq6mpirqcar4laio8pagof1hngfaebsv5wac3q7x5nzd0ttr9onvspauoxpkkbllk7id15pkofrzyd4tldc92k123bndnypt5yymtzrji0g7icfq1n0689otwava5zg7rgwa73gr0zte3keycmprxl3z1500k9hxkxp30v8gtxqg9u2m0k8qns7pglnow0tnrek6',
                isRevoked: false,
                expiresAt: '2021-04-18 15:42:27',
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
                        id: '88be048f-8ac2-442b-8853-c694ff4b174b'
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
                        id: 'd799ce7a-8289-4b43-9a83-e7f0ad64189d'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'd799ce7a-8289-4b43-9a83-e7f0ad64189d'));
    });

    test(`/REST:GET o-auth/access-token/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/ab9fcfbb-d568-448b-9c23-06c1f26609f7')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/access-token/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/d799ce7a-8289-4b43-9a83-e7f0ad64189d')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'd799ce7a-8289-4b43-9a83-e7f0ad64189d'));
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
                
                id: 'f35f9b95-885a-45eb-a8e1-d716f0ec080c',
                clientId: '9dcd951d-a648-4dc4-b59d-10e21ae24488',
                accountId: 'c26ae0e0-8730-4bca-8298-ec1a03af0f0c',
                token: 'Eum occaecati numquam vero et aspernatur. Et culpa qui illo natus sit et et sit. Est similique consequatur libero libero. Eos possimus voluptatem vel. Consequatur magnam eum totam sunt omnis expedita soluta rerum.',
                name: '6wff5dgvdh4z7kicjgx4ts55pfsnbfi6jm121lpgdhii26wrgbbvvs6ngolsepgsyfyhukgn0e9ww34ubalj97dfih3guy55gox95a6q4nc1smycnt6mv8o2oyxupqsv17ui4zznduecg76ye6i30g6mbgnl70eaw5v8lu3k3tktt7ddal5ufvpr5i34wdny1jqmcam0me7tkp6v3i5liztsfprzjsgm8ryjrgcb3wzsc2hr1y10w9lyevlbubh',
                isRevoked: false,
                expiresAt: '2021-04-18 09:35:42',
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/access-token`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                
                id: 'd799ce7a-8289-4b43-9a83-e7f0ad64189d',
                clientId: '82f0ffc3-32a7-4f0a-b895-4ec74d54f079',
                accountId: '8e22d638-8128-4f0d-b9b4-fa422aa213cc',
                token: 'Vero aliquam nulla voluptas hic atque. Asperiores tempora nam autem laboriosam eaque aut consequatur. Tempora similique sit illo minima et.',
                name: 'y4w3ka7qamgvhvplzom16fx8xtshyxfzhludjj1k3zw1yreb820zfi3gju3qt4tnp5ekuw5rnlaqty0ienixafc6g8e6is8hl07bgz2ougtyfrlck2tlssuxm7sjosbfgfr89w71lxewagibyq7b7nj3iobtearwjjsou47q5x9za6hcmsha9e1ys9b8e9ofcqwq4v7okygxsmjr2nx0lke8xucurc382u3zn85pm53lgewhfkn455cztglj2uj',
                isRevoked: false,
                expiresAt: '2021-04-18 16:11:08',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'd799ce7a-8289-4b43-9a83-e7f0ad64189d'));
    });

    test(`/REST:DELETE o-auth/access-token/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/aafd3ed7-7d73-4622-b87f-ff032135de3c')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/access-token/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/d799ce7a-8289-4b43-9a83-e7f0ad64189d')
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
                        id: 'e1f88db3-8b49-4ddd-9788-0df28186c7c1',
                        clientId: '82f0ffc3-32a7-4f0a-b895-4ec74d54f079',
                        accountId: '8e22d638-8128-4f0d-b9b4-fa422aa213cc',
                        token: 'Eveniet eveniet dolor. Blanditiis quo aut adipisci. Et possimus velit est.',
                        name: '1pwl0pqihw6sgf45hh71hbx0xrmzhbhyxo1mj0s3c8oole54k3wovyv1qs2o5033ypsyohepi7x8l0bqlfu94vcim6vfsltmjs7l7sx4n5gmpzvw9mhgdmqr1tyztizrhlgmu1fucqvq39wnan630btlcpnqshkhkuvgsyv3hsuqsgrd5qz6v2alsr6t2tgcvqueze3et4d2zir77s87xc2jril955c1485rxhiegdmqlcx6m7n6y95g4kn3i5y',
                        isRevoked: true,
                        expiresAt: '2021-04-18 22:33:36',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateAccessToken).toHaveProperty('id', 'e1f88db3-8b49-4ddd-9788-0df28186c7c1');
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
                            id: '4349059c-4283-4e90-9464-c92705d8f779'
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
                            id: 'd799ce7a-8289-4b43-9a83-e7f0ad64189d'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindAccessToken.id).toStrictEqual('d799ce7a-8289-4b43-9a83-e7f0ad64189d');
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
                    id: '203a79c7-8dbb-4f2e-874e-dd5541fbeeab'
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
                    id: 'd799ce7a-8289-4b43-9a83-e7f0ad64189d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindAccessTokenById.id).toStrictEqual('d799ce7a-8289-4b43-9a83-e7f0ad64189d');
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
                        
                        id: 'd31d1ca8-e1ee-48c6-b5d4-eef789dae54b',
                        clientId: '29418fec-75d2-46fe-9234-2af5e7c6d198',
                        accountId: '6e1dac95-3891-4f27-a2c0-cb2b761bc6bd',
                        token: 'Dolorum ratione facere odit ea sint ea. Culpa ea excepturi molestias natus nihil quia. Nisi sequi doloremque harum ratione. In nam explicabo architecto molestias incidunt doloribus.',
                        name: 'km4bn5dt3acj6w91lwbr5u0unhl97qspsxtlx4uoy4k41vocnrvx6uds2ioik4hljb8tm0mfknja7b6qdj7gf4edqk7nv1uf34ch0rbvkzekvmpazqxxsdc89uc5tt04qfnvyh9wlmu10nmwqm6f2klv9xqmfnx4j7gvc17zx5i3eccpg0ovrt00vcmwlwu0mvc9whrdf8kjt34pzxo43foyj38sp2nbokm4qquvakpmtxjc7fcotfdtdfs75z6',
                        isRevoked: false,
                        expiresAt: '2021-04-18 03:20:19',
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
                        
                        id: 'd799ce7a-8289-4b43-9a83-e7f0ad64189d',
                        clientId: '82f0ffc3-32a7-4f0a-b895-4ec74d54f079',
                        accountId: '8e22d638-8128-4f0d-b9b4-fa422aa213cc',
                        token: 'Id saepe possimus totam dolore. Accusamus molestiae maxime est in. Numquam mollitia fugiat. Sit ab quia veritatis eveniet.',
                        name: 'kxgde5bxgwbb3jwplvri54gfac94tp9d878ujl9bw2r3220m8r6koo7a85rfjwv4nujedodp1ctf4cz1ib2n6kn207sib3thugd30lh1ynu56hw9a6du1svpcxbe59x2il8qjup2o6mnnpev8du2tdsni1kvfuj8o50e1nbafy14s6wx5k4xwrbkkkbxswk1e4fktavnss8lbm0wf562bborrlp2iy08lk81l6bd0a9wgtax5xnk7yji3ur7euq',
                        isRevoked: true,
                        expiresAt: '2021-04-18 07:07:47',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateAccessToken.id).toStrictEqual('d799ce7a-8289-4b43-9a83-e7f0ad64189d');
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
                    id: 'fd7aefb5-9190-481d-ad98-f894b38dc847'
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
                    id: 'd799ce7a-8289-4b43-9a83-e7f0ad64189d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteAccessTokenById.id).toStrictEqual('d799ce7a-8289-4b43-9a83-e7f0ad64189d');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});