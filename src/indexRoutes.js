import ImageUploader from "./layouts/mainPage";
import TagImages from "./components/tagImages";

var indexRoutes = [
    {
        path: "/uploadwithtags",
        name: "TagImages",
        icon: "nc-icon nc-bank",
        component: TagImages
    },
    {
        path: "/",
        name: "ImageUploader",
        icon: "nc-icon nc-bank",
        component: ImageUploader
    }];

export default indexRoutes;