import { LightningElement, track } from 'lwc';
import getAccounts from '@salesforce/apex/Assignment1Controller.getgroups';

export default class assignment1 extends LightningElement {

    @track accountData = [];
    @track filterData = [];
    @track numOfRec;
    @track nameVal;
    @track filterVar;
    @track error;
    @track myData=false;

    handleClick(){
        this.accountData.splice(0, this.accountData.length);
        this.nameVal = this.template.querySelector(".nameClass").value;
        this.numOfRec = this.template.querySelector(".recordsClass").value;
        if(this.nameVal!='' && (!this.numOfRec ? (this.numOfRec=1) : this.numOfRec))
        {
            getAccounts({
                nameVal: this.nameVal, 
                numOfRec: this.numOfRec
            })
            .then(result => {
                if(result){
                    this.accountData = result;
                    this.myData=true;
                }
            })
            .catch(error => {
                this.error = error;
            });
        }
    }

    handleClickFilter(){
        this.filterData.splice(0, this.filterData.length);
        this.filterVar = this.template.querySelector(".filterClass").value;
        if(this.accountData){
            this.accountData.forEach(val => {
                if(val.Name.toLowerCase().includes(this.filterVar.toLowerCase())){
                    this.filterData.push(val);
                }
            });
        }    
        this.myData=false;
            
    }

}