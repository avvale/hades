import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IResourceRepository } from '@hades/admin/resource/domain/resource.repository';
import { MockResourceRepository } from '@hades/admin/resource/infrastructure/mock/mock-resource.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('resource', () => 
{
    let app: INestApplication;
    let repository: MockResourceRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    AdminModule,
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
            .overrideProvider(IResourceRepository)
            .useClass(MockResourceRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockResourceRepository>module.get<IResourceRepository>(IResourceRepository);

        await app.init();
    });

    test(`/REST:POST admin/resource - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: null,
                boundedContextId: '8b3cb4a5-c55e-487c-a024-fc9c389fbcce',
                name: 'zfi05u6i53jenw3bw9r56bz4rvs6wvuniic8sf5xb1bphv7pqq57l6rrxr6ecqnfw02mcezo5ykccgo89koss3drcanfwutfrygwug580cqlxz9ivqfqjao8by3a04rhrd88pnh0v0r7schp6mtfso3dgdf8804noiu15k4ski046culbjvroi6ofmhjl7sucffouh27jezd3311zboauevn7pb3b2ikd8pblv5dnr06w400nrrcqn4e24334am',
                hasCustomFields: true,
                hasAttachments: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                
                boundedContextId: '8b3cb4a5-c55e-487c-a024-fc9c389fbcce',
                name: 'h5dczbydn2tzkift98dbdxzny1d3pheyinwe86rjwj5aq6likvlx0ucm93jxveauc4t6zc827qcvc8bp6m5i4kvztk5dee0dlcfl3ox9956isxkezs50pl4f477y5q68ogdgwau10r8vc50ollzv6oy2xzgx0n922n6fvawpwvkgftf8rjij6p72flibbmufdcnlcsmxpcdk9iirk0rs2i2wgs4vh7blkzey6nwpx509wek23fcuovq8ki0ix3w',
                hasCustomFields: false,
                hasAttachments: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceBoundedContextId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'e6fca3d1-f082-45d8-acef-1dc470294220',
                boundedContextId: null,
                name: 'ejit5te8nrgeo0wleepwvt02gbyvhqf2ophuyybypbos03mf35nd8ela500eh5xt319g9aqi24obsdea9yykww271e2plpjesbvgwtxwgdhzlsiyqxab9et9pgabx3grvzth93rec1srsu793uytg2w2rmd69cv7h31c99wq73tybpdt5smpduykg7kotusdmjaqxpuw0vnxm9tmc6xegst4uolx98zz2saoy6nus9h0gl5yo6yzd5rz9xda22j',
                hasCustomFields: true,
                hasAttachments: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceBoundedContextId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceBoundedContextId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'e6fca3d1-f082-45d8-acef-1dc470294220',
                
                name: 'sqmztn1h870f6x5qls04ob635hkaxxc54mdqy3yigwmuymcssurqjons5tabr32ikhgle6wurpzbsspzibrc0nas7d07eucwpawy0a3cg3qcqmd6or4gmrv04vajb3t5uoy6zysavcgxj7ediri5ogcdtw1a6yvt89g6da6rq0nd5j9369bcni4r7o4764lyoxz3qdr6nh656jj3xz7kcsfo163z0b68i6w87p9vyevu8kj3ty9gzu8charvfj5',
                hasCustomFields: true,
                hasAttachments: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceBoundedContextId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'e6fca3d1-f082-45d8-acef-1dc470294220',
                boundedContextId: '8b3cb4a5-c55e-487c-a024-fc9c389fbcce',
                name: null,
                hasCustomFields: false,
                hasAttachments: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceName must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'e6fca3d1-f082-45d8-acef-1dc470294220',
                boundedContextId: '8b3cb4a5-c55e-487c-a024-fc9c389fbcce',
                
                hasCustomFields: true,
                hasAttachments: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceHasCustomFields property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'e6fca3d1-f082-45d8-acef-1dc470294220',
                boundedContextId: '8b3cb4a5-c55e-487c-a024-fc9c389fbcce',
                name: '9nch87h32pnsw9s92dn908qofmzhw57gwipemr1os0lth13jaubaa74mg1s2gpfhmsrst8ko5oklwatz87kvn2zhik57ows24o0g7owtdarf2u103y92lqhn1u7c7zid705z9oqzs49fote5p96wugxf38fihuz27ob7q2kkzptzfbw8pl07nyyihzj7nctv41kzyxemm054yvtmy7qg6x4mo5ghiv462becc1k2t9j6p7h93neqa5j0773x826',
                hasCustomFields: null,
                hasAttachments: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceHasCustomFields must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceHasCustomFields property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'e6fca3d1-f082-45d8-acef-1dc470294220',
                boundedContextId: '8b3cb4a5-c55e-487c-a024-fc9c389fbcce',
                name: 'nqbfnn2dljevudtokyer4deqhmgqh0zz6nyyxdkwkvhfud57dmisn5u5mwdt5bpjgk2r8t84l9gl6hijkrji124qc18f6ekcsp5sm7a6lum13dtty04e8wsb7la9o2pkikmg56vey4rpjg5bg591lqbylezbvm6rzsrd9jwmjnol1v0tnkn2vdpghd9mymnuqdmpmmxbfaub4lbribijtkqu9wsqvjgw83w0dviogiryceow8wbfzgdkcba7wb9',
                
                hasAttachments: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceHasCustomFields must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceHasAttachments property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'e6fca3d1-f082-45d8-acef-1dc470294220',
                boundedContextId: '8b3cb4a5-c55e-487c-a024-fc9c389fbcce',
                name: 'r82gwqx20joxwr9iv4u6hh980459rmijqvjnm4v80nqfd8hr6vjsslqlgfam0xw93l34zpy0vtdfx48ctvahi1gw11szo9e086zqaf2fjq8sishaf4w9g1ollxeu2l6xz1wv9wgjl93y1vjtfnhelyhpxxbogxst77dp1hoco3r47xo9uucn792orqfi0jglw6l2l52hr8taa4a52fz6ei3wnnze8u5hu0aycac6pirq1o21jznr6nnkdqgvd0b',
                hasCustomFields: false,
                hasAttachments: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceHasAttachments must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceHasAttachments property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'e6fca3d1-f082-45d8-acef-1dc470294220',
                boundedContextId: '8b3cb4a5-c55e-487c-a024-fc9c389fbcce',
                name: '2umjl86omase1lv1sjx2ku2yqbfac5ttlcq5xb4cdtkppcivpt3gp38wgqz3fumjdxtf03ffr868jekqxp0plqik4iyvlmhlnxnf7c2uw79xk4lots8armfbbsii9atm2npkhwbz4wseh8kexll50023hvi6w2nxbys3kwsc86d12qyyv5k9y7e5tv37snxj7vppt6ncjrxjc73mte2akodxnm01bkuy6pzvh819cf8jcglu6vbyc5k113scvz9',
                hasCustomFields: true,
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceHasAttachments must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'xdt5e6jo5zc46sirw4loa8ft4jmk6nizcfkob',
                boundedContextId: '8b3cb4a5-c55e-487c-a024-fc9c389fbcce',
                name: 'rwtttha4jgq50edub89pjvvkuagfmcwgxbruiwnz2vlkjrltb7hzx17ge91g18eyl8p8ijq3zlhntvyvjr273388jwcm1gpqttzkdfw4f1z3irtl15l3kmpf51s21im88zqkxn5iiwf4jvhu8qa02cyctf7krq82cjhrepur598ywmsghw94obkw44pbn3l7mddj7g5n00z8btu7k17t16gdjuqs33af4kdihf32cmcq7y78xe7f3riyxjqrwpu',
                hasCustomFields: true,
                hasAttachments: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceBoundedContextId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'e6fca3d1-f082-45d8-acef-1dc470294220',
                boundedContextId: 'u7tbj53utfypywgyym5wsdu841k5007hgiokd',
                name: 'is28gkc55qpiz3q0lownlponxphwu6a4j3pxsrcqb9jt8yoia0rmc0yclo6401y3pqwa0us9tc8vg13f8i26fzvy3t41zmacrhc9oed2l4qr0zdb8npnjshhikq0c8i8n2dgdi2a4i4johzcte0dxer41tgyctb8bzinmqbp8udjno3csy4ymy8u9zga34yr6g2ixal1wi2vfm64hf2cag1ecb14byl4evtwg3hkfv9epd2synn05ehv19ds5tz',
                hasCustomFields: false,
                hasAttachments: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceBoundedContextId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'e6fca3d1-f082-45d8-acef-1dc470294220',
                boundedContextId: '8b3cb4a5-c55e-487c-a024-fc9c389fbcce',
                name: 'd1bg06de78o6hj0ocerw15f9canpr8v54bw6wkc27qbjj1qrk6mata5jivxredg2d9m6ormqjo026s6i9s43q3x4eutanshkx0zasn18x76xd4bb0ace1nnknyjfky58en3p3jgaigd760f7uml5f1faeqo0ti6e7pv4tpxxloiui3mujjt3qnxayq5xnbefjo1g3okhapuyj0x6nezuzbksjoykd9xyomhye8o1ffksk2fpveezwplh0kv46i3l',
                hasCustomFields: false,
                hasAttachments: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceName is too large, has a maximum length of 255');
            });
    });
    

    

    
    
    

    
    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceHasCustomFields has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'e6fca3d1-f082-45d8-acef-1dc470294220',
                boundedContextId: '8b3cb4a5-c55e-487c-a024-fc9c389fbcce',
                name: 'w8clej0941y5qa6r0ayspei30dze0zdsi2uijm74u2m0xig8v59uurmcxd4tdcpain7lwg6ncif9y6vrej58enfj5v1ebqa7lal4doy5dj8yx1w7hmi15s81rn79enmx1fmqr1r9gibdzjruaoc5xjks0j87pht66i3tpn1yyydnntyhi6dkyakcxte2bza34zgv59pfao5xj8kvn9xzxj0n75vlbeqm5mly6utjechj0jz09ezw80rjjb84n6i',
                hasCustomFields: 'true',
                hasAttachments: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceHasCustomFields has to be a boolean value');
            });
    });
    
    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceHasAttachments has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'e6fca3d1-f082-45d8-acef-1dc470294220',
                boundedContextId: '8b3cb4a5-c55e-487c-a024-fc9c389fbcce',
                name: 'tpia2vptvg8e6pblj5p8lgb0rcnbcdq65zz4h7bgwq0yvay8v3gerjsdld6c71o17jujlhl6qi67cacow5qpbbtx14ju7co4998iorbjl7hz1am1gw50upromxen0u569opprx2jys6xofebub8fphq45hvygazu3sf88hw52cqo4ikym4nh39ssh5ugf49fg4dalnuo4ozj9hodhwhyq7iqai523cwenq51e0ernfvhxb83le45vf7z8thtoj8',
                hasCustomFields: false,
                hasAttachments: 'true',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceHasAttachments has to be a boolean value');
            });
    });
    

    

    

    test(`/REST:POST admin/resource`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'e6fca3d1-f082-45d8-acef-1dc470294220',
                boundedContextId: '8b3cb4a5-c55e-487c-a024-fc9c389fbcce',
                name: 'g7buttum3afnsdyjfukfveamt92r4ezvcdxpqupn2spzs8dqkh4p0y1nuir3ksedcxte2jm40ye7237cafpkcahyb8cgldsnw0svt38mi14ule9vboxq6nxzgr457ehh37c75tz7aq4ez81xpuzfbrve2hce4cebjk1kkezds7l10ytfspwsfiscijdvst0tyv6rvp2uxe7pfwqeahncal8x1cnz4gqulcqxd6epf8gngfexjm0f516qgrfd3h4',
                hasCustomFields: false,
                hasAttachments: false,
            })
            .expect(201);
    });

    test(`/REST:GET admin/resources/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/resources/paginate')
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

    test(`/REST:GET admin/resource - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '00000000-0000-0000-0000-000000000000'
                    }
                ]
            })
            .expect(404);
    });

    test(`/REST:GET admin/resource`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : 'e6fca3d1-f082-45d8-acef-1dc470294220'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'e6fca3d1-f082-45d8-acef-1dc470294220'));
    });

    test(`/REST:GET admin/resource/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/resource/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/resource/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/resource/e6fca3d1-f082-45d8-acef-1dc470294220')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e6fca3d1-f082-45d8-acef-1dc470294220'));
    });

    test(`/REST:GET admin/resources`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/resources')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT admin/resource - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                
                id: 'f12944e4-a1c4-43e4-988b-bad3cd3fbcd6',
                boundedContextId: '1dc9ba02-50ba-4527-86ef-721a17a9aeff',
                name: 'udlwhan30w5gfbxe08q53ozy9efpwgxlwhb6wbbgscufr6mqd47ffx4oiluwgke926zyk6tmzb6kh7idqsxya0lu2qom9hhghkiarbjpq5mw70514fd2wivz3uye4rkon8igzvec34akj4vvz8lgca13p4b3ir00a23vy0isbzb65l7pra9unscmi9rvjr69cbfkpm56wmcahgjv5y50r7a8uipdfilzk1gokli3qb1tjnjrj575cq1kitgsf1c',
                hasCustomFields: true,
                hasAttachments: true,
            })
            .expect(404);
    });

    test(`/REST:PUT admin/resource`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                
                id: 'e6fca3d1-f082-45d8-acef-1dc470294220',
                boundedContextId: '8b3cb4a5-c55e-487c-a024-fc9c389fbcce',
                name: 'iupy14m6baqc1xpxdf0jv129wizc41p0m3webqx8ow7mbexnj7ke81ic5d8tsa969rp8lczpuw0m45ix8405c4hnl5xqbboon8bm76aqw4gvxvlju9dhiru42ifm9nbgyq42ghgyd5c6ah9an7yi7bf1gixsqb7a16z4xmrvg7j3ptv9v8d9eq13iho8d2w8xav51tvj4pqin9sadenwg3a0mr2fyukiufsqm1qeu7s0cmmwp741v2il7764ui3',
                hasCustomFields: false,
                hasAttachments: false,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e6fca3d1-f082-45d8-acef-1dc470294220'));
    });

    test(`/REST:DELETE admin/resource/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/resource/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/resource/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/resource/e6fca3d1-f082-45d8-acef-1dc470294220')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL adminCreateResource - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateResourceInput!)
                    {
                        adminCreateResource (payload:$payload)
                        {   
                            id
                            boundedContextId
                            name
                            hasCustomFields
                            hasAttachments
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

    test(`/GraphQL adminCreateResource`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateResourceInput!)
                    {
                        adminCreateResource (payload:$payload)
                        {   
                            id
                            boundedContextId
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '7fa57e34-6ae6-40fb-b4a0-482c77bd9fbd',
                        boundedContextId: '8b3cb4a5-c55e-487c-a024-fc9c389fbcce',
                        name: 'jq7624mv82hf8h3xkhvizp4tm4kvbiujld2xbt199al82q10l43051oue10gv4gzp6s37lkyya9vz1a7uz8eaavw2jno1jtiytrhitl95qqs7x7q2jjilcbxyeuqbyzwrefn9xkgx6546id0hckvc5vz6o1ucxao2jr0azivojxzaj3ulkfk2bryh6tqak19apcxh7nwrora384b9t8mltjim57tdno69ukcojm4hnpe7rzvq2v02ms1gmph2tl',
                        hasCustomFields: false,
                        hasAttachments: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateResource).toHaveProperty('id', '7fa57e34-6ae6-40fb-b4a0-482c77bd9fbd');
            });
    });

    test(`/GraphQL adminPaginateResources`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        adminPaginateResources (query:$query constraint:$constraint)
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
                expect(res.body.data.adminPaginateResources.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateResources.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateResources.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL adminFindResource - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        adminFindResource (query:$query)
                        {   
                            id
                            boundedContextId
                            name
                            hasCustomFields
                            hasAttachments
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
                            value   : '00000000-0000-0000-0000-000000000000'
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

    test(`/GraphQL adminFindResource`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        adminFindResource (query:$query)
                        {   
                            id
                            boundedContextId
                            name
                            hasCustomFields
                            hasAttachments
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
                            value   : 'e6fca3d1-f082-45d8-acef-1dc470294220'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindResource.id).toStrictEqual('e6fca3d1-f082-45d8-acef-1dc470294220');
            });
    });

    test(`/GraphQL adminFindResourceById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindResourceById (id:$id)
                        {   
                            id
                            boundedContextId
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '00000000-0000-0000-0000-000000000000'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminFindResourceById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindResourceById (id:$id)
                        {   
                            id
                            boundedContextId
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'e6fca3d1-f082-45d8-acef-1dc470294220'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindResourceById.id).toStrictEqual('e6fca3d1-f082-45d8-acef-1dc470294220');
            });
    });

    test(`/GraphQL adminGetResources`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        adminGetResources (query:$query)
                        {   
                            id
                            boundedContextId
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.adminGetResources.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL adminUpdateResource - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateResourceInput!)
                    {
                        adminUpdateResource (payload:$payload)
                        {   
                            id
                            boundedContextId
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '4b572a48-2409-47ea-ba1f-6b91724adec3',
                        boundedContextId: '39499f77-f06a-4c90-89d4-4d7765cb3e61',
                        name: 'mq18kvw4kgputt65ajqv1o19yxzdqn522nlw9cv45r9bs0ezcczfvnjfqf76k3tebda02qt3di6pkcxu8p6uwveaxbzskc50dq6wsrmd3xqp3mlg4jhvn2cugg3qk9s3poh1hk2rnzrn1dikgyx81shhth6vudq5lcmahc1uz91m7lju61bah86z9gk3m81j6k1jzgdsp5t8nucxomgpkesj86vzwgycqxppqpemlad224uwnbtzs4p8uppl09p',
                        hasCustomFields: true,
                        hasAttachments: true,
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

    test(`/GraphQL adminUpdateResource`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateResourceInput!)
                    {
                        adminUpdateResource (payload:$payload)
                        {   
                            id
                            boundedContextId
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'e6fca3d1-f082-45d8-acef-1dc470294220',
                        boundedContextId: '8b3cb4a5-c55e-487c-a024-fc9c389fbcce',
                        name: '4wrtp1l8k83n4s9cwek3zno6wq7dfdu0gtwy3dzfxxr3wd8nkl6xjybq47vwd85eczht93kyit1jhymxstvp2c33z7mblrk7ah5aazygp8w27azt4c2t2a6g6uu9wmkg2oxcoye22eef1nw64c2memmkrcdym2lxgfdqvzf5r021iwwc1p8golr2eygydyrlvjv2ir8r8flu9bb0mdktfteyf1y5qe11r966gl95biz5cki7kxugsxk2629es5w',
                        hasCustomFields: true,
                        hasAttachments: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateResource.id).toStrictEqual('e6fca3d1-f082-45d8-acef-1dc470294220');
            });
    });

    test(`/GraphQL adminDeleteResourceById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteResourceById (id:$id)
                        {   
                            id
                            boundedContextId
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '00000000-0000-0000-0000-000000000000'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminDeleteResourceById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteResourceById (id:$id)
                        {   
                            id
                            boundedContextId
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'e6fca3d1-f082-45d8-acef-1dc470294220'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteResourceById.id).toStrictEqual('e6fca3d1-f082-45d8-acef-1dc470294220');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});