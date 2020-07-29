import { AggregateRoot } from '@nestjs/cqrs';
import { 
    ContactId, 
    ContactTenantId, 
    ContactTenantCode, 
    ContactSystemId, 
    ContactSystemName, 
    ContactRoleId, 
    ContactRoleName, 
    ContactName, 
    ContactSurname, 
    ContactEmail, 
    ContactMobile, 
    ContactArea, 
    ContactHasConsentEmail, 
    ContactHasConsentMobile, 
    ContactIsActive, 
    ContactCreatedAt, 
    ContactUpdatedAt, 
    ContactDeletedAt
    
} from './value-objects';
import { CreatedContactEvent } from './../application/events/created-contact.event';
import { UpdatedContactEvent } from './../application/events/updated-contact.event';
import { DeletedContactEvent } from './../application/events/deleted-contact.event';
import { AdminTenant } from '@hades/admin/tenant/domain/tenant.aggregate';
import { BplusItSappiSystem } from '@hades/bplus-it-sappi/system/domain/system.aggregate';
import { BplusItSappiRole } from '@hades/bplus-it-sappi/role/domain/role.aggregate';

export class BplusItSappiContact extends AggregateRoot
{
    id: ContactId;
    tenantId: ContactTenantId;
    tenantCode: ContactTenantCode;
    systemId: ContactSystemId;
    systemName: ContactSystemName;
    roleId: ContactRoleId;
    roleName: ContactRoleName;
    name: ContactName;
    surname: ContactSurname;
    email: ContactEmail;
    mobile: ContactMobile;
    area: ContactArea;
    hasConsentEmail: ContactHasConsentEmail;
    hasConsentMobile: ContactHasConsentMobile;
    isActive: ContactIsActive;
    createdAt: ContactCreatedAt;
    updatedAt: ContactUpdatedAt;
    deletedAt: ContactDeletedAt;
    
    constructor(id?: ContactId, tenantId?: ContactTenantId, tenantCode?: ContactTenantCode, systemId?: ContactSystemId, systemName?: ContactSystemName, roleId?: ContactRoleId, roleName?: ContactRoleName, name?: ContactName, surname?: ContactSurname, email?: ContactEmail, mobile?: ContactMobile, area?: ContactArea, hasConsentEmail?: ContactHasConsentEmail, hasConsentMobile?: ContactHasConsentMobile, isActive?: ContactIsActive, createdAt?: ContactCreatedAt, updatedAt?: ContactUpdatedAt, deletedAt?: ContactDeletedAt, )
    {
        super();
        
        this.id = id;
        this.tenantId = tenantId;
        this.tenantCode = tenantCode;
        this.systemId = systemId;
        this.systemName = systemName;
        this.roleId = roleId;
        this.roleName = roleName;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.mobile = mobile;
        this.area = area;
        this.hasConsentEmail = hasConsentEmail;
        this.hasConsentMobile = hasConsentMobile;
        this.isActive = isActive;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        
    }

    static register (id: ContactId, tenantId: ContactTenantId, tenantCode: ContactTenantCode, systemId: ContactSystemId, systemName: ContactSystemName, roleId: ContactRoleId, roleName: ContactRoleName, name: ContactName, surname: ContactSurname, email: ContactEmail, mobile: ContactMobile, area: ContactArea, hasConsentEmail: ContactHasConsentEmail, hasConsentMobile: ContactHasConsentMobile, isActive: ContactIsActive, createdAt: ContactCreatedAt, updatedAt: ContactUpdatedAt, deletedAt: ContactDeletedAt, ): BplusItSappiContact
    {
        return new BplusItSappiContact(id, tenantId, tenantCode, systemId, systemName, roleId, roleName, name, surname, email, mobile, area, hasConsentEmail, hasConsentMobile, isActive, createdAt, updatedAt, deletedAt, );
    }

    created(contact: BplusItSappiContact): void
    {
        this.apply(
            new CreatedContactEvent(
                contact.id.value,
                contact.tenantId.value,
                contact.tenantCode.value,
                contact.systemId.value,
                contact.systemName.value,
                contact.roleId?.value,
                contact.roleName?.value,
                contact.name.value,
                contact.surname?.value,
                contact.email.value,
                contact.mobile?.value,
                contact.area?.value,
                contact.hasConsentEmail.value,
                contact.hasConsentMobile.value,
                contact.isActive.value,
                contact.createdAt?.value,
                contact.updatedAt?.value,
                contact.deletedAt?.value,
                
            )
        );
    }

    updated(contact: BplusItSappiContact): void
    {
        this.apply(
            new UpdatedContactEvent(
                contact.id.value,
                contact.tenantId?.value,
                contact.tenantCode?.value,
                contact.systemId?.value,
                contact.systemName?.value,
                contact.roleId?.value,
                contact.roleName?.value,
                contact.name?.value,
                contact.surname?.value,
                contact.email?.value,
                contact.mobile?.value,
                contact.area?.value,
                contact.hasConsentEmail?.value,
                contact.hasConsentMobile?.value,
                contact.isActive?.value,
                contact.createdAt?.value,
                contact.updatedAt?.value,
                contact.deletedAt?.value,
                
            )
        );
    }

    deleted(contact: BplusItSappiContact): void
    {
        this.apply(
            new DeletedContactEvent(
                contact.id.value,
                contact.tenantId.value,
                contact.tenantCode.value,
                contact.systemId.value,
                contact.systemName.value,
                contact.roleId?.value,
                contact.roleName?.value,
                contact.name.value,
                contact.surname?.value,
                contact.email.value,
                contact.mobile?.value,
                contact.area?.value,
                contact.hasConsentEmail.value,
                contact.hasConsentMobile.value,
                contact.isActive.value,
                contact.createdAt?.value,
                contact.updatedAt?.value,
                contact.deletedAt?.value,
                
            )
        );
    }

    toDTO(): Object
    {
        return {
            id: this.id.value,
            tenantId: this.tenantId.value,
            tenantCode: this.tenantCode.value,
            systemId: this.systemId.value,
            systemName: this.systemName.value,
            roleId: this.roleId?.value,
            roleName: this.roleName?.value,
            name: this.name.value,
            surname: this.surname?.value,
            email: this.email.value,
            mobile: this.mobile?.value,
            area: this.area?.value,
            hasConsentEmail: this.hasConsentEmail.value,
            hasConsentMobile: this.hasConsentMobile.value,
            isActive: this.isActive.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
            
        }
    }
}
