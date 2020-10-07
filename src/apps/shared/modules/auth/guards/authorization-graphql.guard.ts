import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';

@Injectable()
export class AuthorizationGraphQLGuard implements CanActivate
{
    constructor(private reflector: Reflector) {}
    
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> 
    {
        const permissions = this.reflector.get<string[]>('permissions', context.getClass());

        if (!permissions) return true;

        const ctx = GqlExecutionContext.create(context);
        
        return  permissions.every(permisison => ctx.getContext().req.user.dPermissions.all.includes(permisison));
    }
}
