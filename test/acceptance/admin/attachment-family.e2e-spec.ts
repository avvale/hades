import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAttachmentFamilyRepository } from '@hades/admin/attachment-family/domain/attachment-family.repository';
import { MockAttachmentFamilyRepository } from '@hades/admin/attachment-family/infrastructure/mock/mock-attachment-family.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import * as request from 'supertest';
import * as _ from 'lodash';
import { IamModule } from './../../../src/apps/iam/iam.module';

const importForeignModules = [
    IamModule
];

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
                name: 'gh7iuc9uxnau3oxuv1js0f8q9ewz5a9c7m7a05i7w42qu7yn79h8322129r1kwvsymty4o4g8zhdwd9mxn2r1mdgvnfk6tmy9w1dt0en3mr85cb9hhylccxqsi13havryxyplwd9axzg5g6gzzh204ydd1lsl43vk091v5y4wn3qktyod6fi1il3s2ggvlq8qph3pmk6d2d85inu0bucujfcsgmfmdg2vkjapyjuvo56qi0ffut5q6kfuqtq39e',
                resourceIds: [],
                width: 674612,
                height: 937353,
                fit: 'CROP',
                sizes: { "foo" : "bar" },
                quality: 36,
                format: 's8p3oupx9m',
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
                
                name: 'pr56pp0lchs9a1q7pa1a59w76c7nb2a1u6vlwv0isqufs2loy5vhrvbtkq1txa2owe673e4cvcx94kwty25j801d26vfzrt4a315pszmnzx38gr7ces398gu2t2xxx5rqoksbiiwqnnlu0m8a7zicp003p4525ruqplhy754pg5dds2thzbsv090nz7j6jxbv3puxndvhrf9fkrsn84a68f3ifd3hz0ktlv31ifoc2qx48taz519u8achcmd4ma',
                resourceIds: [],
                width: 998936,
                height: 729014,
                fit: 'WIDTH_FREE',
                sizes: { "foo" : "bar" },
                quality: 19,
                format: 'yge4upgb24',
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
                id: '277db0e5-ad89-40fe-b721-9d112ce1dfad',
                name: null,
                resourceIds: [],
                width: 892558,
                height: 664112,
                fit: 'WIDTH',
                sizes: { "foo" : "bar" },
                quality: 84,
                format: 'gac6c4ggqr',
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
                id: '277db0e5-ad89-40fe-b721-9d112ce1dfad',
                
                resourceIds: [],
                width: 346365,
                height: 582128,
                fit: 'CROP',
                sizes: { "foo" : "bar" },
                quality: 45,
                format: 'p15tt7xmqr',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyFit property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: '277db0e5-ad89-40fe-b721-9d112ce1dfad',
                name: '25wtu7wyl363f1qfzgql2zza6ee1mxr90ysurz2k9mktd6o9xzn12b3taa6n123frel3g84ltx48gwzakb4xlbvbgdo3htl382rei9n0e1gzy4drcf4a29g3959wnas38k1rlcdjjezk4n8n8ge7q8c9fvpnaq5et65t6ro4m8shz60vhv794pa4xgi3d6mezthk6aglvauoust6nc5b0m8isa8j0ik10er5n0e7xfowjiqipy6ixw4fchy96jn',
                resourceIds: [],
                width: 441823,
                height: 403137,
                fit: null,
                sizes: { "foo" : "bar" },
                quality: 40,
                format: 'n9xy00b07m',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyFit must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyFit property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: '277db0e5-ad89-40fe-b721-9d112ce1dfad',
                name: 'ryrykvhiwqnq0mwxqnsexx4i6xcb3dzr674qoghzii8e68hbs36cq7w6dfgl43y39xu350swdr196mziobsq753lfy2di26b4l0ardkz80luqfserddel8qe5z5ri58fksyf7pq0n8r1vbb6rqsi9ebz5zr1hpuxpyfmmnoexo73w1z5q0cfhnb8c727r42lhqpwf19p5q6hgxmqqx6w2fnp6vz85tifx2o96zdzufai0mzfljjqvowpues8qui',
                resourceIds: [],
                width: 715206,
                height: 663290,
                
                sizes: { "foo" : "bar" },
                quality: 40,
                format: 'tvh1aegpyf',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyFit must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: 'ow6w6tqhbrkbyorolxesa0oioo1ewl87x01f2',
                name: '92wugahwpwcoxgndwhefox83b7odrhsn63za0y4c29bc4j2pze3z8plzx3gctccd4j3l4ae4jzrdg0rmbyg50ju50f8900rl82rnxe07l02sw70alplvsnptpknkkk1mygmrib9k02gzzb9ddbrzaq2iy50pchjfh70qlzq7e9nvifgaljckrwliksl1qczweayb22rxnqlpqt5tyt6uhtnmdj5r19aplik8ry1zfg9egwabv9g94cc2d7bvpqh',
                resourceIds: [],
                width: 428376,
                height: 805103,
                fit: 'HEIGHT_FREE',
                sizes: { "foo" : "bar" },
                quality: 41,
                format: 'tfj0c3hzfl',
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
                id: '277db0e5-ad89-40fe-b721-9d112ce1dfad',
                name: '5lnw2slobty83zp3xhryjimbni44ned8wjl5a5tq8x0z9ezaee9y0fmoo0649li0txtp4fv2ljs1gh72hvsglr24lzeh750r1qacyicjhkkn6srnl4sp48qv5brvqftfzr2xan6asyusrp1j1ooy92gfuafikoec4hfjakeouc9ng7hupvrxnflyysc3j3oaba8snzxrjatejohk6b0qvl7s4fkci2nkiz88c8em35kcgkr92y1z0filx8zq09na',
                resourceIds: [],
                width: 920977,
                height: 101077,
                fit: 'HEIGHT_FREE',
                sizes: { "foo" : "bar" },
                quality: 80,
                format: 'g5paxli3bg',
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
                id: '277db0e5-ad89-40fe-b721-9d112ce1dfad',
                name: 'g42jfz8aij46zdre769c4udfobq1wfz7114w95nkvaaex38kf2cd41jyb9rft2dubkmqwumbmgiyny2wkeglo2h5j2wnho5kx9xi0lqfb7q4ekjl103m3f7h6jynzl0kef2qjerdspiagmulme36nspelbhqns5vled8o68y4r8up751yslzwnnj6zl03d6bps9vzhb0sg8tvgcf0if8v4wocvmp5t85ssephz69cud18tphdr30wwna4i01g88',
                resourceIds: [],
                width: 8458725,
                height: 250535,
                fit: 'WIDTH_FREE',
                sizes: { "foo" : "bar" },
                quality: 28,
                format: 'ue1hgm9jqk',
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
                id: '277db0e5-ad89-40fe-b721-9d112ce1dfad',
                name: 'ebmpnink0c45rd41v9ocahn3c54v33celo35l2yxx1umd6ojzjn0tctjl061jeg9c8dvzf94r01zofr96xn4cmqcv3z2tmzavyrwvr5mneyv42sak35cic2eccpd8nalmueshhhyndbbn07qq0rph2zcvl9uleiu7jdcvoeh53dw3czo51r5u2nvfnn0j42szl8n40bl1krj1n4tleuor8apjbdlar6u5sb9aahms2fhyzbf5osozf0pwp83hfb',
                resourceIds: [],
                width: 170458,
                height: 6891880,
                fit: 'CROP',
                sizes: { "foo" : "bar" },
                quality: 45,
                format: 'mfgkti3qmw',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyHeight is too large, has a maximum length of 6');
            });
    });
    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyQuality is too large, has a maximum length of 2`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: '277db0e5-ad89-40fe-b721-9d112ce1dfad',
                name: 'g9lykwcke3wibjhuk1y9suepjkkomkn8mpfq34qk2zj08aky3vf4zmoua0a43d2ecy65rbc8hkca1bwijz9zlgwf6az2l7be7xn01wlq50jj85b5gpuwxfbjdgepmgjit2qsjjt2umx3q85otdb0bsv3hk9b5ks5f0sitg3y8dj4zaa2qknfu7erhxbpuzv2ijh0agz8bscdjwjhjkptg944wiuhl42pvcea6dayzcgrbglgddhn0uk5tvalzrx',
                resourceIds: [],
                width: 724364,
                height: 180646,
                fit: 'CROP',
                sizes: { "foo" : "bar" },
                quality: 958,
                format: '7iyyrbmd2g',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyQuality is too large, has a maximum length of 2');
            });
    });
    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyFormat is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: '277db0e5-ad89-40fe-b721-9d112ce1dfad',
                name: 'iq4t3i7lrngjvgambuxwgg31pro7amtqgssd3apn4jtldccvh8atjtbqzant0r4hyeqiurjilfc9q4iu7rzv316hgmtabiuoa07zt6kwkzay2d2glm1gmfmbhpoqhzlb80wngprai20xl7xdzouv6wkfyyxell51hky6089l2bqqsd6vy5ou94bwzbqnbmxwtat6m3nbyyaoalmwhf5bgkrv14engkziofr09jvwv65lgg2rz0kbx4bs98gxnuy',
                resourceIds: [],
                width: 145655,
                height: 261691,
                fit: 'CROP',
                sizes: { "foo" : "bar" },
                quality: 15,
                format: '4uqv0wbf096',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyFormat is too large, has a maximum length of 10');
            });
    });
    

    

    

    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyQuality must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: '277db0e5-ad89-40fe-b721-9d112ce1dfad',
                name: '3ptvai7awr9g6llr4fd8u0xsnu46lksu8snt06yo0xz8j5oe61b6rz2dtbwponijr6o5zrgjdj06e7xrzcf75u2wkrogby5sbg8615lb5b9bezbeef41iazhemh74i240avujd7d4j7993rt49pvbylmjlqn4p6cpom92c3jyag3x87ywqah05eza9smiv17ae96t41vhtd2zvpog2ga3ztdotz7aql0qux4ohi903nltb808bpyrh9lib5jtag',
                resourceIds: [],
                width: 854766,
                height: 598100,
                fit: 'HEIGHT_FREE',
                sizes: { "foo" : "bar" },
                quality: -9,
                format: 'ber86c620g',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for AttachmentFamilyQuality must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyFit has to be a enum option of CROP, WIDTH, HEIGHT, WIDTH_FREE, HEIGHT_FREE`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: '277db0e5-ad89-40fe-b721-9d112ce1dfad',
                name: 'gf6xvoq7p7fts6fub1c9mpyw1tj0qu93im3g0pr3rnc36exksfbnwvut81zz6sp2271qhgho16s5o27zg62220xiumowuc691z5698uju2gcf3e1ej5k64hcsmvlv7uxpct28qbm0jt5r13ihmu0r9kbunnsjpykbzsv2b50agy4b27lracx9zy9yjd9o7vjx5te8utc0fr0gq203ekxjc7llaw1phqzgzfzkw7pov3hc30ol9ll97v42bjpz70',
                resourceIds: [],
                width: 660246,
                height: 749781,
                fit: 'XXXX',
                sizes: { "foo" : "bar" },
                quality: 70,
                format: 'd8aad8t572',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyFit has to be any of this options: CROP, WIDTH, HEIGHT, WIDTH_FREE, HEIGHT_FREE');
            });
    });
    

    

    test(`/REST:POST admin/attachment-family`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: '277db0e5-ad89-40fe-b721-9d112ce1dfad',
                name: '6k7q81y9ce596l8lcoar1o9tk2kbgbfzuu1ym77mdxqp089i2b2yzhlz4hesrm927mc640w72o608mc4um3r200jdy3z4i9avb4wo2fa848mp7df6wxhgm6l4s6b7z3ui07w9jyqr14zasfiffzx1b8qvvnoqidhv0ncyw0shf60rnfkheogh54chx07nupuvz3p7wzjds17dnrwh5gs8kk8w9k7t99il3bgdhrysr3ovc0ch48igb80dur5ikd',
                resourceIds: [],
                width: 661767,
                height: 689416,
                fit: 'CROP',
                sizes: { "foo" : "bar" },
                quality: 66,
                format: 'cxgfdbdnvx',
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
                        id: '490531a2-1a89-49ae-a3a1-83c7af66ddd9'
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
                        id: '277db0e5-ad89-40fe-b721-9d112ce1dfad'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '277db0e5-ad89-40fe-b721-9d112ce1dfad'));
    });

    test(`/REST:GET admin/attachment-family/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-family/1883945f-3fa3-4ca7-8751-4e228e4f2f32')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/attachment-family/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-family/277db0e5-ad89-40fe-b721-9d112ce1dfad')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '277db0e5-ad89-40fe-b721-9d112ce1dfad'));
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
                
                id: '17abd8d7-529f-4df5-92a6-476488c26078',
                name: 'rt48xm4mw43mn86743vhnq20tqg87cvnr34jdlgpm0z4ys40o43u6d58eup20gfp40x56y2srhabak75vgc3i9cqgvzrm9lpk9klqgf8jy5hnvslpb2xpp6n4elwl1g7fuob77asyg2tbiraxlq37uwb7ndaq26i5qxl2knki646bfq3i9cxm0k0w2czzf4vj756dfnfgqxnnrxy8lo92tsq77llnkg3os4azeedchrk4f3pzuzr3h0tr1oqd3i',
                resourceIds: [],
                width: 511158,
                height: 993545,
                fit: 'HEIGHT',
                sizes: { "foo" : "bar" },
                quality: 45,
                format: 'xu50tscnha',
            })
            .expect(404);
    });

    test(`/REST:PUT admin/attachment-family`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                
                id: '277db0e5-ad89-40fe-b721-9d112ce1dfad',
                name: 'i6eie3jaud5vflzvva784ymhmm9mbmu3w5mr2oxniuudq58bpsrvbzlrpcj649htypvy8zcyl342fzlccn54s52hns44amtkmtfjvgo1ci4orzioguifaokiokcd5cf20p819uuko5usnw9rt2b96zd5cb7z7l9yrvmdbv4cdgrdgmayqznvgcc8p81dfbur69f9x6c4vrpz2bpyzkwk0ekbtl6l283p61u3dbmoikl5hr0nk1q52khvqvzggfy',
                resourceIds: [],
                width: 390865,
                height: 842778,
                fit: 'CROP',
                sizes: { "foo" : "bar" },
                quality: 64,
                format: '69mm5j32h4',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '277db0e5-ad89-40fe-b721-9d112ce1dfad'));
    });

    test(`/REST:DELETE admin/attachment-family/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment-family/ac990670-0d13-4608-b991-1985eb652e16')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/attachment-family/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment-family/277db0e5-ad89-40fe-b721-9d112ce1dfad')
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
                        id: 'f7c0db87-13f4-48c1-be08-87ab33dedc7d',
                        name: '65x55kbcb7bvj14aywplglpmb15aialpwe2wohpvttnx8252dqm03voxa8r6yt5tjkw4ywz1jasqjxsntkj4k0xj09zq61be7jombteendjk67v3elekb4fs0h6px4qegbafmk5qo6n1n7medv2uhkp1p65ohulfdgz6bydbyvafj66wf0g18itfpth13iat7v5ic0mpomtocpj80s4vmvt7r5czxovccc916hpm0itlrv689fypghwmxly7scu',
                        resourceIds: [],
                        width: 851228,
                        height: 359582,
                        fit: 'WIDTH',
                        sizes: { "foo" : "bar" },
                        quality: 93,
                        format: 'uyfawiq7ov',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateAttachmentFamily).toHaveProperty('id', 'f7c0db87-13f4-48c1-be08-87ab33dedc7d');
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
                            id: '3f6e8c38-08e7-485f-84c8-1cf4b64e87d1'
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
                            id: '277db0e5-ad89-40fe-b721-9d112ce1dfad'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachmentFamily.id).toStrictEqual('277db0e5-ad89-40fe-b721-9d112ce1dfad');
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
                    id: 'e354f393-fe53-4f4a-b2f3-2e7f32bf8a99'
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
                    id: '277db0e5-ad89-40fe-b721-9d112ce1dfad'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachmentFamilyById.id).toStrictEqual('277db0e5-ad89-40fe-b721-9d112ce1dfad');
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
                        
                        id: '281181ae-d8fb-423e-a479-ba3a3afca558',
                        name: '6ah9ye24lkcjggm4fk8c53m4bb361lhpt5gmu6u3qtya3gbnhl3p0z77bw1y0089c1dbo6k7sgbfxp96r5eehhdc2wl91rz21598x9cg7a424nglyu96j0zzjdcmikortj21ilh250k9i2r33dwxtjkivmpr1xhq50tj77r01yxdfkfdn79lzvgdl24y8xyl0nwmhqzb0c7c19bglcv8wppcfs2jti8omfapv17ddo8jjlukmg7flwenb7cujy9',
                        resourceIds: [],
                        width: 847121,
                        height: 245631,
                        fit: 'CROP',
                        sizes: { "foo" : "bar" },
                        quality: 96,
                        format: '5q97fyxrz1',
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
                        
                        id: '277db0e5-ad89-40fe-b721-9d112ce1dfad',
                        name: 'sbdakkisrizb62ffwdffi01o8zhgjthfercox6tmy58rhtodndmvrlvo2a20n7tggw86mmsb1jkpo2wsndn65esr60ybtftppvjnbnhjwqfuh1wvhlkon2t6606w87cqkqs0fca6mcpqfelrvqr0edh94y6cncqjffq9hn1ovrhiz8l77sc1xqchuf7ncdegobfo90v88iq0sgjnmjzumyxqoih11w0sr380g4tzvp8guicizz5xktn8td4c1dv',
                        resourceIds: [],
                        width: 754550,
                        height: 138520,
                        fit: 'WIDTH',
                        sizes: { "foo" : "bar" },
                        quality: 28,
                        format: '7jjuu2dn3j',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateAttachmentFamily.id).toStrictEqual('277db0e5-ad89-40fe-b721-9d112ce1dfad');
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
                    id: '56ee829a-9b67-4844-887d-db0b44399ee4'
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
                    id: '277db0e5-ad89-40fe-b721-9d112ce1dfad'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteAttachmentFamilyById.id).toStrictEqual('277db0e5-ad89-40fe-b721-9d112ce1dfad');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});