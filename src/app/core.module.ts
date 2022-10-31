import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthInterceptor } from "./auth/auth.interceptor";
import { LoggingService } from "./logging.service";
import { RecipeService } from "./recipes/recipe-service";
import { ShoppingService } from "./shopping-list/shopping-list-serve";


@NgModule({
    providers:[ShoppingService, RecipeService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor,
        multi:true }

    ]
})
export class CoreModule{

}