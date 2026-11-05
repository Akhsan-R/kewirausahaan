import './styles.css';
import './catalog.css';

type Product = {
  id: number;
  name: string;
  category: string;
  price: number | null;
  bundleQty?: number;
  bundlePrice?: number;
  promo?: string;
  image: string;
  description: string;
  sizes: string[];
  colors: string[];
  badge?: string;
};

type CartItem = {
  productId: number;
  quantity: number;
  size: string;
  color: string;
};

type CheckoutData = {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  postal: string;
  note: string;
};

const products: Product[] = [
  {
    id: 1,
    name: 'Daster Harian Motif',
    category: 'Daster',
    price: 35000,
    image: 'https://www.dasterbali.id/images/480/Daster-Panjang-Katun-Rayon-%283%29.jpg',
    description: 'Daster harian motif kekinian. Materi Queenshop menonjolkan kenyamanan, kesan adem, model sederhana, dan pilihan warna ungu, biru, serta merah muda. Foto ini merupakan referensi visual alternatif.',
    sizes: [],
    colors: ['Ungu', 'Biru', 'Merah muda'],
    badge: 'Rp35.000',
  },
  {
    id: 2,
    name: 'Celana Kulot Motif',
    category: 'Kulot',
    price: 35000,
    bundleQty: 3,
    bundlePrice: 100000,
    promo: '3 pcs Rp100.000',
    image: 'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/G42864s.jpg?im=Resize%2Cwidth%3D750',
    description: 'Celana kulot dengan pilihan motif stripe hitam, stripe merah, polkadot, leopard, stripe pink, dan stripe biru. Harga satuan Rp35.000 atau paket 3 pcs Rp100.000 sesuai materi promosi.',
    sizes: [],
    colors: ['Stripe Hitam', 'Stripe Merah', 'Polkadot', 'Leopard', 'Stripe Pink', 'Stripe Biru'],
    badge: 'Promo 3 pcs',
  },
  {
    id: 3,
    name: 'Gamis Wanita Motif',
    category: 'Gamis',
    price: 35000,
    image: 'https://modern-abayati.com/cdn/shop/files/FullSizeRender_96988883-76c4-43f2-b729-4a8d2d292625.jpg?v=1717649051',
    description: 'Gamis wanita simple dan elegan. Materi katalog mencantumkan ukuran LD 96 cm dan LD 105 cm serta motif abstrak cokelat, bunga pink, merah marun, dan hijau floral. Harga Rp35.000.',
    sizes: ['LD 96 cm', 'LD 105 cm'],
    colors: ['Abstrak Cokelat', 'Bunga Pink', 'Merah Marun', 'Hijau Floral'],
    badge: 'Rp35.000',
  },
  {
    id: 4,
    name: 'Setelan Pendek Motif',
    category: 'Setelan',
    price: null,
    image: 'https://i5.walmartimages.com/seo/DreamFish-Womens-Pajama-Sets-2-Piece-Summer-Ladies-Short-Sleeve-Lounge-Sleepwear-with-Pockets-PJ-Set_f6e0aca6-c8fe-49dc-8584-490994afee42.d4e88ce402e24a3288f3d0828d960157.jpeg?odnBg=FFFFFF&odnHeight=640&odnWidth=640',
    description: 'Setelan atasan pendek dan bawahan pendek. Materi Queenshop menampilkan motif abu-merah dan hijau serta keterangan bahan rayon premium. Harga belum tercantum pada gambar promosi, sehingga produk belum dapat dimasukkan ke keranjang.',
    sizes: [],
    colors: ['Motif Abu Merah', 'Motif Hijau'],
    badge: 'Harga segera dikonfirmasi',
  },
  {
    id: 5,
    name: 'Paket 3 Atasan Wanita',
    category: 'Atasan',
    price: 100000,
    promo: 'Paket isi 3 pcs',
    image: 'https://i5.walmartimages.com/seo/Sevevn-Women-s-Casual-Loose-Fit-T-Shirt-Summer-Short-Sleeve-Oversized-Top-Basic-Round-Neck-Tee-for-Daily-Wear-Orange-XXXL_83997339-b668-4606-93e9-78f92e8b42c1.dc54307b1f09b43ec5e12088afc6c19d.jpeg',
    description: 'Paket 3 atasan wanita dengan pilihan tampilan biru, cokelat bata, strip hitam-putih, dan hijau tosca. Harga paket Rp100.000 untuk 3 pcs sesuai materi promosi. Foto ini hanya referensi visual alternatif.',
    sizes: [],
    colors: ['Biru', 'Cokelat Bata', 'Strip Hitam Putih', 'Hijau Tosca'],
    badge: '3 pcs Rp100.000',
  },
  {
    id: 6,
    name: 'Gamis Simple Hijau Tosca',
    category: 'Gamis',
    price: 35000,
    image: 'https://saryaliasart.com/cdn/shop/files/ChatGPT_Image_25_2026_10_38_03.png?v=1777145903&width=720',
    description: 'Gamis simple dan elegan dengan referensi motif floral. Materi Queenshop menyebut bahan katun, lingkar dada 96 cm, dan satu pilihan warna. Harga Rp35.000. Foto ini merupakan alternatif visual, bukan foto asli produk.',
    sizes: ['LD 96 cm'],
    colors: ['Hijau Tosca'],
    badge: 'Rp35.000',
  },
];

