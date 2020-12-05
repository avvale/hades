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
                name: '6hdd3b7smiy9pfhkaqq0zd2aregh568wrmaqt54amlzwx6w4mhjfwo0w3u3d9itif0am44aobnorxatat4pi2m0xc3a44hs8m0dkp158xoaj0ikqtopgd4yfil3drhzovi4z4wa7xupcbrcc7tczwzlf2nppfjkp7tqt36vrcwqp9jrg0rihi2vp6fogsg2098j6noczohzpza7aje6wkv5nrpkh40zuhx9axywypp6kdboysrt1uo2twt7gz3f',
                resourceIds: [],
                width: 386562,
                height: 909444,
                fit: 'HEIGHT',
                sizes: { "foo" : "bar" },
                quality: 10,
                format: 'mv7orscozy',
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
                
                name: 'tqgly3e56lpf1pdxck84xk4w4wre0pljrdd7o4gl64fi8flpfxe54i1jde66rtg2n2mda1s6664y4kzocje5zrxfx3essrx7q6qwv68w9fwz0vd7re4ej1qvl1kv5b5hesr6s1ls0p69avrgbuzwmetxzt2njc66lkmzfgqc03wbha4f9yb8ficueiyle4lppv5qgg8yi6kcn55xvtke224nmjvtrojbmpz1mt9t66p69udi4u535unuhp8f438',
                resourceIds: [],
                width: 147553,
                height: 766200,
                fit: 'HEIGHT_FREE',
                sizes: { "foo" : "bar" },
                quality: 46,
                format: 'xem4arioro',
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
                id: 'c1947e0e-6100-454b-956c-48e48d970fb8',
                name: null,
                resourceIds: [],
                width: 482287,
                height: 486804,
                fit: 'HEIGHT_FREE',
                sizes: { "foo" : "bar" },
                quality: 23,
                format: '81tafcdxvj',
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
                id: 'c1947e0e-6100-454b-956c-48e48d970fb8',
                
                resourceIds: [],
                width: 460732,
                height: 280763,
                fit: 'HEIGHT_FREE',
                sizes: { "foo" : "bar" },
                quality: 49,
                format: 'gz4rx829ol',
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
                id: 'c1947e0e-6100-454b-956c-48e48d970fb8',
                name: '22m2ui2v2g1box6y9ujagtb9muo79d4xsor8swsypp5qriyeh1mdb7h5fzgouujx3levr3d6msjh5e3ud7bp0al3hmily7bcvefsvgv5cbe202tn80rgq9bgfo986yo17tew7d1s4hnzlh7qzclz3j12sd24k30w4jbvml2781jmdta9gy2kklsj1wtppy4tn9hv18r03dhq0zdyq6a80agryebavvflt0p555qhzn0k3oscnx7bi5i48dow7og',
                resourceIds: [],
                width: 350975,
                height: 467844,
                fit: null,
                sizes: { "foo" : "bar" },
                quality: 11,
                format: 'yg3ej82wxs',
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
                id: 'c1947e0e-6100-454b-956c-48e48d970fb8',
                name: 'ldq6yyuf0llhaqa2lzi5k6wdxf5hu2xx7tf36vc4gxge4i12yfbrfs5ca13md7zdzafhhstnhm3apzrkxz6c3p4ma2jyzq5tho2k3xu6z7ilhivavteenkz5tyumu9ehv4hzuukuvmyhtzd9n4i0vmafirrodgb6bmspv33q9fuuwz4p7bi6grruqnq2qyd0zh9oxlkx9ddpdhjn5jaab7le70obgp46bgoezdil45my268jzhm4myo9crpurbc',
                resourceIds: [],
                width: 372041,
                height: 171829,
                
                sizes: { "foo" : "bar" },
                quality: 85,
                format: 'bosmv7wvso',
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
                id: 'ifuagq6kfs3qr7ewfjn2o66w9hzqlvlgp5j5r',
                name: 'k032wwja6buz97uqsi3jv8qyowj7s6disr2v43ne4ts43e72df0ykhsorqiwdb0cqvcer14whkj7hpbwwhukzen42z2h6u9y8aaa6fxw59fre5a4d84lkok4b4euhmqhzf2w7h8875gzs1ulwjhtgno5zwgu7yc2gw8j9lju622xujmt8wo4dsd2ab4f3cev6nyy4whlkrj7edpn3msoss17ejqnehd37y6p71ruuqrcpfupkoubjso4egldcji',
                resourceIds: [],
                width: 740726,
                height: 894546,
                fit: 'CROP',
                sizes: { "foo" : "bar" },
                quality: 76,
                format: 's9mfs1m6wq',
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
                id: 'c1947e0e-6100-454b-956c-48e48d970fb8',
                name: 'ipddpugwzx1pt3qw225sl9o7puxxlywt9m4awuh77yq5lzu6hcfuhjx5rggmwbjhvgl9pmgf5e9ffqgasinpeot30a65do7lgb1n9ns8zp570dmriy1my95vfuftvedc55wst8k6q4y11srhm6tvqa3x3mpl688ws7js7u80j16nnd6dsip2snttkjh1p1kwe17jyw310j0wk57eqrjbh3w2byu0c95cvnvewfcp089hh9duu4j2wwt3ph5mni9i',
                resourceIds: [],
                width: 710743,
                height: 244749,
                fit: 'WIDTH',
                sizes: { "foo" : "bar" },
                quality: 14,
                format: 'sjknajh9w1',
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
                id: 'c1947e0e-6100-454b-956c-48e48d970fb8',
                name: 'ghsd3a6vesxqsrt26spbegovuc0af9hvnac8xpebxk2mtwzflnvx4tv3qyw8dz96o1q0ogq6lmc5sm0wfdpg3mj0ypb3vi194aowl08bmyjhk9vgbnsizvu7odm26sedbl3a3avfy8tpvrtjcw44fdgmxvdo2kw0fh7h9myypim2czradg9y0naytj8qd8hi98peri71zg53a6icvhvhxfpfx5mao1b6nrkiwrl45uk9oyydqx4z97t2es821b5',
                resourceIds: [],
                width: 7336416,
                height: 488159,
                fit: 'HEIGHT_FREE',
                sizes: { "foo" : "bar" },
                quality: 97,
                format: '1i91ybu7ex',
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
                id: 'c1947e0e-6100-454b-956c-48e48d970fb8',
                name: '4ydi9hv1hfpdqa4ipv51y05m1qx5x6il529zx34zf41t8jq4ga910y6n6zuohpw3r9qsf48hznm8w3ckl2luop8yrl6hd83imfjfwgkjl7556ami8nduyzm5o03djhhvkc50oekf4rhkmb9s8sgq3d6qe4xr5ddacu0f8cgsrpbkn7saonzg0pmkb6hyhx6qkkwl34bbs7jb1easb3fs69bnvb1a7s0wl22v4mrb75a34i33fqehi6enih77hmx',
                resourceIds: [],
                width: 624701,
                height: 9652658,
                fit: 'CROP',
                sizes: { "foo" : "bar" },
                quality: 93,
                format: 'sln2yjx6u3',
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
                id: 'c1947e0e-6100-454b-956c-48e48d970fb8',
                name: 'c27gd1ssn2jmr8cm77br80n58qjg56w96hbhfvymw8dn9i4f8qt25argsymkz3x0s3mjl10jvtitk4dv0vrekmv7c8n97qh28y5rihjh59m45nf4kmtqy5q7xutp1imd9q5szpkf7l0r9oj2ibg5w1l01yzcy63kf5b27ht2mgl61t12mih96zouu63cejx7o07fzk8s2nlnp3ds43eoxd1is6rs512d46gzygsx4o901kkfms7f3t4lapspmdc',
                resourceIds: [],
                width: 846443,
                height: 541392,
                fit: 'HEIGHT',
                sizes: { "foo" : "bar" },
                quality: 185,
                format: '9wzms7m0w1',
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
                id: 'c1947e0e-6100-454b-956c-48e48d970fb8',
                name: '4ufpm2afzgrue9flgn5vgl03lcl2zpjtt008gd2421iminked2m6y0khu9804bc4pwlw4s4uwcubtag8a8g6va36rd7fk59nc134hnhd66c2ia9ol1830z9c54frfz67j7396fnnqubuwbyylxrywie4xb9tkeouv4npadordjlinwk4g2p0hzogewmguwgqyyve34hlf4lgzxtn9cku4mknbkgh0j1bejuoyjndhcirg9zronlvst7z7f3175y',
                resourceIds: [],
                width: 346699,
                height: 779680,
                fit: 'HEIGHT_FREE',
                sizes: { "foo" : "bar" },
                quality: 17,
                format: 'fvqint1kq46',
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
                id: 'c1947e0e-6100-454b-956c-48e48d970fb8',
                name: '74zzzqpnr3mx23t30hjzzbpp66wwv5wh851vphvmazcarjw5mmqfohrohbmk0gzmuw1lkdzf7v91t6n6biv68n1tlvdzsef3j7xb4xh69skmwdfc8sibaagcskhv4kpzbtrzr7c8wvfme279zu2atty9ge230tmin651g0o7262c6zzxmi3834ssj2oclyrogvrch3h24rdr694w9k2ayir3nm2pni6in6divb6ua8p3cg7ar5znb22nkvmipbq',
                resourceIds: [],
                width: 943820,
                height: 592804,
                fit: 'HEIGHT_FREE',
                sizes: { "foo" : "bar" },
                quality: -9,
                format: 'p6tus0sgwi',
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
                id: 'c1947e0e-6100-454b-956c-48e48d970fb8',
                name: '289k5m0oskycys1yv166hpvr5qbgee82t2oxrnxss12kuef2xah8b39ekw3pl8kkgghkv41kjdmvkyz4l1es3i35aif3gbv9meqggtowmca6977fyzrbkqnbxz846ulp3xl1c5dr8wmk36c4w7x6u6o8m3qaarpf8q5ghtgzfkc67h422k6l3j1qgwpyaudz7nys0j1hcbx16xdfyzih2ehyj6xbhkh9vjm8zzykcn57o30sb9f4potsmj90vmt',
                resourceIds: [],
                width: 297606,
                height: 866747,
                fit: 'XXXX',
                sizes: { "foo" : "bar" },
                quality: 50,
                format: '478fnhnkvd',
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
                id: 'c1947e0e-6100-454b-956c-48e48d970fb8',
                name: 'n8n0nizh0et0gpazn65h9v5bgr1tsgc1fy1lhpfm2myiof9fvu9c1c43v6zdpsifw5bgnqd8lsgu5es8wib8x0q5la0o5un2g9l9j8yznu8ps18qf41omqrg1f201qbi89g0v6y30qi570ieiw307ybtcnpf0dper4nubof3behfp1u9ol2231i5jid82hjekqpwlutgk49i9g9xu3lrvjfiednoh11nkvbgy7ugcp1jyvrzlypy7ub06di1o1f',
                resourceIds: [],
                width: 458407,
                height: 973463,
                fit: 'WIDTH',
                sizes: { "foo" : "bar" },
                quality: 33,
                format: 'cjm27co411',
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
                        id: 'f21af8b8-220b-47f3-b27a-a30b0e18eeb4'
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
                        id: 'c1947e0e-6100-454b-956c-48e48d970fb8'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'c1947e0e-6100-454b-956c-48e48d970fb8'));
    });

    test(`/REST:GET admin/attachment-family/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-family/8cb8a25b-8022-4e6c-9526-ba967d33b047')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/attachment-family/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-family/c1947e0e-6100-454b-956c-48e48d970fb8')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'c1947e0e-6100-454b-956c-48e48d970fb8'));
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
                
                id: '47394346-2403-4fc3-8af7-7c59b9fd077c',
                name: 'av6d3s819hnslxsxfpjjr5dwruazc8vps1qvzg3jfqr2jo89e18ug6qau01ngib0ylz7wmnrqyrlgfgcaxfkdojauysbcy6sd3tgjdd6g898f4k3zh5q87goch987ux9dbuhj50uu0p32emjsaqoada3wbunp3fqup4eh348ctz07w7urlhqjofaw1dfoem50au8r32gj3d846dmoln51h5xor95e1cn7h2sh41jnzsxytomcahk6jbiu9966i0',
                resourceIds: [],
                width: 208198,
                height: 400771,
                fit: 'WIDTH',
                sizes: { "foo" : "bar" },
                quality: 23,
                format: '28xxk5sjjn',
            })
            .expect(404);
    });

    test(`/REST:PUT admin/attachment-family`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                
                id: 'c1947e0e-6100-454b-956c-48e48d970fb8',
                name: 'ftiue2ppb35p2r03ghms4zydmagtmv2zhjljp8qouur5fyyt8evixt1v50ncfgtzk04rkn535oy6udgyb7ygfznbjflj3uo04qvee3obk4x0e1d6rsa06legbpctz2tazwmm461f93bqyg2xzu2zblsemfyhirnom1ltkl6vk4uqtxyn1jiam9bjhkelbnceia5y485eyggpnmy9lzy6ce0bzajkegs7uxhcfngdw013c7qli2jxm8ywlit69cg',
                resourceIds: [],
                width: 569343,
                height: 121274,
                fit: 'WIDTH',
                sizes: { "foo" : "bar" },
                quality: 82,
                format: '8qgtpummv0',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'c1947e0e-6100-454b-956c-48e48d970fb8'));
    });

    test(`/REST:DELETE admin/attachment-family/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment-family/ff1fd0fe-9cbb-4ee0-aaf6-bc34345878e1')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/attachment-family/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment-family/c1947e0e-6100-454b-956c-48e48d970fb8')
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
                        id: '2126dcdf-07d1-4c16-a4f6-80b37111c045',
                        name: '418jwwoqpnjhox6j101v92fmbqhzof4dbvkqc6c1dm80uf683n62ytolxg3xt2g7xv8j30szzadmncvdb6geaunhh86pa321rsytxhmquneu63utgnuzlan515uzhixuhpcjfts2sja0hfocj085w7xlgk1f4wkcz2pp6g5x1sxn6zwbk2cq4rot4cb0ic51zvqlh2qx5kspcfgjb6yxssjtj537ofgubdx2qpw5k4edy07z0hpwpzi0tcopzsk',
                        resourceIds: [],
                        width: 264973,
                        height: 674697,
                        fit: 'HEIGHT_FREE',
                        sizes: { "foo" : "bar" },
                        quality: 40,
                        format: 'rvdlfvcw4n',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateAttachmentFamily).toHaveProperty('id', '2126dcdf-07d1-4c16-a4f6-80b37111c045');
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
                            id: '5ba5208f-eadc-4568-85f4-b66a498def4e'
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
                            id: 'c1947e0e-6100-454b-956c-48e48d970fb8'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachmentFamily.id).toStrictEqual('c1947e0e-6100-454b-956c-48e48d970fb8');
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
                    id: '6591b862-6560-4806-b787-6c1afed1fc9d'
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
                    id: 'c1947e0e-6100-454b-956c-48e48d970fb8'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachmentFamilyById.id).toStrictEqual('c1947e0e-6100-454b-956c-48e48d970fb8');
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
                        
                        id: '7b72fb9e-d476-4da7-b96b-66e5aa821888',
                        name: 'h243nl8kf50ha38a2x2ebfjxzdi8c5cn0zfrpsqiyyh4dec1uboqp04li9nowvgs2q4qc21l4580grc0nq44phqbc3dz6l7d5ibqum43jsz77r1cdnk71xnb89pftpqowah29o1pjdo7x0n2be399ccakm2oyg4bxpg6ee2o04z41jz7ejypp3ad1i95uwek9rn9b4s05ehjnz7si8133ifpptdrvrvdk7h7km7ziylrfya51dcmsaxfxfhtnde',
                        resourceIds: [],
                        width: 622267,
                        height: 817241,
                        fit: 'HEIGHT_FREE',
                        sizes: { "foo" : "bar" },
                        quality: 43,
                        format: 'jer3wl1tpk',
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
                        
                        id: 'c1947e0e-6100-454b-956c-48e48d970fb8',
                        name: 'yprsb9wc5jtd33gnq32hqg6qv1a2b79uhnzn10c7n6jin5k0qg8lphvccuk9cqwptlxsvzjreyir9s1zgcp0p331osae52odm4p4yporg1dgkqfgkerobsl552dijvi3ie9ystiozeifyrj1j3zeo229z3wd1y0ir9k92t0qiqwl5rtt41bz2buu0hgfnc27orlehg73pygsxpy1ie22p155iiknh0fbub7j8kd4cr4nvp49ws3qzc9piks8rqe',
                        resourceIds: [],
                        width: 706718,
                        height: 289512,
                        fit: 'HEIGHT',
                        sizes: { "foo" : "bar" },
                        quality: 81,
                        format: 'd80n8ddtus',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateAttachmentFamily.id).toStrictEqual('c1947e0e-6100-454b-956c-48e48d970fb8');
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
                    id: 'f28da615-c583-4e46-bf8b-f649778313bb'
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
                    id: 'c1947e0e-6100-454b-956c-48e48d970fb8'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteAttachmentFamilyById.id).toStrictEqual('c1947e0e-6100-454b-956c-48e48d970fb8');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});