import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAttachmentFamilyRepository } from '@hades/admin/attachment-family/domain/attachment-family.repository';
import { MockAttachmentFamilyRepository } from '@hades/admin/attachment-family/infrastructure/mock/mock-attachment-family.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('attachment-family', () =>
{
    let app: INestApplication;
    let repository: MockAttachmentFamilyRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    AdminModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
                            models: [],
                        })
                    })
                ]
            })
            .overrideProvider(IAttachmentFamilyRepository)
            .useClass(MockAttachmentFamilyRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockAttachmentFamilyRepository>module.get<IAttachmentFamilyRepository>(IAttachmentFamilyRepository);

        await app.init();
    });

    test(`/REST:POST admin/attachment-family - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: null,
                name: 'yr1dkmxc73rygqijwxwzojc0u6d4dbx4zsy995h936zwaoq1obgxf1k4gqcs4t3p3hjt8vyqtndx2myxfvtj4dpjod9pu94dkdu1d8d02lb31x8hw3xrx6r1y3m0cv784g2ryxdzj6e8m0k7lk8cavs4d4fgdioosv5bu8xtzcpx40a1p19pew37cuzp4hrje10mjzdc77qjl6jgb9rw73kjmbr7nv0r9zk924sngvct73betkxt7v0mx0y3n9m',
                resourceIds: [],
                width: 545699,
                height: 214034,
                fit: 'HEIGHT',
                sizes: { "foo" : "bar" },
                quality: 143,
                format: 'JPG',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                
                name: 'mxmofl9mojqszg0ilny41adi2zomorw2nzysfzngztzp97knjrxx6hcg0vxqu61yfnk4ztpyzqc84y65kxujr3711ga65584g0cfketuf8sc8q1j3l9q2xpz39wleubmhby7hcb2hnirmh8l62vnv7gdkxc7t5icg9c2b8hd9araukjhv3j42qm6e7q7ipf94f4e9f28eo8eiuupnvt135wetxrfdqcblvhk8p8j44opc9yttt58xgt4i2t1yy2',
                resourceIds: [],
                width: 228198,
                height: 865389,
                fit: 'CROP',
                sizes: { "foo" : "bar" },
                quality: 557,
                format: 'PNG',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: '2c0b2bf3-898e-48cc-83f4-4124ae060349',
                name: null,
                resourceIds: [],
                width: 499469,
                height: 741217,
                fit: 'WIDTH',
                sizes: { "foo" : "bar" },
                quality: 882,
                format: 'DATA_URL',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyName must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: '2c0b2bf3-898e-48cc-83f4-4124ae060349',
                
                resourceIds: [],
                width: 836382,
                height: 422303,
                fit: 'FREE_HEIGHT',
                sizes: { "foo" : "bar" },
                quality: 261,
                format: 'GIF',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyName must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: 'qo4na6q04gs3u6tfm46nfg6ih0l0ds47kmosv',
                name: 'vdlwoy30jjr64rolu81185jgifmscio1ldsjm6x1hf1o4ha1tkm1vcrtq718j1584tf9yfqcx3zh24l8cputo4smlely9crnpy30hvpx5563xaba2r0ibp0mof8xer6ib5594nnmxflqy7v1l5pdbn8qy751248u7gdqjzbkvxetwce8mt5trj7wgzd3icx0fpt35sgu839zmz48oretdf2lzqi9hvqs65rr0ihz2uiqfjdtkt0xzvje1ky9gjh',
                resourceIds: [],
                width: 583934,
                height: 264120,
                fit: 'WIDTH',
                sizes: { "foo" : "bar" },
                quality: 933,
                format: 'GIF',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: '2c0b2bf3-898e-48cc-83f4-4124ae060349',
                name: 'ir2e910gdix6v0ed43eb9nr114psylipugymjx5cige2hz3w5y7cxphviahce74qyxiwdwqsntkuctuvgcfxpktrz26rcu74ymexi4blglf10am14405dueowea5eibxldcxxwjnmoxmseoj5dx9gty4mt4npej2nehplgd0ng1cbu2hdzih8ubfhwgz3aup2gwcxpeomyexl1gq0qqbmf40fvdpr7w1sad80d2uo4t2x7l879huof9x1fq3fidk',
                resourceIds: [],
                width: 707371,
                height: 265486,
                fit: 'CROP',
                sizes: { "foo" : "bar" },
                quality: 958,
                format: 'JPG',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyWidth is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: '2c0b2bf3-898e-48cc-83f4-4124ae060349',
                name: 'vyao9ag738crwxho8qn819n86c2ie675k6t8v7wo1qvud3ry211as32nlnmbuu8o62armw90lzkgtlvkao2v8fzn5gc0ek2jeo8vqr5qqyi54p97hom7w9ql7su6xwhhyj2twefo8z46voq6h1frxkfcl39torj5pnzh6bamxddqj389aeuye6luqsuyp06p90eiuziar18jqbbpglbodfa4l5e6ijzw9ums82ddftrkjyy78k3gtc7c0ebtqb1',
                resourceIds: [],
                width: 3276377,
                height: 110030,
                fit: 'CROP',
                sizes: { "foo" : "bar" },
                quality: 387,
                format: 'JPG',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyWidth is too large, has a maximum length of 6');
            });
    });
    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyHeight is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: '2c0b2bf3-898e-48cc-83f4-4124ae060349',
                name: 'vjo6h2y3zym6whtk8i4d382kfdw2iab15hcmmmat89wy0izvmypggemh6dmyn5imlc0ih87dpsdpl63kpvem5jf80esco3pdow1dixeslw32zekmkxepstngeua6tjggm336zoane7z6otcbeq3a8fixaaywd0r4kw7m2jczlu6xti9942zlksqlmbrwdbnxxw65sw81o0l6v1qugopo4617e3ha1kk23aeoc2g3ojb4fvs7fua0lftdbpl4kn4',
                resourceIds: [],
                width: 649175,
                height: 2619557,
                fit: 'HEIGHT',
                sizes: { "foo" : "bar" },
                quality: 703,
                format: 'DATA_URL',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyHeight is too large, has a maximum length of 6');
            });
    });
    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyQuality is too large, has a maximum length of 3`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: '2c0b2bf3-898e-48cc-83f4-4124ae060349',
                name: 'xxdmjh9ug4he1zgh53bavzlnn83cwkbn7140e3htacmlj79jqertwcxd3c3uj4klaogtfdqwvomyl5zwpja7g4xovc03i537rh2kqvvefi2bvgrrwbwkcblssqx2vwn6dpkdecdny9lqlwkpnqdm8r9ewls69yqhnrikla9xdem09d9xw2gtu3savzh0801om1en86l2gszzwgkrpqnlxy1pcfg73w4i6h992nlq28wb4iqor30ljcw8zjp26xr',
                resourceIds: [],
                width: 760357,
                height: 671539,
                fit: 'HEIGHT',
                sizes: { "foo" : "bar" },
                quality: 6523,
                format: 'JPG',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyQuality is too large, has a maximum length of 3');
            });
    });
    

    

    

    

    

    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyFit has to be a enum option of CROP, WIDTH, HEIGHT, FREE_WIDTH, FREE_HEIGHT`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: '2c0b2bf3-898e-48cc-83f4-4124ae060349',
                name: '4d6d7riawha48glvwpcwwblmdxsr9vpx247thda68sfd1882l11cm20gojqm9bxymuifx5ek5zwr15kwhrqsr39ygea5tq04zomf7en9drnvjqesbx8yc6grk360ae1x4bs2mrsfln09w53bqocyumbbafil8v2n7lg1so87dnqdoj1cec6g3d9jmhte56eyr5l68cgsf1vtb0s6m4ib4048gk9rw6uyao2g5jyoclqqueh1zpy691426b7pyji',
                resourceIds: [],
                width: 926075,
                height: 498037,
                fit: 'XXXX',
                sizes: { "foo" : "bar" },
                quality: 159,
                format: 'GIF',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyFit has to be any of this options: CROP, WIDTH, HEIGHT, FREE_WIDTH, FREE_HEIGHT');
            });
    });
    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyFormat has to be a enum option of JPG, PNG, GIF, TIF, BMP, DATA_URL`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: '2c0b2bf3-898e-48cc-83f4-4124ae060349',
                name: 'u59rmgknyttfwwgkuaxkp9cfvhezg0l6mv670us4ct4ppmjfmzjb61yww43gvju43zrqxsyngtn6is8w61r8o8s9gdk6imwxxc3enrzv74btf5ur1ud3opaczpq52ozsg78ec6fi4j0d5pnve3c41c024ww7w2ua5yp2r5ufjo6a8s3gm4l0pxbf0979sjllc7ahuj9uj3n30io1jkndro1l6rpf5gdab5adehxp8h40dgb4o5fzd4g2pwj9obx',
                resourceIds: [],
                width: 474908,
                height: 570313,
                fit: 'FREE_HEIGHT',
                sizes: { "foo" : "bar" },
                quality: 928,
                format: 'XXXX',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyFormat has to be any of this options: JPG, PNG, GIF, TIF, BMP, DATA_URL');
            });
    });
    

    

    test(`/REST:POST admin/attachment-family`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: '2c0b2bf3-898e-48cc-83f4-4124ae060349',
                name: '42jtyh8igkgz73ys89cubw3wpjnuq4k4foxz4q0wh5gd527fil14tlk41r7wn7wf840spry54onlyyfagblq4jb4wnb8zxu50jcystwx6z56smuzje17yn7gcxc5mqvsn3bajdc5h8r2tnc2lcez7426h90iv9n0x7g66m2d505lbd48ftj3bl9a6h2x1b6wnazq997wpj2kokon4rhd16sa8srd2p6tadm9xck1w0j6rsbd57tbq97lzyqt3d2',
                resourceIds: [],
                width: 694396,
                height: 508428,
                fit: 'CROP',
                sizes: { "foo" : "bar" },
                quality: 470,
                format: 'DATA_URL',
            })
            .expect(201);
    });

    test(`/REST:GET admin/attachment-families/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-families/paginate')
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

    test(`/REST:GET admin/attachment-family - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '681d4c28-8d62-4ebc-9be8-06897fdf2d06'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET admin/attachment-family`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '2c0b2bf3-898e-48cc-83f4-4124ae060349'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '2c0b2bf3-898e-48cc-83f4-4124ae060349'));
    });

    test(`/REST:GET admin/attachment-family/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-family/085b95bb-3b64-4f2c-8223-2ff7bf5be449')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/attachment-family/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-family/2c0b2bf3-898e-48cc-83f4-4124ae060349')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '2c0b2bf3-898e-48cc-83f4-4124ae060349'));
    });

    test(`/REST:GET admin/attachment-families`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-families')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT admin/attachment-family - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                
                id: '06a21f45-ae81-4c03-b3d2-622b7932dfc7',
                name: 'odq4yf82p4y5gu00064yf1jv4mwvkjm8oxqii5takp8ll7v13r9y7rhf4970gu974grrdi2gl8u14q1bwucr7o160cfgf0rm8isaydibfce54oeuaq2gkmnhi53rofy0q0318s2svbcn34dewaszwuloivp2ie96m76hakqoo8zo8zd1nnzqs7971mzo3ugxzwe102vjggqypac95nb0dqtxzq09o1s6a05jkfj62rorx8mdxj7s7yqgnd1r1j7',
                resourceIds: [],
                width: 229927,
                height: 491226,
                fit: 'CROP',
                sizes: { "foo" : "bar" },
                quality: 816,
                format: 'GIF',
            })
            .expect(404);
    });

    test(`/REST:PUT admin/attachment-family`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                
                id: '2c0b2bf3-898e-48cc-83f4-4124ae060349',
                name: 'e3jivwx1n2a8oacwgw4nydg7rwceqovb74xszowukue6c4urafajg4uqikev11l1z5ntvwdjlunu9w6v0qbm9gauksehv07pv1uxba16896p6nl8h0pewvuwatmyoksjroowizelpsaag78r7gfscfq8h04lwtsxqjipehvvvm78vuhmhumpzsnusawp851m0anr92hnorpwekodf3vrduifa0xflf94m9cjld05okjbytf7kiu2vomvda9evkt',
                resourceIds: [],
                width: 558047,
                height: 171957,
                fit: 'HEIGHT',
                sizes: { "foo" : "bar" },
                quality: 474,
                format: 'JPG',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '2c0b2bf3-898e-48cc-83f4-4124ae060349'));
    });

    test(`/REST:DELETE admin/attachment-family/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment-family/51943ba7-0ddc-41aa-9d3b-f7dd28311797')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/attachment-family/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment-family/2c0b2bf3-898e-48cc-83f4-4124ae060349')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL adminCreateAttachmentFamily - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateAttachmentFamilyInput!)
                    {
                        adminCreateAttachmentFamily (payload:$payload)
                        {   
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
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

    test(`/GraphQL adminCreateAttachmentFamily`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateAttachmentFamilyInput!)
                    {
                        adminCreateAttachmentFamily (payload:$payload)
                        {   
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'cc2fe9f8-79a0-4f70-93f8-691fe8138223',
                        name: 'ks9w7y5pww9hdjesi7ojt62zbk6umu4f2gqs73kwcd794vprlemyul44qjhsu12ehd6m5l3ilkuhwd1co6nwrza8yd9cdezbm83n9f2naj585gvblv0k8bxu23yflm60un59wel3kd6gn2oqq31n1epovsppvg34kijr4haqm0e0xgl1y1y2i9691xfuubvhz1quod5o6vngj20t8vh1mzlaqtjxqg9j5662oseymnydcl1mujn4y49k3hg6g03',
                        resourceIds: [],
                        width: 873645,
                        height: 315041,
                        fit: 'FREE_HEIGHT',
                        sizes: { "foo" : "bar" },
                        quality: 216,
                        format: 'GIF',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateAttachmentFamily).toHaveProperty('id', 'cc2fe9f8-79a0-4f70-93f8-691fe8138223');
            });
    });

    test(`/GraphQL adminPaginateAttachmentFamilies`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        adminPaginateAttachmentFamilies (query:$query constraint:$constraint)
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
                expect(res.body.data.adminPaginateAttachmentFamilies.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateAttachmentFamilies.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateAttachmentFamilies.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL adminFindAttachmentFamily - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAttachmentFamily (query:$query)
                        {   
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
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
                            id: 'db6db493-c95f-4f25-bbcb-e6fb7d3fdb82'
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

    test(`/GraphQL adminFindAttachmentFamily`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAttachmentFamily (query:$query)
                        {   
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
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
                            id: '2c0b2bf3-898e-48cc-83f4-4124ae060349'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachmentFamily.id).toStrictEqual('2c0b2bf3-898e-48cc-83f4-4124ae060349');
            });
    });

    test(`/GraphQL adminFindAttachmentFamilyById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindAttachmentFamilyById (id:$id)
                        {   
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'd4deb41c-dd91-4ad3-bf3e-60e1de769efc'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminFindAttachmentFamilyById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindAttachmentFamilyById (id:$id)
                        {   
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '2c0b2bf3-898e-48cc-83f4-4124ae060349'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachmentFamilyById.id).toStrictEqual('2c0b2bf3-898e-48cc-83f4-4124ae060349');
            });
    });

    test(`/GraphQL adminGetAttachmentFamilies`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminGetAttachmentFamilies (query:$query)
                        {   
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.adminGetAttachmentFamilies.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL adminUpdateAttachmentFamily - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateAttachmentFamilyInput!)
                    {
                        adminUpdateAttachmentFamily (payload:$payload)
                        {   
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '0c8fc24f-be9e-4a2a-be86-f7a95c4ca142',
                        name: 'plhoawg8jv6ho7r880l101zow3x1fsi1wx9n4vyya4siofsz6mdtlamthmq8c834kiazt1q742cuezgnpoiwg1qxwqa4foyc5vmiv6js5xk9tq7e0btskitva9oj7x6k4tntz92x0qpnhp25fjubi43w5cf4phlrgbkokg1m6xtde2zr94szdgoa21brq9vhhajlfipzjpdo87y3dmygl8okyhbltmz3krmx6ecmri2nhthjb3wgcwv4u23est1',
                        resourceIds: [],
                        width: 743813,
                        height: 440136,
                        fit: 'FREE_WIDTH',
                        sizes: { "foo" : "bar" },
                        quality: 203,
                        format: 'GIF',
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

    test(`/GraphQL adminUpdateAttachmentFamily`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateAttachmentFamilyInput!)
                    {
                        adminUpdateAttachmentFamily (payload:$payload)
                        {   
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '2c0b2bf3-898e-48cc-83f4-4124ae060349',
                        name: 'bx4crfa50d9abi3pt4a4j97oip9yv9c2gw9bw3by4a1x9isrcc53owl3n6swb7qesa9t43hic24ly3v3pcvmxvjowghom76j4p47l4x8bqmt54lgl9jiovd6pyh2ue6noc4bhq3aqoqm9a1ct7pncdq1xqn96sqgt22cohw1tpjn9md8sb50ha34bx21r208bhg891c2v22qwascri3g1ziwpoi1t78lmjx85k5x6ob41ue8gsovwn7dn52bca6',
                        resourceIds: [],
                        width: 800759,
                        height: 256235,
                        fit: 'CROP',
                        sizes: { "foo" : "bar" },
                        quality: 406,
                        format: 'BMP',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateAttachmentFamily.id).toStrictEqual('2c0b2bf3-898e-48cc-83f4-4124ae060349');
            });
    });

    test(`/GraphQL adminDeleteAttachmentFamilyById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAttachmentFamilyById (id:$id)
                        {   
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '69bea403-f79d-4af8-acf7-69ffea20171e'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminDeleteAttachmentFamilyById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAttachmentFamilyById (id:$id)
                        {   
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '2c0b2bf3-898e-48cc-83f4-4124ae060349'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteAttachmentFamilyById.id).toStrictEqual('2c0b2bf3-898e-48cc-83f4-4124ae060349');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});