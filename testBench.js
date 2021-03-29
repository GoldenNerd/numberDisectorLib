"use strict";
// Grab doc elements
const userEntry=document.querySelector('#user-entry');
const numericSign=document.querySelector('#numeric-sign');
const numericPortion=document.querySelector('#numeric-part');
const echoedUserEntry=document.querySelector('#echoed-user-entry');
const intPortion=document.querySelector('#integer-part');
const leftmostZeroes=document.querySelector('#trailing-zeroes');
const nonZeroClustered=document.querySelector('#non-zero-clustered');
const signifFigures=document.querySelector('#significant-number');
const significantCount=document.querySelector('#significant-count');
const dotSymbol=document.querySelector('#dot-separator');
const decimalFraction=document.querySelector('#decimal-fraction');
const rightmostZeroes=document.querySelector('#leading-zeroes');
const eDeclarator=document.querySelector('#e-declarator');
const exponentSign=document.querySelector('#exp-sign');
const expValue=document.querySelector('#exp-value');

// Global outcome variables
let numSign;
let numPortion;
let integerPortion;
let trailing0sCnt;
let non0Cluster;
let signifFigs;
let sigDigCnt;
let hasADot;
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

function numericPart (){
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

function integerPart (){
const numbStr=numericPart();  
if(is_dotPresent()){
const sliceStop=numbStr.indexOf('.');
integerPortion=numbStr.slice(0, sliceStop);
return integerPortion;}
integerPortion=numbStr;
return integerPortion;}

function trailingZeroesCount(num=integerPart()){
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

function numericNonZeroCore(){
let numbStr=numericPart();
let absZeroStripped;
let zeroStripped;
if(numbStr<0){
absZeroStripped=(-1)*numbStr;
non0Cluster=absZeroStripped;
return non0Cluster;}
zeroStripped=1*numbStr;
non0Cluster=zeroStripped;
return non0Cluster;}

// @
function significantFigures (){
const non0Cluster=numericNonZeroCore();
let non0ClusterStr=non0Cluster.toString();
const firstDigit=non0ClusterStr.slice(0,1);
if(firstDigit==='0'){
signifFigs=non0ClusterStr.slice(2, non0ClusterStr.length);
return signifFigs;}
const dotIndex=non0ClusterStr.indexOf('.');
const newStr=non0ClusterStr.slice(0,dotIndex).concat(non0ClusterStr.slice(dotIndex+1, non0ClusterStr.length));
signifFigs=newStr;
return signifFigs;}

function sigFiguresCount (){
sigDigCnt=signifFigs.length;
return sigDigCnt;}

function reverseNumCluster (num=numericPart()){
let reversedNumCluster='';
for (var i = 0; i < num.length; i++) {
  reversedNumCluster=num[i].concat(reversedNumCluster);
}
return reversedNumCluster;}

function leadingZeroesCount (){
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

function fractionalPart (){
if(is_dotPresent()){  
let numbStr=numericPart();
const sliceStop=numbStr.indexOf('.');
fractCluster=numbStr.slice(sliceStop+1, numbStr.length);
return fractCluster;}
fractCluster=null;
return fractCluster;}

function is_dotPresent (){
if(userEntry.value.toString().includes('.')){
return true;}
return false;}

function hasDot (){
if(is_dotPresent()){
// yes
hasADot=true;
return hasADot;}
//no
hasADot=false;
return hasADot;}

function is_ePresent (){
if(userEntry.value.toString().includes('e')){
return true;}
return false;}

function hasExponential (){
if(is_ePresent()){
// yes
hasExp=true;
return hasExp;}
//no
hasExp=false;
return hasExp;}

function exponentialSign (){
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

function exponentialValue (){
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
numericPortion.innerText=numPortion;
intPortion.innerText=integerPortion;
leftmostZeroes.innerText=trailing0sCnt;
dotSymbol.innerText=hasADot;
decimalFraction.innerText=fractCluster;
rightmostZeroes.innerText=leading0s;
nonZeroClustered.textContent=non0Cluster;
signifFigures.textContent=signifFigs;
significantCount.textContent=sigDigCnt;
eDeclarator.textContent=hasExp;
exponentSign.textContent=expSign;
expValue.textContent=expVal;
}

function reportInvalidUserEntry (){
// Actual error:
echoedUserEntry.textContent=`Wrong or No Entry`;
echoedUserEntry.style.color='red';


// Placeholder values:
numericSign.textContent='numSign';
numericPortion.textContent='numPortion'; 
intPortion.textContent='integerPortion';
leftmostZeroes.textContent='trailing0sCnt';
rightmostZeroes.textContent='leading0s';
nonZeroClustered.textContent='non0Cluster';
signifFigures.textContent='signifFigs';
significantCount.textContent='sigDigCnt';
dotSymbol.textContent='hasADot';
decimalFraction.textContent='fractCluster';
eDeclarator.textContent='hasExp';
exponentSign.textContent='expSign';
expValue.textContent='expVal';
}

function userEntryIsValid (){
if(isNaN(userEntry.value)||(userEntry.value===''|| (userEntry.value).toString().slice(0,1)==='.')){
reportInvalidUserEntry();
return false;
}
echoedUserEntry.style.color='yellow';
return true;
}

function disector (){
if(!userEntryIsValid ()){
return}
signOfNumber();
numericPart;
integerPart();
trailingZeroesCount();
numericNonZeroCore();
significantFigures();
sigFiguresCount();
hasDot();
fractionalPart();
leadingZeroesCount();
hasExponential();
exponentialSign();
exponentialValue();
reportDisectionOutcome();
}
const disectBtn=document.querySelector ('#disect-button');
disectBtn.addEventListener('click', disector);
