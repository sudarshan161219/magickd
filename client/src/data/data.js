const dummyImgs = [
  {
    name: "facebook",
    img: "../assets/fb.svg",
  },
  {
    name: "instagram",
    img: "../assets/insta.svg",
  },
  {
    name: "google",
    img: "../assets/google.svg",
  },
  {
    name: "twitter",
    img:"../assets/x.svg",
  },
  {
    name: "youtube",
    img: "../assets/yt.svg",
  },
  {
    name: "thread",
    img: "../assets/th.svg",
  },
];

const testimonials = [
  {
    name: "Ankit Sabla",
    text: "Magickd created a logo for my Jewellery business. They were very professional, prompt and a pleasure to work with from start to finish. They came up with a terrific logo that I am very happy with and proud to post it everywhere. Thank you Team Magickd.",
    shopName: "SVG JEWELERS",
  },
  {
    name: "Mohammed Yacoob",
    text: "It was a pleasure working with magickd company! We got the best menu design for our restaurant as expected, And may be better then what we expected , they are best in thier profession! Must try them for all your design needs! All the best guys , keep it up! Bingo!",
    shopName: "DUGOUT FOOD TRUCK",
  },
  {
    name: "Ujjwal Sharma",
    text: "Thanks Team Magickd for giving my profession a new identity. I am glad and satisfied with the services provided.",
    shopName: "US DESIGNS",
  },
];

const blog = [
  {
    name: "The Art of Cooking",
    date: "2023-10-31",
    author: "Chef Alice",
    content:
      "In this blog, I'll share some of my favorite cooking tips and recipes.",
    image:
      "https://images.unsplash.com/photo-1698734387189-b90c7dacef27?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Traveling Adventures",
    date: "2023-10-30",
    author: "Wanderlust Explorer",
    content:
      "Join me on a journey to discover the world's hidden gems and beautiful destinations.",
    image:
      "https://images.unsplash.com/photo-1698734387189-b90c7dacef27?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Tech Trends 2023",
    date: "2023-10-29",
    author: "Tech Guru",
    content:
      "Stay updated on the latest technology trends and innovations that are shaping our future.",
    image:
      "https://images.unsplash.com/photo-1698734387189-b90c7dacef27?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Fitness and Health",
    date: "2023-10-28",
    author: "Fitness Enthusiast",
    content:
      "Get motivated and learn about the best fitness routines and health tips for a healthier lifestyle.",
    image:
      "https://images.unsplash.com/photo-1698734387189-b90c7dacef27?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Wildlife Photography",
    date: "2023-10-27",
    author: "Nature Lover",
    content:
      "Explore the wonders of nature through stunning wildlife photography and stories from the wild.",
    image:
      "https://images.unsplash.com/photo-1698734387189-b90c7dacef27?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Financial Insights",
    date: "2023-10-26",
    author: "Financial Advisor",
    content:
      "Gain valuable insights into managing your finances, investments, and achieving your financial goals.",
    image:
      "https://images.unsplash.com/photo-1698734387189-b90c7dacef27?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Home Improvement Tips",
    date: "2023-10-25",
    author: "DIY Enthusiast",
    content:
      "Discover practical tips and DIY projects to enhance your home's comfort and style.",
    image:
      "https://images.unsplash.com/photo-1698734387189-b90c7dacef27?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Fashion Trends 2023",
    date: "2023-10-24",
    author: "Fashionista",
    content:
      "Stay in vogue with the latest fashion trends and style inspiration for every season.",
    image:
      "https://images.unsplash.com/photo-1698734387189-b90c7dacef27?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Gaming World",
    date: "2023-10-23",
    author: "Gamer Pro",
    content:
      "Dive into the exciting world of gaming with reviews, updates, and strategies for your favorite games.",
    image:
      "https://images.unsplash.com/photo-1698734387189-b90c7dacef27?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Movie Buff Corner",
    date: "2023-10-22",
    author: "Cinephile",
    content:
      "Explore the world of cinema with movie reviews, classics, and recommendations for film enthusiasts.",
    image:
      "https://images.unsplash.com/photo-1698734387189-b90c7dacef27?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];


const userPurchasehistory = [
  { n: "xyz_product", date: "dd/mm/yyyy", total: 100, PaymentType: "paypal" },
  {
    n: "xyz_product",
    date: "dd/mm/yyyy",
    total: 100,
    PaymentType: "net banking",
  },
  { n: "xyz_product", date: "dd/mm/yyyy", total: 100, PaymentType: "upi" },
  { n: "xyz_product", date: "dd/mm/yyyy", total: 100, PaymentType: "paypal" },
  {
    n: "xyz_product",
    date: "dd/mm/yyyy",
    total: 100,
    PaymentType: "net banking",
  },
];

export { blog, dummyImgs, testimonials, userPurchasehistory };
