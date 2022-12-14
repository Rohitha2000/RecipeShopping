import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { LoggingService } from "../logging.service";
import { ShareModule } from "../shared/shared.module";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";


@NgModule({
    declarations:[
        ShoppingListComponent,
        ShoppingEditComponent
    ],
    imports:[
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {path: '', component: ShoppingListComponent}
        ]),
        ShareModule
    ],
    providers:[LoggingService]
})
export class ShoppingListModule{


}