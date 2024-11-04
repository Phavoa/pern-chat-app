import { Conversation } from './../../../node_modules/.prisma/client/index.d';
import { Request, Response } from "express";
import prisma from "../db/prisma.js";

// Define an extended type for Request to include `user` (assuming `user` is added to `req` by authentication middleware)
interface AuthenticatedRequest extends Request {
  user: { id: string }; // Assuming `id` is a string; adjust if it’s a number
}

export const sendMessage = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    // Extract message content and receiver's ID from the request
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user.id;

    // Check if a conversation already exists between the sender and receiver
    let conversation = await prisma.conversation.findFirst({
      where: {
        participantIds: {
          hasEvery: [senderId, receiverId],
        },
      },
    });

    // If no conversation exists, create a new one with the sender and receiver as participants
    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          participantIds: {
            set: [senderId, receiverId],
          },
        },
      });
    }

    // Create a new message in the conversation
    const newMessage = await prisma.message.create({
      data: {
        senderId,
        body: message,
        conversationId: conversation.id,
      },
    });

    // If the message is successfully created, link it to the conversation
    if (newMessage) {
      conversation = await prisma.conversation.update({
        where: {
          id: conversation.id,
        },
        data: {
          messages: {
            connect: {
              id: newMessage.id,
            },
          },
        },
      });
    }

    // Respond with the new message as JSON
    res.status(201).json(newMessage);
  } catch (error: any) {
    console.error("Error in the sendMessage controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const getMessage = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const userToChatId = req.params.id;
        const senderId = req.user.id;
        
        const conversation = await prisma.conversation.findFirst({
            where: {
                participantIds: {
                    hasEvery: [senderId, userToChatId]
                }
            },
            include: {
                messages: {
                    orderBy: {
                        createdAt: "asc"}
                }
            }
        })

        if (!conversation) {
            res.status(404).json([]);
            return
        }

        res.status(200).json(conversation.messages);
    } catch (error: any) {
        console.error("Error in the getMessage controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}


export const getUserForsidebar = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const authUserId = req.user.id;
        const users = await prisma.user.findMany({
            where: {
                id: {
                    not: authUserId
                }
            },
            select: {
                id: true,
                fullName: true,
                username: true,
                profilePic: true
            }          
        });

        if (!users) {
            res.status(404).json([]);
            return
        }
        res.status(200).json(users);
    } catch (error: any) {
        console.error("Error in the getUserForsidebar controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}