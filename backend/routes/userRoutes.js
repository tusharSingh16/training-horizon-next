const express=require("express");
const zod=require("zod")
const jwt=require("jsonwebtoken");
const JWT_SECRET=require("../config/jwt")
const {User }=require("../models/User")
const {authMiddleware} =require("../middleware/authMiddleware");
const Member = require('../models/Member');


const userRouter=express.Router();

// input validation
const userSignupSchema =zod.object({
        email:zod.string().email(),
        firstName:zod.string(),
        lastName:zod.string(),
        password:zod.string(),
        role: zod.string(),
})
const userSigninSchema =zod.object({
    email:zod.string().email(),
    password:zod.string(),
})
const userUpdateSchema =zod.object({
        firstName:zod.string().optional(),
        lastName:zod.string().optional(),
        password:zod.string().optional(),
})

userRouter.post('/signup',async function (req,res) {
    const inputFromUser={
        email:req.body.email,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        password:req.body.password,
        role: req.body.role || 'user',
    } 
    const result =userSignupSchema.safeParse(inputFromUser);
    
    if (!result.success ) {
       return res.status(411).json({
            message:"Email already taken  1 / Incorrect inputs"
        })
    }
    try {
        const isValid= await User.findOne({
            email:inputFromUser.email,
        })
        if (isValid) {
            return res.status(411).json({
                message: "Email already taken 2 /Incorrect inputs"
            })
        }

        const user =  await User.create(inputFromUser);
     const token = jwt.sign({
        userId : user._id,
    },JWT_SECRET);
        res.status(200).json({
            message:"user created successfully",
            token:token,
            _id: user._id,
        })
    } catch (error) {
        res.status(411).json({
            message:error
        })
    }
})

userRouter.post("/signin",async function (req,res) {
    const userInput ={
        email:req.body.email,
        password:req.body.password,
    }
    const result = userSigninSchema.safeParse(userInput);
    if (!result.success) {
       return  res.status(411).json({
            message: "Error while logging in"
        })
    }
    try {
        const user =await User.findOne({
            email:userInput.email,
            password:userInput.password,
        })
        
        if (user) {

            //admin role
            // const userRole = user.role;
            // if (userRole=="admin") {    
            // } 

            const token =jwt.sign({
                userId : user._id,
            },JWT_SECRET)
    
            res.status(200).json({
                msg: "User logged in successfully",
                token: token,
            })
        }else{
            res.status(411).json({
            message: "Error while logging in"
            })
        }
    } catch (error) {
        console.log("error in signin page"+error);
    }
   
})



userRouter.put("/",authMiddleware,async function (req,res) {
    const userInput = req.body;
    
    const isValid = userUpdateSchema.safeParse(userInput);
    if (!isValid.success) {
       return res.status(411).json({
            essage: "Error while updating information",
        })
    }
    try {
        // console.log(" is it correct ?"+res.userId);
        await User.updateOne({ _id: res.userId }, { $set: userInput });
        res.status(200).json({
            message: "Updated successfully",
        });
    } catch (error) {
        console.log("error in /page update page"+ error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
})



// for user Dashboard
userRouter.get("/username",authMiddleware,async function (req,res) {
  const user=  await User.findOne({
        _id:res.userId
    })
    res.status(200).json({
        _id:user._id,
        user:user.firstName,
        role:user.role,
    })
})

// Add a family member for the logged-in user
userRouter.post('/registerMember', async (req, res) => {
    try {
      const { name, age, dob,relationship ,doctorName, doctorNumber, bloodGroup } = req.body;
      const userId = req.body.userId; 
  
      // Create new family member
      const newMember = new Member({
        name,
        age,
        dob,
        relationship,
        doctorName,
        doctorNumber,
        bloodGroup,
      });
  
      // Save the family member
      const savedMember = await newMember.save();
  
      // Add the member to the user's familyMembers array
      const user = await User.findById(userId);
      user.familyMembers.push(savedMember._id); // Add family member's ID to the user's array
      await user.save();
  
      res.status(201).json({ message: 'Family member registered successfully', member: savedMember });
    } catch (error) {
      res.status(500).json({ message: 'Error registering family member', error: error.message });
    }
  });

  userRouter.get('/all', authMiddleware, async (req, res) => {
    try {
      const userId = req.user.id; // Get the logged-in user ID from auth middleware
  
      // Find user and populate familyMembers field
      const user = await User.findById(userId).populate('familyMembers');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ familyMembers: user.familyMembers });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching family members', error: error.message });
    }
  });

module.exports = userRouter;