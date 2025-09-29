import mongoose from "mongoose";
interface IUser extends mongoose.Document {
    name: string;
    email: string;
    password: string;
}
declare const User: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser> & IUser & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default User;
//# sourceMappingURL=userModel.d.ts.map