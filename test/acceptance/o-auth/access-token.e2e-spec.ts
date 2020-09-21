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
                clientId: 'b2cd938f-6b5a-401e-97cb-e78355e4b54c',
                token: 'Nihil molestiae quo recusandae aliquid ducimus et omnis consequuntur et. Et est quos illum ut vero. Tempora qui vel in. Iusto deleniti dolore aut quam ea. Eos autem et perspiciatis aut eligendi ipsum rerum.',
                name: '2apurknxx4n94lj4qi2dql2jvgo70b1adg5209325xgkfu72s72e209dwd6mxxx8wxw1xl61yetzdk6c5cvrrbta54nkyclki1iwd0i08r1wypm1o9687adj8cptzjw4dr94vb2ro9zy925opkc7017uwqwhx7lv9mj7qmmz2vshsvedgeqvbyieeqmj3vkmm86w7ai0atwsodbr88m4wejjcrxonmpyphhf9k0eqxa62j4nehsbxykcabid8xk',
                isRevoked: false,
                expiresAt: '2020-09-21 01:58:54',
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
                
                clientId: 'b2cd938f-6b5a-401e-97cb-e78355e4b54c',
                token: 'Numquam nihil tempore eaque voluptatum culpa aut tempore ut est. Alias autem in in quae voluptas accusamus ipsam aspernatur sed. Est omnis temporibus nostrum sapiente. Omnis fuga autem id magni aut consequuntur consequatur qui cumque. Vel consequatur perferendis expedita fugiat repudiandae ea quo. Et qui rerum.',
                name: '1e4a0dt2pcls5au26ai5e2vc2ucb790fjq6m79bfsini2ws4pfcw4rpxcxiezwag66r4zoaof1u8vaba8f24divfg9w9z9d9mctagka8y5l3yobkdm0ts5h7zuxf05mf50xxqves2i029jfpvkpfuhhdh0zteldbp7i2k7zh263vb7crbtls4aptn5h2cif98ymxkaukwdlgreuycraoub7hr3zsuozk6hka1pf5w2cdnxf6021s1v6dvgyiy5v',
                isRevoked: true,
                expiresAt: '2020-09-21 00:27:24',
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
                id: 'aca2f62d-123c-4830-a6b8-828c4d95b661',
                clientId: null,
                token: 'Ullam nemo et. Reiciendis non animi iure corporis ab. Voluptas eligendi est aut necessitatibus autem eos nemo blanditiis. Voluptatem ex necessitatibus.',
                name: 'nlt2ypxnqc83o9ei67yzi1s8vcbdr0rdhb4yvmzenb4i5olbqo7yh73rdv2jbjkyux3sv3gzzlbvo3dawnuj4qblh2ppzcldf3kaubqps4qi5qyfg6wx9e1n4gip5mv39zs2dc325gr609fcf2oz7juofz84xoweptpyv9ia7xdviwwnc79faa3shdvekmtpliwrs966g1ozw7nvu8uisxzzy9tk7247e6axik4wxeqbamiy7zrj40qoy6847vm',
                isRevoked: true,
                expiresAt: '2020-09-20 22:18:41',
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
                id: 'aca2f62d-123c-4830-a6b8-828c4d95b661',
                
                token: 'Error dignissimos quae et qui. Consectetur illo tempora. Quod similique ipsa. Eum odio id iusto tempore eveniet et eos placeat dolore. Veritatis enim cumque quia quam et est. Iste culpa temporibus numquam eum saepe sunt rerum laudantium corporis.',
                name: '48b4pxvxvjk09hn4nuph28933cuo4nn8lc03plvham720jkw73h54ox7rovm1ucnywkyph8bpktti0wst4jvt53gdhqseg43r7fvpsvvmouvi3zqxbkv76mj7rfrb5fsnpyajd4u4k5xj5uwhhd0slks6l2hqs5lyccgreb4fv258owteq4q8c5pucflkzat9l5rwhj9vjwl15kmcdgzsrxwfmptd9l7gincqy7uan5d3ghdyo6kadr57aiste7',
                isRevoked: true,
                expiresAt: '2020-09-20 13:06:18',
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
                id: 'aca2f62d-123c-4830-a6b8-828c4d95b661',
                clientId: 'b2cd938f-6b5a-401e-97cb-e78355e4b54c',
                token: null,
                name: 'w2o6pekhn9177zg7ua9v9wwfnicsi6rulbde9f9knrreazxffw78amtvaw46jjq4obicnhclxz6m3mniy95v6wo6pjalih0dsy6xgz63usacyt4er25240aph5qfvidl3xh9pi7qy519eq5mfz1iywcg9ulpis6nhnwwaasrsuhhdu0sg9yaudnr0bum6qpjyr94pkl9jtepmd9o5202ih4obkru2u2zxwmoe1bbxy5t36s29cxfyvzrko35su9',
                isRevoked: true,
                expiresAt: '2020-09-20 17:16:06',
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
                id: 'aca2f62d-123c-4830-a6b8-828c4d95b661',
                clientId: 'b2cd938f-6b5a-401e-97cb-e78355e4b54c',
                
                name: 'p6ybnfvueazcjoc9c6mlcz3e6olvhdc0469ch19p0mfxns0b9427iraiajrdmatr580f9yws7qndax8zc7yxm4pt6d5cyhgo2htux12y49o7u4vwr0gz9gouzsdzif95axrd8b408m6p8w657ieuotcywmrjx58cbghlwltcv204ifk9in31aj0nu3wte4sulvwwobrlr61y0mny4wy1r1pko4b3yglcaoite6vpyqjv6pxlplry1tc0z61zy09',
                isRevoked: false,
                expiresAt: '2020-09-20 14:58:05',
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
                id: 'aca2f62d-123c-4830-a6b8-828c4d95b661',
                clientId: 'b2cd938f-6b5a-401e-97cb-e78355e4b54c',
                token: 'Quia blanditiis totam rerum tempora quae enim. Expedita in soluta quo repudiandae error. Rerum quo earum sapiente eaque quasi aliquam. Porro aut dolorum amet mollitia laboriosam. Dolorem dolor non.',
                name: '2n1npp4nwpai0rjougq2n21awqbus8dinjwmtb37565lb5hy0ayxvqzaz2bphtjqy3wcwb98fd7ovntprqj0sk27a0ka7br7555pqp3xl84npi7qri4jerqis77x9wxs6g7r3fjc9qqls54rdzjwrbxmflollzslobtr3hu8flssibw2u8l5o5xsqywbhppfiu8gp6u9ed8pxivgp2dh78ikq5wst11gqkjg7vxeui3grxe9rj3u6sdcf28vx2v',
                isRevoked: null,
                expiresAt: '2020-09-20 22:32:57',
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
                id: 'aca2f62d-123c-4830-a6b8-828c4d95b661',
                clientId: 'b2cd938f-6b5a-401e-97cb-e78355e4b54c',
                token: 'Reprehenderit rerum illo reprehenderit accusantium quibusdam delectus debitis cupiditate. Ut placeat dolores repellendus sed necessitatibus. Autem esse enim consequatur qui omnis est. Cupiditate temporibus culpa numquam. Vel sapiente ut ut autem id similique iure aut. Consequuntur consequatur et eos.',
                name: 'eshjpao0rti7yvwkd30hczw6k5abcx7d0trotwyr0jpbnbodrzkx1udqeltcu48emnwt1s0jmwed384qrmet4mfc8ww6jfg2w54gwgx1o4gg2bu2m5ix2zkrf9ewtlnm7uhgjmzg2i0udpw0ws82tbuwuswev6pfw82gzzsuojhs8tjt952oxzzvh14mih2jvit11vxpfnwvu2qvq0zsw9i2y8qdqhsnv0lc6ytm9fasbr9lvzdgyczwhly5h7f',
                
                expiresAt: '2020-09-20 13:36:58',
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
                id: 'k5rreojlt9fbjgqh5wlv3fgvne7nyxq89ez9l',
                clientId: 'b2cd938f-6b5a-401e-97cb-e78355e4b54c',
                token: 'Dicta fugit non recusandae dolor. Blanditiis et perspiciatis omnis error fuga consectetur. Aut distinctio aut et iste temporibus sed. Repellat cupiditate dignissimos qui nam occaecati architecto. Perspiciatis labore dignissimos earum ducimus. Velit mollitia nihil atque qui placeat.',
                name: 'vm0wp11bdanb4318ef662e21lz048kspcz0472mqs8z9hpoy73p86u88w3e4jcgov7rqkjy749145tgecmy8cqvm1r1b6r9rkoghcqzd5z6x7zcmurceq8xrsuh5b7mykv1c5jz62f2zdk09d8elehwbnsv0239ew4pl4flezhohigukcwtqrpmv7v9zcbik071f4i9zfxgfnp3vdf2z4edrqmgicf97jip7gxpgvj54rjzsb8o7yyclj93s9gl',
                isRevoked: true,
                expiresAt: '2020-09-20 20:36:35',
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
                id: 'aca2f62d-123c-4830-a6b8-828c4d95b661',
                clientId: 's6x4jlke0zvrd3t9cpi0y1yq2d8gua5qocqp6',
                token: 'Quo assumenda autem non et ipsam placeat sunt recusandae omnis. Vitae tempore dolor. Et velit ipsam totam excepturi non.',
                name: 'kqasyqtl03q0slu8xzki4h48j434oqdnpuwcl8g7r5y136zefwb10rl6qlheul9umk2wg14uatrde6ntegs71ttjcfect8a0qt2tf3a4d2ndtq9jljb2jy3bmi6pqnslpztuvosak8clpniaq4md4kkvge5q25k1m7a33fmep1acildve9xx7nqelhdoz6mecpl9t14tzypb3fcr29208ddxcy1ofl7z2fzscbxbch4ti0wib56os1ulotm95r6',
                isRevoked: true,
                expiresAt: '2020-09-20 23:59:34',
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
                id: 'aca2f62d-123c-4830-a6b8-828c4d95b661',
                clientId: 'b2cd938f-6b5a-401e-97cb-e78355e4b54c',
                token: 'Repudiandae ab quaerat rem perspiciatis adipisci dolores. Sunt quas quos quae at non. Sunt harum officiis minus.',
                name: '2pb69it6sxj1eb5m04rvaza58be813yuxbawahn5bxepp5pstumukhz0ev3qx34hnhsbcx90orctx4rb2t1qfr2medkr46vtt7zujyzpa9nsc081vzpb74zxuwm7hbxjt5crt4z51i9z12z5cmevd5cr1r4hklco7e08609za8l6qi9l373mrr9qkg421xbid8x8efsosgj8yjdkqdyztir1wrzmgcmsd26iwba5vb9fg1eq6dy7y8kgigsosq7m',
                isRevoked: true,
                expiresAt: '2020-09-21 04:59:54',
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
                id: 'aca2f62d-123c-4830-a6b8-828c4d95b661',
                clientId: 'b2cd938f-6b5a-401e-97cb-e78355e4b54c',
                token: 'Dicta qui aspernatur. Et sapiente fuga tenetur reiciendis exercitationem sed. Quia et nulla soluta. Omnis perferendis impedit accusamus molestiae ut cupiditate. Vel veniam ipsum illum id perspiciatis qui aut.',
                name: 'qe89oy6k05rprpy8tvo9z9563jpcip4j574f61bq2jg9y16fadjuw1639i5ittdohs4ucyme6vkitgs9onzh2nej6ebld17f7qsge9eds2fk0dj2j8r8su488fbuu018pl3sm03z3ldzx0rojl7ezu51zhl2mziy5qao9gm9mtw9qq6r10uq3p862zapvzh6divzhhn9hllpnbyg2cfxiq1zeorharjbmq7a17visi817vuhazu9ei0as75u1n1',
                isRevoked: 'true',
                expiresAt: '2020-09-21 01:07:19',
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
                id: 'aca2f62d-123c-4830-a6b8-828c4d95b661',
                clientId: 'b2cd938f-6b5a-401e-97cb-e78355e4b54c',
                token: 'Doloremque eveniet aut sint ipsam distinctio ullam. At et nulla explicabo earum ipsum. Aut repellendus sunt sit nulla in. Quis voluptas nesciunt voluptatem iste libero sit aut.',
                name: 'al5pd5a9byozdb7ru5x1812znvy7dtehl974r86mfrm1tu9uaml7fsnouargfz3jsqqlc6d4cioleg1270qwqid7ospqer5gjwj60j9eb05y2dq2eurfjdkwf84mgyv9mex1snfh40yy5p05lm0b2a0z1wcn0dhuucbh3yru4m8yk7zp53x2q5ksqdyvl8kt4pgd9up030m3019pj7fb80dhweimb4gf3tfgulww3addqxaaj59tkb8rkoupaik',
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
                id: 'aca2f62d-123c-4830-a6b8-828c4d95b661',
                clientId: 'b2cd938f-6b5a-401e-97cb-e78355e4b54c',
                token: 'Porro ut eaque ut quia in. Molestiae amet voluptatem et omnis. Et atque et odit aliquid.',
                name: 'h9g06vzm8e07g2fgc7o9iznbb3t2j3gl7dsla4bzdjk09swum3ocycuktynu5zbi846ssur49e9ai4f8y91rqkqp7tencvgpg4ptrmmwppzcpyljc383rori9ndo1dzn4x64sscr6q73i9od69wwvq3c1khncw944o6lxsbmyj1scw4tgbz318c78jfgps7wik0r3vj4zt9o4in9d3z49ujwsgtyc78g207a0fm6bbceknztgvkmvjmsa01bifa',
                isRevoked: false,
                expiresAt: '2020-09-20 13:56:44',
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
                        id: 'dafce937-c3b7-4cc7-b5bc-e9ce6643104f'
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
                        id: 'aca2f62d-123c-4830-a6b8-828c4d95b661'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'aca2f62d-123c-4830-a6b8-828c4d95b661'));
    });

    test(`/REST:GET o-auth/access-token/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/f17dd2af-888d-437f-9140-83643ae94c05')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/access-token/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/aca2f62d-123c-4830-a6b8-828c4d95b661')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'aca2f62d-123c-4830-a6b8-828c4d95b661'));
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
                
                id: '82bafe25-8e4d-41da-9a46-f9b8668558c4',
                clientId: '5e8a4fd0-172f-466e-9fb9-393acf7427a9',
                token: 'Tempore quae enim veniam eveniet tenetur. Vel maxime eum eveniet. Omnis omnis labore. Sed magni ea rerum est officiis nisi quia blanditiis doloremque. Nam et doloremque dolor eos repellat blanditiis voluptatem.',
                name: 'bwf0xzseylubpoze06r0d71cc15acjh4ev7mc4nrg3rp6vwhymnmrlaxm2gqp79jxxn2bd706etltpp6b5yrir0vtnk9j8q825yuaz55yt0hm3posv81ouago1hmtxocrwpo11tjoi6d7jnbj0wark2hl3gyy10uqj82gpdyp0zzxgvdvpnxw9u7d11xqnqki6u1dr6g8sjp3tfnkwizfy3qx4apkj5uy3hw78iij0pjvxk6r4p232zudyftooy',
                isRevoked: false,
                expiresAt: '2020-09-20 17:39:15',
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/access-token`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                
                id: 'aca2f62d-123c-4830-a6b8-828c4d95b661',
                clientId: 'b2cd938f-6b5a-401e-97cb-e78355e4b54c',
                token: 'Fugiat ut possimus. Doloribus debitis laudantium sequi numquam qui aut delectus soluta. Adipisci eum officia omnis reiciendis et neque.',
                name: 'ix380w927j67e9b2gg4vxmyydllrp73ruzb613pa5ro7xb0vawf9xm5elnvz0h8pd4humguu9v87j5wuhxdtn4g8k5q50b2z75zkfvlh5hwwpirgsp3nnb5actaq5ran14ywk9p9ubc3w5wrooo4pr9mdsnwmzyt7p999h3hwep2y5rqvt4ddb42ppjr1oy72jxz8ihuq7h549si81nsti5qmkx4267v7kw0werxq5yoquedveegf04mk716n5e',
                isRevoked: true,
                expiresAt: '2020-09-20 15:50:15',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'aca2f62d-123c-4830-a6b8-828c4d95b661'));
    });

    test(`/REST:DELETE o-auth/access-token/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/b2548edb-745b-4038-b127-990022e4e2fc')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/access-token/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/aca2f62d-123c-4830-a6b8-828c4d95b661')
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
                        id: '29e8c0b7-d1ed-4ed2-b6a7-a73735822d8c',
                        clientId: 'b2cd938f-6b5a-401e-97cb-e78355e4b54c',
                        token: 'Temporibus fuga omnis ut. Necessitatibus minima quasi. Et distinctio accusamus a quia unde qui labore velit iure. Velit sed animi hic exercitationem dolor porro autem voluptates. A reiciendis tempore autem sint corporis. In maxime dolor est sunt.',
                        name: 'tq7c5mhm82j8h8r1qx4f2h89s5ryufb3fq0artmkfz0xc69anfigoe6jdnmkomz1pkbloqo45e9qavwhs96grlii4slvoo5ucfzai901edeen9adorbk813ntm5lleskiqskwjjkn1ac9v00esjxoa3tvhttgy8ee7sldq37kg345opk0e7rxouzxsr1f4kyjd0n68e7p96cpl1s73573ii7gth9idnpd2v0ci4q1qoksr0224891yoyw6igl8a',
                        isRevoked: true,
                        expiresAt: '2020-09-20 12:01:37',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateAccessToken).toHaveProperty('id', '29e8c0b7-d1ed-4ed2-b6a7-a73735822d8c');
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
                            id: 'd372287f-38ac-44e6-9776-1bd2658090ba'
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
                            id: 'aca2f62d-123c-4830-a6b8-828c4d95b661'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindAccessToken.id).toStrictEqual('aca2f62d-123c-4830-a6b8-828c4d95b661');
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
                    id: '32a47fe2-025a-4e4f-ab30-ecbf525df7f1'
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
                    id: 'aca2f62d-123c-4830-a6b8-828c4d95b661'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindAccessTokenById.id).toStrictEqual('aca2f62d-123c-4830-a6b8-828c4d95b661');
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
                        
                        id: 'fb8a19c3-7e67-4123-85fa-c738fe377e8c',
                        clientId: '2b8e2655-b73e-454e-9261-2b14e189cb04',
                        token: 'Sit culpa atque quo minima nihil expedita assumenda aut totam. Non omnis vel magnam odio hic et aliquam. Culpa in voluptas. Omnis doloremque in. Deleniti iusto maiores illum fugit explicabo quis ut. Voluptatem modi earum est culpa optio magnam dolor facere.',
                        name: '0ttzu9su9r2srw5q84cfrlopfo6y5fyc6gdk23b1d3485kodl43jcyaihgworvbu4zufmubhu5w2fx9wb5x6s8cofskg7tdy4sbi0l8ayn63131nkzx7dx8p0izf9nliqpqz2i0jc16hdcokpx2sae78by6z8kj3ns7r2grl9n9bk1x18ai0btzte7a3ka9a6jps3a7voxdhpoit5mrszxj1824zc9073c6tcy3j62txkznl2l3bexc614g75gp',
                        isRevoked: false,
                        expiresAt: '2020-09-20 17:29:47',
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
                        
                        id: 'aca2f62d-123c-4830-a6b8-828c4d95b661',
                        clientId: 'b2cd938f-6b5a-401e-97cb-e78355e4b54c',
                        token: 'Neque incidunt sequi porro dolorum amet magni eum. Hic enim consectetur tenetur illum. Blanditiis aut odit quia. Veniam fugiat est sit. Architecto ut voluptatem inventore tenetur provident quia.',
                        name: '2dqauavozcqt7c6grdx83vieh7ut9cutawhtdvuo61qt9ms8juflb9zkes1hgno5mwl7s1jidg9mktqtsevlwqcojggeoau8wgrgr6bg32qhj2mm2ngs1ichu8axi1yeque4v65c3543scdm5cqwliklanqbtxfftbfdt7ht09ycbrlueuve7t64c0nuzisa8whxel2ogfhnywus08jbecyc3s0vpskrqqsja8hwj4s5gpmkl16gcp009lb4a22',
                        isRevoked: false,
                        expiresAt: '2020-09-20 15:51:23',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateAccessToken.id).toStrictEqual('aca2f62d-123c-4830-a6b8-828c4d95b661');
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
                    id: '5a30b805-5e22-4892-aee5-bffb7c7ac1c5'
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
                    id: 'aca2f62d-123c-4830-a6b8-828c4d95b661'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteAccessTokenById.id).toStrictEqual('aca2f62d-123c-4830-a6b8-828c4d95b661');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});