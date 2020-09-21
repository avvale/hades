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
                clientId: 'fb3168dd-ee1a-4480-9d24-a433d007eff0',
                token: 'Aliquam dignissimos id fuga repellat suscipit soluta nemo dolorum. Aspernatur magni tenetur laudantium recusandae ut. Vel odio eaque eveniet repellendus qui nesciunt vel iusto dignissimos.',
                name: 'ow7sgzjask0gn2v8h1owu34meyah3m4qb77k79xyndifb5wjfhi0u7693b2k6w2iekp0fv81ppwstp74pgvqaehga04rrhi64ilj8n9p781zdt70rvzx3rj517y1fiupbj1mj1s4abmjfdvkp1rmtkm291t3jfhvjdtel66v3ae83j7chci0bhfi0ny9090hw6jlgf4px3jmd4qfr7t0xy68swazck8ie0aet0nx2prkha7tquqqfsz53q0b8tt',
                isRevoked: false,
                expiresAt: 7635457234,
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
                
                clientId: 'fb3168dd-ee1a-4480-9d24-a433d007eff0',
                token: 'Dolores aut aut veritatis. Rerum esse sunt animi consequuntur eos asperiores. Et nam temporibus nulla rem praesentium soluta. Velit voluptatem sed enim autem quae voluptas aliquam. Quibusdam maiores excepturi voluptatum voluptas quod maiores omnis qui inventore.',
                name: '74wkucat1gr1mt011dl9csx5xtq73ngrzq9gtbid3gxdacpk5w7a2lktynptb3ocak5b8qijl00gy3q9ho62tjwcxddmk9y1fmls3z6zogvq0f7myjc3s8vw786du6xtrmhpd35ybrfd8mk33rhx9jj3a85v0gf98g2xpkihdo3ebtpzuez82lu33pel6i5dq5c1bchf5qtcyur1u88814ybsbfc2yil9phe9sjhmv5tdi4imllq4hmkxh2k6ne',
                isRevoked: true,
                expiresAt: 3892994388,
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
                id: '7a3f6bd4-7616-40cc-a7d6-ddd18657e0fe',
                clientId: null,
                token: 'Voluptatem optio doloribus praesentium sed. Veniam impedit voluptas illo tempore natus facilis ipsam. Illum expedita vel enim libero. Et vero deleniti aspernatur quasi. Esse quas amet minima.',
                name: 'gvz7b3gozqs3j6bly477x4ttyy43ywaf2p9kt3ukq12pv1f5cfobhd29if6lgp57u2n241ex2uy8w8po1kmfs09xwm35s2bxvb5r883j2m9a6w81lci38ev40alv7maajjt8i98kndabpqyv4lokcu5akndn7f3tyrjm81i2o1hqu8o3kjkbffbmqe5tc2he33opeknc51coif7as96rzvsrh2w7eztz3up2aair2uz4ienxpsx34rmn3xr5mag',
                isRevoked: false,
                expiresAt: 3364576114,
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
                id: '7a3f6bd4-7616-40cc-a7d6-ddd18657e0fe',
                
                token: 'Laborum dignissimos ratione reprehenderit at quis aperiam dignissimos. Eius sit similique enim est dicta asperiores rerum. Quia id et. Quas velit est sint similique maiores pariatur quia.',
                name: 's40t3ut9iaepqd9adzq0txn7ouvt957wcr9htu5gxbll89t9t1j3r3hqnq6o1xbvgoj3cnt3k1tvrnbxgsadwlgoo1onn05351s70xxrkfzfhzbg1qiuiqyjd1cyfiu84fncpozin2d83dix4ejghjjveoqpqawozfs7ndtq3hc9tltakzg9co5dw9h2d1vg8227fd7hng373zd41sfd18lv7km05p51k8i8dd7gy706zu4s6gc3bcjjfjx40p1',
                isRevoked: false,
                expiresAt: 7022639340,
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
                id: '7a3f6bd4-7616-40cc-a7d6-ddd18657e0fe',
                clientId: 'fb3168dd-ee1a-4480-9d24-a433d007eff0',
                token: null,
                name: 'aa2wdhrqhwqjofvjdmedzxl0k7a31lar6lhsxwphkxoz51gqrfsellh5zu8fvs0m1rd1zps01jzyra5qvd0ldkptymiix06a24rkc58072kg37tcr9wkyy0874op8pczl1k90p0uqjqykxbiyqzvsff68b0cyb1sg35bgtuy40808j0f9dqlk7ee7xlx8n313cohurn5i0dk7axpcoorywkwq5x84fu39vjak9xw41s278wvinmwjdw8tnf9pzr',
                isRevoked: true,
                expiresAt: 8967666074,
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
                id: '7a3f6bd4-7616-40cc-a7d6-ddd18657e0fe',
                clientId: 'fb3168dd-ee1a-4480-9d24-a433d007eff0',
                
                name: 'izzxc2lqb8d2aagm5guixjofs5v7z4nh245n68mth45kzv91js5p2bftd9826vlmmdlbfzzusxa6sgqcueze434rblzrq946c3h7h2amrphc5z1rql39y7agyicuevjh1vfbra9d0fpilighfafg4lolzw0io0ti79b3o0fp3gg5qpaext8t26a19nwgh1crj8fppnkbddoxayikexhtjyxljapn4jyqt8b28xkwbqejevuygwybgr1za3x8a8h',
                isRevoked: false,
                expiresAt: 4571729488,
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
                id: '7a3f6bd4-7616-40cc-a7d6-ddd18657e0fe',
                clientId: 'fb3168dd-ee1a-4480-9d24-a433d007eff0',
                token: 'Porro architecto deleniti. Accusantium vel ad enim quia laborum alias illo dolorem quo. Aut provident dolores numquam numquam repudiandae. Odit enim sit voluptatibus impedit dolor sint. Dolor voluptas ducimus maiores sequi voluptatem accusamus. Iste eligendi velit repellendus.',
                name: 's1qzdh8x3un44k19gtqidnnmnmjm2nbd5zis7n414gvp5huo37hlpop5vohecka14z2b5p8tun1429yv5te52r6jrqjf091i2y6riqh6lapolky312sf47o5gjnm3l9tnhafsm08knku7k41rlziqezfakf1zh150lc41wlz6ozkcrrxqj5hwfl2zlhy2ovwdrl27q3pzquqlddmz0emixgfk4xbews5fon4ta3xx5eug1wejz48c4ixqeltr9t',
                isRevoked: null,
                expiresAt: 1423063265,
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
                id: '7a3f6bd4-7616-40cc-a7d6-ddd18657e0fe',
                clientId: 'fb3168dd-ee1a-4480-9d24-a433d007eff0',
                token: 'Repudiandae pariatur beatae natus et numquam voluptatem dignissimos. Illo porro distinctio esse vel ut odit. Voluptatem tempora pariatur.',
                name: 'y829v19hlg3ei862x96yljduompaqjjrsvqshgfwqricmulpd40nggi79td8ve4bo9tiptmxn5ethmyy24v35irz692u1mcq8me0hj6cla0ai6n7d683dpcck71ux9yktobsmdtwwo9l27grq7a4hggyzhm7nfkawg1ml3knealfaligrnzwoe2qmqnqs0isfgi8gwioawlughfp6wjgzyv9ddpsmjuf8mlp9xv26jvwai2ja7akuedul5cywwq',
                
                expiresAt: 9945399444,
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
                id: 'cd9m9fcxf8wt95vt3l62bjvlnf52fdye2g8ud',
                clientId: 'fb3168dd-ee1a-4480-9d24-a433d007eff0',
                token: 'Sit qui id. Quia fugiat blanditiis est eius sint animi laudantium quia ab. Impedit adipisci ad cum et illum. Ducimus soluta blanditiis dolor sint ex eos ullam.',
                name: 'ngc24bkamyywt0uwke0j9vdng3c9243qa6e0glk4zrkrtyzsb5omx2rkxy5bf2u55xurtcnb74sz7q4338c8ljapecgxv4jey1ch7dqpma4mp4gxj8ulasap6bpcp1n2xu5a1geaefqmy6a72st6wb8l9aeyjvf81gpoptzhmr90tijw6trv3ap56njnc12oh55jua3aykvbd6aliw6bmruheng6sq5qu78un9rxh5060482j81qrqpd1kh128v',
                isRevoked: true,
                expiresAt: 7015278952,
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
                id: '7a3f6bd4-7616-40cc-a7d6-ddd18657e0fe',
                clientId: 'duo6axncca8y0tf720c10vedcmrwoa91pq2ux',
                token: 'Cumque nulla rerum porro eum. Quas ducimus aut voluptatem id quia eius. Modi qui dolore doloremque asperiores nam quia quis delectus. Libero vero culpa voluptas recusandae. Et doloremque beatae occaecati.',
                name: '0ffvlpsrw8wb50n3jbu2ggqryb5r3tmd3lfm1rxa0zfly21wi3odfg0yd81k4y7j0jd2xuy5ylj18zjzp9rkumbl7cx4qpabvg56kkv0jf3431rh4czcmrdkw3h1259n6zb0p6eh72oyvjhlosk8w3yn000yt86awp95s8zze3vb171clnyppsi4ili23wotpncpobdmfpwrglw9kdik5lkfupgd7rsy0is3qrldwqjwgo0qpwet0d5q7xu8r8r',
                isRevoked: true,
                expiresAt: 8199611830,
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
                id: '7a3f6bd4-7616-40cc-a7d6-ddd18657e0fe',
                clientId: 'fb3168dd-ee1a-4480-9d24-a433d007eff0',
                token: 'Ratione molestiae eveniet commodi rerum saepe repudiandae sed. Explicabo quasi repudiandae et tempora. Omnis sint est. Impedit itaque inventore consectetur doloremque.',
                name: 'lhbtkwvzg50glbcn4nhxwo9f4anao0rh17swmrqgs4x9pud7rj9c1bywlkrz32hfsnh6jw5l6x7hym8oomdga1sn9hmtbc7uuz5ui8cnkh2nautv6773oxy5mnf124lu0s72bf8dwvj2pr4mqrr658rw010hlgkbz6x1xknqjpra0ziq4unnlyguhbqu3fsbhxklse85s9xbaf5ije36j085zesvgxydph4u0qtouhjkrcu33k7ugy0yech9i2sr',
                isRevoked: true,
                expiresAt: 3870625843,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenExpiresAt is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                id: '7a3f6bd4-7616-40cc-a7d6-ddd18657e0fe',
                clientId: 'fb3168dd-ee1a-4480-9d24-a433d007eff0',
                token: 'At sunt ratione. Voluptatem dolore harum et maxime. Aliquid quis sint non odio. Ex repudiandae incidunt ipsa maxime qui et ut. Amet quia aliquam amet.',
                name: 'ydl7ajexnspxm4g45th7gg5tvk4a49j8b7f4sma2kmnv289i7iwlupdkfczsdbfpn6eg4ri13i9ap2lah10dpnrw4ndh0obwf84zyh051ochxs77f8b7xjrqigcfa13j0eww1s2q9bb0mqesb0ciesysjbfl5etnvbytqh6o8lvxe0o026x80neurqzvqu4u5j1kp2lq2gwqywgaa64s4fqfdbjkbu8djzzry72lnmk6b2so1rwjehv0jcjn2ei',
                isRevoked: false,
                expiresAt: 83598187779,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenExpiresAt is too large, has a maximum length of 10');
            });
    });
    

    

    
    
    
    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenExpiresAt must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                id: '7a3f6bd4-7616-40cc-a7d6-ddd18657e0fe',
                clientId: 'fb3168dd-ee1a-4480-9d24-a433d007eff0',
                token: 'Est quos rerum. Quia quia nisi ab libero. Sed nihil ipsam veritatis et fugiat et quam et molestiae. Non natus nostrum perferendis dolore veniam in maiores ex ad. Et amet minima fuga sed in consectetur.',
                name: 'pp1bt7ssdmv8a6esf7zhxgfhop2yzpjq9w3fojzs3p1x2564kw3vqmnie3dn75d6k16si1la0y46yl99mmbxgs1cwha4sitegs7bhdqqbcr9hu4ufcmvermromoilv4zmv98rqvvdmlxina8ji6b8bmlqx803jn9z8m23l11tcyd0rs69nc6023c04f2j256fnymamx9ah5f2ql9qr0wg5gc4eprwnlkdxlinarzhktar2ke27659gpuy0te1g1',
                isRevoked: false,
                expiresAt: -9,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for AccessTokenExpiresAt must have a positive sign, this field does not accept negative values');
            });
    });
    

    
    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenIsRevoked has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                id: '7a3f6bd4-7616-40cc-a7d6-ddd18657e0fe',
                clientId: 'fb3168dd-ee1a-4480-9d24-a433d007eff0',
                token: 'Ratione sed voluptatem cumque est et fugiat quia. Sit porro tempora alias. Dolorum quod id sed temporibus ut. Voluptatibus vel repellendus id.',
                name: 'n7xqtph5bf3ck4ix4wgvybxbokm0eqqcy2fkwhlz4sn5ty3j3catfr1os34x9bhddtq1ajg7saxcbt4epv0dy7lkecnzpo0d7xcj2kyjz6hgk4bju80mwoswcugqsdb4nq5um8gq8z73tz0tbdciubt1q2zyw2jl76zei9kykyi32nflb7llt8fibi5ns0agvwebyre0boagh2i994x6lipgvdmmsqepa6bn2f18nxp01ovzhvqulegl31wikpx',
                isRevoked: 'true',
                expiresAt: 6487249376,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenIsRevoked has to be a boolean value');
            });
    });
    

    

    

    test(`/REST:POST o-auth/access-token`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                id: '7a3f6bd4-7616-40cc-a7d6-ddd18657e0fe',
                clientId: 'fb3168dd-ee1a-4480-9d24-a433d007eff0',
                token: 'Vel aut in officia explicabo. Sunt voluptatum sed aperiam optio officiis omnis aut commodi harum. Eum dolorem sed quas. Perspiciatis est commodi non quo dolor inventore harum reiciendis. Mollitia temporibus expedita deleniti itaque provident omnis aspernatur minima. Dolorem accusantium quia.',
                name: 'ddh3kk3vd51uxrgia52eb50pnr3oflr9jxhzvatugbwps7lm0j5ssu2fbh0mb3h2s4ckdft9ixqwk2e9w8n99be5hnb5mfnnp719khyp4ccb4ph9oybkdamd6svy5ucseck38j1rz40e65qsl2ldt0x1vkuueqrsy6paezl8mn3x2lbvqe7ph0kcbkwvtf7vyi29emp9tvqg5xh97ou5v36k5ertn9a6m752oy1noyl0xema3hf3hv04y9k3o2u',
                isRevoked: false,
                expiresAt: 4303119014,
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
                        id: '18d2b3f8-7db7-4af5-bf8d-3de2fcd9cc69'
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
                        id: '7a3f6bd4-7616-40cc-a7d6-ddd18657e0fe'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '7a3f6bd4-7616-40cc-a7d6-ddd18657e0fe'));
    });

    test(`/REST:GET o-auth/access-token/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/4978ed9e-432d-4848-b0de-6f9fced230f2')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/access-token/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/7a3f6bd4-7616-40cc-a7d6-ddd18657e0fe')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '7a3f6bd4-7616-40cc-a7d6-ddd18657e0fe'));
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
                
                id: '1ca1f815-c8ea-4df5-b6b0-e68516636553',
                clientId: '09317fdd-a3d9-4617-9060-522b222b1a43',
                token: 'Voluptatem quas voluptatem numquam delectus cupiditate sit veniam dolores sed. Quos quis error ut nulla fugiat architecto suscipit. Est voluptatem minima expedita rerum officiis voluptatibus dicta velit. Quis ut eius id assumenda maxime ut id. Omnis quia rerum aliquam incidunt suscipit adipisci.',
                name: 'text2mczdjqe2y59c6t7w4chxn16wf2zbc9wteewu3mvw5855b9q95v87bebhhgzoz7ja9r9x3rejnvmuoz6c9t95mnfqz2ujt3hrjqf72jsyd484dkzfyky6d5uhysf3asfg4g0pebglv8cd6y8yyn42i73q52t1ge5lxrnc6irx2nph7zb3kcs3de0li6k73315zzsx0udls5zso4btq35rr38iakxgkvsdnyq5mg8ivajas8y46w0ojyvp53',
                isRevoked: false,
                expiresAt: 3441062886,
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/access-token`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                
                id: '7a3f6bd4-7616-40cc-a7d6-ddd18657e0fe',
                clientId: 'fb3168dd-ee1a-4480-9d24-a433d007eff0',
                token: 'Suscipit vel natus tempora iste. Dicta placeat eveniet. Itaque non laboriosam voluptatibus officiis magni suscipit. Tempore voluptatem consequatur. Quo nostrum qui laboriosam magni. Consequatur nobis vel ipsam est aut officia ipsum.',
                name: 'gpwb4xipg6rvr7cekgnlsmjzcayy92zw8ajlcjyn3a8y7k3h0x3kcyb8gru5of4chtggzoa61wucsdmzfcn6zp302t6mwqcm06k00vhd5r373jmx4irjixo6tt1zziq0p5llu7o83oy1yxqxppbggwmp0cacfevbb027edf0kxbih5mubxns92tkiz02z5mnjgqs92pw2x5vdoi20dxponup3w64do9ttfxwxtod1agow521vmkzxtbgapmsn2j',
                isRevoked: false,
                expiresAt: 7279130336,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '7a3f6bd4-7616-40cc-a7d6-ddd18657e0fe'));
    });

    test(`/REST:DELETE o-auth/access-token/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/58874fb8-f106-4306-ad41-8cae2c8fd571')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/access-token/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/7a3f6bd4-7616-40cc-a7d6-ddd18657e0fe')
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
                        id: '0b5009e4-f458-473e-a687-aaa5c008b15c',
                        clientId: 'fb3168dd-ee1a-4480-9d24-a433d007eff0',
                        token: 'Explicabo et enim iure architecto doloribus sunt vel dolore. Et minima dolorum. Eveniet ut aliquid et accusantium nihil blanditiis hic voluptatem.',
                        name: '5koahzf9fynbuj0geglccfakdf54h2nr1mv0tdipcwqr7izzww4bmtwq06aa4ijqh0u8dm84mjo5z48t2jvf4ysj6p9tfkjwa7jxhypf1bynt932j4idvstybcdinwsng1nhv81evml8u06cvsmi57or3ge6hxmy4xpbrceolm0td5lboi7xtksjz87wiyghe59t700aft1lwv70sl3rxrd8up5g4y1scqrime0uevcl4qx2vymkuj74rk93i0t',
                        isRevoked: false,
                        expiresAt: 1955773988,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateAccessToken).toHaveProperty('id', '0b5009e4-f458-473e-a687-aaa5c008b15c');
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
                            id: 'e61c8fef-e991-4f1b-8c7a-723e8cb5efb7'
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
                            id: '7a3f6bd4-7616-40cc-a7d6-ddd18657e0fe'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindAccessToken.id).toStrictEqual('7a3f6bd4-7616-40cc-a7d6-ddd18657e0fe');
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
                    id: '285229fe-f239-435a-b112-7c3159f9d5e9'
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
                    id: '7a3f6bd4-7616-40cc-a7d6-ddd18657e0fe'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindAccessTokenById.id).toStrictEqual('7a3f6bd4-7616-40cc-a7d6-ddd18657e0fe');
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
                        
                        id: 'ee014e4a-7391-4d2b-90a6-f83416a71d18',
                        clientId: '1d0c88c1-59ee-42e8-8775-9fc0970af0d1',
                        token: 'Nemo quaerat enim. Nihil accusantium laudantium eos eos ratione beatae sit eveniet. Autem omnis perferendis.',
                        name: 'uvg53apgmp3s942ni8hjdik9ivwca8lpbwab1rkn81yt6q07xi0r7h8uon5mphz2hscnqtyo7z3di4pymbslozlgz3gsu2gkb6t5b4tk2zc2dffhfxgi9fzucw1qcil8nd7sz2xc2lkt095qway93wh0uqbd6hmbnr15k7bhjw3barcuszs5edckxvymjourl0f09t2ghjs2drs7at2aerhs3t34wfsqbyqg1rcgkzfn669086br5v0aoqdbf50',
                        isRevoked: false,
                        expiresAt: 2375650884,
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
                        
                        id: '7a3f6bd4-7616-40cc-a7d6-ddd18657e0fe',
                        clientId: 'fb3168dd-ee1a-4480-9d24-a433d007eff0',
                        token: 'Veritatis doloremque reprehenderit sed sunt eos vitae deserunt. Molestiae minima sequi nostrum neque qui ex. Eaque aspernatur iste laudantium esse. Veniam eum qui repellendus voluptatum ipsam.',
                        name: 'kw2qltxqzlynyoyghm6lnlnkqszk2nr9z304kyn3z02ugwqoxuyuw84g3cvyjfzel1q56wlkyk36peecthp9e95zk191t33chqknv0awo7mqiqa2cyhf4icfszfnlhaw51kqtgdpqkmiazpn10p28lk9jpbx3gx02wp1qvmax94dg9kdunh1myqukoxusvx4wawbyr17f4rjsn5p6wv6y2a5lmi2jq0dp957w9ux3x10juy83fbcoxa5recikv4',
                        isRevoked: false,
                        expiresAt: 4584853191,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateAccessToken.id).toStrictEqual('7a3f6bd4-7616-40cc-a7d6-ddd18657e0fe');
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
                    id: '2c97c6f8-f646-4b01-bc6e-0be362ea47d4'
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
                    id: '7a3f6bd4-7616-40cc-a7d6-ddd18657e0fe'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteAccessTokenById.id).toStrictEqual('7a3f6bd4-7616-40cc-a7d6-ddd18657e0fe');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});