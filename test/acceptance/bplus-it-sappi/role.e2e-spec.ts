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
                tenantId: '58a8a3fd-0d64-4d0c-9afd-d87ee3374bbc',
                tenantCode: '7x8klwqwrpn79n726gwfxs5y2fai80ho7maytcka6cwgvju8fy',
                name: '9ofg86lybu8ena0xa0z91deh2az4f54zm0ner1mjy7v0caq4drd2ibvt8xf6kl10w1yjs6fskrounjg0e9g9xcz562szw7gg818zp38xkohwbfvpwp9wu8pmedjx4mdaau0qg8dntn2t1qn12tkcy19ko69ajoq7o0bx2fpvb8pt9gar4sjq8de37pw55oz0zi1fthtap6z8eaz1vri6vioz0gyf9791x2xz1qnif168k1lf79rmgttgzb10p0p',
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
                
                tenantId: '58a8a3fd-0d64-4d0c-9afd-d87ee3374bbc',
                tenantCode: 'sl2vf28mlsttyw75khspkxdp6krjxvr3bicjsw09mwaoxpoog9',
                name: 'tsqwgba7jmu5bwyel3fr10frk9cpm79ewmn40c72rua78km2hqiihdn2c4yu2khkoycxwp9wlj7y9p78ti5goom73wr24vo5nxagji4e531krrxvjhiqwiwkpry9pdk2bjsczpgkq395kbijfmb7jvjabtmbll6gl3h7ssylh9hm2fo9lsm35a8o9x9bbuvel5rfps9aoz9ojlg37waphx3s7l30fkrkkekl9vfibmtuzost4q2qa5r9vj462es',
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
                id: 'f6261375-4e4f-4d23-863c-31d056d49303',
                tenantId: null,
                tenantCode: '86ibho0ard2brinc2c8pi4w5wz3txja0kqkk6wmq3t00a7d7gb',
                name: 'cuq6tti67yifml2w6jvcnjt2jr2mrqy95fvuegy5sucdan98crngno0w7rcm0ejb0emg0n1qmfbl0mdziqsyhkj9c4o1isg5obbue8x1lohi898gpv73oad9lt9x5z959o4qt8kcm6d4nwuiezt3w97feiy1q48jzrlq736q4r4fw7w6g6da6zv8rvdo7pd892ql1nvkj218u444c3vm56hsadbwo0ctf0cs37qbj8p0unlbmkg8yvz2nxzvfif',
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
                id: 'f6261375-4e4f-4d23-863c-31d056d49303',
                
                tenantCode: 'cjbuwaupnqug5v9lqmsocol6nbzo5jxfh4svwazagww5qfasme',
                name: 'gpkvkrbavw192mmje4up35ib0dtnpk7dajvj9kqy22tf82bt4nw80zfc9u3p9gw79j7maqqcse0djw4uwmmne87zhea8uxluyt8loq8d5hh3eom1jr793w66jner8yvbqhpil90zfkm0hzl94sd7blatcszvh6g1y8lev4j9uqn057ya8yf10i4oigwuf245aos105ikc0kouk4ce2tm9mwxw0796t8w1ew8425zzfzpj6o8q4yciqlp3gpd29m',
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
                id: 'f6261375-4e4f-4d23-863c-31d056d49303',
                tenantId: '58a8a3fd-0d64-4d0c-9afd-d87ee3374bbc',
                tenantCode: null,
                name: 'yibt5pcoxt77u6pefmm7fule0cigdtdbw7vm9bdwf92phyc27vag2edhibo6tiq7xrz7gghvsj0cl0qr424zqzops8cfj9qo2ibyz03bo5k1ripaicsbn59w837rqalq3pubaohis36lkx9ejhhrczxs7790uo0p5e82kspuykz6bgyx2zoopmpb4iaoiyirh830ta4sfjxw0o85v5xk1y00v8tthdn7esplycizj5wnxbdmcqqrwn76yd4vfax',
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
                id: 'f6261375-4e4f-4d23-863c-31d056d49303',
                tenantId: '58a8a3fd-0d64-4d0c-9afd-d87ee3374bbc',
                
                name: 'jd66ijmo9uesm4q6sn982jlvr74wzqlc7eqev61ajezl786wy94mfhn1e0orkukcc6pokxkguflxvruekg01ojg84lp5v2dztu3rzhcfmj23sgottss5uzxyeei4ssbuaupmueymlj3o1uyqygcby5zhls6pthjsw8c5opw6a7dzihn7av78kwd05fsv7m9tw40de0at0m5yexa90k7da1dbujg855n8ovrbzz5l1w7tvuam2f1pmdsueb2ovfo',
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
                id: 'f6261375-4e4f-4d23-863c-31d056d49303',
                tenantId: '58a8a3fd-0d64-4d0c-9afd-d87ee3374bbc',
                tenantCode: 'kcijjthz76q90zjpmou2j1hp6r17txrunq17dnih4wipfviuil',
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
                id: 'f6261375-4e4f-4d23-863c-31d056d49303',
                tenantId: '58a8a3fd-0d64-4d0c-9afd-d87ee3374bbc',
                tenantCode: 'wa8n56zbe7jnfuw5dvkzofpy601p5yb0ivmn4dp6dve598xbip',
                
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
                id: 'uk7wf3jzkrstinx8syfqp27xxpsy24ukfrlqm',
                tenantId: '58a8a3fd-0d64-4d0c-9afd-d87ee3374bbc',
                tenantCode: 'keliay13ybh4w7bgda2py9zdbdeo32n0900y3na3nk912dtvhw',
                name: 'bxcckc66g2p7fuct11nq152402eegoa66cpm1prjldizmdpw38a15iqfqfh5o5hb263ya6glqazlykourgf2wy2icbc9wfv67w71pbfnqhoopkij8l2ddbkabwn1xo3wsl0uj25epoe6uig5x1hb0pwzsufsyqbip8qxg9mhmoyyce6d9k9njss6bl5cbf2x2qrdjjql5yli0umukfzmup3jucz9rvfyvcee349e9u76cs95ov2hd5ji4gg2fec',
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
                id: 'f6261375-4e4f-4d23-863c-31d056d49303',
                tenantId: 'm0f1llprkxiqapes0odwaws6tse7nzilbihn0',
                tenantCode: 'ujt509gy2ekhw31j6lvo0s86r2xn4k9yrog83np2kn3k1gtqif',
                name: 'z5vzkzk4w7tgie41bzeiej3k6gghztct07uameijsrwamku40h9mlv47l5mszahr98jtlkzgbzpsi3qyuez5v7n8t7v1g3hd9whbprci0gvrzferjay1o207ovcaq06614ddv0nj1dimntkh76l9zuwfo9ru8ya5djgnejqt7o48y5ng2rg7t36oq0u61w1hv89k2sr21cz4e5xms2o2c1fvqz239jugs0femw1bo7jsgnlfx05cc4zdymoiffs',
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
                id: 'f6261375-4e4f-4d23-863c-31d056d49303',
                tenantId: '58a8a3fd-0d64-4d0c-9afd-d87ee3374bbc',
                tenantCode: 'xxxklmb3fb6qupioxblegvjtaem0mien83kwsgnlrnydyicqd9f',
                name: 'w559r7njbp8kjwzrbw6ym5p410givzgmu59a2j9zp8zpwwilj4dn05g6ioodmm9ulafjrsua71oa4javoonme1olnihjst4mj912ybw3k1k9a6vscl0u5lt1ay8vhdhsjewrzjfhppxxx5gn1ump0fq9r9u5mpauayjgc79msz7z77k2b1elw50kols7ibdb1fzbjo637p416i0gv952io8mkqdcpjc8nwcydia25uixflk482q8ynfo0ninlyz',
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
                id: 'f6261375-4e4f-4d23-863c-31d056d49303',
                tenantId: '58a8a3fd-0d64-4d0c-9afd-d87ee3374bbc',
                tenantCode: 'wdsf84llolfalka5j1wup1xox0kth52dm4rd691p5tzkq37lny',
                name: 'ziukm8p23m0yp5qw6yr7pcyytz0fb9rbe6w83sflo7wt1oy1i4mxcwk3bybfw1i0yxj0s45h3ihkgkllbhbaf30fl4kyay6ppfas1bm20wmeyfilbep8xrmgbax4adp6x52vzy49ji7kt22vi9e3gr3s2qikrn63424gdkken89dl6byx9hjaotss14ye2r2a9ofllcotpu6g00qapiqv8eabovj4ylfv7zhwso9ynmnahob26cgilm29xwbc25t',
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
                id: 'f6261375-4e4f-4d23-863c-31d056d49303',
                tenantId: '58a8a3fd-0d64-4d0c-9afd-d87ee3374bbc',
                tenantCode: 'y3wdwgblynuhqp5h0qmhxa27l7amtvc2hogel4mth7o495rz04',
                name: 'llf0bqqpiufjino9pgujv0fgzips1krzlplzw6aupm3b0cie2huyiht633zd5fk870jn6awoajtetcvp490wsslxarq2rqpnytk4mav6ndmdc8us3xtjzbncnar03oxrc8ajoe9ci4z5gm900d5t393y2lri6gr039423qzoqgoc7x4cr5ppd5vh2qq6wyur67p0zmbqualcs7k6esuvufznfarzpmnenf6s8tnqws0yvgzv4omrjnnsriwd13y',
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
                        value   : 'b3621475-acc0-49e0-a0ca-3ec96b39ab5d'
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
                        value   : 'f6261375-4e4f-4d23-863c-31d056d49303'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'f6261375-4e4f-4d23-863c-31d056d49303'));
    });

    test(`/REST:GET bplus-it-sappi/role/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/role/aff33318-0948-46ef-9d34-6768e18575db')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/role/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/role/f6261375-4e4f-4d23-863c-31d056d49303')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'f6261375-4e4f-4d23-863c-31d056d49303'));
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
                
                id: '01d37f8e-2385-44ea-a52e-de98ad6c2954',
                tenantId: '27a615c7-f54a-48c9-8dee-9601d6613e24',
                tenantCode: 'i4v11osari4ej36o97s0z98ltronagx2jsywrjfc5mxlna8mn0',
                name: 'lmkuut44w7ct453mndl561gmg3j4udjxmvtt4vpgrojfxxky70zapfmdi3c1pbh8gfwsw4u54kah0kwuvxci5r2n5l81mlfaglto59y9x636iuwhbkjaeft95heclouuc53wca1vtawn4lo0c39ay0u5p1ts359m3blou9zclm4ifo76bpk05etc6o3zp3du2ena71j3jhwzp1e28is2ipf38b3kdnzmt1hzjb80tjyv6o59lh11n72v6ygp4t3',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/role`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                
                id: 'f6261375-4e4f-4d23-863c-31d056d49303',
                tenantId: '58a8a3fd-0d64-4d0c-9afd-d87ee3374bbc',
                tenantCode: '220kskw3xu74rdk81rrzxu30ycm8bf8pr535pdh30udl7dq0ot',
                name: '83kf43pbponq0bxfzizz34q4pfpgutglmytlke17ptqf9gm5oka67dhpwp17q5dmxp9a3cimefdmt3azipazv92vuhm9v7om3xsrwuyrzetig62rul40o63agq8oej2w0prbod5pbb8n8egw4me0rifwshc45vdgxqfmrtx3cl0ufgk1xldjyt8jkinmc7kkcz6rm2ycwxczr1ppg5sdbu84kcwrbzsu8nvl3i7jlhoj4uk13qcfajkzuruxtzy',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'f6261375-4e4f-4d23-863c-31d056d49303'));
    });

    test(`/REST:DELETE bplus-it-sappi/role/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/role/dec1db61-ec9f-4808-89c4-9fe66de6259b')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/role/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/role/f6261375-4e4f-4d23-863c-31d056d49303')
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
                        id: 'f7eda269-9190-4be8-856e-b82e739d71d5',
                        tenantId: '58a8a3fd-0d64-4d0c-9afd-d87ee3374bbc',
                        tenantCode: 'efk981hiqhmkp2umi2qg624jd2r4ollhjy8mfcprn8u8h4wda4',
                        name: 'efoa99eyspcnz36o17v6bvdwn1jmau78qo755t6evlk1kczhajvbjxapjjz89fwz7fckg0406r1h1z0rrmeiae77905jcu3wjh3lzrwsreoftjuof88cluplf3wqpeie8maexuq597uckx531qk1wb6yancjd59axpzdvps3p5emji2hwkrmhlwsjfqz8hnx90zuu3tadol9460iz9w0ftcigsg6iwm306oliq075gp157032c999e0sjdsbcrd',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateRole).toHaveProperty('id', 'f7eda269-9190-4be8-856e-b82e739d71d5');
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
                            value   : 'ce378d84-394c-406f-836e-34f4b018daf7'
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
                            value   : 'f6261375-4e4f-4d23-863c-31d056d49303'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindRole.id).toStrictEqual('f6261375-4e4f-4d23-863c-31d056d49303');
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
                    id: '4cbba7dd-69f3-4b1e-af21-5270af26a21d'
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
                    id: 'f6261375-4e4f-4d23-863c-31d056d49303'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindRoleById.id).toStrictEqual('f6261375-4e4f-4d23-863c-31d056d49303');
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
                        
                        id: '3c3e942e-1e11-404e-96cf-07bd5650efa1',
                        tenantId: '9e736bd6-eb54-4ab6-ae8e-72cb809d870a',
                        tenantCode: 'zz8tcofdycr38zk11minepr49q2lffuulmpda6b400lxy00gds',
                        name: 'kykdpom59mjf2hssoqx58q1xq6oany9rne7eutjg636tqgly5vdy2xk1nhxgmnbpfkb6luy42vl69m3yte3kxskhasz4sh9oq1clfmhv7h6b3pbtx560sn2m42ojcoglkp24xdktb2icg35k5pll99zh7w1jdg9ixvrate822rqqs5o3vu6h7cl1h1r0vvmflxvofrks80s32xmnpw7fvuwp007gy27r2vxboasxnse43fuilr8qlm9hi2pjnow',
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
                        
                        id: 'f6261375-4e4f-4d23-863c-31d056d49303',
                        tenantId: '58a8a3fd-0d64-4d0c-9afd-d87ee3374bbc',
                        tenantCode: 'ny1xklg86iqwsgwql85szclz3330u9eqy421mqrqeeynhdx9fk',
                        name: 'hrhs47ra7tdtt3uk0b4267y20gddttl1gshlpdt8997hcahl296dll8qrfudln0lscdp7ryij58hby0tpxd08xakvv1mxns53zupunkplwdv011ikydas20ojt2g4mcnf1vg392z2dbc3craoejnchb4nqbxbc8rneqr7ifwvlaa8v4g46vzeuj3l66110cvng8mix7gx3bzh3dr72ufy0m05xiqrtvuss3x3vjav3mpmbdp6vh44qhnoobyskk',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateRole.id).toStrictEqual('f6261375-4e4f-4d23-863c-31d056d49303');
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
                    id: 'ebbd8c03-aab7-432f-8d15-267f6ff6524b'
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
                    id: 'f6261375-4e4f-4d23-863c-31d056d49303'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteRoleById.id).toStrictEqual('f6261375-4e4f-4d23-863c-31d056d49303');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});