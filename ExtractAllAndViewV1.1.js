"use strict";
/*
Revision Information:
html 1.0 2021-04-03.00
css  1.0 2021-04-03.00
js   1.0 2021-04-03.00
*/
// Grab doc elements
const userEntry=document.querySelector('#user-entry');
const abstractedSign=document.querySelector('#implied-sign');
const signDeclarator=document.querySelector('#sign-declarator');
const signSymbol=document.querySelector('#sign-separator');
const numericPortion=document.querySelector('#numeric-part');
const echoedEnteredValue=document.querySelector('#echoed-entered-value');
const intPortion=document.querySelector('#integer-part');
const leftmostZeroes=document.querySelector('#trailing-zeroes');
const nonZeroClustered=document.querySelector('#non-zero-clustered');
const signifFigures=document.querySelector('#significant-number');
const significantCount=document.querySelector('#significant-count');
const dotDeclarator=document.querySelector('#dot-declarator');
const dotSymbol=document.querySelector('#dot-separator');
const decimalFraction=document.querySelector('#decimal-fraction');
const rightmostZeroes=document.querySelector('#leading-zeroes');
const eDeclarator=document.querySelector('#e-declarator');
const eSymbol=document.querySelector('#e-separator');
const exponentSign=document.querySelector('#exp-sign');
const expValue=document.querySelector('#exp-value');
const exponentWhole=document.querySelector('#exp-whole');

// Global outcome variables
let impliedSign;
let hasSign;
let fetchedSign;
let numPortion;
let integerPortion;
let trailing0sCnt;
let non0Cluster;
let signifFigs;
let sigDigCnt;
let hasDot;
let fetchedDot;
let fractCluster;
let leading0s;
let hasExp;
let fetchedE;
let expSign;
let expVal;
let expWhole;

function algebraicSign (){
if(userEntry.value<0||userEntry.value.slice(0,1)==='-'){
impliedSign='-';
return impliedSign;}
if(userEntry.value>0||userEntry.value.slice(0,1)==='+'){
impliedSign='+';
return impliedSign;}
impliedSign='';
return impliedSign;}

function hasASign (){
const entryStr=userEntry.value;
console.log({entryStr});
if(entryStr.slice(0,1)==='+' || entryStr.slice(0,1)==='-'){
// yes
hasSign=true;
return hasSign;}
//no
hasSign=false;
return hasSign;}

function fetchTheSign (){
if(hasASign()){
// yes
fetchedSign=userEntry.value.slice(0,1);
return fetchedSign;}
//no
fetchedSign='';
return fetchedSign;
}

function numericPart (){
let userEntryAbsVal;
if(userEntry.value<0 || userEntry.value.slice(0,1)==='-' || userEntry.value.slice(0,1)==='+'){
userEntryAbsVal=userEntry.value.slice(1);
}else{
userEntryAbsVal=userEntry.value.slice(0);
}
let wholeNumStr;
if(hasAnE()){
wholeNumStr=userEntryAbsVal;
const sliceStop=wholeNumStr.indexOf('e');
numPortion=wholeNumStr.slice(0, sliceStop);
return numPortion; // a string.
}
numPortion=userEntryAbsVal;
return numPortion;
}

function integerPart (){
const numbStr=numericPart();  
if(hasADot()){
const sliceStop=numbStr.indexOf('.');
integerPortion=numbStr.slice(0, sliceStop);
return integerPortion;}
integerPortion=numbStr;
return integerPortion;}

