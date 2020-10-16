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
                name: 'i1oupnmub6beiyv4cu6ky1lomm4v3rr7ezgulpoxng6p1p31qq0a73d80y2ny97einfvr1qrj55u8561z1h11jvit8xhtqviksj3fbzz8sexmwmj32m9k31mho354iut1cwrfmd0a0qkckrrf6z3vxqdci82hk0te58mtqzld1e0ju7mx53eyfv88ahlh1f4g99jz5fszeulb0ntesesn130qlcfqjv10y8cnkj3jqlk7uafnpz0qd209pf5tx5',
                root: 'bsnapgvrk4uw4x8rurakmytmn00d0j',
                sort: 459223,
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
                
                name: '5zzmy1v2uzup4lm7rlrhgptkflo6cah2rqai6rkmoyrz9do7rr5xtgxj3mz21lvpl5exxy665jhts6pnqe9b4k0ji65a6lsef2geuniewvksnpoaqujd24w9ewh16gr17g207s4j64atn0xv4eizf1p3zs68fhxvnle9zzi8tfq4kr9lpltnzxucvnxic6zhahs030zzl2m0bt9uqtdjf9dmdi7k33ghra0vsya9vdimf8pz24omx8r7weew5vj',
                root: '4zno6vikqogxzgkelimt8emrthw3mu',
                sort: 163648,
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
                id: 'c2ac7dce-ec63-466d-80ce-3d53995522ec',
                name: null,
                root: 'xuxsmzv989huti28clf2jsuz4yg56s',
                sort: 138867,
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
                id: 'c2ac7dce-ec63-466d-80ce-3d53995522ec',
                
                root: 'jywn46mliq3n190liqao0lsv9pdyv4',
                sort: 609366,
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
                id: 'c2ac7dce-ec63-466d-80ce-3d53995522ec',
                name: '2p92ghuigqsuxdyeziqaod71vgfqv9zpmed9mh1kwuzo6v3dxoeasacx3cfk90dd3ksifin4jdvj4undhgibawbl3b6lcxgsq0hnjbx7a1zf1ec6w5uver5xqtnfxf1lf934cr2wqrvy5ur29qkazo1jsr4c7prldsyas6qv5cas0qoddm9t9rnuv5pzmjwzsmc4e72kvfbry5t2v5j8aet8en0w83cwinikxbskj4z3owucvv8tjlundrjponr',
                root: null,
                sort: 300544,
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
                id: 'c2ac7dce-ec63-466d-80ce-3d53995522ec',
                name: '7pa7xsnya8boktdcodi0j1kyjqoe0k2oj699rtkqgyn72053cktymtm25rdxpdo8ql4stjirjrfud3f9z10a4mt1n6auvqvu1xq19hv4b6t1jwc5s14y3y7mg92p9m2exw6o53axzw0g1mpp7aupbf5rq867ndfxb3im1gqifjv9cn1qjy2kcgfzapswd7mtsw8upmnykd5t3v64o9td81h4dtuj66icvcdwt2b0ybsu1z1y734kdtxdldzlq0k',
                
                sort: 560990,
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
                id: 'c2ac7dce-ec63-466d-80ce-3d53995522ec',
                name: '9xcc86qhcb8gqng8ipnvjc11vlp0g737ypohurqli0tor1y7sm9gw629pgqo7hcvkryh32vq9w2nniujyiox80wcx1a4149u3s6kl7jls93awoo5pr45kuzn10vi5qt5b1hcz62rk7hgxcte0ng31ngsh2gl6qr33itk1ly7ebyrzyznfvgt3462jbujq609a9nu5dhmg7dkg00zqiryd4a57f172h4tdj3m48tqtu4nihpnwnchmhx8p6v3qlt',
                root: 'v0w9l2s5jezpqh9i9jjgrmc55ys1tc',
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
                id: 'c2ac7dce-ec63-466d-80ce-3d53995522ec',
                name: 'nlmoxwaau3an4ry30h5s8953196076xn1xehn43us8e5hu8rlyjfvbpay4wsd5gidrdmzbq9vui1hh5c4g8bqlpc1nfhrs1g8bzu627o1dh9tlcxhok8ncd6cyee21jzuv0fimfnwlrvg4iiqne6iwb52z55puzwgr2teyvpuhlhoi4tml9wt0lfmkxlz3tbuxcajpsmugndle0pvj2p5l47wdxaitf18nkghyfw8gta3fni4xzp6k9r1vyypad',
                root: 'wkxbdxzl57s1zpm37idp6uhpc7n9ue',
                
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
                id: 'c2ac7dce-ec63-466d-80ce-3d53995522ec',
                name: 'puqnssepf19kzpmlxwkqfs1cazaz20vje2gq5gasz91f45sa0twjfjx1dbm5otado5f2oysgszuphdq5s6p83x6vzrb3dqe66lncmtfu4v05wn0hjvth9wbj0e5bzb8dg1u6uvhuqdzo38q0sx0ahfux0oqmc29jp8qfj1a8ghrmrq0jkabcstu2zjouia4s7xxn2twn0tgp22wepkwnz1jjua9lg97u5zfqp97egxhahjt2efbkcugbnpfraai',
                root: 'wfsa2p7on8ru8iptk1ihldzz3llxnl',
                sort: 480164,
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
                id: 'c2ac7dce-ec63-466d-80ce-3d53995522ec',
                name: 'dfv1jgnyflytoyx56bx79ato2ei7tdwkcrh66h910x87rtyhbgcpgjx8hey13t9dckos68ie6pwkdk6jw84ka4h1sc3grrf5hbci9c7hvmx02djfwbr4jhluknewkslfwmwob10i27ko771wvouvt459b0f8dq2bwuvpiqec8pwrpolzbn2ss6snk09b1slatp9ydinyioi497y19ipgefut3cih4o6nxg7fvu7jx7e34hqujlahjwq0ldihyji',
                root: 'xytbhwq6ts29j03tccxt2tr03y72yv',
                sort: 569161,
                
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
                id: 'jvrrpyqvx3y6izqp9oj0s3cnrnjfhoe6sj7if',
                name: 'amesnuyg208b06f9g6q4ah3vqo0zf47vzyrawk3l63s2nmtq0l8zghxf4ku0bj24tv2su3tlrqc8mveouq2pul6og3ouss8607tbslirhvk9pguyh4mvm6niy9a2oj7yp88e7cm05zgxb4fslgqigoa2if3xdzip7e6ak8iz0mc0iemka4ge73iqwb05m5u6mbzfg74hj4wz141u6ak17wst25j9k62hfv2wuqzc4bz1wr16t2psuzu9upxlkfx',
                root: 'zlu740660e0kfyp0xg943oimr7jf1g',
                sort: 605471,
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
                id: 'c2ac7dce-ec63-466d-80ce-3d53995522ec',
                name: '2y7qpzxa8xo1v1ie0v1qhd09txyrcyq3k2ln49adue59txvs3nngjgobxugre72tyu551nvroc88ich1rkry903rfetzcpbzbxwewc7a0vcirsx66jtj2be1echv5o8033g8k6908ol541nr9p45d5busm8qnu6f9egstxngc482bx21c0ybatm54tkcacn0nwda3oyzaozest4fg438in8fvvfnr0pr09wetpqjfx2dk8ldjtm1fcbdzg2vq3hr',
                root: '76dalgl4jo02yw2zwo62za2emd0dno',
                sort: 851920,
                isActive: true,
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
                id: 'c2ac7dce-ec63-466d-80ce-3d53995522ec',
                name: '7cz21uka0gdyoty1xnx1c98ftf3m7o61f73vquteg1i260590d6yimuhqterp2lh8m00x5ym8uylonc8kyn3s4wp5e7k8wfgzcofunyyfjc6uejth9odcvsf54vz0kim0kzdwhvpvbm8dwf9qg2q9logrx1sce7z3mnsuuud9lbf5wyel4e4x5sxge6xvhxu4gxn2sac4s360jk6j99ns3759wpvb1m1z9qqfy8l2inpc4ub4jsn9ceycrrnk2e',
                root: 'xi2tm7l8ewrmj9iz0qhakgq4fbs9w9n',
                sort: 779372,
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
                id: 'c2ac7dce-ec63-466d-80ce-3d53995522ec',
                name: 'm37x4j3gdp3wl3sn571kq65jp61xufiepsoxrsx5zmeiz37ydctk2y0waetxx1eb8bvqpa8awr93oj2m0fig5sgnk7mrrpjqhst9g9qjn7e2l7g4a7f16rmns5wz6jach71pbqqvjcc3fpelsy294b4zgd0y94hghhtnwdk22huiqbdpx96i5873z4ln1yuu54uilvulh9r8jnd9gvaca8aozwqumtf5ln8gza1azyvhqbz4ynkd51isk4k67kg',
                root: '9vyl0du9f5fll6dr6j8c82me063i8c',
                sort: 7737726,
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
                id: 'c2ac7dce-ec63-466d-80ce-3d53995522ec',
                name: 'mzqw3y2qqu32pttwb1dzonwsd4vka7cwhjcdebes70nf24z2bkj8bhec9dhixsyo0vywcwmffhrtyiu7qq9ftw06ug617zt2rvdp16d49y40mdo3z66gxuru0muetzocrpvgayc2w670wsf8jk32yub1wvxg56jlzi2akey77hw2st9jn9a7r52vr0f2he4s3pnvo740rocbsgopnxbnep44ibth83picr0p577q9rrcd9nci2gky1yg3r5jw5n',
                root: 'ztdp2w1kqrl81h1j1nwyb33vy5dp4r',
                sort: 951616,
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
                id: 'c2ac7dce-ec63-466d-80ce-3d53995522ec',
                name: 'vd46czd94i7wsp2zzxh6xxnifq0pqzno58slw2rb52l7sca31wfv86rtl8dszgws1qqc5hiim41xbhnpj55knq5u41tafpd7azseq1en787obxxbm6u90rrqngxf4xs5qg6akw0j451zuy4vgknq8tuz2to2vvofy6vqwserwb7hx1awj62s04k9l7omzb0ziqlbtt23e08z28e5lh44gulszkfi82jxf3qbd6sb9lkibq5ryqxrzopbdy1cwuv',
                root: 'o9f8pvxl2vt2rqoe4wzm5lhic6eion',
                sort: 598149,
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
                        id: '9f1539bc-448c-4562-9937-85e242444a95'
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
                        id: 'c2ac7dce-ec63-466d-80ce-3d53995522ec'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'c2ac7dce-ec63-466d-80ce-3d53995522ec'));
    });

    test(`/REST:GET iam/bounded-context/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/bounded-context/e46f49ea-0037-4d8b-87ec-fcfa32a3714b')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET iam/bounded-context/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/bounded-context/c2ac7dce-ec63-466d-80ce-3d53995522ec')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'c2ac7dce-ec63-466d-80ce-3d53995522ec'));
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
                
                id: '58c3a75a-a13a-462c-8349-65ea2e47d0db',
                name: 'k20tl53ccet426wfvg3zhka6zwtx6eg4j7go57pzd1d1oe96aq0e3826mx5m6a5un5j674xo7by4bzigtktz8q81abblnobgz9la8unku09g31hcja172hpp57jers9fwcto4hcwk6sb2kcf70l6pf8soh6sldw31iu99w20tyn5uoxz30tt3xy5ayksmqtscd9sdf5fmlcqnidkoc6a0po1szhnthqpx1iakdv67pqxnc7y4n7or954wlfxsxw',
                root: '18t0dotomqi3mcq7j9rgb8o9cavdyn',
                sort: 470400,
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
                
                id: 'c2ac7dce-ec63-466d-80ce-3d53995522ec',
                name: '5cb6mwu8xxxbqcrzxpzntaa9cstpbn27l5oaky5yugqdu52w68nc7f0pzzf21d582rwklpzyhw43r31yvhw8elg6113q7277vrwq7fxyg1fgrdaod4xcsqcz5r7xh919hq4xkjttvohqm9heco5k4coi0mad2juu9r1glq2ie98x271a79zb3v7z8r3xzn8t1la2wisj6tdr92i46mscy7mof0ttg8yjf8en91mf49nem90zz16bz7109hmyi82',
                root: '3dk48iq011r1e3mtivyyslrup3cve0',
                sort: 983810,
                isActive: false,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'c2ac7dce-ec63-466d-80ce-3d53995522ec'));
    });

    test(`/REST:DELETE iam/bounded-context/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/iam/bounded-context/b88be173-8a20-4603-a3a9-fde492679049')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE iam/bounded-context/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/iam/bounded-context/c2ac7dce-ec63-466d-80ce-3d53995522ec')
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
                        id: '891ab4c7-2ef5-4379-9ebd-f0e1033c78e6',
                        name: 'jt1ytiicubwscvtlll5ly9ylvz2agsmymaxvohldsg388vdlo9jb7ytdsl8oxx9p5put1cwmkzn0xwzw5leh345bnxzu893sjwbtcw9q0gfe1dqd16i14hnghd4i26ldyb51wzv98l7rye6wj629qrjt4i6bhdobmfudzx5yhzmk6y8zdoogh8feqht2s5qikdgb150p3esahl0z49m1qwxcev6uii10oceplvq1625nijvu0cmcm9hzf9e6mrj',
                        root: '9ku70pjl99v3n548g09ndpae008smc',
                        sort: 543076,
                        isActive: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreateBoundedContext).toHaveProperty('id', '891ab4c7-2ef5-4379-9ebd-f0e1033c78e6');
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
                            id: '1b352e6b-7c37-4908-a068-664556945a48'
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
                            id: 'c2ac7dce-ec63-466d-80ce-3d53995522ec'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindBoundedContext.id).toStrictEqual('c2ac7dce-ec63-466d-80ce-3d53995522ec');
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
                    id: 'e9955d9c-c0c8-4786-9e4f-2e829ebb6185'
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
                    id: 'c2ac7dce-ec63-466d-80ce-3d53995522ec'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindBoundedContextById.id).toStrictEqual('c2ac7dce-ec63-466d-80ce-3d53995522ec');
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
                        
                        id: '376965ec-734a-4ba5-a452-8b6773df78f0',
                        name: '4r316g5ndw4eyfwpqh0lbf1o7gfx4temtugh3nipqmm3cb1ht4t344l9vp5qrbfxw8uu6pz3ym74hsb6m2y91kt3xumrvjp9su6gja5qjccml2jak67zjw3aw8zjb2kl3oiabhb3u37a39nx2est3bwi5n9futj5bil03elv3da367y6s9m74gg2zdv6829qv1mqjz971ou2fbu4j4ighcucce13t08ng36u2nucc0hom58xvhf4by4c9msifwy',
                        root: 'k9rj2bv88150j7ji093kjx8qtf9qd0',
                        sort: 439208,
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
                        
                        id: 'c2ac7dce-ec63-466d-80ce-3d53995522ec',
                        name: 'uvf1pz2a8fxtfdkzwhnlwdc9kij0quik5ov8j6mgtxrytjo7zm00ruwwzawjr1sj9fmf5dwb2f3rz27oev014qeax3h4263sjy7ieimn97km751hj4p66p6qq7a4e0olposips9md66846xikpbyfcuur8lkv1e4u9hz6687hmq9yyi7d9psmcv75amr30nalnt2bezvj58qxrh8y9sc2qxtijwopwwhuup8eb6skz9crcbs9xgqvn395302u0y',
                        root: 'cxbp3a0bpk2sdcnxvx3ekduhwkgcrc',
                        sort: 769805,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdateBoundedContext.id).toStrictEqual('c2ac7dce-ec63-466d-80ce-3d53995522ec');
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
                    id: 'dc5aa6f8-15cd-49b0-8f96-530fba8d7714'
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
                    id: 'c2ac7dce-ec63-466d-80ce-3d53995522ec'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteBoundedContextById.id).toStrictEqual('c2ac7dce-ec63-466d-80ce-3d53995522ec');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});