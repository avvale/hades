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
                clientId: '215e45fb-6b16-4fbe-9deb-5ce1a73ca00c',
                token: 'Id voluptas voluptate. Natus quidem tenetur est. Optio omnis voluptatibus facere nihil qui ut minus et. Consequuntur sint totam adipisci voluptatem minima quod. Fugit dolores voluptatem.',
                name: 'uejygnh7hm8htwn16d1k8w7o5un4ls4ec9m9piif8mre1u3fbswnfk6hoysckemg07fvfgngj97kz3r94q1suc2w46c19wxr6rgxvixrfk4jp52sacxa8xygog6xdpjm6n2govzho3u546pc72ouv152tryzi7a41s6o5hp8k1j7z1el013bec4miqvatqmql3d4618tkiyafakmavk387340o8lv3bkmssvrolaud0qsiz0jux27unry7k9pdj',
                isRevoked: true,
                expiresAt: '2020-09-19 13:47:40',
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
                
                clientId: '215e45fb-6b16-4fbe-9deb-5ce1a73ca00c',
                token: 'Et neque ducimus quam reprehenderit est et culpa labore ea. Sunt velit sit et. Ipsum est non velit quaerat suscipit nihil eum et inventore. Quas suscipit qui. Eos voluptate aut autem. Natus et corrupti.',
                name: 'j74bmxr0tbqtg03f56fh2pqocfku80olhfrya47mqh1koj2r3t8grma720m1vgwrlsjsfkfs6adk1vy66wo7h44o2nw6ff4ajmlnwmmahv8xqvbgjur3bwminaxcbblgfzvuikld2vdu14e5qp7l9s70wsdj14ofsu837suzjjawrkdgs69v22ha8p8m1xxi094yi94rfjbjl5g5xh5rcdefah8b8rt9i95mpi4542xd6nbtv1kjf1y81dwl571',
                isRevoked: false,
                expiresAt: '2020-09-19 07:06:25',
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
                id: '68b8a401-923b-43c9-be91-63c250376975',
                clientId: null,
                token: 'Itaque alias et maxime dolores totam ad. Hic nulla suscipit fugit excepturi nihil. Neque non libero voluptatem repellendus veniam provident.',
                name: 'tmxzd705utnt5jn64l8bn9mk425ntr1bov3eo181c3tmx5pmp769nc6jyrjqopz4lxn0ygq5hzm5ynq9tx839735m1xawz08pscvvbujfia76zuzdet01d94084qggk9ycdh02bpu3rugd98fhfik5xu6tcjbvxbp2jygl75dnelwyn31u9m8iuu7e9qeiuf6t9blo7s2ie278ypbkz0ocay2ie37h7agjclabznphfjrx6bm0w2jbqdwqqpen3',
                isRevoked: false,
                expiresAt: '2020-09-19 15:46:25',
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
                id: '68b8a401-923b-43c9-be91-63c250376975',
                
                token: 'Dolorem quas quasi aut iusto nesciunt. Fugit minima est provident inventore sit aut. Deserunt eos at commodi commodi deserunt nemo cum ipsam debitis. Perspiciatis sed qui aliquam dolor. Ab eveniet dignissimos quibusdam dolorem sunt nisi.',
                name: 'bt6819o3dfe9yuby5lkxsli3d0zf1dazwhohpbrhtnopwfxevz4nun21g3zu6kcynnlvj0zw8f2tycn0jopafey7qqetfnaftcanl1bqr9d2byh4sbqcju34x6z163nz1diyd2baig0p2peerukodf63wqa9tgrl5tam5jqciwb9o4anrxu3z58kc050qy4qyohhw6rtrfexi5ygqk0hvjdqo0it9wvu2jb39zgt2q3p7z5i2poo80qaw32s77e',
                isRevoked: false,
                expiresAt: '2020-09-19 12:11:22',
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
                id: '68b8a401-923b-43c9-be91-63c250376975',
                clientId: '215e45fb-6b16-4fbe-9deb-5ce1a73ca00c',
                token: null,
                name: 'eqno4zrlchgusz8cpj2rq7umbrpy0bl8slf3e860c6p6qhqgtyeb8v0xe1vfd4ypdopi3huc0vcmutkdbzjlfzfyfil4dtj6jsp2n3hmsfzul5l26jdqc6ba3ymctfi57g6hmrs4lta52x6alkkrz42ptcrc0fd4e4plz31hssmnx11x0yi6y1u5csperzdwwkx2fy3u3cepw6omj23xgta65zkldu4shqqn2837rjx9uai1cr82b4ivsm8145s',
                isRevoked: true,
                expiresAt: '2020-09-19 17:52:00',
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
                id: '68b8a401-923b-43c9-be91-63c250376975',
                clientId: '215e45fb-6b16-4fbe-9deb-5ce1a73ca00c',
                
                name: 'nwbad6pyyc2drj2v4wdlj0c2qjrgu49v0o3bhmy02j7e71z4rbrsxwzwxc0h7fg2tv0rx77mgp0fhrwjsydde6ksbmg6ake6urhxg8vf7nsszlixuk6234bgplrbasz23r94aj1z299idpgh2vnxsudj8zue261nshhk1e7yym79eiyg6uxxs6cblx90kzrnxcc4ue05l2y329f06wmu6o3xz0ktv6fjb1wy0lrxqeahfz50tms9mq3lfzvgpsi',
                isRevoked: true,
                expiresAt: '2020-09-19 02:23:26',
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
                id: '68b8a401-923b-43c9-be91-63c250376975',
                clientId: '215e45fb-6b16-4fbe-9deb-5ce1a73ca00c',
                token: 'Eos repellat facere porro debitis autem eum dolorem consequuntur. Ratione consequatur aut quis sed sit officiis aut quia consequatur. Sit aut fuga distinctio praesentium eum animi. Ipsa nesciunt neque aut architecto possimus enim illum porro. Doloremque ullam placeat eligendi voluptatem ratione aliquam praesentium qui possimus.',
                name: 'ofutfo1o88r5ttu3mp9yps92d39vexj8ek8ocm3gxc33iulq7ivqpfls1kpyaf6x54meblm72oq49kcwg9mco6dyd2gzvdkgkvbicaa8lj3v4mgdifb0z3x47qbj78ex5ulut62rprkv9vux0xgnnm0xwzu1eu657c9l14dksxghz6uiubu2hk8uyawxbh5rhdrl9ty25hnca4dz9rdh97rtd2tdnxx54ediz6ldfc7s9ud0x2hmrnm8qihkjuc',
                isRevoked: null,
                expiresAt: '2020-09-19 23:41:59',
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
                id: '68b8a401-923b-43c9-be91-63c250376975',
                clientId: '215e45fb-6b16-4fbe-9deb-5ce1a73ca00c',
                token: 'Iusto tempora nihil saepe dignissimos rerum voluptatem repudiandae fugiat. Dolorum voluptatem maxime consectetur corrupti asperiores facere mollitia. In error fugit voluptatem ex molestias eius aut.',
                name: '6aih6qrkdabah09dma1daetrlyjakm7k0ttc91sk8gla1t23pxvj32xnw73dcwmvlpxufywtfozj6g8l942ayxm8d6gp32bbpbrwyat9tllw6oaw06ul0qlcspmoj5le2fo0d6hfdhjd5fadhtss4xat5n0wz268d0qp6r9ks7085garmc05u3f0y5lujihoet5wqvunzdpdygzw7hhie2ehx8h8sz8x4rr141gp20fqk7twsm6ec6trwh1hv5u',
                
                expiresAt: '2020-09-19 03:50:15',
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
                id: '5sj2znskyynjw3rq5upxdmxjd9ugmyh1a8lpo',
                clientId: '215e45fb-6b16-4fbe-9deb-5ce1a73ca00c',
                token: 'Consequatur eum dolorem iure quaerat autem impedit eius. Perspiciatis fugiat debitis. Hic voluptatibus magnam corrupti. Voluptate ut eum veritatis vel. Dignissimos corporis maxime voluptatem quis sit non et. Quod natus officiis.',
                name: 'wbf8wdgmd5qusyga9uxxro37qpu8h3p7p5mnm5fka595efz2a7tegzcox6mbkdkuguksmfn43o1a8czmwtvs3yiyg8qwxmz0x64vazrk3qev4om8puuyghutps0bl4d3udzb3gdpeh8q9tjtvvf7qgm3xsw7gq3y4yifliwlvu2jkhn4gefb32311d6e4lbj8lbzehlsb84cavnkcuhn1a9p2lrv5od4119vmz5pm6w5xcrodbg4igshza3kngg',
                isRevoked: false,
                expiresAt: '2020-09-20 00:12:18',
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
                id: '68b8a401-923b-43c9-be91-63c250376975',
                clientId: 'ovcxz6809i0bobwjr9wo2rrnz3dyayyrh1qe5',
                token: 'Vitae consectetur recusandae sapiente impedit quis libero sapiente voluptatem quidem. Quia et numquam qui. Voluptas dicta perspiciatis veniam porro non rem facere itaque sunt. Iste illum facilis. Expedita ut maxime dolor non.',
                name: 'y9lyrivyqcz60cg49m8dv2zhls19zqxa9gupwcrk5df53gox9rcww0cv2cxit24koaceibmwt219vpay17roomd5f1bu9vter9dxleyisvh2i2sw5o9kr3oftpoyteovfc95p54q5f56ka8z3ckl6irco2khrd8nigcgwucu9obu5cpdhg7cddt3vkxfvqrllhs8f0l9zr96tjrrhevm19m5od4588ayiv7hvblnubhdulb3uteagdy4pmp2v0a',
                isRevoked: false,
                expiresAt: '2020-09-19 15:24:09',
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
                id: '68b8a401-923b-43c9-be91-63c250376975',
                clientId: '215e45fb-6b16-4fbe-9deb-5ce1a73ca00c',
                token: 'Vero aut dolor quae aliquam molestiae dignissimos aut hic. Eligendi porro quam et assumenda totam perspiciatis sed. Voluptas possimus qui sit. Possimus ut et.',
                name: 'lhryplpop7e29qn46bmdxi3ztdhf7tqgdn0emidvcb2x9roo35tcl4ati90in613tbh0osz9efs8egzin0921nf4e33j4unbmi0norhp38qx6zzrbhl0bbc0n8rugl91blwlfcx3ajxtndr3ewvfxtakdfuenoqfloxtt6ef1msb2xn9ust3ikffourmkuwr3mlwv07xtcnsyem8lyezeza5vxv5a7zsq676dab36wzhco35ddjg0xc3a8j2uhvw',
                isRevoked: false,
                expiresAt: '2020-09-19 13:58:00',
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
                id: '68b8a401-923b-43c9-be91-63c250376975',
                clientId: '215e45fb-6b16-4fbe-9deb-5ce1a73ca00c',
                token: 'Voluptates eveniet occaecati. Aut aspernatur earum vel. Optio consectetur aliquid dicta assumenda aut minima error. Sint explicabo ratione sequi id quasi.',
                name: 'dg2jcz7rczfea9ci702nx18426krs9idcmmrst5e2f8rvb7fwi6t8uzyxv8791fv09u1gmo3dk5f9ysvjva39tij3jb9alrc1brmvyul2hjaqewtrf0d1khayb6ugqpoo97i49px54iz4bwyq8ip3p2jjkimprj158aqipre6apmt7kaqoq5lxkvfzqxfo6rnz15pl4b2ovwcqwl5u6cmiq9r5nw0hfpbbq9z52bnr7j95fhe7csauljrkzlgaj',
                isRevoked: 'true',
                expiresAt: '2020-09-19 09:09:49',
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
                id: '68b8a401-923b-43c9-be91-63c250376975',
                clientId: '215e45fb-6b16-4fbe-9deb-5ce1a73ca00c',
                token: 'Qui est hic vel vitae temporibus. Officiis voluptates et et officiis quasi reiciendis aliquam. Atque exercitationem consequatur non reprehenderit qui. Quo dolor expedita quae ut velit earum tempore error. Qui placeat provident accusamus veniam enim temporibus. Et est distinctio architecto ea esse suscipit qui dolor esse.',
                name: 'skolmbzj8zz2nmwizouicovenkyni9uoudd6h7tf3jiyrymnjeqyvk5e7iiomdh0i2tjt7bygnlm6d4w37r500eke0ohhlqe0w3zrk9l07q6d4jdcu1vo5t63nglcqowrxhjmm00id3bjw1cxf2z6tuqgsmvt97a9k8myznrpfcw96flsv7ytgj15tdoby9i52fb0g4887wdymltvz3n1hckmb1umiuzpc2z3itaneid6gju7qxu54ykfa8i57k',
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
                id: '68b8a401-923b-43c9-be91-63c250376975',
                clientId: '215e45fb-6b16-4fbe-9deb-5ce1a73ca00c',
                token: 'Quis suscipit natus cupiditate totam sit optio inventore qui. Rerum voluptas sit nesciunt. Fugit qui ipsum ab hic aut id et enim vero. Corrupti nam explicabo.',
                name: 'jorzoxyr4irhnbq5walwsa405guswzqlu7cvra38aoi9f8nd7drlwtpnwhed5k6k4y7zftgxlsiliay79192pit7qfnya064srvc2jnvde9mbswaog9x4yo7winvtkpljmefyaihd5gd1ckzcpppedwwdxpx8yapwg2iiyx7cvuvjx04048xun8r7t2kkupr3t9vmyr8h2k8ntkfs9wvrhx7ycd690sd0jx21e0o44uporyqiee2shauxea7pc1',
                isRevoked: true,
                expiresAt: '2020-09-19 04:32:19',
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
                        id: 'ec88bc98-9f7d-4118-80d2-14c737e3419d'
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
                        id: '68b8a401-923b-43c9-be91-63c250376975'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '68b8a401-923b-43c9-be91-63c250376975'));
    });

    test(`/REST:GET o-auth/access-token/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/193686c7-f8ac-482e-a6fd-0d096f39a839')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/access-token/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/68b8a401-923b-43c9-be91-63c250376975')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '68b8a401-923b-43c9-be91-63c250376975'));
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
                
                id: '56150f86-87e3-4534-8f8b-5cd2777a7935',
                clientId: '1112c4ef-4def-4ca4-a1a0-33858f1603f8',
                token: 'Velit totam est. Saepe voluptatem voluptates libero ratione sapiente. Veritatis qui minus possimus.',
                name: '0ms2kel8vdn06nyfy1l2dh7dh59bjf65uzb66mj7tpr7yjpvtbf7r59v3wiuvrw6tdkuclvv8rwvdepoigmi45zhv77ktnp20rttz0cj00x3k4qy3lx54726qmdb919a4eopctu1qh8ttduom3eef71dql12ruoiz1n33w7nrvaip16nnffhvwdnhh67c8wpkwpfqwfa0nbb1gldo16a7d69c69gehhw7t7iknw0h0v69vmckp6bbhp1y6lxes7',
                isRevoked: true,
                expiresAt: '2020-09-20 01:05:45',
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/access-token`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                
                id: '68b8a401-923b-43c9-be91-63c250376975',
                clientId: '215e45fb-6b16-4fbe-9deb-5ce1a73ca00c',
                token: 'Aut nemo veniam vero. Quia recusandae occaecati quaerat reiciendis suscipit autem consequatur et. Delectus nemo fugit culpa delectus rerum velit officia voluptate.',
                name: 'o8xst3v63dhncrxi9gisla3v0brsyhds094pu6gr3jam1jim45qcltl3ta1lp1rh8e2v96akvwvyxlyu9lnhu7xfll6mb8w9pt50hqkpq9tzr0i2y5z3yypcdgtbksisiysd0j9e18mcxqjvyjafo1mnp3qidpx1nxv1y81pni31i0sfa18u4w8228g6vstp01tbe612pqo2qs2xldtas2b09p29ou042ygbg4ameqwvdwrq9oqkj82cm833pnw',
                isRevoked: true,
                expiresAt: '2020-09-19 05:04:54',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '68b8a401-923b-43c9-be91-63c250376975'));
    });

    test(`/REST:DELETE o-auth/access-token/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/b1f5953b-dc58-4a67-87ab-d9e848c56a29')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/access-token/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/68b8a401-923b-43c9-be91-63c250376975')
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
                        id: 'fc29f1fa-aaa2-4090-a71c-244539cc69bc',
                        clientId: '215e45fb-6b16-4fbe-9deb-5ce1a73ca00c',
                        token: 'Ad non non corrupti corporis dolore sunt. Reprehenderit illo laborum. Nesciunt amet animi rerum quae impedit quae. Sint dicta eius debitis vero molestiae consequatur. Itaque veniam odio quos.',
                        name: 'dvdfn7iqjl4yr7k4vhrg43tcfef5b0vixdfrt7cu5r74hok4k9hoihqy0dfc5z8jw7ypt98tlx124qr4kgmai7b0ul0ox5xizk0e207fjp0ilmhmxktipoheaqn1sqlaosner3u8mx90rifg0uw32w5gzt1hmauri0inp3qughlrfrqfjwjntnq8rs2lxanqn0bvt1d62me2rzcp7ro28y3rzfvebcnjwntrpp12y5xthgxzz9f0gbcir2dx1bd',
                        isRevoked: false,
                        expiresAt: '2020-09-19 20:14:38',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateAccessToken).toHaveProperty('id', 'fc29f1fa-aaa2-4090-a71c-244539cc69bc');
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
                            id: '85a9ea30-804d-4543-bd28-fc8a72cd6116'
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
                            id: '68b8a401-923b-43c9-be91-63c250376975'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindAccessToken.id).toStrictEqual('68b8a401-923b-43c9-be91-63c250376975');
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
                    id: 'c3b25dd3-1394-45d4-99db-9237e4731335'
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
                    id: '68b8a401-923b-43c9-be91-63c250376975'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindAccessTokenById.id).toStrictEqual('68b8a401-923b-43c9-be91-63c250376975');
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
                        
                        id: '49627409-502f-417f-b803-776dbb71e1e6',
                        clientId: '53ec7d4d-dec2-4232-9259-74a944732d4e',
                        token: 'Et nihil dolores. Et natus eveniet dolorem dolor. Sit qui saepe voluptatem beatae et sed assumenda sapiente. Quia omnis fugiat asperiores minima nostrum harum minima delectus inventore.',
                        name: '4j128nes2nvdktyrk4e1yrhfekppkz1oocm22khjbupyv06yxtwtld4cxvw08r6yfxvdqm6xbqisdasqanwip0wlv00xl0msmgoadgremb47a4ujc1ergo4bczdiuvhhhbtj7xrp7501n0luba3ljt7gd24woae7vssizrx6shaorle4zocd5dc2nmprb78kc2fwwxhtcy9ypi680km8nfe1u0fuid3881m0m07tnvx3dcyt0lxh29xdonsiyvl',
                        isRevoked: false,
                        expiresAt: '2020-09-19 10:21:58',
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
                        
                        id: '68b8a401-923b-43c9-be91-63c250376975',
                        clientId: '215e45fb-6b16-4fbe-9deb-5ce1a73ca00c',
                        token: 'A vero quam illo. Non ut molestiae excepturi error accusantium. Maxime aut neque et ipsa occaecati harum nemo aut rem. Vitae voluptate maiores animi cumque. Libero quam voluptatem qui officia. Quisquam aut ut iusto minus eaque quod reprehenderit minus sed.',
                        name: 'n0ba4vdj9vpnx8fkbctddgxzzbnguz4m28hi2tshywe9tv1hyg00wi7xn2jq65cii8u4ixa86egvk5eyeyc4r7dia1v1flf8u4viua9aj5m6pmre2nb2f1hlaa4dmvsmrd4sns0d0aipt87aqr48lja3dfdxa0y47m2rb5x2nbt58jt4a20rzh50a3jwt6fucae2xrlz07bkcroz4r18rtc9jyo5m7dl29dct84sh604m680nad3zpwxa8lkmdx',
                        isRevoked: false,
                        expiresAt: '2020-09-19 23:51:13',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateAccessToken.id).toStrictEqual('68b8a401-923b-43c9-be91-63c250376975');
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
                    id: '22804dff-7b74-40f4-b415-4b82cde86e9b'
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
                    id: '68b8a401-923b-43c9-be91-63c250376975'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteAccessTokenById.id).toStrictEqual('68b8a401-923b-43c9-be91-63c250376975');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});