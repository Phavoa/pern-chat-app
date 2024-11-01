import { Request, RequestHandler, Response } from "express";
import prisma from "../db/prisma.js";
import bcryptjs from "bcryptjs";
import generateToken from "../utils/generateToken.js";

// Define expected types for signup and login request bodies
interface SignupRequest extends Request {
  body: {
    fullName: string;
    username: string;
    password: string;
    confirmPassword: string;
    gender: "male" | "female";
  };
}

interface LoginRequest extends Request {
  body: {
    username: string;
    password: string;
  };
}

// Signup function
export const signup: RequestHandler = async (
  req: SignupRequest,
  res: Response
): Promise<void> => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (!fullName || !username || !password || !confirmPassword || !gender) {
      res.status(400).json({ error: "Please fill in all fields" });
      return;
    }

    if (password !== confirmPassword) {
      res.status(400).json({ error: "Passwords do not match" });
      return;
    }

    const existingUser = await prisma.user.findUnique({ where: { username } });

    if (existingUser) {
      res.status(400).json({ error: "Username already exists" });
      return;
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const profilePic = `https://avatar.iran.liara.run/public/${
      gender === "male" ? "boy" : "girl"
    }?username=${username}`;

    const newUser = await prisma.user.create({
      data: {
        fullName,
        username,
        password: hashedPassword,
        gender,
        profilePic,
      },
    });

    if (newUser) {
      generateToken(newUser.id, res);
      res.status(201).json({
        id: newUser.id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
      return;
    } else {
      res.status(400).json({ error: "Invalid user data" });
      return;
    }
  } catch (error: any) {
    console.error("Error in signup controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
};

// Login function
export const login: RequestHandler = async (
  req: LoginRequest,
  res: Response
): Promise<void> => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ error: "Please fill in all fields" });
      return;
    }

    const user = await prisma.user.findUnique({ where: { username } });

    if (!user || !(await bcryptjs.compare(password, user.password))) {
      res.status(400).json({ error: "Invalid credentials" });
      return;
    }

    generateToken(user.id, res);

    res.status(200).json({
      id: user.id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
    return;
  } catch (error: any) {
    console.error("Error in login controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
};

// Logout function
export const logout: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
    return;
  } catch (error: any) {
    console.error("Error in logout controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
};

export const getMe: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user.id;
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.status(200).json({
      id: user.id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
    return
  } catch (error: any) {
    console.log("Error in the getMe controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
