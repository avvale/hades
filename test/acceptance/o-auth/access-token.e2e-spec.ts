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
                clientId: '323e5506-387d-4a68-9408-0ebeb7f8f7fe',
                accountId: '1b0471fe-10db-47b9-9c52-0df1a8f8d9d5',
                token: 'Beatae aut cupiditate sapiente. Sed illum officia ducimus quas quam. Et eveniet corrupti et molestiae rerum est ipsa. Et accusamus dolorem perspiciatis tenetur.',
                name: '1n1eknukl616fr8mojo59kofd88em8ag7lrd1p0fimzrbeuci5o8ysdfrc0bf836do9rizghpzn05t2m7uasn4whtjmxivb4ocqb5a1fly14mf6tp15pbenf3knag975qwb09c23d6zxej4qdt2dxcxw22swkf2l0xo6veiyc6to4d772udepid3yzw9f55t1tkcls32er7i9rqc0j678mzwep05bk7k80xt3t6ldvwm58q2abckt2srrjsy181',
                isRevoked: false,
                expiresAt: '2021-04-18 06:30:53',
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
                
                clientId: '323e5506-387d-4a68-9408-0ebeb7f8f7fe',
                accountId: '1b0471fe-10db-47b9-9c52-0df1a8f8d9d5',
                token: 'Possimus minima autem. Nobis vel perferendis accusantium vero vero dolores. Sed a eos et dicta eum et explicabo. Recusandae numquam et velit perferendis aut cupiditate eos. Occaecati provident et ut et ratione esse nobis velit quia.',
                name: 'pp7mqexi7vl4an39xgtpe14ujk008lefhmwzamrd95hhwrr8yxhhb5ozjgp7caiiq6z3rilv5cu2a9dnz94q0lbswh237xdifitslehurn8iuo2me7jca0mn6wvhnx5ti1on270h6at8uqly7fxd4r4t7q3l0gy1oakj3ajqgrrtsx68423qz2ebonzty2dd43y331070gn170tb5nzx4x2tmkpt93kyy5iz8bmdxrkm3p7p46k5xokmxc1v4u3',
                isRevoked: true,
                expiresAt: '2021-04-18 08:25:41',
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
                id: 'ee8d3b12-69e9-491c-9117-83445c22061a',
                clientId: null,
                accountId: '1b0471fe-10db-47b9-9c52-0df1a8f8d9d5',
                token: 'Minima quis fugiat et mollitia reprehenderit mollitia beatae maiores est. In enim molestias et eos eligendi qui quo molestias. Cum dignissimos illo quo et non molestiae ut aliquam et. Debitis a autem eum sint saepe ducimus.',
                name: 'k84fmrplsfhdvxmavnqdmjl8oitv6chvp775qm2rpo4rg4e7o5kjtupjlts82wz9otcf21hfpge5s7b4o32v9j3z54stomvno2xdiwp78c8njl8l4u3ixhf2w4yjjcsdnjj0vjha6qi5n9atd251s1cstlb15uctngxamovtltfpzr4ohw7p2u0ln624jl64t9a1ja4hobk2f22tpfjxetiuknfks64qp61fk602wd2545896t6udfsdcdragpa',
                isRevoked: false,
                expiresAt: '2021-04-18 13:50:17',
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
                id: 'ee8d3b12-69e9-491c-9117-83445c22061a',
                
                accountId: '1b0471fe-10db-47b9-9c52-0df1a8f8d9d5',
                token: 'Sint laudantium molestiae. Dolore explicabo est nulla provident maiores numquam. Vel beatae quidem quae sint temporibus earum ipsam.',
                name: 'i1e5514uvpfcruinewr1xerkorjkh61k6yjqhl8u00dtcj40uxu0hwrtrotbjhh7ey1nbkzt6bx811dtlcli9jl5lc77mayttah3f62qu4t4uz6jvnsgwsoqrwfblqj53iurcf2cucl3fqdyoh95mx2izpcdj2l7m3uoh7sxqfbhgwt77er6edq16rj394grx08e4gqp4dhpr7r5819yxzf4uc5awdamtma6kaf5kdb3oozaeldjb8kal330iz9',
                isRevoked: false,
                expiresAt: '2021-04-18 11:51:27',
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
                id: 'ee8d3b12-69e9-491c-9117-83445c22061a',
                clientId: '323e5506-387d-4a68-9408-0ebeb7f8f7fe',
                accountId: '1b0471fe-10db-47b9-9c52-0df1a8f8d9d5',
                token: null,
                name: 'kpsjtnnallcwi5b8pdua6zfvf4qjgg2dpdbl44uw9eu533fg1futjdkq0mzs8b4cd46db6z94ysx8443ahhy4au53kzdw3t72rhtjn9wx8tk0gqootc8gk4jwrq01c39z6cvm3312jj3i71fmvlupy3awydkj7xsy889pvys3i2uhv95b0zz1u0fk7yd66b6zzuo71nqz0cvphay2y745a5nopksrofi338ils6qt5tnjxakmlvv6xnirro337y',
                isRevoked: true,
                expiresAt: '2021-04-18 19:09:50',
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
                id: 'ee8d3b12-69e9-491c-9117-83445c22061a',
                clientId: '323e5506-387d-4a68-9408-0ebeb7f8f7fe',
                accountId: '1b0471fe-10db-47b9-9c52-0df1a8f8d9d5',
                
                name: 'g7z0i8ldp9blelbmegdruudqf6n4pdak0pqnjkdj9kcgcdgw0xf1e3tgt6x4j4yyqhmud8kiirng8zrtpk5hfxowc7pi5dbbr70db5qzr68zl3zxve4fnmi6fqvg0y40xwv01jemoce5zffkdaqib7zakuz2q2us67jha7sxhlnzdfl00ftp5csnhogutj0mmpn1rb636qge7293idgfgf5ek7xepvk4yho47k4w37mzbdfip4oudw2l8p784p8',
                isRevoked: false,
                expiresAt: '2021-04-18 13:41:22',
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
                id: 'ee8d3b12-69e9-491c-9117-83445c22061a',
                clientId: '323e5506-387d-4a68-9408-0ebeb7f8f7fe',
                accountId: '1b0471fe-10db-47b9-9c52-0df1a8f8d9d5',
                token: 'Ut tempora suscipit error qui culpa quia ut dolorem. Rerum culpa error sint. Dolorem tempora est. Aut aspernatur cupiditate illo ducimus.',
                name: 'oj1g0gttbalitsg6iz8lj99z0ms4n77zkg9oa2bdvtcc7g27wi3ljslvqlp2cpbezyh2xgxd94tuztj5zqebyo0rx7oieei7gaclppo22ttac93trn4u665jb6ln1x48lzno5c1at5mak2fm3m22izfbx2c0jnr2pokbnys6ozbryg2j92tldmfet6wvhbtwq5jmsympegq3qm7xb87hk9459gv302c86vl99znb8vsw6gws54udo6wumeycnhn',
                isRevoked: null,
                expiresAt: '2021-04-18 15:29:33',
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
                id: 'ee8d3b12-69e9-491c-9117-83445c22061a',
                clientId: '323e5506-387d-4a68-9408-0ebeb7f8f7fe',
                accountId: '1b0471fe-10db-47b9-9c52-0df1a8f8d9d5',
                token: 'Est minima voluptatibus et vel. Et tenetur illum ut qui iure. Ea excepturi ut eaque. Quia quia sequi veritatis pariatur expedita ut qui.',
                name: 'niaiwwga63qst3swxxbm8vo7zjoov6oir58323103sr1xqq83oiretnkphtduf374vmgqwfrjms4jxmcfy09ha3wpvof0zpahd2cj5doeh7ekab8qtvyovinfd3acay7wghi798abz11qv8oy52s7zyrwrupehyil6auxe1ihsl24c2cckzgdkin1i5k10dmd0ak1slumjkawbaks4x3m5batcax9qkzbz730af37ppcp5kk2ucmfhcbmi3jvz0',
                
                expiresAt: '2021-04-18 13:27:06',
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
                id: 'a9lfoohhsslyk53z2pvbvxtimyx9d06t2ge5r',
                clientId: '323e5506-387d-4a68-9408-0ebeb7f8f7fe',
                accountId: '1b0471fe-10db-47b9-9c52-0df1a8f8d9d5',
                token: 'Suscipit molestiae odio. Debitis aspernatur sint nulla vero placeat inventore molestiae et. Accusantium deleniti ex consequatur a nemo cupiditate.',
                name: 'apj9k6k52pbpwg4enbbfbpkaghjznf3qpe3kp5ttw1a9i4nx7vaoc9h48ccnqmxrquzt1svvedsyet3po5u6t2whvm5evqoc1l6qnyfz432ifpq0vjtv1c3dto1q2tv3uvv3pkmbgsxyzljjoeafjh48l7fb2ovm56sy16sfkhac9w2m8gu99ku6sw8li6k3mb7w9of2cke6rhkfj68kzxsfc8mk4rqi2737fmiuzt29t96012hmdknvei4gexs',
                isRevoked: false,
                expiresAt: '2021-04-18 09:48:58',
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
                id: 'ee8d3b12-69e9-491c-9117-83445c22061a',
                clientId: 'waakepy53yc1b2bz4e4mzalbikxofpzbpqfjb',
                accountId: '1b0471fe-10db-47b9-9c52-0df1a8f8d9d5',
                token: 'Sint aut accusamus vero non voluptates enim quas repellat ut. Doloremque maxime aut cum repellendus vel mollitia veniam. Repellat ex ea fugit et amet minus tenetur temporibus. Quibusdam voluptas est repudiandae odio aut voluptas distinctio.',
                name: 'sfuix92cwr3zdi62ecc6velj3797s5jyaptuvpa74lnzq8971jbg6wam3lt1fjpouzzey5wkjh15wvz2pdaxt7lvqc8d0jvnetryzcoa58hmw3s2610pudge0vbuio1hyzj2g9m7timvub0er8xxp5x59k8rhix961whjhaboehnqqx0rz0hn9dktl1j2okowk9uritpfycij8shvpqewrydmdjihsli86pa9s6ghy499k4w734kndj8dff847x',
                isRevoked: false,
                expiresAt: '2021-04-18 05:21:25',
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
                id: 'ee8d3b12-69e9-491c-9117-83445c22061a',
                clientId: '323e5506-387d-4a68-9408-0ebeb7f8f7fe',
                accountId: 'x28m5mk09vnqwd2cz6acl9qx426fzcpsgduxu',
                token: 'Quia et minus itaque sapiente. Corporis nostrum omnis deserunt dolorum ad saepe eos est. Ea optio et. Omnis velit sunt asperiores laborum cupiditate nobis nisi et. Est delectus enim sint assumenda natus similique voluptatem alias.',
                name: 'pmjkz1zi4438dw86vrenhe3w6jruvdb3qtyr72lkh4udznbfyp3d6mszjv2v5sh6lg2tweri8p3rrvasuayng5au0vac97bgp6epevnhq17wqmf2wn3mv0hkys8sv1c29x7fle02vpbwrjrcqr3x30pptk28o4wylal5vasei1muq8kpy2reitpj4s8qbruzx9gmgdksq0nrtaig02vjs10m1n6s7l45wmr0aff303k3mgfa422csne124afcui',
                isRevoked: false,
                expiresAt: '2021-04-18 00:46:11',
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
                id: 'ee8d3b12-69e9-491c-9117-83445c22061a',
                clientId: '323e5506-387d-4a68-9408-0ebeb7f8f7fe',
                accountId: '1b0471fe-10db-47b9-9c52-0df1a8f8d9d5',
                token: 'Corrupti sapiente veritatis maiores aut molestiae ad. Quidem ducimus aut facilis nulla. Fuga nam vel facere porro aut dignissimos soluta repellat. Possimus aut aperiam earum quia laborum cum debitis. Animi voluptas qui a. Mollitia molestias officiis placeat ut est enim rerum.',
                name: 'iqoggmv83st1lgpq70zcbb20frolj0u8pcbxs5qe0ez3ublr5j0tvt7jzyska9c0uz8ifi93603tqnm1jxzvvoapx3bvt544m4it454e1ec76p1yq139oguucg1eol719xqszojkkq7s3coyiui6e4pbj2owjz58swkje3lvduzm70z1t20l8vbrl9izjbhnb9077ekij6pung6ivonrxadn9gwba4j8cvkaiywyfph69qzmoyzvop9vq7tojk6c',
                isRevoked: true,
                expiresAt: '2021-04-18 01:47:59',
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
                id: 'ee8d3b12-69e9-491c-9117-83445c22061a',
                clientId: '323e5506-387d-4a68-9408-0ebeb7f8f7fe',
                accountId: '1b0471fe-10db-47b9-9c52-0df1a8f8d9d5',
                token: 'Quis itaque nesciunt molestiae fuga est omnis aut eum. Tempore animi excepturi enim omnis dolor molestiae delectus amet ut. Accusamus sunt molestias ut. Voluptate quo officiis eaque aut fugiat iste quo non. Debitis modi facilis ea id et. Nihil occaecati voluptas blanditiis.',
                name: '3etal83xks7otheln2sljm29qtrhkhjbt9u8e64hdrmtaqr7utpxrer8rfu6zpiplxprzdc9wb3v0nniohqvqtfajzxqa4toog1leo4zh9a85vmg3bjh648f2yd50qi1160g7cmcn6ergrvmgz193n7oo624iyxfsy3o6sv9irv5f0182eixmsx36ftjbpj6l6nh6ywye2rynye7e2qd5varx5v4yza85k7i8x7xp48cdql11vzlutmitv1lf2u',
                isRevoked: 'true',
                expiresAt: '2021-04-18 11:24:08',
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
                id: 'ee8d3b12-69e9-491c-9117-83445c22061a',
                clientId: '323e5506-387d-4a68-9408-0ebeb7f8f7fe',
                accountId: '1b0471fe-10db-47b9-9c52-0df1a8f8d9d5',
                token: 'Occaecati sint aperiam magni nihil autem est perspiciatis quae ratione. Sunt nihil officia beatae omnis minus voluptas voluptatem ut. Numquam voluptatibus temporibus ab omnis quos. Et minima dolorem nulla earum reiciendis.',
                name: 'nrkaozgqr2mrm20zfy2zp2ptztsvdgfe5ed2n3fkfnn23xnhx3tdmv4rgs3c7x6y1fltguex8jm8sx9gyy20dybzvpsi9cpsjykal2z6xg0bv0xzbne9aq4dqg7x0p25qiw0a7m4mggbvznz4xsrzr8la9t4hkfsxicn0zigeqplw40zcenw669mbdo2dto2ncawcvaebuxbmul9rff9pu8xi0e06y12i4orz6w4b6bwinq9yf5hitmf4uiotjp',
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
                id: 'ee8d3b12-69e9-491c-9117-83445c22061a',
                clientId: '323e5506-387d-4a68-9408-0ebeb7f8f7fe',
                accountId: '1b0471fe-10db-47b9-9c52-0df1a8f8d9d5',
                token: 'Impedit quia suscipit dolor. Vel repellendus quam optio aut. Molestias libero quo. Quia qui molestiae reprehenderit excepturi est eos doloremque.',
                name: 'nvwzomrk7ljdhvckuo757goitqaoewbybhaciylgi9mcqmz3fqy8mrdmsrma65c4fyefde3aibez21f2xvlsn4vultq9g06ugwbb7wynle0x82srzbg94ywg2g0zmzjwolxx244a0g8lziti9ev1guep2dg1vfwq9nyk6fc4lmsg5v8mt4ukvpvxs97eq7mnxnex1ijtygcsgxxyhz9hgoynytfzywyco9ossco5xknen648y0tu793xsoot034',
                isRevoked: false,
                expiresAt: '2021-04-18 13:24:12',
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
                        id: '722317cb-a8dd-43e0-bbb3-75edfa85d6c1'
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
                        id: 'ee8d3b12-69e9-491c-9117-83445c22061a'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'ee8d3b12-69e9-491c-9117-83445c22061a'));
    });

    test(`/REST:GET o-auth/access-token/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/2f11855e-ea81-4959-9bbf-fdfdbcfdc381')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/access-token/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/ee8d3b12-69e9-491c-9117-83445c22061a')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'ee8d3b12-69e9-491c-9117-83445c22061a'));
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
                
                id: '5bb428dc-a755-4e78-a21c-626268d9510b',
                clientId: 'fbee86d2-529d-409c-a306-549609b2faef',
                accountId: '5c11e811-a0dd-43ce-af3d-eb738db97e4c',
                token: 'Et error ea esse et et. Ea iusto quidem sit rerum nulla dolor quibusdam esse reiciendis. Fuga consectetur iure expedita eligendi praesentium.',
                name: 't985s2xoseucngmsfjwm9bs2f14rbry65bjs7kbmc2z23qeye8qsm9wn3vnymijef7wdxgjhv7lt2qabpksatfdr83drgar6p846xn3fuyhe91au492omisyzdaowm9igm9j8d32pgnjoxivobn7q3yrk3m1qex6mhhigagt9v7ka3g1k67645ihd74jrs6n854pkcnocldwzexpdgacbs7jxu0tm7dj93h3i993lice24hezmw6r1dqb9ykybw',
                isRevoked: true,
                expiresAt: '2021-04-18 01:28:11',
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/access-token`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                
                id: 'ee8d3b12-69e9-491c-9117-83445c22061a',
                clientId: '323e5506-387d-4a68-9408-0ebeb7f8f7fe',
                accountId: '1b0471fe-10db-47b9-9c52-0df1a8f8d9d5',
                token: 'Rerum omnis vel eos quis tempora accusantium minima unde quo. Repellat ipsum excepturi. Ipsa quis nemo. Tenetur molestiae tempore. Eos dolor error.',
                name: '6bxy0kzx2f1crocqdg8rcacbd1mzh6wh0ghjtow7auhm4nx839pav23a5492bfmj5hatd6lstvc9fff5higgzp8xz3uxlujx2klltuhmj8a2m6qeq114c68ys5f1weqtzrj2vf9v36y3pkux8p7dam7x47d9ve3b1m7uecho70hha1gjeb9wtzrtqaq0qw5xc966l22n2y9nogbm53jnajq5nrteem919bdwpzppj3idc1i9maon0sbt5aj0jxi',
                isRevoked: true,
                expiresAt: '2021-04-18 07:49:01',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'ee8d3b12-69e9-491c-9117-83445c22061a'));
    });

    test(`/REST:DELETE o-auth/access-token/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/e70dadf9-960e-4eb7-b185-7a5ea2877244')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/access-token/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/ee8d3b12-69e9-491c-9117-83445c22061a')
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
                        id: '25f1a06f-1a22-4e27-882d-fb9f0b829157',
                        clientId: '323e5506-387d-4a68-9408-0ebeb7f8f7fe',
                        accountId: '1b0471fe-10db-47b9-9c52-0df1a8f8d9d5',
                        token: 'Aut temporibus dolor repellendus. Sequi consequatur aut. Placeat ab eveniet laborum quis qui corporis ea. Atque adipisci sit culpa. Earum voluptas et modi eius ipsa amet optio enim eveniet. Explicabo vitae molestiae eius sit doloremque quia natus quaerat asperiores.',
                        name: '42hf247z8la6f5ebl1463magd4akuew7jg1alxgdfjbwynwv0v13k0r134i4qgwoy5waenl5ywypr7x0k4igp9lykn44mrht9x7nyibt61mje4sktbgedtjumroepkm3saoh2fctsvf05xl2599chyhn2ngoo2p37fl6s0iffc9qg5cwcutzk67tyy7sb15ossa1x8pady448bjmeexne2kxqnts6v5peyxfl01pvrdxh7kl4hglgmslaagxrud',
                        isRevoked: false,
                        expiresAt: '2021-04-18 21:53:13',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateAccessToken).toHaveProperty('id', '25f1a06f-1a22-4e27-882d-fb9f0b829157');
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
                            id: '429bd785-d73f-48c9-93c7-2782b9715e75'
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
                            id: 'ee8d3b12-69e9-491c-9117-83445c22061a'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindAccessToken.id).toStrictEqual('ee8d3b12-69e9-491c-9117-83445c22061a');
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
                    id: '98c620bf-6f6e-42ab-a7eb-9a10e46aa887'
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
                    id: 'ee8d3b12-69e9-491c-9117-83445c22061a'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindAccessTokenById.id).toStrictEqual('ee8d3b12-69e9-491c-9117-83445c22061a');
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
                        
                        id: 'b4d336f6-8622-409f-b98c-d5a64a3ed96c',
                        clientId: '32d04864-052a-4a7a-aa34-d4c68125f2a8',
                        accountId: 'cb61dbdc-e0b3-494d-855f-2a44c795e193',
                        token: 'Debitis omnis unde consequatur mollitia porro perspiciatis doloremque. Odio eum voluptatibus cum veritatis voluptas modi quisquam ut. At hic quia totam et. Hic tempora iusto optio distinctio maiores.',
                        name: 'l0bz9i4m849jp7975t486gc978fwmbdpjkznijo5te164pt32gq63k3iw4554i7nb74vo0qh1447t9848nycxcxzpm11hal7j7x6ky0m9pgbdxe6hpey23x2qfez7jbnt4eijhs1gzto67ihtg5m8hoi2k4n7mveo9885u2tt4llxpnrwkvz3us1n404vaw1r9pkmezo0e8r6sz0f2x3tijcz0xr47qkyhutn6pm90pwagrqnlpyulm3krf4vjh',
                        isRevoked: true,
                        expiresAt: '2021-04-18 02:43:28',
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
                        
                        id: 'ee8d3b12-69e9-491c-9117-83445c22061a',
                        clientId: '323e5506-387d-4a68-9408-0ebeb7f8f7fe',
                        accountId: '1b0471fe-10db-47b9-9c52-0df1a8f8d9d5',
                        token: 'Cupiditate non alias quo aliquid. Unde nulla iusto. Voluptas quia eaque molestias et repellat quis consectetur veritatis. Animi sit vel earum molestias.',
                        name: 'kvx17uvpc5twh6fmzppwakewvi5pngjtinuzvfitkv3qgw1d0uf0wfc0ifq043lhl325piphwynbvfbhwqaoyu6fvyey505xi0x0yt7oxi430do2hnldx4kq65ucqc9mrf8wsm809l7aagab2s1cb7w73hf8f3ls241goi6evjsc1rh53prfl7lwgwumqrk4z1oufsiqdz2079hnmergmca7w4mg3lnkhe8gk8tvgrajsxdly47p3nsrb2ffs5p',
                        isRevoked: false,
                        expiresAt: '2021-04-18 06:32:56',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateAccessToken.id).toStrictEqual('ee8d3b12-69e9-491c-9117-83445c22061a');
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
                    id: 'b10af74e-5204-4c98-ac1a-0d6e1e686461'
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
                    id: 'ee8d3b12-69e9-491c-9117-83445c22061a'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteAccessTokenById.id).toStrictEqual('ee8d3b12-69e9-491c-9117-83445c22061a');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});