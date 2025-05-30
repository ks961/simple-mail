import "@d3vtool/strict-env/tsetup";
import { CONFIG } from "./src/config";
import { Kaze } from "@d3vtool/kazejs";
import { UserController } from "./src/controllers/user/user-controller";
import { MailController } from "./src/controllers/mail/mail-controller";

const app = new Kaze({
    class: true
});

app.addGlobalMiddleware([
    Kaze.parseBody()
]);

app.controller(UserController);
app.controller(MailController);

app.listen(CONFIG.PORT);