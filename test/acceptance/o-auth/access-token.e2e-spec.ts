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
                clientId: '06cd0215-5da7-4375-8bdc-de741f81b066',
                accountId: '2a7eb818-9211-495a-8660-b84bc3b3255b',
                token: 'Possimus et aspernatur vel nostrum enim quae voluptas. Rerum odio nisi ducimus accusantium omnis. Nostrum incidunt reprehenderit ad in.',
                name: 'rajc33t8i7rgu8v92elozysgscio5yb3l7917kkdlhjpc76jvqzohh757o0d6gxvcim4ayb2icgne7cmo9budtcwv5r6sg422r4otr9zsonvsvw6shliq1bgy987ixx5tjc3hbcdaat00irbi9bxq36wtoaji16f3rjg4vnmd1573wwrhpjd1suiincdy68pin9018vh5o6xbtkkbbgwtvt8pkz7hx9f3wr243ts4ofdee4v3mxrydyg3wxynyv',
                isRevoked: true,
                expiresAt: '2021-04-15 01:49:39',
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
                
                clientId: '06cd0215-5da7-4375-8bdc-de741f81b066',
                accountId: '2a7eb818-9211-495a-8660-b84bc3b3255b',
                token: 'Sed eligendi illum sed possimus. Praesentium illo explicabo ducimus repudiandae reiciendis dolorum sit ipsa qui. Non sunt accusamus incidunt quas suscipit. Autem dolores veritatis voluptas minus sint ab. Corporis repellat autem.',
                name: 'azuhhz256kfmb5f8ukoltq1pzdnyezl86if941td0lfyb7os18zdjq549fyvskdze8k30f7fjpi3fyzbc5baqk75prqixcogvfkebkvv6rglazhmrylpx2e98dl6j4vxfbf7wb80pum3m4nwecmekxxr02yhhjyxx6n0xedwvreyg5fhsowl2zl3wxtgju5hogysc6d5cnylh4cwy6bjfwyzn47ud0rkpf7b5se5spfwwe99vwpl0130n9m8jm4',
                isRevoked: true,
                expiresAt: '2021-04-15 01:41:09',
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
                id: 'ad87f0a6-5321-4d2e-a679-17601641d45d',
                clientId: null,
                accountId: '2a7eb818-9211-495a-8660-b84bc3b3255b',
                token: 'Esse molestiae inventore a maiores animi incidunt itaque. Fuga et esse officiis necessitatibus. Voluptatibus quasi fugiat sunt doloribus. Et omnis et autem et sit natus tempore nulla aut. Velit ut unde et laborum labore architecto provident ut possimus. Architecto exercitationem architecto tempora aut ratione.',
                name: '01kcx5xspxfqb8sn3g9x4d3zaw5m3km1m0o45qmz9eoog0y8rkicmngtgh250en3e7lrn39fmd7m08yw9g4mdz344ixr2om774h3crminz4jfm4lk4m59z9pszha9nl7cl86b6ejbdx903tvibma92kxopvt56fj5ssy1zc7aqditnhmny2mhlgwm3o8o5kdfxfwu1ae51wtbm6t836hzmyeare4momwyiy2923txx2xejjbrmsbn0uhnvq3og1',
                isRevoked: true,
                expiresAt: '2021-04-15 08:25:31',
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
                id: 'ad87f0a6-5321-4d2e-a679-17601641d45d',
                
                accountId: '2a7eb818-9211-495a-8660-b84bc3b3255b',
                token: 'Voluptas voluptatem quidem est. At dolorem error molestias quam nulla autem. Quasi autem ratione ullam qui atque enim optio vel consequuntur. Amet et unde voluptas qui quibusdam eum qui reiciendis aliquam. Quam praesentium sit est rerum facere.',
                name: 'yqm2h10ue4vw2iae6y6dar8seab1yj9z58qe30igc15j884dfsrpdvfq21sy7qkoy0jnpee0iyc6kua2mcq3kbdmdjjrmruuu4hgiv67mezlebasydlcq7imjiwfc4r69qulc0s5075y7dt3ul6lve951czetafczvpvzhwdnbnvron130vwdkz0vh2j79a1szrwo5swphht8t82gt5pv2tiqesqhfmdrd0gzq8vzgb0t9swbb911o6llkz62v0',
                isRevoked: true,
                expiresAt: '2021-04-16 00:40:33',
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
                id: 'ad87f0a6-5321-4d2e-a679-17601641d45d',
                clientId: '06cd0215-5da7-4375-8bdc-de741f81b066',
                accountId: '2a7eb818-9211-495a-8660-b84bc3b3255b',
                token: null,
                name: '1337fja8eg2yi12n3wkb7t1eijy4d6rccfgj5z2l3ggl32yh03wc2m5j34q50uvdb9fel7bgak9n7j5n1t7meh8k66juwdihcv16xwmhsyiajskpouj73mykg9afs1l275unojglqcuouzrppst3q9qkrnjhe4abarybbg3dc3ephobt17in2v6us1a2eehbswiwx93s6lhhpqiaf306ssexbgc6prym4hqim13u8r21qfw6zcmq7roaa1keqj7',
                isRevoked: true,
                expiresAt: '2021-04-16 00:37:40',
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
                id: 'ad87f0a6-5321-4d2e-a679-17601641d45d',
                clientId: '06cd0215-5da7-4375-8bdc-de741f81b066',
                accountId: '2a7eb818-9211-495a-8660-b84bc3b3255b',
                
                name: 'penhr2i7bz9gjw4gx8uy7zshg0geqz2xmus3xibl0ds481yun3eycyx3bzs2mmpefx6ozw9ix8lokhk1ifdb1p2v0a3782lf8v51pvxsqan6edp6shqo0u5ekf8tfvw6fovn8a45khmbsix92vsmi5z56tjvh8jh9c25y36wsuz485m2859j5f2yc2bdxla48zqddn5s8bmx0u25q04c7mx5arqpczhxotgpkz0i5armt651xlc0aaagh5dsqvp',
                isRevoked: false,
                expiresAt: '2021-04-15 03:52:00',
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
                id: 'ad87f0a6-5321-4d2e-a679-17601641d45d',
                clientId: '06cd0215-5da7-4375-8bdc-de741f81b066',
                accountId: '2a7eb818-9211-495a-8660-b84bc3b3255b',
                token: 'Sed et voluptatem porro nihil minus. Aspernatur non dolorem aut iusto. Iste dolor accusamus ea sunt sint debitis corporis tempore.',
                name: 'sc53hi2qubuivbfifdvl5vre17ne6mkmsb2p1ot8tdikdobk34jpj8sq98m3h29e2olm0cu8qxov7hu62qwacfpxt3fuivgm1ebwzcl9dplmtn10l5do9zl80koqqk3tbcaanpyncd3m28ku5l9keyshmo1xliogcv4iyaewrgj6i5nrz9gks35ctyz6a2g8qe77himp9iuf9k2z3z2fksm9it30kakn6b4vjo4u2eqa0bqnjishiwn729tcnua',
                isRevoked: null,
                expiresAt: '2021-04-15 04:18:56',
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
                id: 'ad87f0a6-5321-4d2e-a679-17601641d45d',
                clientId: '06cd0215-5da7-4375-8bdc-de741f81b066',
                accountId: '2a7eb818-9211-495a-8660-b84bc3b3255b',
                token: 'Incidunt ex illum. Quia qui et vel. Maiores explicabo alias dignissimos ab ut libero deleniti eveniet.',
                name: 'wxt2hafxheoxm76tjn8mjnt4nuk7whxnwg2b15qobgfigsw2fycbvwaa2dltyttavrrhfsmj847w8kzehtp2srfk9jehs16ugnk1s2btfchey88ys7qtcc29gla24q784ejolkspwd24ocyuznn8ia9nx34no3xui4903jks32q4tf6clth63q75cg1onyiy9qigzl6vflqtzfnhp2xa9rn4ys620yc47tp1uehyk61obk74lmkchy9k2e0zp7r',
                
                expiresAt: '2021-04-15 19:05:02',
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
                id: 'en9vz5eo7qjpwbq97zu13det65h5z6m2b3brf',
                clientId: '06cd0215-5da7-4375-8bdc-de741f81b066',
                accountId: '2a7eb818-9211-495a-8660-b84bc3b3255b',
                token: 'Id tempora enim qui nesciunt nemo laudantium quisquam sit. Distinctio explicabo nostrum voluptate enim vitae quasi. Nihil eveniet porro voluptas doloribus. Aut necessitatibus dolor quis ut placeat quam.',
                name: 'dryhc7sdx2kgzb1u83aj43v0bw5m44lu0ba08cudov4p02kp14ub6nxhrm5evp46ozmj0x0skzsrm860oolbv2qfq6j61j1mjc2p9t6ze4pe8qegrex8e2sjbw7sona0xea38knvshho5o6cv0n65e9brzwh4gkir9lsbi4ugu80xj3tgn316jlp9637r6nttmcixv0lmksea7nr2uctiw99ayh1ea7080ya4kmbftz2b1fjxeg4oy6pfjj4y1m',
                isRevoked: false,
                expiresAt: '2021-04-15 16:31:05',
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
                id: 'ad87f0a6-5321-4d2e-a679-17601641d45d',
                clientId: 'vz6jl8lvcevcw94klvc3n18nj48593t2unrqj',
                accountId: '2a7eb818-9211-495a-8660-b84bc3b3255b',
                token: 'Dolorem rem molestias eveniet neque ut qui necessitatibus quos. Autem vel quia repellendus non culpa quasi velit quas. Autem aliquam enim exercitationem aperiam odit inventore. Repudiandae enim dicta sit fuga dolores ut.',
                name: 'oabjvf5c14u9mawstbwyzmn7v0uuccxx95sph90ev3qqcvotstu4jp8cmlm3e5d2yte0ds0k91nx3cqw2hu1v087bpaxjcpxafn2j3maek5ts5ma81ujcmls2bjcldqrqwltcnojpfi4pp0um81ytk9ys06ppkw0bjpje7poze8rn13tcektxmrzbjrdxwfb7vudlgsq77nw7w35i2l2zakhne8wvpq3aptpvfxp794ec0kefm4fksbyergfxza',
                isRevoked: true,
                expiresAt: '2021-04-15 04:17:24',
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
                id: 'ad87f0a6-5321-4d2e-a679-17601641d45d',
                clientId: '06cd0215-5da7-4375-8bdc-de741f81b066',
                accountId: '6kjbiozc1xbhkehqmw0zfvvth9uyh7zj3qgzx',
                token: 'Id deleniti maiores vel ducimus placeat sint repellat. Aut laborum maxime laborum. Iste ut atque. Culpa adipisci nulla. Repellendus vel et et incidunt voluptas. Et voluptatum eum officia rerum.',
                name: 'jjs3lcfovfn7ds2r5i2kbmhq7a2l33l0uwbk6vexmvdjq6yq4tn0sdjmb60fkn1octvwvp5sdbsyu9k748b4l4lcjhffje5eqcjt6soq8z92ju0l9ovh04yaqvfzpakvuhd4k021e8oy9vxxaqx1fdltg4prbjeuvy4tnfvjwffea9r95w1cwcpkbka7sgbtqchiu5zvf89ehrrncnrg5n051nqzezkzbd1kxr8yzqdykk9ynakk7tnsd2dww6g',
                isRevoked: false,
                expiresAt: '2021-04-15 14:38:54',
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
                id: 'ad87f0a6-5321-4d2e-a679-17601641d45d',
                clientId: '06cd0215-5da7-4375-8bdc-de741f81b066',
                accountId: '2a7eb818-9211-495a-8660-b84bc3b3255b',
                token: 'Vitae assumenda et ipsum ullam aut amet. Sunt autem amet et rerum molestias sint tenetur et. Consequatur aut dolores earum ut ullam fuga. Ipsam suscipit voluptatem sunt consectetur dolore et perferendis.',
                name: '81r6u29e2epmeycudzh5l0nukk1bw5o98ye6r6ywph5o31f1xhaskev5jpvz51p91cwlrv7ym92q3ip1gdlepyy0wcd4jei5zf4ouspyv27w4yu5aqxy79k4fnhdz4lsdcv8ywzpbynem2k5c2edha3hopjreafgs2xfk2q8hhc9cm7211bllta0trcomamhbdsz50h082b1sikt8sb2ujkzfyuh74wpf9u1wds971g8qf1lycyv66751f76pq0c',
                isRevoked: true,
                expiresAt: '2021-04-15 07:03:23',
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
                id: 'ad87f0a6-5321-4d2e-a679-17601641d45d',
                clientId: '06cd0215-5da7-4375-8bdc-de741f81b066',
                accountId: '2a7eb818-9211-495a-8660-b84bc3b3255b',
                token: 'Harum similique eaque quia optio qui magni. Velit et non est. Architecto repellendus vitae. Quia debitis nisi perferendis et autem. Similique et facere doloremque. Unde qui ipsa qui illo voluptatum sed reiciendis molestiae.',
                name: 'yo7l3wycb4jzd2mqotkrdx3dljwgqio3hhlmiyxhca0k7rwic797ik0cofx9riyleps9jt4m86zecugq9cfjqn9vfxx0eqtl8a9h6tty79wra5ihmgvofj4phzepl05gkdfba7mcjx6t2kwulti76ro2dwmfzvb7972s1bwe1rmeizvd0luzrwnfddfhbl73ud4gvn26wxftgjxjng44d7nkfjpzwflpqu38o7i5irem4oto3dt4ezpahi7qbb4',
                isRevoked: 'true',
                expiresAt: '2021-04-15 11:18:35',
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
                id: 'ad87f0a6-5321-4d2e-a679-17601641d45d',
                clientId: '06cd0215-5da7-4375-8bdc-de741f81b066',
                accountId: '2a7eb818-9211-495a-8660-b84bc3b3255b',
                token: 'Et et aut sit. Placeat necessitatibus vitae nobis molestias facere iste incidunt ab delectus. Est necessitatibus ducimus. Modi ut minus cupiditate culpa eligendi consequatur nobis. Animi numquam quo facilis quia culpa aliquid.',
                name: 'q4eg70t8lz87vdot4ud5lk9mm8556bmyv630k83vxooke2v45i3639o9hixwzny0qy4g58vfxcmjtbd2yqkrij2ygt1uns5koyqkbdfq4710q2wxy2b3l4qs07d7my9nj189hp0kx3wo81pz0h454oabl5hrk8i0ot6xgskaukvqg6xv2oncbyvo9p7gkiz1nk11ioem7le78v5t9iqtc7v8ni9bs9wsou70rfcb047m0iqhuyhp0gzlk3d7cjh',
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
                id: 'ad87f0a6-5321-4d2e-a679-17601641d45d',
                clientId: '06cd0215-5da7-4375-8bdc-de741f81b066',
                accountId: '2a7eb818-9211-495a-8660-b84bc3b3255b',
                token: 'Deserunt cupiditate dolor accusamus atque est hic explicabo. Veniam quo molestiae dolor iure corporis delectus soluta. Pariatur enim cumque qui laudantium adipisci. Excepturi nostrum veritatis iusto.',
                name: 'u2o241jzjr8jsncr3pzbj0c09fx83i98gxy1izgcyh9kf0omqs0z1znjh48ksrxm6x7slgpo09b2xafc15qb0eo1tt1gr9grqdejdmf53tsc155jckub57p8xjukp6we0wsc30q75t1waolaqjeunejbjb8zz76o3tdh0ev4cwslh5lrpztt91ghg67080glbs105mao4mf6wkuczjf8srbj8595pj40nmr7g58dsah4gy06jem451thz1o4owu',
                isRevoked: true,
                expiresAt: '2021-04-15 17:48:51',
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
                        id: '16881952-4505-4ad7-96a6-e187a633340d'
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
                        id: 'ad87f0a6-5321-4d2e-a679-17601641d45d'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'ad87f0a6-5321-4d2e-a679-17601641d45d'));
    });

    test(`/REST:GET o-auth/access-token/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/fea182f6-df37-4382-9957-41b298ff08cd')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/access-token/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/ad87f0a6-5321-4d2e-a679-17601641d45d')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'ad87f0a6-5321-4d2e-a679-17601641d45d'));
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
                
                id: '9b7bf4e9-9034-44b3-9e15-955b918a19c1',
                clientId: '75d99a2c-9f57-4800-ab18-7e61cf75b3da',
                accountId: 'a1388117-e816-4dcb-9691-a4253956b001',
                token: 'Soluta eius ducimus dolorem nobis. Delectus velit laudantium delectus voluptatem dolore quia expedita. Dolor amet eum sed odit molestiae unde. Sed minus omnis ab veniam consequatur ex pariatur velit mollitia.',
                name: 'vriw31xsvler211r891xjn9nj5kfphqufc2pbnnupt2uifpcczmm9nc59docnpdoghszcthbiq7itibk1qa7hzn6ai93axo76h4dt5vw7r5i0fvd5rftkz9k4uwnt8pl88c6fq3q3pail17rwd8id86s0z5l51l7fn9l33fk56min6mylh4evtzxdduzp0rgppch2j2s1t8n4cml2dpnqr5wobqys7rkwacojsn6ps8eb7tc5cw06bjb1z742x2',
                isRevoked: false,
                expiresAt: '2021-04-15 18:57:13',
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/access-token`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                
                id: 'ad87f0a6-5321-4d2e-a679-17601641d45d',
                clientId: '06cd0215-5da7-4375-8bdc-de741f81b066',
                accountId: '2a7eb818-9211-495a-8660-b84bc3b3255b',
                token: 'Perspiciatis veniam sint nihil perspiciatis recusandae animi aut vel illo. Ut quidem laborum non est consectetur saepe nam omnis ut. Consequuntur accusantium eligendi.',
                name: '9mmmjkvzhwbrkwzwfwtl7xq9vq8wkquzwhuxkzjo5rcy8oso2rhht4g2ogva80mczznp8qiot0eduib1n1n025sc76yecbuxoabvsfl622auyxru8gigafkeewt0i6cvvw09h1yuqtjk96ahzktcakk0wz4ef99hjt7xlddgo8o1u5c0c2o9t4ulct2l8z8ve26c2knzyp9l45p7hgw65vg64uefcx1ior4c47up2l7ytv293cej1tw7bex28cq',
                isRevoked: false,
                expiresAt: '2021-04-15 04:38:39',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'ad87f0a6-5321-4d2e-a679-17601641d45d'));
    });

    test(`/REST:DELETE o-auth/access-token/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/5c48570d-3770-4dd1-8d4a-094b1aa1b81b')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/access-token/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/ad87f0a6-5321-4d2e-a679-17601641d45d')
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
                        id: '06a8ad25-daef-4bcc-bd89-754221d579a4',
                        clientId: '06cd0215-5da7-4375-8bdc-de741f81b066',
                        accountId: '2a7eb818-9211-495a-8660-b84bc3b3255b',
                        token: 'Qui autem velit. Laborum ratione expedita est cumque animi. Voluptatem deleniti cupiditate modi fugiat blanditiis et et quibusdam et. Quis provident possimus.',
                        name: 'ultsm1l7bjjmnou3vgc8uopev9y3mj23tz413bws4fpo752mtewl99lpxmeepiu78bws4nvnknrie57c2031de54xkinpno1m7on218efjlc9er1looir02b1nj655lbcnjoakhursn1apvo4cvyp1wu1ro8indym6j2y536g33hjkafjgqn4b96u2pyngvebpk4oodtophzyvcsdd67pkjysj2snzy5znpshde41j0i58adwt7gi0c4yuzrzcw',
                        isRevoked: true,
                        expiresAt: '2021-04-15 23:31:46',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateAccessToken).toHaveProperty('id', '06a8ad25-daef-4bcc-bd89-754221d579a4');
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
                            id: 'a03069e9-c8df-4ad1-a77e-70e4966c356b'
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
                            id: 'ad87f0a6-5321-4d2e-a679-17601641d45d'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindAccessToken.id).toStrictEqual('ad87f0a6-5321-4d2e-a679-17601641d45d');
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
                    id: 'e51382e2-65be-46ce-a9b3-947e6f3ad854'
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
                    id: 'ad87f0a6-5321-4d2e-a679-17601641d45d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindAccessTokenById.id).toStrictEqual('ad87f0a6-5321-4d2e-a679-17601641d45d');
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
                        
                        id: 'b1aff461-2ed7-443c-865a-9e2bd7bd7e2d',
                        clientId: '2d3d285b-cc79-4282-b34e-38e98923d29e',
                        accountId: '6c89b851-963f-49b7-ac7e-73f3c5e6e5ac',
                        token: 'Veritatis explicabo dolorum quo quod. Est voluptates perspiciatis ut dolor sint architecto. Nisi sunt neque velit aliquam aut velit rerum quo. Officia quam et nam ut eveniet nisi repellat et. Consequatur impedit consequatur cupiditate.',
                        name: '9xwpuv87ym102m0d0xkwvftwdogwjpltgyf6478t8hr7xlvgvbqrj3tpofnbu7pg77ffjd2ejqh86bwsxrxfnfrcpyjq0qpackkps020xv5sacbq7zw3ax068ak36xwzbmovyrzo1pqmca7rbtzyc5bbmousmjzwmhdhnpc5q898kzgykrle5qdcall66ma0xliwwamedzlm4yswmrrpfgfuhu272elq9rgk49nlryalx5rmckmg4gkhlt5319e',
                        isRevoked: false,
                        expiresAt: '2021-04-15 21:48:54',
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
                        
                        id: 'ad87f0a6-5321-4d2e-a679-17601641d45d',
                        clientId: '06cd0215-5da7-4375-8bdc-de741f81b066',
                        accountId: '2a7eb818-9211-495a-8660-b84bc3b3255b',
                        token: 'Illum harum quaerat mollitia odit. Dolor odio blanditiis dolorem. Molestias iusto necessitatibus saepe quo ut et omnis. Placeat praesentium veritatis impedit quidem quae. Non voluptas velit. Aspernatur maiores fugiat quo.',
                        name: 'r8nw6vg5c6stdklj3bxvvnp6x4m81e99of78otl8mx8bls9zy395qdrp52v7ux6f2gmyewgg9siwr0ynqmgq6yazhn3i2g1vx12m4g3ru1qyyp1yq3uq6noo6rpszo672i0iuv8r0n6kqauj6y2jebz9pnfmhrq2pt93mng32ako7uv6qwh0es3w5fjrtlx7pw56drdq9w2fs9c9fkxd6a4a95ydoz2iq1uewle7hc8832awylfhw4frloix7pr',
                        isRevoked: true,
                        expiresAt: '2021-04-15 03:29:24',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateAccessToken.id).toStrictEqual('ad87f0a6-5321-4d2e-a679-17601641d45d');
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
                    id: 'b2d1870c-eff8-4a14-af48-3a1ae58a3f0f'
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
                    id: 'ad87f0a6-5321-4d2e-a679-17601641d45d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteAccessTokenById.id).toStrictEqual('ad87f0a6-5321-4d2e-a679-17601641d45d');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});