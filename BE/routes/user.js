const express = require("express");
const authMiddleware = require("../auth/auth.middlewares");
const router = express.Router();
const User = require("../model/user");

const isAuth = authMiddleware.isAuth;
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get a list of all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Successful operation
 */
router.get("/user", isAuth, async (req, res) => {
  // Get a list of all users
  console.log(req.user);
  const users = await User.find();
  const listUser = users.map((user) => ({
    id: user.id,
    email: user.email,
    last_name: user.last_name,
    first_name: user.first_name,
  }));
  res.status(200).json(listUser);
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the user to retrieve
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: User not found
 */
router.get("/user/:id", (req, res) => {
  const id = req.params.id;
  // Get the user with the specified ID
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       description: User object to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: User's name
 *               email:
 *                 type: string
 *                 description: User's email
 *             example:
 *               name: John Doe
 *               email: john@example.com
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid request body
 */
router.post("/user", (req, res) => {
  const { name, email } = req.body;
  // Create a new user with the specified name and email
});

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update an existing user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the user to update
 *     requestBody:
 *       description: User object to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: User's name
 *               email:
 *                 type: string
 *                 description: User's email
 *             example:
 *               name: John Doe
 *               email: john@example.com
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 *       400:
 *         description: Invalid request body
 */
router.put("/user/:id", (req, res) => {
  const id = req.params.id;
  const { name, email } = req.body;
  // Update the user with the specified ID with the new name and email
});

module.exports = router;
