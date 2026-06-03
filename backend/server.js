const express = require("express");
const cors = require("cors");
const multer = require("multer");
const bcrypt = require("bcryptjs");
const cloudinary = require("./cloudinary");
require("dotenv").config();

const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

const upload = multer({ storage: multer.memoryStorage() });

app.get("/", (req, res) => {
  res.send("NonPerishKart Backend Running 🚀");
});

app.get("/api/test-db", (req, res) => {
  db.query("SELECT 1 + 1 AS result", (err, data) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json({
      message: "Database connected successfully!",
      result: data[0].result,
    });
  });
});

// PRODUCTS
app.get("/api/products", (req, res) => {
  db.query("SELECT * FROM products ORDER BY id DESC", (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(data);
  });
});

app.post("/api/products", (req, res) => {
  const { name, category, price, discountPrice, image, description, stock } =
    req.body;

  const sql =
    "INSERT INTO products (name, category, price, discountPrice, image, description, stock) VALUES (?, ?, ?, ?, ?, ?, ?)";

  db.query(
    sql,
    [name, category, price, discountPrice, image, description, stock],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      res.json({
        message: "Product added successfully!",
        productId: result.insertId,
      });
    }
  );
});

app.put("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const { name, category, price, discountPrice, image, description, stock } =
    req.body;

  const sql =
    "UPDATE products SET name=?, category=?, price=?, discountPrice=?, image=?, description=?, stock=? WHERE id=?";

  db.query(
    sql,
    [name, category, price, discountPrice, image, description, stock, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });

      res.json({ message: "Product updated successfully!" });
    }
  );
});

app.delete("/api/products/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM products WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json({ message: "Product deleted successfully!" });
  });
});

// ORDERS
app.post("/api/orders", (req, res) => {
  const {
    totalPrice,
    paymentMethod,
    customerName,
    phone,
    address,
    city,
    pincode,
    items,
  } = req.body;

  const orderSql =
    "INSERT INTO orders (totalPrice, paymentMethod, customerName, phone, address, city, pincode) VALUES (?, ?, ?, ?, ?, ?, ?)";

  db.query(
    orderSql,
    [totalPrice, paymentMethod, customerName, phone, address, city, pincode],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          error: err.message,
        });
      }

      const orderId = result.insertId;

      const itemValues = items.map((item) => [
        orderId,
        item.id,
        item.name,
        item.quantity,
        item.discountPrice,
      ]);

      const itemSql =
        "INSERT INTO order_items (orderId, productId, productName, quantity, price) VALUES ?";

      db.query(itemSql, [itemValues], (itemErr) => {
        if (itemErr) {
          return res.status(500).json({
            error: itemErr.message,
          });
        }

        // AUTO STOCK DEDUCTION 🔥
        items.forEach((item) => {
          db.query(
            "UPDATE products SET stock = stock - ? WHERE id = ?",
            [item.quantity, item.id]
          );
        });

        res.json({
          message: "Order placed with items!",
          orderId,
        });
      });
    }
  );
});

app.get("/api/orders", (req, res) => {
  const sql = `
    SELECT 
      orders.id AS orderId,
      orders.totalPrice,
      orders.paymentMethod,
      orders.customerName,
      orders.phone,
      orders.address,
      orders.city,
      orders.pincode,
      orders.status,
      orders.created_at,
      order_items.id AS itemId,
      order_items.productId,
      order_items.productName,
      order_items.quantity,
      order_items.price
    FROM orders
    LEFT JOIN order_items
    ON orders.id = order_items.orderId
    ORDER BY orders.id DESC
  `;

  db.query(sql, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    const ordersMap = {};

    rows.forEach((row) => {
      if (!ordersMap[row.orderId]) {
        ordersMap[row.orderId] = {
          id: row.orderId,
          totalPrice: row.totalPrice,
          paymentMethod: row.paymentMethod,
          customerName: row.customerName,
          phone: row.phone,
          address: row.address,
          city: row.city,
          pincode: row.pincode,
          status: row.status,
          created_at: row.created_at,
          items: [],
        };
      }

      if (row.itemId) {
        ordersMap[row.orderId].items.push({
          id: row.itemId,
          productId: row.productId,
          name: row.productName,
          quantity: row.quantity,
          discountPrice: row.price,
        });
      }
    });

    res.json(Object.values(ordersMap));
  });
});

