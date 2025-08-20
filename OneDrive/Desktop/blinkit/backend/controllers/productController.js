let products = [
  { id: 1, name: "Dairy Products", price: 100 },
  { id: 2, name: "Pet Care", price: 50 },
  { id: 3, name: "Fruits & Vegetables", price: 30 },
  { id: 4, name: "Pharmacy", price: 70 },
];

export const getProducts = (req, res) => {
  res.json(products);
};

export const getProductById = (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
};

export const addProduct = (req, res) => {
  const { name, price } = req.body;
  const newProduct = { id: products.length + 1, name, price };
  products.push(newProduct);
  res.status(201).json(newProduct);
};
