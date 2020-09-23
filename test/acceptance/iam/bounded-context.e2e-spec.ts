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
                name: '11srdla8895eqhswmiuz2nne7tdng8d9uqmosfx0h6l33kslz3ql4iapnhh7ipal2gsc6m1tdf732v55l6zr7mlqg6lkcow8ewpuq6c6bne4af0o37yqctsvolp10d4ngfexjco6bzv473hsalhn96uqwbrc3nhepkqin6ljr4q3yhclwrun1ajpfo44iqwjdz1buh6mw541ul9jvzzdecrdzp3tp9cmc2329r2xx51l8oc0gng0es9p85s4qtn',
                root: 'xqegrd3xiluu82jamsfvaj7faqkr9r',
                sort: 769944,
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
                
                name: '3v7vzlutqsy853revnojiqu4yt7orsa3yv15qxk2adz4kxebur80icw5128r62iynstzbu5hfwr0f3o67pfeqx9wl4ddir7bfwck4trayfdmsppks3984ospwzqp4ibj0hnvzhm4y8tv9coy0eem2xd2eubbxb7p8bs36zq2pzqb9m1oqvqtthyts39rduds4bssijyb9z0j1i476c0c69r4ufeunahq6z7u5lyv2g01dqv46hyrnuslu77g4vt',
                root: 'xu1f5qo24okwqiasehe9qx7mh0twnu',
                sort: 148954,
                isActive: false,
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
                id: '2dab947a-23e1-428e-bc89-8913db14f010',
                name: null,
                root: '3mifvefcn1wbop2df6wjab82uv06gh',
                sort: 844473,
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
                id: '2dab947a-23e1-428e-bc89-8913db14f010',
                
                root: 'idhorx1h3xxktmqn7gqux70powauh7',
                sort: 899703,
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
                id: '2dab947a-23e1-428e-bc89-8913db14f010',
                name: '8gi0ihvw84pj3vzw41lnboinygc2qyoda7eqcxxug5bumuhmevp3xd95gnq22nz9y36kvfmjgzqfe350r4xxfuv42gfobizijofjcczl1whsi23hmk11gpqmafd8k6snueyotv5au2julnres7ua1yfqbbexkaeb4n95w5ebaj2whjkblyiruvec9jrl26dl6lepqfe1gmss4ixzsgbpaipae0e8nbz5xrq07nie9z7uyryvzpdbaj8yc0eh4vd',
                root: null,
                sort: 961847,
                isActive: true,
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
                id: '2dab947a-23e1-428e-bc89-8913db14f010',
                name: 'iv8ntnuq8q2km1f71as22b2ipy1hsq79scv0o6ontdst68hsfw0sq2c8s9dseobsvgj6uwoqvpueqc774gdrv6e8x9xpdl32yuykt5v2zcen1f70g58ov3jduxwoaor3lgoegssh5rfe8gaghg1n0fyqtiy1ms5nras4twincurhi9qdxi62uqq545b1ixtjonunr7zz8tcjml001owb7cg2kxc1mplq70h1djybahabrbgd1h03mamymhvu2vz',
                
                sort: 245069,
                isActive: true,
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
                id: '2dab947a-23e1-428e-bc89-8913db14f010',
                name: '7rgae9h9xgfl6u23me2jepp8axblnoq42t1n4fsinbpws88dkq9hnxk5os3nhdvddcbqkw62azj4m2xfrcdk2yok8jcf3ikquvqe0wded8k6f6zy35p2izu1e0r2x8ibmirwoz6hrd4tw4znfpfd1o4ue3icztjcf3p812g5mr21vduktk0t1wl3mzor5tsve28vp3nrb3oqdz11m2mgo0oyjsr4b2ins7gkh4s3hsfbtrsrojd6wgzopamywoj',
                root: '1v5jzbkzq0vh1cbf0un0i933iiwyr3',
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
                id: '2dab947a-23e1-428e-bc89-8913db14f010',
                name: 'onab3x6ew2gduayq6tav0ebiex5e6x76ir2mkaxfg8irqo1fu7octkq37j86kph24ccta7urq1fgw58nk4i69492fuvap1r8xh6xjb3810nvevigito5m5c4fhbzwgorxt9uku18cd7fbnj02r23med8923hf0axqfv33kv6nxpwq03ar3x8y2z4yb7t786io431ay8vxb6t78urnr62na2hp43qy7bmb9a9tzizjprresuib7cgjgsxwkncj4h',
                root: '3cpdpably149cfupzxhpwuugb0at07',
                
                isActive: true,
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
                id: '2dab947a-23e1-428e-bc89-8913db14f010',
                name: 'j4e9mluw1xm5vw8jj0iprl1crzov9ctdckn6d0he7fy6b97kin0pc4h3o8kb18acvjhlc6q8uif0q75ig0ydkr3ezmfb2np034qdynmavoq7oixpl7d5axth84xaa556mbsj6520dokvdsavcednwxmssfd2bfurytodb3s1fxv2z3wzd89npwia6vunw0prwwdi0o5qykyxjmjsrkcv23a7qzpoje90w29ha2r8hmcebe654lpza11vraoedo8',
                root: 'uf4cznueu5qo4g9at2ck63fjie0k1f',
                sort: 392264,
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
                id: '2dab947a-23e1-428e-bc89-8913db14f010',
                name: 'rdj6od0ydlqosu2fwj1muya28hs7bjmqkxi2b5a5r1dyo3xo0q65yw2xkt3mo98ckby3covyipkkmotd7h5fugbng5ys4sex9wx1vh7zjnub279dvoir38g3ogdvucf03mz7h5eir8hxrg1cu7t1kv7w2ne1dgdn1fkwzv21m1myvsrtusy8wh423sd1em2wg0hy8yncxozfpyf79onk0hatrt4ta7a5jqz5xoolkkkjm7e7k4ge33p523tc6if',
                root: 'udqbgyi6biocf6xz1fandfb2y283sc',
                sort: 865778,
                
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
                id: 'zqpxp8vjjlof3z4n8m0srla9m3keaqu9ogd3m',
                name: 'wq55mpwiu0ohpc8t9ldqwmqjqdniqcohbnlfo78k3v0i8rjxafx5x8rw97pwl3cyn4urxguogbgxr4ctbj1192f3u2r8r9tqggyfnjo33czmt8rjo5l2ar0lbhxu0vlyn9ml58v2qsqby2s4ff8q0xo4nc2sf7iy7v5pku5az7jv17oirqmix8dz315nrmt42eavky1qd9x3zc4dyjqavfizes5rl577l6m62h7qp1pma9x8wb1524upjfl97la',
                root: '31gevzrap0fm6xz1okmmxfsis3llqb',
                sort: 603966,
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
                id: '2dab947a-23e1-428e-bc89-8913db14f010',
                name: 'i6a498b37o2fjhzv1g1y8e0rsyjzr2wizfh2ztk8m7gtcm5k09f73he8mjtycxgxca7heonb7kfeml6x5cc24fnfmg2aocv7hcvr2g3z1u3ahfw96080gjbn65ay49b243zcnsoly05e7buforxxj0puxq2wrstjm7qlb9smxsf36kv9dppkkxcfwlfbb4ggtc6geziqriddcpv3r7u84twd2loo4fahyrs77pcmka9xkwjcehbmbs3gd1yxjq1q',
                root: 'azs753i5icalqsv5aafq198o5amn43',
                sort: 137803,
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
                id: '2dab947a-23e1-428e-bc89-8913db14f010',
                name: 'ld04uitw1qsb2mkef8emhk2jhn54y2kmo5for4n1ssbitfahb0ulzobw1r3imyv8cs8fii7xjhz1gesckz3gqfjkt6vsr4lxw3634tq35nhg8ih21sgqcq4p4x1jg5os3om7l5qyqrt21cjlzcdi6j5qsaf8zehhsy0yy1uiivp3jyty505x2bdxjz4amuow86je5n6bcno7c1f7wpy48jmwz3enx98ooisgm50yga6prl8x8uh0qqsg42h82m2',
                root: 'vopyk68xcy7hq8zbvtl3cz0tjv81rgd',
                sort: 373418,
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
                id: '2dab947a-23e1-428e-bc89-8913db14f010',
                name: 'mt3pfcwwxalcnx9qtf280856tpi53me4a1hvwep0620lde4245smcgme1e5g21prgc96d0jl8cqj2in937odvvze75hmxbb084l035cmlznoppl3jx5l9jns2ukr3gvmdgajy9q2pjrblceso8dfpg5lnkfiutne8unmzapl9emnqq5cob29jo2saw7cjaqw8eo7r56v4u09jawl3v3gb1cs1k37942pslutkva5z0np74b7r4fnnyjydbaz4rp',
                root: 'g87ynu51vg9wdeis23gwnlp84kzrdc',
                sort: 1138883,
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
                id: '2dab947a-23e1-428e-bc89-8913db14f010',
                name: 'rzttc7u9dbwx6ooskntsn9yaiht074e9oi6y2rk26aibbgpbur1cq3rfam7nogseljbili4is9ml4deprlprkteqcl233b6doju1mqe5oc1k4fflaz5mi41nqpxu2ibnpsssta2u27zgs1yizzgjbuzdv33ejjwcct7rlshg2y9hiljzjljk0ol2pe31z2emnlupg1kb5q8tl8gprylnxm91poova9fbg6624ycd5qf93o43i856c21p6rkpyxi',
                root: '8ri1rx3jyowvrgxwmqdk0mr4z75by0',
                sort: 833235,
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
                id: '2dab947a-23e1-428e-bc89-8913db14f010',
                name: '4d45u9hqnd8lbey9ywi8hvrvn748ycn0mybdx28c6rrmrj43i50qt5171a6d1xluis19d9x4q4zou4gd5y1w1ddbftpnk3dpg2csw2ereu772afr3xd0u4u5i1jm6ck8sg9m822cgehjrqkxtzwjygfw3blcz0q68qfui6q3xiyosnks93ah0e5t921akaekuy55ctu76eu930kl5xgvw89zs7yg71t04j2hbfyopjbfq5dcg52mawy5thnxtc5',
                root: 'wuugjj6ogcfjwm5xv7x4xlerj0zijl',
                sort: 288568,
                isActive: true,
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
                        id: '37ff4870-e3c1-4250-a522-b3f9081e72ea'
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
                        id: '2dab947a-23e1-428e-bc89-8913db14f010'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '2dab947a-23e1-428e-bc89-8913db14f010'));
    });

    test(`/REST:GET iam/bounded-context/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/bounded-context/d37871d6-cbce-4784-b6cd-f67ae173bf6a')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET iam/bounded-context/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/bounded-context/2dab947a-23e1-428e-bc89-8913db14f010')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '2dab947a-23e1-428e-bc89-8913db14f010'));
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
                
                id: '97141029-5d06-4ed7-8551-842a7ebdc0c4',
                name: 'upuf7trtt2kkagb7gpjcs6e6vtqveq2lq0xbin6cn0lipvvlx3qu4id62vzjpro0luf3qnu1f5fmz9tkirj2rk22e2788c8h4164r6xqlpsd48qckm1udfzi3dgwmpv8njvgi3gurq6t5e4as1iy02kvsjn3h0nqsgltp814ft736nikmu2sob5v31lsqextqwjpegebdq87t441y8qcpcicrlo4k6kku4v869ku89pebs67w4jk3prdqr0eone',
                root: '4j86g0lsijupmxfw1s1o48sz4sbvhe',
                sort: 670120,
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
                
                id: '2dab947a-23e1-428e-bc89-8913db14f010',
                name: 'y0b2e4woesorbl4cyew5mc5dyedyzmpukb0m8i1ixzzfiy80es433w3yki4qhq8jlfi7pvmswtxccr0wmcjdwd0sn00t5icf6fuba0tt7yxic3hcek3dc1eavbxshliqjzcw1kcsem0s18236nmuzlddjy2rghllts6f8skv7uwirqo0yomugtliayj5wn9e0wtg7ndhctd65ltln4mlopn2rl6g8481ge0j9lf9hgglqn6ku06dhuyaxj8toif',
                root: 'dmsz67fadq7yavg4mrgwpla9vnlz6u',
                sort: 536162,
                isActive: false,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '2dab947a-23e1-428e-bc89-8913db14f010'));
    });

    test(`/REST:DELETE iam/bounded-context/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/iam/bounded-context/ad4cfb98-3f80-48bc-bbf0-d66c1510e799')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE iam/bounded-context/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/iam/bounded-context/2dab947a-23e1-428e-bc89-8913db14f010')
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
                        id: '63d791d3-9101-4a59-99a4-2a3645ade564',
                        name: '8b96dtqbn2plvn54zo5nzw48c978vkv5ozg9zm8cnly8a08wur5qxcv7e7n25bet912djdruindtdkdz66qlxdeqetwh2ugj34fsswt1l4xj8zryi0mqx35vj233833amebeil93kujm2mlg7ebw7h3acvt77wnhb58vkywqnq38h5aumeqg1abt1xmzhoe7qewizn57lq0vnbbesfpjj1b1bqvvwb26hx7dz1ld7yqg7qmed4zivlkowpqwwvv',
                        root: 'vorn7egu2jhoyluez9rd82y0cbrch9',
                        sort: 588578,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreateBoundedContext).toHaveProperty('id', '63d791d3-9101-4a59-99a4-2a3645ade564');
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
                            id: '8140b2d5-d6ff-4125-94e4-14c6cd4d153c'
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
                            id: '2dab947a-23e1-428e-bc89-8913db14f010'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindBoundedContext.id).toStrictEqual('2dab947a-23e1-428e-bc89-8913db14f010');
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
                    id: '0010304d-046b-4b9b-9a9e-e6d7ce6f95ff'
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
                    id: '2dab947a-23e1-428e-bc89-8913db14f010'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindBoundedContextById.id).toStrictEqual('2dab947a-23e1-428e-bc89-8913db14f010');
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
                        
                        id: '3ff7bc77-69d2-4fc9-9d06-31d82bd8f034',
                        name: '9vv84e9s15bz6120ro6jjkd6xhkz3c4js0uxekqdz61ng8axr7gw48j99c3cgxuptkjx959o65tkw2wqlcq8xo27famnadbx748kp5ommhallbi2xtv168rdyj522icvmyfs6uvjqupto8oewlqvggfoi2dgbgeq6cqyd5mxm4crgbi2rof0kbzngkf5lxcf2v1hqg1etr0gsf2tggt2s3hyarxhyut96u24bqzsw232duacl2g31t9z6kbbgw4',
                        root: 'vnqq48p6kqpul533mzenvrtra1z4m1',
                        sort: 202468,
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
                        
                        id: '2dab947a-23e1-428e-bc89-8913db14f010',
                        name: '3vjyv7v19u0czu9622socowhuzc6lvezu1e6o6bl17ewnni2knrqkzzk2fz3zxs75ub639rscd2o7n5d0v3i0dmb0n57c130ldgaaq2o1i6h4pg56mh4cqbeeqdxgu8zyavyxylf9f4oomcdhq3vcz2q8r4gh9uktq3war1mgdcklko3vvqtstyghzykyy9k4pjof2rbr8f95t6lang1lyzgo4r6szvxeyddob2v37tcfgcz43wk2hd7i0mmizx',
                        root: 'l6r88019xd9wz2fw4h18s2ft3bkh1t',
                        sort: 784909,
                        isActive: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdateBoundedContext.id).toStrictEqual('2dab947a-23e1-428e-bc89-8913db14f010');
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
                    id: '4b918a3d-93c4-49ea-84d6-4e7c562af51f'
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
                    id: '2dab947a-23e1-428e-bc89-8913db14f010'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteBoundedContextById.id).toStrictEqual('2dab947a-23e1-428e-bc89-8913db14f010');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});