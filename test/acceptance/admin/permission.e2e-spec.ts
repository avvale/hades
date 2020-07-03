import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IPermissionRepository } from '@hades/admin/permission/domain/permission.repository';
import { MockPermissionRepository } from '@hades/admin/permission/infrastructure/mock/mock-permission.repository';
import { AppModule } from './../../../src/app.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';

describe('permission', () => 
{
    let app: INestApplication;
    let repository: MockPermissionRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    AppModule,
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
            .overrideProvider(IPermissionRepository)
            .useClass(MockPermissionRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockPermissionRepository>module.get<IPermissionRepository>(IPermissionRepository);

        await app.init();
    });

    it(`/REST:POST admin/permission - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    it(`/REST:POST admin/permission - Got 400 Conflict, PermissionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                id: null,
                boundedContextId: '4c99962e-9e84-4d89-bee0-08f27d46035b',
                name: '1tmg4q6sl5fdf0534l9u0vgu1m3acfm00irx5gevve5mn7apnhnfcmxzaignwsww9v5mlj0rtkooaa8cr014ov6wzp9ldw12l9bhiutds2y4fynnk4i37xxc9kwwgciu69fqcux02ifnjh5sm037vokx7rya1bb1let3ro7hlxz7wfnqgdzb4iw1c7djdiv1dp0eis7rxe9jemtf4bv9binr4r9zn3ut4j24jx8v4wqx8cyohr3nbi9lqfvk0ys',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionId must be defined, can not be null');
            });
    });

    it(`/REST:POST admin/permission - Got 400 Conflict, PermissionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                
                boundedContextId: '4c99962e-9e84-4d89-bee0-08f27d46035b',
                name: 'jzxuonp7xy7raav1udlh419vc3neh03j7ygp4dmulxy3m48ov676aflos8780dchnkklo4cbyfe77f7kbnf3w0c5x6kbuvenxopqezem8ttevzcoe0wzm73vu906e4ycqgq6tctvxfdr128phdaed7jmoswbywfkfrqa20a6jml06r7g0a1cujmh8sca8z8qmpkqmr9yquid8v1xkxha2xyfoxw6iuylpqo3fyke00n0opanmeipab8i1v176j7',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST admin/permission - Got 400 Conflict, PermissionBoundedContextId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                id: '747bfcad-c6a3-4118-893e-bfc04c8b5929',
                boundedContextId: null,
                name: 'm4mrrlp6zg017hq7v9o0s5ew6sffkgp3vn6zi9chkczbf5lh4er5y7rm99bc9c47xhdtbfqibxrg5767f9uqt5xu9ptxlav8gvwq70epws0rwbsrb7udxnp2ao71gn1vskn88vmkklnn2o7qi99byrfsj6ci3w9lx810ulxzprtho6hqiqa8apmxyup78ugtzr5n4htgdno89951ezu3j0912rdf4svhiqc51j3v2389j5kxh9hr2imyvg6z4aa',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionBoundedContextId must be defined, can not be null');
            });
    });

    it(`/REST:POST admin/permission - Got 400 Conflict, PermissionBoundedContextId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                id: '747bfcad-c6a3-4118-893e-bfc04c8b5929',
                
                name: 'gply8honadk840mamm73067yv0vqb69jso385yqb04kx46ho7515syy2jwlxh85apqrh3o3j4j7am7fjb5krswt5epppj23km0j1zhvkkwjv5u05fn8rd5cmgw0es2gzukq7k2vsp798izpwhseyczkyospskpnoffzf9codxnol5n8v94dhdovexam9grw20s6b3isoeoyk1nbwmcg5t7pogq7gl65ujk6d62sq9ggrchgc0y04o8zznop4ced',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionBoundedContextId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST admin/permission - Got 400 Conflict, PermissionName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                id: '747bfcad-c6a3-4118-893e-bfc04c8b5929',
                boundedContextId: '4c99962e-9e84-4d89-bee0-08f27d46035b',
                name: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionName must be defined, can not be null');
            });
    });

    it(`/REST:POST admin/permission - Got 400 Conflict, PermissionName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                id: '747bfcad-c6a3-4118-893e-bfc04c8b5929',
                boundedContextId: '4c99962e-9e84-4d89-bee0-08f27d46035b',
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionName must be defined, can not be undefined');
            });
    });
    

    
    it(`/REST:POST admin/permission - Got 400 Conflict, PermissionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                id: 'lthbfrnm2vj9c65htzpksa1mpv08c54gv8dg2',
                boundedContextId: '4c99962e-9e84-4d89-bee0-08f27d46035b',
                name: '3kfhx0o3lvj226id49lm5elvu0z2zxuxhwma5clplcyye1pxag1jl26y9sp9ww5q3vtkzp3rs32qdb8u1ewgjvxoooekiy3psw7shbzvvce8fl14gabn29s4dizz2pewb7a2etewehvwth1763g0l4qbo2pwumc6c8xk7un3yv29c014vfpkutnlm50j83qo0rafxwyc1fv8sz4qdz4wezw08l0i07mjampt1z3epmngjd94sdtmatqdivpp6q1',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST admin/permission - Got 400 Conflict, PermissionBoundedContextId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                id: '747bfcad-c6a3-4118-893e-bfc04c8b5929',
                boundedContextId: '3stjrsc17d8juvn2aosm543zehv4cvinog0wo',
                name: 'judg5g1bwdzhosif6lrojix10b87499viebsofsscfh48m1jlkt7rhxn9mdkt9h94gog3gp3wclm5dojer11pb4jagmozj5v7szsdga3adqcn3oesjmnimo7wzqad31pk6tm5akz296hdzdw46davu47k5pkswo4c6e1ibhwh9h69v8gdult15mzax7au3ui3uwivp7sdbhojpcuw9ya6uwg0p2iyiz2y0errd2txcsocl2t3opfjnt91zbbur8',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionBoundedContextId is not allowed, must be a length of 36');
            });
    });
    

    
    it(`/REST:POST admin/permission - Got 400 Conflict, PermissionName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                id: '747bfcad-c6a3-4118-893e-bfc04c8b5929',
                boundedContextId: '4c99962e-9e84-4d89-bee0-08f27d46035b',
                name: '3eoevjja2gze0ghqxk8s9m085mgi0xy1c0ynn5wny2bwruu09ywshyfzk0nrwqds9ylzhz9693bw6kf7p28x5ojyith3fk6oxmgz93h9q23x6mqeq026ami81wpbkbu3rx7s999a7xum1c675g50r9h0h1ssy5n68eemb0epa7p0irvsadktqxobxr331qe18o9x7jd7wmgcwjefon7xz93dwuikg9fdvvqbq9qvbgi1ncjuhpg8zni44qtutvey',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionName is too large, has a maximum length of 255');
            });
    });
    

    

    

    

    

    

    it(`/REST:POST admin/permission`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                id: '747bfcad-c6a3-4118-893e-bfc04c8b5929',
                boundedContextId: '4c99962e-9e84-4d89-bee0-08f27d46035b',
                name: '7p3zu06be67ojop7928u8vqh4b3zhqd5kf4rlvz1e7s1krk0hwwyqc5moqtupt8buwstb30n9wxwnz57l03xaonfk91xvl198pfkitbflcn8ojp9znq91v5wxl88rsfd8exxcmudm6iagy6mla068f588jewpiee008fbar1bnchfrogshbrstj3ygjtthp3enz5mbiesw6cln7aspw8euwcy4rymgmo6psup2pxiyb9ax1xl0p058gh7sq3kcs',
            })
            .expect(201);
    });

    it(`/REST:GET admin/permissions/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/permissions/paginate')
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

    it(`/REST:GET admin/permission - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/permission')
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

    it(`/REST:GET admin/permission`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '747bfcad-c6a3-4118-893e-bfc04c8b5929'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '747bfcad-c6a3-4118-893e-bfc04c8b5929'));
    });

    it(`/REST:GET admin/permission/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/permission/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:GET admin/permission/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/permission/747bfcad-c6a3-4118-893e-bfc04c8b5929')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '747bfcad-c6a3-4118-893e-bfc04c8b5929'));
    });

    it(`/REST:GET admin/permissions`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/permissions')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    it(`/REST:PUT admin/permission - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                
                id: '0d75c97d-d928-46e7-ba25-1628658fd18b',
                boundedContextId: 'cca40d5a-f3b0-4d63-987e-3f27c741dedb',
                name: 'b6whb1b4a7yas3f9qspvgswnkdff1yk9wyheqvuivky84koj3zf5xo9l4frlnpbqkn7cjmmfrd7xj4b3fzpi5cx7ofr0z3tokkiqp2dkvqajbuz60xadn3pz4g1tly6rrf5qh6vqdida96lso0o1y36budtj0g8cpay7na0d041p8e1xgjw1i2rvmv2f8tqeg77zgw8t5f7771jux8lycv2h9g7uggz60yqj5u7s6v3d9ntj52w9vy4k70a2pj4',
            })
            .expect(404);
    });

    it(`/REST:PUT admin/permission`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                
                id: '747bfcad-c6a3-4118-893e-bfc04c8b5929',
                boundedContextId: '4c99962e-9e84-4d89-bee0-08f27d46035b',
                name: 'e6tv27wguq3auajrfqoozeninhyrr9mivc203mt7x7p83gdazmyt1ksuzvjnfqj3o1gp5tqhxk59crs2qq3lnh5qvj5zxkmm709ykhvv8h7l0pm24u1hzge60xk4ioebelpc7mlktv5g2w137y6rcd2vvn8pvbxwnyn0w20f563by1m7va37e83npvlftkgx6zh70a823accru3rtpmrfr50pgld9x0moq47y4n1ihlyg1fk5mperv7uge6outp',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '747bfcad-c6a3-4118-893e-bfc04c8b5929'));
    });

    it(`/REST:DELETE admin/permission/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/permission/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:DELETE admin/permission/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/permission/747bfcad-c6a3-4118-893e-bfc04c8b5929')
            .set('Accept', 'application/json')
            .expect(200);
    });

    it(`/GraphQL adminCreatePermission - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreatePermissionInput!)
                    {
                        adminCreatePermission (payload:$payload)
                        {   
                            id
                            boundedContextId
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

    it(`/GraphQL adminCreatePermission`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreatePermissionInput!)
                    {
                        adminCreatePermission (payload:$payload)
                        {   
                            id
                            boundedContextId
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '1ddd1887-65a7-427f-aa34-beacd0510dd7',
                        boundedContextId: '4c99962e-9e84-4d89-bee0-08f27d46035b',
                        name: 'hro1ytjfylm14qyx1sqt4t1uc1inqqthsumjog9unezu1ro5scy0k287j288l0255yu6ijn597gndw4hj6az4jjh50zo7wiv1g6dkrvo58b062yw7mo7dab6h6uqhg76kj8j59hxjt19xk6yqeg6fkhop64wy92khkqj7bju4iikmg3w5cxv2fuo7biepfpgrqc2mgnpxlp8elxbtoqjtlzkaskn8ypgu4u5ft98miqg9uu1mx3fhbcfbg2pt8n',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreatePermission).toHaveProperty('id', '1ddd1887-65a7-427f-aa34-beacd0510dd7');
            });
    });

    it(`/GraphQL adminPaginatePermissions`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        adminPaginatePermissions (query:$query constraint:$constraint)
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
                expect(res.body.data.adminPaginatePermissions.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginatePermissions.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginatePermissions.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    it(`/GraphQL adminFindPermission - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        adminFindPermission (query:$query)
                        {   
                            id
                            boundedContextId
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

    it(`/GraphQL adminFindPermission`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        adminFindPermission (query:$query)
                        {   
                            id
                            boundedContextId
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
                            value   : '747bfcad-c6a3-4118-893e-bfc04c8b5929'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindPermission.id).toStrictEqual('747bfcad-c6a3-4118-893e-bfc04c8b5929');
            });
    });

    it(`/GraphQL adminFindPermissionById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindPermissionById (id:$id)
                        {   
                            id
                            boundedContextId
                            name
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

    it(`/GraphQL adminFindPermissionById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindPermissionById (id:$id)
                        {   
                            id
                            boundedContextId
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '747bfcad-c6a3-4118-893e-bfc04c8b5929'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindPermissionById.id).toStrictEqual('747bfcad-c6a3-4118-893e-bfc04c8b5929');
            });
    });

    it(`/GraphQL adminGetPermissions`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        adminGetPermissions (query:$query)
                        {   
                            id
                            boundedContextId
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
                for (const [index, value] of res.body.data.adminGetPermissions.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    it(`/GraphQL adminUpdatePermission - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdatePermissionInput!)
                    {
                        adminUpdatePermission (payload:$payload)
                        {   
                            id
                            boundedContextId
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '847f91eb-427c-4bef-a0fa-cd3f9462408d',
                        boundedContextId: 'b8bead3a-ae76-4ede-b6f9-a244dcce2e7e',
                        name: 'bbauk4797590uh5fv8qdcaos27pd5y9l4u9xmlq3ic8flizjmhbtejbbbyyrtfrip8mvygl7hn4vboa8kw5y66p5m61is4wkqa7afaxdnrmf2ply1ex00ohs1w7vnqvneptecca12eh0ktjcmdlo7r4wcbhsimehb7uu6jj4aa1dfsu3aeobebxut5b89gn9u3z0w0ivorcqw72alx6doln3m30qfchzqwpgkmpdtnvqic5muk4q7xuffksxcjh',
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

    it(`/GraphQL adminUpdatePermission`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdatePermissionInput!)
                    {
                        adminUpdatePermission (payload:$payload)
                        {   
                            id
                            boundedContextId
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '747bfcad-c6a3-4118-893e-bfc04c8b5929',
                        boundedContextId: '4c99962e-9e84-4d89-bee0-08f27d46035b',
                        name: 'xrmn682v22k94tnos3ainqyqtpg7t8pimdjkakbotmw6m0x3gmo52pnoc9juxdvhsnrnw097ij3gcjn2un3jlc5nulfm9xa8ith2z7zwrd63ionsp3f1czsmbd7ghfbyjd1dtk94v7l6a6jh7vbrsklz58an6z7p3id9pejm5lyx4x23lt77oce01nt7cxyty91diumy4fplagdgsswf6xzvxgx0rf7gq2j9l73ruq6dg6mayzp3nb3eiwbudff',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdatePermission.id).toStrictEqual('747bfcad-c6a3-4118-893e-bfc04c8b5929');
            });
    });

    it(`/GraphQL adminDeletePermissionById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeletePermissionById (id:$id)
                        {   
                            id
                            boundedContextId
                            name
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

    it(`/GraphQL adminDeletePermissionById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeletePermissionById (id:$id)
                        {   
                            id
                            boundedContextId
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '747bfcad-c6a3-4118-893e-bfc04c8b5929'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeletePermissionById.id).toStrictEqual('747bfcad-c6a3-4118-893e-bfc04c8b5929');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});