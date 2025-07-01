
import React, { useState } from 'react';
import { QrCode, Download, Eye } from 'lucide-react';
import CardCustom from '@/components/UI/CardCustom';
import ButtonCustom from '@/components/UI/ButtonCustom';
import { Label } from '@/components/UI/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/UI/select';

const QRService = () => {
  const [qrSettings, setQrSettings] = useState({
    product: '',
    size: '',
    format: ''
  });

  const products = [
    { id: 'prod_001', name: 'Premium Watch' },
    { id: 'prod_002', name: 'Luxury Bag' },
    { id: 'prod_003', name: 'Designer Shoes' }
  ];

  const sizes = ['Small (128x128)', 'Medium (256x256)', 'Large (512x512)', 'Extra Large (1024x1024)'];
  const formats = ['PNG', 'JPG', 'SVG', 'PDF'];

  const handleGenerateQR = () => {
    console.log('Generating QR code:', qrSettings);
  };

  const handleDownloadPrint = () => {
    console.log('Downloading QR code:', qrSettings);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold gradient-text">QR Code Service</h1>
        <p className="text-muted-foreground text-lg">
          Generate dan print QR codes untuk produk
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* QR Code Settings */}
        <CardCustom variant="glass">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/20 rounded-lg">
                <QrCode className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">Print QR Code</h2>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="qrProduct">Select Product</Label>
                <Select 
                  value={qrSettings.product} 
                  onValueChange={(value) => setQrSettings({ ...qrSettings, product: value })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Choose product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="qrSize">QR Code Size</Label>
                <Select 
                  value={qrSettings.size} 
                  onValueChange={(value) => setQrSettings({ ...qrSettings, size: value })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {sizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="qrFormat">Format</Label>
                <Select 
                  value={qrSettings.format} 
                  onValueChange={(value) => setQrSettings({ ...qrSettings, format: value })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    {formats.map((format) => (
                      <SelectItem key={format} value={format}>
                        {format}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-6">
                <ButtonCustom 
                  variant="outline"
                  onClick={handleGenerateQR}
                  disabled={!qrSettings.product || !qrSettings.size || !qrSettings.format}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Generate QR Code
                </ButtonCustom>

                <ButtonCustom 
                  variant="primary"
                  onClick={handleDownloadPrint}
                  disabled={!qrSettings.product || !qrSettings.size || !qrSettings.format}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download & Print
                </ButtonCustom>
              </div>
            </div>
          </div>
        </CardCustom>

        {/* QR Code Preview */}
        <CardCustom variant="gradient">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-6">QR Code Preview</h2>
            
            <div className="flex items-center justify-center h-64 bg-muted/30 rounded-lg border-2 border-dashed border-border/50">
              {qrSettings.product && qrSettings.size && qrSettings.format ? (
                <div className="text-center">
                  <div className="w-32 h-32 bg-white rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <QrCode className="h-24 w-24 text-black" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    QR Code Preview
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {qrSettings.size} • {qrSettings.format}
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <QrCode className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Select product and settings to preview QR code
                  </p>
                </div>
              )}
            </div>

            {qrSettings.product && (
              <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                <h3 className="font-medium mb-2">QR Code Information</h3>
                <div className="text-sm space-y-1">
                  <p><span className="text-muted-foreground">Product:</span> {products.find(p => p.id === qrSettings.product)?.name}</p>
                  <p><span className="text-muted-foreground">Verification URL:</span> https://tungky.com/verify/{qrSettings.product}</p>
                  <p><span className="text-muted-foreground">Size:</span> {qrSettings.size}</p>
                  <p><span className="text-muted-foreground">Format:</span> {qrSettings.format}</p>
                </div>
              </div>
            )}
          </div>
        </CardCustom>
      </div>
    </div>
  );
};

export default QRService;
