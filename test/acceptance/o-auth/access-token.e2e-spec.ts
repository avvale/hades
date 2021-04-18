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
                clientId: '7ba08d89-72a2-4e3c-8305-6efca56fe030',
                accountId: '27e0a56f-5214-4c8d-9608-0b50dc9b872c',
                token: 'Dolorem voluptates eos aliquid nobis aut officia sed asperiores. Dolorum tempore eligendi animi architecto est similique dolor ducimus autem. Iusto sapiente laudantium qui. A itaque ut. Consequatur impedit autem blanditiis necessitatibus reiciendis sunt quisquam iste optio. Tempore fugit aut quia exercitationem quo culpa distinctio quo.',
                name: 'y7c2qxg0zjn53m4b5f7y090c3h093yzoklbghmacdiy9iktkxbcpg196rnkvejtd4ffxyda35rjt5h1lg3qpw4498jg887cvb9lae1idig3qtqo2udzhwioy6klvid1no91o22dza5wk4gyj3reimgkdogpfriwn6j2eohiowtzd9lwstfuglwnvgwh4gw21ze3lconseslxw4ffg6y9vf9hkgm3ygpmfu361xyen7s7yzmspyqgc31bijuq47e',
                isRevoked: false,
                expiresAt: '2021-04-18 07:07:29',
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
                
                clientId: '7ba08d89-72a2-4e3c-8305-6efca56fe030',
                accountId: '27e0a56f-5214-4c8d-9608-0b50dc9b872c',
                token: 'Cum non ratione rerum sit. Pariatur ullam iste. Eligendi nulla sint accusamus ipsam rerum.',
                name: 't7ekhmg871p8xa0ikez55qjfcme71zwth850adkq5e0s3izev46iuy5pt8dv7feaojisl9czfcqogguvcm221dj9fqztxmx8ihx5m20zf15tvwggr59yavmjb353dfyg8h19hpq6no2awjlj7wd17dun1fotfnt2pv3cov9r8rpztowovbdgw4tp4wiu31r7nkkm9vnsftqg5x073d1ypblwhywobnnd6li1fna8rg8de4kyn9qd24be3mbw4gm',
                isRevoked: false,
                expiresAt: '2021-04-18 04:17:38',
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
                id: 'bbd8918e-42a5-428e-a23d-723cc822cacf',
                clientId: null,
                accountId: '27e0a56f-5214-4c8d-9608-0b50dc9b872c',
                token: 'Eum et provident aliquam quo. Est et voluptate velit temporibus ullam natus occaecati iure. Doloremque sapiente enim harum reprehenderit eum velit. Quia delectus reprehenderit sunt quidem eum saepe. Ducimus natus eos id temporibus eos doloribus atque.',
                name: 'ng47yklcaq9dyj4f3ugupdshk45aefde6b94lbwakyjpfykb8eyzt9ophuc5rgyd2eoslgfg60z69bg3k7mwl17hnqgm1qn9peli29gu48m42vynpo4cxp3vht7goi4917kfw5im518vqi022h0oh0fn817vxyqaek2mn7utix70zl9f6dwuqsum31gndg3nkt8w9lfqbjtwu0h6mp7aut7tf0wbx4kk8hbh705ce49psfopetuemzlvpjswm8t',
                isRevoked: false,
                expiresAt: '2021-04-17 23:47:06',
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
                id: 'bbd8918e-42a5-428e-a23d-723cc822cacf',
                
                accountId: '27e0a56f-5214-4c8d-9608-0b50dc9b872c',
                token: 'Aut inventore possimus hic omnis sunt recusandae id illo. Eos aut optio eos ipsum dolorem ut omnis temporibus. Aliquid cum aperiam quibusdam. Vel modi consequuntur repudiandae suscipit non voluptatem maxime.',
                name: '9rbe4s18x6vc4tath3ggfgmd3g80asi8n7aqbn0a19433xegtgztk7f4vevaumswpq9l04e00d475st8jzm3kt9eq1tspw740lgkmlazffrcg84jho4ecylgk5u100jbigw65re9ysgzaanrx8lwsse9e0wlsiuuinp8x2mgwwh6ysv629x8ashjqtstkaqfhys9q5o55ehkp9axkgbv3o0fyyuev14a4l8rwvmxigqlrgpt2todxhy554m32iq',
                isRevoked: true,
                expiresAt: '2021-04-18 08:28:16',
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
                id: 'bbd8918e-42a5-428e-a23d-723cc822cacf',
                clientId: '7ba08d89-72a2-4e3c-8305-6efca56fe030',
                accountId: '27e0a56f-5214-4c8d-9608-0b50dc9b872c',
                token: null,
                name: 'rln75wsr4ntj2yx9ckaif13ux7fljs3loqlfjmxd0cs1dc1xdoq9jeb1jve4oyg1ix4dvk6a6y66rqvf6gpsr6kxrp8e6iy9utkpp2ypouciypsmflrzzwmvcz4b88rrsvhyzc5yz2s3zbcp4gtx5c8mqs95d8oodyh0ml02rwt4gbykwnlcefjgzh9j27g5ywu6ugfmxgf70wixra616w98vt6iag3ldwz06jdmvfv0z7xwrxtter7znl6rfxt',
                isRevoked: true,
                expiresAt: '2021-04-17 23:23:01',
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
                id: 'bbd8918e-42a5-428e-a23d-723cc822cacf',
                clientId: '7ba08d89-72a2-4e3c-8305-6efca56fe030',
                accountId: '27e0a56f-5214-4c8d-9608-0b50dc9b872c',
                
                name: 'qh8pkv1d3mwh12kv7j30925739oxo0wi2gvbr05g16r5tb3qajtvtponxtf8b1h9zgml41ptn02kr30jn389mncqix366hzxe7jh98l9kpl4rte6mq1gsrf0orbnlpqkbdxbjjqlfyvf9bpe8hcv9u0kbyrw7nzc97kh8g8zap13q8mtit6c6mn72zvy8vinm8sv3i8vxt5jlf1v7gd1h77tzosa9fikofisn23sw55prwv0qu9dxvait0yxhwi',
                isRevoked: false,
                expiresAt: '2021-04-18 18:42:04',
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
                id: 'bbd8918e-42a5-428e-a23d-723cc822cacf',
                clientId: '7ba08d89-72a2-4e3c-8305-6efca56fe030',
                accountId: '27e0a56f-5214-4c8d-9608-0b50dc9b872c',
                token: 'Aliquid culpa assumenda incidunt. Quia enim molestiae aut et quia officiis suscipit. Et exercitationem ut voluptatibus sint deserunt cum. Praesentium rem cupiditate nihil reprehenderit. Enim hic nesciunt officia qui reprehenderit et est impedit.',
                name: 'vjtaj1xhfw7b94feawi2wh6xaj0ucv6uswyzttn8kyfil49d6898qnzhqbgrfkc0w0n8osn4qmenjvtb4yfxgwffns9hs068l5lf1r4p88uluvi0uczp9dbx8yykg56urk58xyvqcr9x8oz807ncno2gwmzde3i1psokf614sblx6yira0ttbg6ftc07vqp6foqpc4xufewvedv2mr7uq48dttq1wwd70myk953e8hknlwgwoclkpg4jloj52ej',
                isRevoked: null,
                expiresAt: '2021-04-18 03:01:55',
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
                id: 'bbd8918e-42a5-428e-a23d-723cc822cacf',
                clientId: '7ba08d89-72a2-4e3c-8305-6efca56fe030',
                accountId: '27e0a56f-5214-4c8d-9608-0b50dc9b872c',
                token: 'Quas aliquid voluptates ad odit. Esse a consequatur qui similique ducimus tempora. Rerum dolorum molestiae officia nisi. Ratione ut eveniet fugiat. Aut totam assumenda velit cupiditate repudiandae.',
                name: 'q2fr6c5tfb6bm2jl0b7wnk6wjdzkqi7h1p86j1p30sndti960h0tmabrdmqz52crk1yz3f04lvep6zs52lbbrkt4kas1upzedlc71xpdncjt9b95q3hynhelez3nzzjsysuiee60dcldckn13s9fl5cjrv2xt2yez6v8mcb3w75xtzy8aqb7hdhyfe36jlyispgaigh6kg8rl841x1igrjj9fx7dri7yba4tau2ff3ui4gnvuo1lq95xfiyq4n2',
                
                expiresAt: '2021-04-18 04:32:13',
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
                id: 'lkkqh2j1654niarb73d079kmod2ftp0jczi46',
                clientId: '7ba08d89-72a2-4e3c-8305-6efca56fe030',
                accountId: '27e0a56f-5214-4c8d-9608-0b50dc9b872c',
                token: 'Est enim qui maxime facilis quod quia eum. Dolores dolorem velit tempore corporis saepe recusandae voluptates molestiae numquam. Eos quia magnam et. Provident molestiae corporis exercitationem quam cum. Deserunt dolores distinctio.',
                name: '1epuke2xa83trm1jdnoeg0bv44gzaotz2qsu9jzxsrbde913yera0av0oe578j11f5g6on6622i7thn19yoqfk2z4src7tmkj0a20o12uzl0s41qgyhofs0b20xwvcrl8umv5evw2xsp8x7gvrl8mlx3csk8b6blybr0k8ew7i7uywcvy9syur9iq12qhm1bcvlhksl9mkjlrnp0y7pqv9r2gnusz6wf45zrfo23zaf5jjw0dml3v7qew688ygn',
                isRevoked: true,
                expiresAt: '2021-04-17 20:14:06',
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
                id: 'bbd8918e-42a5-428e-a23d-723cc822cacf',
                clientId: 'cppjlk8zjmlci3l1dcndakh54wlc0j90lco6j',
                accountId: '27e0a56f-5214-4c8d-9608-0b50dc9b872c',
                token: 'Voluptatum error vitae excepturi animi voluptatibus. Et nobis eius. Voluptas inventore ratione consequatur sit repellendus voluptate minus voluptate.',
                name: '7p3rfzsfew5cku8wd6rvllhb7gz1im5wk0ms2ko2jqgndev98j791w9ps97c93o0sen8fxjuexy5uap8evrgq4qdev5znbxh7nxvaf1h23gb8fv7tx9px7k01ehlkenfsh3vhp0crjhuavwoqo626khcjlemiyaja0c2uclakyzn38rmpxw68r81xa415kldb8xm693bqrs6arnj7w8rier622jyjlujdvatmgs2fyn7ymzl60efa96ip2kex9h',
                isRevoked: true,
                expiresAt: '2021-04-18 05:06:27',
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
                id: 'bbd8918e-42a5-428e-a23d-723cc822cacf',
                clientId: '7ba08d89-72a2-4e3c-8305-6efca56fe030',
                accountId: 'fnn85qcmqlbwljpyopm48o98xwkhymtpfh8yd',
                token: 'Odit earum provident eius libero. Iusto mollitia harum corporis beatae officia. Et ducimus culpa aut sapiente est facere. Est qui reiciendis quidem non et similique et sunt. Enim quasi ut error dolor earum quaerat accusantium. Non delectus nihil odit eaque eum incidunt voluptate.',
                name: 'rfqq4w4dwtk0aatkerkatqxkx28alczvustv3bervm1ulcsiajjnn8ugbq4tx4twh6k96ipco2imitrfq7qjx9dc8v0p1r48noalcxn2h4t5bp5rbkwp83picr0b8goq8twfv007r2if6zu0u5c3bosx3y1c75r7wbua7iyv9hqwaq4xcn0k29ym8bsqfq3vylopm9s4ipur8gcs2oz5xsgf87iyilnm93p9x0eziv2jryy32tynob2puggql1a',
                isRevoked: false,
                expiresAt: '2021-04-18 06:03:39',
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
                id: 'bbd8918e-42a5-428e-a23d-723cc822cacf',
                clientId: '7ba08d89-72a2-4e3c-8305-6efca56fe030',
                accountId: '27e0a56f-5214-4c8d-9608-0b50dc9b872c',
                token: 'Quia dolores autem quam. Recusandae velit corporis ad sunt odio dolores rem blanditiis. Aut voluptas libero iure eligendi odit voluptatum maiores aspernatur. Quidem voluptate nihil voluptas. Accusantium veritatis labore saepe nam non voluptates repellendus explicabo. Architecto rem doloremque dolor eos deserunt delectus qui.',
                name: 'nzqq6vn7f9ajupjhj5opp1f4wc5kyw4dibf1xeaf1caeyv2rosx2l18tb56k2335yii1l9sx2mvshsstvazy6mysxjyi2qi93641p833fh4nz9fa1ws8avtd1o47stm8br1oifa1gwk5r2elogjceq39awqlqyoski07pjsgmg1ab6m4ct299up8rxo6z8qvlyp56i3b9gebn8g9mxen9p0auufafruvsp95x0e1obuorp2erlzajhntvgjxb1mq',
                isRevoked: false,
                expiresAt: '2021-04-18 05:51:45',
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
                id: 'bbd8918e-42a5-428e-a23d-723cc822cacf',
                clientId: '7ba08d89-72a2-4e3c-8305-6efca56fe030',
                accountId: '27e0a56f-5214-4c8d-9608-0b50dc9b872c',
                token: 'Amet veritatis qui vel adipisci nihil corrupti. Alias sit neque delectus iste iure perferendis. Rerum cum expedita quidem itaque magni. Aut quibusdam voluptatem quibusdam velit numquam. Iure assumenda fugiat. Veniam fugit aspernatur ut sequi possimus saepe quod quia.',
                name: 'dbstf3xf1ppnmidtew0q2lrpr3y5jkao3fcyq7nvvp89y0m443w5o49sj44f3q4fld28hyllakcjezy5xuiwznpgr4dlqj6zl0aan19dx07cqh2ezjfztlvponlsvnwhm27ixq5t2ifux1h93pe9n70hfstuo3hxo7szngzcdctxxc0h2ckd2p3y8xyxkxvdvs0245b60wjnhovkz7zgjxow9rwin7xyvkqz1yx5w9j612v292s6ff1zc3z8s0f',
                isRevoked: 'true',
                expiresAt: '2021-04-18 04:58:36',
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
                id: 'bbd8918e-42a5-428e-a23d-723cc822cacf',
                clientId: '7ba08d89-72a2-4e3c-8305-6efca56fe030',
                accountId: '27e0a56f-5214-4c8d-9608-0b50dc9b872c',
                token: 'Quis quis nobis consectetur asperiores et non. Ut dignissimos quam perspiciatis aut. In aut ipsam fugiat earum in harum molestiae eaque in.',
                name: 'laux4l8oups0uu0jp6s4gc1e3ipiz6m0o4uaml8vs0r94wp75tg9f97rnlxexc47mo1hl53fp530z2cna1gu1u7s1sbjkyp9kquyg6x6e2p11ol3paobs1hz4csunnahk2n8gxer227h717mo81hfz716v8sjz7nbzp0agjstp627werl1iiuvi9gp6dv0r02zetqvh2qfsglwu0s58v9pubcl3b6qizj8tlrwzhg0arxi0ssbi3ekk1nukzwmp',
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
                id: 'bbd8918e-42a5-428e-a23d-723cc822cacf',
                clientId: '7ba08d89-72a2-4e3c-8305-6efca56fe030',
                accountId: '27e0a56f-5214-4c8d-9608-0b50dc9b872c',
                token: 'Fugit libero corrupti. Architecto dolore nihil eos velit. Nihil sed laboriosam ut est.',
                name: 'rszstp38x0carrwx406xzmkb7p7mihrwql428t5inv5tshh9cycfyyqkojyzcdefdpbqqqzajtu1ynf3utly5tb2i7ljwtwogzl3z1z5d36yz77qbxsfg19z68jhd15sz36e4tpjndo9qdetw18ij15162it96sjfnfta2ojx1sufkpjfd2b1jbzvz8897f6ua2kzxx2w8gjegxmv6ivlak66t7c0zpxkcpfbkzwai09vgq9zh265g52agakek1',
                isRevoked: false,
                expiresAt: '2021-04-18 12:59:51',
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
                        id: '2a8cbdd0-d1a0-4bcb-be04-d0f691b36981'
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
                        id: 'bbd8918e-42a5-428e-a23d-723cc822cacf'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'bbd8918e-42a5-428e-a23d-723cc822cacf'));
    });

    test(`/REST:GET o-auth/access-token/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/0b326d41-6d97-45bc-8d00-822abe5df7d4')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/access-token/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/bbd8918e-42a5-428e-a23d-723cc822cacf')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'bbd8918e-42a5-428e-a23d-723cc822cacf'));
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
                
                id: 'df478266-7f18-4e06-af32-c839b90afe83',
                clientId: '0a5bc8be-5528-4111-a411-384b0b77ecce',
                accountId: 'e3336781-992e-4a87-a2e6-1e89658458de',
                token: 'Est aliquid molestiae tempora voluptatem porro molestiae. Repudiandae quia praesentium est sit et. Deleniti tempore porro non odit. Non fugiat necessitatibus cum veniam cumque harum ut inventore.',
                name: 'u1jwar1dvukn05ebglz63e1gpsdf94verlmslu7ts8g2c7cnzjn30644zka21kyxlyg00dwmkw6x3qqy4qbj8tloajhzdqu0vlry3gxb5mk4qoxh26onh9p803uzlregullhjs5ojkmzecawy12l7g9lbn83jr69xkjqqv6k5fl7zzm7hgb6jzq1e9k0mrcy4x7g566fu05lam5nft6517ajozix030vp52cjn0qz9j72j2vs5vd3y3945t0r20',
                isRevoked: false,
                expiresAt: '2021-04-18 18:57:45',
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/access-token`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                
                id: 'bbd8918e-42a5-428e-a23d-723cc822cacf',
                clientId: '7ba08d89-72a2-4e3c-8305-6efca56fe030',
                accountId: '27e0a56f-5214-4c8d-9608-0b50dc9b872c',
                token: 'Magnam vel dolor dolores et. Pariatur consequatur non cumque mollitia omnis rerum. Aut illum excepturi non dicta sint commodi. Beatae error dolor mollitia. Et dolorum quia suscipit et itaque modi.',
                name: 'tfkvqebx2ke18jvk7ikj7n72dey462bi8tk3vlkc4rjavsukkpawoivwjqce68egkvkhi4xx92zwgu35vzbpnnpjj9j59d5qjct40a4ymnbu899lrw3xo3nm8qr4cgwbd7vfp9sjwe5x110f398ht8nlpszif0je6wtc0pdpgervjfpnyvd2w9gorpyqjnw272ir3ipyiuirgcskev9ef5s1obco9tzz2u8c515x3fbckvi83rchwe3i8gz617o',
                isRevoked: true,
                expiresAt: '2021-04-17 20:16:42',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'bbd8918e-42a5-428e-a23d-723cc822cacf'));
    });

    test(`/REST:DELETE o-auth/access-token/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/0438347e-108f-4c05-88c1-c5ab57ad9aab')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/access-token/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/bbd8918e-42a5-428e-a23d-723cc822cacf')
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
                        id: '02b9da36-6c23-434f-a574-8f1218e35a41',
                        clientId: '7ba08d89-72a2-4e3c-8305-6efca56fe030',
                        accountId: '27e0a56f-5214-4c8d-9608-0b50dc9b872c',
                        token: 'Qui quis eaque. Ut necessitatibus dolores incidunt est magnam. Praesentium qui exercitationem non quisquam natus impedit harum quod debitis. Earum omnis sequi animi sed ut magnam aspernatur omnis asperiores.',
                        name: '74nj0innu6jpjm9hlcxx7gbmrtvjqkstoc9xkycdvqb6w4wrsspv3k3qeq6yahh8j93i1cusre7gacny4mk82ad1erhwsvxkkw0xnc3yldqrmdhq7oucbv6pja6moew5jdltbu8gtbhx0lv0b2nb9rfi6ltm7qpuaokoxsibe67asomzxf8irhua1u8cr3asy79u7c1q2q71msw81bi3wamph4ilrz9uozy560qyuwatedumzu8cjwk74xvovlb',
                        isRevoked: false,
                        expiresAt: '2021-04-18 07:57:36',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateAccessToken).toHaveProperty('id', '02b9da36-6c23-434f-a574-8f1218e35a41');
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
                            id: '36417c51-b21a-4aab-a828-108a68f98ae1'
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
                            id: 'bbd8918e-42a5-428e-a23d-723cc822cacf'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindAccessToken.id).toStrictEqual('bbd8918e-42a5-428e-a23d-723cc822cacf');
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
                    id: 'e2391f1c-382e-415e-9a87-20993cb1c19c'
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
                    id: 'bbd8918e-42a5-428e-a23d-723cc822cacf'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindAccessTokenById.id).toStrictEqual('bbd8918e-42a5-428e-a23d-723cc822cacf');
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
                        
                        id: '7cc8fef9-0a86-4db8-8566-351f458e7c5a',
                        clientId: '8be0dfa9-c6ea-4a10-884e-0caa5d9c3534',
                        accountId: 'bd4ced3d-1789-481e-b3d6-e058305048ad',
                        token: 'Sequi soluta et architecto nam corrupti. Voluptatem dolor sed quisquam quia est sed molestiae enim quo. Excepturi soluta totam incidunt laudantium deleniti tenetur facilis alias. Quo minus dolorum.',
                        name: 'e3zpsir3cqrd0yn7nmfyn0yudhnh33ge5c2mslaaapiyxka1rf40d0wrrcmxdd20cb5m8bwwzja8i2xxg6g7qpbaifwv0f10ausfvro03k46q1mg77oa9qbgja0483opxoz00q00h248abbsdtsmxkwj27uqg58rsmsjg4l6g6bduosy5okztovtcvyvkjdlrf7tbx4zti3cn8lfo2nkv4toasyhy60mxkp7wm8n98sc6itn84ye7aanadegip7',
                        isRevoked: true,
                        expiresAt: '2021-04-18 08:19:54',
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
                        
                        id: 'bbd8918e-42a5-428e-a23d-723cc822cacf',
                        clientId: '7ba08d89-72a2-4e3c-8305-6efca56fe030',
                        accountId: '27e0a56f-5214-4c8d-9608-0b50dc9b872c',
                        token: 'Ut voluptatem impedit autem natus. Nihil esse placeat adipisci impedit earum et facilis quibusdam. Aut mollitia est enim aperiam iure dolores doloribus non. Illum et deleniti quisquam deserunt. Delectus atque nisi.',
                        name: 'vmnoqppx1m4eix453o2dn6xbvgw69lu0exlf6h84zfk72okcvvne6rtjgrlv4gf6lvdzsxa5uzyfigsssrcsiwn3bne6y00ib3kjzhfb0efin8oldzmkx3ofs7tz0yjfk0ck4i59rugda37x9k9ym8xx0s05sm4l39q0k3gsa9q9yhayka2lw9e0lehmr87hdvtq60w8i3m9v8erk3oohozelvf9r6hjdtk0l01fw0fnp9hl2xqb8cifsaoa3cb',
                        isRevoked: false,
                        expiresAt: '2021-04-18 06:04:26',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateAccessToken.id).toStrictEqual('bbd8918e-42a5-428e-a23d-723cc822cacf');
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
                    id: '150dabe8-90ef-4bc9-bb88-c98b7ceb9d51'
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
                    id: 'bbd8918e-42a5-428e-a23d-723cc822cacf'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteAccessTokenById.id).toStrictEqual('bbd8918e-42a5-428e-a23d-723cc822cacf');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});