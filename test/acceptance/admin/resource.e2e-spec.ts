import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IResourceRepository } from '@hades/admin/resource/domain/resource.repository';
import { MockResourceRepository } from '@hades/admin/resource/infrastructure/mock/mock-resource.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import * as request from 'supertest';
import * as _ from 'lodash';
import { IamModule } from './../../../src/apps/iam/iam.module';

const importForeignModules = [
    IamModule
];

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
                            validateOnly: true,
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
                boundedContextId: '4056d3b1-3f02-4d35-bd11-10d5899bfb8f',
                name: '3ickm826xyudsl3chwuevkbxis7oxpygr6nnz531jc6csvqka6aebdr28gbj8ke2jv3p3uxrkt9zfzmc7crlaw6eh3581g2t2k5221tpe06nptf9eeqj5ta1buwtvln6hd83wuw9am7g30a8kcj7bgy7kn418pztn09ud289gtkzmem6mgdxxmhz8wh29xpis0wdxtjelsmsldt7rn004h80vtpa5nh1v2c9wywyetucppmxfcgcpd2cdf7zx5o',
                hasCustomFields: false,
                hasAttachments: false,
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
                
                boundedContextId: '4056d3b1-3f02-4d35-bd11-10d5899bfb8f',
                name: '5ml3fkdjzge7f794a1nizkrds8tzznlpfup3z05j34ie7xhlo2opkx59iwmuy4r7anodywp67hdspgoj9v88cxupus7ikhrn99ty243xj3cc7phby6tbha082r05t99wh3uylvbfgbfb4lny44i1hs9qyh2xr00dkegdlsppja43nocyz0ghwj9c4emy0wonocrr7u28uolkyhy8n2g9b5kfokup831e3rl3ghoc8yfxdgy9gsknura036l8sjy',
                hasCustomFields: false,
                hasAttachments: true,
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
                id: '10c42bc9-d555-4542-ac88-b9f105952902',
                boundedContextId: null,
                name: 'kltaymnb88ca3c1c0k5wv8ru3obz914cttv23f0z3abl9otyvsjte6bdkjiuguk4rs20jnjg2fjih760xh19wrhj9nrzl247446aoq06dhxlkjnrj1tfq9z0pu67zxo7jrpvb16khk4m5nwp0bftfn3teprqr01yth5lcd2n7sx00f69acbdytprpgqz8rretsyo235sh0z1t9v0t2h1d5g6c58ox73bfb9hplawamnpw7pdp0bvc3g1nyo29w7',
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
                id: '10c42bc9-d555-4542-ac88-b9f105952902',
                
                name: '71kgclbzrnyvvh592ec6mawj4blv93riocdg5k5eulne5r1zcp4dx6x34xbtpc1et75ei3p9v7azi87jgkv787hs57h7b1vtev2lw5z2wjteovmxgj17o4mcsuftqdks8b1rpzvclr3ua0za08tdchve6khtrf2baxorifi83os3ytghie19gof487702jkh5d1jjrbzt4tz2rfxbgbtsjss8nt84j8fdan0hc3tvotilrchj5i6d8w0s0uqlic',
                hasCustomFields: false,
                hasAttachments: true,
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
                id: '10c42bc9-d555-4542-ac88-b9f105952902',
                boundedContextId: '4056d3b1-3f02-4d35-bd11-10d5899bfb8f',
                name: null,
                hasCustomFields: false,
                hasAttachments: true,
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
                id: '10c42bc9-d555-4542-ac88-b9f105952902',
                boundedContextId: '4056d3b1-3f02-4d35-bd11-10d5899bfb8f',
                
                hasCustomFields: false,
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
                id: '10c42bc9-d555-4542-ac88-b9f105952902',
                boundedContextId: '4056d3b1-3f02-4d35-bd11-10d5899bfb8f',
                name: 'p3kgv8hsy8v3qqh9gtsr5iapw0gjwwtczmdx8evx9qfskaj1g4yicz2ykucpenbfhpipjnfqyzgfsb7qxiknzg49k3mpsd3eczfvpvoya8lymb7ye84nh0ften1e8gmp6sa04t9wpy9znh8w9pjbi4b69ghbznttdshzhy49l4way1uzwq7tge8s727ya13otlost92pzyfuuohjl03wa2pe3srll3csxsgnv404bpm56l6v4kci14190p15sp5',
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
                id: '10c42bc9-d555-4542-ac88-b9f105952902',
                boundedContextId: '4056d3b1-3f02-4d35-bd11-10d5899bfb8f',
                name: 'ijf4urugi7x7ogx5md0ou4om223m53ot8hurw4k8tho4yiw4t3rgic6iogp4xzpoxrab9y1k21ar4ioxeff8sv82hyaej9zkid6ohbvw0rgzo1q8aofrvgum7kiztyhgfh839n1dsti6d96x5db52yl2tdmhhc1f8ht7arm51eiv64fwnmc9komtqbhea64oxj8irxhus1eckmu2d8h8e0c0zybssmhn9mnw7al5fuc5rlbzee6djkcyy9t5vdu',
                
                hasAttachments: false,
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
                id: '10c42bc9-d555-4542-ac88-b9f105952902',
                boundedContextId: '4056d3b1-3f02-4d35-bd11-10d5899bfb8f',
                name: '2fus2xl5utkt800cejslamvqbb2j8v79xcrexn3mb77lf79859e1yps16y4nlcbdo6zipmzx3ekr9hw83ke9e0wq3trmutcrjfwc1ei22z1qf6acu39zzbz88d0q6dgf4kaftfj1if8wqzw0hmfomgmnoetzwd9xolxhrg467oas93bc2e4riezwc197goppmoabql8quwl6wkbxprw04bo7r2cbl1gwubphbh09jfwk7nkwl16ur7us08tg1eg',
                hasCustomFields: true,
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
                id: '10c42bc9-d555-4542-ac88-b9f105952902',
                boundedContextId: '4056d3b1-3f02-4d35-bd11-10d5899bfb8f',
                name: 'ygwti32lhxztwsxi2cjt0061jfnq17l6pyi37pzqlhdolb2nr5fvxeys07sd00n2elwk77ufrqucjonf6gocah15xlge0d9jtua4u6mq395c347xxlolgv5iuziegd1vymp524tpj1lm9hw8x4iyt6sy4ucewr55lt6um6yy4598ca4tlal0ue4voofo12os4w01a39enw5ri3ks4mp5oy7jhz0z5okguwdrrzei1fm84c2n326qj1qdf3cdb34',
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
                id: '93o7j1sk0cip3pusqw6jg684ysspz805ehrvr',
                boundedContextId: '4056d3b1-3f02-4d35-bd11-10d5899bfb8f',
                name: 'p6ovb8kljuiyik4dofvj5evkojjikx5744ljt3wkpuk7wvc8nz22qxx21bxezzhgga37lm6kx0kdspmx0u5hca8obpnl3ga3pvwaajvsyc5kd9k3zmmlz85p9rs3t3fhxzz4pq61hsl6wdmnz94zjgeujzxauptdcwo22b6r0ixx402swbzuiwn4wwm8cfo67njlmc4m13a84z34kel7rnwg6afu9wshsjohh9on1lwnl5thaa1hwdxu52v6cdg',
                hasCustomFields: false,
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
                id: '10c42bc9-d555-4542-ac88-b9f105952902',
                boundedContextId: '5wbmtpe193fgyoxai1u3n32k9khpzg597zs7r',
                name: 'my7790e0m89e6n3g70ubn0foikoufrfav3ywp0223vyc54rko2zfef3n00cjd097sy7xtbjxneyy33gim3dkrq8wonlkxnu1ygigfioat9pcx1xxzhbv0w2ryohi7bq9zykzw2i3wo6d8n1lditg9ctpo94gzqjyk47fmgnyv6ynyodsj8tq6qe5l4zekqklky2dju40jcg2clsnbxvv94iq8jbcb0rtcrllsmpq32e8k2feh899usug13w22ib',
                hasCustomFields: true,
                hasAttachments: true,
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
                id: '10c42bc9-d555-4542-ac88-b9f105952902',
                boundedContextId: '4056d3b1-3f02-4d35-bd11-10d5899bfb8f',
                name: '7xths64g0n5m6f2t2sqymw1jbmhx635rtz41l77bohw5gc61c13i5kcs1045702d2qeszezjdpcepl566mdufgquttwl3l8mrx1wbmklh4p8w1naz6mj4wy37gp9mml0zeux4jcj21ts4p1o4kogwf4w9txy5bbch0ctcfgsree84pl8f7mjty9v199308j64wxe545itu94wvgg4mujaujb5vamgy7mf6u31ejjx81uukzkhknsxh072uy35wzb',
                hasCustomFields: true,
                hasAttachments: false,
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
                id: '10c42bc9-d555-4542-ac88-b9f105952902',
                boundedContextId: '4056d3b1-3f02-4d35-bd11-10d5899bfb8f',
                name: 'umegtcqvh5vcqyhrryqyihjet7sgbppayqmar373xullmftfrbt5m1vuqyksilsot65oq7n3qgdcbxpdvpj1f5zgtxx7dy33jpfebc476wxn9ihdqwiiox2g8nmaguc6v46qgftnyppywrr0lrypg7m9mmunc1qozrgb9s68kb7bm0lab0a5o56vpvrdbd7azxzfdrgpvvfgcz4ptkugxgi7jh6jph3iu0ab9mnfb2uf70yprjet525xwohlr18',
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
                id: '10c42bc9-d555-4542-ac88-b9f105952902',
                boundedContextId: '4056d3b1-3f02-4d35-bd11-10d5899bfb8f',
                name: 'fzbaxsw2a2jex8of3epuaaiwvo1xvdway9zyom9jedyv3fi33gp6mtio1sd5bebmxfm3yaly16kr9gc4plffcwu3q2hd8ha40omqgcbndvv3x1ybtqfujc42fvvomkz9755hn6ye4s6sn0bhym8kgliuplqvykk4hft4m5sedbeguhoh60mtaftj6grk5k2nxdf9locoxyyoe7n29249o5ompo9p5npa4kzgdexttywihaghrcxqw1zzdj4sgfq',
                hasCustomFields: true,
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
                id: '10c42bc9-d555-4542-ac88-b9f105952902',
                boundedContextId: '4056d3b1-3f02-4d35-bd11-10d5899bfb8f',
                name: 'mh2kz75qo0turma8c1bb5qjv24hvt3jugf2yutetqmx9podr1rdw29vfpolx08iquww248k649btsixyu41hczohbpdmkudz7i1e9plxl1w7v52i67qg96u1gqtrfkojn93nic1mpiet2a08wfkv2j09f16ayoyme25uwhgwe81drumhrve4j3taez6bkd011fy3eg3g73664iqx9qu0lzexn0zbv7hr5030kfd75r4bg9qs53x23ypfaym32er',
                hasCustomFields: true,
                hasAttachments: true,
            })
            .expect(201);
    });

    test(`/REST:GET admin/resources/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/resources/paginate')
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

    test(`/REST:GET admin/resource - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'b7b6a842-bc80-4fcf-8953-b4035d9a0188'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET admin/resource`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '10c42bc9-d555-4542-ac88-b9f105952902'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '10c42bc9-d555-4542-ac88-b9f105952902'));
    });

    test(`/REST:GET admin/resource/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/resource/3ac69ee8-ce59-42d0-b296-254bfa6c3b53')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/resource/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/resource/10c42bc9-d555-4542-ac88-b9f105952902')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '10c42bc9-d555-4542-ac88-b9f105952902'));
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
                
                id: '64e678b8-45df-4013-af04-23f7ae169c04',
                boundedContextId: '99f7fb7a-06da-4cfe-b816-186a8610ffb2',
                name: '7pdz6csytd44ikqev29jqa3lhnobk70smyss77y85bz84tn4cz1kxhbe9rxcz1kbgr1j9hgw7k45pzs9voa5r2vntrj3198rzuozq9h253iabkl21k6p2bse0f1xb19qpxcq2p9edsvyw5axqlqqm66duayw1j2jit13zusgjm8rvkwjjkv4fn3hwvfwj13humzie8vfpem7li9nipobzxo4tsmt5aryev8n5hu887pzuc4cjeerm9x10h1db16',
                hasCustomFields: true,
                hasAttachments: false,
            })
            .expect(404);
    });

    test(`/REST:PUT admin/resource`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                
                id: '10c42bc9-d555-4542-ac88-b9f105952902',
                boundedContextId: '4056d3b1-3f02-4d35-bd11-10d5899bfb8f',
                name: 'uvhsd30sv6x3patgaw038acnv7duzuzdkynar52u38l35wrxdun75pldlet0vw5816jihou3argfq53bgj2i6rvjdi9tlygn1vpg2zymb2kl9cel39dd6ak4yroyf7zpzsakvfjgcjcuzn1zl6mdffe92ye9mpypgm1lb186cj1a31pje8zr6570fj9re6qdcy560trh983k2omsw028l2hxrclf48csl0g0n4nv8q10dfhm808r043d2ul6ma2',
                hasCustomFields: false,
                hasAttachments: true,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '10c42bc9-d555-4542-ac88-b9f105952902'));
    });

    test(`/REST:DELETE admin/resource/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/resource/848ce266-f260-4b2c-b1e1-01d93c69ca2f')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/resource/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/resource/10c42bc9-d555-4542-ac88-b9f105952902')
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
                            name
                            hasCustomFields
                            hasAttachments
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
                        id: '2be750f8-6819-4bfd-bab4-cf8dff27b6a4',
                        boundedContextId: '4056d3b1-3f02-4d35-bd11-10d5899bfb8f',
                        name: '873vz474smjxb1fxvqfzo040nhywl4pdnc4fvufx6am0ub3lgzzk273aaqwh234utezjnpqjydht0ghrfxg6vh66oeureo49vn6y20z3m4tgxmi4tcc2a1tfibcqhtg8tgx0rpw6xcqqf177yb446vxdxdwuza69e404txi5b552qclgs7q8dqurf5uv8amq4mqo4y80nspjb7uwzas34j095ilmaf9mn4j794mvbc1zrqxq1raj7n89tc8k0qt',
                        hasCustomFields: true,
                        hasAttachments: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateResource).toHaveProperty('id', '2be750f8-6819-4bfd-bab4-cf8dff27b6a4');
            });
    });

    test(`/GraphQL adminPaginateResources`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        adminPaginateResources (query:$query constraint:$constraint)
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
                expect(res.body.data.adminPaginateResources.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateResources.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateResources.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL adminFindResource - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindResource (query:$query)
                        {   
                            id
                            name
                            hasCustomFields
                            hasAttachments
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
                            id: 'db8d41c8-f579-4a67-a248-7920108e0549'
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

    test(`/GraphQL adminFindResource`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindResource (query:$query)
                        {   
                            id
                            name
                            hasCustomFields
                            hasAttachments
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
                            id: '10c42bc9-d555-4542-ac88-b9f105952902'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindResource.id).toStrictEqual('10c42bc9-d555-4542-ac88-b9f105952902');
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
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'c8953e1a-3003-4b48-bf1a-035d79891b13'
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
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '10c42bc9-d555-4542-ac88-b9f105952902'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindResourceById.id).toStrictEqual('10c42bc9-d555-4542-ac88-b9f105952902');
            });
    });

    test(`/GraphQL adminGetResources`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminGetResources (query:$query)
                        {   
                            id
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
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
                        
                        id: '960f65c2-8897-4f04-bb0f-b843f0f2cdf2',
                        boundedContextId: '55127c12-93cf-410f-8baa-0a727fb0ebea',
                        name: 'y00th4ju7yik5yzjr59ah5w0w0rg4kfxggkk1c128yxzebqtjqs2lnvhj84v3xjdb6o454pv7sjn0gdodzlpuj3x1yqjlgz1kmasmslfg0uomx4rhburej06iz7vv870hwhk8vlur0zfdj2igpfaj2jxv77h0i5sooofqt94d0d9n5fd51o1sif9w02bn4ip6qca1k9162mwh2f0p7xiwnnadg8n6tc866xjjjco2g8hf2klj3o4cku6q60ftt5',
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
                        
                        id: '10c42bc9-d555-4542-ac88-b9f105952902',
                        boundedContextId: '4056d3b1-3f02-4d35-bd11-10d5899bfb8f',
                        name: 'va7u55ycovefd1wcsskoyqyuji5y5t7quxzwx9hs6ts15lsrys77voeclvofdmfegamkd969829nos7ya587rxh8i6r61lpei5tvt85molzrcf70vdcgz7ldhnj7o9gxnj54rjb0wakpc0rxm7dnxgwm00l2ewn3siv8dwxbezbcttfx8y9lt7ax0xqzbwm26wqzji2w6wddr4zxfeqtvyvdrxajx5xuzw1f70dmhhw8qyc8vss3albj5faa2n5',
                        hasCustomFields: true,
                        hasAttachments: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateResource.id).toStrictEqual('10c42bc9-d555-4542-ac88-b9f105952902');
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
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '14c98f55-560d-4ddd-a0fb-a9baa973e65c'
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
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '10c42bc9-d555-4542-ac88-b9f105952902'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteResourceById.id).toStrictEqual('10c42bc9-d555-4542-ac88-b9f105952902');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});