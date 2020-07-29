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
                boundedContextId: '4f6e89b9-a871-4aa3-bfd6-427dc76c3499',
                name: 'moaj4w5d556m996qr2wpipnuwov8ctr0bl3yifz3zl2rm1eyip2wa9aq8cgnd96432et9ce85vgkvpuqo7pfwd1p4h2jl4t4nkrwhewbnw69a9ln23hl45fnwvm8e4b36kx0k3dq1zj61fuqqd6r616fxqrjpwo02ptnlkmncqshdgt9q35che59mpk4o6tii8kql6nr7qtktrmtosgti58a22wygzssqoiaize4oftdn3gh9st9kwf9mndgvxr',
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
                
                boundedContextId: '4f6e89b9-a871-4aa3-bfd6-427dc76c3499',
                name: 'teo1chc1mlz14ro3la9ygob6hyhdifgmvfr6lqcaew8bj8ameg3tbm4qu57fwkp978txi9ex0x17cwtrwkwyhzewdthhprbvlyhs9r91ri4jrztwoz9krmnn4xe8pruqsfze47o7f513ndhqdz6psb97nvelaa8t7cowokbicf23890biqwe9prxmv1jv3ri2lq1v6uzzmi793gsb963uw6z3i2tsp0605aeso58kyvv8vz2sqixoj064qck0qm',
                hasCustomFields: true,
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
                id: '82de173d-4131-41ea-b965-15c2ed26f75c',
                boundedContextId: null,
                name: 'v8tgghalktuee2bdnxnuptmysn3kvu0lkab1yo7xtrmbpkc8r1j0qq3e1a9fvkshiuocyxfwyejdt8d1vcg3dwcpa3xi38uvpmdq1rpz50s44gvuqgdvcgeu2sm74j2s0vuqzfgclvooj6ihfcj9f0wuo5fr4kv74c9enckxo4hqt7msjssj3wr047fv7k92ka936oumlwuxm7dwwliox9ij1ykzwmfxzjcus5nhv8vxq1gp2pu0syjpz2qlbd1',
                hasCustomFields: false,
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
                id: '82de173d-4131-41ea-b965-15c2ed26f75c',
                
                name: 'joknpbxajh8q2bsaffc0osvvi3acangv4h3vc1vno63khnuxsflzrifqtear4bwoul0oyd8penyj5wtaerv0p233g7bx1f0uo1s9ehqj3qgbwgzgh2jwtgxz8jxxtpgbe96b98prfgq1blmelv64lvifss55dc0zk9uj473092sxket4syku4uyxwi3dh2wc9cl3ojqasnetb2chi59n6o661gg0ydlq7v93fo7ub3100xrnsl14jh4se4l9syu',
                hasCustomFields: true,
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
                id: '82de173d-4131-41ea-b965-15c2ed26f75c',
                boundedContextId: '4f6e89b9-a871-4aa3-bfd6-427dc76c3499',
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
                id: '82de173d-4131-41ea-b965-15c2ed26f75c',
                boundedContextId: '4f6e89b9-a871-4aa3-bfd6-427dc76c3499',
                
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
                id: '82de173d-4131-41ea-b965-15c2ed26f75c',
                boundedContextId: '4f6e89b9-a871-4aa3-bfd6-427dc76c3499',
                name: 'wp9draqa0e8pp0m5v0blceym7vy9ou2i60i6f5e5a4ytddscnbjyif00rhr3wn2x9s7fh5eghd56fxy2gio0rak6r6dvky4zi6f73rzx51dvq4z76lmlcgfl0te1bv0rvj4er3itfofmhkbumyncurjt6vkq109kbpmyxqa433tg21nvll6ol0aqp2c816an3em1epcxem6davqbglbxsd9n739koll5retzo7201v9ti6nrhik1ukbeap5kk8g',
                hasCustomFields: null,
                hasAttachments: false,
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
                id: '82de173d-4131-41ea-b965-15c2ed26f75c',
                boundedContextId: '4f6e89b9-a871-4aa3-bfd6-427dc76c3499',
                name: '1pa8tykf5ccca6ww64ytpdz3eshmozpbaf50den99lto38uf53arvc3inucaenmg7o5tbm61qh6hgs2fsu8gzvx68an21jdzisbi3dcpskwhudetqlcgjwmhb99mglfx3rb27xs4iwhn0pwm49yhem2m93j9sgwqo1wjbvl7i1rvipgau7wddwgvufb4zr9zx3hq02apifa0evx6ukpg55obeqwmv7z74y5z3dvjoihmwlid23yq20expnqdvz5',
                
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
                id: '82de173d-4131-41ea-b965-15c2ed26f75c',
                boundedContextId: '4f6e89b9-a871-4aa3-bfd6-427dc76c3499',
                name: 'xmvr1ck43rwzusjg3mprgxzzjgfdi4xkqj888awwo9otbwux66zkh3e6fjxogpw67xup8f2ooriw359g6eyqrahtzzizsacmzhn6y26fsqknw3csqfpytd8yjnpf00aq5kflywjosb1sqd220u211bio8qy2m3vhbygbaj2wwfn2cp1gflz85e9m7t6dy9mzxuw9d6nz4h55lh901lx75tueq0jzmel8qf0gbhrcs3dekr09xxviywp0der250u',
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
                id: '82de173d-4131-41ea-b965-15c2ed26f75c',
                boundedContextId: '4f6e89b9-a871-4aa3-bfd6-427dc76c3499',
                name: 'dt4xwc8d0qj9ktg6g6k590cabwvxvq8ugekpwwbpmvwn7s1irbix0ajsk53brpcuvt3t8hks7dn3gbrdzfgl1erqmdx0krunpdua1x107it1t21xdv2jp3c86g6qrm6uuu1pcqe5isr8n9dv5d328g9li5f2pdni7uejkqzsb86fy6vhyjrqzuc1bv2s5imbhg10amlul69898fe7m7c6o51l1hln5qj06yiiy3zxbago86gvereaa1yhmlqdb9',
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
                id: 'a3rxcu9akhcev23adr9q4ioa32i95jgiiadc5',
                boundedContextId: '4f6e89b9-a871-4aa3-bfd6-427dc76c3499',
                name: '5wn7uzti92vhe58pqwv96r4h7unaqnvpox1rv0wo4ufm38msjlqulmoio49vyw5bbz4mcswjf3oqsantrr3q1qdr3xedpptt9v7lghm1u1vlv3gk9jwgajkj7ge5c4o9m2jchkqfbwn40a9yq4r0w279jmttyv7jzrjeiped6353gtkrfyzqgw35709214v72hkpwljtddd3b06355w846ivicunp4832et0xstszzredjtoooisizsjq1f30xa',
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
                id: '82de173d-4131-41ea-b965-15c2ed26f75c',
                boundedContextId: 'g972vs3ob2z64oaht21wqaejzsbtbp477vfad',
                name: 'tlj4duttgerq0behouvmlytzc01jbfx6w8xcs63ln0amjoc2ezsdd5he39oulj7rtg5aifn5qeihokijphgkmt50998kcslw1f6mzmizs1ara5ctak3f36bbw2a2gpel0cubgciag0cwfesn9xge4yqjsiza38ra1ftkg80xoohieppraqfj8ebizwt6zhgj72r8x1ewurg7lrugjz1xy76xd0o4o8mxmvxlghcljzuuq3okzpz6fyt8d18qzy2',
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
                id: '82de173d-4131-41ea-b965-15c2ed26f75c',
                boundedContextId: '4f6e89b9-a871-4aa3-bfd6-427dc76c3499',
                name: 'su1bdc9b35n3mqhx9xrijpnlfny0ay3t7n6a9grca0n36t8b5xk2o7495q8ovcc2kyg1q5gad7m80mx00a5alcmo1tt69nq7zcprqjhkpmqozfbbjicyru190nsgek7w9yzz5yy0uo7801st33rwjznp9fo0n4liz4rsaxbsxfijfsvja1ap2ddausbw34f05atwk0ojt26ew3jbjlwmiepsrkzxj591ooyojy08py9ywld06tajcecmj9hf7km9',
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
                id: '82de173d-4131-41ea-b965-15c2ed26f75c',
                boundedContextId: '4f6e89b9-a871-4aa3-bfd6-427dc76c3499',
                name: 'ql7uwsoap7k9a7yxro61pjkuoz4n1zx82s323f5n2jw891vcve7gao16vvzkr4js1t4f51qxrfv4m9k0vv5dt8i5ibpyw7yilvhulrths244uewj19lhug4ixmrv9wmdafklhhbzvujbrrta4usr1ce2b1u4qe6llya5etk7kpuv27sald1ywvxeus7lbl4afdqwqcmx06l0bhk3lfub4188e4q3lwnblz8yrfb45uzkva64bnauff0z8x0hhoy',
                hasCustomFields: 'true',
                hasAttachments: false,
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
                id: '82de173d-4131-41ea-b965-15c2ed26f75c',
                boundedContextId: '4f6e89b9-a871-4aa3-bfd6-427dc76c3499',
                name: 'pl468r0bz8420r7djcu2r318hq03z1lgbpz4hi2xfe29jsgdglbrhe04nrzss963ie5hjhilrp8w9szzgumnumypt9sffb3sjzjsziwvz08mn8l0lnuunzmzqs56yhs4du5fnafl3o2idhbvba8du14tfnal9c9rposh8wj3a9qn6ah652082xok5ct6vpv51htrtvazo27uelzryxajk7xdexshgz9n8nunpubiqalaj02xq9gtf7p0q4vxp0e',
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
                id: '82de173d-4131-41ea-b965-15c2ed26f75c',
                boundedContextId: '4f6e89b9-a871-4aa3-bfd6-427dc76c3499',
                name: '0zvkurh130zkq0c8zjklhv0j4ii0euj9g5n4freo7b7qvrla2ruliv3eg3175trpubqejwb2rth62abhv7dy9a8d3n9l5sqwp3e9zrctz03jv7uf263ndimtlxlfnoqrsqmm78u9gfmfu8a69vlnqmxmccdn7s5ey7fdlgynnqihe3wc8go4axulg1ia04sqfu6z3q941nwmy4abid9xzcbb3533c9qw0zhx80cq8rie4cisim208gcfa4b45zr',
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
                        value   : '82de173d-4131-41ea-b965-15c2ed26f75c'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '82de173d-4131-41ea-b965-15c2ed26f75c'));
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
            .get('/admin/resource/82de173d-4131-41ea-b965-15c2ed26f75c')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '82de173d-4131-41ea-b965-15c2ed26f75c'));
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
                
                id: 'd2c87aa1-5bda-4173-970b-d468a1bb0b0b',
                boundedContextId: 'ec43cfb8-fce2-464c-b780-e91c1bce7365',
                name: '5el9fejogbfp3mu90zr8lj6mm7nft09wkjefjbmlz39i7s4yd3b6winporlatltby76e2z0peievcscje1q7lrmuhpl3tzdhdzp9j1lj8h11odu96xizjke6dprnxhoq506vz20a5aqax9j9gs6gdp7yzayve299htrfpjhmkhl6wpnv40115ttopwmzrbgn97jygre4qnc7783m8aiq7cy4h6e9biu5sa57wdwaxsx0ocs8qak2sntlquhkt8b',
                hasCustomFields: false,
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
                
                id: '82de173d-4131-41ea-b965-15c2ed26f75c',
                boundedContextId: '4f6e89b9-a871-4aa3-bfd6-427dc76c3499',
                name: '06shf8supdz69dcx1oe9pd1trq5b7edk95vzk49nlpoa90kh21st6h7wthvsh4vnt558vhwjfbh2scyz0df7fadmx0aewwd4a6j70gm8ipq7egmquwfl05drwzjl99uehbx3csv0xh2vp7u9c84sgh00h8wlm4a4dzclwv8smp4nwzigr7imxgp9cdi4xfsp55gty1vblpjvc9nmgdfpcyzcffcepbwf9ef1mu2mvvknkfj0jcwnsbgxrjm69uc',
                hasCustomFields: false,
                hasAttachments: false,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '82de173d-4131-41ea-b965-15c2ed26f75c'));
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
            .delete('/admin/resource/82de173d-4131-41ea-b965-15c2ed26f75c')
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
                        id: '4e2716e2-cfe3-4664-a519-145bf1d96512',
                        boundedContextId: '4f6e89b9-a871-4aa3-bfd6-427dc76c3499',
                        name: 'dyi8i17fs0wpyqjn3qtzeor6nubs0eqstoehyerlzxyw2zk4mi2q6zgcg4994vnvh36ge4zj92jyxff9g8ua3b8ji0v5krtrrzpn6vkvvtfbw80eqnqrsh77gq7exbf0jgllhhzh56o7jkqbta3wlpms7szvm2k7l1r4l906ysy1ckfm1soxle9gkpj1x3gpivpo69pj84d62xqnzkaf2gu5gyvfgvfdvc3v93w09sme9kvvpfr3yv82b02qe27',
                        hasCustomFields: true,
                        hasAttachments: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateResource).toHaveProperty('id', '4e2716e2-cfe3-4664-a519-145bf1d96512');
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
                            value   : '82de173d-4131-41ea-b965-15c2ed26f75c'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindResource.id).toStrictEqual('82de173d-4131-41ea-b965-15c2ed26f75c');
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
                    id: '82de173d-4131-41ea-b965-15c2ed26f75c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindResourceById.id).toStrictEqual('82de173d-4131-41ea-b965-15c2ed26f75c');
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
                        
                        id: 'def7497b-0411-41e4-bc37-39ea4fb403a0',
                        boundedContextId: 'f56442c9-4556-4935-b8f0-db553d9b62fd',
                        name: 'gm9gatfujz6k699tyebat5vo21cm24ptz2857cz8pyjaq42pw0u1661zi8sru0uqfsdorg7miqt1bkh2f19y7oj4np3z2z8jwvlygll3o5wbpt5gx59naz2nxl8uv98bkkpktahqec1b29wd6tl3yj05sprz3dwok0fn787t58lwz2fmhx85qij3td2rdyyxomepawqg61365p1p48b586kljd0zoy5lcajmuesdurhar0qgy2isj9qmyot3sfg',
                        hasCustomFields: true,
                        hasAttachments: false,
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
                        
                        id: '82de173d-4131-41ea-b965-15c2ed26f75c',
                        boundedContextId: '4f6e89b9-a871-4aa3-bfd6-427dc76c3499',
                        name: '7niagpw5258b0aqgnl76cs09i4ltz1efttbx60zk4to1bjrgctft2ewlhzkr6pwhc3zppiz470bf64edku3zjjmb2a1cguih6uitb7tn02dj4k4qv5yojtbmx0mcm4iladptvgzcb78569js58n13r9ea6cyoxb4tovfn6kfl6ewqyp3l8bsc26fake0l8ml2r6ugty8xc0f5193fb9s8jxi1qd682pw1drj39fn0vmohunxsl47nde19c8jncv',
                        hasCustomFields: true,
                        hasAttachments: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateResource.id).toStrictEqual('82de173d-4131-41ea-b965-15c2ed26f75c');
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
                    id: '82de173d-4131-41ea-b965-15c2ed26f75c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteResourceById.id).toStrictEqual('82de173d-4131-41ea-b965-15c2ed26f75c');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});