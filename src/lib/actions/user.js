import User from "../models/user.model";
import { connect } from "../mongodb/mongoose";

export const createOrUpdateUser = async (id, firstName, lastName, imageUrl, emailAddress) => {
    try {
        await connect();
        const user = await User.findOneAndUpdate(
            { clerkId: id },
            {
                $set: {
                    firstName,
                    lastName,
                    profilePicture: imageUrl,
                    email: emailAddress
                }
            },
            { upsert: true, new: true }
        );

        return user;

    } catch (error) {
        console.log("Error in create and update user", error);
    }
}

export const deleteUser = async (id) => {
    try {
        await connect();
        await User.findOneAndDelete({ clerkId: id });
    } catch (error) {
        console.log("Error in delete user", error);
    }
}