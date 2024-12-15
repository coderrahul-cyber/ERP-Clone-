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
    expiry: {
        type: Date,
        required: true,
        default : Date.now(),
        // Ensure the TTL index is 
        index: { expires: 86400 }, 
    },})

export const blacklistModel = mongoose.model<IblacklistSchema>("tokens" , blacklistSchema);

