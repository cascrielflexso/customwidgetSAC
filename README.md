# How to write a custom widget for SAP Analytics Cloud
## Context
The purpose of the widget is to act as some kind of storage location of a certain product. A map of the warehouse can be imported into SAC through an analytical application. The widget can then be selected and it immediately turns red or green. Red means the stock level is lower than the re-rder point, green means the re-order point is still not reached. The widget can be configurated through the builder panel, as well as the product number through the styling panel. I know this is against the rules of SAC Ideology, but it will become clear later in this document why dit is done. See the GIF attachment below for the result.

### The result :
img

### Components : 
- JSON-File
- JS-File for Styling Panel interface
- JS-File for the Web Component
- (opt) GitHub Page repository for custom widget hosting
- Model in SAP Analytics Cloud

## The JSON-File
### We want to give a name and id to our widget first. This will help us to find the widget in SAC later.

```
"name": "localhost",
	"description": "",
	"newInstancePrefix": "localhost",
	"eula": "",
	"vendor": "cas",
	"license": "",
	"id": "localhost",
	"version": "1.0.1",
	"icon": "",
```
### References
The next step is to create references to our JavaScript-Files. For the sake of this demonstration, we will only use the custom configuration of the main object and the styling panel. This is done so we can add the data-binding object to the builder panel later. When adding custom logic to the builder panel, predefined logic will be cleared. This is one of the reasons why we have to add the product number through the styling panel.

**Warning** : For now, the url is referring to my local server, where the JS-objects are stored. These can be replaced with the GitHub-URLs when hosting on GitHub. This is also the case for widget hosting on SAP Cloud Foundry.


```
"webcomponents": [
		{
			"kind": "main",
			"tag": "custom-button",
			"url": "http://localhost:5500/github2712/Webcomponent.js",
			"integrity": ""	,
			"ignoreIntegrity": true
			
		},
		{
			"kind": "styling",
			"tag": "com-sap-sample-coloredbox-styling",
			"url": "http://localhost:5500/github2712/stylingpanel.js",
			"integrity": "",
			"ignoreIntegrity": true
		}
	],
  ```
  
  ### Basic Configuration
  I will not go through the basic configuration of the properties and functions. Basically, you will define the naming/functionality of subcomponents and methods here.
  
  ### DataBinding
  **Important** : Be sure to add the following code in order to be able to link a SAC model to your widget!
  ```
  "dataBindings": {
		"myDataBinding": {
		  "feeds": [
			{
			  "id": "dimensions",
			  "description": "Dimensions",
			  "type": "dimension"
			},
			{
			  "id": "measures",
			  "description": "Measures",
			  "type": "mainStructureMember"
			}
		  ]
		}
	}
  ```
  img
  
  ## WebComponent
  First thing to do when adding the WebComponent, is to define the visual itself. This is done with HTML and CSS. (CSS can also be defined in a separate file)
  Make sure to add the **Class** and **ID** to the components you want to make dynamic with the JS later!
  ``
  
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
	
	```
  ### Constructor
  ```constructor() {
			super();
			let shadowRoot = this.attachShadow({mode: "open"});
			shadowRoot.appendChild(template.content.cloneNode(true));
			
			this.addEventListener("click", event => {
				var event = new Event("onClick");
				this.fireClick();
				this.dispatchEvent(event);
			});
			this._props = {};
			//

  
  
