import express from 'express';
import {createBlog} from '../controllers/blogcontroller.js';
import {getBlogs} from '../controllers/blogcontroller.js';
import {getBlog} from '../controllers/blogcontroller.js';
import { updateBlog } from '../controllers/blogcontroller.js';
import { deleteBlog } from '../controllers/blogcontroller.js';

const router = express.Router();

router.post('/blogs',createBlog);
router.get('/blogs',getBlogs);
router.get('/blogs/:id',getBlog);
router.patch('/blogs/:id',updateBlog);
router.delete('/blogs/:id',deleteBlog);

export default router;