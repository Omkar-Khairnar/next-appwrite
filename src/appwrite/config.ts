import { conf } from "@/conf/config";
import { Client, Account, ID } from "appwrite";

type CreateUserAccount={
    email:string,
    password:string,
    name:string
}

type LoginUserAccount={
    email:string,
    password:string
}

const appwriteClient = new Client();

appwriteClient.setEndpoint(conf.appwriteUrl);
appwriteClient.setProject(conf.appwriteProjectId)

export const account = new Account(appwriteClient);

export class AppwriteService {
    async createUserAccount({email, password, name}:CreateUserAccount){
        try {
            const userAccount = await account.create(ID.unique(), email, password, name);

            if(userAccount){
                return this.login({email, password})
            }
        } catch (error:any) {
            throw new Error(error.message);
        }
    }

    async login({email, password}:LoginUserAccount){
        try {
            const session = await account.createEmailPasswordSession(email, password);
            return session;
        } catch (error:any) {
            throw new Error(error.message);
        }
    }

    async isLoggedIn() : Promise<boolean>{
        try {
            const data = await this.getCurrentUser();
            return Boolean(data);
        } catch (error:any) {
            console.log(error.message);
        }

        return false;
    }

    async getCurrentUser(){
        try {
            const user = await account.get();
            return user;
        } catch (error:any) {
            throw new Error(error.message);
        }
    }

    async logout(){
        try {
            return await account.deleteSession("current")
        } catch (error:any) {
            throw new Error(error.message);
        }
    }
}

export default new AppwriteService();

