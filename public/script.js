document.addEventListener('mousemove', event => {

  let cx = document.documentElement.clientWidth / 2
  let cy = document.documentElement.clientHeight / 2
  
  let x = event.clientX / cx
  let y = event.clientY / cy
  
  let dcx = event.clientX - cx
  let dcy = event.clientY - cy

  let movement = 7
  document.querySelector("#ibiscus1").style.bottom = (200 + (y*movement)) + "px"
  document.querySelector("#ibiscus2").style.bottom = (-340 - (y*movement)) + "px"
  document.querySelector("#ibiscus1").style.right = (-400 + (x*movement)) + "px"
  document.querySelector("#ibiscus2").style.left = (-400 - (x*movement)) + "px"

  movement = 0.03
  let limit = 120
  document.querySelector('#two-cols').style.marginLeft = (dcx*movement) + "px"
  document.querySelector('#two-cols').style.marginTop = Math.max(Math.min(dcy*movement, limit), -limit) + "px"
})

document.addEventListener('wheel', event => {

  if(window.scrollY > 1300 && window.scrollY < 2200) {
    let y = window.scrollY - 1300
    let max = document.documentElement.clientWidth
    
    document.querySelector('#enormous').style.marginRight = Math.min(y*0.2, max) + "px"
    document.querySelector('#morpho').style.marginLeft = Math.min(y*1.2, max) + "px"
  }
  
})

function startScroll() {
  document.querySelector('#two-cols').scrollIntoView({ 
    behavior: "smooth", 
    block: "center", 
    inline: "nearest"
 
  });
} 

function sendmessage(input) {
  if(input.value.length == 0) return
  document.querySelector('#chatbot #messages').innerHTML += `<p class="message me"
  >${input.value}</p>`

  document.querySelector('#chatbot #messages').innerHTML += `<p class="message"
  >${needAnswer(input.value)}</p>`
  
  input.value = ""
}

function needAnswer(prompt) {
  let pre = "Tu dois répondre à la question suivante : '"
  let post = "' en donnant l'ensemble des habitudes que l'utilisateur peut adopter pour réduire son empreinte carbone et contribuer à la lutte contre le réchauffement climatique."

  return get(`${window.location.origin}/api/gpt/${pre + prompt + post}`)
}

function displayMeteo() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;

      console.log(`${window.location.origin}/api/pollution/${lat}/${long}`)

      let data = JSON.parse(get(`${window.location.origin}/api/pollution/${lat}/${long}`))
      
      let AQI = data.list[0].main.aqi
      
      let qualities = [
        "agréable",
        "correcte",
        "modérée",
        "mauvaise",
        "médiocre"
      ]

      document.querySelector('#air-pollution').innerHTML = qualities[AQI - 1]
    });
  } else {
    console.warn("Geolocation is not supported by this browser.");
  }
}

displayMeteo()

function link(url) {
  window.open(url, '_blank').focus()
}