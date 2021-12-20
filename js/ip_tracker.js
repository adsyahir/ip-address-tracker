
let current_verion = 'v1'

// elements to update 
let current_ip = document.getElementById('current_ip')
let current_town = document.getElementById('current_town')
let current_zone = document.getElementById('current_zone')
let current_isp = document.getElementById('current_isp')

// form elements 
const entered_ip = document.getElementById('ip_address') 
const search_btn = document.getElementById('search_btn')



const map = L.map('display-map', {
    'center': [0,0],
    'zoom': 0,
    'layers': [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          })
    ]
})

updateMarker = (update_marker = [45.6085, -73.5493]) => {
    map.setView(update_marker, 13);
    L.marker(update_marker).addTo(map);
}

function findip(){
    $.get("https://ipapi.co/"+document.getElementById("ip_address").value+"/json",function(data){
    
        document.getElementById('current_ip').innerHTML= data.ip;
        document.getElementById('current_town').innerHTML=data.city+", "+data.country+" "+ data.postal;
        document.getElementById('current_zone').innerHTML=data.timezone;
        document.getElementById('current_isp').innerHTML=data.org;
        updateMarker([data.latitude, data.longitude])
    })
}



document.addEventListener('load', updateMarker())

search_btn.addEventListener('click', e => {
    e.preventDefault()
    if (entered_ip.value != '' && entered_ip.value != null) {
        findip()
        return
    }
    alert("Please enter a valid IP address");
})