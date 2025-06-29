import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calculator, CreditCard, Gift, Info, PlusCircle, ShoppingCart } from "lucide-react";

const SUGGESTED_CARDS = [
  {
    name: "UOB PRVI Miles Visa",
    type: "Visa",
    milesPerDollar: 1.4,
    category: "General",
    image: "https://www.uob.com.sg/assets/images/cards/prvi-miles-visa-card.png",
    program: "UOB Rewards",
    krisflyerConversion: 2500,
    krisflyerFee: 25,
  },
  {
    name: "DBS Altitude Amex",
    type: "Amex",
    milesPerDollar: 1.2,
    category: "General",
    image: "https://www.dbs.com.sg/iwov-resources/images/cards/altitude-amex-card.png",
    program: "DBS Points",
    krisflyerConversion: 5000,
    krisflyerFee: 26.75,
  },
  {
    name: "Citi PremierMiles Mastercard",
    type: "Mastercard",
    milesPerDollar: 1.2,
    category: "General",
    image: "https://www.citibank.com.sg/SGGCB/APPS/portal/loadImage.do?img=/SGGCB/resources/images/cards/pm-mc-card.png",
    program: "Citi Miles",
    krisflyerConversion: 10000,
    krisflyerFee: 27,
  },
];

export function MilesPage() {
  // Card management state
  const [cards, setCards] = useState([
    {
      name: "UOB PRVI Miles Visa",
      type: "Visa",
      milesPerDollar: 1.4,
      program: "UOB Rewards",
      milesEarned: 3200,
      krisflyerConversion: 2500,
      krisflyerFee: 25,
    },
  ]);
  const [newCard, setNewCard] = useState({
    name: "",
    type: "Visa",
    milesPerDollar: 1.0,
    program: "",
    milesEarned: 0,
    krisflyerConversion: 1000,
    krisflyerFee: 25,
  });
  const [showAddCard, setShowAddCard] = useState(false);
  const [purchaseCategory, setPurchaseCategory] = useState("Grocery Store");
  const [purchaseAmount, setPurchaseAmount] = useState(0);
  const [selectedCard, setSelectedCard] = useState(cards[0]?.name || "");
  const [calcAmount, setCalcAmount] = useState(0);
  const [calcCard, setCalcCard] = useState(cards[0]?.name || "");

  // Find best card for grocery store (or any category)
  const suggestedCard = cards.reduce((best, card) => {
    if (!best || card.milesPerDollar > best.milesPerDollar) return card;
    return best;
  }, null as typeof cards[0] | null);

  // Add new card
  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCard.name) return;
    setCards([...cards, { ...newCard }]);
    setShowAddCard(false);
    setNewCard({
      name: "",
      type: "Visa",
      milesPerDollar: 1.0,
      program: "",
      milesEarned: 0,
      krisflyerConversion: 1000,
      krisflyerFee: 25,
    });
  };

  // Calculate miles for calculator tab
  const calcCardObj = cards.find(card => card.name === calcCard);
  const calcMiles = calcCardObj ? calcAmount * calcCardObj.milesPerDollar : 0;
  const milesToKrisflyer = calcCardObj ? Math.floor(calcCardObj.milesEarned / calcCardObj.krisflyerConversion) * calcCardObj.krisflyerConversion : 0;
  const milesRemaining = calcCardObj ? calcCardObj.krisflyerConversion - (calcCardObj.milesEarned % calcCardObj.krisflyerConversion) : 0;

  return (
    <div className="p-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="calculator">Miles Calculator</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  My Credit Cards
                </CardTitle>
                <CardDescription>Manage your cards and see miles earned</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {cards.map((card, idx) => (
                    <li key={idx} className="flex items-center gap-4 border-b pb-2">
                      <CreditCard className="w-6 h-6 text-blue-500" />
                      <div className="flex-1">
                        <div className="font-semibold">{card.name}</div>
                        <div className="text-xs text-gray-500">{card.program} &bull; {card.type}</div>
                        <div className="text-xs text-gray-500">Miles per $1: <span className="font-bold text-blue-600">{card.milesPerDollar}</span></div>
                        <div className="text-xs text-gray-500">Miles earned: <span className="font-bold text-green-600">{card.milesEarned}</span></div>
                        <div className="text-xs text-gray-500">KrisFlyer conversion: {card.krisflyerConversion} miles/block, Fee: ${card.krisflyerFee}</div>
                      </div>
                    </li>
                  ))}
                </ul>
                {showAddCard ? (
                  <form className="mt-4 space-y-2" onSubmit={handleAddCard}>
                    <Input placeholder="Card Name" value={newCard.name} onChange={e => setNewCard({ ...newCard, name: e.target.value })} />
                    <Input placeholder="Miles Program" value={newCard.program} onChange={e => setNewCard({ ...newCard, program: e.target.value })} />
                    <Input placeholder="Miles per $1" type="number" value={newCard.milesPerDollar} onChange={e => setNewCard({ ...newCard, milesPerDollar: parseFloat(e.target.value) })} />
                    <Input placeholder="KrisFlyer Conversion Block" type="number" value={newCard.krisflyerConversion} onChange={e => setNewCard({ ...newCard, krisflyerConversion: parseInt(e.target.value) })} />
                    <Input placeholder="KrisFlyer Fee" type="number" value={newCard.krisflyerFee} onChange={e => setNewCard({ ...newCard, krisflyerFee: parseFloat(e.target.value) })} />
                    <Button type="submit" className="w-full">Add Card</Button>
                  </form>
                ) : (
                  <Button variant="outline" className="mt-4 w-full" onClick={() => setShowAddCard(true)}>
                    <PlusCircle className="w-4 h-4 mr-2" /> Add Card
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Suggested Card for Purchase */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="w-5 h-5" />
                  Suggested Card for Purchase
                </CardTitle>
                <CardDescription>Get the most miles for your spend</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Purchase Category</label>
                  <select
                    className="w-full border rounded px-2 py-1"
                    value={purchaseCategory}
                    onChange={e => setPurchaseCategory(e.target.value)}
                  >
                    <option>Grocery Store</option>
                    <option>Dining</option>
                    <option>Online Shopping</option>
                    <option>Travel</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Amount ($)</label>
                  <Input
                    type="number"
                    value={purchaseAmount}
                    onChange={e => setPurchaseAmount(parseFloat(e.target.value))}
                  />
                </div>
                {suggestedCard && (
                  <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg">
                    <img src={SUGGESTED_CARDS.find(c => c.name === suggestedCard.name)?.image} alt="Card" className="w-12 h-8 object-contain rounded border" />
                    <div className="flex-1">
                      <div className="font-semibold text-blue-700">{suggestedCard.name}</div>
                      <div className="text-xs text-gray-500">Miles per $1: <span className="font-bold">{suggestedCard.milesPerDollar}</span></div>
                      <div className="text-xs text-gray-500">Program: {suggestedCard.program}</div>
                    </div>
                    <Badge variant="outline" className="text-green-700 border-green-400 bg-green-50">
                      +{(purchaseAmount * suggestedCard.milesPerDollar).toFixed(0)} miles
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Miles Earned & KrisFlyer Progress */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Miles Earned
                </CardTitle>
                <CardDescription>Track your miles and conversion progress</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {cards.map((card, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-blue-500" />
                      <div className="flex-1">
                        <div className="font-semibold">{card.name}</div>
                        <div className="text-xs text-gray-500">Miles earned: <span className="font-bold text-green-600">{card.milesEarned}</span></div>
                        <div className="text-xs text-gray-500">KrisFlyer block: {card.krisflyerConversion} miles</div>
                        <div className="text-xs text-gray-500">Miles to next conversion: <span className="font-bold text-orange-600">{card.krisflyerConversion - (card.milesEarned % card.krisflyerConversion)}</span></div>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Calculator Tab */}
        <TabsContent value="calculator">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  Miles Calculator
                </CardTitle>
                <CardDescription>Estimate miles earned for your spend</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Amount ($)</label>
                  <Input
                    type="number"
                    value={calcAmount}
                    onChange={e => setCalcAmount(parseFloat(e.target.value))}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Select Card</label>
                  <select
                    className="w-full border rounded px-2 py-1"
                    value={calcCard}
                    onChange={e => setCalcCard(e.target.value)}
                  >
                    {cards.map((card, idx) => (
                      <option key={idx} value={card.name}>{card.name}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <Gift className="w-6 h-6 text-blue-600" />
                  <div className="flex-1">
                    <div className="font-semibold text-blue-700">Miles Earned</div>
                    <div className="text-2xl font-bold">{calcMiles.toFixed(0)} miles</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Conversion Terms */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="w-5 h-5" />
                  Conversion Terms
                </CardTitle>
                <CardDescription>How your miles convert to KrisFlyer</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {cards.map((card, idx) => (
                    <li key={idx} className="border-b pb-2">
                      <div className="font-semibold">{card.name}</div>
                      <div className="text-xs text-gray-500">Miles per $1: <span className="font-bold">{card.milesPerDollar}</span></div>
                      <div className="text-xs text-gray-500">KrisFlyer block: <span className="font-bold">{card.krisflyerConversion}</span> miles</div>
                      <div className="text-xs text-gray-500">Conversion fee: <span className="font-bold">${card.krisflyerFee}</span></div>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 text-xs text-gray-500">
                  <b>Example:</b> If you have 3,200 miles and your block is 2,500, you can convert 2,500 miles to KrisFlyer (with a fee), and 700 miles will remain until you reach the next block.
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 