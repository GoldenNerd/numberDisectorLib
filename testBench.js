"use strict";
// Grab doc elements
const userEntry=document.querySelector('#user-entry');
const numericSign=document.querySelector('#numeric-sign');
const numericPart=document.querySelector('#numeric-part');
const echoedUserEntry=document.querySelector('#echoed-user-entry');
const intPortion=document.querySelector('#integer-part');
const leftmostZeroes=document.querySelector('#trailing-zeroes');
const nonZeroClustered=document.querySelector('#non-zero-clustered');
const significantFigures=document.querySelector('#significant-number');
const significantCount=document.querySelector('#significant-count');
const dotSymbol=document.querySelector('#dot-separator');
const decimalFraction=document.querySelector('#decimal-fraction');
const rightmostZeroes=document.querySelector('#leading-zeroes');
const eDeclarator=document.querySelector('#e-declarator');
const exponentialSign=document.querySelector('#exp-sign');
const expValue=document.querySelector('#exp-value');

// Global outcome variables
let numSign;
let numPortion;
let integerPart;
let trailing0sCnt;
let non0Core;
let signifFigs;
let sigDigCnt;
let hasDot;
let fractCluster;
let leading0s;
let hasExp;
let expSign;
let expVal;


function signOfNumber (){
if(userEntry.value<0){
numSign='-';
return numSign;}
if(userEntry.value>0){
numSign='+';
return numSign;}
numSign=null;
return numSign;}

function coreNumber (){
let userEntryAbsVal;
if(userEntry.value<0 || userEntry.value.toString().slice(0,1)==='+'){
userEntryAbsVal=userEntry.value.toString().slice(1,userEntry.value.toString(). length);
}else{
userEntryAbsVal=userEntry.value.toString().slice(0,userEntry.value.toString(). length);
}
let wholeNumStr;
if(is_ePresent()){
wholeNumStr=userEntryAbsVal.toString();
const sliceStop=wholeNumStr.indexOf('e');
numPortion=wholeNumStr.slice(0, sliceStop);
return numPortion; // a string.
}
numPortion=userEntryAbsVal.toString();
return numPortion;
}

function integerPortion (){
const numbStr=coreNumber();  
if(is_dotPresent()){
const sliceStop=numbStr.indexOf('.');
integerPart=numbStr.slice(0, sliceStop);
return integerPart;}
integerPart=numbStr;
return integerPart;}

function trailingZeroes(num=integerPortion()){
console.log({num});
let zeroesCount=0;
for (let digit of num) {
if(digit==='-' || digit==='+'){
// Don't count. Not a trailing zero
}else if(digit==='.' |digit!=='0'){
trailing0sCnt=zeroesCount;
return trailing0sCnt;
}else if(digit==='0'){
zeroesCount++;
}
} 
trailing0sCnt=zeroesCount;
return trailing0sCnt;
}

function xtNon0Cluster(){
let numbStr=coreNumber();
let absZeroStripped;
let zeroStripped;
if(numbStr<0){
absZeroStripped=(-1)*numbStr;
non0Core=absZeroStripped;
return non0Core;}
zeroStripped=1*numbStr;
non0Core=zeroStripped;
return non0Core;}

// @
function xtSignifCluster (){
const non0Cluster=xtNon0Cluster();
let non0ClusterStr=non0Cluster.toString();
const firstDigit=non0ClusterStr.slice(0,1);
if(firstDigit==='0'){
signifFigs=non0ClusterStr.slice(2, non0ClusterStr.length);
return signifFigs;}
const dotIndex=non0ClusterStr.indexOf('.');
const newStr=non0ClusterStr.slice(0,dotIndex).concat(non0ClusterStr.slice(dotIndex+1, non0ClusterStr.length));
signifFigs=newStr;
return signifFigs;}

function xtSigDigCnt (){
sigDigCnt=signifFigs.length;
return sigDigCnt;}

function reverseNumCluster (num=coreNumber()){
let reversedNumCluster='';
for (var i = 0; i < num.length; i++) {
  reversedNumCluster=num[i].concat(reversedNumCluster);
}
return reversedNumCluster;}

