// ... импорты остаются без изменений
import { CryptoIcon } from "@/components/crypto-icon"
import { TRADING_PAIRS } from "@/lib/binance"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select"

// ... код до Select остается без изменений
<Select defaultValue={symbol}>
  <SelectTrigger className="w-[180px]">
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    {TRADING_PAIRS.map((pair) => (
      <SelectItem key={pair} value={pair}>
        <div className="flex items-center gap-2">
          <CryptoIcon symbol={pair} size={16} />
          <span>{pair.replace("USDT", "/USDT")}</span>
        </div>
      </SelectItem>
    ))}
  </SelectContent>
</Select>

// ... остальной код остается без изменений

