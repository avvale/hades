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
                clientId: 'd62f59a2-393f-4cd0-9d2d-2b82cc2c3722',
                accountId: '757de80b-d905-451e-9259-42c8a44e57e4',
                token: 'Corporis nesciunt incidunt minus voluptatum. At sint et id dolorem cum tempore accusantium. Et similique consequatur rerum. Ut doloremque mollitia. Sint velit qui.',
                name: 'kv9bxebskaitj91oho133mow9pjx50ux4vsmsirdg9j984qvizonyr9yskce3izna1qm4dsb3jy2mci7wzr0qozlds9j44myol2yahv6r78qpobromhe6w5rnsp4ssxepabqv51ja0wzmume0nt1todgzvgt603qajnud2s1md0l2w5hp5b34m3lvezfxa34wfsmiznjxuefxj7z5k7f682hqgkgk3hl845n16mqppk0vlrhwyu6cbrpq6b4wkq',
                isRevoked: false,
                expiresAt: '2021-04-16 00:34:59',
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
                
                clientId: 'd62f59a2-393f-4cd0-9d2d-2b82cc2c3722',
                accountId: '757de80b-d905-451e-9259-42c8a44e57e4',
                token: 'Aut sunt omnis dolorum et eos et et voluptatem. Corporis et modi ut corporis veniam quisquam consequatur neque. Commodi neque voluptatem quia atque. Magni laboriosam dolorem aliquam aut quasi eum perferendis earum qui.',
                name: 'h1qcrb17a10o13vri5gd1y7c6ervr0478q9l0hgbjk79cz2fftn2olh32og4korcccdkuffqj7tyrua2cp0v5846q7zi1b29gjqd9iznsgj0fx4uckxqg8x3iq3qzx5a8ykwjl9rh4a2rcsknod5u9x3pftfkyzp178eeup4wk0kgrknuyd9c3j2i99b02px7dthjt2fwvxi1bf1yag6941xp9gfttakqarmjarkmuff8bdthu28pitlzv5785w',
                isRevoked: true,
                expiresAt: '2021-04-15 18:13:32',
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
                id: '36c30c35-4ac5-4599-96f8-b33cdf54b616',
                clientId: null,
                accountId: '757de80b-d905-451e-9259-42c8a44e57e4',
                token: 'Sit ullam eos id reprehenderit omnis mollitia eum. Natus odit a. Molestiae magnam numquam architecto sit qui fugiat aut. Sunt sint temporibus. Rerum repellendus animi excepturi delectus ut quisquam consequuntur et quod.',
                name: 'ribro2wr8yhlvxscddl4x2cmx6265gw1qhudy56zvlajp4r7nd8j99igpqd22rnclqgqsanw72uggfjtkk0uwyruu97rri6xd99hsjc9u5swrgck6zaa1zbb0fvdko1jmdb0kwl0r8ww9lq4m1qw2cedkibs7ctx13nalg8w0390s4z2o52uaiefllsvlz0ur1d53cptz40t9kqoqrwhh6qwq415gvxci2y63slbf2rge1f3hkv795ycak8ru1s',
                isRevoked: false,
                expiresAt: '2021-04-16 02:58:07',
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
                id: '36c30c35-4ac5-4599-96f8-b33cdf54b616',
                
                accountId: '757de80b-d905-451e-9259-42c8a44e57e4',
                token: 'Quia ut et voluptas aut asperiores ea sit ut animi. Modi quae repellat explicabo autem repellat qui. Nisi error reprehenderit voluptatem necessitatibus ipsam sint. Quis et quis qui necessitatibus laboriosam quis. Aut voluptatem molestias perferendis amet quos laboriosam. Dignissimos sit magnam distinctio aliquid eaque assumenda et eveniet non.',
                name: '4dv7uco2bzlvslprhr7lpad606m1bje58o6ut7knt3y9ttt5gd5ek96gbjx6nkenkt9cw7b0bt0tegbxbmi4vd2m6bg15npgrd04zphrxoltgusy1n33ccyn48npmjv9gmmhup9uvg4uovbqb7eolo1spel48a29x9xp1p9h22lydbnjyj8gze7jl8cttp2qqxwdb26103rjbypk8xnpo30317kgmuas2qrq7xc7dv2wpzp6ke4368jvk2nqb1q',
                isRevoked: true,
                expiresAt: '2021-04-15 18:31:12',
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
                id: '36c30c35-4ac5-4599-96f8-b33cdf54b616',
                clientId: 'd62f59a2-393f-4cd0-9d2d-2b82cc2c3722',
                accountId: '757de80b-d905-451e-9259-42c8a44e57e4',
                token: null,
                name: '2wsgflcjmlg76o1o3rhba56rhk5aj8iaqv7lskacww2cf8srl5ieqnnyljctelncbhh8tsil1fverbhgfqbqsf1xxp075y0coqlhoajxpxjvdd0n2po0pi1bdol5at5ttghlmhh9eu1usuo5bqwaj8ymnw0aqrlcsmhfnhwtrvkvw6p0mwhracifmt9teftphx2y9hlkk5m4izv8rbrcfz09bhd08nx83nen6pthqgjt8wvjq6ya69sl0wgw107',
                isRevoked: true,
                expiresAt: '2021-04-16 03:17:11',
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
                id: '36c30c35-4ac5-4599-96f8-b33cdf54b616',
                clientId: 'd62f59a2-393f-4cd0-9d2d-2b82cc2c3722',
                accountId: '757de80b-d905-451e-9259-42c8a44e57e4',
                
                name: 'g909szd8dn0ne9as31ce8t28r8i3vz2mge5jozbu8dkh2ldajxgt9vclfmqrj05x1476pjo7n6dhlphgs5gbjhypsxemul95jfi3qg06z9te7gl034zrt6iz8wjicchvztnb5y1uulogc6uuya24j90gy9p6l48nvv7c8lezuogkeh8ivxm3b0osn1lgrv7deweqx03r9t8c1evvpwebd5g0oytzm6c2yoe9uvrz3yw0c8vh1j8u7xk9gmscpaq',
                isRevoked: false,
                expiresAt: '2021-04-15 10:52:11',
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
                id: '36c30c35-4ac5-4599-96f8-b33cdf54b616',
                clientId: 'd62f59a2-393f-4cd0-9d2d-2b82cc2c3722',
                accountId: '757de80b-d905-451e-9259-42c8a44e57e4',
                token: 'Dicta sit magni autem unde perspiciatis sed consequatur. Maxime earum voluptatum voluptatum consequatur id iusto minima vitae a. Magnam rerum est vel fugiat sunt quod vel. Asperiores sunt quis officia error quia sequi sed ex. Non et est qui dolor totam. Temporibus consequatur et ipsa animi ea animi.',
                name: '98vf5uwwyvvprfuixd96jgr91i6ez7s93lga0eytzf8da55l55tncifh6qkx8vnq2bop23no3asx2l3omu5ijk2nala7ersshwpgzowc64i51gcwa38e4818m4a233gs16om9cas54uopdqfk6nhvz3ge8ilw9bp7miokk4mkzcn7nrloo20z2a6u1myp7tanep8m8y2pqxg9c4n7ty342lpwmallv9ussso39t27zvr8cd4g5lpadqbjy4ms5l',
                isRevoked: null,
                expiresAt: '2021-04-16 00:28:07',
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
                id: '36c30c35-4ac5-4599-96f8-b33cdf54b616',
                clientId: 'd62f59a2-393f-4cd0-9d2d-2b82cc2c3722',
                accountId: '757de80b-d905-451e-9259-42c8a44e57e4',
                token: 'Deserunt sed eius. Doloribus quod velit natus quod similique beatae qui voluptatem. Impedit voluptates libero similique eum quis rerum dolorem et. Et est blanditiis excepturi commodi. Distinctio deserunt temporibus placeat.',
                name: 'wtmsmza1n3hwg05dmb8fbc44bxp0hfh1kak0xnwh45gd4b9f0hfmdrhmvxmcr8vibrfvv9wslqmc9kdncbyxdvdt2qprknjes0i4bavzosvjdp0fkvoryt6kbg4f1ty59unng7051cnrls7bm2ylk5wqbn7yo2sj1g2x75nyqlmrv0bvgcpfc0ei9754w5tzynu5h5k1ip44w8ax9hhmw9esvs20wuledx8liuo418x9jnpswdfhuiw56vc0a70',
                
                expiresAt: '2021-04-16 04:48:14',
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
                id: 'evqgnu942rc0jetj9tvnlivm04wn2177eplce',
                clientId: 'd62f59a2-393f-4cd0-9d2d-2b82cc2c3722',
                accountId: '757de80b-d905-451e-9259-42c8a44e57e4',
                token: 'Harum quasi tenetur repellendus expedita repudiandae. Libero aliquam molestiae voluptas quia omnis. Voluptates quo et aspernatur veritatis labore et ut. Nisi iure voluptatum vitae voluptatem maxime quaerat.',
                name: '8g7ytw6jrq7yyw4zadyyetf8u3op3tbn4d6dnp34dj2mdtrua1mculpbl66p8tuh1354y7rvxykwn3w7szlvyhsgtw8juuorpef8saf4me0tcgnw6r2r84s7x3qfjefg9xecqh19zar63imeyhm0okxgmn0azpbq17ym7md2iehxot4jh1grc9xuatc2ovrkuikwarwom2g24n4w0m2xlckn8ufspgq8t336qj15gmmp93vya5ssrnugyher8o5',
                isRevoked: false,
                expiresAt: '2021-04-16 01:56:15',
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
                id: '36c30c35-4ac5-4599-96f8-b33cdf54b616',
                clientId: 'b4uf0jnukvtrmz056402p62lwsjsa2zl117tj',
                accountId: '757de80b-d905-451e-9259-42c8a44e57e4',
                token: 'Voluptatem facilis a. Velit neque quia et et iste sequi optio magni. Soluta accusamus dolorum accusantium expedita quibusdam. Quisquam placeat voluptatem eligendi sed nulla.',
                name: 'qqyy7vmjvl8wliwbfc5diu6tor4upywy6zimixfffapvpg9pozpeyo4g69byg4feymsqfizibb81kfvd3ao3fjj3t87hr06e58wbsrnxuock6k3q1cq2tffi6hgx1cfvekevm8vwwcvb9h0hzjbzq5gl6g721r0hxamaf33u8mvp1b8bhz1p19vwvij8h4cxsc2bldp8yf03kl3rqmgl51pdgfrqt7wzslro875ykr680qik5lqfe5z3ipkrz4b',
                isRevoked: false,
                expiresAt: '2021-04-16 07:25:17',
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
                id: '36c30c35-4ac5-4599-96f8-b33cdf54b616',
                clientId: 'd62f59a2-393f-4cd0-9d2d-2b82cc2c3722',
                accountId: 'dnd4ffexbmxkokgg9k1hixpopt85i2ku3ftbk',
                token: 'Ab dolor voluptatem aliquid. Tenetur est corporis aut. Illum rerum ut. Dolor minima similique ut accusantium eaque cumque mollitia in corporis. Dignissimos omnis incidunt aut est totam.',
                name: 'cybvuuslgxszghjo6o4m9didhb8hq13x3eg1z82sbdk7a4muck3c1g2uhu7s2hyilcmjwgkoe3yl3hgmkmjhwez6663bcbohidk8mr49bpfhxoxcr75d6lgltz7ew7aq4ihfs088341fxl5r764xccq666yh40dk8pqwqbj9hmf7ad9plnevl1rsq8u4ine0x8k8sxblmfefpu2sinr5cbwrdr73xd1v3zfo2n0laa196v5ae5wlm58syqilk5x',
                isRevoked: false,
                expiresAt: '2021-04-15 17:53:34',
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
                id: '36c30c35-4ac5-4599-96f8-b33cdf54b616',
                clientId: 'd62f59a2-393f-4cd0-9d2d-2b82cc2c3722',
                accountId: '757de80b-d905-451e-9259-42c8a44e57e4',
                token: 'Nemo suscipit neque sunt rerum placeat et qui repudiandae. Ipsam eaque autem sapiente non aut consequuntur placeat voluptatem. Quia ipsum rem illum accusamus sint possimus sunt.',
                name: 'ma0hg9wm5ta820v2fq84jngqljdrdvgprd96v2z88sufjfoqv89vp5bj4gh3rru85ijwayqjgj8kyp6dua4o2cavu20sonm5pupdw0jhic9o2f19yptnszi40hausq4xfs2qsvvydcx5e218kk3fwp5dbr4muud44vxcularnqacart0fzxoojkypomk8q6iczpmetj4vgzxla78267oj04syms240eo5kcnxz2abe5272h7am6ehn9m4z13kv9o',
                isRevoked: false,
                expiresAt: '2021-04-15 17:05:44',
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
                id: '36c30c35-4ac5-4599-96f8-b33cdf54b616',
                clientId: 'd62f59a2-393f-4cd0-9d2d-2b82cc2c3722',
                accountId: '757de80b-d905-451e-9259-42c8a44e57e4',
                token: 'Qui illum nihil blanditiis occaecati. Sunt culpa impedit. Occaecati tenetur et officiis tempore at at maiores. Quia explicabo et et reiciendis cum est quibusdam repellendus provident. Repudiandae libero ut accusamus fugit quae velit. Numquam sunt quod.',
                name: '6j0myqdje4w1xk2137hihk3wajdw63m2hkn7j0h8x80comrau1pg7ojqkm176efa1evziqw3s81rzp2tfw8v6oxpq8i7zxvowswg7filh8pbiqyf8mx178v2d9zqj4l5evyfyxfiwz6xwes0n8azkq6syg41avirdb88i20so0snu6lr80m7jssce5o60p0spri4667zl7qk8b16ggiwwifwjjk1dr3a4xd35088p02sulyim43t2ymj6b74q1h',
                isRevoked: 'true',
                expiresAt: '2021-04-16 03:32:50',
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
                id: '36c30c35-4ac5-4599-96f8-b33cdf54b616',
                clientId: 'd62f59a2-393f-4cd0-9d2d-2b82cc2c3722',
                accountId: '757de80b-d905-451e-9259-42c8a44e57e4',
                token: 'Non impedit vitae dolores consequatur eveniet sed est. Hic repellat necessitatibus ea velit voluptates quasi. Ut doloribus mollitia magnam est.',
                name: 'vjnurhehvz6sckl9rn8v92bes1816rl58dujwpvacqnct4yb04cggxtvmb3dejq4fqhewmox8nz1f8foyzimhvdqmblanmyv55i5e2oinzlkugjs7qezxy098ywfapg8s1bmovtkiu9d2y1uuave5fsye82kgzeo5s1ecnt2yw0bqjrk7jjtymoxoz1og270pc995z1lxf5mijop9e5c0cml5s5oysa1r46mobhl4d8j11x047q3hrox3aywpie',
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
                id: '36c30c35-4ac5-4599-96f8-b33cdf54b616',
                clientId: 'd62f59a2-393f-4cd0-9d2d-2b82cc2c3722',
                accountId: '757de80b-d905-451e-9259-42c8a44e57e4',
                token: 'Velit voluptatem omnis excepturi nobis dolores. Qui ratione praesentium ex eum nam corrupti quia architecto exercitationem. Unde quos neque pariatur rem dolorum ipsum quam. Facilis ea qui nostrum animi. Et libero nemo quis.',
                name: 'qtjftg66xvbg3aofguc61uzkdfdrlwnbui3s9r6qzvuye9pn6lti5nrd2u3wp5opnvi1lmo1w1nhy0aw4tjuij4mqj7v4vtzx04m947t52hjugas4kxnl4bry8x6s2mphzkk0ojlipmz3ubidwyklzsu5orxrb3n4pg1sesextquphk742ve8jt5xldxndm4cz61yx90s5yfmfupgntiyedf48qs235jlh0nbdca1jmawsgoy9esxhndaiqyvl0',
                isRevoked: true,
                expiresAt: '2021-04-16 01:35:17',
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
                        id: '2cc44693-fd4e-4e81-8e87-172101f53b18'
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
                        id: '36c30c35-4ac5-4599-96f8-b33cdf54b616'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '36c30c35-4ac5-4599-96f8-b33cdf54b616'));
    });

    test(`/REST:GET o-auth/access-token/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/b5a74591-b2ca-4fc6-bfe5-f9f809024736')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/access-token/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/36c30c35-4ac5-4599-96f8-b33cdf54b616')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '36c30c35-4ac5-4599-96f8-b33cdf54b616'));
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
                
                id: 'd40a14c5-9d33-41d4-8864-7f4c7ec58239',
                clientId: 'a29ced1b-7d81-481e-8b8b-4a17b309c614',
                accountId: '9f6b6d5e-8d12-48d2-b31a-e263e2c2c041',
                token: 'Vel minus dolorem quia voluptatem at dolor est ut. Numquam consequatur quia. Earum eum quas. Et consequatur inventore rerum eos occaecati exercitationem itaque expedita ipsa.',
                name: 'ulv71z6tzetn05bkpvtp19qsasd7y0r24bapybfxvkac90v8oafhyvlhjmyngd0xncuv3vvkkapdf0c9oim642jy5ztoggp153qig82w1npssggjcesafywgul30mptdno2zb8fkhy3cqiu8ol9abn4w0fdv0tdogzxjmoq5cqudvby4r82e75wh95rvyrgr49l0dk3zn3ern9ekfr3praaw5b4azzr8udusx97w7uk0psq0hloe3ue07pqjuhs',
                isRevoked: false,
                expiresAt: '2021-04-16 09:15:45',
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/access-token`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                
                id: '36c30c35-4ac5-4599-96f8-b33cdf54b616',
                clientId: 'd62f59a2-393f-4cd0-9d2d-2b82cc2c3722',
                accountId: '757de80b-d905-451e-9259-42c8a44e57e4',
                token: 'Voluptas exercitationem illo maxime. Ea rerum et commodi qui sit dolorem. Nihil eius quae ipsum velit. Et quaerat quo libero expedita dolorum. Sapiente expedita dolorem ipsum. Dolorum quae vel laborum dolorem quae.',
                name: '8ezljbp7g4c5e6v2e07h8l58ojb27sxvopuv4ti7u1uioz8x37g18w0fcrv0i26liuwo4nmkexm7p9i3fs9vj6z99fsnimkav1hxjxe6rjgl1mxw32k8geebrdzfvbcz7177g28kjd5fqnt1wz2wx3tel3y6rezw407emt4uswadqotpf8vmcdbr2xbicmdeasm7gas7268ow6l1sorxyalm8x0iau4jqemmy2sr4k0e0arvbo541zbvgnuw9gq',
                isRevoked: false,
                expiresAt: '2021-04-15 20:28:25',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '36c30c35-4ac5-4599-96f8-b33cdf54b616'));
    });

    test(`/REST:DELETE o-auth/access-token/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/13e23ec4-b2c1-4a2f-b54a-f234acdb2e2b')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/access-token/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/36c30c35-4ac5-4599-96f8-b33cdf54b616')
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
                        id: '6ca50151-4510-43e7-859e-75339aa089b6',
                        clientId: 'd62f59a2-393f-4cd0-9d2d-2b82cc2c3722',
                        accountId: '757de80b-d905-451e-9259-42c8a44e57e4',
                        token: 'Iure laudantium assumenda laborum veniam nulla laudantium suscipit. Qui dolore pariatur pariatur omnis saepe. Nam est mollitia repellendus.',
                        name: 'aufd6ednxkqtpwtnsx7otx29v6w8nwzakn55hvpjf19mnrqdy56sag4dy0tyqp0ga5kjamd45scc5yk5njgcygrb17wdvo5bl6jquy2urxl6axm1y5m30fu1yl5lgohmgpj59w5oz71hsgaj9j942m8mlj6jtzlmlru2q2e4xzxrp2svtqtq0c18rhhutfsbbfq3cxioe67iv93susnkdhomk1syvbeqm1yys8ngif3t8xtdsbmc7aw4fw705d4',
                        isRevoked: true,
                        expiresAt: '2021-04-16 04:50:02',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateAccessToken).toHaveProperty('id', '6ca50151-4510-43e7-859e-75339aa089b6');
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
                            id: '743a61aa-0154-4e26-9058-878981f3fb45'
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
                            id: '36c30c35-4ac5-4599-96f8-b33cdf54b616'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindAccessToken.id).toStrictEqual('36c30c35-4ac5-4599-96f8-b33cdf54b616');
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
                    id: '6bb40c26-6ee7-4483-ac1a-c64154f22baf'
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
                    id: '36c30c35-4ac5-4599-96f8-b33cdf54b616'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindAccessTokenById.id).toStrictEqual('36c30c35-4ac5-4599-96f8-b33cdf54b616');
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
                        
                        id: 'f45dea5a-f6ce-4b9b-8c12-10f64ce68e62',
                        clientId: '4fbe771c-386a-4953-8c28-8be14a38e8f8',
                        accountId: 'efc1e97d-9b8a-47c2-8bf7-c8cd2cddd0eb',
                        token: 'Exercitationem doloribus id commodi dignissimos expedita fuga sequi. Distinctio eum esse accusantium earum quidem deleniti adipisci. Consequatur rerum unde accusamus expedita. Eligendi quidem provident eum omnis assumenda.',
                        name: 'xyr6i9i7z9lrbmlr9m7cv9v2tikqv3qwxqr9poejku1bjm9nkqwykq546t3svibgm65gg6jv73z7aefhcaipuz0nfdc017gyxu4njkuctkl0y84qqknwk30siqhftwajt5g4jdguknv9ms1bmzxcxik20pbi9toxpenpfbli1x6wtay20dprnv76y7j2lkbffrsugh51i22fc92c8hbse3jw59wnrtvuw59qnbyxo1ycupgo7tf3b082dt8v0k1',
                        isRevoked: true,
                        expiresAt: '2021-04-16 00:39:02',
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
                        
                        id: '36c30c35-4ac5-4599-96f8-b33cdf54b616',
                        clientId: 'd62f59a2-393f-4cd0-9d2d-2b82cc2c3722',
                        accountId: '757de80b-d905-451e-9259-42c8a44e57e4',
                        token: 'Aliquid ut tempore tenetur doloribus. Facilis quisquam dolorum voluptas hic voluptas fuga. Dolore labore at qui natus qui. Nisi sed non voluptatem labore et voluptatem dolor. Sit voluptatem consequatur. Debitis non corporis.',
                        name: 'qvyvdryrlhp2rtvhbg094vigkirswwyo0lrrngma2we14oi29lxfm2m5xiy3rg98ucafksrzs9wot7nxdg19zjrsn4hlikom5lb09zkzsqjbmplkc1ppyhw7h11fdk6fq7jk2asauw90pg9sqrnh41lrxv47cmb4pwj1s9j9u7uadh8us6a2v8ttt3m2y2ouk2p3ux0xu9cf53y6k1orubqwk43lveplwk9b5f9tgxsjn0s5z2b8chbgq6ob1py',
                        isRevoked: true,
                        expiresAt: '2021-04-16 01:32:36',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateAccessToken.id).toStrictEqual('36c30c35-4ac5-4599-96f8-b33cdf54b616');
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
                    id: '7c80eae9-60e6-4e1f-906a-7a7759b74b94'
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
                    id: '36c30c35-4ac5-4599-96f8-b33cdf54b616'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteAccessTokenById.id).toStrictEqual('36c30c35-4ac5-4599-96f8-b33cdf54b616');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});