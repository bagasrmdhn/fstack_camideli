const Category = require("../models/Category");
const Item = require("../models/Item");
const Image = require("../models/Images");
const Bank = require("../models/Bank");

module.exports = {
  viewDashboard: (req, res) => {
    res.render("admin/dashboard/view_dashboard", {
      title: "Camideli | Dashboard",
    });
  },
  viewItem: async (req, res) => {
    try {
      const category = await Category.find();
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      res.render("admin/item/view_item", {
        title: "Camideli | Item",
        alert,
        category,
      });
    } catch (error) {
      res.redirect("/admin/item");
    }
  },

  addItem: async (req, res) => {
    try {
      const {
        categoryId,
        item_name,
        item_price,
        item_stock,
        item_status,
        about,
      } = req.body;
      if (req.files.length > 0) {
        const category = await Category.findOne({ _id: categoryId });
        const newItem = {
          categoryId: category._id,
          name: item_name,
          price: item_price,
          stock: item_stock,
          status: item_status,
          description: about,
        };
        const item = await Item.create(newItem);
        category.itemId.push({ _id: item._id });
        await category.save();
        for (let i = 0; i < req.files.length; i++) {
          const imageSave = await Image.create({
            imageUrl: `images/${req.files[i].filename}`,
          });
          console.log(imageSave);
          item.imageId.push({ _id: imageSave._id });
          await item.save();
        }
        console.log(newItem);

        console.log(item);

        req.flash("alertMessage", "Success Add Item");
        req.flash("alertStatus", "success");
        res.redirect("/admin/item");
      }
    } catch (error) {
      req.flash("alertMessage", `error.message`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/item");
    }
  },

  viewCategory: async (req, res) => {
    try {
      const category = await Category.find();
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      // console.log(category);
      res.render("admin/category/view_category", {
        category,
        alert,
        title: "Camideli | Category",
      });
    } catch (error) {
      res.redirect("/admin/category");
    }
  },

  addCategory: async (req, res) => {
    try {
      const { name } = req.body;
      // console.log(name);
      await Category.create({ name });
      req.flash("alertMessage", "Success Add Category");
      req.flash("alertStatus", "success");
      res.redirect("/admin/category");
    } catch (error) {
      req.flash("alertMessage", `error.message`);
      req.flash("alertStatus", "danger");

      res.redirect("/admin/category");
    }
  },

  editCategory: async (req, res) => {
    try {
      const { id, name } = req.body;
      const category = await Category.findOne({ _id: id });
      req.flash("alertMessage", "Success Update Category");
      req.flash("alertStatus", "success");
      category.name = name;
      await category.save();

      // await category.save();
      res.redirect("/admin/category");
    } catch (error) {
      req.flash("alertMessage", `error.message`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/category");
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.findOne({ _id: id });
      req.flash("alertMessage", "Success Delete Category");
      req.flash("alertStatus", "success");
      await category.remove();
      res.redirect("/admin/category");
    } catch (error) {
      req.flash("alertMessage", `error.message`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/category");
    }
  },

  viewBank: async (req, res) => {
    try {
      const bank = await Bank.find();
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      res.render("admin/bank/view_bank", {
        title: "Camideli | Bank",
        alert,
        bank,
      });
    } catch (error) {
      req.flash("alertMessage", `error.message`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/bank");
    }
  },

  addBank: async (req, res) => {
    try {
      const { name, accountNumber, bankName } = req.body;
      await Bank.create({
        name,
        accountNumber,
        bankName,
      });
      req.flash("alertMessage", "Success Add Bank");
      req.flash("alertStatus", "success");

      res.redirect("/admin/bank");
    } catch (error) {
      req.flash("alertMessage", `error.message`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/bank");
    }
  },

  editBank: async (req, res) => {
    try {
      const { id, name, accountNumber, bankName } = req.body;
      const bank = await Bank.findOne({ _id: id });
      req.flash("alertMessage", "Success Update Category");
      req.flash("alertStatus", "success");
      bank.name = name;
      bank.accountNumber = accountNumber;
      bank.bankName = bankName;
      await bank.save();

      // await category.save();
      res.redirect("/admin/bank");
    } catch (error) {
      req.flash("alertMessage", `error.message`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/bank");
    }
  },

  deleteBank: async (req, res) => {
    try {
      const { id } = req.params;
      const bank = await Bank.findOne({ _id: id });
      req.flash("alertMessage", "Success Delete Bank");
      req.flash("alertStatus", "success");
      await bank.remove();
      res.redirect("/admin/bank");
    } catch (error) {
      req.flash("alertMessage", `error.message`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/bank");
    }
  },

  viewOrder: (req, res) => {
    res.render("admin/order/view_order", {
      title: "Camideli | Order",
    });
  },
};
