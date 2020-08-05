import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IRoleRepository } from '@hades/bplus-it-sappi/role/domain/role.repository';
import { MockRoleRepository } from '@hades/bplus-it-sappi/role/infrastructure/mock/mock-role.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('role', () => 
{
    let app: INestApplication;
    let repository: MockRoleRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    BplusItSappiModule,
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
            .overrideProvider(IRoleRepository)
            .useClass(MockRoleRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockRoleRepository>module.get<IRoleRepository>(IRoleRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/role - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '6e4bce49-333b-4441-b565-3adc6914baaf',
                tenantCode: 'xnkp9tvxj6zqa02k1791ycvhcwzfmyo0n1fn4z0lui3hxzx0vo',
                name: 'g7jgi3pfuxa4hy44znawxg0hb98kq58h19hkyquo3yjh88yxq3el28on0g2mr11ue2jfwo9qy155qo6i63hta4n1zsfpoihlbaxh9jejjgflbsinlmu2g1oecpemjc40dhj61uigm2mmptaa6re86kgt44jcq779fmogx8k4zlvny4w85qepx8ug8w6ro6dx91zx3apn7rhzpukacrw4mhx1865libes8s1lvy6urc47jmn3humw7m2ivx7jd9k',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '6e4bce49-333b-4441-b565-3adc6914baaf',
                tenantCode: 'm9ecoq8r46rxrvppvgb8xmsbiqqwyh9bylkr3dovpm44e3px7g',
                name: 'hpy4f2i68f0p3a1sh7x7ao3upg8hrd524zd29knak8j7nhib1wwmrb273gcfpl942aouoml2zwi2354b78baheoift2eg49aq0kgiwzqiirr5ceuxtr3jbzw661za2mq4bbzfwn9uf09lh4ly1a883a11cdjhkwpwfmv0c0qcpl0qbzb39rehwahg1nao89g47w3urcuk3owuywloje111wssmsu5kp43pch3p402j9sz03x035yr2o1y87ij2y',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: '1852c4c5-065d-4339-87ec-ac0250ed36cf',
                tenantId: null,
                tenantCode: '6knrjl6tr65hvbj6okr40eg2j0hgve56o9yqjjue4189dhgeqb',
                name: 'jgr832m8ela4llya0a10u5qvm207obhih1u7fpb7zujetyiabuocwx1vnl72mmnzzcwtoo82m7forqie6a630h3m7unovla92ohnnaf694lhida6v0de3881odaxbn57whqtzqn8g9hqx9mig0k11jzdai13pz6fdaoc3k54no91vd5y6i677xqtnoavacdvt69c1lef2szwbu2hb5ponqbb6mqckd7c0douytfh8todme6cm3wtmy30h142hos',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: '1852c4c5-065d-4339-87ec-ac0250ed36cf',
                
                tenantCode: '66cm5tzpd6bao3t1yf0txj4k2ucl6nm2are2tmu04c3gf9cl0j',
                name: '1osk2zvsveyajuza97mdhbguzzg0fifqkcfcv253kjg6o76md9139a7vjjo1pfe1wo2e4wobzh7gtm19xdrdlkubgjxq9fb6n6s7c2zq6bdmq4ukl4nx5xp9ax2iucnftgbeeaasnh6va1630qq31flq8tasxbdsmnbsltus93fe655khbzbgpsreky51ud2s8n2iuo37a2awo9s33txb6bbox4thw3b0paw1skroo2xa7jfa9yg446z4qp86ks',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: '1852c4c5-065d-4339-87ec-ac0250ed36cf',
                tenantId: '6e4bce49-333b-4441-b565-3adc6914baaf',
                tenantCode: null,
                name: 'v30hq05viv2v190574eip5hsve5pn28v73c35nrr8z46l7zo8ki4vgddjpygtibta06cu28p7plp6vdz87avvvuwpmtlxeakk48cohnvrkzdrvb246iqpm5td3mqvvbo3p5ailmkqif8frrprbjrv04hqujxo666te7y1okg0ah1jeky3pojjn0wcym51svqcjsfuldk4o7jbgwqlp0e27bg99hga0hd6ln7qlaq5kks5l2bg779knr7s1dv1ev',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: '1852c4c5-065d-4339-87ec-ac0250ed36cf',
                tenantId: '6e4bce49-333b-4441-b565-3adc6914baaf',
                
                name: 'pzhj5w3bq39nx4rypfdw2gb99xg9v9muisp3plqx61ijjb47pam3xx6scynt3a165st4zp6dolhmwdsxtcqra9vkwegaqcqhbvb70psc9g4vo7norltsg2hs0788u69mi8oqub02y93g62spfugbt777qy91kb1b9w95j7uvzwj06a2qjvdp000i3c1l0jucnsqlk55unkku4s3zyr6bgjkt2puj598cqgp9k27kkrz9rw4zyitvszd78y2zybe',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: '1852c4c5-065d-4339-87ec-ac0250ed36cf',
                tenantId: '6e4bce49-333b-4441-b565-3adc6914baaf',
                tenantCode: 'uv6erxjqsbup9gln6gd33b5x1tenu9vluq8q0u8ze21xl1npqt',
                name: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: '1852c4c5-065d-4339-87ec-ac0250ed36cf',
                tenantId: '6e4bce49-333b-4441-b565-3adc6914baaf',
                tenantCode: 'dzl69xxzollqrvcs2awta6og1ghlcn94m4wsd7d57e9g5ecp21',
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleName must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: 'sgg4uyw4vo8q3x3k4v316eej6o5okriv2sz34',
                tenantId: '6e4bce49-333b-4441-b565-3adc6914baaf',
                tenantCode: 'rpvgn1mt6qtnspi58nsdn53lmgjxaqrwz5rzp8r37exkn702yr',
                name: 'ybrhbmnzalf2b30hcr101f3ri80bv3qqjfxyrmmzshr1apta9hhhc9xlv35xav0y56n58ru4ynkd2cj6wkzelidinxes6la330lhvef1cxar8o9ho14oque4sax22a08k4evtxha5zkqhzghifuem63c4vavmx8iaczsjo5pv04qf009rlh1g12xqe3dthhicj4erh2p4toixau5ies9kw1rq8r0h6fm5h09bec00p1g2btfo97nvfvjwhtbo2n',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: '1852c4c5-065d-4339-87ec-ac0250ed36cf',
                tenantId: 'g00cswhke8ybjvns3guu4spt2kgwyjklmtfcx',
                tenantCode: 'w5k9j22uluc7tn1c6dwsxy8m4f8bbbperkwnmfefel57pos3j2',
                name: '198l439enx32dtvrttb8y90e57n50kyb5mr3lsv7djerq74maqegg68db398hico1uisrfrfl0i9l4n7ws5z1911bodto0zrwaxortd87xhcozuu4c5zath6hay3538hjsue738daewjxawe4jg82xlpphq92j4ug23fbgw4rui2vl5hq02oiv0rs6s2xg8i5cm863oldfai15i8qe5x0496hqjqs2kebqxgkw5petu8iq9iri3gzhk9zsin12e',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleTenantId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: '1852c4c5-065d-4339-87ec-ac0250ed36cf',
                tenantId: '6e4bce49-333b-4441-b565-3adc6914baaf',
                tenantCode: 'efnc4s08gkrknn9triznvxzjdlj53nwm7s5hw56m4lflbjo0ws9',
                name: 'c3uxnz1s41even67ct3nzwcoi86z55vph5dcwopwzwp8huj7f8phd5tf69voxp3gnrfs3l2tt7q1a0r11cpv77iydf67a7mhnc0yyzcebhbo8zm2uy3iu5hu7mosvzlfr650dya7lbkw5uruesak1hjdbtxwh609552pzchzemnobbnykgjpihboqonjp30sv28qdcnr3iv8laooa3syh046i8qrjo2znwvebf83r5ps667m5s3yejt1gr6lhm9',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: '1852c4c5-065d-4339-87ec-ac0250ed36cf',
                tenantId: '6e4bce49-333b-4441-b565-3adc6914baaf',
                tenantCode: 'ipnd3wcdyqg55rthmnll1a8dacwlgj66p5bi9itr2pmnaldg5z',
                name: '6clph92poqizl9ulqip82ltw12dqyjw9exk2pzsr08sith46yrdyf37nomctgivn66cxyavyx0uur7hpalychsz0ln6d7tsqnfiuzjqi3k2m3huu8mpcf619giq1vla9j0u830eghx3x8fm53rp4udxare6wr1qjnn44z8utcqsrwq42n17e15kxmqeo4uevzv7pkgp82zmse6ut1l2kozdrds6n7ekz2djz1wdocvbq3tbwy3n7ljny7j8rxzut',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleName is too large, has a maximum length of 255');
            });
    });
    

    

    
    
    

    

    

    

    test(`/REST:POST bplus-it-sappi/role`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: '1852c4c5-065d-4339-87ec-ac0250ed36cf',
                tenantId: '6e4bce49-333b-4441-b565-3adc6914baaf',
                tenantCode: 'cq17wimanhaovqfw73z8uy2edfqlq0wxckl5y17s9a7xap4p1k',
                name: '19o8p8jpimqawj80xdqvdzszktopxq0btnikyqa7h3j0vr4xqjbwybbcvg34crx2c3xwdyfbymyzpw19g60ukry08yadb8ut61tl694dx51wwww5qjvumjlza93czmu8b9mx4km24ws8a671mo0aag43sv52r3us0y0hewb80zgw459zbykqzdd9zmluqj4dgqpszsljntpas8es5g35ljd7vhvcapjjtppkmd734nevigjkp8dyh5pmz7rezgn',
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/roles/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/roles/paginate')
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

    test(`/REST:GET bplus-it-sappi/role - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '7cfb6011-f5af-422a-a411-1da858587a00'
                    }
                ]
            })
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/role`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '1852c4c5-065d-4339-87ec-ac0250ed36cf'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '1852c4c5-065d-4339-87ec-ac0250ed36cf'));
    });

    test(`/REST:GET bplus-it-sappi/role/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/role/143e4e84-b26d-49df-be26-e8bf7bdf68ce')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/role/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/role/1852c4c5-065d-4339-87ec-ac0250ed36cf')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '1852c4c5-065d-4339-87ec-ac0250ed36cf'));
    });

    test(`/REST:GET bplus-it-sappi/roles`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/roles')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/role - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                
                id: '1e36d6d3-94b1-4ee0-bbd3-d37b5a50a5db',
                tenantId: 'e7e528e8-e44b-4878-ac4b-87c7b395e4e3',
                tenantCode: 'u58lt52k4ks1nyo14ib23uzzq7tpaco4lzxjmw5jmrf1m00bly',
                name: 'b2z35eqzqlp7dmrbog24crojnf4ftx82ifhd7gfc363tq98g1pfin3m3nul1opp6it87mt6k69imrtlpvxf6x2l1kunekg3jp8k5r3mu13jrs8b816gsttv3a4si15p1vbtyk2570z5erisb4hx259mufgb86tl88ix1qn5e488fmdidkx1js34exa7vigc82bc8ac2b5p1t11q9cm610x25kkjh7eqramdptchubf8abocu73kg70ztzze151l',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/role`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                
                id: '1852c4c5-065d-4339-87ec-ac0250ed36cf',
                tenantId: '6e4bce49-333b-4441-b565-3adc6914baaf',
                tenantCode: '6jm5qst86ufx4vvjtye1tly5sgbfjfpryd2mue1tlpelwmzw9c',
                name: '0zdoumgaf6h05ffovc0nd7opjb4vhu2w6y2euibtd8sbu016q6pvilidn451nbhuk0zkho3me3aaooed44sh2ag9n07lvbho4b66j554vcipoyw5qcgfkixl1gujdg74kk0zl9w4qb34q55g6ap6beozemze3cxhip0egiby13j9iu9yxfwhqby79zn66uvsg9gmigvpqferhiekjb07qewmqf4ljeju09a8a6j1rzqyyu0tona098ofqkgza53',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '1852c4c5-065d-4339-87ec-ac0250ed36cf'));
    });

    test(`/REST:DELETE bplus-it-sappi/role/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/role/9d80f84d-590d-48e7-9533-2f592d92673e')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/role/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/role/1852c4c5-065d-4339-87ec-ac0250ed36cf')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateRole - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateRoleInput!)
                    {
                        bplusItSappiCreateRole (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
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

    test(`/GraphQL bplusItSappiCreateRole`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateRoleInput!)
                    {
                        bplusItSappiCreateRole (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'c95688de-0e46-4fdb-b134-6c15363dbf52',
                        tenantId: '6e4bce49-333b-4441-b565-3adc6914baaf',
                        tenantCode: 'h1igao3nmqdg6sv60sbtddw001k797agmvbzg6fadmvn851fqo',
                        name: '7k6xn3s7ad5fyh9q9y5hmsk21hhaebn3zxjv2g5btkppg8iwph3vv812zh15wkbk0s756u4at7v1yrrwr4igcjvn8912p9mfuh6pfyqs64e6swlmqdb09x0ofyr02xqxz6anxo2m7cev4alxgljh521z4ja58rqxngaxq8cm2zx4wclbvsyeu5dfdabdkc7llg0yli3vprbjapcaj1sr2spx9t31yqedscltdwxi93hs45m8l3qhj21zekbhlxa',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateRole).toHaveProperty('id', 'c95688de-0e46-4fdb-b134-6c15363dbf52');
            });
    });

    test(`/GraphQL bplusItSappiPaginateRoles`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateRoles (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateRoles.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateRoles.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateRoles.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindRole - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindRole (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
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
                            value   : 'ab90adde-e986-42dd-ba8c-e90d5b9c003a'
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

    test(`/GraphQL bplusItSappiFindRole`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindRole (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
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
                            value   : '1852c4c5-065d-4339-87ec-ac0250ed36cf'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindRole.id).toStrictEqual('1852c4c5-065d-4339-87ec-ac0250ed36cf');
            });
    });

    test(`/GraphQL bplusItSappiFindRoleById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindRoleById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '51fa743c-afec-4243-9d0a-921915535f61'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiFindRoleById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindRoleById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '1852c4c5-065d-4339-87ec-ac0250ed36cf'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindRoleById.id).toStrictEqual('1852c4c5-065d-4339-87ec-ac0250ed36cf');
            });
    });

    test(`/GraphQL bplusItSappiGetRoles`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetRoles (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
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
                for (const [index, value] of res.body.data.bplusItSappiGetRoles.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateRole - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateRoleInput!)
                    {
                        bplusItSappiUpdateRole (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'b7db8b9c-a20b-4bb3-86ee-89aac4bd85ab',
                        tenantId: 'e51572b0-32cd-48c6-8507-6b21c211171f',
                        tenantCode: '296iwq8gncc6tqbur8shrj4q3ppznslljivi2chd7wrua6bmbz',
                        name: 'p7gbyijessip3lwiu2wiewg7krcjy09fa4dy3wcyzwmyqwrwiozye2iz1wlwb7qqita7707xvlq1o1lyidm0mta1e5ljzn6e0zfwuvhw1k1kqgnyllv4k8oh97z8sg0g953yatpe9t7hwh2rcay9so4paobgil7loiu1lezzakg1x5r2adleo3vbfebfl9hiihs8gw9zllfiz8ma13yzrdc6b32ffnlxpwwvml6rygogi39ryslceppbwfx0vc9',
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

    test(`/GraphQL bplusItSappiUpdateRole`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateRoleInput!)
                    {
                        bplusItSappiUpdateRole (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '1852c4c5-065d-4339-87ec-ac0250ed36cf',
                        tenantId: '6e4bce49-333b-4441-b565-3adc6914baaf',
                        tenantCode: 'edcrv8v6l7sbkgkry3h0megnzy9jaj4bqfyqxqnqb0n6gm87hi',
                        name: 'a8hnpjnhzd70s4aoy7jstokajqkx5tgvhe5qdkxt2glq3l1l6ufzdgjicocr56u7h9n81owdh0yy6a0fiauv2uwg2hx497s9fmfgt5k505bylli5byblnewdsdy5h4ei57in2lvbde73qeogfonlm91faf8zfzolf9x7pzl9jd2lk54rb1bqnnuxx1r89r5qnpffcg2xhk9xkhqu7g6t12ne8r8zwon82209mrvuf3v9nm7z84vaym7v6jsidmq',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateRole.id).toStrictEqual('1852c4c5-065d-4339-87ec-ac0250ed36cf');
            });
    });

    test(`/GraphQL bplusItSappiDeleteRoleById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteRoleById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '858d1ecc-bfdb-4494-ad6f-394619587c47'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiDeleteRoleById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteRoleById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '1852c4c5-065d-4339-87ec-ac0250ed36cf'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteRoleById.id).toStrictEqual('1852c4c5-065d-4339-87ec-ac0250ed36cf');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});