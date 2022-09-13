import AbstractView from "./AbstractViews.js";

export default class extends AbstractView{
  constructor(params){
    super(params);
    this.setTitle("Settings")
  }
  async getHtml () {
    return `
      <h1>Welcome back, dom</h1>
      <p>
        세팅 렌더링
      </p>
    `;
  }
}