const categories = ['Semua', 'Daster', 'Kulot', 'Gamis', 'Setelan', 'Atasan'];
const shippingFee = 15000;
const freeShippingMinimum = 250000;
const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
  throw new Error('Elemen aplikasi tidak ditemukan.');
}

let activeCategory = 'Semua';
let searchTerm = '';
let cart: CartItem[] = loadCart();
let modal: 'none' | 'cart' | 'detail' | 'checkout' | 'success' = 'none';
let checkoutStep: 'details' | 'payment' = 'details';
let selectedProductId = 1;
let detailSize = 'M';
let detailColor = 'Dusty Pink';
let paymentMethod = 'QRIS';
let checkoutData: CheckoutData = {
  name: '',
  phone: '',
  email: '',
  address: '',
  city: '',
  postal: '',
  note: '',
};
let completedOrder: {
  id: string;
  total: number;
  method: string;
  name: string;
} | null = null;
let toastMessage = '';
let toastTimer: number | undefined;

function loadCart(): CartItem[] {
  try {
    const saved = localStorage.getItem('queenshop-cart');
    return saved ? (JSON.parse(saved) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function saveCart(): void {
  try {
    localStorage.setItem('queenshop-cart', JSON.stringify(cart));
  } catch {
    // Keranjang tetap berfungsi selama halaman terbuka jika penyimpanan browser dibatasi.
  }
}

function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
}

function findProduct(id: number): Product | undefined {
  return products.find(product => product.id === id);
}

function cartCount(): number {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

function itemTotal(item: CartItem, product: Product): number {
  if (product.price === null) return 0;
  if (product.bundleQty && product.bundlePrice) {
    const bundles = Math.floor(item.quantity / product.bundleQty);
    const remainder = item.quantity % product.bundleQty;
    return bundles * product.bundlePrice + remainder * product.price;
  }
  return product.price * item.quantity;
}

function subtotal(): number {
  return cart.reduce((total, item) => {
    const product = findProduct(item.productId);
    return total + (product ? itemTotal(item, product) : 0);
  }, 0);
}
function deliveryCost(): number {
  return subtotal() >= freeShippingMinimum || subtotal() === 0
    ? 0
    : shippingFee;
}

function grandTotal(): number {
  return subtotal() + deliveryCost();
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>'"]/g, character => {    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;',
    };
    return entities[character] ?? character;
  });
}

function showToast(message: string): void {
  toastMessage = message;
  render();
  if (toastTimer) window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toastMessage = '';
    render();
  }, 2600);
}

function addToCart(productId: number, size = '—', color?: string): void {
  const product = findProduct(productId);
  if (!product || product.price === null) return;
  const chosenSize = size === '—' ? (product.sizes[0] ?? '—') : size;
  const chosenColor = color ?? product.colors[0] ?? '—';
  const existing = cart.find(
    item =>
      item.productId === productId &&
      item.size === chosenSize &&
      item.color === chosenColor
  );
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ productId, quantity: 1, size: chosenSize, color: chosenColor });
  }
  saveCart();
  modal = 'none';
  showToast(product.name + ' ditambahkan ke keranjang.');
}
function updateQuantity(index: number, change: number): void {
  const item = cart[index];
  if (!item) return;
  item.quantity += change;
  if (item.quantity <= 0) cart.splice(index, 1);
  saveCart();
  render();
}

