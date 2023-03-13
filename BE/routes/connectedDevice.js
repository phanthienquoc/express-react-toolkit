const express = require("express");
const router = express.Router();

const ItemInterface = require("../model/connectedDevice");
const authMiddleware = require("../auth/auth.middlewares");

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
router.get("/connected-device", isAuth, async (req, res) => {
  // Get a list of all users
  console.log(req.user);
  const items = await ItemInterface.find();
  const listItem = items.map((item) => ({
    id: item.id,
    user_id: item.userId,
    qr_code_id: item.qrCodeId,
    device_name: item.deviceName,
    device_model: item.deviceModel,
    device_os: item.deviceOS,
    disabled: item.disabled,
  }));
  res.status(200).json(listItem);
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
router.get("/connected-device/:id", (req, res) => {
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
router.post("/connected-device", (req, res) => {
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
router.put("/users/:id", (req, res) => {
  const id = req.params.id;
  const { name, email } = req.body;
  // Update the user with the specified ID with the new name and email
});

module.exports = router;
