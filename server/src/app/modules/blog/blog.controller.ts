import { Request, Response } from "express";
import { BlogService } from "./blog.service";
import { CatchAsync } from "../../utils/CatchAsync";
import sendResponse from "../../utils/sendResponse";

const createBlog = CatchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req?.user;
    const result = await BlogService.createBlogIntoBD(user, req.body);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Blog created successfully",
      data: result,
    });
  }
);

const getBlogs = CatchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.getBlogsFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Blogs retrieved successfully",
    data: result,
  });
});

const getMyBlogs = CatchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req?.user;
    const result = await BlogService.getMyBlogFromDB(user);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Blogs retrieved successfully",
      data: result,
    });
  }
);

const getBlogById = CatchAsync(async (req: Request, res: Response) => {
  const { blogId } = req.params;

  const result = await BlogService.getBlogByIdFromDB(blogId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Blog retrieved successfully",
    data: result,
  });
});

const updateBlogById = CatchAsync(async (req: Request, res: Response) => {
  const { blogId } = req.params;

  const result = await BlogService.UpdateBlogByIdIntoDB(blogId, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Blog information updated successfully",
    data: result,
  });
});

const deleteBlogById = CatchAsync(async (req: Request, res: Response) => {
  const { blogId } = req.params;

  const result = await BlogService.deleteBlogByIdFromDB(blogId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Blog deleted successfully",
    data: result,
  });
});

export const BlogController = {
  createBlog,
  getBlogs,
  getMyBlogs,
  getBlogById,
  updateBlogById,
  deleteBlogById,
};
