import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IRoleRepository } from '@hades/iam/role/domain/role.repository';
import { MockRoleRepository } from '@hades/iam/role/infrastructure/mock/mock-role.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { IamModule } from './../../../src/apps/iam/iam.module';
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
            .overrideProvider(IRoleRepository)
            .useClass(MockRoleRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockRoleRepository>module.get<IRoleRepository>(IRoleRepository);

        await app.init();
    });

    test(`/REST:POST iam/role - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST iam/role - Got 400 Conflict, RoleId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .send({
                id: null,
                name: 'l2g11xc0aga5mk8544gh2x08dtwrgqnj4y003h7jetm5l151j1pjk9e4bivgvnsitxrywkv5qmzl0tgqi6yobnz7aw2p546bxjpmj8wlc0qk0f69pfu21aeyjp2wwydruumnbzhe7pltrken0k9bp3gzcyxyq7uqg0cet7p0ma1g3l3l6zi7kiiku4u4kg2b20oemxnci6bh04g6a90dardt5hxocd5fcnnm5fuywgjawm83oxwwbss8c9vlo9w',
                isMaster: true,
                permissionIds: [],
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleId must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/role - Got 400 Conflict, RoleId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .send({
                
                name: 'ypso48gsbyidv7lwlolbh7b1k908an39wvrx1kex8wojaga9xassk4zlyhxwcmea7xz5a1u3840s8d75e1drblxzlez10nq0om4p0firgais0pjd25upekj4nrbdlus7xvu3imd4t400kzse0f31hqv0klxyirmspuhsmbv3cpfyu0dilo5t8vdi9j6fll5dpjzrjxwk10fhp60kylz4yplokb5ns4a0ocpkv97v9nsd94492q6q1aj13kxsl7d',
                isMaster: false,
                permissionIds: [],
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/role - Got 400 Conflict, RoleName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .send({
                id: '79c8f1fe-2221-4950-b189-127c0b47c5ac',
                name: null,
                isMaster: true,
                permissionIds: [],
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleName must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/role - Got 400 Conflict, RoleName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .send({
                id: '79c8f1fe-2221-4950-b189-127c0b47c5ac',
                
                isMaster: true,
                permissionIds: [],
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/role - Got 400 Conflict, RoleIsMaster property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .send({
                id: '79c8f1fe-2221-4950-b189-127c0b47c5ac',
                name: 'yf1u2ju6oozrdb28swn4rg94owt88ptn0v8fp4upjhskr9t8b6k9op3zgltjqx1sx3zl2uht5u1ql3mvvcl8ga1d3q6wfn21i2yu52ym9ljgx75leut8j3xenj190x20qwm1h9j5l5eeswoif6z21k3knovfkoy1ovfl9ocof4lqh4e7en17gc526ntl1bswt5xmcenq1r6kh404qro751hcmbmshs7tbq0zvnx4hfd383sn0wifvbbb5zqx1zm',
                isMaster: null,
                permissionIds: [],
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleIsMaster must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/role - Got 400 Conflict, RoleIsMaster property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .send({
                id: '79c8f1fe-2221-4950-b189-127c0b47c5ac',
                name: 's06deem3guz2vuy8gr3ezt0yov0wupngpj5x4qt99h3b29kxompnboime5qgwzow7yk67dr97svpmkmq8w6clfx633relejq7hah8jahssbw1aa345pmn6t5n1rfll7tyjv7hcx2wg71avlq2bd65h3q1phjz82dcbfg9av27w28fw26galtnnhhas45ohxqvxuwgp21lhsfnfgebhn9qybtp9avqsoy2fovwd9y0gpb2ri2iux17n4lojy6773',
                
                permissionIds: [],
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleIsMaster must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST iam/role - Got 400 Conflict, RoleId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .send({
                id: 'jg6hkf6jubr8rt3jgog18mtpzbpzkix6w6tpe',
                name: 'j5l0muhlcmdjjst5hzr1hortncidx3uqkzy97rpeqzn9jqp05knag3oham4porvc6cus7wkwbezz8wgv3hw97in6hqpgc8oiqs0ylaler01kenfje0pb4epb6uwyukyw0ioyo99q0uq2t2xsrvcbjwk82wm0n3dvc69e2zk1pll07lwu7plmlo6731ytsopqzav6t2jmrskjqzlfmhf8t2kuynuoqt0c4kblsuje5naaw11gkx8qgs34ato83hc',
                isMaster: false,
                permissionIds: [],
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST iam/role - Got 400 Conflict, RoleName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .send({
                id: '79c8f1fe-2221-4950-b189-127c0b47c5ac',
                name: '2e4lejb5e3nqeqyck6pigfzm4k9dh5bukfi2g11l3mv29ncr9ieifob9ii28jb4sypz7jmedjuxecjwk2pnh97yffy7114r185b4ydho3tl4hts0ryx0fve2s542epqn1vg3zessjqlecazhz6clxjjuiqw1n1alnhrep2mlhcw5uz764fni3ekxqqh73larfx7ocfrqdgv03f6g2l4uuff9zzgfbyjoo41mev3n1yevu157z0juhiescff77ntu',
                isMaster: false,
                permissionIds: [],
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleName is too large, has a maximum length of 255');
            });
    });
    

    

    

    

    
    test(`/REST:POST iam/role - Got 400 Conflict, RoleIsMaster has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .send({
                id: '79c8f1fe-2221-4950-b189-127c0b47c5ac',
                name: '7o4z8sqpuyq2pku68uzir17wn3ewbqj7s796b941joj4ybco4fvvh35mx5bz3i0t2143l8ecillbmom6ejvzrgyi682gqn47ykavjuci862y69j6rk09joz3l8ikyn6urpjagav1k9w1g296l6fp0sg4wksoh7ycxn1t899dtkn98smogqk7pyvgvps945b2jzuk84o0xehq03vimww325vpwpozkv57dtone8fu0p3ugntg7u5b91upkq3dzjm',
                isMaster: 'true',
                permissionIds: [],
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleIsMaster has to be a boolean value');
            });
    });
    

    

    

    test(`/REST:POST iam/role`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .send({
                id: '79c8f1fe-2221-4950-b189-127c0b47c5ac',
                name: 'saiaopwzthyc3r8u026gn5b5wtywg29w6bb2cbhr2h58r6lazvx56l63utpl795dyprh9y3qbr7dn3onaumvcq1lj487gt1qne0rdqmachhpazfnq0bp09vkcyzoc57fj7u2zzkh1046zk7ggdr8ksby37ac2aj1mog30c5fbhht9z308uxbz26pha0z0uszll3g37zgw3ekr93c1fgm9oys75js8xrz2axpdpsilfueleqgrusqlfjmja15o3s',
                isMaster: true,
                permissionIds: [],
                accountIds: [],
            })
            .expect(201);
    });

    test(`/REST:GET iam/roles/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/roles/paginate')
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

    test(`/REST:GET iam/role - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/role')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '95cc3132-5f49-4a0e-9901-94cb7d7c8389'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET iam/role`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/role')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '79c8f1fe-2221-4950-b189-127c0b47c5ac'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '79c8f1fe-2221-4950-b189-127c0b47c5ac'));
    });

    test(`/REST:GET iam/role/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/role/fda487f0-a704-464a-826a-e4799a33f1a0')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET iam/role/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/role/79c8f1fe-2221-4950-b189-127c0b47c5ac')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '79c8f1fe-2221-4950-b189-127c0b47c5ac'));
    });

    test(`/REST:GET iam/roles`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/roles')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT iam/role - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/iam/role')
            .set('Accept', 'application/json')
            .send({
                
                id: '1423a7ee-382e-4e06-b387-fadf6149ced0',
                name: '0m07wa1hawr0xc49wcs0zcrydbc6zfx5m386xnmbbbyk806p8v83qbz2b3z30wn1dxgc9wyok4ru7ggs1ivwme7qt2bb1ym7s5hpddmajhp02d7bhxfnkbqhsp33sh1gttpdx5ovgi1mslkxcucz5x7f8m5x707fqpw47rfxm3yu60a1farh7ohn9vz6bgrsakt6pdgzi70lnjzjsi0bfe4vgczrhe991qaqx3f9kbbyt5l0ir7s1ieh5f5mp2f',
                isMaster: false,
                permissionIds: [],
                accountIds: [],
            })
            .expect(404);
    });

    test(`/REST:PUT iam/role`, () => 
    {
        return request(app.getHttpServer())
            .put('/iam/role')
            .set('Accept', 'application/json')
            .send({
                
                id: '79c8f1fe-2221-4950-b189-127c0b47c5ac',
                name: 'upgzisfw5hbwwmk1jtw1ijbenvfma3x5uxuvngpy9j8toaf7bnaluabfiquds4tg0h5a7x8nnef4pc8lmsz78g0g3f1jquapr6j20achcfrccajjq4h0s5dscrbhm8qd32ng67u1l6522encq1cvzw5wq6tmtxtzam7eye1mtwqhy9wciwqd9azdhixifw30zfpnj4oo47mgrkjzrlk03za5yorc65i3e40yf4wizga19ij9h6dxercqmh0pve0',
                isMaster: false,
                permissionIds: [],
                accountIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '79c8f1fe-2221-4950-b189-127c0b47c5ac'));
    });

    test(`/REST:DELETE iam/role/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/role/3c67ef46-bfd3-4646-a011-3f386eb54b26')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE iam/role/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/role/79c8f1fe-2221-4950-b189-127c0b47c5ac')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL iamCreateRole - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamCreateRoleInput!)
                    {
                        iamCreateRole (payload:$payload)
                        {   
                            id
                            name
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

    test(`/GraphQL iamCreateRole`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamCreateRoleInput!)
                    {
                        iamCreateRole (payload:$payload)
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
                        id: '128ac768-3631-445f-bcca-85b5d7627036',
                        name: 'nzfyumx7iqxjmuapkqim0y8v7mxfyghie0ui33doc2aat2isfwi1lquf7dzdgklmn4c538by4fa5eu0q9wk43benm68gc7nhg6afp9psv1gwuw0bnmxyhuyh466l8mew47c829rgs9bfnqx5pn5m8ttm00u0z5c5oa6jqpnn9mnax4oj55jpe59iv9rzfjli9evf20wi06yuz5w7tfdke7upcujob7m0egvq3v7qu096hr5fvavyqa24ezfkyrw',
                        isMaster: true,
                        permissionIds: [],
                        accountIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreateRole).toHaveProperty('id', '128ac768-3631-445f-bcca-85b5d7627036');
            });
    });

    test(`/GraphQL iamPaginateRoles`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        iamPaginateRoles (query:$query constraint:$constraint)
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
                expect(res.body.data.iamPaginateRoles.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginateRoles.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginateRoles.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL iamFindRole - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindRole (query:$query)
                        {   
                            id
                            name
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
                            id: 'beb12b1c-8c73-4ae5-9af5-caf1f318966a'
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

    test(`/GraphQL iamFindRole`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindRole (query:$query)
                        {   
                            id
                            name
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
                            id: '79c8f1fe-2221-4950-b189-127c0b47c5ac'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindRole.id).toStrictEqual('79c8f1fe-2221-4950-b189-127c0b47c5ac');
            });
    });

    test(`/GraphQL iamFindRoleById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        iamFindRoleById (id:$id)
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
                    id: '3db954c9-64c4-43a3-a75d-78a6c26c6ff9'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamFindRoleById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        iamFindRoleById (id:$id)
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
                    id: '79c8f1fe-2221-4950-b189-127c0b47c5ac'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindRoleById.id).toStrictEqual('79c8f1fe-2221-4950-b189-127c0b47c5ac');
            });
    });

    test(`/GraphQL iamGetRoles`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamGetRoles (query:$query)
                        {   
                            id
                            name
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
                for (const [index, value] of res.body.data.iamGetRoles.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL iamUpdateRole - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamUpdateRoleInput!)
                    {
                        iamUpdateRole (payload:$payload)
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
                        
                        id: '4a3d79fd-ed14-41bf-a607-6152e4f4648d',
                        name: '0s07xobf1hdvj8jzsjaikizggpz1zig64b75s0sfveza2t4dir7ny4mqpqzxvw7jfrc08cc5u0we1rfw33ws04fm6b2vsniuf6e7vomlvlipkef1wz6kmdj7ia4xsngefxtcue6qtt4qjbkta6izqn9xn7kmd0qn84rlvhgzriddlq22lu4988z9vyx3v1xld29ksxb282h8vcuzpotxhb78x0ockwwo2x9v8hg4ugrrkhvu10ywdxdp96cv0q4',
                        isMaster: false,
                        permissionIds: [],
                        accountIds: [],
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

    test(`/GraphQL iamUpdateRole`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamUpdateRoleInput!)
                    {
                        iamUpdateRole (payload:$payload)
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
                        
                        id: '79c8f1fe-2221-4950-b189-127c0b47c5ac',
                        name: 'c7fur5pc1ty969cns2ikam46nxuc7254debcjw6mo2t4i7tsyugkdk2hgoidei47c8414rxisqr97u9zuwdd9c4mfzgl2uqtep8dsjc3idutpcad5fuime6yc0l96xz0mtcbdmlzb0cn08s3iebecxkd77kx7a98o27h0z992h9m3y2mskvpe2w0g0nycd7v1ywabwdy1teicxxb9l7cpzcj6me3nyj2mfu9y5lix3pfc8xw9bdnuqbt09drvly',
                        isMaster: false,
                        permissionIds: [],
                        accountIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdateRole.id).toStrictEqual('79c8f1fe-2221-4950-b189-127c0b47c5ac');
            });
    });

    test(`/GraphQL iamDeleteRoleById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteRoleById (id:$id)
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
                    id: 'fab045fe-ac68-426b-ba4a-5330df2209f3'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamDeleteRoleById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteRoleById (id:$id)
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
                    id: '79c8f1fe-2221-4950-b189-127c0b47c5ac'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteRoleById.id).toStrictEqual('79c8f1fe-2221-4950-b189-127c0b47c5ac');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});