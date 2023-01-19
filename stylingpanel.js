(function()  {
	let template = document.createElement("template");
	template.innerHTML = `
		<form id="form">
			<fieldset>
				<legend>Widget Properties</legend>
				<table>
					<tr>
						<td>Color</td>
						<td><input id="styling_color" type="text" size="40" maxlength="40"></td>
						
					</tr>
					<tr>
						<td>Product</td>
						<td><input id="styling_prd" type="text" size="40" maxlength="40"></td>
					</tr>
				</table>
				<input type="submit" style="display:none;">
			</fieldset>
		</form>
	`;

	class ColoredBoxStylingPanel extends HTMLElement {
		constructor() {
			super();
			this._shadowRoot = this.attachShadow({mode: "open"});
			this._shadowRoot.appendChild(template.content.cloneNode(true));
			this._shadowRoot.getElementById("form").addEventListener("submit", this._submit.bind(this));
		}

		_submit(e) {
			e.preventDefault();
			this.dispatchEvent(new CustomEvent("propertiesChanged", {
					detail: {
						properties: {
							color: this.color,
							prod_number : this.prod_number
						}
					}
			}));
		}

		set color(newColor) {
			this._shadowRoot.getElementById("styling_color").value = newColor;
		}

		get color() {
			return this._shadowRoot.getElementById("styling_color").value;
		}
		set prod_number(newProd_number) {
			this._shadowRoot.getElementById("styling_prd").value = newProd_number;
		}

		get prod_number() {
			return this._shadowRoot.getElementById("styling_prd").value;
		}
		
	}

customElements.define("com-sap-sample-coloredbox-styling", ColoredBoxStylingPanel);
})();
