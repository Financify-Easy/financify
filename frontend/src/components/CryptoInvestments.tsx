import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Star, StarOff, TrendingUp, Bell, Hash } from "lucide-react";

const COINS = [
  { id: "bitcoin", name: "Bitcoin", symbol: "BTC" },
  { id: "ethereum", name: "Ethereum", symbol: "ETH" },
  { id: "solana", name: "Solana", symbol: "SOL" },
];

export function CryptoInvestments() {
  const [hash, setHash] = useState("");
  const [portfolio, setPortfolio] = useState<any>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [liveCryptos, setLiveCryptos] = useState<any[]>([]);

  // Fetch live crypto data from CoinGecko
  useEffect(() => {
    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${COINS.map(c => c.id).join(",")}&sparkline=true`
    )
      .then(res => res.json())
      .then(data => setLiveCryptos(data));
  }, []);

  // Mock: fetch portfolio by hash
  const handleTrackPortfolio = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, fetch from blockchain API
    setPortfolio({
      address: hash,
      assets: [
        { symbol: "BTC", amount: 0.5, value: 33500 },
        { symbol: "ETH", amount: 2, value: 7000 },
      ],
      total: 40500,
      change: 3.2,
    });
  };

  // Star/unstar favorite cryptos
  const toggleFavorite = (id: string) => {
    setFavorites(favs => favs.includes(id) ? favs.filter(f => f !== id) : [...favs, id]);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-yellow-100 rounded-lg">
          <TrendingUp className="w-8 h-8 text-yellow-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Crypto Investments</h1>
          <p className="text-gray-600">Track trending cryptos, your portfolio, and favorite coins</p>
        </div>
      </div>

      {/* Trending Crypto Charts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Trending Cryptos
          </CardTitle>
          <CardDescription>Live prices and mini charts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {liveCryptos.length === 0 && (
              <div className="col-span-3 text-center text-gray-400">Loading live crypto data...</div>
            )}
            {liveCryptos.map(coin => (
              <div key={coin.id} className="p-4 bg-gray-50 rounded-lg border flex flex-col gap-2 relative">
                <div className="flex items-center gap-2">
                  <img src={coin.image} alt={coin.name} className="w-6 h-6 rounded-full" />
                  <span className="font-bold text-lg">{coin.name}</span>
                  <span className="text-xs text-gray-500">({coin.symbol.toUpperCase()})</span>
                  <button
                    className="ml-auto"
                    onClick={() => toggleFavorite(coin.id)}
                    title={favorites.includes(coin.id) ? "Unstar" : "Star"}
                  >
                    {favorites.includes(coin.id) ? (
                      <Star className="w-5 h-5 text-yellow-500 fill-yellow-400" />
                    ) : (
                      <StarOff className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-bold">${coin.current_price.toLocaleString()}</span>
                  <span className={coin.price_change_percentage_24h >= 0 ? "text-green-600" : "text-red-600"}>
                    {coin.price_change_percentage_24h >= 0 ? "+" : ""}{coin.price_change_percentage_24h?.toFixed(2)}%
                  </span>
                </div>
                {/* Mini chart using sparkline */}
                <div className="h-12 flex items-end gap-1">
                  {coin.sparkline_in_7d?.price?.slice(-12).map((v: number, i: number, arr: number[]) => {
                    const min = Math.min(...arr);
                    const max = Math.max(...arr);
                    const pct = (v - min) / (max - min + 0.0001);
                    return (
                      <div
                        key={i}
                        className="w-3 rounded bg-gradient-to-t from-yellow-200 to-yellow-400"
                        style={{ height: `${10 + pct * 40}px` }}
                      />
                    );
                  })}
                </div>
                {favorites.includes(coin.id) && (
                  <div className="flex items-center gap-2 mt-2 text-xs text-blue-700">
                    <Bell className="w-4 h-4" />
                    Notification enabled for buy alerts
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Portfolio by Hash Address */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Hash className="w-5 h-5" />
            Track Portfolio by Hash Address
          </CardTitle>
          <CardDescription>Enter your wallet address to view your portfolio</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex gap-2 mb-4" onSubmit={handleTrackPortfolio}>
            <Input
              placeholder="Enter wallet/hash address"
              value={hash}
              onChange={e => setHash(e.target.value)}
            />
            <Button type="submit" disabled={!hash}>Track</Button>
          </form>
          {portfolio && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="mb-2 text-sm text-gray-600">Portfolio for <span className="font-mono">{portfolio.address}</span></div>
              <ul className="space-y-1 mb-2">
                {portfolio.assets.map((asset: any, idx: number) => (
                  <li key={idx} className="flex justify-between">
                    <span>{asset.symbol}</span>
                    <span className="font-bold">{asset.amount} ({`$${asset.value.toLocaleString()}`})</span>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between font-semibold">
                <span>Total Value</span>
                <span>${portfolio.total.toLocaleString()}</span>
              </div>
              <div className={portfolio.change >= 0 ? "text-green-600" : "text-red-600"}>
                {portfolio.change >= 0 ? "+" : ""}{portfolio.change}% today
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Favorites Section */}
      {favorites.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              Favorite Cryptos
            </CardTitle>
            <CardDescription>Get notified for your favorite coins</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {liveCryptos.filter(c => favorites.includes(c.id)).map(coin => (
                <li key={coin.id} className="flex items-center gap-2">
                  <img src={coin.image} alt={coin.name} className="w-6 h-6 rounded-full" />
                  <span className="font-semibold">{coin.name}</span>
                  <span className="text-xs text-gray-500">({coin.symbol.toUpperCase()})</span>
                  <span className="ml-auto text-green-700 font-bold">${coin.current_price.toLocaleString()}</span>
                  <Bell className="w-4 h-4 text-blue-600 ml-2" />
                  <span className="text-xs text-blue-700">Buy alert enabled</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 