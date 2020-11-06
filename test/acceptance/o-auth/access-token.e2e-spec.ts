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
                clientId: '129d6c80-8ba7-4fda-8555-717820a2c614',
                accountId: 'cc726e09-6418-4798-b6a5-ba421adbdcd4',
                token: 'Culpa aliquid ut aut doloremque est velit earum esse. Inventore repellendus voluptatem enim ut ea sed. Inventore minima est nam voluptate. Optio necessitatibus optio consequuntur illum fuga hic. Odio voluptas itaque dolore quasi sit. Aut ab architecto ex.',
                name: 'dlkhq1mjt59ikmadey50q4syiye7d6k1kh3feu8aces8sqwou1pyh6j1v3d78lyw1dkez2j3gybjfshclwcvi2vvixp371dtpyylakacg4185vg575vvp3tryf54qqmijun5awhavk2tqdg1wtqi8fftn6d2ub2togeblqk5ntvxhhlkrpwr6pvfj6lk1dqt3e73s6hvy3de6ob6o03m4j5ghar7mfpw7qafsoujv5kb5wq1vucj0gfuhf9bjr3',
                isRevoked: false,
                expiresAt: '2020-11-06 01:05:00',
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
                
                clientId: '129d6c80-8ba7-4fda-8555-717820a2c614',
                accountId: 'cc726e09-6418-4798-b6a5-ba421adbdcd4',
                token: 'Libero fuga perferendis. Quis suscipit voluptatem vero ut consequatur. Consequuntur quod ut voluptatibus deleniti.',
                name: 'kgnzub0x9vzsjtbinqjgqxr671a5c4ipwy7dkyvarwyql1zetyenor5zrrytnkpg2ge55ugzsg7l2tkaunfml51gtxqeiyhwmplzrv3yt8pp093r8eazovwgk9o5jezarfwmge7002bryd512ur4p3louvo1pg8tsqw7rj5q1cf7sgonhgidw6rj6hyt1j92npbxztf53kv6n9pv9161jsi503ejk3aquz6g2pksbzsd1zr7ljb8iccd5mmax8q',
                isRevoked: true,
                expiresAt: '2020-11-05 21:56:51',
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
                id: 'e87a2eb4-4e0a-4b3a-a841-b37390a74abb',
                clientId: null,
                accountId: 'cc726e09-6418-4798-b6a5-ba421adbdcd4',
                token: 'Molestiae voluptatum harum. Omnis quibusdam repudiandae enim suscipit. Culpa ut consequatur dolore quia vel. Quisquam aut totam ut. Ad dolorem et laborum eveniet et consequatur quos. Perspiciatis error sit placeat.',
                name: 'q50d7yoewrlid7sqxp3oqfcyqarq2ja634vtkckpgngzv6x8yxkmipu2jrrh5sblgk6sz1dg3us50oqaqhncart4ntkj7igbi0vnouc0hbgwqa1dtvghfhee0v4qgqztx8r9f6fqwrzhl55ktjib5c01xivby4ah4hyc6ygqxhwr79i01s13yzra308fr3ndzprh6vdd90ddi821pjto2utam483z5cz4svf6cyf3g5r8gaqf7qvcphwmddzysi',
                isRevoked: false,
                expiresAt: '2020-11-06 11:01:38',
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
                id: 'e87a2eb4-4e0a-4b3a-a841-b37390a74abb',
                
                accountId: 'cc726e09-6418-4798-b6a5-ba421adbdcd4',
                token: 'Quas fugiat dicta harum debitis nostrum et voluptatum sed. Vel recusandae omnis qui possimus voluptas aperiam consectetur sed. Quo nulla animi et blanditiis occaecati. Minima ratione quo maiores natus. Soluta et id odit consectetur eos debitis cumque optio et. Culpa sint mollitia eos commodi optio fugiat beatae.',
                name: 'c4dwig9hqwuppap067i3elqdvij6msib7po8malvd31y8pk3i4gfgt2hyyfswhytdtuo7kyoo5pndtst8gocjkinx4ezj5qdmut64kormzxrwljo3j3q2ogltwffxzj55z3rh2pu0azl3vi27kxr9o2waxz84kanp20o0vftqg88ld439m4krcqd338zob0797fq78zcon4f266iou274frp3s8vpkt4tt2oyciypca06x2zbdvitrkc9cp9dyj',
                isRevoked: true,
                expiresAt: '2020-11-06 01:17:34',
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
                id: 'e87a2eb4-4e0a-4b3a-a841-b37390a74abb',
                clientId: '129d6c80-8ba7-4fda-8555-717820a2c614',
                accountId: 'cc726e09-6418-4798-b6a5-ba421adbdcd4',
                token: null,
                name: 'xy01qxe1wyksxse9dldw9s9y7ds3eyx32anvsypd1t6lcfmjdppnpyj12riwgu9rdnlfz2v48axq1zykyezh3wrsc9sc03nbgtdxc8so44bjka79krgg278tzd6i7qj8kb2mvp07kvkavig2u5umo5x57xfd6tkgi80nw2mmwgf66218qom15gne10vk9fokdoyz1j2nroo3z77icfv3pn88mkbk4wsdq5s6uadnood8na701yu8tamkhdane6u',
                isRevoked: false,
                expiresAt: '2020-11-06 08:13:25',
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
                id: 'e87a2eb4-4e0a-4b3a-a841-b37390a74abb',
                clientId: '129d6c80-8ba7-4fda-8555-717820a2c614',
                accountId: 'cc726e09-6418-4798-b6a5-ba421adbdcd4',
                
                name: '0jm6mk8qctqn86zs3w2uqwy4h2ck438p5v00wq2js94cgt55lwy03p5ww5zwbw2boq6gnda6as7v0e75z5q9rubhrjg673cfckm8pr2obsuq5kjboo9vld59y309vq50wieb109x21k1j7kc625ew4wy3q94rcb922fuuagc0wl11bhuq6twkcc3z2pepcwe8baj8aqu4o7xu6wphjmck85nk68044eqrqqs3nfydl2y5d6ypiwyu9bfeau1vcz',
                isRevoked: true,
                expiresAt: '2020-11-06 04:51:23',
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
                id: 'e87a2eb4-4e0a-4b3a-a841-b37390a74abb',
                clientId: '129d6c80-8ba7-4fda-8555-717820a2c614',
                accountId: 'cc726e09-6418-4798-b6a5-ba421adbdcd4',
                token: 'Similique fugit quia vel quod quas. Ut hic voluptatibus sint veniam qui aspernatur. Aut illum impedit quo dolorem totam et quibusdam. Et voluptatem qui impedit rerum ullam quia voluptatem. Nesciunt eum sunt dolores et dolor.',
                name: 'acrtorp7q94pvq8749fmy60gtuakdzjask42gfgxnuz3jrxgxingf5gkrb3zsb8zhx44d2fr487tq2n083g792ich9y7rube9rlcmig1tsvblhds7bixuewry38m2cafz8ahua16i11384cbibcdpf7pdxesw40xgckgvralgekndvcl7s2ghdy5ds2pqdh3r98ilye4kj0kwuqj6cs6n9nbtu06124aqjwos4wyoovf16yhnensm010fho25h4',
                isRevoked: null,
                expiresAt: '2020-11-05 20:32:13',
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
                id: 'e87a2eb4-4e0a-4b3a-a841-b37390a74abb',
                clientId: '129d6c80-8ba7-4fda-8555-717820a2c614',
                accountId: 'cc726e09-6418-4798-b6a5-ba421adbdcd4',
                token: 'Iusto nostrum cupiditate rem laborum explicabo repellat a saepe repudiandae. Odit dicta veritatis enim ad voluptas ut deleniti iste totam. Dolore fugiat ducimus facere qui quo ratione qui. Molestiae sed eaque eveniet harum. Optio et ut. Voluptas enim consequatur.',
                name: 'q5jvplcmavqyynbhc755shksqqk61dcetrkxbmgjn4fg5tmty92iltfyegovq75oq3jq1svqrzf6k8z9xme32clasbos1eq162y9kv9o44gyucz0dlkjmriniiisl8q4btydrarwgznvw50czg1te7wbinr1ienrtecy8ij3n43c16j6t83gjz56wqjm21ij9r0jhbualvkkza7vfx6y1e4js0kztmgmp1v69le5hgaxq2k52wvjmksve9b0otv',
                
                expiresAt: '2020-11-05 20:14:30',
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
                id: 'jf7nzk0hus6pi1uuevvqgfjao68xmiydhuuta',
                clientId: '129d6c80-8ba7-4fda-8555-717820a2c614',
                accountId: 'cc726e09-6418-4798-b6a5-ba421adbdcd4',
                token: 'Eos quia rerum omnis est voluptas eligendi error. Dolor culpa iusto aliquam vel nobis quaerat sint ea. Voluptatem qui libero nihil porro adipisci distinctio aut praesentium quis.',
                name: 'wezlss0b9umtaio7of99nh6qinfuqv6ccl0wac74rv077y1r5xso4b0a7ktjbccn2fz95u21s9zs72xmmmj7tb9rx0otp0vlx2nnc0noqih1e2qvwfvhngiebupsgm7uknujasl0tq17nl9wz430n8cafw6pndoqbomib1wjzrqey2t5bh8dms8ccpne45cb8kblu1vkcudgjcbh3ghgzr6ruxlaffocmnog12ithrr2mfrzvy96ytbxepnvnly',
                isRevoked: false,
                expiresAt: '2020-11-05 18:00:22',
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
                id: 'e87a2eb4-4e0a-4b3a-a841-b37390a74abb',
                clientId: 'iirffaqmjsvz8kjqezhjorr46x0d3sxlfgd64',
                accountId: 'cc726e09-6418-4798-b6a5-ba421adbdcd4',
                token: 'Eveniet eius et consequuntur aut iusto officiis. Dolore id consequatur nemo veritatis beatae rem asperiores vel. Minima doloribus occaecati dolor eum exercitationem similique non consectetur quisquam. Totam ipsa necessitatibus earum omnis placeat aliquid.',
                name: 'lohcm94o01ct8hgzwxmudzmlnsaebkif2hz9vbneh50u7j25wmas86xb07btrgmko92xfsxrkp5vgz6uyvf8wo0lozp1nafe4v9fipb3p5d0dqmn7t9wkupuuskkwhxy3rsclp0turg8fzh64kda6sijkub79tbzhel2312jyv6b2zvpf2jyh4mpgk4t9cv1u8rntn356ielkcj6xyrqu24lmcs6m1j2akdgjl72dr2q4lozuq6bghvsa03cvqj',
                isRevoked: false,
                expiresAt: '2020-11-05 17:29:00',
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
                id: 'e87a2eb4-4e0a-4b3a-a841-b37390a74abb',
                clientId: '129d6c80-8ba7-4fda-8555-717820a2c614',
                accountId: 'xyvboqh0zevva3cp6ki07kl8jvnt1fhjdov95',
                token: 'Sed deserunt ratione ut saepe illo quibusdam. Animi non similique qui et beatae magnam rerum omnis. Quo repellendus ducimus autem vitae accusamus. Placeat maxime voluptatem quod ea sequi consectetur dolorum maxime. Dolor odio eveniet voluptatibus exercitationem incidunt.',
                name: 'obkda2f2d67rc3n4vzv7qtz6uxinhey2nyy3o2yjsp191lu9mn5smuy5b03jdj12zyfaaqojtipou7mchioj3a65fw78az0hvis65kusn1g03zr0yyyjedpjrx485zhvs9dn1g9d2e1me2klrm1zdtsfg4dai8le023ez6ny42ifdwu8xrzdaugoa0iceagphuxas3pekf4f6wriuj4walgqksss1n67zw92j1bde2gagfmm1d4efyqvj7qnij8',
                isRevoked: false,
                expiresAt: '2020-11-05 18:53:54',
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
                id: 'e87a2eb4-4e0a-4b3a-a841-b37390a74abb',
                clientId: '129d6c80-8ba7-4fda-8555-717820a2c614',
                accountId: 'cc726e09-6418-4798-b6a5-ba421adbdcd4',
                token: 'Soluta officiis eos iusto eveniet est non. Eaque incidunt ut quia voluptates modi quos vitae incidunt. Labore et et dignissimos. Omnis distinctio facere temporibus sint et non ea.',
                name: 'okjj93pb7himuzwoffshd52o5dyn31sr9u0lwfwljt7ig0fhx018qashl0bi284z9te9g0myrygtgsy6vg1b3dfyows2jqj39xe3zkepkibxp4hon4e6vpjcdnva6hetfar5ax3qdnrio1um76erq3fe1ifcbrr9apf77nyoabwz7j2a0rt8lgdftalwyqa9lqynpt211hdetwquh0i0mtcwg9jz8mkqsw8pak62078y7jc6evc18f8fjv6o6rmv',
                isRevoked: true,
                expiresAt: '2020-11-05 20:33:38',
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
                id: 'e87a2eb4-4e0a-4b3a-a841-b37390a74abb',
                clientId: '129d6c80-8ba7-4fda-8555-717820a2c614',
                accountId: 'cc726e09-6418-4798-b6a5-ba421adbdcd4',
                token: 'Deleniti pariatur vel aliquid autem velit omnis vel quae. Pariatur pariatur enim fugit. Explicabo quo qui a enim. Ut debitis consequatur in maiores aspernatur.',
                name: 'jwew6x0cqduogq5n09mqzqtdtaqo4iykihbk13ezl44dal5n1s1bij80mjx5vn6q2ruk9x0knwof2io19f1j2aovgvzd7a7zyfhsyaanmtxlbxdplghamqyv6e2pd8f5tsuba6hp39vlsebjku9zo0lwvaiks7y6t51t8b25zceb61gbvthwat8vdj6pvbdsq9fn7ez34pyo30t2vpw1chg4ytr8svpsezxah3grmssw1bzt5hfvy95suzkombm',
                isRevoked: 'true',
                expiresAt: '2020-11-06 01:29:52',
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
                id: 'e87a2eb4-4e0a-4b3a-a841-b37390a74abb',
                clientId: '129d6c80-8ba7-4fda-8555-717820a2c614',
                accountId: 'cc726e09-6418-4798-b6a5-ba421adbdcd4',
                token: 'Itaque dolor atque cum omnis pariatur. Natus exercitationem quam eaque. Doloribus vel voluptate consequuntur. Adipisci quis dolores maxime voluptas fugiat quos. Officia cumque quis temporibus iure laborum impedit in itaque a.',
                name: 'uhzgcpn4i9fbrvhk2hwy9tyuqwljkru07gr89huybke2unnk7d4wpiewsgjb5xdnjlv2zzcr2qny6unn24cq6mpmb694u1hh7qe15622wakc1w0i4de47ye2tgm3k5gtef30qh6248idw57du0ks5z5lxynm622etgspegr86rd4brnt7hqlyup5wtcit56kl3ngmr2xrgod2kuocd9fvy0fng1mz5h5xsy293kqpt0o17wekp9vxco4a6qwrro',
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
                id: 'e87a2eb4-4e0a-4b3a-a841-b37390a74abb',
                clientId: '129d6c80-8ba7-4fda-8555-717820a2c614',
                accountId: 'cc726e09-6418-4798-b6a5-ba421adbdcd4',
                token: 'Est eum quam nemo vel sunt incidunt cupiditate non. Vero qui sapiente consectetur reprehenderit animi quas laudantium cumque. Nulla exercitationem adipisci ratione sed qui ullam consequuntur. Asperiores ut provident saepe consectetur asperiores inventore qui quidem.',
                name: '0nnam4ujhj3hpfhn1imexerkbwey45fbkgx1l4i54u3dvjl8lwdi5cvkghpmq1dmavsh80bbemrspntpyio0188kc3bsbcvisyt5sv9i8sbnnjq5im9puup0gdoe8g5ey2x54j27be72px128anhbonnhtakxgwcok8fbz76alsnasfu3ylemts4nzfl96qoe5pfnd1qdikanf7u6604ucjvohkxksiq7fe105ugwazj59gtit70j2zm4oso4j5',
                isRevoked: false,
                expiresAt: '2020-11-05 20:07:28',
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
                        id: 'c3281824-9d0a-43fd-93ca-95e46e2be453'
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
                        id: 'e87a2eb4-4e0a-4b3a-a841-b37390a74abb'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'e87a2eb4-4e0a-4b3a-a841-b37390a74abb'));
    });

    test(`/REST:GET o-auth/access-token/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/1a665bd5-00a1-4b2e-b97e-03c2b7c0ad63')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/access-token/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/e87a2eb4-4e0a-4b3a-a841-b37390a74abb')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e87a2eb4-4e0a-4b3a-a841-b37390a74abb'));
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
                
                id: 'c36324f2-1846-4fff-83ee-2b7e6bde3465',
                clientId: 'a356180c-e68a-42ea-b435-e64aefcafb1c',
                accountId: '4584f602-7c22-4641-aff2-ce23cfb18622',
                token: 'Non ut id dolorem maiores et. Quisquam amet veniam aperiam. Nesciunt et omnis. Facilis ut praesentium est nesciunt at expedita.',
                name: 'j8fpnhrw3ssugpvh9j4q7npxtg0vupm7nhiv1fx6jfp0bcquz9kxyv66ftljzm6a24tnwxb1hzv5mi73k66dqfkpxp66kdsqp1obgnsl69ggo3i7yukvpofouarpsqjvi87m95xu664q5yjiklgas9df0vt82rinsk2jw11g1avw5kysi2vgz7r5iex8zx80291ct12ajs81arf1enrkul74pnbd58q9a76hxhb2rm87s88y9qizx436uw9k5n8',
                isRevoked: false,
                expiresAt: '2020-11-06 02:40:42',
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/access-token`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                
                id: 'e87a2eb4-4e0a-4b3a-a841-b37390a74abb',
                clientId: '129d6c80-8ba7-4fda-8555-717820a2c614',
                accountId: 'cc726e09-6418-4798-b6a5-ba421adbdcd4',
                token: 'Provident rerum aperiam. Et laudantium mollitia earum architecto ut voluptatibus corrupti. Voluptate error temporibus. Tempora et quia est distinctio similique quibusdam voluptatem doloremque. Nam esse voluptate ea nihil sint.',
                name: 'dmga3afksmudphwp47gud8wwqll9b9wq35yb5h6drqef07i6sunmpp7f0jmg1zkjtgx65387a09neofqfnndo1f3buh80vkoqbyk8a3qn0pi5idydiggslbxnneommnfysftugperw5n6w9e1p7v3de1ulx660hadeii2lu6as26jl8w5t4hjjh0fr12car9x3xw83clcdj599z0p0o4o14178uzpmokxmzcd2izw99w11wijkb7ehka2sdg3fj',
                isRevoked: false,
                expiresAt: '2020-11-05 12:30:22',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e87a2eb4-4e0a-4b3a-a841-b37390a74abb'));
    });

    test(`/REST:DELETE o-auth/access-token/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/3968d157-7123-4c14-9394-2a5325fa918b')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/access-token/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/e87a2eb4-4e0a-4b3a-a841-b37390a74abb')
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
                        id: 'f9acf46d-8858-4c37-9ebb-2ce453c3379a',
                        clientId: '129d6c80-8ba7-4fda-8555-717820a2c614',
                        accountId: 'cc726e09-6418-4798-b6a5-ba421adbdcd4',
                        token: 'Illum eos labore. Nihil esse a non blanditiis vel. Earum ipsam neque repellat enim est. Mollitia omnis in similique. Autem libero saepe vel eius sint consequuntur maiores facere.',
                        name: 'bznz7im3tku1e7gqy3m5y3dzo3zyxe6nsqph2zbefjfv2uvmmzbpoay2t6k27lnkua93cqp1253ucdqziebwnt3hr8y4gxy8lzyj82c44phczpe31ev0lflrbeu4tjoodoyhktohncbvz428i5u8w5rm2du1c35fhwh1r72pn9d8tu7ekpzswn8uq11o307lnk4us379t6x9nqlf2qbqap7rskw3abkefy5zcc59k5icnh9vmuhdslh90jtcewb',
                        isRevoked: false,
                        expiresAt: '2020-11-06 09:38:59',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateAccessToken).toHaveProperty('id', 'f9acf46d-8858-4c37-9ebb-2ce453c3379a');
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
                            id: '7814b4c2-b766-44a7-97b8-12ecc280b450'
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
                            id: 'e87a2eb4-4e0a-4b3a-a841-b37390a74abb'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindAccessToken.id).toStrictEqual('e87a2eb4-4e0a-4b3a-a841-b37390a74abb');
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
                    id: '56391351-589f-4efb-bf8b-25028104106b'
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
                    id: 'e87a2eb4-4e0a-4b3a-a841-b37390a74abb'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindAccessTokenById.id).toStrictEqual('e87a2eb4-4e0a-4b3a-a841-b37390a74abb');
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
                        
                        id: '230a0c4f-44b5-40e4-84ab-22c24646a0c4',
                        clientId: '353f5fcf-862a-4092-bee5-9ea8fd9a60d7',
                        accountId: 'a4260d47-015a-4738-a149-b26c7d741261',
                        token: 'Quo eum vel quas beatae vel libero nam. Fuga error velit perferendis quos ex nihil repellendus enim sequi. Rem architecto voluptatibus nostrum aliquid vel dolores nulla nam aspernatur. Temporibus in et sit quasi quo esse. Est laboriosam natus deleniti est alias enim molestiae dolorum.',
                        name: 'efdb49hkce2i74pvjnndh4emdhslei40ho6so3u7h0qd02ksfd1is4g2f205s1zwffred2eyubl5xtacljsy2sf8rifuwmgz9n2bi40pyrktz9xjqb75iztnrr97njr7d3yhsibbs8pwt9tbl1y8b79whoegh4osuapunawpp3dry2huf7loi5sux9aotrc32yo2b6rcmjbyfyt02p7lhw52pcy8dgbqkd569n8evof9kn4tckljft6wifxnwrm',
                        isRevoked: false,
                        expiresAt: '2020-11-06 02:53:58',
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
                        
                        id: 'e87a2eb4-4e0a-4b3a-a841-b37390a74abb',
                        clientId: '129d6c80-8ba7-4fda-8555-717820a2c614',
                        accountId: 'cc726e09-6418-4798-b6a5-ba421adbdcd4',
                        token: 'Ea occaecati velit voluptas. Nemo est consequatur non voluptates odit magni. Ex placeat nulla est occaecati et fugit ea.',
                        name: '5tperr9lnspm8m3qx2b1ewh1cwkxv79alf013giaa0ofswq2333v98y1pifqbh89us3birengs5hahkpximsyyjpdlv65m8y874gpo3nxqw3smyn3a8gesyyc8smzud87haiia8jaut0u6eupjlwfq4gdjdzsc0t9djcvfgjycip1jky8lmognkqr05ntvg64c0hs22isk4ndh0jxbrpu6g2k5f07nq1vccbfou3l1dqlo95j8oe5xknljx88sm',
                        isRevoked: false,
                        expiresAt: '2020-11-06 02:31:41',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateAccessToken.id).toStrictEqual('e87a2eb4-4e0a-4b3a-a841-b37390a74abb');
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
                    id: 'ca9960f1-228d-4e2a-a70e-50cb032d44a8'
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
                    id: 'e87a2eb4-4e0a-4b3a-a841-b37390a74abb'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteAccessTokenById.id).toStrictEqual('e87a2eb4-4e0a-4b3a-a841-b37390a74abb');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});