// capturando os elementos

const input = document.querySelector("input");
const button = document.querySelector("button");
const img = document.querySelector("img");

const city = document.querySelector("#city");
const degree = document.querySelector("#degree")

const content = document.querySelector(".content")

// criando um evento de click
// caso haja algum dado válido no campo city, ele irá fazer a chamada da API e trará as informações de clima
button.addEventListener("click", ()=>{
    if(!input.value) return;
    // se o campo de entrada for vazio a função não será executada
    getWeatherData();
})

async function getWeatherData(){
    // let urlApi recebe o link para acesso da API OpenWeather com a ID Key
    let urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input.value)}&units=metric&appid=28b07951bbd8e5891d4c4067e2d6c587`

    try{
        await fetch(urlApi)
        .then((res)=> res.json())
        // pelo método fetch, capturamos os dados da requisição que são trabalhados na função de retorno .then()
        // que extrai os dados da respota como um objeto .JSON
        .then((data)=>{
            if(data?.cod && data.cod === "404"){
                return alert ("Cidada não encontrada.")
            }
            // o segundo .then() recebe os dados obtidos da função anterior (data)
            // caso a cidade digitada no input não exista, dispara o erro na tela de "Cidade não encontrada"
            loadWeatherInfo(data);
            // tendo capturado informações de uma cidade existe, o código chama a função que irá exibir os dados da previsão do tempo
            // para a cidade solicitada
        })
    } catch (error){
        alert(error);
    }
}

function loadWeatherInfo(data){
    city.innerHTML = `${data.name}, ${data.sys.country}`;
    degree.innerHTML = `Temperatura: ${Math.floor(data.main.temp)}º C`;
    img.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    content.style.display = "flex";
}