/* eslint-disable */

import * as React from 'react';
import './index.css';
import {
  widget,
  ChartingLibraryWidgetOptions,
  LanguageCode,
  IChartingLibraryWidget,
  ResolutionString,
  IBasicDataFeed,
  IDatafeedQuotesApi,
  TimeScaleOptions,
} from '../../charting_library';

import datafeeds from './datafeed'

export interface ChartContainerProps {
  inputTokenAddr: string;
  outputTokenAddr: string;
  symbol: ChartingLibraryWidgetOptions['symbol'];
  interval: ChartingLibraryWidgetOptions['interval'];
  width,
  height,
  // BEWARE: no trailing slash is expected in feed URL
  datafeedUrl: string;
  libraryPath: ChartingLibraryWidgetOptions['library_path'];
  chartsStorageUrl: ChartingLibraryWidgetOptions['charts_storage_url'];
  chartsStorageApiVersion: ChartingLibraryWidgetOptions['charts_storage_api_version'];
  clientId: ChartingLibraryWidgetOptions['client_id'];
  userId: ChartingLibraryWidgetOptions['user_id'];
  fullscreen: ChartingLibraryWidgetOptions['fullscreen'];
  autosize: ChartingLibraryWidgetOptions['autosize'];
  studiesOverrides: ChartingLibraryWidgetOptions['studies_overrides'];
  containerId: ChartingLibraryWidgetOptions['container_id'];
}

// function getLanguageFromURL(): LanguageCode | null {
// 	const regex = new RegExp('[\\?&]lang=([^&#]*)');
// 	const results = regex.exec(location.search);
// 	return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' ')) as LanguageCode;
// }

export class TVChartContainer extends React.PureComponent<Partial<ChartContainerProps>> {
  public static defaultProps: ChartContainerProps = {
    inputTokenAddr: '0x9b71b5511998e0798625b8fa74e86d8192de78c1',
    outputTokenAddr: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    symbol: 'AAPL',
    interval: 'D' as ResolutionString,
    containerId: 'tv_chart_container',
    width: "200",
    height: "600",
    datafeedUrl: 'https://demo_feed.tradingview.com',
    libraryPath: '/charting_library/',
    chartsStorageUrl: 'https://saveload.tradingview.com',
    chartsStorageApiVersion: '1.1',
    clientId: 'tradingview.com',
    userId: 'public_user_id',
    fullscreen: false,
    autosize: true,
    studiesOverrides: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      inputTokenAddr: props.inputTokenAddr,
      outputTokenAddr: props.outputTokenAddr,
    };
  }

  private tvWidget: IChartingLibraryWidget | null = null;
  datafeeds: IBasicDataFeed;

  public componentDidMount(): void {

		this.datafeeds = new datafeeds(this);

    const widgetOptions: ChartingLibraryWidgetOptions = {
      symbol: this.props.symbol as string,
      // BEWARE: no trailing slash is expected in feed URL
      // tslint:disable-next-line:no-any
      datafeed: this.datafeeds,
      interval: this.props.interval as ChartingLibraryWidgetOptions['interval'],
      container_id: this.props.containerId as ChartingLibraryWidgetOptions['container_id'],
      library_path: this.props.libraryPath as string,
      width: this.props.width,
      height: this.props.height,
      theme: 'Dark',
      // locale: getLanguageFromURL() || 'en',
      locale: 'en',
      disabled_features: ['use_localstorage_for_settings'],
      enabled_features: ['study_templates'],
      charts_storage_url: this.props.chartsStorageUrl,
      charts_storage_api_version: this.props.chartsStorageApiVersion,
      client_id: this.props.clientId,
      user_id: this.props.userId,
      fullscreen: this.props.fullscreen,
      autosize: this.props.autosize,
      studies_overrides: this.props.studiesOverrides,
    };

    const tvWidget = new widget(widgetOptions);
    this.tvWidget = tvWidget;

    tvWidget.onChartReady(() => {
      tvWidget.headerReady().then(() => {
        const button = tvWidget.createButton();
        button.setAttribute('title', 'Click to show a notification popup');
        button.classList.add('apply-common-tooltip');
        button.addEventListener('click', () => tvWidget.showNoticeDialog({
          title: 'Notification',
          body: 'TradingView Charting Library API works correctly',
          callback: () => {
            console.log('Noticed!');
          },
        }));
        button.innerHTML = 'Check API';
      });
    });
  }

  public componentWillUnmount(): void {
    if (this.tvWidget !== null) {
      this.tvWidget.remove();
      this.tvWidget = null;
    }
  }

  public render(): JSX.Element {
    return (
      <>
       <div
        id={this.props.containerId}
        className={'TVChartContainer'}
        />
        <div>{inputTokenAdddr}</div>
      </>
    );
  }
}
