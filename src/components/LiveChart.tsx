import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const investmentId = searchParams.get("id");

  if (!investmentId) {
    return NextResponse.json(
      { error: "Missing investment ID" },
      { status: 400 }
    );
  }

  // Generate real-time mock candlestick data (last 5 days)
  const generateMockData = () => {
    const now = new Date();
    return Array.from({ length: 5 }).map((_, i) => {
      const date = new Date(now);
      date.setDate(now.getDate() - (4 - i));

      const open = Math.floor(Math.random() * 100) + 100;
      const close = open + Math.floor(Math.random() * 10) - 5;
      const high = Math.max(open, close) + Math.floor(Math.random() * 5);
      const low = Math.min(open, close) - Math.floor(Math.random() * 5);
      const volume = Math.floor(Math.random() * 5000) + 1000;

      return {
        date: date.toISOString().split("T")[0], // Format YYYY-MM-DD
        open,
        high,
        low,
        close,
        volume,
      };
    });
  };

  return NextResponse.json(generateMockData());
}
