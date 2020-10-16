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
                name: 'mvsexqdgk4i9tq5zbxbxyj9kuxdcdp3a5bxtpfvy6ggngum1xgw79ybc5a8q41t48u6i554ukxkw80atpntwynd5uyzhdane57jbe3k7bz317tr1rk9uyn57m29e0do61c9wyu5uu1de4v2o6i7nolltc5cgmotcfs5j1z3t1f739yuhkdhci4txqocmbxuy65ywa5pldg6m7f7xcvi8n1bx0ag8cosv8ctp2nna7hn4svkgvow7dn9rgqwgeg8',
                code: '916u8ep2o6627scqkr0kqjjjxxawu0f7e79axe76w8yhtxp8vl',
                secret: '772ri085hw9803ks5vvzu1xrl7unn1jsqtjyqza7erb3ceq1cy90257x0w010dagpmk5icpjytxxtaoasi104pmi00',
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
                
                name: '6sky4ulie40i50uokcqrcq3lf65os5ivljsvrhaveinttxo78zituluzj6fk8uqwbu8nmnzbbtkbmpvb3cqtbdrpu15vqicqplv9j06ipezzurcr0iklqgu5pqz55z1cc05liu0rmc6ojsojk2nf4pq6cgy84n9rpd46k7r6fp4pg4y7pssxthj2f08akoltvbg205bye23agr07kqnd4k8bvf1hao5r6lo7ouhddai0owwn3l0fdeoz4l837jy',
                code: 'qomm8h5xc56e4h87qg38hk4i1qo2gvm8c7xyz0np9je6quw0wj',
                secret: 'wpph25pqhhp260ivtre37ttgg55w93pc6yh4xloar03p4i2sfzfws4i3ro6wstpjahmv9e2kmdls5kniv9j3husxvn',
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
                id: '5e094583-3e92-4ef7-9513-cfbc7bc989d8',
                name: null,
                code: 'dl60emqpszrh2m7g2hcaq25wow5i14yvz7fi0izizu7d1kpcbm',
                secret: 'cbwjw8ues1w0ejy9212n9yn8hygjvy2mfmh2a8u1d4teybt2vwwtwmegtiqjubu5y2ylsb32lis0lgmmexzedj0r7q',
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
                id: '5e094583-3e92-4ef7-9513-cfbc7bc989d8',
                
                code: 'sq9e709jvb4cb3v4f6mj4o7zocz81athgdtcgwf1qziavgmfsu',
                secret: '10hegcpieev7rspn1ueagfb00lfmqqch1m68tnjz18s9n2lnc0vkuzipmalsva9l61xbf4efznubl76vy8hqxlztmp',
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
                id: '5e094583-3e92-4ef7-9513-cfbc7bc989d8',
                name: 'ga4hh9vlphn7ivlh9mtl6m9njwd99mkpiu6eitdorruc6zvr5xond89enlzbu7knsim9m0jfxh51ga8zfl4gkn4jfpz87c7b43v6ivnqf2x7pc5dwyc301o9gefdh9z12m9ri9graqgn33m9iodvdibpf87me73ftt8z1garynucimkik9jhwfr0r5el6mctki7102i4wo6tr3deijh6xgs9lsox9qsgy9iqrroap4l1kdu11ruucv5kh45z1bq',
                code: null,
                secret: 'ljbzpei7njisaliq9tf07jb1sutu1b29zwqmw52frs5oz97f9sy6zc2dwb1o7r0li7pjdn9tprq0434360svj3uuag',
                isMaster: true,
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
                id: '5e094583-3e92-4ef7-9513-cfbc7bc989d8',
                name: '54mxi3v6aoc5ipnlc0yncf7fre3mfbuc79i7oj2o67f3l6v3k1b53k8m37qfutq3n3nbsfvjla1lupbcur47fjmb458w5m26b5qmyrm21ujh9f3tl1bit5m8eq8n4wwvwp3x7uedgbvhlw0vhfs8a5adnkklyeue6b5vopc2hks87zzh1ey9b4xa2gx9lur3wcs6lfxo3ckm71vpqpcatk5uk6joc0pbj9raj7lkv1no2kwxdtutml31qtl8tjj',
                
                secret: '11oq5bpz5ajbfxwyj1kdzlhyr75038bgd0dwct4ylsstfj6ce78gg0g7bo293ot8loyjvgko9pg55m9l8ifrz1gev6',
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
                id: '5e094583-3e92-4ef7-9513-cfbc7bc989d8',
                name: 'x9at2rcefbi26up4raqoddq1nrz0tf8pnbkk2xgmbshf80ilu8kojikyfdrqsu6b7c0wq74bnga7mpt0m885fsg6wwllqtr7y2dxfwpnsg49rgplq2hrupgk1gw37lzb679yv0s8oenq1ah8dw3p2i6zsxtpqc8eitc8bp24kk8u2x8gv7trq6mns66euecq24dbflsz2298whpwfj2whljp1nlmxfhogg0rqalra10u9kswkrchnzvsed5vqbr',
                code: 'c1s3zj1muen2qmzky21w8pmocijptaiennxyjzpyr7htnr2m3r',
                secret: null,
                isMaster: true,
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
                id: '5e094583-3e92-4ef7-9513-cfbc7bc989d8',
                name: 'v4yu5iugagi7u7z75c5ttizhpypouukfbo02r0u40w46uvmq4ynpdoje7twftsn71ueani5nif5963p1z5imsssxborltj645mmplno4s5yj319lva65byxp5zov3fyirgxk2r02zpi45xvx5n2jh4v8llz4fxujr6v6rrn8cs8nxszgfhwhxh1pv1ydw9nap7ez3j64gotiaxtggnc726syii2x13nxpp1wne7vp49z5d5kj0nx9swapnr134s',
                code: '6easi946hhcl60muml245pnir6fsviacc2ixquh8eg419g1q9i',
                
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
                id: '5e094583-3e92-4ef7-9513-cfbc7bc989d8',
                name: 'dt8nig9xhn2xryjx0q9r8llhwdiymtx3rvy504efcg5gm0h48ic2eodjgujboj68mxea6c5sbl44ivzbk2hwcae3xzjvi4m5aa3jsf7cv9v8bqp4lr514jskioxij4sdl87r6fjdzg6n6y94071zbkqn298buwyz05fssrc5jfhbudvq3pbfqc0a09orq3o4duyv17fm4gdgxgdrwjl9cigcre478cyys88fkp4xs1ajf4iweq8hmelbd8440gz',
                code: 'hxkaa8sgkfl6gsxuqyx0j65kxmwhpg1pgchv42k72e42ob1tqj',
                secret: '4sbapk9lxqc3w8ocomn69mgch4uma1chqq2ctv0gncbkzzv6118r0bmgy5q55fmpj9wlevuudiovi1xf9dxrexp0tp',
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
                id: '5e094583-3e92-4ef7-9513-cfbc7bc989d8',
                name: '9ayuwm5h0phx2skhl5w03q6nrwxsurz45vejc6feypk7t60q8nbi9oiic4w20qq57swikrkk3hxqi86q4b5g7y3w8smbynkvam8kzxsoxfmw07d39cvghsvgks1edk35jbvmqbzjc4y3irvqv101i1rocjov534640vm9fe30xoelq3jk6px70zujebujc183rq7pz2fge8gw6g7ue8pp2g3q1zk91wbsda0cpm2o8dt4po6vd4gz1l37oz4h6w',
                code: 'snu55ubbrqwjupuurtiekeoc1nnj066w8dzbt1sx03yeddjsok',
                secret: 'vutpaoe2gj8buwlijvfi3uhxs1kca3dp327x5nsdvdsjieb7prross58c7dcnfvlhdzp4q0250467cvjodnraptmde',
                
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
                id: '92mv6o8xqubblhl1aqsfdq5ixs4cpbbz02lk4',
                name: 'booiwpuzmu835v85caxahpjrm9epzw7r95vvcw7pqixa5yidzsbzoe542qwp6jqrycmvbbyb3yy6ugw9i6z76z3ob3z6vdsgcsbbygx1x4valpsjg2n0dxdryxzyn9x9muxtm12svwyiozxxpnrc239uqfxfnc25tzfafb97c19sfvryj42hvzu34cuczs0keqyxk3urizg52yr4sw7vvz29qlyhkri1f3v1lx7rrzr1lkj7nartr79adg8o1aw',
                code: 'c1pa35d0nlepk8569kwk62w6rsp6efqcqwse7ogzu3q72f4xwe',
                secret: 'is0qb7s0lww4gb9au3klg02y9cl32ahpycglolouucsoe22ilvnkz7h5ag27tflfrm0s051m138xoezufy8alq5fg3',
                isMaster: false,
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
                id: '5e094583-3e92-4ef7-9513-cfbc7bc989d8',
                name: 'z0ciflpphouu30bczatiabz4xoslb0n56974xvcj0tdzw5rbcc6dtp88fo6y3kanqvx2etctzht6hfppg2pmeu5vqsab0jueocnmdfuwi7q7wm28txjh3xf45t07kjnqju68e8rwy82q5d4wvorcxcqlffii8jjvixlzg8p6zpofvnhspd3niulrocv8nw496rtg68hh9ij0prq5glate24ziruaho24tigncgvoaxo6psetz0oxi0l4bxsbu5ok',
                code: '3fyelhyon5tym6nzr1sln5s5w91xm3078obzqs0eocafsh5giq',
                secret: '7cb64n7l71ss0n7rkiwxbv0d2zbm82dy69sovh0xcpefy1xm6e48soaf9yti1ijikv03od0myrtfdbbhn8q6u56e5v',
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
                id: '5e094583-3e92-4ef7-9513-cfbc7bc989d8',
                name: 'tr2fb5i6ljwy639ue8pabvcyu9ikr5ilue7y6niptrdzlgu94agxge2ced8gc4pa221nqixdq8u6rjfvlsrv99rv46xtyy6c3jkbot3xtsgpy98570dirp7swz1wfhog6jh7ehkphuax8hnduszpt14d1az09mg2gqhwanmxz8jym0oqgma1nxfooqpyumzf6sgyaojjnmgb564fai0o2wqrc4bcofwj0cl5gkdfh3n9h66jbghb5daikizcvwf',
                code: '69qzobvr8ftatpuz9tahcf7n69kgnu1n5orc4q4zp2949osf1dz',
                secret: 'jdawjogk3n5rrxn75db9xqa0xrx0i8guloubateh3vhw2f0aua37vtltkq8q8brdlyaxe2na2qv5mcy2lkwmemtpvx',
                isMaster: false,
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
                id: '5e094583-3e92-4ef7-9513-cfbc7bc989d8',
                name: '7tuqxw5gpkdx7v8cm874otadcsn6qthlsli11vlyho4rd5ael5co1b9wzf3d7f53vavotgad05xn37gsokzl6qwzuw5n5hofsr2txcasyoszxgujg2ph92ivzyizdx01orz2kdv7yi25rjo73ultmm3syjy6wwo50wh2jzem2f3qm0lwc0qnrutqfapb6f28r6kbj4t6wssfik5e11i81qcl5kpd5xi3txqetefklhd3hil6uwlx9a7dsqd9vhp',
                code: 'wt2togzrjvv0j2n3jmtazotjq7wygpuriipls29j3v4kaf9y8m',
                secret: 'yo1hcbmq023ynmh56qsf5v36zwc8ofw1by8zev3ud6xk5femto52o3t4tl62a9ggle7y5u1v1efns6gaux3t4sdkza4',
                isMaster: true,
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
                id: '5e094583-3e92-4ef7-9513-cfbc7bc989d8',
                name: 'xgxgzoyhpjj531nzv0i3fp3b9xo3y33i7d1ukpap3twklwuwacjzy4wq7p4czfr34vhhpaq4saiqcsmrls2iavjddbjid51advrwxps97hmd6p3c7yk0m6lesl0pb5rdyenfekkywancfsmyoc3qi4n6wf40p519qi4p9zajanf9a9cahwj71sm7dixwwzbc9tmkic2xml7u96311fiuo6ii8kfr9ywn4ox70ey5287yhmdn9923xvkuua6fyos',
                code: '22egqu6dkochmu7bztjro3gm3lk3rsr9vudiri7u2ayeemy4dr',
                secret: 'ja69a2lrdk1hz9b0tpxvlv0ilkzrosf546p387aaz9f0u05teagxzxs7qbq2bd91nx0uneqb9hc03l1tlr3gr2twqx',
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
                id: '5e094583-3e92-4ef7-9513-cfbc7bc989d8',
                name: 'xn2qtaco4g5t812t5n0nwz4t0k8uv2s33qfw1bmhf9xpd42alapqszlb843w2v6v0e7pnee9ap3lerbulgcdw492m2dw16xobwprejroblhedl00qmzb56ffzh7g484akqcdtdd0nmvm9e6eve9w8ctg3lvpxjiqbd36x2zvz2uqsdlksxt6iigafb9cjqc9wfn7qzox06jnlzwg74qyvxapgu25fhik34bx775ke1le47hmf6llortvmivqpt9',
                code: 'e3ikzdooj675zi1r85x7q1hf7j3nmfxforqzk4nyi7tc2j9roa',
                secret: '78xcxs2wb07zexmtmkyrzyu50lw5idsz6ucmvsak2i6tggo45kcuqdpig260zyr6r889ids2wrgdpwktdwy5ba42xn',
                isMaster: true,
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
                        id: 'd5f6cc5a-f7e1-4ab2-a8c1-3a4be0d4a26d'
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
                        id: '5e094583-3e92-4ef7-9513-cfbc7bc989d8'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '5e094583-3e92-4ef7-9513-cfbc7bc989d8'));
    });

    test(`/REST:GET o-auth/application/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/application/faf87270-b257-4584-9d4c-6f877a71990d')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/application/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/application/5e094583-3e92-4ef7-9513-cfbc7bc989d8')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '5e094583-3e92-4ef7-9513-cfbc7bc989d8'));
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
                
                id: 'd62a7aa1-1675-4ec2-8132-7b678f8c1b12',
                name: '7pjgsvkrk9esublzb80rydha77rveasivxlrae2ky3bjnt1eczzey4g7vg1wxdx6bzq36nb8gmrqb4hqtc8hydp5vx5153s89464ljbu7uu462wpedjcryfz8ol6w3z6qpcqftmyzxfqpln3llbk2oy7qh3we0ajtv20rgfd0ueoa6m8qpw959noz5gq2rb58stoxwri5qdj7diok4d0uokta9p6dnv7met73s1qp0qu1lybnm1x58c77qmxu2n',
                code: 'qpl5d7lv5vyp6tj770nxi6vd5wsn9ga9snhwhg1zfaejmtrpbj',
                secret: 'u3f7u902i8mkc8m567sm3fd88m9c1jv3vt1srefsf6oighrbcco39985hhw4rpaffzodtgx4jbyu3b55yebebmxyhb',
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
                
                id: '5e094583-3e92-4ef7-9513-cfbc7bc989d8',
                name: 'lcl1053pxis49weaolksz5d2viq05q42u8t1rel4l49uf4g8z44h8oiyq9esogodiz6tvx3iymhnn63wlk1jvyb40epht2acmr1ioujhkjjo4g6ryb2a3n95alwomnq0mp3x58x2ey2oyoqrjwb0fr6sdap9hhpn0j4pinbav8z05pxp6ekq0plac608rd8eho5wiqoyv9ubkjxasq1ii3f6tejnc2bez6pq9ff0000ml4o8mjc1ldwcdr6lu9t',
                code: '43suh4o881od99vilil4gcy1k9kfud56ej14619oncu6bkqzsk',
                secret: '3afeyx9038k1oms1519jds42me5q1rvqiaw4ptdy9ss28sn3qjtapw2gl8ypb70grnpr3cpj1878tdnn2dqflepmkk',
                isMaster: true,
                clientIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '5e094583-3e92-4ef7-9513-cfbc7bc989d8'));
    });

    test(`/REST:DELETE o-auth/application/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/o-auth/application/6e0b1a37-941f-4b2a-bda1-9646b440d417')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/application/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/o-auth/application/5e094583-3e92-4ef7-9513-cfbc7bc989d8')
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
                        id: 'c37d470a-47eb-4b91-ad21-11ba3cf70895',
                        name: 'f13v9jkerzg78aunmifam8pm1wfqd12xola1otkmuiho1ffoo5kg0iyvpi0q1w6k8upfmrlwk4892ob7u6op983n0n17ekt92l9641oylyveoxz23bnux0cbgo9q1f49dpnxy6efdze7zbgkqowgxxbuqz34npzxbrkdoef015f5fjz3qgckpwmyxkk60ngxa88o4lm6ycas40u4kfbmvss2gnegvighw9tcvfw18cdjbeiqbt4wwefnur0sged',
                        code: '2t82ltot75assp7bn0vk1pejah0b4v2b5q56pqr81qx5o2ya2l',
                        secret: '1ooarkgxd4swkiuyi546u2zf3rfdhzsi82jft48cyh8pfeiw5jl07t6aqchvxwvzx8odjn3z2uw7x3b9qtryhrg8w7',
                        isMaster: false,
                        clientIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateApplication).toHaveProperty('id', 'c37d470a-47eb-4b91-ad21-11ba3cf70895');
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
                            id: '23ae4ccc-b976-46f8-a1c6-3beb7bffc8fb'
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
                            id: '5e094583-3e92-4ef7-9513-cfbc7bc989d8'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindApplication.id).toStrictEqual('5e094583-3e92-4ef7-9513-cfbc7bc989d8');
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
                    id: '96217521-211a-472c-ac33-4d58e8dc5a93'
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
                    id: '5e094583-3e92-4ef7-9513-cfbc7bc989d8'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindApplicationById.id).toStrictEqual('5e094583-3e92-4ef7-9513-cfbc7bc989d8');
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
                        
                        id: 'd61c2f9c-9899-437f-83c1-3f6ce97a3f70',
                        name: '1x6eklyawokfzj9v0iasld143rn22360728nxepb14xq8lnu5ckn34unjd7sr7xpqnvytg6ylsybmdlhomq06t699neqkutfe74mj93rg7ng8e5vus9elmxu019wc4q8juopeszsf35p8i3kl3sxyt9lubqpz8sessdmfiqu3l97wranzs4xq2rbwa64ol5hwe43q524cp1iaqu6wxaavc1u1oso39723of6p3n9t1kcy6ejpkwv2lrlnzpgp2h',
                        code: 'ussn08pfxxxq9vb29uhv0rzkr78p7c4iukzmmdu6jcp72wk6mh',
                        secret: '6yrez3vt8tdixs54h058qf9qrh7sme4ibe7tykdv3grtcc1l6l86rmjpoe17i6848sbe4540mhv622uek5fhvc7537',
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
                        
                        id: '5e094583-3e92-4ef7-9513-cfbc7bc989d8',
                        name: '4es4ajf5kw0u1daqzoi6dbw4ag33eksbt00zalqosg138whc83jt1h9vi6atqtwhqk8hdppvpfeq448nf7cse6lxyfs15dv04jtxm2x47lh8jde379x68ff2ywtqqig2rjglgwezcfpsxw7rnihln7wb1khjafxw0f0ilw1a51sch8ai87lqsdkw45zybsxkuoh08uo3le6eutek30skfncp10s1vz5jb37y05gs55dhryh258ee1fmrp5oakkn',
                        code: 'fyu46elb6ojf89ri11lj5u418ttk9gfrxed2qj3nj33vrbbgcq',
                        secret: 'p7cjs5c15we5tp3v9ya1gm6jsb60svzh6uwxnqmloshi1ybpaqisk642upptf1t67jf734ja6n08390huwa79v2on3',
                        isMaster: false,
                        clientIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateApplication.id).toStrictEqual('5e094583-3e92-4ef7-9513-cfbc7bc989d8');
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
                    id: '0faaf067-cd93-4793-9254-049b0f057021'
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
                    id: '5e094583-3e92-4ef7-9513-cfbc7bc989d8'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteApplicationById.id).toStrictEqual('5e094583-3e92-4ef7-9513-cfbc7bc989d8');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});