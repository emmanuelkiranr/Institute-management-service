import { User, Account, Course, Mark } from "./models.js";

User.sync({ alter: true });
Account.sync({ alter: true });
Course.sync({ alter: true });
Mark.sync({ alter: true });
