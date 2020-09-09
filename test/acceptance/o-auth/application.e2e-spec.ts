import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IApplicationRepository } from '@hades/o-auth/application/domain/application.repository';
import { MockApplicationRepository } from '@hades/o-auth/application/infrastructure/mock/mock-application.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { OAuthModule } from './../../../src/apps/o-auth/o-auth.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
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
                code: 'd4ma1zzz449cw5bpq0xu',
                secret: '4zw5a6gpwfc0y3k68fa465kbi4hjmqr0h4gjhhlqkojvy2nq01wtogi8uf3jwnl2wqu808tot708ng6075uy0izmq5',
                name: 'uqazap1q7iuc2f07ew09i8hxzatxoxsi05yhhtrxo5bvggh2j54rrypzwmgfymowxj5jvpnhd3b0tsyfp5usybpt0ohn38661cdw0g4q7mp6ossjvg929ksaw0qbtq6cfna5wrk7leytyd3ug0ha8jtkv7arj90ycen611ap1kf8fvn1ikt7ic3tflltbdl42u3e1t74c6iqvwuk8mfrfert2kms57ssgzs0jbrfw89wnanft0esa1i2r2grgse',
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
                
                code: '0v9wadvm1achh8dk82pa',
                secret: '8atwh58ztp6zgchjkr7d7u64sb35r5371rkdpfegztm178v3f1jhebe6hi4axu8cq6myxb3wdli428ghcrxiqwosh3',
                name: '9wknmy32v4514avgv58hk74h3rmm3dtmcsfbwtnggzhuhwks8pk2mdh1isv4p3tdv1tgwokdsgktqtu51ib68x93nkl41g85x2671cpro6p82992gdew9vcm9ywemjolhaq46zh0wbcx07zr9tnpodr8k6kwnde1yx9wiq9csd4yv0060yj2hh8rogvu6jrauhll3k8wqu7ngq0yfvhnm7lbjsz014lj4jo09kheauhoj76u2l6uicrpa8bus6p',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '1b73a7cd-aab9-4f86-bb7e-da3b1b1a1c0c',
                code: null,
                secret: '3mio0xcxcvjmpdhj9af0jc027chd0qufgjiyfybbuoxd6p2hsygx3i7dt2vptqi3a4z02to5ygc1mp39bgvykvpup3',
                name: 'yjy0yrgu6ocr2qdsy8ufuvwjljbzqolqoo6fcme7x4a09egnr5lkrf3dkfzjwj2y4t1iih14h7gmy7qgbdskvlzm1w2o4ptu1n1m621ej7lhuc9yske5lp5rcwto320w8x9pg369qwqp1faf147lgjyl4jd27i1uor1xxk2i3omjchnvy23kyw39fsq1cezjwiyq0ir05rrltkwltqc7rjjrtsbzp3461up6jet7hoo4auplhx8z0offredepq1',
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
                id: '1b73a7cd-aab9-4f86-bb7e-da3b1b1a1c0c',
                
                secret: '0sh0y59es2bccku1l3099972zm94juc7jrw1qmrx70do44qhq3j1v4g2njo51q42ph323a0j922w98reyngubo49aj',
                name: '6ljhmpuls30qey9514psrddr4l4fo945rbxgx6axoifngdboclju25hyekrh5npm9e3fqjjahcj0qd1wjhjyrv8l6ms5e2mvxbezjfxjewgn9vuw86xpslmd2qd0so3y4cuxmnql8se0persg8k2a3q2dk9z08pi9g8byhwdh0b6gitfiujx3kr2n46lv6ybm9qal9i2kyyq21yi8alk27adsev5nfn2x4el49kysnrqhau3yy9sd2jk9z1bu74',
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
                id: '1b73a7cd-aab9-4f86-bb7e-da3b1b1a1c0c',
                code: 'xzttyh4jwvffxilpr38h',
                secret: null,
                name: 'dpimflreha3o0fhy5qdwydx5zhf4jqq2oiy0icldeez3urc000jk5cckzx629zpj94xrt6b5d247aji26argusvjnzep6q69f6ukxbnipbri9f8ows7egfcpqjzoua46sgsnqauwami8s0y3td3f4oaaitj15wl0zy655o09qtsxajmevryu690d4a8psp7nnw9qb21mn6kgxdmyzaae2hpbm20jn3tixf9owl4x2uw1n028zb6eyyav6xzdwrl',
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
                id: '1b73a7cd-aab9-4f86-bb7e-da3b1b1a1c0c',
                code: 'u16ogqci5wgp0i3vbr7a',
                
                name: '59wlonv0qo4mmw5etl7z0lgtrwvau1w9rh86mryk18eujld738fsuyigvziay4l2mue4xwz5jbxzwd0ye9r2vqdk1ees140fvlhkd9ba275sgx997bmydftc4jmfkygt22qiiad42kqes9ailq6jdr43frxs215dotdwv7blt8rulavu7f41g0o2ogfu9hod88gwvndhd8x5lwoznppnvvy4m3kgoq0iev5p1xyu0ztx2czzyub75vnj4vgt9il',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationSecret must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '1b73a7cd-aab9-4f86-bb7e-da3b1b1a1c0c',
                code: 'atxuxly01hx4dhcvdcun',
                secret: 'htrnondhwmhzvh038mkl2mysxgbtvyxkspdbqypzlbsn2hwelpjd1pg60x3anxlsjd7j49jygwn8kumnenbspk1xh9',
                name: null,
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
                id: '1b73a7cd-aab9-4f86-bb7e-da3b1b1a1c0c',
                code: '8laccmqsuiwcw46fwwrv',
                secret: 'arykm7essun0fipboznfzh6zsd2z20wqfnduv3irc9ilh8hhemptk08ok6w5xmrieshgmv2jrm73er7u5esyym9xbz',
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationName must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: 'py0r34d6ce4s6islns0zah406qm2s2tccbjoa',
                code: 'n6qcqg5grzedv4526eta',
                secret: 'b5o8um9xzvl3sv2xdx608xr6q5kk3t32h29v2qh5z4qo23x3jgxtca14pyccmrddbv7xcv1uewohnlzxsq5biphaxx',
                name: '2rapjh4pd6vsmqbru87zunbclvwob4fsmncircco5cw9v4gwdqpesuas11i4duxeaon1s6nldg51lbtngnmurd4bqosrwjohnnyfzwtv5qddqpg0g84wgtblmgj7q0qxarov5yqu41qax5cjwc0n484r7f4yymmfb6gmvnaz7l52tvv41dqficg9ty3gzbryb1doufz5mdetw84yef8989ih6dgal2mjim7wvf0uj2seyw68bdxtdvkavpyhh6n',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationCode is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '1b73a7cd-aab9-4f86-bb7e-da3b1b1a1c0c',
                code: 'cqlslyw2yqwg27b4hw11t',
                secret: 'p4e2z0wg3vv7u558gmedp5xg623m3n4wb0glg7moswc1maerajcopaoeyl8nx14whcmqgxptu2ic2f9apz3biqu443',
                name: 'v911i1f2o6y6de1iofxzpasv3wk853gcrl1j3tdcyqz37bjnqijio64yagensga1qz4c3ls9jqe44u09vp23frso1ftrfoow7jev2uxvpp5el38i1srwy4zxggyy71t5fz02p79wzl040yq327flbjkxbxg0vs7tm22z6hwhxh4xhka9an3fy3ij2t0o45bfrlp2rv1lwz1gqvhb61kh8b1p734hyt5gok4fo7ga4mogvsoowk9x4xndg885c4g',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationCode is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationSecret is too large, has a maximum length of 90`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '1b73a7cd-aab9-4f86-bb7e-da3b1b1a1c0c',
                code: 'wcuy7njq8bh2keawoi54',
                secret: 'tfyyfiicobq1uvf69pg3plrdkji8et2r50ongb2z6ur5ym5cv3uf1eufn7ezas1r6c7sk5ghctmi80mzf0mx6a5s46a',
                name: 'p9t6s8jdrrtropiyi2y2mwbmanrogiabhc5xtqfkndsme1a7ftg2pdvycetkeoleb3h4m1th8lewtbdlkqi5rh4m5tel0ezz9jr7ltoqde6g56ux18zvlctmw9lcnbooq29penfox1jy67l740njtahppsdtmr2j0sfe5gn9c1vbu8fmayxawq0la37yaxq96kydat5ntrux5donu67gu1b76ccfdjvtxr4484qq98n65jyq6vx38wjy4srvk77',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationSecret is too large, has a maximum length of 90');
            });
    });
    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '1b73a7cd-aab9-4f86-bb7e-da3b1b1a1c0c',
                code: 'nz6m3e40os3v2jpsvi28',
                secret: 'k13pw960jm3ytimefn3uby7u2a7fgfgk2s8ddixo2eo4or7iyn7dbjzjuycaoedxzwi4ovf9dfyn5tlu1y3xqi8bvc',
                name: 'x46o6potmsoq8tsitvht59kvnofjm4yugkad3dy6hc10cnl20om59harplcsedukvxkm4zr3o8zqz7cjnkagj8srl4ml7z431b6iadmmezp00xifqv80r2z43cpt81syh86t675p4dl789j7ndcujz958folayv7g3827f9c8bg2o46y71le9n1e1glxoj359rte0zop3annczdgm9psgffja8kbag8lfhu3xo0wyjbm7slc8kadv67dgqe6q2qa',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationName is too large, has a maximum length of 255');
            });
    });
    

    

    
    
    

    

    

    

    test(`/REST:POST o-auth/application`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '1b73a7cd-aab9-4f86-bb7e-da3b1b1a1c0c',
                code: 'oefp90egp4d4jwabb1wg',
                secret: 'p7j5o5jfe0trzsi7pdkgk9mmgtj0dg7fgr4be4hs7mv086yh8kj1nnaxdfz5x55emx3h0kx7yhc8g71704ik14pc83',
                name: 'kjvhqm5l8k6ja9qyp0fpc1rgl2q4u2gst7vxhd617f4xi7m39cdoez30y8rv4o7rbep94pjn8omcyl3hqlqaw52esu7z176vypm3u74fd8cpj9dhlqdmz2xzvc8qjcjwgf76xegeu0b52446h0jg2i82g0tkl1g6wsmjd91p58ajklelovj741bziz2y9s4cuodbvhn220ua0qk0wykqvodr9fb5ww5rka7ayydnbuo12c3k9e0ynd4etu7hqg2',
            })
            .expect(201);
    });

    test(`/REST:GET o-auth/applications/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/applications/paginate')
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

    test(`/REST:GET o-auth/application - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : 'f072539c-ac5b-4748-ad91-9a42e01b3094'
                    }
                ]
            })
            .expect(404);
    });

    test(`/REST:GET o-auth/application`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '1b73a7cd-aab9-4f86-bb7e-da3b1b1a1c0c'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '1b73a7cd-aab9-4f86-bb7e-da3b1b1a1c0c'));
    });

    test(`/REST:GET o-auth/application/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/application/4f273f47-95d1-47f2-899e-35e416df2e08')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/application/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/application/1b73a7cd-aab9-4f86-bb7e-da3b1b1a1c0c')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '1b73a7cd-aab9-4f86-bb7e-da3b1b1a1c0c'));
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
                
                id: '580e3a4b-b140-4cc5-b8e9-f454d22e27fd',
                code: '6ly6n40ucdie81ecjmvz',
                secret: 'mmcgqxs41v3nfs07o4d9ev1bzwp2zi33z8rxv7nnfudhkqyehynf23h1joourcw87ah6ju9q1e54jczzkwhbni54uj',
                name: '20gqy896fzcn9szl37dd913qnm53nqfrh4f34aywvdfrne6xcraoyhrldfurjwwi7x28mtp22oofuns2mdu2zpigsvbli6noy1gzt8dw423trzyf5r2thav4870tly0ghrqiqmqlh1f1q9w8qthqyft7nnii7tkhm2ccz658ml5pks57ru3oe3zoqyk0mamwye9qs9vcpz8p4td9uxd4ows4poi7dvu73hw0v9rclrlci4rpnoa4cx4zcxobakg',
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/application`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                
                id: '1b73a7cd-aab9-4f86-bb7e-da3b1b1a1c0c',
                code: '0bbg2xteg510e6sjqepl',
                secret: 'xik5l9w5i5yekcqn4yuxtuxythw5d8yafka7m7f8fg9towh50xhga0gvkh8mgfkd7aowmmplg94vu1r7164jp3bgl1',
                name: '311nxknr0yj4c24hd211zjv0khj1l5x7bplzkaaoafrdoalx3of74j6b3bjdv2i7gk86s3cjm4jl4mxc6ckgurkjhyostqp895eanzevrc8siy9rkwasg03zzj9pfd4nudd61c93fs6ubzpcamozlce9rjjbn1eqtb08y2zgzw5eq27sre1ruc46i5ggsask3mcbdobqq1n0gaayilr3ism39yfa7vu9jue894qnof8c7n3n1gy1t77jmtrpdof',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '1b73a7cd-aab9-4f86-bb7e-da3b1b1a1c0c'));
    });

    test(`/REST:DELETE o-auth/application/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/o-auth/application/909428d5-cf8b-41d0-b7e1-50d2941a1121')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/application/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/o-auth/application/1b73a7cd-aab9-4f86-bb7e-da3b1b1a1c0c')
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
                            code
                            secret
                            name
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
                            code
                            secret
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '8c99a6a6-d454-4080-a592-75fb363aa05c',
                        code: 'w1fgph9h1dbs564kn8uk',
                        secret: 'o8rztnpj3uypji0d6xmpkc9znf332fzl0fwlhif03gwhlblxotyz704oydzwzvaweaytzq0lhhog8ar8lxvybt161f',
                        name: '170qu4cdkfye8fqkozchm7y4p2jjh0gubhzipnuapf9ph6j5ttihb9dmjbco7pb0yv76kzuv2ly35z2aign2slxct2t6n1ops2ujos6404n8fnojgz2rxzdb5ulsjeky2s7bfegeygtjx1try7pbmey52ciwyqodmbq5cynadkyymozohzo7hmh2o6y16e9qik6fpce4ttx7ubde1djsm7vr5bgnsmnzr4o4hui7t3bfjs1t3ovk6wrgppq4v5k',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateApplication).toHaveProperty('id', '8c99a6a6-d454-4080-a592-75fb363aa05c');
            });
    });

    test(`/GraphQL oAuthPaginateApplications`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        oAuthPaginateApplications (query:$query constraint:$constraint)
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
                expect(res.body.data.oAuthPaginateApplications.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.oAuthPaginateApplications.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.oAuthPaginateApplications.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL oAuthFindApplication - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        oAuthFindApplication (query:$query)
                        {   
                            id
                            code
                            secret
                            name
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
                            value   : '3771295d-af2e-424c-bc07-65a1536ab7dc'
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

    test(`/GraphQL oAuthFindApplication`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        oAuthFindApplication (query:$query)
                        {   
                            id
                            code
                            secret
                            name
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
                            value   : '1b73a7cd-aab9-4f86-bb7e-da3b1b1a1c0c'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindApplication.id).toStrictEqual('1b73a7cd-aab9-4f86-bb7e-da3b1b1a1c0c');
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
                            code
                            secret
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '25059b95-6365-4693-bcd5-9d0276fea638'
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
                            code
                            secret
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '1b73a7cd-aab9-4f86-bb7e-da3b1b1a1c0c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindApplicationById.id).toStrictEqual('1b73a7cd-aab9-4f86-bb7e-da3b1b1a1c0c');
            });
    });

    test(`/GraphQL oAuthGetApplications`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        oAuthGetApplications (query:$query)
                        {   
                            id
                            code
                            secret
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
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
                            code
                            secret
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '989e5ad0-e32e-45e5-92c7-c17749be226b',
                        code: 'f036me20csk2arfxnfsg',
                        secret: '5rto9isz1il9lygadf0ipk18vqgshiyj877fe1j5tv2wtbsdxiay4tkh8ambdwfmcjhjqvxq37u1mwq44z1zmhqt23',
                        name: '6k65od7xaa9xobxhvyuvrjpw3tux38isn4xyj2hs18o7o004axugdym6fj8rpsatobf88jjadoke5fgk881yochf4g35ktsui8oae15x6gqdst3htmk503bc015udkkqrv3ispk5cux9m1tyf5wnvcux283fq0xicb5e2x5xxjm2t9iyt7u0qadopfvqu0aaaj774zuoimalg24w0au8k8x1ebwtdb3z1jqz73isqv3drvtft7sao15eflbb5as',
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
                            code
                            secret
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '1b73a7cd-aab9-4f86-bb7e-da3b1b1a1c0c',
                        code: 'hekczw67uzttdbpjiott',
                        secret: 'kbaxzkmprvdndkk3actgcad9vhw9yw7cus4icjam1a5ahskcb0c7uhc7g073sispjjt7a7dbo4c5xd8x0w9i2anvtm',
                        name: 'cqgd92rylu8c4wy78y20g1zoqliuhc9ky18nxvt3c30q2jhr5n6klakbqv5nc3tn4tls1fq4vpfyo1fk0dvy4akovhw7q3z8q5kwgsue9isiduj0g3ocd8kre4ndwwf6hkobuja7oh1fe0nsh57kysv8g5ku5wddsdw1iri0jbxfd1v7kh22kekz27hs79ugnezynt3wknyi7nmi27gt6heackhazg1oe9vdr1oez8tkprdxjeo5rivbivql6kq',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateApplication.id).toStrictEqual('1b73a7cd-aab9-4f86-bb7e-da3b1b1a1c0c');
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
                            code
                            secret
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'efbda1bf-b404-4a60-974d-7091267a0189'
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
                            code
                            secret
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '1b73a7cd-aab9-4f86-bb7e-da3b1b1a1c0c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteApplicationById.id).toStrictEqual('1b73a7cd-aab9-4f86-bb7e-da3b1b1a1c0c');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});