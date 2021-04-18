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
                clientId: 'bb120771-4df9-4da1-9a8c-7f1c26076d2c',
                accountId: '072fa314-be47-48b2-9f59-3e83524d0b21',
                token: 'Tempora quibusdam voluptate veritatis molestias dignissimos delectus quisquam. Iste corporis porro earum qui. Temporibus quisquam id sit eligendi sit. Et at et sit minus deleniti ut facilis et. Cumque aut minima.',
                name: 'iqtvh7q1u4ib5ewjjmy48nf3z1td5a5mg0rgg93lyu4t5yhrqu85f4acmbouqoskqje4m0clsxcill5oksj84m06k3ik1xlusf6n1uop89zo7jh1gsctjlrzzfhlra70c0jhvqhnkod35ipaooiv1jpdnyq81eh9qwvipufc6gdig127juc45exh00nz6aohmhjsbhoqex6an1wzpcej6o0kjgkjs7rjvv1d6xzpi9owv5bp8be98zfx7b5ax4z',
                isRevoked: true,
                expiresAt: '2021-04-18 14:32:49',
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
                
                clientId: 'bb120771-4df9-4da1-9a8c-7f1c26076d2c',
                accountId: '072fa314-be47-48b2-9f59-3e83524d0b21',
                token: 'Dolor ipsa excepturi eum officiis repellendus. Deleniti ullam neque repellat voluptas. Quam quibusdam odit saepe sed non sed. A placeat et deleniti aut culpa perspiciatis reiciendis officiis.',
                name: 'qyu55z3o8fh6wmsjaa6b11byxdfk2448x6iosw60z3ed48kmcitqwe45cewrwf0n59mhza9e5dxt4awlgaolaowx5q71iucx5s62uxusd7ah4mvxzle3wkg9tmo2wudvyz75vfrvjf6szqmglona8lcszxlpp7f8m58ujgra3t9heavuhsw9hy50izkkmlbjay6hys6qyup13myq3o7ux771b1a8sg6o6at7m8jauknmo9501oeo2ahnrs77ifl',
                isRevoked: true,
                expiresAt: '2021-04-18 06:30:47',
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
                id: '81673479-6adc-40bd-a680-68469825ca1d',
                clientId: null,
                accountId: '072fa314-be47-48b2-9f59-3e83524d0b21',
                token: 'Velit consequatur quam perspiciatis sunt recusandae omnis impedit nobis. Ut accusamus architecto qui nesciunt facilis iure nobis. Autem laborum fuga doloribus.',
                name: 'ynudqurgq3pmtujfaldj8ivvlaeeg8e6uvfnqe0tpzxf0y7krh39koo1x2vm5huvhc1fgw5ebpablz5v0waxrdbr5id0vz491xj19u1riay4c0j1sajzdbjh5csoxa6xjie3q1qxqenuq870d4upus8wrhtluv4nggbu0q4f0aow08og8cthzluuqowak5we9upqaoxirhlzp9jhenrjue03f6xvyfcitqnauuf35mhx1udh7f80s82ae2j42s1',
                isRevoked: true,
                expiresAt: '2021-04-18 02:39:40',
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
                id: '81673479-6adc-40bd-a680-68469825ca1d',
                
                accountId: '072fa314-be47-48b2-9f59-3e83524d0b21',
                token: 'Iusto rerum illo non est aut sequi. Repudiandae minus doloremque id sint. Ut ipsam corporis qui.',
                name: 'iwb80veerqzo2wn19ojpz5qwoyxn7jfj54lwnrm0abmmgqlmcfoafebmihaqwc1l5y4spvdbfvual8c27i6hj8jeusjsy79whw4712ngaiqe8f5zq9lzeirior5o5s8j5b6pb8wpgnnw575pq4t235b4ba40no30ny9tvym1uf31akee1smhazbbgnj1272htwhzdflwqgv3pwh3296fnc3pmb5cy4a2aggbr8u0egoa4f9e1zz5nb8r5t6lf0a',
                isRevoked: true,
                expiresAt: '2021-04-18 14:17:12',
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
                id: '81673479-6adc-40bd-a680-68469825ca1d',
                clientId: 'bb120771-4df9-4da1-9a8c-7f1c26076d2c',
                accountId: '072fa314-be47-48b2-9f59-3e83524d0b21',
                token: null,
                name: 'uqz8wsgsr7lvld1dfg1lkb2pnnj13rjyn3pnqfyqp3py5jvsxoah09hzya6u46xljnjyho2kg9bj2bwo3k3bemp1j4ghkxx4dlxf8woisnfn7wzv8sl7uv9u4yk2issigewxvkj32lrpn1oeop25km08b5xz0wc34bij87my11s0ff7d2onqkeds9z19lm7tb6tph4oepakv576v0crpmfpc2mzcom7yv2uecpqt9hzgkykyrbdfzh1qiixwu20',
                isRevoked: true,
                expiresAt: '2021-04-18 10:50:26',
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
                id: '81673479-6adc-40bd-a680-68469825ca1d',
                clientId: 'bb120771-4df9-4da1-9a8c-7f1c26076d2c',
                accountId: '072fa314-be47-48b2-9f59-3e83524d0b21',
                
                name: '9wt6gl2oe6go3dj921unplknemlc1lfqkiinlwprbmtt1s7f07qcqkcla9idh663b5sy9u6wewb2jprc3v5gizxww5bzv93uhp18sodu0gnpkbaylb4y8wfxe4dkhi4dr19i1zaie5nn692skqcxbd5sxr0s1nolqqq06a6mcozak56pfy2qxt841gxos3dj54941hpfk31dhmj2bvilgj1ucboqn73h0ynyabxqvwe5ppe7b3jd5bw9vwomehh',
                isRevoked: true,
                expiresAt: '2021-04-18 01:43:33',
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
                id: '81673479-6adc-40bd-a680-68469825ca1d',
                clientId: 'bb120771-4df9-4da1-9a8c-7f1c26076d2c',
                accountId: '072fa314-be47-48b2-9f59-3e83524d0b21',
                token: 'Quae aperiam vel animi quisquam eos facilis delectus sunt voluptate. Qui molestiae fuga ipsa et corporis quo iusto. Quia ipsum quis est mollitia incidunt molestias eum facilis voluptatem. Dicta maxime doloribus corporis possimus illum molestiae aut. Sunt vitae perferendis.',
                name: 'aca6a67jgr20555munv0fa23s5hbbq6cqk0l70vmkhijkffeyjx6qa2l3y7d7hwtnrl3foiuwr9kwjthm3l7b66pejtm3fnt8utukghhnz313r3omew0zlf85wzbwn2vw8bhvic8vidnl6rweo8bjwsa6rfnf4kfpj4820la3boee9dmr19pwwdhnqx6d72wiq1txq1htznjdn36l1u548nte5i2h4b6gulicos75lymfz7jboi3ckgqrm4cmve',
                isRevoked: null,
                expiresAt: '2021-04-18 17:33:27',
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
                id: '81673479-6adc-40bd-a680-68469825ca1d',
                clientId: 'bb120771-4df9-4da1-9a8c-7f1c26076d2c',
                accountId: '072fa314-be47-48b2-9f59-3e83524d0b21',
                token: 'Mollitia id recusandae illo debitis. Numquam pariatur consequatur quam vel quidem facere. Nemo error sed corrupti tempore ut minima. Ea et in asperiores est atque. Qui aperiam pariatur consequatur pariatur beatae labore.',
                name: 'a9s41iz160b6ypj6rjo0r0pz1buwpgaze8eh35zy97vovz0e8699i3g3q1ixrljk0auog0qlfo9wrw8v6q3ytw4wyex3tklum08o849m45zzs1zonbu32h0ilh9uf7jromyv3pfkzp94h14lsrpmldctfs04ise592rv0fsjw7q7zgw7ysxbifp1yno0r44p6msmhre30irpa7bqd857fsghlifa5bqh8mjin2x55ofm1kowh6qehr0rqtxxs1n',
                
                expiresAt: '2021-04-17 22:10:14',
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
                id: 'y0lra8hjb1tvxb1eor2bi6l0pbvehsuichwbt',
                clientId: 'bb120771-4df9-4da1-9a8c-7f1c26076d2c',
                accountId: '072fa314-be47-48b2-9f59-3e83524d0b21',
                token: 'Ut quo ab eligendi voluptatibus. Odit sint quis quae eum dolore accusantium nam fugit. Rem blanditiis quam natus consectetur eius est earum. Vel illo ut quasi quod quaerat. Blanditiis deserunt eaque perferendis ut voluptatem ad.',
                name: 'p4tvz5lt6crv4zzrhbvv1plt706zx7ume2y2op87yuoac4qgifmu7m68wje81azlit85dc98r0a5j0cuze9g48gfgp21jaxd90t2fk6i7sv049fxwci6c8kjjd4ivzowrhsm22qw9fbzds9cr9sjfh0pqchldv5vs6a2j9zqf08tn5t7hzk7ga6e8tbzed4gjht4wkv6daek8z5tb33r33328me3iibanjg56jj0ylpiwij1jz73bbfygsm9zf6',
                isRevoked: true,
                expiresAt: '2021-04-18 16:24:48',
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
                id: '81673479-6adc-40bd-a680-68469825ca1d',
                clientId: 'fnciqmp9qlgv672tp6eqm0d9zkpn38vzlw79t',
                accountId: '072fa314-be47-48b2-9f59-3e83524d0b21',
                token: 'Quos in sunt et inventore. Ipsam corporis eveniet. Consequatur ipsam et fugiat.',
                name: '0eeyk5m0r54msrgahe4teiv4s0xz17qvlgsbiksxob8lerk4ykfcjjjgva7qy6fi0c87ja9fquznyox3tt6u1jnbqjihfi8nt4f8njw07zjztv14z7kwcde15xa9tn0neiptnkgn3qhh0qcbhmhq7pos1e0v163via22h68j6n4evgbr27pnc5vkiyuwiz7sdjjvptybfm5r4w2e0vfmdc5sadafbzlbyqx36ldnafh7ore392tz48q23kq42ko',
                isRevoked: false,
                expiresAt: '2021-04-18 06:19:48',
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
                id: '81673479-6adc-40bd-a680-68469825ca1d',
                clientId: 'bb120771-4df9-4da1-9a8c-7f1c26076d2c',
                accountId: 'gn3uilk15q28zaebmktbwuo7u5x9vxwu5w85t',
                token: 'Molestiae voluptatem sunt molestiae aut ullam culpa. Dolore sequi atque nulla. Vel molestiae ratione pariatur quisquam ea. Animi velit corporis modi modi et et voluptas.',
                name: 'ijjzhtxsi1jyb21lwrlq2yw1a3f9yiuvc6t8sngwp4yuth3oym43q673x6mujkin4sjtupqo8avqriq0wo3flz7nxqkeo0qwrhxdz96ubwb0gaw6yooh7fzq5qs7xjh8bbubyys8u85zxmgrzxd486lqx16gzu7y97vj1thi0w4wp4gu72t4w4f0ksdcss6eyo3zy747irupl2wvafzap91o91ez0qu1rn6bmyg7hyq6f4ysqufkynt08atz4il',
                isRevoked: false,
                expiresAt: '2021-04-18 08:40:11',
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
                id: '81673479-6adc-40bd-a680-68469825ca1d',
                clientId: 'bb120771-4df9-4da1-9a8c-7f1c26076d2c',
                accountId: '072fa314-be47-48b2-9f59-3e83524d0b21',
                token: 'Esse pariatur doloremque aliquid architecto magni aut et rerum omnis. Saepe sit exercitationem quam officiis voluptas placeat. Inventore eligendi praesentium nostrum blanditiis nihil quisquam aut reprehenderit debitis. Vel aut dolore consequatur molestiae. Voluptate necessitatibus reiciendis perspiciatis ipsa iusto magni inventore. Eius harum voluptas quis inventore nihil vitae.',
                name: '4c3d3wjufefspow2rcn6jca17lpncodra9krvt8lbocmdk9ft48917iczh8ayjfj0vdiuupq52qf5cbu7slq0qedh2w3aq308snneneha5rktwfxgdhdz3k7o1ruopc7342tcarwg5flgkxf4ytwf9txo4fi3tctghdw9o1a18fiavlzfzlh3181ttu5m5wmdl0jedaqhj90carxjypw15cvho6tnskgt02ic5rt0vmk8hrf6lqt6jj5tq87mcev',
                isRevoked: false,
                expiresAt: '2021-04-18 14:41:59',
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
                id: '81673479-6adc-40bd-a680-68469825ca1d',
                clientId: 'bb120771-4df9-4da1-9a8c-7f1c26076d2c',
                accountId: '072fa314-be47-48b2-9f59-3e83524d0b21',
                token: 'Omnis minima deleniti. Sit qui aliquid numquam quis animi. Sit sit architecto ut quis voluptatum quia. Ut qui temporibus et cupiditate. Ratione maiores minima odit deleniti porro.',
                name: 'hi0djpa71vujlamz7w3b9rsgm6omuljqmpxrsc4b7797yuuanmmof5chkf5cwoou678c0wse8aqn87q31x2l029cbgmrjke6ldm3g3q1f0sfe1dic9my0qze20w20u7eqgkqyyiike0t1n76p0zyr3cyegqp85m2b6jxsn188w06k9fl84y6pv5t0x17qfcrp7sykbaus5pcbr5hq4c8i29awwpd16kownnee3rd0lwvpv08n0d1z8npcnj0rjq',
                isRevoked: 'true',
                expiresAt: '2021-04-18 06:00:06',
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
                id: '81673479-6adc-40bd-a680-68469825ca1d',
                clientId: 'bb120771-4df9-4da1-9a8c-7f1c26076d2c',
                accountId: '072fa314-be47-48b2-9f59-3e83524d0b21',
                token: 'Animi doloremque corrupti ut eos error voluptatum esse numquam omnis. Quod error architecto quidem. Officiis consectetur reprehenderit sequi et corrupti qui voluptatem. Numquam at quasi est dolor asperiores libero praesentium.',
                name: 'zag1gss1dsjcfhq6n00zmdb73eil7oljhneivdw6gkjim1bafkow7pxbd673x6f1gwf9um2ycm5z44dgq9puaqsriwlue8bt0g7zwjmr6e2mmbp2wx7b16xknm4o7zs1ua0dd2wsu9m8wxh6bdnyl73tvpqhdtjtt3fpi772ghyf5yoc1xknzzdzjgu3e32iy76m3h60ojl0w907vw2t8dini76e40zvoad1nbc8kvezi6q8bburc8ub9gi7e8u',
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
                id: '81673479-6adc-40bd-a680-68469825ca1d',
                clientId: 'bb120771-4df9-4da1-9a8c-7f1c26076d2c',
                accountId: '072fa314-be47-48b2-9f59-3e83524d0b21',
                token: 'Maxime maiores vel id vitae pariatur numquam eligendi quis. Sed minima voluptatem enim quae magnam qui itaque. Est voluptatum similique ut tenetur officiis quibusdam sit.',
                name: '7q8ke6bhlr3iwg28nb9suwze4vfqld6d1ect737tuctbzlno4257ttnjfzvbp4ub91a2cmos64s56rxln93nx2k5g7b744fe9ck0a7ctrix522f9kk93mpdix21tb0y7a0khgwsersyldm6f2dxnp1d7pjmuudddx6b7sqeh8omtbkli1q22kjvun93nv7znrndbybedios19pndzk06gxp67yomsjw5w6vj40rvz9ohw36jv30zp1c2wa1r2gq',
                isRevoked: false,
                expiresAt: '2021-04-18 01:41:54',
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
                        id: 'b9c8d155-939d-47e9-adfd-f080e166a9f2'
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
                        id: '81673479-6adc-40bd-a680-68469825ca1d'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '81673479-6adc-40bd-a680-68469825ca1d'));
    });

    test(`/REST:GET o-auth/access-token/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/152801b1-c31c-44cc-986f-c3ee2dfa10f6')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/access-token/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/81673479-6adc-40bd-a680-68469825ca1d')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '81673479-6adc-40bd-a680-68469825ca1d'));
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
                
                id: '9dbe28bc-c391-4a76-8aab-ea366bc0a58e',
                clientId: '033cbf14-053b-4d5c-9ecf-815d85775b02',
                accountId: '861c7fce-f505-4855-b540-b9393709786a',
                token: 'Officiis molestias recusandae. Consequatur sed qui vero. Dolores dolor aut veniam aperiam tenetur cum ut distinctio pariatur. Facilis deserunt vero et corporis quo nesciunt et sunt est. Culpa sapiente qui error sed ut ut sapiente eum voluptatem. Nihil ut voluptatem dignissimos quod.',
                name: 'zdei0zlx3koasyjmynyg9q493ge0eelhgnch4uu0bixdagvvulkk4itkwb0te6uemsw8vsqlxoq2m7fl67hnosyfxn90926nw7ljx6njix3c7y5rws06xjm3wixjx887atn2gkq2ugh23uftlqxfj62mcv0sbj3p7wjus7l7jkx9vz33d3tf569a9vicibcqjxr60ulzj9da70x92vi6miun57akna8gc18r8gddimzzjerdt9l60e7bmdlmfcd',
                isRevoked: false,
                expiresAt: '2021-04-18 13:37:08',
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/access-token`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                
                id: '81673479-6adc-40bd-a680-68469825ca1d',
                clientId: 'bb120771-4df9-4da1-9a8c-7f1c26076d2c',
                accountId: '072fa314-be47-48b2-9f59-3e83524d0b21',
                token: 'Sequi ad libero architecto eum sunt facilis architecto facere eum. Optio officia rerum reiciendis sit omnis doloremque et. Rerum qui ea molestiae nobis explicabo sint. Provident non sint sint.',
                name: 'pfmaa36l0l4md16pp0g71g3bw9anotg8x2okkd9ib0s6hpcpae1k6dur4cqxmbhwff52fd1s8x1cu9yjrd7czy01iyd1s7wkpqxfpz33tnfbpsbqqxa8bpq66e4wik405runz3lqa3v2e7lpmmqjnqbo7cg5iem2eo3blbnnpolqf5s4jyyixxhp0lz2uww6jqyoebd7zvladc1cz6pvxezstzx8c1nlvdsykc57nb2n8jr1zp1lwj1d4ymxtcz',
                isRevoked: true,
                expiresAt: '2021-04-18 15:51:08',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '81673479-6adc-40bd-a680-68469825ca1d'));
    });

    test(`/REST:DELETE o-auth/access-token/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/49834a51-6782-438f-b1fb-c925322de8fe')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/access-token/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/81673479-6adc-40bd-a680-68469825ca1d')
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
                        id: '73aa82f6-18de-40cb-b923-7fbd146d10f2',
                        clientId: 'bb120771-4df9-4da1-9a8c-7f1c26076d2c',
                        accountId: '072fa314-be47-48b2-9f59-3e83524d0b21',
                        token: 'Quis doloribus at. Non assumenda voluptas facere. Pariatur beatae ea est quidem vitae. Aliquam aliquid sed eos. Earum odit sed quidem cum voluptatem autem alias.',
                        name: 's14wxysvrwxv536zvk96njm7uobz82ulu9mi61zmrm3z8psrtvrsl4dkb69u69zw38o6ibn80ptlhmxj0djqi7ly47bdoyok47s3zwg4s9j91oa60eluk64pv9eyyx7uusbn80wi9v7ti14indqq7hc889enk928qtbx00bm4bvy6wbycd8yiqic0z48yri5kbxpmv9vglqns95xxtdjlqmknnznkq6yv0pjvihdkj7up7vigtdn63mvg86zr7l',
                        isRevoked: true,
                        expiresAt: '2021-04-18 03:35:38',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateAccessToken).toHaveProperty('id', '73aa82f6-18de-40cb-b923-7fbd146d10f2');
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
                            id: '0c77a0b1-9dd2-48ce-b1a7-1462d1c150c9'
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
                            id: '81673479-6adc-40bd-a680-68469825ca1d'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindAccessToken.id).toStrictEqual('81673479-6adc-40bd-a680-68469825ca1d');
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
                    id: '44f0dfdf-6c08-4222-b029-6af6a2ac0223'
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
                    id: '81673479-6adc-40bd-a680-68469825ca1d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindAccessTokenById.id).toStrictEqual('81673479-6adc-40bd-a680-68469825ca1d');
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
                        
                        id: '1327f06a-ad06-4502-bf1b-198a11a67ea8',
                        clientId: 'ed269388-f639-4626-b2ef-d990258ab559',
                        accountId: '70fffd23-709d-4347-9f33-a98f187d0332',
                        token: 'Quia animi qui dolore deleniti tempora qui esse molestiae. Necessitatibus aut dolores odit illum tempore deserunt sed. Sit voluptate nihil expedita sed provident quas. Ut doloribus laboriosam culpa.',
                        name: '3l4v25rvnt2f152dzwfoezbi6lgo6of5n2cuefe6i53230si1vtjgpfha2ltdcqeddykg3350i2g3g13elftg48fljcrn3lpz27t6lgl3e4kk8tm8gggxz776ka0ijpud2aqujr0gr6r47791cuaipouebre9lw66vwijsruxa9y86gr44jirndi7sk5o2ezyxdg0xwhdw9lldwu98s9fcovxq775fkbrv8tew5dwd926p3keay12bc9cxyr173',
                        isRevoked: true,
                        expiresAt: '2021-04-18 12:06:14',
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
                        
                        id: '81673479-6adc-40bd-a680-68469825ca1d',
                        clientId: 'bb120771-4df9-4da1-9a8c-7f1c26076d2c',
                        accountId: '072fa314-be47-48b2-9f59-3e83524d0b21',
                        token: 'Ea nesciunt labore et. Aliquam enim vel. Est ut blanditiis vel nihil. Culpa et libero et ipsa.',
                        name: 'od1bycnq37d7acjhl8hbhowt3ka19jxz4g2849w9069z2u7ng7zbrqvi89x6vk9jggr1182rvelwe1s6cy0hozi7xrtepng6gyo2jrw53ddqp1krqrbnhc0u3e9ecj29wu1pcjdhno8rocfmdsh65v9mp1qpof82j6uasiymef5v0oq48qv5ny6t8zlg1d5p2hhth39ujqoan2w7dfbctdgifrzvpl7coljkq6j803owb0r6uh3gmwozx69xz9t',
                        isRevoked: false,
                        expiresAt: '2021-04-17 19:39:47',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateAccessToken.id).toStrictEqual('81673479-6adc-40bd-a680-68469825ca1d');
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
                    id: 'e4b4b424-e090-4202-9798-4d2cf2baa2e0'
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
                    id: '81673479-6adc-40bd-a680-68469825ca1d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteAccessTokenById.id).toStrictEqual('81673479-6adc-40bd-a680-68469825ca1d');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});