
import { useState } from 'react';
import { Package, Plus, Edit } from 'lucide-react';
import CardCustom from '@/components/UI/CardCustom';
import ButtonCustom from '@/components/UI/ButtonCustom';
import { Input } from '@/components/UI/input';
import { Label } from '@/components/UI/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/UI/select';

const ProductService = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: ''
  });

  const [editProduct, setEditProduct] = useState({
    selected: '',
    newPrice: ''
  });

  const categories = ['Electronics', 'Fashion', 'Accessories', 'Home & Garden', 'Sports'];
  const existingProducts = [
    { id: 'prod_001', name: 'Premium Watch', category: 'Accessories', price: 150 },
    { id: 'prod_002', name: 'Luxury Bag', category: 'Fashion', price: 300 },
    { id: 'prod_003', name: 'Designer Shoes', category: 'Fashion', price: 200 }
  ];

  const handleCreateProduct = () => {
    console.log('Creating product:', newProduct);
    setNewProduct({ name: '', category: '', price: '' });
  };

  const handleUpdateProduct = () => {
    console.log('Updating product:', editProduct);
    setEditProduct({ selected: '', newPrice: '' });
  };

  const selectedProductInfo = existingProducts.find(p => p.id === editProduct.selected);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold gradient-text">Product Service</h1>
        <p className="text-muted-foreground text-lg">
          Kelola produk dan integrasinya dengan NFT
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Add Product Form */}
        <CardCustom variant="glass">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/20 rounded-lg">
                <Plus className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">Add Product & Mint NFT</h2>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="productName">Product Name</Label>
                <Input
                  id="productName"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  placeholder="Enter product name"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={newProduct.category} 
                  onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category.toLowerCase()}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="price">Harga dalam Bentuk Token Kita</Label>
                <Input
                  id="price"
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  placeholder="Enter price in tokens"
                  className="mt-1"
                />
              </div>

              <ButtonCustom 
                variant="primary"
                onClick={handleCreateProduct}
                className="w-full mt-6"
                disabled={!newProduct.name || !newProduct.category || !newProduct.price}
              >
                <Package className="mr-2 h-4 w-4" />
                Create Product & Mint NFT
              </ButtonCustom>
            </div>
          </div>
        </CardCustom>

        {/* Edit Product Form */}
        <CardCustom variant="gradient">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-accent/20 rounded-lg">
                <Edit className="h-5 w-5 text-accent" />
              </div>
              <h2 className="text-xl font-semibold">Edit Product (already NFT)</h2>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="selectProduct">Select Product</Label>
                <Select 
                  value={editProduct.selected} 
                  onValueChange={(value) => setEditProduct({ ...editProduct, selected: value })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Choose product to edit" />
                  </SelectTrigger>
                  <SelectContent>
                    {existingProducts.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name} - {product.price} tokens
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedProductInfo && (
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h3 className="font-medium mb-2">Current Product Info</h3>
                  <div className="text-sm space-y-1">
                    <p><span className="text-muted-foreground">Name:</span> {selectedProductInfo.name}</p>
                    <p><span className="text-muted-foreground">Category:</span> {selectedProductInfo.category}</p>
                    <p><span className="text-muted-foreground">Current Price:</span> {selectedProductInfo.price} tokens</p>
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="newPrice">New Price (Tokens)</Label>
                <Input
                  id="newPrice"
                  type="number"
                  value={editProduct.newPrice}
                  onChange={(e) => setEditProduct({ ...editProduct, newPrice: e.target.value })}
                  placeholder="Enter new price"
                  className="mt-1"
                />
              </div>

              <ButtonCustom 
                variant="accent"
                onClick={handleUpdateProduct}
                className="w-full mt-6"
                disabled={!editProduct.selected || !editProduct.newPrice}
              >
                <Edit className="mr-2 h-4 w-4" />
                Update Product
              </ButtonCustom>
            </div>
          </div>
        </CardCustom>
      </div>
    </div>
  );
};

export default ProductService;
