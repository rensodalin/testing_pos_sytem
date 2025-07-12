const db = require("../models");
const Category = db.Category;
const MenuItem = db.MenuItem;
const { Op } = require("sequelize");

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const { name, icon, bgColor, sortOrder } = req.body;
    
    const category = await Category.create({
      name,
      icon,
      bgColor,
      sortOrder: sortOrder || 0
    });

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating category",
      error: error.message
    });
  }
};

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      where: { isActive: true },
      order: [['sortOrder', 'ASC'], ['name', 'ASC']],
      include: [{
        model: MenuItem,
        as: 'menuItems',
        where: { isAvailable: true },
        required: false,
        order: [['sortOrder', 'ASC'], ['name', 'ASC']]
      }]
    });

    res.status(200).json({
      success: true,
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching categories",
      error: error.message
    });
  }
};

// Get category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const category = await Category.findByPk(id, {
      include: [{
        model: MenuItem,
        as: 'menuItems',
        where: { isAvailable: true },
        required: false,
        order: [['sortOrder', 'ASC'], ['name', 'ASC']]
      }]
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }

    res.status(200).json({
      success: true,
      data: category
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching category",
      error: error.message
    });
  }
};

// Update category
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, icon, bgColor, isActive, sortOrder } = req.body;
    
    const category = await Category.findByPk(id);
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }

    await category.update({
      name,
      icon,
      bgColor,
      isActive,
      sortOrder
    });

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: category
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating category",
      error: error.message
    });
  }
};

// Delete category
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    
    const category = await Category.findByPk(id);
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }

    // Check if category has menu items
    const menuItemCount = await MenuItem.count({ where: { categoryId: id } });
    
    if (menuItemCount > 0) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete category with existing menu items"
      });
    }

    await category.destroy();

    res.status(200).json({
      success: true,
      message: "Category deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting category",
      error: error.message
    });
  }
};

// Create a new menu item
exports.createMenuItem = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      categoryId,
      image,
      isAvailable,
      isPopular,
      preparationTime,
      sortOrder
    } = req.body;
    
    const menuItem = await MenuItem.create({
      name,
      description,
      price,
      categoryId,
      image,
      isAvailable: isAvailable !== undefined ? isAvailable : true,
      isPopular: isPopular || false,
      preparationTime: preparationTime || 10,
      sortOrder: sortOrder || 0
    });

    res.status(201).json({
      success: true,
      message: "Menu item created successfully",
      data: menuItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating menu item",
      error: error.message
    });
  }
};

// Get all menu items
exports.getAllMenuItems = async (req, res) => {
  try {
    const { categoryId, search, isAvailable, isPopular } = req.query;
    
    const whereClause = {};
    
    if (categoryId) {
      whereClause.categoryId = categoryId;
    }
    
    if (isAvailable !== undefined) {
      whereClause.isAvailable = isAvailable === 'true';
    }
    
    if (isPopular !== undefined) {
      whereClause.isPopular = isPopular === 'true';
    }
    
    if (search) {
      whereClause.name = {
        [Op.iLike]: `%${search}%`
      };
    }

    const menuItems = await MenuItem.findAll({
      where: whereClause,
      include: [{
        model: Category,
        as: 'category',
        attributes: ['id', 'name', 'icon', 'bgColor']
      }],
      order: [['sortOrder', 'ASC'], ['name', 'ASC']]
    });

    res.status(200).json({
      success: true,
      data: menuItems
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching menu items",
      error: error.message
    });
  }
};

// Get menu item by ID
exports.getMenuItemById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const menuItem = await MenuItem.findByPk(id, {
      include: [{
        model: Category,
        as: 'category',
        attributes: ['id', 'name', 'icon', 'bgColor']
      }]
    });

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found"
      });
    }

    res.status(200).json({
      success: true,
      data: menuItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching menu item",
      error: error.message
    });
  }
};

// Update menu item
exports.updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      price,
      categoryId,
      image,
      isAvailable,
      isPopular,
      preparationTime,
      sortOrder
    } = req.body;
    
    const menuItem = await MenuItem.findByPk(id);
    
    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found"
      });
    }

    await menuItem.update({
      name,
      description,
      price,
      categoryId,
      image,
      isAvailable,
      isPopular,
      preparationTime,
      sortOrder
    });

    res.status(200).json({
      success: true,
      message: "Menu item updated successfully",
      data: menuItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating menu item",
      error: error.message
    });
  }
};

// Delete menu item
exports.deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    
    const menuItem = await MenuItem.findByPk(id);
    
    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found"
      });
    }

    await menuItem.destroy();

    res.status(200).json({
      success: true,
      message: "Menu item deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting menu item",
      error: error.message
    });
  }
};

// Get popular menu items
exports.getPopularMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.findAll({
      where: { 
        isPopular: true,
        isAvailable: true
      },
      include: [{
        model: Category,
        as: 'category',
        attributes: ['id', 'name', 'icon', 'bgColor']
      }],
      order: [['sortOrder', 'ASC'], ['name', 'ASC']]
    });

    res.status(200).json({
      success: true,
      data: menuItems
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching popular menu items",
      error: error.message
    });
  }
}; 