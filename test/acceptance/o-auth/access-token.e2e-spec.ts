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
                clientId: '484f5d12-d2ee-45a2-b402-be2894d6c833',
                accountId: '0055123e-a115-4c6f-9a57-0c1ab7fa9960',
                token: 'Aliquam blanditiis aut quis consequatur voluptatem numquam. Architecto enim reprehenderit repudiandae sint. Laboriosam possimus est cumque molestiae culpa. A dolore eos sint sint et sit ea soluta. Commodi vel consequatur quis qui rerum fugiat ipsa aspernatur in. Alias et consequatur cupiditate officiis ea consequatur repudiandae et.',
                name: 'g915723l5baw9glsnbdrw8kxtzgxxmx2sxiiu2u8kylwqyybd3m3yb77uzd2t4oxeu018ylb1uwiy3wthx2jl0wi2ilstvtl5m3nwqzb1bmkrgxf3ca5ulbxulwcqfod9qpbyvaqsoq16y7sm78wrnvwtic2n1wrgqukmtva7ewg8px9imazx8z9mn163ykmr2e8xnddg8rmmhs1v0md9b66jspgn9rv6xkxkjo2ksystgyldq14f03dmt5kyx6',
                isRevoked: false,
                expiresAt: '2020-11-05 17:10:43',
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
                
                clientId: '484f5d12-d2ee-45a2-b402-be2894d6c833',
                accountId: '0055123e-a115-4c6f-9a57-0c1ab7fa9960',
                token: 'Maiores ex rerum illo et eaque voluptas quia. Iure quia non. Asperiores repudiandae asperiores officiis qui quae quisquam dolorum. Voluptas necessitatibus veritatis nostrum reiciendis vel.',
                name: 'ii4ebdkth5tmp8442iyvo6j9ednxt5fvffiv9929g7jsu65yv79qlw4hr98n2u0h5e5d6697duvgszorcaq2vgty2ubw1iws74k57menm1zd8hnbf7el416wjl1d5xud2ghra3c6tb4p4evcpmt9oaxogn7kic16f3q69hclb33hanwibctayx83hdsc5acx2ixmz0gaw4486lrcy3pmsw5ude40p9n807oqkiuqnbx1mtmix0ujfqesnvlt9vx',
                isRevoked: false,
                expiresAt: '2020-11-05 13:57:41',
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
                id: '611a0678-587e-44a8-8b36-7d6dda068677',
                clientId: null,
                accountId: '0055123e-a115-4c6f-9a57-0c1ab7fa9960',
                token: 'Sunt atque cum esse omnis. Cumque natus libero ipsum autem voluptate modi eligendi reprehenderit. Dolorem et odio quis a voluptates minima.',
                name: 'zq5k2h75lls9sae6rvhhdp13tqtkgbl9uthrg4705fxk6dd8poc18ar6l714g30eky2kfb5444i5oc330p66q2tbiceehapv88bq32eptkxwkhddv92gognh74tdw82p2h4lpwcog93n0b3zk9ueeaz3hu4ok1bhs0emj48ocwl817r2dqeev7i42sonb1iqro8atesw72rcpg2w4p66aice2m3tn8tahfed7hciioai7p4wnvli9npn5fjcug4',
                isRevoked: true,
                expiresAt: '2020-11-06 05:02:18',
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
                id: '611a0678-587e-44a8-8b36-7d6dda068677',
                
                accountId: '0055123e-a115-4c6f-9a57-0c1ab7fa9960',
                token: 'Officiis quibusdam minima dolores ipsa fugiat autem veniam. Modi consequatur impedit qui. Commodi in architecto qui nulla ut et.',
                name: 'apbcskihzvjqdxemajbhgs7xhk4lg01w8vvifpy3pg72pvdlfagwx7fnjkj3tx0irvutd626hn7cfg83z5i0tqkd7cz96albunrbn43kpx6uor5k3uwolne1sfe9oe9c84j6e28vbcw8f9qgsg5dxzfochffdksae8gorj4kvg3eb1iqvgcvrwu5jp7lpuiya676wx5a21ej8op9jzpmeu68slv2cdh7ymye6rfniwd5dehvnkw3p4gjwu51fj6',
                isRevoked: true,
                expiresAt: '2020-11-05 12:35:08',
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
                id: '611a0678-587e-44a8-8b36-7d6dda068677',
                clientId: '484f5d12-d2ee-45a2-b402-be2894d6c833',
                accountId: '0055123e-a115-4c6f-9a57-0c1ab7fa9960',
                token: null,
                name: 'mypzu4vmihlra7qei9vvxos9lszsyze0fao9g7wjswo01cwic0z9w6ecsixq36bxob0y5fqj657fx24cb2xmvow9600pf1tuhe1f081sy79o42vh6e8rwr6xbk2w8lge9ah6e6tz8iktqbz739h33az43gkuj17jlwhdwpacgkqxzuvvs226xd4d7iu6pu7q908zwcqhp5byz9ptxbj6xrt6ucke70ig1lyzn1dj1eu4jmntukwchcupc9wk9xl',
                isRevoked: true,
                expiresAt: '2020-11-06 00:15:15',
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
                id: '611a0678-587e-44a8-8b36-7d6dda068677',
                clientId: '484f5d12-d2ee-45a2-b402-be2894d6c833',
                accountId: '0055123e-a115-4c6f-9a57-0c1ab7fa9960',
                
                name: 'o7y8uyu8wgn67scdcx0d1q6u0om3i8kye57uewsi6wlcol8pny54hg5qfzlrb6694er2wu25adzhapcwa7ikkeybg4r7682xpauzwt7xsu71h624jzv0si52f6n6rgz06fs4ehqy407l2unhoc9ox688xybeqyobxqe9dot9g102xyzw30atzdwj5sermyq0h9pzlkf0m0hgo2eej324g6m07nxb3nch1553nfpkfifhjdxwy0pt3nlxpywiji3',
                isRevoked: false,
                expiresAt: '2020-11-05 14:27:07',
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
                id: '611a0678-587e-44a8-8b36-7d6dda068677',
                clientId: '484f5d12-d2ee-45a2-b402-be2894d6c833',
                accountId: '0055123e-a115-4c6f-9a57-0c1ab7fa9960',
                token: 'Rerum nihil consequatur quas consequatur assumenda repudiandae sed perspiciatis unde. Vel natus est. Et quia pariatur et quod dicta at ipsum. Autem repudiandae eius amet architecto earum fugit. Quam vel tempore aliquam laudantium officia sequi esse libero.',
                name: 'ijtn7mvsgexlfnyn07cfbsp3zltp8hg42tzzl3ky86s780gmm5u5h0yzubn61bntz9pszet57c2la3h025knd3g2fo51xy5j62immfnc16xep9dtocsx1a11fe4gpyc3vjs11ezxcodqkz03csa4emhidc9mauppmreaftfv2f2vwey4vfgejbgtb2fhb19m5las7epbmgjltemorpm6i2erweq5ai44cj4d9gddju3e886f4cqxkpdaflb0z3r',
                isRevoked: null,
                expiresAt: '2020-11-06 07:20:12',
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
                id: '611a0678-587e-44a8-8b36-7d6dda068677',
                clientId: '484f5d12-d2ee-45a2-b402-be2894d6c833',
                accountId: '0055123e-a115-4c6f-9a57-0c1ab7fa9960',
                token: 'Fugiat id consectetur amet. Vel aliquid voluptatem exercitationem. Ex pariatur quaerat suscipit corporis.',
                name: '1mrlgpcr6hip4wkgzjlfnqi1hh2m93xkkay6mlboc6e9gpjgsxoa5v8icwa69s4g81mmk7uwa2iskoookk1g4h6umiqpnzbavvk811eb1bkn1z3rbuloox8any44bbms0wziz4h6r093wsx5k1rrpwyv6lg7mo900lsllqe1dbrrdcdctze5mgsrv5mmjllyvt5415682zb7lx8iejvc6upgk3awaepsw8n8d8cs4wk767t6ysf5vwz8jq2nwe1',
                
                expiresAt: '2020-11-05 19:37:32',
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
                id: '7xfwoyo1twggg33l2pln85zvjfarozskhitzo',
                clientId: '484f5d12-d2ee-45a2-b402-be2894d6c833',
                accountId: '0055123e-a115-4c6f-9a57-0c1ab7fa9960',
                token: 'Ut repellendus id amet. Assumenda animi sint ipsum totam. Sequi totam est quia rerum commodi sit sint sit delectus. Aut autem nihil. Natus reprehenderit necessitatibus quo amet officiis exercitationem dolore. Ipsam est enim veritatis odit expedita voluptas sunt.',
                name: 'n4l2i3q4ov9npfzcxmrzuwktfq1dww17x2afon270kcml97wr2vk9x3zd5l738bjl7iu2bgd5u33i1bd8lcx4rbef3aiu7zfowps7v1wc4q42ftxevplxqyf50psla16z4501ixf5wp2q33ail7ufymphakwe8zpfxm97wg4u1uwc6251reo88knykdrmtcxtm8mrd625pwz0gtckkvi6uxn51ratbmfvx7othti91m7zi68yypd0ynubgs6s7f',
                isRevoked: true,
                expiresAt: '2020-11-05 21:24:07',
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
                id: '611a0678-587e-44a8-8b36-7d6dda068677',
                clientId: '82i1xnqvm4gcnkce8nwqai2ps6xuqs5ffxzfk',
                accountId: '0055123e-a115-4c6f-9a57-0c1ab7fa9960',
                token: 'Ipsa minus sunt excepturi totam a dolor. Velit vitae quidem. Officiis atque dolorem beatae nulla amet nostrum architecto porro aut. Maxime quis et eaque.',
                name: 'vfaefppukklpz1mcu52g20je5na2dbp6g1lp15lb74q6jdj64gg91ikzaeaqjy3yzoyp3wiw98o0u5h92t92itp97tqjm5tdq9ec13t6gcrpoev5xh7kk9g7qqp1y5thp1ogwth8jd3h1ny0xitsrcecetmmuq1mj91cwu164nktwf2di9exep4rpkgb9oeqqzdddegrrga97fglwv47wmf60n0mhxjihhsi4z8wq5smlymlou6rep18x1q3591',
                isRevoked: true,
                expiresAt: '2020-11-05 19:44:48',
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
                id: '611a0678-587e-44a8-8b36-7d6dda068677',
                clientId: '484f5d12-d2ee-45a2-b402-be2894d6c833',
                accountId: '3m8q4w27jd0ap24n4sdldg3qqpzvgoeo3s67v',
                token: 'Nam id quos ipsa dicta eum beatae repudiandae. In tempore et alias error et. Reprehenderit a totam quasi. Id quia illum quidem et esse hic dicta dignissimos. Voluptas eveniet sequi quam dolorem.',
                name: 'sir76azx1h1suejvtucjge3qo7952yyr3ywvwslza27bi48e8hju76bl53fl6p2srmp2l9zu65nue6e31fi8mn3c2z9lkhochiof3i62w4mylwpajm0gyb1gxa5scrkzwi0bmoqa3j6bh7ua7v4m96y5n9wra9upl7041b7wv6f5eivhu3w4ruhx855q0rce96pw8cb87awotldtfzw0ec2mx4b6ylojz8stc6xna7hweaihthvn1adi6a4603w',
                isRevoked: true,
                expiresAt: '2020-11-06 03:10:36',
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
                id: '611a0678-587e-44a8-8b36-7d6dda068677',
                clientId: '484f5d12-d2ee-45a2-b402-be2894d6c833',
                accountId: '0055123e-a115-4c6f-9a57-0c1ab7fa9960',
                token: 'Debitis quidem nam tenetur laborum totam soluta unde id quasi. Atque quas voluptas quasi qui. Nesciunt harum rem praesentium. Magni neque voluptas quisquam cupiditate repellat perferendis alias. Minima autem quo velit exercitationem quidem officia.',
                name: 'adn7vbb1kv5mki8fcf3sk0i34ts5qxu7n8fslfsvmfwacya942w2kyd54dlrn75vl7lcwsv1qh4uhfnixg2rizi39cymtzrm62wn4eaa6dv28l4r1ppvu6286ai3wunbvl6rr2jf0p1fk59nhbf6g81m0kbxqiwsvxpaf496ne12zasj5nhkdd2kpyw3zfpdmc5f7qze36ibbqdedcg99nywrpvekbwjsav3wefo4qflkpsqlh3di7fd0nva7xkp',
                isRevoked: true,
                expiresAt: '2020-11-06 02:49:12',
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
                id: '611a0678-587e-44a8-8b36-7d6dda068677',
                clientId: '484f5d12-d2ee-45a2-b402-be2894d6c833',
                accountId: '0055123e-a115-4c6f-9a57-0c1ab7fa9960',
                token: 'Molestiae officiis aut cum corporis vero sit nisi. Error sunt quae sint aut itaque et magni sed. Ea similique cum dolorum dolorum nihil. Rerum aut officiis qui velit.',
                name: 'oxn6xusn2mv08a2q2lvxjf70thiubcvjjlaye2o0qqe1s9mrm5cw8csl6gpve705hnysc1ep37khscjoeq3rzxq4m6cxiv66lpdr4xayy7wrogwmvthzzu8owcrqusl0xgczpe5v1miqfbmvvguv2u49nzka196gsl50ohdt313x1m9ka2bqd8xgigvc4o2agl25e91yvrkb0jsd3j014ifoc2m5cnye983gcgjhfkm4vjigr5loersg7vur567',
                isRevoked: 'true',
                expiresAt: '2020-11-06 11:52:20',
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
                id: '611a0678-587e-44a8-8b36-7d6dda068677',
                clientId: '484f5d12-d2ee-45a2-b402-be2894d6c833',
                accountId: '0055123e-a115-4c6f-9a57-0c1ab7fa9960',
                token: 'Aut et eveniet quidem sit dignissimos deleniti. Autem rerum molestiae harum vel placeat eum qui. Distinctio velit incidunt. Enim ex dolore saepe tempore ad id vero ut sequi. Ad deserunt alias doloremque cum sit deserunt illo laudantium nemo.',
                name: 'y61xja8fao3q10k9iw1ogiqfkpeesze5hnagx28tlt82zi4sqhnbdiho8ffgy1cpd3aginxsakyqas4xc9nwpjqb74e815jx7a6pm6ycyjhjq4a2j40htipn8mzktc5vbwe54aveojmeg7i2ktd9n51ov6f542o9huskyv0237s1eipwszhh8btnb24whinx024illfadsxe54e3w0o8btkxnxaixdfxn99zneszetagnhy9w1nn5ez8pgvyeo1',
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
                id: '611a0678-587e-44a8-8b36-7d6dda068677',
                clientId: '484f5d12-d2ee-45a2-b402-be2894d6c833',
                accountId: '0055123e-a115-4c6f-9a57-0c1ab7fa9960',
                token: 'Molestiae natus porro. Earum error qui animi et tempore. Aut ut non nihil ut quasi esse ab deserunt eos. Eveniet tenetur omnis ad dolor non quia quo. Necessitatibus nihil fugit est hic temporibus rerum.',
                name: 'lo19z5s2lyhrhnco39iwjktoszazd5eth4n5d4n07lj6zth4igt78oykim2z32pa5egccy2dgoitgq61xgkki12apz699ecw699xny4f50o0duhegddfto0zocy7329c3l0k9z3gm2z32nk03kqu3ljm2qscjix11m06rlhibdsdfyrp84c5islzlmd0f50m0d89r9kqpz5aerylpwsep8is1pgnj0vq01zqyh5tknuc3n7f7q8iumnxabrsyu5',
                isRevoked: true,
                expiresAt: '2020-11-05 20:55:27',
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
                        id: 'b247783e-34ae-46eb-9f49-6c0925351df2'
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
                        id: '611a0678-587e-44a8-8b36-7d6dda068677'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '611a0678-587e-44a8-8b36-7d6dda068677'));
    });

    test(`/REST:GET o-auth/access-token/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/75810563-010f-4fd5-936d-8e68b45f9c8f')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/access-token/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/611a0678-587e-44a8-8b36-7d6dda068677')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '611a0678-587e-44a8-8b36-7d6dda068677'));
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
                
                id: 'cad15649-43a0-41aa-9b81-6583e5f1ab41',
                clientId: 'eec40d41-a047-4b69-815a-81841437f10b',
                accountId: 'a2eae46c-d2b6-4f7b-a777-1ef972a319a5',
                token: 'Qui iusto molestiae ipsam minima. Voluptas minus enim occaecati quia occaecati qui doloribus repellendus praesentium. Ipsum quisquam non molestias ea reprehenderit voluptatem. Recusandae repellendus rerum.',
                name: 'mnypcndbxoge3qsoz6vysbhzri7fncgaov46p7khgjzdzr2ah0uf219qn2xreg944skw06zev2nui6bnoqq0ssvz0ptoetwv2ah09gzhcm7mp07tjzam8ikubjnx2rkzlrsavsntjgdeqc0jlue7b3ogy7qxmn418za4bj1m1k3j05ukrfrnka8aomsnadybbm6293kfq9snv0fis1ujjggb1z0aul0134liiyldjx52f6rszhe70pb2dvb2tpd',
                isRevoked: false,
                expiresAt: '2020-11-06 05:27:51',
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/access-token`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                
                id: '611a0678-587e-44a8-8b36-7d6dda068677',
                clientId: '484f5d12-d2ee-45a2-b402-be2894d6c833',
                accountId: '0055123e-a115-4c6f-9a57-0c1ab7fa9960',
                token: 'Sapiente expedita explicabo harum. Ratione expedita aliquam earum. Consequatur et voluptatibus aut perferendis voluptatem.',
                name: 'vzo6emb4x52re4vrxf6w11646wkch2icj4tx000d74y5x8z22h9vjeuu104pfafzsfhbtdwwi2n1ndeq3u7hjuoeg5nzojd2owao3ibkxk8ct28unlwxf2cwwn0zf36d9ule7vijuhghij9o320hhgx9calb332nr7kq6u7ul0tqswmrljcu2s2h8p9fxk4cwvsgd4iu7a26k6oafjjfiqj90a17bfrpy38qxl2lxduzhaavvolbur1j9o3aso9',
                isRevoked: true,
                expiresAt: '2020-11-06 10:35:23',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '611a0678-587e-44a8-8b36-7d6dda068677'));
    });

    test(`/REST:DELETE o-auth/access-token/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/8333ad38-2945-40e5-ad48-d01d36115855')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/access-token/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/611a0678-587e-44a8-8b36-7d6dda068677')
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
                        id: '50f22b5e-1e0f-43b0-b4a8-738143a81462',
                        clientId: '484f5d12-d2ee-45a2-b402-be2894d6c833',
                        accountId: '0055123e-a115-4c6f-9a57-0c1ab7fa9960',
                        token: 'Explicabo sed ipsam cum iste sed veritatis. Consequatur est nesciunt repellendus et aspernatur. Praesentium quod harum qui aspernatur quia nemo saepe vero. Sint quidem vitae qui dolorem sed neque nam.',
                        name: '3kih94vxdm7l3641bohmgvgtubw9zm0zaijhk2joljwttyztunvbqyghl1qy5mjtw4krduroi2e02ps6h9p3gjumeaaw0zmugxnwhas9kxkqz7xz4qko4zvwb9qyd8rhn3ntib8muttvhm5zebzjos7i0cl0wrvn9mgzvmjqsu4auy4wpcvkidz5w9p9eiegust3h6b0ukpazimgr0wgkay0z9mn9hrjon8dyak9aomfz86xxb85eysoj58nzmv',
                        isRevoked: false,
                        expiresAt: '2020-11-06 10:26:00',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateAccessToken).toHaveProperty('id', '50f22b5e-1e0f-43b0-b4a8-738143a81462');
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
                            id: 'd02f894c-0708-4437-8b9c-0fecd1e75469'
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
                            id: '611a0678-587e-44a8-8b36-7d6dda068677'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindAccessToken.id).toStrictEqual('611a0678-587e-44a8-8b36-7d6dda068677');
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
                    id: '3b488284-58ea-4b1d-838b-da8ee70c5ac2'
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
                    id: '611a0678-587e-44a8-8b36-7d6dda068677'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindAccessTokenById.id).toStrictEqual('611a0678-587e-44a8-8b36-7d6dda068677');
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
                        
                        id: '1171168e-bc38-4540-85e1-9fd19d85f8a9',
                        clientId: '12ac93a4-184a-449f-bfbf-4d5ffc0393c1',
                        accountId: '0aff6ec2-0ad6-4684-8106-f3daf0791207',
                        token: 'Facere adipisci quibusdam. Quas accusamus occaecati debitis eaque libero quos corporis. Voluptate officia accusantium molestiae voluptas accusantium. Velit amet quae eveniet laboriosam reprehenderit. Esse est nemo et sint optio architecto ut amet vel.',
                        name: 'rjg0rrutk5bm4f7fcoxuvu7236hd7aoer5fa7sbmwadcbzg7c5nlc7ualfeiazco9pqb61nl1t0zoh1o0zljq6ihzcibt5uyr93dzutke4i33c29jr7n5dz1gwksvlwhkk8u9cmzj78r2mepac0lhc5iyt1rwt9yetukjp2vch4983x1qhog15iyfuu24rsf6yhox0s6pfn9augueoaefgjkp8ee8l0r51i4yrs9tbpwjhv3xobzzb7t7sesjew',
                        isRevoked: false,
                        expiresAt: '2020-11-06 04:45:33',
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
                        
                        id: '611a0678-587e-44a8-8b36-7d6dda068677',
                        clientId: '484f5d12-d2ee-45a2-b402-be2894d6c833',
                        accountId: '0055123e-a115-4c6f-9a57-0c1ab7fa9960',
                        token: 'Velit ut inventore vitae dolor sit perferendis deserunt consequatur. Accusamus exercitationem totam. Incidunt et labore. Veniam dolores earum quis facilis voluptate. Voluptas laborum accusantium laudantium sit. In ut ullam.',
                        name: 'd45mrth2dfr0vn34s0ur7vjyabdll232ycf90et3pno37dqgxym3hi11j00n2dy308zgsr9ku70dafl7pzst8jez3mpcpbjrmozas7a1lz74vp3oro0st2er6qsi3zswvajcqae9i7advreccmrlybgawmx3toscny92vrkroeju0ufq4wbl0fy3e3y5jan75kzktoxtnzacuzasyas5v4peq8sc94sjesd8iwv2fb88mnv61qcu62vbu5n7p67',
                        isRevoked: false,
                        expiresAt: '2020-11-06 03:44:08',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateAccessToken.id).toStrictEqual('611a0678-587e-44a8-8b36-7d6dda068677');
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
                    id: '5d05f878-0e4a-42ef-b3b2-1188cfe3fbea'
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
                    id: '611a0678-587e-44a8-8b36-7d6dda068677'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteAccessTokenById.id).toStrictEqual('611a0678-587e-44a8-8b36-7d6dda068677');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});