const {observer} = require('mobx-react');
const store = require('../store').store;
// const CodeMirror = require('codemirror');
// require('codemirror/mode/javascript/javascript');

module.exports = observer(function SourcesTab() {

  if (store.isSnippets()) {
    return (
      <div>
        <div>You have {store.snippets.length} snippet(s)</div>
        <pre>{store.selectedSnippet}</pre>
      </div>
    );
  } else {
    return (
      <div>
        <div>Tests successfully loaded from: {store.testsSourceUrl}</div>
        <div>Files found: ${store.tests.length}</div>
      </div>
    );
  }

});

/*
 const editor = CodeMirror(document.getElementById('code'), {
 lineNumbers: true,
 mode: 'javascript',
 });

 editor.doc.setValue(`function myScript() {
 return 100;
 }`);

 editor.on('changes', (a, b) => {
 console.log(editor.doc.getValue());
 });
 */
