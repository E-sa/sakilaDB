import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';



class Info extends React.Component{
    constructor(){
        super();
        this.state ={users: []};
        this.alphabetPick = [];
        this.listOfActors =[];
        this.keeperOfId = [];
        this.info = '';
        this.boxOpen = false ;
        this.nothing=false;

    }


    alphabet = (e) => {
        this.listOfActors = []
        this.keeperOfId = []
        this.alphabetPick = e.target.value;
        fetch('http://localhost:3000/actors/' + this.alphabetPick)
             .then(res => {
                //  console.log(res);
                 return res.json()
              })
             .then(users => { 
                //  console.log(users);

                if(Object.keys(users).length===0){this.nothing=true;} 
                else{this.nothing=false;}
                 for (let i = 0; i <= Object.keys(users).length-1; i++)
                 {
                        this.listOfActors.push(users[i].first_name + ' '+ users[i].last_name )
                        this.keeperOfId.push(users[i].actor_id)
                    }

                 this.setState({ users })
              });

            this.boxOpen= false;
        
    }        

    moreInfo = (index) => {
        fetch('http://localhost:3000/info/' + this.keeperOfId[index] )
        .then(res => {
            // console.log(res);
            return res.json()
         })
        .then(users => { 
            // console.log(users);
            // console.log(users[0].film_info)
            this.info = users[0].film_info
            this.setState({ users })
         });  
         this.boxOpen = true;
      
    }
    
    close = () =>{
        this.setState({
            boxOpen: false
        });
        this.boxOpen= false;
    }



    render(){

        const elements = [];
        for (let i = 97; i <= 122; i++){
            elements.push(String.fromCharCode(i))
        }
        



        return(

            <div>
                    <select onChange={this.alphabet}>
                        {elements.map((value, index) => {
                            return <option value={value} key={index}>{value}</option>
                        })}

                    </select>

                    <ul>
                            {this.listOfActors.map((value, index) => {
                            return <li value={value} key={index} onClick={this.moreInfo.bind(this, index)}>{value.split('#')[0]}</li>
                              })}

                    </ul>
                    {this.boxOpen && <p
                            style={{
                                backgroundColor:'#97cabc',
                                textAlign: 'center',
                                padding: '20px',
                                width: '600px',
                                position: 'fixed',
                                left :'300px',
                                top:'50px'
                            }}
>
                             <button  
                             onClick={this.close} 
                             style={{
                                 margin:'20px',
                                 marginRight:'-424px',
                                 color:'white',
                                 backgroundColor:'#2b752b',
                                 borderColor:'#2b752b'
                                 }}
                                 >X</button>
                             <br />
                             {this.info}</p> }

                    {this.nothing && <p>nothing to show!!</p>}         


            </div>

        )
    }
}



ReactDOM.render(<Info />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
