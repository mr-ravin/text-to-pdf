import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import {Editor, EditorState, convertToRaw} from 'draft-js';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet} from "@react-pdf/renderer";
import { Font } from '@react-pdf/renderer';
function App() {

const [editorState, setEditorState] = React.useState(
    () => EditorState.createEmpty(),
  );

Font.register({
  fonts:[
    {fontWeight: 'normal'}
  ]
})
const styles = StyleSheet.create({
  page: {
    flexDirection: "row"
  },
  section: {
    flexGrow: 1,
    margin: 30
  }
});
const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
const value = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');


const MyDocument =() => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={{fontSize:14}}>{value}</Text>
      </View>
    </Page>
  </Document>);

function run(){
ReactDOM.render(
<PDFDownloadLink document= {<MyDocument/>} fileName="output.pdf">
{
     ({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')

 }
 </ PDFDownloadLink>,document.getElementById('linked')
);
}


return (
  <>
  <center>

        <div className="editor">
        Text-to-PDF
        </div>

    <div className="editorleft">
      Developer : <a href="https://mr-ravin.github.io" target="_blank">Ravin Kumar</a>
    </div>

    <div className="editorright" id="linked">

    <input type="button" value="Generate PDF" onClick={run} />

    </div>
  <div className="editlayer">
          <Editor editorState={editorState} onChange={setEditorState} placeholder= "Type Something here..." />
  </div>
  <div className="note">
  Note: This computer program is built using ReactJS and is provided as an opensource program. The developer do not provide any kind of warranty.
  </div>
  </center>
  </>
);
}
export default App;
