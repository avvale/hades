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
                name: 'ihi0ibopz9lx70t7bj5k2edmtyft16kupxxfj3kbs1q21h64qnihmzx7ronq31oxu56qv3545bxi2f0u2c30a5k6nby7bxoy56htvmopo7c8jyc6vleo4zqn6yf4193gn4uqkwa42x4pei1junbkdrbksh8hr1z455fpbw7vrdky4yo1dke9koao2o2zdl1bwqndlg0zpbfdiy8dvgjznue7rvtvjft5hklvvhik5v8zdlh9uz35vvlb7zx9jrr',
                root: 'c2s1okayom7ncdn2xfr0zyg1owo0nq',
                sort: 219586,
                isActive: true,
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
                
                name: '0lgbwbagw77guch27tov8lmpqi8z74q518cqmebnyrz3p7rgfg4awg3pus4b51rp9wjo5ywsznq824eaucex2teq28g6rddcuobfqh4wgm4mt75qab44b38i4czat540wpjmpka9qmlo59g4t3quqo5ukylzwoy3mfpdqgvfz19nasbe6uceyk5d1jcwbvfwoi92xrwhv69w144c77qsar4tef4ms9solp58a9dkpmg9mdkvcnuy4jiqbkjvh6k',
                root: 'yol5lq06kzq1wjqj2hoi9gqckb5hhp',
                sort: 522403,
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
                id: '1c53b2a6-5187-4ea5-811b-262093e32d95',
                name: null,
                root: '8se4hxxrsesann2liyixnp9a6v66c8',
                sort: 771683,
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
                id: '1c53b2a6-5187-4ea5-811b-262093e32d95',
                
                root: 'bx4qqi2jqtn475gzt2cu8n0438nkdr',
                sort: 253183,
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
                id: '1c53b2a6-5187-4ea5-811b-262093e32d95',
                name: 'fzx3qn8tqfkbf2pq29cbd5l53lq4gdvo6y8nqdjp20j3d3n57wy4qjjsom831g4jkll2eee2oqtz20ldfq0cdqoof7v2qjmxb9d336hg7fnuygm1bv4xw5445bxro0plimd8s4jxe9msy2g2hycjeudx8864ho0ihnbf0h0mu5h7dy2xemjl30425p11z4sb8z9uxgnh9kr5xl5vmo5le794h65x1wg6fiz104ex4l9ny6ovg4bkwa1d37jflqu',
                root: null,
                sort: 769593,
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
                id: '1c53b2a6-5187-4ea5-811b-262093e32d95',
                name: '80hjwyl9yqhgg6010ya4yfw17og3g62xahon6sn0ls2fy2nx2i2zjejawy3skrc6ec59ongyqbhdk1l3fa44q6a1494i4qd6jhaaazwkmu1becc2wsf34vr5qspximkzcyaaaaa3mvdbo4i3ofg7i8a9ajcb33ejxrn35s5t98l8p5yoy7nqd498gl0zbv7dkqbdco8jzsq9lunigik8udrhn7n74onrdfy08wkkii0j4ppsr86fewl6web57l1',
                
                sort: 322411,
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
                id: '1c53b2a6-5187-4ea5-811b-262093e32d95',
                name: 't35xyg9zglfyocyafb5p9vq6tlokvck3l91oy8g3ffp4oc3g2xjf6nntlape251fjxb22er8p8iqgsjukce0mjqvt0rme16aw6tgpldwizud8dxcrpt1z0nwbj6pwc72fnvhpzlo05fkywptnnig5h0odni36zh5riv5xz0241agjk8ss4m2r3o835cufmclhpu7aozbt5xt5bkyvgl7llkh8qy4p0iohfq654cz4g6mne2ofy9o3ler4v8wvsw',
                root: 'wszltne1vjxiplsq3nvwfu12f3pa2f',
                sort: null,
                isActive: true,
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
                id: '1c53b2a6-5187-4ea5-811b-262093e32d95',
                name: 'akx36jnzy62213i20h27279dsaazyczj4c7qiaw84bc5lvp73cmsazkiiygvjn4s8ell020t9p6ev7kzuu2h457jjuwkhev2z28kw6fcnsxicxjx5v0mjmoizraj2zsnwjkg6ja06c1drs7afi8ohdknhjo2m7sawy0o5u5bdzqy930skrr41h2t7lb4efirbxmqu9afpt9jmwmed5osm2mitxovag7xp59lvcq3l1nqaa23jhrh5eeaqszz4ax',
                root: '8p4dtryewiva9sqk1dc8sn17c8agyr',
                
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
                id: '1c53b2a6-5187-4ea5-811b-262093e32d95',
                name: 'baefw6621jh9esqafpyelg5m0vencazfrhv3s7lhvvz9xkv5jrmg1yzv1fklaj9vlr93mx7wa51sps7szvsp1r1xl0rl9hgrwpoq4ab3h11iab2recdfzxhmr9cy2zmmytu0jbt6uir4znq1pytbofnbdqz21ll4y60b3a1oa4rbpbowlsgvre9ukhsuwv4dxdnv0i62vb15x71ozxo3pakpmq93igp17rvxbpwh5b684ocy5tqqql0v2nuai5g',
                root: 'uyvxhy7fj8tiwoi94v79h0zx6d215l',
                sort: 332935,
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
                id: '1c53b2a6-5187-4ea5-811b-262093e32d95',
                name: 'idnth4bq56wb9rb3iv5fdzlb3og1epjsbr23r6zab95qi8wui0t5rbtn1l8ykowv99xpr70xssd1rjah8hj6gvyq5470bnhjikq9mahyf2hz4xqf6bjx2qhbwackw52dsksvvmqbwez22mqunhno4ls4igpocuhi5uoykg1wqqbunnfkzjupq9r9adiav60m4qamrqtw294iyj18c9tzkdhzxqr28vxi83rwzqstfemruphnd1e9bes0scziqel',
                root: 'c0mxx0wvh0ljaw1ukdyeoygcbuinh0',
                sort: 665934,
                
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
                id: '79yxf9z4q5grajyr9znmx8u7o23zlxxvqizr2',
                name: '9g00ps4076fong59wevozn282d8eothevbd28x6putcvun2q1ml9fx1ytgen30y8d77b75bc233p9nmeedbfjhtkd0m5g4f3h45ah0ovsiyhaknlv0c6nmp0y4lv0jzyqm0yq072w28wditi9wbsq0x0occ8s5pnvbz735xwp9qaoay57yfbow68zqesbtq9ydqpgb3ktkm1q4j3gdez6u4ads4v7ecg0rjeh37232803f6wwyjfzhil4ihz0y7',
                root: 'mbzfntwse24avie8k6e04sq59g8jvp',
                sort: 296405,
                isActive: true,
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
                id: '1c53b2a6-5187-4ea5-811b-262093e32d95',
                name: '3tmsy88qz0tns51rk0264shy40catfo5kmugwijusx4qreqggjn0tnt3u3p7up13slklcrw8bowjwrukfv6ppvln48zs587e44gezjrllcftznvaa07olx4e7ehjtwroyho0mvmznqgl3hvsj226hmsliky6k44j9o82cj4svy4pzk2rp0c58xog0gt7iz3tsg4snbwanp1ahofls6e6hpcqrl3u3ah292syfzitrgjcwhfl5yh6z525eek2kmst',
                root: 'hvciy5q5q48b6ovzbmc3j41vuuqow7',
                sort: 462064,
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
                id: '1c53b2a6-5187-4ea5-811b-262093e32d95',
                name: 'l3523n1bq9yd6baap62uumels9bl4lfndnayq73e0fqiumyqli7vms4yz02eeteh5kmgh55fmwep415i1nznbvj3040hxzak1dmdosjrgv23979ehe4fplkby5v6nh84396anyjdznfz1bdxj1443es50qkjt3yc113iwcw8o8ln7e9o9ev0g9ic50ualtuuruzhos6hr26qn79woygujbs9q4rcet1h1rmrjrl7zvce9vijstnkranwgeivz2l',
                root: 'oaccf8a456md7a6i8of67el1nc5utln',
                sort: 567365,
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
                id: '1c53b2a6-5187-4ea5-811b-262093e32d95',
                name: 'cbxi5am15mrqrg11113ogx8tm6hdqde9wnrrfzf7xwg8ammkwf7ps1m5vyhe11wogz3ibl2nlhql1lsdyyqgrph5w0i88dp71lsmlzcltfb5kchztcaeeihvtwaalo04htbobxpap5cg84udb83hwa6wg6nj0zzzugcc2con5tywkqipbye36lidi6f8lvx34ivpb56kuhho9cdkzfcq37jwwlq48y2xjakhy3bhja5b8fwloei9bk2kz0xb57x',
                root: '86e7snd0z9wg8uqjjqkhx3ps451vxf',
                sort: 5601950,
                isActive: true,
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
                id: '1c53b2a6-5187-4ea5-811b-262093e32d95',
                name: 'rbik5t62aebcxxkrf338q7hpi0coluaylf0z9kov6zzfz7eqp4tbsmf4dvg5xuio6762u5ojcroa0pnwy5ys1vrwlhp6o4m34rldtbcm90mejm3qjzbtn5q3tmhbz8fn8wzk45g3nr5117ui7r7w1v3cuuyxxzzdmh3i37288faf7qvhvmxfbrp3udyl8g1knr4q0e9bp6pg4otpn7wslkizglrldtco1aumvfkihp238fwqypi41sxpcrig930',
                root: 'cezl9gp1r8cdbzncs72k1k9o0y12x3',
                sort: 494061,
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
                id: '1c53b2a6-5187-4ea5-811b-262093e32d95',
                name: 'rdvmf7scu81rfz0yj1jy3tq7lryaas99ko2wmobbk64cexqor9ajls1oa1l0n0qam1fv8i3mysnfrh7nh8jzvlbwo671sutdph2si1fx7cpj9sxm5lpc8u7i78ffwpztgextl5u096atx4xnr2ivjcqcv636b9d3goqokdgnlyxh1twp3cof6wwi3uc6m5x3qdtibhsdt7ihe153z8k4l56y93r4bn7vpgb129cp7e7ogb831sswye3evneziqh',
                root: 'hm8gejp89r7lo6is89eptrx1j9b1bi',
                sort: 467366,
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
                        id: '9dab83cf-df2e-47af-bc50-1fcedeced8e1'
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
                        id: '1c53b2a6-5187-4ea5-811b-262093e32d95'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '1c53b2a6-5187-4ea5-811b-262093e32d95'));
    });

    test(`/REST:GET iam/bounded-context/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/bounded-context/26ff941f-06f6-44bb-ab2e-5c270ce6ff18')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET iam/bounded-context/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/bounded-context/1c53b2a6-5187-4ea5-811b-262093e32d95')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '1c53b2a6-5187-4ea5-811b-262093e32d95'));
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
                
                id: '92f0a0d2-389e-4e56-983c-f31844088891',
                name: 'eupit0zh90qjis3uujsn71j1dq1wq7c5y078h8v30s07gm7kjjwtka9nq7m5vbhnkmux61yql9082k84b7pa704i8h0gcodku5eav3eirg634lxl4mbkr4syq2nb76uxzrtg9xjo2wyz7k1prg94tqdnt2y5323dc6ix8yli0bfdv9z50phghrigsbaw76y59hrho0txzcv7x5zpv8op29h28oyr8d01dhorej5nlq6xqmznqa63i7unvf5mabf',
                root: '42xhpwx5l14dt8hzsdol08yjor4jdr',
                sort: 434684,
                isActive: true,
            })
            .expect(404);
    });

    test(`/REST:PUT iam/bounded-context`, () => 
    {
        return request(app.getHttpServer())
            .put('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                
                id: '1c53b2a6-5187-4ea5-811b-262093e32d95',
                name: '04yxg3ro3c09buo7vz8hg1aell5lsk93ifha901pgpfhobd23nus7c0ry6zilq6hcfn2aueamk55x0xz6nad2ilr35wdq1bxrh5xaz3vy3ngywr9wl5qdcq8lnbtb92r3etk9tx5dmx9kufumhld7hjtffulk49nrwvwbt8jg3wk9qg0jp5fgynqb1wqnpfr3s5klbp7878p6u7wn7y8smmb08kkh8uaypjxf83hnrlelsusgs2gngxohj0p8rp',
                root: '9osxgwbwplwu0pdrlbn5tlgi57vmcx',
                sort: 803444,
                isActive: false,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '1c53b2a6-5187-4ea5-811b-262093e32d95'));
    });

    test(`/REST:DELETE iam/bounded-context/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/bounded-context/3708066f-e9be-4d9b-af29-88965198d35e')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE iam/bounded-context/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/bounded-context/1c53b2a6-5187-4ea5-811b-262093e32d95')
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
                        id: '12655a61-f979-454c-8d10-d7a4259c3e49',
                        name: 't0vkbu3m6s078qkoajdlmfo6nxxdxd0zigwuefjuz36lxfax95itryn2om00kapkdmlvfp7ybzdkw7lpd864fo7wqkmwxt8ti02vfcv5x0kuc3fi29sd39kx873x9qqkgbyzv6o9fdib955wox61swfk38agsatplhxpga4aq2xu2vzvm65fesddebhbhaamxwp1xlmfmi8x4091g2s4tsqogmk5zokyiyuppj76dhjpc7ti2be3qphnippeqpl',
                        root: 'qfsqt12q6il8oncayhczgjbzwaec7k',
                        sort: 331065,
                        isActive: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreateBoundedContext).toHaveProperty('id', '12655a61-f979-454c-8d10-d7a4259c3e49');
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
                            id: '1f7ad3bf-1ddb-438a-b2f3-0bcfbb25f9fb'
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
                            id: '1c53b2a6-5187-4ea5-811b-262093e32d95'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindBoundedContext.id).toStrictEqual('1c53b2a6-5187-4ea5-811b-262093e32d95');
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
                    id: '281cfffb-0f27-4d75-940f-256a739dabb5'
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
                    id: '1c53b2a6-5187-4ea5-811b-262093e32d95'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindBoundedContextById.id).toStrictEqual('1c53b2a6-5187-4ea5-811b-262093e32d95');
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
                        
                        id: '653fa552-4c21-4a84-afdf-223077d831e2',
                        name: 'hjyzbje5h8zgek2xai390sop3u7333hh3nuudqiouq4dz5ih5jiw14erkh4fs82c1izh7hfu6batftqrywors6azifrfoh44mur58p13b6pa6gelcft22b9b9a6eke0iy1cci40zg19rurca0her9bd2kgr2uug65dgjnj96fsmic26xazr03svr52rit6hahmnv2zyin9dso8z8bv0sxbf2hse79xkj1bhz75i2i01noou98p1q9s2atwtmw2s',
                        root: 'fmqwez9bp64b7pcbcgv8g3vceq01gg',
                        sort: 368274,
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
                        
                        id: '1c53b2a6-5187-4ea5-811b-262093e32d95',
                        name: 'c6kq4sbha76zjbr19r3m6wg9pbxq27ojbvcybylfhcvtusi0j6i8edxjfrdwmpxk3qqru5xb5pfac7ed4q7x9h1c9l1psn24k908b1ymtuldnwz2eo81qj70o41r6zec3si3dng798cecz86cs3w3uclzrwglzh874gc1yi0qp3ua1l8jcpehzxo1y5ye4ao7t276rviybe2u9qskxlcs2epkfy41wxuwxmxhytusvm05esovqtflx39hsv5rme',
                        root: 'sje3pu2eajzm8kakjm73ipl1vvzueq',
                        sort: 180477,
                        isActive: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdateBoundedContext.id).toStrictEqual('1c53b2a6-5187-4ea5-811b-262093e32d95');
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
                    id: '01717690-3900-4749-960e-7c230f12a7db'
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
                    id: '1c53b2a6-5187-4ea5-811b-262093e32d95'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteBoundedContextById.id).toStrictEqual('1c53b2a6-5187-4ea5-811b-262093e32d95');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});