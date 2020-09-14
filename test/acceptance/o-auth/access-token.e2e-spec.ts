import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAccessTokenRepository } from '@hades/o-auth/access-token/domain/access-token.repository';
import { MockAccessTokenRepository } from '@hades/o-auth/access-token/infrastructure/mock/mock-access-token.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { OAuthModule } from './../../../src/apps/o-auth/o-auth.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
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
                            dialect: 'mysql',
                            host: 'localhost',
                            port: 3306,
                            username: 'root',
                            password: 'root',
                            database: 'test',
                            synchronize: false,
                            autoLoadModels: true,
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
                clientId: '3d8be5f7-1a14-4841-a7f6-095f50bbcc6d',
                token: 'Excepturi dolorum est tenetur quidem fuga dicta. Mollitia fugit explicabo accusamus harum voluptatem laborum illum sequi. Quam velit corporis hic harum dolore.',
                name: 'zs7w0kvkdekpf407el288tjqti17yhfzolt051uo8kto1mo43tjn5mcfo931zrhxwoah913wfuc0057ew6p8jmr8ohascyf275cp37wb8e4tihvb3rkpki1qymzsv35xlvrm8pi0mhn0ch8zhw9u0zxhj7wrj165twvf7t3ljsgt93i1lfqihz7v3nam9pwani79fmu907uk8nk3ip3ylvzs3y1zb9hejppbt0ua2mk7yvhlzkgh39j4xwalgcb',
                isRevoked: true,
                expiresAt: '2020-09-14 21:36:10',
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
                
                clientId: '3d8be5f7-1a14-4841-a7f6-095f50bbcc6d',
                token: 'Non nihil nostrum nihil hic porro. Quis ut perferendis odit aliquid. Repudiandae optio adipisci repellat qui accusamus et.',
                name: 'zssdbdoj17uie4ems2c7b8uksy7oqm2osiypxz6ntnt8pxdoh89vewad3ynris1lqepxw0fnmv0xlbuy2v1h55o9v45x6agst6quucsxpxbi70t6ssv75zn22y8o2uuxncef1mmuwf48bprcfs4gm5888it1xwfscdx43wn9y0dm90jtdximaudgsqcd8bnzis1tcgjnkt5t07nh93r3hhxq5kg0tq25ltw7ammma5jkslgf52xilxdwkyvezzc',
                isRevoked: false,
                expiresAt: '2020-09-14 04:15:38',
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
                id: '8fbfc1b5-e1a4-4095-87c9-87b848c159f0',
                clientId: null,
                token: 'Autem voluptatem qui quas dolorem. Eos occaecati voluptas possimus ab voluptatem molestiae. Quidem iste officiis incidunt. Provident sunt mollitia asperiores porro nam maxime officiis.',
                name: 'iwtvhym643qejfon7clvzd2fxevxcweyo17isoffyd5fz1ltz34djngbo6kvp7bz6phcayyhfhxf3nb55aleijtoinwbdhe6tmq24i71cqzqwhio6myqzuas8fpltra4hvqj6m0ye2u1zpmmi911zgathr6k51papo1gy66w852jmj9s3zp4ww6lgm9qmkoluqmvgdbhst28k0yyz3he1n5b8mfiztyj2dxnr4orcn2p11bcju808zwwqfldy8t',
                isRevoked: true,
                expiresAt: '2020-09-14 03:13:28',
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
                id: '8fbfc1b5-e1a4-4095-87c9-87b848c159f0',
                
                token: 'Ab consequatur quis. Et temporibus qui nemo dolores vitae. Fugiat cumque nisi quam quos. Atque dolores magnam deserunt autem consequatur est rem voluptas quod.',
                name: 'sht7pbhxz7as9q1nyppbjpb219kb63k5t1ta1x6afq2taw3n6jquiepo58725jffqv2qtoboej9k4ckvno64sm4lhdqcqaw5j001213ng6frltl3irp36hso7sh4mcfj4vd7wxhvwx7s5klylsjkch6hlqb693yxhi3dcl6cgo30abz7m6y7ebtds8uk0imtrcfjoapv4dyf4n3uu49hsvgsgm6c16x3venvnmjalb37mjgq9cpwgfr3a809cvw',
                isRevoked: true,
                expiresAt: '2020-09-14 14:22:10',
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
                id: '8fbfc1b5-e1a4-4095-87c9-87b848c159f0',
                clientId: '3d8be5f7-1a14-4841-a7f6-095f50bbcc6d',
                token: null,
                name: 'u3ybchwjzfdhqkvv4q7cdxac98r3b0xyyz3vkn7bq01eq82ial8fsf9aggme738we0gsvq8x7dudu1586n50vjeueqv8c15968l44t3ihvwl5mb9ns73mrke5wi5r4ht3pb0lv6k53105yla3p0kfeuab96uvm8y3blcflqc1p7gg3xdfdbp9zc4ic8r46hsai9ycs0cl6oyp1156bvqwpxg5nv06c25qg1ubqmj0foyt54qvn9315gcomftldu',
                isRevoked: true,
                expiresAt: '2020-09-14 18:18:09',
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
                id: '8fbfc1b5-e1a4-4095-87c9-87b848c159f0',
                clientId: '3d8be5f7-1a14-4841-a7f6-095f50bbcc6d',
                
                name: '1ici2nk3f7ysgmh3tgw4e70w0sy5ie46qa7gt26443g0uev5oybmnn688j839eyff9ddwztop6xkpdlrfx5duq6sk9mnrfo5n19mpb9iwug1wq1ws981n3m9qwbpm4kaketknwvm3lougw0l9xt8ufipwa4yniv5uijzjgs5lvz71oo3btdhvi2m01aoovhd8a65jumely67zyx1ubpivrkea6ap9mcx7kmjywztjjn85xan6la8y7aqz0rxp36',
                isRevoked: false,
                expiresAt: '2020-09-14 16:30:19',
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
                id: '8fbfc1b5-e1a4-4095-87c9-87b848c159f0',
                clientId: '3d8be5f7-1a14-4841-a7f6-095f50bbcc6d',
                token: 'Esse tempore cum rem laboriosam error modi doloremque. Aut occaecati et iste velit sed est expedita. Ratione unde ea et. Praesentium recusandae et aliquid at aut ut nobis.',
                name: 'vy1uqk14j55j2plk2v7zvfin6hewfpc8eyrzb2kgveo5cufpt2my36nt0bbgqwkpryiifpsybimc8mydm1g1dv5gqokeuls8j33lyebp674xrj29sgvtsrxob2opokkswtofey5wwn7jf3jdc77h9czt1lmmfiyitnxwpk7skq2iy9ws0r4wt0ab4ius95n7ui8txn00b25jq1w9zvz45vja3cnr6fvzuy2es0hqwbe1dtxbdz3hn986dvkba8m',
                isRevoked: null,
                expiresAt: '2020-09-14 07:44:11',
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
                id: '8fbfc1b5-e1a4-4095-87c9-87b848c159f0',
                clientId: '3d8be5f7-1a14-4841-a7f6-095f50bbcc6d',
                token: 'Facilis ut odit velit dolorem ut quas sit. Dignissimos ducimus aperiam repudiandae illo maxime ducimus. Beatae corporis molestiae saepe eos quisquam aut quia sunt qui. Rem officiis praesentium accusantium exercitationem omnis officiis sed. Nam iure est aspernatur.',
                name: 'yetn1alwc38k8acgprb7sk3oqpv2gut6dcj7j2wsxkegwa0udfut1q4lcidx1znbrijci75bga0dmn4sby2wxkj2xs2gw414yvewewe7bzx5t8ivgza1ld81203vayknlz9g3ujkeuetzym7ixevutk0vmvcvven8cb5b1ixhuwmoks9622ff47tqdjotg2klmd4d3mn9rbt87quni1n3s553j4rf7rwq0ioxnu91o2qaw9cfnvlghed95osjz4',
                
                expiresAt: '2020-09-14 03:30:41',
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
                id: '9scdxpdifkt4jd46cxldv2wv9bqa6lddkg5ms',
                clientId: '3d8be5f7-1a14-4841-a7f6-095f50bbcc6d',
                token: 'Nostrum suscipit dolorem vero distinctio. Officiis sed expedita aut mollitia omnis inventore possimus. Officiis nostrum officiis id debitis sit. Et est rerum quia. Natus omnis eligendi ut non modi sit eaque libero.',
                name: '564c31v0umlngi2iw52gy2tz6nv51fkgpqy58ut117olxaxwzh38b9ktkwrm219oxrlc2y6zkh8h21hstbbcujouwyhz3gjvqea8oz45iie6zzy4mhd1epmy6ru0eksg2hpqpzjecjqddnzjj22zl8wy077zjlbsbovxclxubybknxqbkz4i6yydn7utl30qt63kvhzg4ykvt385hlmsbx7jj9c7jsbotigmzkk0afa3wxwf00yzwlir7rtbuqr',
                isRevoked: true,
                expiresAt: '2020-09-14 02:05:33',
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
                id: '8fbfc1b5-e1a4-4095-87c9-87b848c159f0',
                clientId: 'q3mpe5qnewxy5m4n4xcm9zzomh3gs9cb6edzh',
                token: 'Ipsa facilis harum porro. Accusamus provident odio. In voluptatem sed sapiente molestiae nulla ipsam quibusdam voluptatem. In qui fugit et vitae qui. Delectus sit iste eum commodi autem repudiandae et. Voluptates ad veniam eligendi similique labore vel explicabo odio quibusdam.',
                name: 'zvosodzgewwhyp8ixv88fnl8bkp5ie2deobatu7bcpcmltoj5yt42hoic4ffw2qat3id213yl5t9gq3yor4hen1d2j40qzanppuuenjrmyujqb0t2a6fl5ai08wmxpizh5eeb4wz4yt959zy79dacbick1mvtz9t2ydxxi2gqv94w5nrxmos6gz1xo12s331q3c3m30fczy7qc9fqlgv6f7a2t3r6ydoadbkj23ouwf3x4javzj0qdortx4i8du',
                isRevoked: true,
                expiresAt: '2020-09-14 06:28:55',
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
                id: '8fbfc1b5-e1a4-4095-87c9-87b848c159f0',
                clientId: '3d8be5f7-1a14-4841-a7f6-095f50bbcc6d',
                token: 'Mollitia omnis quia qui. Nihil unde et et. Quia quos est earum in cumque laudantium eligendi. Impedit voluptatibus ex ea ea nihil voluptates. Adipisci accusamus dolorum velit dolorum occaecati iusto omnis illo quidem.',
                name: 'iys7l8y6116ol6ngmjb49bw8roxgjgv5mei1w9ekwel3gz4p01mqys2kko40ubz7yqzlwa7he9wsnnfpha1iz3bdl4qnft8se76y2gvtrbv3zwezlku466czolqw4o4byz1mckh3yrhho7ad1g4964h8ql0tbg2hg5zvbdx1y6s4oa4ejrniofffeii049d1efdwdrvk457c08mr9gzxvvl7js8yz9mavjw4ccmklfyvlgkrcpyyq1rh0xjho9aj',
                isRevoked: true,
                expiresAt: '2020-09-14 01:48:42',
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
                id: '8fbfc1b5-e1a4-4095-87c9-87b848c159f0',
                clientId: '3d8be5f7-1a14-4841-a7f6-095f50bbcc6d',
                token: 'Possimus aut nostrum aliquam doloribus iste dignissimos illo dolores. Autem ipsam dolor tempore quod sapiente. Vitae aliquid molestiae maxime atque.',
                name: '9dyziiym8x197xq8uc6xg113idyjmviketk741zc55fgf3qr6eavbgzdrm6kbjvelnv8lc6dbf91fgbvpaipzj6hwta3vpkifrtu6p9s30uy6mc5h9tnfxtt5zjfy4zoneo24y9y4fzu2ym3hi5yn8p80i4sj3mq2787il2r9886zachbi0pt1f9d4hr0gsu98o8j80je1b9jdpqmlzbps0evpmo62baxrfhlsmaexa5oll4360h6b6k44tsatv',
                isRevoked: 'true',
                expiresAt: '2020-09-14 01:18:45',
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
                id: '8fbfc1b5-e1a4-4095-87c9-87b848c159f0',
                clientId: '3d8be5f7-1a14-4841-a7f6-095f50bbcc6d',
                token: 'Facere sed et molestias voluptas repellendus animi. Temporibus soluta doloribus ut enim modi. Dicta laborum ut. Natus vero dolorem nulla. Assumenda quia ab tempore soluta quas. Optio dignissimos dolorum modi culpa quos quia facilis mollitia.',
                name: 'nknbka52cygh4gsctoscgx2mci4spcqgaxvqdkejxf88lfyu46wdapv98h99t464fshthgskldnx7vebns17nfgs0lrassow71t1g8ysmhhjttl5ut1kbk76lkwigs1uffi4kqg1njdt3qh7fggmtpo1e54gws0dqezjcx19clhxa1y7w0e0fl1s2f96xu2waqg6rp0rvs122ywxrwa3dwjjnsrv0zq3d5fywtsgoy2iww0rs0bv8c8mhqqhk5b',
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
                id: '8fbfc1b5-e1a4-4095-87c9-87b848c159f0',
                clientId: '3d8be5f7-1a14-4841-a7f6-095f50bbcc6d',
                token: 'Ab in ipsa odio. Velit nam sunt ea est id ullam. Eos pariatur commodi omnis aut veniam. Quas quae natus qui omnis praesentium enim.',
                name: 'b16b1iv3ww3le0uqmmezuaxaxoajqbc2ouorslvlvdvzem82xnkqqphtvekfasp90411fx1e36zyz20t8hmen7ndbpz2m9l1hrtdcbwvu2chrrsuv7x2eyjvyl0qxygsldqwmj1afuiggvtxr0ertl3xzuwpyvpv6gpf5qyec9c6o6mf4cxbbs9jwgwza5rmxvih31f2wpa5ecpyytp8dqcxedgoejk8dzfe2huqgsqr5rxhsbof31d3tkt2grj',
                isRevoked: false,
                expiresAt: '2020-09-14 23:59:12',
            })
            .expect(201);
    });

    test(`/REST:GET o-auth/access-tokens/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-tokens/paginate')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command: Command.OFFSET,
                        value: 0
                    },
                    {
                        command: Command.LIMIT,
                        value: 10
                    }
                ]
            })
            .expect(200)
            .expect({ 
                total   : repository.collectionResponse.length, 
                count   : repository.collectionResponse.length, 
                rows    : repository.collectionResponse.slice(0, 10)
            });
    });

    test(`/REST:GET o-auth/access-token - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '56918a14-5e0a-4b88-b6f9-6006652cdb36'
                    }
                ]
            })
            .expect(404);
    });

    test(`/REST:GET o-auth/access-token`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '8fbfc1b5-e1a4-4095-87c9-87b848c159f0'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '8fbfc1b5-e1a4-4095-87c9-87b848c159f0'));
    });

    test(`/REST:GET o-auth/access-token/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/d6a8477d-d12e-4d7d-aa4d-a1482d293ad6')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/access-token/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/8fbfc1b5-e1a4-4095-87c9-87b848c159f0')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '8fbfc1b5-e1a4-4095-87c9-87b848c159f0'));
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
                
                id: '3ea6621e-fb72-41f9-85a0-fff72c25ffae',
                clientId: 'ebc73975-d977-464b-a446-de0c0c62e105',
                token: 'Aliquid et ut eum. Quam esse sunt doloremque velit autem ut doloremque. Saepe sunt voluptas consectetur doloremque aspernatur. Animi earum consequatur doloremque voluptas deleniti esse unde autem quia.',
                name: '5y44gvx96ah2enq1k7dme5n4jzidumj9ol2f7iped0au8qsub8omvxbe7diduwyubz5rpw6hrp6s4yis4e0ea3tgg924u70ghsiy4x6b1u1wteuh0tdhg8zmyeq5kq8xnhjybdubrrsdeeb0dg3zkeqaw5gljt8ndbpqzm5ayqjc7kh4mikdjc9t3a0d3j9xghf77vunb9y6ua6fhqag57zpwpujrswc84rxe8gyqsyckyne7ogonnaoljunjts',
                isRevoked: false,
                expiresAt: '2020-09-14 18:13:44',
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/access-token`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                
                id: '8fbfc1b5-e1a4-4095-87c9-87b848c159f0',
                clientId: '3d8be5f7-1a14-4841-a7f6-095f50bbcc6d',
                token: 'Quo et repellat enim temporibus. Et rem incidunt aperiam. Quia sapiente quidem sint officia possimus.',
                name: '4h20ywajebxicevq8tev72yelh6fugzf34w3l30oysjl7ocqhiw5d8a04yo4mj1mhxer9q5x1me6zm2endkmlhs82e04xd6rhe4yica7o6r2vusudsk2vsw8tlurvkdjvz3mmfkwop9a4dflm34edd4lpgcp5xh824r6kb9x5xr0ode0hm6fizkkc9svmnx55slrnybw1l4c2ja0kw5nwqy7bp3vnzvbx1uja45khyyr8ij65e4193o5d6tzfuz',
                isRevoked: false,
                expiresAt: '2020-09-14 14:32:05',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '8fbfc1b5-e1a4-4095-87c9-87b848c159f0'));
    });

    test(`/REST:DELETE o-auth/access-token/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/ec0b58cf-a8b6-4a5c-a176-d5a12b7cce8c')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/access-token/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/8fbfc1b5-e1a4-4095-87c9-87b848c159f0')
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
                            clientId
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
                            clientId
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
                        id: 'c9a0c595-6895-47b0-af7b-7eb96782e922',
                        clientId: '3d8be5f7-1a14-4841-a7f6-095f50bbcc6d',
                        token: 'Ut magni temporibus repudiandae incidunt perferendis animi exercitationem autem voluptates. Optio sed laborum sed possimus atque velit. Et consectetur incidunt et distinctio et. Iure explicabo voluptatibus. Sed modi sit occaecati asperiores molestiae natus non.',
                        name: 'fdbq1umb5r0jw8lyun555427i02czv3oxd5y59nqrrn70embv6l375xm2v4qgo0fig5sleotkjg2y84rsyfug1enwfnqo5flrxnlbv6upk62ou4jdliyuqd7cz2mst5yg3zqryilehg67x4w1mmrt83m8cmrgsj3a3eerec9i3m03a43dgvbehlrgru0l42n109g0j8ekpye46czi8wzye4x59cpokw64v3np799us64edxgle1s4vs6jd1t5l5',
                        isRevoked: true,
                        expiresAt: '2020-09-14 18:55:54',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateAccessToken).toHaveProperty('id', 'c9a0c595-6895-47b0-af7b-7eb96782e922');
            });
    });

    test(`/GraphQL oAuthPaginateAccessTokens`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        oAuthPaginateAccessTokens (query:$query constraint:$constraint)
                        {   
                            total
                            count
                            rows
                        }
                    }
                `,
                variables: {
                    query: [
                        {
                            "command": "OFFSET",
                            "value": 0
                        },
                        {
                            "command": "LIMIT",
                            "value": 10
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthPaginateAccessTokens.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.oAuthPaginateAccessTokens.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.oAuthPaginateAccessTokens.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL oAuthFindAccessToken - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        oAuthFindAccessToken (query:$query)
                        {   
                            id
                            clientId
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
                    query: [
                        {
                            command : Command.WHERE,
                            column  : 'id',
                            operator: Operator.EQUALS,
                            value   : '2b6b59be-6ecb-460a-9040-ce6f3bc32111'
                        }
                    ]
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
                    query ($query:[QueryStatementInput])
                    {
                        oAuthFindAccessToken (query:$query)
                        {   
                            id
                            clientId
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
                    query: [
                        {
                            command : Command.WHERE,
                            column  : 'id',
                            operator: Operator.EQUALS,
                            value   : '8fbfc1b5-e1a4-4095-87c9-87b848c159f0'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindAccessToken.id).toStrictEqual('8fbfc1b5-e1a4-4095-87c9-87b848c159f0');
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
                            clientId
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
                    id: '620c465a-1a8d-412a-a6a0-4793939fd266'
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
                            clientId
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
                    id: '8fbfc1b5-e1a4-4095-87c9-87b848c159f0'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindAccessTokenById.id).toStrictEqual('8fbfc1b5-e1a4-4095-87c9-87b848c159f0');
            });
    });

    test(`/GraphQL oAuthGetAccessTokens`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        oAuthGetAccessTokens (query:$query)
                        {   
                            id
                            clientId
                            token
                            name
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
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
                            clientId
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
                        
                        id: '206e6ee8-b2b5-4331-8a02-19bc434153b2',
                        clientId: '1f99b275-3332-4b5e-b174-1ced33bff289',
                        token: 'Consequatur libero deserunt maxime voluptas fuga eligendi. Placeat vel eius eos iure ut velit facilis rerum. Accusamus repellendus ex consequuntur eaque.',
                        name: '7e2yk6kmlm8fyhk3mia3doo6u07tq8yei49rdooo41ho3tuk2n6dufiji8c2jap7bqq0m83lpud9xo1tlpe4m7a7rwnsn58j99qrarrqplk5v49i0nnnfpo6bdtuqex8pvakevc8dql2byoonfcwwzrkn6ro4xjnwi7vu5edj2sme6jhua1k5vjd0f9j5ig8smzihrf7d8grw2g4wxu0n51z62h8pwn1laezjknonuvgbesgzdamd11xepv87f7',
                        isRevoked: false,
                        expiresAt: '2020-09-14 14:33:56',
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
                            clientId
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
                        
                        id: '8fbfc1b5-e1a4-4095-87c9-87b848c159f0',
                        clientId: '3d8be5f7-1a14-4841-a7f6-095f50bbcc6d',
                        token: 'Et rem explicabo aut in rerum ut blanditiis harum optio. Ut neque non excepturi in facere. Maiores sunt distinctio veritatis ratione quis quam. Quo facere aliquid earum ullam exercitationem eveniet qui voluptatem. Atque fugit qui quos accusamus fugiat. Quo quaerat ea.',
                        name: 'q7o9la3q4ajnn91f7a617pg1k570msagl6b0yavh8ke9vw0ayiczl5rtzaeiku491m6cx4vh7eqkvg5bp3m79c72b628fi4uyesofm3blezsw2ulegi4vl7h08um31drlna98plfmpx59fk9swgyw5gr041bz8tu3vi0igp6jmv9axr8v9qd5rkyxuqx70getle86io5ru5aom7jre6r48yk7ayxlmsj9go7ctix8hq7gatwvfdcsps3hh3knkw',
                        isRevoked: true,
                        expiresAt: '2020-09-14 20:01:20',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateAccessToken.id).toStrictEqual('8fbfc1b5-e1a4-4095-87c9-87b848c159f0');
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
                            clientId
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
                    id: '7dc5225e-5c3f-4560-961a-dad97676b7a2'
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
                            clientId
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
                    id: '8fbfc1b5-e1a4-4095-87c9-87b848c159f0'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteAccessTokenById.id).toStrictEqual('8fbfc1b5-e1a4-4095-87c9-87b848c159f0');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});