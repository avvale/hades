import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IBoundedContextRepository } from '@hades/admin/bounded-context/domain/bounded-context.repository';
import { MockBoundedContextRepository } from '@hades/admin/bounded-context/infrastructure/mock/mock-bounded-context.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
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
            .overrideProvider(IBoundedContextRepository)
            .useClass(MockBoundedContextRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockBoundedContextRepository>module.get<IBoundedContextRepository>(IBoundedContextRepository);

        await app.init();
    });

    test(`/REST:POST admin/bounded-context - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: null,
                name: '08qka57m6amn82917nt4v29fttpwpgpbhyiamqpk7hc4kxmoef2twardpd6001y9mnpajzoiw2wzv5uh23jje5kdcdfkp3rmfyieu6nnok8fiz00pkqx466gnrsl5ofcuf7j1s2ckq7a1qd46m4i7rmcg092uh0px9ngd8b78bcs8fvzsq2cibvf6th09zjrdlxr6dph8vodw5sih8koa99lttcgt0r1w430ywtakf5x7uu28gc5fnd0ieye3u6',
                root: 'ppdb7tyd9yj5wsllyw13',
                sort: 563147,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                
                name: '8odhfss6magx7ua203ulisa7d3c80mgxjdwtyhc4yx3rme87v7u8ig92d4nk4jx3nl4qu93t6yhxnxedxa3opoiqsy8u01eyjt8h2li35aw0zsckad5dr9rjtvn468909pviw5j806mvf0p8b8n9ohmybl5n5gypspas6yy33o7hbntrzwgcauhislowtiys3kjpm007h5dul1k1emcugd6geyey1d8yhw0c4zsk4q7f0lyldpcuols554f5rjg',
                root: 'mvzn8r5g9quzw0o5pmaa',
                sort: 904486,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '357f268f-c497-4fc1-b1d1-4f6dfc8e4079',
                name: null,
                root: '1ynfu6m6cfs1y9r01wyq',
                sort: 645931,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextName must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '357f268f-c497-4fc1-b1d1-4f6dfc8e4079',
                
                root: 'md3q173p1r0p6o9goheu',
                sort: 312806,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextRoot property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '357f268f-c497-4fc1-b1d1-4f6dfc8e4079',
                name: 'bl672g4ylkoi945rmu78d9i372vz15w9kxduy1b11r1jhhmosbod36a5tdi6o5t2b1iywnt5t4k0ndgocloe14nvplvfaciio5mnnomiodiw80oro0ozef5s032dcvufqzrbul7d07x9zrqs5vhlex5ftz6lol2sdkn8eer41eca1xa91zr61d73tij7veqzdpc423r7hk102gw2dn134erd65hkq0d4a8g8e2t33an06852g66vmfeck72nm7g',
                root: null,
                sort: 484441,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextRoot must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextRoot property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '357f268f-c497-4fc1-b1d1-4f6dfc8e4079',
                name: '5vnfw598dyfagljtgov993sevz5mbfxrvxayftx0oqgcz1uyvy0cr4tbyfdl3kywhvliyj6qy5qp4soinb6ogc5a14u0zb4faljvfaii2sb71enx16axyggy89iy5rnc2tkgtkx824ke2a2zh3h3m0xy0ypgj030rm34vnaf9uac6zu1wqxu2eowhrnp2g7gls1ah06nb7lfwkktlh534tjcd9l758xihjmczasws1e7hojpjqyog0anusn5c3e',
                
                sort: 396093,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextRoot must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextSort property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '357f268f-c497-4fc1-b1d1-4f6dfc8e4079',
                name: 'uu9jt1mgv6ex27mvj2jyi8k46wwmoibxd1m0yhc4vcvafgtoemhjg9cxflpg7erqlzue4ns32x39ass4y1xf85t3fhbaaldzvejgcdtptda490bcp40a5x25v0ltdjbqzelqd22a6lz1231h1rsxi6hz32kyw9bztoe46thyd4t1r2qh5jn9ogg86yix65gcnym5ba95wh2a8vjnj8ud50d0t0iqvqiqipik23xcd0igg8wlsabjy5k9p1hofa8',
                root: '7vw8xmxljd3eg3gh1sfk',
                sort: null,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextSort must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextSort property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '357f268f-c497-4fc1-b1d1-4f6dfc8e4079',
                name: 'mgnoomho2wwcth5yk4a1rem27geja5rkogfsbewxfftx5vb84buidm58rwra1sr5w0t5p73wcfrvvpnk6vtzhrmojpxcsv94la4amc843n82cvsagqdr8hjhj8i7kc5rimh9m62i63n7n829uq2866sqwwqsc2isddprm1nmvz7b6jobdjw26jhly6k27weaotx1kii4eqiw1s8qfr21o80ysvyf7hcyufi2l1a9yfmvefd7xu9vlkioxdtxaom',
                root: '4s4a6sbj55bhskur8k08',
                
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextSort must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '357f268f-c497-4fc1-b1d1-4f6dfc8e4079',
                name: 'pe8jn7ukjnz8g9t31w66ked8cgaay4kowmh23w4422yl4t9h2u22fzd144qn9653za556tfv9qo4f7lxrcflrz2orcycwlpbtkvluwrkos7pkq45kn3zb7y41yxical6n1hvrdbqhfsgpmruibw8dcrt4q73r5mi9zgm241pcyr13qqaitykc1jr053cnd80pt683vlv2het2c6hu57pqqoi1txxfwthfy9o899ozjje0h9e93mcpr820upu46p',
                root: 'd144umduzvkio9c5ske7',
                sort: 515838,
                isActive: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextIsActive must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextIsActive property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '357f268f-c497-4fc1-b1d1-4f6dfc8e4079',
                name: 'synptr9270svk3jep8t7vpfmcy264pnllnqx464om3vi6qqohnorle7tznx7riklk3qtc8sgfeentctq6rxh5f2coyn31txiks0sjroylrub2qiuumpiaf6fj8pz2sksm51ci0ytei1rur516k2rv6wbo6amxaxfo3pgfwtsfpqjprqu75njcbtktpbn275ft77sdaiol3gejd74mlzkh3uivox6p1eiblvd8406ge9cwwbo582jslhu4mbnora',
                root: '7yq9qm5mqwdu87akbr8f',
                sort: 507946,
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextIsActive must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '2kdfct1udck3hzutxsqcqz8vfntr2fincg1l8',
                name: '8uy4slnfvbu1y3yyh5cgn9fujlz6p96v7d97f4pvvjmmohj87s69wkap0i2nbn2qhqcah9vss2et4mgbvtlj6kw4v33mlr1q2d7hvzh2o9bonp2zmr297bt20vc68tz2mgf565gd9gclpgrgu3illm3kxc4k4gho4xevnii1oonemyqre5szetzbwr1fzbiwc5exq6o82ceob65sz5f6alfecxcgjjchd1w1rsc5z8k5b23a98zw8w6elk4pesl',
                root: '0pg893wpyq690bhgaoq1',
                sort: 264208,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '357f268f-c497-4fc1-b1d1-4f6dfc8e4079',
                name: 'h4mduj17qlnhs719uq2wfvef3fd8z8j7l2s0ymf2uxifykdj6ls789hezp8xahy7fxe58jwwyj368x0vzboo4lq1guz8ud0wbub6sxr37c09peq7ungzlexg8mnkfs6h5of35hvybu29jpnh1i7e1wk2i0soplb5vvlg6optq8gn9d4o4a1v1e2zsbjt79wgxb3ibgifn0hyggmu4bpbleglx2o8hg41ensc3x8b0os5ubb6bdv96s83eiztj9lg',
                root: 'z44c1ud3sysqalw3zwut',
                sort: 835573,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextRoot is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '357f268f-c497-4fc1-b1d1-4f6dfc8e4079',
                name: '648reyg3ik0o9qmvh9w5qu1gwaipjgrjxeu15v4efexiz3l62sd5pveckwdwctkajclxbuxuta087vzagycj9xa7z9hjt1zmnng8tuaae6vrno76u5d8dsort7j4yqp3o7iqumqfkpl7tq2a7e1uwf9n43al8zctusuzipitllgft66spm7xin0uox7tj7txbvwiwrdbnosgr30hi23ewyxjkd745ho90lmgmw5udnx12foksducheiqfaemttl',
                root: '5loy1u0ssycflfoabz2d5',
                sort: 756484,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextRoot is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextSort is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '357f268f-c497-4fc1-b1d1-4f6dfc8e4079',
                name: '7sozqx5flb4xtwahoxbzg15pr2cjldsn3ky7fvmbwxj8jm0c9i0e8yqo73p81tstz3itd3rhsshytpn03nn8vw666okhghuv92eqsb3xw9hqgfxsk79g33sx1m7vda8swdfw3e55hpfwqtv61kwhrfwrruup3za3ay9czfytkwrwhm86y0tdljuitruyu8249dzqbwwp85d0vjt1lkika5563wr1o4p37m50iqbptnuw7cyluszbm97tp1enzh9',
                root: 'dydkm917qvm9amu046i7',
                sort: 2063950,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextSort is too large, has a maximum length of 6');
            });
    });
    

    

    
    
    

    
    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextIsActive has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '357f268f-c497-4fc1-b1d1-4f6dfc8e4079',
                name: 'r4xl5in660dwbuwwnpzplb4go77t2ixgq59scxqfyhznn94ne6ja2yfe3my5rm8u1ojeoqnhi04hkyv31qdrmw4qum69whz501t9z79jbpl87gik0yqg9paswlt4fmp33olfkx15c8f0ttmiu4uu1t5uenmvk3zpwwwb4afzd7xpswk3bhivn9z7hjhasbk2u1x4jgpcm8pn7meuae3l11o81rtdz37h9izec2sq0n392yjgq4onmg04z81653l',
                root: 'cjywi1i91pzmmry6bmmz',
                sort: 611398,
                isActive: 'true',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextIsActive has to be a boolean value');
            });
    });
    

    

    

    test(`/REST:POST admin/bounded-context`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '357f268f-c497-4fc1-b1d1-4f6dfc8e4079',
                name: 'sw44v27r6c9t8e3a6hy9txqh53bs2i4yjyjrd5zyoo02h7wuumd31gyh81176omwzvya5ripp18bra7php4xhpecyble3b58deen0ve450otgpjrmuyh1j5uldvuvqv0uio4glgsyce8jf3d2mdou6abcxdea4wu22kz581j97bvexd6vfgc8gboidhlnux9nvh7ar2ajo10eiy9un0btujec7xzdr187lvh17tacu2t7609wmqxxzvr4lpwndq',
                root: '3nb8ujx2zo1tbbjhkq6o',
                sort: 688929,
                isActive: false,
            })
            .expect(201);
    });

    test(`/REST:GET admin/bounded-contexts/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/bounded-contexts/paginate')
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

    test(`/REST:GET admin/bounded-context - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/bounded-context')
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

    test(`/REST:GET admin/bounded-context`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '357f268f-c497-4fc1-b1d1-4f6dfc8e4079'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '357f268f-c497-4fc1-b1d1-4f6dfc8e4079'));
    });

    test(`/REST:GET admin/bounded-context/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/bounded-context/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/bounded-context/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/bounded-context/357f268f-c497-4fc1-b1d1-4f6dfc8e4079')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '357f268f-c497-4fc1-b1d1-4f6dfc8e4079'));
    });

    test(`/REST:GET admin/bounded-contexts`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/bounded-contexts')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT admin/bounded-context - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                
                id: 'bf1a64b5-2361-40fc-bdb2-77126f4e3adc',
                name: 'a0yiqaw1re2pvc2c09byd4jty4fagpkl1qak7hra9txwwqbyaatwc3v66hlx33qv9sx0bitsvgwbxbgj9r6wa2tjkfpg49owgobq9i2kg9351e8glyqdb1mc1hfl404kjpotzjiz56mipj4d9nkayk5cixtxl9r5f08rkmfot0sux5ovxy9fznk6t4v1jn8t5kvssxoadaxjd6yvfrg0htfgzyo1zuq0ewzun0sfyvjkspov256aayefdr62bmk',
                root: 'xp5ppd0bmknzfpl5dj6t',
                sort: 765282,
                isActive: false,
            })
            .expect(404);
    });

    test(`/REST:PUT admin/bounded-context`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                
                id: '357f268f-c497-4fc1-b1d1-4f6dfc8e4079',
                name: 'e4sjw26ha3trng64scf68wa6qx045542w6a1q6u4s4atpaauea3i702kqajp7me94hbggyi14zvfibezy5ywoj1vzktnbpi36fxnhh4rt8dp6j1z32qtgei50e49u13gghfpe2kxbo0nmxd5xcitje22labt8rct5rtztpivo3dc3j01ogfi9jyyv4zphv47h1yi525cfevi0djmh3tk150csx8nzj0vrt3tiqdaasfv1kmte2zfk6ttuymav09',
                root: 'mswasy2gwdlob6d23vns',
                sort: 212622,
                isActive: false,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '357f268f-c497-4fc1-b1d1-4f6dfc8e4079'));
    });

    test(`/REST:DELETE admin/bounded-context/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/bounded-context/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/bounded-context/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/bounded-context/357f268f-c497-4fc1-b1d1-4f6dfc8e4079')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL adminCreateBoundedContext - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateBoundedContextInput!)
                    {
                        adminCreateBoundedContext (payload:$payload)
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

    test(`/GraphQL adminCreateBoundedContext`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateBoundedContextInput!)
                    {
                        adminCreateBoundedContext (payload:$payload)
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
                        id: '2f50d193-1e95-44ec-84bf-d6d5344d1b2b',
                        name: 'vntpywjjekchkriabisvsmhp9b90oz5yirvfpdrxmjvb1912biy9l5lud98d5ouea6p594ukf11x6phfld1fxd6d1uk13kwwk6cj716xdmqmdyrtwegx6sv1v3m4bvmppt9yt5hjdcywcy7fhf2hxy6wwjr9705cev8fhu4iltf090ra0c0o7sukkm06osmmz6gs32tjbbj3wjuc29gjsfnyj8comu1z5jaam04jgptrdyu2xlu14jq6yd1z554',
                        root: 'kbl60qo46owrx72814ok',
                        sort: 715663,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateBoundedContext).toHaveProperty('id', '2f50d193-1e95-44ec-84bf-d6d5344d1b2b');
            });
    });

    test(`/GraphQL adminPaginateBoundedContexts`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        adminPaginateBoundedContexts (query:$query constraint:$constraint)
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
                expect(res.body.data.adminPaginateBoundedContexts.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateBoundedContexts.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateBoundedContexts.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL adminFindBoundedContext - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        adminFindBoundedContext (query:$query)
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

    test(`/GraphQL adminFindBoundedContext`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        adminFindBoundedContext (query:$query)
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
                    query: [
                        {
                            command : Command.WHERE,
                            column  : 'id',
                            operator: Operator.EQUALS,
                            value   : '357f268f-c497-4fc1-b1d1-4f6dfc8e4079'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindBoundedContext.id).toStrictEqual('357f268f-c497-4fc1-b1d1-4f6dfc8e4079');
            });
    });

    test(`/GraphQL adminFindBoundedContextById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindBoundedContextById (id:$id)
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

    test(`/GraphQL adminFindBoundedContextById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindBoundedContextById (id:$id)
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
                    id: '357f268f-c497-4fc1-b1d1-4f6dfc8e4079'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindBoundedContextById.id).toStrictEqual('357f268f-c497-4fc1-b1d1-4f6dfc8e4079');
            });
    });

    test(`/GraphQL adminGetBoundedContexts`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        adminGetBoundedContexts (query:$query)
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
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.adminGetBoundedContexts.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL adminUpdateBoundedContext - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateBoundedContextInput!)
                    {
                        adminUpdateBoundedContext (payload:$payload)
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
                        
                        id: '1b672bb8-13bf-4437-a33d-f424ecf326ab',
                        name: '59ydxseyfx2tc5yxs3ocavms2r1fs5hv82qy1u0v16yz6k9smo4bf4xnx07bwrdb0up11n8nyzb55u75f4xhuwdlzxhruwcl2ykb2j4bc99tjrwcbikvidum9wwelpckuyqcfdqhwkm7obyd6lvt37sq9m0kcnbea7kjpxjg80xk21f6yibbado43psxa2ebechtznutvfrfpfrx8vlp55e81mp4g6bjdq58vrg4ityrhvqdhxw0wrl586l5jy6',
                        root: 'gifa73yko7b6s5q1hrso',
                        sort: 201155,
                        isActive: false,
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

    test(`/GraphQL adminUpdateBoundedContext`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateBoundedContextInput!)
                    {
                        adminUpdateBoundedContext (payload:$payload)
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
                        
                        id: '357f268f-c497-4fc1-b1d1-4f6dfc8e4079',
                        name: 'mqb66ffdeq9n0weda6mx7tjzn60nk6f8285oie8o6trrcne5uqnrcfay1vugtmz8c0fsgn83g8k9umfa7szuwbynyq0y6wu7ai64ina23qzslxiw3vtcxqryr4zf75ynmxe3ajh7an37jione8j4g1thl7g02d7jyq06h9y85wdzl206hnsp7apkgdqmwjo9w1zagxydpbpp6wiak24397djkbjxeg4g3m7imtb9727ytal7b5o8q5axy3oy8z5',
                        root: 'vsq0mh46nayqji0a4lcm',
                        sort: 566875,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateBoundedContext.id).toStrictEqual('357f268f-c497-4fc1-b1d1-4f6dfc8e4079');
            });
    });

    test(`/GraphQL adminDeleteBoundedContextById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteBoundedContextById (id:$id)
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

    test(`/GraphQL adminDeleteBoundedContextById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteBoundedContextById (id:$id)
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
                    id: '357f268f-c497-4fc1-b1d1-4f6dfc8e4079'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteBoundedContextById.id).toStrictEqual('357f268f-c497-4fc1-b1d1-4f6dfc8e4079');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});