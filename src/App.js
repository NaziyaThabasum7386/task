import React, { useState } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';

// B.tech PDF template
const BtechDocument = ({ name, date, refCode, feeStructure }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section} >
      <Text>&nbsp;</Text>
        <Text>Ref- :{refCode}</Text>
        <Text>&nbsp;</Text>
        <Text>Name: {name}</Text>
        <Text>&nbsp;</Text>
        <Text>Course: B.tech</Text>
        <Text>&nbsp;</Text>
        <Text>Date of Offer: {date}</Text>
        <Text>&nbsp;</Text>
        <Text>Fee Structure:</Text>
        <Text>&nbsp;</Text>
        <View style={styles.tableContainer}>
          <View style={styles.tableRow}>
            <Text style={styles.columnHeader}>Year</Text>
            <Text style={styles.columnHeader}>One time fee</Text>
            <Text style={styles.columnHeader}>Tuition fee</Text>
          </View>
          {feeStructure.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.cell}>{item.year}</Text>
              <Text style={styles.cell}>{item.one}</Text>
              <Text style={styles.cell}>{item.two}</Text>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

// M.tech PDF template
const MtechDocument = ({ name, date, refCode, feeStructure }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text>Ref- {refCode}</Text>
        <Text>Name: {name}</Text>
        <Text>Course: M.tech</Text>
        <Text>Date of Offer: {date}</Text>
        <Text>Fee Structure:</Text>
        <View style={styles.tableContainer}>
          <View style={styles.tableRow}>
            <Text style={styles.columnHeader}>Year</Text>
            <Text style={styles.columnHeader}>One time fee</Text>
            <Text style={styles.columnHeader}>Tuition fee</Text>
          </View>
          {feeStructure.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.cell}>{item.year}</Text>
              <Text style={styles.cell}>{item.one}</Text>
              <Text style={styles.cell}>{item.two}</Text>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

const MyForm = () => {
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [refCode, setRefCode] = useState('');
  const [feeStructure, setFeeStructure] = useState([]);
  const [pdfTemplate, setPdfTemplate] = useState(null);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleCourseChange = (event) => {
    setCourse(event.target.value);
    // Set reference code based on course selection
    if (event.target.value === 'Btech') {
      setRefCode('A101');
      setFeeStructure([
        { year: 1, one: 500, two: 160 },
        { year: 2, one: "-", two: 160 },
      ]);
    } else if (event.target.value === 'Mtech') {
      setRefCode('B101');
      setFeeStructure([
        { year: 1, one: 600, two: 260 },
        { year: 2, one: "-", two: 260 },
      ]);
    }
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log('Submitted:', { name, course });
  };

  const handleGeneratePdf = () => {
    const currentDate = new Date().toLocaleDateString();

    if (course === 'Btech') {
      setPdfTemplate(<BtechDocument name={name} date={currentDate} refCode={refCode} feeStructure={feeStructure} />);
    } else if (course === 'Mtech') {
      setPdfTemplate(<MtechDocument name={name} date={currentDate} refCode={refCode} feeStructure={feeStructure} />);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <strong><label>Name:</label></strong><br />
        <input type="text" value={name} onChange={handleNameChange} style={{ width: '300px' }} />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <strong><label>Course:</label></strong><br/>
        <div className="custom-select">
          <select value={course} onChange={handleCourseChange} style={{ width: '300px', cursor: 'pointer' }}>
            <option value="">Select</option>
            <option value="Btech">B.tech</option>
            <option value="Mtech">M.tech</option>
          </select>
        </div>
      </div>
      <button onClick={handleSubmit} style={{backgroundColor: 'blue', color: 'white', marginRight: '10px'}}>Submit</button> 
      <button onClick={handleGeneratePdf} style={{backgroundColor: 'green', color: 'white'}}>Generate PDF</button>
      
      <div style={{ marginTop: '20px' }}>
        {pdfTemplate && (
          <PDFViewer width="1000" height="600">
            {pdfTemplate}
          </PDFViewer>
        )}
      </div>
    </div>
  );
};

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 10,
  },
  section: {
    margin: 10,
    fontSize: 12,
  },
  tableContainer: {
    border: 1,
    borderColor: '#000',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  columnHeader: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: '#000',
    borderTopWidth: 1,
    borderTopColor: '#000',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: '#000',
    borderLefttWidth: 1,
    borderLeftColor: '#000',
    borderTopWidth: 1,
    borderTopColor: '#000',
  },
});

export default MyForm;
