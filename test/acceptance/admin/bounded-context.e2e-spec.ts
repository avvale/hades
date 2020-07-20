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
                name: 'ekeo4511v37hlpn27qj9rc2tt7zbdioe0xqxxo7g14epn83cb9p501eizapoayeww39x3f7zmoqaeg0lw6aj2zewjv0m6x23zt5mcyjylkcj0e5ruv4z3y7bnmijj4qf23su1mvcujo3cxgw2r6qt4i8hzze4q8ylazu609ez3gp98n1irkwmdec9a2ayjfj519tr2zu5wmjhakyytf4azk27wa60cp43yxwxoe155v8dvimlai2v12dvca4xou',
                root: '3lvem1kb4c3smnxfqeed',
                sort: 592291,
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
                
                name: 'frsn8bitpsvm9g4eszxxgc01w0nrzap1u2vxk1yoyi8fm0wompfh0yqpfk9nqyo4jfjuteiq4quv735gzz246lkiy9bbcpjlc308xq40b5era8wlur0zz2mwqohcv9pzxpf68e7hr4409uln4rwi2yijvfmms1ud51tr7x63mtu5rlm9ocyrl9hf3ujkaljcqe27rkrnniqx18nh4odjwxh3fw21jk25moaqzt4989hyxxr0dco57edy3m5djog',
                root: 'u8ndivo4b5c72k9qunlx',
                sort: 631903,
                isActive: true,
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
                id: '5e7aebd1-399f-4e01-9ae5-8bd13747a60d',
                name: null,
                root: 'jqv294uhosejktvqhrpo',
                sort: 990137,
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
                id: '5e7aebd1-399f-4e01-9ae5-8bd13747a60d',
                
                root: 'hzb62nnjyj3ebxui9dm4',
                sort: 810050,
                isActive: true,
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
                id: '5e7aebd1-399f-4e01-9ae5-8bd13747a60d',
                name: '2u9z8m3cw92xg98knbyghlloa64gg7663e7alyhc6ci9bveczqjbkm3zajuh8ghojh6xy69go5wxw9njkiaodr135jdzei5b2pfimo3sxgcwgfe6lbmx4yo11b6m7s0bmw3t746ajraqmgsxb6q4aey25zffs0htcdtrlv9jsx39fc5tmczxthofqb0i8iac385yoofygnsshimindd4knazqeff15qerl3hsz4qg80096u6d00c392tmitmdtt',
                root: null,
                sort: 258709,
                isActive: true,
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
                id: '5e7aebd1-399f-4e01-9ae5-8bd13747a60d',
                name: 'c0kl5z4ehp9i25hifmd5c08lkdz0udlcqdxeztdmg92j7f3d42s3coal2slmd61yao8j0zoi9ejiy3hotiq132mw9nvqkfyedbf16juw92jnar939q7g29bvefdbtkrgkz9at84v6nen55ydag3x77od3usckx2kx5i00hd3i8vhglaxhg3ax0261904u59jfpmwze2dutdca5mfxe3xnmqiy96r6i3nz9nuhfomdj4luiqv9ib2t4mz8vjqzuz',
                
                sort: 522318,
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
                id: '5e7aebd1-399f-4e01-9ae5-8bd13747a60d',
                name: '9wbf1scqzucxktelgfwk0cnnqvphsgppco0uq4y99373fxxvkxab35qlnwxaeo4snlvsvjtasmxgisctj2a8zsypbznvh679nwyswh8wukfc26zaall4dntht4hq3zkhohlswfy2q8r4c8a1vahp3wtr61l750t6bb6hnd812n0d485pm77y3mhb3ksuwix7mqlklgkmvdqzieeitjph7ddyxyjqyass1r8978irvd1sw6kafjnv5qv5r25esqb',
                root: 'b9g9hon62bcbgna2hx6b',
                sort: null,
                isActive: false,
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
                id: '5e7aebd1-399f-4e01-9ae5-8bd13747a60d',
                name: 'dx4jqc682elkujm5ozgwy06l2l5moyo304rdhvenyvi3vmmss7u824u5x6brjrrkhd989srm55cbfadox56sw0y4wywcbvfpsx3kqm3wt8vbwvm73zekh3pwuu5zf88vbwnrq9nls2999dsr921hikzhptp8916uy9pxh4wz76db3g0uhs0ac4l6nfzbepin1yo64vsoq3o9qjhcudewfvr7s70fa0n4v4eyqifo08dye3y5v4w9zwhiuue7asi',
                root: 'g6t59x0hkuipvq90dqey',
                
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
                id: '5e7aebd1-399f-4e01-9ae5-8bd13747a60d',
                name: 'gis2wqiszyt204bji8950zq15sch9838nmdz9cq2gqz57zkg53rdrn4jtpccgbs8k6l01w01lxe96p80lntya443z13m16vcdoj0wrhgtqbzb8rfsdc2qyxk0k0d8gbi5ygzypr81ru7ghfynyb9a727cfmwhmb9qlpxfejkrg98hb90iw5jx7qex4mrj5tbva8emhhhg3ijhj3ksqq6n9x9rute6gdb01italyhzvho2efoa7g5f5lgae3gyam',
                root: 'fmi2ppgkmtmipisdzvak',
                sort: 888408,
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
                id: '5e7aebd1-399f-4e01-9ae5-8bd13747a60d',
                name: 'h2vhfq60i5q79wl6ilz7h3n0lm4hz7trml3q6xnz25uidtyd8qytl2ysrkc4lc0tzkawk49dqk7jvlynho1obowae9ptvmcis1icr2a2or17sbpxdortfrgg792jgnggj3sx1blp8sqmc1l3r7f35hm1eeof7zbyvssyddbac4rxw4y9fdvcvgxj7fv3c8xwrbajn7l24x9nx7w26bbi63v86cfuictkvdcgmraoo4wzdf58a5ghvd0cnctypeu',
                root: 'aq4be6o10jw0ujn1cfvc',
                sort: 687940,
                
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
                id: 'odxiimpc0b7t7k1e75jqaht3euuv8oe8fqj38',
                name: 'ox6i1j62a860rell556w08vmsosqtr4dbvllspf6iy3mpdbr64y8teccdvgt9n3mrel2yho38fdbqvwvcwu08o468osy6zmr27d8ujaczjbi8t6cym7d8maadnh8cvw0b5h4y6n7bct0pnnwz7sjgzgipuhtxvxmlgrlh0dclxrzce0dlrm7ujevbt4lzcvb0crde2edl5c7ici6nd8hd45dohqzbz93khjalaitanfe9ahf04k94tbktrdq94u',
                root: 'jhir9px25dszi68avt0k',
                sort: 869287,
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
                id: '5e7aebd1-399f-4e01-9ae5-8bd13747a60d',
                name: 'krvuuwamd3xwn2bm79o2neudmutncjiyw4p8yd4gomcbkgkdeccb5pceg06fhsr70lwsoa1shg2s8rd4akth4a4f7id9v80x5w88ywj56mjg9436j1ag72zrn2xgn3cq9us8ksx1e08ft8wstox5g3u6ykefv59hmj09f33ljm2qdxcv6etbnxzsthxk04jkq4gmyyzpwabve38u74c64seakdpjejz7wwc1ffvn5a668il2irz4qqjojcxs4gq2',
                root: 'g9wz7nc27lsek4fo3vr0',
                sort: 209297,
                isActive: true,
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
                id: '5e7aebd1-399f-4e01-9ae5-8bd13747a60d',
                name: 'py45fxbek18dq5sk608sux498ol468jqi2sdbdkwq9vvhkwr4f9nqvnz7gk71n2rsm6u8204d7phfhcr9m9oq33mbjklv46h8d7opz2adxbeifk1r68n0t38juoj4q9l7cwxcaklswlnpu7gxwlf8n0tnnyil2nba00f779e41pvc7kvalw8p76ro0h2vdj3i0uarbt62hbh1fr0q4ui147x3rnybsral2kycjrztl9yi37x4a1uggp31setyjw',
                root: 'logjdsiriekpu1rela75z',
                sort: 788428,
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
                id: '5e7aebd1-399f-4e01-9ae5-8bd13747a60d',
                name: 'm9iy9s4ni9qvh1jgubefybu47mvuns8p3rkxapxtclirc2oyc6mltcp00a6av54vev91nx9dvcngs3xvru3s94wvqthys3xqrfu3a8z94aftd8t0d92gyon1j171a6c2on2ky24q2d7ly37fljxziusnot2lta34406857doe5cpkno6iangpv6d0xuvdd8gcl6ftjevp82ndo2bf6zfg8nvgrweq7yr5255h7qyzyig3r2i30zvnytksii21sl',
                root: 'fztqptr5kzskyr0xriyk',
                sort: 1329337,
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
                id: '5e7aebd1-399f-4e01-9ae5-8bd13747a60d',
                name: 'iy42vfj7evbhayjfqaat5ckhbwcegc2o8erd8mncinln4vba305n6bh9xsnjd4frkmezpxcpdvb5mxabas1phx411psz9sjn2jogpjpu6z0cznufi48hrtme46zpb3mn7xgmr75og51nspsr7ntbrat1s75ll9ozg273zpnmb41rrh7coc16jcywmc8cluplrighyoygtr1i4wcysq3u2cvu6egflz6g5qxbtbwt9eqb4hkgcy413ptb2c2oghk',
                root: 'kp3xw2dbd22s39ft9jb5',
                sort: 451347,
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
                id: '5e7aebd1-399f-4e01-9ae5-8bd13747a60d',
                name: '2cx6tdh3aq07ph5xgh5bi7h2rwim3kao472chcs0ybqum4o8uwc2pwgzotjygh7d9b5acfh2u6qryvbvdfsxg4wn1qlgvtm26mpmhkjxgtumecj3gjaggm736vjji689l1etxro347ijct71a0jq923c5mo22t0g1nqefqvopi5d0tw1oso3or2i0c58zzj2ns0hutwdnq5kwqce5u9sq3vvc2qx6dxkcswem2i8z78gssu91kt2fp68r7tgerh',
                root: 'bi64zs2sltgcfjhnoth7',
                sort: 349502,
                isActive: true,
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
                        value   : '5e7aebd1-399f-4e01-9ae5-8bd13747a60d'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '5e7aebd1-399f-4e01-9ae5-8bd13747a60d'));
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
            .get('/admin/bounded-context/5e7aebd1-399f-4e01-9ae5-8bd13747a60d')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '5e7aebd1-399f-4e01-9ae5-8bd13747a60d'));
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
                
                id: '448a5330-5fc7-4c66-95b2-acf34a9072ea',
                name: '2zn9stv59z9dh439c2jn5et0pyz2wjaosu6jp42s2na0vzp82421em4ue2fhklcefhzwqny38cir5uup84qmu47em4r9eessae17uch7c4f21vmkl5ekn08gkjter3cot4x41xg9xrqjoujspctddt8htulxqw1ociuwj5nfzwun882imc46f2j09eldahsk1jlwifb9lrrnead76xlhc4s7phjpi8bwdcpb3pnd59fvrf2skjv2styomsnf4su',
                root: 'looutlkmgykxjx6ou8dz',
                sort: 642693,
                isActive: true,
            })
            .expect(404);
    });

    test(`/REST:PUT admin/bounded-context`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                
                id: '5e7aebd1-399f-4e01-9ae5-8bd13747a60d',
                name: '6h15ogj1ltfr0mqdporlvpzoj9sg0215zjpeml3m6c62wxayy137ejce3soexn8lk1okt1jfsss5593zofc1gmrv5api3ul0llgiu3auc5v9nggv387n57tsas8ebkvjgv5t1rxar0z4ogov32gcgay6nq0r8fe4hwbq2vsfpvkkynni2xq2vp1e2yatloa6738tyizy8n2udjtl2vnp3tfunh4zi4ov1v9ivtobauwuuqnphfvdhwj7q9thgq4',
                root: '069ydfuwlu8apqjyr6qz',
                sort: 133092,
                isActive: true,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '5e7aebd1-399f-4e01-9ae5-8bd13747a60d'));
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
            .delete('/admin/bounded-context/5e7aebd1-399f-4e01-9ae5-8bd13747a60d')
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
                        id: '47cb3ed8-1a36-4a62-919f-72f65237c6d1',
                        name: 'i4v1b3am5owks67g6m0t42jiwjo6r9czcjisge1smo2rj4h3t6t82asex4ey92qbeznh7on3j6accbz8kp2kl2mhk267lis70yliacap45t6qbgyqzs7ky74xoymhjqg5vcw1ur23h4nz87ysihxb6gcfc50tof9fg2q39dzvpw5pizxfij0pwi1nsjcjtbmw4k9ofttgcwhpafz586d01j0ep7vqhux9crw0qtc6tqqumh9ks4f0trwdewq7k7',
                        root: 'cde1xmc2omyk3sfut71c',
                        sort: 138524,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateBoundedContext).toHaveProperty('id', '47cb3ed8-1a36-4a62-919f-72f65237c6d1');
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
                            value   : '5e7aebd1-399f-4e01-9ae5-8bd13747a60d'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindBoundedContext.id).toStrictEqual('5e7aebd1-399f-4e01-9ae5-8bd13747a60d');
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
                    id: '5e7aebd1-399f-4e01-9ae5-8bd13747a60d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindBoundedContextById.id).toStrictEqual('5e7aebd1-399f-4e01-9ae5-8bd13747a60d');
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
                        
                        id: '948188d3-59b9-4cc3-9ff2-759d3558f470',
                        name: '72nvqwjw7q5w1iwy47y3x31pfb9di27j4czmkd2w1rzkv54px4pf2x3l17wz5esnz9a1ycqark38lwly3r52hcp20bewkz8i5vp5dxgs6zmyi1oiosytaytsy3gs5zgwzp2rm8qv0gl18kbbhzr6bgsc7t95d20qee4f4kvkk3mw70nzq0mvb3qpedxz5uqp3pc2y309qs9lq91hgo9cieyke3nm35cqdog0pqomkvkyu2rv5qsq2yj6zkmfal1',
                        root: 'kdo1c3fztblaiduvwo45',
                        sort: 683516,
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
                        
                        id: '5e7aebd1-399f-4e01-9ae5-8bd13747a60d',
                        name: 'smij9nzniwzhxte51e1ecgg3owbcb999xt6e4jzgiya1zxut1hz0yugexemq4lil344s6o1y2kmm4wqk80cfbrnhc6jtjpbihygu44g75domedtodibtfubtmqpqvaefli9umh5tsv8lrxdkkben5i8kcinfa0phd14z4qgcw2enihlcts9x4plkp0pb2jxvux6rrzkn971pytnfpgxfgsouung7q7xk0qdxjowsaj5u4vxgs7fyi9exc4iio7q',
                        root: '982mytocv2qjvqc8ns8y',
                        sort: 288112,
                        isActive: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateBoundedContext.id).toStrictEqual('5e7aebd1-399f-4e01-9ae5-8bd13747a60d');
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
                    id: '5e7aebd1-399f-4e01-9ae5-8bd13747a60d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteBoundedContextById.id).toStrictEqual('5e7aebd1-399f-4e01-9ae5-8bd13747a60d');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});