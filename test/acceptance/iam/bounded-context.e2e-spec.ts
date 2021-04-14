import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IBoundedContextRepository } from '@hades/iam/bounded-context/domain/bounded-context.repository';
import { MockBoundedContextRepository } from '@hades/iam/bounded-context/infrastructure/mock/mock-bounded-context.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { IamModule } from './../../../src/apps/iam/iam.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('bounded-context', () =>
{
    let app: INestApplication;
    let repository: MockBoundedContextRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    IamModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
                            models: [],
                        })
                    })
                ]
            })
            .overrideProvider(IBoundedContextRepository)
            .useClass(MockBoundedContextRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockBoundedContextRepository>module.get<IBoundedContextRepository>(IBoundedContextRepository);

        await app.init();
    });

    test(`/REST:POST iam/bounded-context - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: null,
                name: 't59ncuod31x1swg0yvs5sq5we3uiyk5jspinmw46bm22uw3bqcct0onkj445sb3b7id0xd1vs3ebxnym08jtcjhf3esovruk9lavd1u5wbt5sjoqdvsav3uder5friolle3dcbshoapgvka6t7f0f9ufth6nrt7j1vpo1zdzr5ygvmjcpjl33yn21ijqej7kgewasju0t3r7a3aqf3uqzqdydrvycv8dm5o19bhu38xitlx178p9gnc6wgzg6bg',
                root: 'dtss9fhv1vwwjg3tbjl9wnpg0k7zwj',
                sort: 354506,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextId must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                
                name: '8qvgjsfgvqhzvflcbej6m76wj0jbq9boz66flstw4uoiy2mhj13pe52jxoelsac67c708nl1ojfffwscwas80mhi6vf7ylmj8zi27bwt6pzg34wtp1hv80a786a8g6j2ve0m3bjk6xelrahewo07unwg3qyxerpfi5g9hja6imwpogtwml2cwse2dqhn9ckt2gnltzmn4e2gwhciqg74h8ei12i10mtytjrzpcfhr166vsyjwhyarfmp4cxgguj',
                root: 'ae0g4772qv96rbnvs7bwlb6rqhwxu6',
                sort: 923139,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '9855bfcc-b33d-41ae-8394-e86cd5ac5ec7',
                name: null,
                root: '8tnaszoo407kh7644g12zoa37hp1wt',
                sort: 542901,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextName must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '9855bfcc-b33d-41ae-8394-e86cd5ac5ec7',
                
                root: 'hcmbfwojp43zgsa4hjstkd80e3we3m',
                sort: 400636,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextRoot property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '9855bfcc-b33d-41ae-8394-e86cd5ac5ec7',
                name: '810gwf0nkxqfbhyqwt9ku2ydyywuca3qsqm34tzad4zq2dvon6y9vm7vdf1cf6jlj2al021yfl3hspu14b5mkil74lm7b3u61mb1ltuyjesvt77gqbk9ljyibsmxs55lwbwirhdu9yv5ezq8zljzifor5fxk4e8q41u2o2hdm8ixkkjg44dx8c3k4ykx2lj3wjlilztm6qh6b9oiocdta5dlkjbxt4259z5z06b3wsd9rqsbv8c0h8wpokk6lb4',
                root: null,
                sort: 492757,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextRoot must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextRoot property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '9855bfcc-b33d-41ae-8394-e86cd5ac5ec7',
                name: 'oes1lkgad55fkp9gf8rq608pfxa741hs6w8uwckvxk6tm5f6taxr43l1i5dkvkoi8oxw9g7vcnxtwcits6b091t6w8slkdzz44wnp8d1a7jgjdq5668oj2vx71md2eytee0zsvuebbik9odxdfa2ps0xz69xccpr4fh4wrz3i7fp8a6jvywpfg59ty7799yyilqa3tag1cugb2yl3pwqk1q7e3jooiwm0mxrti8xjdfyib9jt1obko7267lx72u',
                
                sort: 148857,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextRoot must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextSort property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '9855bfcc-b33d-41ae-8394-e86cd5ac5ec7',
                name: '5lkaxqg7g2a54e62ckcf5vnrdnn6qepvbgqvgfbqwsq0nez0lbb9gilfw2u4rn1utnzk5jg59vm0tqdncdo360p8rbfx092lhf3hpl3x58k2y5179xoirq3vxj59cxhe3vu4uc8uod76hoiityaplsx2q3cc2ht5c2ac25led6vg3d6iwjl5rlwwra3fngtn7e7vky3etyzlnq0pnb225kgcyelkbtbhne3b12risqxd4tdpheacuwo3ddor4u5',
                root: 'stghy2m72y9i6jswp4km0muivahith',
                sort: null,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextSort must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextSort property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '9855bfcc-b33d-41ae-8394-e86cd5ac5ec7',
                name: 'kev9p4v3wxbbymobj4sdphdg9yqws6zg5nri3ccrqp2egsybmw7w2a096wl7qyvrogjl0hjql3qx3qnx9umcs7j0em0i2pik4b3qtaz9sgccb2s3svfvndhm2kw506k38boec4zk0l20sl2jvul3afcspmhjgsnaqykbjlc59crhfcmvinjjdqo2q56jn1rdo904nd6xwbx7j54470vf2m7nnei5em3sliqlt3jxn1es5gjre87i7h3ecogfufe',
                root: 'rzg1n93jjzkljpwnvz53vptbqi48xk',
                
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextSort must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '9855bfcc-b33d-41ae-8394-e86cd5ac5ec7',
                name: '15lrwfeo0ruaf1euxams9cx7c85mkzgrmdpr5jtg452vlqkcel8c148rf5rjz7l7btvb8edjjmqucvtrx88cn3qxm66ntknvdglnmld139hc2zo7scyz2h20l3irqev8xt7v1w5b3qo8s5hupz3oxc0sbsxtjyhyuvfyd671asuv8uucz08nrwju96ffzjqcsyuyamx9t60ffz7mvg7ugat7k8654gcnzfngrw1fkw5kiojv7lo2whaq17xwh95',
                root: 'c6pqwo2mphuj86i7o8iguy6w1motgb',
                sort: 966994,
                isActive: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextIsActive must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextIsActive property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '9855bfcc-b33d-41ae-8394-e86cd5ac5ec7',
                name: '0q6kt6a770o1zbph5hdnirk6l1hylbs792ha94ibwaii6o3vrvoz3fxhyrrol55jrec71ndwj2vwpasyf2bk172m3jhpa8wickhhx1g6ihra9e7ytrb8243vhkj8zmdzxhnm1vfblqlm6d139yo4378b0g3lu9ucczz2pra3zw8tbdl3z00km0hisyry98r0ldjw77mil7jucovsfs8u6ese00ooepbhisaxxl6dul6ajg344y2rxjrogle1mbu',
                root: '318yl9yzvgajnh2jvbquz2nh9flrma',
                sort: 256516,
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextIsActive must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: 'b549hg3hmeabo3e8pwstr13tsmavxorzsje38',
                name: 'p3vlirfgo80vp31s11tj38qwnohrcf8mib2i2ygod16pp7yyh76rp2ihld9z6gwk97x9no9camcipf97rbsi0kz4lkc8jisxaht5m35s14f6orz987hd6cwpcuhxtax91g76z8pssvg815ygzhypuo1bga1x8uu5n9v8n3zr7a2417r3rh1dak3vnmujohwhqgmuq0mehj1czkk16jaypq42abkrdjitvz5tecxx66x04vgxwiftbe9dzxvjurl',
                root: 'l7p8qdr4i3mpc9eejmcahnb0ml5hlt',
                sort: 728235,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '9855bfcc-b33d-41ae-8394-e86cd5ac5ec7',
                name: 'x4d8syzrdok3z1b0it1w2n3popyoqbog2ayzvonzynqq3uw1ya0mdfwm104vz71bcttx08g7qffsxfbzaqzdjji5rwacspmegd2nmfboefulos58j49xk0bqgfpckjgxt8panpgw2n7o4wvyca9el916f9sgpj65gwrq7tbo5v48fenldsasmy5ghduqfoqqqaa5j3c30y7gi80gr94l9tyvtfv6pgxwojxmh6rn6e65cb0uvs8m2pb8kq2gu7tu',
                root: 'ym3kbxl9xit0emgb00z255yc0sa85g',
                sort: 295455,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextRoot is too large, has a maximum length of 30`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '9855bfcc-b33d-41ae-8394-e86cd5ac5ec7',
                name: 'b59mi9uyzgqlottes71mt57fukd3o1azulyswr3qf5uuymdukaxf1ai8lwus9nbet70b8rm5a6wb0pm20qzi4fz928c5pzzee79b3x16rh3risg1yr9g8sx97r9jcg3x90t8ig02m6frze92rz48raywsxurs04cwpz6hqy9np58i8b25vxlvrnmydefm7wmrm3r32i7v28mnt81bmpmkw8fp898ibnsapfqqb79o1ufccqv74gijycrzsqg68d',
                root: 'kohbfgsnzlvuyl0jgkytm6vj9stqaxk',
                sort: 787887,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextRoot is too large, has a maximum length of 30');
            });
    });
    
    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextSort is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '9855bfcc-b33d-41ae-8394-e86cd5ac5ec7',
                name: 'jk74qm78snbu9jqmfm1nk195k3w3ibxw97oyaqs4nxp86fzdogafaksot3767ago7psym5l3ygz28xb04izl892zn9wzjwpcn75pkfnx4979q2jf1xx6cz7y95wgg167awo60sz20ex0o0v31ncfrjqq76s15y97uxnugoce99d582pjtgqloxqgwt943y2wdyp8759t9tkforn6sakfds6lz5j6z5nbf3tij335t1tackj924co2ivfhg0f67r',
                root: '930mk449klpbyq3q5zq8zco6wu08k1',
                sort: 4368842,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextSort is too large, has a maximum length of 6');
            });
    });
    

    

    

    

    
    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextIsActive has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '9855bfcc-b33d-41ae-8394-e86cd5ac5ec7',
                name: '01cvc6nmzwdoxnqu6ahdfcyx3reu46rn6cpgj1clueax8mr6no2ishqkzvhid9rl38iemfr2ch1sif7pstoa3rmcl68hvfjvxh6gu8qcs1phd89tg7k9nwbvbaiikujgeqgmnnpeygfi8i6324iro4l86bn879tgl6le79mruop6l3we0xhher0eec6vp9fan3vgttaituuii94yresfvwd8lot6wggt19uvy5pv9bc2stvohb8dwhl93q3lzat',
                root: 'icep8ylw3u1gyqm18tjjdnv8gtwt04',
                sort: 424422,
                isActive: 'true',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextIsActive has to be a boolean value');
            });
    });
    

    

    

    test(`/REST:POST iam/bounded-context`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '9855bfcc-b33d-41ae-8394-e86cd5ac5ec7',
                name: '3u59l01kbuiuicp7tk98e3ffghb9aw7uh73glyt8voy1os53itxcy1cdrnnobf5846dbxpfnf6blxfzudzc1scdaes6s4ugvrchobqz4wyejm3azeot3rsj38v37wq52lbbglc55dqx4oxo81lwyuh5ycasezfp59kt7atsy0qm8kcde57hd9iu6x8w66fn5ufvlsrgq2lpgxk0dd651qiknk7p1tei20054fhp2813ir1zwi204hee3b0nyvw5',
                root: 'lrlrsdb1oj17otje99qw908hlb7x2o',
                sort: 138114,
                isActive: false,
            })
            .expect(201);
    });

    test(`/REST:GET iam/bounded-contexts/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/bounded-contexts/paginate')
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

    test(`/REST:GET iam/bounded-context - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'b9df587b-50bc-4fff-b9f1-5a09a90d87c8'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET iam/bounded-context`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '9855bfcc-b33d-41ae-8394-e86cd5ac5ec7'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '9855bfcc-b33d-41ae-8394-e86cd5ac5ec7'));
    });

    test(`/REST:GET iam/bounded-context/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/bounded-context/0829a233-d368-4e8d-a53f-7b448490af70')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET iam/bounded-context/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/bounded-context/9855bfcc-b33d-41ae-8394-e86cd5ac5ec7')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '9855bfcc-b33d-41ae-8394-e86cd5ac5ec7'));
    });

    test(`/REST:GET iam/bounded-contexts`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/bounded-contexts')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT iam/bounded-context - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                
                id: 'fb636769-a1a7-4f35-81d8-124516e14961',
                name: 'goelymeh840xdatjuy9o8fehyjpv1n7z9speiy7azfd5fwcm0l3ci82fh15z5q40pz90kw4ufh50azv7mpw7u8f77vy64gibf5tyszcs16z4c7zx2j4bm9ypvtgy1t0gob3s5oki8awf15qb7l4nnyfq98tikdjflhz0zi0m8o3xlobzw9nr0j8wg2907eoykkwxs0pc09j5rzakrei5thx5g4bqe5u7o4al890k1b49k2fc59gkgohesalqicw',
                root: 'dp1jfleihbmigfc0r26wcct8v0ia2l',
                sort: 693078,
                isActive: false,
            })
            .expect(404);
    });

    test(`/REST:PUT iam/bounded-context`, () => 
    {
        return request(app.getHttpServer())
            .put('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                
                id: '9855bfcc-b33d-41ae-8394-e86cd5ac5ec7',
                name: 'wy76lpdb2cwdagcw3p9wyrper5z0myy4mchb5ocan5opmdr0nq7uzgeddoli1ag1gcy25xvkkc75j4cimno68dh08a327sqlycvgblrs00gtvpc3cagefs6cj1g8iesqirg9fu0al8t058c2t1yflb2f8u01iel9noo12m8z3xzpl809ia8hrnh1klum6epuvbuwxvudfokaf546ilmxsvxzduhv9n86bhhb8doa79n8prm8x8yhx6mchwhkp9x',
                root: 'ken0fnxzexre292a5e6wr1fmwa7m4o',
                sort: 655160,
                isActive: true,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '9855bfcc-b33d-41ae-8394-e86cd5ac5ec7'));
    });

    test(`/REST:DELETE iam/bounded-context/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/bounded-context/c5936f75-7f17-452c-9123-2cdfc89b40a1')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE iam/bounded-context/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/bounded-context/9855bfcc-b33d-41ae-8394-e86cd5ac5ec7')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL iamCreateBoundedContext - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamCreateBoundedContextInput!)
                    {
                        iamCreateBoundedContext (payload:$payload)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
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

    test(`/GraphQL iamCreateBoundedContext`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamCreateBoundedContextInput!)
                    {
                        iamCreateBoundedContext (payload:$payload)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '638bb3fc-b1fe-4049-a91d-9f3da0cdfc4b',
                        name: '5mvxbyg1y3gpl92edg73j3ohe0u1n28kdw59kwq6fl80rdrm2uzkagtpev8mrsc9elbttt0253zwvfnxa3oe2yabrno282g62iy8jthppmq3xka1ksustcwehzqbkp55rk0s8vnpmlfmmxy8qptnleqo7xe2u9gewvv0jbt5r5d3wmwkfvvq8lthlqviiksukia3buk6he5498qpodrcohceyp1whmibu3v40vqns0jz0i3q08l71dv9g3y155g',
                        root: '7g9gsqxhmnivq8wm273lkbpjt69l9a',
                        sort: 858461,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreateBoundedContext).toHaveProperty('id', '638bb3fc-b1fe-4049-a91d-9f3da0cdfc4b');
            });
    });

    test(`/GraphQL iamPaginateBoundedContexts`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        iamPaginateBoundedContexts (query:$query constraint:$constraint)
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
                expect(res.body.data.iamPaginateBoundedContexts.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginateBoundedContexts.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginateBoundedContexts.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL iamFindBoundedContext - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindBoundedContext (query:$query)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
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
                            id: 'f2734cb2-2cb7-4350-91df-50514e74bc39'
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

    test(`/GraphQL iamFindBoundedContext`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindBoundedContext (query:$query)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
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
                            id: '9855bfcc-b33d-41ae-8394-e86cd5ac5ec7'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindBoundedContext.id).toStrictEqual('9855bfcc-b33d-41ae-8394-e86cd5ac5ec7');
            });
    });

    test(`/GraphQL iamFindBoundedContextById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        iamFindBoundedContextById (id:$id)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'bf763f8c-06a7-40e8-8d22-c2e26a834216'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamFindBoundedContextById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        iamFindBoundedContextById (id:$id)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '9855bfcc-b33d-41ae-8394-e86cd5ac5ec7'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindBoundedContextById.id).toStrictEqual('9855bfcc-b33d-41ae-8394-e86cd5ac5ec7');
            });
    });

    test(`/GraphQL iamGetBoundedContexts`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamGetBoundedContexts (query:$query)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.iamGetBoundedContexts.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL iamUpdateBoundedContext - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamUpdateBoundedContextInput!)
                    {
                        iamUpdateBoundedContext (payload:$payload)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'cb974833-a514-4482-b74f-c45a8843a937',
                        name: '7hdwibcxtn4a8sfy2tg2ifyibmyri2fhk91qtms3ppvmvymdy8kb58e8d114n992xyqc2ntiveik7z9r4jl902dnbhvr232gc92mcwstkr9n3h4h03kx6roihnjk99uwe2fjzbn64rt4w8804nhsxw066v03no12d1l3zu29cijwp54l39plimzbjhzxxaedmoxj530fjj9hwdl43yzffflc1h2r7z4et9v8ot4ogkjfte0d5jsd8cd6f9gkq2l',
                        root: 'fmu6saixftepvrpr1u9c06orwubn0j',
                        sort: 563029,
                        isActive: true,
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

    test(`/GraphQL iamUpdateBoundedContext`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamUpdateBoundedContextInput!)
                    {
                        iamUpdateBoundedContext (payload:$payload)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '9855bfcc-b33d-41ae-8394-e86cd5ac5ec7',
                        name: '4843plciyxqs4fges5h4gkr1xw8k5jq0k40ttcwv2dtw4w3t061a3o70rpptlqnpriskqjo1svuzu3usgqqiodx3eryhwojgrkjee3t6qsefwh1q2hrt35dsxo825a6f7iv7o9wmym9ehb2z2jtg5v8j0o7zm72fwfj9gr5s5727tfpu4x3j5udhh64qfo3wf8dknvep0xjnoc9zs3luo50kqu7wxzlutdz55fiu0540gvx4c9fikrd9okeu45l',
                        root: 'p7qbphi4rxd4p0fynaaytag9a4lzgb',
                        sort: 110635,
                        isActive: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdateBoundedContext.id).toStrictEqual('9855bfcc-b33d-41ae-8394-e86cd5ac5ec7');
            });
    });

    test(`/GraphQL iamDeleteBoundedContextById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteBoundedContextById (id:$id)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'fdf9eac8-4785-4941-8dba-7fca3ce210af'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamDeleteBoundedContextById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteBoundedContextById (id:$id)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '9855bfcc-b33d-41ae-8394-e86cd5ac5ec7'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteBoundedContextById.id).toStrictEqual('9855bfcc-b33d-41ae-8394-e86cd5ac5ec7');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});