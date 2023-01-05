const axios = require("axios");

async function main() {
  // const currency = process.argv[2].toUpperCase();
  let currency = "USD";
  if (process.argv[2]) {
    currency = process.argv[2].toUpperCase();
  }
  try {
    const { data } = await axios.get(
      "https://api.coindesk.com/v1/bpi/currentprice.json"
    );

    if (!data.bpi[currency]) {
      throw new Error(`> La currency ${currency} n'existe pas`);
    } else {
      const rate = data.bpi[currency].rate;
      const updateTime = data.time.updated;
      console.log(`> 1 BTC =  ${rate} ${currency} (${updateTime})`);
    }
  } catch (err) {
    console.log(err.toString());
  }
}

main();