function trailingZeroesCount (){
const numStr=integerPart();
let zeroesCount=0;
for (let digit of numStr) {
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

function zeroTrimmedCore (){
// Zero valueds with or without dot somewhere:
if(1*userEntry.value===0 && hasADot()){
non0Cluster='.';
return non0Cluster;}
if(1*userEntry.value===0 && !hasADot()){
non0Cluster='';
return non0Cluster;}
let numbStr=numericPart();
let absNumbStr;
//numbers that have the form ".x"
if(numbStr.slice(0,1)==='.'){
numbStr=(1*numbStr).toString(); // trim leading zeroes
non0Cluster=numbStr.slice(0); // trim trailing 0 introduced by 1* operation
return non0Cluster;}
if(numbStr.slice(-1)==='.'){ // x. case
numbStr=(1*numbStr).toString(); // trim trailing zeroes
non0Cluster=numbStr.concat('.'); // append '.' trimmed by 1* operation
return non0Cluster;}
// For all other cases not covered above:
non0Cluster=(1*numbStr).toString();
return non0Cluster;}

// +011e-2
function significantFigures (){
const alphamericCoreStr=numericPart(); 
// Any number of only zeroes with a dot somewhere:
if(1*alphamericCoreStr===0 && alphamericCoreStr.includes('.')){ 
signifFigs=0+fractionalPart();
return signifFigs;}
// Any number of only zeroes with no dot anywhere:
if(1*alphamericCoreStr===0 && !alphamericCoreStr.includes('.')){
signifFigs='0';
return signifFigs;}
// Non-zero valued numeric part that starts with a dot:
if(alphamericCoreStr.slice(0,1)==='.'){
signifFigs=fractionalPart();
return signifFigs;}
let non0ClusterStr=zeroTrimmedCore();
// Any other except previous "returns", that contain a dot somewhere:
if(non0ClusterStr.includes('.')){
const indexOfDot=non0ClusterStr.indexOf('.');
const jointString=non0ClusterStr.slice(0,indexOfDot) + non0ClusterStr.slice(1+indexOfDot);
signifFigs=jointString;
return signifFigs;}
// Any numeric part that doesn't contain a dot:
// +011e-2
signifFigs= zeroTrimmedCore();
return signifFigs;}
function sigFiguresCount (){
sigDigCnt=significantFigures().length;
return sigDigCnt;}

function reverseNumCluster (){ // @
const numStr=numericPart();
let reversedNumCluster='';
for (var i = 0; i < numStr.length; i++) {
  reversedNumCluster=numStr[i].concat(reversedNumCluster);
}
return reversedNumCluster;}

function leadingZeroesCount (){
if(userEntry.value==='0'){
leading0s=0;
return leading0s;}
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
if(hasADot()){  
let numbStr=numericPart();
const sliceStop=numbStr.indexOf('.');
fractCluster=numbStr.slice(sliceStop+1);
return fractCluster;}
fractCluster='';
return fractCluster;}

function hasADot (){
if(userEntry.value.includes('.')){
// yes
hasDot=true;
return hasDot;}
//no
hasDot=false;
return hasDot;}

function fetchTheDot (){
if(hasADot()){
// yes
fetchedDot='.';
return fetchedDot;}
//no
fetchedDot='';
return fetchedDot;}

function hasAnE (){
if(userEntry.value.includes('e')){
// yes
hasExp=true;
return hasExp;}
//no
hasExp=false;
return hasExp;}

function fetchTheE (){
if(hasAnE()){
// yes
fetchedE='e';
return fetchedE;}
//no
fetchedE='';
return fetchedE;}

function exponentialSign (){
const wholeNumStr=userEntry.value;
if(!wholeNumStr.includes('e')){
expSign='';
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
if(!hasAnE()){
expVal='';
return expVal;}
const wholeNumStr=userEntry.value;
const sliceStop=wholeNumStr.indexOf('e');
const expStr=wholeNumStr.slice(sliceStop+1);
if(!isNaN(expStr[0])){
expVal=expStr;
return expVal;}
expVal=expStr.slice(1);
return expVal;} 

function exponentialWhole(){
if(!hasAnE()){
expWhole='';
return expWhole;}
const wholeNumStr=userEntry.value;
const sliceStop=wholeNumStr.indexOf('e');
const expStr=wholeNumStr.slice(sliceStop+1);
if(!isNaN(expStr[0])){
expWhole=expStr;
return expWhole;}
expWhole=expStr.slice(0);
return expWhole;}

function reportDisectionOutcome(){
// Outputs to document
echoedEnteredValue.textContent=userEntry.value;
abstractedSign.textContent=impliedSign;
signDeclarator.innerText=hasSign;
signSymbol.innerText=fetchedSign;
numericPortion.innerText=numPortion;
intPortion.innerText=integerPortion;
leftmostZeroes.innerText=trailing0sCnt;
dotDeclarator.innerText=hasDot;
dotSymbol.innerText=fetchedDot;
decimalFraction.innerText=fractCluster;
rightmostZeroes.innerText=leading0s;
nonZeroClustered.textContent=non0Cluster;
signifFigures.textContent=signifFigs;
significantCount.textContent=sigDigCnt;
eDeclarator.textContent=hasExp;
eSymbol.innerText=fetchedE;
exponentSign.textContent=expSign;
expValue.textContent=expVal;
exponentWhole.textContent=expWhole;
}

function reportInvalidUserEntry (){
// Actual error:
echoedEnteredValue.textContent=`Invalid, or No Entry`;
echoedEnteredValue.style.color='red';
// Placeholder values:
abstractedSign.textContent='impliedSign';
signDeclarator.textContent='hasSign';
signSymbol.textContent='fetchedSign';
numericPortion.textContent='numPortion';
intPortion.textContent='integerPortion';
leftmostZeroes.textContent='trailing0sCnt';
rightmostZeroes.textContent='leading0s';
nonZeroClustered.textContent='non0Cluster';
signifFigures.textContent='signifFigs';
significantCount.textContent='sigDigCnt';
dotDeclarator.textContent='hasDot';
dotSymbol.textContent='fetchedDot';
decimalFraction.textContent='fractCluster';
eDeclarator.textContent='hasExp';
eSymbol.textContent='fetchedE';
exponentSign.textContent='expSign';
expValue.textContent='expVal';
exponentWhole.textContent='expWhole';
}

function echoedUserEntry (){
if(isNaN(userEntry.value)||userEntry.value===''){
reportInvalidUserEntry();
return false;
}
echoedEnteredValue.style.color='yellow';
return true;
}

function disector (){
if(!echoedUserEntry()){
return}
algebraicSign();
hasASign();
fetchTheSign();
numericPart;
integerPart();
trailingZeroesCount();
zeroTrimmedCore();
significantFigures();
sigFiguresCount();
hasADot();
fetchTheDot();
fractionalPart();
leadingZeroesCount();
hasAnE();
fetchTheE();
exponentialSign();
exponentialValue();
exponentialWhole();
reportDisectionOutcome();
}
const disectBtn=document.querySelector ('#disect-button');
disectBtn.addEventListener('click', disector);
