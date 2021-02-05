import { openingPage } from "../openingPage";
import { resetCurrentUser } from "../session";

const logOutAdmin = () => {
    openingPage();
    resetCurrentUser();
}

export {logOutAdmin};