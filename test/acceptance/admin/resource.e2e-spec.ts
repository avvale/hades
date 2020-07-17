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

    it(`/REST:POST admin/resource - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    it(`/REST:POST admin/resource - Got 400 Conflict, ResourceId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: null,
                boundedContextId: 'ef62f526-feac-4e8c-a9c9-9ed906bb3891',
                name: '637hawuxtffaaj5k9d727c8a2u7h5ajg6ivo4b3xb0h2ry4aws5sm2luvgk94luygtp81bl3qbsynzu4ssevnk6ln83w4apobd9rrg387i02wn84f1x1oqcve7c2m803inwv8y11h3saz6fm224eczuvxrd9oiforrj43f9r57v87hgp3u1k9mmvumd2rhox2f1r2xosvm4zegl5xymy54lobctlkag6hgmtnykv1m4brrlbn9kgaesefx1zqm3',
                hasCustomFields: true,
                hasAttachments: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceId must be defined, can not be null');
            });
    });

    it(`/REST:POST admin/resource - Got 400 Conflict, ResourceId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                
                boundedContextId: 'ef62f526-feac-4e8c-a9c9-9ed906bb3891',
                name: '5qq7io3roub7f1b1psregdvipo2ecwt076rqn3n25dptzjcvrcl9o73pl54j9n3y6vhv56390whcicas4hu9fzp35mqfpdqh6asudlbj0961daw5rt9jpp2of4zvkic5ncb3anqhpr84z87do3ux9nw2w04ngi799zlsrb13pf626hhwb8ag4dqpfs0yson40906h6kpz6k8pbyj8lbyb5u2ov07tiot9ip570903v1idr2w54zm5ckap4bgazi',
                hasCustomFields: false,
                hasAttachments: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST admin/resource - Got 400 Conflict, ResourceBoundedContextId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: '2c26fca4-536b-4ede-a8bb-4a6f0ab83d92',
                boundedContextId: null,
                name: 'n34tp0xdz8gi3aep829v40ptg5gzxm3t69y1n464nk4giuf9hiuhipwkhwacumgv40a2haeesfk15fvn8ukxv0i0i91jzod7v6dqsct4vjx8vz2l6uqvamwvpkbbrbgij8ymv3e91k3kgeflln6rj6hmo6tntb5vix90brzf1lh7syyy6tma9lmy4378vsp7gour82mpn0eexbpjcsnw4wbhshzt6k6z65259pj8nkrdeywltwu8zbav3clq27k',
                hasCustomFields: true,
                hasAttachments: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceBoundedContextId must be defined, can not be null');
            });
    });

    it(`/REST:POST admin/resource - Got 400 Conflict, ResourceBoundedContextId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: '2c26fca4-536b-4ede-a8bb-4a6f0ab83d92',
                
                name: 'g60pqhgu1qzcncxvwk99svtd1rwflo240tvggpzrencp8v8a00ggmu2p7a0wpujg438xg2x1djxzr8t9rnlmomwxr8k2v8axjx7k5z8au81fx0rbn447nqreo0ub888l2jcrcmsfneuhqe741d6jd1v78i5xbeggx8i50bxt72ollersa09uftke6l27uhp37ho6lkckhod6tajmzgftfoienw5at4ge2w10wlppzkc1gb7zwx7lhmcqvki2klk',
                hasCustomFields: true,
                hasAttachments: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceBoundedContextId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST admin/resource - Got 400 Conflict, ResourceName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: '2c26fca4-536b-4ede-a8bb-4a6f0ab83d92',
                boundedContextId: 'ef62f526-feac-4e8c-a9c9-9ed906bb3891',
                name: null,
                hasCustomFields: false,
                hasAttachments: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceName must be defined, can not be null');
            });
    });

    it(`/REST:POST admin/resource - Got 400 Conflict, ResourceName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: '2c26fca4-536b-4ede-a8bb-4a6f0ab83d92',
                boundedContextId: 'ef62f526-feac-4e8c-a9c9-9ed906bb3891',
                
                hasCustomFields: false,
                hasAttachments: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceName must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST admin/resource - Got 400 Conflict, ResourceHasCustomFields property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: '2c26fca4-536b-4ede-a8bb-4a6f0ab83d92',
                boundedContextId: 'ef62f526-feac-4e8c-a9c9-9ed906bb3891',
                name: '1lxfnijrrtfbl9qkin6q2u71k4sun4r25z4dgyg4rf7mm7t275ums2sjcjay6snf7xfdhrqgycr2t02jb9shx3tg8i0blgvdai4vxum44fqr0699w5e4z54m6pegjosewm0nat1of3dns0p17ezn07o7gnk7vi7b1noda2isu5zwtafdldyndz69zxg4mgxenrt49swim5pb79o6d7uunxook3tma61wkufdryxal5s0hmlr6o4f83do61n5cox',
                hasCustomFields: null,
                hasAttachments: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceHasCustomFields must be defined, can not be null');
            });
    });

    it(`/REST:POST admin/resource - Got 400 Conflict, ResourceHasCustomFields property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: '2c26fca4-536b-4ede-a8bb-4a6f0ab83d92',
                boundedContextId: 'ef62f526-feac-4e8c-a9c9-9ed906bb3891',
                name: 'qp3o3y8bzrg8sn7424k08bxcndg0gekc4i1asuap0xe1n7zw0qjmk2tnlqcf63qo3yw2z4kpws0a6lgjizdcyjml7600llcomgi6uf9yyh7rjnfn45q8sv7e10khdbovb9w2kz6wj4b14fheykljh5moxrhsbzfbxfo1ixd6lac7ebbm3uk3f5d6ziwgjb47s4otklb271sstrrio6e1rj37gx4bazb4qqkyz4ibmbr9z2tzex7vyeohy1x2z0c',
                
                hasAttachments: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceHasCustomFields must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST admin/resource - Got 400 Conflict, ResourceHasAttachments property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: '2c26fca4-536b-4ede-a8bb-4a6f0ab83d92',
                boundedContextId: 'ef62f526-feac-4e8c-a9c9-9ed906bb3891',
                name: 'xsois0e79hbuhte4584lw4qklv8z2zzyb50tccvv0wxdosw15l5a4oh1yzl7dty9ig74i1q349d3yzt0do5uw578x4qjjdsvf4aishkwm004pwx3phjjcas8vw6rcap7r9amy4ow8k6h09mk2tqm5qi3bmbzn8vd7rzfajkcn7rkpux2okczy2hry7pb28gpoyuvktwvau92rpokbg2hipfzx11lasmh0hb1l6z1sjebh58lqrcwkor7vzmoe4u',
                hasCustomFields: true,
                hasAttachments: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceHasAttachments must be defined, can not be null');
            });
    });

    it(`/REST:POST admin/resource - Got 400 Conflict, ResourceHasAttachments property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: '2c26fca4-536b-4ede-a8bb-4a6f0ab83d92',
                boundedContextId: 'ef62f526-feac-4e8c-a9c9-9ed906bb3891',
                name: 'x0j1m7agdrrqzn78b0j2x0e0aahvhq86h3akzj3s5r4m22na31qqzcjoyk5v342lw31nf2li6qlrfmdp1b0orqqdhpw8ar53857j9l0jtphve2dhgottmkem888xhh0ptbycd5u8svstv8q94otvh7z1mmtfbr588x0bur6svwmsoia0fpku26j5q8grrwf8g4tobq1g08izco8b49ozkv68iyvoo2s8mfvge753id7dhh0iuvynt67a7gyt80l',
                hasCustomFields: false,
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceHasAttachments must be defined, can not be undefined');
            });
    });
    

    
    it(`/REST:POST admin/resource - Got 400 Conflict, ResourceId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'w7inpq8onzkfvron63nz4vwvrdjrdtmwnnvcd',
                boundedContextId: 'ef62f526-feac-4e8c-a9c9-9ed906bb3891',
                name: 'lpennjl0t083zigsx6hst1gaxi9hc2xzvi0pyx4xwjaw7becgldn9kw8n7ubl9mkevddfstjjgq9uauef79zmbicg6hiuezkus0uiiowrwqr6r1rdu3mromfz3urw5iaf7vx4c0vp7h6nrfpctzr5by3clk6hy2wkzhwptmak148plimpus1yazkgm67ctb74jl7sb41yx56xx2m7q6ax99ej09nfirverz79nz8um6rn0jxm1uafckpm7j40et',
                hasCustomFields: true,
                hasAttachments: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST admin/resource - Got 400 Conflict, ResourceBoundedContextId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: '2c26fca4-536b-4ede-a8bb-4a6f0ab83d92',
                boundedContextId: '4optlly0oh3xe9y6fzfoch19n9hmffa1ofezc',
                name: 'v3qq8nqce9svxl7wzm4lri137618vv8plghx2snxuyicu0nlegpx7bm2g8yqpahncxjpa67h1m34wl4k6trtxl3na3tia0oztez59oh1cj1h3uwv3ubocmh13ztoxtwtg1y3v1nwf2a9kv83vg1gb16cv40jowmqo8o6q7rfrowlwqpxgxjnwug2suewxfw21ljj5qozvjs9vz236m51zdefpd5xg0edidwziz6jpk02jqzj40yzgi0ovrrb0g1',
                hasCustomFields: true,
                hasAttachments: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceBoundedContextId is not allowed, must be a length of 36');
            });
    });
    

    
    it(`/REST:POST admin/resource - Got 400 Conflict, ResourceName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: '2c26fca4-536b-4ede-a8bb-4a6f0ab83d92',
                boundedContextId: 'ef62f526-feac-4e8c-a9c9-9ed906bb3891',
                name: 'y4h9brpyvh2p9c7nnssxpmn9tgal1ddkpl0s7t1285zjt8araz03plun3dvbuhqfmtt2fwcbxulm8yh2ke74vlke1ztnlp6vqb2z4rvfmwi6h0cgst1jtqo65jgh6f9b9qjb7bbmfsc40mrkwxsvku5i8tmj7s8m2f78h04bcb29ucdax914772edjjshjnv02w8uc2l14ktqpzgm7q8o8cpyp6064rosb452as07i0uhi6xnrap3i34i3qjjj8e',
                hasCustomFields: true,
                hasAttachments: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceName is too large, has a maximum length of 255');
            });
    });
    

    

    
    
    

    
    it(`/REST:POST admin/resource - Got 400 Conflict, ResourceHasCustomFields has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: '2c26fca4-536b-4ede-a8bb-4a6f0ab83d92',
                boundedContextId: 'ef62f526-feac-4e8c-a9c9-9ed906bb3891',
                name: 'vu0wtitb6h3ai10zpfvdya7ceo07p8g47a15g8kr26ymsmjmm44an1h3othu72ks8s62be8qa7x9srom72cblypn3i48tyvaki0lyqv4vb15j84pp8m4d11r91x7gvvjy59c7utsyx3564t9faeq3dqwp6fzv8x9asyj39xhf8xd45lu1do1aj40unkr72mca8t4gzgo63ibose12f6jwlfr0l5ympx7pqtw5v9gl78kz9iek6af9j0rrw5izba',
                hasCustomFields: 'true',
                hasAttachments: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceHasCustomFields has to be a boolean value');
            });
    });
    
    it(`/REST:POST admin/resource - Got 400 Conflict, ResourceHasAttachments has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: '2c26fca4-536b-4ede-a8bb-4a6f0ab83d92',
                boundedContextId: 'ef62f526-feac-4e8c-a9c9-9ed906bb3891',
                name: 'qk3t349yr4tlf0sy0yk13mt0d85nmxkza1hjop0w1skl7bb01uqxodl7re5wg5qubvqogxsw01b53ksay4t629ns7dgqs3nalh00dv4rcp8yg9cz2r63byyt5dmujysvckvlajhbospmuf5a44bajcknogaksid3l1ypnz6ai9wwvkftvgd7hv3qqi4civnjrjgs218k6ucrwi57no9xwncnunfrvvnry9ehgcd8x7vd23f89028on7hl5svjgy',
                hasCustomFields: false,
                hasAttachments: 'true',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceHasAttachments has to be a boolean value');
            });
    });
    

    

    

    it(`/REST:POST admin/resource`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: '2c26fca4-536b-4ede-a8bb-4a6f0ab83d92',
                boundedContextId: 'ef62f526-feac-4e8c-a9c9-9ed906bb3891',
                name: '4t0yj3o21pctxab3grkrojwoesxv6si97tj4fmjs26wiokgcnc8hj308z0mv3i7bnuofx9pg1v5xg4fc26exbsemkug6m6919j7n2qzuoup8j36p2fdv2pb1l0kj7nzoq7egpgw4v2ez0ogtdwg0y4lx5l3tw73dclbnnjtlz4oiqovuezwxtve1kppmpcinqw99r4zuc7runvgixb63vhkx56gt970x2yjg42zmda3m92574gfbao5nu67b8us',
                hasCustomFields: true,
                hasAttachments: false,
            })
            .expect(201);
    });

    it(`/REST:GET admin/resources/paginate`, () => 
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

    it(`/REST:GET admin/resource - Got 404 Not Found`, () => 
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

    it(`/REST:GET admin/resource`, () => 
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
                        value   : '2c26fca4-536b-4ede-a8bb-4a6f0ab83d92'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '2c26fca4-536b-4ede-a8bb-4a6f0ab83d92'));
    });

    it(`/REST:GET admin/resource/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/resource/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:GET admin/resource/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/resource/2c26fca4-536b-4ede-a8bb-4a6f0ab83d92')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '2c26fca4-536b-4ede-a8bb-4a6f0ab83d92'));
    });

    it(`/REST:GET admin/resources`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/resources')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    it(`/REST:PUT admin/resource - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                
                id: '160e0590-3c4e-4ac9-a985-b191795f3d00',
                boundedContextId: 'eb56743c-11cc-4e96-8197-d2df9c17ff16',
                name: '0tb0hno8td3rt9jz2v1uybkyr48flolrfsgva0y6tc9dv4tj7m8obnapaxsa5yf9eu2u3ypbr4efkvkvo0sdb3cdeteypwl1buex5gm8zg911p2qfojw664xcyygz70qw6ospgpv378yv6vt5rzhhs0vt9txebfixgyvd9lsg9iltamu02lptrhulianinb8cg0tndkyeldl9pup6ue19w8462ahwrsuvz4wtmdwfkyv3aw7q5sjv60m7bbxxpo',
                hasCustomFields: true,
                hasAttachments: true,
            })
            .expect(404);
    });

    it(`/REST:PUT admin/resource`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                
                id: '2c26fca4-536b-4ede-a8bb-4a6f0ab83d92',
                boundedContextId: 'ef62f526-feac-4e8c-a9c9-9ed906bb3891',
                name: '4n37hbw7cy8gd8o9h9htneppwg47pdxmsy8tq3c3lqbh7fqbn6uk243171etg3s6rilxvwztmfqlhy6dt7xistwbvqzwtj88vtidycg7169fumfqlxpkfwglth8fzf0599zxxlg86cvp3qgtsfhs1ho46gcx73l6jknhttbn95hyuugzhcnbco3z30jjyujx4ivpc7azlrtmp6y02bbsp9gll0a2zk4u2e5v44gw3al8lhm1adxai7v7oi4okug',
                hasCustomFields: false,
                hasAttachments: true,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '2c26fca4-536b-4ede-a8bb-4a6f0ab83d92'));
    });

    it(`/REST:DELETE admin/resource/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/resource/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:DELETE admin/resource/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/resource/2c26fca4-536b-4ede-a8bb-4a6f0ab83d92')
            .set('Accept', 'application/json')
            .expect(200);
    });

    it(`/GraphQL adminCreateResource - Got 409 Conflict, item already exist in database`, () => 
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

    it(`/GraphQL adminCreateResource`, () => 
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
                        id: 'cf773d37-84f7-4d30-8bf1-f752abb63894',
                        boundedContextId: 'ef62f526-feac-4e8c-a9c9-9ed906bb3891',
                        name: 'kayj5sli836tq4q0p0x52rd9kem2enqdm7x598kwtq9vuwcljbis681yys96z9dhj4yysro9oxmfhq2a7zlkc28xgkauhogfxlynq9j7xjskq3lkh8mpz6zptp3w70zt7lpn90rxr9mwwcdsst0dcfbl6ng67hocdy0smbl0ol4j25a2xlv0nkt20y9xrii2tvh86i3rwzaqvo19b4y7af78m8ge1cfvm95pmoawttbl618k30le11jh75s9t4c',
                        hasCustomFields: true,
                        hasAttachments: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateResource).toHaveProperty('id', 'cf773d37-84f7-4d30-8bf1-f752abb63894');
            });
    });

    it(`/GraphQL adminPaginateResources`, () => 
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

    it(`/GraphQL adminFindResource - Got 404 Not Found`, () => 
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

    it(`/GraphQL adminFindResource`, () => 
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
                            value   : '2c26fca4-536b-4ede-a8bb-4a6f0ab83d92'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindResource.id).toStrictEqual('2c26fca4-536b-4ede-a8bb-4a6f0ab83d92');
            });
    });

    it(`/GraphQL adminFindResourceById - Got 404 Not Found`, () => 
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

    it(`/GraphQL adminFindResourceById`, () => 
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
                    id: '2c26fca4-536b-4ede-a8bb-4a6f0ab83d92'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindResourceById.id).toStrictEqual('2c26fca4-536b-4ede-a8bb-4a6f0ab83d92');
            });
    });

    it(`/GraphQL adminGetResources`, () => 
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

    it(`/GraphQL adminUpdateResource - Got 404 Not Found`, () => 
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
                        
                        id: '4eacf230-3941-4f68-8186-05233f856bed',
                        boundedContextId: '5f281fbc-60ca-4060-9646-e3cf97a490b2',
                        name: '6770ccph6ad8ghm5cv2zppl7nby0g4tci8t3bq3j0oogigjw0a52fxyi2egim5ukdgiwu79pthovxg81o826rsh2hqi0r4gmlc5506djr1zsau9tsegxi4e1yumys7et1xefq41fpnifckfqpgi2iy4wegt0ct79nl5lpx72p43muoxy5zojlyfk33ptvoc8h38kpx4begty1aod92l9th0jb2xncq17uu2rwnjvxam4wyyox6pz3i4vdptdidh',
                        hasCustomFields: false,
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

    it(`/GraphQL adminUpdateResource`, () => 
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
                        
                        id: '2c26fca4-536b-4ede-a8bb-4a6f0ab83d92',
                        boundedContextId: 'ef62f526-feac-4e8c-a9c9-9ed906bb3891',
                        name: 'l0g66jvmrbuk8kq6mow4wvj72k1m1joncq7ah0gypfvc2o7hnj1rxe204cd0n8e1tepgav7fm2n46e4hynx2gooc1t19inr79h3huh8pr1fwd5bbe87iqbh8acw2953i8xbibzhxihki4fe3n43n7kiq4keto184rn0d9mxpmav2r231tetwlkxzdemkuanwhih2u0y39jojvkkpr5f4auke6835mbv2khin1g5rbxnkw1f5ct3usrbkqm8pad5',
                        hasCustomFields: true,
                        hasAttachments: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateResource.id).toStrictEqual('2c26fca4-536b-4ede-a8bb-4a6f0ab83d92');
            });
    });

    it(`/GraphQL adminDeleteResourceById - Got 404 Not Found`, () => 
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

    it(`/GraphQL adminDeleteResourceById`, () => 
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
                    id: '2c26fca4-536b-4ede-a8bb-4a6f0ab83d92'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteResourceById.id).toStrictEqual('2c26fca4-536b-4ede-a8bb-4a6f0ab83d92');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});