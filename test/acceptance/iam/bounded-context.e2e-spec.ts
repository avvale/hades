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
                name: 'egddwadjbwk1g3xaty4boilquufk3g28pl28ldf3vhf5iva5lnia9o48iy4bqsn3lgvabbqoxpwwoc15tculane1e0i0o3bkrzpm6db1dp0zv0krn5fa6tj6nmvocpcki73dnxsrhp8zsd9yz18s1axdmjuvp8cotv7nbhoiof8cy3r7bz0gstsb5qkxgx3wu1a7svbt0fsiaqgrwgbuseb6sswkh4ul3fc89uu29p0n6m9jpe2vt41496hbiae',
                root: 'jyv9pgci0bkz3hpg9ngdtfb3fbhmoy',
                sort: 383911,
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
                
                name: '5r5j0hptl9w075bygt2ag3m34cici19dur35hvvcpc9aktcpqm7e96ao5ogmyz7fn4y0f3kpaea3bnvpkxwnidgnagxk405ciegui0wl0okfdu5dbn0synxxykolasvs8ppsufjsym4k6ikrudf77aa6seinwr1cra9eukbh1poexpn7z292xo7av4g91j6961eg6zg9iepbyzr8cehfvhbocgmynmjkm4v7rnbmxi6sdm2n1rijb171n7zqtld',
                root: 'sogbfyiu55gh2vw73w2spblkguham4',
                sort: 905283,
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
                id: '969fd7dd-109d-41d6-8da1-6504c5bc7dd3',
                name: null,
                root: 'jng02kdxwgxcb0gksew3p3dvcsqb5r',
                sort: 697264,
                isActive: false,
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
                id: '969fd7dd-109d-41d6-8da1-6504c5bc7dd3',
                
                root: 'ys92ft86euo6cismzde3859viengqc',
                sort: 938528,
                isActive: false,
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
                id: '969fd7dd-109d-41d6-8da1-6504c5bc7dd3',
                name: 'zic30l6x79drkwsw1mpnh0ffdact01hb2ckv2o4117tya36tzkw1y37iz95zn3jpa2lot5nzhjkx59yaq5ndbq5p5t3uoggpy4i4lcrcr8izsc8r2b0jbrfb5cud54hrhw40ap912bh4tsh99cu70ajf8we6zyu6z1wjvlw1asj5eofv36t9uaxwxidupni9j812153zq8o8nr8t9tqtg93smjjc2byruty4hu95yydwjmnai2r6ed1c0tbsn00',
                root: null,
                sort: 460044,
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
                id: '969fd7dd-109d-41d6-8da1-6504c5bc7dd3',
                name: 'qhd34hggg8ybjdqafdrqgelgnnyugd61lrz1rr4k4h87w9u2fsgnjzo8ay83hd3oe9in6s6gsqsxabeqnwvlugrr0g68owwm43khchwz096h9k6jv5wabepr9fibejbeudadad2dzvi81oi92emiowjj0355awfxwgut9in7ntwmqv57b98yolx4kti85nbyna7m7uau9zi52g097g3g08m8qpi5x0b8gjvoowqltmhw081pmqvrf9u4ricol3g',
                
                sort: 683106,
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
                id: '969fd7dd-109d-41d6-8da1-6504c5bc7dd3',
                name: '5gtdg5kq6ftdgcdbaqje6zhohmktpr7d358ft2z2jdog1edjlbhfqd1z98y63jmm492rtk3le2gletm8q0551rhrzvsz415k8vwajcfl4aa4zepuc7hvghbrcvu4j785jq4v1jmthowzxp5tluj89262uup628860ar90ij4olctmmblhqtkn0v4qzi348vznzw18m7etstvqxqc1mqr3qtephm9sqhuhptvhwezsd06kdc80flyl5o6z1xuhg7',
                root: '4bdxgz4ypaj14i98ftswcvgxj2d6ba',
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
                id: '969fd7dd-109d-41d6-8da1-6504c5bc7dd3',
                name: '87re2sw4hpzoaf8tj6p6c0a8p38wo6zf9u9mhgw5uat8unv56d7kga86rit4742seq913fmn6p1s5pwklxb3rir3kdg6i7ubn8qjmxe7m3tuppxpjq6jqv2o88pvhb7dfv6amcvzwdpj86jjxuavjf55jxc746rx5ks9yn0mkpcb9lq7hznby8iqr5u67rietscm65l0udret57nkk7cw2vytsl2j2vgrxh2upz0om8ejn5wqut6vusrel0qfkf',
                root: '6b79pizq8o8d4e4uuitko1jrm8fsim',
                
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
                id: '969fd7dd-109d-41d6-8da1-6504c5bc7dd3',
                name: 'vzvpmb6gn7ee2xtjhabcfsikxuaoith15kjblac5noamf79khshmnlzfhpw222ogdd46adeq6x0t1tg8unbk9n46j0shh3wa5k9jgh7nkjf6rzl0elnu3ujbii4wy90eketb3r3bsht2zue0tidqo0a9nniz36n3osktifls6hunyh2mcxrnbakzayvt3yjlif01tbc4qvnl7dcjo1wgvkcdkm5pb9a8j29anoi9uln9imlrlumcmkde0ptfi3h',
                root: 'sacsj6el7hlqlpprk05iadzj62s5uj',
                sort: 479548,
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
                id: '969fd7dd-109d-41d6-8da1-6504c5bc7dd3',
                name: 'oitf3og573i22zoeybmcztnd9v3sr7ath7wtxlnqi4jl67ssd1nrnfxqgsjom4s70po432uq269blhhhkbrvqplg5xu2jk16qgv7nnaktdrx5r9av49hm55g5u849fpq356a94v1k1c76mxopzk2dzr9jonnb8nw4i6fisa7audjfhffvk1h1tv776a4q0qodqbh8lbdgzm1kfk5ukom62qv3dob6zputraxc0h2pwr7we05i73zt2jxbsczc41',
                root: 'h994nj5reslgpv7bb3yx4vbd2a2a42',
                sort: 554497,
                
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
                id: 'n7d6i5063vj8zb232g9owsz2lxngui5djgdr8',
                name: '99405t0kb0y85251wf2htiph4bwnhwiw0oi7pg2gr8qq7dt775c7r5tao084my4qua7gy9prdt2h7j68w5hzli5cmz8dmwzvr3qrwh4cyoev1uz8ha98v594rit90lxxtpmcoggjyfrms56qoglp4zn841pu4vfqk7ddf55s0kzwvhdti4gj83670lf959xhs1dfzykx6ocmnpxaxrg1lhozqa5n2tg6w3nj4xp519btvpmz554o116p7db2rcp',
                root: 'hqwy2uvq1ou91rrtd61o65l97od45t',
                sort: 688732,
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
                id: '969fd7dd-109d-41d6-8da1-6504c5bc7dd3',
                name: 'o41c1evf16qjvazxr32tnntihhssozmkh8vbz0277d7wmpsel1ekpftok0mx4afqg9vdgl953bk3bhi54r0lahxf3c6jlgm0mna8qejg4xkcpv08x9amz4chbl27unz5gutp4v6h4uxlhmkjlijo2843kz6cy14vta738hbr4a50sg3x8x08yjzak18znupwgh2rhgo6ci2uwinr4wssjuuwdrz28gmt5xswwv6w4fbmziqx3vaztwylf2pg7j1r',
                root: 'li1i815156358ze5qk1he3y1m0j2hm',
                sort: 136691,
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
                id: '969fd7dd-109d-41d6-8da1-6504c5bc7dd3',
                name: '51cqb0oh98hiky8gueflujpirkq6p3t6p1p6yinntiuksqrui1k7pr73d36m1h2j5577x7py77he4zdp4s6vfawzdir19rnnw164i1jtalq4wmnb85ipjft4gedvmjoc4i8entwqibk86n703rw1w9aopky0ontfgcmwoim3rw4q35f45z4qz6runusxurm8lffkntmmixydm4igb7fjen3mnogw0s1gqj1ou5qngy5y6iihom0ntdpxihk6t9b',
                root: 'ir3fliz9oulk0pa69wk6nf1gfh06q85',
                sort: 217142,
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
                id: '969fd7dd-109d-41d6-8da1-6504c5bc7dd3',
                name: 't8snaktdompczt9n03pcqbqy0m2njskfmtjbqom0ubn4kfqe5xno14ljxxgkvitjby4zs5lzwsjfl3je5uke118tqixjxb4ttk47rvnyrid6fo6oilfnoy5fgmljx06n0tjoom2geb1z0o7cj99s0u4553tqtsenfup5at1o49ks7zje2hl37043og8dyu7qg4pjdxd86sxf538fxlq11e7zpm7b3y6adnuat740ettq5391dif1d2i9a93nquh',
                root: 'cfn67w0jcmgbiwr8l4kdqsw1mnzr9k',
                sort: 4364778,
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
                id: '969fd7dd-109d-41d6-8da1-6504c5bc7dd3',
                name: 'jtaj801rtdc4vftcjtdfhx2uf0n5ex4hceudcf07kl7zkd3ahzw63zhb5ze52lig21bkezuagvh2osmp3xejbbctggq7bl9pa6v0u1hri2p2qeg76uyuavyd7ejd68nwnzois4se4b6ukr5ffx53yv0kavhjsv8bvihv3ju0ffhtjrksljd7jjqmn2lm9ikgj0e9iiaga3fsd9rqc1ijvmp5uh3v9xzw1vjk4rk21ll78jwpt98uh9l2h1gwe0b',
                root: 'xv2ab7tvn92wu2pl20c02558czuoaj',
                sort: 299989,
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
                id: '969fd7dd-109d-41d6-8da1-6504c5bc7dd3',
                name: 'ohyv6ytixml1jfv94rkchfbiw189qxcyh43m6dtfgqjioxht4wk25n0s6tce1ec0bg06fulpihqrrm1z12cb8t70plok9585cioji9s46xh4ms2j221pi7hdx05x4boipp5frxiz5rb9wkgezaydx653x0jlxj8ticgbm0n8qeonkv9e8peedbijptciuuhiudtyvdzarmqc69wahb3qaw25lt47r96tmr8mpvpomsw3cbkx0oa3evy259xafsz',
                root: 'gqhyq8yh0r7xij8isrsbcnnywcdbph',
                sort: 605040,
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
                        id: '1a6aa0ae-410a-4606-af2c-e5421e69bbd1'
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
                        id: '969fd7dd-109d-41d6-8da1-6504c5bc7dd3'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '969fd7dd-109d-41d6-8da1-6504c5bc7dd3'));
    });

    test(`/REST:GET iam/bounded-context/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/bounded-context/587dd218-77d9-45eb-9e80-f5395fb5480c')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET iam/bounded-context/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/bounded-context/969fd7dd-109d-41d6-8da1-6504c5bc7dd3')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '969fd7dd-109d-41d6-8da1-6504c5bc7dd3'));
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
                
                id: 'd0d93907-556a-49a4-a026-07754718777c',
                name: 'hhhbuhgmte7pquzgbzldx83o3534tmvpozrcmnec491qig683atdrx4lwwskmpuh5mw7nshtt1s4izf8r9ftbrk8h7io40fjozj1fqhd4jilkdo2i3rgqbqxe26m4jzh2vluvlvyysftnye7rds00wa207nl1bkwrukp88gypm4kuxteu23lsve2yu60zwthfvvl9tg1vc291x0ml5uerms5pvd4ce539jlmmdrnrsl6xr8bze5y044ojx9ztd4',
                root: 'fkvzun5bcqwqrxca3b7trp12r07qcn',
                sort: 852560,
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
                
                id: '969fd7dd-109d-41d6-8da1-6504c5bc7dd3',
                name: '3s9j65092bmnx2qm0hfbij4sb6ia9qjfeu3wdh3gi10ja9j3tt72z0plolylt3i1x3opu1hg19e0fmdgiyqrdr612pljkuks7c06v2i9j0mxyacib5zyv3zb7lcjietu8blck7mmhc7naosrzx7ibuvsxuh3pvg162fmcwib94aak37uxcyq80r9c1a10wab3bwjku9q1y3mswhlmczr5cgk26om4p9xfjvo7v0t3a4tthryscw4v9axicadoa0',
                root: 'lynyw0mqh73cf46uis3e5gztov6al6',
                sort: 964774,
                isActive: true,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '969fd7dd-109d-41d6-8da1-6504c5bc7dd3'));
    });

    test(`/REST:DELETE iam/bounded-context/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/bounded-context/3585a3ac-3290-41f9-886f-4c0c0723ff3f')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE iam/bounded-context/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/bounded-context/969fd7dd-109d-41d6-8da1-6504c5bc7dd3')
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
                        id: 'edd6aafb-90e9-4b0b-86ae-b3c2242436cd',
                        name: '9e4dcok7n3i9u06f2yz56nulb408a871pcdxwx1xohiv375t0ypeih53ttvsjx7dtc2pgylx9fu0wmev2tck9sd2obx19mo026hjh7uuuf3rdqdukkwmxilj53sake8j0lj8yxz55digljcjx1gdsl5ehfh1q0b4ywl9ubmmbasrnxg23zd25nophitsm10o2rspzo7o5hgj4rb2z84dez5ey3ehnair8ekeq6l5qnx2lzv1icnk4caajl2qthm',
                        root: 'qqbau0my5f1rk9ycwfaa3necv3cgt4',
                        sort: 528641,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreateBoundedContext).toHaveProperty('id', 'edd6aafb-90e9-4b0b-86ae-b3c2242436cd');
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
                            id: 'a8a6d29a-6b09-4338-afeb-6ae38bdf0a1e'
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
                            id: '969fd7dd-109d-41d6-8da1-6504c5bc7dd3'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindBoundedContext.id).toStrictEqual('969fd7dd-109d-41d6-8da1-6504c5bc7dd3');
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
                    id: '3260294d-955a-4785-ab09-33f56d23c94a'
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
                    id: '969fd7dd-109d-41d6-8da1-6504c5bc7dd3'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindBoundedContextById.id).toStrictEqual('969fd7dd-109d-41d6-8da1-6504c5bc7dd3');
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
                        
                        id: '528d59f3-c375-48c1-8077-6ad64b0d1aa0',
                        name: 'z1ys67wmrao8us565fel424b3yfw6nyktmfjr6ib27axhw83luxrc3id1w8htat04u9sajyamehi972jynkmqn2u7n85s1idascz1p9xt623hkaovjcg0372g73y2n7am65mfl40u4xj1n3z61if8ust4os5jbxubsdmufh01x5ktgowb7o5w2sl1q17dcd4h8sogijoiirk1p61w2g894qxo3zvt9blhe05wwwg8ky73nhd0cm20wvy1h23vp2',
                        root: '78k5my49px3udw16t8xb7rqj7rjs9o',
                        sort: 577678,
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
                        
                        id: '969fd7dd-109d-41d6-8da1-6504c5bc7dd3',
                        name: '8578kz3wjyfmbc9q09z753nj2h7bcom0fi84zxjkjbsx7qbhgjluuot6cocslel9bj4849p3n4efgmkj9vztqndf29i76e2v8e30lc2j8rx7d1kwndzuiflgislgupe89ozfd68wgeq2198ubl21xavu5oqtngudvllo3k6kxh6p71lifs0lzxnununtx57xxazs97w74xt1jrsre8lrmphaao332bh8lwwtto1zotfkmwp8roaxoodybx8x4fa',
                        root: '69a83ko3nktq91cd5it4w1q02jm3jd',
                        sort: 942788,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdateBoundedContext.id).toStrictEqual('969fd7dd-109d-41d6-8da1-6504c5bc7dd3');
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
                    id: '029379fc-8a85-40a9-9fc1-61286831f791'
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
                    id: '969fd7dd-109d-41d6-8da1-6504c5bc7dd3'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteBoundedContextById.id).toStrictEqual('969fd7dd-109d-41d6-8da1-6504c5bc7dd3');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});