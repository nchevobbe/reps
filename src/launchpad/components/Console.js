const React = require("react");
const { DOM: dom, PropTypes, createFactory } = React;

const { connect } = require("react-redux");
const { bindActionCreators } = require("redux");
const selectors = require("../selectors");

const Header = createFactory(require("./Header"));
const ResultsList = createFactory(require("./ResultsList"));

require("./Console.css");

const Console = React.createClass({
  displayName: "Console",

  propTypes: {
    client: PropTypes.object.isRequired,
    shortcuts: PropTypes.object.isRequired,
    clearExpressions: PropTypes.func.isRequired
  },

  componentDidMount: function () {
    this.props.shortcuts.on("CmdOrCtrl+Shift+L", this.props.clearExpressions);
  },

  componentWillUnmount: function () {
    this.props.shortcuts.off("CmdOrCtrl+Shift+L");
  },

  render: function () {
    let {
      addInput,
      changeCurrentInput,
      clearExpressions,
      currentInputValue,
      evaluateInput,
      expressions,
      hideResultPacket,
      navigateInputHistory,
      showResultPacket,
      loadObjectProperties,
      loadedObjects
    } = this.props;

    return dom.main(
      {},
      Header({
        addInput,
        changeCurrentInput,
        clearResultsList: clearExpressions,
        currentInputValue,
        evaluate: evaluateInput,
        navigateInputHistory
      }),
      ResultsList({
        expressions: expressions.reverse(),
        loadedObjects,
        hideResultPacket,
        showResultPacket,
        loadObjectProperties
      })
    );
  }
});

function mapStateToProps(state) {
  return {
    expressions: selectors.getExpressions(state),
    loadedObjects: selectors.getLoadedObjects(state),
    currentInputValue: selectors.getCurrentInputValue(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(require("../actions"), dispatch);
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Console);
