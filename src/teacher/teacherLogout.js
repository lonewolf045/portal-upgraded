import { openingPage } from "../openingPage";
import { resetCurrentUser } from "../session";

const logOutTeacher = () => {
    openingPage();
    resetCurrentUser();
}

export {logOutTeacher};