function removeCartItem(index: number): void {
  cart.splice(index, 1);
  saveCart();
  render();
}

function productCard(product: Product): string {
  const priceLabel = product.price === null ? 'Harga belum tersedia' : formatRupiah(product.price);
  const promoLabel = product.promo
    ? '<p class="product-promo">' + escapeHtml(product.promo) + '</p>'
    : '';
  const addButton = product.price === null
    ? '<button class="add-button unavailable" type="button" disabled>Harga belum tersedia</button>'
    : '<button class="add-button" data-action="add" data-id="' + product.id + '"><span>+</span> Tambah ke keranjang</button>';

  return (
    '<article class="product-card">' +
    '<button class="product-image-button" data-action="detail" data-id="' +
    product.id +
    '" aria-label="Lihat detail ' +
    escapeHtml(product.name) +
    '">' +
    '<img class="product-image" src="' +
    product.image +
    '" alt="' +
    escapeHtml(product.name) +
    '" loading="lazy">' +
    (product.badge
      ? '<span class="product-badge">' + escapeHtml(product.badge) + '</span>'
      : '') +
    '<span class="quick-view">Lihat detail <span aria-hidden="true">↗</span></span>' +
    '</button>' +
    '<div class="product-info">' +
    '<p class="product-category">' +
    escapeHtml(product.category) +
    '</p>' +
    '<button class="product-name" data-action="detail" data-id="' +
    product.id +
    '">' +
    escapeHtml(product.name) +
    '</button>' +
    '<div class="product-price-row"><strong>' +
    priceLabel +
    '</strong></div>' +
    promoLabel +
    addButton +
    '</div>' +
    '</article>'
  );
}
function renderProducts(): string {
  const filtered = products.filter(product => {
    const matchesCategory =
      activeCategory === 'Semua' || product.category === activeCategory;
    const matchesSearch = (product.name + ' ' + product.category)
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    '<div class="product-grid">' +
    (filtered.length
      ? filtered.map(productCard).join('')
      : '<div class="empty-results"><span>⌕</span><h3>Produk tidak ditemukan</h3><p>Coba kata kunci atau kategori lain.</p></div>') +
    '</div>'
  );
}

function summaryRows(): string {
  return cart
    .map((item, index) => {
      const product = findProduct(item.productId);
      if (!product) return '';
      const variantLabel = [
        item.color !== '—' ? item.color : '',
        item.size !== '—' ? 'Ukuran ' + item.size : '',
      ].filter(Boolean).join(' · ');
      const bundleNote = product.bundleQty && item.quantity >= product.bundleQty
        ? '<span class="muted">Promo paket ' + product.bundleQty + ' pcs aktif</span>'
        : '';
      return (
        '<div class="cart-item">' +
        '<img src="' +
        product.image +
        '" alt="' +
        escapeHtml(product.name) +
        '">' +
        '<div class="cart-item-main">' +
        '<strong>' +
        escapeHtml(product.name) +
        '</strong>' +
        '<span class="muted">' +
        escapeHtml(variantLabel) +
        '</span>' +
        bundleNote +
        '<strong class="cart-item-price">' +
        formatRupiah(itemTotal(item, product)) +
        '</strong>' +
        '<div class="quantity-control">' +
        '<button data-action="quantity" data-index="' +
        index +
        '" data-change="-1" aria-label="Kurangi jumlah">−</button>' +
        '<span>' +
        item.quantity +
        '</span>' +
        '<button data-action="quantity" data-index="' +
        index +
        '" data-change="1" aria-label="Tambah jumlah">+</button>' +
        '</div>' +
        '</div>' +
        '<button class="remove-item" data-action="remove" data-index="' +
        index +
        '" aria-label="Hapus produk">×</button>' +
        '</div>'
      );
    })
    .join('');
}
function priceSummary(): string {
  return (
    '<div class="price-summary">' +
    '<div><span>Subtotal</span><strong>' +
    formatRupiah(subtotal()) +
    '</strong></div>' +
    '<div><span>Ongkos kirim</span><strong>' +
    (deliveryCost() === 0 ? 'Gratis' : formatRupiah(deliveryCost())) +
    '</strong></div>' +
    (subtotal() > 0 && subtotal() < freeShippingMinimum
      ? '<p class="shipping-hint">Belanja ' +
        formatRupiah(freeShippingMinimum - subtotal()) +
        ' lagi untuk mendapatkan gratis ongkir.</p>'
      : '') +
    '<div class="summary-total"><span>Total</span><strong>' +
    formatRupiah(grandTotal()) +
    '</strong></div>' +
    '</div>'
  );
}

function cartModal(): string {
  return (
    '<div class="overlay" data-overlay="true"><section class="drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">' +
    '<div class="modal-heading"><div><p class="eyebrow">PESANAN ANDA</p><h2 id="cart-title">Keranjang <span>(' +
    cartCount() +
    ')</span></h2></div>' +
    '<button class="close-button" data-action="close" aria-label="Tutup">×</button></div>' +
    (cart.length
      ? '<div class="cart-list">' +
        summaryRows() +
        '</div>' +
        priceSummary() +
        '<button class="primary-button full-button" data-action="checkout">Lanjut ke checkout <span>→</span></button>' +
        '<button class="text-button full-button" data-action="close">Lanjut belanja</button>'
      : '<div class="empty-cart"><div class="empty-bag">♡</div><h3>Keranjang masih kosong</h3><p>Pilih produk yang Anda sukai untuk memulai pesanan.</p><button class="primary-button" data-action="close">Jelajahi koleksi</button></div>') +
    '</section></div>'
  );}

function detailModal(): string {
  const product = findProduct(selectedProductId);
  if (!product) return '';
  const sizeChoices = product.sizes.length
    ? '<div class="choice-block"><span class="choice-label">Pilih ukuran</span><div class="choice-list">' +
      product.sizes.map(size =>
        '<button class="choice-chip ' +
        (detailSize === size ? 'selected' : '') +
        '" data-action="size" data-value="' +
        size +
        '">' +
        size +
        '</button>'
      ).join('') +
      '</div></div>'
    : '';
  const colorChoices = product.colors.length
    ? '<div class="choice-block"><span class="choice-label">Pilih motif / warna</span><div class="choice-list">' +
      product.colors.map(color =>
        '<button class="choice-chip ' +
        (detailColor === color ? 'selected' : '') +
        '" data-action="color" data-value="' +
        escapeHtml(color) +
        '">' +
        escapeHtml(color) +
        '</button>'
      ).join('') +
      '</div></div>'
    : '';
  const priceLabel = product.price === null ? 'Harga belum tersedia' : formatRupiah(product.price);
  const purchaseButton = product.price === null
    ? '<button class="primary-button full-button" type="button" disabled>Menunggu konfirmasi harga</button>'
    : '<button class="primary-button full-button" data-action="detail-add">Tambah ke keranjang <span>→</span></button>';

  return (
    '<div class="overlay" data-overlay="true"><section class="detail-modal" role="dialog" aria-modal="true" aria-labelledby="detail-title">' +
    '<button class="close-button detail-close" data-action="close" aria-label="Tutup">×</button>' +
    '<div class="detail-layout"><img class="detail-photo" src="' +
    product.image +
    '" alt="' +
    escapeHtml(product.name) +
    '">' +
    '<div class="detail-copy"><p class="eyebrow">' +
    escapeHtml(product.category) +
    '</p><h2 id="detail-title">' +
    escapeHtml(product.name) +
    '</h2>' +
    '<strong class="detail-price">' +
    priceLabel +
    '</strong>' +
    (product.promo ? '<p class="product-promo">' + escapeHtml(product.promo) + '</p>' : '') +
    '<p class="detail-description">' +
    escapeHtml(product.description) +
    '</p>' +
    sizeChoices +
    colorChoices +
    purchaseButton +
    '<p class="small-note">Foto pada katalog merupakan foto alternatif untuk referensi. Warna, motif, bahan, dan detail produk asli dapat berbeda. Konfirmasikan ketersediaan sebelum pembelian.</p>' +
    '</div></div></section></div>'
  );
}
function checkoutModal(): string {
  const fields = checkoutData;
  const stepHeader =
    '<div class="checkout-steps"><span class="' +
    (checkoutStep === 'details' ? 'active' : 'done') +
    '"><i>1</i> Pengiriman</span><span class="' +
    (checkoutStep === 'payment' ? 'active' : '') +
    '"><i>2</i> Pembayaran</span></div>';
  const orderAside =
    '<aside class="checkout-aside"><p class="eyebrow">RINGKASAN PESANAN</p><h3>Pesanan Anda</h3>' +
    '<div class="mini-order-list">' +
    cart
      .map(item => {
        const product = findProduct(item.productId);
        return product
          ? '<div><span>' +
              escapeHtml(product.name) +
              ' × ' +
              item.quantity +
              '</span><strong>' +
              formatRupiah(itemTotal(item, product)) +
              '</strong></div>'
          : '';
      })
      .join('') +
    '</div>' +
    priceSummary() +
    '<p class="secure-note">♧ Informasi pesanan hanya digunakan untuk simulasi checkout ini.</p></aside>';

  const details =
    '<form id="checkout-form" class="checkout-form">' +
    '<div class="form-title"><p class="eyebrow">LANGKAH 1</p><h2>Informasi pengiriman</h2><p>Masukkan data penerima untuk melanjutkan pesanan.</p></div>' +
    '<div class="form-grid">' +
    '<label>Nama lengkap<input name="name" autocomplete="name" required value="' +
    escapeHtml(fields.name) +
    '" placeholder="Nama penerima"></label>' +
    '<label>Nomor WhatsApp<input name="phone" type="tel" autocomplete="tel" required value="' +
    escapeHtml(fields.phone) +
    '" placeholder="08xxxxxxxxxx" pattern="[0-9+() -]{9,18}"></label>' +
    '<label class="span-two">Email (opsional)<input name="email" type="email" autocomplete="email" value="' +
    escapeHtml(fields.email) +
    '" placeholder="nama@email.com"></label>' +
    '<label class="span-two">Alamat lengkap<textarea name="address" autocomplete="street-address" required rows="3" placeholder="Nama jalan, nomor rumah, RT/RW, patokan">' +
    escapeHtml(fields.address) +
    '</textarea></label>' +
    '<label>Kota / Kabupaten<input name="city" autocomplete="address-level2" required value="' +
    escapeHtml(fields.city) +
    '" placeholder="Contoh: Makassar"></label>' +
    '<label>Kode pos<input name="postal" inputmode="numeric" autocomplete="postal-code" required value="' +
    escapeHtml(fields.postal) +
    '" placeholder="Kode pos"></label>' +
    '<label class="span-two">Catatan untuk penjual (opsional)<textarea name="note" rows="2" placeholder="Catatan tambahan">' +
    escapeHtml(fields.note) +
    '</textarea></label>' +
    '</div><div class="form-actions"><button type="button" class="text-button" data-action="back-cart">← Kembali ke keranjang</button><button type="submit" class="primary-button">Lanjut ke pembayaran <span>→</span></button></div>' +
    '</form>';

  const methods = [
    { name: 'QRIS', detail: 'Pembayaran kode QR (simulasi)', icon: '▦' },
    {
      name: 'Transfer Bank',
      detail: 'Transfer melalui rekening bank (simulasi)',
      icon: '▤',
    },
    { name: 'E-Wallet', detail: 'Dompet digital (simulasi)', icon: '◈' },
    {
      name: 'COD',
      detail: 'Bayar saat pesanan diterima (simulasi)',
      icon: '⌂',
    },
  ];
  const payment =
    '<div class="checkout-form"><div class="form-title"><p class="eyebrow">LANGKAH 2</p><h2>Pilih metode pembayaran</h2><p>Pilih metode untuk menyelesaikan simulasi pesanan.</p></div>' +
    '<div class="payment-options">' +
    methods
      .map(
        method =>
          '<button class="payment-option ' +
          (paymentMethod === method.name ? 'selected' : '') +
          '" data-action="payment-method" data-value="' +
          method.name +
          '">' +
          '<span class="payment-icon">' +
          method.icon +
          '</span><span><strong>' +
          method.name +
          '</strong><small>' +
          method.detail +
          '</small></span>' +
          '<span class="radio-dot"></span></button>'
      )
      .join('') +
    '</div>' +
    '<div class="demo-payment-note"><strong>Catatan pembayaran</strong><p>Ini adalah demonstrasi. Tidak ada tagihan, transfer, pemindaian QR, atau pemotongan saldo yang benar-benar terjadi. Pembayaran nyata memerlukan integrasi payment gateway Queenshop.</p></div>' +
    '<div class="form-actions"><button type="button" class="text-button" data-action="back-details">← Ubah data pengiriman</button><button type="button" class="primary-button" data-action="place-order">Buat pesanan <span>→</span></button></div>' +
    '</div>';

  return (
    '<div class="overlay checkout-overlay" data-overlay="true"><section class="checkout-modal" role="dialog" aria-modal="true" aria-labelledby="checkout-title">' +
    '<div class="modal-heading"><div><p class="eyebrow">QUEENSHOP CHECKOUT</p><h2 id="checkout-title">Selesaikan pesanan</h2></div><button class="close-button" data-action="close" aria-label="Tutup">×</button></div>' +
    stepHeader +
    '<div class="checkout-layout">' +
    (checkoutStep === 'details' ? details : payment) +
    orderAside +
    '</div>' +
    '</section></div>'
  );
}

function successModal(): string {
  const order = completedOrder;
  if (!order) return '';
  return (
    '<div class="overlay" data-overlay="true"><section class="success-modal" role="dialog" aria-modal="true" aria-labelledby="success-title">' +
    '<div class="success-mark">✓</div><p class="eyebrow">PESANAN TERCATAT</p><h2 id="success-title">Terima kasih, ' +
    escapeHtml(order.name) +
    '!</h2>' +
    '<p class="success-copy">Pesanan demonstrasi Anda berhasil dibuat. Status pembayaran belum terhubung ke sistem pembayaran nyata.</p>' +
    '<div class="order-number"><span>Nomor pesanan</span><strong>' +
    escapeHtml(order.id) +
    '</strong></div>' +
    '<div class="success-total"><span>Total pesanan</span><strong>' +
    formatRupiah(order.total) +
    '</strong><small>Metode: ' +
    escapeHtml(order.method) +
    ' · Simulasi</small></div>' +
    '<div class="demo-payment-note"><strong>Langkah berikutnya</strong><p>Untuk menerima pesanan sungguhan, admin Queenshop perlu mengonfirmasi stok, biaya kirim, dan pembayaran melalui kanal resmi.</p></div>' +
    '<button class="primary-button full-button" data-action="finish">Kembali ke halaman utama</button>' +
    '</section></div>'
  );
}

function render(): void {
  const filteredCount = products.filter(product => {
    const matchesCategory =
      activeCategory === 'Semua' || product.category === activeCategory;
    return (
      matchesCategory &&
      (product.name + ' ' + product.category)
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );  }).length;

  app!.innerHTML =
    '<div class="announcement">Koleksi fashion wanita pilihan · Belanja lebih mudah bersama Queenshop</div>' +
    '<header class="site-header"><a href="#home" class="brand" aria-label="Queenshop beranda"><span class="brand-mark">Q</span><span>QUEEN<span class="brand-accent">SHOP</span><small>WOMAN DAILY WEAR</small></span></a>' +
    '<nav class="desktop-nav" aria-label="Navigasi utama"><a href="#home">Beranda</a><a href="#collection">Koleksi</a><a href="#about">Tentang</a></nav>' +
    '<div class="header-actions"><label class="header-search"><span>⌕</span><input data-search type="search" placeholder="Cari produk..." value="' +
    escapeHtml(searchTerm) +
    '" aria-label="Cari produk"></label>' +
    '<button class="cart-button" data-action="open-cart" aria-label="Buka keranjang"><span class="bag-icon">♧</span><span class="cart-label">Keranjang</span><b class="cart-count">' +
    cartCount() +
    '</b></button></div>' +
    '</header>' +
    '<main id="home">' +
    '<section class="hero"><div class="hero-content"><p class="eyebrow">YOUR STYLE, YOUR STORY</p><h1>Temukan gaya yang terasa <em>seperti dirimu.</em></h1><p class="hero-description">Pilihan fashion wanita untuk menemani rutinitas, waktu santai, dan setiap momen istimewa.</p><div class="hero-actions"><a class="primary-button" href="#collection">Jelajahi koleksi <span>→</span></a><span class="hero-caption">Koleksi pilihan Queenshop</span></div><div class="hero-stat"><strong>01</strong><span>Style sederhana,<br>pilihan lebih bermakna.</span></div></div>' +
    '<div class="hero-visual"><img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=90" alt="Inspirasi gaya fashion wanita"><div class="hero-note"><span class="note-dot"></span><span>Everyday pieces<br><strong>Made for your days</strong></span></div><div class="hero-index">Q. / 2026</div></div>' +
    '</section>' +
    '<section class="benefits" aria-label="Keunggulan toko"><div><span class="benefit-icon">✳</span><span><strong>Kurasi pilihan</strong><small>Produk fashion wanita</small></span></div><div><span class="benefit-icon">◇</span><span><strong>Checkout praktis</strong><small>Alur pemesanan sederhana</small></span></div><div><span class="benefit-icon">♡</span><span><strong>Ramah pelanggan</strong><small>Informasi produk yang jelas</small></span></div></section>' +
    '<section class="collection section-wrap" id="collection"><div class="section-heading"><div><p class="eyebrow">THE QUEENSHOP EDIT</p><h2>Koleksi untuk setiap <em>hari.</em></h2><p>Temukan pilihan yang sesuai dengan gaya dan kebutuhanmu.</p></div><span class="collection-count">0' +
    products.length +
    ' <small>ITEM PILIHAN</small></span></div>' +
    '<div class="collection-tools"><div class="category-tabs">' +
    categories
      .map(
        category =>
          '<button class="category-tab ' +
          (activeCategory === category ? 'active' : '') +
          '" data-action="category" data-value="' +
          category +
          '">' +
          category +
          '</button>'
      )
      .join('') +
    '</div><span class="result-count">' +
    filteredCount +
    ' produk</span></div>' +
    renderProducts() +
    '<p class="catalog-disclaimer">Harga mengikuti materi promosi Queenshop yang diberikan. Foto katalog merupakan foto alternatif untuk referensi; warna, motif, dan detail barang asli dapat berbeda. Stok dan harga setelan pendek perlu dikonfirmasi.</p>' +
    '</section>' +
    '<section class="editorial" id="about"><div class="editorial-image"><img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85" alt="Pilihan busana untuk keseharian" loading="lazy"></div><div class="editorial-copy"><p class="eyebrow">ABOUT QUEENSHOP</p><h2>Fashion yang dekat dengan <em>keseharian.</em></h2><p>Queenshop merupakan konsep usaha fashion wanita yang mengembangkan pemasaran melalui kanal digital. Kami ingin membantu pelanggan menemukan pilihan busana dengan informasi produk yang mudah dipahami.</p><a href="#collection" class="editorial-link">Lihat pilihan produk <span>→</span></a></div></section>' +
    '<section class="newsletter"><p class="eyebrow">STAY IN THE LOOP</p><h2>Temukan inspirasi gaya berikutnya.</h2><p>Jelajahi katalog Queenshop dan pilih produk yang sesuai dengan kebutuhanmu.</p><a class="outline-button" href="#collection">Lihat katalog <span>→</span></a></section>' +
    '</main>' +
    '<footer class="site-footer"><a href="#home" class="brand footer-brand"><span class="brand-mark">Q</span><span>QUEEN<span class="brand-accent">SHOP</span><small>WOMAN DAILY WEAR</small></span></a><p>Fashion wanita untuk keseharian.</p><span>© 2026 Queenshop. Katalog demonstrasi.</span></footer>' +
    (modal === 'cart' ? cartModal() : '') +
    (modal === 'detail' ? detailModal() : '') +
    (modal === 'checkout' ? checkoutModal() : '') +
    (modal === 'success' ? successModal() : '') +
    (toastMessage
      ? '<div class="toast" role="status">' +
        escapeHtml(toastMessage) +
        '</div>'
      : '');
}

document.addEventListener('click', event => {
  const target = event.target as HTMLElement;
  const actionElement = target.closest<HTMLElement>('[data-action]');
  if (actionElement) {
    const action = actionElement.dataset.action;
    const id = Number(actionElement.dataset.id);
    const index = Number(actionElement.dataset.index);
    const value = actionElement.dataset.value ?? '';

    if (action === 'open-cart') {
      modal = 'cart';
      render();
    } else if (action === 'close') {
      modal = 'none';
      render();
    } else if (action === 'add') {
      addToCart(id);
    } else if (action === 'detail') {
      const product = findProduct(id);
      if (product) {
        selectedProductId = id;
        detailSize = product.sizes[0] ?? '—';
        detailColor = product.colors[0] ?? '—';
        modal = 'detail';
        render();
      }
    } else if (action === 'detail-add') {
      addToCart(selectedProductId, detailSize, detailColor);
    } else if (action === 'size') {
      detailSize = value;
      render();
    } else if (action === 'color') {
      detailColor = value;
      render();
    } else if (action === 'quantity') {
      updateQuantity(index, Number(actionElement.dataset.change));
    } else if (action === 'remove') {
      removeCartItem(index);
    } else if (action === 'category') {
      activeCategory = value;
      render();
    } else if (action === 'checkout') {
      if (cart.length) {
        checkoutStep = 'details';
        modal = 'checkout';
        render();
      }
    } else if (action === 'back-cart') {
      modal = 'cart';
      render();
    } else if (action === 'back-details') {
      checkoutStep = 'details';
      render();
    } else if (action === 'payment-method') {
      paymentMethod = value;
      render();
    } else if (action === 'place-order') {
      if (!cart.length) {
        modal = 'cart';
        render();
        return;
      }
      const orderId = 'QS' + Date.now().toString().slice(-8);
      completedOrder = {
        id: orderId,
        total: grandTotal(),
        method: paymentMethod,
        name: checkoutData.name || 'Pelanggan',
      };
      try {
        const orders = JSON.parse(
          localStorage.getItem('queenshop-orders') ?? '[]'
        ) as unknown[];
        orders.push({
          ...completedOrder,
          createdAt: new Date().toISOString(),
          items: cart,
        });
        localStorage.setItem('queenshop-orders', JSON.stringify(orders));
      } catch {
        // Konfirmasi tetap ditampilkan meskipun penyimpanan riwayat dibatasi browser.
      }
      cart = [];
      saveCart();
      modal = 'success';
      render();
    } else if (action === 'finish') {
      modal = 'none';
      checkoutData = {
        name: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        postal: '',
        note: '',
      };
      render();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    return;
  }

  if (target.matches('[data-overlay="true"]')) {
    modal = 'none';
    render();
  }
});

document.addEventListener('input', event => {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement;
  if (target.matches('[data-search]')) {
    searchTerm = target.value;
    const cursor = target.selectionStart;
    render();
    const search = app!.querySelector<HTMLInputElement>('[data-search]');
    search?.focus();
    if (cursor !== null) search?.setSelectionRange(cursor, cursor);
  } else if (
    target.form?.id === 'checkout-form' &&
    target.name in checkoutData
  ) {
    (checkoutData as unknown as Record<string, string>)[target.name] =
      target.value;
  }
});

document.addEventListener('change', event => {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement;
  if (target.form?.id === 'checkout-form' && target.name in checkoutData) {
    (checkoutData as unknown as Record<string, string>)[target.name] =
      target.value;
  }
});

document.addEventListener('submit', event => {
  const target = event.target as HTMLFormElement;
  if (target.id !== 'checkout-form') return;
  event.preventDefault();
  if (!target.reportValidity()) return;
  const formData = new FormData(target);
  checkoutData = {
    name: String(formData.get('name') ?? ''),
    phone: String(formData.get('phone') ?? ''),
    email: String(formData.get('email') ?? ''),    address: String(formData.get('address') ?? ''),
    city: String(formData.get('city') ?? ''),
    postal: String(formData.get('postal') ?? ''),
    note: String(formData.get('note') ?? ''),
  };
  checkoutStep = 'payment';
  render();
});

render();
