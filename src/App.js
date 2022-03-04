import logo from './logo.svg';
import './App.css';
import React,{useState, useEffect} from 'react';
import axios from 'axios';

function App() {
  useEffect(() => {
    axios('https://jsonplaceholder.typicode.com/posts')
    .then(response => {
      console.log(response.data)
      setAllData(response.data);
      setFilteredData(response.data);
    })
    .catch(error => {
      console.log('Error gettinng fake data: ' + error);
    })
  }, []);
  const [allData,setAllData] = useState([]);
  const [filteredData,setFilteredData] = useState(allData);
  const handleSearch = (event) =>{
    let value = event.target.value.toLowerCase();
    let result = [];
    console.log(value);
    result = allData.filter((data) => {
      return data.title.search(value) !=-1;
  
    });
    setFilteredData(result);
  }
  const styles = {
    display:'inline',
    width: '100%',
    height: 100,
    float: 'left',
    padding: 1,
    //border: '0.5px solid black',
    marginBottom: 10,
    marginRight: 10
  }
  return (
    <div className="App">
      <h1>List of Posts</h1>
      <div style={{ margin: '0 auto', marginnTop: '10%'}}>
        <label>Filter by entring a post title: </label>
        <input type="text" placeholder="Enter Post Title Here" onChange={(event) => handleSearch(event)} />
      </div>
      <div style={{padding:20}}>
        {filteredData.map((value, index)=>{
          return(
            <div>
              <div style={styles} key={value.id}>
                <h4>Post Title: {value.title}</h4>
                {value.body}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