app.put("/api/orders/:id/status", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  db.query("UPDATE orders SET status = ? WHERE id = ?", [status, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json({ message: "Order status updated successfully!" });
  });
});

// AUTH
app.post("/api/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

    db.query(sql, [name, email, hashedPassword], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      res.json({
        message: "Signup successful!",
        userId: result.insertId,
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, data) => {
    if (err) return res.status(500).json({ error: err.message });

    if (data.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = data[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    res.json({
      message: "Login successful!",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  });
});

// CLOUDINARY UPLOAD
app.post("/api/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file uploaded" });
    }

    const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString(
      "base64"
    )}`;

    const result = await cloudinary.uploader.upload(base64Image, {
      folder: "nonperishkart-products",
    });

    res.json({ imageUrl: result.secure_url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// REVIEWS
app.post("/api/reviews", (req, res) => {
  const { productId, userName, rating, comment } = req.body;

  const sql =
    "INSERT INTO reviews (productId, userName, rating, comment) VALUES (?, ?, ?, ?)";

  db.query(sql, [productId, userName, rating, comment], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json({
      message: "Review added successfully!",
      reviewId: result.insertId,
    });
  });
});

app.get("/api/reviews/:productId", (req, res) => {
  const { productId } = req.params;

  const sql = "SELECT * FROM reviews WHERE productId = ? ORDER BY id DESC";

  db.query(sql, [productId], (err, data) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json(data);
  });
});

const PORT = process.env.PORT || 5000;

app.get("/api/admin/stats", (req, res) => {
  const stats = {};

  db.query("SELECT COUNT(*) AS totalProducts FROM products", (err1, p) => {
    if (err1) return res.status(500).json({ error: err1.message });

    stats.totalProducts = p[0].totalProducts;

    db.query("SELECT COUNT(*) AS totalOrders FROM orders", (err2, o) => {
      if (err2) return res.status(500).json({ error: err2.message });

      stats.totalOrders = o[0].totalOrders;

      db.query(
        "SELECT IFNULL(SUM(totalPrice),0) AS totalRevenue FROM orders",
        (err3, r) => {
          if (err3) return res.status(500).json({ error: err3.message });

          stats.totalRevenue = r[0].totalRevenue;

          db.query(
            "SELECT COUNT(*) AS totalUsers FROM users",
            (err4, u) => {
              if (err4)
                return res.status(500).json({ error: err4.message });

              stats.totalUsers = u[0].totalUsers;

              db.query(
                "SELECT COUNT(*) AS totalReviews FROM reviews",
                (err5, rev) => {
                  if (err5)
                    return res.status(500).json({ error: err5.message });

                  stats.totalReviews = rev[0].totalReviews;

                  res.json(stats);
                }
              );
            }
          );
        }
      );
    });
  });
});

app.get("/api/admin/recent-orders", (req, res) => {
  const sql = `
    SELECT id, totalPrice, paymentMethod, customerName, status, created_at
    FROM orders
    ORDER BY id DESC
    LIMIT 5
  `;

  db.query(sql, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(data);
  });
});

app.get("/api/admin/revenue-chart", (req, res) => {
  const sql = `
    SELECT 
      DATE(created_at) AS date,
      COUNT(*) AS orders,
      SUM(totalPrice) AS revenue
    FROM orders
    GROUP BY DATE(created_at)
    ORDER BY DATE(created_at)
  `;
  
  db.query(sql, (err, data) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(data);
    });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});