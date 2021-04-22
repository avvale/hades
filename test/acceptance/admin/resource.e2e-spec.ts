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
                boundedContextId: '7bfe3b7d-c0c6-4748-a9f6-48daa9627572',
                attachmentFamilyIds: [],
                name: 'zhdxgdxjjgmxhdw4gpgo9h5tl2531rnuiz949zmrg5xd7g4gmeb7at6oyr5kie076vl5vfyjt2fllha40vzcrsr123iicf5vwk963u8okqs72blq7zll1vf2t9auf1kmvebjip48nrtam4aufxmcuq0na0skyr68ewjmsizs41szu9bjtgvasj6v7p7jxeqrdjlvzl2ymf8mnqxynx88gn4h56ascvkeqiasijoal4zca81l4jeu5vmcwmjcjvr',
                hasCustomFields: false,
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
                
                boundedContextId: '7bfe3b7d-c0c6-4748-a9f6-48daa9627572',
                attachmentFamilyIds: [],
                name: 'ozdru6awwm2gcw5octw5mmqpjbrw02txvv1fevaissr0wd5tseigbn4cs9l838yz82fcj5zyxjafclq2fyxfyt7t43ih06mztplyqnamyiucix5szjqzvn7ygu9rcb21spulf2flzofvq82itqcsny62svv88xmyda6j2bo9rsotiiwgp7z2jumhj0gin3uxzod2cxprx84hzmwwq3mcbnqty4ns9omh8zi9vatc1agrx0d9krlu3flfhj1f9p6',
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
                id: '62b08714-ec1b-4474-a94f-b89692575ddf',
                boundedContextId: null,
                attachmentFamilyIds: [],
                name: 'ba15mdiuujt6nn9p851nlzws3gnjmbjafmb8zpxuiykj3vwkd6ixj3a95rlzyeibfoqtyj1di34q32p9prn938xhm18g5wkavo95zwmmkhskrzv4201nqtotmufnd17p5jnagelwmclr7zinwi5eyfqzcp9m0pmsjcqa2fm544f7x7kkm7q18e2wxld2eqjyu870541rjxrd5fts3mhrq4ut285lap1wpvu1j4pgbgh49z0kdp06abekc7tc2i6',
                hasCustomFields: false,
                hasAttachments: true,
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
                id: '62b08714-ec1b-4474-a94f-b89692575ddf',
                
                attachmentFamilyIds: [],
                name: '19aveqm0imrw2nd8symfsffao57q5cwkktx7ry406imk8hfwpxtuu6r4fpy7ah8zr19z2peri1digcpngbkfb1eq7jb5cz071l2550p5p32xutpsw42j9ucngppdnd7f7bi7x77sft1p6vm2uhxr9oh3rge2e1t3hxivqz4sw36lq8fw5i5dhwvir8a9ukilefgdavfhurxj7k5tc527ngwvq4dp98q4o3k2jioxlgmx01ficmjs7igqyhjlryu',
                hasCustomFields: false,
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
                id: '62b08714-ec1b-4474-a94f-b89692575ddf',
                boundedContextId: '7bfe3b7d-c0c6-4748-a9f6-48daa9627572',
                attachmentFamilyIds: [],
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
                id: '62b08714-ec1b-4474-a94f-b89692575ddf',
                boundedContextId: '7bfe3b7d-c0c6-4748-a9f6-48daa9627572',
                attachmentFamilyIds: [],
                
                hasCustomFields: true,
                hasAttachments: true,
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
                id: '62b08714-ec1b-4474-a94f-b89692575ddf',
                boundedContextId: '7bfe3b7d-c0c6-4748-a9f6-48daa9627572',
                attachmentFamilyIds: [],
                name: 'p531e67e70mp00et8k4duc0s5dxfz2cvfd9oljqeuzezauxbejkp8x5k4w3fm0rbg4daahtt2i2aqwfdjnlw0zpluumqy0sjslhdwztmi7o6043zxgecp6q0zui9trnvf96nabkadim3h8rz82xwwhyj1lso2u6st6w45st07mkyl46p18tima3ywdwmjvwmjm4k7q2rznx62ywt89ppgqouzhmynqdehtoa8c3aujczbb7mcf7awzq1r2i4sns',
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
                id: '62b08714-ec1b-4474-a94f-b89692575ddf',
                boundedContextId: '7bfe3b7d-c0c6-4748-a9f6-48daa9627572',
                attachmentFamilyIds: [],
                name: 'fxbr0nsonz527k2oclfr7xjjk37ufjgnormtloeeskmj8ev16zhwzh8gjbektgxpk8wgc22wv8mpxcjafcsr00xclsrltg2ul2tsizvaw0wyhtjdzblwtn50b6ojjif6ntfcu4d0pritmzhzamz5rz2y42hu07rws7sv3v4l17zwvvoesc8op9uejs897qswp5t6x6wf8yk7utgb1bu10jho35luhcw5pjwfpg99kf8dx9npyhp55vunjwe6rvz',
                
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
                id: '62b08714-ec1b-4474-a94f-b89692575ddf',
                boundedContextId: '7bfe3b7d-c0c6-4748-a9f6-48daa9627572',
                attachmentFamilyIds: [],
                name: 'rnwghtcp0te6qaix0281y4yh8oet9sw8zyg4h9kpz400upuo0awqxr0ap9iaou20bnzf07e3cb490tvd7fot6h3c9brrpoehm5ziwoz4qn5r78f0f909ht2rvwxo05edpd09ckztxrco0mnjwd3222v66iyeusxgagsugd6yweac9whn7ekegxtydglypcd3nw64thi2w5ppn6gbspgpc81jc7m1z8y5du7qy87mht7n0c0v5sach1gxlf0ly0k',
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
                id: '62b08714-ec1b-4474-a94f-b89692575ddf',
                boundedContextId: '7bfe3b7d-c0c6-4748-a9f6-48daa9627572',
                attachmentFamilyIds: [],
                name: 'rjcfnad3ai1rtoh7m38d0efs6zrb97c3bw29s3xbvatd196qxrche46si5y8eleqyju6lvdawl6q6lrfwgjulx41shpbxopo5cmiavssttvmga50f4tzkysp5kwunppcsdgzq2cqki6eodo4w7jvy9hz52ivzoza6i25wx93ncxueb144xsdszgmw9krljogln265d71h82cox01r5ssnu4cfz3y6cz1n7um2ecyt1a1jba7t47bgdk6ul4cl2u',
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
                id: 'uka88bh7nqtv6itt1gjielajvfhbhpyws0nai',
                boundedContextId: '7bfe3b7d-c0c6-4748-a9f6-48daa9627572',
                attachmentFamilyIds: [],
                name: 'd2avgtmdrisjdlqxmfjujiekghdqfphii4caxctvn7x5vhgjgps276xwab9pl41e5ty499ar54fxkut0pkczw3qfmnmcf9uqc5fgz084qst8d7bo13es8vswuvv9hu3j4j9up63pl1wu0wz315sh8jtrukksxj75fj9mff3rsc5zquhedc9lhczvlr4tn0k8snwv4epsh4txxxj9iasv9o6yywrcueux1zk8sczbzw8evpr4h4e40xejnrdilal',
                hasCustomFields: false,
                hasAttachments: false,
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
                id: '62b08714-ec1b-4474-a94f-b89692575ddf',
                boundedContextId: '3rcvso7uywvkpujh9afhrerldcdb3n1e0s8lr',
                attachmentFamilyIds: [],
                name: 'so9res5wep117py7ik1p7yl3tmf38vlolbxcpo3au0184i73q1xk7ltp8cvnv8uwixyfn55nbeolspeuy70qgkg1mlyhnoq78lh7rjzglr20hiyts11329ihj09s0svkg00c7azhlm0j34gavdp1clpxsz4wgx4r8ukhnnm3hxc20to6axcxgiobr6aa24fz7iwkm06innlmfumbxnmdj084kgw8ty9q2civq8iau19srswst70cidkp25fg2t3',
                hasCustomFields: true,
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
                id: '62b08714-ec1b-4474-a94f-b89692575ddf',
                boundedContextId: '7bfe3b7d-c0c6-4748-a9f6-48daa9627572',
                attachmentFamilyIds: [],
                name: 'yg6kvk7rl96uhgv0stqm4o6h47denoh3882qd6aa49d71ud9xzv98g8natfu29c1ie4yltkv0ho1w6hdo9op22hipjsfxdnpuz94mdhlv4z800vv1mru63bktj0uv7q8swy0sotgddcfidv62ov7q56k9pzp4mhtgwnv8u0kw0jwppiee99zw6s2p6lmc0rn6aigh24lqeqet47ai0hg9e0l2lmrcnbay30gsxho3vfio50kp6l2hcvn7lmqnfxm',
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
                id: '62b08714-ec1b-4474-a94f-b89692575ddf',
                boundedContextId: '7bfe3b7d-c0c6-4748-a9f6-48daa9627572',
                attachmentFamilyIds: [],
                name: '4s2ef2mjnx3i8072t0ou86ksyhqosh97b6bcg88h2xx21wihzlufujz238vd5fw20mp77ifsiumgf87scai257yo0dgxwy4fxm518ey7gpma0n9kun2x6lmcnfcm646i40ut52wnudgkp1jwmacqjp70a49hfgr6uh5gym8s3h8pebqj88c3lz81oqu6yit8rso53dr8ndhjidzggrlnisgtvd8jrng0wca45xxxq1r3vdh2d3fzi0tdyogtbs5',
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
                id: '62b08714-ec1b-4474-a94f-b89692575ddf',
                boundedContextId: '7bfe3b7d-c0c6-4748-a9f6-48daa9627572',
                attachmentFamilyIds: [],
                name: 'dhyca0bbz2p8miw7d66nf36r4qvnbuf3o9uggyed6mpg83k8x69r3k7xbkk4om3t87liqxo1lv4ul4k7vdnx063w88hh5ui44nh1302rhnxy8ygfkvr3hv3gloxamoeyqhpspg5roqpev63y5eu5thi6v3z7on0udionge7m3kvlhu3h345jks5rczjgqshpxy86tyt8ordtucgzknit3u52i0iafgvtgsv8orqlom5cqa7atfxbuk8ptischca',
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
                id: '62b08714-ec1b-4474-a94f-b89692575ddf',
                boundedContextId: '7bfe3b7d-c0c6-4748-a9f6-48daa9627572',
                attachmentFamilyIds: [],
                name: 'ap6p0ddrg5veeq2u7tb0uuxjpqxfib8a3jmj4b37i5iqkaw7i4s6xr325xbwgx5uqlu4n3u9hnxma8orhzhl43hypbw1k2e3aienbijzhf5h2pmxobzsy17apli5dpzl9ytphe0878hf9tawhvh6923u520k21gm0vxo378wu1t9y75tkx3x2ajqbg2i4i39nlkqpbr8l4fqybpv8d31j1d70dqs0caydoyot1479cie3psjty4zw23xvrz5xyh',
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
                        id: 'f62cd769-6285-4d54-9ba0-7368466d5c1a'
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
                        id: '62b08714-ec1b-4474-a94f-b89692575ddf'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '62b08714-ec1b-4474-a94f-b89692575ddf'));
    });

    test(`/REST:GET admin/resource/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/resource/7fa0f11a-1be8-43e6-a5e0-839328fe7834')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/resource/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/resource/62b08714-ec1b-4474-a94f-b89692575ddf')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '62b08714-ec1b-4474-a94f-b89692575ddf'));
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
                
                id: '5c9e96ce-f2d6-46e6-95d9-7d5e362dd0c2',
                boundedContextId: 'f070d15a-d9e6-451b-9b69-bb4bda7b73c0',
                attachmentFamilyIds: [],
                name: '9y0aalv0e991w9q0xdcjh8oqrhv7ttromivawr7qlet2mywu59ezjyi70y0y76rqf8i0pzbd4z8z9uxtix2ab7tnbbdci2qvbl74n7fpjk0ef5p410u2c1uf6k706edvkfr8vtwyhf3qzuf7eicobsr9318pon1dfc9bd4u6b9dej2n0t8ntr5tauciwwi8rkq5sf9fd2ry3dinddcutks001azke8qps7bzbrq4n49a6rmd0gzajbe5yz1s1xx',
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
                
                id: '62b08714-ec1b-4474-a94f-b89692575ddf',
                boundedContextId: '7bfe3b7d-c0c6-4748-a9f6-48daa9627572',
                attachmentFamilyIds: [],
                name: '430w4uh2ir84i597m1wqvbvg044t0jnon0jlri4f78mkpwngybs7uuh2rngtkw55ptwnlgt0xgg8n9guqh27tqhl08zshf0e4gxt97atq5vijy12gi1vtuhzkozvh5icm9frvmp5qeskajucjwswjb6uhd9udacx6r89h0b5j01tv8dv9ykez0rmnbao1guytkz9p0nno5ore1k50c8iwt5k2rterw4isuxakc1xlfgtlbjosb19hnngjd64nuz',
                hasCustomFields: true,
                hasAttachments: false,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '62b08714-ec1b-4474-a94f-b89692575ddf'));
    });

    test(`/REST:DELETE admin/resource/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/resource/1a9f2f1d-75f6-43ab-a3d5-00273b4a9fb5')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/resource/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/resource/62b08714-ec1b-4474-a94f-b89692575ddf')
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
                        id: '1c7e73b3-b690-41e0-9c0f-6bfeb974b88c',
                        boundedContextId: '7bfe3b7d-c0c6-4748-a9f6-48daa9627572',
                        attachmentFamilyIds: [],
                        name: 'dnqkiu6y4np6xh2hhwriu108m4cdi9v9g25nyat8i2vl6rrlpxfds80dj4nj9glcf1zx2zrmwol2cjcgrnwzt4nsk8463ztlus9a0pj6ajnfd1ecbtvmd7sgrcrifmz76tew8wihx5xifjp4p2ay0qkf2suhk5tpq4ifkdn6e6f9r2epb7zr8elj1klw7sx04ebgkyh7rnqo6ogozqnfucyy1ejbyhje4hi68xkrrf2aqdd0z4q2w965nihm17s',
                        hasCustomFields: true,
                        hasAttachments: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateResource).toHaveProperty('id', '1c7e73b3-b690-41e0-9c0f-6bfeb974b88c');
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
                            id: '7b498826-813a-4681-855e-487b826d213a'
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
                            id: '62b08714-ec1b-4474-a94f-b89692575ddf'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindResource.id).toStrictEqual('62b08714-ec1b-4474-a94f-b89692575ddf');
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
                    id: '12220c1f-5d3b-4562-abc7-e113322ef30c'
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
                    id: '62b08714-ec1b-4474-a94f-b89692575ddf'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindResourceById.id).toStrictEqual('62b08714-ec1b-4474-a94f-b89692575ddf');
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
                        
                        id: '6f685f7e-8495-4524-a730-ad7a4f1d5603',
                        boundedContextId: 'ae9ad187-8d84-4700-b29a-b1c269c783d1',
                        attachmentFamilyIds: [],
                        name: '60nv8377y0608smviqh7qhe99225kr0ebqbfsb51k5b2nerd973m1fouogpadgraabubg9z7njz4ioq7bkmajjfb9ve9dh2pw296t2i2j8ojlpacglxb07rh0bq87um43fmd1y3knctx5cdeua15qhdakfa2le9c2t1mbsy3uqunz8nfj5gd2q2uzjx7y7muvzhlwj7jdnx3q7kev05sg6w9ehajit9k7b746xvjq34x41h2qatz5r33ewa59ss',
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
                        
                        id: '62b08714-ec1b-4474-a94f-b89692575ddf',
                        boundedContextId: '7bfe3b7d-c0c6-4748-a9f6-48daa9627572',
                        attachmentFamilyIds: [],
                        name: 'lld2mgxwbfj7ovndjgpb46ptzegm3cd11n1wfdzmlv6o5qqyhkg6pk7pkylu8cuirbewawjfvbrl4xhx5pa8b4l4yfma6qb6cxbfyd1q199k517ieaor6elpc90jxl1j7uigo0rlu96suq9duv2l22r78gxgvfyp9pnhertbdos0ow4hevwpydlblmrg296yrp0jj3vy0oyvf6m1rtz9vy35kx7pqvzqzr7lz3ascc2idm8wjp6fyp0a20fxllj',
                        hasCustomFields: true,
                        hasAttachments: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateResource.id).toStrictEqual('62b08714-ec1b-4474-a94f-b89692575ddf');
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
                    id: '1f40123f-d853-4a9b-8d2b-b8c0d7dae61f'
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
                    id: '62b08714-ec1b-4474-a94f-b89692575ddf'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteResourceById.id).toStrictEqual('62b08714-ec1b-4474-a94f-b89692575ddf');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});