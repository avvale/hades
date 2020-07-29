import { ApiProperty } from '@nestjs/swagger';

export class UpdateFlowDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '9b7e77cd-a1ca-4aad-a773-b1d844ce6b7b'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : 'i8pxvair8i0sas929msj603rn9eo97nltr3h8ms4'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '8176d89d-edf6-4e6f-a15b-e85ca1299ea8'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '5tq8hujvhjxdm8z6oje336vrju3oc870ylutse15x64puwl9wc'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'f07631f5-827b-457e-96cc-04e344ac8e48'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'k9igt6j1yd4vytnbib53'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'ww09892b43kx2yc2qkl0'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : '8bjfo25h7n8ill8hvmwnqz2u51ldk5xyfr8sie81eqcvsmklz08gjkgr6gy4'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'ca6kibuft6n9dnqff92k82sgib2uhh2rnqko6uyv8761pcj0khokmvofu81kqifm1bxgkzhtucuoriyjhi6slt2lbddn04ymmek7xoi7mjk0w1do4mjt7nob4vfwn2b3bpmik20tv612rrd3aevbyeyi2tfg17r0'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'w4jgruxzvt9aevvk1dh8utukns18lfztlx8hekbv2il5ndfsvkeweddrakexqdarh3imlzdd671k38l8ofakpf6dt8k3nwqqsxefxqni3qka3nvoijf3vr7vb0t2h28u1v2qdsnayljpg68h0sl3cdh9qczx7u3b'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : 'gou8gpld5k85sy1qjx51pkrhu7lyd33vmdr05cw5k2s3f510j26y1d6lvyoryl9y7sikafv9gq99u3k91gspxja1wq4ps5temv091gswa1suokypujkqi85as62q4gxksmflntw1wqkg92s1jp026okbjwyhbnqq'
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : '4mutzvehv4i6nx9rhsqut1rk0dnm4s8zz0k7fxj2z1hhmraswvai9i8s9ygaetqk9dpdl75l4zcgggcej2qc8ayazlnjn00rllfvfsps6ygou6oiobzvkhqrp4pa9t1nf00um5hmgm0830zbvzuckbxp0alg8pr0'
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : 'em0hj69vyjlzmgk7oar8aawapgkz1nk2hvf65uw8iyxfglqib0z7tgsfly14m1chxsk6ua163vq9qkuwf32nxgi6zerl7y8w6xfocoh750kdokjn0q76ns6h0pf63awdr7vlj5rer9g6amgs9jdff5g9dpg321ui'
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : 'l41vobtd1kk390m63qp9'
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'grsm6gfnszqp9p0xb839'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-29 07:27:28'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : 'hrxvs0k57acmhupl3yk0nxi2lbbvfiqbz7afs6e2vet9g1ih2a8wb6rzd3zf8fmo6rr85060l9mezow3zvbslthvaf5eqe7nru3mcz66suc6ki7ys5mw4k3s7258escdgghan3uyfluzcg35rfiou26pq9lcf0yz3kh72yhgfij92cmkp9m0b3fa6wibtyqattmlsezlvftmeme9pmzm1l0iukrez9g62qcc1whvfugqv9uopgtwiaadfcy05c3'
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : '8h13dc9tyokw4whh0gey94o5mdxakyli7lhh7inddg05g3pi9iwozfg2n06twg1d2a29yuouptqj4kz9mqmyehfnqx6dxzbqhijgjk9ogrnlx7o6uzbhh3r3ci5pknnqb285mqsf46hlrftkobl8sbgzaura65bk21t5t2w521kzc1vnqvlyt3bq5vtvtxaz10rspealjzgvdsqetrzsicmnp4q5j51hq7r9r2zfitxd83n2xohd00cdxj3w2km'
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : 'yzzxjv57wlzrd44jglood0flqg7yc64swwcog43hyvgot50esjwbq62m2y32'
    })
    application: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isCritical [input here api field description]',
        example     : true
    })
    isCritical: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isComplex [input here api field description]',
        example     : true
    })
    isComplex: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fieldGroupId [input here api field description]',
        example     : '268343f3-70ac-4874-89df-aa7bc1d198c0'
    })
    fieldGroupId: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
}
