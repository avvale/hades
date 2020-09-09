import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IRoleRepository } from '@hades/admin/role/domain/role.repository';
import { MockRoleRepository } from '@hades/admin/role/infrastructure/mock/mock-role.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('role', () => 
{
    let app: INestApplication;
    let repository: MockRoleRepository;
    
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
            .overrideProvider(IRoleRepository)
            .useClass(MockRoleRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockRoleRepository>module.get<IRoleRepository>(IRoleRepository);

        await app.init();
    });

    test(`/REST:POST admin/role - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/role')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST admin/role - Got 400 Conflict, RoleId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/role')
            .set('Accept', 'application/json')
            .send({
                id: null,
                name: '34dq6rtf0rbpmsxgv0t9dzpxd69x96asltskaou7ef8metnbffdfnbetleelr0r946jo5hfe6sc6y0vpxwc7sf0fduh4zgjo7pbwb5hhvkghbdcx7x71xiam13m8ms0epv6umdjc4y30xnwbsxssgl0i6imt2gdooz8s13m0x68dlx6n4m15ond1pfqi21mftm9yol4bnx6xux80v7jyy5uazpkk0o4cwrsg17ghcm3xlxucyw1ik81nbhlqub6',
                isMaster: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/role - Got 400 Conflict, RoleId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/role')
            .set('Accept', 'application/json')
            .send({
                
                name: '9jvicq0wxjep73140qvtyq5wuvzmlkw0n9iq2a44ahez0ytinok74vinidrgclyxqfvl28w9iwtpta7gdjhyhtity5a3ip4nhhxqgtdmw9f695risjvihtho0v2pnmydtl9wxpootzn12tu8ty7m8d9lfd1hn3m8eo8fciz46dc07v2wksjhoyohl2kxm7n6lslz3nfat2cbj77si9h2gksf8mo5byomcrvquf0sru0jehuxk55x1rtlbpcxx2q',
                isMaster: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/role - Got 400 Conflict, RoleName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/role')
            .set('Accept', 'application/json')
            .send({
                id: 'cebc18b9-d3c4-42bb-8df2-3004d5072344',
                name: null,
                isMaster: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleName must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/role - Got 400 Conflict, RoleName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/role')
            .set('Accept', 'application/json')
            .send({
                id: 'cebc18b9-d3c4-42bb-8df2-3004d5072344',
                
                isMaster: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/role - Got 400 Conflict, RoleIsMaster property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/role')
            .set('Accept', 'application/json')
            .send({
                id: 'cebc18b9-d3c4-42bb-8df2-3004d5072344',
                name: 'izmht8rx10p3gd8nszuixz66sijlu8lompr7bhvw7pnp3c49itiot10tmlh6ejvgeyikgjvlwaoq825vdhiwz2wnqkph4h4wok0zif62axyeyoefl4sn1s1xzupp0s6to9k77lc2wnbl5szqgj2rt41cg4352esos8oy69h60gicrlxq9rnmifckba4zu3i0b06jrqwq7tobjl1vliqtxv3ritmi8x9i7yjuzfxkr0wph6wl9p2tktzyo9j7fmg',
                isMaster: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleIsMaster must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/role - Got 400 Conflict, RoleIsMaster property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/role')
            .set('Accept', 'application/json')
            .send({
                id: 'cebc18b9-d3c4-42bb-8df2-3004d5072344',
                name: 'knza4a3bhy7cqafrvw863xeachcz5iilfcj3668r6lhbu40yds9i2yktgzjyqjpjlcytqfnsfbnw52w7s71nfzbkckoext899ad8k7gs8zzycfgn2juzixsgef0d08e9a02hrqb468o5ek1a1ojfgktcv9yf5d0acjxs73aaahwbalxrathu7ch2ep0sae8eb72tsfqqcipbbrgnmb15aegwdlzsymm9r79eqbdw6o77g1zdtirm90qyn8vtzv9',
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleIsMaster must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST admin/role - Got 400 Conflict, RoleId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/role')
            .set('Accept', 'application/json')
            .send({
                id: '74uama6nwnzfr87d4w5ctvgfecfiykaf78hut',
                name: '6xug66clxu4txj8dwzxak9k3y9o6pq41v9oxkqc43xmpl6up8jg8b6u4cdsh7hz2a0nefwp5czav5k9enmz8em23fg8rrcz4en64z331oxcdhcrujbyhxs62f2ixbkfj38bpmqbfefblfu8eaoylrb1hxgigl0iexr8iw709q4es3o62gguwfy8k54ikgb29otxoat8nwyz8ode42g9z8pc49bo2wk4s03zoooe84fdibmh4o76v8e16897wbva',
                isMaster: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST admin/role - Got 400 Conflict, RoleName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/role')
            .set('Accept', 'application/json')
            .send({
                id: 'cebc18b9-d3c4-42bb-8df2-3004d5072344',
                name: 'v446sltfgnw8rofpgbx92nzd9i61e66zq08mdpa7t4bsws9yzjacos8fbtb7nldsjnmalsrr1wm6dsc6vchmcon93tqu61mkuo3to7cjm0gc7f6psmdwyvtmf8f84wnwjc49xk80wmg17huzowul8j5gng56wc0dzbt7kmp4p3wrs3mody3jh04v55i2mgbj3sxrs4dyebltyo7ezrfg817gqtsch8ff8emik8jt0s6phnmbo6q9rhesg4r1kigp',
                isMaster: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleName is too large, has a maximum length of 255');
            });
    });
    

    

    
    
    

    
    test(`/REST:POST admin/role - Got 400 Conflict, RoleIsMaster has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/role')
            .set('Accept', 'application/json')
            .send({
                id: 'cebc18b9-d3c4-42bb-8df2-3004d5072344',
                name: 's6s9jqnw28x9fptxf3aiv0y8zf5epy6csic3ip197vqngv1x24tw1gjnq3acfjcz0odfhz88bijozlf5r72qdqgb32dl9397bvv2lxbpmkls72225tq8sv3gd5qjptlc2wtqt5ojvgpixidncf6statxfb8v5u93zfl4mk16emjdr6myindblbvyb5df71hb0na8ykib6nfpu2sgnq5fxkkbm0q00cxgxz0x9hbgjj88urxe0uv38gro2211yz1',
                isMaster: 'true',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleIsMaster has to be a boolean value');
            });
    });
    

    

    

    test(`/REST:POST admin/role`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/role')
            .set('Accept', 'application/json')
            .send({
                id: 'cebc18b9-d3c4-42bb-8df2-3004d5072344',
                name: '6mihyuw5ywuyh960q91efs34bhm2voglvvm5agy02kz1kyb1otpf4sk44cp2311ddvhe4w45tggxx34mxhpuituns9br63f600dzrk7vr27641ooiuligbevjzi64pw9lh48iwe693f9ispb9d14mquhqrjs2jz7fpw15ntj2qxxo5qscs7ag812z61gc167jkku6zgl0vp6ukj5taqaoxhq4pb8srj2nu0isc1ndlam40qtrg4a6fcekv1qfmt',
                isMaster: true,
            })
            .expect(201);
    });

    test(`/REST:GET admin/roles/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/roles/paginate')
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

    test(`/REST:GET admin/role - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/role')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '6b6937c0-509a-4272-8481-5f33efd0d38a'
                    }
                ]
            })
            .expect(404);
    });

    test(`/REST:GET admin/role`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/role')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : 'cebc18b9-d3c4-42bb-8df2-3004d5072344'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'cebc18b9-d3c4-42bb-8df2-3004d5072344'));
    });

    test(`/REST:GET admin/role/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/role/92a40720-f823-42f6-94a9-7b6058bf82a4')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/role/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/role/cebc18b9-d3c4-42bb-8df2-3004d5072344')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'cebc18b9-d3c4-42bb-8df2-3004d5072344'));
    });

    test(`/REST:GET admin/roles`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/roles')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT admin/role - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/role')
            .set('Accept', 'application/json')
            .send({
                
                id: '359881c7-df09-4692-be4c-9be64476311c',
                name: '4q44dqvo89wexasgsgmwbbdmro6nlysi3f7k5esdttagodm0xvmpmx9awgfzxvzypbv6cg8jd7ief3xp7muvs0cksinzqcjqdmghgcit2j09w3iabwruolke4cdaqpje1fk0gfmd75z0j4cnht3e986n9cdc13p0tc9m9hnitfcus6zu8ot11yrtdl9158f4ku71i0plaulrp4bm0y2oxhccyqmr4w6ximd1ib5tu9a0ta30trusfu648vafsgj',
                isMaster: false,
            })
            .expect(404);
    });

    test(`/REST:PUT admin/role`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/role')
            .set('Accept', 'application/json')
            .send({
                
                id: 'cebc18b9-d3c4-42bb-8df2-3004d5072344',
                name: 'b0s1j0sdjqk7o8jqx82gdusxke28qj513aghqdai19v3gdxskkvdc6ijztwi3c7fr890tkkg254ws07efb161wtuglpour5rjg6ehg156un4upvyifjv2a2kqdgu8kchcsxq5cnlt600v2upfql9d62pfhjbr81dig01wqtoe7yodsiwjeoexhbi2yypwcvvud0feomysqkycu94s0x2g5si0g9x10solnnsm7sycooggwuiqedsn2osatb7hwy',
                isMaster: false,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'cebc18b9-d3c4-42bb-8df2-3004d5072344'));
    });

    test(`/REST:DELETE admin/role/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/role/41e8bd20-20f3-49dc-af4c-401bd0e7a579')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/role/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/role/cebc18b9-d3c4-42bb-8df2-3004d5072344')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL adminCreateRole - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateRoleInput!)
                    {
                        adminCreateRole (payload:$payload)
                        {   
                            id
                            name
                            isMaster
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

    test(`/GraphQL adminCreateRole`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateRoleInput!)
                    {
                        adminCreateRole (payload:$payload)
                        {   
                            id
                            name
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '117eddf7-a0a4-4ada-aab4-6e9c8e055730',
                        name: '9rfz6e40fox23kdg6zrrqiedtlnk0u57nxvsjpm33jgtpyu2zcbx6brueojyfz4b0m13nck3ezlspg0zlc9r7dhtvdjcfa8f0m81ex3mx023ifnvrxvd360i95xbg0lhfw1mz1a1pubx1yxr8s9yy3ezek198tov6bru4jsz2hr5jyr48toguxdsnnlpdsl3sc58lhlo2okalnhsw6fmf4cjow9ina867hbyx64xz335p7hdu9ptdc1hdn83opz',
                        isMaster: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateRole).toHaveProperty('id', '117eddf7-a0a4-4ada-aab4-6e9c8e055730');
            });
    });

    test(`/GraphQL adminPaginateRoles`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        adminPaginateRoles (query:$query constraint:$constraint)
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
                expect(res.body.data.adminPaginateRoles.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateRoles.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateRoles.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL adminFindRole - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        adminFindRole (query:$query)
                        {   
                            id
                            name
                            isMaster
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
                            value   : 'cb0450af-f805-4347-a629-0a0a012ba948'
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

    test(`/GraphQL adminFindRole`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        adminFindRole (query:$query)
                        {   
                            id
                            name
                            isMaster
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
                            value   : 'cebc18b9-d3c4-42bb-8df2-3004d5072344'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindRole.id).toStrictEqual('cebc18b9-d3c4-42bb-8df2-3004d5072344');
            });
    });

    test(`/GraphQL adminFindRoleById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindRoleById (id:$id)
                        {   
                            id
                            name
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '2e656363-8c5b-4ce4-9326-e89491df5433'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminFindRoleById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindRoleById (id:$id)
                        {   
                            id
                            name
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'cebc18b9-d3c4-42bb-8df2-3004d5072344'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindRoleById.id).toStrictEqual('cebc18b9-d3c4-42bb-8df2-3004d5072344');
            });
    });

    test(`/GraphQL adminGetRoles`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        adminGetRoles (query:$query)
                        {   
                            id
                            name
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.adminGetRoles.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL adminUpdateRole - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateRoleInput!)
                    {
                        adminUpdateRole (payload:$payload)
                        {   
                            id
                            name
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '901e1e70-2008-429b-b7fc-b7ae7dd46b20',
                        name: 'wewmg1k8daazrxxz8svrfmk7oy3jn7k9iogj3muhssfv87bpae8jrdz4h6733nq5rki90mb9r9bdtsrsne1hb4hqg85yp24hc60ln9cvfp54kca9o45raaq2nqn2enulxb7yq2fgke1pduljwsy2usvqie0wvlpascp1pvzfdjjocyesq7px2ci08fp45iuf363uq4wtntu810kbxf1qfds1sjm6jpv984ufn6r52h6w487uq5ijzxtjj7ltb7f',
                        isMaster: false,
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

    test(`/GraphQL adminUpdateRole`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateRoleInput!)
                    {
                        adminUpdateRole (payload:$payload)
                        {   
                            id
                            name
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'cebc18b9-d3c4-42bb-8df2-3004d5072344',
                        name: 'k3f2i8efbzwwtng062chwz8i3bko62dilhc12e7gzoya05f1cbkwqkv9bibtmlbi0tvqyn0fifxgu9ykepf0t7a5ivjld431efazo5qk44uz4g7z6vx68xwkvo0yp49yti7ia8sz9n6vyv7pifugac2azmwa0lfnx56lcymadna8nhygpotdltr5bpsfuu9kdpwz1yhhcgngok4kgr4nhkucyt5nnklgh9v4vd2s5j5jqxl65y5tq703pdtmrfy',
                        isMaster: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateRole.id).toStrictEqual('cebc18b9-d3c4-42bb-8df2-3004d5072344');
            });
    });

    test(`/GraphQL adminDeleteRoleById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteRoleById (id:$id)
                        {   
                            id
                            name
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'd6190224-9136-453e-8343-483a1d1edaff'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminDeleteRoleById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteRoleById (id:$id)
                        {   
                            id
                            name
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'cebc18b9-d3c4-42bb-8df2-3004d5072344'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteRoleById.id).toStrictEqual('cebc18b9-d3c4-42bb-8df2-3004d5072344');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});