const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const db = require("./database/db");

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.set("views", "./views");



app.get("/", (req, res) => {
 
    res.render("index", { title: "Barang"});
});

app.get("/barang_masuk", (req, res) => { 
  const sql = "SELECT * FROM barang_masuk";
  db.all(sql, [], (err, barangs) => {
    if (err) {
      return console.error(err.message);
    }
    res.render("tableBM", { title: "Barang", barangs: barangs });
  });
});
app.get('/add', (req, res) => {
  res.render('inputBM', { title: 'Tambah Barang' });
});

app.post("/add", (req, res) => { 
  const { nama_barang, price, stock } = req.body;
  let uuid = uuidv4();
  let id = uuid.slice(0, 4);
  let sql = `INSERT INTO barang_masuk (id, nama_barang, price, stock) VALUES (?,?,?,?)`;
  db.run(sql, [id, nama_barang, price, stock], (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("barang telah ditambahkan");
    res.redirect("/barang_masuk");
  });
});

app.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM barang_masuk WHERE id = ?";
  db.get(sql, [id], (err, barang) => {
    if (err) {
      return console.error(err.message);
    }
    
    res.render("editBM", { title: "Edit Barang", barang: barang });
  });
});

app.post('/edit/:id', (req, res) => {
  let { nama_barang, price, stock } = req.body;
  let id = req.params.id;
  const tanggal = new Date();
  const sekarang = tanggal.toISOString().split("T")[0];
  let sql = `UPDATE barang_masuk SET nama_barang = ?, price = ?, stock = ?, updated_at = ? WHERE id = ?`;

  db.run(sql, [nama_barang, price, stock, sekarang, id], (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("barang telah diperbarui");
    res.redirect("/barang_masuk");
  });
});

app.get("/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM barang_masuk WHERE id = ?";
  db.run(sql, [id], (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("barang telah dihapus");
    res.redirect("/barang_masuk");
  });
});

app.get("/barang_keluar", (req, res) => { 
  const sql = "SELECT * FROM barang_keluar";
  db.all(sql, [], (err, barangs) => {
    if (err) {
      return console.error(err.message);
    }
    res.render("tableBK", { title: "Barang", barangs: barangs });
  });
});

app.get('/addBK', (req, res) => {
  res.render('inputBK', { title: 'Tambah Barang' });
});

app.get("/deleteBK/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM barang_keluar WHERE id = ?";
  db.run(sql, [id], (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("barang telah dihapus");
    res.redirect("/barang_keluar");
  });
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
