import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { CreditCard, FileText, CheckCircle, XCircle, Upload } from "lucide-react";
import { useState } from "react";

const MOCK_CARDS = [
  {
    name: "UOB One Card",
    number: "**** 1234",
    statements: [
      { month: "May 2024", paid: true, url: "#" },
      { month: "April 2024", paid: true, url: "#" },
      { month: "March 2024", paid: false, url: "#" },
    ],
  },
  {
    name: "DBS Live Fresh",
    number: "**** 5678",
    statements: [
      { month: "May 2024", paid: false, url: "#" },
      { month: "April 2024", paid: true, url: "#" },
    ],
  },
];

export function CreditCardsPage() {
  const [cards, setCards] = useState(MOCK_CARDS);

  // Mock upload handler
  const handleUpload = (cardIdx: number, month: string) => {
    setCards(cards =>
      cards.map((card, idx) =>
        idx === cardIdx
          ? {
              ...card,
              statements: card.statements.map(s =>
                s.month === month ? { ...s, paid: true } : s
              ),
            }
          : card
      )
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-100 rounded-lg">
          <CreditCard className="w-8 h-8 text-blue-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Credit Cards</h1>
          <p className="text-gray-600">Manage your cards and statements</p>
        </div>
      </div>
      {cards.map((card, cardIdx) => (
        <Card key={cardIdx} className="mb-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              {card.name} <span className="text-xs text-gray-400">{card.number}</span>
            </CardTitle>
            <CardDescription>Upload and track your monthly statements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-2 font-semibold">Statements</div>
            <ul className="space-y-2">
              {card.statements.map((s, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-blue-500" />
                  <span className="flex-1">{s.month}</span>
                  {s.paid ? (
                    <span className="flex items-center gap-1 text-green-600"><CheckCircle className="w-4 h-4" />Paid</span>
                  ) : (
                    <span className="flex items-center gap-1 text-red-600"><XCircle className="w-4 h-4" />Not Paid</span>
                  )}
                  <label className="ml-2 cursor-pointer flex items-center gap-1 text-blue-700 hover:underline">
                    <Upload className="w-4 h-4" />
                    <input
                      type="file"
                      className="hidden"
                      onChange={() => handleUpload(cardIdx, s.month)}
                    />
                    Upload
                  </label>
                  <a href={s.url} className="text-blue-700 underline ml-2">View</a>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 