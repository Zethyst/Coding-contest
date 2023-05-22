let url = "https://kontests.net/api/v1/all"

async function inserting(data){
    iHTML = ""
    for (item in data) {
        let res = await fetch("images.json");
        let value = await res.json();
        var temp;
        if (data[item].site.includes("HackerRank")) {
            temp = value[0].url;
        }
        else if (data[item].site.includes("CodeChef")) {
            // alert("reached CodeChef")
            temp = value[1].url;
        }
        else if (data[item].site.includes("CodeForces")) {
            temp = value[2].url;
        }
        else if (data[item].site.includes("AtCoder")) {
            temp = value[3].url;
        }
        else if (data[item].site.includes("LeetCode")) {
            temp = value[4].url;
        }
        else if (data[item].site.includes("HackerEarth")) {
            temp = value[5].url;
        }
        else {
            temp = "";
        }

        iHTML += `
        <div class="card mx-2 my-3" style="width: 18rem; ">
        <img src=${temp} class="card-img-top" alt="Logo">
        <div class="card-body">
            <h5 class="card-title">${data[item].name}</h5>
            <i class="card-text">Site: ${data[item].site}</i>
            <p>Start Time: ${data[item].start_time}</p>
            <p>End Time: ${data[item].end_time}</p>
            <a href="${data[item].url}" class="btn btn-primary">Go to site</a>
            </div>
    </div>
        `
    }
    containercards.innerHTML = iHTML;
}
// var globaldata=getdata(temp);

async function mainfunc() {
    var response = await fetch(url);
    var data = await response.json();
    inserting(data);
}
mainfunc();

//search box entry
var input = document.getElementById("sea");
input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("sbtn").click();
    }
});
//function to filter the results
sbtn.addEventListener("click",()=>{
    let search=document.getElementById("sea").value;
    async function filtered(){
        try {
            let res = await fetch(url);
            if (!res.ok) {
                throw new Error(res.statusText)
            }
            let data = await res.json();
            let newdata=data.filter((value)=>{
            // alert("reached this point")
            alert(value.site);
            return value.site.includes(search);
            })
                inserting(newdata);
            }
         catch (error) {
            alert(error)
        }
    }
    filtered();
})