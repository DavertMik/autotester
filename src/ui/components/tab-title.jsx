const {observer} = require('mobx-react');
const classNames = require('classnames');
const uiStore = require('../stores/ui').store;

module.exports = observer(class TabTitle extends React.Component {
  handleClick() {
    uiStore.activeTabId = this.props.id;
  }

  render() {
    const props = this.props;
    const isActive = uiStore.activeTabId === props.id;
    const className = classNames('mdl-tabs__tab', {'is-active': isActive});
    return (
      <a href={`#${props.id}`} className={className} style={props.style} onClick={e => this.handleClick(e)}>
        <i className="material-icons" style={{verticalAlign: 'middle', marginRight: '4px'}}>{props.icon}</i>
        <span style={{verticalAlign: 'middle'}}>{props.text}</span>
      </a>
    );
  };
});
