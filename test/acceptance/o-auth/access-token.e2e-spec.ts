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
                clientId: '74d8f38c-29e8-4fba-b779-fe5523458a3f',
                accountId: '8a831a5d-86a9-4628-a0fa-23897dd342c3',
                token: 'Minima consequatur vitae inventore vel ab modi. Molestiae ut vero consequuntur. Quibusdam ipsa sunt beatae excepturi odio quod rem. Exercitationem quis rerum consequuntur et hic repellat molestiae. Nemo accusantium eum assumenda est optio fugit rerum. Autem facere consequuntur exercitationem voluptatum labore voluptatem tempora aut et.',
                name: '6iyx1xl8vh7wpkyy063em2xpundz449a5xbwhkkfkx2etees25htpyse5f5alb5xap6ng5otx80i8553auw606n7nw3z47zwzbgoayjttq28h1aqdkvx6onr6nyrjjrkegr94h649y6j7svdmtbc7ec22cn0pkwf7x93kjbebdyx9ef3ahyxbrszr28rd9ls2yjmiw63onbzd8h68ca1uh365f2mermluaqovccrluykkl5u0843ja44gqrrupn',
                isRevoked: true,
                expiresAt: '2021-04-18 06:18:48',
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
                
                clientId: '74d8f38c-29e8-4fba-b779-fe5523458a3f',
                accountId: '8a831a5d-86a9-4628-a0fa-23897dd342c3',
                token: 'Sunt voluptas tempora neque necessitatibus. Facere sunt maiores numquam ratione voluptatem. Facilis repudiandae dolor accusamus in nulla architecto.',
                name: 'd8igkcwd96sgsdswm4o23c9qxyrlsq9xj036efwdj1h3q6g1csu534mjxiufexqmcmnr4q2ilgfmqakoy8nlmumr4b2i8kwo2x3b7sfhahc9k5533xuvi75cdfozsvrrzxx0ifwqvnjngrofsj35c88y3l7olem57t22hlzk4byog7uyxpc8d154r2nsh3ttvxhwqql0h0g4pvhuuqyhh3zqm1x35op9d0yetlm8bqnz3qd59osqfysmfc5c77m',
                isRevoked: true,
                expiresAt: '2021-04-18 13:06:25',
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
                id: '18e2a196-821d-4f4a-9cee-dabd7041d590',
                clientId: null,
                accountId: '8a831a5d-86a9-4628-a0fa-23897dd342c3',
                token: 'Molestiae a nobis nesciunt placeat et natus. Aspernatur dolor beatae ad laboriosam consequatur. Ducimus sit voluptatem. Aperiam odit laborum. Ad et error placeat esse impedit reiciendis. A quae expedita qui.',
                name: 'bfpexyeuehyegwamo010k263j7t31meqo2mpzfxr4xb1u988xvuvqhi6bvcz7f8g3f7iwlbu2w1nlzz0goex36hwvv2spia58hgmkkg1hvy3y43ulv00fwyifzyrso39pw5iwm2z543jlpw6yqmcw5itwgcc6jgb2os1b0q9c17g75vzg4h2al34fztt8er0hdpo090fbcjk17jyt2m35i08dkqy6yhozd6wk1lrrohkm6rwfc90syym8wl8bqu',
                isRevoked: false,
                expiresAt: '2021-04-17 13:48:42',
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
                id: '18e2a196-821d-4f4a-9cee-dabd7041d590',
                
                accountId: '8a831a5d-86a9-4628-a0fa-23897dd342c3',
                token: 'Tenetur tenetur aut quia non. Nesciunt consectetur sed similique officiis molestiae totam libero repellat reiciendis. Dolorum maiores hic dolor eius veniam error quis tempora voluptas. Consectetur cupiditate molestias. Et magni nam ducimus aut. Magni aut corporis quidem atque tempore.',
                name: 'gqb81cagu0enuxyowch19s66cgdxwz37gqcqjapnj6ax1u01mmrdtknkomt6zcb2lg8jd6kgy3q11k3nuzo1qo5udafj4uqv0wikky65mxeebo0lpmwhfwa5ymimph5u1omwzita6ru5q5va4oz1ek2at5hnobocgkf8cynciitwe6wh160w850h0k8qgbwah6wqzv3bh0mh6ayc0kt0wd5hmcfojqhik3yi8z79sh4h3vls06bi2w53ybkro9r',
                isRevoked: false,
                expiresAt: '2021-04-18 00:18:09',
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
                id: '18e2a196-821d-4f4a-9cee-dabd7041d590',
                clientId: '74d8f38c-29e8-4fba-b779-fe5523458a3f',
                accountId: '8a831a5d-86a9-4628-a0fa-23897dd342c3',
                token: null,
                name: '7w4zoni0urtajr2ljhdi2he05zvyjtvjd81f93vb4hd67zzb8tsuhm4uxvb7q8sn9np47t6xgc5wq315asdsenkpeisvnqvgsz0ua6u6h86vo48yp7gi0b2rqlqrmux81eqd1kx8b19za3pi8ljss33voskvxxx07o8ehmniwhn5quvafs7e5g619qf6f7642d7qr5t3s3l253ef70nsd4w0wa8cuprmmsuzeqwhhy3fxlyha6s27kz4p7qd8f9',
                isRevoked: true,
                expiresAt: '2021-04-17 23:45:43',
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
                id: '18e2a196-821d-4f4a-9cee-dabd7041d590',
                clientId: '74d8f38c-29e8-4fba-b779-fe5523458a3f',
                accountId: '8a831a5d-86a9-4628-a0fa-23897dd342c3',
                
                name: '95y296esuvnmha0p45qt3egipu1ketkwiycci2my8vrqk9d89jg3w1z8htvo457yj6fsnqv5zb2jlu3isj5hmsf0gh9vo3azwtq5adxrx14a1ywwksb0g89mq41730eq4wobcjz3botp1xgjtyht5q4h7nvijzfbrodu334g6t0vwbqvrughq04mnckjq3hzcogdrgy5xv5v11h75g465njj24z1ks3pdgwuqldx1di87212apfbyk5c6ue75da',
                isRevoked: false,
                expiresAt: '2021-04-18 04:25:56',
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
                id: '18e2a196-821d-4f4a-9cee-dabd7041d590',
                clientId: '74d8f38c-29e8-4fba-b779-fe5523458a3f',
                accountId: '8a831a5d-86a9-4628-a0fa-23897dd342c3',
                token: 'Culpa rerum dolorem amet tempora. Aut aliquam aspernatur. Ut delectus dicta. Vel vel dolor id. Est quasi laudantium accusantium blanditiis dicta mollitia dicta iusto. Sint sint neque quia voluptas facere ut cumque.',
                name: '81ganit8hn2ipxm33et5ms2lkgohq9lp0uv51un9itf2chlifx4b5qaurwqqqvl7cgnuveivoj67gw15wncctrscu555kq4vaqcipb69mha6pyocud1qnz9asqhve4753ca5uf8x2kuivu425q3wjuq9owyyjdbp6wqs59jn3lf4kro0m5l1rebqpto44n6ji6mypzlsxcc7sokoeg8s1tu4cg1kage13xtysj5ahbnc6vksvolof1o6v1qngii',
                isRevoked: null,
                expiresAt: '2021-04-18 01:57:37',
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
                id: '18e2a196-821d-4f4a-9cee-dabd7041d590',
                clientId: '74d8f38c-29e8-4fba-b779-fe5523458a3f',
                accountId: '8a831a5d-86a9-4628-a0fa-23897dd342c3',
                token: 'Illo maiores accusantium non perferendis iste quo. Deserunt quos dolores vero expedita voluptate aliquid facilis sint. Qui error illo quod reprehenderit est aliquid et qui atque.',
                name: '13kg1gy30zp1zp5yven6nl7q4huuz3e6jywe4xs0of6j350m8e9o47e8mmwjj7wsl6m61yffoixhqdt99wnbhfj4sghlve99kan5ajul4z515rhag7qmymxzitjttonsg8h1b2ar3scc18hp7r59aneev4uw8v363a4sa2kegpc7eet7j6vhskgvucye823y4tzmwh8s127oj4xqtbwul2wmn0b6d45r053zlca0c1od248gualuv3f17lhp4rs',
                
                expiresAt: '2021-04-18 13:06:02',
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
                id: 'hli9ah1ge989rmhely9ugldock23kamg9cbvv',
                clientId: '74d8f38c-29e8-4fba-b779-fe5523458a3f',
                accountId: '8a831a5d-86a9-4628-a0fa-23897dd342c3',
                token: 'Omnis corporis nemo soluta reprehenderit facere voluptatibus. Tempore est voluptates dignissimos doloribus consequatur et molestiae. Mollitia nihil quam debitis. Totam quaerat illum nulla numquam impedit ut rerum neque. Maiores beatae ut rerum voluptate soluta impedit expedita quaerat. Autem distinctio dolores totam aliquam aut dolores cupiditate ipsum.',
                name: 'grt8wi5ytpc91ai349ck0sxjtum4bmvwqbzqrhky6m92yvi0nq233uqv50jx6i3qglqwgntzm8oqmtoq9moa87txac60shq2rngpt779h9yg6ej9k5jbb9dsybu8jxl0g18z5eiuo35q3r74vu1nc49j2c5eknv1ov35zoz9uxzti2f22bq6ohswbq81s0yx1di4uvw18achq10pgbh190fb4i8mxplrmfc42k6n7rsbmv12ap94c5w7ozmr5uk',
                isRevoked: true,
                expiresAt: '2021-04-17 20:51:27',
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
                id: '18e2a196-821d-4f4a-9cee-dabd7041d590',
                clientId: '2p898r9az3mogd9cbtagp7s1i13gc8w3vhls2',
                accountId: '8a831a5d-86a9-4628-a0fa-23897dd342c3',
                token: 'Et dolores nisi eligendi quam rerum fuga ut. Et vero sit necessitatibus neque a consequatur. Autem assumenda aut. Quia voluptas velit voluptatem. Id labore provident. Nemo optio cumque sapiente nostrum enim quisquam voluptas voluptates ratione.',
                name: 'ql4v6bgcavx4gke03pw21anflo51o41t0xpfov65vomadquwct3zjpc7uasnok7h6m9vsekjupuz550mt68mzmm1q42641vn9lvmynh61r5f0cazsbdu92ahgjmu1gz61xr1zvumhoybpun12i0mjc72ryzaizhp6t931l80b0p1ba9t2mfpl1ryrpyy9m34femj7uiluv66el8ck8ag7ou4ft1nnnm2zrsutx2oy5vn9c8mwkvx8xa59zjwj88',
                isRevoked: true,
                expiresAt: '2021-04-18 06:03:25',
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
                id: '18e2a196-821d-4f4a-9cee-dabd7041d590',
                clientId: '74d8f38c-29e8-4fba-b779-fe5523458a3f',
                accountId: '4yve76jk705yqvrpry638qbr6h99nbqpsqttf',
                token: 'Cumque quis qui perspiciatis id ducimus deserunt ipsam. Aperiam quae qui blanditiis. Id incidunt laboriosam labore ad impedit voluptates enim repellendus eos. Aliquam laborum iste similique consequatur deserunt atque veritatis voluptatem. Aut aperiam dignissimos enim non debitis harum et ducimus.',
                name: 'qols9c9dfj72q2qbkix3ae0qjc66ny21126lstex9jhrfyuo44k3vm9w0z6kt49bnbdzyfasnew8xfkjkvlunfqkc8qo2d9aky5ajntn3fmgicpi3nh7pqe17sj5qmy732m0chgogt86t93hutcf5cxl0tubr3zfbkipznw944b1jl6eqsbqz7kcfw92ln72ktjf068pe0f43r9acwhuqx25t6jl8uvumvpgvqgw63blmhtrfe6o11kpaee1ssi',
                isRevoked: false,
                expiresAt: '2021-04-17 18:33:09',
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
                id: '18e2a196-821d-4f4a-9cee-dabd7041d590',
                clientId: '74d8f38c-29e8-4fba-b779-fe5523458a3f',
                accountId: '8a831a5d-86a9-4628-a0fa-23897dd342c3',
                token: 'Cupiditate est aut rerum. Earum veritatis ea aut. Corrupti dignissimos dolores reprehenderit est ea labore.',
                name: '778pxcw0xf7knok3sxh50g3vpejxi95zx044grl21eplufuv0kukfj4tvc3rlqzr2akk20zu5bkx76v4pareuq4zrzl0x9fl71l0p3m6shkwhd3420fig61uwp8nk7by9zom1lfhfkk1tifcj2e1hm998kq8dtai9thaeq15dqt4ue0et2o54wpncqx8itkwxa4hlfrqzu3g2vsvgeb89fd0z5y00pp9pfeea90s723yczfltfyuoox3np6m6zrv',
                isRevoked: true,
                expiresAt: '2021-04-17 15:17:54',
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
                id: '18e2a196-821d-4f4a-9cee-dabd7041d590',
                clientId: '74d8f38c-29e8-4fba-b779-fe5523458a3f',
                accountId: '8a831a5d-86a9-4628-a0fa-23897dd342c3',
                token: 'Quia magnam qui eaque assumenda dolores aliquam recusandae. Consequatur in voluptas facilis enim. Accusantium accusamus cum optio quis autem repellat quod.',
                name: '48zoffxfwdowkzvz3yn4bm40nyttcpxuyocnieqlgwxc39rqzvd44frp5wc558mrrkrfr36pka0z8z1xrq93htjyszbhg6reoj9qcpirige8uwynouac58dc7l43fkw47wccz4j18q8nkgfgm5htz1jezbjq8y0wa8ltr4c2xv4y1y4a6b4aru8xvfzonopfbsryfrcww0iygxhxo0sa7z3usrvj2ixt329ck1cfbe9opoudn02uve5tjj9rc0b',
                isRevoked: 'true',
                expiresAt: '2021-04-18 02:25:39',
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
                id: '18e2a196-821d-4f4a-9cee-dabd7041d590',
                clientId: '74d8f38c-29e8-4fba-b779-fe5523458a3f',
                accountId: '8a831a5d-86a9-4628-a0fa-23897dd342c3',
                token: 'Aut modi temporibus voluptatem porro blanditiis possimus. Reiciendis velit voluptatem totam consequatur autem. Molestias aliquid asperiores rerum inventore et magni aut cumque aut. Nostrum ipsa quasi. Doloremque ratione dolorum velit doloremque consequatur adipisci.',
                name: 'cdwmzwozyfxy6eczayfehy79qr0yl3xkpzg8b1lsg2tudmbshjjkv5j8osgxtmb76cxnc2i58jjm2nt0loq6h3qrpkdhrfm22qeen18s45o6acxgujpc5lq2qombma8d3bidtj1ht4zo4gxq4j9bp2j44m63vmlowvaghglqb9dhtj3yfy5meiaot5yxf93yk0g4acm46t0n4sp8oji60b13pufav26eyqzisx73u0ay8zi7jbxuu5sgg0rh42g',
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
                id: '18e2a196-821d-4f4a-9cee-dabd7041d590',
                clientId: '74d8f38c-29e8-4fba-b779-fe5523458a3f',
                accountId: '8a831a5d-86a9-4628-a0fa-23897dd342c3',
                token: 'Est et nesciunt cum necessitatibus ea adipisci eius. Sed molestias et sed. Eius aut praesentium cupiditate est.',
                name: 'nu7kdbunul2a572qpgwbyfgtllnz3vu240va6i2bmgzkr1mu0q78n8pv6fnmuiv9ejryujoeci94pw4pvnzqcf3stzmkbntlrsc65dqakcyigk3jkj16brghrqce4lxlnlqwk4knrd4whkm4totu5cqr4mus9hn7y6ro29rr6m1c201dgut028gp8h7ax6oy5l3tjkjz48u1tymcta3mtqutttgce87ykc138jpnyid109aox02sdbygjb20jnd',
                isRevoked: false,
                expiresAt: '2021-04-17 20:37:35',
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
                        id: 'b137923d-5c04-4517-b355-85c2e8fed56d'
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
                        id: '18e2a196-821d-4f4a-9cee-dabd7041d590'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '18e2a196-821d-4f4a-9cee-dabd7041d590'));
    });

    test(`/REST:GET o-auth/access-token/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/8159fd10-b28e-4d00-996b-236242a16f63')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/access-token/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/18e2a196-821d-4f4a-9cee-dabd7041d590')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '18e2a196-821d-4f4a-9cee-dabd7041d590'));
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
                
                id: 'a8dba9da-d806-43c8-b7be-e3a94a4706c1',
                clientId: 'ea9b6070-7cae-46a2-bf77-2d5f4996290d',
                accountId: '85464f04-faaf-4130-b878-4bbbe32e1e11',
                token: 'Est quisquam quia aut. Minima qui animi ipsa veniam ut nobis officia quidem reiciendis. At molestiae sunt sit et. Aliquid est architecto similique exercitationem dolores quo sequi laborum iure.',
                name: 'tv9ppnjhsexpo139vgmhsi4g1pmuak6jspuz4k4ejkyenrmb5ex6vhr8ushp2dhmvkah4drkix2ruby9cvhghfbkbu4ncwz0kbpvqkukwhkw9n978jic5f1q8n73y93t4fijvlylyzkzs0mpjb12me2b07yb4yvkt7pwhcyb83x1wbzxvs3ixune7ijwlv5t297wioqcii99pxh3fmqmbusjjzw440o0d7s1h7xtnt42gs2sr5u0noxly3o0bdj',
                isRevoked: false,
                expiresAt: '2021-04-17 23:11:30',
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/access-token`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                
                id: '18e2a196-821d-4f4a-9cee-dabd7041d590',
                clientId: '74d8f38c-29e8-4fba-b779-fe5523458a3f',
                accountId: '8a831a5d-86a9-4628-a0fa-23897dd342c3',
                token: 'Non nisi officia assumenda qui. Aperiam ex suscipit ut repellat iure aliquam eos. Asperiores ex doloremque.',
                name: 'tvyamldgc4mwsrkkh2udgdv5thrwq4e3onn6ms4mvcfgm9mho35aund315rifco7l2z0y25zieit7az5swpijmjyymb0hpd969jerqy7rm8sjbcxrqzor114zro97bb3ff3w4tncz1c0sljnh1tu4d2yvre5sjd79misqy20c7fox44vofozeej33x1i7ng49d0y9l0brd5yivffstff9zkjr0ljdxqjh2o393al2hzp06g1hj6i0xu4m162nt3',
                isRevoked: true,
                expiresAt: '2021-04-18 03:35:29',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '18e2a196-821d-4f4a-9cee-dabd7041d590'));
    });

    test(`/REST:DELETE o-auth/access-token/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/a5245ae0-dc3c-4726-8c0f-e7667e8ebbb8')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/access-token/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/18e2a196-821d-4f4a-9cee-dabd7041d590')
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
                        id: '9c13c2c0-8ca3-45a0-bde1-25707d2b60bf',
                        clientId: '74d8f38c-29e8-4fba-b779-fe5523458a3f',
                        accountId: '8a831a5d-86a9-4628-a0fa-23897dd342c3',
                        token: 'Fuga et et enim quos ea. Accusamus soluta non adipisci. Suscipit perferendis quos consequatur.',
                        name: 'iiz12tiytxka4d0g6lbqh5a5oijiz59nybuadnh9s0orcj10bzmpru79hd88p5w646bx1zo8wnhmwy7z5axmu46bwthe7kpj93yiol0qrm9g7wsv2fz0erig60uu2kelfivs874zpbfv3igiw9bjrb2y5npvcm5wtpc37ugawujkp1c7w3k3ctai8q0o3o4lo62uc8umoy8b4coy1as2muc8qp3qnp9aooiqztcafmtepgaobrve2w3y0owbq6g',
                        isRevoked: false,
                        expiresAt: '2021-04-18 08:37:28',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateAccessToken).toHaveProperty('id', '9c13c2c0-8ca3-45a0-bde1-25707d2b60bf');
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
                            id: '0b9e815a-5252-4e0a-bad4-b7e0ba25ae09'
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
                            id: '18e2a196-821d-4f4a-9cee-dabd7041d590'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindAccessToken.id).toStrictEqual('18e2a196-821d-4f4a-9cee-dabd7041d590');
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
                    id: '08d3cb4b-2aeb-4412-80af-e30bd623e751'
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
                    id: '18e2a196-821d-4f4a-9cee-dabd7041d590'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindAccessTokenById.id).toStrictEqual('18e2a196-821d-4f4a-9cee-dabd7041d590');
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
                        
                        id: '54c039ae-acf1-4961-9d16-a9f333d994b2',
                        clientId: '911a79c2-d511-4590-83fc-041fe7c010f3',
                        accountId: 'd635ffb0-82b4-43d2-9293-fd115cf2d5eb',
                        token: 'Deleniti deserunt facere fugiat est facere molestias omnis. Repellendus et autem laudantium. Impedit aperiam veritatis ex laboriosam culpa non velit labore atque. Cumque labore nobis maiores esse a.',
                        name: '0obfquxv5acw44rs7cfjas4u3u61b6tw7on7n4gebooqkxiwyes809roth4qmo9iqyzvnalip5wh3yula64mk4pmzzwzeva34cflyt6gd1xeyfh76plf4epk22c2vryhh2er38vkvx3tfvx9y34vfajxzyfttjizhc1tnyvdkz9tckhuy4jt0cym967d5ehinb3wav56d8o580e1fe2qtzp9gzfq3toz34xbqfp0055qc0u7pd49e8c31ggeo0c',
                        isRevoked: false,
                        expiresAt: '2021-04-17 22:28:02',
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
                        
                        id: '18e2a196-821d-4f4a-9cee-dabd7041d590',
                        clientId: '74d8f38c-29e8-4fba-b779-fe5523458a3f',
                        accountId: '8a831a5d-86a9-4628-a0fa-23897dd342c3',
                        token: 'Eaque voluptas saepe necessitatibus provident et error aliquid omnis. Ex error recusandae. Fugit tempora minus sint eum. Placeat et quia quaerat similique qui. Nihil magni nesciunt dolores.',
                        name: 'upnkkv9ssqitd839gor7q2hprm6z6wuepgs1we50ed0svhpuvgvcejhaovge7ilzhqpxum270akrzokfwcqiipdqrk5ohgjw99q9umjafmk779ugtlx29yuc3r8e0bhh0grkzo707dvcvgobmat8e7crhz2kknmnnz6yjoyh7teur7z4k1cv5ulxm0e11ccco3c59r3njrsu7gw0i9dwveyhp2no7uv1vhyfpy1kjmy1osn8c3nrp1g7llk5cq9',
                        isRevoked: false,
                        expiresAt: '2021-04-17 14:45:05',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateAccessToken.id).toStrictEqual('18e2a196-821d-4f4a-9cee-dabd7041d590');
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
                    id: '75311ffe-1bc3-4993-a8b2-9b052d829b57'
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
                    id: '18e2a196-821d-4f4a-9cee-dabd7041d590'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteAccessTokenById.id).toStrictEqual('18e2a196-821d-4f4a-9cee-dabd7041d590');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});