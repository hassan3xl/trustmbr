"use client";

import { useMemo } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

interface IncomeChartProps {
  incomeHistory: number[];
  className?: string;
}

export function IncomeChart({ incomeHistory, className }: IncomeChartProps) {
  const months = ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan"];

  const { max, min, trend, percentChange } = useMemo(() => {
    const maxVal = Math.max(...incomeHistory);
    const minVal = Math.min(...incomeHistory);
    const first = incomeHistory[0];
    const last = incomeHistory[incomeHistory.length - 1];
    const change = ((last - first) / first) * 100;

    return {
      max: maxVal,
      min: minVal,
      trend: last >= first ? "up" : "down",
      percentChange: Math.abs(change).toFixed(1),
    };
  }, [incomeHistory]);

  return (
    <Card className={`border-border/50 bg-card/50 backdrop-blur ${className}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg tracking-wide flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-500" />
            INCOME TREND
          </CardTitle>
          <div
            className={`flex items-center gap-1 text-sm font-medium ${
              trend === "up" ? "text-emerald-500" : "text-red-500"
            }`}
          >
            {trend === "up" ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            {percentChange}%
          </div>
        </div>
        <p className="text-sm text-muted-foreground">Last 6 months revenue</p>
      </CardHeader>
      <CardContent className="pt-4">
        {/* Chart */}
        <div className="flex items-end justify-between gap-2 h-40 mb-4">
          {incomeHistory.map((income, index) => {
            const height = ((income - min * 0.8) / (max - min * 0.8)) * 100;
            const isHighest = income === max;
            const isLatest = index === incomeHistory.length - 1;

            return (
              <div
                key={index}
                className="flex-1 flex flex-col items-center gap-2 group"
              >
                <div className="relative w-full flex justify-center">
                  {/* Tooltip */}
                  <div className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity bg-card border border-border rounded-lg px-2 py-1 text-xs whitespace-nowrap z-10 shadow-lg">
                    {formatCurrency(income)}
                  </div>
                  {/* Bar */}
                  <div
                    className={`w-full max-w-[40px] rounded-t-lg transition-all duration-500 ease-out ${
                      isLatest
                        ? "bg-gradient-to-t from-emerald-600 to-emerald-400"
                        : isHighest
                          ? "bg-gradient-to-t from-emerald-600/80 to-emerald-400/80"
                          : "bg-gradient-to-t from-emerald-600/40 to-emerald-400/40"
                    } ${isLatest ? "animate-pulse-glow" : ""}`}
                    style={{
                      height: `${height}%`,
                      animationDelay: `${index * 100}ms`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* X-axis labels */}
        <div className="flex justify-between gap-2">
          {months.map((month, index) => (
            <div
              key={month}
              className={`flex-1 text-center text-xs tracking-wide ${
                index === months.length - 1
                  ? "text-emerald-400 font-medium"
                  : "text-muted-foreground"
              }`}
            >
              {month}
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-border/50">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              Highest
            </p>
            <p className="text-lg font-bold text-emerald-400">
              {formatCurrency(max)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              Average
            </p>
            <p className="text-lg font-bold">
              {formatCurrency(
                Math.round(
                  incomeHistory.reduce((a, b) => a + b, 0) /
                    incomeHistory.length,
                ),
              )}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
