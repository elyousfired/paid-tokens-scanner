// Service for UsePaid tokens data, fees, revenue, and 14-day expiration tracking

export const VERIFIED_USEPAID_TOP_TOKENS = [
  {
    rank: 1,
    name: 'Elon Coin',
    symbol: 'ELON',
    address: 'GY9mZf91zxpump449f823j8f23f8h238f28h238zxpump',
    handle: '@elonmusk',
    recipientName: 'Elon Musk',
    mcap: 3600000,
    volume24h: 4850000,
    price: 0.0036,
    priceChange24h: 18.5,
    sentFees: 82334.64,
    owedFees: 11233.06,
    totalRevenue: 93567.70,
    revenue24h: 38800.00,
    burnContribution: 18713.54,
    burnPaidAmount: 575800,
    expiresInHours: 38.5, // 14-day countdown window
    status: 'Expiring Soon',
    claimedByOwner: false
  },
  {
    rank: 2,
    name: 'Solana Cat',
    symbol: 'SOLCAT',
    address: '9U1f18P69bh1f8h238fh238fh238fh238f82h38f9bh1',
    handle: '@solana',
    recipientName: 'Solana Official',
    mcap: 984800,
    volume24h: 1940000,
    price: 0.000985,
    priceChange24h: -4.2,
    sentFees: 55738.40,
    owedFees: 19.21,
    totalRevenue: 55757.61,
    revenue24h: 15520.00,
    burnContribution: 11151.52,
    burnPaidAmount: 343100,
    expiresInHours: 112.0,
    status: 'Claimed',
    claimedByOwner: true
  },
  {
    rank: 3,
    name: 'Kevin Startup Fund',
    symbol: 'KEVIN',
    address: 'GZik7vv8A3iEf8h238fh238fh238fh238f82h38fv8A3',
    handle: '@Kevin',
    recipientName: 'Kevin Bass',
    mcap: 39800,
    volume24h: 345000,
    price: 0.0000398,
    priceChange24h: 55.4,
    sentFees: 32136.17,
    owedFees: 1828.33,
    totalRevenue: 33964.50,
    revenue24h: 2760.00,
    burnContribution: 6792.90,
    burnPaidAmount: 209012,
    expiresInHours: 64.0,
    status: 'Expiring Soon',
    claimedByOwner: false
  },
  {
    rank: 4,
    name: 'Nikita Boar',
    symbol: 'BOAR',
    address: 'Hk8UiqXmpaidf8h238fh238fh238fh238f82h38fXmpaid',
    handle: '@nikitabier',
    recipientName: 'Nikita Bier',
    mcap: 233400,
    volume24h: 1120000,
    price: 0.0002334,
    priceChange24h: 12.8,
    sentFees: 32071.21,
    owedFees: 2798.67,
    totalRevenue: 34869.88,
    revenue24h: 8960.00,
    burnContribution: 6973.97,
    burnPaidAmount: 214580,
    expiresInHours: 18.2, // Huge burn coming!
    status: 'Expiring Soon',
    claimedByOwner: false
  },
  {
    rank: 5,
    name: 'WANG',
    symbol: 'WANG',
    address: 'JoBxYVZ2pumpf8h238fh238fh238fh238f82h38fZ2pump',
    handle: '@HumaneWorld',
    recipientName: 'Humane World for Animals',
    mcap: 59100,
    volume24h: 420000,
    price: 0.0000591,
    priceChange24h: -1.5,
    sentFees: 21104.82,
    owedFees: 346.57,
    totalRevenue: 21451.39,
    revenue24h: 3360.00,
    burnContribution: 4290.27,
    burnPaidAmount: 132008,
    expiresInHours: 190.0,
    status: 'Pending Window',
    claimedByOwner: false
  },
  {
    rank: 6,
    name: 'TRUMP',
    symbol: 'TRUMP',
    address: 'AL44bCeGSCeWf8h238fh238fh238fh238f82h38feGSCeW',
    handle: '@realDonaldTrump',
    recipientName: 'Donald J. Trump',
    mcap: 73900,
    volume24h: 980000,
    price: 0.0000739,
    priceChange24h: 42.1,
    sentFees: 20224.19,
    owedFees: 1254.75,
    totalRevenue: 21478.94,
    revenue24h: 7840.00,
    burnContribution: 4295.78,
    burnPaidAmount: 132177,
    expiresInHours: 24.5, // Imminent burn
    status: 'Expiring Soon',
    claimedByOwner: false
  },
  {
    rank: 7,
    name: 'Make A Wish',
    symbol: 'WISH',
    address: '4qpraJab5a3Uf8h238fh238fh238fh238f82h38fab5a3U',
    handle: '@MakeAWish',
    recipientName: 'Make-A-Wish America',
    mcap: 173200,
    volume24h: 840000,
    price: 0.0001732,
    priceChange24h: 8.9,
    sentFees: 18375.68,
    owedFees: 2969.16,
    totalRevenue: 21344.84,
    revenue24h: 6720.00,
    burnContribution: 4268.96,
    burnPaidAmount: 131352,
    expiresInHours: 14.0, // Imminent burn
    status: 'Expiring Soon',
    claimedByOwner: false
  },
  {
    rank: 8,
    name: 'Colosseum',
    symbol: 'COLOSSEUM',
    address: 'ChGkEmowQtcof8h238fh238fh238fh238f82h38fowQtco',
    handle: '@SteveWillDoIt',
    recipientName: 'Steve Will Do It',
    mcap: 123500,
    volume24h: 720000,
    price: 0.0001235,
    priceChange24h: -11.2,
    sentFees: 17279.75,
    owedFees: 2910.84,
    totalRevenue: 20190.59,
    revenue24h: 5760.00,
    burnContribution: 4038.11,
    burnPaidAmount: 124249,
    expiresInHours: 72.0,
    status: 'Pending Window',
    claimedByOwner: false
  },
  {
    rank: 9,
    name: 'Grok Coin',
    symbol: 'GROK',
    address: '5A6CJfe7tS5af8h238fh238fh238fh238f82h38fe7tS5a',
    handle: '@grok',
    recipientName: 'Grok (xAI)',
    mcap: 89100,
    volume24h: 610000,
    price: 0.0000891,
    priceChange24h: 31.7,
    sentFees: 12383.91,
    owedFees: 1254.96,
    totalRevenue: 13638.87,
    revenue24h: 4880.00,
    burnContribution: 2727.77,
    burnPaidAmount: 83931,
    expiresInHours: 42.0,
    status: 'Expiring Soon',
    claimedByOwner: false
  },
  {
    rank: 10,
    name: 'dog',
    symbol: 'DOG',
    address: '7xK9pL22f98hf8h238fh238fh238fh238f82h38f22f98h',
    handle: '@elonmusk',
    recipientName: 'Elon Musk',
    mcap: 188200,
    volume24h: 530000,
    price: 0.0001882,
    priceChange24h: 5.1,
    sentFees: 11923.16,
    owedFees: 1820.00,
    totalRevenue: 13743.16,
    revenue24h: 4240.00,
    burnContribution: 2748.63,
    burnPaidAmount: 84573,
    expiresInHours: 56.0,
    status: 'Expiring Soon',
    claimedByOwner: false
  },
  {
    rank: 11,
    name: 'PMARCA',
    symbol: 'PMARCA',
    address: '9xM32f8h238fh238fh238fh238f82h38f82h38f82h38f',
    handle: '@pmarca',
    recipientName: 'Marc Andreessen',
    mcap: 65400,
    volume24h: 440000,
    price: 0.0000654,
    priceChange24h: 14.2,
    sentFees: 10526.94,
    owedFees: 940.00,
    totalRevenue: 11466.94,
    revenue24h: 3520.00,
    burnContribution: 2293.38,
    burnPaidAmount: 70565,
    expiresInHours: 98.0,
    status: 'Pending Window',
    claimedByOwner: false
  },
  {
    rank: 12,
    name: 'Alx',
    symbol: 'ALX',
    address: '2bM44f8h238fh238fh238fh238f82h38f82h38f82h38f',
    handle: '@alx',
    recipientName: 'ALX',
    mcap: 45100,
    volume24h: 320000,
    price: 0.0000451,
    priceChange24h: -3.8,
    sentFees: 8466.40,
    owedFees: 420.00,
    totalRevenue: 8886.40,
    revenue24h: 2560.00,
    burnContribution: 1777.28,
    burnPaidAmount: 54685,
    expiresInHours: 144.0,
    status: 'Pending Window',
    claimedByOwner: false
  }
];