function xtLeading0s (){
const reversedNumCluster=reverseNumCluster();
let zeroesCount=0;
for (let digit of reversedNumCluster) {
if(digit==='-' || digit==='+'){
// Don't count. Not a trailing zero
}else if(digit==='.' |digit!=='0'){
leading0s=zeroesCount;
return leading0s;
}else if(digit==='0'){
zeroesCount++;
}
} 
leading0s=zeroesCount;
return leading0s;
}

function xtFractCluster (){
if(is_dotPresent()){  
let numbStr=coreNumber();
const sliceStop=numbStr.indexOf('.');
fractCluster=numbStr.slice(sliceStop+1, numbStr.length);
return fractCluster;}
fractCluster=null;
return fractCluster;}

function is_dotPresent (){
if(userEntry.value.toString().includes('.')){
return true;}
return false;}

function xtHasDot (){
if(is_dotPresent()){
// yes
hasDot=true;
return hasDot;}
//no
hasDot=false;
return hasDot;}

function is_ePresent (){
if(userEntry.value.toString().includes('e')){
return true;}
return false;}

function xtHasExp (){
if(is_ePresent()){
// yes
hasExp=true;
return hasExp;}
//no
hasExp=false;
return hasExp;}

function xtExpSign (){
const wholeNumStr=userEntry.value.toString();
if(!wholeNumStr.includes('e')){
expSign=null;
return expSign;}
if(wholeNumStr.includes('e+')){
expSign='+';
return expSign}
if(wholeNumStr.includes('e-')){
expSign='-';
return expSign;}
expSign='+';
return expSign;}

function xtExpVal (){
if(!is_ePresent()){
expVal=null;
return expVal;}
const wholeNumStr=userEntry.value.toString();
const sliceStop=wholeNumStr.indexOf('e');
const expStr=wholeNumStr.slice(sliceStop+1, wholeNumStr.length);
if(!isNaN(expStr[0])){
expVal=expStr;
return expVal;}
expVal=expStr.slice(1,expStr.length);
return expVal;} 

function reportDisectionOutcome(){
// Outputs to document
echoedUserEntry.textContent=userEntry.value;

numericSign.textContent=numSign;
numericPart.innerText=numPortion;
intPortion.innerText=integerPart;
leftmostZeroes.innerText=trailing0sCnt;
dotSymbol.innerText=hasDot;
decimalFraction.innerText=fractCluster;
rightmostZeroes.innerText=leading0s;
nonZeroClustered.textContent=non0Core;
significantFigures.textContent=signifFigs;
significantCount.textContent=sigDigCnt;
eDeclarator.textContent=hasExp;
exponentialSign.textContent=expSign;
expValue.textContent=expVal;
}

function reportInvalidUserEntry (){
// Actual error:
echoedUserEntry.textContent=`Entry is NaN`;
echoedUserEntry.style.color='red';


// Placeholder values:
numericSign.textContent='numSign';
numericPart.textContent='numPortion'; 
intPortion.textContent='integerPart';
leftmostZeroes.textContent='trailing0sCnt';
rightmostZeroes.innerText='leading0s';
nonZeroClustered.textContent='non0Core';
significantFigures.textContent='signifFigs';
significantCount.textContent='sigDigCnt';
dotSymbol.textContent='hasDot';
decimalFraction.textContent='fractCluster';
eDeclarator.textContent='hasExp';
exponentialSign.textContent='expSign';
expValue.textContent='expVal';
}

function userEntryIsInvalid (){
if(isNaN(userEntry.value)||(userEntry.value==='')){
reportInvalidUserEntry();
return true;
}
echoedUserEntry.style.color='yellow';
return false;
}

function disector (){
if(userEntryIsInvalid()){
return}
signOfNumber();
coreNumber;
integerPortion();
trailingZeroes();
xtNon0Cluster();
xtSignifCluster();
xtSigDigCnt();
xtHasDot();
xtFractCluster();
xtLeading0s();
xtHasExp();
xtExpSign();
xtExpVal();
reportDisectionOutcome();
}

// Test
function test (){

}
const testBtn=document.querySelector ('#test-btn');
testBtn.addEventListener('click', disector);
