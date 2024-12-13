import mongoose , {Document , Schema} from "mongoose";

interface IblacklistSchema extends Document {
    token : string,
    expiry : Date
}

const blacklistSchema = new Schema<IblacklistSchema>({
    token : {
        type :String,
        required : true
    },
    expiry : {type :Date , required:true}
})

export const blacklistModel = mongoose.model<IblacklistSchema>("tokens" , blacklistSchema);

