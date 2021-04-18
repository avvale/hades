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
                clientId: 'e8d51943-21ce-46ff-9411-3267522eee3b',
                accountId: '92865ff5-c03d-4eea-9355-4b0ad656114b',
                token: 'Possimus sunt sapiente quas. Laboriosam qui quo occaecati fuga incidunt velit. Vel culpa quis accusantium dolor culpa voluptas quam. Dolores soluta qui fuga laborum et. Qui rerum incidunt et possimus.',
                name: '8u213bc3zcbtaaz8gk27xi7o92uc2roetqdpshxuurmfyyl3co0jhd81yqzj0b66g081m0ilt3ojlxbs1sak380wtltnbzkgim5pkvg89m25m2yem9ti446t0nhjxh3qw1ntr3zwzq79qtc3t0d9ilt4xs8nk348iucg5xdxe1izf9e6b3i1syncj23r1hftvps7oybaqxlynfl5egk6jteminx1161sgqf7pb31o59ogdxpycp9jzq7edrspu0',
                isRevoked: true,
                expiresAt: '2021-04-18 17:43:17',
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
                
                clientId: 'e8d51943-21ce-46ff-9411-3267522eee3b',
                accountId: '92865ff5-c03d-4eea-9355-4b0ad656114b',
                token: 'Facilis nisi est voluptatem ipsam in qui aspernatur maxime aspernatur. Qui perferendis recusandae ducimus dolorem delectus aperiam perferendis alias. Modi illum quia pariatur voluptatem. Non incidunt inventore voluptatem aut. Voluptas id totam nihil tempore sed quia ut sit ullam. Quod rem non sapiente est est quia quo itaque.',
                name: 'i3n6snt32ihwlm9j6c0bwlu5qvlxht0v7ym5xd44lk2qgmzcp4wq566ih1xpfir93mkhm73uyxfyqpcuykaxjq8bxbp7iljntmq4k19iolreg39hnd9wau1pbvatl9nu2pm575bcu6vbio153iqr858v8bhx8ofxmcqedrb59qwlzx26322a8g5lvq2oy6c5oxtd4t6sdvfbxssievj4tu03671e4knlld89vccv2rlcfqwg60kqo0os2sh3q33',
                isRevoked: false,
                expiresAt: '2021-04-18 14:13:20',
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
                id: '263433d5-bee6-43ea-a4f8-e7f40832611c',
                clientId: null,
                accountId: '92865ff5-c03d-4eea-9355-4b0ad656114b',
                token: 'Itaque esse rem aliquam quas sit repellat. Ipsum voluptatem itaque ea et. Assumenda ipsum architecto sed sapiente et dolore veniam modi dolores.',
                name: 'uk8mo9gn612yoovgccundiiai30coss0q1tcv5m765x7mrcfmh0u7zkukh5h5onjzv2x0qc8pse9zjn64qioydhig4m6weg9zjxkhitnq25ottv6m0tdk8imot7smgnytprq3xapap3y8jwcwabnkh2w12008zvan2w3krtsjk2vtf54yr0xyafbqslpd05v76xkjqasmla6i5zph6j2z3hb041ye9y8l07mnx88y2vup2k2i0zk2wm8so1472v',
                isRevoked: false,
                expiresAt: '2021-04-18 23:49:11',
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
                id: '263433d5-bee6-43ea-a4f8-e7f40832611c',
                
                accountId: '92865ff5-c03d-4eea-9355-4b0ad656114b',
                token: 'Nostrum et distinctio blanditiis nam ut qui. Placeat molestiae amet. Dicta rem deleniti velit sed accusantium et.',
                name: '08z68kjqvd1uddc4rua7wlik62p219e478dus21heh5oehk2w7hpqgbhcjqdxdd95utq7g5uv9o0p3xft9uz3y6rn4htfwce1n018y1ffln5grnki3dsvf8c7u9wf9qwqr8wuqa8q6a6mw33hs5f73ta7jva49fkps4zkbgrtwpnyusrhigqdmcbrsbukv6sbj41mwdvrengkn0d2eiwmmuc9ch4v3i2wmlhymqmha71zjslj2rmrf241yv9r7n',
                isRevoked: true,
                expiresAt: '2021-04-18 08:36:06',
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
                id: '263433d5-bee6-43ea-a4f8-e7f40832611c',
                clientId: 'e8d51943-21ce-46ff-9411-3267522eee3b',
                accountId: '92865ff5-c03d-4eea-9355-4b0ad656114b',
                token: null,
                name: 'lopfsz2wdixtcun27m3u1kfmj5dgqvr2n2z0462hxrrh5onanq2xbo402kyxo2mcoc29vw86c49w2f1bdxf97m0ynmj6zecnx60v597vmm364j10f8rgl8pryww3theenw7bxcfew13t4n9jobpbv9f0wiitqxyt7gr9to3w02e1ee4jmef2qbapgw8yqvl10h255hcn5z9ae9ju0r72jay8lh4jog0oyafs3wrguugxamvrcmn5f3qci74yqfe',
                isRevoked: true,
                expiresAt: '2021-04-18 15:05:41',
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
                id: '263433d5-bee6-43ea-a4f8-e7f40832611c',
                clientId: 'e8d51943-21ce-46ff-9411-3267522eee3b',
                accountId: '92865ff5-c03d-4eea-9355-4b0ad656114b',
                
                name: 'lx3ayeslg8f4v78fm9dihaeu6vi08agnvhfp0umhbaujk326d5njmike8qtqnz35dp0rf4te3bhbjy1fhm14tnj58wgazc1nj4lzo1zrtrf1az0jhnq0r7rb883pxceo5fik61da9qogufdkzbpdo17mvmdcmueh3loe8eqc4g0hkz6d36wgm7pavsreh6iawrc91dszimv1mlbvdjwnk13ar3nrjutpbum8b07l00plf56xypo0chd3da401xr',
                isRevoked: true,
                expiresAt: '2021-04-18 01:19:50',
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
                id: '263433d5-bee6-43ea-a4f8-e7f40832611c',
                clientId: 'e8d51943-21ce-46ff-9411-3267522eee3b',
                accountId: '92865ff5-c03d-4eea-9355-4b0ad656114b',
                token: 'Qui maxime occaecati nihil in eveniet ad. Qui velit quidem velit dolor consequuntur. Nulla unde tenetur eos nostrum odit unde ut. Doloremque officia ut voluptatum qui autem sed et. Laborum earum placeat magni vero et vero ipsam provident sed. Dicta libero possimus.',
                name: 'hnhfi7ptz8d8h3ycb9n60r2lczj3531igm4ga2nw5qtdu746fxtqpy7ox8x45l8xa6c8qd3bmle6aciecb6yyvxk52lxk6h9hew9299upevn7ovx7mhsey910itvktrn8ht7ac3331lwmbr5llewouyt3gfbamigciut31w6y8jwp3kq59rdlpdujmy0rmtpcf665vh5e9dg8qgeqypkalad2csurtkdyl8kzy81zuae7cammunzqsv31aezfff',
                isRevoked: null,
                expiresAt: '2021-04-18 05:25:01',
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
                id: '263433d5-bee6-43ea-a4f8-e7f40832611c',
                clientId: 'e8d51943-21ce-46ff-9411-3267522eee3b',
                accountId: '92865ff5-c03d-4eea-9355-4b0ad656114b',
                token: 'Asperiores nisi sint iste amet est fuga. Rem soluta qui exercitationem voluptates. Maiores est ipsum deleniti magnam beatae culpa dignissimos. Ducimus laborum quos officiis ad id consequuntur.',
                name: '0akfwlucsasonaby50j8onnv5tbys37cgilk22upik689opfknt6y83vl2e5obojy48n1vu25hgj07js8l3gn8b0rxpja3gldtwc9v84o7becfd14fq3ol3b0ogeex3e8clj1mh12vyz8fyrivkwmicq9qkchnj2i2m9pkb3vzjuw9pq2wxkdsnhe0125rsp83r3os6peojrmq9b08fsgawwy7u48u2irldm6t0emcoj6ebueai51td6dgnzcjc',
                
                expiresAt: '2021-04-18 11:30:58',
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
                id: 'fhme9il3n5ravn6ahhi4yln91i89r4me1xj8a',
                clientId: 'e8d51943-21ce-46ff-9411-3267522eee3b',
                accountId: '92865ff5-c03d-4eea-9355-4b0ad656114b',
                token: 'Eaque voluptatem voluptates doloremque quia. Dolorum qui itaque. Quia est hic modi voluptas maiores quas et eos quod. Rem voluptatem ea nisi in expedita rerum.',
                name: 'mb5aiuuq608poq1s1nzq79zx1uz2wghvd3ouv26x5dh7rpm00atvem8jkpa53kkk6czyam4udy05vj9buyo5kr0qzya77sn3xgmq5p5zz7wwvyw68dgx2v339ii10ceok50021a0k2thyri28bafaw4chglqm8ubbzqdzkt72zb52f2kob3hw52uhi8spfw55z1w57ku8fdhttgknd5mnr5xdsj1fr04jqo3pyh6o3xk67abgufb1dbi7p32nqc',
                isRevoked: false,
                expiresAt: '2021-04-18 03:26:31',
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
                id: '263433d5-bee6-43ea-a4f8-e7f40832611c',
                clientId: 'fi8ssrvm6tnyn485ik5vnqxmz3witwnb0n0we',
                accountId: '92865ff5-c03d-4eea-9355-4b0ad656114b',
                token: 'Sint impedit quis. Veritatis harum iusto. Inventore delectus deserunt alias. Quia sed doloremque. Autem ad ratione corporis quia officia iste. Quo fugiat blanditiis at quidem ab ullam molestias cupiditate.',
                name: 'afzvycxn5whsshac79zgfijllbmw8b28r5xsmsu9e920axv639nh5fasnn243yfjvpujthlvp334sq9bivm69s0tft3c0oz6rioxw7a6a22ny5p7jem61oteimm64yez0l0v7zxqgajsfvcdrrieibp4rl1582cg66zcoxseezbsyvw7k3z7wji9shtqr409dze9thng2oa2g6cg87gelgkxbhs1mf5028pa540coy8ymdk9d0ya50cnqd1zasg',
                isRevoked: true,
                expiresAt: '2021-04-18 07:50:19',
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
                id: '263433d5-bee6-43ea-a4f8-e7f40832611c',
                clientId: 'e8d51943-21ce-46ff-9411-3267522eee3b',
                accountId: 'zdewnlpjdlvadqxuka0qrgvuv1o95dud0fnwi',
                token: 'Voluptatum deserunt perspiciatis totam quidem. Ut voluptas omnis saepe. Voluptatem ab qui ut sequi soluta. Perspiciatis optio aspernatur quo consequuntur fugit excepturi nihil iure a. Pariatur veritatis ut dolorem exercitationem exercitationem est et corporis ut. Est quo fuga.',
                name: 'ctrekocz5yk383mcf1ns4fakmxmgt6v194fb1w95w2vfd0ihjf9ym3uu4dl372urxzxfz3zgiow8nx1373shbrfjgcqptomqzc2iogayeg8dmm7fqg8dqxfpiat7zhprhopgo3bzerz5kviuinlx4zp00oqrjc039q1u9x2l512dukzg3obs4ssoczhme5re2ic0livv2savx1y7gju4mg444hv0xq5mp1uqwwjwkzxdezda1h9h8mdt64413io',
                isRevoked: true,
                expiresAt: '2021-04-18 20:46:53',
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
                id: '263433d5-bee6-43ea-a4f8-e7f40832611c',
                clientId: 'e8d51943-21ce-46ff-9411-3267522eee3b',
                accountId: '92865ff5-c03d-4eea-9355-4b0ad656114b',
                token: 'Provident quia voluptatem eveniet et voluptatem nam est. Quasi velit perspiciatis aut repellat nihil tenetur. Unde voluptas totam facere minima esse eius earum iusto fuga.',
                name: 'lbdz8hvnl6pg8gk1s7hm5q802spblmim31j2imv1olv6whp75mbr6upc6bdmhzzy9ywh84ivb1pacqc3hx4ec2a9v2808uuouakxfo1igqpufvnpp16pb2x3ad8wo9pns5ogb9cdxjrbgnqub2nb4h5o9yxfl92p34886n4ow1djmp8diq0ggpujuygqjhcd2o45roo9n4sbuwf48xr12y1b6bp1urxdes4hifz4taal974viujabfryy2qyzgnw',
                isRevoked: true,
                expiresAt: '2021-04-18 03:41:06',
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
                id: '263433d5-bee6-43ea-a4f8-e7f40832611c',
                clientId: 'e8d51943-21ce-46ff-9411-3267522eee3b',
                accountId: '92865ff5-c03d-4eea-9355-4b0ad656114b',
                token: 'Voluptas sunt eum vel. Consequatur quam sed cupiditate error. Nostrum necessitatibus ipsa perspiciatis ullam aut molestiae non. Aut sit ex aut iusto officiis quibusdam. Aut exercitationem tempore sit eligendi.',
                name: 'oflyxbl9nj7a25a1ihd2ino2ccthj4bblf3bpkeql1ys6x3agkqs72tey9jag6emcml0srywyljqhw1fcukq31nopnkebw12ax3miix5jhh2hyzssncfg4dhk8gbogrkscx5wjp8ty0nfveph724jdlykbvrgq32fl3bjt51csw317gxuueckv2g9ih6beyn8d745iadef0k2hf1m72zec0ze6nv2ko8rq2rjktrme1pfvbhfjkigzqbugilmf5',
                isRevoked: 'true',
                expiresAt: '2021-04-18 20:22:39',
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
                id: '263433d5-bee6-43ea-a4f8-e7f40832611c',
                clientId: 'e8d51943-21ce-46ff-9411-3267522eee3b',
                accountId: '92865ff5-c03d-4eea-9355-4b0ad656114b',
                token: 'Aut aliquam error. Veniam repudiandae autem consequatur commodi accusamus in aspernatur. Repellat perferendis in quis voluptate esse. Velit iusto amet.',
                name: '6npxlkeqc5yghgbj9w0g9ehrnrybll6cv16w71y72zuqj22jdtmqteeblredaf57nm4v4dc16d4pspn7le4ldkoxc4jfvt6vhu5n4vaxos6t9edfsuii1bsfdlhu5zcizu4mnjbxbr7swm44lm31co7hg9cfviwezxlxrkylnhp67wtexg4fpdgfdvsrg7c9jzn3vtdz64plsyihfbguj5dej67bojyp2zfg31aw6alc9vazd1pq7h9myfoe9q1',
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
                id: '263433d5-bee6-43ea-a4f8-e7f40832611c',
                clientId: 'e8d51943-21ce-46ff-9411-3267522eee3b',
                accountId: '92865ff5-c03d-4eea-9355-4b0ad656114b',
                token: 'Ea officiis molestiae asperiores laborum. Saepe rem magnam repellat occaecati. Architecto voluptatem nesciunt officia magnam velit reiciendis sit. Totam laboriosam id facilis distinctio est.',
                name: 'ls2q28d97i85aejxsjt7xsay52ue2gq61jqa6c542vpomer3y70tq08ybeu9dujpza82slw8d8zwpunqhh4xx3lwtuz0l2iq97lv5omqutui7fts27z2eeu55jx9kw6245cind0wqdraexhvy7a1ftsc9cv1w1zpieguyd8cuu957r5ftq94xjs8j34xiqb9cznwlwjtz0iismkhn3cdomtf3y318kkoiwvoogqrri4162zwi65s5pf82oar3cw',
                isRevoked: true,
                expiresAt: '2021-04-18 10:41:51',
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
                        id: '56359025-a154-4221-8b4e-a8b56cfcffac'
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
                        id: '263433d5-bee6-43ea-a4f8-e7f40832611c'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '263433d5-bee6-43ea-a4f8-e7f40832611c'));
    });

    test(`/REST:GET o-auth/access-token/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/12fe2630-60dd-4086-96c8-66b434fe2be9')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/access-token/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/263433d5-bee6-43ea-a4f8-e7f40832611c')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '263433d5-bee6-43ea-a4f8-e7f40832611c'));
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
                
                id: '84b9aded-9157-4f38-9730-34a8302f97ab',
                clientId: 'c1885ca2-c573-4a03-9e8d-96931136e3e3',
                accountId: '4efbf7fb-4392-4b6c-a048-47c3d5fc7257',
                token: 'Dolorem voluptatem necessitatibus nihil aut enim. Facere autem sed facilis. Architecto tempora illum adipisci ut voluptas magnam. Maxime et voluptas fugit beatae sed quis sed sunt praesentium. Quae velit optio doloribus quidem nam a vel esse aut. Repudiandae ea sapiente omnis hic.',
                name: 'ur3fm95p79c1ctc5xd6a0zxy150sdojl5ml2epu43g20xh16egaqry4ai0lflcs7qaub26lplh4ar97b0oza7osbqauev8hat9z5emmwtjo9827pgiryoe6g6wfbx70qyixfxoxvvkaryph7c7hjbu9dxvzo0w2lbydlzx35j992iy37c3u725pjw0z21wgg6m8fa4ui40fznmi5xle59c4q0yxoqqaqnu8d1yc8489x43vwn6w4n80cu4zgts2',
                isRevoked: true,
                expiresAt: '2021-04-18 22:57:28',
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/access-token`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                
                id: '263433d5-bee6-43ea-a4f8-e7f40832611c',
                clientId: 'e8d51943-21ce-46ff-9411-3267522eee3b',
                accountId: '92865ff5-c03d-4eea-9355-4b0ad656114b',
                token: 'Laborum est laborum dolorem ab necessitatibus voluptatum omnis ipsa dolorum. Molestias qui qui temporibus. Rerum aspernatur veniam ut. Suscipit velit eos.',
                name: 'gf7je2xkzrdk2z4xwmh3r7o1djnhgulksvetexast8cjgvndxigkpqq1pjtq4egdmkcsp1u8nfmc5ypu7yubpkuew9ed8o0mv3ba1tq82y8b99ool10k5z4cp1n5gtj4f4c6tvphauekn8tkahi7jn3stem207imvfijdijr5cnr3b4dmwiyzto1z9lwvpq9pd3zy2ywm1t3fedy8kgqcnont2ojl6esms79pa2pgwazcmfo0eotfzy7rqctgme',
                isRevoked: true,
                expiresAt: '2021-04-18 21:52:12',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '263433d5-bee6-43ea-a4f8-e7f40832611c'));
    });

    test(`/REST:DELETE o-auth/access-token/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/37fcc1c6-7286-4e1d-b461-685dfc36a0ac')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/access-token/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/263433d5-bee6-43ea-a4f8-e7f40832611c')
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
                        id: '4ee1d931-7c04-4e90-a856-4fcd6ac82ca2',
                        clientId: 'e8d51943-21ce-46ff-9411-3267522eee3b',
                        accountId: '92865ff5-c03d-4eea-9355-4b0ad656114b',
                        token: 'Maxime est distinctio adipisci voluptatum. Sint reiciendis qui quo. Aperiam accusantium dolor ea facilis voluptatem. Dicta aut exercitationem voluptatem maxime.',
                        name: 'f3f6mc4dzsgo8yp0rijd86oo3dguicewrlv6v0jpk064rmxa28i455pxevs66hocs7oupray2egx47s0a45u8tkzpr69rscigapfp65zeqx6iho4f8xrpmrydpmy8mf5xbhvocx22qpwaoxrstdwxao6s74pyp8ahu6gqxlhmk2nab89431gvycasz7dbj0s8ams8kt90cxgfg81u4xb36rexa08zdj7n5emkjyl4urg6e3ggs4y9dgc21dxjtx',
                        isRevoked: true,
                        expiresAt: '2021-04-18 11:35:58',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateAccessToken).toHaveProperty('id', '4ee1d931-7c04-4e90-a856-4fcd6ac82ca2');
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
                            id: '6f71bec1-e785-4a1d-9c71-00b229f39a68'
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
                            id: '263433d5-bee6-43ea-a4f8-e7f40832611c'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindAccessToken.id).toStrictEqual('263433d5-bee6-43ea-a4f8-e7f40832611c');
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
                    id: '46d0ac6c-e5fc-41f7-b1f6-3fa2a44bcb52'
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
                    id: '263433d5-bee6-43ea-a4f8-e7f40832611c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindAccessTokenById.id).toStrictEqual('263433d5-bee6-43ea-a4f8-e7f40832611c');
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
                        
                        id: '2462208a-b279-42e1-93d5-97ef93cf7c56',
                        clientId: '1f65c3cf-d4b1-4cfc-8c89-06dceb0e592b',
                        accountId: '81ad5629-4e53-49bf-9e7d-5652c14d9d54',
                        token: 'Modi aspernatur aut fuga et quasi. Id voluptatem dolore animi ad totam accusantium. Illo voluptatum dolores asperiores labore officiis. Reprehenderit facilis pariatur autem.',
                        name: 'yo2xu54897unnytvqyfysn2l7aylcg9a3v5smphuucjmc8g3im2q9f3qyk6mqozxdiz65zq6phamn93z90f7e37drpga04c704j2khivzpl7zxhmhwe7z8v2wxdc2uafr9rvuvb9nxpqpsj1ckjt9gsjolztd2396ffjpu4uq37mdi8rrkuq2ovuvk8mq1rswhgeyz9abn8917p0lr2d6s0rmfgn9nspeyzct3d1ib0hzwob57e8wbnqe6ox4fh',
                        isRevoked: true,
                        expiresAt: '2021-04-18 03:37:21',
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
                        
                        id: '263433d5-bee6-43ea-a4f8-e7f40832611c',
                        clientId: 'e8d51943-21ce-46ff-9411-3267522eee3b',
                        accountId: '92865ff5-c03d-4eea-9355-4b0ad656114b',
                        token: 'Excepturi ut dignissimos fugit. Provident blanditiis mollitia consequatur et hic dolorem aspernatur. Modi consequuntur sit expedita non ullam laborum minus. Qui assumenda qui et nemo id amet sunt et. Sit nobis id libero tenetur odit quam voluptas. Harum et vitae qui molestiae voluptatem architecto blanditiis.',
                        name: '0w9cbso3mjb8vvtkuiuyfa1cdnwbvah0qrguht4qknocx3ywmzws44lcnwi7brn1nuuswgj10hmsd8j4xvfol7rkf5hd2wv7xupehk6gdbsjeil1ehijseei6hq9wz9loqwy1spohn2z79ahqj5y3jr1d2ytz7dmyyueyf185yad552jwzicao6kiufrudobq652t1ysrflkwj03c11yvbrb7pl1pyh976uvs5ik776qnp0hul83p79zdaxhir9',
                        isRevoked: true,
                        expiresAt: '2021-04-18 08:16:02',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateAccessToken.id).toStrictEqual('263433d5-bee6-43ea-a4f8-e7f40832611c');
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
                    id: 'd8053695-fef4-4594-8976-e8a27264e360'
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
                    id: '263433d5-bee6-43ea-a4f8-e7f40832611c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteAccessTokenById.id).toStrictEqual('263433d5-bee6-43ea-a4f8-e7f40832611c');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});