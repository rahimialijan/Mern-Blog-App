import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";


export const test = (req, res) => {
    res.json({message: "API is Working"});
}



export const updateUser = async (req, res, next) => {
   try {
      const { userId } = req.params;  // Using the correct parameter name

      console.log("User ID:", userId);
      // Check if the logged-in user is authorized to update the requested user
      if (req.user.id !== userId) {
          return next(errorHandler(403, "You are not authorized to update this user"));
      }     

       // Handle password update with validation
       if (req.body.password) {
           if (req.body.password.length < 6) {
               return next(errorHandler(400, "Password must be at least 6 characters"));
           }
           req.body.password = bcryptjs.hashSync(req.body.password, 10);
       }

       // Handle username validation
       if (req.body.username) {
           const username = req.body.username;
           if (username.length < 3 || username.length > 20) {
               return next(errorHandler(400, "Username must be between 3 and 20 characters"));
           }
           if (username.includes(" ")) {
               return next(errorHandler(400, "Username cannot contain spaces"));
           }
           if (username !== username.toLowerCase()) {
               return next(errorHandler(400, "Username must be in lowercase"));
           }
           if (!username.match(/^[a-zA-Z0-9]+$/)) {
               return next(errorHandler(400, "Username can only contain letters and numbers"));
           }
       }

       // Update user details
       const updatedUser = await User.findByIdAndUpdate(
         userId,  // Use userId from the URL parameters
         {
             $set: {
                 ...req.body, // Update fields from the request body
             },
         },
         { new: true } // Return the updated document
     );
     

       // Check if the user exists
       if (!updatedUser) {
           return next(errorHandler(404, "User not found"));
       }

       // Exclude sensitive data like the password from the response
       const { password, ...rest } = updatedUser._doc;

       res.status(200).json(rest);
   } catch (err) {
       return next(errorHandler(500, "Error updating user"));
   }
};