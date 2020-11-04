import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IRoleRepository } from '@hades/cci/role/domain/role.repository';
import { MockRoleRepository } from '@hades/cci/role/infrastructure/mock/mock-role.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { CciModule } from './../../../src/apps/cci/cci.module';
import * as request from 'supertest';
import * as _ from 'lodash';
import { IamModule } from './../../../src/apps/iam/iam.module';

const importForeignModules = [
    IamModule
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
                    CciModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
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

    test(`/REST:POST cci/role - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/role')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST cci/role - Got 400 Conflict, RoleId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/role')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '78e68571-f490-49e9-96f5-a3690e6c5a1c',
                tenantCode: '6jnql83d97q8p6hf7xlvcn36lh2oxh085nyeemenaldkznh49l',
                name: 'fggk7dvk3j1bp4bdoi8oq58egbcdhhtdvtg23ok3sxa0kmn9f06ng8w7o5gum7vq9i39dzt02zjkvt1jw5ce4xj1ukm4jh82vkhp7macqeicg99r3tnd6rfub95sa438jtf2zhxsruu8futqn7ehqhyusfmx47dw199htgnrflnw3g5gi6ryjpdsxcla28xubjhr8ibrom64nt1p12zuoefbmh6ctnyn73pa9v9utn01afh2yvrvngecfob309a',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/role - Got 400 Conflict, RoleId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/role')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '78e68571-f490-49e9-96f5-a3690e6c5a1c',
                tenantCode: 'mtbdaux2sry2d2docw5x3r4afet5sj7w5azn6lla0fvdis0zns',
                name: '64zphorzcold6q9g6ko8j3zgt0svany97g973nk69lc2a4uhu9vfbbhzpmoao439sjb1yhftjs9p4slb71jqwop6utjsp25x5zgxnru5rac55rhs95k9sz7acs009qmoqb6428flndl7buubwx6de13ah5d8m06ayf7na6ex9k1wawd33mqoovkmuonbp2uc37161994ib6mxyo1q9qfnwzzr0a2q6ri81adgdhphy85k31po9af8ji7ylof6c7',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/role - Got 400 Conflict, RoleTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/role')
            .set('Accept', 'application/json')
            .send({
                id: '38da671c-3180-4a1c-a145-f0575c7fd4dc',
                tenantId: null,
                tenantCode: '3ehu0v2pcundljr2k0kn2lejtxduvutu465qrpblyf7v9v6slm',
                name: 'zt34yptz1pfz6sajba17gmxxl5nupf6xkfwi5rg1q24wcalb94uepwm4kckr6v68fhxlg1td5ugdv0ibdqdav6icp23d3zo59gbs3hba54b91twzx3opf01ok1zy6ipaa3deqrtb7n9p4kjol640j87ribafgf4u0uvrwhk231q7iv57ehdjvtibsr3jgoy23fpzeu014met1xdpq6285hal6qs6cpy3pjbom248zv5kckz11dew4xklbxg3wz9',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/role - Got 400 Conflict, RoleTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/role')
            .set('Accept', 'application/json')
            .send({
                id: '38da671c-3180-4a1c-a145-f0575c7fd4dc',
                
                tenantCode: 'nlwrbwhynpef7altka2vv7584e8cwt3epuo1vumjapeeako7to',
                name: '5stv92sikknfzj3v0q7osofq0ter3p72pa69cf8pxcqpn3uxqc5b3tdhb2oq9ea5ylcqn7tpwlphjp8sjhmr1f0xg9j360j9ocurjokltkzo97232bjez4h3o193c89k8dxtf38xdek6cdy59pqgb4bowdnedqhbr4e8ascwlr4g8fj3r8okd1nyzj1u08589vblh73yuvujbfllpx7wm810t23x174j6cuurhy4wgceilfdp9xdm4cl8sj1aec',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/role - Got 400 Conflict, RoleTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/role')
            .set('Accept', 'application/json')
            .send({
                id: '38da671c-3180-4a1c-a145-f0575c7fd4dc',
                tenantId: '78e68571-f490-49e9-96f5-a3690e6c5a1c',
                tenantCode: null,
                name: 'azkzfhmd5w6j6zlcj954xcyd703554pv0t5k0kuy8tt2jwwp9g77ysnviln2zo2rj4e9v2kquwozdscprvc83ew158triv9mzcpbxrqv33jl9xrsrcpowb2k8zizj8zayil2oytqorezr89cg014t18kxuzgsqgtz89fatv2ewaxeak8ookwtknbws2cf2i8cp8844089f8hmamxd1q50vtvcqdjzoatov5rjadk58p0tznxosx7714bjpzu47j',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/role - Got 400 Conflict, RoleTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/role')
            .set('Accept', 'application/json')
            .send({
                id: '38da671c-3180-4a1c-a145-f0575c7fd4dc',
                tenantId: '78e68571-f490-49e9-96f5-a3690e6c5a1c',
                
                name: 'tltsggzd5z1dhjcec0quo7wd2mou28dt8ythmbi1qv7lzqt1wimbw0pdr57g2gf0n5t4nvscl6yfas84qnxpag9dh20tu2fyiwcyki4i5scnluqwrjzj7hlhbccys9si6howhpojkb1ysoms39gdnv1nls33nseem3icyqnhsn6e1aewg2ahthllmqjn3mhn5ow0t8xoeo984j9ah9kf431uhpep6lk1oeukc2tr2lid3jpqcch6ql38g8pkzi6',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/role - Got 400 Conflict, RoleName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/role')
            .set('Accept', 'application/json')
            .send({
                id: '38da671c-3180-4a1c-a145-f0575c7fd4dc',
                tenantId: '78e68571-f490-49e9-96f5-a3690e6c5a1c',
                tenantCode: 'bzq30usk9nktwfe2xbzhgykpiwnqgzxwm8heqkufqe64b83y4d',
                name: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/role - Got 400 Conflict, RoleName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/role')
            .set('Accept', 'application/json')
            .send({
                id: '38da671c-3180-4a1c-a145-f0575c7fd4dc',
                tenantId: '78e68571-f490-49e9-96f5-a3690e6c5a1c',
                tenantCode: '9xpfcaytdbbjr51rze07eu0a6x9vah4p8zwibho6j9bcmvq7g0',
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleName must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST cci/role - Got 400 Conflict, RoleId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/role')
            .set('Accept', 'application/json')
            .send({
                id: 'd3bhp31zj920uik2mw48za1sb0x5aavzbypen',
                tenantId: '78e68571-f490-49e9-96f5-a3690e6c5a1c',
                tenantCode: 'kvl7y8aqmxuy83lhvrlyzt4rk2zcghzi0kvf4acoapudyl2qlt',
                name: 'khfn1fk0jkj9t9u02aaed5hdeo5wuhst69g2u0a4fp613kylzf7kk8oxkzol2f6pb359u5vptrzyvp53us7eodkza8tjs621yviu31odtj5i1ju9zohkk578ll55eb0t3rbx7d4nf4wiozs40w8azqpg5vqejenlnihf4w6ncsfu9899n48yq1t0adi53oh86m3ta4qrnz6dmtuokpvwckl1vqheqo2cvhk9rlx8zodd0cjwr4vvagac149xsst',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/role - Got 400 Conflict, RoleTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/role')
            .set('Accept', 'application/json')
            .send({
                id: '38da671c-3180-4a1c-a145-f0575c7fd4dc',
                tenantId: '02cg7k3ajvqpwfqshw08gq7ns0p9q0w5fo1hk',
                tenantCode: 'm5honmefrhem06q02qnmi7rfb8gfgv8jtceqov6tcvw7wval3d',
                name: 'cjmmkt42x5g2i4jriuyn893pu5da1yvxa8oawrrnivoftnvyabugzfd4wxvotzgwmtyvoq73fsdm67g363j6vvwtb41oew4xti2tqpug7anhai3l3t06oyrayrwe0sq3icriu8v1ob8hozukxwv0330r7mgayspdbwpmdfgg0ylgdfzg3xd4grs3gnftmsewsb5hehh1a5tdfyn0hjh6hvaerahh5u8flr9whfzuyqz5gwq3w4ay8egxjw6li0l',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleTenantId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST cci/role - Got 400 Conflict, RoleTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/role')
            .set('Accept', 'application/json')
            .send({
                id: '38da671c-3180-4a1c-a145-f0575c7fd4dc',
                tenantId: '78e68571-f490-49e9-96f5-a3690e6c5a1c',
                tenantCode: 's7ku4uacczwupixs1f7pq1ta2ajpslnd2s9jfr6o9zvxrs5ukqj',
                name: 'd6rhwtlyy6d6em2q1e92fg8s1dcapveuvlkozz4m5oc89xu3fwh0eh4sa7hrpt3fq167wot4382rxyznrb0auk4ct1oomhptpcai7itzg07gijcmll29ed8eps9u64s4xejdtis5vp13dk6z7rbxl40hu8pa3e2aq10j93jf91ybrie9hc0w4hbrorsh3ya55y5yob44v6fdq9ifco1ugippjiduemeifyc9jbkkf9v36ek25mymt7vx0s8g1gb',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST cci/role - Got 400 Conflict, RoleName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/role')
            .set('Accept', 'application/json')
            .send({
                id: '38da671c-3180-4a1c-a145-f0575c7fd4dc',
                tenantId: '78e68571-f490-49e9-96f5-a3690e6c5a1c',
                tenantCode: '6jc2i6qw0lmm4s0is0duin8o8576gtmntbyrai2t8ubfh8v7z4',
                name: 'ki8p6apvu7135axkk5hahppycrylu05dmpzxn97hafji4ihcaq27e54l7qu2effg6g7xxxvyipi4krd8hpzruq93nzh9a1hem3p2mi8zyp8m2kcmhsmx2wfq2okjmgcu94qlti1eti9lnrn3mfksjfdcb3i0bvulub3a41crpshfzpo6h7w1tcl3x9xpfoduhtoz0c8cf0nsklhcuxxjbu9ys7njrm2alejp9pwnlslk2rqrmsyfcbizlrgw037y',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleName is too large, has a maximum length of 255');
            });
    });
    

    

    

    

    

    

    

    test(`/REST:POST cci/role`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/role')
            .set('Accept', 'application/json')
            .send({
                id: '38da671c-3180-4a1c-a145-f0575c7fd4dc',
                tenantId: '78e68571-f490-49e9-96f5-a3690e6c5a1c',
                tenantCode: 'iwj1t7z4w6ft82ips8jhsepbwlxyvwz8o5xab68ggqdqv7yrrs',
                name: 'vsvuzcgireb7zrkku6bzsn5aa42sc84svxmukb1m4b0ijki2ck14nb8ynzqpk6ga0kte6ysoltzb17r9lh5c2kq1x84dxfj491o07kjy26rw5gl7rugtwushdmw9ri5evua2k0bwzl1lmgj3kxbj6qiio97arkkkak48t0uipqy6pvbd6xrj6tcrjvtl30ypasy1rxl1bhggz0oqadrpkvjfocrazf41ijcxqsc1l2t335ojzqwy9j0esyqxc07',
            })
            .expect(201);
    });

    test(`/REST:GET cci/roles/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/roles/paginate')
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

    test(`/REST:GET cci/role - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/role')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '5aa15e6b-1ea7-46d9-9a35-ec6b9fc1a693'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET cci/role`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/role')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '38da671c-3180-4a1c-a145-f0575c7fd4dc'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '38da671c-3180-4a1c-a145-f0575c7fd4dc'));
    });

    test(`/REST:GET cci/role/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/role/3d1316e6-f613-48e2-a8df-dfd2bdb6a7a7')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/role/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/role/38da671c-3180-4a1c-a145-f0575c7fd4dc')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '38da671c-3180-4a1c-a145-f0575c7fd4dc'));
    });

    test(`/REST:GET cci/roles`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/roles')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT cci/role - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/role')
            .set('Accept', 'application/json')
            .send({
                
                id: 'c5150987-644a-4ceb-bc64-e6870fabe1f0',
                tenantId: '0aa7c520-446a-4280-af6a-89b6a9749ca4',
                tenantCode: '9gfxl8adrg4sw2ifev6s4ajgc4ywlq495u13x90oi513t3msjt',
                name: '12nx84ptoh36mi4g4nozvnx7cb8ohlxxqixjr35glqnm4igsoohr6ovd54d5a32v9h1z6c6e1a4e2glxcug1z5z3cn633mx4fjveehc2pum682ylov468fhsultyz14grheizdjup85iwyohll8te95ktuc6397g9vowhpsg6g39xc3fa4yf5itccch2ic94knkpvxqlw3c7n1oovvivzirbot06frf1v3kqno5oq1asfmmd3r3bae2tb0k9767',
            })
            .expect(404);
    });

    test(`/REST:PUT cci/role`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/role')
            .set('Accept', 'application/json')
            .send({
                
                id: '38da671c-3180-4a1c-a145-f0575c7fd4dc',
                tenantId: '78e68571-f490-49e9-96f5-a3690e6c5a1c',
                tenantCode: 'e6yf60e28nretjovbx6j8aryohvd1m909v9fdc6q0osowggnbr',
                name: 'ynpyfsaerooepxp75bw0sgi2x6v3n5ktnfdexmt4b32xpgtxav4y84nfo8wbj49b6rtdhdbw713bzc06h6a5lya83ylm8cvbik07x2dh6qbd3bnblb936ufsaap8oara7dhau3kolr7g71khqc3n6gn7n68hw84mkxut2pl6gojh96pnlnkxru6sm2hcezw9boiqqn6ac5cip0jf3w22zkmhq6ctunu9c4hbqgqc73wf6laa6bye74250698odo',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '38da671c-3180-4a1c-a145-f0575c7fd4dc'));
    });

    test(`/REST:DELETE cci/role/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/role/954d8295-759b-4f5e-bd85-a4a1809e4f60')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/role/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/role/38da671c-3180-4a1c-a145-f0575c7fd4dc')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL cciCreateRole - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateRoleInput!)
                    {
                        cciCreateRole (payload:$payload)
                        {   
                            id
                            tenantCode
                            name
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

    test(`/GraphQL cciCreateRole`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateRoleInput!)
                    {
                        cciCreateRole (payload:$payload)
                        {   
                            id
                            tenantCode
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'df479055-3683-45d6-a481-cc2467c9f485',
                        tenantId: '78e68571-f490-49e9-96f5-a3690e6c5a1c',
                        tenantCode: 'w30orp7u1pruthvkxkgtamumiu24g30exiuxfvlpn9fo0zcqxz',
                        name: 'usvbjopwpz1oj8jmffmrjhnkertx5s5oejve4sh9foh43wn81dfol0iodbpkzpiha991anoxfusjbwwucwzt1p2zih1fwx4rs705mvn7vsl6gefn5e6xl57kw04fwrmlsfck6pvrjny36shb8nqko30zneomc0fzyehwqzsoxr50hvwnlniv0aqzl1jow09fgvx1509l6u4hzccx4hydg3ecmg0p0bzstnr03bomm031flsg9eh7ug7v3lcr1vz',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateRole).toHaveProperty('id', 'df479055-3683-45d6-a481-cc2467c9f485');
            });
    });

    test(`/GraphQL cciPaginateRoles`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        cciPaginateRoles (query:$query constraint:$constraint)
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
                expect(res.body.data.cciPaginateRoles.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateRoles.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateRoles.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL cciFindRole - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindRole (query:$query)
                        {   
                            id
                            tenantCode
                            name
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
                            id: '3d2bd9d4-f2bb-4026-9d50-328d1b326e90'
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

    test(`/GraphQL cciFindRole`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindRole (query:$query)
                        {   
                            id
                            tenantCode
                            name
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
                            id: '38da671c-3180-4a1c-a145-f0575c7fd4dc'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindRole.id).toStrictEqual('38da671c-3180-4a1c-a145-f0575c7fd4dc');
            });
    });

    test(`/GraphQL cciFindRoleById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindRoleById (id:$id)
                        {   
                            id
                            tenantCode
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '2cee0ac3-0bc5-48fd-9ab7-553e29b4db9e'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciFindRoleById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindRoleById (id:$id)
                        {   
                            id
                            tenantCode
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '38da671c-3180-4a1c-a145-f0575c7fd4dc'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindRoleById.id).toStrictEqual('38da671c-3180-4a1c-a145-f0575c7fd4dc');
            });
    });

    test(`/GraphQL cciGetRoles`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciGetRoles (query:$query)
                        {   
                            id
                            tenantCode
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.cciGetRoles.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL cciUpdateRole - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateRoleInput!)
                    {
                        cciUpdateRole (payload:$payload)
                        {   
                            id
                            tenantCode
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '23b4400b-4b59-45ee-aacc-c8cff4f70ff2',
                        tenantId: '4c4fe0e8-fa2c-435a-a25f-d2f50ad5937e',
                        tenantCode: 'e7ks654njijoai7h8r0rp9gpuzg7ij4djtkgljoazc0wywuglq',
                        name: 'lnl7z30l877cb1qg46a8twid06rtkohlg96562d3rlm0y4ofqthdhaktjndux18n829vri648aackn1wjmc8dyaw4v39mz0s1zo96o3ih9xg48yxbx3h6n1hghmo01asf4lyxkvj3jn3rxflr875gznea8p1mxwbyzib9djngb7ldvrtsivha6tbd0kds4yp391yxsdsfqsgikrr6ll5kd6fz20mco4lm6frr9uilxo4x6cd70ze853yfffq42y',
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

    test(`/GraphQL cciUpdateRole`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateRoleInput!)
                    {
                        cciUpdateRole (payload:$payload)
                        {   
                            id
                            tenantCode
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '38da671c-3180-4a1c-a145-f0575c7fd4dc',
                        tenantId: '78e68571-f490-49e9-96f5-a3690e6c5a1c',
                        tenantCode: '63gsdgp8ubr53h22iv00q5apn386uvwiktgmnmpmhrj4t3flt1',
                        name: 'jypldutm2bu40w7mcruw9r8kh1vgspc65lufyy9g9q8gksxwb7fmgy9qihvhm3bl58jlxa5tgmyqqawvzp8aet1z3o4m5ry567ha8rdze7c6168cmm24agnms0muskns6v4ob6g0t9mqmkxra75nr58f2moo7g74a1anjlq6lplra965s3kzw035npe7l94s0j45xyyqzvb1p51vu273a5bd6myxkp0a67pn2kq1wyxwwy8h7ndgtp8staqj52q',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateRole.id).toStrictEqual('38da671c-3180-4a1c-a145-f0575c7fd4dc');
            });
    });

    test(`/GraphQL cciDeleteRoleById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteRoleById (id:$id)
                        {   
                            id
                            tenantCode
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'a5d7e800-f6db-4ac8-adae-3d5e2d5e1c55'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciDeleteRoleById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteRoleById (id:$id)
                        {   
                            id
                            tenantCode
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '38da671c-3180-4a1c-a145-f0575c7fd4dc'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteRoleById.id).toStrictEqual('38da671c-3180-4a1c-a145-f0575c7fd4dc');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});