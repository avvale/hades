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
                clientId: '627a36ef-faf1-4221-9c39-940293e6ab79',
                token: 'Voluptatem voluptas hic aut consequatur hic modi. Recusandae aspernatur sapiente explicabo quam quae architecto et. Molestiae hic ratione adipisci natus quis sit.',
                name: 'd9ledlu7d2qm8tgb4w1s26u4pqn5916ew11f3j5gmprvu3dc21wopw80yah40lya67gi5mqmu5orzufoqparld9kum8mc8ha1t343hbhw5li38ifi447jjtlhfn7jb4b9p8qi80nyxjcpirhe063575fwkylkky92ifg6jeogcgi698c6p4y5ue10pmmkjkhgi9gfw0ru3s9tdg7qaepyj8pej3l9q64qrbqqdpml5cttot3o4eq73u0u103df2',
                isRevoked: true,
                expiresAt: '2020-09-20 08:35:55',
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
                
                clientId: '627a36ef-faf1-4221-9c39-940293e6ab79',
                token: 'Ut error dicta neque omnis non aut nemo rerum sint. Tempora dolore quia magni doloribus id. Recusandae quidem ratione eum cumque consequuntur minima aspernatur. Dolore velit dolore. Ex ducimus a deserunt eum aspernatur sit quas eveniet.',
                name: 'wvr1jpvpf1hdna1dpsw2bbd9c24pam5701ys1ob2o5hao7d861cv6qy36gp5zy3iwhgifz8oqfeg7x2fz4zxnr0w2orrmw3w6cu8n77d2y0e7zgxcktomhyjhawoq0xwoffoz1fuck4o77lg81k74ybiu677ycmbq9u2vfwkwwnkh5m7vf11o64vqpl94lgw72bkwfx0c4n04w4bxbuwvbzom5hir7h6iv4a9lntjrfz98m5p2bj8uw5ks4sk9p',
                isRevoked: true,
                expiresAt: '2020-09-19 21:46:37',
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
                id: '56b7a133-4e47-4b8e-90c7-5e0b10355ec5',
                clientId: null,
                token: 'Aspernatur fuga et voluptatem atque minima ut. Aut sit qui natus. Ea sunt iure porro. Voluptas ipsum quidem sequi ipsum recusandae quasi tempore.',
                name: '1nhsc3uokmjpwsjg41rmjosf1g3onykg21vjbe2fmyuslthnxtytmazf87ggsc17jlcq0w0jr84tkecbeq9patcai9qba6hi5qx98iuyfy6sm07c6wwnpvyti93q9rod0mj5x889l84ayic8wa95q165pb4bniglw0ndo05oj3ck0ynmu0xpleyuqqlcz0cb2g3nl328smt765rhiwhfoy82zp7xp5hrg77icy4uyf4uzi81f7idj722tin7brp',
                isRevoked: true,
                expiresAt: '2020-09-19 19:49:12',
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
                id: '56b7a133-4e47-4b8e-90c7-5e0b10355ec5',
                
                token: 'Non accusantium distinctio necessitatibus quos. Eum molestiae est ea non neque exercitationem. Aut facere et et aspernatur tempore quasi nam odit.',
                name: 'qiik7ti613xnqpyvbyzl16djob2gm1h7abp1lkm4521qxiasrxka6qs5chw1v129g700fo3cpirleqbk96na6dprt1zonbgoojg979nbc6jfy0zz5tts0h7aoamsz2g5qonek8srktmswxlf4k1yagxjnf5n3h9f6oxe3vzki8hmz4zenjn0hwx6dvaz380o63s2nmh4j799dil3vswpxksn8j86wds54rgc1f3wuo7cediv1hs4a2e8f34itbg',
                isRevoked: true,
                expiresAt: '2020-09-20 07:53:38',
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
                id: '56b7a133-4e47-4b8e-90c7-5e0b10355ec5',
                clientId: '627a36ef-faf1-4221-9c39-940293e6ab79',
                token: null,
                name: 'ib2yqdtqfq4if9c2mtip7f0dekx3yja5ae3eq5rfbyb4gluza7rrqlv56ocdm44svzrkvx4ph59kez3c049oa0nni0ijifll4xowdam5h3o2f1p1hw4nwypg8udp2w5zdmg88ai8fw495uxw6pydmq9ggq4q5wg4ygd6eutydtx1bht1yv19zp1yxftqr5mh8l8znphf4jrocb0tnbse6zscxx4mkmmgu4ywpvle6csjxrfija9gkmwxuiq9yer',
                isRevoked: false,
                expiresAt: '2020-09-20 08:00:02',
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
                id: '56b7a133-4e47-4b8e-90c7-5e0b10355ec5',
                clientId: '627a36ef-faf1-4221-9c39-940293e6ab79',
                
                name: '3vpx94s90dnt6v8qrl756kyw3aybzer3wgtnied2kmar09ng3n3y6e92ukz8cl8vc5pae0vokyarnnm9bwpqa6jr0xi6o60p2fcf25qh89i9j87ekp5hjs0w0z1ny8v9r3efh6wm4cw6xo15dbgql7l7y3lt5rov9il1e6mppaelu0d6q203taobheff7dkvh3pd8shizdu88e8fx0wdo02akcmatarw5m7cjsd7tqzhl2avyaq0ribh07t2dts',
                isRevoked: false,
                expiresAt: '2020-09-20 05:43:20',
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
                id: '56b7a133-4e47-4b8e-90c7-5e0b10355ec5',
                clientId: '627a36ef-faf1-4221-9c39-940293e6ab79',
                token: 'Itaque sapiente nemo odit sed officia omnis. Velit aspernatur ex dolore fugiat aut velit velit maiores beatae. Delectus recusandae quasi quos aut et a quibusdam sed voluptas. Tempora laboriosam aspernatur nulla illum repellendus ipsa voluptatem maiores.',
                name: 'c8n3et0z9oysrn4dmyxr8s8j8vhss9nzr88bwyla5ca0jnqkpsw37ymmy5q4jnc04c7pre4cf29cxi6g1d7uhfb7boxy9lq5ckwkc28b78dgxb4e5naev2c7t0h4qvl8vb4f91mf8p77ha744zw1qtlems5ol58iw0bq1tpn8sc1u3uj1dxoxptfa1g0xqvtfph29s7p2ta97n0ytqclmhyo8yjlru9keh5vm09zmvec4s8zn1n7xmqaq0ycz2l',
                isRevoked: null,
                expiresAt: '2020-09-20 05:55:39',
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
                id: '56b7a133-4e47-4b8e-90c7-5e0b10355ec5',
                clientId: '627a36ef-faf1-4221-9c39-940293e6ab79',
                token: 'Tempore quo et excepturi recusandae aut vitae nobis beatae natus. Et ipsa aperiam omnis. Est est architecto quis. Cumque aspernatur dolor id accusantium velit culpa aliquam a. A minus sint dicta tempore ea non eligendi ipsam vitae. Aut veniam tempore quod consequatur vel facilis soluta soluta vel.',
                name: 'eapgcxys8gz7riav76p6j7s7ol9xti1v4ddgbm3vgomem4yl5eiz4eqx45awup4hrx6d42ajaeh47wvrrar3p4pzd02rctyw9f5kjw78iedd5mp309jbone1pptbjqkfkka857h67yy7m2xhargvihxt0iq24irexwe82s389b9truzvbb0i87e7fiijxl39a8jw5kym6l4wxvf7x7f9alfofwq9d32i1ctmngd1pz8oznbnbvcq641nprm1hy0',
                
                expiresAt: '2020-09-20 07:06:40',
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
                id: '521tdolhmjuygpy1gmmqmu6ydvb6aanfs9xmi',
                clientId: '627a36ef-faf1-4221-9c39-940293e6ab79',
                token: 'Vero ut qui omnis illo sed. Dicta maiores ipsa sequi porro officiis doloremque. Magni sit sed aut adipisci deserunt.',
                name: '5egq0jwfdl3oa1gglzuossktc7ruocs1ohvb7jhnt9h5j19iocibcumu665y6pzh6j8astajhxdnij4r0onklt6xjczetv1d17eu3wfx1xji6do2vk17thtawt0z7gujkjy5uee74tkx590kjt905zxrex0msm8jnglelxbsftjaseth9rkl1nrbc85n0v6aebs4fgik8ojib2viut22jqwpzw0yjt5iv2wqa5qag5c7w3czyh52ecjvhkn03xv',
                isRevoked: true,
                expiresAt: '2020-09-19 18:35:03',
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
                id: '56b7a133-4e47-4b8e-90c7-5e0b10355ec5',
                clientId: 'ubvq0ilhfz7c3xjxvh7nasqz26wfkcma6yw7t',
                token: 'Dolore sunt iure quis non. Ab cumque nostrum fugiat velit itaque ut. Eos labore in rerum non minus ut. Molestiae itaque quos laudantium consequatur ipsum est iusto earum et. Quia reiciendis ut.',
                name: 'd2gr7odswatu5odlj11i7bbgfvp4ed8p84xfpsf8ttg8cdrlb7favw8mgxw0h9ibnxlg4k622l1qf6xsbzb32uujvbdw998ip388wogy2mnjco2q2miqfolk54jtxghrc0uy6lozogv9v7zp6hekq4d1lwxa3cxqmjuhs1vu7ddjb6itcpfe3b7qzk78gdfgk11ufv4gakbk3qesrjxymhwe60629g37mozj3orz7rlqo94rlhamcay9ad3uumb',
                isRevoked: true,
                expiresAt: '2020-09-20 16:42:02',
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
                id: '56b7a133-4e47-4b8e-90c7-5e0b10355ec5',
                clientId: '627a36ef-faf1-4221-9c39-940293e6ab79',
                token: 'Voluptatem ea laboriosam quasi sed earum deleniti qui omnis. Explicabo veritatis laboriosam sit. Qui asperiores ipsa pariatur dolorem quod pariatur alias deserunt repellat. Eius delectus qui et libero asperiores et. Aut unde iure et. Quis placeat vitae dicta laboriosam sit officiis minima.',
                name: '4ij085zrz4v6jzej57iedp913xctrxd1k5zff280gzfuufxr0jvhrd0j1ai77x0ydtd8bgkt1d6e2i00r007p3tqypf1ly92rqruu7of63skhw9z2ci0fw4c77cq9q3ultwfuimwut4jlbc2h5x38e99vs3bfb3bf4ohhf72imq8ag6qw07zlxfkx8kdf30apcp5wc8cpqdr64rck50n2jcgre30sf26yn7ll3bawkxfqgidayfzy3prfh2qxm7w',
                isRevoked: true,
                expiresAt: '2020-09-19 19:29:37',
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
                id: '56b7a133-4e47-4b8e-90c7-5e0b10355ec5',
                clientId: '627a36ef-faf1-4221-9c39-940293e6ab79',
                token: 'Blanditiis in voluptas optio optio cupiditate. Totam cum ab earum aut aut necessitatibus. Aliquam id atque non corrupti incidunt tempora corporis nobis. Ad saepe quo dolorum nemo. Deserunt voluptatem quam omnis. In enim culpa quia ipsum voluptatem molestias nihil.',
                name: 'zjl4mjvfqn2a87wupr4ta9z7ljtypk45mt0vwd67y30d18ll142evog1s4pkstz5i177xr3d08aigjyn9xdxp4rarsom5xcv68lqlwx0aqzjlp1a1yv15jrpm5dqymwaq233479pkonwewildnoclmcwityoi7p8jz8a8wy56nfwkozvx9597ikqw67ltt9c5v9o62xjo37pmqyo7zy87m1pkx5zl3hpts84ag39hi24yjucub4klecmeehcopc',
                isRevoked: 'true',
                expiresAt: '2020-09-20 13:14:00',
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
                id: '56b7a133-4e47-4b8e-90c7-5e0b10355ec5',
                clientId: '627a36ef-faf1-4221-9c39-940293e6ab79',
                token: 'Eveniet rerum repellat expedita quas ex et. Et ipsum vero vitae facere et dicta et ut. Quis ut corporis velit voluptatem. Omnis est tenetur molestiae eos ipsum ut illo quidem. Sit quod ullam reprehenderit. Nisi totam atque quaerat magnam est distinctio quia.',
                name: 'oshoeh27bhn1k37ps6eg5akicnfql1m0lm4df37ipl70ppv7yfv97c2rli6qcnubglt0ov16bbf3tx4qhyoilcsi18ebwum10as1hon1gyknok2a8wdaq6mxsg37rc3wpwfp2ipmjc25ntcavm7vijv0s1haijv7lc0jlq0jbedf452cilj1wnz583fz8lpypny5150vgdbhirk4n2sin895lpgmopi0dzlms4u20xpmngo7adz0qj630nmd7gm',
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
                id: '56b7a133-4e47-4b8e-90c7-5e0b10355ec5',
                clientId: '627a36ef-faf1-4221-9c39-940293e6ab79',
                token: 'Quia quisquam beatae et. Ut sit nesciunt. Impedit est dolorum maiores necessitatibus quia. Et consequatur saepe modi. Et sint eligendi temporibus nulla ut itaque quo.',
                name: 'g524j3sbow030i5cmyhz9q1h33mh5araxi5m50f6wbyuetcmdnswxa4br5aibjdmzn21y1vvhxa0q9ekm3y3iohwgs2d15gbtbjgzkem43i1zyxhcpaxkx4jkc1d7zf246breeua7vk1jl74hyz02jztzry08xaw91g8aib4ew8y8r9b7xt8xv0t8yq4fnnwzijtvjtfhyreel034dlmz2tel3sloso4zx6d16yus3pnn74229e6z1qu6cg6ics',
                isRevoked: false,
                expiresAt: '2020-09-19 17:53:43',
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
                        id: '2009b2d2-8c9e-4d53-9651-6b3cf8581404'
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
                        id: '56b7a133-4e47-4b8e-90c7-5e0b10355ec5'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '56b7a133-4e47-4b8e-90c7-5e0b10355ec5'));
    });

    test(`/REST:GET o-auth/access-token/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/0a8112a1-2a4a-42d7-b60c-928acb0d8957')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/access-token/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/56b7a133-4e47-4b8e-90c7-5e0b10355ec5')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '56b7a133-4e47-4b8e-90c7-5e0b10355ec5'));
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
                
                id: 'e4b18028-cd31-4f19-b4dc-c06afc172195',
                clientId: '41faea99-9dc2-4507-a5c9-7827b0913335',
                token: 'Et in nam pariatur sit enim earum. Quisquam cum eaque quia non ut quasi dolorum itaque. Qui culpa qui odio rerum qui explicabo numquam. Est doloremque aut numquam quis id sunt omnis qui. Adipisci enim ex maiores architecto aut molestiae soluta molestiae ad.',
                name: 'qoock0hfqdxkp5d3kgoj2wln15gwkuyzarklc7r16bd0q0qpy6in3eu95qmb6wws2jlvlfamz9k9nu71nnslceupv8rpz4dyfzyeon8t4c719kegkxcuk0afihe05tkvw3ivo10la8q5492mdjd0j952n936kawjut8fcp2uupkd3y8pk1wqg5uxl29cxh3zzamtg4jlk11re8y9zys65h2vfqxjas40f00cbl3of8mteurc3ckhfwa46ui952e',
                isRevoked: true,
                expiresAt: '2020-09-20 09:29:20',
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/access-token`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                
                id: '56b7a133-4e47-4b8e-90c7-5e0b10355ec5',
                clientId: '627a36ef-faf1-4221-9c39-940293e6ab79',
                token: 'Quos ut qui earum aspernatur placeat odio ut molestiae dolores. Dolores blanditiis quasi est est officiis. Est sed assumenda ut excepturi aut repudiandae sed delectus. Enim cupiditate quae. Officiis ad eligendi.',
                name: 'adj4q0zgh4ukprh0jaqyc74xflrsqi51chouslcqpm0xp7dacexayrugavvmx5obzvh2b4fsfenccnrkkhpliapy6y22j6u9f0f4bb6fjczxt8ed3a37b5wdy32hlw4arbj418upp0nzavqu6vefkwvph2mm1al28w1wmxucyll3ryx4isbt9ze1g134s2k5utjstze1akft1kz0l7iasj5mu1p17cdaa4oaceghydjsgyvlaryu6fiulu8kph9',
                isRevoked: true,
                expiresAt: '2020-09-19 23:05:58',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '56b7a133-4e47-4b8e-90c7-5e0b10355ec5'));
    });

    test(`/REST:DELETE o-auth/access-token/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/570781be-01ff-4919-8e7d-6168a32ce124')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/access-token/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/56b7a133-4e47-4b8e-90c7-5e0b10355ec5')
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
                        id: '9113b006-75dd-487a-826b-fa4779cd75f1',
                        clientId: '627a36ef-faf1-4221-9c39-940293e6ab79',
                        token: 'Minus debitis commodi nam asperiores. Aut est atque ex ut aut earum mollitia. Sunt nulla eos laborum sint repellat. Odit quis sint sit et praesentium voluptatem qui autem non.',
                        name: 'uoo3sxm70m9tokb1gklwl3e8o3ia7gqdhpeffglxgkjh6o8lhyg7i3qtetkhd10l5e0jxnf0pmjgz86vjfe98puiugjjh65okgm2xdjv3zx7y7huuqrdaj14x0yrt4d0bn9oox5nvzvm4oj7n5nwx6gjup42iajuqrl9td5hgos4i4lb4jhbx2yabavvb6vxpup5ori5wah5jk8j6znxua70o5wn0zlmlelotmej6mr2h66296ly52fwro5wun5',
                        isRevoked: true,
                        expiresAt: '2020-09-20 10:31:14',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateAccessToken).toHaveProperty('id', '9113b006-75dd-487a-826b-fa4779cd75f1');
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
                            id: '0d935e8c-b4af-4f62-aee6-d98f6e8b6ae6'
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
                            id: '56b7a133-4e47-4b8e-90c7-5e0b10355ec5'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindAccessToken.id).toStrictEqual('56b7a133-4e47-4b8e-90c7-5e0b10355ec5');
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
                    id: '41fb664c-1eb7-400c-ad95-4b128bcb6a6e'
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
                    id: '56b7a133-4e47-4b8e-90c7-5e0b10355ec5'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindAccessTokenById.id).toStrictEqual('56b7a133-4e47-4b8e-90c7-5e0b10355ec5');
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
                        
                        id: '98113179-1ea2-4940-aeef-adb36a96a891',
                        clientId: '0f69f864-ab9f-4d97-9548-260d709976c8',
                        token: 'Et saepe doloremque et optio velit voluptates rerum. Consequatur in ab earum corporis nihil cumque consequatur in. Earum officiis sit illum temporibus.',
                        name: 'sgl4s2aywxt9fwbbvs7knt2msrd9mf1gdaccntg1q7kuwd3m6lx759u512m0qx0fff8j6slk3fa02wzzt47y7n82wf3e1nvv93xyymwbg3zybmq0juyt3amezipih4xg0g3ds6qqoqayvdokiz0s47vgipet9qvubadvpo9kijfub8ksb9nyvno8rfmqt6p02tyk2tger6pmf69askdi3mkg79db3joe3lyd1rx8342apzwxag5uv83u4gefwwa',
                        isRevoked: false,
                        expiresAt: '2020-09-19 21:44:35',
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
                        
                        id: '56b7a133-4e47-4b8e-90c7-5e0b10355ec5',
                        clientId: '627a36ef-faf1-4221-9c39-940293e6ab79',
                        token: 'Nulla repudiandae quisquam modi perferendis. Deserunt praesentium odio amet reiciendis perspiciatis porro et. Sunt ut cum quis ea voluptatibus quam vel ut ut. Qui qui aut quis quam dolores. Accusantium placeat illo sed et et vitae consequatur. Rerum culpa quaerat omnis vitae qui rem omnis reiciendis.',
                        name: 'dpeopn56osoyndz0uulv11pk77310frjzqxv5lu6f9l2p09k2s6w98sq7rwmiyki3tuvbbhk8sud12svl42d6rhwayap87s1u835lp33n1inqzh4vqe4ab43knprp4etg6fe6v7uvxf3gjpyzf5jomk3c3o4an3lpct88ozbcilh6tefnxsf1p311qod5yo87m2iikkeq54k9d1u4hm0qitjzf174lgwyxgxy77b4863hqn5yche4kxhxmwpgj3',
                        isRevoked: true,
                        expiresAt: '2020-09-20 08:00:57',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateAccessToken.id).toStrictEqual('56b7a133-4e47-4b8e-90c7-5e0b10355ec5');
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
                    id: 'f1aaa689-2ab7-4b49-bce2-3850c6b080d6'
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
                    id: '56b7a133-4e47-4b8e-90c7-5e0b10355ec5'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteAccessTokenById.id).toStrictEqual('56b7a133-4e47-4b8e-90c7-5e0b10355ec5');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});