// Generate additional realistic tokens to complete the Top 100 ranking
const ADDITIONAL_INFLUENCERS = [
  { name: 'Vitalik Buterin', handle: '@VitalikButerin', ticker: 'VITALIK' },
  { name: 'Brian Armstrong', handle: '@brian_armstrong', ticker: 'BRIAN' },
  { name: 'Toly Yakovenko', handle: '@aeyakovenko', ticker: 'TOLY' },
  { name: 'Raj Gokal', handle: '@rajgokal', ticker: 'RAJ' },
  { name: 'Arthur Hayes', handle: '@CryptoHayes', ticker: 'HAYES' },
  { name: 'Cobie', handle: '@cobie', ticker: 'COBIE' },
  { name: 'Ansem', handle: '@blknoiz06', ticker: 'ANSEM' },
  { name: 'Mert Mumtaz', handle: '@0xMert_', ticker: 'MERT' },
  { name: 'Nayib Bukele', handle: '@nayibbukele', ticker: 'BUKELE' },
  { name: 'Michael Saylor', handle: '@saylor', ticker: 'SAYLOR' }
];

export function generateTop100RevenueTokens() {
  const list = [...VERIFIED_USEPAID_TOP_TOKENS];
  let currentRank = list.length + 1;

  while (list.length < 100) {
    const inf = ADDITIONAL_INFLUENCERS[(list.length) % ADDITIONAL_INFLUENCERS.length];
    const modifier = Math.floor(list.length / ADDITIONAL_INFLUENCERS.length) + 1;
    const mcap = Math.floor(Math.random() * 80000 + 10000);
    const volume24h = Math.floor(mcap * (Math.random() * 4 + 1.2));
    const revenue24h = parseFloat((volume24h * 0.008).toFixed(2));
    const totalRev = parseFloat((revenue24h * (Math.random() * 5 + 3)).toFixed(2));
    const owed = Math.random() > 0.3 ? parseFloat((totalRev * (Math.random() * 0.4 + 0.1)).toFixed(2)) : 0;
    const sent = parseFloat((totalRev - owed).toFixed(2));
    const burnContrib = parseFloat((totalRev * 0.20).toFixed(2));
    const burnPaid = Math.floor(burnContrib / 0.0325);
    const hours = parseFloat((Math.random() * 300 + 5).toFixed(1));
    const claimed = owed === 0;

    list.push({
      rank: currentRank++,
      name: `${inf.name} ${modifier > 1 ? '#' + modifier : ''}`,
      symbol: `${inf.ticker}${modifier > 1 ? modifier : ''}`,
      address: `SoL${Math.random().toString(36).substring(2, 10)}${inf.ticker}pump`,
      handle: inf.handle,
      recipientName: inf.name,
      mcap,
      volume24h,
      price: parseFloat((mcap / 1000000000).toFixed(8)),
      priceChange24h: parseFloat(((Math.random() * 80) - 30).toFixed(1)),
      sentFees: sent,
      owedFees: owed,
      totalRevenue: totalRev,
      revenue24h,
      burnContribution: burnContrib,
      burnPaidAmount: burnPaid,
      expiresInHours: hours,
      status: claimed ? 'Claimed' : (hours < 48 ? 'Expiring Soon' : 'Pending Window'),
      claimedByOwner: claimed
    });
  }

  return list.sort((a, b) => b.totalRevenue - a.totalRevenue).map((item, idx) => ({
    ...item,
    rank: idx + 1
  }));
}
