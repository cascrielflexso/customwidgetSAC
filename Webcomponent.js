(function() { 
	let template = document.createElement("template")
	template.innerHTML = `
	<style>
	.card {
	  display : none;
	  background-color:white;
	  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
	  transition: 0.3s;
	  width: 90%;
	  margin-left:auto;
	  margin-right:auto;
	  border:3px solid;
	}

	.button {
		background-color: #019CE0;
		border: none;
		border-radius:10px;
		color: white;
		padding: 5px 10px;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 16px;
		margin: 4px 2px;
		cursor: pointer;
		width:75px;
		height:40px;
		margin-left:auto;
	  	margin-right:auto;
	  }

	.bullet{
		background-color:red;
		height:35px;
		width: 35px;
		border-radius:50%;
		display:block;
	}

	.bullet:hover + .card{
		display:block;
	}
	
	.card:hover {
	  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
	  display:block;
	}
	
	.container {
	  padding: 2px 16px;
	}
	</style>
	<div class="bullet" id="bullet"></div>
	<div class="card" id="card">
	  <img id="img" src="" alt="No image available" style="width:100%">
	  <div class="container">
		<b id = "product"></b>
		<h5><b id = "number"></b></h5>
		<p id = "measure"><p>
		<p id = "ROP"><p>
		<a class="button" id="button" href="#" target = "_blank">Order</a>
	  </div>
	</div>
	
	`;
	class ColoredBox extends HTMLElement {
		
		constructor() {
			super();
			let shadowRoot = this.attachShadow({mode: "open"});
			shadowRoot.appendChild(template.content.cloneNode(true));
			
			this.addEventListener("click", event => {
				var event = new Event("onClick");
				this.fireClick();
				this.dispatchEvent(event);
			});
			this._props = {};
			//let prd = dataBinding.data["Product"][this.prod_number]
		}

		onCustomWidgetBeforeUpdate(changedProperties) {
			this._props = { ...this._props, ...changedProperties };
		}

		onCustomWidgetAfterUpdate(changedProperties) {
			this.setData()
			console.log(JSON.stringify(changedProperties));
			/*if ("color" in changedProperties) {
				this.style["background-color"] = changedProperties["color"];
			}*/
			if ("prod_number" in changedProperties) {
				this.prod_number = changedProperties["prod_number"];
			}
		}

		fireClick(){	
			console.log(JSON.stringify(this.myDataBinding));
		}

		setData(){
			let measure = 0;
			let product = "";
			let image = "";
			let rop = "";
			console.log(this.prod_number)
			this.myDataBinding.data.forEach(row => {
				if(row["dimensions_0"]['id'] === this.prod_number){
					measure = row["measures_0"]["raw"];
					product = row["dimensions_0"]["label"];
					image = row["dimensions_1"]["id"];
					rop = row["measures_1"]["raw"];
				}
				//console.log('row : '+JSON.stringify(row));
			})
			this.shadowRoot.getElementById("measure").innerText = measure;
			this.shadowRoot.getElementById("product").innerText = product;
			this.shadowRoot.getElementById("number").innerText = this.prod_number;
			this.shadowRoot.getElementById("ROP").innerText = rop;
			this.shadowRoot.getElementById("img").src = image;
			this.shadowRoot.getElementById("button").href = "https://linflexhana.sap.flexso.com:8443//sap/bc/ui5_ui5/ui2/ushell/shells/abap/FioriLaunchpad.html?sap-client=800&sap-language=EN#PurchaseOrder-display&/CreatePOByMaterial?sap-parameters=MATERIAL:256";

			if(parseInt(measure) < parseInt(rop)){
				this.shadowRoot.getElementById("measure").style.color = "red";
				this.shadowRoot.getElementById("bullet").style.backgroundColor = "red";
				this.shadowRoot.getElementById("card").style.borderColor = "red";
			}else{
				this.shadowRoot.getElementById("measure").style.color = "green";
				this.shadowRoot.getElementById("bullet").style.backgroundColor = "green";
				this.shadowRoot.getElementById("card").style.borderColor = "green";
			}

			 
		}

		wait(ms){
			var start = new Date().getTime();
			var end = start;
			while(end < start + ms) {
			  end = new Date().getTime();
		   }
		 }
		 
		 async post (path, jsonString) {
			var data = JSON.stringify({
				"PurchaseOrder": "string"
			  });
			  
			  var xhr = new XMLHttpRequest();
			  xhr.withCredentials = false;
			  
			  xhr.addEventListener("readystatechange", function () {
				if (this.readyState === this.DONE) {
				  console.log(this.responseText);
				}
			  });
			  
			  //setting request method
			  //API endpoint for API sandbox 
			  xhr.open("GET", "https://sandbox.api.sap.com/s4hanacloud/sap/opu/odata/sap/API_PURCHASEORDER_PROCESS_SRV/A_PurchaseOrder?%24inlinecount=allpages&%24top=50");			  
			  
			  //adding request headers
			  //API Key for API Sandbox
			  xhr.setRequestHeader("APIKey", "aZHUKOO7i0GRwX6Qp6DcRvkUbdTmzUbu");
			  xhr.setRequestHeader("DataServiceVersion", "2.0");
			  xhr.setRequestHeader("Accept", "application/json");
			  //xhr.setRequestHeader("Content-Type", "application/json");
			  
			  
			  //sending request
			  xhr.send(data);
		  }
	}
	customElements.define("custom-button", ColoredBox);
})();
