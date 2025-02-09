interface CryptoIconProps {
  symbol: string
  size?: number
  className?: string
}

export function CryptoIcon({ symbol, size = 24, className = "" }: CryptoIconProps) {
  // Нормализуем символ для поиска иконки
  const normalizedSymbol = symbol.replace("USDT", "").toLowerCase()

  return (
    <img
      src={`https://cryptologos.cc/logos/${getCryptoLogoUrl(normalizedSymbol)}`}
      alt={`${symbol} icon`}
      width={size}
      height={size}
      className={`inline-block ${className}`}
    />
  )
}

function getCryptoLogoUrl(symbol: string): string {
  const logoMap: { [key: string]: string } = {
    btc: "bitcoin-btc-logo",
    eth: "ethereum-eth-logo",
    usdt: "tether-usdt-logo",
    bnb: "bnb-bnb-logo",
    usdc: "usd-coin-usdc-logo",
    xrp: "xrp-xrp-logo",
    ada: "cardano-ada-logo",
    sol: "solana-sol-logo",
    dot: "polkadot-new-dot-logo",
    doge: "dogecoin-doge-logo",
    avax: "avalanche-avax-logo",
    shib: "shiba-inu-shib-logo",
    matic: "polygon-matic-logo",
    ltc: "litecoin-ltc-logo",
    link: "chainlink-link-logo",
    xlm: "stellar-xlm-logo",
    uni: "uniswap-uni-logo",
    atom: "cosmos-atom-logo",
    algo: "algorand-algo-logo",
    vet: "vechain-vet-logo",
    fil: "filecoin-fil-logo",
    icp: "internet-computer-icp-logo",
    hbar: "hedera-hbar-logo",
    xtz: "tezos-xtz-logo",
    egld: "elrond-egld-logo",
    aave: "aave-aave-logo",
    xmr: "monero-xmr-logo",
    miota: "iota-miota-logo",
    eos: "eos-eos-logo",
    ksm: "kusama-ksm-logo",
    neo: "neo-neo-logo",
    flow: "flow-flow-logo",
    sushi: "sushiswap-sushi-logo",
    zec: "zcash-zec-logo",
    dash: "dash-dash-logo",
    waves: "waves-waves-logo",
    chz: "chiliz-chz-logo",
    enj: "enjin-coin-enj-logo",
    theta: "theta-theta-logo",
    mana: "decentraland-mana-logo",
    sand: "the-sandbox-sand-logo",
    hnt: "helium-hnt-logo",
    qtum: "qtum-qtum-logo",
    xem: "nem-xem-logo",
    bat: "basic-attention-token-bat-logo",
    stx: "stacks-stx-logo",
    one: "harmony-one-logo",
    hot: "holo-hot-logo",
    ont: "ontology-ont-logo",
    dgb: "digibyte-dgb-logo",
  }

  return logoMap[symbol] || "generic-crypto-logo"
}

