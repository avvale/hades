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
                clientId: '48273029-caeb-4c55-af69-6056c4f47ed6',
                accountId: '75b77f6e-f912-41ec-a0f6-ff41d98fe6b9',
                token: 'Quam atque consequatur enim voluptatem consequatur. Officiis ab dolorem eos dolores est vero aperiam dolores. Voluptatem incidunt ea perspiciatis ab. Fugit sunt id dolorem molestiae fugit rerum. Dolore at dolorem.',
                name: 's2i6aptjt6cvxzdl48dnwxlrdkxcq60ogsa6bppn8jjl1sp67w1qnj0tpojhbu95fwgm8up622mdlgfsc87otphoho90vsg7b4y92gnfxry02fcjws174m6znr32kiboybuh8y00m4y1qv9ucn0op56lxo7v56bqxl7mp4tsuks2f52l568msf13y4ywqmgpsy96ny7ibhdsvyw22c8yxow50yu4kog7szysvzf66mghjcsqdqnod717z3jmosm',
                isRevoked: false,
                expiresAt: '2021-04-18 17:36:34',
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
                
                clientId: '48273029-caeb-4c55-af69-6056c4f47ed6',
                accountId: '75b77f6e-f912-41ec-a0f6-ff41d98fe6b9',
                token: 'Velit quae in id veritatis aut nostrum. Omnis enim suscipit id ea dolores voluptas qui. Ut quia et. Dolores consequatur culpa omnis cupiditate dignissimos ipsa libero. Hic vitae excepturi molestiae a libero et provident. Laudantium repudiandae ipsa ea deleniti quis quaerat.',
                name: '7alvm7atuwvldjflqv5e1d6wgmyr3jcvkw354agheebqs5k8laencodm9065aj0aad9no99lennc5nxc10wy2nsskxbmcj0gxy12f96wreawllzv3044hwp7wpm00at810v9akmkau8wse0m1b72cmad1tf599ooyirf2j6oytvpsfna8zj11txds29j9dqtxj9jnx26c08642qj56udco03wnsbb1qwyq65c1o0wvj73qdi2mr7x7p6crsuflr',
                isRevoked: true,
                expiresAt: '2021-04-18 18:41:14',
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
                id: 'c52c4987-71ce-4cb1-9035-da19b282e6ff',
                clientId: null,
                accountId: '75b77f6e-f912-41ec-a0f6-ff41d98fe6b9',
                token: 'Iure rerum non ullam. Vel quas unde atque ut assumenda omnis tempora. Soluta pariatur voluptate suscipit culpa deserunt et et. Pariatur et ullam earum omnis labore modi dolores ut veniam. Eaque repudiandae fuga numquam asperiores explicabo omnis. In blanditiis quos.',
                name: 's3tsg8y2wy82mlm7ws4ct0p8seow0oyh7s2dpwi0q3j79yn8wu1u4gbtqwx6m9dmmhtclaiidl4xqpof4ggbhcnw2r19t7cpbsoqoubha0whckvd9l31ub4yf4fytdjf4btuu4becnn2iroqt6platffl976b3calgrm6vgbcgsn12v6ha2cz5gzyax2gaqd7vmazcysn2hmmdelf41clcm1aybhx2rmzbq9b4tvu69wdvkta5qwrtnmbmvr5ci',
                isRevoked: true,
                expiresAt: '2021-04-18 13:56:31',
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
                id: 'c52c4987-71ce-4cb1-9035-da19b282e6ff',
                
                accountId: '75b77f6e-f912-41ec-a0f6-ff41d98fe6b9',
                token: 'Dignissimos nobis natus. Tempora corporis quia molestiae. Ea qui et ab libero. Praesentium expedita qui aut fugiat accusamus repellat et. Impedit explicabo sunt voluptas ut nulla dolor quis. Ipsam fuga accusamus sit aperiam inventore numquam.',
                name: 'ol3pj47ugygzs6w96l8nm89uzt806udi6xok2otrk0peowyhn9tokqh8g1o1wgiebfsn78ddgc2sbeus1af16gpj5zzd45c86ik8ppfa5np3289f01pmgh45mddhnbejd3p4a685h2907lc1uu0ex26gh7iv082xpgjt3mqbwgxfxm7zlsq8fw54ad6kvr5st8n9mj6ykd1vxy2vh8db2kqrgexhrp9ubpjoi707cafzkcu7384y1zcw144gbnl',
                isRevoked: true,
                expiresAt: '2021-04-18 06:07:49',
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
                id: 'c52c4987-71ce-4cb1-9035-da19b282e6ff',
                clientId: '48273029-caeb-4c55-af69-6056c4f47ed6',
                accountId: '75b77f6e-f912-41ec-a0f6-ff41d98fe6b9',
                token: null,
                name: '5istq8uosd2wxom7uptje2zryqru52qiniyxx9oo74y528136z8tvclrq0ob4kpuqqs213y7wpaoc13uvw0c6ysuu3cq3zj5o01trs7qmny33edxwcqn8j19r882emilvcmwq9z2vwe4l6hfxaw5qwl6vngs73t9zpwihaj39zmkk1hl8y0qekzj0johxvuxz6ee14cuzra13oe13bsmnr71k9zryezi4em3fn36ueigqbadj5ixmlrinqs79a5',
                isRevoked: false,
                expiresAt: '2021-04-18 02:34:44',
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
                id: 'c52c4987-71ce-4cb1-9035-da19b282e6ff',
                clientId: '48273029-caeb-4c55-af69-6056c4f47ed6',
                accountId: '75b77f6e-f912-41ec-a0f6-ff41d98fe6b9',
                
                name: 'bp9clez7dyl2376digp18o92gxvvx6g5ibvpdgi693d5959nrz08clpovtf8q3dfmqcvayylkt9918u9owxkr632p2wbohhqh93gy6zfebh6jp8b3815hsvwgoabza7ga6wn2ltozmuarkj6ulv0gt2k71kbka9if7l9sdx445yvs9c1pn5so11xp2e97yans3bmzw54jolssyu4ei7qi2iw4tarw0e7qh08qjfoj81htefi42vc6u8xn1uyhtg',
                isRevoked: false,
                expiresAt: '2021-04-18 06:40:14',
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
                id: 'c52c4987-71ce-4cb1-9035-da19b282e6ff',
                clientId: '48273029-caeb-4c55-af69-6056c4f47ed6',
                accountId: '75b77f6e-f912-41ec-a0f6-ff41d98fe6b9',
                token: 'Non et deserunt dolorem et nam ut quasi. Placeat ea cupiditate et quo dolorem modi illum cum quas. Tempore sed nihil. Tenetur ut neque sit quidem a dolorum.',
                name: '209y1xi4jfrgm5h0j34fry26xqnuhfbzo22e8t3wxxvv3xck5rns6qvkj9tpoiq7o21mlowlil0t6itsv4qzpg34r6s3y3crbppa92tpmnpbwaku66hdgp3gnlrh2erl5k9iedacyjuy2czqzwk9ej45r45oc33ybc6xb2fls40syyapac7dj2ihkw9exdozzwalo5fkmr81h4ljy8x25qskby7qapvuxf6b0xeh1t5vlpz90poa8ekx2uii3lr',
                isRevoked: null,
                expiresAt: '2021-04-18 12:54:25',
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
                id: 'c52c4987-71ce-4cb1-9035-da19b282e6ff',
                clientId: '48273029-caeb-4c55-af69-6056c4f47ed6',
                accountId: '75b77f6e-f912-41ec-a0f6-ff41d98fe6b9',
                token: 'Architecto suscipit mollitia quisquam iure ullam excepturi aspernatur dolor aut. Nobis soluta qui nemo libero. Expedita nam dolore. Dolore sint voluptatibus rerum consequatur eaque modi sequi voluptatem rerum.',
                name: 'cwg6e32pns07wef00gqfbcdlkcguowexq0j18mmla06dynemul24sfjlpisjvz1n4vrdu7sdy06zv7dzyp9illbiv0qie0tapf7121pl6fnnqtwv3bghm9n0zrrzrgva7uos6936h1meosistxl2gktx1y53hikvcufrm5442cgko8v3kcrxhyblvyiunrypna9iom4w0ts85h34csi0b7ftsrbqeowtfjrayqfib4onricrj43ng9s7j7eqdvq',
                
                expiresAt: '2021-04-18 15:38:21',
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
                id: 'o5mo73w4zjuamub5iq4rk6gyc8f1rorildfqh',
                clientId: '48273029-caeb-4c55-af69-6056c4f47ed6',
                accountId: '75b77f6e-f912-41ec-a0f6-ff41d98fe6b9',
                token: 'Nobis fuga qui delectus ut vitae. Qui odio vitae veniam. Omnis quod aspernatur eligendi doloribus non ducimus natus.',
                name: '6tb5w5xu2ysyklb5ku8zvtxazu6wq5kbhuuecuo6sajhupckh0r62t6xim2yaxl8xkb7tsv19uqac977o0pnj80na37g12wu2k7krfd8quyhizj0hlamy0bc28ifaz3tg0jt87frathgufnksurvtrsh7tl3zlp6ryf06ncoxn5m6vuxi0prr8he6xe9g1lwluxb61b9wdp7eacfmmp56g854eezijjb63smcfi3bbt52v1srb5k9w1jvg1yigi',
                isRevoked: true,
                expiresAt: '2021-04-18 11:32:24',
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
                id: 'c52c4987-71ce-4cb1-9035-da19b282e6ff',
                clientId: 'zzi7ntgqc8ebrusnf8d97hd2e0435id2frlg3',
                accountId: '75b77f6e-f912-41ec-a0f6-ff41d98fe6b9',
                token: 'Perferendis ut corrupti sint quasi. Animi fuga molestias ut aut quidem. Sit sapiente voluptatem consequatur reprehenderit quia error dolore omnis porro. Suscipit facilis excepturi doloremque perferendis ipsam aliquid similique. Non distinctio ipsa. Provident consequatur eaque et amet.',
                name: '94e61b0gvfy6vtoyqyrolyy5qm58o9prh1i3lu1n6itruozc2srbzn1ix0wbhfdj8qqay19z1zwxq1alabsvf3sa4q0fbyqsz0t8cso8ceb99tav26vhy0rfe70okjzs2hmewrg4h6hgnracqu9tlchupbhigm868oi9aouvlo6t4e3cp090wpxgds0pf1ti1kciompgkd7daml6xyyyv88ymttgtgs1bnf9n3jt4jzfbkczdudga243y2hky5v',
                isRevoked: true,
                expiresAt: '2021-04-18 09:21:55',
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
                id: 'c52c4987-71ce-4cb1-9035-da19b282e6ff',
                clientId: '48273029-caeb-4c55-af69-6056c4f47ed6',
                accountId: 'tzy6z6wbktvp4m036qhu2f1csm9futxmw1xxv',
                token: 'Totam ad non rerum ut voluptatum. Aliquam et molestiae porro soluta incidunt vitae asperiores consequuntur fugit. Sunt amet ipsam soluta. Modi numquam suscipit similique velit.',
                name: '0a98s4anp1uxnatih88h9h85h8cj5wu5luhw1vyxsxbrn7o0gh8j2nva23ni0sifofqwx61sjpytr4hd3oj2org9p3oaib6lerhd1kcg7eiqvjimi95ni5jb9fysjx95oz45551iqbwcwql0k93jux8wrpwvxlg8e9zsf7zcjiurw70vwsd5zpn6ohgk6h4fokmd5ly3me9wacipznbcsq4a3ok0w1d64xdf7qebqvqa4paduft59xsbjrnt7qs',
                isRevoked: false,
                expiresAt: '2021-04-18 04:36:38',
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
                id: 'c52c4987-71ce-4cb1-9035-da19b282e6ff',
                clientId: '48273029-caeb-4c55-af69-6056c4f47ed6',
                accountId: '75b77f6e-f912-41ec-a0f6-ff41d98fe6b9',
                token: 'Ad et deserunt vitae. Tenetur aut debitis vel eos autem consequatur corrupti dignissimos ad. Voluptatem iure iste id nemo illo aut. Aut est eos error error asperiores. Ut nesciunt fuga voluptas velit nobis ipsam.',
                name: '6v9p2y2dn240sbxkvnckof60z55777qxxkbzbebg3yxm7ororpy98gfpdqsqe67u94wvdwi9ypo7kk5gk4p1zu1f7vdn05pr96fuy7vkq28h1s66jfew8vrzc883evc4fhxy6b1t2h3acnp5kh7kr85jbql8iq7m1dvf4iegaonzdmo664qjhejfbyq8wewta4dwg0p9i9psshepv0gsjc3jz8bmn9xw5hrpkcs1m4tem2iz38qpb1jk1jaa3zal',
                isRevoked: true,
                expiresAt: '2021-04-18 06:17:55',
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
                id: 'c52c4987-71ce-4cb1-9035-da19b282e6ff',
                clientId: '48273029-caeb-4c55-af69-6056c4f47ed6',
                accountId: '75b77f6e-f912-41ec-a0f6-ff41d98fe6b9',
                token: 'Optio necessitatibus nihil ea. Consequatur reiciendis sed voluptatem eum vero ullam quam id. Dolorem nobis dolores omnis magni magnam minima id sint.',
                name: '1u1weaworwan04dem7h0mjzmctb149oz6xlwc2woltu81tae1ncc23089qh391dcy5bz8ahmuy86j7erz8uxy3eg33pxlguqp6p8e5588ws1h5gbhbnptz99iqdxwdfskmn65ay5zz8dfy8tdr6q3jifztmw2jkykgrcc8b5u2kyi32siagkkj5748ia6arwrzhw03dyf07cv7qlkhmdavpvkwyscw5h0kpie958sxga9hilyl3rrxyzo2pcaid',
                isRevoked: 'true',
                expiresAt: '2021-04-18 05:36:42',
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
                id: 'c52c4987-71ce-4cb1-9035-da19b282e6ff',
                clientId: '48273029-caeb-4c55-af69-6056c4f47ed6',
                accountId: '75b77f6e-f912-41ec-a0f6-ff41d98fe6b9',
                token: 'Veniam qui impedit ex laboriosam facilis. Magni perferendis necessitatibus. Consequatur voluptates iste enim.',
                name: 'el84t32uxgqjo3bee1ufhtx2uz8kjh9f1beevgbgs375gji8jcqu58oo35b8c9hyxyabxfueb4tt3cgn6eoa1ceiifrebku8hv47bs3u8407n368in5263gtwyxr708d1ixh8cpmijr558xxw6rz4nbvx5rqivs2t7afsol2vdzqx8asam4e6qy1kxv44t2ariiltrb97hy8ewm1vsr8r5pfb5fwvhqmix0uyu3nunrj8c8jtbso31bi2uxvs3g',
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
                id: 'c52c4987-71ce-4cb1-9035-da19b282e6ff',
                clientId: '48273029-caeb-4c55-af69-6056c4f47ed6',
                accountId: '75b77f6e-f912-41ec-a0f6-ff41d98fe6b9',
                token: 'Sint quis nam dolor dolor sapiente nihil minima. Consequatur illum non. Debitis vel amet accusamus quo hic rerum quisquam ut suscipit. Similique eveniet qui corporis quia eligendi in enim non dignissimos. Soluta enim totam sit magnam cumque pariatur. Sapiente reiciendis est iure qui perferendis eos veniam incidunt qui.',
                name: 'i1vmfmr40hlko9oqkixyxz2z57d2kdfzrb1ak87psp9laxyxd93b2wv97xxeap2loxejfz6bqz0xhqfm4fzm8zp4c3qb104usa5usyscnx24yu0ljt30rxcoevs3cxu5ndlaqhfxjfdge0is5xfr0dq6g7bp1yqccf0ue7vd2gfg5qb1qq03g1s9ptaadoqmdtfslakdclasn0vx7s57gwr5je4z87znukllepichlx7em8b9bztrykinlxan5f',
                isRevoked: true,
                expiresAt: '2021-04-18 07:46:35',
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
                        id: 'b1618add-2f6c-4529-9dbb-a5078c183c59'
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
                        id: 'c52c4987-71ce-4cb1-9035-da19b282e6ff'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'c52c4987-71ce-4cb1-9035-da19b282e6ff'));
    });

    test(`/REST:GET o-auth/access-token/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/16d8b79a-4673-4765-9ca7-fa892dab3205')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/access-token/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/c52c4987-71ce-4cb1-9035-da19b282e6ff')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'c52c4987-71ce-4cb1-9035-da19b282e6ff'));
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
                
                id: '92d4bbe2-2ae7-4313-9058-ac06f0db60b7',
                clientId: '8d2ea7c8-43a5-4b96-afa8-77e9fa038bc3',
                accountId: '274831ce-3839-461c-a010-d4c66bfbefea',
                token: 'Quis ex eaque et enim et maiores nemo aperiam. Consequuntur et iusto commodi corrupti voluptatum sequi reiciendis voluptatibus voluptatem. Dolore ea animi. Molestiae quia ut ipsa ut exercitationem.',
                name: '3d9bvchzcar7st9ucoyh2yp12acuwrqw2tvovxl5plmr1z792e52cnbp2l8amgto5j2bm4zj0ztpah1ia7rqiz8az2m5koj3dc27o1z583jtqn63b7dp1s013cegdnvl0sv1t1n5ksvdnsiyv4j83sbzz779yvg12i4n6urcxwxp22bxh9qgk5thzhwdvrukqwt3u7d6jwnuzpinct255q9w7md7and2d9z9d08ou7wc1vb25pfrk7yv0c33lw3',
                isRevoked: true,
                expiresAt: '2021-04-18 01:54:09',
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/access-token`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                
                id: 'c52c4987-71ce-4cb1-9035-da19b282e6ff',
                clientId: '48273029-caeb-4c55-af69-6056c4f47ed6',
                accountId: '75b77f6e-f912-41ec-a0f6-ff41d98fe6b9',
                token: 'Sed rerum dolorem inventore omnis earum dolorem labore sunt suscipit. Unde alias ab possimus. Labore laborum totam ex quo et ut voluptas et et. Voluptate reiciendis sit. Minima esse iure.',
                name: 'd9101b24chps717ptfg4lq23tqju1b6hehis7j6g53ewgcy64w8k63scd22dv14kt6v3dgkd8imjtsbvmanw1o4tki2tqa2jmq1c3s898qvaw1rht9j1yl7jaz997gmchiih2lw9jjw4r1ixzztjmxw6zn3zzh63era0tjv1n8xnlgvdqup6jl52quc3bveihpb26jzdnmhl236iwrlgafyfyp9gtt6vbsogrgnmh5pb8q8iwekbvr8f4zfbos0',
                isRevoked: false,
                expiresAt: '2021-04-18 08:05:57',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'c52c4987-71ce-4cb1-9035-da19b282e6ff'));
    });

    test(`/REST:DELETE o-auth/access-token/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/f60b94c0-8dee-4fcd-b491-9c441f44d501')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/access-token/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/c52c4987-71ce-4cb1-9035-da19b282e6ff')
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
                        id: 'ba181629-60c9-4797-b364-b41573d53308',
                        clientId: '48273029-caeb-4c55-af69-6056c4f47ed6',
                        accountId: '75b77f6e-f912-41ec-a0f6-ff41d98fe6b9',
                        token: 'Eaque beatae enim voluptatibus rem. Rem consequatur soluta ratione ipsum at ipsam facilis hic. Eos nemo debitis mollitia perferendis et harum hic dolorum autem. Aut sunt molestiae.',
                        name: '96y5xfl4zny061uqqpwggsyi67pvxuljoldz1ezhrw0phr3ytxrz956s97flczajywmnnc6in8jq8verw4yqwxdjwdk7ihlhatz8pcogw0457uw385i0y9198t49o8i0evxsdhpz0sg0l3ybaug78r8ivv7rmdn8tt1j6t0spmod89s2woh7xakzvaqj6ll473scsmebj55y8mqcvzu17gb5m8b64rb7plq04bkx26fnsz3fmwy63fdmrdtzdyl',
                        isRevoked: true,
                        expiresAt: '2021-04-18 05:23:53',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateAccessToken).toHaveProperty('id', 'ba181629-60c9-4797-b364-b41573d53308');
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
                            id: 'de64a6f8-3837-40c7-a73d-ab96915c2a74'
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
                            id: 'c52c4987-71ce-4cb1-9035-da19b282e6ff'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindAccessToken.id).toStrictEqual('c52c4987-71ce-4cb1-9035-da19b282e6ff');
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
                    id: '84e59c9d-8812-484c-9886-c956d544a921'
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
                    id: 'c52c4987-71ce-4cb1-9035-da19b282e6ff'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindAccessTokenById.id).toStrictEqual('c52c4987-71ce-4cb1-9035-da19b282e6ff');
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
                        
                        id: '128a905c-7d79-4cba-b87e-44223a25cc7b',
                        clientId: '3a410369-9574-4ad2-a048-7ee96da1d68d',
                        accountId: '8c67af6d-92fd-4cc8-86b8-585337c9ef94',
                        token: 'Vel voluptatum maiores molestiae debitis provident ipsum et. Minus corrupti temporibus mollitia corporis possimus deserunt. Quo et sunt. Non ex laborum qui qui impedit.',
                        name: 'w1raouabaih5gbk7i6059z23bwqt2xc4mr71918wosu1v2fojj12dvgkvxymiym50cwi4gvrsi9hxodwrky0up04xb1pmsm6i6klcpf502w1e05i7vberjkv4q8zezvalbhxbx5zthmhpffump551fnoro6ly3dkfehbftpif6qx2b27zsq7k96ijkd7m624vijobpy7xbt8mujghxngvx0o7bnj8cg4w6ffeyloa8wuxudksp7xkm3zod2iu0i',
                        isRevoked: true,
                        expiresAt: '2021-04-18 18:55:44',
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
                        
                        id: 'c52c4987-71ce-4cb1-9035-da19b282e6ff',
                        clientId: '48273029-caeb-4c55-af69-6056c4f47ed6',
                        accountId: '75b77f6e-f912-41ec-a0f6-ff41d98fe6b9',
                        token: 'Quia aut qui voluptatem sapiente. Autem ea mollitia vitae ipsa impedit voluptatem aut voluptatum vitae. Ad aliquam voluptas autem et accusamus reprehenderit repellat et molestiae. Aspernatur consectetur omnis molestias eum laudantium blanditiis architecto. Nam alias eligendi animi id.',
                        name: 'y7j6xt5g9qcom7cmlopnfw4iflxy5w1myw69abgihgyu1vz39tju3jldpar8ys0tl1yeis7tefn3a6r27j7kvg5ndyqn6t8k634q23vcrwig2qmpo29vitqrwbnlf1pebr9r6sq4zaosq4i1rrau55fnibl04b0ehzyf96grwc1vtzejbnuvsi9wxi3dtuib126i7zl0htu2ih3prkjz8onl9oeg56zk8uhuqqye7mimxq5x288upwzvh2hafvk',
                        isRevoked: true,
                        expiresAt: '2021-04-18 09:34:49',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateAccessToken.id).toStrictEqual('c52c4987-71ce-4cb1-9035-da19b282e6ff');
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
                    id: '33f4f30a-1213-4ca5-a0fc-f99ffac5f5eb'
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
                    id: 'c52c4987-71ce-4cb1-9035-da19b282e6ff'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteAccessTokenById.id).toStrictEqual('c52c4987-71ce-4cb1-9035-da19b282e6ff');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});