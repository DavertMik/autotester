const {Header, HeaderRow} = require('react-mdl');
const TopText = require('./top-text');
const TopButtonRun = require('./top-button-run');
const TargetsDropdown = require('./targets-dropdown');
const TestsDropdown = require('./tests-dropdown');

module.exports = function Top() {
  return (
    <Header>
      <HeaderRow>
        <TopText>Tests:</TopText>
        <TestsDropdown/>
        <TopButtonRun/>
        <div className="mdl-layout-spacer"></div>
        <TopText>Target:</TopText>
        <TargetsDropdown/>
      </HeaderRow>
    </Header>
  );
};
