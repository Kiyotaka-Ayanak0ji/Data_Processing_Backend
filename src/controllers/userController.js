const { User, Role } = require('../models');
const bcrypt = require('bcrypt');

const createUser = async (req, res, next) => {
  try {
    const { name, email, password, roleName } = req.body || {};

    // Validate input
    if (!name || !email || !password || !roleName) {
      return res.status(400).json({
        message: "name, email, password and roleName are required."
      });
    }

    // Validate roleName before DB query (optional but good practice)
    if (!["viewer", "analyst", "admin"].includes(roleName)) {
      return res.status(400).json({
        message: "Invalid role."
      });
    }

    // Find role
    const role = await Role.findOne({
      where: { name: roleName }
    });

    if (!role) {
      return res.status(404).json({
        message: "Role not found."
      });
    }

    // Check existing user
    const existing = await User.findOne({
      where: { email }
    });

    if (existing) {
      return res.status(409).json({
        message: "User with provided email already exists."
      });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      passwordHash,
      roleId: role.id
    });

    return res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: role.name
    });

  } catch (error) {
    next(error);
  }
};

const listUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'status'], // hide passwordHash
      include: {
        model: Role,
        as: 'role',
        attributes: ['name']
      }
    });

    return res.json(users);
  } catch (err) {
    next(err);
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body || {};

    if (!['active', 'inactive'].includes(status)) {
      return res.status(400).json({
        message: 'Invalid status.'
      });
    }

    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: 'User not found.'
      });
    }

    user.status = status;
    await user.save();

    return res.json({
      id: user.id,
      status: user.status
    });

  } catch (err) {
    next(err);
  }
};

const updateRole = async (req, res, next) => {
  try {
    const { roleName } = req.body || {};

    // Validate role before DB query
    if (!["viewer", "analyst", "admin"].includes(roleName)) {
      return res.status(400).json({
        message: 'Invalid role.'
      });
    }

    const role = await Role.findOne({
      where: { name: roleName }
    });

    if (!role) {
      return res.status(404).json({
        message: 'Role not found.'
      });
    }

    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: 'User not found.'
      });
    }

    user.roleId = role.id;
    await user.save();

    return res.json({
      id: user.id,
      role: role.name
    });

  } catch (err) {
    next(err);
  }
};

module.exports = {
  createUser,
  listUsers,
  updateStatus,
  updateRole
};