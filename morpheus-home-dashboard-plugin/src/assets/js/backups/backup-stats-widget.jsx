/**
 counter widget that loads data
 * @author bdwheeler
 */
class BackupStatsWidget extends React.Component {

	constructor(props) {
    super(props);
    //set state
    this.state = {
      loaded: false,
      autoRefresh: true,
      data: null,
      days: 1
    };
    //apply state config
    if (props.autoRefresh == false)
      this.state.autoRefresh = false;
    //bind methods
    this.setData = this.setData.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.onPillChange = this.onPillChange.bind(this);
  }

  componentDidMount() {
    this.loadData();
    $(document).on('morpheus:refresh', this.refreshData);
  }

  //data methods
  refreshData() {
    if(this.state.autoRefresh == true)
      this.loadData();
  }

  onPillChange(value) {
    if(this.state.days != value) {
      var newState = {};
      newState.days = value;
      this.setState(newState, this.loadData);
    }
  }

  loadData() {
    //call api for data...
    var apiQuery = 'group(lastResult.status:count(id)) lastResult.status != null';
    var apiOptions = {};
    //set date range
    var dayCounter = this.state.days;
    var startDate = new Date();
    if(dayCounter > 1)
      startDate.setDate(startDate.getDate() - dayCounter);
    startDate.setHours(0, 0, 0, 0);
    apiQuery = apiQuery + ' and lastResult.startDate > ' + startDate.toISOString();
    //execute it
    Morpheus.api.backups.search(apiQuery, apiOptions).then(this.setData);
  }

  setData(results) {
    //set it
    var newState = {};
    newState.data = {};
    newState.data.config = results.config;
    newState.data.meta = results.meta;
    newState.data.items = results.items;
    //aggregate data for display
    var chartData = {};
    chartData.total = 0;
    chartData.items = [];
    //success and fail rows
    var successRow = { name:Morpheus.utils.message('gomorpheus.successful'), value:0, color:Morph.chartConfigs.colors.green, percent:0 };
    var failRow = { name:Morpheus.utils.message('gomorpheus.failed'), value:0, color:Morph.chartConfigs.colors.red, percent:0 };
    chartData.items.push(successRow);
    chartData.items.push(failRow);
    newState.data.chartData = chartData;
    //if we have values
    if(results.items) {
      chartData.loaded = true;
      //iterate items for values
      for(var index in results.items) {
        var row = results.items[index];
        if(row.name == 'SUCCEEDED') {
          successRow.value = row.value;
          chartData.total += row.value;
        } else if(row.name == 'FAILED') {
          failRow.value = row.value;
          chartData.total += row.value;
        }
      }
      //calc percents
      if(chartData.total > 0) {
        successRow.percent = successRow.value / chartData.total * 100;
        failRow.percent = 100 - successRow.percent;
      }
    }
    //mark it loaded
    newState.loaded = true;
    newState.data.loaded = true;
    newState.date = Date.now();
    newState.error = false;
    newState.errorMessage = null;
    //update the state
    this.setState(newState);
  }

  render() {
    //setup
    var pillList = [
      {name:$L({code:'gomorpheus.time.oneDay'}), value:1},
      {name:$L({code:'gomorpheus.time.oneWeek'}), value:7},
      {name:$L({code:'gomorpheus.time.oneMonth'}), value:30}
    ];
    //data
    var chartData = this.state.loaded == true && this.state.data ? this.state.data.chartData : {};
    //render
    return (
      <Widget>
        <WidgetHeader icon="/assets/dashboard.svg#backup" title={Morpheus.utils.message('gomorpheus.label.backups')} link="/backups"/>
        <WidgetPills pills={pillList} defaultValue={this.state.days} align="center" onPillChange={this.onPillChange}/>
        <div className="dashboard-widget-content top-space">
          <ColorBarWidget data={chartData}/>
        </div>
      </Widget>
    );
  }

}

//register it
Morpheus.components.register('backup-stats-widget', BackupStatsWidget);

$(document).ready(function () {
	const root = ReactDOM.createRoot(document.querySelector('#backup-stats-widget'));
	root.render(<BackupStatsWidget/>)
});
