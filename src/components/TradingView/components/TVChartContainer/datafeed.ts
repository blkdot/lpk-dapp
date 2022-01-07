/* eslint-disable */
import axios from 'axios'; 
import { 
  Bar,
  ErrorCallback, 
  HistoryCallback, 
  LibrarySymbolInfo,
  PeriodParams, 
  ResolutionString, 
  ResolveCallback,
  SymbolResolveExtension
} from 'components/TradingView/charting_library/charting_library';

import {
  SERVER_ENDPOINT
} from 'utils/apis'

const configurationData = {
  supports_search: true,
  supports_group_request: false,
  supported_resolutions: ['1', '5', '15', '30', '60', '1D', '2D', '3D', '1W', '1M'] as ResolutionString[],
  supports_marks: true,
  supports_timescale_marks: true,
  supports_time: true
}; 

export default class datafeeds {

  private ctx: any;
  private inputTokenAddr: string;
  public outputTokenAddr: string;

  constructor(ctx: any) {
    this.ctx = ctx;
    // this.inputTokenAddr = inputTokenAddr;
    // this.outputTokenAddr = outputTokenAddr;
  }

  // This method is used by the Charting Library to get a configuration of your datafeed 
  // (e.g. supported resolutions, exchanges and so on)
  public  onReady(callback) {
    console.log('[onReady]: Method called!!');
    setTimeout(() => callback(configurationData));
  }
    
  
  // This method is used by the library to retrieve information about a specific symbol 
  // (exchange, price scale, full symbol etc.).
  public async resolveSymbol(symbolName: string, onResolve: ResolveCallback, onError: ErrorCallback, extension?: SymbolResolveExtension) {

    console.log('[resolveSymbol]: Method called!!'); 
    const response = await axios.post(
      `${SERVER_ENDPOINT}/bitquery/coin/info`, {
        mode: 'cors',
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          address: '0x9b71b5511998e0798625b8fa74e86d8192de78c1',
        }
      }
    ); 
    // const coin = response.data.data.ethereum.dexTrades[0].baseCurrency; 
    // console.log(response.data.data.ethereum.dexTrades[0].quotePrice); 
    // console.log('response (resolve symbol): ', response); 
    // console.log('response (resolve symbol): ', response.data.data.ethereum.dexTrades[0].baseCurrency); 
  
    const coin = response.data.data.ethereum.dexTrades[0].baseCurrency; 
    const coin2 = response.data.data.ethereum.dexTrades[0].quoteCurrency; 
    const exchagneName = response.data.data.ethereum.dexTrades[0].exchange.fullName
    if(coin){
      const symbol: LibrarySymbolInfo = {
        ticker: symbolName,
        name: `${coin.symbol}/${coin2.symbol}`,
        full_name: coin.name,
        description: coin.name,
        type: 'token',
        exchange: exchagneName,
        listed_exchange: exchagneName,
        format: 'price',

        session: '24x7',
        timezone: 'Etc/UTC',
        minmov: 1,
        pricescale: 10000000,
        has_intraday: true,
        intraday_multipliers: ['1', '5', '15', '30', '60'],
        has_empty_bars: true,
        has_weekly_and_monthly: false,
        supported_resolutions: configurationData.supported_resolutions, 
        volume_precision: 1,
        data_status: 'streaming',
      }
      onResolve(symbol) 
    }
  }
  // This method is used by the charting library to get historical data for the symbol. 
  public async getBars(symbolInfo: LibrarySymbolInfo, resolution: ResolutionString, periodParams: PeriodParams, onResult: HistoryCallback, onError: ErrorCallback){
    try{
        // console.log('period params: ', new Date(periodParams.from*1000).toISOString(), '~', new Date(periodParams.to*1000).toISOString())
        if (resolution==='1D') {
            resolution = '1440' as ResolutionString;
        }
        const response2 = await axios.post(
          `${SERVER_ENDPOINT}/bitquery/coin/getbar`, {
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
            },
            data: {
              address: '0x9b71b5511998e0798625b8fa74e86d8192de78c1',
              from: new Date(periodParams.from*1000).toISOString(), 
              to: new Date(periodParams.to*1000).toISOString(),
              interval: Number(resolution),
            }
        })
        
        const bars: Bar[] = response2.data.data.ethereum.dexTrades.map(el => ({
            time: new Date(el.timeInterval.minute).getTime(), // date string in api response
            open: Number(el.open),
            high: el.high,
            low: el.low,
            close: Number(el.close),
            volume: el.volume
        }))

        if (bars.length){
            console.log('get bars: ', bars.length)
            onResult(bars, {noData: false}); 
        }else{
            console.log('error while feeding')
            onResult(bars, {noData: true}); 
        }
  
    } catch(err){
      console.log('error in getBars')
      console.log(err)
      // onErrorCallback(err)
    }
  }
  public subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscribeID, onResetCacheNeededCallback){}
  public unsubscribeBars(subscribeID){}

}  

const defaultConfigurationData = {
  supports_search: true,
  supports_group_request: false,
  supported_resolutions: ['1', '5', '15', '30', '60', '1D', '2D', '3D', '1W', '1M'],
  supports_marks: true,
  supports_timescale_marks: true,
  supports_time: true
}


