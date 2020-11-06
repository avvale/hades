import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IApplicationRepository } from '@hades/o-auth/application/domain/application.repository';
import { MockApplicationRepository } from '@hades/o-auth/application/infrastructure/mock/mock-application.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { OAuthModule } from './../../../src/apps/o-auth/o-auth.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('application', () =>
{
    let app: INestApplication;
    let repository: MockApplicationRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    OAuthModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
                            models: [],
                        })
                    })
                ]
            })
            .overrideProvider(IApplicationRepository)
            .useClass(MockApplicationRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockApplicationRepository>module.get<IApplicationRepository>(IApplicationRepository);

        await app.init();
    });

    test(`/REST:POST o-auth/application - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: null,
                name: 'bnuj59iir4n236lnt75prswyerku7bq43jxx4gq3dwmahe29ndt7yov0nvwafvo24s993w0c3vklmm2hzp30fi31un556l6ltw72dk1lz69u2pgn9rh3scnq45jkn4przeq2w9rx5iapu9rz5j813ezel6wum5jgdxdste6bm6g358yi6cq7a13ha2jw0tyrlq0qzgvw4tzb2jlg3zlsno837zwmfucunjj3d67kftvg7cwoemypusja6yivm77',
                code: 'b1yqf6cw6cxiwhzjlel1wsdkxmzp763w9bh1886z1w4chgxav3',
                secret: 'vy6uskl0yl4tri6b8xjc70igyxqz01ra239s1v8n2lbuawsuq3u6t71ybdwfqyz1waf8w0t4r6rcq9lmzyk3p22ool',
                isMaster: true,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationId must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                
                name: 'bd4l0iz71fs6mipu4ybr5262ajbz0qyqlo4vscbugokmlecclwl792nbmpx59qzoltp2agaiie6sn2zuyxozj07xsbep0oirmpw9qn4cmcxq7j2cbd4jnxmp2f2u7hcmip8atxucugammycb268nccbnmmtfyu61hms63pb519l1naf94ms0p4sm3wmuxflj7e9qkzejyd7ndghyaolz2dq0292s6z6ndllo6h4ni7tr3vtk05xhg6cazp5ayj4',
                code: '6bl5wzjvtwfeddrho418xxe2bakgz94mzv7pm16hqp2n6mw3rf',
                secret: '8l4k8ifwg7brcb844i1k6hngn3ydzxruityx4qe7f1m8pprlsexc2439fa8ls3p3rjrj718poiqajjez44vlr0qaow',
                isMaster: true,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '17bb39ef-ab26-4832-907f-9a5b885a80fc',
                name: null,
                code: '1lwvragaqdmw8dos0zaup6z3t06veqhmrf1hfomf25g3gaw8q9',
                secret: '23pgr3e11v8fz81twhgg73vo9quwpehgqnj5wduyyhnp7o8ruwdhj6x6k26wkawcwz380inmllnfc4vrii8el18c7d',
                isMaster: true,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationName must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '17bb39ef-ab26-4832-907f-9a5b885a80fc',
                
                code: 'ghlasc9ehodn4rbquyjtv97v2e91r8zz683ikqu2pcjsektkqa',
                secret: 'eo8q4c6tnuufpd5lwtumwi49x9p3izqdbbzhtlh0fonabp4gon0dk17pwozouxjemzowwhxz046mqxby2a9da9h6nj',
                isMaster: false,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '17bb39ef-ab26-4832-907f-9a5b885a80fc',
                name: 'wlf1rjdgg9qr5264420jv5cesuh3xm4xt6zwk5f8j1j77wxj2ut9by03wjqb0ii0q2w211umgmdhy7uwmt2h2bm0g6oldz781oauhrgh696wm5ncajczoki96xrohd7fzwawsgeqso380q5vzhla6v7rtf6n9mvkufk8ifbdclp47161tiwmyfouex2r8bde8ie62c8oztnu7rle3vhjvvmrwm4t72zfxwy8oh8xpeuab7bxtl29uixlejgpaad',
                code: null,
                secret: 'x1vumszyrwue809sudjfpxhqxun19k8fqz2deiehy9ib6fehmk0umgkkqzdq14k05vzytonm2s729p21t318rjb7xy',
                isMaster: false,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationCode must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '17bb39ef-ab26-4832-907f-9a5b885a80fc',
                name: 'z2ailhiab9nmmtspza66r395js3ntuw823bf9l8x1fmbtxgu7jxwu0n1qimx81rezc8rgd9cnomu4gi2wecbbq6d7ujxnbjehmut9ihzr0fn4wb90mmw66apbsbj8xvtf6qhowl6ydi0yinrb6k1d3yf3qu9rnk3flmetbag905kxvby3862o49q7v1x91yu31h0g82zlw5f3b33mp5ypxiznmeak634cb9l54ftrtr2cj9bzb27r0esvmxzqoz',
                
                secret: '71kzfw1emwo1itqtk7e05n11noi6uewmbkdovzaehlusr6pwqftssn7gh4um6crllumcby59ovn9ef7v3ga5nuu1cn',
                isMaster: false,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationSecret property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '17bb39ef-ab26-4832-907f-9a5b885a80fc',
                name: '5e35icf16iumffk74eoar014lvgi8gz8c0iqd8vqvhr2ol7bauxrkfpb8g96ee0lwaahuvqnl37qnzlwrq5k2gvea58v2t8puqfit3wmtkw8nwc1kvakeep0zid5hkl4o5m4z0p8ngkhv9ld34gejo7z06j912fise1swjwavj06j3njc9l6ykgoquh0vftal4rncmm0zz2qflaqpmuxxqer5y4vu78708zb32crxrbj2ubknvn2me4dy6a1nbz',
                code: 'lb9chds9n60nt9utwhtg4e8s7pt5yd2ohgivqzql1wpfvakyez',
                secret: null,
                isMaster: false,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationSecret must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationSecret property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '17bb39ef-ab26-4832-907f-9a5b885a80fc',
                name: 'jl9uv6qd2urc5caxpk7srrulwzs9tft74jur278kjwy7iv5v069u6vec5chxwww5n0vj0cspomsa3maggn2gswouh2aiqrj290klhht95kwwca9sqqt17xs6xazcgu6r9iz391mtyol79svrkux3agm22m3o1etjylru2ntal4zom1hbbiqbpbaxktreb2go4lx5uqq3c4b0fe0gi4ki1nlk3cfylq403us4tie9r0mgmceoqbe5gb3gjvh4f7h',
                code: 'b65l71higo2cfc0uk2rxadouwmap023qz29umr8c6nha84unmt',
                
                isMaster: false,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationSecret must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationIsMaster property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '17bb39ef-ab26-4832-907f-9a5b885a80fc',
                name: 'pn6dlr564yic66c44yc3dlt5d0n9pbuji5wtnb23hoylnrf94i5sg1wxryzrf82nv60l332nxu7aryl5u1fe5as6yuohmne0wv66jis8p6k68l4ahpgf7lg247eoeb4pzwzmbmj4xxakbsijexmmkyfvaukq23zd7nx89rmwu374760oxqg2g30cawuup8qyrsouvj2g2rysr11m1rnvewleglh1cvkud9cj0331jh83qrg1vrrpjx0ubht9mhu',
                code: '3dprpb6kfbbgsm3bhh3lco8f0vhzmbz8vt9siz24lsgjb5bwn4',
                secret: 'i3w7xg9pi31lqqdqshk9w6fd5wfjc068q6czqvo78q0p6dc04i5k0249jrsfvt25qi6ktxysc2vhbkngucqp5mv8a1',
                isMaster: null,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationIsMaster must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationIsMaster property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '17bb39ef-ab26-4832-907f-9a5b885a80fc',
                name: 'or60juozo5lgpwvo8mifaad8rzrbgg60hbgexmu2yo4kgrjk1lmh571dwa8pxtp10lkmzywqk2rwmm759dpu7xc00rk7n5asjls4ovuhbvnceqnfyihuzpckziok54zf4nd3o9y6f7hinh717lr0xf77ae47zq6vkww1j07esoiwexvk9hl7dkqws779o9ta85c3w6i7mye7w55dyac8rhhc886aavrzgl24nxx7y6f6vcydakzytzs6mtmsve9',
                code: 'if17gx97yj60j0793higmrk53s7nbkqkat4au3iy68zgkvcdkk',
                secret: 'tjepx2tkdzyk3cbjtc9volunqxk9oe4ls71l08293608f9qfmz9li60op7m6ldr0fp2gon1navrnxupbmfw4n9qatq',
                
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationIsMaster must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '570kwvf1r9l7lm6k213kfsq4xygetoub7jjln',
                name: 'yhsxgz9i238zbb6axhp7kss9b3gyqdjqnoxj8kcr90axqzh6u5z8j7p2esqcw1kshs27i2ftvzmq0lwe7k0wdyds28m3yod6098nbgevbywgd617r655gtalaisvwwsxbyn5kdrq0bxkb87anb73zord6qjyw0bne40btfeuq3zp8x975wtk67v9clek5yzkftbrwtkw1qc3wrnx5nbw4cuv6s0p93ltk1rgocf0yoyhkri6b6w3ht3jyfw1e7h',
                code: 'z85pq8nnvlij8tudpu3b6mkf37bljsiq8b165oa6g03bwc3a1c',
                secret: 'e1h2kbv8njdoluu1rqis7vainaf6gy1s3t2ky5oebzwimz5yoaxvmw6fid7zd3ada8cerl9sn75rs1tk06fo12cqnk',
                isMaster: true,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '17bb39ef-ab26-4832-907f-9a5b885a80fc',
                name: '1aenmw8cigyrkeg53abebry3hxfsz4ww3f55i3ep08v9oq0cgbht2i851w8cl5otbzivguittncwqoxt2dcwtefqelran3bw7hvog86mupu4450i1khex771rykdvn5b173qfd0o62kaivkeyqa1gqpscbqj8wzaswx5efj8ig5xnkisrf5awjq9ufcf66ewlq85pratzj1rez6d9h5pwp9spz6ur8slb7fjfm8bkyeo2a82n23bh0vdyjvq2b25',
                code: 'xolsu7ulg6fy913fcgdeo60liqngvcygexykt658jmy1skvfaj',
                secret: '8y2tuxh5br87dy2navvxgkxy5ddup1469dgajsjstpelajveo1894g8v8bm0oopbl7ajzzcuot92y4zbrub1dxltmz',
                isMaster: false,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '17bb39ef-ab26-4832-907f-9a5b885a80fc',
                name: '3w53fitfoocekmcez8tkqiq84e4wepjpct6p0ih0081dzgt0nmnho700wspyluuq5qquzp3quiwim9jvs6dv3bwkr86uvs7a6a61idlv7stpcds5ul8597tad4bihmc6dj5mqi2v508pc7dv9m02uzpc910hlgfkq6zxhra3uj1n4elpuhxduz3o9sv8gcr0zsjlo8mik8xy8u9zt72kxbdmcuqb46flm36ns77i3dr7g2jnitlq9rokfqatv40',
                code: 'm8b9x90tfbbn5e2nc0893yf4j3r7phqxy3rgs8aktng0okdedh9',
                secret: 'jeqsb5ff5v6lxhoihjnlt2ejj2fcad03bn7rzg2s4xn3g2bor6pvsa8egt4namnilhkslx46uwcz8fkmigco1dpxps',
                isMaster: true,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationSecret is too large, has a maximum length of 90`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '17bb39ef-ab26-4832-907f-9a5b885a80fc',
                name: '21e7s7lwo2ye6yfb7mnc1rsl0m9meltb08g87hunotfoima1yjn06hii1l2do48z1ng3gvd77ufh6swlysofamq5giyz9o5zojtsuxae4w3cyk1xbkema4u0hg4runezcrtrwv2rqzu6z1hrcb1wmk3pdhbfwox6d7aqnn6yg5kmijhqhg0pmp655jjxcz3vgf0654z0ukwayfifknmndl8gn7rvqwl3rgvfup2y9mc3esi6ejjdt2xe89ogjgr',
                code: 'rbbosxfejlpcbn8ae7y4dsmq7ev2t97kvl8w4qxjk61zu5p5ir',
                secret: '3n3v3whbnz5vmovb1a6si8069f8o5z1fudxvnfuqkwrk6h38858ry63gynitm960tddgzxpt8a4opjxzy7fhwomnpbs',
                isMaster: false,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationSecret is too large, has a maximum length of 90');
            });
    });
    

    

    

    

    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationIsMaster has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '17bb39ef-ab26-4832-907f-9a5b885a80fc',
                name: '48hqcphhlhn951ayuuunywi7nyvwbwrqia0jgvwwulf6pn2xwrk45vpqnvwlfrdzgjklj1yo31d7suj1ricqsl0t5h2n3fnr3rqh7addjvi4n3avtjwirjhy4fgevod1x17gdvcyo1u0k72sd3yr1ptjhem25w336psyeoogxut29mgv6xo2dmb8ta2zs5t2qb8zlgb783ao75ugmw03gpam7s2l0f3kxmt0gx43pt92dcl2jztuvnleeql0b5x',
                code: 'b4k60vozhozarsvtqpyshqpgj8fd6vkil0jz95ay29zrrt3teg',
                secret: 'cwysznqhxctxvzaxtd9ugnpcvemg5ui760a3yrioo2oqy5nsqvl6g6vyv50ibngrtfun099jae5jg79h0d559yb9pa',
                isMaster: 'true',
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationIsMaster has to be a boolean value');
            });
    });
    

    

    

    test(`/REST:POST o-auth/application`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '17bb39ef-ab26-4832-907f-9a5b885a80fc',
                name: '2vcsibo6l6ut3g499vdkjeydx1q3hio906vwj3m1bcsyhpetxvdix2rh85jbij3sdmmk11cemw5hs756hlgxb3bboud7bcdyc1fg3dblt945k6aboff1y42g8ahlpnnvb7vo7ayx90xqgxrj2bq4g8pderqzp6dhd72o2mfhemm0qfpabfqe7pcgdc1qeu1top5x8hlcge5ni0obenglkvj56tdvf9rz6xgqzh39d1vznnwvor14xsvploolnrj',
                code: 'n61k52s55ccphl663rdwd7o9sfvrw7or22zwsvcyerdnaa79v3',
                secret: '9ehj0if522ny5dwuv3nta1olzoddtjmesad9fe1guzaaaqlqf15nbjlgxhh9s0dapnde5u7h5hk5j75q5ufs7091ke',
                isMaster: false,
                clientIds: [],
            })
            .expect(201);
    });

    test(`/REST:GET o-auth/applications/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/applications/paginate')
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

    test(`/REST:GET o-auth/application - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '8c772aeb-0587-4ea3-a95c-fcaa8ff6fea3'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET o-auth/application`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '17bb39ef-ab26-4832-907f-9a5b885a80fc'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '17bb39ef-ab26-4832-907f-9a5b885a80fc'));
    });

    test(`/REST:GET o-auth/application/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/application/cc9a6558-b0bd-4b7a-b1fd-683d3c9bc11c')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/application/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/application/17bb39ef-ab26-4832-907f-9a5b885a80fc')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '17bb39ef-ab26-4832-907f-9a5b885a80fc'));
    });

    test(`/REST:GET o-auth/applications`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/applications')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT o-auth/application - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                
                id: 'e734e07e-a50c-4c7b-914f-8846587c8287',
                name: 'x1twxd1tt6fta21vshm6hg69nfc4q1uaqp0z93ua3583zq2tdwcmv1q9h3tx12vxpen1n8jwiyztfk0zfp39my4vgjluduzwke7nix0nz1ziegpg3amb0mts7oozfyqpq6fxk1ptaewwb80s7x0jcavblpuh53944smiygapndtjlxocoqi4nf5t4p0tq49cpe075eodji317ufbzzqpy2gmwr5sithzl6vg5zmnggdxmaop8t47c4jfaj4djd2',
                code: 'zzzh2zexasrgdoe0idb7jhh2p59azaq1tqf29ev20jngzx6qkh',
                secret: 'fdvhwcnaehsubq7mi3fgkr86fxym0yb8rzdz4gnlq3jcyd31tzat3m3kh94czhydsu1lr1o3pdch82ydfeae9dextv',
                isMaster: true,
                clientIds: [],
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/application`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                
                id: '17bb39ef-ab26-4832-907f-9a5b885a80fc',
                name: 'ljp80qltnfyv2assg37txfdk43uwj04bdi6whwsvo2fs3ta9dx43fdrlkgt9vmjo9uxpxep58yo0oh0fe92jaxlgesg1vvfnah6wwngjljonjzbwvy1hhman1vx3fin7rdvv2xyfi1x4rmjuwp9bzd3drbzyy2yx6tx5nhmw5312j365p57k9pgzp2qxv7401w98mel1iy9g0ej4f1j1qwkxt1fxw9y2gtjjelo8fnb99vihl5ip0qa3em7sxxu',
                code: 'vkr73kkph60zjzd523gw82huipntdhil8yq82m8m8mmews74kl',
                secret: 'u3j9kq95q4qzgd2n6wcv9sqdutilkktfqvn47z12uhzfka6lvi2vpjag1r4cqk146djzr73gj73newlavydbu1naty',
                isMaster: true,
                clientIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '17bb39ef-ab26-4832-907f-9a5b885a80fc'));
    });

    test(`/REST:DELETE o-auth/application/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/application/232acbba-b9e8-46c9-bb59-5eeb51ee7440')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/application/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/application/17bb39ef-ab26-4832-907f-9a5b885a80fc')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL oAuthCreateApplication - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthCreateApplicationInput!)
                    {
                        oAuthCreateApplication (payload:$payload)
                        {   
                            id
                            name
                            code
                            secret
                            isMaster
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

    test(`/GraphQL oAuthCreateApplication`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthCreateApplicationInput!)
                    {
                        oAuthCreateApplication (payload:$payload)
                        {   
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '54db5c03-a0fb-4289-ba31-a4b68532326e',
                        name: 'cbnami2b7wd2uvr15g4vk2momnxpmrp9le2r4qq9pxwqpqqp5fbr8w9v8be46t18ug0byakyiu5hr5pbxddzkoaw0m0okle9uu7djx5637sfs4nv75jupjegm228cbnmcqih8a6ajcd6tafwpqxxzarx09nu8hbw6f4xio5pixqq9hw3hbcjfb2bakplp09jwv9vjhwhre4jbi507ku7qkaltssxkj47oectleu6re0pfd3s4yrkl0seraq7r1y',
                        code: '5tche54vj1w8ckpnt7xlt7xnpdduekpta3lp46n2k5iv4aq5u1',
                        secret: 'ln2oiakrdbm8vdvjx5ixs0qzdxk8q1e0nb5unz9tielu9q50ookcft9z0rv67do8a5qvh36pvchmtf98d85gz6jr5c',
                        isMaster: true,
                        clientIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateApplication).toHaveProperty('id', '54db5c03-a0fb-4289-ba31-a4b68532326e');
            });
    });

    test(`/GraphQL oAuthPaginateApplications`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        oAuthPaginateApplications (query:$query constraint:$constraint)
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
                expect(res.body.data.oAuthPaginateApplications.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.oAuthPaginateApplications.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.oAuthPaginateApplications.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL oAuthFindApplication - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindApplication (query:$query)
                        {   
                            id
                            name
                            code
                            secret
                            isMaster
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
                            id: 'c5a3763c-4429-4b3d-9dbc-d7e71b150b42'
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

    test(`/GraphQL oAuthFindApplication`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindApplication (query:$query)
                        {   
                            id
                            name
                            code
                            secret
                            isMaster
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
                            id: '17bb39ef-ab26-4832-907f-9a5b885a80fc'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindApplication.id).toStrictEqual('17bb39ef-ab26-4832-907f-9a5b885a80fc');
            });
    });

    test(`/GraphQL oAuthFindApplicationById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindApplicationById (id:$id)
                        {   
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '2d504409-728f-44f3-98c3-008435a0bfbc'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL oAuthFindApplicationById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindApplicationById (id:$id)
                        {   
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '17bb39ef-ab26-4832-907f-9a5b885a80fc'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindApplicationById.id).toStrictEqual('17bb39ef-ab26-4832-907f-9a5b885a80fc');
            });
    });

    test(`/GraphQL oAuthGetApplications`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthGetApplications (query:$query)
                        {   
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.oAuthGetApplications.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL oAuthUpdateApplication - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthUpdateApplicationInput!)
                    {
                        oAuthUpdateApplication (payload:$payload)
                        {   
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '64ca7a90-44c2-4e3a-9b3e-f644559f756f',
                        name: 'aw7xel5xkodehy7mnoueqxhnuj3zooawy0xa5vt4lahf3kut2yztg6tfhl6g9mozabd53cw4aa4g0vadvaegel1k311hxx765t9jmgrrak1g1nwh84adeqr3it28rpouwu9l0bevwsdzknj8qv7xv64xcuspvgph8rvxlg4f5jrk7mjcxcrh9k7jycngmiapplt8c0i0ijvop14oivxnsguwl3j5wjyy9ipbmzm0m03jaqm23fvae6mtoe55wid',
                        code: 'n05vzjo1mdcibiw45paufuwl5ivvorengzukkjngc2rwm7wxe7',
                        secret: 'qhca96lla6p9b8rq55jwglxl6tj34nqz8rxv5eiwj2c1d7o3g9i5dep6xem5j6i3yf3wzqspj3l5voittjzvnkxpg3',
                        isMaster: true,
                        clientIds: [],
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

    test(`/GraphQL oAuthUpdateApplication`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthUpdateApplicationInput!)
                    {
                        oAuthUpdateApplication (payload:$payload)
                        {   
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '17bb39ef-ab26-4832-907f-9a5b885a80fc',
                        name: 'whrihxrk7e47f42nqzqahrcl8x69zdr1c5dlnj2yfzugu27r7m61yuxl5ztho1frxfdgbwthrvudy3vcr0ynwqonmwcevi2k3lnhw69fz8za6axvau4l34qe8bak0uph3hrd0k9bmyi5uw394r1j4svu82eho1vjzjp36afff6wmqmczaaam20e2hxai4b7thn7b6n7j72l3qcdftudq7femb2k9qtfsxycolcsvj2ok4y6o3ewgji4d56g3mgz',
                        code: '2z365snktjtjsh6x5y731h2ubmzjyj4ejbr9fs6m3qn6n9k4jf',
                        secret: 'n9eyz2btjx8wbv1fshvfep05ue3nzhnh1c5yod8rvv3vqcrw44fmkl96d17laf5o2lmss254zc6s2vhcu7cfskyl5f',
                        isMaster: false,
                        clientIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateApplication.id).toStrictEqual('17bb39ef-ab26-4832-907f-9a5b885a80fc');
            });
    });

    test(`/GraphQL oAuthDeleteApplicationById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteApplicationById (id:$id)
                        {   
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'f6a68d4a-d1d4-4c81-8043-204a72f611d1'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL oAuthDeleteApplicationById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteApplicationById (id:$id)
                        {   
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '17bb39ef-ab26-4832-907f-9a5b885a80fc'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteApplicationById.id).toStrictEqual('17bb39ef-ab26-4832-907f-9a5b885a80fc');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});