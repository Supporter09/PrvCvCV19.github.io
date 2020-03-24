var api_url = "https://cors-anywhere.herokuapp.com/https:"+"//coronaapivn.herokuapp.com/api?utm_source=j2team&utm_medium=url_shortener&fbclid=IwAR1tLUBn3wlOwMZwXEP3yRw6Rcftnm2EVuLgqsTNNJZ982sThCnuL5vM2pw" ;
console.log(api_url);
fetch(api_url).then(async (data)=>{
    dataGet = await data.json()
    console.log(dataGet)
    // console.log(dataGet.tratu);
    var word =  dataGet.provinces[0].Province_Name;
    console.log(word);
})