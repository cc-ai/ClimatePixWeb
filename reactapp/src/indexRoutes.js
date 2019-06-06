import {MainPage} from "./layouts/mainPage";
import {FinalPage} from "./layouts/finalPage";

var indexRoutes = [
    {
        path: "/thankyou",
        name: "FinalPage",
        icon: "nc-icon nc-bank",
        component: FinalPage
    },
    {
        path: "/",
        name: "MainPage",
        icon: "nc-icon nc-bank",
        component: MainPage
    }];

export default indexRoutes;