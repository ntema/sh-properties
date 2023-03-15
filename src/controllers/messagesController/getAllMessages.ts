import { NextFunction, Request, Response } from "express";
import { Message } from "../../models";
export const getAllMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let {
      limit = 20,

      page = 1
    }: { page?: number; limit?: number } = req.query;
    page = page || 1;
    const skip: number = page ? (page - 1) * limit : 0;
    let option: { cat?: string } = {};
    console.log(option);

    const count = await Message.find(option).countDocuments();
    // const pages = count>0?Math.ceil(count / limit)?Math.ceil(count / limit): 1;
    let pages = 0;
    if (count > 0) {
      if (limit) {
        pages = Math.ceil(count / limit);
      } else {
        pages = 1;
      }
    }

    const result: { next?: object; previous?: object } = {};
    limit = limit - 0;

    if (page * 1 < pages) {
      result.next = { limit, page: page * 1 + 1 };
    }
    if (page * 1 <= pages && page - 1 != 0) {
      result.previous = { limit, page: page - 1 };
    }

    const messages = await Message.find(option)
      .populate("from")
      .populate("to")
      .populate("property")
      .limit(limit * 1)
      .skip(skip);
    return res
      .status(200)
      .json({ status: "success", data: { ...result, count, pages, messages } });
  } catch (error) {
    next(error);
  }
};
